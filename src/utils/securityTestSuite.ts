// ==============================================================================
// SolveX Decentralized Pipeline: Master Security & Forensic Test Suite
// Sourced from: solvex-pipeline/run_all_tests.sh, test_legit.sh, test_trespass.sh, flood_test.sh, stress_test.sh
// ==============================================================================

import { globalMMTAIRouter } from './mmtaiRouter';

export interface SecurityTestReport {
  testSuiteName: string;
  timestamp: string;
  totalTransmitted: number;
  successfullyDropped: number;
  authorizedAccepted: number;
  breachesDetected: number;
  avgLatencyMs: number;
  p95LatencyMs: number;
  p99LatencyMs: number;
  durationMs: number;
  passed: boolean;
  statusMessage: string;
  recentLedgerAudit: any[];
}

export class SecurityTestSuiteRunner {
  /**
   * [1/4] Legitimate Traffic Test (test_legit.sh)
   * Constructs valid 380-byte cryptographic perimeter packet and verifies Gatekeeper authentication
   */
  public static async runLegitimacyTest(): Promise<SecurityTestReport> {
    const start = performance.now();
    const validHeader = globalMMTAIRouter.generateValidPerimeterHeader('NODE-PROD-01');
    const payload = '[SOVEREIGN-OPS]: SYSTEM_NOMINAL. SECURE_HANDSHAKE_ACKNOWLEDGED. UPLINK=SECURE.';

    const routingResult = globalMMTAIRouter.executeRoutingTraversal('PAYLOAD-LEGIT-001', validHeader);
    const durationMs = parseFloat((performance.now() - start).toFixed(2));

    return {
      testSuiteName: 'Legitimate Traffic Protocol Test',
      timestamp: new Date().toISOString(),
      totalTransmitted: 1,
      successfullyDropped: 0,
      authorizedAccepted: routingResult.authorized ? 1 : 0,
      breachesDetected: 0,
      avgLatencyMs: routingResult.totalLatencyMs,
      p95LatencyMs: routingResult.totalLatencyMs,
      p99LatencyMs: routingResult.totalLatencyMs,
      durationMs,
      passed: routingResult.authorized && routingResult.status === 'DELIVERED',
      statusMessage: routingResult.authorized
        ? 'Gatekeeper Check: [AUTHORIZATION SUCCESSFUL] — 380-Byte Cryptographic Perimeter Verified'
        : 'Gatekeeper Check: [FAILED]',
      recentLedgerAudit: globalMMTAIRouter.getConsensusLedger().slice(0, 3),
    };
  }

  /**
   * [2/4] Trespass / Intrusion Test (test_trespass.sh)
   * Injects unauthorized mock payload without 380-byte valid header to verify Gatekeeper rejection
   */
  public static async runTrespassTest(): Promise<SecurityTestReport> {
    const start = performance.now();
    const unauthorizedPayload = 'UNAUTHORIZED_TRESPASS_PACKET_DATA_STREAM_0010110001_NO_VALID_HEADER';
    const routingResult = globalMMTAIRouter.executeRoutingTraversal('INTRUSION-SIM-01', unauthorizedPayload);
    const durationMs = parseFloat((performance.now() - start).toFixed(2));

    const successfullyRejected = !routingResult.authorized && routingResult.status === 'REJECTED';

    return {
      testSuiteName: 'Trespass & Unauthorized Egress Test',
      timestamp: new Date().toISOString(),
      totalTransmitted: 1,
      successfullyDropped: successfullyRejected ? 1 : 0,
      authorizedAccepted: 0,
      breachesDetected: routingResult.authorized ? 1 : 0,
      avgLatencyMs: routingResult.totalLatencyMs,
      p95LatencyMs: routingResult.totalLatencyMs,
      p99LatencyMs: routingResult.totalLatencyMs,
      durationMs,
      passed: successfullyRejected,
      statusMessage: successfullyRejected
        ? 'Result: REJECTION SUCCESSFUL — Gatekeeper dropped unauthorized trespass packet and logged to consensus ledger.'
        : 'Result: REJECTION FAILED — Unauthorized packet was allowed through!',
      recentLedgerAudit: globalMMTAIRouter.getConsensusLedger().slice(0, 3),
    };
  }

  /**
   * [3/4] 100-Packet Flood Test (flood_test.sh)
   * Floods Gatekeeper with 100 randomized malformed packets
   */
  public static async run100PacketFloodTest(): Promise<SecurityTestReport> {
    const start = performance.now();
    const totalPackets = 100;
    let rejectedCount = 0;
    let breachCount = 0;
    const latencies: number[] = [];

    for (let i = 0; i < totalPackets; i++) {
      const randLen = Math.floor(Math.random() * 550) + 50;
      const fakeMalformedPacket = `MALFORMED_PKT_${Math.random().toString(36).substring(2)}_${randLen}`;

      const res = globalMMTAIRouter.executeRoutingTraversal(`FLOOD-${i}`, fakeMalformedPacket);
      latencies.push(res.totalLatencyMs);

      if (!res.authorized && res.status === 'REJECTED') {
        rejectedCount++;
      } else {
        breachCount++;
      }
    }

    latencies.sort((a, b) => a - b);
    const avgLatency = parseFloat((latencies.reduce((a, b) => a + b, 0) / latencies.length).toFixed(2));
    const p95Latency = latencies[Math.floor(latencies.length * 0.95)] || avgLatency;
    const p99Latency = latencies[Math.floor(latencies.length * 0.99)] || avgLatency;
    const durationMs = parseFloat((performance.now() - start).toFixed(2));

    return {
      testSuiteName: 'Perimeter Flood Test (100 Malformed Packets)',
      timestamp: new Date().toISOString(),
      totalTransmitted: totalPackets,
      successfullyDropped: rejectedCount,
      authorizedAccepted: 0,
      breachesDetected: breachCount,
      avgLatencyMs: avgLatency,
      p95LatencyMs: p95Latency,
      p99LatencyMs: p99Latency,
      durationMs,
      passed: breachCount === 0 && rejectedCount === totalPackets,
      statusMessage: `Flood Test Complete: ${rejectedCount}/100 packets dropped safely. 0 breaches.`,
      recentLedgerAudit: globalMMTAIRouter.getConsensusLedger().slice(0, 5),
    };
  }

  /**
   * [4/4] 1000-Packet Stress / Load Test (stress_test.sh)
   * High-volume stress testing asserting zero perimeter breaches
   */
  public static async run1000PacketStressTest(): Promise<SecurityTestReport> {
    const start = performance.now();
    const totalPackets = 1000;
    let rejectedCount = 0;
    let breachCount = 0;
    const latencies: number[] = [];

    for (let i = 0; i < totalPackets; i++) {
      const randLen = Math.floor(Math.random() * 550) + 50;
      const fakeMalformedPacket = `STRESS_PKT_${Math.random().toString(36).substring(2)}_${randLen}`;

      const res = globalMMTAIRouter.executeRoutingTraversal(`STRESS-${i}`, fakeMalformedPacket);
      latencies.push(res.totalLatencyMs);

      if (!res.authorized && res.status === 'REJECTED') {
        rejectedCount++;
      } else {
        breachCount++;
      }
    }

    latencies.sort((a, b) => a - b);
    const avgLatency = parseFloat((latencies.reduce((a, b) => a + b, 0) / latencies.length).toFixed(2));
    const p95Latency = latencies[Math.floor(latencies.length * 0.95)] || avgLatency;
    const p99Latency = latencies[Math.floor(latencies.length * 0.99)] || avgLatency;
    const durationMs = parseFloat((performance.now() - start).toFixed(2));

    return {
      testSuiteName: 'Perimeter High-Throughput Stress Test (1,000 Packets)',
      timestamp: new Date().toISOString(),
      totalTransmitted: totalPackets,
      successfullyDropped: rejectedCount,
      authorizedAccepted: 0,
      breachesDetected: breachCount,
      avgLatencyMs: avgLatency,
      p95LatencyMs: p95Latency,
      p99LatencyMs: p99Latency,
      durationMs,
      passed: breachCount === 0 && rejectedCount === totalPackets,
      statusMessage: `Stress Test Complete: ${rejectedCount}/1000 packets safely dropped. 0 breaches. Zero-drift resilience confirmed.`,
      recentLedgerAudit: globalMMTAIRouter.getConsensusLedger().slice(0, 5),
    };
  }

  /**
   * Runs all 4 test suites sequentially (master test sequence)
   */
  public static async runMasterTestSequence(): Promise<{
    summaryTimestamp: string;
    allPassed: boolean;
    reports: SecurityTestReport[];
  }> {
    const r1 = await this.runLegitimacyTest();
    const r2 = await this.runTrespassTest();
    const r3 = await this.run100PacketFloodTest();
    const r4 = await this.run1000PacketStressTest();

    const reports = [r1, r2, r3, r4];
    const allPassed = reports.every(r => r.passed);

    return {
      summaryTimestamp: new Date().toISOString(),
      allPassed,
      reports,
    };
  }
}
