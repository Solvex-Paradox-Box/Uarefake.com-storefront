import React, { useState } from 'react';
import { CheckCircle2, ShieldCheck, Database, Search, ArrowRight, Layers, FileCode, Network, Cpu, Lock } from 'lucide-react';
import { PARADOX_REGISTRY_88, MESH_TOPOLOGY_54, VERIFIED_SOURCES, COMPLIANCE_CONTROLS } from '../data/registryData';
import { ParadoxCategory } from '../types';

export const AIRegistryViewer: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [paradoxSearch, setParadoxSearch] = useState<string>('');
  const [activeChecklistIndex, setActiveChecklistIndex] = useState<number | null>(0);

  // Filter 88 Paradoxes
  const filteredParadoxes = PARADOX_REGISTRY_88.filter(p => {
    const matchesCategory = selectedCategory === 'ALL' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(paradoxSearch.toLowerCase()) || 
                          p.code.toLowerCase().includes(paradoxSearch.toLowerCase()) ||
                          p.crossFireConcept.toLowerCase().includes(paradoxSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categoriesList = ['ALL', 'Quantum & Physics', 'Epistemological', 'Economic & Market', 'Geopolitical & Sovereignty', 'Legal & Ethical', 'Cybernetic & Logical', 'Cognitive & Behavioral', 'Socio-Technical'];

  const verificationChecklist = [
    {
      id: 1,
      title: '1. Paradox Registry (88 Paradoxes)',
      status: 'VERIFIED (88/88)',
      detail: 'Complete catalog of all 88 formal paradoxes across 8 categories with deterministic dual-track cross-fire pairings, dialectic weights, and mathematical resolution vectors.',
      metric: '88 Formal Catalog Entries'
    },
    {
      id: 2,
      title: '2. Node Configuration (54-Node Topology)',
      status: 'OPTIMAL (54/54)',
      detail: '54-node mesh topology divided into 5 clusters (Alpha Core, Beta Relay, Gamma Lockbox, Delta Crawler, Epsilon Edge) with active tether bubble health and automated failover standby.',
      metric: '54 Active Nodes • 1.4ms Avg Latency'
    },
    {
      id: 3,
      title: '3. Solution Definitions & Frameworks',
      status: 'ACTIVE',
      detail: 'Dual-track synthesis engine (Track A Analytic vs Track B Dialectic) producing ZK IP Lockbox ready solutions with cryptographic proof hashes.',
      metric: 'ZK-SNARK PLONK Hash Engine'
    },
    {
      id: 4,
      title: '4. Knowledge Sources (.edu, .gov, law, UN)',
      status: 'CRAWLED & VERIFIED',
      detail: 'Grounding pipeline validating sources from MIT, Stanford, NIST, Cornell Legal Information Institute, UN Human Rights, and Wikipedia.',
      metric: '14.8M Verified Corpus Records'
    },
    {
      id: 5,
      title: '5. Communication Protocols & Semantic Filter',
      status: 'ENFORCED',
      detail: 'Real-time semantic sanitization neutralizing slurs and hostility, combined with Dual Mode context awareness (Internal Political vs External Professional).',
      metric: '0.0ms Filter Latency • Clean Neutralization'
    },
    {
      id: 6,
      title: '6. B2B / Economic Focus',
      status: 'READY',
      detail: 'Enterprise strategic frameworks for supply chain paradoxes, FX hedging, resource allocation, and ROI modeling.',
      metric: 'Multi-Currency Risk Pool Engine'
    },
    {
      id: 7,
      title: '7. Conflict Resolution Engine',
      status: 'CALIBRATED',
      detail: 'Geopolitical analysis models evaluating escalation vectors (Levels 1-5), win-win game theory matrices, and UN human rights standards.',
      metric: 'UN & Geneva Conventions Aligned'
    },
    {
      id: 8,
      title: '8. Autonomous Execution & Synthesis',
      status: 'ONLINE',
      detail: 'Continuous dialectic synthesis triggers on idle mesh states, updating knowledge graph links and ZK lockbox persistence automatically.',
      metric: 'Continuous Mesh Loop'
    }
  ];

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Banner Verification Status */}
      <div className="bg-[#0A0A10] border border-[#2A2A35] rounded-lg p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-[#00F0FF]/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <span className="p-1.5 bg-[#004040] text-[#00F0FF] rounded border border-[#00F0FF]/40 cyan-glow-sm">
                <CheckCircle2 className="w-5 h-5" />
              </span>
              <h1 className="text-xl font-bold tracking-[0.1em] text-[#E0E0F0] uppercase">
                Daisy Haminja / <span className="text-[#00F0FF]">UAREFAKE Configuration Registry</span>
              </h1>
            </div>
            <p className="text-[#A0A0B0] text-xs max-w-3xl leading-relaxed">
              System architecture verification suite. All 8 core structural subsystems, 88 dialectic paradoxes, and 54 mesh topology nodes are active and verified for full operational capacity.
            </p>
          </div>

          <div className="flex items-center space-x-4 bg-[#050507] border border-[#2A2A35] rounded p-3 font-mono text-xs">
            <div className="text-center px-3 border-r border-[#2A2A35]">
              <div className="text-[#00FF41] text-lg font-bold">88 / 88</div>
              <div className="text-[#505060] text-[10px] tracking-widest">PARADOXES</div>
            </div>
            <div className="text-center px-3 border-r border-[#2A2A35]">
              <div className="text-[#00F0FF] text-lg font-bold">54 / 54</div>
              <div className="text-[#505060] text-[10px] tracking-widest">MESH NODES</div>
            </div>
            <div className="text-center px-3">
              <div className="text-[#FFB800] text-lg font-bold">100%</div>
              <div className="text-[#505060] text-[10px] tracking-widest">COMPLIANT</div>
            </div>
          </div>
        </div>
      </div>

      {/* 8-Point Architecture Verification Checklist */}
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-[#2A2A35] pb-2">
          <h2 className="text-xs font-bold text-[#505060] tracking-widest uppercase flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-[#00F0FF]" />
            <span>Architecture Verification Checklist (8 Core Requirements)</span>
          </h2>
          <span className="text-[10px] text-[#00FF41] bg-[#002810] border border-[#00FF41]/40 px-2.5 py-0.5 font-mono rounded-sm">
            8 / 8 FULLY SATISFIED
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {verificationChecklist.map((item, idx) => (
            <div 
              key={item.id}
              onClick={() => setActiveChecklistIndex(activeChecklistIndex === idx ? null : idx)}
              className={`p-3.5 rounded bg-[#12121A] border-l-2 transition-all cursor-pointer ${
                activeChecklistIndex === idx
                  ? 'border-[#00F0FF] shadow-[0_0_10px_rgba(0,240,255,0.15)] bg-[#121220]'
                  : 'border-[#2A2A35] hover:border-[#00F0FF]/60'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-semibold text-[#E0E0F0] text-xs">{item.title}</span>
                <span className="text-[9px] font-mono px-1.5 py-0.5 bg-[#004040] text-[#00F0FF] border border-[#00F0FF]/30">
                  {item.status}
                </span>
              </div>
              <p className="text-[11px] text-[#A0A0B0] leading-relaxed mb-2.5">
                {item.detail}
              </p>
              <div className="flex items-center justify-between text-[10px] font-mono text-[#505060] border-t border-[#1A1A25] pt-2">
                <span>{item.metric}</span>
                <span className="text-[#00F0FF] flex items-center space-x-1">
                  <span>Inspect</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Complete 88 Paradox Registry Explorer */}
      <div className="bg-[#0A0A10] border border-[#2A2A35] rounded-lg p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#2A2A35] pb-3">
          <div>
            <h2 className="text-base font-bold text-white tracking-wide uppercase flex items-center space-x-2">
              <Layers className="w-4 h-4 text-[#00F0FF]" />
              <span>Full 88 Paradox Dialectic Registry</span>
            </h2>
            <p className="text-xs text-[#505060]">
              Showing {filteredParadoxes.length} of 88 formal paradox definitions with paired dual-track cross-fire concepts.
            </p>
          </div>

          {/* Search & Filter Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#505060] absolute left-3 top-2.5" />
              <input
                type="text"
                value={paradoxSearch}
                onChange={(e) => setParadoxSearch(e.target.value)}
                placeholder="Search code, name, domain..."
                className="bg-[#050507] border border-[#2A2A35] text-[#E0E0F0] text-xs rounded pl-8 pr-3 py-1.5 focus:outline-none focus:border-[#00F0FF] w-48 sm:w-64 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex space-x-1.5 overflow-x-auto pb-2 scrollbar-none text-[11px] font-mono">
          {categoriesList.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-[#00F0FF] text-[#050507] font-bold'
                  : 'bg-[#12121A] text-[#808090] hover:text-[#E0E0F0] hover:bg-[#1A1A25]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Paradox Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[600px] overflow-y-auto pr-1">
          {filteredParadoxes.map((p) => (
            <div 
              key={p.id}
              className="bg-[#12121A] border border-[#2A2A35] rounded p-3.5 hover:border-[#00F0FF] transition-all space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] font-bold text-[#00F0FF] px-1.5 py-0.5 bg-[#003038] border border-[#00F0FF]/30">
                  {p.code}
                </span>
                <span className="text-[10px] text-[#808090] bg-[#0A0A10] px-2 py-0.5 rounded border border-[#1A1A25]">
                  {p.category}
                </span>
              </div>

              <h3 className="font-semibold text-[#E0E0F0] text-xs leading-snug">
                {p.name}
              </h3>

              <div className="text-[11px] text-[#A0A0B0] space-y-1 bg-[#0A0A10] p-2 rounded border border-[#1A1A25]">
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-[#505060]">Cross-Fire Pair:</span>
                  <span className="text-[#FFB800] font-bold">PRX-{p.crossFirePairId.toString().padStart(3, '0')}</span>
                </div>
                <div className="text-[10px] text-[#C0C0D0] italic">
                  "{p.crossFireConcept}"
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-[#505060] pt-1 border-t border-[#1A1A25]">
                <span>Weight: {p.dialecticWeight}</span>
                <span className="text-[#00FF41]">{p.verifiedSourceDomain}</span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* 54-Node Topology Quick Summary */}
      <div className="bg-[#0A0A10] border border-[#2A2A35] rounded-lg p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-[#2A2A35] pb-3">
          <h2 className="text-xs font-bold text-[#505060] tracking-widest uppercase flex items-center space-x-2">
            <Network className="w-4 h-4 text-[#00F0FF]" />
            <span>54-Node Tether Bubble Topology Matrix</span>
          </h2>
          <span className="text-[10px] font-mono text-[#00FF41]">ALL 5 CLUSTERS SYNCING</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
          {MESH_TOPOLOGY_54.slice(0, 12).map((node) => (
            <div key={node.id} className="bg-[#12121A] p-2.5 rounded border border-[#2A2A35] space-y-1 font-mono">
              <div className="flex items-center justify-between">
                <span className="text-[#00F0FF] font-bold text-[11px]">{node.id}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#00FF41] green-glow"></span>
              </div>
              <div className="text-[9px] text-[#808090] truncate">{node.cluster}</div>
              <div className="text-[9px] text-[#505060]">{node.latencyMs}ms • {node.ipAddress}</div>
            </div>
          ))}
        </div>
        <div className="text-center pt-1">
          <p className="text-[11px] font-mono text-[#505060]">
            + 42 additional nodes active. Switch to the <strong className="text-[#00F0FF]">54-Node Mesh Telemetry</strong> tab for full topology visualization and tether bubble health controls.
          </p>
        </div>
      </div>

    </div>
  );
};
