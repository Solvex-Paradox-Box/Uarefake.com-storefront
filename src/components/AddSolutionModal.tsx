import React, { useState } from 'react';
import { X, Plus, Sparkles, DollarSign, Building2, Tag, AlertCircle, RefreshCw } from 'lucide-react';
import { SolutionItem } from '../types';

interface AddSolutionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onItemAdded: (item: SolutionItem) => void;
}

export const AddSolutionModal: React.FC<AddSolutionModalProps> = ({
  isOpen,
  onClose,
  onItemAdded
}) => {
  const [itemType, setItemType] = useState<'Paradox Solution' | 'Autonomous Business Template'>('Paradox Solution');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<SolutionItem['category']>('Procurement AI');
  const [vendor, setVendor] = useState('');
  const [price, setPrice] = useState('850');
  const [pricingModel, setPricingModel] = useState<SolutionItem['pricingModel']>('Monthly Subscription');
  const [description, setDescription] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const [paradoxResolution, setParadoxResolution] = useState('');
  const [featuresStr, setFeaturesStr] = useState('Instant PayPal Settlement, AI Dynamic Pricing, Webhook EDI Sync');
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !price) {
      setErrorMessage('Title and Price are required fields.');
      return;
    }

    setSubmitting(true);
    setErrorMessage(null);

    const payload = {
      itemType,
      title: title.trim(),
      category,
      vendor: vendor.trim() || 'Enterprise Partner',
      price: Number(price) || 0,
      pricingModel,
      description: description.trim() || 'Autonomous enterprise system capability.',
      fullDescription: fullDescription.trim() || description.trim() || 'Autonomous enterprise system capability.',
      paradoxResolution: itemType === 'Paradox Solution' ? paradoxResolution.trim() : undefined,
      features: featuresStr.split(',').map(f => f.trim()).filter(Boolean),
      specs: {
        'Deployment': 'Instant Container Node',
        'Settlement': 'PayPal B2B REST v2',
        'SLO': '99.99% Availability'
      }
    };

    try {
      const res = await fetch('/api/solutions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        const newItem = data.item || data;
        onItemAdded(newItem);
        onClose();
        // Reset form
        setTitle('');
        setVendor('');
        setDescription('');
        setFullDescription('');
        setParadoxResolution('');
        setErrorMessage(null);
      } else {
        const msg = data.error || data.message || `Server returned HTTP ${res.status}: Method or Request failed.`;
        setErrorMessage(msg);
      }
    } catch (err: any) {
      console.error('Error adding solution:', err);
      setErrorMessage(err.message || 'Network error: Failed to connect to /api/solutions endpoint.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/30 rounded-2xl text-indigo-400">
              <Plus className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Publish Solution to Marketplace</h3>
              <p className="text-xs text-slate-400">Register new paradox solution or ready-to-go business template on uarefake.com</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-xl transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error Alert Box */}
        {errorMessage && (
          <div className="bg-rose-950/80 border border-rose-500/60 rounded-xl p-4 flex items-start space-x-3 text-rose-200 text-xs animate-fade-in">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-rose-300">Solution Submission Error:</span>
              <p className="leading-relaxed">{errorMessage}</p>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Item Type Selector */}
          <div>
            <label className="block font-bold text-slate-300 mb-2">Marketplace Item Type</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setItemType('Paradox Solution')}
                className={`p-3 rounded-xl border text-left flex items-center space-x-2 transition-all ${
                  itemType === 'Paradox Solution'
                    ? 'bg-amber-500/10 border-amber-500/50 text-amber-200'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <div className="font-bold">Paradox Solution</div>
                  <div className="text-[10px] text-slate-400">Cryptographic Trade Resolution</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setItemType('Autonomous Business Template')}
                className={`p-3 rounded-xl border text-left flex items-center space-x-2 transition-all ${
                  itemType === 'Autonomous Business Template'
                    ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-200'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <Building2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <div className="font-bold">Business Template</div>
                  <div className="text-[10px] text-slate-400">Turnkey B2B Enterprise Blueprint</div>
                </div>
              </button>
            </div>
          </div>

          {/* Title & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-300 mb-1">Title / Item Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Autonomous Cross-Border Tariff Optimizer"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1">Category</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="Procurement AI">Procurement AI</option>
                <option value="Logistics Automation">Logistics Automation</option>
                <option value="Customs & Compliance">Customs & Compliance</option>
                <option value="Supply Chain IoT">Supply Chain IoT</option>
                <option value="ERP Connector">ERP Connector</option>
                <option value="Autonomous Operations">Autonomous Operations</option>
                <option value="FinTech & Settlement">FinTech & Settlement</option>
                <option value="Global Trade Agent">Global Trade Agent</option>
              </select>
            </div>
          </div>

          {/* Vendor, Price, Pricing Model */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-slate-300 mb-1">Vendor / Organization</label>
              <input
                type="text"
                placeholder="e.g. Solvex Autonomous Network"
                value={vendor}
                onChange={e => setVendor(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1">Price (USD) *</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-500">$</span>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-7 pr-3.5 py-2.5 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1">Pricing Model</label>
              <select
                value={pricingModel}
                onChange={e => setPricingModel(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="One-time">One-time Purchase</option>
                <option value="Monthly Subscription">Monthly Subscription</option>
                <option value="Per-Transaction Fee">Per-Transaction Fee</option>
                <option value="Annual Enterprise">Annual Enterprise</option>
              </select>
            </div>
          </div>

          {/* Short Description */}
          <div>
            <label className="block font-bold text-slate-300 mb-1">Short Description</label>
            <input
              type="text"
              placeholder="Brief high-level summary of the item capabilities..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Paradox Resolution (Conditional) */}
          {itemType === 'Paradox Solution' && (
            <div>
              <label className="block font-bold text-amber-300 mb-1">Cryptographic Paradox Resolution Statement</label>
              <input
                type="text"
                placeholder="How does this solution resolve opposing trade requirements (e.g., zero friction vs 100% compliance)?"
                value={paradoxResolution}
                onChange={e => setParadoxResolution(e.target.value)}
                className="w-full bg-slate-950 border border-amber-500/30 rounded-xl px-3.5 py-2.5 text-amber-100 placeholder-slate-600 focus:outline-none focus:border-amber-400"
              />
            </div>
          )}

          {/* Features */}
          <div>
            <label className="block font-bold text-slate-300 mb-1">Key Features (comma-separated)</label>
            <input
              type="text"
              placeholder="Feature 1, Feature 2, PayPal Instant Settlement..."
              value={featuresStr}
              onChange={e => setFeaturesStr(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-800 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting || !title || !price}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-600/30 flex items-center space-x-2"
            >
              {submitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Publishing...</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Publish Item to Marketplace</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
