import { useState } from 'react';
import { MarketplaceListing, MarketplaceBid, ExecutionLog, BusinessTemplate, ParadoxSolution } from '../types';
import { CATALOG_105_BUSINESS_TEMPLATES } from '../engine/marketplaceEngine';
import { CATALOG_105_PARADOX_SOLUTIONS } from '../engine/paradoxEngine';
import { STAGED_MARKETPLACE_QUEUE } from '../engine/agenticBrainEngine';
import { generateMMTAISovereign380Header } from '../engine/mmtaiSecurityEngine';
import { ZkpProofSandboxModal } from './ZkpProofSandboxModal';
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  DollarSign, 
  ShieldCheck, 
  Truck, 
  CheckCircle2, 
  Plus, 
  Sparkles,
  Layers,
  ArrowRight,
  Boxes,
  Zap,
  TrendingUp,
  Cpu,
  FlaskConical,
  Lock,
  Scale
} from 'lucide-react';

interface MarketplaceViewProps {
  listings: MarketplaceListing[];
  bids: MarketplaceBid[];
  onPlaceBid: (bid: MarketplaceBid) => void;
  onAddLog: (log: ExecutionLog) => void;
  onDeployTemplate?: (template: BusinessTemplate) => void;
}

export function MarketplaceView({
  listings,
  bids,
  onPlaceBid,
  onAddLog,
  onDeployTemplate
}: MarketplaceViewProps) {
  const [activeTab, setActiveTab] = useState<'approved_sovereign_solutions' | 'templates' | 'paradox_solutions' | 'components'>('approved_sovereign_solutions');
  
  // ZKP Scientific & Mathematical Proof Sandbox State
  const [activeSandboxItem, setActiveSandboxItem] = useState<{
    title: string;
    id: string;
    category: string;
    nodeCount?: number;
    type?: string;
  } | null>(null);

  // Component Search & Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedListing, setSelectedListing] = useState<MarketplaceListing | null>(listings[0] || null);
  const [bidQuantity, setBidQuantity] = useState<number>(200);
  const [bidPrice, setBidPrice] = useState<number>(78);
  const [bidPlacedSuccess, setBidPlacedSuccess] = useState(false);

  // 105 Template Marketplace Search & Filters
  const [templateSearch, setTemplateSearch] = useState('');
  const [selectedTemplateCat, setSelectedTemplateCat] = useState('all');
  const [deployedTemplateId, setDeployedTemplateId] = useState<string | null>(null);

  // 105 Paradox Solutions Search & Filters
  const [paradoxSearch, setParadoxSearch] = useState('');
  const [selectedParadoxType, setSelectedParadoxType] = useState<string>('all');

  const categories = ['all', 'Semiconductors & Chips', 'Structural Assemblies', 'Chemicals & Coatings'];
  const templateCategories = ['all', 'Procurement', 'Supply Chain', 'Finance & AP', 'Vendor Risk', 'ESG & Compliance', 'AI & JIT Engine', 'Operations', 'Security'];

  const filteredListings = listings.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const filteredTemplates = CATALOG_105_BUSINESS_TEMPLATES.filter(tmpl => {
    const matchesSearch = tmpl.templateName.toLowerCase().includes(templateSearch.toLowerCase()) || tmpl.id.toLowerCase().includes(templateSearch.toLowerCase());
    const matchesCat = selectedTemplateCat === 'all' || tmpl.category === selectedTemplateCat;
    return matchesSearch && matchesCat;
  });

  const filteredParadoxSolutions = CATALOG_105_PARADOX_SOLUTIONS.filter(sol => {
    const matchesSearch = sol.title.toLowerCase().includes(paradoxSearch.toLowerCase()) || sol.id.toLowerCase().includes(paradoxSearch.toLowerCase());
    const matchesType = selectedParadoxType === 'all' || sol.type === selectedParadoxType;
    return matchesSearch && matchesType;
  });

  const handleDeployTemplate = (tmpl: BusinessTemplate) => {
    setDeployedTemplateId(tmpl.id);
    setTimeout(() => setDeployedTemplateId(null), 3000);

    if (onDeployTemplate) {
      onDeployTemplate(tmpl);
    }

    onAddLog({
      id: `LOG-${Date.now()}`,
      timestamp: new Date().toLocaleString(),
      agentName: 'Template Marketplace',
      actionType: 'Template Deployed',
      details: `Deployed 105-Template "${tmpl.templateName}" (${tmpl.nodeCount} Daisy Nodes).`,
      status: 'success',
      entityId: tmpl.id,
      entityType: 'Workflow'
    });
  };

  const handleSubmitBid = () => {
    if (!selectedListing) return;

    const newBid: MarketplaceBid = {
      id: `BID-${Math.floor(500 + Math.random() * 500)}`,
      listingId: selectedListing.id,
      buyerName: 'Solvex Enterprise Operations',
      quantity: bidQuantity,
      offeredUnitPrice: bidPrice,
      totalOffer: bidQuantity * bidPrice,
      bidTimestamp: new Date().toLocaleString(),
      status: 'pending'
    };

    onPlaceBid(newBid);
    setBidPlacedSuccess(true);
    setTimeout(() => setBidPlacedSuccess(false), 3000);

    onAddLog({
      id: `LOG-${Date.now()}`,
      timestamp: new Date().toLocaleString(),
      agentName: 'Marketplace Engine',
      actionType: 'Spot Bid Placed',
      details: `Submitted bid of $${bidPrice}/unit for ${bidQuantity} units on "${selectedListing.title}" (Total: $${(bidQuantity * bidPrice).toLocaleString()}).`,
      status: 'success',
      entityId: selectedListing.id,
      entityType: 'Marketplace'
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Top Marketplace Switcher Header */}
      <div className="bg-gradient-to-r from-blue-950/80 via-slate-900 to-indigo-950/80 border border-blue-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <ShoppingBag className="w-64 h-64 text-blue-400" />
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 border border-blue-500/40 text-blue-300 text-[10px] font-mono tracking-wider uppercase font-semibold">
                Autonomous B2B Solution & Proof Marketplace
              </span>
              <span className="text-xs text-slate-400 font-mono">105 Templates • 105 Paradox Solvers</span>
            </div>
            <h1 className="text-2xl font-bold text-white mt-1">Prebuilt Solutions & Zero-Knowledge Proof Sandboxes</h1>
            <p className="text-xs text-slate-300 max-w-2xl mt-1">
              Every single solution features an attached Zero-Knowledge Proof (ZKP) Scientific Sandbox that mathematically proves functionality without exposing AST code or proprietary algorithms.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 bg-slate-950/80 border border-slate-800 p-1.5 rounded-xl shrink-0">
            <button
              onClick={() => setActiveTab('approved_sovereign_solutions')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'approved_sovereign_solutions'
                  ? 'bg-purple-500 text-slate-950 shadow-md shadow-purple-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Approved Sovereign Solvers ({STAGED_MARKETPLACE_QUEUE.filter(s => s.approvalStatus === 'approved_public_marketplace').length})</span>
            </button>

            <button
              onClick={() => setActiveTab('templates')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'templates'
                  ? 'bg-blue-500 text-slate-950 shadow-md shadow-blue-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Boxes className="w-3.5 h-3.5" />
              <span>105 Templates ({CATALOG_105_BUSINESS_TEMPLATES.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('paradox_solutions')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'paradox_solutions'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>105 Paradox Solvers ({CATALOG_105_PARADOX_SOLUTIONS.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('components')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'components'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Spot Exchange ({listings.length})</span>
            </button>
          </div>
        </div>

      </div>

      {/* TAB 0: Approved Sovereign Solvers Marketplace */}
      {activeTab === 'approved_sovereign_solutions' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-purple-500/30 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-white flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                  <span>Approved Sovereign Solutions (Live Public Catalog)</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Solutions generated by Daisy's Self-Built MoE LLM that have passed extensive market pricing research and received sovereign owner approval to enter the public marketplace.
                </p>
              </div>
            </div>

            {STAGED_MARKETPLACE_QUEUE.filter(s => s.approvalStatus === 'approved_public_marketplace').length === 0 ? (
              <div className="p-12 text-center text-slate-500 font-mono text-xs space-y-2 border border-dashed border-slate-800 rounded-2xl">
                <Lock className="w-8 h-8 mx-auto text-slate-700" />
                <p>No solutions have been approved for public release yet.</p>
                <p className="text-[10px] text-slate-600">
                  Open Daisy Assistant, ask Daisy to solve a new problem, and click "Approve & Publish to Public Marketplace" to publish your first solution here.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono">
                {STAGED_MARKETPLACE_QUEUE.filter(s => s.approvalStatus === 'approved_public_marketplace').map((item) => {
                  const headerRec = generateMMTAISovereign380Header(
                    item.solutionId,
                    item.problemStatement,
                    'Sovereign Marketplace Buyer',
                    item.pricingResearch.estimatedMarketValuation,
                    'node01'
                  );

                  return (
                    <div key={item.solutionId} className="bg-slate-950 border border-purple-500/40 rounded-2xl p-5 space-y-4 shadow-xl">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest">{item.solutionId} • {item.sandboxCategory}</span>
                          <h3 className="text-xs font-bold text-white mt-1">{item.problemStatement}</h3>
                        </div>
                        <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold uppercase shrink-0">
                          MMTAI APPROVED PUBLIC
                        </span>
                      </div>

                      <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-2 text-[11px]">
                        <span className="text-[10px] font-bold text-amber-400 uppercase block">Verified Market Valuation & Pricing:</span>
                        <div className="grid grid-cols-2 gap-2 text-[10px]">
                          <div>
                            <span className="text-slate-400 block">Valuation:</span>
                            <strong className="text-emerald-400 font-bold">${item.pricingResearch.estimatedMarketValuation.toLocaleString()}</strong>
                          </div>
                          <div>
                            <span className="text-slate-400 block">Monthly License:</span>
                            <strong className="text-purple-300 font-bold">${item.pricingResearch.suggestedMonthlySaaSPrice}/mo</strong>
                          </div>
                          <div>
                            <span className="text-slate-400 block">Annual Dev Hours Saved:</span>
                            <strong className="text-cyan-300 font-bold">{item.pricingResearch.devHoursSavedPerYear} hrs</strong>
                          </div>
                          <div>
                            <span className="text-slate-400 block">ROI Multiplier:</span>
                            <strong className="text-amber-300 font-bold">{item.pricingResearch.estimatedRoiMultiplier}</strong>
                          </div>
                        </div>
                      </div>

                      {/* 380-Character Header & Node Expansion Linkage */}
                      <div className="p-3 bg-slate-900/80 border border-purple-500/30 rounded-xl space-y-1 text-[10px]">
                        <div className="flex items-center justify-between text-amber-400 font-bold">
                          <span>380-CHAR MMTAI SOVEREIGN SALE HEADER</span>
                          <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded font-mono">Length: {headerRec.exact380CharacterHeader.length} chars</span>
                        </div>
                        <p className="text-[9px] text-slate-400 font-mono break-all line-clamp-2 bg-slate-950 p-2 rounded border border-slate-800">
                          {headerRec.exact380CharacterHeader}
                        </p>
                        <div className="flex items-center justify-between pt-1 text-[9px] text-purple-300 font-bold">
                          <span>LINKED EXPANSION NODE ID:</span>
                          <span className="text-cyan-300 bg-cyan-500/20 px-2 py-0.5 rounded border border-cyan-500/30">{headerRec.finalNodeBoundHeader.slice(-12)}</span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                        <span>Solvex Proof: {item.proofHash.slice(0, 14)}...</span>
                        <button
                          onClick={() => {
                            setActiveSandboxItem({
                              id: item.solutionId,
                              title: item.problemStatement,
                              category: item.sandboxCategory,
                              type: 'Approved Sovereign AST Module'
                            });
                          }}
                          className="px-3 py-1 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 rounded-lg font-bold flex items-center space-x-1 transition-all"
                        >
                          <FlaskConical className="w-3 h-3 text-purple-400" />
                          <span>Run ZKP Scientific Proof</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 1: 105 Autonomous Business Templates Marketplace */}
      {activeTab === 'templates' && (
        <div className="space-y-6">
          
          {/* Template Search & Category Filter Bar */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search 105 business templates by title or category..."
                value={templateSearch}
                onChange={(e) => setTemplateSearch(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50"
              />
            </div>

            <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto scrollbar-none">
              <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              {templateCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedTemplateCat(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all shrink-0 ${
                    selectedTemplateCat === cat
                      ? 'bg-blue-500/20 border-blue-500/50 text-blue-300'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {cat === 'all' ? 'All Categories' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* 105 Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTemplates.map((tmpl) => (
              <div
                key={tmpl.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20 font-semibold">
                      {tmpl.category}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      {tmpl.estimatedRoiMultiplier}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white mt-1 leading-snug">{tmpl.templateName}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{tmpl.description}</p>
                </div>

                <div className="space-y-3 pt-3 border-t border-slate-800/80">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                    <span className="flex items-center space-x-1">
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      <span>{tmpl.nodeCount} Daisy Nodes</span>
                    </span>
                    <span className="text-slate-500">{tmpl.deploymentsCount} Deployments</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setActiveSandboxItem({
                        title: tmpl.templateName,
                        id: tmpl.id,
                        category: tmpl.category,
                        nodeCount: tmpl.nodeCount,
                        type: 'Turnkey Business Template'
                      })}
                      className="py-2 bg-slate-950 hover:bg-slate-800 border border-emerald-500/40 text-emerald-300 font-bold rounded-xl text-xs flex items-center justify-center space-x-1 transition-all"
                    >
                      <FlaskConical className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Proof Sandbox</span>
                    </button>

                    <button
                      onClick={() => handleDeployTemplate(tmpl)}
                      className="py-2 bg-blue-500 hover:bg-blue-400 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center space-x-1 transition-all shadow-md shadow-blue-500/20"
                    >
                      {deployedTemplateId === tmpl.id ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-slate-950" />
                          <span>Deployed!</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Deploy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* TAB 2: 105 Paradox Solutions Marketplace */}
      {activeTab === 'paradox_solutions' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search 105 paradox solver algorithms..."
                value={paradoxSearch}
                onChange={(e) => setParadoxSearch(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
              />
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-xs text-slate-400 font-mono">Filter Type:</span>
              <select
                value={selectedParadoxType}
                onChange={(e) => setSelectedParadoxType(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500/50"
              >
                <option value="all">All Solution Types (105)</option>
                <option value="historical">Historical Paradox Solvers (40)</option>
                <option value="proprietary">Proprietary B2B Solvers (48)</option>
                <option value="contract_security">Security & Contract Solvers (17)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredParadoxSolutions.map((sol) => (
              <div
                key={sol.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 font-semibold uppercase">
                      {sol.type.replace('_', ' ')}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      {sol.successRate}% Success
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white mt-1 leading-snug">{sol.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{sol.description}</p>
                </div>

                <div className="space-y-3 pt-3 border-t border-slate-800/80">
                  <div className="p-2 bg-slate-950 rounded-lg text-[10px] text-slate-400 font-mono">
                    <span className="text-amber-400 font-bold">Algorithm: </span>{sol.solverAlgorithm}
                  </div>

                  <button
                    onClick={() => setActiveSandboxItem({
                      title: sol.title,
                      id: sol.id,
                      category: sol.category,
                      nodeCount: 12,
                      type: 'Paradox Anomaly Solver'
                    })}
                    className="w-full py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center space-x-2 transition-all shadow-md shadow-amber-500/20"
                  >
                    <FlaskConical className="w-3.5 h-3.5 fill-current" />
                    <span>Launch ZKP Proof Sandbox ({sol.id})</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Spot Component Exchange */}
      {activeTab === 'components' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left List of Marketplace Catalog Items */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-white flex items-center space-x-2">
                <ShoppingBag className="w-4 h-4 text-blue-400" />
                <span>Available Wholesale Spot Catalog ({filteredListings.length})</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredListings.map((item) => {
                const isSelected = selectedListing?.id === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      setSelectedListing(item);
                      setBidPrice(item.bulkDiscountPrice);
                      setBidQuantity(item.minOrderQty);
                    }}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-slate-900 border-blue-500 shadow-lg shadow-blue-500/10'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20 font-semibold">
                        {item.category}
                      </span>
                      <span className="text-xs font-mono text-slate-400">{item.sku}</span>
                    </div>

                    <h3 className="text-xs font-bold text-white mt-2 leading-snug">{item.title}</h3>
                    <p className="text-[11px] text-slate-400 mt-1">{item.supplierName}</p>

                    <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-800/80">
                      <div>
                        <span className="text-[10px] text-slate-500 block">Unit Price</span>
                        <span className="text-sm font-bold text-white">${item.unitPrice.toFixed(2)}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block">Bulk Discount</span>
                        <span className="text-sm font-bold text-emerald-400">${item.bulkDiscountPrice.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveSandboxItem({
                            title: item.title,
                            id: item.id,
                            category: item.category,
                            nodeCount: 6,
                            type: 'Hardware Supply Chain Spec'
                          });
                        }}
                        className="px-2.5 py-1 bg-slate-950 border border-emerald-500/30 text-emerald-300 font-bold rounded-lg flex items-center space-x-1 hover:bg-slate-800"
                      >
                        <FlaskConical className="w-3 h-3 text-emerald-400" />
                        <span>Proof Sandbox</span>
                      </button>

                      <span className="flex items-center space-x-1 text-emerald-400 font-mono">
                        <ShieldCheck className="w-3 h-3" />
                        <span>{item.complianceRating}% SLA</span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Spot Bidding Terminal */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            {selectedListing ? (
              <div className="space-y-5">
                <div className="border-b border-slate-800 pb-4">
                  <span className="text-[10px] text-blue-400 font-mono font-bold uppercase tracking-wider">
                    Live Spot Bidding Terminal
                  </span>
                  <h2 className="text-base font-bold text-white mt-1">{selectedListing.title}</h2>
                  <p className="text-xs text-slate-400 mt-0.5">{selectedListing.supplierName} • {selectedListing.location}</p>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Available Inventory:</span>
                    <span className="text-white font-mono">{selectedListing.quantityAvailable.toLocaleString()} units</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Minimum Order Qty:</span>
                    <span className="text-white font-mono">{selectedListing.minOrderQty} units</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Standard Rate:</span>
                    <span className="text-white font-mono">${selectedListing.unitPrice.toFixed(2)}</span>
                  </div>
                </div>

                {/* Bidding Controls */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Order Quantity (units)
                    </label>
                    <input
                      type="number"
                      min={selectedListing.minOrderQty}
                      max={selectedListing.quantityAvailable}
                      value={bidQuantity}
                      onChange={(e) => setBidQuantity(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/50 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Target Unit Price ($)
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      value={bidPrice}
                      onChange={(e) => setBidPrice(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/50 font-mono"
                    />
                  </div>

                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-medium">Total Offer Commitment:</span>
                    <span className="text-base font-bold text-blue-400 font-mono">
                      ${(bidQuantity * bidPrice).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                  </div>

                  {/* Smart Escrow Contract Lock */}
                  <div className="p-3 bg-slate-950 border border-blue-500/30 rounded-xl space-y-1 text-[11px] font-mono">
                    <div className="flex justify-between text-slate-400">
                      <span>Smart Escrow Vault Lock:</span>
                      <span className="text-emerald-400 font-bold">2-of-3 Multi-Sig Ready</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Digital Signature Protocol:</span>
                      <span className="text-cyan-400">ECDSA SECP256K1</span>
                    </div>
                  </div>

                  <button
                    onClick={handleSubmitBid}
                    className="w-full py-2.5 bg-blue-500 hover:bg-blue-400 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center space-x-2 transition-all shadow-lg shadow-blue-500/20"
                  >
                    <Sparkles className="w-4 h-4 fill-current" />
                    <span>Execute Smart Escrow Spot Bid</span>
                  </button>

                  {bidPlacedSuccess && (
                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 font-mono flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Bid transmitted to {selectedListing.supplierName}!</span>
                    </div>
                  )}
                </div>

                {/* Active Bids History */}
                <div className="border-t border-slate-800 pt-4 space-y-2">
                  <span className="text-xs font-bold text-slate-300 font-mono block">Recent Bid Activity</span>
                  {bids.map((b) => (
                    <div key={b.id} className="p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs space-y-1">
                      <div className="flex justify-between font-mono text-[10px]">
                        <span className="text-blue-400">{b.id}</span>
                        <span className="text-slate-500">{b.bidTimestamp}</span>
                      </div>
                      <div className="flex justify-between font-bold text-white">
                        <span>{b.quantity} units @ ${b.offeredUnitPrice}/unit</span>
                        <span className="text-amber-400 uppercase">{b.status}</span>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            ) : (
              <p className="text-xs text-slate-500">Select a catalog listing to launch spot bid...</p>
            )}
          </div>

        </div>
      )}

      {/* Zero-Knowledge Proof Scientific & Mathematical Sandbox Modal */}
      {activeSandboxItem && (
        <ZkpProofSandboxModal
          isOpen={!!activeSandboxItem}
          onClose={() => setActiveSandboxItem(null)}
          solutionTitle={activeSandboxItem.title}
          solutionId={activeSandboxItem.id}
          category={activeSandboxItem.category}
          nodeCount={activeSandboxItem.nodeCount || 8}
          type={activeSandboxItem.type || 'Turnkey Solution'}
        />
      )}

    </div>
  );
}

