// ==============================================================================
// DAISY — Distributed Autonomous Software Intelligence Yield Engine
// MODULE: EVC (Enterprise Viability Control) Real-Time Cost Engine
// Sourced from: daisy/evc/cost_engine.go (Todd Jeffrey Ites Jr. / SolveX)
// ==============================================================================

export interface PricingModel {
  cpuPerCoreHour: number;    // USD per vCPU core per hour (default $0.0464)
  memoryPerGBHour: number;   // USD per GB RAM per hour (default $0.0116)
  ioPerGBTransfer: number;   // USD per GB of I/O transfer (default $0.09)
  storagePerGBMonth: number; // USD per GB stored per month (default $0.023)
}

export const DEFAULT_PRICING: PricingModel = {
  cpuPerCoreHour: 0.0464,
  memoryPerGBHour: 0.0116,
  ioPerGBTransfer: 0.09,
  storagePerGBMonth: 0.023,
};

export const REGION_MULTIPLIERS: Record<string, number> = {
  'us-east-1': 1.00, // baseline
  'us-west-2': 1.05,
  'eu-west-1': 1.15,
  'eu-central-1': 1.18,
  'ap-southeast-1': 1.22,
  'ap-northeast-1': 1.25,
  'ca-central-1': 1.10,
  'sa-east-1': 1.30,
};

export interface BubbleCostSnapshot {
  bubbleId: string;
  region: string;
  cpuCores: number;
  memoryGB: number;
  ioTransferGBHr: number;
  storageGB: number;
  timestamp: string;
  // Computed fields
  cpuCostHr: number;
  memoryCostHr: number;
  ioCostHr: number;
  storageCostHr: number;
  regionMultiplier: number;
  totalCostHr: number;
  evcBudgetHr: number;
  isOverBudget: boolean;
  scalingFactor: number;
}

export interface EVCAlert {
  bubbleId: string;
  totalCostHr: number;
  budgetHr: number;
  scalingFactor: number;
  timestamp: string;
  severity: 'WARN' | 'CRITICAL';
  message: string;
}

export class EVCCostEngine {
  private pricing: PricingModel;
  private snapshots: Map<string, BubbleCostSnapshot> = new Map();
  private alerts: EVCAlert[] = [];

  constructor(pricing: PricingModel = DEFAULT_PRICING) {
    this.pricing = pricing;
  }

  public computeCost(input: {
    bubbleId: string;
    region: string;
    cpuCores: number;
    memoryGB: number;
    ioTransferGBHr: number;
    storageGB: number;
    evcBudgetHr: number;
  }): BubbleCostSnapshot {
    const multiplier = REGION_MULTIPLIERS[input.region] || 1.20;
    const cpuCost = input.cpuCores * this.pricing.cpuPerCoreHour * multiplier;
    const memCost = input.memoryGB * this.pricing.memoryPerGBHour * multiplier;
    const ioCost = input.ioTransferGBHr * this.pricing.ioPerGBTransfer * multiplier;
    const storageCostHr = (input.storageGB * this.pricing.storagePerGBMonth * multiplier) / (24 * 30);

    const total = cpuCost + memCost + ioCost + storageCostHr;
    const isOverBudget = input.evcBudgetHr > 0 ? total > input.evcBudgetHr : true;
    const scalingFactor = input.evcBudgetHr > 0 ? parseFloat((total / input.evcBudgetHr).toFixed(4)) : 999.0;

    const snapshot: BubbleCostSnapshot = {
      bubbleId: input.bubbleId,
      region: input.region,
      cpuCores: input.cpuCores,
      memoryGB: input.memoryGB,
      ioTransferGBHr: input.ioTransferGBHr,
      storageGB: input.storageGB,
      timestamp: new Date().toISOString(),
      cpuCostHr: parseFloat(cpuCost.toFixed(6)),
      memoryCostHr: parseFloat(memCost.toFixed(6)),
      ioCostHr: parseFloat(ioCost.toFixed(6)),
      storageCostHr: parseFloat(storageCostHr.toFixed(6)),
      regionMultiplier: multiplier,
      totalCostHr: parseFloat(total.toFixed(6)),
      evcBudgetHr: input.evcBudgetHr,
      isOverBudget,
      scalingFactor,
    };

    return snapshot;
  }

  public ingest(input: {
    bubbleId: string;
    region: string;
    cpuCores: number;
    memoryGB: number;
    ioTransferGBHr: number;
    storageGB: number;
    evcBudgetHr: number;
  }): BubbleCostSnapshot {
    const computed = this.computeCost(input);
    this.snapshots.set(computed.bubbleId, computed);

    if (computed.isOverBudget) {
      const severity: 'WARN' | 'CRITICAL' = computed.scalingFactor > 2.0 ? 'CRITICAL' : 'WARN';
      const alert: EVCAlert = {
        bubbleId: computed.bubbleId,
        totalCostHr: computed.totalCostHr,
        budgetHr: computed.evcBudgetHr,
        scalingFactor: computed.scalingFactor,
        timestamp: computed.timestamp,
        severity,
        message: `[EVC ${severity}] Budget exceeded for ${computed.bubbleId}: $${computed.totalCostHr}/hr vs budget $${computed.evcBudgetHr}/hr (x${computed.scalingFactor})`,
      };
      this.alerts.unshift(alert);
      if (this.alerts.length > 100) this.alerts.pop();
    }

    return computed;
  }

  public getAllSnapshots(): BubbleCostSnapshot[] {
    return Array.from(this.snapshots.values());
  }

  public getAlerts(): EVCAlert[] {
    return this.alerts;
  }

  public getSummary(): {
    totalCostHr: number;
    totalCostDay: number;
    totalCostMonth: number;
    bubblesCount: number;
    overBudgetCount: number;
    breakdown: BubbleCostSnapshot[];
  } {
    const all = this.getAllSnapshots();
    const totalCostHr = all.reduce((sum, s) => sum + s.totalCostHr, 0);
    const overBudgetCount = all.filter(s => s.isOverBudget).length;

    return {
      totalCostHr: parseFloat(totalCostHr.toFixed(4)),
      totalCostDay: parseFloat((totalCostHr * 24).toFixed(2)),
      totalCostMonth: parseFloat((totalCostHr * 24 * 30).toFixed(2)),
      bubblesCount: all.length,
      overBudgetCount,
      breakdown: all,
    };
  }
}

export const globalEvcEngine = new EVCCostEngine();

// Seed initial production nodes
globalEvcEngine.ingest({
  bubbleId: 'bubble-alpha-core',
  region: 'us-east-1',
  cpuCores: 4,
  memoryGB: 16,
  ioTransferGBHr: 2.5,
  storageGB: 100,
  evcBudgetHr: 0.50,
});

globalEvcEngine.ingest({
  bubbleId: 'bubble-beta-edge-eu',
  region: 'eu-west-1',
  cpuCores: 2,
  memoryGB: 8,
  ioTransferGBHr: 1.2,
  storageGB: 50,
  evcBudgetHr: 0.35,
});

globalEvcEngine.ingest({
  bubbleId: 'bubble-gamma-ca-relay',
  region: 'ca-central-1',
  cpuCores: 2,
  memoryGB: 4,
  ioTransferGBHr: 0.8,
  storageGB: 20,
  evcBudgetHr: 0.20,
});
