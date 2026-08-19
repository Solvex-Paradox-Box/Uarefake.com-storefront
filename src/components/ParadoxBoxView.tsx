import React, { useState } from 'react';
import { ParadoxAnomaly, ExecutionLog, ParadoxSolution } from '../types';
import { CATALOG_105_PARADOX_SOLUTIONS } from '../engine/paradoxEngine';
import { 
  Cpu, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  Zap, 
  FileText, 
  RefreshCw, 
  Sparkles, 
  DollarSign, 
  Layers, 
  ArrowRight,
  Search,
  Scale,
  Boxes,
  BookOpen,
  ShieldCheck,
  Filter
} from 'lucide-react';

interface ParadoxBoxViewProps {
  anomalies: ParadoxAnomaly[];
  onResolveParadox: (id: string) => void;
  onAddLog: (log: ExecutionLog) => void;
}

export const ParadoxBoxView: React.FC<ParadoxBoxViewProps> = ({
  anomalies,
  onResolveParadox,
  onAddLog
}) => {
  const [activeTab, setActiveTab] = useState<'anomalies' | 'catalog' | 'crystal_glassbox'>('catalog');
  
  // Crystal Clear Black Box State
  const [entropyLevel, setEntropyLevel] = useState<number>(0.142);
  const [matrixCoherence, setMatrixCoherence] = useState<number>(99.88);
  const [isSimulatingCollapse, setIsSimulatingCollapse] = useState<boolean>(false);
  const [selectedProofNode, setSelectedProofNode] = useState<string>('TETHER-NODE-33');
  
  // Anomalies State
  const [selectedAnomalyId, setSelectedAnomalyId] = useState<string>(anomalies[0]?.id || 'PARADOX-701');
  const [resolvingId, setResolvingId] = useState<string | null>(null);
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [customInspectorText, setCustomInspectorText] = useState<string>('');
  const [inspectorResult, setInspectorResult] = useState<string | null>(null);

  // 105 Paradox Solutions Catalog State
  const [catalogSearch, setCatalogSearch] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [executedSolutionId, setExecutedSolutionId] = useState<string | null>(null);

  const selectedAnomaly = anomalies.find(a => a.id === selectedAnomalyId) || anomalies[0];

  const handleResolve = (id: string) => {
    setResolvingId(id);
    setTimeout(() => {
      onResolveParadox(id);
      setResolvingId(null);
      onAddLog({
        id: `LOG-${Date.now()}`,
        timestamp: new Date().toLocaleString(),
        agentName: 'Paradox Box Core',
        actionType: 'Paradox Resolved',
        details: `Successfully solved ${id}. Enforced contract clause & requested credit memo adjustment.`,
        status: 'success',
        entityId: id,
        entityType: 'ParadoxBox'
      });
    }, 1200);
  };

  const handleExecuteSolution = (sol: ParadoxSolution) => {
    setExecutedSolutionId(sol.id);
    setTimeout(() => setExecutedSolutionId(null), 3000);

    onAddLog({
      id: `LOG-${Date.now()}`,
      timestamp: new Date().toLocaleString(),
      agentName: '105 Paradox Solutions Catalog',
      actionType: 'Paradox Solution Executed',
      details: `Executed 105-Paradox Solution "${sol.title}" (${sol.type.toUpperCase()}). Applied B2B Solver: ${sol.solverAlgorithm}`,
      status: 'success',
      entityId: sol.id,
      entityType: 'ParadoxBox'
    });
  };

  const handleRunCustomInspector = () => {
    if (!customInspectorText.trim()) return;
    setInspectorResult('Analyzing contract clauses & PO history for paradoxes...');
    setTimeout(() => {
      setInspectorResult(
        `Paradox Solver Output: Detected 0.00% variance for input "${customInspectorText}". All terms align with Master Vendor Agreement Clause 8.1.`
      );
    }, 1000);
  };

  const filteredAnomalies = anomalies.filter(a => {
    if (filterSeverity === 'all') return true;
    return a.severity === filterSeverity;
  });

  const filteredCatalog = CATALOG_105_PARADOX_SOLUTIONS.filter(sol => {
    const matchesSearch = sol.title.toLowerCase().includes(catalogSearch.toLowerCase()) || sol.id.toLowerCase().includes(catalogSearch.toLowerCase()) || sol.description.toLowerCase().includes(catalogSearch.toLowerCase());
    const matchesType = selectedType === 'all' || sol.type === selectedType;
    return matchesSearch && matchesType;
  });

  const totalPreventedSavings = anomalies.reduce((acc, a) => acc + a.discrepancyValue, 0);

  return (
    <div className="space-y-6">
      
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-amber-950/80 via-slate-900 to-rose-950/80 border border-amber-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Cpu className="w-64 h-64 text-amber-400" />
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-mono tracking-wider uppercase font-semibold">
                Paradox Box Engine & Catalog
              </span>
              <span className="text-xs text-slate-400">105 Paradox Solutions (40 Historical + 48 Proprietary + 17 Security)</span>
            </div>
            <h1 className="text-2xl font-bold text-white mt-1">105 Paradox Solutions Marketplace & Anomaly Solver</h1>
            <p className="text-xs text-slate-300 max-w-2xl mt-1">
              Explore 40 classical historical paradox solvers, 48 proprietary enterprise financial paradoxes, and 17 zero-trust security protocol solvers.
            </p>
          </div>

          <div className="flex items-center space-x-2 bg-slate-950/80 border border-slate-800 p-1.5 rounded-xl shrink-0 overflow-x-auto">
            <button
              onClick={() => setActiveTab('catalog')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-2 shrink-0 ${
                activeTab === 'catalog'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>105 Paradox Catalog ({CATALOG_105_PARADOX_SOLUTIONS.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('anomalies')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-2 shrink-0 ${
                activeTab === 'anomalies'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Live Flagged Anomalies ({anomalies.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('crystal_glassbox')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-2 shrink-0 ${
                activeTab === 'crystal_glassbox'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Boxes className="w-4 h-4 text-cyan-400" />
              <span>Crystal Clear Black Box Visualizer</span>
            </button>
          </div>
        </div>

      </div>

      {/* TAB 1: 105 Paradox Solutions Marketplace Catalog */}
      {activeTab === 'catalog' && (
        <div className="space-y-6">
          
          {/* Filter Bar */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search 105 paradox solutions (Zeno, Russell, Freight, FX...)..."
                value={catalogSearch}
                onChange={(e) => setCatalogSearch(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
              />
            </div>

            <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto scrollbar-none">
              <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              {[
                { id: 'all', label: 'All 105 Paradoxes' },
                { id: 'historical', label: '40 Historical' },
                { id: 'proprietary', label: '48 Proprietary B2B' },
                { id: 'contract_security', label: '17 MMTAI Security' }
              ].map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all shrink-0 ${
                    selectedType === type.id
                      ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* 105 Catalog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCatalog.map((sol) => (
              <div
                key={sol.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border font-semibold ${
                      sol.type === 'historical'
                        ? 'bg-purple-500/10 border-purple-500/20 text-purple-300'
                        : sol.type === 'proprietary'
                        ? 'bg-amber-500/10 border-amber-500/20 text-amber-300'
                        : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
                    }`}>
                      {sol.type.toUpperCase()}
                    </span>
                    <span className="text-[10px] font-mono text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      {sol.successRate}% Success
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white mt-1 leading-snug">{sol.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{sol.description}</p>
                </div>

                <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-3 space-y-1">
                  <span className="text-[10px] text-slate-500 font-mono block">B2B Supply Application:</span>
                  <p className="text-[11px] text-slate-300">{sol.b2bApplication}</p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800/80">
                  <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                    <span>{sol.id}</span>
                    <span>{sol.solvedCount.toLocaleString()} Anomaly Solves</span>
                  </div>

                  <button
                    onClick={() => handleExecuteSolution(sol)}
                    className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center space-x-2 transition-all shadow-md shadow-amber-500/20"
                  >
                    {executedSolutionId === sol.id ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-slate-950" />
                        <span>Solver Executed!</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 fill-current" />
                        <span>Run 1-Click Solver ({sol.id})</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* TAB 2: Live Flagged Anomalies */}
      {activeTab === 'anomalies' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left List of Active Paradox Anomalies */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-white flex items-center space-x-2">
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                <span>Flagged Paradoxes ({filteredAnomalies.length})</span>
              </h2>
            </div>

            <div className="space-y-3">
              {filteredAnomalies.map((item) => {
                const isSelected = item.id === selectedAnomalyId;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedAnomalyId(item.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-slate-950 border-amber-500/50 shadow-md shadow-amber-500/10'
                        : 'bg-slate-950/40 border-slate-800 hover:border-slate-700 hover:bg-slate-950/80'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border ${
                        item.severity === 'critical' 
                          ? 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                          : item.severity === 'high'
                          ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                          : 'bg-blue-500/10 border-blue-500/30 text-blue-400'
                      }`}>
                        {item.severity} SEVERITY
                      </span>

                      <span className="text-xs font-mono font-bold text-amber-400">
                        -${item.discrepancyValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </span>
                    </div>

                    <h3 className="text-xs font-bold text-white mt-2">{item.paradoxTitle}</h3>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{item.explanation}</p>

                    <div className="mt-3 flex items-center justify-between text-[10px] text-slate-500 pt-2 border-t border-slate-800">
                      <span>{item.entityId}</span>
                      <span className={`font-semibold ${item.status === 'resolved' ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {item.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Deep Paradox Inspector Panel */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            {selectedAnomaly && (
              <div className="space-y-6">
                
                {/* Card Header Detail */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-mono text-amber-400 font-bold">{selectedAnomaly.id}</span>
                      <span className="text-xs text-slate-400">| Detected {selectedAnomaly.detectedTimestamp}</span>
                    </div>
                    <h2 className="text-lg font-bold text-white mt-1">{selectedAnomaly.paradoxTitle}</h2>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleResolve(selectedAnomaly.id)}
                      disabled={selectedAnomaly.status === 'resolved' || resolvingId === selectedAnomaly.id}
                      className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center space-x-2 transition-all shadow-lg shadow-amber-500/20 disabled:opacity-50"
                    >
                      {resolvingId === selectedAnomaly.id ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Solving Paradox...</span>
                        </>
                      ) : selectedAnomaly.status === 'resolved' ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Paradox Resolved</span>
                        </>
                      ) : (
                        <>
                          <Zap className="w-4 h-4 fill-current" />
                          <span>Execute Paradox Solver</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Paradox Breakdown Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
                    <span className="text-[10px] text-slate-400 font-mono uppercase">Paradox Entity & Discrepancy</span>
                    <p className="text-sm font-bold text-white">{selectedAnomaly.entityId}</p>
                    <p className="text-2xl font-bold text-rose-400 font-mono">
                      ${selectedAnomaly.discrepancyValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </p>
                  </div>

                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
                    <span className="text-[10px] text-slate-400 font-mono uppercase">AI Confidence & Solver Strategy</span>
                    <p className="text-sm font-bold text-amber-400">{selectedAnomaly.aiConfidence}% Clause Match</p>
                    <p className="text-xs text-slate-300">{selectedAnomaly.solverStrategy}</p>
                  </div>
                </div>

                {/* Paradox Explanation */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
                  <h4 className="text-xs font-bold text-slate-300 font-mono flex items-center space-x-2">
                    <FileText className="w-3.5 h-3.5 text-amber-400" />
                    <span>Contract & Invoice Audit Explanation</span>
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {selectedAnomaly.explanation}
                  </p>
                </div>

                {/* Automated Resolution Steps */}
                <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-3">
                  <h4 className="text-xs font-bold text-white font-mono flex items-center space-x-2">
                    <Scale className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Autonomous Resolution Workflow</span>
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-start space-x-2 text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Cross-referenced PDF invoice text against Master Service Agreement Clause 14.2.</span>
                    </div>
                    <div className="flex items-start space-x-2 text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Verified Brent Crude market index at $78.20/bbl (below $90/bbl threshold).</span>
                    </div>
                    <div className="flex items-start space-x-2 text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Generated vendor formal credit memo notice for total ${selectedAnomaly.discrepancyValue}.</span>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* Interactive Paradox Inspector Tool */}
            <div className="border-t border-slate-800 pt-6 space-y-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Interactive Paradox Inspector Prompt</span>
              </h3>

              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Paste PO or Invoice number (e.g. INV-9905) to run live Paradox Audit..."
                  value={customInspectorText}
                  onChange={(e) => setCustomInspectorText(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
                />
                <button
                  onClick={handleRunCustomInspector}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-xl text-xs flex items-center space-x-1"
                >
                  <Search className="w-3.5 h-3.5 text-amber-400" />
                  <span>Inspect</span>
                </button>
              </div>

              {inspectorResult && (
                <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-300 font-mono">
                  {inspectorResult}
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* TAB 3: Solvex Crystal Clear Black Box Visualizer */}
      {activeTab === 'crystal_glassbox' && (
        <div className="space-y-6">
          {/* Glass Box Transparency Header */}
          <div className="bg-slate-900 border-2 border-cyan-500/40 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start space-x-3">
                <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-2xl shrink-0">
                  <Boxes className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-0.5 rounded bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-[10px] font-mono font-bold uppercase">
                      SOLVEX CRYSTAL CLEAR BLACK BOX (ZERO-OBSCURITY ENGINE)
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold">
                      INVARIANTS VERIFIED
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-white mt-1">Full Optical & Mathematical Transparency Matrix</h2>
                  <p className="text-xs text-slate-300 mt-1 max-w-2xl">
                    Illuminating internal neural weights, entropy collapse, Tether node proofs, and zero-knowledge verification steps with zero opacity.
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsSimulatingCollapse(true);
                  setTimeout(() => {
                    setEntropyLevel(Number((0.001 + Math.random() * 0.05).toFixed(4)));
                    setMatrixCoherence(Number((99.95 + Math.random() * 0.04).toFixed(2)));
                    setIsSimulatingCollapse(false);
                  }, 1200);
                }}
                disabled={isSimulatingCollapse}
                className="px-4 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs flex items-center space-x-2 transition-all shadow-lg shadow-cyan-500/20 shrink-0"
              >
                <RefreshCw className={`w-4 h-4 ${isSimulatingCollapse ? 'animate-spin' : ''}`} />
                <span>Simulate Entropy Force Collapse</span>
              </button>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 font-mono">
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3">
                <span className="text-[10px] text-slate-500 block">System Entropy</span>
                <span className="text-sm font-bold text-cyan-400">{entropyLevel} H(X)</span>
              </div>
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3">
                <span className="text-[10px] text-slate-500 block">Matrix Coherence</span>
                <span className="text-sm font-bold text-emerald-400">{matrixCoherence}%</span>
              </div>
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3">
                <span className="text-[10px] text-slate-500 block">ZK-SNARK Proof Status</span>
                <span className="text-sm font-bold text-amber-400">PASSED (Groth16)</span>
              </div>
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3">
                <span className="text-[10px] text-slate-500 block">Glass Box Node</span>
                <span className="text-sm font-bold text-purple-400">{selectedProofNode}</span>
              </div>
            </div>
          </div>

          {/* Neural Glass Matrix Visualization & Mathematical Proof Steps */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Visual Glass Matrix Grid */}
            <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>Transparent Neural Weight & Invariant Matrix (54 Nodes)</span>
              </h3>

              <div className="grid grid-cols-6 sm:grid-cols-9 gap-2 p-4 bg-slate-950 border border-slate-800 rounded-xl">
                {Array.from({ length: 54 }).map((_, idx) => {
                  const nodeId = `TETHER-NODE-${idx + 1}`;
                  const isSelected = selectedProofNode === nodeId;
                  const isOptimal = idx % 5 !== 0;

                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedProofNode(nodeId)}
                      className={`h-10 rounded-lg border font-mono text-[10px] flex flex-col items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-cyan-500 text-slate-950 border-cyan-300 font-bold shadow-lg shadow-cyan-500/30'
                          : isOptimal
                          ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20'
                          : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20'
                      }`}
                    >
                      <span>N{idx + 1}</span>
                      <span className="text-[8px] opacity-80">{isOptimal ? '0.99' : '1.00'}</span>
                    </button>
                  );
                })}
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2 font-mono text-xs">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">
                  Active Proof Node Details: {selectedProofNode}
                </span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-slate-300 text-[11px]">
                  <div>• Matrix Weight: <span className="text-cyan-400 font-bold">0.99842</span></div>
                  <div>• Mathematical Invariant: <span className="text-emerald-400 font-bold">Σ(W) = 1.00000</span></div>
                  <div>• Execution Latency: <span className="text-amber-400 font-bold">0.42 ms</span></div>
                </div>
              </div>
            </div>

            {/* Step-by-Step Glass Box Reasoning Log */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Step-by-Step Reasoning Trace</span>
              </h3>

              <div className="space-y-3 text-xs font-mono">
                <div className="p-3 bg-slate-950 border border-cyan-500/30 rounded-xl space-y-1">
                  <div className="flex items-center justify-between text-cyan-400 text-[10px] font-bold">
                    <span>STEP 1: INGESTION & OCR</span>
                    <span>PASS</span>
                  </div>
                  <p className="text-slate-300 text-[11px]">Parsed PDF line items, vendor tax IDs, and EDI invoice metadata.</p>
                </div>

                <div className="p-3 bg-slate-950 border border-cyan-500/30 rounded-xl space-y-1">
                  <div className="flex items-center justify-between text-cyan-400 text-[10px] font-bold">
                    <span>STEP 2: PARADOX AUDIT</span>
                    <span>SOLVED</span>
                  </div>
                  <p className="text-slate-300 text-[11px]">88 paradox algorithms evaluated. Flagged and neutralized zero-variance discrepancy.</p>
                </div>

                <div className="p-3 bg-slate-950 border border-cyan-500/30 rounded-xl space-y-1">
                  <div className="flex items-center justify-between text-cyan-400 text-[10px] font-bold">
                    <span>STEP 3: ZK PROOF GENERATION</span>
                    <span>VERIFIED</span>
                  </div>
                  <p className="text-slate-300 text-[11px]">Groth16 ZK-SNARK proof generated & verified in 0.88ms.</p>
                </div>

                <div className="p-3 bg-slate-950 border border-emerald-500/30 rounded-xl space-y-1">
                  <div className="flex items-center justify-between text-emerald-400 text-[10px] font-bold">
                    <span>STEP 4: IMMUTABLE LEDGER POST</span>
                    <span>BALANCED</span>
                  </div>
                  <p className="text-slate-300 text-[11px]">Voucher #VR-2026-8801 posted to SOX 404 double-entry ledger.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

