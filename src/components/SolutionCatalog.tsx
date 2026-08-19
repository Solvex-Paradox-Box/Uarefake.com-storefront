import React, { useState } from 'react';
import { SolutionItem } from '../types';
import { Cpu, Truck, ShieldCheck, Radio, Layers, BarChart3, Star, Check, ArrowRight, Zap, Info, Filter, Layers3, Briefcase, ChevronLeft, ChevronRight, Plus, Eye, ShoppingBag, FlaskConical } from 'lucide-react';
import { AddSolutionModal } from './AddSolutionModal';
import { CrystalClearBlackBoxSandboxModal } from './CrystalClearBlackBoxSandboxModal';
import { useCart } from '../context/CartContext';

interface SolutionCatalogProps {
  solutions: SolutionItem[];
  searchQuery: string;
  onSelectSolutionForPurchase: (item: SolutionItem) => void;
  onCustomItemAdded?: (item: SolutionItem) => void;
}

const getCategoryIcon = (iconName: string) => {
  switch (iconName) {
    case 'Cpu': return <Cpu className="w-5 h-5 text-cyan-400" />;
    case 'Truck': return <Truck className="w-5 h-5 text-emerald-400" />;
    case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-indigo-400" />;
    case 'Radio': return <Radio className="w-5 h-5 text-rose-400" />;
    case 'Layers': return <Layers className="w-5 h-5 text-amber-400" />;
    case 'BarChart3': return <BarChart3 className="w-5 h-5 text-sky-400" />;
    default: return <Cpu className="w-5 h-5 text-cyan-400" />;
  }
};

export const SolutionCatalog: React.FC<SolutionCatalogProps> = ({
  solutions,
  searchQuery,
  onSelectSolutionForPurchase,
  onCustomItemAdded
}) => {
  const { addToCart, openCart, items: cartItems } = useCart();
  const [selectedType, setSelectedType] = useState<'All' | 'Paradox Solution' | 'Autonomous Business Template'>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [activeDetailItem, setActiveDetailItem] = useState<SolutionItem | null>(null);
  const [sandboxItem, setSandboxItem] = useState<SolutionItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [addedItemNotification, setAddedItemNotification] = useState<string | null>(null);

  const handleAddToCartWithFeedback = (item: SolutionItem) => {
    addToCart(item, 1);
    setAddedItemNotification(item.title);
    setTimeout(() => setAddedItemNotification(null), 2500);
  };

  const itemsPerPage = 12;

  const categories = [
    'All',
    'ZK & Sovereign Cryptography',
    'HFT & Autonomous Compliance',
    'Autonomous AI & Governance',
    'JIT Software Distribution',
    'Procurement AI',
    'Logistics Automation',
    'Customs & Compliance',
    'Supply Chain IoT',
    'ERP Connector',
    'Autonomous Operations',
    'FinTech & Settlement'
  ];

  const filteredSolutions = solutions.filter(sol => {
    const matchesType = selectedType === 'All' || sol.itemType === selectedType;
    const matchesCategory = selectedCategory === 'All' || sol.category === selectedCategory;
    const matchesSearch = !searchQuery ||
      sol.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sol.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sol.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (sol.paradoxResolution && sol.paradoxResolution.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesType && matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredSolutions.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSolutions = filteredSolutions.slice(startIndex, startIndex + itemsPerPage);

  const handleTypeChange = (type: 'All' | 'Paradox Solution' | 'Autonomous Business Template') => {
    setSelectedType(type);
    setCurrentPage(1);
  };

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      {/* Top Filter & Search Action Bar */}
      <div className="bg-black/90 border border-cyan-500/40 rounded-2xl p-4 shadow-2xl shadow-cyan-950/40 backdrop-blur-md space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Solution Type Toggle Filters */}
          <div className="flex items-center space-x-1.5 bg-slate-950 p-1 rounded-xl border border-cyan-500/30 overflow-x-auto">
            <button
              onClick={() => handleTypeChange('All')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                selectedType === 'All'
                  ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All Offerings ({solutions.length})
            </button>
            <button
              onClick={() => handleTypeChange('Autonomous Business Template')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center space-x-1.5 ${
                selectedType === 'Autonomous Business Template'
                  ? 'bg-fuchsia-500 text-white shadow-md shadow-fuchsia-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5 text-fuchsia-400" />
              <span>105 Autonomous Businesses (Turnkey)</span>
            </button>
            <button
              onClick={() => handleTypeChange('Paradox Solution')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center space-x-1.5 ${
                selectedType === 'Paradox Solution'
                  ? 'bg-amber-500 text-black shadow-md shadow-amber-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>128 Paradox Solutions</span>
            </button>
          </div>

          <div className="flex items-center space-x-3 justify-between md:justify-end">
            <div className="text-xs font-mono text-cyan-400/80">
              Nexus Index: <span className="text-white font-bold">{filteredSolutions.length}</span> Active Items • <span className="text-cyan-300 font-semibold">uarefake.space Sync</span>
            </div>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-500/50 px-3 py-1.5 rounded-xl text-xs font-mono flex items-center space-x-1.5 transition-all shadow"
              title="Publish a new Paradox Solution or Business Template to the Marketplace"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Publish Solution</span>
            </button>
          </div>
        </div>

        {/* Highlight Banner for 105 Autonomous Businesses */}
        {selectedType === 'Autonomous Business Template' && (
          <div className="bg-gradient-to-r from-fuchsia-950/50 via-purple-950/40 to-slate-950 border border-fuchsia-500/40 rounded-xl p-3.5 flex items-start space-x-3 text-xs font-mono">
            <div className="p-2 bg-fuchsia-500/20 border border-fuchsia-500/50 rounded-lg text-fuchsia-300 shrink-0">
              <Briefcase className="w-4 h-4" />
            </div>
            <div className="space-y-1">
              <div className="text-fuchsia-300 font-bold uppercase tracking-wider text-[11px] flex items-center space-x-2">
                <span>105 Prebuilt Autonomous Businesses — Ready Out of the Box</span>
                <span className="bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-400/40 px-2 py-0.2 rounded-full text-[9px]">Turnkey</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Each of these 105 prebuilt business templates is a complete, self-sustaining enterprise. Once purchased, they operate autonomously with self-executing buyer outreach, instant vault delivery pipelines, automated revenue settlement, and cryptographic 380-byte node anchoring with zero ongoing human intervention required.
              </p>
            </div>
          </div>
        )}

        {/* Category Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
          <Filter className="w-4 h-4 text-cyan-400 shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-3 py-1 rounded-xl text-xs font-mono transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-black font-bold border border-cyan-400 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-950 hover:bg-slate-900 text-slate-400 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Solutions Grid - All 128 items each with custom Header Image */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedSolutions.map((item) => (
          <div
            key={item.id}
            className="bg-black/90 border border-cyan-500/40 hover:border-cyan-400 rounded-2xl flex flex-col justify-between transition-all hover:shadow-2xl hover:shadow-cyan-950/60 group relative overflow-hidden backdrop-blur-md"
          >
            {/* Header Image for every single solution */}
            <div className="relative h-44 w-full overflow-hidden bg-slate-950 border-b border-cyan-500/30">
              <img
                src={item.imageUrl || 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80'}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90 group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              
              {/* Category & Badge Overlay on Image Header */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                <div className="p-2 bg-black/80 backdrop-blur-md border border-cyan-500/50 rounded-xl shadow-lg">
                  {getCategoryIcon(item.iconName)}
                </div>
                <div className="flex flex-col items-end space-y-1">
                  <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase border shadow-md backdrop-blur-md ${
                    item.itemType === 'Paradox Solution'
                      ? 'bg-amber-950/90 text-amber-300 border-amber-500/70'
                      : 'bg-cyan-950/90 text-cyan-300 border-cyan-500/70'
                  }`}>
                    {item.itemType === 'Paradox Solution' ? '⚡ Paradox Solved' : '✨ Turnkey Matrix'}
                  </span>
                  {item.badge && (
                    <span className="bg-fuchsia-950/90 text-fuchsia-300 border border-fuchsia-800/70 text-[9px] font-mono font-semibold uppercase px-2 py-0.5 rounded-full shadow-md backdrop-blur-md">
                      {item.badge}
                    </span>
                  )}
                </div>
              </div>

              {/* Node Title & Specs overlay on bottom edge of image */}
              <div className="absolute bottom-2 left-3 right-3 z-10">
                <div className="text-[10px] font-mono text-cyan-300 uppercase tracking-wider">{item.category}</div>
                <h3 className="text-sm font-bold text-white font-mono truncate group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h3>
              </div>
            </div>

            {/* Card Content Details */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-xs text-slate-300 leading-relaxed line-clamp-2 mb-3">
                  {item.description}
                </p>

                {/* Paradox Resolution Box when applicable */}
                {item.paradoxResolution && (
                  <div className="bg-amber-950/30 border border-amber-500/40 p-2.5 rounded-xl text-[11px] text-amber-200/90 space-y-1 mb-3">
                    <span className="font-bold uppercase text-[9px] text-amber-400 block tracking-wider font-mono">
                      Quantum Paradox Resolution:
                    </span>
                    <p className="line-clamp-2 font-mono text-[11px]">{item.paradoxResolution}</p>
                  </div>
                )}

                {/* Features bullet list preview */}
                <div className="space-y-1.5 mb-4">
                  {item.features.slice(0, 2).map((feat, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-xs text-slate-300">
                      <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span className="truncate font-mono text-[11px]">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer with Price and Actions */}
              <div className="pt-4 border-t border-cyan-500/20 flex items-center justify-between">
                <div>
                  <div className="text-lg font-bold font-mono">
                    {item.price === 0 ? (
                      <div className="flex items-center space-x-1.5">
                        <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-lg text-xs font-extrabold uppercase">
                          FREE
                        </span>
                        <span className="text-xs text-emerald-400 font-mono font-bold">$0.00</span>
                      </div>
                    ) : (
                      <span className="text-white">
                        ${item.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-cyan-400/70 font-mono font-medium">{item.pricingModel}</div>
                </div>

                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={() => setSandboxItem(item)}
                    className="p-2 text-amber-400 hover:text-black hover:bg-amber-400 bg-amber-950/60 border border-amber-500/50 rounded-xl transition-all font-mono text-xs flex items-center space-x-1 shadow-sm"
                    title="Open Solvex Crystal Clear Black Box Sandbox (Scientific & Mathematical Proof)"
                  >
                    <FlaskConical className="w-4 h-4" />
                    <span className="hidden sm:inline text-[10px] font-bold">Proof</span>
                  </button>

                  <button
                    onClick={() => setActiveDetailItem(item)}
                    className="p-2 text-cyan-400 hover:text-white bg-slate-900 border border-cyan-500/40 hover:bg-slate-800 rounded-xl transition-all"
                    title="View Specs & Details"
                  >
                    <Info className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleAddToCartWithFeedback(item)}
                    className="p-2 text-cyan-300 hover:text-black hover:bg-cyan-400 bg-cyan-950/80 border border-cyan-500/50 rounded-xl transition-all font-mono text-xs flex items-center space-x-1"
                    title="Add to Cart"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span className="hidden xl:inline text-[11px] font-bold">Add</span>
                  </button>

                  <button
                    onClick={() => onSelectSolutionForPurchase(item)}
                    className={`${
                      item.price === 0
                        ? 'bg-emerald-400 hover:bg-emerald-300 text-black shadow-emerald-500/30'
                        : 'bg-cyan-500 hover:bg-cyan-400 text-black shadow-cyan-500/30'
                    } font-extrabold px-3 py-2 rounded-xl text-xs flex items-center space-x-1 transition-all shadow-lg active:scale-95`}
                  >
                    <span className="font-mono text-xs whitespace-nowrap">{item.price === 0 ? 'Free Deploy' : 'Deploy'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quantum Pagination Controls */}
      <div className="flex items-center justify-between bg-black/90 border border-cyan-500/30 rounded-2xl p-4 text-xs font-mono">
        <div className="text-slate-400">
          Showing <span className="text-cyan-300 font-bold">{startIndex + 1}</span> to{' '}
          <span className="text-cyan-300 font-bold">{Math.min(startIndex + itemsPerPage, filteredSolutions.length)}</span> of{' '}
          <span className="text-white font-bold">{filteredSolutions.length}</span> Sovereign Solutions
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className={`p-2 rounded-xl border transition-all ${
              currentPage === 1
                ? 'border-slate-800 text-slate-600 cursor-not-allowed'
                : 'border-cyan-500/40 text-cyan-300 hover:bg-cyan-950'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
            <button
              key={pg}
              onClick={() => setCurrentPage(pg)}
              className={`w-8 h-8 rounded-xl font-bold transition-all ${
                currentPage === pg
                  ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/30'
                  : 'text-slate-400 hover:bg-slate-900 border border-transparent hover:border-slate-800'
              }`}
            >
              {pg}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-xl border transition-all ${
              currentPage === totalPages
                ? 'border-slate-800 text-slate-600 cursor-not-allowed'
                : 'border-cyan-500/40 text-cyan-300 hover:bg-cyan-950'
            }`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Solution Detail Modal with Full High-Res Header Image */}
      {activeDetailItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
          <div className="bg-slate-950 border border-cyan-500/60 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto text-slate-100 shadow-2xl shadow-cyan-950/60 relative">
            
            {/* Modal Image Header Banner */}
            <div className="relative h-56 w-full overflow-hidden bg-black border-b border-cyan-500/40">
              <img
                src={activeDetailItem.imageUrl || 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80'}
                alt={activeDetailItem.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              
              <button
                onClick={() => setActiveDetailItem(null)}
                className="absolute top-4 right-4 p-2 rounded-full text-white bg-black/70 hover:bg-black border border-cyan-500/40 transition-all z-20"
              >
                ✕
              </button>

              <div className="absolute bottom-4 left-6 right-6 z-10">
                <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider block mb-1">
                  {activeDetailItem.category} • {activeDetailItem.itemType}
                </span>
                <h2 className="text-2xl font-bold text-white font-mono">{activeDetailItem.title}</h2>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <p className="text-sm text-slate-300 leading-relaxed font-mono">
                {activeDetailItem.fullDescription}
              </p>

              {activeDetailItem.paradoxResolution && (
                <div className="bg-amber-950/40 border border-amber-500/40 p-4 rounded-2xl space-y-1">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block font-mono">
                    ⚡ Quantum Cryptographic Paradox Resolution:
                  </span>
                  <p className="text-xs text-amber-200 font-mono">{activeDetailItem.paradoxResolution}</p>
                </div>
              )}

              {/* Technical Specifications Grid */}
              <div>
                <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider font-mono mb-3">
                  Node Technical Specifications
                </h4>
                <div className="grid grid-cols-2 gap-3 bg-black p-4 rounded-2xl border border-cyan-500/30 text-xs font-mono">
                  {Object.entries(activeDetailItem.specs).map(([key, value]) => (
                    <div key={key}>
                      <span className="text-cyan-600 block text-[10px] uppercase">{key}</span>
                      <span className="text-slate-200 font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Full Features */}
              <div>
                <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider font-mono mb-3">
                  Key Automation Entitlements
                </h4>
                <ul className="space-y-2">
                  {activeDetailItem.features.map((feat, i) => (
                    <li key={i} className="flex items-center space-x-2 text-xs text-slate-200 font-mono">
                      <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pricing & Checkout Action */}
              <div className="pt-4 border-t border-cyan-500/30 flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold font-mono">
                    {activeDetailItem.price === 0 ? (
                      <div className="flex items-center space-x-2">
                        <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-3 py-1 rounded-xl text-base font-extrabold uppercase">
                          FREE
                        </span>
                        <span className="text-sm text-emerald-400 font-mono font-bold">($0.00 USD)</span>
                      </div>
                    ) : (
                      <span className="text-white">
                        ${activeDetailItem.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-cyan-400 font-mono">{activeDetailItem.pricingModel}</div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => {
                      const item = activeDetailItem;
                      setActiveDetailItem(null);
                      setSandboxItem(item);
                    }}
                    className="bg-amber-950/80 hover:bg-amber-900 border border-amber-500/60 text-amber-300 font-bold px-4 py-3 rounded-2xl text-xs font-mono transition-all flex items-center space-x-2 shadow-lg shadow-amber-950/40"
                    title="Open Solvex Crystal Clear Black Box Sandbox"
                  >
                    <FlaskConical className="w-4 h-4 text-amber-400" />
                    <span>Scientific Sandbox</span>
                  </button>

                  <button
                    onClick={() => {
                      handleAddToCartWithFeedback(activeDetailItem);
                      setActiveDetailItem(null);
                    }}
                    className="bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/50 text-cyan-300 font-bold px-4 py-3 rounded-2xl text-xs font-mono transition-all flex items-center space-x-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>

                  <button
                    onClick={() => {
                      const item = activeDetailItem;
                      setActiveDetailItem(null);
                      onSelectSolutionForPurchase(item);
                    }}
                    className={`${
                      activeDetailItem.price === 0
                        ? 'bg-emerald-400 hover:bg-emerald-300 text-black shadow-emerald-500/30'
                        : 'bg-cyan-500 hover:bg-cyan-400 text-black shadow-cyan-500/30'
                    } font-extrabold px-5 py-3 rounded-2xl text-xs font-mono shadow-xl transition-all flex items-center space-x-2 active:scale-95`}
                  >
                    <span>{activeDetailItem.price === 0 ? 'Claim Free License' : 'Instant Checkout'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Added-to-Cart Toast */}
      {addedItemNotification && (
        <div className="fixed bottom-6 right-6 z-50 bg-cyan-950 border border-cyan-400 text-white p-4 rounded-2xl shadow-2xl shadow-cyan-950 flex items-center space-x-3 animate-fade-in font-mono text-xs">
          <div className="w-8 h-8 rounded-xl bg-cyan-500 text-black flex items-center justify-center font-bold">
            <Check className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-cyan-300">Added to Sovereign Cart</div>
            <div className="text-[11px] text-slate-300 truncate max-w-xs">{addedItemNotification}</div>
          </div>
          <button
            onClick={() => {
              setAddedItemNotification(null);
              openCart();
            }}
            className="bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold px-3 py-1.5 rounded-xl text-[11px] ml-2"
          >
            View Cart
          </button>
        </div>
      )}

      {/* Solvex Crystal Clear Black Box Sandbox Modal */}
      {sandboxItem && (
        <CrystalClearBlackBoxSandboxModal
          isOpen={!!sandboxItem}
          onClose={() => setSandboxItem(null)}
          solutionId={sandboxItem.id}
          solutionTitle={sandboxItem.title}
          category={sandboxItem.category}
          itemType={sandboxItem.itemType}
          paradoxResolved={sandboxItem.paradoxResolution}
          unitPrice={sandboxItem.price}
        />
      )}

      {/* Add Custom Item Modal */}
      <AddSolutionModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onItemAdded={(newItem) => {
          if (onCustomItemAdded) {
            onCustomItemAdded(newItem);
          }
        }}
      />
    </div>
  );
};
