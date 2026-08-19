import React, { useState, useEffect } from 'react';
import { 
  X, Lock, Mail, User, Building, Phone, ShieldCheck, Key, ArrowRight, 
  CheckCircle2, AlertCircle, Eye, EyeOff, Sparkles, RefreshCw, LogIn, UserPlus, HelpCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { UserAccount } from '../types/index';

interface UserAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register' | 'forgot';
  onSuccessToast?: (title: string, msg: string) => void;
  onAdminDirectLogin?: () => void;
}

export const UserAuthModal: React.FC<UserAuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
  onSuccessToast,
  onAdminDirectLogin
}) => {
  const { login, register, requestPasswordReset, resetPassword } = useAuth();

  const [activeTab, setActiveTab] = useState<'login' | 'register' | 'forgot'>(initialMode);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<UserAccount['role']>('Enterprise Buyer');
  const [accountType, setAccountType] = useState<UserAccount['accountType']>('Corporate B2B');
  
  // Forgot / Reset Password states
  const [forgotStep, setForgotStep] = useState<'request' | 'verify' | 'success'>('request');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [sentCodeHint, setSentCodeHint] = useState<string | null>(null);

  // Status & Feedback
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    setActiveTab(initialMode);
    setErrorMsg(null);
    setSuccessMsg(null);
  }, [initialMode, isOpen]);

  if (!isOpen) return null;

  const handleQuickDemoFill = (type: 'buyer' | 'admin' | 'procure') => {
    setErrorMsg(null);
    setSuccessMsg(null);
    if (type === 'buyer') {
      setEmail('buyer@solvex.com');
      setPassword('Enterprise2026!');
      setActiveTab('login');
    } else if (type === 'admin') {
      setEmail('admin@uarefake.space');
      setPassword('Sovereign88!');
      setActiveTab('login');
    } else {
      setEmail('marcus@quantumprocure.io');
      setPassword('Procure2026!');
      setActiveTab('login');
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      const isAdminEmail = email.toLowerCase().includes('admin') || 
                           email.toLowerCase().includes('space') || 
                           email.toLowerCase().includes('daisy.haminja');
      if (isAdminEmail && onAdminDirectLogin) {
        if (onSuccessToast) {
          onSuccessToast('Sovereign Administrator Granted', 'Routing directly to uarefake.space AI Registry & Control Board.');
        }
        onClose();
        onAdminDirectLogin();
        return;
      }

      if (onSuccessToast) {
        onSuccessToast('Access Granted', `Welcome back to Solvex Autonomous Network.`);
      }
      onClose();
    } else {
      setErrorMsg(res.error || 'Authentication failed. Please verify your credentials.');
    }
  };

  const handleAdminFastLogin = async () => {
    setErrorMsg(null);
    setLoading(true);
    const res = await login('admin@uarefake.space', 'Sovereign88!');
    setLoading(false);
    if (res.success) {
      if (onSuccessToast) {
        onSuccessToast('Sovereign Administrator Granted', 'Directly authenticated on uarefake.space Enclave.');
      }
      onClose();
      if (onAdminDirectLogin) {
        onAdminDirectLogin();
      }
    } else {
      setErrorMsg(res.error || 'Failed to authenticate Admin credentials.');
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (password.length < 6) {
      setErrorMsg('Password must contain at least 6 characters.');
      return;
    }

    setLoading(true);
    const res = await register({
      name,
      email,
      password,
      company,
      role,
      accountType,
      phone
    });
    setLoading(false);

    if (res.success) {
      if (onSuccessToast) {
        onSuccessToast('Registration Complete', `Account registered for ${name}. Digital keys allocated.`);
      }
      onClose();
    } else {
      setErrorMsg(res.error || 'Registration failed.');
    }
  };

  const handleForgotRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    const res = await requestPasswordReset(email);
    setLoading(false);

    if (res.success) {
      setForgotStep('verify');
      setSentCodeHint(res.resetCode || null);
      if (res.resetCode) {
        setVerificationCode(res.resetCode); // Pre-fill for easy preview verification
      }
      setSuccessMsg('A 6-digit recovery code has been generated for your email.');
    } else {
      setErrorMsg(res.error || 'Failed to dispatch password recovery code.');
    }
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (newPassword !== confirmPassword) {
      setErrorMsg('Passwords do not match. Please verify.');
      return;
    }

    if (newPassword.length < 6) {
      setErrorMsg('New password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    const res = await resetPassword(email, verificationCode, newPassword);
    setLoading(false);

    if (res.success) {
      setForgotStep('success');
      setSuccessMsg('Your password has been successfully updated and secured.');
      if (onSuccessToast) {
        onSuccessToast('Password Reset', 'New credentials stored and verified with PBKDF2 hash.');
      }
      setTimeout(() => {
        onClose();
      }, 1800);
    } else {
      setErrorMsg(res.error || 'Failed to verify reset code.');
    }
  };

  // Password strength calculation
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: 'Empty', color: 'bg-slate-700' };
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 10) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score <= 2) return { score: 1, label: 'Weak', color: 'bg-rose-500' };
    if (score <= 3) return { score: 2, label: 'Moderate', color: 'bg-amber-500' };
    return { score: 3, label: 'Strong (PBKDF2 Secured)', color: 'bg-emerald-400' };
  };

  const passwordStrength = getPasswordStrength(activeTab === 'register' ? password : newPassword);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-950 border border-cyan-500/40 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl shadow-cyan-950/60 relative">
        
        {/* Top Header Glow Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600" />

        {/* Modal Top Nav & Close */}
        <div className="p-6 pb-4 border-b border-cyan-500/20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-950/80 border border-cyan-400/50 flex items-center justify-center text-cyan-300 shadow-lg shadow-cyan-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-mono flex items-center space-x-2">
                <span>SOLVEX SOVEREIGN GATE</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-mono">
                  PBKDF2 10k
                </span>
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                {activeTab === 'login' && 'Sign in to access your B2B account & orders'}
                {activeTab === 'register' && 'Register sovereign enterprise organization'}
                {activeTab === 'forgot' && 'Cryptographic password recovery & token verification'}
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

        {/* Tab Selector */}
        <div className="px-6 pt-4">
          <div className="grid grid-cols-3 bg-black/60 p-1 rounded-2xl border border-cyan-500/30 text-xs font-mono">
            <button
              onClick={() => { setActiveTab('login'); setErrorMsg(null); setSuccessMsg(null); }}
              className={`py-2 px-3 rounded-xl font-bold flex items-center justify-center space-x-1.5 transition-all ${
                activeTab === 'login'
                  ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>

            <button
              onClick={() => { setActiveTab('register'); setErrorMsg(null); setSuccessMsg(null); }}
              className={`py-2 px-3 rounded-xl font-bold flex items-center justify-center space-x-1.5 transition-all ${
                activeTab === 'register'
                  ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Register</span>
            </button>

            <button
              onClick={() => { setActiveTab('forgot'); setForgotStep('request'); setErrorMsg(null); setSuccessMsg(null); }}
              className={`py-2 px-3 rounded-xl font-bold flex items-center justify-center space-x-1.5 transition-all ${
                activeTab === 'forgot'
                  ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Recover</span>
            </button>
          </div>
        </div>

        {/* Demo Fast-Fill Pills */}
        <div className="px-6 pt-3 flex items-center space-x-2 text-[11px] font-mono overflow-x-auto pb-1">
          <span className="text-slate-500 shrink-0">Demo Accounts:</span>
          <button
            type="button"
            onClick={() => handleQuickDemoFill('buyer')}
            className="px-2.5 py-1 rounded-lg bg-blue-950/80 hover:bg-blue-900 text-blue-300 border border-blue-500/40 shrink-0 transition-all hover:scale-105"
            title="buyer@solvex.com"
          >
            Buyer (Sarah)
          </button>
          <button
            type="button"
            onClick={() => handleQuickDemoFill('admin')}
            className="px-2.5 py-1 rounded-lg bg-purple-950/80 hover:bg-purple-900 text-purple-300 border border-purple-500/40 shrink-0 transition-all hover:scale-105"
            title="admin@uarefake.space"
          >
            Admin (Alexander)
          </button>
          <button
            type="button"
            onClick={() => handleQuickDemoFill('procure')}
            className="px-2.5 py-1 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/40 shrink-0 transition-all hover:scale-105"
            title="marcus@quantumprocure.io"
          >
            Procurement (Marcus)
          </button>
        </div>

        {/* Feedback Messages */}
        <div className="px-6 pt-2">
          {errorMsg && (
            <div className="p-3 bg-rose-950/60 border border-rose-500/60 rounded-xl text-rose-300 text-xs font-mono flex items-start space-x-2 animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
              <div>{errorMsg}</div>
            </div>
          )}
          {successMsg && (
            <div className="p-3 bg-emerald-950/60 border border-emerald-500/60 rounded-xl text-emerald-300 text-xs font-mono flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
              <div>{successMsg}</div>
            </div>
          )}
        </div>

        {/* TAB 1: LOGIN FORM */}
        {activeTab === 'login' && (
          <form onSubmit={handleLoginSubmit} className="p-6 space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-mono text-cyan-300">Work / Organization Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-cyan-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. buyer@solvex.com"
                  className="w-full bg-black/80 border border-cyan-500/40 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 font-mono"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-mono text-cyan-300">Password</label>
                <button
                  type="button"
                  onClick={() => { setActiveTab('forgot'); setForgotStep('request'); }}
                  className="text-[11px] text-cyan-400 hover:text-cyan-200 font-mono underline"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-cyan-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-black/80 border border-cyan-500/40 rounded-xl pl-9 pr-10 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-extrabold py-3 px-4 rounded-xl text-xs font-mono flex items-center justify-center space-x-2 transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Verifying PBKDF2 Hash...</span>
                  </>
                ) : (
                  <>
                    <span>Authenticate & Access Storefront</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={handleAdminFastLogin}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 hover:from-purple-900 hover:to-indigo-900 border border-purple-500/50 hover:border-purple-400 text-purple-200 font-bold py-2.5 px-4 rounded-xl text-xs font-mono flex items-center justify-center space-x-2 transition-all shadow-md shadow-purple-950/40"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Site Admin Login ➔ Direct to uarefake.space Backend</span>
                </button>
              </div>
            </div>
          </form>
        )}

        {/* TAB 2: REGISTER FORM */}
        {activeTab === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="p-6 space-y-3.5 max-h-[68vh] overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-xs font-mono text-cyan-300">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-cyan-500" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Sarah Chen"
                    className="w-full bg-black/80 border border-cyan-500/40 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-mono text-cyan-300">Work Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-cyan-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="sarah@company.com"
                    className="w-full bg-black/80 border border-cyan-500/40 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-xs font-mono text-cyan-300">Company / Organization</label>
                <div className="relative">
                  <Building className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-cyan-500" />
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Apex Global Enterprises"
                    className="w-full bg-black/80 border border-cyan-500/40 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-mono text-cyan-300">Phone (Optional)</label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-cyan-500" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 019-2834"
                    className="w-full bg-black/80 border border-cyan-500/40 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-xs font-mono text-cyan-300">Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as any)}
                  className="w-full bg-black/80 border border-cyan-500/40 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 font-mono"
                >
                  <option value="Enterprise Buyer">Enterprise Buyer</option>
                  <option value="Procurement Specialist">Procurement Specialist</option>
                  <option value="Customer">Standard Customer</option>
                  <option value="Sovereign Administrator">Sovereign Administrator</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-mono text-cyan-300">Account Type</label>
                <select
                  value={accountType}
                  onChange={(e) => setAccountType(e.target.value as any)}
                  className="w-full bg-black/80 border border-cyan-500/40 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 font-mono"
                >
                  <option value="Corporate B2B">Corporate B2B</option>
                  <option value="Individual">Individual</option>
                  <option value="Developer">Developer / Node Operator</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-mono text-cyan-300">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-cyan-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min 6 characters (e.g. Enterprise2026!)"
                  className="w-full bg-black/80 border border-cyan-500/40 rounded-xl pl-9 pr-10 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password Strength Meter */}
              {password && (
                <div className="space-y-1 pt-1">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-slate-400">Security Strength:</span>
                    <span className="text-cyan-300">{passwordStrength.label}</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden flex gap-1">
                    <div className={`h-full ${passwordStrength.score >= 1 ? passwordStrength.color : 'bg-slate-800'} flex-1 rounded-full`} />
                    <div className={`h-full ${passwordStrength.score >= 2 ? passwordStrength.color : 'bg-slate-800'} flex-1 rounded-full`} />
                    <div className={`h-full ${passwordStrength.score >= 3 ? passwordStrength.color : 'bg-slate-800'} flex-1 rounded-full`} />
                  </div>
                </div>
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-extrabold py-3 px-4 rounded-xl text-xs font-mono flex items-center justify-center space-x-2 transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Provisioning Cryptographic Account...</span>
                  </>
                ) : (
                  <>
                    <span>Create Sovereign Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* TAB 3: FORGOT & RESET PASSWORD */}
        {activeTab === 'forgot' && (
          <div className="p-6 space-y-4">
            {forgotStep === 'request' && (
              <form onSubmit={handleForgotRequest} className="space-y-4">
                <div className="p-3 bg-blue-950/40 border border-blue-500/30 rounded-xl text-blue-200 text-xs font-mono">
                  Enter your registered work email to receive a 6-digit cryptographic verification code.
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-cyan-300">Registered Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-cyan-500" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. buyer@solvex.com"
                      className="w-full bg-black/80 border border-cyan-500/40 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 font-mono"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold py-3 px-4 rounded-xl text-xs font-mono flex items-center justify-center space-x-2 transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Generating Recovery Token...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Verification Code</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            {forgotStep === 'verify' && (
              <form onSubmit={handleResetSubmit} className="space-y-3.5">
                {sentCodeHint && (
                  <div className="p-3 bg-cyan-950/60 border border-cyan-500/50 rounded-xl text-cyan-300 text-xs font-mono flex items-center justify-between">
                    <span>Generated Code: <strong className="text-white text-sm tracking-widest">{sentCodeHint}</strong></span>
                    <span className="text-[10px] bg-cyan-500/20 px-2 py-0.5 rounded border border-cyan-500/40">Auto-Detected</span>
                  </div>
                )}

                <div className="space-y-1">
                  <label className="block text-xs font-mono text-cyan-300">6-Digit Verification Code</label>
                  <div className="relative">
                    <Key className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-cyan-500" />
                    <input
                      type="text"
                      required
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      placeholder="123456"
                      className="w-full bg-black/80 border border-cyan-500/40 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 font-mono tracking-widest text-center text-sm font-bold"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-mono text-cyan-300">New Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-cyan-500" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Min 6 characters"
                      className="w-full bg-black/80 border border-cyan-500/40 rounded-xl pl-9 pr-10 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-mono text-cyan-300">Confirm New Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-cyan-500" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      className="w-full bg-black/80 border border-cyan-500/40 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 font-mono"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setForgotStep('request')}
                    className="w-1/3 bg-slate-900 hover:bg-slate-800 text-slate-300 py-3 rounded-xl text-xs font-mono transition-all"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-2/3 bg-gradient-to-r from-emerald-400 to-cyan-500 hover:from-emerald-300 hover:to-cyan-400 text-black font-extrabold py-3 px-4 rounded-xl text-xs font-mono flex items-center justify-center space-x-2 transition-all shadow-lg disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Updating Hash...</span>
                      </>
                    ) : (
                      <>
                        <span>Update & Sign In</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {forgotStep === 'success' && (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-300 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-sm font-bold text-white font-mono">Password Secured</h4>
                <p className="text-xs text-slate-400 font-mono">
                  You are now automatically logged in with your updated credentials.
                </p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
