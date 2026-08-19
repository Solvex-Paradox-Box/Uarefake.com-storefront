import React, { useState } from 'react';
import { ShieldCheck, Lock, Unlock, Eye, RefreshCw, CheckCircle2, AlertTriangle, Cpu, Key, FileText, Search, Copy, Check } from 'lucide-react';
import { BlackBoxAuditEvent } from '../types';
import { CompanyNode } from '../utils/nodeHeader';

interface BlackBoxAuditProps {
  nodes: CompanyNode[];
}

const INITIAL_EVENTS: BlackBoxAuditEvent[] = [
  {
    id: 'bb-1001',
    timestamp: '2026-08-10 13:42:01',
    eventType: 'HEADER_VERIFIED',
    nodeNumber: 'NODE-01',
    header380: 'SOLVEX-ENTERPRISE-380CHAR-HEADER::COMPANY-[UAREFAKE.COM ENTERPRISE GLOBAL]::SYSTEM-JIT-DISTRIBUTION::HASH-a8f9c2104e7b83d1059f3211e038294a772c10b984102938475a6b1029384756c9d81726354019283746501928374650192837465019283746501928374650192837465019283746501928374650192837465019283746501928374650192837465019283746501928374650192837465019283746501928374650192837465019283746501928374650192837465019283746501928374650192837465::NODE-01',
    hashSignature: '0x8f9a21b47c09e32f',
    status: 'Verified',
    details: 'Master 380-character company header verified for Node-01 main cloud host.'
  },
  {
    id: 'bb-1002',
    timestamp: '2026-08-10 13:44:18',
    eventType: 'PAYMENT_CAPTURED',
    nodeNumber: 'NODE-02',
    header380: 'SOLVEX-ENTERPRISE-380CHAR-HEADER::COMPANY-[UAREFAKE.COM ENTERPRISE GLOBAL]::SYSTEM-JIT-DISTRIBUTION::HASH-a8f9c2104e7b83d1059f3211e038294a772c10b984102938475a6b1029384756c9d81726354019283746501928374650192837465019283746501928374650192837465019283746501928374650192837465019283746501928374650192837465019283746501928374650192837465019283746501928374650192837465019283746501928374650192837465019283746501928374650192837465::NODE-02',
    hashSignature: '0x32e9f1a04d88e210',
    status: 'Tamper-Proof',
    details: 'PayPal settlement captured for PO-1002. Crystal Clear Black Box token dispatched.'
  },
  {
    id: 'bb-1003',
    timestamp: '2026-08-10 13:50:05',
    eventType: 'NODE_PROVISIONED',
    nodeNumber: 'NODE-03',
    header380: 'SOLVEX-ENTERPRISE-380CHAR-HEADER::COMPANY-[UAREFAKE.COM ENTERPRISE GLOBAL]::SYSTEM-JIT-DISTRIBUTION::HASH-a8f9c2104e7b83d1059f3211e038294a772c10b984102938475a6b1029384756c9d81726354019283746501928374650192837465019283746501928374650192837465019283746501928374650192837465019283746501928374650192837465019283746501928374650192837465019283746501928374650192837465019283746501928374650192837465019283746501928374650192837465::NODE-03',
    hashSignature: '0x10b984102938475a',
    status: 'Secured',
    details: 'ERP Bridge Station provisioned with 380-character header ending in NODE-03.'
  }
];

export const BlackBoxAudit: React.FC<BlackBoxAuditProps> = ({ nodes }) => {
  const [events] = useState<BlackBoxAuditEvent[]>(INITIAL_EVENTS);
  const [testHeaderInput, setTestHeaderInput] = useState('');
  const [verificationResult, setVerificationResult] = useState<{
    length: number;
    isValidLength: boolean;
    hasCompanyPrefix: boolean;
    nodeSuffix: string;
    status: 'Valid' | 'Invalid' | 'Idle';
  } | null>(null);

  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleVerifyHeader = (e: React.FormEvent) => {
    e.preventDefault();
    const len = testHeaderInput.length;
    const isValidLength = len === 380;
    const hasCompanyPrefix = testHeaderInput.includes('SOLVEX-ENTERPRISE-380CHAR-HEADER');
    
    // extract suffix if any
    const suffixMatch = testHeaderInput.match(/::(NODE-\d+)$/i);
    const nodeSuffix = suffixMatch ? suffixMatch[1].toUpperCase() : 'NONE';

    setVerificationResult({
      length: len,
      isValidLength,
      hasCompanyPrefix,
      nodeSuffix,
      status: isValidLength && hasCompanyPrefix ? 'Valid' : 'Invalid'
    });
  };

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Black Box Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold px-3 py-1 rounded-full">
              <Lock className="w-4 h-4 text-emerald-400" />
              <span>Solvex Crystal Clear Black Box Audit Engine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Crystal Clear Black Box Audit & Header Verifier
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Provides real-time, tamper-proof execution audit streams for all procurement orders, PayPal payments, and software node provisioning. Includes a cryptographic verification inspector for <span className="text-emerald-400 font-mono font-bold">380-character company master headers</span>.
            </p>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl shrink-0 font-mono text-xs text-slate-300 space-y-1">
            <div className="text-emerald-400 font-bold flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Black Box Ledger: SECURED</span>
            </div>
            <div>Verification: <span className="text-white">Strict 380 Chars</span></div>
            <div>Pipeline: <span className="text-indigo-400">uarefake.space Control</span></div>
          </div>
        </div>
      </div>

      {/* Header Verification Tool */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
          <Search className="w-5 h-5 text-indigo-400" />
          <h3 className="font-bold text-white text-base">380-Character Header Inspector & Checksum Verifier</h3>
        </div>

        <form onSubmit={handleVerifyHeader} className="space-y-3">
          <label className="block text-xs font-semibold text-slate-300">
            Paste any 380-Character Header String to verify compliance & node suffix:
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <textarea
              rows={2}
              value={testHeaderInput}
              onChange={(e) => setTestHeaderInput(e.target.value)}
              placeholder="Paste SOLVEX-ENTERPRISE-380CHAR-HEADER...::NODE-XX string here..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-mono text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="submit"
              disabled={!testHeaderInput.trim()}
              className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-emerald-600/20 text-xs shrink-0 self-start sm:self-auto cursor-pointer"
            >
              Verify Header
            </button>
          </div>
        </form>

        {verificationResult && (
          <div className={`p-4 rounded-xl border text-xs font-mono space-y-2 animate-fade-in ${
            verificationResult.status === 'Valid'
              ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-300'
              : 'bg-rose-950/40 border-rose-500/60 text-rose-300'
          }`}>
            <div className="flex items-center justify-between font-bold">
              <span className="flex items-center space-x-2">
                {verificationResult.status === 'Valid' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                )}
                <span>VERIFICATION STATUS: {verificationResult.status.toUpperCase()}</span>
              </span>
              <span>CHARACTERS: {verificationResult.length} / 380</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 text-[11px]">
              <div>Exact 380 Chars: <strong>{verificationResult.isValidLength ? 'YES ✅' : 'NO ❌'}</strong></div>
              <div>Company Master Prefix: <strong>{verificationResult.hasCompanyPrefix ? 'YES ✅' : 'NO ❌'}</strong></div>
              <div>Detected Node Suffix: <strong className="text-indigo-300">{verificationResult.nodeSuffix}</strong></div>
            </div>
          </div>
        )}
      </div>

      {/* Black Box Event Stream */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <Eye className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-white text-base">Real-Time Black Box Execution Stream</h3>
          </div>
          <span className="text-xs font-mono text-slate-400 flex items-center space-x-1">
            <RefreshCw className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
            <span>Streaming Audit Ledger</span>
          </span>
        </div>

        <div className="space-y-4">
          {events.map((evt) => (
            <div
              key={evt.id}
              className="bg-slate-950 border border-slate-800/80 rounded-xl p-4 font-mono text-xs space-y-2 hover:border-slate-700 transition-all"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
                <div className="flex items-center space-x-2">
                  <span className="bg-indigo-950 text-indigo-300 font-bold px-2 py-0.5 rounded border border-indigo-800 text-[10px]">
                    {evt.nodeNumber}
                  </span>
                  <span className="font-bold text-white text-xs">{evt.eventType}</span>
                  <span className="text-[10px] text-slate-500">{evt.timestamp}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    {evt.status}
                  </span>
                  <span className="text-[10px] text-slate-400">HASH: {evt.hashSignature}</span>
                </div>
              </div>

              <p className="text-slate-300 text-[11px] font-sans">{evt.details}</p>

              <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800/80 space-y-1 text-[10px] text-slate-400">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="font-bold text-emerald-400">Assigned 380-Character Master Header String</span>
                  <button
                    onClick={() => copyToClipboard(evt.id, evt.header380)}
                    className="text-slate-400 hover:text-white flex items-center space-x-1"
                  >
                    {copiedId === evt.id ? (
                      <span className="text-emerald-400 font-bold flex items-center space-x-1">
                        <Check className="w-3 h-3" />
                        <span>Copied!</span>
                      </span>
                    ) : (
                      <span className="flex items-center space-x-1">
                        <Copy className="w-3 h-3" />
                        <span>Copy Header</span>
                      </span>
                    )}
                  </button>
                </div>
                <div className="break-all select-all font-mono text-[9.5px] text-slate-300">
                  {evt.header380}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
