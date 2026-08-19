import React, { useState } from 'react';
import { DaisyChain, DaisyNode, ExecutionLog } from '../types';
import { 
  GitMerge, 
  Play, 
  CheckCircle2, 
  Clock, 
  Zap, 
  AlertTriangle, 
  Layers, 
  Cpu, 
  FileText, 
  ShieldCheck, 
  DollarSign, 
  RefreshCw, 
  Plus, 
  Database,
  ArrowRight
} from 'lucide-react';

interface DaisyPipelineViewProps {
  daisyChains: DaisyChain[];
  onTriggerChain: (chainId: string) => void;
  onAddLog: (log: ExecutionLog) => void;
}

export const DaisyPipelineView: React.FC<DaisyPipelineViewProps> = ({
  daisyChains,
  onTriggerChain,
  onAddLog
}) => {
  const [selectedChainId, setSelectedChainId] = useState<string>(daisyChains[0]?.id || 'DAISY-CHAIN-01');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [activeNodeIdx, setActiveNodeIdx] = useState<number>(-1);
  const [showAddChainModal, setShowAddChainModal] = useState<boolean>(false);

  const selectedChain = daisyChains.find(c => c.id === selectedChainId) || daisyChains[0];

  const handleRunSimulation = () => {
    if (isExecuting) return;
    setIsExecuting(true);
    setActiveNodeIdx(0);

    const nodesCount = selectedChain.nodes.length;
    let current = 0;

    const timer = setInterval(() => {
      current++;
      if (current < nodesCount) {
        setActiveNodeIdx(current);
      } else {
        clearInterval(timer);
        setIsExecuting(false);
        setActiveNodeIdx(-1);
        onTriggerChain(selectedChain.id);
        onAddLog({
          id: `LOG-${Date.now()}`,
          timestamp: new Date().toLocaleString(),
          agentName: 'Daisy Engine',
          actionType: 'Pipeline Execution Completed',
          details: `Successfully executed all ${nodesCount} nodes in "${selectedChain.chainName}". Total latency: 1,380ms.`,
          status: 'success',
          entityId: selectedChain.id,
          entityType: 'DaisyChain'
        });
      }
    }, 700);
  };

  const getNodeIcon = (type: DaisyNode['type']) => {
    switch (type) {
      case 'ocr':
        return <FileText className="w-4 h-4 text-cyan-400" />;
      case 'three_way_match':
        return <Layers className="w-4 h-4 text-emerald-400" />;
      case 'risk_check':
        return <ShieldCheck className="w-4 h-4 text-purple-400" />;
      case 'paradox_audit':
        return <Cpu className="w-4 h-4 text-amber-400" />;
      case 'erp_sync':
        return <Database className="w-4 h-4 text-blue-400" />;
      case 'payment':
        return <DollarSign className="w-4 h-4 text-emerald-300" />;
      default:
        return <Zap className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-cyan-950/80 border border-emerald-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <GitMerge className="w-64 h-64 text-emerald-400" />
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-mono tracking-wider uppercase font-semibold">
                Daisy-Haminja App Forge & Orchestration Hub
              </span>
              <span className="text-xs text-slate-400">Multi-Node B2B Autonomous Pipelines</span>
            </div>
            <h1 className="text-2xl font-bold text-white mt-1">Daisy-Haminja Automation Framework</h1>
            <p className="text-xs text-slate-300 max-w-2xl mt-1">
              Connect OCR document extractors, Paradox reconciliation solvers, ERP ledgers, and automated payment dispatchers into resilient, zero-latency supply chain pipelines.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleRunSimulation}
              disabled={isExecuting}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold rounded-xl text-xs flex items-center space-x-2 transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50"
            >
              {isExecuting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Executing Daisy Chain...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>Execute Active Daisy Chain</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800/80">
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3">
            <p className="text-[10px] text-slate-400 font-medium">Active Daisy Chains</p>
            <p className="text-lg font-bold text-white">{daisyChains.length}</p>
          </div>
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3">
            <p className="text-[10px] text-slate-400 font-medium">Daily Chain Runs</p>
            <p className="text-lg font-bold text-emerald-400">170 Cycles</p>
          </div>
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3">
            <p className="text-[10px] text-slate-400 font-medium">Avg Pipeline Latency</p>
            <p className="text-lg font-bold text-cyan-400">220 ms / node</p>
          </div>
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3">
            <p className="text-[10px] text-slate-400 font-medium">Autonomous Accuracy</p>
            <p className="text-lg font-bold text-indigo-400">99.88%</p>
          </div>
        </div>
      </div>

      {/* Main Daisy Chain Selector & Visual Flow */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left List of Daisy Chains */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center space-x-2">
              <GitMerge className="w-4 h-4 text-emerald-400" />
              <span>Configured Daisy Chains</span>
            </h2>
            <button
              onClick={() => setShowAddChainModal(true)}
              className="p-1 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors"
              title="Create Daisy Chain"
            >
              <Plus className="w-4 h-4 text-emerald-400" />
            </button>
          </div>

          <div className="space-y-2">
            {daisyChains.map((chain) => {
              const isSelected = chain.id === selectedChainId;
              return (
                <div
                  key={chain.id}
                  onClick={() => setSelectedChainId(chain.id)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-slate-950 border-emerald-500/50 shadow-md shadow-emerald-500/10'
                      : 'bg-slate-950/40 border-slate-800 hover:border-slate-700 hover:bg-slate-950/80'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{chain.chainName}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-semibold ${
                      chain.status === 'active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                    }`}>
                      {chain.status}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                    {chain.description}
                  </p>

                  <div className="mt-3 flex items-center justify-between text-[10px] text-slate-500 pt-2 border-t border-slate-800/80">
                    <span className="flex items-center space-x-1">
                      <Layers className="w-3 h-3 text-slate-400" />
                      <span>{chain.nodes.length} Nodes</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>Executed {chain.executionsToday}x today</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Interactive Node Pipeline Visualizer */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">{selectedChain.chainName}</h3>
                <p className="text-xs text-slate-400 mt-0.5">Trigger: {selectedChain.trigger}</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400">Last Execution:</span>
                <p className="text-xs font-mono font-medium text-emerald-400">{selectedChain.lastSuccess}</p>
              </div>
            </div>
          </div>

          {/* Node Visual Pipeline Graph */}
          <div className="bg-slate-950 border border-slate-800/80 rounded-2xl p-6 space-y-4 relative">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
                  Daisy 54-Node Pipeline Execution Topology
                </span>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Showing {selectedChain.nodes.length} nodes spanning Ingestion, 3-Way Match, Paradox Box, Risk, ERP & Treasury
                </p>
              </div>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-mono">
                54/54 Nodes Operational
              </span>
            </div>

            <div className="space-y-3 pt-2 max-h-[520px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-800">
              {selectedChain.nodes.map((node, index) => {
                const isActive = activeNodeIdx === index;
                const isCompleted = activeNodeIdx > index || (!isExecuting && activeNodeIdx === -1);
                
                return (
                  <div key={node.id} className="relative">
                    {index < selectedChain.nodes.length - 1 && (
                      <div className={`absolute left-5 top-10 w-0.5 h-6 z-0 transition-colors ${
                        isCompleted ? 'bg-emerald-500/60' : 'bg-slate-800'
                      }`} />
                    )}

                    <div className={`relative z-10 flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                      isActive
                        ? 'bg-emerald-950/40 border-emerald-500 shadow-lg shadow-emerald-500/20 scale-[1.01]'
                        : isCompleted
                        ? 'bg-slate-900 border-slate-800'
                        : 'bg-slate-950 border-slate-800/60 opacity-60'
                    }`}>
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-colors ${
                          isActive
                            ? 'bg-emerald-500 text-slate-950 border-emerald-400 animate-pulse'
                            : isCompleted
                            ? 'bg-emerald-500/10 border-emerald-500/30'
                            : 'bg-slate-900 border-slate-800'
                        }`}>
                          {getNodeIcon(node.type)}
                        </div>

                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-bold text-white">#{node.nodeIndex} - {node.name}</span>
                            <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">
                              {node.category}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 mt-0.5">{node.config}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 text-right shrink-0">
                        <span className="text-[10px] font-mono text-slate-400">{node.latencyMs}ms</span>
                        {isActive ? (
                          <RefreshCw className="w-4 h-4 text-emerald-400 animate-spin" />
                        ) : isCompleted ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Clock className="w-4 h-4 text-slate-600" />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Node Debug & Output Telemetry */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
            <h4 className="text-xs font-bold text-slate-300 font-mono flex items-center space-x-2">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Daisy Node Diagnostic Output</span>
            </h4>
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 text-[11px] font-mono text-emerald-400 space-y-1 overflow-x-auto">
              <p>{"[DAISY-CORE]"} Initialized Daisy Multi-Node Pipeline ({selectedChain.id})</p>
              <p>{"[DAISY-OCR]"} Extracted 100% line items from inbound document</p>
              <p>{"[PARADOX-ENGINE]"} 3-Way Match score: 100% (No price variance found)</p>
              <p>{"[DAISY-LEDGER]"} Written AP journal voucher to ERP enterprise DB</p>
            </div>
          </div>

        </div>
      </div>

      {/* Autonomous Daisy Chain Builder Modal */}
      {showAddChainModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <GitMerge className="w-4 h-4 text-emerald-400" />
                <span>Create Daisy Automation Chain</span>
              </h3>
              <button onClick={() => setShowAddChainModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Daisy Chain Name</label>
                <input type="text" defaultValue="Daisy Customs & Freight Dispatch Chain" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500/50" />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Trigger Condition</label>
                <input type="text" defaultValue="On Freight Delivery Confirmation Scan" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500/50" />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Default Nodes</label>
                <div className="p-2 bg-slate-950 border border-slate-800 rounded-xl space-y-1 text-slate-300">
                  <p>1. Daisy OCR Reader</p>
                  <p>2. Paradox 3-Way Match</p>
                  <p>3. Treasury Payout Dispatch</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-2 pt-2">
              <button onClick={() => setShowAddChainModal(false)} className="px-3 py-1.5 text-xs text-slate-400 hover:text-white">Cancel</button>
              <button onClick={() => {
                setShowAddChainModal(false);
                onAddLog({
                  id: `LOG-${Date.now()}`,
                  timestamp: new Date().toLocaleString(),
                  agentName: 'Daisy Builder',
                  actionType: 'Chain Created',
                  details: 'Configured new Daisy Customs & Freight Dispatch Chain.',
                  status: 'success'
                });
              }} className="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold rounded-xl text-xs">
                Save & Deploy Chain
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
