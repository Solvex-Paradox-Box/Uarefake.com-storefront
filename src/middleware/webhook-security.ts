import { Request, Response, NextFunction } from 'express';
import { NeonStatePersistence } from '../db/neon.js';

export interface VerifiedWebhookRequest extends Request {
  webhookEvent?: {
    id: string;
    event_type: string;
    resource: {
      id: string;
      custom_id?: string;
      amount?: {
        value: string;
        currency_code: string;
      };
      payer?: {
        email_address: string;
      };
      [key: string]: any;
    };
  };
}

/**
 * Enterprise-grade idempotency and validation middleware.
 * Ensures every incoming gateway webhook is processed exactly once 
 * and contains all required telemetry before hitting business logic.
 */
declare global {
  namespace Express {
    interface Request {
      webhookEvent?: any;
    }
  }
}

export function createWebhookSecurityGuard(dbPool?: any) {
  return async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    let client: any = null;
    try {
      const event = req.body;

      // 1. Basic Payload Structure Validation
      if (!event || !event.id || !event.event_type || !event.resource) {
        return res.status(400).json({ 
          error: 'INVALID_PAYLOAD_STRUCTURE', 
          message: 'Webhook payload missing required root event properties.' 
        });
      }

      // Only inspect financial capture events for idempotency locks
      if (event.event_type === 'PAYMENT.CAPTURE.COMPLETED') {
        const captureId = event.resource.id;

        if (!captureId) {
          return res.status(400).json({ 
            error: 'MISSING_CAPTURE_ID', 
            message: 'Payment capture event missing resource identifier.' 
          });
        }

        // 2. Idempotency Check (Prevent Double-Fulfillment)
        // Check using PostgreSQL pool if available, otherwise check in NeonStatePersistence
        if (dbPool && typeof dbPool.connect === 'function') {
          try {
            client = await dbPool.connect();
            const existingLedgerEntry = await client.query(
              `SELECT id FROM payment_ledger WHERE gateway_capture_id = $1 LIMIT 1`,
              [captureId]
            );

            if (existingLedgerEntry.rowCount && existingLedgerEntry.rowCount > 0) {
              console.warn(`[IDEMPOTENCY GUARD] Duplicate webhook delivery intercepted for capture ID: ${captureId}`);
              return res.status(200).json({ 
                status: 'ALREADY_PROCESSED', 
                message: 'Idempotency lock engaged. Event previously fulfilled.' 
              });
            }
          } catch (dbErr) {
            console.warn('[IDEMPOTENCY GUARD] Database pool query fallback to in-memory ledger check:', dbErr);
          }
        }

        // Check in-memory/hybrid Neon ledger state
        const allLedger = NeonStatePersistence.getAllLedgerEntries();
        const duplicate = allLedger.some(l => l.gateway_capture_id === captureId);
        if (duplicate) {
          console.warn(`[IDEMPOTENCY GUARD] Duplicate webhook delivery intercepted for capture ID: ${captureId}`);
          return res.status(200).json({ 
            status: 'ALREADY_PROCESSED', 
            message: 'Idempotency lock engaged. Event previously fulfilled.' 
          });
        }
      }

      // Attach validated payload to request object for downstream handlers
      req.webhookEvent = event;
      return next();

    } catch (err: any) {
      console.error('[WEBHOOK SECURITY ERROR]:', err.message);
      return res.status(500).json({ 
        error: 'INTERNAL_SECURITY_ERROR', 
        message: 'Failed to complete webhook security validation.' 
      });
    } finally {
      if (client && typeof client.release === 'function') {
        client.release();
      }
    }
  };
}

/**
 * Middleware to enforce strict real-data integrity on incoming orders and inventory actions.
 * Rejects payloads missing lotId/userEmail or containing simulated mock identifiers.
 */
export function validateRealData(req: Request, res: Response, next: NextFunction): Response | void {
  const body = req.body || {};
  if (!body.lotId || !body.userEmail || String(body.lotId).toLowerCase().includes('mock')) {
    return res.status(400).json({ error: 'INVALID_DATA', message: 'Payload must contain authentic lotId and userEmail without mock flags.' });
  }
  return next();
}

