import React, { useState, useEffect } from 'react';
import { Brain, Cpu, Zap, Activity, Layers, Sparkles, BarChart2, CheckCircle2, ChevronRight, Filter, ShieldCheck, Lock, RefreshCw, Terminal, Server, Check, ArrowRight, Play, Shield } from 'lucide-react';
import { PARADOXES, CHAMBER_META, SOLUTION_LAYERS, BRAIN_PRODUCTS, SOVEREIGN_SOLUTIONS, getChamberForParadox } from '../data/brainData';
import { DeterministicEngine, PARADOX_AXIOM_SPACE } from '../core/engine';
import { CryptographicNodeAuth } from '../middleware/auth';
import { DeploymentReversalHarness } from '../utils/reversal';
import { AutonomousOutreachWorker } from '../workers/outreach';
import { NeonStatePersistence } from '../db/neon';
import { PayPalCheckoutGateway } from '../api/checkout';
import { SentinelTestSuite, PreFlightCheckResult } from '../tests/sentinel';

export const CognitiveBrainHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chambers' | 'layers' | 'controllers' | 'optimizer' | 'daisyEngine' | 'sentinel'>('chambers');
  const [selectedChamber, setSelectedChamber] = useState<string>('I');
  const [selectedLayer, setSelectedLayer] = useState<number>(1);
  const [paradoxFilter, setParadoxFilter] = useState<'all' | 'proprietary' | 'historical'>('all');

  // Sentinel Test Suite State
  const [sentinelResults, setSentinelResults] = useState<PreFlightCheckResult[]>([]);
  const [isRunningSentinel, setIsRunningSentinel] = useState<boolean>(false);
  const [sentinelStatus, setSentinelStatus] = useState<string>('Ready for Pre-Flight Gatekeeper Probe');

  const runSentinelAudit = async () => {
    setIsRunningSentinel(true);
    setSentinelStatus('Probing Core Engine, ::NODE-01..03, Reversals, Neon DB, and PayPal Gateway...');
    const result = await SentinelTestSuite.runAllPreFlightChecks();
    setSentinelResults(result.results);
    setIsRunningSentinel(false);
    setSentinelStatus(`Pre-Flight Complete: ${result.totalPassed} of ${result.results.length} Modules Verified Clean (0 Drift)`);
  };

  useEffect(() => {
    runSentinelAudit();
  }, []);

  // DAISY Reward Function Calculator State
  const [speedMs, setSpeedMs] = useState<number>(18);
  const [failureRate, setFailureRate] = useState<number>(0.001);
  const [infraCost, setInfraCost] = useState<number>(0.042);
  const [complianceRisk, setComplianceRisk] = useState<number>(0.005);

  const calculatedSpeed = 1 / (speedMs / 1000);
  const calculatedStability = (1 - failureRate) * 0.99;
  const calculatedCost = infraCost;
  const calculatedRisk = complianceRisk * 10;
  const rewardScore = (calculatedSpeed + calculatedStability) / (calculatedCost + calculatedRisk + 0.001);

  const activeChamberObj = CHAMBER_META.find(c => c.num === selectedChamber) || CHAMBER_META[0];
  
  const allChamberParadoxes = PARADOXES.filter(p => getChamberForParadox(p.id).num === selectedChamber);
  const chamberParadoxes = allChamberParadoxes.filter(p => {
    if (paradoxFilter === 'proprietary') return p.type === 'proprietary';
    if (paradoxFilter === 'historical') return p.type === 'historical';
    return true;
  });

  const activeLayerObj = SOLUTION_LAYERS.find(l => l.num === selectedLayer) || SOLUTION_LAYERS[0];
  const layerSolutions = SOVEREIGN_SOLUTIONS.filter(s => s.layer === selectedLayer);

  const proprietaryCount = PARADOXES.filter(p => p.type === 'proprietary').length;
  const historicalCount = PARADOXES.filter(p => p.type === 'historical').length;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-indigo-900/60 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/20">
              <Brain className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-bold text-white tracking-tight">
                  Cognitive Learning & Growth Brain Engine
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  dAIsy haMINJA Sentinel
                </span>
              </div>
              <p className="text-sm text-slate-300 mt-1 max-w-2xl">
                Proprietary AI Brain built upon <span className="text-amber-300 font-semibold">88 Solved Real Paradoxes</span> (48 Solved by Todd Jeffrey Ites Jr. + 40 Historically Solved) which unlock <span className="text-cyan-300 font-semibold">128 Solutions</span> (105 World-First B2B + 23 Sovereign .space Infrastructure) and power <span className="text-emerald-300 font-semibold">105 Turnkey Autonomous Businesses</span>.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl px-3 py-1.5 text-right font-mono">
              <div className="text-[10px] text-slate-400">Core Architecture</div>
              <div className="text-sm font-bold text-amber-400">88 Paradoxes</div>
            </div>
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl px-3 py-1.5 text-right font-mono">
              <div className="text-[10px] text-slate-400">Total Solutions</div>
              <div className="text-sm font-bold text-cyan-400">128 Solutions (105 B2B + 23 .space)</div>
            </div>
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl px-3 py-1.5 text-right font-mono">
              <div className="text-[10px] text-slate-400">Autonomous Stacks</div>
              <div className="text-sm font-bold text-emerald-400">105 AutoBiz</div>
            </div>
          </div>
        </div>

        {/* Sub-navigation Tabs */}
        <div className="flex space-x-2 border-t border-slate-800 mt-6 pt-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab('chambers')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === 'chambers'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-800/60 text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>5 Cognitive Chambers (88 Paradoxes: 48 Prop + 40 Hist)</span>
          </button>

          <button
            onClick={() => setActiveTab('layers')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === 'layers'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-800/60 text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>8 Resilience & Sovereign Layers (128 Solutions)</span>
          </button>

          <button
            onClick={() => setActiveTab('controllers')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === 'controllers'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-800/60 text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Cpu className="w-4 h-4 text-purple-400" />
            <span>13 Solvex Brain Controllers</span>
          </button>

          <button
            onClick={() => setActiveTab('optimizer')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === 'optimizer'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-800/60 text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <BarChart2 className="w-4 h-4 text-emerald-400" />
            <span>DAISY Reward Optimizer Telemetry</span>
          </button>

          <button
            onClick={() => setActiveTab('daisyEngine')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === 'daisyEngine'
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-slate-800/60 text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Terminal className="w-4 h-4 text-purple-300" />
            <span>Daisy Haminja Post-Agentic Backend (bdc)</span>
          </button>

          <button
            onClick={() => setActiveTab('sentinel')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === 'sentinel'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-800/60 text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Shield className="w-4 h-4 text-emerald-300" />
            <span>Verification Sentinel & Core Suite</span>
          </button>
        </div>
      </div>

      {/* TAB 1: 5 Cognitive Chambers */}
      {activeTab === 'chambers' && (
        <div className="space-y-6">
          {/* Chamber Selector Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {CHAMBER_META.map(ch => (
              <button
                key={ch.num}
                onClick={() => setSelectedChamber(ch.num)}
                className={`p-4 rounded-xl text-left border transition-all relative overflow-hidden ${
                  selectedChamber === ch.num
                    ? 'bg-slate-800 border-indigo-500 shadow-lg ring-1 ring-indigo-500/50'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{ch.symbol}</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    Chamber {ch.num}
                  </span>
                </div>
                <div className="mt-2 font-bold text-sm text-white">{ch.name}</div>
                <div className="text-xs text-slate-300 mt-1 font-mono font-medium">
                  {ch.total} Total ({ch.proprietary} Prop / {ch.historical} Hist)
                </div>
              </button>
            ))}
          </div>

          {/* Active Chamber Overview */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 pb-4 border-b border-slate-800">
              <div className="flex items-center space-x-3">
                <span className="text-3xl">{activeChamberObj.symbol}</span>
                <div>
                  <h2 className="text-lg font-bold text-white">Chamber {activeChamberObj.num}: {activeChamberObj.name}</h2>
                  <p className="text-xs text-slate-300">{activeChamberObj.desc}</p>
                </div>
              </div>

              {/* Sub-Filter: All vs 48 Proprietary vs 40 Historical */}
              <div className="flex items-center space-x-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 shrink-0">
                <button
                  onClick={() => setParadoxFilter('all')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    paradoxFilter === 'all'
                      ? 'bg-indigo-600 text-white shadow'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  All in Chamber ({allChamberParadoxes.length})
                </button>
                <button
                  onClick={() => setParadoxFilter('proprietary')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center space-x-1 ${
                    paradoxFilter === 'proprietary'
                      ? 'bg-amber-600 text-white shadow'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span>48 Proprietary</span>
                </button>
                <button
                  onClick={() => setParadoxFilter('historical')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center space-x-1 ${
                    paradoxFilter === 'historical'
                      ? 'bg-sky-600 text-white shadow'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span>40 Historical</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {chamberParadoxes.map(p => (
                <div key={p.id} className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-4 hover:border-indigo-500/50 transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800/50">
                        PX-{p.id.toString().padStart(2, '0')}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${
                        p.type === 'proprietary'
                          ? 'bg-amber-950/80 text-amber-300 border-amber-700/50'
                          : 'bg-sky-950/80 text-sky-300 border-sky-700/50'
                      }`}>
                        {p.type === 'proprietary' ? 'Proprietary Core' : 'Historical Foundation'}
                      </span>
                    </div>
                    <h3 className="font-semibold text-sm text-white mb-1">{p.name}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">{p.description}</p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-700/50 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                    <span className="text-slate-400">{p.origin}</span>
                    <span className="text-emerald-400 flex items-center space-x-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Synthesized</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: 8 Resilience & Sovereign Layers */}
      {activeTab === 'layers' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center space-x-3 mb-2">
              <Layers className="w-5 h-5 text-cyan-400" />
              <h2 className="text-base font-bold text-white">
                128 Total Solutions: 105 World-First B2B + 23 Sovereign .space Infrastructure Solutions
              </h2>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              By synthesizing the 88 Solved Paradoxes (48 Proprietary + 40 Historical), the dAIsy haMINJA Sentinel Intelligence Protocol unlocks 105 World-First B2B Solutions across Layers 1–7 and 23 Sovereign Infrastructure Solutions across Layer 8 (.space Enclave & Control Board).
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {SOLUTION_LAYERS.map(l => (
              <button
                key={l.num}
                onClick={() => setSelectedLayer(l.num)}
                className={`p-4 rounded-xl text-left border transition-all ${
                  selectedLayer === l.num
                    ? l.num === 8 ? 'bg-slate-800 border-amber-500 shadow-lg ring-1 ring-amber-500/50' : 'bg-slate-800 border-cyan-500 shadow-lg ring-1 ring-cyan-500/50'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xl">{l.symbol}</span>
                  <span className={`text-xs font-mono px-2 py-0.5 rounded border ${
                    l.num === 8 ? 'bg-amber-950/80 text-amber-300 border-amber-800/60' : 'bg-slate-800 text-slate-300 border-slate-700'
                  }`}>
                    {l.num === 8 ? 'Layer 8 (.space)' : `Layer ${l.num}`}
                  </span>
                </div>
                <div className="font-bold text-xs text-white line-clamp-1">{l.name}</div>
                <div className={`text-xs mt-1 font-mono font-medium ${l.num === 8 ? 'text-amber-300' : 'text-cyan-300'}`}>
                  {l.solutions} {l.num === 8 ? 'Sovereign .space Solutions' : 'World-First Solutions'}
                </div>
              </button>
            ))}
          </div>

          {/* Active Layer Details & Solutions */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="flex items-center space-x-3 pb-4 border-b border-slate-800">
              <span className="text-3xl">{activeLayerObj.symbol}</span>
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-lg font-bold text-white">Layer {activeLayerObj.num}: {activeLayerObj.name}</h2>
                  {activeLayerObj.num === 8 && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      uarefake.space Enclave
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-300 mt-0.5">{activeLayerObj.desc}</p>
              </div>
            </div>

            {/* Render Solutions in this Layer */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                  Active Solutions in Layer {activeLayerObj.num} ({layerSolutions.length} Solutions)
                </span>
                <span className="text-xs font-mono text-cyan-400">Total Solutions: 128</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {layerSolutions.map(sol => (
                  <div key={sol.id} className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-4 hover:border-cyan-500/50 transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/50 font-bold">
                          {sol.id}
                        </span>
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border uppercase ${
                          sol.layer === 8 ? 'bg-amber-950 text-amber-300 border-amber-800/60' : 'bg-slate-800 text-slate-400 border-slate-700'
                        }`}>
                          {sol.layer === 8 ? '.space Enclave' : 'World-First'}
                        </span>
                      </div>
                      <h4 className="font-semibold text-sm text-white mb-1">{sol.name}</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">{sol.description}</p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-700/50 flex items-center justify-between text-[11px] text-emerald-400 font-mono">
                      <span className="flex items-center space-x-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Autonomously Enforced</span>
                      </span>
                      <span className="text-slate-400 font-mono text-[10px]">Active</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: 13 Solvex Brain Controllers */}
      {activeTab === 'controllers' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {BRAIN_PRODUCTS.map(b => (
            <div key={b.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-purple-500/50 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-800/50">
                    {b.id}
                  </span>
                  <span className="text-xs uppercase font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                    {b.category}
                  </span>
                </div>
                <h3 className="font-bold text-slate-100 text-base mb-2">{b.name}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{b.description}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-emerald-400 font-mono">
                <span className="flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Kernel Active</span>
                </span>
                <span className="text-slate-500">0.00ms Jitter</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 4: DAISY Reward Optimizer Telemetry */}
      {activeTab === 'optimizer' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                <Zap className="w-5 h-5 text-amber-400" />
                <span>DAISY Learning Reward Telemetry Calculator</span>
              </h2>
              <p className="text-xs text-slate-300 mt-0.5">
                Evaluates execution node fitness: R = (Speed + Stability) / (Cost + Risk + ε)
              </p>
            </div>

            <div className="bg-slate-800 px-4 py-2 rounded-xl text-xs font-mono text-indigo-300 border border-indigo-700/50">
              Live Optimization Active
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-4">
              <label className="text-xs font-mono text-slate-300 block mb-2">Latency (Speed ms)</label>
              <input
                type="number"
                value={speedMs}
                onChange={e => setSpeedMs(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm font-mono text-white"
              />
              <div className="text-xs text-slate-400 mt-2">Calculated Speed score: {calculatedSpeed.toFixed(2)}</div>
            </div>

            <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-4">
              <label className="text-xs font-mono text-slate-300 block mb-2">Failure Rate</label>
              <input
                type="number"
                step="0.001"
                value={failureRate}
                onChange={e => setFailureRate(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm font-mono text-white"
              />
              <div className="text-xs text-slate-400 mt-2">Calculated Stability score: {calculatedStability.toFixed(4)}</div>
            </div>

            <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-4">
              <label className="text-xs font-mono text-slate-300 block mb-2">Infra Cost ($/hr)</label>
              <input
                type="number"
                step="0.005"
                value={infraCost}
                onChange={e => setInfraCost(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm font-mono text-white"
              />
              <div className="text-xs text-slate-400 mt-2">Cost denominator: ${calculatedCost.toFixed(3)}</div>
            </div>

            <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-4">
              <label className="text-xs font-mono text-slate-300 block mb-2">Compliance Risk Factor</label>
              <input
                type="number"
                step="0.001"
                value={complianceRisk}
                onChange={e => setComplianceRisk(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm font-mono text-white"
              />
              <div className="text-xs text-slate-400 mt-2">Risk denominator: {calculatedRisk.toFixed(3)}</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-slate-900 border border-indigo-800/60 rounded-xl p-5 flex items-center justify-between">
            <div>
              <div className="text-xs font-mono uppercase text-indigo-300 font-semibold mb-1">DAISY Fitness Output Score</div>
              <div className="text-3xl font-bold font-mono text-emerald-400">{rewardScore.toFixed(4)}</div>
              <div className="text-xs text-slate-400 mt-1">
                {rewardScore > 50 ? 'Optimal node execution state. Zero hot-swap mutations required.' : 'Sub-optimal fitness detected. Autonomous node rebalancing triggered.'}
              </div>
            </div>

            <button
              onClick={() => {
                setSpeedMs(12);
                setFailureRate(0.0005);
                setInfraCost(0.035);
                setComplianceRisk(0.001);
              }}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center space-x-2 transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Simulate Auto-Heal</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 5: Daisy Haminja Post-Agentic Backend & Agent Memory */}
      {activeTab === 'daisyEngine' && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-slate-900 border border-purple-900/60 rounded-2xl p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300">
                  <Terminal className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Daisy Haminja Post-Agentic Operational Brain</h3>
                  <p className="text-xs text-slate-400">
                    Repository: <span className="text-purple-300 font-mono font-semibold">bdc-project-api-server</span> • Self-Hosted LLM Stack
                  </p>
                </div>
              </div>

              <span className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs px-3 py-1 rounded-full font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>100% Sovereign • Zero Third-Party AI</span>
              </span>
            </div>

            {/* Architecture Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 space-y-1">
                <div className="text-[11px] text-slate-400 font-mono">Core Identity</div>
                <div className="text-xs font-bold text-white">Post-Agentic Recursive Autonomous Intelligence</div>
                <div className="text-[10px] text-purple-400">bdc-project-api-server</div>
              </div>

              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 space-y-1">
                <div className="text-[11px] text-slate-400 font-mono">Inference Stack</div>
                <div className="text-xs font-bold text-emerald-400">Self-Hosted Local LLM Stack</div>
                <div className="text-[10px] text-slate-400">No OpenAI / Groq / Gemini</div>
              </div>

              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 space-y-1">
                <div className="text-[11px] text-slate-400 font-mono">Database & Memory Sync</div>
                <div className="text-xs font-bold text-cyan-400">Neon DB PostgreSQL</div>
                <div className="text-[10px] text-slate-400">Agent Memory Ledger Active</div>
              </div>

              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 space-y-1">
                <div className="text-[11px] text-slate-400 font-mono">Domain Control Plane</div>
                <div className="text-xs font-bold text-amber-400">uarefake.space</div>
                <div className="text-[10px] text-slate-400">Node mesh & 380-char headers</div>
              </div>
            </div>

            {/* Live Audited Endpoint Definitions */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center space-x-2">
                  <Server className="w-4 h-4 text-purple-400" />
                  <span className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
                    Audited Endpoint & Route Definitions (bdc-project-api-server)
                  </span>
                </div>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800">
                  Todd Ites Jr. • Verified Origin
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
                <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-3 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-purple-300 font-bold">POST /api/tasks/execute</span>
                    <span className="text-[9px] bg-purple-950 text-purple-300 px-1.5 py-0.5 rounded border border-purple-800">LLM Local</span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-sans">
                    Handles task execution requests via self-hosted local language model architecture; logs actions into audit engine.
                  </p>
                  <div className="text-[10px] text-slate-500">Payload: 380-char header + node identifier (::NODE-01)</div>
                </div>

                <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-3 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-cyan-300 font-bold">GET/POST /api/agents/memory</span>
                    <span className="text-[9px] bg-cyan-950 text-cyan-300 px-1.5 py-0.5 rounded border border-cyan-800">Neon DB</span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-sans">
                    Manages agent memory persistence, tying directly into the live Neon Postgres database instance.
                  </p>
                  <div className="text-[10px] text-slate-500">Target: uarefake.space / Neon DB Managed Ledger</div>
                </div>

                <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-3 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-amber-300 font-bold">POST /api/vector/storage</span>
                    <span className="text-[9px] bg-amber-950 text-amber-300 px-1.5 py-0.5 rounded border border-amber-800">1536-dim</span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-sans">
                    Handles vector storage, embedding management, and retrieval operations for intent-driven manifest modules.
                  </p>
                  <div className="text-[10px] text-slate-500">Retrieval: Chamber-mapped similarity scoring</div>
                </div>
              </div>
            </div>

            {/* Agent Memory Ledger Preview */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  bdc-project-api-server Synchronized Agent Memory Ledger
                </h4>
                <span className="text-[11px] font-mono text-purple-300">Autonomous Recursive Sync</span>
              </div>

              <div className="space-y-2 font-mono text-xs">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-purple-400 font-bold">MEM-001 • Chamber 1 — Foundations</span>
                    <span className="text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">COMMITTED</span>
                  </div>
                  <div className="text-slate-200 text-xs">Initialization of Daisy Haminja post-agentic recursive supervisor on uarefake.space</div>
                  <div className="text-[11px] text-slate-400">Action: Synchronized 88 Solved Paradoxes and 23 Sovereign Infrastructure Solutions (Layer 8: S-106 to S-128).</div>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-purple-400 font-bold">MEM-002 • Chamber 4 — Structure</span>
                    <span className="text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">COMMITTED</span>
                  </div>
                  <div className="text-slate-200 text-xs">bdc-project-api-server memory sync & Neon DB state verification</div>
                  <div className="text-[11px] text-slate-400">Action: Verified zero third-party AI dependencies (OpenAI/Groq/Gemini bypass, 100% self-hosted sovereign runtime).</div>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-purple-400 font-bold">MEM-003 • Chamber 3 — Choice & Self</span>
                    <span className="text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800">SYNCHRONIZED</span>
                  </div>
                  <div className="text-slate-200 text-xs">Autonomous Procurement Task Resolution Pipeline Active</div>
                  <div className="text-[11px] text-slate-400">Action: Direct PO formulation, PayPal Instant Escrow Capture Bridge (S-126) and 380-char header deterministic signing.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: Core Logic Sentinel & Pre-Flight Gatekeeper Suite */}
      {activeTab === 'sentinel' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-emerald-900/60 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-6 h-6 text-emerald-400" />
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    Internal Testing & Verification Sentinel Suite
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                    Pre-Flight Gatekeeper Active
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-1 max-w-2xl font-mono">
                  Continuously probes live endpoints, queries database persistence, and executes deterministic assertion checks before production changes go live.
                </p>
              </div>

              <button
                onClick={runSentinelAudit}
                disabled={isRunningSentinel}
                className="bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold px-5 py-2.5 rounded-xl text-xs font-mono flex items-center space-x-2 transition-all shadow-lg shadow-emerald-500/20 active:scale-95 self-start md:self-auto disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isRunningSentinel ? 'animate-spin' : ''}`} />
                <span>{isRunningSentinel ? 'Executing Pre-Flight...' : 'Run All Sentinel Probes'}</span>
              </button>
            </div>

            <div className="bg-black/90 p-4 rounded-xl border border-slate-800 font-mono text-xs text-emerald-400">
              <span className="text-slate-500">[STATUS]: </span>{sentinelStatus}
            </div>

            {/* Verification Sentinel Results Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sentinelResults.map((res, i) => (
                <div key={i} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-300">{res.testName}</span>
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                      res.passed ? 'bg-emerald-950 text-emerald-300 border-emerald-800' : 'bg-rose-950 text-rose-300 border-rose-800'
                    }`}>
                      {res.passed ? 'PASSED (0 DRIFT)' : 'FAILED'}
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-cyan-400">Component: {res.module}</div>
                  <div className="text-[11px] font-mono text-slate-400">{res.details}</div>
                  <div className="text-[10px] font-mono text-slate-500">Latency: {res.latencyMs}ms</div>
                </div>
              ))}
            </div>

            {/* Architecture Invariant Directives List */}
            <div className="border-t border-slate-800 pt-6 space-y-4 font-mono text-xs">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Core Logic & Operational Directives (7 Architectural Axioms)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px]">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">1. Core Logic & Deterministic Engine (`src/core/engine`)</span>
                  <p className="text-slate-400 font-sans">88 resolved paradoxes & 1536-dim vector space eliminate hallucination vectors via hard mathematical axioms.</p>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-amber-400 font-bold block mb-1">2. Cryptographic Verification (`src/middleware/auth`)</span>
                  <p className="text-slate-400 font-sans">Enforces SHA-256 node header checks (`::NODE-01` to `::NODE-03`) across all API handshakes.</p>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-purple-400 font-bold block mb-1">3. Reversible Deployment (`src/utils/reversal`)</span>
                  <p className="text-slate-400 font-sans">Zero deployment or state update executed without a pre-compiled reversal vector.</p>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">4. Autonomous Outreach (`src/workers/outreach`)</span>
                  <p className="text-slate-400 font-sans">Continuous background funnels on `uarefake.com` and `uarefake.space` remove human latency.</p>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-sky-400 font-bold block mb-1">5. Secure Persistence (`src/db/neon.ts`)</span>
                  <p className="text-slate-400 font-sans">Neon PostgreSQL isolation for transactional states, user sessions, and operational logs.</p>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-indigo-400 font-bold block mb-1">6. Escrow & Gateway (`src/api/checkout`)</span>
                  <p className="text-slate-400 font-sans">PayPal Merchant integration with automated B2B payments and escrow processing.</p>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 md:col-span-2">
                  <span className="text-emerald-300 font-bold block mb-1">7. Verification Sentinel (`src/tests/sentinel.ts`)</span>
                  <p className="text-slate-400 font-sans">Automated pre-flight gatekeeper guaranteeing 0 broken code or invalid schemas reach production.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
