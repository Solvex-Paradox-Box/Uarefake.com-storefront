import React, { useState } from 'react';
import { FileText, CheckCircle2, Clock, Truck, ShieldCheck, ArrowRight, DollarSign, ExternalLink, ChevronDown, ChevronUp, Download, Code, Terminal, Copy, Check, X, Sparkles, Cpu } from 'lucide-react';
import { PurchaseOrder } from '../types';
import { downloadJitSoftwareFile, compileJitSoftwarePackage, JitSoftwareArtifact } from '../utils/jitCompiler';

interface OrderHistoryProps {
  orders: PurchaseOrder[];
  onOpenPaypalForPo: (po: PurchaseOrder) => void;
}

export const OrderHistory: React.FC<OrderHistoryProps> = ({ orders, onOpenPaypalForPo }) => {
  const [expandedPoId, setExpandedPoId] = useState<string | null>(orders[0]?.id || null);
  const [selectedJitModalPo, setSelectedJitModalPo] = useState<PurchaseOrder | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeCodeTab, setActiveCodeTab] = useState<'docker' | 'code' | 'manifest'>('docker');

  const toggleExpand = (id: string) => {
    setExpandedPoId(prev => (prev === id ? null : id));
  };

  const handleCopy = (text: string, keyId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(keyId);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const getEffectiveArtifact = (po: PurchaseOrder): JitSoftwareArtifact => {
    if (po.jitArtifact) return po.jitArtifact;
    // Compile dynamically if not present
    return compileJitSoftwarePackage(
      {
        id: po.id,
        itemType: 'Paradox Solution',
        title: po.title,
        category: 'Autonomous Operations',
        description: po.itemDescription,
        fullDescription: po.itemDescription,
        price: po.totalAmount,
        pricingModel: 'One-time',
        rating: 5.0,
        reviewsCount: 100,
        vendor: po.supplierName || 'Todd Jeffrey Ites Jr.',
        integrationPlatforms: ['uarefake.com', 'uarefake.space'],
        features: ['JIT Bytecode Compilation', '380-Character Invariant Header'],
        iconName: 'Cpu',
        specs: { "Compiler": "Solvex JIT 2.4", "Security": "eBPF Verified" }
      },
      'NODE-01',
      po.paypalPayerEmail || 'customer@uarefake.com'
    );
  };

  const getStatusBadge = (status: PurchaseOrder['status']) => {
    switch (status) {
      case 'Completed':
        return <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs px-2.5 py-0.5 rounded-full font-medium">Completed</span>;
      case 'In Transit':
        return <span className="bg-sky-950 text-sky-300 border border-sky-800 text-xs px-2.5 py-0.5 rounded-full font-medium">In Transit</span>;
      case 'Paid & Processing':
        return <span className="bg-indigo-950 text-indigo-300 border border-indigo-800 text-xs px-2.5 py-0.5 rounded-full font-medium">Paid & Processing</span>;
      case 'Payment Pending':
        return <span className="bg-amber-950 text-amber-300 border border-amber-800 text-xs px-2.5 py-0.5 rounded-full font-medium">Payment Pending</span>;
      default:
        return <span className="bg-slate-800 text-slate-300 text-xs px-2.5 py-0.5 rounded-full font-medium">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-extrabold text-white">Purchase Orders Ledger</h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Audit logs, PayPal payment receipts, 380-character header assignments, and downloadable custom JIT software packages.
            </p>
          </div>
          <div className="text-xs font-mono text-slate-400 bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-xl">
            TOTAL ORDERS: {orders.length}
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center space-y-3">
            <FileText className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="text-lg font-bold text-white">No Purchase Orders Found</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              There are currently no active or historical purchase orders. Corporate procurement orders generated via live RFQ bidding or PayPal B2B Checkout will appear here automatically.
            </p>
          </div>
        ) : (
          orders.map((po) => {
          const isExpanded = expandedPoId === po.id;
          const artifact = getEffectiveArtifact(po);

          return (
            <div
              key={po.id}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-3xl overflow-hidden transition-all shadow-lg"
            >
              {/* Order Row Header */}
              <div
                onClick={() => toggleExpand(po.id)}
                className="p-5 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/90"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-3">
                    <span className="font-mono font-bold text-indigo-400 text-sm">{po.poNumber}</span>
                    {getStatusBadge(po.status)}
                    {po.jitArtifact && (
                      <span className="bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px] px-2 py-0.5 rounded-full font-mono font-bold flex items-center space-x-1">
                        <Cpu className="w-3 h-3 text-cyan-400" />
                        <span>JIT Software Ready</span>
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-white text-base">{po.title}</h3>
                  <p className="text-xs text-slate-400">
                    Supplier: <span className="text-slate-200 font-medium">{po.supplierName || 'Global Supplier Network'}</span>
                  </p>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4">
                  <div className="text-right">
                    <div className="text-xl font-extrabold text-white">
                      {po.totalAmount === 0 ? (
                        <span className="text-emerald-400 font-mono">FREE ($0.00)</span>
                      ) : (
                        `$${po.totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`
                      )}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      {po.quantity} Units @ ${po.unitPrice}/unit
                    </div>
                  </div>

                  <div className="text-slate-400">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>
              </div>

              {/* Expandable Order Details & Logs */}
              {isExpanded && (
                <div className="bg-slate-950 p-6 border-t border-slate-800/80 space-y-6 text-xs text-slate-300">
                  {/* Summary Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800">
                    <div>
                      <span className="text-slate-500 block">Shipping Terminal</span>
                      <span className="font-semibold text-slate-200">{po.shippingAddress}</span>
                    </div>

                    <div>
                      <span className="text-slate-500 block">Assigned Delivery Carrier</span>
                      <span className="font-semibold text-slate-200">{po.carrier || 'Solvex JIT Provisioning'}</span>
                      {po.trackingNumber && (
                        <div className="font-mono text-cyan-400 text-[11px] mt-0.5">{po.trackingNumber}</div>
                      )}
                    </div>

                    <div>
                      <span className="text-slate-500 block">PayPal Settlement</span>
                      {po.paypalPaymentStatus === 'COMPLETED' ? (
                        <div className="space-y-0.5 mt-0.5">
                          <span className="text-emerald-400 font-bold flex items-center space-x-1">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>VERIFIED ({po.paypalOrderId || 'FREE_PROVISION'})</span>
                          </span>
                          <div className="text-[10px] text-slate-400">{po.paypalPayerEmail}</div>
                        </div>
                      ) : (
                        <div className="mt-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenPaypalForPo(po);
                            }}
                            className="bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold px-3 py-1.5 rounded-lg text-xs flex items-center space-x-1 transition-all"
                          >
                            <span>PayPal Settle Now</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Customer Custom JIT Software Delivery Box */}
                  <div className="bg-gradient-to-r from-slate-900 to-cyan-950/30 p-5 rounded-2xl border border-cyan-500/40 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                      <div className="flex items-center space-x-2.5">
                        <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/40">
                          <Cpu className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-white text-sm">Custom JIT Software Package</span>
                            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] px-2 py-0.5 rounded-md font-mono font-bold">
                              Ready for Deployment
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400">
                            Deterministic container bytecode compiled and cryptographically bound to your fleet.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => downloadJitSoftwareFile(artifact)}
                          className="bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold px-3 py-1.5 rounded-xl text-xs flex items-center space-x-1.5 shadow-md shadow-emerald-500/20 transition-all active:scale-95"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Download .JSON Bundle</span>
                        </button>
                        <button
                          onClick={() => setSelectedJitModalPo(po)}
                          className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-3 py-1.5 rounded-xl text-xs flex items-center space-x-1.5 transition-all active:scale-95"
                        >
                          <Code className="w-3.5 h-3.5" />
                          <span>Inspect Code & Docker</span>
                        </button>
                      </div>
                    </div>

                    {/* Quick Docker Run Command */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                        <span>Instant Docker Launch Command:</span>
                        <button
                          onClick={() => handleCopy(artifact.dockerRunCommand, `cmd-${po.id}`)}
                          className="text-cyan-400 hover:text-cyan-300 flex items-center space-x-1"
                        >
                          {copiedKey === `cmd-${po.id}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedKey === `cmd-${po.id}` ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                      <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-[11px] font-mono text-emerald-400 break-all select-all">
                        {artifact.dockerRunCommand}
                      </div>
                    </div>
                  </div>

                  {/* 380-Character Header & Node Assignment Info */}
                  <div className="bg-slate-900/90 p-4 rounded-2xl border border-indigo-900/40 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        <span className="font-bold text-white text-[11px] uppercase tracking-wider">
                          Company 380-Character Master Header & Assigned Node
                        </span>
                      </div>
                      <span className="text-[10px] font-mono font-bold bg-indigo-950 text-indigo-300 border border-indigo-800 px-2 py-0.5 rounded">
                        {artifact.nodeNumber} / 380 CHARS
                      </span>
                    </div>
                    <p className="font-mono text-[10.5px] text-slate-300 bg-slate-950 p-2.5 rounded-lg border border-slate-800 select-all break-all leading-relaxed">
                      {artifact.header380}
                    </p>
                  </div>

                  {/* Order Audit Event Log */}
                  <div className="space-y-2">
                    <h4 className="font-bold text-slate-400 uppercase tracking-wider text-[11px]">
                      Automated Cross-Platform Audit Trail
                    </h4>

                    <div className="space-y-1.5 font-mono">
                      {po.logs.map((log, i) => (
                        <div
                          key={i}
                          className="flex items-start space-x-2 bg-slate-900/60 p-2 rounded-lg border border-slate-800/60 text-[11px]"
                        >
                          <span className="text-slate-500 shrink-0">[{log.timestamp}]</span>
                          <span className={log.type === 'success' ? 'text-emerald-400' : log.type === 'warning' ? 'text-amber-400' : 'text-slate-300'}>
                            {log.message}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        }))}
      </div>

      {/* JIT Software Inspection Modal */}
      {selectedJitModalPo && (() => {
        const artifact = getEffectiveArtifact(selectedJitModalPo);
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in overflow-y-auto">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl text-slate-100 relative my-8">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 bg-slate-800/80 border-b border-slate-700/80">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/40">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">Custom JIT Software Delivery Center</h3>
                    <p className="text-xs text-slate-400">{artifact.solutionTitle} • PO: {selectedJitModalPo.poNumber}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedJitModalPo(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/60 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-mono block">Digital License Key</span>
                    <span className="font-mono text-sm text-emerald-400 font-bold">{artifact.licenseKey}</span>
                  </div>
                  <button
                    onClick={() => downloadJitSoftwareFile(artifact)}
                    className="bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold px-4 py-2 rounded-xl text-xs flex items-center space-x-2 shadow-lg shadow-emerald-500/20 transition-all active:scale-95 shrink-0"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Software (.json)</span>
                  </button>
                </div>

                {/* Tabs */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 border-b border-slate-800 pb-2 text-xs">
                    <button
                      onClick={() => setActiveCodeTab('docker')}
                      className={`px-3 py-1.5 rounded-xl font-mono text-xs transition-all ${
                        activeCodeTab === 'docker' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Docker Container
                    </button>
                    <button
                      onClick={() => setActiveCodeTab('code')}
                      className={`px-3 py-1.5 rounded-xl font-mono text-xs transition-all ${
                        activeCodeTab === 'code' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Runnable Source Code ({artifact.runtime})
                    </button>
                    <button
                      onClick={() => setActiveCodeTab('manifest')}
                      className={`px-3 py-1.5 rounded-xl font-mono text-xs transition-all ${
                        activeCodeTab === 'manifest' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Manifest JSON
                    </button>
                  </div>

                  {activeCodeTab === 'docker' && (
                    <div className="space-y-3">
                      <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-xs font-mono text-emerald-400 flex items-start justify-between">
                        <span className="break-all pr-2">{artifact.dockerRunCommand}</span>
                        <button onClick={() => handleCopy(artifact.dockerRunCommand, 'modal-docker')} className="text-slate-400 hover:text-white p-1 shrink-0">
                          {copiedKey === 'modal-docker' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                      <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-1">
                        <span className="text-[10px] text-slate-500 uppercase font-mono block">eBPF Security Verification</span>
                        <p className="text-emerald-400 font-mono text-xs">✓ Sandbox Memory Invariance: PASSED (Zero illegal memory mutations)</p>
                        <p className="text-slate-400 text-xs">Runtime Endpoint: <span className="text-cyan-400 font-mono">{artifact.apiEndpointUrl}</span></p>
                      </div>
                    </div>
                  )}

                  {activeCodeTab === 'code' && (
                    <pre className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs font-mono text-slate-300 overflow-x-auto max-h-60 leading-relaxed">
                      {artifact.entrypointCode}
                    </pre>
                  )}

                  {activeCodeTab === 'manifest' && (
                    <pre className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs font-mono text-cyan-300 overflow-x-auto max-h-60 leading-relaxed">
                      {artifact.manifestJson}
                    </pre>
                  )}
                </div>

                {/* 380 Header */}
                <div className="bg-slate-950 p-3 rounded-2xl border border-indigo-900/40 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-mono uppercase font-bold text-[10px]">380-Character Cryptographic Header</span>
                    <button onClick={() => handleCopy(artifact.header380, 'modal-header')} className="text-cyan-400 hover:text-cyan-300 flex items-center space-x-1 font-mono text-xs">
                      {copiedKey === 'modal-header' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedKey === 'modal-header' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <div className="font-mono text-[10px] text-slate-300 bg-slate-900 p-2 rounded-lg border border-slate-800 break-all select-all">
                    {artifact.header380}
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => setSelectedJitModalPo(null)}
                    className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition-all"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};

