import React, { useState } from 'react';
import { 
  MONITORED_PLATFORMS, 
  INNOVATION_CHALLENGES, 
  InnovationChallenge, 
  InnovationPlatform 
} from '../data/challengeHubData';
import { 
  Zap, 
  Shield, 
  Check, 
  Search, 
  SlidersHorizontal, 
  Radio, 
  ExternalLink, 
  ArrowRight, 
  RefreshCw, 
  Activity,
  Layers,
  Sparkles,
  Bot
} from 'lucide-react';

export const ChallengeHubView: React.FC = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [activeFeasibilityChallenge, setActiveFeasibilityChallenge] = useState<InnovationChallenge | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanMessage, setScanMessage] = useState('');

  const handleFullScan = () => {
    setIsScanning(true);
    setScanMessage('Scanning 6 enterprise & government innovation platforms...');
    setTimeout(() => {
      setIsScanning(false);
      setScanMessage('Scan complete. 12 challenges mapped against 88 paradoxes.');
      setTimeout(() => setScanMessage(''), 4000);
    }, 2000);
  };

  const filteredChallenges = INNOVATION_CHALLENGES.filter(c => {
    const matchesPlatform = selectedPlatform === 'ALL' || c.source.toLowerCase().includes(selectedPlatform.toLowerCase());
    const matchesStatus = selectedStatus === 'ALL' || c.category === selectedStatus;
    return matchesPlatform && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* 1. TOP TITLE HEADER & FULL PLATFORM SCAN BUTTON */}
      <div className="bg-[#0b0f1a] border border-slate-800 rounded-2xl p-6 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1.5">
          <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider flex items-center space-x-2">
            <span>dAIsy haMINJA</span>
            <span>•</span>
            <span className="text-amber-400">CHALLENGE HUB - U.A.R.E.F.A.K.E. ENGINE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white font-mono">
            Enterprise Innovation Challenge Monitor
          </h1>
          <p className="text-xs text-slate-300 font-sans max-w-3xl leading-relaxed">
            Autonomous monitoring of 6 enterprise/government innovation platforms – dAIsy cross-references each challenge against 88 resolved paradoxes.
          </p>
          {scanMessage && (
            <div className="text-xs font-mono text-emerald-400 flex items-center space-x-2 pt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>{scanMessage}</span>
            </div>
          )}
        </div>

        <button
          onClick={handleFullScan}
          disabled={isScanning}
          className="px-5 py-3 bg-amber-400 hover:bg-amber-300 disabled:opacity-75 text-black font-black text-xs font-mono rounded-xl shadow-lg shadow-amber-500/20 flex items-center justify-center space-x-2 transition-transform hover:scale-[1.02] shrink-0"
        >
          <Zap className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
          <span>{isScanning ? 'SCANNING ENGINES...' : '⚡ FULL PLATFORM SCAN'}</span>
        </button>
      </div>

      {/* 2. dAIsy INTEGRATION PROTOCOL - AUTONOMOUS PIPELINE */}
      <div className="bg-[#080b12] border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3">
        <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold">
          dAIsy INTEGRATION PROTOCOL — AUTONOMOUS PIPELINE
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-black/70 border border-amber-500/40 rounded-xl p-3 space-y-1">
            <div className="flex items-center space-x-2">
              <span className="bg-amber-400 text-black text-[10px] font-black px-1.5 py-0.5 rounded font-mono">1</span>
              <span className="text-xs font-bold text-amber-400 font-mono">PARSE</span>
            </div>
            <p className="text-[11px] text-slate-300 font-mono leading-relaxed">
              Scrape challenge briefs • Extract requirements + constraints
            </p>
          </div>

          <div className="bg-black/70 border border-slate-800 rounded-xl p-3 space-y-1">
            <div className="flex items-center space-x-2">
              <span className="bg-slate-800 text-slate-300 text-[10px] font-black px-1.5 py-0.5 rounded font-mono">2</span>
              <span className="text-xs font-bold text-cyan-400 font-mono">CROSS-REF</span>
            </div>
            <p className="text-[11px] text-slate-300 font-mono leading-relaxed">
              Map against 88 paradoxes • TETHER-BUBBLE v2.0 alignment
            </p>
          </div>

          <div className="bg-black/70 border border-slate-800 rounded-xl p-3 space-y-1">
            <div className="flex items-center space-x-2">
              <span className="bg-slate-800 text-slate-300 text-[10px] font-black px-1.5 py-0.5 rounded font-mono">3</span>
              <span className="text-xs font-bold text-purple-400 font-mono">SIMULATE</span>
            </div>
            <p className="text-[11px] text-slate-300 font-mono leading-relaxed">
              54-node feasibility gate • NIST/SOC2/ISO compliance check
            </p>
          </div>

          <div className="bg-black/70 border border-slate-800 rounded-xl p-3 space-y-1">
            <div className="flex items-center space-x-2">
              <span className="bg-slate-800 text-slate-300 text-[10px] font-black px-1.5 py-0.5 rounded font-mono">4</span>
              <span className="text-xs font-bold text-emerald-400 font-mono">EXECUTE</span>
            </div>
            <p className="text-[11px] text-slate-300 font-mono leading-relaxed">
              Auto-disclosure + submission dossier • IRS-First sequestration
            </p>
          </div>
        </div>
      </div>

      {/* 3. METRIC SUMMARY STATS CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="bg-[#0a0d16] border border-slate-800 p-4 rounded-xl space-y-1">
          <div className="text-2xl font-bold text-white font-mono">6</div>
          <div className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">PLATFORMS</div>
        </div>
        <div className="bg-[#0a0d16] border border-slate-800 p-4 rounded-xl space-y-1">
          <div className="text-2xl font-bold text-cyan-400 font-mono">12</div>
          <div className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">CHALLENGES</div>
        </div>
        <div className="bg-[#0a0d16] border border-slate-800 p-4 rounded-xl space-y-1">
          <div className="text-2xl font-bold text-amber-400 font-mono">0</div>
          <div className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">FEASIBLE TARGETS</div>
        </div>
        <div className="bg-[#0a0d16] border border-slate-800 p-4 rounded-xl space-y-1">
          <div className="text-2xl font-bold text-emerald-400 font-mono">$11.4M</div>
          <div className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">TOTAL PRIZE POOL</div>
        </div>
        <div className="bg-[#0a0d16] border border-slate-800 p-4 rounded-xl space-y-1">
          <div className="text-2xl font-bold text-purple-400 font-mono">12</div>
          <div className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">COMPLIANCE READY</div>
        </div>
      </div>

      {/* 4. MONITORED PLATFORMS — AUTONOMOUS SCRAPER ACTIVE */}
      <div className="space-y-3">
        <div className="text-xs font-mono text-slate-400 uppercase tracking-widest font-bold">
          MONITORED PLATFORMS — AUTONOMOUS SCRAPER ACTIVE
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MONITORED_PLATFORMS.map((platform) => (
            <div
              key={platform.id}
              className="bg-[#0a0d16] border border-slate-800 rounded-xl p-4 space-y-3 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono mb-2">
                  <span className="text-slate-500 font-bold uppercase">{platform.category}</span>
                  <span className="bg-slate-800 text-cyan-300 font-bold px-2 py-0.5 rounded border border-slate-700">
                    {platform.count}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white mb-1.5 font-mono">
                  {platform.name}
                </h3>

                <p className="text-xs text-slate-400 mb-2 leading-relaxed">
                  {platform.description}
                </p>

                <p className="text-[11px] text-slate-500 font-mono">
                  <span className="text-slate-400 font-semibold">BEST FOR:</span> {platform.bestFor}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs">
                <div className="flex items-center space-x-1.5 text-emerald-400 font-mono text-[11px]">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>MONITORING</span>
                </div>
                <button
                  onClick={() => alert(`Active Scraper for ${platform.name} refreshed.`)}
                  className="px-3 py-1 bg-black hover:bg-slate-900 border border-slate-700 text-slate-300 text-[10px] font-mono rounded"
                >
                  SCAN NOW
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. CHALLENGE FEED — 12 / 12 CHALLENGES */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-800">
          <div className="text-xs font-mono font-bold text-white flex items-center space-x-2">
            <span>CHALLENGE FEED — {filteredChallenges.length} / 12 CHALLENGES</span>
          </div>

          <div className="flex items-center space-x-2 text-xs font-mono">
            <select
              value={selectedPlatform}
              onChange={e => setSelectedPlatform(e.target.value)}
              className="bg-black border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-amber-400"
            >
              <option value="ALL">ALL PLATFORMS</option>
              <option value="XPRIZE">XPRIZE</option>
              <option value="USA.gov">USA.gov</option>
              <option value="HackerOne">HackerOne / Bugcrowd</option>
              <option value="NASA">NASA Tournament Lab</option>
              <option value="Wazoku">Wazoku (InnoCentive)</option>
              <option value="Brightidea">Brightidea / IdeaScale</option>
            </select>

            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              className="bg-black border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-amber-400"
            >
              <option value="ALL">ALL CATEGORIES</option>
              <option value="AI-GOVERNANCE">AI-GOVERNANCE</option>
              <option value="SECURITY">SECURITY</option>
              <option value="IDENTITY">IDENTITY</option>
              <option value="OPTIMIZATION">OPTIMIZATION</option>
              <option value="REGULATORY">REGULATORY</option>
            </select>
          </div>
        </div>

        {/* 2-Column Challenge Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredChallenges.map((challenge) => {
            return (
              <div
                key={challenge.id}
                className="bg-[#0a0d16] border border-slate-800 rounded-xl p-5 space-y-4 flex flex-col justify-between relative hover:border-slate-600 transition-colors"
              >
                <div>
                  {/* Top Bar: Tags + Feasibility Circle */}
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-blue-500/20 text-blue-300 border border-blue-500/40">
                          {challenge.category}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40">
                          {challenge.status}
                        </span>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-white font-mono leading-snug">
                        {challenge.title}
                      </h3>
                      <div className="text-[11px] text-slate-400 font-mono">
                        {challenge.source}
                      </div>
                    </div>

                    {/* Feasibility score circle */}
                    <div className="flex flex-col items-center shrink-0">
                      <div className="w-12 h-12 rounded-full border-2 border-amber-400 flex items-center justify-center bg-black/60 shadow-[0_0_12px_rgba(245,158,11,0.2)]">
                        <span className="text-base font-bold text-amber-300 font-mono">
                          {challenge.feasibilityScore}
                        </span>
                      </div>
                      <span className="text-[9px] font-mono text-slate-500 uppercase mt-0.5">FEASIBILITY</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 font-sans leading-relaxed mb-3">
                    {challenge.description}
                  </p>

                  {/* Metrics Bar */}
                  <div className="grid grid-cols-3 gap-2 bg-black/70 p-2.5 rounded-lg border border-slate-800 text-[11px] font-mono mb-3">
                    <div>
                      <div className="text-[9px] text-slate-500 font-bold uppercase">PRIZE VALUE</div>
                      <div className="text-emerald-400 font-bold">{challenge.prizeValue}</div>
                    </div>
                    <div>
                      <div className="text-[9px] text-slate-500 font-bold uppercase">DEADLINE</div>
                      <div className="text-slate-300">{challenge.deadline}</div>
                    </div>
                    <div>
                      <div className="text-[9px] text-slate-500 font-bold uppercase">PARADOX MATCHES</div>
                      <div className="text-purple-400 font-bold">{challenge.paradoxMatches}</div>
                    </div>
                  </div>

                  {/* Compliance Badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {challenge.complianceTags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900/80 border border-slate-800 text-slate-300"
                      >
                        ✓ {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-800/80">
                  <button
                    onClick={() => setActiveFeasibilityChallenge(challenge)}
                    className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-lg text-xs font-mono font-bold transition-colors"
                  >
                    RUN FEASIBILITY GATE -&gt;
                  </button>
                  <button
                    onClick={() => alert(`Autonomous Disclosure generated for ${challenge.title}. Sequestered in vault.`)}
                    className="w-full py-2 bg-amber-400 hover:bg-amber-300 text-black font-black rounded-lg text-xs font-mono transition-transform hover:scale-[1.02]"
                  >
                    GENERATE DISCLOSURE
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. STRATEGIC TARGETS — 2026 ARCHITECTURE INTERFACES (BOTTOM BANNER) */}
      <div className="bg-[#080b12] border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
          dAIsy haMINJA STRATEGIC TARGETS — 2026 ARCHITECTURE INTERFACES
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-black/70 border border-slate-800/80 rounded-xl p-4 space-y-2">
            <h4 className="text-cyan-400 font-bold font-mono">
              DECENTRALIZED AI &amp; ON-CHAIN GOVERNANCE
            </h4>
            <p className="text-slate-300 font-sans text-[11px] leading-relaxed">
              Autonomous DeFi treasury management, verifiable on-chain decision-making. dAIsy deploys recursive agents to optimize smart contract execution and risk mitigation in permissioned liquidity pools.
            </p>
          </div>

          <div className="bg-black/70 border border-slate-800/80 rounded-xl p-4 space-y-2">
            <h4 className="text-purple-400 font-bold font-mono">
              EMBODIED AI &amp; ROBOTIC MANIPULATION (ICRA 2026)
            </h4>
            <p className="text-slate-300 font-sans text-[11px] leading-relaxed">
              Dexterous manipulation, real-world embodied intelligence, cloud robotics. Interfacing simulation-to-physical workcells to validate 54-node logic against real-time physical constraints.
            </p>
          </div>

          <div className="bg-black/70 border border-slate-800/80 rounded-xl p-4 space-y-2">
            <h4 className="text-emerald-400 font-bold font-mono">
              PRIVACY-ENHANCING TECHNOLOGIES (PETs)
            </h4>
            <p className="text-slate-300 font-sans text-[11px] leading-relaxed">
              Secure Multi-Party Computation (MPC), Zero Knowledge Proofs (ZKPs). dAIsy bridges proprietary paradox solutions into compliance-heavy financial data without compromising privacy.
            </p>
          </div>
        </div>
      </div>

      {/* 7. FEASIBILITY GATE MODAL */}
      {activeFeasibilityChallenge && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0b0f19] border border-amber-400/50 rounded-2xl max-w-xl w-full p-6 space-y-5 shadow-2xl">
            <div className="border-b border-slate-800 pb-3">
              <div className="text-[10px] text-amber-400 font-mono font-bold uppercase tracking-wider">
                dAIsy FEASIBILITY GATE RESULT
              </div>
              <h2 className="text-base font-bold text-white font-mono mt-1">
                {activeFeasibilityChallenge.title}
              </h2>
            </div>

            {/* Score box */}
            <div className="bg-black/80 border border-amber-500/40 rounded-xl p-4 space-y-2">
              <div className="flex items-baseline space-x-3">
                <span className="text-4xl font-bold text-amber-400 font-mono">
                  {activeFeasibilityChallenge.feasibilityScore}
                </span>
                <span className="text-slate-500 font-mono text-sm">/ 100</span>
                <span className="text-amber-300 font-bold font-mono text-xs uppercase px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30">
                  {activeFeasibilityChallenge.feasibilityLevel}
                </span>
              </div>
              <p className="text-xs text-slate-300 font-sans">
                {activeFeasibilityChallenge.feasibilityLevel === 'EXPLORATORY TARGET'
                  ? 'Exploratory phase. Monitor for requirement alignment as challenge evolves.'
                  : 'High feasibility. Paradox synthesis models match required constraints.'}
              </p>
            </div>

            {/* Scoring Rationale */}
            <div className="space-y-2 text-xs font-mono">
              <div className="text-[10px] text-slate-400 font-bold uppercase">SCORING RATIONALE:</div>
              <div className="bg-black/60 p-3 rounded-lg border border-slate-800 text-[11px] text-slate-300 leading-relaxed">
                {activeFeasibilityChallenge.scoringRationale.keywordMatches} {activeFeasibilityChallenge.scoringRationale.complianceFrameworks} {activeFeasibilityChallenge.scoringRationale.brainDbMatches}
              </div>
            </div>

            {/* Tether Bubble types */}
            <div className="space-y-1.5 text-xs font-mono">
              <div className="text-[10px] text-slate-400 font-bold uppercase">TETHER-BUBBLE RESOLUTION TYPES:</div>
              <div className="flex flex-wrap gap-2">
                {activeFeasibilityChallenge.scoringRationale.tetherBubbleTypes.map((type, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-[10px]">
                    {type}
                  </span>
                ))}
              </div>
            </div>

            {/* Compliance Frameworks */}
            <div className="space-y-1.5 text-xs font-mono">
              <div className="text-[10px] text-slate-400 font-bold uppercase">COMPLIANCE FRAMEWORK MATCH:</div>
              <div className="flex flex-wrap gap-2">
                {activeFeasibilityChallenge.complianceTags.map((tag, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300 text-[10px]">
                    ✓ {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-800">
              <button
                onClick={() => setActiveFeasibilityChallenge(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-mono font-bold"
              >
                CLOSE
              </button>
              <button
                onClick={() => {
                  alert(`Simulation triggered for ${activeFeasibilityChallenge.title}. All 54 recursive nodes synced.`);
                  setActiveFeasibilityChallenge(null);
                }}
                className="px-5 py-2 bg-amber-400 hover:bg-amber-300 text-black rounded-lg text-xs font-mono font-bold shadow-lg shadow-amber-500/20"
              >
                ADVANCE TO SIMULATE -&gt;
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
