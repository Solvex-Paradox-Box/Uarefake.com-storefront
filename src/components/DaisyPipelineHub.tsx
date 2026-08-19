import React, { useState, useEffect } from 'react';
import {
  Activity,
  Cpu,
  Shield,
  Zap,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  Server,
  Layers,
  Terminal,
  Play,
  RotateCcw,
  Radio,
  Lock,
  ArrowRight,
  TrendingUp,
  Globe,
  Sliders,
  Check,
  XCircle
} from 'lucide-react';
import { globalEvcEngine, BubbleCostSnapshot, EVCAlert, REGION_MULTIPLIERS } from '../utils/daisyEvcEngine';
import { globalDaisyOptimizer, GraphNode, MutationRecord, OptimizerCycleResult } from '../utils/daisyOptimizer';
import { globalHotSwapEngine, BubbleNode, SwapEvent } from '../utils/daisyHotSwap';
import { globalMMTAIRouter, MMTAIRoutingResult } from '../utils/mmtaiRouter';
import { SecurityTestSuiteRunner, SecurityTestReport } from '../utils/securityTestSuite';

export const DaisyPipelineHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'evc' | 'optimizer' | 'hotswap' | 'mmtai' | 'security'>('evc');

  // EVC State
  const [evcSummary, setEvcSummary] = useState(globalEvcEngine.getSummary());
  const [evcAlerts, setEvcAlerts] = useState<EVCAlert[]>(globalEvcEngine.getAlerts());
  const [newBubbleInput, setNewBubbleInput] = useState({
    bubbleId: '',
    region: 'us-east-1',
    cpuCores: 4,
    memoryGB: 16,
    ioTransferGBHr: 2.0,
    storageGB: 50,
    evcBudgetHr: 0.35,
  });

  // Optimizer State
  const [optReward, setOptReward] = useState(globalDaisyOptimizer.computeClusterReward());
  const [optNodes, setOptNodes] = useState<GraphNode[]>(globalDaisyOptimizer.getNodes());
  const [optMutations, setOptMutations] = useState<MutationRecord[]>(globalDaisyOptimizer.getMutationHistory());
  const [optFingerprint, setOptFingerprint] = useState(globalDaisyOptimizer.getGraphFingerprint());
  const [isOptimizing, setIsOptimizing] = useState(false);

  // Hot Swap State
  const [bubbles, setBubbles] = useState<BubbleNode[]>(globalHotSwapEngine.getBubbles());
  const [swapLog, setSwapLog] = useState<SwapEvent[]>(globalHotSwapEngine.getSwapLog());
  const [isSwapping, setIsSwapping] = useState(false);

  // MMTAI Router State
  const [customHeader, setCustomHeader] = useState(globalMMTAIRouter.generateValidPerimeterHeader('NODE-01'));
  const [fileIdInput, setFileIdInput] = useState('PAYLOAD-TX-99283');
  const [routingResult, setRoutingResult] = useState<MMTAIRoutingResult | null>(null);
  const [consensusLedger, setConsensusLedger] = useState(globalMMTAIRouter.getConsensusLedger());

  // Security Test Suite State
  const [testReports, setTestReports] = useState<SecurityTestReport[]>([]);
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [activeRunningSuite, setActiveRunningSuite] = useState<string | null>(null);

  const refreshState = () => {
    setEvcSummary(globalEvcEngine.getSummary());
    setEvcAlerts([...globalEvcEngine.getAlerts()]);
    setOptReward(globalDaisyOptimizer.computeClusterReward());
    setOptNodes([...globalDaisyOptimizer.getNodes()]);
    setOptMutations([...globalDaisyOptimizer.getMutationHistory()]);
    setOptFingerprint(globalDaisyOptimizer.getGraphFingerprint());
    setBubbles([...globalHotSwapEngine.getBubbles()]);
    setSwapLog([...globalHotSwapEngine.getSwapLog()]);
    setConsensusLedger([...globalMMTAIRouter.getConsensusLedger()]);
  };

  // EVC Ingest Handler
  const handleIngestBubble = (e: React.FormEvent) => {
    e.preventDefault();
    const id = newBubbleInput.bubbleId.trim() || `bubble-${Date.now().toString().slice(-4)}`;
    globalEvcEngine.ingest({
      ...newBubbleInput,
      bubbleId: id,
    });
    refreshState();
    setNewBubbleInput({
      bubbleId: '',
      region: 'us-east-1',
      cpuCores: 4,
      memoryGB: 16,
      ioTransferGBHr: 2.0,
      storageGB: 50,
      evcBudgetHr: 0.35,
    });
  };

  // Optimizer Cycle Handler
  const handleRunOptimizerCycle = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      globalDaisyOptimizer.runOptimizationCycle();
      refreshState();
      setIsOptimizing(false);
    }, 600);
  };

  // Fault Injector Handler
  const handleInjectFault = (nodeId: string, type: 'LATENCY' | 'FAILURE_RATE' | 'COMPLIANCE_RISK') => {
    globalDaisyOptimizer.injectFault(nodeId, type);
    refreshState();
  };

  // Hot Swap Handler
  const handleExecuteSwap = async (bubbleId: string) => {
    setIsSwapping(true);
    try {
      await globalHotSwapEngine.executeHotSwap(bubbleId, 'Autonomous Operator trigger via DAISY Control Enclave');
      refreshState();
    } finally {
      setIsSwapping(false);
    }
  };

  // MMTAI Routing Traversal
  const handleExecuteRouting = () => {
    const res = globalMMTAIRouter.executeRoutingTraversal(fileIdInput, customHeader);
    setRoutingResult(res);
    refreshState();
  };

  // Run Test Suite
  const handleRunSecuritySuite = async (suiteType: 'legit' | 'trespass' | 'flood100' | 'stress1000' | 'master') => {
    setIsRunningTests(true);
    setActiveRunningSuite(suiteType);
    try {
      if (suiteType === 'legit') {
        const r = await SecurityTestSuiteRunner.runLegitimacyTest();
        setTestReports([r, ...testReports]);
      } else if (suiteType === 'trespass') {
        const r = await SecurityTestSuiteRunner.runTrespassTest();
        setTestReports([r, ...testReports]);
      } else if (suiteType === 'flood100') {
        const r = await SecurityTestSuiteRunner.run100PacketFloodTest();
        setTestReports([r, ...testReports]);
      } else if (suiteType === 'stress1000') {
        const r = await SecurityTestSuiteRunner.run1000PacketStressTest();
        setTestReports([r, ...testReports]);
      } else {
        const seq = await SecurityTestSuiteRunner.runMasterTestSequence();
        setTestReports([...seq.reports, ...testReports]);
      }
      refreshState();
    } finally {
      setIsRunningTests(false);
      setActiveRunningSuite(null);
    }
  };

  return (
    <div id="daisy-pipeline-hub" className="space-y-6 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Activity className="w-64 h-64 text-amber-400" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                PROVENANCE: TODD JEFFREY ITES JR. (TJ)
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                ANCHOR: MAESTRO_AGE_2026
              </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              DAISY & Agate Core Autonomous Engine
            </h1>
            <p className="text-sm text-slate-400 max-w-2xl mt-1">
              Distributed Autonomous Software Intelligence Yield Engine with EVC Real-Time Cost Tracking, Reinforcement Learning Optimizer, Zero-Downtime Hot-Swapping, and 380-Byte MMTAI Routing.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={refreshState}
              className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium border border-slate-700 flex items-center gap-2 transition"
            >
              <RefreshCw className="w-4 h-4" />
              Sync Telemetry
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-slate-800">
          <button
            onClick={() => setActiveTab('evc')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition ${
              activeTab === 'evc'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            EVC Real-Time Cost Engine
          </button>
          <button
            onClick={() => setActiveTab('optimizer')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition ${
              activeTab === 'optimizer'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Zap className="w-4 h-4" />
            AI Optimizer & Mutations
          </button>
          <button
            onClick={() => setActiveTab('hotswap')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition ${
              activeTab === 'hotswap'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            Hot-Swap & Circuit Breakers
          </button>
          <button
            onClick={() => setActiveTab('mmtai')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition ${
              activeTab === 'mmtai'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Radio className="w-4 h-4" />
            MMTAI 380-Byte Router
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition ${
              activeTab === 'security'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Shield className="w-4 h-4" />
            Master Security Test Suite
          </button>
        </div>
      </div>

      {/* TAB 1: EVC COST ENGINE */}
      {activeTab === 'evc' && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-white">
              <div className="text-xs text-slate-400 font-medium">Cluster Hourly Cost</div>
              <div className="text-2xl font-bold text-amber-400 mt-1">${evcSummary.totalCostHr} / hr</div>
              <div className="text-xs text-slate-500 mt-1">Real-time EVC hardware burn</div>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-white">
              <div className="text-xs text-slate-400 font-medium">Projected Daily Cost</div>
              <div className="text-2xl font-bold text-white mt-1">${evcSummary.totalCostDay} / day</div>
              <div className="text-xs text-slate-500 mt-1">24-hour continuous run rate</div>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-white">
              <div className="text-xs text-slate-400 font-medium">Projected Monthly Cost</div>
              <div className="text-2xl font-bold text-white mt-1">${evcSummary.totalCostMonth} / mo</div>
              <div className="text-xs text-slate-500 mt-1">30-day billing cycle projection</div>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-white">
              <div className="text-xs text-slate-400 font-medium">Over-Budget Bubbles</div>
              <div className={`text-2xl font-bold mt-1 ${evcSummary.overBudgetCount > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                {evcSummary.overBudgetCount} / {evcSummary.bubblesCount}
              </div>
              <div className="text-xs text-slate-500 mt-1">
                {evcSummary.overBudgetCount > 0 ? 'Budget alert triggered' : 'All within viability bounds'}
              </div>
            </div>
          </div>

          {/* EVC Alert Feed */}
          {evcAlerts.length > 0 && (
            <div className="bg-rose-950/40 border border-rose-900/60 rounded-xl p-4 text-rose-200">
              <div className="flex items-center gap-2 font-semibold text-sm mb-2 text-rose-300">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                Active EVC Budget Enforcement Alerts
              </div>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {evcAlerts.map((alert, idx) => (
                  <div key={idx} className="text-xs bg-rose-900/30 p-2 rounded border border-rose-800/40 flex justify-between items-center">
                    <span>{alert.message}</span>
                    <span className="font-mono text-rose-400">{new Date(alert.timestamp).toLocaleTimeString()}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Active Bubble Cost Breakdown & Ingest Tool */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Table */}
            <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-5 text-white">
              <h2 className="text-sm font-semibold mb-4 flex items-center justify-between">
                <span>Active Bubble Telemetry & EVC Cost Breakdown</span>
                <span className="text-xs text-slate-400">Regional Multipliers Applied</span>
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="text-slate-400 border-b border-slate-800 pb-2">
                    <tr>
                      <th className="pb-2">Bubble ID</th>
                      <th className="pb-2">Region</th>
                      <th className="pb-2">CPU / RAM</th>
                      <th className="pb-2">I/O / Storage</th>
                      <th className="pb-2">Cost/Hr</th>
                      <th className="pb-2">Budget/Hr</th>
                      <th className="pb-2">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {evcSummary.breakdown.map((s) => (
                      <tr key={s.bubbleId} className="hover:bg-slate-800/30">
                        <td className="py-3 font-mono text-amber-300">{s.bubbleId}</td>
                        <td className="py-3 font-mono text-slate-300">{s.region} (x{s.regionMultiplier})</td>
                        <td className="py-3 text-slate-300">{s.cpuCores}c / {s.memoryGB}GB</td>
                        <td className="py-3 text-slate-300">{s.ioTransferGBHr}GB / {s.storageGB}GB</td>
                        <td className="py-3 font-mono font-semibold text-slate-200">${s.totalCostHr}</td>
                        <td className="py-3 font-mono text-slate-400">${s.evcBudgetHr}</td>
                        <td className="py-3">
                          {s.isOverBudget ? (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">
                              OVER x{s.scalingFactor}
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                              VIABLE
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Ingest Form */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-white">
              <h2 className="text-sm font-semibold mb-3">Simulate Node Metric Ingestion</h2>
              <p className="text-xs text-slate-400 mb-4">
                Ingest real-time Prometheus / cAdvisor metrics directly into the DAISY EVC engine.
              </p>
              <form onSubmit={handleIngestBubble} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">Bubble ID</label>
                  <input
                    type="text"
                    value={newBubbleInput.bubbleId}
                    onChange={(e) => setNewBubbleInput({ ...newBubbleInput, bubbleId: e.target.value })}
                    placeholder="e.g. bubble-delta-logistics"
                    className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-400 mb-1">Region</label>
                    <select
                      value={newBubbleInput.region}
                      onChange={(e) => setNewBubbleInput({ ...newBubbleInput, region: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white"
                    >
                      {Object.keys(REGION_MULTIPLIERS).map((r) => (
                        <option key={r} value={r}>
                          {r} (x{REGION_MULTIPLIERS[r]})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">EVC Budget/Hr ($)</label>
                    <input
                      type="number"
                      step="0.05"
                      value={newBubbleInput.evcBudgetHr}
                      onChange={(e) => setNewBubbleInput({ ...newBubbleInput, evcBudgetHr: parseFloat(e.target.value) || 0.1 })}
                      className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white font-mono"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-400 mb-1">CPU Cores</label>
                    <input
                      type="number"
                      value={newBubbleInput.cpuCores}
                      onChange={(e) => setNewBubbleInput({ ...newBubbleInput, cpuCores: parseInt(e.target.value) || 1 })}
                      className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">RAM (GB)</label>
                    <input
                      type="number"
                      value={newBubbleInput.memoryGB}
                      onChange={(e) => setNewBubbleInput({ ...newBubbleInput, memoryGB: parseInt(e.target.value) || 1 })}
                      className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full mt-2 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded transition flex items-center justify-center gap-2"
                >
                  <DollarSign className="w-4 h-4" />
                  Ingest & Calculate Viability
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: AI OPTIMIZER & GRAPH MUTATIONS */}
      {activeTab === 'optimizer' && (
        <div className="space-y-6">
          {/* Reward Function Formula Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-white">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-sm font-semibold text-amber-400">
                  DAISY Reinforcement Learning Reward Engine
                </h2>
                <div className="font-mono text-xs bg-slate-950 p-3 rounded mt-2 border border-slate-800 text-slate-300">
                  Reward = (Speed + Stability) / (InfrastructureCost + ComplianceRisk + ε)
                </div>
              </div>
              <button
                onClick={handleRunOptimizerCycle}
                disabled={isOptimizing}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg transition flex items-center gap-2 shadow-lg shadow-amber-500/20 disabled:opacity-50"
              >
                <Zap className={`w-4 h-4 ${isOptimizing ? 'animate-spin' : ''}`} />
                {isOptimizing ? 'Executing Cycle...' : 'Run Autonomous Mutation Cycle'}
              </button>
            </div>

            {/* Score Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-4 pt-4 border-t border-slate-800">
              <div className="bg-slate-950/60 p-3 rounded border border-slate-800/80">
                <div className="text-[10px] text-slate-400 uppercase">System Reward (R)</div>
                <div className="text-xl font-bold text-amber-400 mt-1">{optReward.systemReward}</div>
              </div>
              <div className="bg-slate-950/60 p-3 rounded border border-slate-800/80">
                <div className="text-[10px] text-slate-400 uppercase">Speed Score</div>
                <div className="text-xl font-bold text-emerald-400 mt-1">{optReward.speedScore}</div>
              </div>
              <div className="bg-slate-950/60 p-3 rounded border border-slate-800/80">
                <div className="text-[10px] text-slate-400 uppercase">Stability Score</div>
                <div className="text-xl font-bold text-cyan-400 mt-1">{optReward.stabilityScore}</div>
              </div>
              <div className="bg-slate-950/60 p-3 rounded border border-slate-800/80">
                <div className="text-[10px] text-slate-400 uppercase">Cost Penalty</div>
                <div className="text-xl font-bold text-orange-400 mt-1">{optReward.costScore}</div>
              </div>
              <div className="bg-slate-950/60 p-3 rounded border border-slate-800/80">
                <div className="text-[10px] text-slate-400 uppercase">Risk Penalty</div>
                <div className="text-xl font-bold text-rose-400 mt-1">{optReward.riskScore}</div>
              </div>
            </div>
            <div className="mt-3 text-[11px] text-slate-400 font-mono flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              Graph Fingerprint SHA-256: <span className="text-slate-300">{optFingerprint}</span>
            </div>
          </div>

          {/* Active Nodes & 8D Vector Embeddings */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-white">
            <h2 className="text-sm font-semibold mb-3 flex items-center justify-between">
              <span>Graph Nodes & 8-Dimensional Vector Embeddings</span>
              <span className="text-xs text-slate-400">Inject Fault to Test Self-Healing Mutations</span>
            </h2>
            <div className="space-y-3">
              {optNodes.map((n) => {
                const embedding = globalDaisyOptimizer.computeNodeEmbedding(n);
                const rewardBreakdown = globalDaisyOptimizer.computeReward(n);
                return (
                  <div key={n.id} className="bg-slate-950 border border-slate-800 p-4 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-bold text-amber-300">{n.name}</span>
                        <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">{n.id}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                          n.status === 'HEALTHY' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                        }`}>
                          {n.status}
                        </span>
                        {n.isEuResident && (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 font-semibold">
                            GDPR ENCLAVE (EU)
                          </span>
                        )}
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-400 mt-2">
                        <div>Latency: <span className="text-white font-mono">{n.latencyMs}ms</span></div>
                        <div>Failure Rate: <span className="text-white font-mono">{(n.failureRate * 100).toFixed(2)}%</span></div>
                        <div>Node Reward: <span className="text-amber-400 font-mono font-bold">{rewardBreakdown.reward}</span></div>
                        <div>Region: <span className="text-white font-mono">{n.region}</span></div>
                      </div>
                      <div className="mt-2 text-[10px] font-mono text-slate-500 flex items-center gap-1">
                        <span>8D Embedding:</span>
                        <span className="text-slate-400 bg-slate-900 px-2 py-0.5 rounded">[{embedding.join(', ')}]</span>
                      </div>
                    </div>

                    {/* Chaos / Fault Injectors */}
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => handleInjectFault(n.id, 'LATENCY')}
                        className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs rounded border border-slate-700 transition"
                      >
                        +Latency
                      </button>
                      <button
                        onClick={() => handleInjectFault(n.id, 'FAILURE_RATE')}
                        className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-rose-300 text-xs rounded border border-slate-700 transition"
                      >
                        +Failure
                      </button>
                      <button
                        onClick={() => handleInjectFault(n.id, 'COMPLIANCE_RISK')}
                        className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-purple-300 text-xs rounded border border-slate-700 transition"
                      >
                        +Risk
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mutation History Ledger */}
          {optMutations.length > 0 && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-white">
              <h2 className="text-sm font-semibold mb-3 text-emerald-400 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Autonomous Graph Mutation Ledger (Zero-Downtime Heals)
              </h2>
              <div className="space-y-2 max-h-56 overflow-y-auto font-mono text-xs">
                {optMutations.map((m, idx) => (
                  <div key={idx} className="bg-slate-950 p-3 rounded border border-slate-800 flex justify-between items-start gap-4">
                    <div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 mr-2">
                        {m.mutationType}
                      </span>
                      <span className="text-slate-300">{m.reason}</span>
                      <div className="text-[10px] text-slate-500 mt-1">
                        Reward: {m.rewardBefore.toFixed(2)} → <span className="text-emerald-400">{m.rewardAfter.toFixed(2)}</span> | Target: {m.targetNodeId}
                      </div>
                    </div>
                    <span className="text-slate-500 text-[10px] whitespace-nowrap">{new Date(m.timestamp).toLocaleTimeString()}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: HOT-SWAP RUNTIME & CIRCUIT BREAKERS */}
      {activeTab === 'hotswap' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-white">
            <h2 className="text-sm font-semibold mb-2">DAISY Zero-Downtime Hot-Swap Runtime</h2>
            <p className="text-xs text-slate-400 mb-4">
              Autonomous gRPC bubble lifecycle manager with circuit breakers, in-flight request draining, and atomic edge rerouting.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {bubbles.map((b) => (
                <div key={b.id} className="bg-slate-950 border border-slate-800 p-4 rounded-lg flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-amber-300 text-sm">{b.name}</span>
                      <span className="text-xs font-mono text-slate-400">{b.version}</span>
                    </div>
                    <div className="text-xs font-mono text-slate-500 mt-1">{b.endpoint}</div>

                    <div className="mt-3 space-y-1.5 text-xs text-slate-300">
                      <div className="flex justify-between">
                        <span className="text-slate-400">State:</span>
                        <span className={`font-bold ${b.state === 'BubbleActive' ? 'text-emerald-400' : 'text-amber-400'}`}>
                          {b.state}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Circuit Breaker:</span>
                        <span className={`font-bold font-mono ${b.circuitState === 'CircuitClosed' ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {b.circuitState}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Avg Latency:</span>
                        <span className="font-mono">{b.avgLatencyMs}ms</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">In-Flight Requests:</span>
                        <span className="font-mono text-cyan-400">{b.activeRequests}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Failure Rate:</span>
                        <span className="font-mono">{(b.failureRate * 100).toFixed(2)}%</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleExecuteSwap(b.id)}
                    disabled={isSwapping}
                    className="mt-4 w-full py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 font-semibold rounded text-xs border border-slate-700 transition flex items-center justify-center gap-1.5 disabled:opacity-50"
                  >
                    <RotateCcw className={`w-3.5 h-3.5 ${isSwapping ? 'animate-spin' : ''}`} />
                    Execute Zero-Downtime Swap
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Swap Events History */}
          {swapLog.length > 0 && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-white">
              <h2 className="text-sm font-semibold mb-3 text-cyan-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Atomic Hot-Swap Telemetry Log
              </h2>
              <div className="space-y-2 font-mono text-xs max-h-56 overflow-y-auto">
                {swapLog.map((swap) => (
                  <div key={swap.swapId} className="bg-slate-950 p-3 rounded border border-slate-800 flex justify-between items-center">
                    <div>
                      <span className="font-bold text-amber-300">{swap.swapId}</span>: Swapped{' '}
                      <span className="text-rose-300">{swap.oldBubbleId}</span> →{' '}
                      <span className="text-emerald-300">{swap.newBubbleId}</span> | Drained: {swap.drainedRequests} reqs
                    </div>
                    <div className="text-[10px] text-slate-500">
                      Duration: <span className="text-emerald-400 font-bold">{swap.durationMs}ms</span> | {new Date(swap.startTime).toLocaleTimeString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: MMTAI 380-BYTE ROUTER */}
      {activeTab === 'mmtai' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input & Validator */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-white">
              <h2 className="text-sm font-semibold mb-2">MMTAI 380-Byte Perimeter Router</h2>
              <p className="text-xs text-slate-400 mb-4">
                Enforces exact 380-character perimeter verification (316 bytes body + 64 bytes SHA-256 integrity hash).
              </p>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">Payload / File ID</label>
                  <input
                    type="text"
                    value={fileIdInput}
                    onChange={(e) => setFileIdInput(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white font-mono"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-slate-400">Cryptographic Perimeter Header (Exact 380 Chars)</label>
                    <span className={`font-mono font-bold ${customHeader.length === 380 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {customHeader.length} / 380 Chars
                    </span>
                  </div>
                  <textarea
                    rows={4}
                    value={customHeader}
                    onChange={(e) => setCustomHeader(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white font-mono text-[11px] break-all"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setCustomHeader(globalMMTAIRouter.generateValidPerimeterHeader('NODE-01'))}
                    className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded font-semibold transition"
                  >
                    Generate Valid 380-Byte Header
                  </button>
                  <button
                    onClick={handleExecuteRouting}
                    className="flex-1 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded font-bold transition flex items-center justify-center gap-1.5"
                  >
                    <Play className="w-4 h-4" />
                    Dispatch Through MMTAI 5-Hop Nodes
                  </button>
                </div>
              </div>
            </div>

            {/* Live Routing Result & 5-Hop Visualization */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-white">
              <h2 className="text-sm font-semibold mb-3">5-Hop Traversal & Telemetry Result</h2>
              {routingResult ? (
                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded bg-slate-950 border border-slate-800 flex justify-between items-center">
                    <div>
                      <div className="text-slate-400">Gatekeeper Verification:</div>
                      <div className={`font-bold text-sm ${routingResult.authorized ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {routingResult.status === 'DELIVERED' ? 'PASS (380-Byte Verified)' : 'REJECTED (Perimeter Violation)'}
                      </div>
                    </div>
                    <div className="text-right font-mono">
                      <div className="text-slate-400">Total Latency:</div>
                      <div className="font-bold text-amber-400">{routingResult.totalLatencyMs}ms</div>
                    </div>
                  </div>

                  {/* 5-Hop Visualization */}
                  <div className="space-y-2">
                    <div className="text-[11px] text-slate-400 font-semibold uppercase">5-Hop Path Traversal:</div>
                    {routingResult.routingHops.length > 0 ? (
                      routingResult.routingHops.map((hop) => (
                        <div key={hop.step} className="bg-slate-950 p-2.5 rounded border border-slate-800 flex items-center justify-between font-mono">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-[10px] font-bold">
                              {hop.step}
                            </span>
                            <span className="text-white font-semibold">{hop.node}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-slate-400">{hop.latencyMs}ms</span>
                            <span className="text-emerald-400 font-bold text-[10px] bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                              PASS
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-3 bg-rose-950/40 text-rose-300 rounded border border-rose-900/60">
                        Packet was rejected at Gatekeeper perimeter prior to node traversal.
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="h-48 flex items-center justify-center text-slate-500 text-xs border border-dashed border-slate-800 rounded-lg">
                  Awaiting 380-byte packet traversal...
                </div>
              )}
            </div>
          </div>

          {/* Consensus Ledger View */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-white">
            <h2 className="text-sm font-semibold mb-3 flex items-center justify-between">
              <span>Tamper-Evident Consensus Vault (consensus_memory.json)</span>
              <span className="text-xs text-slate-400 font-mono">SHA-256 Signatures Enforced</span>
            </h2>
            <div className="space-y-2 max-h-56 overflow-y-auto font-mono text-xs">
              {consensusLedger.map((entry, idx) => (
                <div key={idx} className="bg-slate-950 p-3 rounded border border-slate-800">
                  <div className="flex justify-between text-slate-300">
                    <span className="text-amber-400 font-bold">{entry.log.event}</span>
                    <span className="text-slate-500 text-[10px]">{entry.log.timestamp}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">
                    Node: {entry.log.node} | Hops: {entry.log.hops} | Latency: {entry.log.latencyMs}ms
                  </div>
                  <div className="text-[9px] text-slate-600 truncate mt-1">
                    Sig: {entry.signature}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: MASTER SECURITY TEST SUITE */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-white">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div>
                <h2 className="text-sm font-semibold text-amber-400">
                  Perimeter Intrusion, Flood, & Stress Testing Engine
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Executes the exact SolveX test sequence: Legitimate traffic, Unauthorized trespass, 100-packet flood, and 1,000-packet stress test.
                </p>
              </div>

              <button
                onClick={() => handleRunSecuritySuite('master')}
                disabled={isRunningTests}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg transition flex items-center gap-2 shadow-lg shadow-amber-500/20 disabled:opacity-50"
              >
                <Shield className={`w-4 h-4 ${isRunningTests ? 'animate-spin' : ''}`} />
                {isRunningTests ? 'Executing Master Sequence...' : 'Execute Master Test Sequence (All 4)'}
              </button>
            </div>

            {/* Individual Runners */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-800">
              <button
                onClick={() => handleRunSecuritySuite('legit')}
                disabled={isRunningTests}
                className="p-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-left transition disabled:opacity-50"
              >
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Test 1</div>
                <div className="text-xs font-bold text-white mt-1">Legitimate Traffic</div>
                <div className="text-[10px] text-emerald-400 mt-1">Valid 380B Header</div>
              </button>

              <button
                onClick={() => handleRunSecuritySuite('trespass')}
                disabled={isRunningTests}
                className="p-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-left transition disabled:opacity-50"
              >
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Test 2</div>
                <div className="text-xs font-bold text-white mt-1">Trespass Injection</div>
                <div className="text-[10px] text-rose-400 mt-1">Assert Immediate Drop</div>
              </button>

              <button
                onClick={() => handleRunSecuritySuite('flood100')}
                disabled={isRunningTests}
                className="p-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-left transition disabled:opacity-50"
              >
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Test 3</div>
                <div className="text-xs font-bold text-white mt-1">100-Packet Flood</div>
                <div className="text-[10px] text-amber-400 mt-1">100/100 Malformed Drop</div>
              </button>

              <button
                onClick={() => handleRunSecuritySuite('stress1000')}
                disabled={isRunningTests}
                className="p-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-left transition disabled:opacity-50"
              >
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Test 4</div>
                <div className="text-xs font-bold text-white mt-1">1,000-Packet Stress</div>
                <div className="text-[10px] text-cyan-400 mt-1">Zero Breach Invariant</div>
              </button>
            </div>
          </div>

          {/* Test Reports Stream */}
          {testReports.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-sm font-semibold text-white">Forensic Test Execution Reports</h2>
              {testReports.map((r, idx) => (
                <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-white">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      {r.passed ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <XCircle className="w-5 h-5 text-rose-400" />
                      )}
                      <span className="font-bold text-sm text-white">{r.testSuiteName}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        r.passed ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      }`}>
                        {r.passed ? 'PASS' : 'FAIL'}
                      </span>
                    </div>
                    <span className="text-xs text-slate-500 font-mono">{new Date(r.timestamp).toLocaleTimeString()}</span>
                  </div>

                  <p className="text-xs text-slate-300 mb-4 bg-slate-950 p-2.5 rounded border border-slate-800 font-mono">
                    {r.statusMessage}
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
                    <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
                      <div className="text-slate-400 text-[10px]">Transmitted</div>
                      <div className="font-bold text-white mt-0.5 font-mono">{r.totalTransmitted}</div>
                    </div>
                    <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
                      <div className="text-slate-400 text-[10px]">Safely Dropped</div>
                      <div className="font-bold text-emerald-400 mt-0.5 font-mono">{r.successfullyDropped}</div>
                    </div>
                    <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
                      <div className="text-slate-400 text-[10px]">Breaches</div>
                      <div className={`font-bold mt-0.5 font-mono ${r.breachesDetected === 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {r.breachesDetected}
                      </div>
                    </div>
                    <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
                      <div className="text-slate-400 text-[10px]">Avg Latency</div>
                      <div className="font-bold text-amber-400 mt-0.5 font-mono">{r.avgLatencyMs}ms</div>
                    </div>
                    <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
                      <div className="text-slate-400 text-[10px]">p99 Latency</div>
                      <div className="font-bold text-cyan-400 mt-0.5 font-mono">{r.p99LatencyMs}ms</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
