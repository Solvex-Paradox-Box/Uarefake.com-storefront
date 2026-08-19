import React, { useState } from 'react';
import { Cpu, DollarSign, TrendingUp, ShieldCheck, RefreshCw, Briefcase, CheckCircle2 } from 'lucide-react';
import { SAMPLE_B2B_PROBLEMS } from '../data/registryData';
import { B2BEconomicSolver } from '../modules/B2BEconomicSolver';
import { B2BProblemRequest, B2BSolutionResult } from '../types';

export const B2BEconomicDashboard: React.FC = () => {
  const [problems, setProblems] = useState<B2BProblemRequest[]>([...SAMPLE_B2B_PROBLEMS]);
  const [activeProblem, setActiveProblem] = useState<B2BProblemRequest>(problems[0]);
  const [solutionResult, setSolutionResult] = useState<B2BSolutionResult | null>(null);
  const [isSolving, setIsSolving] = useState<boolean>(false);

  // New problem form fields
  const [titleInput, setTitleInput] = useState<string>('Automated Capital Deployment vs Regulatory Arbitrage Risk');
  const [categoryInput, setCategoryInput] = useState<B2BProblemRequest['category']>('Capital Deployment');
  const [descInput, setDescInput] = useState<string>('Deploying $250M automated treasury liquidity pool across European & Asian markets while complying with Basel III capital adequacy ratios.');
  const [impactInput, setImpactInput] = useState<string>('$250M Capital Allocation');

  const handleSolveActive = async (prob: B2BProblemRequest) => {
    setIsSolving(true);
    try {
      const res = await B2BEconomicSolver.solveB2BProblem(prob);
      setSolutionResult(res);
    } catch (e) {
      console.error('Error solving B2B challenge:', e);
    } finally {
      setIsSolving(false);
    }
  };

  const handleCreateAndSolve = async () => {
    if (!titleInput.trim()) return;
    const newProb: B2BProblemRequest = {
      id: `B2B-${Date.now().toString().slice(-3)}`,
      category: categoryInput,
      title: titleInput,
      description: descInput,
      financialImpactEstimate: impactInput,
      constraints: ["SOC2 Type II", "ISO 27001", "Zero Net Debt"]
    };
    setProblems([newProb, ...problems]);
    setActiveProblem(newProb);
    await handleSolveActive(newProb);
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="bg-[#0A0A10] border border-[#2A2A35] rounded-lg p-6 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-[0.1em] text-[#E0E0F0] uppercase flex items-center space-x-2">
            <Cpu className="w-5 h-5 text-[#00F0FF]" />
            <span>B2B Enterprise & Macroeconomic Solver</span>
          </h1>
          <p className="text-[#A0A0B0] text-xs mt-1 max-w-2xl">
            Algorithmic business solutions, multi-currency FX risk pools, supply chain paradox resolution, and ROI modeling.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-[#050507] border border-[#00FF41]/40 px-3 py-1.5 rounded font-mono text-xs text-[#00FF41] green-glow">
          <DollarSign className="w-4 h-4 text-[#00FF41]" />
          <span>CAPITAL EFFICIENCY ENGINE ACTIVE</span>
        </div>
      </div>

      {/* Input & Problem Selector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Submit New B2B Challenge */}
        <div className="lg:col-span-2 bg-[#0A0A10] border border-[#2A2A35] rounded-lg p-6 space-y-4">
          <h2 className="text-xs font-bold text-[#505060] tracking-widest uppercase flex items-center space-x-2">
            <Briefcase className="w-4 h-4 text-[#00F0FF]" />
            <span>Submit B2B Financial or Operational Paradox</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-[#A0A0B0] font-mono">Category</label>
              <select
                value={categoryInput}
                onChange={(e) => setCategoryInput(e.target.value as any)}
                className="w-full bg-[#050507] border border-[#2A2A35] rounded p-2.5 text-xs text-[#E0E0F0] focus:outline-none focus:border-[#00F0FF] font-mono"
              >
                <option value="Supply Chain Paradox">Supply Chain Paradox</option>
                <option value="Resource Allocation">Resource Allocation</option>
                <option value="Market Entry Strategy">Market Entry Strategy</option>
                <option value="Macroeconomic Hedging">Macroeconomic Hedging</option>
                <option value="Regulatory Arbitrage">Regulatory Arbitrage</option>
                <option value="Capital Deployment">Capital Deployment</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-[#A0A0B0] font-mono">Financial Exposure Estimate</label>
              <input
                type="text"
                value={impactInput}
                onChange={(e) => setImpactInput(e.target.value)}
                className="w-full bg-[#050507] border border-[#2A2A35] rounded p-2.5 text-xs text-[#E0E0F0] focus:outline-none focus:border-[#00F0FF]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs text-[#A0A0B0] font-mono">Challenge Title</label>
            <input
              type="text"
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
              className="w-full bg-[#050507] border border-[#2A2A35] rounded p-2.5 text-xs text-[#E0E0F0] focus:outline-none focus:border-[#00F0FF]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-[#A0A0B0] font-mono">Description & Constraints</label>
            <textarea
              rows={3}
              value={descInput}
              onChange={(e) => setDescInput(e.target.value)}
              className="w-full bg-[#050507] border border-[#2A2A35] rounded p-2.5 text-xs text-[#E0E0F0] focus:outline-none focus:border-[#00F0FF] font-sans"
            />
          </div>

          <button
            onClick={handleCreateAndSolve}
            disabled={isSolving || !titleInput.trim()}
            className="w-full py-3 bg-[#00F0FF] hover:bg-white text-[#050507] font-bold text-xs tracking-[0.15em] uppercase transition-all rounded shadow-[0_0_12px_rgba(0,240,255,0.2)] flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
          >
            {isSolving ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-[#050507]" />
                <span>Computing Economic Solution via Gemini AI...</span>
              </>
            ) : (
              <>
                <TrendingUp className="w-4 h-4 text-[#050507]" />
                <span>Solve B2B Paradox & Generate ROI Model</span>
              </>
            )}
          </button>
        </div>

        {/* Right: Existing Scenarios */}
        <div className="bg-[#0A0A10] border border-[#2A2A35] rounded-lg p-6 space-y-3 font-mono text-xs">
          <h2 className="text-xs font-bold text-[#505060] tracking-widest uppercase">
            Preset Enterprise Paradoxes
          </h2>
          <div className="space-y-2">
            {problems.map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  setActiveProblem(p);
                  handleSolveActive(p);
                }}
                className={`w-full text-left p-3 rounded transition-all space-y-1 cursor-pointer ${
                  activeProblem.id === p.id
                    ? 'bg-[#12121A] border-l-2 border-[#00F0FF] text-[#00F0FF] shadow-md'
                    : 'bg-[#0A0A10] border border-[#1A1A25] text-[#808090] hover:bg-[#12121A]'
                }`}
              >
                <div className="flex items-center justify-between font-bold">
                  <span>{p.id}</span>
                  <span className="text-[10px] text-[#00FF41] font-mono">{p.financialImpactEstimate}</span>
                </div>
                <div className="font-sans text-xs text-[#E0E0F0] font-semibold truncate">{p.title}</div>
                <div className="text-[10px] text-[#505060]">{p.category}</div>
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Solution Result Box */}
      {solutionResult && (
        <div className="bg-[#0A0A10] border border-[#00F0FF]/50 rounded-lg p-6 space-y-5 shadow-2xl cyan-glow animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2A2A35] pb-3">
            <div>
              <div className="flex items-center space-x-2 text-[10px] font-mono text-[#00FF41] mb-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>B2B ECONOMIC SYNTHESIS COMPLETE</span>
              </div>
              <h2 className="text-lg font-bold text-white tracking-wide">{activeProblem.title}</h2>
            </div>
            <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-[#004040] text-[#00F0FF] border border-[#00F0FF]/30">
              {solutionResult.paradoxResolutionMapping}
            </span>
          </div>

          <p className="text-xs text-[#A0A0B0] leading-relaxed bg-[#050507] p-3.5 rounded border border-[#2A2A35] font-sans">
            {solutionResult.strategicFramework}
          </p>

          {/* ROI & Financial Metrics Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
            <div className="bg-[#12121A] p-3.5 rounded border border-[#2A2A35] space-y-1">
              <div className="text-[#505060] text-[10px] uppercase">PROJECTED RETURN (ROI)</div>
              <div className="text-lg font-bold text-[#00FF41]">{solutionResult.economicModel.roiProjection}</div>
            </div>

            <div className="bg-[#12121A] p-3.5 rounded border border-[#2A2A35] space-y-1">
              <div className="text-[#505060] text-[10px] uppercase">RISK MITIGATION LEVEL</div>
              <div className="text-lg font-bold text-[#00F0FF]">{solutionResult.economicModel.riskMitigationPct}% Coverage</div>
            </div>

            <div className="bg-[#12121A] p-3.5 rounded border border-[#2A2A35] space-y-1">
              <div className="text-[#505060] text-[10px] uppercase">CAPITAL EFFICIENCY GAIN</div>
              <div className="text-lg font-bold text-[#C080FF]">{solutionResult.economicModel.capitalEfficiencyGain}</div>
            </div>
          </div>

          {/* Tactical Action Plan */}
          <div className="bg-[#12121A] p-4 rounded border border-[#2A2A35] space-y-3">
            <h3 className="text-xs font-bold text-[#505060] tracking-widest uppercase font-mono">
              Tactical Enterprise Execution Sequence
            </h3>
            <ul className="list-disc list-inside text-xs text-[#E0E0F0] space-y-2 font-sans">
              {solutionResult.actionPlan.map((action, idx) => (
                <li key={idx} className="leading-relaxed">{action}</li>
              ))}
            </ul>
          </div>

          {/* Sources */}
          <div className="border-t border-[#2A2A35] pt-3 space-y-2 text-xs">
            <span className="font-mono text-[#505060] text-[10px] uppercase">Grounding Macroeconomic Repositories:</span>
            <div className="flex flex-wrap gap-2 font-mono text-[10px]">
              {solutionResult.verifiedSourcesUsed.map((src, idx) => (
                <span key={idx} className="px-2.5 py-1 bg-[#050507] border border-[#2A2A35] text-[#A0A0B0] rounded">
                  {src}
                </span>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
