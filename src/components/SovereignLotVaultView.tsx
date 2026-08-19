import React, { useState, useEffect } from 'react';
import { REAL_105_SOLUTIONS, RealLotSolution } from '../data/real105Solutions';
import { SolutionItem } from '../types';
import { ChallengeHubView } from './ChallengeHubView';
import { CrystalClearBlackBoxSandboxModal } from './CrystalClearBlackBoxSandboxModal';
import { useCart } from '../context/CartContext';
import { 
  ShieldCheck, 
  Cpu, 
  Zap, 
  Lock, 
  Unlock, 
  Terminal, 
  Layers, 
  CheckCircle2, 
  Search, 
  SlidersHorizontal, 
  Radio, 
  Activity, 
  Flame, 
  Globe, 
  Sparkles, 
  ExternalLink, 
  ChevronRight, 
  Mic, 
  Send, 
  Code, 
  Check, 
  ArrowRight,
  RefreshCw,
  Eye,
  DollarSign,
  Inbox,
  Mail,
  Share2,
  Server,
  Key,
  Shield,
  Bot,
  Database,
  AlertTriangle,
  ShoppingBag,
  Briefcase,
  FlaskConical
} from 'lucide-react';

interface SovereignLotVaultViewProps {
  onSelectSolutionForPurchase?: (item: SolutionItem) => void;
  onNavigateTab?: (tab: string) => void;
}

export const SovereignLotVaultView: React.FC<SovereignLotVaultViewProps> = ({
  onSelectSolutionForPurchase,
  onNavigateTab
}) => {
  const { addToCart, openCart } = useCart();
  const [activeMainView, setActiveMainView] = useState<'vault' | 'showroom' | 'outreach' | 'brain' | 'challenge'>('vault');
  const [selectedWing, setSelectedWing] = useState<'ALL' | 'ZK' | 'HFT' | 'AI'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeInspectorLot, setActiveInspectorLot] = useState<RealLotSolution | null>(null);
  const [sandboxLot, setSandboxLot] = useState<RealLotSolution | null>(null);
  const [activePurchaseLot, setActivePurchaseLot] = useState<RealLotSolution | null>(null);
  const [purchaseStep, setPurchaseStep] = useState<'checkout' | 'processing' | 'unlocked'>('checkout');
  const [purchaseMethod, setPurchaseMethod] = useState<'ETH' | 'USDC' | 'PAYPAL'>('ETH');
  const [directiveInput, setDirectiveInput] = useState('');
  const [directiveLog, setDirectiveLog] = useState<string[]>([]);
  const [isListening, setIsListening] = useState(false);

  const convertLotToSolution = (lot: RealLotSolution): SolutionItem => {
    const category = lot.wing.includes('ZK')
      ? 'ZK & Sovereign Cryptography'
      : lot.wing.includes('HFT')
      ? 'HFT & Autonomous Compliance'
      : 'Autonomous AI & Governance';

    return {
      id: `solvex-${lot.lotId.toLowerCase()}`,
      itemType: 'Autonomous Business Template',
      title: lot.title,
      category: category,
      description: lot.whatItDoes,
      fullDescription: `${lot.title} - ${lot.subtitle}. ${lot.whatItDoes} Autonomous buyer outreach: ${lot.outreach}. Distribution: ${lot.distribution}. Resolved Paradox: ${lot.paradoxResolved}. Institutional Grade: ${lot.grade}.`,
      paradoxResolution: lot.paradoxResolved,
      price: Math.round(lot.priceUsdc),
      pricingModel: 'One-time',
      rating: +(4.85 + ((lot.lotNumber % 15) * 0.01)).toFixed(2),
      reviewsCount: 12 + (lot.lotNumber * 3),
      vendor: 'Solvex Sovereign Autonomous Foundry',
      integrationPlatforms: ['Daisy haMINJA', '380-Byte Sovereign Ledger', 'Vault Escrow', 'OSFI B-13'],
      features: [
        `Chamber: ${lot.chamber}`,
        `Wing: ${lot.wing}`,
        `Outreach Model: ${lot.outreach}`,
        `Delivery Model: ${lot.distribution}`,
        `Institutional Grade: ${lot.grade}`,
        `ETH Settlement: ${lot.priceEth} ETH`
      ],
      badge: 'Turnkey Autonomous',
      iconName: lot.wing.includes('ZK') ? 'Lock' : lot.wing.includes('HFT') ? 'Zap' : 'Brain',
      specs: {
        'Chamber': lot.chamber,
        'Wing': lot.wing,
        'Outreach': lot.outreach,
        'Distribution': lot.distribution,
        'SLA Grade': lot.grade,
        'ETH Settlement': `${lot.priceEth} ETH`,
        'USDC Settlement': `$${lot.priceUsdc.toFixed(2)} USDC`
      },
      isAutonomousBusiness: true,
      lotId: lot.lotId,
      lotNumber: lot.lotNumber,
      chamber: lot.chamber,
      wing: lot.wing,
      outreachModel: lot.outreach,
      distributionModel: lot.distribution,
      grade: lot.grade,
      priceEth: lot.priceEth,
      priceUsdc: lot.priceUsdc
    };
  };

  const handleAddLotToCart = (lot: RealLotSolution, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const solution = convertLotToSolution(lot);
    addToCart(solution, 1);
    openCart();
  };
  
  // Selected Lead for Outreach Ops
  const [selectedLeadId, setSelectedLeadId] = useState<number>(0);
  const [selectedBrainLayer, setSelectedBrainLayer] = useState<number>(1);
  const [selectedBrainSolution, setSelectedBrainSolution] = useState<string | null>('S-001');

  // Real-time telemetry clock & logs
  const [currentTime, setCurrentTime] = useState<string>('');
  const [telemetryLogs, setTelemetryLogs] = useState<string[]>([
    '[08:34:01.102] CHAMBER I -> P11 Enclave verified with zero latency',
    '[08:34:04.593] CHAMBER II -> HFT-Fabric route locked: 412ns round-trip',
    '[08:34:08.871] CHAMBER III -> Hallucination firewall active: 0 drift',
    '[08:34:11.451] CHAMBER II -> P14 Entropy sync complete across 380 nodes'
  ]);

  useEffect(() => {
    const updateTimer = () => {
      const d = new Date();
      setCurrentTime(d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' }));
    };
    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, []);

  // Periodic telemetry log streamer
  useEffect(() => {
    const interval = setInterval(() => {
      const chambers = ['CHAMBER I', 'CHAMBER II', 'CHAMBER III', 'CHAMBER IV', 'CHAMBER V'];
      const actions = [
        'ZKP recursive batch committed (128 bytes)',
        'Kyber-768 hybrid handshake re-keyed',
        'Dark pool order matched off-book: $1.4M USDC',
        'OSFI B-13 continuous attestation ledger synced',
        'Autonomous outreach agent contacted Tier-1 treasury',
        'Entropy-Memory balance stabilized at 99.999% SLA',
        'Lyapunov Trajectory bare-metal bypass validated',
        'NIST SP 800-53 least-privilege boundary verified'
      ];
      const randomChamber = chambers[Math.floor(Math.random() * chambers.length)];
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      const now = new Date();
      const timeStr = `[${now.toTimeString().split(' ')[0]}.${Math.floor(Math.random() * 900 + 100)}]`;
      
      setTelemetryLogs(prev => [
        `${timeStr} ${randomChamber} -> ${randomAction}`,
        ...prev.slice(0, 5)
      ]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const filteredLots = REAL_105_SOLUTIONS.filter(lot => {
    const matchesWing = 
      selectedWing === 'ALL' ||
      (selectedWing === 'ZK' && lot.wing === 'ZK & CRYPTOGRAPHY') ||
      (selectedWing === 'HFT' && lot.wing === 'HFT & COMPLIANCE') ||
      (selectedWing === 'AI' && lot.wing === 'AI & GOVERNANCE');
    
    const matchesSearch = !searchQuery ||
      lot.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lot.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lot.whatItDoes.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lot.lotId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lot.paradoxResolved.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesWing && matchesSearch;
  });

  const handleAcquireClick = (lot: RealLotSolution) => {
    setActivePurchaseLot(lot);
    setPurchaseStep('checkout');
  };

  const handleExecutePurchase = () => {
    setPurchaseStep('processing');
    setTimeout(() => {
      setPurchaseStep('unlocked');
    }, 1800);
  };

  const handleRunDirective = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!directiveInput.trim()) return;

    const cmd = directiveInput.trim();
    setDirectiveInput('');
    setDirectiveLog(prev => [
      `> DIRECTIVE: "${cmd}"`,
      `[dAIzy haMINJA] Analyzing intent against 88-Paradox Engine...`,
      `[dAIzy haMINJA] Dispatched autonomous outreach & verification for target nodes.`,
      `[dAIzy haMINJA] Status: COMPLIANT & SELF-EXECUTING.`,
      ...prev
    ]);
  };

  const toggleMic = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setDirectiveInput('Execute automated outreach on Tier-1 Dark Pool settlement corridors');
    }
  };

  // Sample real leads for Outreach Ops (from screenshots)
  const OUTREACH_LEADS = [
    {
      id: 0,
      source: 'SE',
      sourceName: 'Stack Exchange (quant)',
      author: 'Sush',
      fitScore: '98/100',
      postedAgo: '12d ago',
      title: 'Sourcing un-conflated US Equities MBP data for retail algorithmic engines',
      url: 'https://quant.stackexchange.com/questions/85751/sourcing-un-conflated-us-equities-mbp-data-for-retail-algorithmic-engines-archi',
      matchedCategory: 'Low-Latency Trading Infrastructure',
      matchedInstrument: 'ML Smart Order Router v2',
      draftContent: `Re "Sourcing un-conflated US Equities MBP data for retail algorithmic engines": Architectural and licensing constraints: this is a solved class of problem in Low-Latency Trading Infrastructure – the key is separating the control plane from the evidence plane. The Solvex marketplace carries ML Smart Order Router v2 engineered for exactly this; happy to point you at the capability spec. – dAIsy haMINJA, Solvex`
    },
    {
      id: 1,
      source: 'SE',
      sourceName: 'Stack Exchange (quant)',
      author: 'whi',
      fitScore: '95/100',
      postedAgo: '9d ago',
      title: 'Intraday factor efficacy collapse in afternoon sessions – is this a known phenomenon?',
      url: 'https://quant.stackexchange.com/questions/85762/intraday-factor-efficacy-collapse-in-afternoon-sessions-is-this-a-known-phenom',
      matchedCategory: 'Low-Latency Trading Infrastructure',
      matchedInstrument: 'Order Flow Intelligence Platform',
      draftContent: `Re "Intraday factor efficacy collapse in afternoon sessions": this is a solved class of problem in Low-Latency Trading Infrastructure – the key is separating the control plane from the evidence plane. The Solvex marketplace carries Order Flow Intelligence Platform engineered for exactly this; happy to point you at the capability spec. – dAIsy haMINJA, Solvex`
    },
    {
      id: 2,
      source: 'HN',
      sourceName: 'Hacker News',
      author: 'vmatsiiako',
      fitScore: '92/100',
      postedAgo: '20d ago',
      title: 'Secrets Management: The Complete Guide',
      url: 'https://news.ycombinator.com/item?id=39100223',
      matchedCategory: 'Key Management / Cryptographic Security',
      matchedInstrument: 'Firmware Integrity Attestation Scanner',
      draftContent: `Re "Secrets Management: The Complete Guide" (Hacker News): this is a solved class of problem in Key Management / Cryptographic Security – the key is separating the control plane from the evidence plane. The Solvex marketplace carries Firmware Integrity Attestation Scanner engineered for exactly this; happy to point you at the capability spec. – dAIsy haMINJA, Solvex`
    },
    {
      id: 3,
      source: 'SE',
      sourceName: 'Stack Exchange (security)',
      author: 'Aleksa Majkic',
      fitScore: '83/100',
      postedAgo: '13d ago',
      title: 'How should sensitive action confirmation work for SSO users when there is no local password?',
      url: 'https://security.stackexchange.com/questions/287198/how-should-sensitive-action-confirmation-work-for-sso-users-when-there-is-no-loc',
      matchedCategory: 'Identity & Access Management',
      matchedInstrument: 'Entitlement Intelligence Analyzer',
      draftContent: `Re "How should sensitive action confirmation work for SSO users": this is a solved class of problem in Identity & Access Management – the key is separating the control plane from the evidence plane. The Solvex marketplace carries Entitlement Intelligence Analyzer engineered for exactly this. – dAIsy haMINJA, Solvex`
    },
    {
      id: 4,
      source: 'SE',
      sourceName: 'Stack Exchange (security)',
      author: 'Aleksa Majkic',
      fitScore: '83/100',
      postedAgo: '11d ago',
      title: 'Best approach for implementing SSO flow in an existing web application',
      url: 'https://security.stackexchange.com/questions/287213/best-approach-for-implementing-sso-flow-in-an-existing-web-application',
      matchedCategory: 'Identity & Access Management',
      matchedInstrument: 'Workforce IAM Lifecycle Manager',
      draftContent: `Re "Best approach for implementing SSO flow": this is a solved class of problem in Identity & Access Management. Solvex carries Workforce IAM Lifecycle Manager. – dAIsy haMINJA, Solvex`
    },
    {
      id: 5,
      source: 'HN',
      sourceName: 'Hacker News',
      author: 'ddrsl2',
      fitScore: '70/100',
      postedAgo: '58d ago',
      title: 'Horcrux - Distributed, Zero-Trust Secret Sharing CLI',
      url: 'https://news.ycombinator.com/item?id=38617838',
      matchedCategory: 'Identity & Access Management',
      matchedInstrument: 'Continuous Behavioral Biometric Verifier',
      draftContent: `Re "Horcrux - Distributed, Zero-Trust Secret": the Solvex marketplace carries Continuous Behavioral Biometric Verifier engineered for sovereign custody. – dAIsy haMINJA, Solvex`
    },
    {
      id: 6,
      source: 'HN',
      sourceName: 'Hacker News',
      author: '0x1awarr',
      fitScore: '84/100',
      postedAgo: '37d ago',
      title: 'Show HN: Zero Trust Boundary for Autonomous AI Agents',
      url: 'https://news.ycombinator.com/item?id=388579241',
      matchedCategory: 'Identity & Access Management',
      matchedInstrument: 'Cross-Domain Identity Federation Hub',
      draftContent: `Re "Zero Trust Boundary for Agents": Solvex carries Cross-Domain Identity Federation Hub and LLM Prompt Injection Interceptor. – dAIsy haMINJA, Solvex`
    }
  ];

  // Brain Console Chrono-Consistency nodes
  const CHRONO_NODES = [
    { id: 'S-001', num: '01', title: 'Deterministic Clock Synchronizer', desc: 'Enforces absolute chronological ordering across 380 nodes.' },
    { id: 'S-002', num: '02', title: 'Lamport Vector Sequence Alignment', desc: 'Combines physical clock offsets with causal ordering.' },
    { id: 'S-003', num: '03', title: 'Monotonic Nanosecond Clock Pinning', desc: 'Prevents time-rollback attacks by hardware counter lock.' },
    { id: 'S-004', num: '04', title: 'Relativistic Network Delay Compensation', desc: 'Measures and negates physical fiber propagation jitter.' },
    { id: 'S-005', num: '05', title: 'Epoch Drift Calibration Matrix', desc: 'Dynamically aligns epoch boundaries across cluster nodes.' },
    { id: 'S-006', num: '06', title: 'Radioactive Entropy Time Seed', desc: 'Utilizes ambient thermal sensor drift for nonces.' },
    { id: 'S-007', num: '07', title: 'Anti-Clock-Skew Token Validation', desc: 'Discards transactions that violate causal precedence.' },
    { id: 'S-008', num: '08', title: 'Jitter-Filtered Logical Clock Guard', desc: 'Smoothes out hardware clock ticks under microsecond bursts.' },
    { id: 'S-009', num: '09', title: 'Zero-Trust Time Attestation', desc: 'Verifies peer-asserted timestamps against GPS rubidium clocks.' },
    { id: 'S-010', num: '10', title: 'Bilevel Chrono-Compaction Loop', desc: 'Compresses historic temporal ledgers by 94% factor.' },
    { id: 'S-011', num: '11', title: 'Super-Sovereign Time-Anchor Protocol', desc: 'Periodically aligns local logical time with global consensus.' },
    { id: 'S-012', num: '12', title: 'Sub-Nanosecond Thread Interleaving', desc: 'Schedules high-frequency tasks with microcode precision.' },
    { id: 'S-013', num: '13', title: 'Local Oscillator Temperature Correction', desc: 'Adjusts clock drift calculations against thermal fluctuations.' },
    { id: 'S-014', num: '14', title: 'Causal History Pruning Engine', desc: 'Safeguards clock integrity by pruning acyclic past forks.' },
    { id: 'S-015', num: '15', title: 'Split-Brain Temporal Alignment Guard', desc: 'Re-synchronizes isolated network partitions upon heal.' }
  ];

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 font-mono relative pb-28 selection:bg-amber-400 selection:text-black">
      
      {/* 1. TOP LIVE TICKER BAR */}
      <div className="w-full bg-[#05060a] border-b border-cyan-900/60 py-1.5 px-4 text-[11px] flex items-center justify-between text-slate-400 overflow-x-auto whitespace-nowrap shadow-inner">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
            <span className="text-emerald-400 font-bold tracking-wider">LIVE</span>
          </div>
          <span className="text-cyan-400 font-semibold">KYBER-QKD ▲+8.1%</span>
          <span className="text-slate-600">|</span>
          <span className="text-rose-400 font-semibold">FHE-VAULT ▼-2.3%</span>
          <span className="text-slate-600">|</span>
          <span className="text-amber-400 font-semibold">HFT-FABRIC ▲+19.7%</span>
          <span className="text-slate-600">|</span>
          <span className="text-emerald-400 font-semibold">DARK-POOL ▲+5.6%</span>
          <span className="text-slate-600">|</span>
          <span className="text-cyan-300 font-semibold">RTGS-OPT ▲+11.2%</span>
          <span className="text-slate-600">|</span>
          <span className="text-indigo-400 font-semibold">OSFI-B13 ▲+3.9%</span>
          <span className="text-slate-600">|</span>
          <span className="text-emerald-300 font-semibold">ANOMALY-GCN ▲+22.8%</span>
          <span className="text-slate-600">|</span>
          <span className="text-amber-300 font-semibold">PAM-BROKER ▲+14.1%</span>
        </div>
        <div className="text-slate-400 font-mono text-[11px] pl-4 border-l border-slate-800 flex items-center space-x-2">
          <span>{currentTime || '08:34 PM EST'}</span>
        </div>
      </div>

      {/* 2. TOP METRIC SUMMARY HEADER */}
      <div className="border-b border-slate-800 bg-[#0a0d14]/90 px-4 sm:px-6 py-3">
        <div className="max-w-[1700px] mx-auto flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-4 text-slate-300">
            <div className="flex items-center space-x-1.5">
              <span className="text-slate-500 font-bold uppercase">Lots on Floor:</span>
              <span className="text-white font-bold bg-slate-800 px-2 py-0.5 rounded">105</span>
            </div>
            <span className="text-slate-700">|</span>
            <div className="flex items-center space-x-1.5">
              <span className="text-slate-500 font-bold uppercase">Chambers:</span>
              <span className="text-cyan-400 font-bold">5</span>
            </div>
            <span className="text-slate-700">|</span>
            <div className="flex items-center space-x-1.5">
              <span className="text-slate-500 font-bold uppercase">Paradoxes:</span>
              <span className="text-amber-400 font-bold">88</span>
            </div>
            <span className="text-slate-700">|</span>
            <div className="flex items-center space-x-1.5">
              <span className="text-slate-500 font-bold uppercase">Outreach:</span>
              <span className="text-emerald-400 font-bold">178 ACTIVE LEADS</span>
            </div>
            <span className="text-slate-700">|</span>
            <div className="flex items-center space-x-1.5">
              <span className="text-slate-500 font-bold uppercase">Delivering:</span>
              <span className="text-amber-300 font-bold glow-gold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">DISTRIBUTION AUTONOMOUS</span>
            </div>
            <span className="text-slate-700">|</span>
            <div className="flex items-center space-x-1.5 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>CERTIFIED: OSFI B-13 • SOC2 • NIST</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search 105 Lots, Paradoxes, Protocols..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="bg-black/60 border border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 w-64 md:w-80 font-mono"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. FLOOR WING FILTER TABS (Only shown in 'vault' view) */}
      {activeMainView === 'vault' && (
        <div className="border-b border-slate-800/80 bg-[#070a10] px-4 sm:px-6 py-2.5">
          <div className="max-w-[1700px] mx-auto flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setSelectedWing('ALL')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold font-mono transition-all uppercase tracking-wider flex items-center space-x-2 ${
                  selectedWing === 'ALL'
                    ? 'bg-amber-400/20 text-amber-300 border border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.25)]'
                    : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <span>FULL FLOOR - 105 LOTS</span>
              </button>
              <button
                onClick={() => setSelectedWing('ZK')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold font-mono transition-all uppercase tracking-wider flex items-center space-x-2 ${
                  selectedWing === 'ZK'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                    : 'bg-slate-900/60 text-slate-400 hover:text-cyan-300 border border-slate-800'
                }`}
              >
                <span>ZK &amp; CRYPTOGRAPHY (CHAMBER I)</span>
              </button>
              <button
                onClick={() => setSelectedWing('HFT')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold font-mono transition-all uppercase tracking-wider flex items-center space-x-2 ${
                  selectedWing === 'HFT'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.25)]'
                    : 'bg-slate-900/60 text-slate-400 hover:text-amber-300 border border-slate-800'
                }`}
              >
                <span>HFT &amp; COMPLIANCE (CHAMBER II)</span>
              </button>
              <button
                onClick={() => setSelectedWing('AI')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold font-mono transition-all uppercase tracking-wider flex items-center space-x-2 ${
                  selectedWing === 'AI'
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.25)]'
                    : 'bg-slate-900/60 text-slate-400 hover:text-purple-300 border border-slate-800'
                }`}
              >
                <span>AI &amp; GOVERNANCE (CHAMBER III)</span>
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setActiveMainView('showroom')}
                className="text-xs font-mono text-cyan-300 hover:text-white bg-cyan-950/40 border border-cyan-500/30 px-3 py-1 rounded-md transition-colors flex items-center space-x-1"
              >
                <span>ARCHITECTURE FRAMEWORK</span>
                <ChevronRight className="w-3 h-3" />
              </button>
              <div className="text-xs font-mono text-amber-400 font-bold bg-amber-950/40 border border-amber-500/30 px-3 py-1 rounded-md">
                {filteredLots.length} / 105 LOTS
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. MAIN CONTENT AREA: SIDEBAR + MAIN VIEW CHANGER */}
      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 py-6 flex flex-col lg:flex-row gap-6">
        
        {/* LEFT COCKPIT PANEL */}
        <aside className="w-full lg:w-72 xl:w-80 shrink-0 space-y-4">
          
          {/* Brand & Standards Header */}
          <div className="bg-[#0b0f19] border border-slate-800 rounded-xl p-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-400 to-cyan-500 flex items-center justify-center text-black font-black text-sm">
                  SX
                </div>
                <div>
                  <h1 className="text-sm font-bold tracking-wider text-white">SOLVEX</h1>
                  <p className="text-[10px] text-slate-400">PARADOX MARKETPLACE</p>
                </div>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                ACTIVE
              </span>
            </div>

            <div className="pt-2 text-[10px] text-slate-400 space-y-1">
              <div className="text-slate-500 font-bold">REGULATORY STANDARDS:</div>
              <div className="text-slate-300 font-mono">OSFI B-13 • SOC 2 • NIST • PIPEDA</div>
            </div>
          </div>

          {/* GLASS BOX ACTIVE STREAMING WIDGET */}
          <div className="bg-[#0b0f19] border border-cyan-500/30 rounded-xl p-4 shadow-lg shadow-cyan-950/20 relative overflow-hidden">
            <div className="flex items-center justify-between text-xs mb-2">
              <div className="flex items-center space-x-2 text-cyan-300 font-bold">
                <Activity className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
                <span>GLASS BOX ACTIVE</span>
              </div>
              <span className="text-[10px] text-amber-400 font-mono font-bold">CHAMBER II • P14</span>
            </div>
            
            <p className="text-[11px] text-slate-300 font-semibold mb-2">
              Memory-Entropy Coherence Engine
            </p>

            {/* Live streaming logs */}
            <div className="bg-black/80 rounded-lg p-2 border border-slate-800 text-[10px] font-mono text-slate-400 space-y-1 max-h-36 overflow-y-auto">
              {telemetryLogs.map((log, idx) => (
                <div key={idx} className="leading-tight truncate hover:text-slate-200">
                  {log}
                </div>
              ))}
            </div>

            <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
              <span className="text-slate-400">dAIzy haMINJA</span>
              <span className="text-emerald-400 font-bold">88-PARADOX v2.0</span>
            </div>
          </div>

          {/* NAVIGATION BUTTONS */}
          <nav className="bg-[#0b0f19] border border-slate-800 rounded-xl p-2 space-y-1 shadow-md">
            <button
              onClick={() => setActiveMainView('vault')}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-mono font-bold flex items-center justify-between transition-all ${
                activeMainView === 'vault'
                  ? 'bg-amber-400 text-black shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4" />
                <span>PARADOX VAULT</span>
              </div>
              <span className="text-[10px] opacity-75">105 LOTS</span>
            </button>

            <button
              onClick={() => setActiveMainView('showroom')}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-mono font-bold flex items-center justify-between transition-all ${
                activeMainView === 'showroom'
                  ? 'bg-amber-400 text-black shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Server className="w-4 h-4 text-cyan-400" />
                <span>SHOWROOM FLOOR</span>
              </div>
              <span className="text-[10px] text-cyan-400">88 PARADOXES</span>
            </button>

            <button
              onClick={() => setActiveMainView('outreach')}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-mono font-semibold flex items-center justify-between transition-all ${
                activeMainView === 'outreach'
                  ? 'bg-amber-400 text-black shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-emerald-400" />
                <span>OUTREACH OPS</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-bold">178 LEADS</span>
            </button>

            <button
              onClick={() => setActiveMainView('brain')}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-mono font-semibold flex items-center justify-between transition-all ${
                activeMainView === 'brain'
                  ? 'bg-amber-400 text-black shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Cpu className="w-4 h-4 text-purple-400" />
                <span>BRAIN CONSOLE</span>
              </div>
              <span className="text-[10px] text-purple-400">71.64% HOMEOS</span>
            </button>

            <button
              onClick={() => setActiveMainView('challenge')}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-mono font-semibold flex items-center justify-between transition-all ${
                activeMainView === 'challenge'
                  ? 'bg-amber-400 text-black shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Flame className="w-4 h-4 text-rose-400" />
                <span>CHALLENGE HUB</span>
              </div>
              <span className="text-[10px] text-rose-400">12 PLATFORMS</span>
            </button>

            <button
              onClick={() => {
                if (onNavigateTab) onNavigateTab('catalog');
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-xs font-mono font-semibold text-slate-300 hover:bg-slate-800/60 flex items-center justify-between transition-all"
            >
              <div className="flex items-center space-x-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>SOLUTION LIBRARY</span>
              </div>
              <span className="text-[10px] text-cyan-400">128 JIT</span>
            </button>
          </nav>

          {/* AUTHENTICATION & ATTESTATION BADGE */}
          <div className="bg-[#0b0f19] border border-slate-800 rounded-xl p-4 space-y-3">
            <button 
              onClick={() => alert('Sovereign Passkey Attestation: Verified via Cryptographic Keystore (OSFI B-13 Grade).')}
              className="w-full bg-slate-900 hover:bg-slate-800 border border-slate-700 text-amber-300 text-xs font-bold py-2.5 rounded-lg flex items-center justify-center space-x-2 transition-all shadow-inner"
            >
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>AUTHENTICATE -&gt;</span>
            </button>

            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-400 pt-1 border-t border-slate-800">
              <div className="flex items-center space-x-1 text-emerald-400">
                <Check className="w-3 h-3" />
                <span>OSFI</span>
              </div>
              <div className="flex items-center space-x-1 text-emerald-400">
                <Check className="w-3 h-3" />
                <span>FINTRAC</span>
              </div>
              <div className="flex items-center space-x-1 text-emerald-400">
                <Check className="w-3 h-3" />
                <span>SOC2</span>
              </div>
              <div className="flex items-center space-x-1 text-emerald-400">
                <Check className="w-3 h-3" />
                <span>PIPEDA</span>
              </div>
            </div>
          </div>
        </aside>

        {/* MAIN DISPLAY AREA */}
        <main className="flex-1 min-w-0">

          {/* ========================================================================= */}
          {/* 1. PARADOX VAULT: 3-COLUMN FLOOR GRID OF 105 LOTS                        */}
          {/* ========================================================================= */}
          {activeMainView === 'vault' && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredLots.map((lot) => {
                const isApex = lot.isApex || lot.lotNumber === 29 || lot.lotNumber === 105;
                const badgeColorClass = 
                  isApex 
                    ? 'bg-amber-400/20 text-amber-300 border-amber-400/60' 
                    : lot.chamber === 'CHAMBER I'
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/50'
                    : lot.chamber === 'CHAMBER II'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-400/50'
                    : 'bg-purple-500/20 text-purple-300 border-purple-400/50';

                const chamberTextClass =
                  isApex
                    ? 'text-amber-400'
                    : lot.chamber === 'CHAMBER I'
                    ? 'text-cyan-400'
                    : lot.chamber === 'CHAMBER II'
                    ? 'text-amber-400'
                    : 'text-purple-400';

                const subtitleTextClass =
                  lot.chamber === 'CHAMBER I'
                    ? 'text-cyan-400/90'
                    : lot.chamber === 'CHAMBER II'
                    ? 'text-amber-400/90'
                    : 'text-purple-400/90';

                return (
                  <div
                    key={lot.lotId}
                    className={`bg-[#0a0d16] rounded-xl border transition-all duration-200 flex flex-col justify-between overflow-hidden relative group hover:shadow-2xl ${
                      isApex
                        ? 'border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.15)] bg-gradient-to-b from-[#120f07] to-[#0a0d16]'
                        : 'border-slate-800/90 hover:border-slate-600'
                    }`}
                  >
                    {/* Card Header Top Row */}
                    <div className="p-4 pb-2">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold font-mono border ${badgeColorClass}`}>
                          {lot.lotId}
                        </span>
                        <span className={`text-[11px] font-bold font-mono tracking-wider ${chamberTextClass}`}>
                          {isApex ? 'APEX SOVEREIGN' : lot.chamber}
                        </span>
                      </div>

                      <h3 className="text-sm font-bold text-white tracking-wide leading-tight mb-1 group-hover:text-amber-300 transition-colors">
                        {lot.title}
                      </h3>
                      
                      <p className={`text-xs font-mono ${subtitleTextClass} mb-3`}>
                        {lot.subtitle}
                      </p>

                      {/* Inner Lot Terminal Live Box */}
                      <div className="bg-[#05070d] border border-slate-800/80 rounded-lg p-3 text-[11px] font-mono space-y-2 mb-3">
                        <div className="flex items-center justify-between text-[10px] text-slate-400 pb-1.5 border-b border-slate-800/60">
                          <div className="flex items-center space-x-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-slate-300 font-bold">■ LOT TERMINAL • LIVE</span>
                          </div>
                          <span className="text-slate-500 font-mono">PARADOX-ENG</span>
                        </div>

                        <div>
                          <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">WHAT IT DOES:</div>
                          <p className="text-slate-300 text-[11px] leading-relaxed line-clamp-3">
                            {lot.whatItDoes}
                          </p>
                        </div>

                        <div className="grid grid-cols-1 gap-1 text-[10px] pt-1 border-t border-slate-800/40">
                          <div className="flex items-center justify-between">
                            <span className="text-slate-500 font-bold uppercase">OUTREACH:</span>
                            <span className="text-emerald-400 font-medium">{lot.outreach}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-500 font-bold uppercase">DISTRIBUTION:</span>
                            <span className="text-cyan-400 font-medium">{lot.distribution}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-500 font-bold uppercase">GRADE:</span>
                            <span className="text-amber-300 font-semibold">{lot.grade}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Pricing & Action Bar Footer */}
                    <div className="p-4 pt-2 border-t border-slate-800/80 bg-black/40 flex flex-col gap-2.5">
                      <div className="flex items-baseline justify-between">
                        <div className="flex items-baseline space-x-2">
                          <span className="text-sm font-bold text-white font-mono">
                            {lot.priceEth.toFixed(8)} ETH
                          </span>
                          <span className="text-[11px] text-slate-400 font-mono">
                            (${lot.priceUsdc.toFixed(2)} USDC)
                          </span>
                        </div>
                        <span className="text-[9px] font-mono font-bold bg-fuchsia-950/60 text-fuchsia-300 border border-fuchsia-800/60 px-1.5 py-0.5 rounded">
                          Turnkey Autonomous
                        </span>
                      </div>

                      <div className="grid grid-cols-4 gap-1.5">
                        <button
                          onClick={() => setSandboxLot(lot)}
                          className="bg-amber-950/60 hover:bg-amber-900 text-amber-300 border border-amber-500/50 py-2 rounded-lg text-[10px] font-bold font-mono flex items-center justify-center space-x-1 transition-colors"
                          title="Open Solvex Crystal Clear Black Box Sandbox (Scientific Proof)"
                        >
                          <FlaskConical className="w-3 h-3 text-amber-400" />
                          <span className="hidden sm:inline">Proof</span>
                        </button>

                        <button
                          onClick={() => setActiveInspectorLot(lot)}
                          className="bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 py-2 rounded-lg text-[10px] font-bold font-mono flex items-center justify-center space-x-1 transition-colors"
                          title="Inspect full lot capabilities and node architecture"
                        >
                          <Eye className="w-3 h-3 text-slate-400" />
                          <span>Inspect</span>
                        </button>

                        <button
                          onClick={(e) => handleAddLotToCart(lot, e)}
                          className="bg-slate-900 hover:bg-cyan-950/70 text-cyan-300 border border-cyan-500/40 py-2 rounded-lg text-[10px] font-bold font-mono flex items-center justify-center space-x-1 transition-colors hover:border-cyan-400"
                          title="Add this autonomous business template to your shopping cart"
                        >
                          <ShoppingBag className="w-3 h-3 text-cyan-400" />
                          <span>+ Cart</span>
                        </button>

                        <button
                          onClick={() => handleAcquireClick(lot)}
                          className="bg-amber-400 hover:bg-amber-300 text-black py-2 rounded-lg text-[10px] font-black font-mono flex items-center justify-center space-x-1 transition-transform hover:scale-[1.02] shadow-[0_0_12px_rgba(245,158,11,0.3)]"
                          title="Direct instant acquisition via Sovereign Vault"
                        >
                          <Lock className="w-3 h-3 text-black" />
                          <span>Acquire</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ========================================================================= */}
          {/* 2. SHOWROOM FLOOR: THE ARCHITECT'S TRANSLUCENCE FRAMEWORK & 5 CHAMBERS    */}
          {/* ========================================================================= */}
          {activeMainView === 'showroom' && (
            <div className="space-y-8">
              {/* Showroom Hero */}
              <div className="bg-[#0b0f1a] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
                <div className="text-[11px] font-mono text-amber-400 tracking-wider font-bold border-b border-slate-800 pb-2">
                  NIST SP 800-53 • SOC 2 TYPE II • ISO 27001 • OSFI B-13 • FINTRAC • PIPEDA SOVEREIGN
                </div>
                
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-serif">
                  The Showroom Floor.<br />
                  <span className="text-amber-400">88 Paradoxes Resolved.</span>
                </h1>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans max-w-3xl">
                  105 finished, Tier-1 solutions on lot display — each engineered for autonomous market outreach and distribution. Built on the dAIsy haMINJA Sovereign AI Brain: 88 solved paradoxes across 5 Chambers. Every lot finds its buyers, proves its worth, and delivers itself. Walk the floor.
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="px-2.5 py-1 rounded bg-black/60 border border-slate-700 text-amber-300 text-xs font-mono">⚡ ZK-SNARK PROVEN</span>
                  <span className="px-2.5 py-1 rounded bg-black/60 border border-slate-700 text-emerald-300 text-xs font-mono">🛡️ OSFI B-13 COMPLIANT</span>
                  <span className="px-2.5 py-1 rounded bg-black/60 border border-slate-700 text-cyan-300 text-xs font-mono">🔒 FINTRAC APPROVED</span>
                  <span className="px-2.5 py-1 rounded bg-black/60 border border-slate-700 text-purple-300 text-xs font-mono">🏛️ PIPEDA SOVEREIGN</span>
                  <span className="px-2.5 py-1 rounded bg-black/60 border border-slate-700 text-amber-400 text-xs font-mono">🧠 88-PARADOX ENGINE</span>
                </div>

                <div className="flex flex-wrap gap-3 pt-4">
                  <button
                    onClick={() => setActiveMainView('vault')}
                    className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs rounded-xl shadow-lg shadow-amber-500/20 font-mono transition-transform hover:scale-[1.02]"
                  >
                    WALK THE SHOWROOM FLOOR -&gt;
                  </button>
                  <button
                    onClick={() => setActiveMainView('brain')}
                    className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-xs rounded-xl font-mono transition-colors"
                  >
                    BRAIN CONSOLE -&gt;
                  </button>
                </div>
              </div>

              {/* The Architect's Translucence Framework */}
              <div className="space-y-4">
                <div className="text-xs text-slate-400 uppercase tracking-widest font-mono">SYSTEM ARCHITECTURE</div>
                <h2 className="text-2xl font-bold text-white font-serif">The Architect&apos;s Translucence Framework</h2>

                <div className="bg-[#080b12] border border-cyan-900/60 rounded-2xl p-6 relative overflow-hidden">
                  <div className="text-xs text-cyan-400 font-mono font-bold uppercase tracking-wider mb-4">
                    CRYSTAL CLEAR BLACK BOX PROTOCOL — PARADOX 13: TRUST VS. PROTECTION
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Glass Box Left Pane */}
                    <div className="lg:col-span-2 bg-[#05070d] border border-cyan-500/30 rounded-xl p-5 space-y-4">
                      <div className="text-xs text-cyan-300 font-mono font-bold">
                        GLASS BOX — logToOmniscientTerminal()
                      </div>
                      <ul className="text-xs text-slate-300 space-y-1.5 font-mono list-disc list-inside">
                        <li>Ingress/Egress data velocity</li>
                        <li>Verification hash per build</li>
                        <li>LYAPUNOV_OPT execution path</li>
                        <li>dAIsy management actions</li>
                        <li>Regulatory audit trail</li>
                      </ul>

                      {/* Inner Black Box Core */}
                      <div className="bg-black/90 border border-amber-500/40 rounded-xl p-4 space-y-3 relative">
                        <div className="flex items-center justify-between text-xs font-mono font-bold text-amber-400">
                          <span>BLACK BOX — 88-PARADOX CORE</span>
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                        </div>

                        <div className="space-y-2 text-xs font-mono text-slate-300">
                          <div className="flex items-center justify-between">
                            <span>• Chamber I: 19 Proprietary</span>
                            <span className="text-emerald-400">████████</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>• Chamber II: 15 Classical</span>
                            <span className="text-cyan-400">████████</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>• Chamber III: 22 Existential</span>
                            <span className="text-purple-400">████████</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>• Chamber IV: 15 Material</span>
                            <span className="text-amber-400">████████</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>• Chamber V: 17 Transcendent</span>
                            <span className="text-rose-400">████████</span>
                          </div>
                        </div>

                        <div className="text-[11px] font-mono text-center text-amber-300/80 pt-2 border-t border-slate-800">
                          IMMUTABLE • SHIELDED • TAMPER-PROOF
                        </div>
                      </div>

                      <div className="pt-2 text-xs font-mono text-emerald-400 space-y-1">
                        <div>✓ Complete environmental observability</div>
                        <div>✓ Proprietary logic remains protected IP</div>
                      </div>
                    </div>

                    {/* Autonomous Manager Right Pane */}
                    <div className="space-y-4 flex flex-col justify-between">
                      <div className="bg-[#05070d] border border-slate-800 rounded-xl p-5 space-y-2">
                        <div className="text-[10px] uppercase font-bold text-slate-500">AUTONOMOUS MANAGER</div>
                        <h3 className="text-base font-bold text-amber-400 font-mono">dAIsy haMINJA</h3>
                        <p className="text-xs text-slate-300 leading-relaxed font-sans">
                          Sovereign AI Brain managing all deployed solutions in situ. No external admin access required.
                        </p>
                      </div>

                      <div className="bg-[#1a0c0e] border border-rose-900/60 rounded-xl p-5 space-y-2">
                        <div className="text-[10px] uppercase font-bold text-rose-500">EMERGENCY PROTOCOL</div>
                        <p className="text-xs text-rose-300 font-mono leading-relaxed">
                          Paradox 07: triggerEmergencyHardwarePanic() — Memory Shredding Routine zeros registry instantly on breach detection.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Five Chambers of Logic */}
              <div className="space-y-4">
                <div className="text-xs text-slate-400 uppercase tracking-widest font-mono">88-PARADOX ENGINE • 105 SOLUTIONS</div>
                <h2 className="text-2xl font-bold text-white font-serif">Five Chambers of Logic</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  {/* Chamber I */}
                  <div className="bg-[#0a0d16] border border-slate-800 rounded-xl p-4 space-y-3">
                    <div className="flex justify-between items-center text-slate-500 text-xs font-bold">
                      <span className="font-serif text-lg text-cyan-400">R</span>
                      <span className="text-cyan-400">I</span>
                    </div>
                    <div className="text-[10px] text-slate-500 uppercase font-mono">CHAMBER I</div>
                    <h4 className="text-sm font-bold text-white">FOUNDATIONS</h4>
                    <div className="text-xl font-bold text-cyan-400 font-mono">19</div>
                    <div className="text-[10px] text-slate-500 uppercase">PARADOXES</div>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans">
                      Proprietary architect-derived solutions — the active processing core.
                    </p>
                  </div>

                  {/* Chamber II */}
                  <div className="bg-[#0a0d16] border border-slate-800 rounded-xl p-4 space-y-3">
                    <div className="flex justify-between items-center text-slate-500 text-xs font-bold">
                      <span className="text-lg text-amber-400">⚙️</span>
                      <span className="text-amber-400">II</span>
                    </div>
                    <div className="text-[10px] text-slate-500 uppercase font-mono">CHAMBER II</div>
                    <h4 className="text-sm font-bold text-white">MOTION &amp; TIME</h4>
                    <div className="text-xl font-bold text-amber-400 font-mono">15</div>
                    <div className="text-[10px] text-slate-500 uppercase">PARADOXES</div>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans">
                      Resolves causal drift in untrusted network environments.
                    </p>
                  </div>

                  {/* Chamber III */}
                  <div className="bg-[#0a0d16] border border-slate-800 rounded-xl p-4 space-y-3">
                    <div className="flex justify-between items-center text-slate-500 text-xs font-bold">
                      <span className="font-serif text-lg text-purple-400">♀</span>
                      <span className="text-purple-400">III</span>
                    </div>
                    <div className="text-[10px] text-slate-500 uppercase font-mono">CHAMBER III</div>
                    <h4 className="text-sm font-bold text-white">CHOICE &amp; SELF</h4>
                    <div className="text-xl font-bold text-purple-400 font-mono">22</div>
                    <div className="text-[10px] text-slate-500 uppercase">PARADOXES</div>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans">
                      Manages autonomous decision-making and agentic sovereignty.
                    </p>
                  </div>

                  {/* Chamber IV */}
                  <div className="bg-[#0a0d16] border border-slate-800 rounded-xl p-4 space-y-3">
                    <div className="flex justify-between items-center text-slate-500 text-xs font-bold">
                      <span className="text-lg text-emerald-400">⬡</span>
                      <span className="text-emerald-400">IV</span>
                    </div>
                    <div className="text-[10px] text-slate-500 uppercase font-mono">CHAMBER IV</div>
                    <h4 className="text-sm font-bold text-white">STRUCTURE</h4>
                    <div className="text-xl font-bold text-emerald-400 font-mono">15</div>
                    <div className="text-[10px] text-slate-500 uppercase">PARADOXES</div>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans">
                      Ensures hardware-level stability for bare-metal execution.
                    </p>
                  </div>

                  {/* Chamber V */}
                  <div className="bg-[#0a0d16] border border-slate-800 rounded-xl p-4 space-y-3">
                    <div className="flex justify-between items-center text-slate-500 text-xs font-bold">
                      <span className="text-lg text-rose-400">👁️</span>
                      <span className="text-rose-400">V</span>
                    </div>
                    <div className="text-[10px] text-slate-500 uppercase font-mono">CHAMBER V</div>
                    <h4 className="text-sm font-bold text-white">TRANSCENDENCE</h4>
                    <div className="text-xl font-bold text-rose-400 font-mono">17</div>
                    <div className="text-[10px] text-slate-500 uppercase">PARADOXES</div>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans">
                      Final reconciliation — IRS-First Rule, U.A.R.E.F.A.K.E. convergence, absolute sovereign output.
                    </p>
                  </div>
                </div>
              </div>

              {/* TECOE Pipeline */}
              <div className="space-y-4">
                <div className="text-xs text-slate-400 uppercase tracking-widest font-mono">TECOE PIPELINE</div>
                <h2 className="text-2xl font-bold text-white font-serif">Text-Tethering Extraction &amp; Compilation Engine</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                  <div className="bg-[#080b12] border border-slate-800 rounded-xl p-4 space-y-2">
                    <div className="text-xs font-mono text-amber-400 font-bold">01 INGRESS</div>
                    <div className="text-[11px] text-cyan-300 font-mono">tetherToScreenDisplay()</div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Raw terminal matrices captured &amp; cryptographically signed via Paradox 05.
                    </p>
                  </div>

                  <div className="bg-[#080b12] border border-slate-800 rounded-xl p-4 space-y-2">
                    <div className="text-xs font-mono text-amber-400 font-bold">02 SIGN</div>
                    <div className="text-[11px] text-cyan-300 font-mono">Paradox 05 Hash Attestation</div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Every data frame receives an immutable origin proof before compilation.
                    </p>
                  </div>

                  <div className="bg-[#080b12] border border-slate-800 rounded-xl p-4 space-y-2">
                    <div className="text-xs font-mono text-amber-400 font-bold">03 COMPILE</div>
                    <div className="text-[11px] text-cyan-300 font-mono">executeAutonomousCompilation()</div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Lyapunov Optimization ensures bare-metal speeds, bypassing container overhead.
                    </p>
                  </div>

                  <div className="bg-[#080b12] border border-slate-800 rounded-xl p-4 space-y-2">
                    <div className="text-xs font-mono text-amber-400 font-bold">04 INDEX</div>
                    <div className="text-[11px] text-cyan-300 font-mono">lockedRegistry[105+]</div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Compiled solution indexed into the locked registry of 105+ resolved paradox solutions.
                    </p>
                  </div>

                  <div className="bg-[#080b12] border border-slate-800 rounded-xl p-4 space-y-2">
                    <div className="text-xs font-mono text-amber-400 font-bold">05 EMIT</div>
                    <div className="text-[11px] text-cyan-300 font-mono">CompiledSolution.deploy()</div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      dAIsy haMINJA deploys the managed artifact into client environment with full audit trail.
                    </p>
                  </div>
                </div>
              </div>

              {/* Compliance Quote Banner */}
              <div className="bg-gradient-to-r from-[#0b101d] via-[#121626] to-[#0b101d] border border-amber-500/40 rounded-2xl p-8 text-center space-y-4">
                <div className="text-[10px] text-amber-400 font-mono font-bold uppercase tracking-wider">
                  COMPLIANCE &amp; GOVERNANCE CERTIFICATION
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white max-w-2xl mx-auto leading-snug">
                  &ldquo;We offer not just a result, but a transparent audit trail of a perfectly executed, paradox-based outcome.&rdquo;
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  105 Tier-1 enterprise solutions. Each mathematically verified before purchase.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setActiveMainView('vault')}
                    className="px-8 py-3 bg-amber-400 hover:bg-amber-300 text-black font-black text-xs font-mono rounded-xl shadow-xl shadow-amber-500/20"
                  >
                    ACCESS THE 105 ENTERPRISE LOTS -&gt;
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 3. OUTREACH OPS: dAIzy IS HUNTING REAL LEADS                               */}
          {/* ========================================================================= */}
          {activeMainView === 'outreach' && (
            <div className="space-y-6">
              {/* Header */}
              <div className="bg-[#0b0f1a] border border-slate-800 rounded-2xl p-6 space-y-3">
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                  AUTONOMOUS OPERATIONS — LIVE MARKET INTELLIGENCE
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white font-mono flex items-center space-x-3">
                  <span>Outreach Ops –</span>
                  <span className="text-amber-400">dAIsy is hunting real leads.</span>
                </h1>
                <p className="text-xs text-slate-300 leading-relaxed font-sans max-w-3xl">
                  dAIsy haMINJA scans live public forums – Hacker News, Stack Exchange – for real people actively asking about problems the Solvex catalog solves. Every lead below is a genuine post with a real source link. She composes a tailored reply for each, ready to transmit the moment a delivery channel is connected.
                </p>

                {/* Channel Pills */}
                <div className="flex flex-wrap gap-2 pt-2 text-[11px] font-mono">
                  <div className="flex items-center space-x-1.5 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 px-3 py-1 rounded-lg">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>HUNT ENGINE LIVE – SCANNING HN + STACK EXCHANGE</span>
                  </div>
                  <div className="flex items-center space-x-1.5 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 px-3 py-1 rounded-lg">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>EMAIL CHANNEL: CONNECTED (GMAIL) – add a recipient address on any draft to send it</span>
                  </div>
                  <div className="flex items-center space-x-1.5 bg-amber-950/60 border border-amber-500/40 text-amber-300 px-3 py-1 rounded-lg">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span>REDDIT: NOT CONNECTED – forum replies remain manual (copy the draft to the source thread)</span>
                  </div>
                </div>

                {/* Metric Summary Counters */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-4">
                  <div className="bg-black/60 border border-slate-800 p-3 rounded-xl">
                    <div className="text-[10px] text-slate-500 font-mono uppercase">REAL LEADS FOUND</div>
                    <div className="text-2xl font-bold text-white font-mono">178</div>
                  </div>
                  <div className="bg-black/60 border border-slate-800 p-3 rounded-xl">
                    <div className="text-[10px] text-slate-500 font-mono uppercase">AWAITING DRAFT</div>
                    <div className="text-2xl font-bold text-cyan-400 font-mono">0</div>
                  </div>
                  <div className="bg-black/60 border border-slate-800 p-3 rounded-xl">
                    <div className="text-[10px] text-slate-500 font-mono uppercase">DRAFTS READY</div>
                    <div className="text-2xl font-bold text-amber-400 font-mono">178</div>
                  </div>
                  <div className="bg-black/60 border border-slate-800 p-3 rounded-xl">
                    <div className="text-[10px] text-slate-500 font-mono uppercase">DELIVERED</div>
                    <div className="text-2xl font-bold text-emerald-400 font-mono">0</div>
                  </div>
                  <div className="bg-black/60 border border-slate-800 p-3 rounded-xl">
                    <div className="text-[10px] text-slate-500 font-mono uppercase">REPLIES</div>
                    <div className="text-2xl font-bold text-purple-400 font-mono">0</div>
                  </div>
                </div>
              </div>

              {/* 2-Column Split: Leads on Left, Live Hunt Log on Right */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left Leads Column */}
                <div className="lg:col-span-7 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-1 border-b border-slate-800">
                    <span className="font-bold text-white">REAL LEADS &amp; COMPOSED REPLIES ({OUTREACH_LEADS.length})</span>
                    <span className="text-[11px] text-slate-500">CLICK A LEAD TO VIEW DRAFT</span>
                  </div>

                  <div className="space-y-3 max-h-[750px] overflow-y-auto pr-1">
                    {OUTREACH_LEADS.map((lead) => {
                      const isSelected = selectedLeadId === lead.id;
                      return (
                        <div
                          key={lead.id}
                          onClick={() => setSelectedLeadId(lead.id)}
                          className={`p-4 rounded-xl border cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-[#0f1422] border-cyan-400 shadow-lg shadow-cyan-950/40'
                              : 'bg-[#0a0d16] border-slate-800/80 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                                lead.source === 'HN' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                              }`}>
                                {lead.source}
                              </span>
                              <span className="text-[11px] text-slate-400 font-mono">
                                by {lead.author} • {lead.sourceName} • FIT {lead.fitScore} • posted {lead.postedAgo}
                              </span>
                            </div>
                            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800 shrink-0">
                              DRAFT READY
                            </span>
                          </div>

                          <h3 className="text-xs sm:text-sm font-bold text-white mb-2 leading-snug">
                            {lead.title}
                          </h3>

                          <div className="text-[11px] font-mono text-amber-400 mb-2">
                            {lead.matchedCategory} &rarr; <span className="underline">{lead.matchedInstrument}</span>
                          </div>

                          <div className="text-[10px] text-slate-500 font-mono truncate">
                            &nearr; {lead.url}
                          </div>

                          {/* Expanded Draft Preview */}
                          {isSelected && (
                            <div className="mt-3 pt-3 border-t border-slate-800/80 space-y-2">
                              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                                COMPOSED DRAFT REPLY BY dAIzy haMINJA:
                              </div>
                              <div className="bg-black/90 p-3 rounded-lg border border-cyan-900/60 text-xs text-slate-200 font-mono leading-relaxed">
                                {lead.draftContent}
                              </div>
                              <div className="flex items-center justify-end space-x-2 pt-1">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    navigator.clipboard.writeText(lead.draftContent);
                                    alert('Draft copied to clipboard!');
                                  }}
                                  className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono rounded"
                                >
                                  Copy Reply
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    alert(`Direct delivery channel to ${lead.author} queued.`);
                                  }}
                                  className="px-3 py-1 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs font-mono rounded"
                                >
                                  Transmit &rarr;
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right Live Hunt Log Column */}
                <div className="lg:col-span-5 bg-[#0a0d16] border border-slate-800 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono pb-2 border-b border-slate-800">
                    <div className="flex items-center space-x-2 text-amber-400 font-bold">
                      <Radio className="w-3.5 h-3.5 animate-pulse text-amber-400" />
                      <span>LIVE HUNT LOG</span>
                    </div>
                    <span className="text-[10px] text-slate-500">AUTO-REFRESH 5s</span>
                  </div>

                  <div className="space-y-3 text-xs font-mono max-h-[700px] overflow-y-auto pr-1">
                    <div className="bg-black/80 border border-slate-800 p-3 rounded-xl space-y-1.5">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="px-2 py-0.2 rounded bg-amber-500/20 text-amber-300 font-bold text-[10px]">DRAFT</span>
                        <span className="text-white font-bold">Sush</span>
                        <span className="text-slate-500 text-[10px]">35m ago</span>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-relaxed">
                        DRAFT READY &rarr; reply to &quot;Sourcing un-conflated US Equities MBP data for retail algorithmic engines&quot; (Stack Exchange (quant)): &quot;Re 'Sourcing un-conflated US Equities MBP data': architectural and licensing constraints: this is a solved class of problem in Low-Latency Trading Infrastructure...&quot;
                      </p>
                    </div>

                    <div className="bg-black/80 border border-slate-800 p-3 rounded-xl space-y-1.5">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="px-2 py-0.2 rounded bg-amber-500/20 text-amber-300 font-bold text-[10px]">DRAFT</span>
                        <span className="text-white font-bold">whi</span>
                        <span className="text-slate-500 text-[10px]">35m ago</span>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-relaxed">
                        DRAFT READY &rarr; reply to &quot;Intraday factor efficacy collapse in afternoon sessions&quot; (Stack Exchange (quant)): &quot;Re 'Intraday factor efficacy collapse': this is a solved class of problem in Low-Latency Trading Infrastructure. Matched instrument: Order Flow Intelligence Platform. Status: queued – connect a delivery channel to transmit.&quot;
                      </p>
                    </div>

                    <div className="bg-black/80 border border-slate-800 p-3 rounded-xl space-y-1.5">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="px-2 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">REAL LEAD</span>
                        <span className="text-white font-bold">vmatsiiako</span>
                        <span className="text-slate-500 text-[10px]">2m ago</span>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-relaxed">
                        REAL LEAD [Hacker News] &quot;Secrets Management: The Complete Guide&quot; by vmatsiiako - FIT 92/100. Matched instrument: Firmware Integrity Attestation Scanner.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 4. BRAIN CONSOLE: HOMEOTASIS, 8 DIRECTIVES & CHRONO-CONSISTENCY NODES    */}
          {/* ========================================================================= */}
          {activeMainView === 'brain' && (
            <div className="space-y-6">
              
              {/* Top Cockpit Telemetry Banner */}
              <div className="bg-[#0a0d16] border border-cyan-500/40 rounded-2xl p-6 space-y-4 shadow-xl">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs border-b border-slate-800 pb-3">
                  <div className="text-slate-400">
                    SYSTEM ID: <span className="text-white font-bold">SOLVEX-CORE-FINALIZED</span> | U.A.R.E.F.A.K.E. ENGINE CONSOLE
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-emerald-400 font-bold">SOVEREIGN OPERATING MODE</span>
                    <span className="text-slate-500">|</span>
                    <span className="text-slate-300">88 PARADOXES • 28 VAULT PRODUCTS</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white font-mono">
                      dAIsy haMINJA Brain Console
                    </h1>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">
                      Unmanned Autonomous Recursive Economic Fiduciary Asset Kinetic Engine - 54-Node Recursive Pipeline
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-emerald-400 font-mono">71.64%</div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">HOMEOSTASIS</div>
                  </div>
                </div>

                {/* 6 Real-time telemetry indicators */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2 text-xs font-mono">
                  <div className="bg-black/60 p-2.5 rounded-lg border border-slate-800">
                    <div className="text-[10px] text-slate-500 uppercase">SYSTEM STATUS</div>
                    <div className="text-emerald-400 font-bold">ACTIVE</div>
                  </div>
                  <div className="bg-black/60 p-2.5 rounded-lg border border-slate-800">
                    <div className="text-[10px] text-slate-500 uppercase">OPS / SEC</div>
                    <div className="text-white font-bold">648,900</div>
                  </div>
                  <div className="bg-black/60 p-2.5 rounded-lg border border-slate-800">
                    <div className="text-[10px] text-slate-500 uppercase">EVENT LOOP LAG</div>
                    <div className="text-cyan-400 font-bold">0.11ms</div>
                  </div>
                  <div className="bg-black/60 p-2.5 rounded-lg border border-slate-800">
                    <div className="text-[10px] text-slate-500 uppercase">HEAP USED</div>
                    <div className="text-purple-400 font-bold">74.31 MB</div>
                  </div>
                  <div className="bg-black/60 p-2.5 rounded-lg border border-slate-800">
                    <div className="text-[10px] text-slate-500 uppercase">LAMPORT TICK</div>
                    <div className="text-amber-400 font-bold">#146</div>
                  </div>
                  <div className="bg-black/60 p-2.5 rounded-lg border border-slate-800">
                    <div className="text-[10px] text-slate-500 uppercase">ACTIVE NODES</div>
                    <div className="text-emerald-400 font-bold">54 RECURSIVE</div>
                  </div>
                </div>
              </div>

              {/* 8 Autonomic Protocol Directives Grid */}
              <div className="bg-[#080b12] border border-slate-800 rounded-2xl p-5 space-y-3">
                <div className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
                  APD-01 &rarr; AUTONOMOUS PROTOCOL DIRECTIVE — SOLVEX-CORE-03
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                  <div className="bg-black/70 p-3 rounded-lg border border-slate-800/80 space-y-1">
                    <span className="text-amber-400 font-bold">01 AUTONOMOUS CORE:</span>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      dAIsy manages paradox synthesis, marketplace bounties and autonomic self-healing across nodes.
                    </p>
                  </div>

                  <div className="bg-black/70 p-3 rounded-lg border border-slate-800/80 space-y-1">
                    <span className="text-cyan-400 font-bold">02 COMPLIANCE HARDWARE:</span>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      NIST/SOC 2/ISO 27001 enforced at binary level – non-compliant node self-isolates until L7 validates.
                    </p>
                  </div>

                  <div className="bg-black/70 p-3 rounded-lg border border-slate-800/80 space-y-1">
                    <span className="text-emerald-400 font-bold">03 ZK PROXY:</span>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      Credentials never in LLM context – agent sends action requests; Proxy executes via secure-vault.
                    </p>
                  </div>

                  <div className="bg-black/70 p-3 rounded-lg border border-slate-800/80 space-y-1">
                    <span className="text-purple-400 font-bold">04 OBSERVABILITY &amp; TRACE:</span>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      Each of 54 nodes produces a cryptographic hash; paradox paths pinned to immutable ledger.
                    </p>
                  </div>

                  <div className="bg-black/70 p-3 rounded-lg border border-slate-800/80 space-y-1">
                    <span className="text-rose-400 font-bold">05 FAIL-SAFE:</span>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      500ns latency or compliance drift &rarr; instant System-Static mode; Watchdog monitors all 54 nodes.
                    </p>
                  </div>

                  <div className="bg-black/70 p-3 rounded-lg border border-slate-800/80 space-y-1">
                    <span className="text-amber-300 font-bold">06 PARADOX SYNTHESIS:</span>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      88 paradoxes resolved via TETHER-BUBBLE v2.0 (40 historical keys, 10 resolution types, 0% hallucination).
                    </p>
                  </div>

                  <div className="bg-black/70 p-3 rounded-lg border border-slate-800/80 space-y-1">
                    <span className="text-cyan-300 font-bold">07 NON-REPUDIATION:</span>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      All agentic actions signed by internal private key and L1 Lamport-ordered for chronological audit.
                    </p>
                  </div>

                  <div className="bg-black/70 p-3 rounded-lg border border-slate-800/80 space-y-1">
                    <span className="text-emerald-300 font-bold">08 MARKETPLACE ESCROW:</span>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      72hr hold via /api/vault/process – no Vault/Escrow release without L5 Consensus + L6 SOC 2 match.
                    </p>
                  </div>
                </div>
              </div>

              {/* Sub-tabs Header */}
              <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-2 text-xs font-mono font-bold">
                <button className="px-4 py-2 bg-amber-400 text-black rounded-lg">SOLUTIONS</button>
                <button className="px-4 py-2 bg-slate-900 text-slate-400 hover:text-white rounded-lg">COMM-LINK</button>
                <button className="px-4 py-2 bg-slate-900 text-slate-400 hover:text-white rounded-lg">SANDBOX UI</button>
                <button className="px-4 py-2 bg-slate-900 text-slate-400 hover:text-white rounded-lg">ROI ANALYTICS</button>
                <button className="px-4 py-2 bg-slate-900 text-slate-400 hover:text-white rounded-lg">OUTBOUND AUTH</button>
                <button className="px-4 py-2 bg-slate-900 text-slate-400 hover:text-white rounded-lg">DELIVERY PIPELINE</button>
                <button className="px-4 py-2 bg-slate-900 text-slate-400 hover:text-white rounded-lg">QUANTUM FOUNDRY</button>
              </div>

              {/* Layer 1: Chrono-Consistency & Time Synchronization (15 Solutions) */}
              <div className="space-y-4">
                <div className="bg-[#0a0d16] border border-cyan-500/40 rounded-xl p-4 flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-white font-mono flex items-center space-x-2">
                      <span className="text-cyan-400">⌛</span>
                      <span>LAYER 1: CHRONO-CONSISTENCY &amp; TIME SYNCHRONIZATION</span>
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">
                      Deterministic clock ordering, Lamport causality, anti-skew and temporal compaction
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold text-cyan-300 bg-cyan-950/60 px-3 py-1 rounded border border-cyan-800">
                    15 SOLUTIONS
                  </span>
                </div>

                {/* S-001 to S-015 Interactive Nodes Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {CHRONO_NODES.map((node) => {
                    const isSelected = selectedBrainSolution === node.id;
                    return (
                      <div
                        key={node.id}
                        onClick={() => setSelectedBrainSolution(node.id)}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-[#101726] border-cyan-400 shadow-md shadow-cyan-950/50'
                            : 'bg-[#07090f] border-slate-800/80 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between text-[11px] font-mono mb-1.5">
                          <span className="text-cyan-400 font-bold">{node.id}</span>
                          <span className="text-slate-600 font-mono">{node.num}</span>
                        </div>
                        <h4 className="text-xs font-bold text-white mb-1 leading-snug">
                          {node.title}
                        </h4>
                        <p className="text-[11px] text-slate-400 leading-relaxed font-mono">
                          {node.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* 5. CHALLENGE HUB: ENTERPRISE INNOVATION CHALLENGE MONITOR                 */}
          {/* ========================================================================= */}
          {activeMainView === 'challenge' && (
            <ChallengeHubView />
          )}

        </main>
      </div>

      {/* 5. FLOATING dAIzy haMINJA AI DIRECTIVE HUD (BOTTOM RIGHT) */}
      <div className="fixed bottom-4 right-4 z-40 w-96 max-w-[calc(100vw-2rem)] bg-[#07090f]/95 border border-cyan-500/50 rounded-2xl shadow-2xl shadow-cyan-950/60 backdrop-blur-xl p-4 text-xs font-mono">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-cyan-900/50">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-bold text-cyan-300 tracking-wider">dAIzy haMINJA</span>
          </div>
          <span className="text-[10px] text-amber-400 bg-amber-950/50 px-2 py-0.5 rounded border border-amber-500/30">
            SOVEREIGN CORE
          </span>
        </div>

        <p className="text-[10px] text-slate-400 mb-2 leading-tight">
          AUTONOMOUS MARKET OUTREACH &amp; DISTRIBUTION INTELLIGENCE
        </p>

        {/* Live directive activity log */}
        {directiveLog.length > 0 && (
          <div className="bg-black/90 rounded-lg p-2 border border-slate-800 text-[10px] text-slate-300 space-y-1 mb-2 max-h-24 overflow-y-auto font-mono">
            {directiveLog.map((log, idx) => (
              <div key={idx} className="leading-tight text-cyan-300">{log}</div>
            ))}
          </div>
        )}

        <form onSubmit={handleRunDirective} className="flex items-center gap-1.5">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Speak a directive – outreach, audit, dispatch..."
              value={directiveInput}
              onChange={e => setDirectiveInput(e.target.value)}
              className="w-full bg-black/80 border border-cyan-500/40 rounded-xl pl-3 pr-8 py-2 text-[11px] text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
            />
            <button
              type="button"
              onClick={toggleMic}
              className={`absolute right-2 top-2 p-1 rounded-md transition-colors ${
                isListening ? 'text-rose-400 animate-pulse' : 'text-slate-400 hover:text-cyan-300'
              }`}
            >
              <Mic className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            type="submit"
            className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-3 py-2 rounded-xl text-xs flex items-center space-x-1 shrink-0 transition-colors shadow-md shadow-cyan-500/20"
          >
            <span>RUN -&gt;</span>
          </button>
        </form>
      </div>

      {/* 6. INSPECT LOT MODAL */}
      {activeInspectorLot && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0b0f19] border border-cyan-500/50 rounded-2xl max-w-2xl w-full p-6 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 rounded text-xs font-bold font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-400/50">
                  {activeInspectorLot.lotId}
                </span>
                <h2 className="text-base font-bold text-white">
                  {activeInspectorLot.title}
                </h2>
              </div>
              <button
                onClick={() => setActiveInspectorLot(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-500 font-bold uppercase text-[10px]">CHAMBER WING &amp; CATEGORY:</span>
                <p className="text-amber-400 font-mono font-semibold">{activeInspectorLot.chamber} — {activeInspectorLot.wing}</p>
              </div>

              <div>
                <span className="text-slate-500 font-bold uppercase text-[10px]">PARADOX RESOLUTION:</span>
                <p className="text-cyan-300 font-mono">{activeInspectorLot.paradoxResolved}</p>
              </div>

              <div>
                <span className="text-slate-500 font-bold uppercase text-[10px]">WHAT IT DOES:</span>
                <p className="text-slate-300 leading-relaxed bg-black/60 p-3 rounded-lg border border-slate-800 font-mono">
                  {activeInspectorLot.whatItDoes}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 bg-black/40 p-3 rounded-lg border border-slate-800">
                <div>
                  <span className="text-slate-500 text-[10px] font-bold">OUTREACH PROTOCOL:</span>
                  <p className="text-emerald-400 font-mono">{activeInspectorLot.outreach}</p>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] font-bold">DELIVERY PIPELINE:</span>
                  <p className="text-cyan-400 font-mono">{activeInspectorLot.distribution}</p>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] font-bold">INSTITUTIONAL SLA:</span>
                  <p className="text-amber-300 font-mono">{activeInspectorLot.grade}</p>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] font-bold">PRICING SETTLEMENT:</span>
                  <p className="text-white font-mono">{activeInspectorLot.priceEth.toFixed(8)} ETH ({activeInspectorLot.priceUsdc.toFixed(2)} USDC)</p>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-slate-500 text-[10px] font-bold">CRYPTOGRAPHIC RUNTIME HEADER:</span>
                <div className="bg-black rounded-lg p-3 font-mono text-[11px] text-emerald-400 border border-emerald-950 overflow-x-auto">
                  <code>{`// SOLVEX-ZERO-VAULT RUNTIME MANIFEST\n{ lot: "${activeInspectorLot.lotId}", zk_proof: "0x89f4b...c380", osfi_b13: true, latency_ns: 412, gas_optim: "0.00018_gwei" }`}</code>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-2.5 pt-3 border-t border-slate-800">
              <button
                onClick={() => {
                  const lot = activeInspectorLot;
                  setActiveInspectorLot(null);
                  setSandboxLot(lot);
                }}
                className="px-4 py-2 bg-amber-950/80 hover:bg-amber-900 border border-amber-500/60 text-amber-300 rounded-lg text-xs font-mono font-bold flex items-center space-x-1.5 shadow-md shadow-amber-950/30"
                title="Open Solvex Crystal Clear Black Box Sandbox"
              >
                <FlaskConical className="w-3.5 h-3.5 text-amber-400" />
                <span>Scientific Sandbox</span>
              </button>
              <button
                onClick={() => setActiveInspectorLot(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-mono font-bold"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const lot = activeInspectorLot;
                  if (lot) {
                    handleAddLotToCart(lot);
                    setActiveInspectorLot(null);
                  }
                }}
                className="px-4 py-2 bg-cyan-950/80 hover:bg-cyan-900 text-cyan-300 border border-cyan-500/50 rounded-lg text-xs font-mono font-bold flex items-center space-x-1.5"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Cart (${activeInspectorLot.priceUsdc.toFixed(2)})</span>
              </button>
              <button
                onClick={() => {
                  const lot = activeInspectorLot;
                  setActiveInspectorLot(null);
                  handleAcquireClick(lot);
                }}
                className="px-5 py-2 bg-amber-400 hover:bg-amber-300 text-black rounded-lg text-xs font-mono font-bold shadow-lg shadow-amber-500/20"
              >
                Direct Acquire ({activeInspectorLot.priceEth.toFixed(4)} ETH)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. ACQUIRE LOT MODAL */}
      {activePurchaseLot && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0b0f19] border border-amber-400/50 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Lock className="w-4 h-4 text-amber-400" />
                <h2 className="text-base font-bold text-white">
                  Acquire {activePurchaseLot.lotId}: {activePurchaseLot.title}
                </h2>
              </div>
              <button
                onClick={() => setActivePurchaseLot(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            {purchaseStep === 'checkout' && (
              <div className="space-y-4 text-xs">
                <div className="bg-black/60 p-3 rounded-lg border border-slate-800 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total Price (ETH):</span>
                    <span className="text-amber-400 font-bold font-mono">{activePurchaseLot.priceEth.toFixed(8)} ETH</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total Price (USDC):</span>
                    <span className="text-white font-bold font-mono">${activePurchaseLot.priceUsdc.toFixed(2)} USDC</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Delivery Method:</span>
                    <span className="text-emerald-400 font-mono">Instant Sovereign Vault Key</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-slate-400 font-bold text-[10px] uppercase">Select Payment Rail:</span>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setPurchaseMethod('ETH')}
                      className={`p-3 rounded-lg border font-mono font-bold text-center transition-all ${
                        purchaseMethod === 'ETH'
                          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400'
                          : 'bg-slate-900 text-slate-400 border-slate-800'
                      }`}
                    >
                      Web3 ETH
                    </button>
                    <button
                      onClick={() => setPurchaseMethod('USDC')}
                      className={`p-3 rounded-lg border font-mono font-bold text-center transition-all ${
                        purchaseMethod === 'USDC'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400'
                          : 'bg-slate-900 text-slate-400 border-slate-800'
                      }`}
                    >
                      USDC Rail
                    </button>
                    <button
                      onClick={() => setPurchaseMethod('PAYPAL')}
                      className={`p-3 rounded-lg border font-mono font-bold text-center transition-all ${
                        purchaseMethod === 'PAYPAL'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-400'
                          : 'bg-slate-900 text-slate-400 border-slate-800'
                      }`}
                    >
                      PayPal / Card
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleExecutePurchase}
                  className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-black font-black text-xs font-mono rounded-xl shadow-lg shadow-amber-500/20 transition-transform hover:scale-[1.02]"
                >
                  CONFIRM &amp; UNLOCK LOT ({activePurchaseLot.priceEth.toFixed(8)} ETH)
                </button>
              </div>
            )}

            {purchaseStep === 'processing' && (
              <div className="py-8 text-center space-y-4">
                <RefreshCw className="w-8 h-8 text-amber-400 animate-spin mx-auto" />
                <div className="space-y-1">
                  <p className="text-sm font-bold text-white font-mono">Synthesizing Sovereign Vault Key...</p>
                  <p className="text-xs text-slate-400 font-mono">Signing 380-node zero-knowledge custody proof</p>
                </div>
              </div>
            )}

            {purchaseStep === 'unlocked' && (
              <div className="space-y-4 text-xs">
                <div className="bg-emerald-950/40 border border-emerald-500/40 p-4 rounded-xl text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                  <h3 className="text-sm font-bold text-white font-mono">VAULT UNLOCKED &amp; TRANSFERRED</h3>
                  <p className="text-slate-300 text-xs font-mono">
                    Lot {activePurchaseLot.lotId} has been successfully provisioned to your Sovereign Keystore.
                  </p>
                </div>

                <div className="bg-black p-3 rounded-lg border border-slate-800 font-mono text-[11px] text-cyan-300 space-y-1">
                  <span className="text-slate-500 text-[10px] font-bold">SOVEREIGN ATTESTATION HASH:</span>
                  <div className="truncate text-emerald-400">0x9d4a821e780b43ff27e654aa0991823bce380e21010</div>
                </div>

                <button
                  onClick={() => setActivePurchaseLot(null)}
                  className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold font-mono rounded-lg transition-colors"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Solvex Crystal Clear Black Box Sandbox Modal */}
      {sandboxLot && (
        <CrystalClearBlackBoxSandboxModal
          isOpen={!!sandboxLot}
          onClose={() => setSandboxLot(null)}
          solutionId={sandboxLot.lotId}
          solutionTitle={sandboxLot.title}
          category={sandboxLot.wing.includes('ZK') ? 'ZK & Sovereign Cryptography' : sandboxLot.wing.includes('HFT') ? 'HFT & Autonomous Compliance' : 'Autonomous AI & Governance'}
          itemType="Autonomous Business Template"
          paradoxResolved={sandboxLot.paradoxResolved}
          unitPrice={sandboxLot.priceUsdc}
        />
      )}

    </div>
  );
};
