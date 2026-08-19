// ==============================================================================
// DAISY — Distributed Autonomous Software Intelligence Yield Engine
// MODULE: Hot-Swap Runtime & Circuit Breaker Engine
// Sourced from: daisy/runtime/hot_swap.go (Todd Jeffrey Ites Jr. / SolveX)
// ==============================================================================

export type BubbleState = 
  | 'BubbleActive' 
  | 'BubbleSwapping' 
  | 'BubbleDraining' 
  | 'BubbleFailed' 
  | 'BubbleTerminated';

export type CircuitState = 
  | 'CircuitClosed' 
  | 'CircuitOpen' 
  | 'CircuitHalfOpen';

export interface BubbleNode {
  id: string;
  name: string;
  endpoint: string;
  version: string;
  state: BubbleState;
  activeRequests: number;
  totalCalls: number;
  totalErrors: number;
  failureRate: number;
  avgLatencyMs: number;
  circuitState: CircuitState;
  circuitFailures: number;
  lastFailureTime?: number;
  createdTime: number;
}

export interface SwapEvent {
  swapId: string;
  oldBubbleId: string;
  newBubbleId: string;
  triggerReason: string;
  startTime: string;
  endTime?: string;
  durationMs: number;
  status: 'PENDING' | 'DRAINING' | 'PROBING' | 'SWAPPED' | 'FAILED';
  healthProbePassed: boolean;
  drainedRequests: number;
}

export class DaisyHotSwapEngine {
  private bubbles: Map<string, BubbleNode> = new Map();
  private swapLog: SwapEvent[] = [];
  private readonly maxFailures = 5;
  private readonly resetWindowMs = 30000; // 30s

  constructor() {
    this.seedDefaultBubbles();
  }

  private seedDefaultBubbles() {
    const defaultBubbles: BubbleNode[] = [
      {
        id: 'bubble-alpha',
        name: 'Gatekeeper Perimeter Bubble',
        endpoint: 'grpc://10.240.1.10:50051',
        version: 'v2.4.1',
        state: 'BubbleActive',
        activeRequests: 42,
        totalCalls: 14200,
        totalErrors: 2,
        failureRate: 0.0001,
        avgLatencyMs: 8.4,
        circuitState: 'CircuitClosed',
        circuitFailures: 0,
        createdTime: Date.now() - 86400000,
      },
      {
        id: 'bubble-beta',
        name: 'MMTAI 5-Hop Routing Bubble',
        endpoint: 'grpc://10.240.1.11:50051',
        version: 'v3.1.0',
        state: 'BubbleActive',
        activeRequests: 78,
        totalCalls: 28900,
        totalErrors: 5,
        failureRate: 0.0002,
        avgLatencyMs: 14.2,
        circuitState: 'CircuitClosed',
        circuitFailures: 0,
        createdTime: Date.now() - 86400000,
      },
      {
        id: 'bubble-gamma',
        name: 'EVC Real-Time Cost Bubble',
        endpoint: 'grpc://10.240.1.12:50051',
        version: 'v1.8.4',
        state: 'BubbleActive',
        activeRequests: 19,
        totalCalls: 8500,
        totalErrors: 0,
        failureRate: 0.0,
        avgLatencyMs: 5.1,
        circuitState: 'CircuitClosed',
        circuitFailures: 0,
        createdTime: Date.now() - 86400000,
      }
    ];

    defaultBubbles.forEach(b => this.bubbles.set(b.id, b));
  }

  public getBubbles(): BubbleNode[] {
    return Array.from(this.bubbles.values());
  }

  public getSwapLog(): SwapEvent[] {
    return this.swapLog;
  }

  /**
   * Evaluates circuit breaker status before dispatching calls
   */
  public evaluateCircuit(bubbleId: string): { allowRequest: boolean; state: CircuitState; message: string } {
    const bubble = this.bubbles.get(bubbleId);
    if (!bubble) return { allowRequest: false, state: 'CircuitOpen', message: 'Bubble not found' };

    const now = Date.now();

    if (bubble.circuitState === 'CircuitOpen') {
      if (bubble.lastFailureTime && now - bubble.lastFailureTime > this.resetWindowMs) {
        bubble.circuitState = 'CircuitHalfOpen';
        return { allowRequest: true, state: 'CircuitHalfOpen', message: 'Circuit entering Half-Open probe state' };
      }
      return { allowRequest: false, state: 'CircuitOpen', message: 'Circuit is OPEN. Requests rejected to protect upstream' };
    }

    return { allowRequest: true, state: bubble.circuitState, message: 'Circuit healthy' };
  }

  /**
   * Records success or error for circuit breaker state tracking
   */
  public recordCall(bubbleId: string, isSuccess: boolean, latencyMs: number) {
    const bubble = this.bubbles.get(bubbleId);
    if (!bubble) return;

    bubble.totalCalls += 1;
    bubble.avgLatencyMs = parseFloat(((bubble.avgLatencyMs * 0.9) + (latencyMs * 0.1)).toFixed(2));

    if (isSuccess) {
      if (bubble.circuitState === 'CircuitHalfOpen') {
        bubble.circuitState = 'CircuitClosed';
        bubble.circuitFailures = 0;
      }
    } else {
      bubble.totalErrors += 1;
      bubble.circuitFailures += 1;
      bubble.lastFailureTime = Date.now();
      bubble.failureRate = parseFloat((bubble.totalErrors / bubble.totalCalls).toFixed(4));

      if (bubble.circuitFailures >= this.maxFailures) {
        bubble.circuitState = 'CircuitOpen';
        bubble.state = 'BubbleFailed';
      }
    }
  }

  /**
   * Executes atomic zero-downtime hot swap replacement:
   * 1. Spin up new replacement bubble
   * 2. Run readiness & health probe
   * 3. Drain in-flight traffic from old bubble
   * 4. Atomic edge redirection
   * 5. Terminate old bubble
   */
  public async executeHotSwap(oldBubbleId: string, reason: string): Promise<SwapEvent> {
    const oldBubble = this.bubbles.get(oldBubbleId);
    if (!oldBubble) throw new Error(`Target bubble ${oldBubbleId} does not exist`);

    const swapId = `SWAP-${Date.now().toString().slice(-6)}`;
    const newBubbleId = `${oldBubble.id.replace(/-v\d+/, '')}-v${parseInt(oldBubble.version.replace('v', '')) + 1 || 2}`;
    const startTime = new Date().toISOString();
    const startMs = performance.now();

    // Stage 1: Mark old bubble as Swapping
    oldBubble.state = 'BubbleSwapping';

    // Stage 2: Create new candidate bubble
    const newBubble: BubbleNode = {
      id: newBubbleId,
      name: `${oldBubble.name} (Hot-Swapped)`,
      endpoint: `grpc://10.240.1.${Math.floor(20 + Math.random() * 80)}:50051`,
      version: `v${(parseFloat(oldBubble.version.replace('v', '')) + 0.1).toFixed(1)}`,
      state: 'BubbleActive',
      activeRequests: 0,
      totalCalls: 0,
      totalErrors: 0,
      failureRate: 0.0,
      avgLatencyMs: Math.max(4.0, oldBubble.avgLatencyMs * 0.7),
      circuitState: 'CircuitClosed',
      circuitFailures: 0,
      createdTime: Date.now(),
    };

    // Stage 3: Simulated Health Probe
    const probePassed = true;

    // Stage 4: Drain old requests
    oldBubble.state = 'BubbleDraining';
    const drained = oldBubble.activeRequests;
    oldBubble.activeRequests = 0;
    oldBubble.state = 'BubbleTerminated';

    // Stage 5: Commit new bubble to routing table
    this.bubbles.set(newBubble.id, newBubble);

    const endMs = performance.now();
    const durationMs = parseFloat((endMs - startMs).toFixed(2));

    const swapRecord: SwapEvent = {
      swapId,
      oldBubbleId: oldBubble.id,
      newBubbleId: newBubble.id,
      triggerReason: reason,
      startTime,
      endTime: new Date().toISOString(),
      durationMs,
      status: 'SWAPPED',
      healthProbePassed: probePassed,
      drainedRequests: drained,
    };

    this.swapLog.unshift(swapRecord);
    if (this.swapLog.length > 50) this.swapLog.pop();

    return swapRecord;
  }
}

export const globalHotSwapEngine = new DaisyHotSwapEngine();
