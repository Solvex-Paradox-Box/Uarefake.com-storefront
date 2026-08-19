import React, { useState } from 'react';
import { Lock, Shield, Key, EyeOff, Sparkles, Terminal, ChevronDown, ChevronUp, CheckCircle2, Server, Cpu, ShieldCheck } from 'lucide-react';
import { SOVEREIGN_SOLUTIONS } from '../data/brainData';

interface ProtectedControlViewProps {
  title: string;
  description: string;
  moduleName: string;
  onOpenAuth: () => void;
}

export const ProtectedControlView: React.FC<ProtectedControlViewProps> = ({
  title,
  description,
  moduleName,
  onOpenAuth
}) => {
  const [showSolutionsList, setShowSolutionsList] = useState(false);
  const spaceSolutions = SOVEREIGN_SOLUTIONS.filter(s => s.layer === 8);

  return (
    <div className="max-w-5xl mx-auto my-8 space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
        {/* Background Accent Mesh */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center max-w-2xl mx-auto space-y-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-slate-800 via-indigo-950 to-slate-800 border border-indigo-500/40 flex items-center justify-center text-indigo-400 shadow-xl shadow-indigo-950/50">
            <Lock className="w-10 h-10 text-amber-400 animate-pulse" />
          </div>

          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-indigo-950 text-indigo-300 border border-indigo-700/60 mb-3">
              <Shield className="w-3.5 h-3.5 text-indigo-400" />
              <span>Sovereign Enclave Security — {moduleName}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {title} is Protected
            </h2>
            <p className="text-sm text-slate-400 mt-2 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Security Info Box */}
          <div className="w-full bg-slate-950/80 border border-slate-800 rounded-2xl p-4 text-left font-mono text-xs text-slate-400 space-y-2">
            <div className="flex items-center justify-between text-indigo-300 font-semibold">
              <span className="flex items-center space-x-1.5">
                <Terminal className="w-3.5 h-3.5" />
                <span>Zero-Trust Control Board (uarefake.space)</span>
              </span>
              <span className="text-amber-400 text-[10px]">AUTH_REQUIRED</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Public buyers access <span className="text-slate-200">uarefake.com</span> for the 105 B2B catalog solutions and autonomous businesses. The <span className="text-amber-300 font-semibold">23 Sovereign Infrastructure Solutions</span> (S-106 to S-128, AppForge Compiler, Black Box Vault & 380-Char Headers) are sealed inside the <span className="text-slate-200">uarefake.space</span> master control enclave.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onOpenAuth}
              className="flex items-center space-x-2.5 px-6 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-2xl text-sm font-bold shadow-xl shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Key className="w-4 h-4 text-amber-300" />
              <span>Unlock Sovereign Master Console</span>
            </button>

            <button
              onClick={() => setShowSolutionsList(!showSolutionsList)}
              className="flex items-center space-x-2 px-5 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-2xl text-sm font-semibold border border-slate-700 transition-all cursor-pointer"
            >
              <Server className="w-4 h-4 text-cyan-400" />
              <span>View 23 .space Enclave Solutions</span>
              {showSolutionsList ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Expandable 23 Sovereign .space Solutions List */}
      {showSolutionsList && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-bold text-white">23 Sovereign Infrastructure Solutions (Layer 8)</h3>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Total System: 128 Solutions (105 B2B + 23 .space) & 88 Solved Paradoxes
              </p>
            </div>
            <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-amber-950 text-amber-300 border border-amber-800/60 self-start sm:self-auto">
              S-106 through S-128
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
            {spaceSolutions.map((sol) => (
              <div
                key={sol.id}
                className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4 hover:border-indigo-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800/50">
                      {sol.id}
                    </span>
                    <span className="text-[10px] font-mono uppercase text-slate-400">
                      .space Enclave
                    </span>
                  </div>
                  <h4 className="font-semibold text-sm text-white mb-1.5 line-clamp-1">{sol.name}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{sol.description}</p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-indigo-300 font-mono">
                  <span className="flex items-center space-x-1">
                    <Lock className="w-3 h-3 text-amber-400" />
                    <span>Trustee Protected</span>
                  </span>
                  <button
                    onClick={onOpenAuth}
                    className="text-xs text-amber-400 hover:text-amber-300 underline cursor-pointer"
                  >
                    Unlock
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
