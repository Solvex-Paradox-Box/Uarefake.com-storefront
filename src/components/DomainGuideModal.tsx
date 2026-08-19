import React from 'react';
import { Globe, X, ExternalLink, CheckCircle2, ShieldCheck, Server, ArrowRight } from 'lucide-react';

interface DomainGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DomainGuideModal: React.FC<DomainGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8 text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/30 rounded-2xl text-indigo-400">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Public Deployment for uarefake.com</h3>
              <p className="text-xs text-slate-400">Vercel & Spaceship.com Custom Domain Setup Guide</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-xl transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Card */}
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <div className="text-xs">
              <span className="font-bold text-emerald-300">Managed via uarefake.space AI Registry & Control Board</span>
              <p className="text-slate-300">Application updates for <span className="font-mono text-emerald-300">uarefake.com</span> are controlled exclusively via <span className="font-mono text-indigo-300">uarefake.space</span> with all enterprise capabilities executing natively in runtime.</p>
            </div>
          </div>
          <span className="bg-emerald-950 text-emerald-300 text-[10px] font-mono px-2.5 py-1 rounded-full border border-emerald-800">
            SYNCED
          </span>
        </div>

        {/* Official GitHub Repository Link */}
        <div className="bg-slate-950 p-4 rounded-xl border border-indigo-500/40 flex items-center justify-between">
          <div>
            <div className="font-mono font-bold text-indigo-300 text-xs flex items-center space-x-1.5">
              <span>Official GitHub Master Repository</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Solvex-Paradox-Box / Solvex-Paradox-Marketplace-B2B-Solutions
            </p>
          </div>
          <a
            href="https://github.com/Solvex-Paradox-Box/Solvex-Paradox-Marketplace-B2B-Solutions#solvex-paradox-marketplace--b2b-solutions"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-mono font-semibold transition-all shadow-sm"
          >
            <span>View Repo</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Steps */}
        <div className="space-y-4 text-xs">
          <h4 className="font-bold text-slate-300 uppercase tracking-wider text-[11px]">
            Spaceship.com DNS Configuration Checklist:
          </h4>

          <div className="space-y-3">
            {/* Step 1 */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between font-mono font-bold text-slate-200">
                <span>1. Root Domain (A Record)</span>
                <span className="text-indigo-400">uarefake.com</span>
              </div>
              <div className="grid grid-cols-3 gap-2 bg-slate-900 p-2 rounded-lg text-[11px] font-mono text-slate-300">
                <div>Type: <span className="text-amber-400">A</span></div>
                <div>Host: <span className="text-amber-400">@</span></div>
                <div>Value: <span className="text-emerald-400">76.76.21.21</span></div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between font-mono font-bold text-slate-200">
                <span>2. Subdomain (CNAME Record)</span>
                <span className="text-indigo-400">www.uarefake.com</span>
              </div>
              <div className="grid grid-cols-3 gap-2 bg-slate-900 p-2 rounded-lg text-[11px] font-mono text-slate-300">
                <div>Type: <span className="text-amber-400">CNAME</span></div>
                <div>Host: <span className="text-amber-400">www</span></div>
                <div>Value: <span className="text-emerald-400">cname.vercel-dns.com</span></div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
              <div className="font-mono font-bold text-slate-200">
                3. Add Domain in Vercel Project Settings
              </div>
              <p className="text-slate-400 leading-relaxed">
                Go to Vercel Dashboard → Select your project → <span className="text-slate-200 font-semibold">Settings</span> → <span className="text-slate-200 font-semibold">Domains</span> → Add <span className="font-mono text-indigo-300">uarefake.com</span> and <span className="font-mono text-indigo-300">www.uarefake.com</span>. SSL certificates will issue automatically in under 60 seconds.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition-all shadow-md"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
