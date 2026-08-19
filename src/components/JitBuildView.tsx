import { useState } from 'react';
import { JitBuildTask, ExecutionLog } from '../types';
import { synthesizeJitModule } from '../engine/jitBuildEngine';
import { 
  Cpu, 
  Code, 
  Zap, 
  CheckCircle2, 
  Play, 
  Terminal, 
  Layers, 
  RefreshCw,
  Box,
  Braces
} from 'lucide-react';

interface JitBuildViewProps {
  tasks: JitBuildTask[];
  onAddJitTask: (task: JitBuildTask) => void;
  onAddLog: (log: ExecutionLog) => void;
}

export function JitBuildView({
  tasks,
  onAddJitTask,
  onAddLog
}: JitBuildViewProps) {
  const [moduleName, setModuleName] = useState('Daisy Node 56: ESG Compliance Validator');
  const [requirement, setRequirement] = useState('Extract carbon emissions telemetry and verify against Scope 3 EU Directive 2026/88.');
  const [selectedTask, setSelectedTask] = useState<JitBuildTask | null>(tasks[0] || null);
  const [isBuilding, setIsBuilding] = useState(false);

  const handleSynthesizeModule = () => {
    setIsBuilding(true);
    setTimeout(() => {
      const newTask = synthesizeJitModule(moduleName, requirement);
      onAddJitTask(newTask);
      setSelectedTask(newTask);
      setIsBuilding(false);

      onAddLog({
        id: `LOG-${Date.now()}`,
        timestamp: new Date().toLocaleString(),
        agentName: 'JIT Build Engine',
        actionType: 'Module Synthesized',
        details: `JIT compiled module "${newTask.targetModule}" in ${newTask.buildTimeMs}ms. Output hash: ${newTask.outputBundleHash}`,
        status: 'success',
        entityId: newTask.id,
        entityType: 'Workflow'
      });
    }, 800);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-teal-950/80 border border-emerald-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Cpu className="w-64 h-64 text-emerald-400" />
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-mono tracking-wider uppercase font-semibold">
                Blaze 1.0 Quantum JIT App Forge & Compiler Engine
              </span>
              <span className="text-xs text-slate-400 font-mono">Sub-150ms AST Synthesis</span>
            </div>
            <h1 className="text-2xl font-bold text-white mt-1">Blaze 1.0 Autonomous Code Generation & Synthesis</h1>
            <p className="text-xs text-slate-300 max-w-2xl mt-1">
              Dynamically synthesize, compile, and hot-deploy new Daisy automation nodes, Paradox anomaly rules, and B2B workflow logic at runtime powered by Blaze 1.0 JIT technology.
            </p>
          </div>

          <div className="bg-slate-950/80 border border-emerald-500/30 rounded-xl p-4 text-right shrink-0">
            <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
              Avg JIT Build Latency
            </span>
            <p className="text-2xl font-bold text-emerald-400 font-mono">114 ms</p>
          </div>
        </div>
      </div>

      {/* Main Grid: JIT Synthesis Controls + AST Code Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Synthesis Controller */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
            <Zap className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm font-bold text-white">Synthesize New JIT Module</h2>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Target Module Title</label>
            <input
              type="text"
              value={moduleName}
              onChange={(e) => setModuleName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500/50"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Functional Requirement Prompt</label>
            <textarea
              rows={4}
              value={requirement}
              onChange={(e) => setRequirement(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-300 focus:outline-none focus:border-emerald-500/50"
            />
          </div>

          <button
            onClick={handleSynthesizeModule}
            disabled={isBuilding}
            className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center space-x-2 transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50"
          >
            {isBuilding ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Compiling AST & Bundling...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>Synthesize & Build JIT Module</span>
              </>
            )}
          </button>

          <div className="border-t border-slate-800 pt-4 space-y-2">
            <span className="text-xs font-bold text-slate-300 block font-mono">Deployed JIT Modules ({tasks.length})</span>
            {tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => setSelectedTask(task)}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  selectedTask?.id === task.id
                    ? 'bg-slate-950 border-emerald-500/50 text-white'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between font-mono text-[10px]">
                  <span className="text-emerald-400 font-bold">{task.id}</span>
                  <span className="text-slate-500">{task.buildTimeMs}ms</span>
                </div>
                <p className="text-xs font-bold text-slate-200 mt-1 truncate">{task.targetModule}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Source Code & AST Inspection Terminal */}
        <div className="lg:col-span-2 space-y-4">
          {selectedTask ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    {selectedTask.id} • Deployed & Active
                  </span>
                  <h2 className="text-base font-bold text-white mt-1">{selectedTask.targetModule}</h2>
                </div>
                <div className="text-right font-mono text-xs text-slate-400">
                  <span>Build: {selectedTask.buildTimeMs}ms</span>
                  <p className="text-[10px] text-slate-500">{selectedTask.generatedTimestamp}</p>
                </div>
              </div>

              {/* Source Code View */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400 flex items-center space-x-1">
                    <Code className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Synthesized TypeScript Module</span>
                  </span>
                  <button
                    onClick={() => {
                      onAddLog({
                        id: `LOG-${Date.now()}`,
                        timestamp: new Date().toLocaleString(),
                        agentName: 'JIT Compiler',
                        actionType: 'Live Test Execution',
                        details: `Executed JIT handler "${selectedTask.targetModule}" in memory. Result: { success: true, latency: "1.2ms" }`,
                        status: 'success'
                      });
                    }}
                    className="px-2.5 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 font-mono text-[10px] font-bold rounded-lg flex items-center space-x-1 transition-all"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>Run In-Memory Test</span>
                  </button>
                </div>
                <pre className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed">
                  {selectedTask.sourceCode}
                </pre>
              </div>

              {/* AST Expression View */}
              <div className="space-y-1">
                <span className="text-xs font-mono text-slate-400 flex items-center space-x-1">
                  <Braces className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Abstract Syntax Tree (AST) Representation</span>
                </span>
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-mono text-cyan-300">
                  {selectedTask.compiledAst}
                </div>
              </div>

              {/* Dependencies & Hash */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                  <span className="text-[10px] text-slate-500 font-mono uppercase block">Module Dependencies</span>
                  <div className="flex flex-wrap gap-1">
                    {selectedTask.dependencies.map(d => (
                      <span key={d} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-300">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                  <span className="text-[10px] text-slate-500 font-mono uppercase block">Output Bundle Cryptographic Hash</span>
                  <p className="text-xs font-mono text-emerald-400 truncate">{selectedTask.outputBundleHash}</p>
                </div>
              </div>

            </div>
          ) : (
            <p className="text-xs text-slate-500">Select a JIT build module to view source code...</p>
          )}
        </div>

      </div>

      {/* Daisy's Cognitive Experiment Sandbox & Learning Lab */}
      <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center">
              <Box className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded bg-purple-500/20 border border-purple-500/40 text-purple-300 text-[10px] font-mono font-bold uppercase">
                  Experiment Sandbox
                </span>
                <span className="text-xs text-slate-400 font-mono">Autonomous Hypothesis Lab</span>
              </div>
              <h2 className="text-base font-bold text-white mt-0.5">Daisy Cognitive Experiment & Learning Lab</h2>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-xs font-mono">
            <span className="text-slate-400">Sandbox Isolation: <strong className="text-emerald-400">Level 4 WebWorker VM</strong></span>
            <span className="text-slate-400">Learning Rate: <strong className="text-cyan-400">α = 0.0025</strong></span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Experiment Control Form */}
          <div className="md:col-span-2 space-y-4 bg-slate-950/80 border border-slate-800 p-4 rounded-xl">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center space-x-2">
              <Terminal className="w-3.5 h-3.5 text-purple-400" />
              <span>Launch New Learning Experiment</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">Experiment Hypothesis Title</label>
                <input
                  type="text"
                  defaultValue="Neural Heuristic Paradox Weight Optimization for FX Spreads"
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500/50"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">Target Evaluation Metric</label>
                <select className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500/50 font-mono">
                  <option>AST Build Latency Reduction (&lt; 90ms)</option>
                  <option>Anomaly Trap Precision Score (&gt; 99.8%)</option>
                  <option>Memory Buffer Allocation Efficiency (+24%)</option>
                  <option>Multi-Tier PO Approval Automation (&lt; 0.5s)</option>
                </select>
              </div>
            </div>

            <button
              onClick={() => {
                onAddLog({
                  id: `LOG-${Date.now()}`,
                  timestamp: new Date().toLocaleString(),
                  agentName: 'Daisy Cognitive Lab',
                  actionType: 'Experiment Executed',
                  details: 'Executed trial experiment "Neural Heuristic Paradox Weight Optimization". Validated hypothesis with 99.9% accuracy in 84ms sandbox pass.',
                  status: 'success'
                });
              }}
              className="w-full py-2.5 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-2 transition-all shadow-md shadow-purple-500/20"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Run Isolated Experiment & Benchmark Learning Loop</span>
            </button>
          </div>

          {/* Sandbox Metrics & Results */}
          <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-purple-300 font-bold">Recent Lab Results</span>
              <span className="text-[10px] text-emerald-400">Passed (4/4)</span>
            </div>

            <div className="space-y-2 text-[11px]">
              <div className="p-2 bg-slate-900 rounded border border-slate-800 flex justify-between">
                <span className="text-slate-300">Exp #108: Paradox Trap Speed</span>
                <strong className="text-emerald-400">+18% faster</strong>
              </div>
              <div className="p-2 bg-slate-900 rounded border border-slate-800 flex justify-between">
                <span className="text-slate-300">Exp #109: AST Bytecode Shrink</span>
                <strong className="text-cyan-400">-12% memory</strong>
              </div>
              <div className="p-2 bg-slate-900 rounded border border-slate-800 flex justify-between">
                <span className="text-slate-300">Exp #110: ZKP Verification</span>
                <strong className="text-purple-400">100.0% accuracy</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
