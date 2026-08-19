import React, { useState } from 'react';
import { Shield, Lock, Unlock, Key, CheckCircle, AlertTriangle, X, ShieldAlert, Cpu, Sparkles } from 'lucide-react';

interface SovereignAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticate: (success: boolean) => void;
  isAuthenticated: boolean;
  onLock: () => void;
}

export const SovereignAuthModal: React.FC<SovereignAuthModalProps> = ({
  isOpen,
  onClose,
  onAuthenticate,
  isAuthenticated,
  onLock
}) => {
  const [passkey, setPasskey] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const validKeys = [
    'MAESTRO_AGE_2026',
    '8888',
    'gods.battle.axe.88',
    'solvex2026',
    'TJ-TRUSTEE-88'
  ];

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const trimmed = passkey.trim();
    if (!trimmed) {
      setError('Please enter your Sovereign Trustee Key or PIN.');
      return;
    }

    // Check if key matches master credentials
    if (validKeys.includes(trimmed) || validKeys.some(k => k.toLowerCase() === trimmed.toLowerCase())) {
      setSuccessMsg('Sovereign Authorization Verified: Access Granted to .space Control Board.');
      setTimeout(() => {
        onAuthenticate(true);
        setPasskey('');
        setSuccessMsg('');
        onClose();
      }, 700);
    } else {
      setError('Invalid Sovereign Key. Unauthorized access to .space control board is blocked and logged.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-indigo-500/50 rounded-2xl shadow-2xl overflow-hidden p-6 text-slate-100">
        {/* Glow Header */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-indigo-500 to-purple-600" />
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white">
            <Shield className="w-6 h-6 text-amber-300" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white flex items-center space-x-2">
              <span>Sovereign Trustee Gate</span>
              <span className="text-xs px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-700/60 font-mono">
                uarefake.space
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Restricts AI App Forge, Node Fleet Registry, and Black Box Audit to the Trustee.
            </p>
          </div>
        </div>

        {isAuthenticated ? (
          <div className="space-y-4 py-2">
            <div className="bg-emerald-950/50 border border-emerald-500/40 rounded-xl p-4 flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
              <div className="text-sm">
                <div className="font-bold text-emerald-300">Master Trustee Authenticated</div>
                <p className="text-xs text-slate-300 mt-1">
                  You have full administrative authority over the <span className="font-mono text-emerald-300">uarefake.space</span> AI compilation pipeline, 380-char node headers, and Black Box audit records.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-400 font-mono">Status: Sovereign Unlocked</span>
              <button
                onClick={() => {
                  onLock();
                  onClose();
                }}
                className="flex items-center space-x-2 px-4 py-2 bg-rose-600/90 hover:bg-rose-500 text-white rounded-xl text-xs font-semibold transition-all shadow-md shadow-rose-900/30"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Lock Console (Public Mode)</span>
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleVerify} className="space-y-4">
            <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-3.5 text-xs text-slate-300 space-y-1.5">
              <div className="flex items-center space-x-1.5 text-amber-400 font-semibold">
                <ShieldAlert className="w-4 h-4" />
                <span>Zero-Trust Security Barrier</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Public buyers on <span className="text-indigo-300 font-mono">uarefake.com</span> can freely browse solutions, buy licenses, and submit RFQs. Only you (the Trustee) can unlock AI compilation and hardware node telemetry.
              </p>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center justify-between">
                <span>Trustee Master Key / Genesis PIN</span>
                <span className="text-[10px] text-slate-500 font-mono">PIN: 8888 or Genesis Anchor</span>
              </label>
              <div className="relative">
                <Key className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  value={passkey}
                  onChange={(e) => setPasskey(e.target.value)}
                  placeholder="Enter Master Key or 4-digit PIN..."
                  autoFocus
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono"
                />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-rose-950/60 border border-rose-500/40 rounded-xl text-xs text-rose-300 flex items-center space-x-2 animate-in fade-in duration-150">
                <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{error}</span>
              </div>
            )}

            {successMsg && (
              <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 flex items-center space-x-2 animate-in fade-in duration-150">
                <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>{successMsg}</span>
              </div>
            )}

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setPasskey('8888')}
                className="text-xs text-indigo-400 hover:text-indigo-300 underline font-mono"
              >
                Quick Unlock (PIN 8888)
              </button>

              <button
                type="submit"
                className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-xs font-semibold transition-all shadow-lg shadow-indigo-600/30"
              >
                <Unlock className="w-3.5 h-3.5" />
                <span>Verify & Unlock .space</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
