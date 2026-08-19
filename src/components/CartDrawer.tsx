import React, { useState } from 'react';
import { 
  X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck, 
  Tag, Check, AlertCircle, Sparkles, Cpu, Layers, ChevronRight, Lock, ExternalLink
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { LicenseTierType } from '../types/index';

interface CartDrawerProps {
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onProceedToCheckout }) => {
  const {
    items,
    itemCount,
    subtotal,
    discountAmount,
    taxAmount,
    escrowFee,
    total,
    promoCode,
    promoError,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    updateLicenseTier,
    clearCart,
    applyPromoCode,
    removePromoCode
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoSuccess, setPromoSuccess] = useState(false);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const ok = applyPromoCode(promoInput);
    if (ok) {
      setPromoSuccess(true);
      setPromoInput('');
      setTimeout(() => setPromoSuccess(false), 3000);
    }
  };

  const suggestedVouchers = ['SOLVEX2026', 'SOVEREIGN50', 'PARADOX25'];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-950 border-l border-cyan-500/40 text-slate-100 flex flex-col shadow-2xl shadow-cyan-950/80">
          
          {/* Top Bar Header */}
          <div className="p-6 border-b border-cyan-500/20 flex items-center justify-between bg-black/60">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-cyan-950/90 border border-cyan-400/50 flex items-center justify-center text-cyan-300 shadow-md shadow-cyan-500/20">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-base font-bold text-white font-mono">SOVEREIGN CART</h2>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-mono font-bold">
                    {itemCount} {itemCount === 1 ? 'item' : 'items'}
                  </span>
                </div>
                <p className="text-[11px] text-cyan-400/70 font-mono">Zero-Trust Escrow & JIT Deployment Ready</p>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              {items.length > 0 && (
                <button
                  onClick={clearCart}
                  className="p-2 text-slate-500 hover:text-rose-400 hover:bg-slate-900 rounded-xl transition-all"
                  title="Empty Cart"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={closeCart}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-900 rounded-xl transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-3xl bg-slate-900 border border-cyan-500/30 flex items-center justify-center text-slate-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-slate-300 font-mono">Your Cart is Empty</h3>
                  <p className="text-xs text-slate-500 font-mono max-w-xs">
                    Browse our catalog of 128 Paradox Solutions, Autonomous Blueprints, and Freedom SIM modules.
                  </p>
                </div>
                <button
                  onClick={closeCart}
                  className="bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold px-4 py-2.5 rounded-xl text-xs font-mono flex items-center space-x-1.5 transition-all shadow-lg"
                >
                  <span>Explore Solutions</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="bg-black/80 border border-cyan-500/30 hover:border-cyan-400/60 rounded-2xl p-4 transition-all space-y-3 relative group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-900 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                        <Cpu className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-[10px] text-cyan-400 font-mono uppercase tracking-wider font-semibold">
                          {item.category}
                        </div>
                        <h4 className="text-xs font-bold text-white font-mono line-clamp-1">
                          {item.title}
                        </h4>
                        <div className="text-[11px] text-slate-400 font-mono">
                          {item.pricingModel}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-slate-500 hover:text-rose-400 p-1 rounded-lg transition-all"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* License Tier Selection */}
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 font-mono block">License Tier:</label>
                    <select
                      value={item.licenseTier}
                      onChange={(e) => updateLicenseTier(item.id, e.target.value as LicenseTierType)}
                      className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-2.5 py-1 text-[11px] text-cyan-200 font-mono focus:outline-none focus:border-cyan-400"
                    >
                      <option value="Standard Single-Node">Standard Single-Node (1x)</option>
                      <option value="Enterprise Multi-Node">Enterprise Multi-Node (1.8x)</option>
                      <option value="Unlimited Sovereign Mesh">Unlimited Sovereign Mesh (3.2x)</option>
                    </select>
                  </div>

                  {/* Quantity and Price */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                    <div className="flex items-center space-x-2 bg-slate-900 border border-slate-700 rounded-xl p-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 rounded-lg bg-black hover:bg-slate-800 flex items-center justify-center text-slate-300 transition-all active:scale-95"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-xs font-mono font-bold text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 rounded-lg bg-black hover:bg-slate-800 flex items-center justify-center text-slate-300 transition-all active:scale-95"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-right font-mono">
                      <div className="text-xs font-bold text-white">
                        ${(item.price * item.quantity).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </div>
                      {item.quantity > 1 && (
                        <div className="text-[10px] text-slate-500">
                          ${item.price.toFixed(2)} each
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer & Checkout Action */}
          {items.length > 0 && (
            <div className="p-6 border-t border-cyan-500/20 bg-black/90 space-y-4">
              
              {/* Promo Code Input */}
              <div className="space-y-1.5">
                <form onSubmit={handleApplyPromo} className="flex items-center space-x-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-cyan-500" />
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Enter promo code (e.g. SOLVEX2026)"
                      className="w-full bg-slate-950 border border-cyan-500/30 rounded-xl pl-8 pr-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-400 font-mono uppercase"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-500/40 px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all"
                  >
                    Apply
                  </button>
                </form>

                {/* Promo feedback / chips */}
                {promoError && (
                  <div className="text-[11px] text-rose-400 font-mono flex items-center space-x-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{promoError}</span>
                  </div>
                )}
                {promoCode && (
                  <div className="flex items-center justify-between p-2 bg-emerald-950/60 border border-emerald-500/50 rounded-xl text-xs font-mono text-emerald-300">
                    <div className="flex items-center space-x-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span><strong>{promoCode.code}</strong>: {promoCode.description}</span>
                    </div>
                    <button
                      onClick={removePromoCode}
                      className="text-slate-400 hover:text-rose-400 text-[11px] underline"
                    >
                      Remove
                    </button>
                  </div>
                )}
                {!promoCode && (
                  <div className="flex items-center space-x-1.5 text-[10px] font-mono text-slate-500">
                    <span>Try:</span>
                    {suggestedVouchers.map((v) => (
                      <button
                        key={v}
                        type="button"
                        onClick={() => { setPromoInput(v); applyPromoCode(v); }}
                        className="text-cyan-400 hover:text-cyan-200 underline"
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Order Calculations Breakdown */}
              <div className="space-y-1.5 pt-2 border-t border-slate-800 text-xs font-mono">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span className="text-white">${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount Applied</span>
                    <span>-${discountAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-400">
                  <span className="flex items-center space-x-1">
                    <span>Zero-Trust Escrow Guarantee</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  </span>
                  <span className="text-cyan-300">FREE</span>
                </div>

                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-cyan-500/30">
                  <span>Total (USD)</span>
                  <span className="text-cyan-400 text-base font-extrabold">
                    ${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              {/* Proceed to Checkout CTA */}
              <button
                onClick={onProceedToCheckout}
                className="w-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black font-extrabold py-3.5 px-4 rounded-2xl text-xs font-mono flex items-center justify-center space-x-2 transition-all shadow-xl shadow-cyan-500/25 active:scale-98"
              >
                <Lock className="w-4 h-4 text-black" />
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center space-x-2 text-[10px] text-slate-500 font-mono">
                <ShieldCheck className="w-3 h-3 text-cyan-500" />
                <span>Instant JIT License Generation • 256-Bit Escrow Notarization</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
