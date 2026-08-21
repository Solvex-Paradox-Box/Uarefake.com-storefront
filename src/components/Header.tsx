import React, { useState } from 'react';
import { 
  Network, Cpu, Truck, Layers, FileText, Search, ShieldCheck, Lock, Unlock, 
  Globe, Server, Hammer, Eye, ShoppingBag, Brain, Shield, ArrowRight, CheckCircle2, Sparkles, ChevronRight, Zap,
  User, LogOut, UserCheck
} from 'lucide-react';
import { DomainGuideModal } from './DomainGuideModal';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export type DomainMode = 'com' | 'space';

export type ActiveTabType = 
  | 'paradox-vault'
  | 'catalog' 
  | 'rfq' 
  | 'marketplace-exchange'
  | 'procurement' 
  | 'logistics' 
  | 'orders'
  | 'freedom-sim'
  | 'daisy'
  | 'brain'
  | 'sovereign-brain'
  | 'paradox-box'
  | 'registry-engine'
  | 'mmtai-security'
  | 'jit-build'
  | 'forge' 
  | 'blackbox' 
  | 'nodes' 
  | 'integrations';

interface HeaderProps {
  domainMode: DomainMode;
  setDomainMode: (mode: DomainMode) => void;
  activeTab: ActiveTabType;
  setActiveTab: (tab: ActiveTabType) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  ordersCount: number;
  nodesCount?: number;
  isMasterAdmin?: boolean;
  onOpenAuthModal?: () => void;
  onOpenProfileModal?: () => void;
  onLockAdmin?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  domainMode,
  setDomainMode,
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  ordersCount,
  nodesCount = 3,
  isMasterAdmin = false,
  onOpenAuthModal,
  onOpenProfileModal,
  onLockAdmin
}) => {
  const [domainModalOpen, setDomainModalOpen] = useState(false);
  const { user, isAuthenticated, logout, openAuthModal } = useAuth();
  const { itemCount, toggleCart } = useCart();

  const handleSwitchDomain = (newMode: DomainMode) => {
    setDomainMode(newMode);
    if (newMode === 'com') {
      if (!['catalog', 'rfq', 'marketplace-exchange', 'procurement', 'logistics', 'orders'].includes(activeTab)) {
        setActiveTab('catalog');
      }
    } else {
      if (!['daisy', 'brain', 'sovereign-brain', 'paradox-box', 'registry-engine', 'mmtai-security', 'jit-build', 'forge', 'blackbox', 'nodes', 'integrations'].includes(activeTab)) {
        setActiveTab('daisy');
      }
    }
  };

  return (
    <header id="solvex-header" className="bg-slate-950/95 backdrop-blur-md border-b border-cyan-500/30 text-slate-100 sticky top-0 z-40 shadow-2xl shadow-cyan-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top bar with Domain Switcher & Master Gate */}
        <div className="flex items-center justify-between h-16 gap-3">
          
          {/* Logo & Domain Identity */}
          <div 
            className="flex items-center space-x-3 cursor-pointer shrink-0" 
            onClick={() => handleSwitchDomain(domainMode)}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg border transition-all ${
              domainMode === 'com'
                ? 'bg-gradient-to-tr from-cyan-400 via-blue-600 to-indigo-600 shadow-blue-500/30 border-cyan-400/40'
                : 'bg-gradient-to-tr from-purple-500 via-indigo-600 to-emerald-500 shadow-purple-500/30 border-purple-400/40'
            }`}>
              {domainMode === 'com' ? (
                <Network className="w-6 h-6 animate-pulse-subtle" />
              ) : (
                <Brain className="w-6 h-6 animate-pulse-subtle text-emerald-300" />
              )}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-200 to-fuchsia-400 font-mono">
                  SOLVEX
                </span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold tracking-widest uppercase border flex items-center space-x-1 ${
                  domainMode === 'com'
                    ? 'bg-emerald-950/90 text-emerald-300 border-emerald-400/50 shadow-sm shadow-emerald-500/20'
                    : 'bg-purple-950/90 text-purple-300 border-purple-400/50'
                }`}>
                  {domainMode === 'com' ? (
                    <>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>YouAreFake.com • LIVE</span>
                    </>
                  ) : (
                    <>
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                      <span>uarefake.space</span>
                    </>
                  )}
                </span>
              </div>
              <p className="text-[11px] text-cyan-400/80 font-mono hidden sm:block">
                {domainMode === 'com'
                  ? 'Public Customer Storefront • 128 Sovereign Solutions • LIVE'
                  : 'Sovereign Admin & AI Control Plane • 88 Paradoxes'}
              </p>
            </div>
          </div>

          {/* Search Input (On .com mode) */}
          <div className="flex-1 max-w-md mx-2 hidden md:block">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400/70" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={domainMode === 'com' ? "Search 128 solutions, pricing, licenses..." : "Query axioms, 380 headers, nodes, Sentinel..."}
                className="w-full bg-black/80 border border-cyan-500/40 rounded-xl pl-9 pr-4 py-1.5 text-xs text-cyan-100 placeholder-cyan-600/70 focus:outline-none focus:ring-2 focus:ring-cyan-400/60 focus:border-cyan-300 font-mono transition-all"
              />
            </div>
          </div>

          {/* Primary Domain Split Switcher & Trustee Security Controls */}
          <div className="flex items-center space-x-2 shrink-0">
            
            {/* Shopping Cart Button */}
            <button
              onClick={toggleCart}
              className="relative flex items-center space-x-1.5 bg-gradient-to-r from-slate-900 to-cyan-950/80 hover:from-cyan-950 hover:to-slate-900 border border-cyan-500/50 hover:border-cyan-400 text-cyan-200 px-3 py-1.5 rounded-xl text-xs font-mono font-bold shadow-lg shadow-cyan-950/40 transition-all hover:scale-105 active:scale-95"
              title="View Shopping Cart & Checkout"
            >
              <ShoppingBag className="w-4 h-4 text-cyan-400" />
              <span className="hidden sm:inline">Cart</span>
              {itemCount > 0 && (
                <span className="flex items-center justify-center min-w-[1.25rem] h-5 px-1 text-[11px] font-mono font-extrabold text-black bg-cyan-400 rounded-full shadow-md shadow-cyan-400/30 animate-pulse">
                  {itemCount}
                </span>
              )}
            </button>

            {/* User Account / Auth Trigger */}
            {isAuthenticated && user ? (
              <div className="flex items-center space-x-1.5 bg-slate-900 border border-cyan-500/40 px-2.5 py-1.5 rounded-xl text-xs font-mono shadow-inner">
                <button
                  onClick={onOpenProfileModal}
                  className="flex items-center space-x-2 text-left hover:opacity-80 transition-opacity"
                  title="Open User Profile & Purchased Solutions Vault"
                >
                  {user.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt={user.name}
                      className="w-5 h-5 rounded-full object-cover border border-cyan-400/80"
                    />
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-black font-extrabold text-[10px]">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="hidden lg:flex flex-col text-left">
                    <span className="text-[11px] font-bold text-white leading-tight truncate max-w-[90px]">{user.name.split(' ')[0]}</span>
                    <span className="text-[9px] text-cyan-400/80 leading-tight truncate max-w-[90px]">{user.role}</span>
                  </div>
                </button>
                <button
                  onClick={logout}
                  className="text-slate-400 hover:text-rose-400 p-1 rounded hover:bg-slate-800 transition-colors ml-1"
                  title="Sign Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => openAuthModal('login')}
                className="flex items-center space-x-1.5 bg-slate-900 hover:bg-cyan-950/60 border border-slate-700 hover:border-cyan-500/50 text-slate-200 hover:text-cyan-300 px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all"
                title="Sign In or Register B2B Account"
              >
                <User className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline">Sign In</span>
              </button>
            )}

            {/* Direct Domain Mode Toggle Pill */}
            <div className="bg-slate-900 border border-slate-700/80 p-0.5 rounded-xl flex items-center shadow-inner">
              <button
                onClick={() => handleSwitchDomain('com')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  domainMode === 'com'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-900/40'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
                title="Switch to Customer Front Store on uarefake.com"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>.COM Store</span>
              </button>

              <button
                onClick={() => handleSwitchDomain('space')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  domainMode === 'space'
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-900/40'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
                title="Switch to Admin & Sovereign Control Plane on uarefake.space"
              >
                <Shield className="w-3.5 h-3.5 text-emerald-300" />
                <span>.SPACE Admin</span>
              </button>
            </div>

            {/* Sovereign Trustee Gate Trigger */}
            {isMasterAdmin ? (
              <div className="flex items-center space-x-1.5 bg-gradient-to-r from-purple-950 to-indigo-950 border border-purple-500/50 text-purple-200 px-2.5 py-1.5 rounded-xl text-xs font-semibold shadow-sm">
                <span className="text-amber-400">👑</span>
                <span className="font-mono text-[11px] hidden sm:inline">Trustee: TJ</span>
                <button
                  onClick={onLockAdmin}
                  title="Lock Sovereign Console to Public View"
                  className="ml-1 p-0.5 hover:bg-purple-800/60 rounded text-purple-300 hover:text-white transition-colors"
                >
                  <Lock className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuthModal}
                className="flex items-center space-x-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all"
                title="Unlock Sovereign Control Board on uarefake.space"
              >
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden md:inline font-mono text-[11px]">Trustee Auth</span>
              </button>
            )}

            {/* Domain DNS Setup Guide Modal Button */}
            <button
              onClick={() => setDomainModalOpen(true)}
              className="p-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white rounded-xl transition-all"
              title="View .com and .space DNS Routing Configuration"
            >
              <Globe className="w-4 h-4 text-indigo-400" />
            </button>
          </div>
        </div>

        {/* Dynamic Navigation Tabs Segmented by Domain */}
        <div className="flex items-center justify-between border-t border-slate-800/80 overflow-x-auto py-2 scrollbar-none gap-2">
          
          {/* USER FRONT STORE ON .COM */}
          {domainMode === 'com' ? (
            <div className="flex items-center space-x-1 sm:space-x-2">
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-400 mr-1 flex items-center space-x-1">
                <span>[uarefake.com Storefront]:</span>
              </div>

              {/* Paradox Vault (105 Real Lots Floor) */}
              <button
                onClick={() => setActiveTab('paradox-vault')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold font-mono transition-all whitespace-nowrap ${
                  activeTab === 'paradox-vault'
                    ? 'bg-amber-400 text-black shadow-lg shadow-amber-500/40 ring-1 ring-amber-300'
                    : 'text-amber-300 hover:text-white hover:bg-amber-500/20 border border-amber-500/40'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Paradox Vault (105 Lots)</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </button>

              {/* Solutions Catalog */}
              <button
                onClick={() => setActiveTab('catalog')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === 'catalog'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-900/30 ring-1 ring-blue-400'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <Network className="w-3.5 h-3.5 text-blue-400" />
                <span>Solutions Catalog (128)</span>
              </button>

              {/* B2B Marketplace Exchange (105 Solutions) */}
              <button
                onClick={() => setActiveTab('marketplace-exchange')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === 'marketplace-exchange'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/30 ring-1 ring-indigo-400'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-indigo-400" />
                <span>B2B Exchange (105)</span>
              </button>

              {/* RFQ Desk */}
              <button
                onClick={() => setActiveTab('rfq')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === 'rfq'
                    ? 'bg-amber-600 text-white shadow-md shadow-amber-900/30 ring-1 ring-amber-400'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
                <span>RFQ Bid Desk</span>
              </button>

              {/* AI Procurement */}
              <button
                onClick={() => setActiveTab('procurement')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === 'procurement'
                    ? 'bg-cyan-600 text-white shadow-md shadow-cyan-900/30 ring-1 ring-cyan-400'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                <span>AI Procurement</span>
              </button>

              {/* Logistics Hub */}
              <button
                onClick={() => setActiveTab('logistics')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === 'logistics'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30 ring-1 ring-emerald-400'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <Truck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Logistics Tracking</span>
              </button>

              {/* Orders & Invoices */}
              <button
                onClick={() => setActiveTab('orders')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === 'orders'
                    ? 'bg-sky-600 text-white shadow-md shadow-sky-900/30 ring-1 ring-sky-400'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-sky-400" />
                <span>Orders & Receipts</span>
                {ordersCount > 0 && (
                  <span className="ml-1 bg-sky-900/90 text-sky-200 text-[10px] px-1.5 py-0.2 rounded-full border border-sky-400/40 font-mono">
                    {ordersCount}
                  </span>
                )}
              </button>
            </div>
          ) : (
            /* ADMIN & SOVEREIGN CONTROL PLANE ON .SPACE */
            <div className="flex items-center space-x-1 sm:space-x-2">
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-purple-400 mr-1 flex items-center space-x-1">
                <span>[uarefake.space Admin]:</span>
              </div>

              {/* Paradox Vault (105 Real Lots Floor) */}
              <button
                onClick={() => setActiveTab('paradox-vault')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold font-mono transition-all whitespace-nowrap ${
                  activeTab === 'paradox-vault'
                    ? 'bg-amber-400 text-black shadow-lg shadow-amber-500/40 ring-1 ring-amber-300'
                    : 'text-amber-300 hover:text-white hover:bg-amber-500/20 border border-amber-500/40'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Paradox Vault (105 Lots)</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </button>

              {/* Freedom SIM AI OS (SwarmOS Sovereign) */}
              <button
                onClick={() => setActiveTab('freedom-sim')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === 'freedom-sim'
                    ? 'bg-gradient-to-r from-amber-400 via-rose-500 to-cyan-400 text-slate-950 font-bold shadow-md shadow-amber-500/40 ring-1 ring-amber-300'
                    : 'text-amber-300 hover:text-white hover:bg-amber-500/20 border border-amber-500/30'
                }`}
              >
                <Zap className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
                <span className="font-mono uppercase tracking-wider font-bold">Freedom SIM AI OS</span>
                <span className="px-1 py-0.2 text-[9px] bg-black text-amber-300 rounded font-mono font-bold">SOVEREIGN</span>
              </button>

              {/* DAISY & Agate Core Engine */}
              <button
                onClick={() => setActiveTab('daisy')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === 'daisy'
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30 ring-1 ring-amber-400 font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>DAISY & Agate Core (EVC/MMTAI)</span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              </button>

              {/* Cognitive Brain Hub */}
              <button
                onClick={() => setActiveTab('brain')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === 'brain'
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-900/30 ring-1 ring-purple-400'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <Brain className="w-3.5 h-3.5 text-purple-400" />
                <span>Cognitive Brain (88)</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </button>

              {/* Sovereign Agentic Brain Mesh */}
              <button
                onClick={() => setActiveTab('sovereign-brain')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === 'sovereign-brain'
                    ? 'bg-fuchsia-600 text-white shadow-md shadow-fuchsia-900/30 ring-1 ring-fuchsia-400 font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <Network className="w-3.5 h-3.5 text-fuchsia-400" />
                <span>Sovereign Brain Mesh</span>
              </button>

              {/* Paradox Box & Solvers */}
              <button
                onClick={() => setActiveTab('paradox-box')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === 'paradox-box'
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-900/30 ring-1 ring-rose-400'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                <span>Paradox Box (105 Solvers)</span>
              </button>

              {/* Dialectic Registry & Solver Engine */}
              <button
                onClick={() => setActiveTab('registry-engine')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === 'registry-engine'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30 ring-1 ring-emerald-400'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                <span>Dialectic Registry 88</span>
              </button>

              {/* MMTAI Security Suite */}
              <button
                onClick={() => setActiveTab('mmtai-security')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === 'mmtai-security'
                    ? 'bg-red-600 text-white shadow-md shadow-red-900/30 ring-1 ring-red-400'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-red-400" />
                <span>MMTAI Security Suite</span>
              </button>

              {/* JIT AST Synthesizer */}
              <button
                onClick={() => setActiveTab('jit-build')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === 'jit-build'
                    ? 'bg-amber-600 text-white shadow-md shadow-amber-900/30 ring-1 ring-amber-400'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>JIT Software Synthesizer</span>
              </button>

              {/* Daisy AI Forge */}
              <button
                onClick={() => setActiveTab('forge')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === 'forge'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/30 ring-1 ring-indigo-400'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <Hammer className="w-3.5 h-3.5 text-indigo-400" />
                <span>Daisy AI Forge</span>
              </button>

              {/* Black Box Audit */}
              <button
                onClick={() => setActiveTab('blackbox')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === 'blackbox'
                    ? 'bg-teal-600 text-white shadow-md shadow-teal-900/30 ring-1 ring-teal-400'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <Eye className="w-3.5 h-3.5 text-teal-400" />
                <span>Black Box 380 Ledger</span>
              </button>

              {/* Node Fleet */}
              <button
                onClick={() => setActiveTab('nodes')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === 'nodes'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30 ring-1 ring-emerald-400'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <Server className="w-3.5 h-3.5 text-emerald-400" />
                <span>Node Fleet (::NODE-01..03)</span>
                <span className="ml-1 bg-emerald-950 text-emerald-300 text-[10px] px-1.5 py-0.2 rounded font-mono border border-emerald-700/60">
                  {nodesCount} Nodes
                </span>
              </button>

              {/* ERP Integrations */}
              <button
                onClick={() => setActiveTab('integrations')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === 'integrations'
                    ? 'bg-violet-600 text-white shadow-md shadow-violet-900/30 ring-1 ring-violet-400'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-violet-400" />
                <span>ERP & Webhook Bridges</span>
              </button>
            </div>
          )}

          {/* Quick Domain Indicator link on the far right */}
          <div className="shrink-0 pl-2">
            <button
              onClick={() => handleSwitchDomain(domainMode === 'com' ? 'space' : 'com')}
              className="text-[11px] font-mono text-slate-400 hover:text-cyan-300 flex items-center space-x-1 transition-colors px-2 py-1 rounded bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40"
            >
              <span>Switch to {domainMode === 'com' ? 'uarefake.space' : 'uarefake.com'}</span>
              <ChevronRight className="w-3 h-3 text-cyan-400" />
            </button>
          </div>
        </div>
      </div>

      <DomainGuideModal
        isOpen={domainModalOpen}
        onClose={() => setDomainModalOpen(false)}
      />
    </header>
  );
};
