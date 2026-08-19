import React, { useState } from 'react';
import { ShieldCheck, Globe, AlertTriangle, Scale, RefreshCw, CheckCircle2 } from 'lucide-react';
import { SAMPLE_CONFLICT_CASES } from '../data/registryData';
import { ConflictResolutionEngine } from '../modules/ConflictResolutionEngine';
import { ConflictCase } from '../types';

export const ConflictAnalysisPanel: React.FC = () => {
  const engine = new ConflictResolutionEngine();
  const [cases, setCases] = useState<ConflictCase[]>(engine.getCases());
  const [activeCase, setActiveCase] = useState<ConflictCase>(cases[0]);
  const [regionInput, setRegionInput] = useState<string>('South China Sea Trade & Energy Passage');
  const [scenarioInput, setScenarioInput] = useState<string>('Overlapping Exclusive Economic Zones (EEZ) causing naval standoff between sovereign fleets and commercial transport interruptions.');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  const handleAnalyze = async () => {
    if (!regionInput.trim() || !scenarioInput.trim()) return;
    setIsAnalyzing(true);
    try {
      const newCase = await engine.analyzeConflict(regionInput, scenarioInput);
      setCases([newCase, ...cases]);
      setActiveCase(newCase);
    } catch (e) {
      console.error('Error analyzing conflict:', e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="bg-[#0A0A10] border border-[#2A2A35] rounded-lg p-6 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-[0.1em] text-[#E0E0F0] uppercase flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-[#00F0FF]" />
            <span>Geopolitical Conflict Analysis & Resolution Engine</span>
          </h1>
          <p className="text-[#A0A0B0] text-xs mt-1 max-w-2xl">
            Non-zero-sum game theory synthesis, escalation vector calibration (Levels 1-5), and UN human rights treaty compliance.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-[#050507] border border-[#00FF41]/40 px-3 py-1.5 rounded font-mono text-xs text-[#00FF41] green-glow">
          <Globe className="w-4 h-4 text-[#00FF41]" />
          <span>UN HUMAN RIGHTS ALIGNED</span>
        </div>
      </div>

      {/* Input & Case Selection */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Conflict Input */}
        <div className="lg:col-span-2 bg-[#0A0A10] border border-[#2A2A35] rounded-lg p-6 space-y-4">
          <h2 className="text-xs font-bold text-[#505060] tracking-widest uppercase flex items-center space-x-2">
            <Globe className="w-4 h-4 text-[#00F0FF]" />
            <span>Analyze New Conflict Scenario</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-[#A0A0B0] font-mono">Target Region / Sector</label>
              <input
                type="text"
                value={regionInput}
                onChange={(e) => setRegionInput(e.target.value)}
                placeholder="e.g. Baltic Sea Energy Pipeline"
                className="w-full bg-[#050507] border border-[#2A2A35] rounded p-2.5 text-xs text-[#E0E0F0] focus:outline-none focus:border-[#00F0FF]"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-[#A0A0B0] font-mono">Scenario Description</label>
              <input
                type="text"
                value={scenarioInput}
                onChange={(e) => setScenarioInput(e.target.value)}
                placeholder="Briefly state sovereign tension points..."
                className="w-full bg-[#050507] border border-[#2A2A35] rounded p-2.5 text-xs text-[#E0E0F0] focus:outline-none focus:border-[#00F0FF]"
              />
            </div>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !regionInput.trim()}
            className="w-full py-3 bg-[#00F0FF] hover:bg-white text-[#050507] font-bold text-xs tracking-[0.15em] uppercase transition-all rounded shadow-[0_0_12px_rgba(0,240,255,0.2)] flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-[#050507]" />
                <span>Generating Non-Zero-Sum Resolution Matrix via Gemini AI...</span>
              </>
            ) : (
              <>
                <Scale className="w-4 h-4 text-[#050507]" />
                <span>Synthesize De-Escalation Plan & Game Theory Matrix</span>
              </>
            )}
          </button>
        </div>

        {/* Right: Existing Scenarios Selector */}
        <div className="bg-[#0A0A10] border border-[#2A2A35] rounded-lg p-6 space-y-3 font-mono text-xs">
          <h2 className="text-xs font-bold text-[#505060] tracking-widest uppercase">
            Active Geopolitical Cases
          </h2>
          <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
            {cases.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCase(c)}
                className={`w-full text-left p-3 rounded transition-all space-y-1 cursor-pointer ${
                  activeCase.id === c.id
                    ? 'bg-[#12121A] border-l-2 border-[#00F0FF] text-[#00F0FF] shadow-md'
                    : 'bg-[#0A0A10] border border-[#1A1A25] text-[#808090] hover:bg-[#12121A]'
                }`}
              >
                <div className="flex items-center justify-between font-bold">
                  <span>{c.id}</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#380010] text-rose-300 border border-rose-800">
                    Lvl {c.escalationLevel} Escalation
                  </span>
                </div>
                <div className="font-sans text-xs text-[#E0E0F0] truncate">{c.region}</div>
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Selected Case Detailed Analysis */}
      {activeCase && (
        <div className="bg-[#0A0A10] border border-[#2A2A35] rounded-lg p-6 space-y-5 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2A2A35] pb-3 font-mono">
            <div>
              <div className="flex items-center space-x-2 text-[10px] text-[#00F0FF] mb-1">
                <span>{activeCase.id}</span>
                <span>•</span>
                <span>{activeCase.region}</span>
              </div>
              <h2 className="text-lg font-bold text-white font-sans">{activeCase.title}</h2>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-[10px] text-[#505060] uppercase">Escalation Vector:</span>
              <span className="px-2.5 py-1 bg-[#380010] text-rose-300 border border-rose-800 text-xs font-bold font-mono rounded">
                Level {activeCase.escalationLevel} / 5
              </span>
            </div>
          </div>

          {/* Key Actors & Root Causes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-[#12121A] p-4 rounded border border-[#2A2A35] space-y-2">
              <h3 className="font-bold text-[#00F0FF] uppercase tracking-wider font-mono text-[11px]">Key Stakeholders & Actors</h3>
              <ul className="list-disc list-inside text-[#A0A0B0] space-y-1">
                {activeCase.actors.map((actor, idx) => (
                  <li key={idx}>{actor}</li>
                ))}
              </ul>
            </div>

            <div className="bg-[#12121A] p-4 rounded border border-[#2A2A35] space-y-2">
              <h3 className="font-bold text-rose-400 uppercase tracking-wider font-mono text-[11px]">Primary Root Causes</h3>
              <ul className="list-disc list-inside text-[#A0A0B0] space-y-1">
                {activeCase.rootCauses.map((cause, idx) => (
                  <li key={idx}>{cause}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Game Theory Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            
            <div className="bg-[#380010]/30 border border-rose-500/40 p-4 rounded space-y-2">
              <div className="flex items-center space-x-2 text-rose-300 font-bold font-mono text-[11px]">
                <AlertTriangle className="w-4 h-4" />
                <span>ZERO-SUM FAILURE STATE</span>
              </div>
              <p className="text-[#A0A0B0] leading-relaxed">
                {activeCase.gameTheoryMatrix.zeroSumOutcome}
              </p>
            </div>

            <div className="bg-[#002810]/30 border border-[#00FF41]/40 p-4 rounded space-y-2">
              <div className="flex items-center space-x-2 text-[#00FF41] font-bold font-mono text-[11px]">
                <CheckCircle2 className="w-4 h-4" />
                <span>WIN-WIN DIALECTIC SYNTHESIS</span>
              </div>
              <p className="text-[#A0A0B0] leading-relaxed">
                {activeCase.gameTheoryMatrix.winWinSynthesis}
              </p>
            </div>

          </div>

          {/* Actionable De-escalation Steps */}
          <div className="bg-[#12121A] p-4 rounded border border-[#2A2A35] space-y-3">
            <h3 className="text-xs font-bold text-[#505060] tracking-widest uppercase font-mono">
              Actionable De-Escalation Sequence
            </h3>
            <ol className="list-decimal list-inside text-xs text-[#E0E0F0] space-y-2">
              {activeCase.deEscalationSteps.map((step, idx) => (
                <li key={idx} className="leading-relaxed">{step}</li>
              ))}
            </ol>
          </div>

          {/* Human Rights Standards Applied */}
          <div className="border-t border-[#2A2A35] pt-3 space-y-2 text-xs">
            <span className="font-mono text-[#505060] text-[10px] uppercase">Applied International & Human Rights Standards:</span>
            <div className="flex flex-wrap gap-2 font-mono text-[10px]">
              {activeCase.humanRightsStandardsApplied.map((hr, idx) => (
                <span key={idx} className="px-2.5 py-1 bg-[#050507] border border-[#2A2A35] text-[#00F0FF] rounded">
                  {hr}
                </span>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
