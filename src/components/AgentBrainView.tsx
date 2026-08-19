import { useState, useEffect } from 'react';
import { AgentBrainState, AgenticGoalNode, ExecutionLog, TrueThoughtLogicBubble, TetherSynapticLoopCycle } from '../types';
import { 
  executeRecursiveReasoningStep, 
  executeUnifiedDaisyBrainRun, 
  UnifiedBrainRunResult,
  runTetherBubbleSynapticQuery,
  VerifiableDomainCategory,
  TetherSynapticTruthResult,
  solveNewProblemWithDaisyLLM,
  INITIAL_DAISY_LLM_MODEL,
  DaisySelfBuiltLLMModel,
  DaisyProblemSolutionResult,
  executeTetherSynapticRecursiveCycle,
  TRUE_THOUGHT_LOGIC_BUBBLES,
  TETHER_SYNAPTIC_LOOP_CYCLES
} from '../engine/agenticBrainEngine';
import { DAISY_54_NODES } from '../engine/daisyEngine';
import { PARADOX_88_RULES, CATALOG_105_PARADOX_SOLUTIONS } from '../engine/paradoxEngine';
import { 
  Brain, 
  GitBranch, 
  Sparkles, 
  Activity, 
  RefreshCw, 
  CheckCircle2, 
  Play, 
  Pause,
  Cpu,
  Layers,
  HelpCircle,
  Zap,
  Globe,
  Network,
  ChevronRight,
  ShieldCheck,
  Database,
  Lock,
  Workflow,
  ShoppingBag,
  Terminal,
  FileCode,
  Award,
  BookOpen,
  Search,
  ExternalLink,
  Check,
  CircleDot,
  Lightbulb
} from 'lucide-react';

interface AgentBrainViewProps {
  brainState: AgentBrainState;
  onUpdateGoal: (updatedGoal: AgenticGoalNode) => void;
  onAddLog: (log: ExecutionLog) => void;
}

export function AgentBrainView({
  brainState,
  onUpdateGoal,
  onAddLog
}: AgentBrainViewProps) {
  const [activeTab, setActiveTab] = useState<'tether_recursive_loop' | 'goals' | 'braintree' | 'synaptic_truth' | 'daisy_llm_solver'>('tether_recursive_loop');
  const [selectedGoal, setSelectedGoal] = useState<AgenticGoalNode | null>(brainState.activeGoals[0] || null);
  const [isReasoning, setIsReasoning] = useState(false);
  const [lastUnifiedRun, setLastUnifiedRun] = useState<UnifiedBrainRunResult | null>(null);
  const [isRunningUnified, setIsRunningUnified] = useState(false);
  const [expandedChamber, setExpandedChamber] = useState<string | null>('chamber-3');

  // Tether Synaptic Autonomous Recursive Loop State (88 Paradoxes ⊗ 48 Proprietary ⊗ 54 Nodes)
  const [isAutoLoopRunning, setIsAutoLoopRunning] = useState<boolean>(true);
  const [loopSpeedMs, setLoopSpeedMs] = useState<number>(2000);
  const [cycleIndex, setCycleIndex] = useState<number>(1);
  const [latestCycle, setLatestCycle] = useState<TetherSynapticLoopCycle | null>(null);
  const [logicBubbles, setLogicBubbles] = useState<TrueThoughtLogicBubble[]>([...TRUE_THOUGHT_LOGIC_BUBBLES]);
  const [cycleLogs, setCycleLogs] = useState<TetherSynapticLoopCycle[]>([...TETHER_SYNAPTIC_LOOP_CYCLES]);

  // Automatic Firing Loop Effect
  useEffect(() => {
    let interval: any = null;
    if (isAutoLoopRunning) {
      interval = setInterval(() => {
        setCycleIndex(prev => {
          const nextCycle = prev + 1;
          const { cycleTelemetry } = executeTetherSynapticRecursiveCycle(brainState, nextCycle);
          setLatestCycle(cycleTelemetry);
          setLogicBubbles([...TRUE_THOUGHT_LOGIC_BUBBLES]);
          setCycleLogs([...TETHER_SYNAPTIC_LOOP_CYCLES]);
          return nextCycle;
        });
      }, loopSpeedMs);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoLoopRunning, loopSpeedMs, brainState]);

  const handleManualCycleStep = () => {
    const nextCycle = cycleIndex + 1;
    setCycleIndex(nextCycle);
    const { cycleTelemetry } = executeTetherSynapticRecursiveCycle(brainState, nextCycle);
    setLatestCycle(cycleTelemetry);
    setLogicBubbles([...TRUE_THOUGHT_LOGIC_BUBBLES]);
    setCycleLogs([...TETHER_SYNAPTIC_LOOP_CYCLES]);

    onAddLog({
      id: `LOG-LOOP-${Date.now()}`,
      timestamp: new Date().toLocaleString(),
      agentName: 'Tether Bubble Synaptic Loop',
      actionType: 'Recursive Firing Step',
      details: `Fired Cycle #${nextCycle}: Connected Paradox Rule #${cycleTelemetry.activeParadoxRule} + Proprietary Solver #${cycleTelemetry.activeProprietaryParadox} to 54-Node #${cycleTelemetry.activeDaisyNode}. Resonant Freq: ${cycleTelemetry.tetherResonanceFrequency}.`,
      status: 'success',
      entityId: `CYCLE-${nextCycle}`,
      entityType: 'Workflow'
    });
  };

  // Tether Synaptic Interactive Terminal State
  const [synapticQueryText, setSynapticQueryText] = useState<string>(
    'SOX 404 double-entry general ledger voucher compliance and ISO 20022 wire transfer protocol invariants'
  );
  const [targetCategory, setTargetCategory] = useState<VerifiableDomainCategory>(
    '.edu (Academic & University Research)'
  );
  const [isEvaluatingTruth, setIsEvaluatingTruth] = useState<boolean>(false);
  const [lastTruthResult, setLastTruthResult] = useState<TetherSynapticTruthResult | null>(null);

  // Self-Built Daisy Sovereign LLM State
  const [llmModel, setLlmModel] = useState<DaisySelfBuiltLLMModel>(INITIAL_DAISY_LLM_MODEL);
  const [customProblemInput, setCustomProblemInput] = useState<string>(
    'Cross-border tariff surcharge anomaly and freight line-item mismatch during multi-vendor invoice reconciliation'
  );
  const [selectedSolverDomain, setSelectedSolverDomain] = useState<VerifiableDomainCategory>(
    'World Economics (World Bank, IMF, OECD, Fed)'
  );
  const [isSolvingProblem, setIsSolvingProblem] = useState<boolean>(false);
  const [lastProblemSolution, setLastProblemSolution] = useState<DaisyProblemSolutionResult | null>(null);

  const handleSolveCustomProblem = () => {
    if (!customProblemInput.trim()) return;
    setIsSolvingProblem(true);

    setTimeout(() => {
      const solution = solveNewProblemWithDaisyLLM(
        customProblemInput,
        selectedSolverDomain,
        brainState,
        llmModel
      );

      setLastProblemSolution(solution);
      setLlmModel(solution.updatedLLMModel);
      onUpdateGoal(solution.spawnedGoalNode);
      setSelectedGoal(solution.spawnedGoalNode);
      setIsSolvingProblem(false);

      onAddLog({
        id: `LOG-${Date.now()}`,
        timestamp: new Date().toLocaleString(),
        agentName: 'Daisy Self-Built Sovereign LLM',
        actionType: 'Autonomous Problem Resolution',
        details: `Solved problem: "${customProblemInput.slice(0, 40)}..." using 128B MoE Transformer & ${selectedSolverDomain}. Proof: ${solution.completionProofHash}`,
        status: 'success',
        entityId: solution.solutionId,
        entityType: 'Workflow'
      });
    }, 1000);
  };

  const handleRunSynapticTruthCheck = () => {
    if (!synapticQueryText.trim()) return;
    setIsEvaluatingTruth(true);

    setTimeout(() => {
      const { truthResult, updatedBrainState, newGoalNode } = runTetherBubbleSynapticQuery(
        synapticQueryText,
        targetCategory,
        brainState
      );

      setLastTruthResult(truthResult);
      onUpdateGoal(newGoalNode);
      setSelectedGoal(newGoalNode);
      setIsEvaluatingTruth(false);

      onAddLog({
        id: `LOG-${Date.now()}`,
        timestamp: new Date().toLocaleString(),
        agentName: 'Tether Bubble Synaptic Truth Engine',
        actionType: 'Online Truth Cross-Match',
        details: `Verified "${synapticQueryText.slice(0, 45)}..." against ${targetCategory}. Truth Score: ${truthResult.verifiedTruthScore}%. Proof Hash: ${truthResult.verifiablyTrueProofHash}`,
        status: 'success',
        entityId: truthResult.queryId,
        entityType: 'Workflow'
      });
    }, 900);
  };

  const handleRunUnifiedBrain = () => {
    setIsRunningUnified(true);
    setTimeout(() => {
      const res = executeUnifiedDaisyBrainRun(onAddLog);
      setLastUnifiedRun(res);
      setIsRunningUnified(false);
    }, 800);
  };

  const handleRunRecursiveStep = () => {
    if (!selectedGoal) return;
    setIsReasoning(true);

    setTimeout(() => {
      const updated = executeRecursiveReasoningStep(selectedGoal);
      onUpdateGoal(updated);
      setSelectedGoal(updated);
      setIsReasoning(false);

      onAddLog({
        id: `LOG-${Date.now()}`,
        timestamp: new Date().toLocaleString(),
        agentName: 'Agentic Cognitive Core',
        actionType: 'Recursive Reasoning Pass',
        details: `Advanced goal "${updated.goalTitle}" to depth ${updated.recursionDepth}/${updated.maxDepth}. Confidence: ${(updated.confidenceScore * 100).toFixed(1)}%`,
        status: updated.executionStatus === 'solved' ? 'success' : 'in_progress',
        entityId: updated.id,
        entityType: 'Workflow'
      });
    }, 700);
  };

  // Organize 54 Daisy Nodes into 9 Cognitive Chambers for the Daisy Brain Tree
  const brainChambers = [
    {
      id: 'chamber-1',
      title: 'Chamber I: Ingestion & Document OCR Tokenizer',
      range: 'Nodes 01 - 06',
      icon: FileCode,
      color: 'text-blue-400 border-blue-500/30 bg-blue-500/10',
      nodes: DAISY_54_NODES.slice(0, 6),
      description: 'Ingests raw multi-format B2B documents, parses line-item tax IDs, barcodes, and EDI protocols.'
    },
    {
      id: 'chamber-2',
      title: 'Chamber II: 3-Way Reconciliation & PO Matcher',
      range: 'Nodes 07 - 12',
      icon: Workflow,
      color: 'text-purple-400 border-purple-500/30 bg-purple-500/10',
      nodes: DAISY_54_NODES.slice(6, 12),
      description: 'Performs line-by-line PO-Invoice-GRN three-way matching, tolerance validation, and discount optimization.'
    },
    {
      id: 'chamber-3',
      title: 'Chamber III: Tether Bubble Synaptic Paradox Mesh (88 Paradoxes)',
      range: 'Nodes 13 - 20',
      icon: Cpu,
      color: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
      nodes: DAISY_54_NODES.slice(12, 20),
      description: 'Evaluates 88 paradox rules, neutralizes financial discrepancies, and executes Tether Bubble Synaptic parity checks.'
    },
    {
      id: 'chamber-4',
      title: 'Chamber IV: UAREFAKE Risk & Sovereign Autonomous Outreach',
      range: 'Nodes 21 - 28',
      icon: ShieldCheck,
      color: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
      nodes: DAISY_54_NODES.slice(20, 28),
      description: 'Sweeps payload stream for zero deepfake intrusion, verifies sanction lists, and dispatches autonomous signals.'
    },
    {
      id: 'chamber-5',
      title: 'Chamber V: Double-Entry ERP Ledger & SOX 404 Sentinel',
      range: 'Nodes 29 - 34',
      icon: Database,
      color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
      nodes: DAISY_54_NODES.slice(28, 34),
      description: 'Posts balanced DR/CR voucher journal entries into SAP, NetSuite, Oracle, and Microsoft Dynamics ERP systems.'
    },
    {
      id: 'chamber-6',
      title: 'Chamber VI: ISO 20022 Treasury & Smart Escrow Dispatch',
      range: 'Nodes 35 - 40',
      icon: Zap,
      color: 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10',
      nodes: DAISY_54_NODES.slice(34, 40),
      description: 'Dispatches ISO 20022 XML ACH/SWIFT payments and releases multi-sig smart contract escrow allocations.'
    },
    {
      id: 'chamber-7',
      title: 'Chamber VII: Logistics Telemetry & JIT Software AST Compiler',
      range: 'Nodes 41 - 46',
      icon: Terminal,
      color: 'text-orange-400 border-orange-500/30 bg-orange-500/10',
      nodes: DAISY_54_NODES.slice(40, 46),
      description: 'Monitors RFID/IoT supply chain telemetry and dynamically synthesizes JIT code modules in memory.'
    },
    {
      id: 'chamber-8',
      title: 'Chamber VIII: MMTAI Zero-Trust & Quantum-Safe Signatures',
      range: 'Nodes 47 - 50',
      icon: Lock,
      color: 'text-pink-400 border-pink-500/30 bg-pink-500/10',
      nodes: DAISY_54_NODES.slice(46, 50),
      description: 'Issues quantum-resistant HMAC-SHA256 signatures and writes immutable hash logs to sovereign audit vault.'
    },
    {
      id: 'chamber-9',
      title: 'Chamber IX: B2B Solutions Marketplace Exchange (105 Solutions)',
      range: 'Nodes 51 - 54',
      icon: ShoppingBag,
      color: 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10',
      nodes: DAISY_54_NODES.slice(50, 54),
      description: 'Broadcasts multi-supplier RFQs, executes real-time spot market bidding, and releases enterprise solutions.'
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-950/80 via-slate-900 to-orange-950/80 border border-amber-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Brain className="w-64 h-64 text-amber-400" />
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-mono tracking-wider uppercase font-semibold">
                MMTAI Agentic Cognitive Core
              </span>
              <span className="text-xs text-slate-400 font-mono">Recursive Reasoning & Goal Decomposition</span>
            </div>
            <h1 className="text-2xl font-bold text-white mt-1">Agentic Brain & Multi-Depth Decision Engine</h1>
            <p className="text-xs text-slate-300 max-w-2xl mt-1">
              Autonomous self-reflecting cognitive agent loops that evaluate complex enterprise goals, recursively decompose multi-step execution graphs, and self-correct discrepancies.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={handleRunUnifiedBrain}
              disabled={isRunningUnified}
              className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl text-xs flex items-center space-x-2 transition-all shadow-lg shadow-amber-500/20 disabled:opacity-50"
            >
              <Zap className={`w-4 h-4 fill-current ${isRunningUnified ? 'animate-bounce' : ''}`} />
              <span>{isRunningUnified ? 'Running 54-Node Master Loop...' : 'Execute Unified Brain Loop'}</span>
            </button>
            <div className="bg-slate-950/80 border border-amber-500/30 rounded-xl p-3 text-right">
              <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                Cognitive Load
              </span>
              <p className="text-xl font-bold text-amber-400 font-mono">{brainState.cognitiveLoadPct}%</p>
            </div>
          </div>
        </div>

        {/* Master Unified Run Telemetry Result */}
        {lastUnifiedRun && (
          <div className="mt-4 p-4 bg-slate-950/90 border border-emerald-500/40 rounded-xl space-y-2 text-xs font-mono">
            <div className="flex items-center justify-between text-emerald-400 font-bold">
              <span className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>UNIFIED DAISY HAMINJA COGNITIVE RUN COMPLETE</span>
              </span>
              <span className="text-slate-400 text-[10px]">{lastUnifiedRun.timestamp}</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px] text-slate-300">
              <div>Nodes: <strong className="text-amber-400">{lastUnifiedRun.daisyNodesProcessed}/54</strong></div>
              <div>Paradoxes: <strong className="text-emerald-400">{lastUnifiedRun.paradoxesAudited} Passed</strong></div>
              <div>UAREFAKE Score: <strong className="text-cyan-400">{lastUnifiedRun.uarefakeAuthenticityScore}%</strong></div>
              <div>SOX 404 Hash: <strong className="text-purple-400">{lastUnifiedRun.sox404LedgerHash}</strong></div>
            </div>
          </div>
        )}

        {/* Cognitive Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800/80">
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3">
            <p className="text-[10px] text-slate-400 font-medium">Active Autonomous Agents</p>
            <p className="text-lg font-bold text-white">{brainState.activeAgentsCount} Agents</p>
          </div>
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3">
            <p className="text-[10px] text-slate-400 font-medium">Memory Buffer Tokens</p>
            <p className="text-lg font-bold text-amber-400 font-mono">{brainState.memoryBufferLength.toLocaleString()} tokens</p>
          </div>
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3">
            <p className="text-[10px] text-slate-400 font-medium">Reasoning Parity</p>
            <p className="text-lg font-bold text-emerald-400">99.8%</p>
          </div>
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3">
            <p className="text-[10px] text-slate-400 font-medium">Cognitive Engine Status</p>
            <p className="text-lg font-bold text-cyan-400">ONLINE / REFLECTING</p>
          </div>
        </div>
      </div>

      {/* View Mode Navigation Switcher */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('tether_recursive_loop')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all ${
            activeTab === 'tether_recursive_loop'
              ? 'bg-gradient-to-r from-amber-500 to-purple-500 text-slate-950 shadow-lg shadow-purple-500/20'
              : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <CircleDot className="w-4 h-4 text-purple-300 animate-pulse" />
          <span>Tether Synaptic Loop & Logic Bubbles</span>
          <span className="px-1.5 py-0.5 text-[9px] bg-slate-950/80 text-amber-300 rounded-full font-mono">
            88⊗48⊗54
          </span>
        </button>

        <button
          onClick={() => setActiveTab('braintree')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all ${
            activeTab === 'braintree'
              ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
              : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Network className="w-4 h-4" />
          <span>Daisy Brain Tree (54 Nodes)</span>
        </button>

        <button
          onClick={() => setActiveTab('goals')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all ${
            activeTab === 'goals'
              ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
              : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <GitBranch className="w-4 h-4" />
          <span>Goal Decomposition Graphs & Paradox Sync</span>
        </button>

        <button
          onClick={() => setActiveTab('synaptic_truth')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all ${
            activeTab === 'synaptic_truth'
              ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
              : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Globe className="w-4 h-4 text-cyan-400" />
          <span>Tether Bubble Synaptic Truth System (.edu, Wiki, Tech, Finance, Macro)</span>
        </button>

        <button
          onClick={() => setActiveTab('daisy_llm_solver')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all ${
            activeTab === 'daisy_llm_solver'
              ? 'bg-purple-500 text-slate-950 shadow-lg shadow-purple-500/20'
              : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Brain className="w-4 h-4 text-purple-300" />
          <span>Self-Built Daisy Sovereign LLM & Problem Solver</span>
        </button>
      </div>

      {/* TAB 0: TETHER BUBBLE SYNAPTIC RECURSIVE LOOP & TRUE THOUGHT LOGIC BUBBLES */}
      {activeTab === 'tether_recursive_loop' && (
        <div className="space-y-6">
          {/* Loop Control Banner */}
          <div className="bg-slate-900 border-2 border-purple-500/40 rounded-2xl p-6 shadow-2xl space-y-6 relative overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 text-[10px] font-mono font-bold tracking-wider uppercase flex items-center space-x-1">
                    <CircleDot className="w-3 h-3 text-purple-400 animate-spin" />
                    <span>88 Paradox ⊗ 48 Proprietary ⊗ 54 Node Tether Synaptic Engine</span>
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono font-bold">
                    {isAutoLoopRunning ? 'AUTO-FIRING RECURSIVE LOOP' : 'LOOP PAUSED'}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                  <span>Autonomous Tether Bubble Synaptic Firing Loop</span>
                </h2>
                <p className="text-xs text-slate-300 max-w-3xl">
                  Recursively connects all 88 Paradox Resolution Rules that resolved the 48 Proprietary Enterprise Paradoxes across all 54 Daisy Pipeline Nodes. Any new thought stemming from a discovery is automatically synthesized into a Logic Bubble for true thought.
                </p>
              </div>

              {/* Loop Speed & Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  onClick={() => setIsAutoLoopRunning(!isAutoLoopRunning)}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center space-x-2 transition-all shadow-lg ${
                    isAutoLoopRunning
                      ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20'
                      : 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-500/20'
                  }`}
                >
                  {isAutoLoopRunning ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                  <span>{isAutoLoopRunning ? 'Pause Firing Loop' : 'Start Auto Firing Loop'}</span>
                </button>

                <button
                  onClick={handleManualCycleStep}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-purple-300 border border-purple-500/30 rounded-xl font-bold text-xs flex items-center space-x-2 transition-all"
                >
                  <Zap className="w-4 h-4 text-purple-400" />
                  <span>Manual Single Step</span>
                </button>

                <div className="flex items-center space-x-1 bg-slate-950 border border-slate-800 p-1 rounded-xl text-xs font-mono">
                  <span className="text-[10px] text-slate-400 px-2">Speed:</span>
                  {[1000, 2000, 3000].map(speed => (
                    <button
                      key={speed}
                      onClick={() => setLoopSpeedMs(speed)}
                      className={`px-2 py-1 rounded text-[10px] font-bold ${
                        loopSpeedMs === speed ? 'bg-purple-500 text-slate-950' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {speed / 1000}s
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Live Synaptic Triad Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono pt-4 border-t border-slate-800/80">
              {/* Box 1: Active 88 Paradox Rule */}
              <div className="bg-slate-950/80 border border-amber-500/40 rounded-xl p-4 space-y-2 relative overflow-hidden">
                <div className="flex items-center justify-between text-[10px] text-amber-400 font-bold">
                  <span className="uppercase tracking-widest flex items-center space-x-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>1 of 88 Paradox Rules</span>
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-amber-500/20">RULE #{((cycleIndex - 1) % 88) + 1}</span>
                </div>
                <h3 className="text-xs font-bold text-white truncate">
                  {PARADOX_88_RULES[((cycleIndex - 1) % 88)]?.title || `Paradox Rule #${((cycleIndex - 1) % 88) + 1}`}
                </h3>
                <p className="text-[10px] text-slate-400 line-clamp-2">
                  {PARADOX_88_RULES[((cycleIndex - 1) % 88)]?.auditLogic || 'Cross-referencing pricing invariants and contract clauses.'}
                </p>
                <div className="pt-2 text-[10px] text-amber-300/80 border-t border-slate-800/60 flex justify-between">
                  <span>Clause Ref: {PARADOX_88_RULES[((cycleIndex - 1) % 88)]?.clauseReference}</span>
                  <span className="text-emerald-400 font-bold">VERIFIED</span>
                </div>
              </div>

              {/* Box 2: Active 48 Proprietary Paradox Solution */}
              <div className="bg-slate-950/80 border border-purple-500/40 rounded-xl p-4 space-y-2 relative overflow-hidden">
                <div className="flex items-center justify-between text-[10px] text-purple-400 font-bold">
                  <span className="uppercase tracking-widest flex items-center space-x-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>1 of 48 Proprietary Paradoxes</span>
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-purple-500/20">SOLVER #{((cycleIndex - 1) % 48) + 1}</span>
                </div>
                <h3 className="text-xs font-bold text-white truncate">
                  {CATALOG_105_PARADOX_SOLUTIONS[40 + ((cycleIndex - 1) % 48)]?.title || `Proprietary Paradox #${((cycleIndex - 1) % 48) + 1}`}
                </h3>
                <p className="text-[10px] text-slate-400 line-clamp-2">
                  {CATALOG_105_PARADOX_SOLUTIONS[40 + ((cycleIndex - 1) % 48)]?.b2bApplication || 'Resolves Daisy Haminja treasury and Tether synaptic payload mismatches.'}
                </p>
                <div className="pt-2 text-[10px] text-purple-300/80 border-t border-slate-800/60 flex justify-between">
                  <span>Algorithm: {CATALOG_105_PARADOX_SOLUTIONS[40 + ((cycleIndex - 1) % 48)]?.solverAlgorithm}</span>
                  <span className="text-purple-400 font-bold">DEPLOYABLE</span>
                </div>
              </div>

              {/* Box 3: Active 54 Daisy Pipeline Node */}
              <div className="bg-slate-950/80 border border-cyan-500/40 rounded-xl p-4 space-y-2 relative overflow-hidden">
                <div className="flex items-center justify-between text-[10px] text-cyan-400 font-bold">
                  <span className="uppercase tracking-widest flex items-center space-x-1">
                    <Workflow className="w-3.5 h-3.5" />
                    <span>1 of 54 Daisy Nodes</span>
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-cyan-500/20">NODE #{((cycleIndex - 1) % 54) + 1}</span>
                </div>
                <h3 className="text-xs font-bold text-white truncate">
                  {DAISY_54_NODES[((cycleIndex - 1) % 54)]?.name || `Daisy Pipeline Node #${((cycleIndex - 1) % 54) + 1}`}
                </h3>
                <p className="text-[10px] text-slate-400 line-clamp-2">
                  {DAISY_54_NODES[((cycleIndex - 1) % 54)]?.config || 'Autonomous node processing pipeline transactions.'}
                </p>
                <div className="pt-2 text-[10px] text-cyan-300/80 border-t border-slate-800/60 flex justify-between">
                  <span>Category: {DAISY_54_NODES[((cycleIndex - 1) % 54)]?.category}</span>
                  <span className="text-cyan-400 font-bold">FIRING</span>
                </div>
              </div>
            </div>

            {/* Cycle Telemetry Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono pt-2">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Current Cycle Index:</span>
                <strong className="text-amber-400 text-sm">Cycle #{cycleIndex}</strong>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Tether Resonance Freq:</span>
                <strong className="text-purple-300 text-sm">{(432.88 + (cycleIndex % 88) * 0.12).toFixed(2)} Hz</strong>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Synaptic Coherence:</span>
                <strong className="text-emerald-400 text-sm">{(99.85 + (cycleIndex % 15) * 0.01).toFixed(2)}%</strong>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Logic Bubbles Generated:</span>
                <strong className="text-cyan-300 text-sm">{logicBubbles.length} True Thoughts</strong>
              </div>
            </div>
          </div>

          {/* LOGIC BUBBLES FOR TRUE THOUGHT STREAM */}
          <div className="bg-slate-900 border border-purple-500/30 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-white flex items-center space-x-2">
                  <Lightbulb className="w-5 h-5 text-amber-400" />
                  <span>Logic Bubbles for True Thought (Discovery Memory Stream)</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Every new discovery or non-linear reasoning synthesis stemming from the recursive tether loop is encapsulated into a permanent Logic Bubble inside Daisy's Brain.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-mono font-bold">
                {logicBubbles.length} Logic Bubbles Active
              </span>
            </div>

            {logicBubbles.length === 0 ? (
              <div className="p-12 text-center text-slate-500 font-mono text-xs space-y-2 border border-dashed border-slate-800 rounded-2xl">
                <Brain className="w-8 h-8 mx-auto text-slate-700 animate-pulse" />
                <p>Initializing Tether Synaptic Recursive Loop...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono">
                {logicBubbles.slice(0, 12).map((bubble) => (
                  <div key={bubble.bubbleId} className="bg-slate-950 border border-purple-500/40 rounded-2xl p-5 space-y-3 shadow-xl hover:border-purple-400/80 transition-all">
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-0.5">
                        <div className="flex items-center space-x-2">
                          <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded text-[10px] font-bold">
                            {bubble.bubbleId}
                          </span>
                          <span className="text-[10px] text-slate-400">{bubble.timestamp}</span>
                        </div>
                        <span className="text-[10px] font-bold text-purple-400 block pt-1">{bubble.discoverySource}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[9px] font-bold shrink-0">
                        TRUE THOUGHT
                      </span>
                    </div>

                    <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-xl space-y-1 text-xs">
                      <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">Synthesized Insight:</span>
                      <p className="text-slate-200 text-[11px] leading-relaxed">{bubble.coreInsight}</p>
                    </div>

                    <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                      <span className="text-[10px] font-bold text-cyan-400 uppercase block">Synthesized Actionable AST Snippet:</span>
                      <pre className="text-[10px] text-emerald-300 font-mono overflow-x-auto whitespace-pre-wrap p-2 bg-slate-900 rounded border border-slate-800">
                        {bubble.astLogicSnippet}
                      </pre>
                    </div>

                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                      <span>Category: <strong className="text-slate-300">{bubble.category}</strong></span>
                      <span className="text-purple-300 font-bold">Proof: {bubble.proofHash.slice(0, 14)}...</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 1: DAISY BRAIN TREE HIERARCHY */}
      {activeTab === 'braintree' && (
        <div className="space-y-6">
          
          {/* Master Daisy Brain Root Card */}
          <div className="bg-slate-900 border-2 border-amber-500/40 rounded-2xl p-6 shadow-2xl space-y-4 relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start space-x-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/50 flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/20">
                  <Brain className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/30">
                      ROOT NODE: DAISY-HAMINJA-SOVEREIGN-BRAIN-01
                    </span>
                    <span className="text-[10px] text-emerald-400 font-mono font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                      SYNAPTIC MESH LOCKED
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-white mt-1">Daisy Haminja Master Cognitive Brain Tree</h2>
                  <p className="text-xs text-slate-300 mt-1 max-w-3xl">
                    Hierarchical neural graph spanning 9 cognitive chambers, 54 autonomous execution nodes, 88 financial paradox solvers, UAREFAKE zero-trust authenticity checks, and SOX 404 double-entry ledgers.
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-xs font-mono shrink-0">
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-right">
                  <span className="text-[10px] text-slate-400">Total Graph Nodes</span>
                  <p className="text-base font-bold text-amber-400">54 Execution Nodes</p>
                </div>
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-right">
                  <span className="text-[10px] text-slate-400">Paradox Solvers</span>
                  <p className="text-base font-bold text-emerald-400">88 Paradox Rules</p>
                </div>
              </div>
            </div>

            {/* Tree Branch Visual Connector Lines */}
            <div className="pt-2 flex justify-center">
              <div className="w-0.5 h-6 bg-gradient-to-b from-amber-500 to-amber-500/20" />
            </div>
          </div>

          {/* 9 Chambers Cognitive Hierarchy */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <Layers className="w-4 h-4 text-amber-400" />
              <span>9 Cognitive Chambers & 54 Autonomous Node Execution Graphs</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {brainChambers.map((chamber) => {
                const isExpanded = expandedChamber === chamber.id;
                const IconComponent = chamber.icon;
                return (
                  <div
                    key={chamber.id}
                    className={`bg-slate-900 border rounded-2xl transition-all duration-200 overflow-hidden ${
                      isExpanded
                        ? 'border-amber-500/60 shadow-xl shadow-amber-500/10'
                        : 'border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div
                      onClick={() => setExpandedChamber(isExpanded ? null : chamber.id)}
                      className="p-4 cursor-pointer flex items-start justify-between space-x-3"
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`p-2.5 rounded-xl border ${chamber.color} shrink-0`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono font-bold text-slate-400 block">
                            {chamber.range}
                          </span>
                          <h4 className="text-xs font-bold text-white mt-0.5">{chamber.title}</h4>
                        </div>
                      </div>

                      <div className="shrink-0 mt-1">
                        <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                      </div>
                    </div>

                    <p className="px-4 pb-3 text-[11px] text-slate-300">
                      {chamber.description}
                    </p>

                    {/* Nodes Sub-Tree */}
                    {isExpanded && (
                      <div className="border-t border-slate-800 bg-slate-950/80 p-3 space-y-2">
                        <span className="text-[10px] font-mono text-amber-400 font-bold uppercase block tracking-wider">
                          Active Chamber Execution Nodes ({chamber.nodes.length})
                        </span>
                        <div className="space-y-1.5">
                          {chamber.nodes.map((node) => (
                            <div
                              key={node.id}
                              className="p-2.5 bg-slate-900/90 border border-slate-800 rounded-xl flex items-center justify-between text-xs font-mono"
                            >
                              <div className="flex items-center space-x-2 truncate">
                                <span className="w-5 h-5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center text-[9px] font-bold shrink-0">
                                  {node.nodeIndex}
                                </span>
                                <span className="text-slate-200 font-medium truncate">{node.name}</span>
                              </div>

                              <div className="flex items-center space-x-2 shrink-0">
                                <span className="text-[10px] text-slate-400">{node.latencyMs}ms</span>
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: GOAL DECOMPOSITION GRAPHS & PARADOX SYNC */}
      {activeTab === 'goals' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        
        {/* Left Goals Catalog & Tether Bubble Synaptic Mesh Control */}
        <div className="space-y-4">
          {/* Tether Bubble Synaptic Mesh Controls Panel */}
          <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-bold text-amber-300 flex items-center space-x-1.5">
                <Cpu className="w-4 h-4 text-amber-400" />
                <span>Tether Bubble Synaptic Mesh</span>
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                L4 Mesh Sync
              </span>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between text-slate-400">
                <span>Synaptic Weight Decay:</span>
                <span className="text-amber-400">0.0012 / ms</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>88 Paradox Mesh Consensus:</span>
                <span className="text-emerald-400 font-bold">100.0%</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>UAREFAKE Tether Lock:</span>
                <span className="text-cyan-400">ACTIVE</span>
              </div>
            </div>

            <button
              onClick={() => {
                onAddLog({
                  id: `LOG-${Date.now()}`,
                  timestamp: new Date().toLocaleString(),
                  agentName: 'Tether Bubble Synaptic Engine',
                  actionType: 'Cross-Node Mesh Sync',
                  details: 'Synchronized neural weights across 54 Daisy nodes and 88 Paradox rules. Decay recalibrated.',
                  status: 'success'
                });
              }}
              className="w-full py-1.5 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 font-bold rounded-xl text-xs flex items-center justify-center space-x-1 transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Resync Tether Synaptic Mesh</span>
            </button>
          </div>

          <h2 className="text-sm font-bold text-white flex items-center space-x-2 pt-2">
            <Brain className="w-4 h-4 text-amber-400" />
            <span>Active Goal Decomposition Graphs</span>
          </h2>

          <div className="space-y-3">
            {brainState.activeGoals.map((goal) => {
              const isSelected = selectedGoal?.id === goal.id;
              return (
                <div
                  key={goal.id}
                  onClick={() => setSelectedGoal(goal)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-slate-900 border-amber-500 shadow-lg shadow-amber-500/10'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 font-semibold">
                      {goal.id}
                    </span>
                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                      goal.executionStatus === 'solved'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    }`}>
                      {goal.executionStatus}
                    </span>
                  </div>

                  <h3 className="text-xs font-bold text-white mt-2">{goal.goalTitle}</h3>

                  <div className="mt-3 space-y-1">
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>Recursion Depth:</span>
                      <span className="font-mono text-white">{goal.recursionDepth} / {goal.maxDepth}</span>
                    </div>
                    <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-amber-400 h-full transition-all duration-300"
                        style={{ width: `${(goal.recursionDepth / goal.maxDepth) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Decision Path & Thought Log Terminal */}
        <div className="lg:col-span-2 space-y-4">
          {selectedGoal ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="text-[10px] text-amber-400 font-mono font-bold uppercase tracking-wider">
                    {selectedGoal.id} • Cognitive Goal Inspection
                  </span>
                  <h2 className="text-base font-bold text-white mt-1">{selectedGoal.goalTitle}</h2>
                </div>
                <button
                  onClick={handleRunRecursiveStep}
                  disabled={isReasoning || selectedGoal.executionStatus === 'solved'}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center space-x-2 transition-all shadow-lg shadow-amber-500/20 disabled:opacity-50"
                >
                  {isReasoning ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Reasoning Pass...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 fill-current" />
                      <span>Execute Recursive Step</span>
                    </>
                  )}
                </button>
              </div>

              {/* Current Thought State */}
              <div className="bg-slate-950 border border-amber-500/30 rounded-xl p-4 space-y-1">
                <span className="text-[10px] text-slate-400 font-mono uppercase block">Active Inner Monologue / Thought</span>
                <p className="text-xs text-amber-300 font-medium italic">"{selectedGoal.currentThought}"</p>
              </div>

              {/* Sub-Goals Breakdown */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-white font-mono block">Sub-Goal Decomposition Matrix</span>
                <div className="space-y-1.5">
                  {selectedGoal.subGoals.map((sg, i) => (
                    <div key={i} className="p-2.5 bg-slate-950 border border-slate-800/80 rounded-xl text-xs text-slate-300 flex items-center space-x-2">
                      <span className="w-5 h-5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center text-[10px] font-mono shrink-0">
                        {i + 1}
                      </span>
                      <span>{sg}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decision Path Tree */}
              <div className="space-y-2 border-t border-slate-800 pt-4">
                <span className="text-xs font-bold text-white font-mono block">Autonomous Decision Path Execution History</span>
                <div className="space-y-2">
                  {selectedGoal.decisionPath.map((dp, idx) => (
                    <div key={idx} className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-slate-300 flex items-start space-x-2">
                      <GitBranch className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{dp}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            <p className="text-xs text-slate-500">Select a goal graph to inspect cognitive reasoning...</p>
          )}
        </div>

      </div>
      )}

      {/* TAB 3: TETHER BUBBLE SYNAPTIC TRUTH & ONLINE KNOWLEDGE VERIFICATION */}
      {activeTab === 'synaptic_truth' && (
        <div className="space-y-6">
          
          {/* Header Banner */}
          <div className="bg-slate-900 border-2 border-cyan-500/40 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start space-x-3">
                <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-2xl shrink-0">
                  <Globe className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-0.5 rounded bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-[10px] font-mono font-bold uppercase">
                      TETHER BUBBLE SYNAPTIC LEARNING & TRUTH MATRIX
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold">
                      VERIFIABLE GROUNDING ONLINE
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-white mt-1">Cross-Verify Any Knowledge Node Against Online Truth Sources</h2>
                  <p className="text-xs text-slate-300 mt-1 max-w-3xl">
                    Run anything Daisy knows (POs, Invoices, 54 Nodes, 88 Paradox Rules, Ledger Vouchers) against anything Daisy knows or any verifiably true online corpus: academic research (.edu), Wikipedia, tech specifications (RFCs/W3C/ISO), SEC financial filings, or global economic databases.
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 shrink-0">
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-right font-mono">
                  <span className="text-[10px] text-slate-400 block">Verified Truth Parity</span>
                  <p className="text-base font-bold text-emerald-400">99.85% Score</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Truth Query Terminal & Domain Selector */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Query Form & Options */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <Search className="w-4 h-4 text-cyan-400" />
                <span>Select Target Knowledge Base & Input Text</span>
              </h3>

              {/* Target Domain Selector */}
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-slate-400 uppercase font-bold block">
                  Verifiable Truth Domain / Knowledge Base:
                </label>
                <select
                  value={targetCategory}
                  onChange={(e) => setTargetCategory(e.target.value as VerifiableDomainCategory)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500/50 font-mono"
                >
                  <option value=".edu (Academic & University Research)">.edu (Academic & University Research)</option>
                  <option value="Wikipedia (Verified Knowledge Taxonomy)">Wikipedia (Verified Knowledge Taxonomy)</option>
                  <option value="Tech Sites (W3C, IETF RFCs, ISO Standards)">Tech Sites (W3C, IETF RFCs, ISO Standards)</option>
                  <option value="Financial Data (SEC EDGAR, Bloomberg, ISO 20022)">Financial Data (SEC EDGAR, Bloomberg, ISO 20022)</option>
                  <option value="World Economics (World Bank, IMF, OECD, Fed)">World Economics (World Bank, IMF, OECD, Fed)</option>
                  <option value="Internal Synaptic Cross-Match (Anything Daisy Knows)">Internal Synaptic Cross-Match (Anything Daisy Knows)</option>
                </select>
              </div>

              {/* Source Input Text Area */}
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-slate-400 uppercase font-bold block">
                  Source Knowledge / Query Text:
                </label>
                <textarea
                  rows={4}
                  value={synapticQueryText}
                  onChange={(e) => setSynapticQueryText(e.target.value)}
                  placeholder="Enter custom text or internal PO/Invoice/Paradox clause to cross-check..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 font-mono leading-relaxed"
                />
              </div>

              {/* Quick Select Buttons */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] text-slate-500 font-mono block">Preset Internal Knowledge Nodes:</span>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => setSynapticQueryText('SOX 404 double-entry general ledger voucher compliance and ISO 20022 wire transfer protocol invariants')}
                    className="px-2.5 py-1 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-[10px] text-cyan-300 font-mono"
                  >
                    SOX 404 & ISO 20022
                  </button>
                  <button
                    onClick={() => setSynapticQueryText('Paradox Rule 42 Tether Synaptic Discrepancy Reconciliation in Supply Chain Logistics')}
                    className="px-2.5 py-1 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-[10px] text-amber-300 font-mono"
                  >
                    Rule 42 Tether Paradox
                  </button>
                  <button
                    onClick={() => setSynapticQueryText('Titanium Alloys LLC Master Service Agreement Freight Allowance & Brent Crude Index')}
                    className="px-2.5 py-1 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-[10px] text-purple-300 font-mono"
                  >
                    Titanium Alloys Freight
                  </button>
                </div>
              </div>

              <button
                onClick={handleRunSynapticTruthCheck}
                disabled={isEvaluatingTruth}
                className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center space-x-2 transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-50"
              >
                {isEvaluatingTruth ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Running Synaptic Truth Match...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 fill-current" />
                    <span>Run Tether Bubble Synaptic Truth Check</span>
                  </>
                )}
              </button>
            </div>

            {/* Truth Results Terminal Output */}
            <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
              {lastTruthResult ? (
                <div className="space-y-6">
                  {/* Result Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4 font-mono">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-cyan-400">{lastTruthResult.queryId}</span>
                        <span className="text-xs text-slate-400">| {lastTruthResult.timestamp}</span>
                      </div>
                      <h3 className="text-sm font-bold text-white mt-1">{lastTruthResult.targetDomainCategory}</h3>
                    </div>

                    <div className="flex items-center space-x-2 shrink-0">
                      <span className="px-3 py-1 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center space-x-1">
                        <Check className="w-3.5 h-3.5" />
                        <span>Truth Score: {lastTruthResult.verifiedTruthScore}%</span>
                      </span>
                    </div>
                  </div>

                  {/* Analysis Breakdown */}
                  <div className="bg-slate-950 border border-cyan-500/30 rounded-xl p-4 space-y-2">
                    <span className="text-[10px] text-slate-400 font-mono uppercase block font-bold">
                      Tether Synaptic Analysis & Invariant Proof:
                    </span>
                    <p className="text-xs text-cyan-200 leading-relaxed font-mono">
                      {lastTruthResult.truthAnalysis}
                    </p>
                  </div>

                  {/* Citations & Grounding Sources */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-white font-mono flex items-center space-x-2">
                      <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                      <span>Verifiable Grounding Sources & Citations</span>
                    </h4>
                    <div className="space-y-1.5 font-mono text-xs">
                      {lastTruthResult.citations.map((cite, idx) => (
                        <div key={idx} className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-300 flex items-start space-x-2">
                          <ExternalLink className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{cite}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Neural Synaptic Weight Mapping */}
                  <div className="space-y-2 border-t border-slate-800 pt-4">
                    <h4 className="text-xs font-bold text-white font-mono flex items-center space-x-2">
                      <Network className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Synaptic Neural Weight Connections ({lastTruthResult.synapticNeuralWeights.length} Nodes)</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs">
                      {lastTruthResult.synapticNeuralWeights.map((weight, idx) => (
                        <div key={idx} className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
                          <div>
                            <span className="text-slate-200 font-bold block">{weight.nodeId}</span>
                            <span className="text-[10px] text-slate-400">{weight.relation}</span>
                          </div>
                          <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                            W: {weight.weight}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Proof Hash Footer */}
                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span>Proof Hash: <strong className="text-purple-400">{lastTruthResult.verifiablyTrueProofHash}</strong></span>
                    <span>Goal Node Spawned: <strong className="text-emerald-400">{lastTruthResult.spawnedGoalNodeId}</strong></span>
                  </div>

                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-500 space-y-3">
                  <Globe className="w-12 h-12 text-slate-700 animate-pulse" />
                  <p className="text-xs max-w-md">
                    Select a verifiable truth domain (.edu, Wikipedia, Tech, Financial Data, World Economics) and click "Run Tether Bubble Synaptic Truth Check" to evaluate knowledge alignment in real time.
                  </p>
                </div>
              )}
            </div>

          </div>

        </div>
      )}

      {/* TAB 4: SELF-BUILT DAISY SOVEREIGN LLM & AUTONOMOUS PROBLEM SOLVER */}
      {activeTab === 'daisy_llm_solver' && (
        <div className="space-y-6">
          
          {/* LLM Model Telemetry Banner */}
          <div className="bg-slate-900 border-2 border-purple-500/40 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex items-start space-x-3">
                <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-2xl shrink-0">
                  <Brain className="w-6 h-6 text-purple-300" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-0.5 rounded bg-purple-500/20 border border-purple-500/40 text-purple-300 text-[10px] font-mono font-bold uppercase">
                      SELF-BUILT DAISY LLM ENGINE: {llmModel.modelId}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold">
                      IN-MEMORY TRANSFORMER AST SYNTHESIS
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-white mt-1">Daisy Autonomous Reasoning & Problem Solving Model</h2>
                  <p className="text-xs text-slate-300 mt-1 max-w-3xl">
                    Daisy Brain uses its self-built 128B MoE Transformer to solve new B2B problems, reason token-by-token across Tether Bubble Synaptic online corpora (.edu, Wikipedia, IETF/ISO, SEC EDGAR, World Economics), compile JIT AST code patches, and instantiate dynamic Agentic Goal Nodes.
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 shrink-0 font-mono text-xs">
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-right">
                  <span className="text-[10px] text-slate-400 block">Architecture & Params</span>
                  <p className="font-bold text-purple-300">{llmModel.activeParameters}</p>
                </div>
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-right">
                  <span className="text-[10px] text-slate-400 block">Loss Value</span>
                  <p className="font-bold text-emerald-400">{llmModel.lossValue.toFixed(4)}</p>
                </div>
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-right">
                  <span className="text-[10px] text-slate-400 block">Speed / Token</span>
                  <p className="font-bold text-cyan-300">{llmModel.tokenGenerationSpeedMs} ms</p>
                </div>
              </div>
            </div>

            {/* Fine-Tuning Corpora Pills */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between font-mono text-[10px]">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-slate-400 font-bold uppercase mr-1">Fine-Tuned Grounding Corpora:</span>
                {llmModel.fineTunedCorpora.map((corp, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300">
                    {corp.split(' ')[0]}
                  </span>
                ))}
              </div>
              <span className="text-slate-400 font-bold">
                Passes Completed: <strong className="text-white">{llmModel.reasoningPassesCompleted.toLocaleString()}</strong>
              </span>
            </div>
          </div>

          {/* Problem Submission Form & Results View */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left: Input Form */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <Zap className="w-4 h-4 text-purple-400" />
                <span>Submit New B2B Problem or Scenario</span>
              </h3>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-slate-400 uppercase font-bold block">
                  Primary Knowledge Base Grounding:
                </label>
                <select
                  value={selectedSolverDomain}
                  onChange={(e) => setSelectedSolverDomain(e.target.value as VerifiableDomainCategory)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500/50 font-mono"
                >
                  <option value=".edu (Academic & University Research)">.edu (Academic & University Research)</option>
                  <option value="Wikipedia (Verified Knowledge Taxonomy)">Wikipedia (Verified Knowledge Taxonomy)</option>
                  <option value="Tech Sites (W3C, IETF RFCs, ISO Standards)">Tech Sites (W3C, IETF RFCs, ISO Standards)</option>
                  <option value="Financial Data (SEC EDGAR, Bloomberg, ISO 20022)">Financial Data (SEC EDGAR, Bloomberg, ISO 20022)</option>
                  <option value="World Economics (World Bank, IMF, OECD, Fed)">World Economics (World Bank, IMF, OECD, Fed)</option>
                  <option value="Internal Synaptic Cross-Match (Anything Daisy Knows)">Internal Synaptic Cross-Match (Anything Daisy Knows)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-slate-400 uppercase font-bold block">
                  Problem Statement / Scenario:
                </label>
                <textarea
                  rows={5}
                  value={customProblemInput}
                  onChange={(e) => setCustomProblemInput(e.target.value)}
                  placeholder="Describe any supply chain, financial audit, contract discrepancy, or operational problem..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500/50 font-mono leading-relaxed"
                />
              </div>

              {/* Quick Preset Scenario Buttons */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] text-slate-500 font-mono block">Preset Problem Scenarios:</span>
                <div className="flex flex-col gap-1.5 font-mono text-[10px]">
                  <button
                    onClick={() => {
                      setCustomProblemInput('Cross-border tariff surcharge anomaly and freight line-item mismatch during multi-vendor invoice reconciliation');
                      setSelectedSolverDomain('World Economics (World Bank, IMF, OECD, Fed)');
                    }}
                    className="p-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-left text-purple-300"
                  >
                    1. Cross-Border Tariff & Freight Mismatch
                  </button>
                  <button
                    onClick={() => {
                      setCustomProblemInput('Detect and neutralize synthetic double-billing voucher fraud in SAP/Oracle ERP tables');
                      setSelectedSolverDomain('Financial Data (SEC EDGAR, Bloomberg, ISO 20022)');
                    }}
                    className="p-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-left text-emerald-300"
                  >
                    2. SAP/Oracle ERP Double-Billing Fraud
                  </button>
                  <button
                    onClick={() => {
                      setCustomProblemInput('Verify ISO 20022 pacs.008 wire payment dispatch cryptographically with zero-trust MMTAI auth signature');
                      setSelectedSolverDomain('Tech Sites (W3C, IETF RFCs, ISO Standards)');
                    }}
                    className="p-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-left text-cyan-300"
                  >
                    3. ISO 20022 Pacs.008 Zero-Trust Auth
                  </button>
                </div>
              </div>

              <button
                onClick={handleSolveCustomProblem}
                disabled={isSolvingProblem}
                className="w-full py-2.5 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center space-x-2 transition-all shadow-lg shadow-purple-500/20 disabled:opacity-50"
              >
                {isSolvingProblem ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Daisy LLM Synthesizing Solution...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 fill-current" />
                    <span>Solve Problem with Daisy LLM</span>
                  </>
                )}
              </button>
            </div>

            {/* Right: Solution & Token Reasoning Stream */}
            <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
              {lastProblemSolution ? (
                <div className="space-y-6">
                  {/* Solution Banner */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4 font-mono">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-purple-400">{lastProblemSolution.solutionId}</span>
                        <span className="text-xs text-slate-400">| {lastProblemSolution.timestamp}</span>
                      </div>
                      <h3 className="text-sm font-bold text-white mt-1">Autonomous Resolution Completed</h3>
                    </div>

                    <div className="flex items-center space-x-2 shrink-0">
                      <span className="px-3 py-1 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs font-bold flex items-center space-x-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Solved with 99.9% Parity</span>
                      </span>
                    </div>
                  </div>

                  {/* Chain of Thought Token Stream */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-white font-mono flex items-center space-x-2">
                      <Terminal className="w-3.5 h-3.5 text-purple-400" />
                      <span>Daisy LLM Chain-of-Truth-Thought Token Stream</span>
                    </h4>
                    <div className="space-y-2 font-mono text-xs">
                      {lastProblemSolution.reasoningTokens.map((tok) => (
                        <div key={tok.tokenIndex} className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                          <div className="flex items-center justify-between text-[10px]">
                            <span className="text-purple-400 font-bold">TOKEN PASS #{tok.tokenIndex}</span>
                            <span className="text-emerald-400 font-bold">Attention Weight: {tok.synapticAttentionWeight}</span>
                          </div>
                          <p className="text-slate-200 text-xs leading-relaxed">{tok.subThought}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actionable Steps & AST Patch Code */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Steps */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-white font-mono flex items-center space-x-2">
                        <Workflow className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Actionable Resolution Protocol</span>
                      </h4>
                      <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1.5 font-mono text-xs text-slate-300">
                        {lastProblemSolution.actionableSteps.map((step, idx) => (
                          <div key={idx} className="flex items-start space-x-1.5">
                            <span className="text-purple-400 shrink-0">•</span>
                            <span>{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* JIT AST Patch Code */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-white font-mono flex items-center space-x-2">
                        <FileCode className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Compiled JIT AST Code Patch</span>
                      </h4>
                      <pre className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-[10px] text-cyan-300 font-mono overflow-x-auto max-h-40 leading-relaxed">
                        {lastProblemSolution.generatedAstPatchCode}
                      </pre>
                    </div>
                  </div>

                  {/* Grounding & Goal Spawned Footer */}
                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span>Proof Hash: <strong className="text-purple-400">{lastProblemSolution.completionProofHash}</strong></span>
                    <span>Goal Node Spawned: <strong className="text-emerald-400">{lastProblemSolution.spawnedGoalNode.id}</strong></span>
                  </div>

                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-500 space-y-3">
                  <Brain className="w-12 h-12 text-purple-800 animate-pulse" />
                  <p className="text-xs max-w-md">
                    Enter any B2B operational problem or select a preset scenario, then click "Solve Problem with Daisy LLM" to view token-by-token reasoning and JIT AST code compilation.
                  </p>
                </div>
              )}
            </div>

          </div>

        </div>
      )}

    </div>
  );
}


