import React, { useState } from 'react';
import { Cpu, Send, RefreshCw, CheckCircle2, Shield, DollarSign, Truck, AlertTriangle, ArrowRight, Sparkles, FileCheck, AlertCircle } from 'lucide-react';
import { ProcurementAiResponse, SupplierBid, PurchaseOrder } from '../types';

interface ProcurementDeskProps {
  onOrderCreated: (newPo: PurchaseOrder) => void;
  onOpenPaypalForPo: (po: PurchaseOrder) => void;
}

export const ProcurementDesk: React.FC<ProcurementDeskProps> = ({
  onOrderCreated,
  onOpenPaypalForPo
}) => {
  const [promptInput, setPromptInput] = useState('');
  const [targetBudget, setTargetBudget] = useState<number | ''>('');
  const [urgency, setUrgency] = useState<'Low' | 'Medium' | 'High' | 'Critical'>('Medium');
  const [destinationPort, setDestinationPort] = useState('uarefake.space Private Enclave Cluster');
  
  const [loadingAi, setLoadingAi] = useState(false);
  const [aiResult, setAiResult] = useState<ProcurementAiResponse | null>(null);
  const [selectedSupplier, setSelectedSupplier] = useState<SupplierBid | null>(null);
  const [createdPo, setCreatedPo] = useState<PurchaseOrder | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);
  const [poError, setPoError] = useState<string | null>(null);

  const samplePrompts = [
    'Procure 50 bdc-project-api-server sovereign microservice nodes with Neon DB vector synchronization for enterprise deployment.',
    'Order 20 solvex-crystal-clear-black-box JIT software packaging container licenses with 380-char deterministic header verification.',
    'Deploy 100 solvex-paradox-matrix-88 cognitive chamber computational kernels with instant PayPal escrow authorization.'
  ];

  const handleRunAiProcurement = async (customPrompt?: string) => {
    const activePrompt = customPrompt || promptInput;
    if (!activePrompt.trim()) {
      setAiError('Please enter a procurement or AI augmentation prompt before submitting.');
      return;
    }

    setLoadingAi(true);
    setAiResult(null);
    setCreatedPo(null);
    setSelectedSupplier(null);
    setAiError(null);
    setPoError(null);

    try {
      const res = await fetch('/api/daisy/procure', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: activePrompt,
          targetBudget: targetBudget ? Number(targetBudget) : undefined,
          urgency,
          destination: destinationPort
        })
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const errorMsg = data.error || data.details || `Server returned HTTP ${res.status}: Method or Request failed.`;
        throw new Error(errorMsg);
      }

      setAiResult(data);
      if (data.recommendedSuppliers && data.recommendedSuppliers.length > 0) {
        setSelectedSupplier(data.recommendedSuppliers[0]);
      }
    } catch (err: any) {
      console.error('Procurement error:', err);
      setAiError(err.message || 'Network error: Failed to connect to /api/daisy/procure or /api/ai/augmentation endpoint.');
    } finally {
      setLoadingAi(false);
    }
  };

  const handleCreatePurchaseOrder = async () => {
    if (!aiResult || !selectedSupplier) return;
    setPoError(null);

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: aiResult.poTitle,
          itemDescription: aiResult.itemDescription,
          quantity: aiResult.estimatedQuantity,
          unitPrice: selectedSupplier.unitPrice,
          supplierName: selectedSupplier.supplierName,
          shippingAddress: `${destinationPort} Terminal Gate 3`,
          destinationPort,
          carrier: selectedSupplier.shippingCarrier
        })
      });

      const newPo = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(newPo.error || `Server returned HTTP ${res.status}: Failed to create purchase order.`);
      }

      setCreatedPo(newPo);
      onOrderCreated(newPo);
    } catch (err: any) {
      console.error('Create PO Error:', err);
      setPoError(err.message || 'Failed to submit purchase order to /api/orders endpoint.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-xl">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 relative z-10">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center space-x-2 bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>Daisy Haminja Post-Agentic Autonomous Intelligence • bdc-project-api-server</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white">
              Autonomous B2B Procurement Desk
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              State your operational material requirements in plain language. The proprietary <span className="text-purple-300 font-semibold">Daisy Haminja Post-Agentic Autonomous Intelligence</span> (operating via your self-hosted <span className="text-amber-300 font-mono">bdc-project-api-server</span> backend & Neon DB agent memory synchronization) parses technical specs, evaluates suppliers across the 88-Paradox Matrix, ranks bids, and prepares PayPal purchase orders automatically.
            </p>
          </div>

          <div className="bg-slate-950/90 border border-purple-500/40 rounded-xl p-3 text-[11px] font-mono space-y-1 shrink-0 text-slate-300">
            <div className="flex items-center space-x-1.5 text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Sovereign Brain Stack: ACTIVE</span>
            </div>
            <div>Core Engine: <span className="text-purple-300 font-semibold">Daisy Haminja (bdc)</span></div>
            <div>Third-Party APIs: <span className="text-emerald-400 font-bold">NONE (100% Sovereign)</span></div>
            <div>Agent Memory: <span className="text-cyan-300">Neon DB & Vector Sync</span></div>
          </div>
        </div>
      </div>

      {/* Input Prompt Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
          Natural Language Procurement Prompt
        </label>
        
        <div className="relative">
          <textarea
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
            rows={3}
            placeholder="Describe what digital software components, microservices, or licenses you need (e.g., 'Procure 50 bdc-project-api-server sovereign microservices with 380-char verified headers and Neon DB state sync')..."
            className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
          />
        </div>

        {/* Quick Sample Prompts */}
        <div className="flex items-center space-x-2 text-xs overflow-x-auto pb-1 scrollbar-none">
          <span className="text-slate-400 font-semibold shrink-0">Try Sample:</span>
          {samplePrompts.map((sample, idx) => (
            <button
              key={idx}
              onClick={() => {
                setPromptInput(sample);
                handleRunAiProcurement(sample);
              }}
              className="bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/60 rounded-lg px-2.5 py-1 text-[11px] truncate max-w-xs transition-all shrink-0"
            >
              {sample}
            </button>
          ))}
        </div>

        {/* Error Alert for AI Procurement / Augmentation */}
        {aiError && (
          <div className="bg-rose-950/80 border border-rose-500/60 rounded-xl p-4 flex items-start space-x-3 text-rose-200 text-xs animate-fade-in">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-rose-300">Procurement / Augmentation Request Error:</span>
              <p className="leading-relaxed">{aiError}</p>
            </div>
          </div>
        )}

        {/* Procurement Parameters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div>
            <label className="block text-[11px] font-medium text-slate-400 mb-1">Target Budget (USD)</label>
            <input
              type="number"
              value={targetBudget}
              onChange={(e) => setTargetBudget(e.target.value ? Number(e.target.value) : '')}
              placeholder="e.g. 5000"
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-400 mb-1">Target Enclave / Domain</label>
            <input
              type="text"
              value={destinationPort}
              onChange={(e) => setDestinationPort(e.target.value)}
              placeholder="uarefake.space Enclave"
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-400 mb-1">Fulfillment Priority</label>
            <select
              value={urgency}
              onChange={(e: any) => setUrgency(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
            >
              <option value="Low">Standard Digital Delivery</option>
              <option value="Medium">Balanced JIT Stream</option>
              <option value="High">Priority JIT Container Stream</option>
              <option value="Critical">Immediate Hot-Swap Enclave Cluster</option>
            </select>
          </div>
        </div>

        {/* Trigger Button */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={() => handleRunAiProcurement()}
            disabled={loadingAi || !promptInput.trim()}
            className="bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 disabled:opacity-50 text-white font-bold px-6 py-2.5 rounded-xl text-xs sm:text-sm shadow-lg shadow-cyan-500/20 transition-all flex items-center space-x-2"
          >
            {loadingAi ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
                <span>dAIsy haMINJA AI Evaluating Suppliers & Bids...</span>
              </>
            ) : (
              <>
                <Cpu className="w-4 h-4" />
                <span>Execute Autonomous RFQ & Bid Match</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* AI Procurement Results */}
      {aiResult && (
        <div className="space-y-6 animate-fade-in">
          {/* Summary Box */}
          <div className="bg-slate-900 border border-indigo-900/60 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <FileCheck className="w-5 h-5 text-indigo-400" />
                <h3 className="text-lg font-bold text-white">{aiResult.poTitle}</h3>
              </div>
              <span className="text-xs bg-indigo-950 text-indigo-300 border border-indigo-800/80 px-2.5 py-1 rounded-full font-mono">
                QTY: {aiResult.estimatedQuantity} UNITS
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">{aiResult.summary}</p>

            {/* Advice Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs space-y-1">
                <div className="flex items-center space-x-1.5 text-emerald-400 font-semibold">
                  <Truck className="w-4 h-4" />
                  <span>Logistics Strategy</span>
                </div>
                <p className="text-slate-300 text-[11px]">{aiResult.logisticsAdvice}</p>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs space-y-1">
                <div className="flex items-center space-x-1.5 text-amber-400 font-semibold">
                  <Shield className="w-4 h-4" />
                  <span>AI Risk & Compliance Rating</span>
                </div>
                <p className="text-slate-300 text-[11px]">{aiResult.riskAssessment}</p>
              </div>
            </div>
          </div>

          {/* Bids Matrix */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Autonomous Supplier Bids Matrix
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {aiResult.recommendedSuppliers.map((sup) => {
                const isSelected = selectedSupplier?.id === sup.id;
                return (
                  <div
                    key={sup.id}
                    onClick={() => setSelectedSupplier(sup)}
                    className={`border rounded-xl p-4 cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-indigo-950/60 border-indigo-500 shadow-lg shadow-indigo-950/40'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-slate-100 text-sm">{sup.supplierName}</h4>
                      <span className="text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded-md">
                        AI Score: {sup.aiRecommendationScore}/100
                      </span>
                    </div>

                    <div className="text-xl font-extrabold text-white mb-2">
                      ${sup.totalPrice.toLocaleString('en-US')}{' '}
                      <span className="text-xs font-normal text-slate-400">
                        ($${sup.unitPrice}/unit)
                      </span>
                    </div>

                    <div className="space-y-1 text-xs text-slate-300 mb-3">
                      <div>Carrier: <span className="text-slate-100 font-medium">{sup.shippingCarrier}</span></div>
                      <div>Estimated Lead Time: <span className="text-slate-100 font-medium">{sup.estimatedDays} Days</span></div>
                      <div>Compliance Score: <span className="text-slate-100 font-medium">{sup.complianceScore}%</span></div>
                    </div>

                    <p className="text-[11px] text-slate-400 italic border-t border-slate-800 pt-2">
                      "{sup.notes}"
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Action Bar */}
            {poError && (
              <div className="bg-rose-950/80 border border-rose-500/60 rounded-xl p-3.5 flex items-start space-x-2.5 text-rose-200 text-xs">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="font-bold text-rose-300">Purchase Order Generation Error:</span>
                  <p>{poError}</p>
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <div>
                {selectedSupplier && (
                  <div className="text-xs text-slate-300">
                    Selected: <span className="font-bold text-white">{selectedSupplier.supplierName}</span> (${selectedSupplier.totalPrice.toLocaleString()} USD)
                  </div>
                )}
              </div>

              {!createdPo ? (
                <button
                  onClick={handleCreatePurchaseOrder}
                  disabled={!selectedSupplier}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center space-x-2"
                >
                  <span>Generate Purchase Order (PO)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1.5 text-emerald-400 text-xs font-semibold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>PO {createdPo.poNumber} Drafted</span>
                  </div>
                  <button
                    onClick={() => onOpenPaypalForPo(createdPo)}
                    className="bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-lg shadow-sky-500/20 transition-all flex items-center space-x-1.5"
                  >
                    <span>Settle with PayPal Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
