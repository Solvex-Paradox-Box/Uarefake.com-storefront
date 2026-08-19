import React, { useState, useEffect } from 'react';
import { Sparkles, Layers, Lock, FileText, CheckCircle2, ArrowRight, RefreshCw, BookmarkCheck } from 'lucide-react';
import { PARADOX_REGISTRY_88 } from '../data/registryData';
import { VerifiedCorpusLLM } from '../modules/VerifiedCorpusLLM';
import { SolutionPersistence } from '../modules/SolutionPersistence';
import { SynthesizedSolution, ParadoxDefinition } from '../types';

export const SolverDashboard: React.FC = () => {
  const [problemInput, setProblemInput] = useState<string>('How to resolve regional supply chain bottlenecks without increasing balance sheet capital expenditure or violating labor standards?');
  const [selectedParadoxId, setSelectedParadoxId] = useState<number>(1);
  const [isSolving, setIsSolving] = useState<boolean>(false);
  const [activeSolution, setActiveSolution] = useState<SynthesizedSolution | null>(null);
  const [savedSolutions, setSavedSolutions] = useState<SynthesizedSolution[]>([]);

  useEffect(() => {
    setSavedSolutions(SolutionPersistence.getSolutions());
  }, []);

  const primaryParadox = PARADOX_REGISTRY_88.find(p => p.id === selectedParadoxId) || PARADOX_REGISTRY_88[0];
  const pairedParadox = PARADOX_REGISTRY_88.find(p => p.id === primaryParadox.crossFirePairId) || PARADOX_REGISTRY_88[1];

  const handleSolve = async () => {
    if (!problemInput.trim()) return;
    setIsSolving(true);
    try {
      const solution = await VerifiedCorpusLLM.solveProblem(problemInput, selectedParadoxId);
      setActiveSolution(solution);
      setSavedSolutions(SolutionPersistence.getSolutions());
    } catch (e) {
      console.error('Error solving paradox:', e);
    } finally {
      setIsSolving(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="bg-[#0A0A10] border border-[#2A2A35] rounded-lg p-6 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold tracking-[0.1em] text-[#E0E0F0] uppercase flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-[#00F0FF]" />
              <span>Dual-Track Universal Problem Solver</span>
            </h1>
            <p className="text-[#A0A0B0] text-xs mt-1">
              Cross-fire synthesis engine grounding problem vectors over verified sources (.edu, .gov, law, UN) with 88-paradox dialectic pairing.
            </p>
          </div>
          <div className="flex items-center space-x-2 bg-[#050507] border border-[#00F0FF]/30 px-3 py-1.5 rounded font-mono text-xs text-[#00F0FF] cyan-glow-sm">
            <Lock className="w-4 h-4 text-[#00F0FF]" />
            <span>ZK IP LOCKBOX VAULT ACTIVE</span>
          </div>
        </div>
      </div>

      {/* Inputs Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Input Form */}
        <div className="lg:col-span-2 bg-[#0A0A10] border border-[#2A2A35] rounded-lg p-6 space-y-4">
          <h2 className="text-xs font-bold text-[#505060] tracking-widest uppercase flex items-center space-x-2">
            <Layers className="w-4 h-4 text-[#00F0FF]" />
            <span>Problem Definition & Paradox Selection</span>
          </h2>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-[#A0A0B0]">
              Problem Vector / User Challenge
            </label>
            <textarea
              rows={4}
              value={problemInput}
              onChange={(e) => setProblemInput(e.target.value)}
              placeholder="Describe the operational, geopolitical, or economic challenge to synthesize..."
              className="w-full bg-[#050507] border border-[#2A2A35] rounded p-3 text-[#E0E0F0] text-xs focus:outline-none focus:border-[#00F0FF] leading-relaxed font-sans"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#A0A0B0]">
                Primary Thesis Paradox
              </label>
              <select
                value={selectedParadoxId}
                onChange={(e) => setSelectedParadoxId(Number(e.target.value))}
                className="w-full bg-[#050507] border border-[#2A2A35] rounded p-2 text-xs text-[#E0E0F0] focus:outline-none focus:border-[#00F0FF] font-mono"
              >
                {PARADOX_REGISTRY_88.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.code}: {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#A0A0B0]">
                Auto-Paired Antithesis Paradox
              </label>
              <div className="w-full bg-[#050507] border border-[#FFB800]/40 rounded p-2 text-xs text-[#FFB800] font-mono flex items-center justify-between">
                <span>{pairedParadox.code}: {pairedParadox.name}</span>
                <span className="text-[10px] text-[#505060]"># {pairedParadox.id}</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleSolve}
            disabled={isSolving || !problemInput.trim()}
            className="w-full py-3 bg-[#00F0FF] hover:bg-white text-[#050507] font-bold text-xs tracking-[0.15em] uppercase transition-all rounded shadow-[0_0_12px_rgba(0,240,255,0.2)] flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
          >
            {isSolving ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-[#050507]" />
                <span>Executing Dual-Track Synthesis via Gemini AI...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-[#050507]" />
                <span>Synthesize Dual-Track Solution & Lock IP</span>
              </>
            )}
          </button>
        </div>

        {/* Right: Paradox Info Box */}
        <div className="bg-[#0A0A10] border border-[#2A2A35] rounded-lg p-6 space-y-4 font-mono text-xs">
          <h3 className="font-bold text-[#505060] tracking-widest uppercase border-b border-[#2A2A35] pb-2">
            Active Paradox Vector Pair
          </h3>

          <div className="p-3 rounded bg-[#12121A] border-l-2 border-[#00F0FF] space-y-1.5">
            <div className="text-[#00F0FF] font-bold">{primaryParadox.code} — Thesis</div>
            <div className="text-[#E0E0F0] text-xs font-sans font-semibold">{primaryParadox.name}</div>
            <p className="text-[11px] text-[#A0A0B0] font-sans leading-relaxed">{primaryParadox.description}</p>
            <div className="text-[10px] text-[#505060]">Domain: {primaryParadox.verifiedSourceDomain}</div>
          </div>

          <div className="p-3 rounded bg-[#12121A] border-l-2 border-[#FFB800] space-y-1.5">
            <div className="text-[#FFB800] font-bold">{pairedParadox.code} — Antithesis</div>
            <div className="text-[#E0E0F0] text-xs font-sans font-semibold">{pairedParadox.name}</div>
            <p className="text-[11px] text-[#A0A0B0] font-sans leading-relaxed">{pairedParadox.description}</p>
            <div className="text-[10px] text-[#505060]">Domain: {pairedParadox.verifiedSourceDomain}</div>
          </div>

          <div className="p-2.5 rounded bg-[#050507] border border-[#1A1A25] text-[10px] text-[#808090] space-y-1">
            <div className="text-[#A0A0B0] font-bold">Mathematical Dialectic Formula:</div>
            <div className="text-[#00FF41]">{primaryParadox.resolutionFormula}</div>
          </div>
        </div>

      </div>

      {/* Output Solution View */}
      {activeSolution && (
        <div className="bg-[#0A0A10] border border-[#00F0FF]/50 rounded-lg p-6 space-y-5 shadow-2xl cyan-glow animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2A2A35] pb-3">
            <div>
              <div className="flex items-center space-x-2 text-[10px] font-mono text-[#00FF41] mb-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>DUAL-TRACK SYNTHESIS COMPLETE</span>
                <span>•</span>
                <span>CONFIDENCE: {(activeSolution.confidenceScore * 100).toFixed(1)}%</span>
              </div>
              <h2 className="text-lg font-bold text-white tracking-wide">{activeSolution.title}</h2>
            </div>

            <div className="p-2.5 bg-[#050507] rounded border border-[#2A2A35] text-xs font-mono">
              <div className="text-[#505060] text-[9px] uppercase">ZK IP LOCKBOX PROOF</div>
              <div className="text-[#00F0FF] text-[10px] truncate max-w-xs">{activeSolution.zkLockboxHash}</div>
            </div>
          </div>

          {/* Dual-Track Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Track A */}
            <div className="bg-[#12121A] border-l-2 border-[#00F0FF] border-y border-r border-[#2A2A35] rounded p-4 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-[#00F0FF] border-b border-[#1A1A25] pb-1.5">
                <span className="font-bold">TRACK A: ANALYTIC DECOMPOSITION</span>
                <span className="text-[9px] text-[#505060]">EMPIRICAL DEDUCTIVE</span>
              </div>
              <p className="text-xs text-[#A0A0B0] leading-relaxed">
                {activeSolution.dualTrackSynthesis.trackA_Analytic}
              </p>
            </div>

            {/* Track B */}
            <div className="bg-[#12121A] border-l-2 border-[#FFB800] border-y border-r border-[#2A2A35] rounded p-4 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-[#FFB800] border-b border-[#1A1A25] pb-1.5">
                <span className="font-bold">TRACK B: DIALECTIC CROSS-FIRE</span>
                <span className="text-[9px] text-[#505060]">CONTRADICTION SYNTHESIS</span>
              </div>
              <p className="text-xs text-[#A0A0B0] leading-relaxed">
                {activeSolution.dualTrackSynthesis.trackB_Dialectic}
              </p>
            </div>

          </div>

          {/* Higher Order Synthesized Resolution */}
          <div className="bg-[#12121F] border border-[#00F0FF]/40 rounded p-4 space-y-2">
            <h3 className="text-xs font-bold text-[#00F0FF] font-mono uppercase tracking-wider flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-[#FFB800]" />
              <span>Synthesized Non-Zero-Sum Resolution (ZK Locked)</span>
            </h3>
            <p className="text-xs text-[#E0E0F0] leading-relaxed font-sans">
              {activeSolution.dualTrackSynthesis.synthesizedResolution}
            </p>
          </div>

          {/* Verified Citations */}
          <div className="space-y-2 border-t border-[#2A2A35] pt-3">
            <h4 className="text-[10px] font-mono text-[#505060] uppercase">Grounding Corpus Citations:</h4>
            <div className="flex flex-wrap gap-2 text-[10px] font-mono">
              {activeSolution.verifiedCitations.map((cite, i) => (
                <span key={i} className="px-2 py-0.5 rounded bg-[#050507] border border-[#2A2A35] text-[#A0A0B0]">
                  {cite}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Saved ZK Lockbox History */}
      <div className="bg-[#0A0A10] border border-[#2A2A35] rounded-lg p-6 space-y-4">
        <h2 className="text-xs font-bold text-[#505060] tracking-widest uppercase flex items-center space-x-2">
          <BookmarkCheck className="w-4 h-4 text-[#00F0FF]" />
          <span>ZK IP Lockbox Persistent Solution Vault ({savedSolutions.length})</span>
        </h2>

        {savedSolutions.length === 0 ? (
          <p className="text-xs text-[#505060] py-2 font-mono">No solutions saved in lockbox yet. Synthesize a problem above to generate persistent ZK proofs.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {savedSolutions.map((sol) => (
              <div key={sol.id} className="bg-[#12121A] border border-[#2A2A35] rounded p-3 space-y-1.5 text-xs font-mono">
                <div className="flex items-center justify-between text-[#00F0FF] font-bold">
                  <span>{sol.id}</span>
                  <span className="text-[9px] text-[#00FF41] bg-[#002810] px-1.5 py-0.5 border border-[#00FF41]/30">
                    {sol.ipStatus}
                  </span>
                </div>
                <div className="font-sans text-[#E0E0F0] font-semibold text-xs">{sol.title}</div>
                <div className="text-[#505060] text-[10px] truncate">{sol.zkLockboxHash}</div>
                <div className="text-[9px] text-[#505060] pt-1 border-t border-[#1A1A25] flex justify-between">
                  <span>Version: {sol.version}</span>
                  <span>{new Date(sol.timestampISO).toLocaleTimeString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
