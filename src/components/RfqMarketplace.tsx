import React, { useState } from 'react';
import { ShoppingBag, FileCheck, Send, CheckCircle2, DollarSign, ShieldCheck, Zap, Plus, ArrowRight, UserCheck } from 'lucide-react';
import { RfqItem, SupplierBid, PurchaseOrder } from '../types';
import { generate380CharHeader } from '../utils/nodeHeader';

interface RfqMarketplaceProps {
  onOrderCreated: (po: PurchaseOrder) => void;
  onOpenPaypalForPo: (po: PurchaseOrder) => void;
}

const INITIAL_RFQS: RfqItem[] = [
  {
    id: 'rfq-2001',
    rfqNumber: 'RFQ-SOLVEX-2001',
    title: 'Custom JIT ERP Integration for 5 Company Device Nodes',
    category: 'ERP Connector',
    description: 'Requires bi-directional synchronization between NetSuite ERP and 5 deployed edge nodes with 380-character header verification.',
    requiredNodeSpecs: 'Min 16GB RAM, 1Gbps link, NODE-01 through NODE-05 support',
    targetBudget: 15000,
    bidsCount: 2,
    status: 'Bids Received',
    createdAt: '2026-08-10',
    bids: [
      {
        id: 'bid-1',
        supplierName: 'Solvex Global Systems Ltd',
        rating: 4.9,
        unitPrice: 2800,
        totalPrice: 14000,
        estimatedDays: 1,
        shippingCarrier: 'Instant JIT Digital Dispatch',
        complianceScore: 100,
        aiRecommendationScore: 98,
        notes: 'Includes full 380-character company master header integration and Black Box audit compliance.'
      },
      {
        id: 'bid-2',
        supplierName: 'Apex Enterprise Software Group',
        rating: 4.7,
        unitPrice: 2950,
        totalPrice: 14750,
        estimatedDays: 2,
        shippingCarrier: 'Cloud Deployment Pipeline',
        complianceScore: 95,
        aiRecommendationScore: 91,
        notes: 'Standard NetSuite connector with node tracking support.'
      }
    ]
  }
];

export const RfqMarketplace: React.FC<RfqMarketplaceProps> = ({ onOrderCreated, onOpenPaypalForPo }) => {
  const [rfqs, setRfqs] = useState<RfqItem[]>(INITIAL_RFQS);
  const [showNewRfqModal, setShowNewRfqModal] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('ERP Connector');
  const [description, setDescription] = useState('');
  const [targetBudget, setTargetBudget] = useState('12000');

  const handleCreateRfq = (e: React.FormEvent) => {
    e.preventDefault();
    const newRfq: RfqItem = {
      id: `rfq-${Date.now()}`,
      rfqNumber: `RFQ-SOLVEX-${Math.floor(1000 + Math.random() * 9000)}`,
      title,
      category,
      description,
      requiredNodeSpecs: 'Standard Solvex 380-Character Header Node Fleet',
      targetBudget: parseFloat(targetBudget) || 10000,
      bidsCount: 1,
      status: 'Bids Received',
      createdAt: new Date().toISOString().substring(0, 10),
      bids: [
        {
          id: `bid-auto-${Date.now()}`,
          supplierName: 'uarefake.com Enterprise Systems',
          rating: 5.0,
          unitPrice: (parseFloat(targetBudget) || 10000) * 0.9,
          totalPrice: (parseFloat(targetBudget) || 10000) * 0.9,
          estimatedDays: 1,
          shippingCarrier: 'Solvex JIT Stream',
          complianceScore: 100,
          aiRecommendationScore: 99,
          notes: 'Auto-bid with guaranteed 380-character header verification and PayPal immediate settlement.'
        }
      ]
    };

    setRfqs(prev => [newRfq, ...prev]);
    setShowNewRfqModal(false);
    setTitle('');
    setDescription('');
  };

  const handleAcceptBid = (rfq: RfqItem, bid: SupplierBid) => {
    const poNumber = `PO-SOLVEX-${Math.floor(10000 + Math.random() * 90000)}`;
    const newPo: PurchaseOrder = {
      id: `po-rfq-${Date.now()}`,
      poNumber,
      title: `${rfq.title} (Awarded to ${bid.supplierName})`,
      itemDescription: rfq.description,
      quantity: 1,
      unitPrice: bid.totalPrice,
      totalAmount: bid.totalPrice,
      currency: 'USD',
      status: 'Payment Pending',
      supplierName: bid.supplierName,
      shippingAddress: 'uarefake.com Main Headquarters Terminal',
      destinationPort: 'US-East Node Cluster',
      createdAt: new Date().toISOString().substring(0, 10),
      paypalPaymentStatus: 'PENDING',
      logs: [
        { timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16), message: `RFQ ${rfq.rfqNumber} awarded to ${bid.supplierName}. PO created.`, type: 'info' }
      ]
    };

    onOrderCreated(newPo);
    onOpenPaypalForPo(newPo);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* RFQ Marketplace Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold px-3 py-1 rounded-full">
              <ShoppingBag className="w-4 h-4 text-amber-400" />
              <span>Marketplace-P B2B Vendor RFQ Engine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              B2B Enterprise RFQ & Quotation Negotiation Desk
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Issue Request for Quotations (RFQs) to verified enterprise suppliers. Negotiate unit pricing, accept competitive supplier bids, and convert finalized quotes directly into Purchase Orders with integrated PayPal settlement and node header assignment.
            </p>
          </div>

          <button
            onClick={() => setShowNewRfqModal(true)}
            className="bg-amber-600 hover:bg-amber-500 text-white font-bold px-5 py-3 rounded-xl shadow-xl shadow-amber-600/20 flex items-center space-x-2 shrink-0 transition-all cursor-pointer text-xs sm:text-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Create New B2B RFQ</span>
          </button>
        </div>
      </div>

      {/* RFQ Cards Grid */}
      <div className="space-y-6">
        {rfqs.map((rfq) => (
          <div key={rfq.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 gap-2">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-xs font-bold text-amber-400 bg-amber-950 px-2.5 py-0.5 rounded border border-amber-800">
                    {rfq.rfqNumber}
                  </span>
                  <span className="text-xs uppercase font-bold text-slate-400">{rfq.category}</span>
                </div>
                <h3 className="text-lg font-bold text-white mt-1">{rfq.title}</h3>
                <p className="text-xs text-slate-300 mt-1">{rfq.description}</p>
              </div>

              <div className="text-right shrink-0">
                <div className="text-xs text-slate-400">Target Budget</div>
                <div className="text-xl font-black text-emerald-400 font-mono">${rfq.targetBudget.toLocaleString()} USD</div>
              </div>
            </div>

            {/* Bids Received */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-2">
                <UserCheck className="w-4 h-4 text-emerald-400" />
                <span>Supplier Quotations Received ({rfq.bids.length})</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {rfq.bids.map((bid) => (
                  <div key={bid.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-sm">{bid.supplierName}</span>
                        <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                          {bid.complianceScore}% Match
                        </span>
                      </div>

                      <div className="text-xs text-slate-300 bg-slate-900 p-2.5 rounded-lg border border-slate-800/80">
                        {bid.notes}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] text-slate-400">Quoted Total</div>
                        <div className="text-base font-bold text-white font-mono">${bid.totalPrice.toLocaleString()} USD</div>
                      </div>

                      <button
                        onClick={() => handleAcceptBid(rfq, bid)}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-lg shadow-emerald-600/20 flex items-center space-x-1.5 transition-all cursor-pointer"
                      >
                        <FileCheck className="w-4 h-4" />
                        <span>Accept Quote & Checkout</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* New RFQ Modal */}
      {showNewRfqModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 text-slate-100 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-lg text-white">Create B2B Software Request for Quote (RFQ)</h3>
              <button onClick={() => setShowNewRfqModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreateRfq} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Software Title / Solution Scope *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Enterprise Global Customs Automation Node Suite"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Target Budget (USD) *</label>
                <input
                  type="number"
                  required
                  value={targetBudget}
                  onChange={(e) => setTargetBudget(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Detailed Requirements</label>
                <textarea
                  rows={3}
                  placeholder="Describe required integrations, node counts, and compliance mandates..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewRfqModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-amber-600 hover:bg-amber-500 text-white px-5 py-2 rounded-xl text-xs font-semibold shadow-lg shadow-amber-600/30"
                >
                  Publish RFQ to B2B Marketplace
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
