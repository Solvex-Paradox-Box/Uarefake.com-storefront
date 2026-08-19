import React, { useState, useEffect } from 'react';
import { Header, ActiveTabType, DomainMode } from './components/Header';
import { SolutionCatalog } from './components/SolutionCatalog';
import { ProcurementDesk } from './components/ProcurementDesk';
import { LogisticsHub } from './components/LogisticsHub';
import { IntegrationsPanel } from './components/IntegrationsPanel';
import { OrderHistory } from './components/OrderHistory';
import { CompanyNodeTracker } from './components/CompanyNodeTracker';
import { AppForgeBuilder } from './components/AppForgeBuilder';
import { BlackBoxAudit } from './components/BlackBoxAudit';
import { RfqMarketplace } from './components/RfqMarketplace';
import { CognitiveBrainHub } from './components/CognitiveBrainHub';
import { DaisyPipelineHub } from './components/DaisyPipelineHub';
import { SovereignAuthModal } from './components/SovereignAuthModal';
import { ProtectedControlView } from './components/ProtectedControlView';
import { ToastNotification, ToastMessage } from './components/ToastNotification';
import { PayPalCheckoutModal } from './components/PayPalCheckoutModal';
import { MarketplaceView } from './components/MarketplaceView';
import { AgentBrainView } from './components/AgentBrainView';
import { ParadoxBoxView } from './components/ParadoxBoxView';
import { AIRegistryViewer } from './components/AIRegistryViewer';
import { MmtaiSecurityView } from './components/MmtaiSecurityView';
import { JitBuildView } from './components/JitBuildView';
import { FreedomSimView } from './components/FreedomSimView';
import { SovereignLotVaultView } from './components/SovereignLotVaultView';
import { 
  SolutionItem, 
  PurchaseOrder, 
  Shipment, 
  ERPIntegration,
  MarketplaceListing,
  MarketplaceBid,
  AgentBrainState,
  ParadoxAnomaly,
  MMTAIPeer,
  MMTAISecurityAudit,
  JitBuildTask,
  ExecutionLog,
  BusinessTemplate
} from './types';
import { INITIAL_SOLUTIONS, INITIAL_ORDERS, INITIAL_SHIPMENTS, INITIAL_ERP_INTEGRATIONS } from './data/solvexData';
import { INITIAL_MARKETPLACE_LISTINGS, INITIAL_MARKETPLACE_BIDS } from './engine/marketplaceEngine';
import { INITIAL_BRAIN_STATE } from './engine/agenticBrainEngine';
import { INITIAL_88_PARADOX_ANOMALIES } from './engine/paradoxEngine';
import { INITIAL_MMTAI_PEERS, INITIAL_MMTAI_AUDITS } from './engine/mmtaiSecurityEngine';
import { INITIAL_JIT_BUILD_TASKS } from './engine/jitBuildEngine';
import { CompanyNode, INITIAL_COMPANY_NODES, generate380CharHeader } from './utils/nodeHeader';
import { compileJitSoftwarePackage, JitSoftwareArtifact } from './utils/jitCompiler';
import { Shield, ShoppingBag, Globe, ArrowRight, Brain, Server, CheckCircle2, Lock } from 'lucide-react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider, useCart } from './context/CartContext';
import { UserAuthModal } from './components/UserAuthModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';

function StorefrontApp({ forcedDomainMode }: { forcedDomainMode?: DomainMode }) {
  const { authModalOpen, authModalMode, closeAuthModal } = useAuth();
  const { isCartOpen, isCheckoutOpen, openCheckout, closeCheckout } = useCart();
  // Domain mode: .com (User Storefront) vs .space (Admin Control Plane)
  const [domainMode, setDomainMode] = useState<DomainMode>(() => {
    if (forcedDomainMode) return forcedDomainMode;
    try {
      if (typeof window !== 'undefined') {
        const host = window.location.hostname.toLowerCase();
        const hash = window.location.hash.toLowerCase();
        const search = window.location.search.toLowerCase();
        if (host.includes('space') || hash.includes('space') || search.includes('space')) {
          return 'space';
        }
      }
      return (localStorage.getItem('solvex_domain_mode') as DomainMode) || 'com';
    } catch {
      return 'com';
    }
  });

  const [activeTab, setActiveTab] = useState<ActiveTabType>(() => {
    return domainMode === 'space' ? 'brain' : 'paradox-vault';
  });

  const [searchQuery, setSearchQuery] = useState('');

  const [solutions, setSolutions] = useState<SolutionItem[]>(INITIAL_SOLUTIONS);
  const [orders, setOrders] = useState<PurchaseOrder[]>(INITIAL_ORDERS);
  const [shipments, setShipments] = useState<Shipment[]>(INITIAL_SHIPMENTS);
  const [integrations, setIntegrations] = useState<ERPIntegration[]>(INITIAL_ERP_INTEGRATIONS);
  const [companyNodes, setCompanyNodes] = useState<CompanyNode[]>(INITIAL_COMPANY_NODES);

  // Solvex Paradox Marketplace & Autonomous Engine States
  const [marketplaceListings, setMarketplaceListings] = useState<MarketplaceListing[]>(INITIAL_MARKETPLACE_LISTINGS);
  const [marketplaceBids, setMarketplaceBids] = useState<MarketplaceBid[]>(INITIAL_MARKETPLACE_BIDS);
  const [brainState, setBrainState] = useState<AgentBrainState>(INITIAL_BRAIN_STATE);
  const [paradoxAnomalies, setParadoxAnomalies] = useState<ParadoxAnomaly[]>(INITIAL_88_PARADOX_ANOMALIES);
  const [mmtaiPeers, setMmtaiPeers] = useState<MMTAIPeer[]>(INITIAL_MMTAI_PEERS);
  const [mmtaiAudits, setMmtaiAudits] = useState<MMTAISecurityAudit[]>(INITIAL_MMTAI_AUDITS);
  const [jitTasks, setJitTasks] = useState<JitBuildTask[]>(INITIAL_JIT_BUILD_TASKS);
  const [engineLogs, setEngineLogs] = useState<ExecutionLog[]>([]);

  const handleAddEngineLog = (log: ExecutionLog) => {
    setEngineLogs(prev => [log, ...prev].slice(0, 200));
  };

  // Sovereign Trustee Master Authorization
  const [isMasterAdmin, setIsMasterAdmin] = useState<boolean>(() => {
    try {
      return localStorage.getItem('solvex_master_auth_v1') === 'true';
    } catch {
      return false;
    }
  });
  const [masterAuthModalOpen, setMasterAuthModalOpen] = useState(false);

  const handleDomainModeChange = (mode: DomainMode) => {
    setDomainMode(mode);
    try {
      localStorage.setItem('solvex_domain_mode', mode);
    } catch {}
  };

  const handleAuthenticateMaster = (success: boolean) => {
    if (success) {
      setIsMasterAdmin(true);
      try {
        localStorage.setItem('solvex_master_auth_v1', 'true');
      } catch {}
      addToast({
        title: 'Sovereign Trustee Verified',
        message: 'Master control board on uarefake.space is unlocked.',
        type: 'success'
      });
    }
  };

  const handleLockMaster = () => {
    setIsMasterAdmin(false);
    try {
      localStorage.removeItem('solvex_master_auth_v1');
    } catch {}
    addToast({
      title: 'Console Locked',
      message: 'Switched to Public Viewer mode. .space controls are sealed.',
      type: 'info'
    });
  };

  // Toast notifications state
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // PayPal Checkout Modal state
  const [paypalModalOpen, setPaypalModalOpen] = useState(false);
  const [itemToPay, setItemToPay] = useState<SolutionItem | null>(null);
  const [poToPay, setPoToPay] = useState<PurchaseOrder | null>(null);

  const addToast = (toast: Omit<ToastMessage, 'id' | 'timestamp'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newToast: ToastMessage = {
      ...toast,
      id,
      timestamp: new Date().toLocaleTimeString()
    };

    setToasts(prev => [newToast, ...prev]);

    // Auto dismiss after 6 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 6000);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Initial backend fetch
  useEffect(() => {
    fetch('/api/solutions')
      .then(res => res.json().catch(() => null))
      .then(data => Array.isArray(data) && setSolutions(data))
      .catch(() => {});

    fetch('/api/orders')
      .then(res => res.json().catch(() => null))
      .then(data => Array.isArray(data) && setOrders(data))
      .catch(() => {});

    fetch('/api/shipments')
      .then(res => res.json().catch(() => null))
      .then(data => Array.isArray(data) && setShipments(data))
      .catch(() => {});

    fetch('/api/integrations')
      .then(res => res.json().catch(() => null))
      .then(data => Array.isArray(data) && setIntegrations(data))
      .catch(() => {});

    fetch('/api/nodes')
      .then(res => res.json().catch(() => null))
      .then(data => Array.isArray(data) && data.length > 0 && setCompanyNodes(data))
      .catch(() => {});
  }, []);

  const refreshOrdersAndShipments = () => {
    fetch('/api/orders')
      .then(res => res.json().catch(() => null))
      .then(data => Array.isArray(data) && setOrders(data))
      .catch(() => {});

    fetch('/api/shipments')
      .then(res => res.json().catch(() => null))
      .then(data => Array.isArray(data) && setShipments(data))
      .catch(() => {});

    fetch('/api/nodes')
      .then(res => res.json().catch(() => null))
      .then(data => Array.isArray(data) && data.length > 0 && setCompanyNodes(data))
      .catch(() => {});
  };

  const handleOpenPaypalForSolution = (item: SolutionItem) => {
    setItemToPay(item);
    setPoToPay(null);
    setPaypalModalOpen(true);
  };

  const handleOpenPaypalForPo = (po: PurchaseOrder) => {
    setPoToPay(po);
    setItemToPay(null);
    setPaypalModalOpen(true);
  };

  const handleAddNode = (newNode: CompanyNode) => {
    setCompanyNodes(prev => {
      const idx = prev.findIndex(n => n.id === newNode.id || n.nodeNumber === newNode.nodeNumber);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = newNode;
        return next;
      }
      return [newNode, ...prev];
    });
    addToast({
      title: 'Company Device Node Provisioned',
      message: `Node ${newNode.nodeNumber} assigned for ${newNode.deviceName} (${newNode.location}).`,
      type: 'success',
      nodeHeader: newNode.companyMainHeader,
      nodeNumber: newNode.nodeNumber
    });
  };

  const handleForgeDeploy = (appName: string, nodeHeader: string, newNode: CompanyNode) => {
    setCompanyNodes(prev => [...prev, newNode]);

    // Create PO for forged software
    const forgePo: PurchaseOrder = {
      id: `po-forge-${Date.now()}`,
      poNumber: `PO-FORGE-${Math.floor(1000 + Math.random() * 9000)}`,
      title: `Daisy App Forge: ${appName}`,
      itemDescription: `Custom JIT Application Package Compiled & Deployed`,
      quantity: 1,
      unitPrice: 0,
      totalAmount: 0,
      currency: 'USD',
      status: 'Completed',
      supplierName: 'Daisy Haminja App Forge Engine',
      shippingAddress: 'uarefake.space Edge Control Plane',
      destinationPort: newNode.location,
      carrier: 'Solvex JIT Auto-Deploy',
      trackingNumber: `380CHAR-${newNode.nodeNumber}`,
      createdAt: new Date().toISOString(),
      logs: [
        { timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16), message: `Forged software deployed to ${newNode.nodeNumber} with 380-character header.`, type: 'success' }
      ]
    };

    setOrders(prev => [forgePo, ...prev]);

    addToast({
      title: 'Daisy App Forge Deployment Successful!',
      message: `Forged application "${appName}" deployed to ${newNode.nodeNumber} (${newNode.deviceName}).`,
      type: 'success',
      nodeHeader: nodeHeader,
      nodeNumber: newNode.nodeNumber
    });
  };

  const handleProcurementOrderFinalized = (newPo: PurchaseOrder) => {
    setOrders(prev => [newPo, ...prev]);

    // Generate node header for new PO
    const nextNodeNum = `NODE-${String(companyNodes.length + 1).padStart(2, '0')}`;
    const header380 = generate380CharHeader(nextNodeNum);

    // Auto create company node for order
    const autoNode: CompanyNode = {
      id: `node-po-${Date.now()}`,
      nodeNumber: nextNodeNum,
      companyName: 'uarefake.com Enterprise Core',
      companyMainHeader: header380,
      deviceName: `Procurement Node (${newPo.title})`,
      location: newPo.destinationPort || 'Production Cluster',
      assignedSoftware: newPo.title,
      poId: newPo.id,
      status: 'Active',
      lastPing: 'Just now',
      ipAddress: `10.240.0.${30 + companyNodes.length}`
    };

    setCompanyNodes(prev => [...prev, autoNode]);

    // Trigger Toast
    addToast({
      title: 'Procurement Order Finalized!',
      message: `Purchase Order ${newPo.poNumber} finalized ($${newPo.totalAmount.toLocaleString()} USD). Software assigned to ${nextNodeNum}.`,
      type: 'success',
      nodeHeader: header380,
      nodeNumber: nextNodeNum
    });
  };

  const handlePaymentSuccess = ({ orderId, payerEmail, jitArtifact }: { orderId: string; payerEmail: string; jitArtifact?: JitSoftwareArtifact }) => {
    const nextNodeNum = `NODE-${String(companyNodes.length + 1).padStart(2, '0')}`;
    const nodeHeader380 = generate380CharHeader(nextNodeNum);

    if (itemToPay) {
      const artifact = jitArtifact || compileJitSoftwarePackage(itemToPay, nextNodeNum, payerEmail);

      // Create a Purchase Order for the purchased solution item
      const solutionPo: PurchaseOrder = {
        id: `po-sol-${Date.now()}`,
        poNumber: `PO-SOL-${Math.floor(1000 + Math.random() * 9000)}`,
        title: itemToPay.title,
        itemDescription: `JIT Custom Software License (${itemToPay.pricingModel})`,
        quantity: 1,
        unitPrice: itemToPay.price,
        totalAmount: itemToPay.price,
        currency: 'USD',
        status: 'Completed',
        supplierName: itemToPay.vendor,
        shippingAddress: 'Cloud Deployment Container Endpoint (uarefake.space)',
        destinationPort: 'API Cloud Instance / Docker Registry',
        carrier: 'Solvex JIT Bytecode Compiler',
        trackingNumber: artifact.licenseKey,
        createdAt: new Date().toISOString(),
        paypalOrderId: orderId,
        paypalPaymentStatus: 'COMPLETED',
        paypalPayerEmail: payerEmail,
        jitArtifact: artifact,
        logs: [
          { timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16), message: itemToPay.price === 0 ? `Free test license fulfilled ($0.00). JIT software package compiled for ${nextNodeNum}.` : `PayPal payment captured ($${itemToPay.price}). JIT software package compiled for ${nextNodeNum}.`, type: 'success' },
          { timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16), message: `380-char deterministic header generated and attached: ${nodeHeader380.substring(0, 48)}...`, type: 'info' }
        ]
      };

      setOrders(prev => [solutionPo, ...prev]);

      // Register company node
      const purchasedNode: CompanyNode = {
        id: `node-pay-${Date.now()}`,
        nodeNumber: nextNodeNum,
        companyName: 'uarefake.com Enterprise Core',
        companyMainHeader: nodeHeader380,
        deviceName: `${itemToPay.title} Node Station`,
        location: 'uarefake.com Cloud Gateway',
        assignedSoftware: itemToPay.title,
        poId: solutionPo.id,
        status: 'Active',
        lastPing: 'Just now',
        ipAddress: `10.240.0.${35 + companyNodes.length}`
      };

      setCompanyNodes(prev => [...prev, purchasedNode]);

      // Trigger Toast Notification
      addToast({
        title: itemToPay.price === 0 ? 'Free Solution Deployed & Provisioned!' : 'PayPal Payment Processed Successfully!',
        message: itemToPay.price === 0 ? `Free license ($0.00) issued for ${itemToPay.title}. Assigned to ${nextNodeNum}.` : `Captured $${itemToPay.price.toFixed(2)} USD via PayPal for ${itemToPay.title}. Assigned to ${nextNodeNum}.`,
        type: 'success',
        nodeHeader: nodeHeader380,
        nodeNumber: nextNodeNum
      });
    } else if (poToPay) {
      refreshOrdersAndShipments();

      addToast({
        title: 'PayPal Settlement Completed!',
        message: `Payment captured for Purchase Order ${poToPay.poNumber}. Verification token dispatched.`,
        type: 'success',
        nodeHeader: nodeHeader380,
        nodeNumber: nextNodeNum
      });
    }
  };

  return (
    <div className="min-h-screen bg-black text-slate-100 font-sans antialiased selection:bg-cyan-500 selection:text-black relative overflow-x-hidden">
      {/* Year 21010 Quantum Scanline & Matrix Backdrop */}
      <div className="fixed inset-0 grid-matrix-21010 opacity-70 pointer-events-none z-0" />
      <div className="fixed inset-0 scanline-overlay z-40 pointer-events-none opacity-30" />

      {/* Toast Notification Container */}
      <ToastNotification toasts={toasts} onDismiss={dismissToast} />

      {/* Top Header with Domain Switcher */}
      <Header
        domainMode={domainMode}
        setDomainMode={handleDomainModeChange}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        ordersCount={orders.length}
        nodesCount={companyNodes.length}
        isMasterAdmin={isMasterAdmin}
        onOpenAuthModal={() => setMasterAuthModalOpen(true)}
        onLockAdmin={handleLockMaster}
      />

      {/* Domain Mode Context Indicator Banner */}
      <div className={`border-b py-2 px-4 text-xs font-mono transition-colors ${
        domainMode === 'com' 
          ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-200' 
          : 'bg-purple-950/40 border-purple-900/50 text-purple-300'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {domainMode === 'com' ? (
              <>
                <ShoppingBag className="w-3.5 h-3.5 text-emerald-400" />
                <span>
                  <strong className="text-white">YouAreFake.com (uarefake.com)</strong> — <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold border border-emerald-500/40">● LIVE IN PRODUCTION</span> Customer Storefront, 128 B2B Solutions, Instant PayPal Checkout & Key Auto-Provisioning
                </span>
              </>
            ) : (
              <>
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>
                  <strong className="text-white">uarefake.space</strong> — Admin & Sovereign Control Plane (88 Paradoxes, Daisy Forge, 380 Ledger, Sentinel Suite)
                </span>
              </>
            )}
          </div>

          <div className="hidden sm:flex items-center space-x-2">
            <span className="text-[11px] opacity-75">Status: Operational (Zero Latency)</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </div>
        </div>
      </div>

      {/* Main View Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        
        {/* ========================================================================= */}
        {/* USER FRONT STORE (.COM) TABS                                              */}
        {/* ========================================================================= */}

        {/* 105 Real Sovereign Lots Floor (Paradox Vault) */}
        {activeTab === 'paradox-vault' && (
          <SovereignLotVaultView
            onSelectSolutionForPurchase={handleOpenPaypalForSolution}
            onNavigateTab={(tab) => setActiveTab(tab as ActiveTabType)}
          />
        )}

        {activeTab === 'catalog' && (
          <SolutionCatalog
            solutions={solutions}
            searchQuery={searchQuery}
            onSelectSolutionForPurchase={handleOpenPaypalForSolution}
            onCustomItemAdded={(newItem) => setSolutions(prev => [newItem, ...prev])}
          />
        )}

        {activeTab === 'rfq' && (
          <RfqMarketplace
            onOrderCreated={handleProcurementOrderFinalized}
            onOpenPaypalForPo={handleOpenPaypalForPo}
          />
        )}

        {activeTab === 'marketplace-exchange' && (
          <MarketplaceView
            listings={marketplaceListings}
            bids={marketplaceBids}
            onPlaceBid={(b) => {
              setMarketplaceBids(prev => [b, ...prev]);
              addToast({
                title: 'Marketplace Bid Submitted',
                message: `Bid placed on ${b.listingId} for ${(b.totalOffer || b.offeredUnitPrice || 0).toLocaleString()}`,
                type: 'success'
              });
            }}
            onAddLog={handleAddEngineLog}
            onDeployTemplate={(template: BusinessTemplate) => {
              addToast({
                title: 'Template Activated',
                message: `${template.templateName} deployed to Solvex Autonomous Cluster`,
                type: 'success'
              });
            }}
          />
        )}

        {activeTab === 'procurement' && (
          <ProcurementDesk
            onOrderCreated={handleProcurementOrderFinalized}
            onOpenPaypalForPo={handleOpenPaypalForPo}
          />
        )}

        {activeTab === 'logistics' && (
          <LogisticsHub
            shipments={shipments}
          />
        )}

        {activeTab === 'orders' && (
          <OrderHistory
            orders={orders}
            onOpenPaypalForPo={handleOpenPaypalForPo}
          />
        )}

        {/* Freedom SIM AI OS (SwarmOS Sovereign) */}
        {activeTab === 'freedom-sim' && (
          <FreedomSimView />
        )}

        {/* ========================================================================= */}
        {/* ADMIN & SOVEREIGN CONTROL PLANE (.SPACE) TABS                             */}
        {/* ========================================================================= */}

        {activeTab === 'daisy' && (
          isMasterAdmin ? (
            <DaisyPipelineHub />
          ) : (
            <ProtectedControlView
              title="DAISY & Agate Core Autonomous Engine"
              moduleName="EVC Cost Engine, AI Optimizer, Hot-Swap & MMTAI 380-Byte Perimeter"
              description="Real-time EVC cost accounting, RL mutation graphs, zero-downtime hot-swap circuits, and 5-hop MMTAI security tests on uarefake.space require Sovereign Trustee authorization."
              onOpenAuth={() => setMasterAuthModalOpen(true)}
            />
          )
        )}

        {activeTab === 'brain' && (
          isMasterAdmin ? (
            <CognitiveBrainHub />
          ) : (
            <ProtectedControlView
              title="88 Solved Paradoxes & Cognitive Brain Hub"
              moduleName="Cognitive Axiom Engine & Sentinel Suite"
              description="Chamber proofs, mathematical axiom matrices, and Sentinel Pre-Flight verification on uarefake.space require Sovereign Trustee authorization."
              onOpenAuth={() => setMasterAuthModalOpen(true)}
            />
          )
        )}

        {activeTab === 'sovereign-brain' && (
          isMasterAdmin ? (
            <AgentBrainView
              brainState={brainState}
              onUpdateGoal={(goal) => {
                setBrainState(prev => ({
                  ...prev,
                  activeGoals: prev.activeGoals.map(g => g.id === goal.id ? goal : g)
                }));
              }}
              onAddLog={handleAddEngineLog}
            />
          ) : (
            <ProtectedControlView
              title="Daisy Haminja Sovereign Brain & Synaptic Mesh"
              moduleName="Recursive Reasoning Graph & Tether Axiom Synthesizer"
              description="Autonomous goal resolution, multi-tier dialectic inference, and Tether bubble networks require Sovereign Trustee clearance."
              onOpenAuth={() => setMasterAuthModalOpen(true)}
            />
          )
        )}

        {activeTab === 'paradox-box' && (
          isMasterAdmin ? (
            <ParadoxBoxView
              anomalies={paradoxAnomalies}
              onResolveParadox={(id) => {
                setParadoxAnomalies(prev => prev.map(a => a.id === id ? { ...a, status: 'RESOLVED' as any } : a));
                addToast({
                  title: 'Paradox Anomaly Resolved',
                  message: `Paradox ${id} reconciled via dual-track dialetheic proofs.`,
                  type: 'success'
                });
              }}
              onAddLog={handleAddEngineLog}
            />
          ) : (
            <ProtectedControlView
              title="Paradox Box 88 Anomaly Engine"
              moduleName="Dialetheic Rule Checker & 105 Mathematical Solvers"
              description="Live entropy collapse simulation, crystal glassbox auditing, and 105 mathematical solvers on uarefake.space require Trustee clearance."
              onOpenAuth={() => setMasterAuthModalOpen(true)}
            />
          )
        )}

        {activeTab === 'registry-engine' && (
          isMasterAdmin ? (
            <AIRegistryViewer />
          ) : (
            <ProtectedControlView
              title="Dialectic 88 Paradox Registry & Solver Engine"
              moduleName="54-Node Mesh Topology & Corpus Verification"
              description="Deterministic paradox registry and verified knowledge corpus require Sovereign Trustee authorization."
              onOpenAuth={() => setMasterAuthModalOpen(true)}
            />
          )
        )}

        {activeTab === 'mmtai-security' && (
          isMasterAdmin ? (
            <MmtaiSecurityView
              peers={mmtaiPeers}
              audits={mmtaiAudits}
              onAddLog={handleAddEngineLog}
            />
          ) : (
            <ProtectedControlView
              title="MMTAI Zero-Trust Security Perimeter"
              moduleName="380-Byte Cryptographic Shield & Handshake Suite"
              description="Continuous 5-hop mesh verification and zero-trust perimeter telemetry require Trustee authorization."
              onOpenAuth={() => setMasterAuthModalOpen(true)}
            />
          )
        )}

        {activeTab === 'jit-build' && (
          isMasterAdmin ? (
            <JitBuildView
              tasks={jitTasks}
              onAddJitTask={(task) => setJitTasks(prev => [task, ...prev])}
              onAddLog={handleAddEngineLog}
            />
          ) : (
            <ProtectedControlView
              title="JIT Post-Agentic Software Synthesizer"
              moduleName="AST Bytecode Synthesizer & Compiler"
              description="Real-time runtime bytecode compilation and sovereign node distribution require Trustee authorization."
              onOpenAuth={() => setMasterAuthModalOpen(true)}
            />
          )
        )}

        {activeTab === 'forge' && (
          isMasterAdmin ? (
            <AppForgeBuilder
              onDeployApp={handleForgeDeploy}
            />
          ) : (
            <ProtectedControlView
              title="Daisy AI App Forge Compiler"
              moduleName="Post-Agentic JIT Engine"
              description="JIT compilation, bytecode distribution, and automated Node assignments on uarefake.space are restricted to the Sovereign Trustee."
              onOpenAuth={() => setMasterAuthModalOpen(true)}
            />
          )
        )}

        {activeTab === 'blackbox' && (
          isMasterAdmin ? (
            <BlackBoxAudit
              nodes={companyNodes}
            />
          ) : (
            <ProtectedControlView
              title="380-Byte Cryptographic Consensus Audit"
              moduleName="Black Box Memory Ledger"
              description="Cryptographic hash integrity, intrusion verification, and tamperproof telemetry on uarefake.space require Trustee clearance."
              onOpenAuth={() => setMasterAuthModalOpen(true)}
            />
          )
        )}

        {activeTab === 'nodes' && (
          isMasterAdmin ? (
            <CompanyNodeTracker
              nodes={companyNodes}
              onAddNode={handleAddNode}
            />
          ) : (
            <ProtectedControlView
              title="380-Char Node Fleet Registry"
              moduleName="Hardware Node Registry (::NODE-01..03)"
              description="Live device node commands, 380-character cryptographic header rotation, and IP telemetry on uarefake.space are restricted to the Trustee."
              onOpenAuth={() => setMasterAuthModalOpen(true)}
            />
          )
        )}

        {activeTab === 'integrations' && (
          isMasterAdmin ? (
            <IntegrationsPanel
              integrations={integrations}
              onSyncTriggered={(id) => {
                fetch('/api/integrations')
                  .then(res => res.json())
                  .then(data => Array.isArray(data) && setIntegrations(data));
              }}
            />
          ) : (
            <ProtectedControlView
              title="ERP & Webhook Integrations"
              moduleName="Enterprise Adapters (SAP, Oracle, NetSuite)"
              description="Live SAP, Oracle, and NetSuite production API credentials on uarefake.space require Trustee authorization."
              onOpenAuth={() => setMasterAuthModalOpen(true)}
            />
          )
        )}
      </main>

      {/* PayPal Checkout Modal */}
      <PayPalCheckoutModal
        isOpen={paypalModalOpen}
        onClose={() => setPaypalModalOpen(false)}
        itemToPay={itemToPay}
        poToPay={poToPay}
        onPaymentSuccess={handlePaymentSuccess}
      />

      {/* User Authentication Modal (Registration, Login, Password Recovery) */}
      <UserAuthModal
        isOpen={authModalOpen}
        initialMode={authModalMode}
        onClose={closeAuthModal}
        onSuccessToast={(title, msg) => {
          addToast({
            title,
            message: msg,
            type: 'success'
          });
        }}
      />

      {/* Shopping Cart Drawer */}
      <CartDrawer
        onProceedToCheckout={() => {
          openCheckout();
        }}
      />

      {/* Multi-Item Shopping Cart Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={closeCheckout}
        onOrderPlaced={(newPo, receipt) => {
          setOrders(prev => [newPo, ...prev]);

          const nextNodeNum = `NODE-${String(companyNodes.length + 1).padStart(2, '0')}`;
          const nodeHeader380 = generate380CharHeader(nextNodeNum);

          const multiNode: CompanyNode = {
            id: `node-chk-${Date.now()}`,
            nodeNumber: nextNodeNum,
            companyName: newPo.vendorName || 'uarefake.com Enterprise Core',
            companyMainHeader: nodeHeader380,
            deviceName: `${newPo.title} Station`,
            location: receipt.deployment?.cloudProvider || 'uarefake.com Cloud Mesh Gateway',
            assignedSoftware: newPo.title,
            poId: newPo.id,
            status: 'Active',
            lastPing: 'Just now',
            ipAddress: `10.240.0.${40 + companyNodes.length}`
          };

          setCompanyNodes(prev => [...prev, multiNode]);

          addToast({
            title: `Order ${receipt.poNumber} Placed Successfully!`,
            message: `Paid $${receipt.summary.total.toFixed(2)} USD via ${receipt.payment.method.toUpperCase()}. Merkle Root sealed.`,
            type: 'success',
            nodeHeader: nodeHeader380,
            nodeNumber: nextNodeNum
          });

          // Switch to orders view
          setActiveTab('orders');
        }}
      />

      {/* Sovereign Master Trustee Auth Modal */}
      <SovereignAuthModal
        isOpen={masterAuthModalOpen}
        onClose={() => setMasterAuthModalOpen(false)}
        onAuthenticate={handleAuthenticateMaster}
        isAuthenticated={isMasterAdmin}
        onLock={handleLockMaster}
      />

      {/* Footer */}
      <footer className="border-t border-slate-800/80 mt-16 py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-300">Solvex Autonomous B2B Network</span>
            <span>• Cross-Platform Storefront (<span className="text-blue-400 font-mono">uarefake.com</span>) & Admin Control (<span className="text-purple-400 font-mono">uarefake.space</span>)</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>Powered by PayPal B2B Settlement</span>
            <span>•</span>
            <span className="text-indigo-300 font-medium font-mono">dAIsy haMINJA Sentinel Intelligence Protocol</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App({ forcedDomainMode }: { forcedDomainMode?: DomainMode } = {}) {
  return (
    <AuthProvider>
      <CartProvider>
        <StorefrontApp forcedDomainMode={forcedDomainMode} />
      </CartProvider>
    </AuthProvider>
  );
}
