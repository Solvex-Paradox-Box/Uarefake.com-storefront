import React, { useState, useEffect } from 'react';
import { 
  X, Check, Lock, CreditCard, ShieldCheck, ArrowRight, ArrowLeft, 
  Building, Mail, User, Phone, MapPin, Globe, Server, CheckCircle2, 
  Download, Copy, RefreshCw, AlertCircle, Sparkles, Terminal, FileText, Cpu
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { 
  CheckoutCustomerInfo, 
  CheckoutDeploymentConfig, 
  CheckoutPaymentPayload, 
  CheckoutOrderReceipt,
  PurchaseOrder
} from '../types/index';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderPlaced: (order: PurchaseOrder, receipt: CheckoutOrderReceipt) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  onOrderPlaced
}) => {
  const { items, subtotal, discountAmount, total, promoCode, clearCart } = useCart();
  const { user, isAuthenticated, openAuthModal } = useAuth();

  const [step, setStep] = useState<'details' | 'deployment' | 'payment' | 'review' | 'success'>('details');

  // Step 1: Customer & Billing Form
  const [customer, setCustomer] = useState<CheckoutCustomerInfo>({
    name: '',
    email: '',
    company: '',
    phone: '',
    billingAddress: {
      street: '450 Mission Street, Suite 1800',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94105',
      country: 'United States'
    }
  });

  // Step 2: Deployment & Node Configuration
  const [deployment, setDeployment] = useState<CheckoutDeploymentConfig>({
    nodeNumber: 'NODE-01',
    domainTarget: 'youarefake.com',
    cloudProvider: 'AWS Sovereign Cloud',
    licenseTier: 'Enterprise Multi-Node',
    autoDeploy: true
  });

  // Step 3: Payment Configuration
  const [paymentMethod, setPaymentMethod] = useState<'credit-card' | 'paypal' | 'net30-wire' | 'crypto-escrow'>('credit-card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardHolder, setCardHolder] = useState('');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('888');
  const [corporateTaxId, setCorporateTaxId] = useState('US-TAX-8923019');
  const [cryptoNetwork, setCryptoNetwork] = useState<'XRPL' | 'Solana' | 'Ethereum'>('Solana');

  // Processing state
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [placedReceipt, setPlacedReceipt] = useState<CheckoutOrderReceipt | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Auto-populate when user is logged in
  useEffect(() => {
    if (user) {
      setCustomer({
        name: user.name || '',
        email: user.email || '',
        company: user.company || 'Sovereign Enterprise',
        phone: user.phone || '+1 (415) 890-2341',
        billingAddress: user.billingAddress || {
          street: '450 Mission Street, Suite 1800',
          city: 'San Francisco',
          state: 'CA',
          postalCode: '94105',
          country: 'United States'
        }
      });
      setCardHolder(user.name || 'SARAH CHEN');
    } else {
      setCustomer({
        name: 'Sarah Chen',
        email: 'buyer@solvex.com',
        company: 'Apex Global Logistics & Mesh',
        phone: '+1 (415) 890-2341',
        billingAddress: {
          street: '450 Mission Street, Suite 1800',
          city: 'San Francisco',
          state: 'CA',
          postalCode: '94105',
          country: 'United States'
        }
      });
      setCardHolder('SARAH CHEN');
    }
  }, [user, isOpen]);

  if (!isOpen) return null;

  const handleCopyKey = (text: string, keyName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(keyName);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleDownloadReceipt = () => {
    if (!placedReceipt) return;
    const content = `=====================================================
SOLVEX SOVEREIGN B2B MARKETPLACE • OFFICIAL RECEIPT
=====================================================
Order ID:        ${placedReceipt.orderId}
PO Number:       ${placedReceipt.poNumber}
Timestamp:       ${placedReceipt.timestamp}
Customer Name:   ${placedReceipt.customer.name}
Customer Email:  ${placedReceipt.customer.email}
Company:         ${placedReceipt.customer.company}
Payment Method:  ${placedReceipt.payment.method.toUpperCase()} (Status: ${placedReceipt.payment.status})
Transaction ID:  ${placedReceipt.payment.transactionId}

DEPLOYMENT CONFIGURATION:
-----------------------------------------------------
Target Domain:   ${placedReceipt.deployment.domainTarget}
Cloud Provider:  ${placedReceipt.deployment.cloudProvider}
Assigned Node:   ${placedReceipt.deployment.nodeNumber}
Merkle Root:     ${placedReceipt.merkleProofHash}

PURCHASED SOLUTIONS & DIGITAL LICENSES:
-----------------------------------------------------
${placedReceipt.items.map((it, idx) => `${idx + 1}. [${it.category}] ${it.title}
   Quantity: ${it.quantity}x | Tier: ${it.licenseTier} | Subtotal: $${(it.price * it.quantity).toFixed(2)}`).join('\n')}

CRYPTOGRAPHIC LICENSE KEYS:
-----------------------------------------------------
${placedReceipt.licenseKeys.map(k => `${k.title}:\n${k.key}`).join('\n\n')}

FINANCIAL BREAKDOWN:
-----------------------------------------------------
Subtotal:        $${placedReceipt.summary.subtotal.toFixed(2)}
Discount:        -$${placedReceipt.summary.discount.toFixed(2)}
Taxes/Fees:      $${placedReceipt.summary.tax.toFixed(2)}
Escrow Security: FREE ($0.00)
TOTAL PAID:      $${placedReceipt.summary.total.toFixed(2)} USD

Zero-Trust Verification Hash:
${placedReceipt.merkleProofHash}
=====================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SOLVEX-RECEIPT-${placedReceipt.poNumber}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleProcessOrder = async () => {
    setIsProcessing(true);
    setErrorMsg(null);

    const paymentPayload: CheckoutPaymentPayload = {
      method: paymentMethod,
      cardDetails: paymentMethod === 'credit-card' ? {
        cardNumber,
        cardHolder,
        expiryDate: cardExpiry,
        cvv: cardCvv,
        brand: 'Visa Sovereign Business'
      } : undefined,
      paypalOrderId: paymentMethod === 'paypal' ? `PAYID-SOLVEX-${Math.floor(1000 + Math.random() * 9000)}` : undefined,
      corporatePoNumber: paymentMethod === 'net30-wire' ? `CORP-PO-${Math.floor(10000 + Math.random() * 90000)}` : undefined,
      taxId: paymentMethod === 'net30-wire' ? corporateTaxId : undefined,
      cryptoWalletAddress: paymentMethod === 'crypto-escrow' ? 'SolvexSovereignMesh88x7B89a19c89' : undefined,
      cryptoNetwork: paymentMethod === 'crypto-escrow' ? cryptoNetwork : undefined
    };

    try {
      const res = await fetch('/api/checkout/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          customer,
          paymentMethod,
          paymentDetails: paymentPayload,
          deployment,
          promoCodeApplied: promoCode?.code,
          discountAmount
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to place order');
      }

      setPlacedReceipt(data.receipt);
      onOrderPlaced(data.purchaseOrder, data.receipt);
      clearCart();
      setStep('success');
    } catch (err: any) {
      setErrorMsg(err.message || 'Checkout processing failed. Please verify your payment details.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-950 border border-cyan-500/40 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl shadow-cyan-950/80 flex flex-col max-h-[92vh]">
        
        {/* Top Glow Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600" />

        {/* Modal Header */}
        <div className="p-6 pb-4 border-b border-cyan-500/20 flex items-center justify-between bg-black/60">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-950/90 border border-cyan-400/50 flex items-center justify-center text-cyan-300 shadow-md shadow-cyan-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-mono flex items-center space-x-2">
                <span>SOVEREIGN B2B CHECKOUT</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-mono font-bold">
                  256-Bit Escrow
                </span>
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Instant Provisioning • Automated Cryptographic Invoicing
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-900 rounded-xl transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator Tracker (Hidden on Success) */}
        {step !== 'success' && (
          <div className="px-6 py-3 bg-black/40 border-b border-slate-800">
            <div className="flex items-center justify-between text-xs font-mono">
              <button
                onClick={() => setStep('details')}
                className={`flex items-center space-x-1.5 ${step === 'details' ? 'text-cyan-300 font-bold' : 'text-slate-400'}`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 'details' ? 'bg-cyan-500 text-black font-bold' : 'bg-slate-800 text-slate-300'}`}>1</span>
                <span>Billing Details</span>
              </button>

              <div className="h-0.5 w-6 bg-slate-800" />

              <button
                onClick={() => setStep('deployment')}
                className={`flex items-center space-x-1.5 ${step === 'deployment' ? 'text-cyan-300 font-bold' : 'text-slate-400'}`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 'deployment' ? 'bg-cyan-500 text-black font-bold' : 'bg-slate-800 text-slate-300'}`}>2</span>
                <span>Deployment</span>
              </button>

              <div className="h-0.5 w-6 bg-slate-800" />

              <button
                onClick={() => setStep('payment')}
                className={`flex items-center space-x-1.5 ${step === 'payment' ? 'text-cyan-300 font-bold' : 'text-slate-400'}`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 'payment' ? 'bg-cyan-500 text-black font-bold' : 'bg-slate-800 text-slate-300'}`}>3</span>
                <span>Payment</span>
              </button>

              <div className="h-0.5 w-6 bg-slate-800" />

              <button
                onClick={() => setStep('review')}
                className={`flex items-center space-x-1.5 ${step === 'review' ? 'text-cyan-300 font-bold' : 'text-slate-400'}`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 'review' ? 'bg-cyan-500 text-black font-bold' : 'bg-slate-800 text-slate-300'}`}>4</span>
                <span>Review</span>
              </button>
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6">
          
          {errorMsg && (
            <div className="mb-4 p-3 bg-rose-950/60 border border-rose-500/60 rounded-xl text-rose-300 text-xs font-mono flex items-start space-x-2 animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
              <div>{errorMsg}</div>
            </div>
          )}

          {/* STEP 1: BILLING DETAILS */}
          {step === 'details' && (
            <div className="space-y-4">
              {!isAuthenticated ? (
                <div className="p-3.5 bg-cyan-950/40 border border-cyan-500/40 rounded-2xl flex items-center justify-between text-xs font-mono">
                  <div className="text-slate-300">
                    Have an existing account? <strong className="text-cyan-300">Sign in</strong> for instant checkout & stored billing profiles.
                  </div>
                  <button
                    type="button"
                    onClick={() => openAuthModal('login')}
                    className="bg-cyan-500 text-black font-bold px-3 py-1.5 rounded-xl text-xs hover:bg-cyan-400 transition-all shrink-0"
                  >
                    Sign In
                  </button>
                </div>
              ) : (
                <div className="p-3 bg-emerald-950/40 border border-emerald-500/40 rounded-2xl flex items-center space-x-2 text-xs font-mono text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Authenticated as <strong>{user?.name}</strong> ({user?.company || 'Enterprise'})</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-mono text-cyan-300">Authorized Purchaser Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-cyan-500" />
                    <input
                      type="text"
                      required
                      value={customer.name}
                      onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                      placeholder="Sarah Chen"
                      className="w-full bg-black/80 border border-cyan-500/40 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-mono text-cyan-300">Work Email (for JIT Licenses)</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-cyan-500" />
                    <input
                      type="email"
                      required
                      value={customer.email}
                      onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                      placeholder="buyer@solvex.com"
                      className="w-full bg-black/80 border border-cyan-500/40 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-mono text-cyan-300">Company / Organization</label>
                  <div className="relative">
                    <Building className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-cyan-500" />
                    <input
                      type="text"
                      required
                      value={customer.company}
                      onChange={(e) => setCustomer({ ...customer, company: e.target.value })}
                      placeholder="Apex Global Enterprises"
                      className="w-full bg-black/80 border border-cyan-500/40 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-mono text-cyan-300">Billing Phone</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-cyan-500" />
                    <input
                      type="tel"
                      value={customer.phone}
                      onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                      placeholder="+1 (415) 890-2341"
                      className="w-full bg-black/80 border border-cyan-500/40 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-mono text-cyan-300">Street Address</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-cyan-500" />
                  <input
                    type="text"
                    required
                    value={customer.billingAddress.street}
                    onChange={(e) => setCustomer({ ...customer, billingAddress: { ...customer.billingAddress, street: e.target.value } })}
                    placeholder="450 Mission Street, Suite 1800"
                    className="w-full bg-black/80 border border-cyan-500/40 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-mono text-cyan-300">City</label>
                  <input
                    type="text"
                    required
                    value={customer.billingAddress.city}
                    onChange={(e) => setCustomer({ ...customer, billingAddress: { ...customer.billingAddress, city: e.target.value } })}
                    placeholder="San Francisco"
                    className="w-full bg-black/80 border border-cyan-500/40 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-mono text-cyan-300">State / Region</label>
                  <input
                    type="text"
                    required
                    value={customer.billingAddress.state}
                    onChange={(e) => setCustomer({ ...customer, billingAddress: { ...customer.billingAddress, state: e.target.value } })}
                    placeholder="CA"
                    className="w-full bg-black/80 border border-cyan-500/40 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-mono text-cyan-300">Postal Code</label>
                  <input
                    type="text"
                    required
                    value={customer.billingAddress.postalCode}
                    onChange={(e) => setCustomer({ ...customer, billingAddress: { ...customer.billingAddress, postalCode: e.target.value } })}
                    placeholder="94105"
                    className="w-full bg-black/80 border border-cyan-500/40 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: DEPLOYMENT & SOVEREIGN NODE CONFIG */}
          {step === 'deployment' && (
            <div className="space-y-4">
              <div className="p-3.5 bg-blue-950/40 border border-blue-500/30 rounded-2xl text-xs font-mono text-blue-200">
                Configure your target runtime environment for automated JIT software compilation & node header assignment.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-mono text-cyan-300">Target Domain Architecture</label>
                  <select
                    value={deployment.domainTarget}
                    onChange={(e) => setDeployment({ ...deployment, domainTarget: e.target.value })}
                    className="w-full bg-black/80 border border-cyan-500/40 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 font-mono"
                  >
                    <option value="youarefake.com">youarefake.com (Public Customer Storefront)</option>
                    <option value="uarefake.space">uarefake.space (Admin & Cognitive Control Plane)</option>
                    <option value="internal.solvex.mesh">internal.solvex.mesh (Zero-Trust Internal Mesh)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-mono text-cyan-300">Assigned Sovereign Node</label>
                  <select
                    value={deployment.nodeNumber}
                    onChange={(e) => setDeployment({ ...deployment, nodeNumber: e.target.value })}
                    className="w-full bg-black/80 border border-cyan-500/40 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 font-mono"
                  >
                    <option value="NODE-01">NODE-01 (Storefront Edge Gateway)</option>
                    <option value="NODE-02">NODE-02 (Cognitive Brain Hub)</option>
                    <option value="NODE-03">NODE-03 (Daisy Pipeline & JIT Compiler)</option>
                    <option value="NODE-04">NODE-04 (BlackBox 380-Byte Ledger)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-mono text-cyan-300">Cloud Infrastructure Provider</label>
                <select
                  value={deployment.cloudProvider}
                  onChange={(e) => setDeployment({ ...deployment, cloudProvider: e.target.value as any })}
                  className="w-full bg-black/80 border border-cyan-500/40 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 font-mono"
                >
                  <option value="AWS Sovereign Cloud">AWS Sovereign Cloud (Zurich eu-central-2)</option>
                  <option value="Google Cloud Vertex">Google Cloud Vertex & Cloud Run (us-east1)</option>
                  <option value="Azure Quantum Mesh">Azure Quantum Mesh (us-west-2)</option>
                  <option value="On-Premises Air-Gapped">On-Premises Air-Gapped Dedicated Enclave</option>
                </select>
              </div>

              <div className="p-4 bg-black/80 border border-cyan-500/30 rounded-2xl space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300 font-bold">Automated JIT Packaging</span>
                  <span className="text-emerald-400">ENABLED</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Solutions in your cart will be automatically bundled into self-contained Dockerfiles, TypeScript microservices, and 380-byte header manifests upon payment completion.
                </p>
              </div>
            </div>
          )}

          {/* STEP 3: PAYMENT METHOD */}
          {step === 'payment' && (
            <div className="space-y-4">
              
              {/* Payment Method Selector Tabs */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('credit-card')}
                  className={`p-3 rounded-2xl border text-xs font-mono flex flex-col items-center justify-center space-y-1.5 transition-all ${
                    paymentMethod === 'credit-card'
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/20'
                      : 'bg-black/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  <span className="font-bold">Credit Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('paypal')}
                  className={`p-3 rounded-2xl border text-xs font-mono flex flex-col items-center justify-center space-y-1.5 transition-all ${
                    paymentMethod === 'paypal'
                      ? 'bg-blue-500/20 border-blue-400 text-blue-300 shadow-md shadow-blue-500/20'
                      : 'bg-black/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <Sparkles className="w-5 h-5 text-blue-400" />
                  <span className="font-bold">PayPal B2B</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('net30-wire')}
                  className={`p-3 rounded-2xl border text-xs font-mono flex flex-col items-center justify-center space-y-1.5 transition-all ${
                    paymentMethod === 'net30-wire'
                      ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-md shadow-emerald-500/20'
                      : 'bg-black/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <FileText className="w-5 h-5 text-emerald-400" />
                  <span className="font-bold">Net-30 Invoice</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('crypto-escrow')}
                  className={`p-3 rounded-2xl border text-xs font-mono flex flex-col items-center justify-center space-y-1.5 transition-all ${
                    paymentMethod === 'crypto-escrow'
                      ? 'bg-purple-500/20 border-purple-400 text-purple-300 shadow-md shadow-purple-500/20'
                      : 'bg-black/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <Cpu className="w-5 h-5 text-purple-400" />
                  <span className="font-bold">Crypto Escrow</span>
                </button>
              </div>

              {/* Sub-Panel: Credit Card */}
              {paymentMethod === 'credit-card' && (
                <div className="space-y-4">
                  {/* Visual Card Preview */}
                  <div className="h-44 w-full rounded-2xl bg-gradient-to-tr from-cyan-900 via-slate-900 to-indigo-900 p-5 text-white flex flex-col justify-between border border-cyan-400/40 shadow-xl relative overflow-hidden">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-mono text-cyan-300 font-bold uppercase tracking-wider">
                        Solvex Sovereign Commercial Card
                      </div>
                      <div className="w-8 h-6 rounded bg-amber-400/80 border border-amber-300/50" />
                    </div>

                    <div className="font-mono text-lg tracking-widest text-cyan-100 font-bold">
                      {cardNumber}
                    </div>

                    <div className="flex items-center justify-between text-xs font-mono">
                      <div>
                        <span className="text-[9px] text-slate-400 block uppercase">Card Holder</span>
                        <span className="font-bold text-white uppercase">{cardHolder || 'SARAH CHEN'}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-400 block uppercase">Expires</span>
                        <span className="font-bold text-white">{cardExpiry}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="md:col-span-2 space-y-1">
                      <label className="block text-xs font-mono text-cyan-300">Card Number</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="4242 4242 4242 4242"
                        className="w-full bg-black/80 border border-cyan-500/40 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-mono text-cyan-300">CVV</label>
                      <input
                        type="text"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        placeholder="888"
                        maxLength={4}
                        className="w-full bg-black/80 border border-cyan-500/40 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 font-mono text-center font-bold"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Sub-Panel: PayPal B2B */}
              {paymentMethod === 'paypal' && (
                <div className="p-4 bg-blue-950/40 border border-blue-500/40 rounded-2xl space-y-3 text-xs font-mono text-blue-200">
                  <div className="flex items-center space-x-2 text-white font-bold text-sm">
                    <Sparkles className="w-5 h-5 text-blue-400" />
                    <span>PayPal Instant Commercial Escrow</span>
                  </div>
                  <p>
                    Your transaction of <strong>${total.toFixed(2)} USD</strong> will be secured by PayPal REST B2B Escrow. Funds are released upon cryptographic node handshake.
                  </p>
                  <div className="p-2.5 bg-black/60 rounded-xl border border-blue-500/30 text-[11px] text-cyan-300">
                    Linked Merchant: <code>merchant-auth@solvex-paradox-box.com</code>
                  </div>
                </div>
              )}

              {/* Sub-Panel: Net-30 Invoicing */}
              {paymentMethod === 'net30-wire' && (
                <div className="p-4 bg-emerald-950/40 border border-emerald-500/40 rounded-2xl space-y-3 text-xs font-mono text-emerald-200">
                  <div className="flex items-center space-x-2 text-white font-bold text-sm">
                    <FileText className="w-5 h-5 text-emerald-400" />
                    <span>Corporate Net-30 Purchase Order Terms</span>
                  </div>
                  <p>
                    An official corporate purchase order will be generated and invoiced directly to your accounting department with 30-day settlement terms.
                  </p>
                  <div className="space-y-1">
                    <label className="block text-xs font-mono text-emerald-300">Corporate VAT / Tax ID</label>
                    <input
                      type="text"
                      value={corporateTaxId}
                      onChange={(e) => setCorporateTaxId(e.target.value)}
                      placeholder="US-TAX-8923019"
                      className="w-full bg-black/80 border border-emerald-500/40 rounded-xl px-3 py-2 text-xs text-white font-mono"
                    />
                  </div>
                </div>
              )}

              {/* Sub-Panel: Crypto Escrow */}
              {paymentMethod === 'crypto-escrow' && (
                <div className="p-4 bg-purple-950/40 border border-purple-500/40 rounded-2xl space-y-3 text-xs font-mono text-purple-200">
                  <div className="flex items-center space-x-2 text-white font-bold text-sm">
                    <Cpu className="w-5 h-5 text-purple-400" />
                    <span>Sovereign Ledger & Merkle Token Escrow</span>
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs font-mono text-purple-300">Settlement Network</label>
                    <select
                      value={cryptoNetwork}
                      onChange={(e) => setCryptoNetwork(e.target.value as any)}
                      className="w-full bg-black/80 border border-purple-500/40 rounded-xl px-3 py-2 text-xs text-white font-mono"
                    >
                      <option value="Solana">Solana (SPL Token & Micro-Escrow)</option>
                      <option value="XRPL">XRPL (Ripple Enterprise Settlement)</option>
                      <option value="Ethereum">Ethereum (ERC-20 USDT / USDC)</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 4: REVIEW & PLACE ORDER */}
          {step === 'review' && (
            <div className="space-y-4">
              <div className="p-4 bg-black/80 border border-cyan-500/30 rounded-2xl space-y-3 text-xs font-mono">
                <div className="text-xs font-bold text-cyan-300 border-b border-slate-800 pb-2">
                  Order Summary ({items.length} {items.length === 1 ? 'Solution' : 'Solutions'})
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {items.map((it) => (
                    <div key={it.id} className="flex items-center justify-between py-1 border-b border-slate-900">
                      <div>
                        <div className="text-white font-bold">{it.title}</div>
                        <div className="text-[10px] text-slate-400">{it.quantity}x • {it.licenseTier}</div>
                      </div>
                      <div className="text-cyan-300 font-bold">
                        ${(it.price * it.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 space-y-1 border-t border-slate-800">
                  <div className="flex justify-between text-slate-400">
                    <span>Subtotal</span>
                    <span className="text-white">${subtotal.toFixed(2)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Discount ({promoCode?.code})</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-400">
                    <span>Assigned Node</span>
                    <span className="text-cyan-300">{deployment.nodeNumber} ({deployment.domainTarget})</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Payment Method</span>
                    <span className="text-white uppercase font-bold">{paymentMethod}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-cyan-500/30">
                    <span>Total Amount Due</span>
                    <span className="text-cyan-400 text-lg font-extrabold">${total.toFixed(2)} USD</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-cyan-950/40 border border-cyan-500/40 rounded-xl text-[11px] font-mono text-cyan-300 flex items-start space-x-2">
                <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  By placing this order, you authorize the immediate issuance of sovereign license keys and Merkle notarization in the BlackBox 380 consensus ledger.
                </span>
              </div>
            </div>
          )}

          {/* STEP 5: SUCCESS CONFIRMATION & RECEIPT */}
          {step === 'success' && placedReceipt && (
            <div className="space-y-5 text-center py-2">
              <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 border border-emerald-400 text-emerald-300 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white font-mono">ORDER CONFIRMED & PROVISIONED</h3>
                <p className="text-xs text-slate-400 font-mono">
                  Purchase Order <strong className="text-cyan-300 font-mono">{placedReceipt.poNumber}</strong> has been sealed.
                </p>
              </div>

              {/* License Keys Generator Box */}
              <div className="bg-black/90 border border-cyan-500/40 rounded-2xl p-4 text-left space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-cyan-300 font-bold flex items-center space-x-1.5">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>Allocated License Keys:</span>
                  </span>
                  <span className="text-[10px] text-slate-500">256-Bit SHA-256</span>
                </div>

                <div className="space-y-2">
                  {placedReceipt.licenseKeys.map((k) => (
                    <div
                      key={k.solutionId}
                      className="p-3 bg-slate-900/90 border border-cyan-500/30 rounded-xl flex items-center justify-between gap-2"
                    >
                      <div className="overflow-hidden">
                        <div className="text-[11px] text-slate-300 font-bold font-mono truncate">{k.title}</div>
                        <div className="text-xs text-emerald-400 font-mono tracking-wider font-bold">{k.key}</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopyKey(k.key, k.solutionId)}
                        className="p-2 bg-black hover:bg-slate-800 text-cyan-300 rounded-lg text-xs font-mono flex items-center space-x-1 shrink-0 transition-all"
                      >
                        {copiedKey === k.solutionId ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  ))}
                </div>

                <div className="text-[10px] text-slate-500 font-mono break-all pt-1">
                  Merkle Root: <code>{placedReceipt.merkleProofHash}</code>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center space-x-3 pt-2">
                <button
                  type="button"
                  onClick={handleDownloadReceipt}
                  className="bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-500/40 px-4 py-2.5 rounded-xl text-xs font-mono flex items-center space-x-2 transition-all shadow"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Receipt (.txt)</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold px-5 py-2.5 rounded-xl text-xs font-mono flex items-center space-x-2 transition-all shadow-lg shadow-cyan-500/20"
                >
                  <span>Done & Return to Storefront</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        {step !== 'success' && (
          <div className="p-6 pt-4 border-t border-cyan-500/20 bg-black/80 flex items-center justify-between">
            {step === 'details' ? (
              <div className="text-xs font-mono text-slate-400">
                Subtotal: <strong className="text-white">${subtotal.toFixed(2)}</strong>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  if (step === 'deployment') setStep('details');
                  if (step === 'payment') setStep('deployment');
                  if (step === 'review') setStep('payment');
                }}
                className="bg-slate-900 hover:bg-slate-800 text-slate-300 px-4 py-2 rounded-xl text-xs font-mono flex items-center space-x-1.5 transition-all"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            )}

            {step === 'details' && (
              <button
                type="button"
                onClick={() => setStep('deployment')}
                className="bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold px-5 py-2.5 rounded-xl text-xs font-mono flex items-center space-x-1.5 transition-all shadow-lg"
              >
                <span>Continue to Deployment</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {step === 'deployment' && (
              <button
                type="button"
                onClick={() => setStep('payment')}
                className="bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold px-5 py-2.5 rounded-xl text-xs font-mono flex items-center space-x-1.5 transition-all shadow-lg"
              >
                <span>Continue to Payment</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {step === 'payment' && (
              <button
                type="button"
                onClick={() => setStep('review')}
                className="bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold px-5 py-2.5 rounded-xl text-xs font-mono flex items-center space-x-1.5 transition-all shadow-lg"
              >
                <span>Review Order Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {step === 'review' && (
              <button
                type="button"
                disabled={isProcessing}
                onClick={handleProcessOrder}
                className="bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black font-extrabold px-6 py-3 rounded-xl text-xs font-mono flex items-center space-x-2 transition-all shadow-xl shadow-cyan-500/30 disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Authorizing Escrow & Signing Merkle Proof...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Authorize & Place Order (${total.toFixed(2)})</span>
                  </>
                )}
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
