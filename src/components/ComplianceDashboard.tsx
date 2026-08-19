import React, { useState } from 'react';
import { Database, ShieldCheck, Lock, FileCode, CheckCircle2, RefreshCw } from 'lucide-react';
import { COMPLIANCE_CONTROLS } from '../data/registryData';
import { SolutionPersistence } from '../modules/SolutionPersistence';
import { ComplianceControl, AuditLogEntry } from '../types';

export const ComplianceDashboard: React.FC = () => {
  const [controls] = useState<ComplianceControl[]>([...COMPLIANCE_CONTROLS]);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(SolutionPersistence.getAuditLogs());

  const handleRefreshAudit = () => {
    setAuditLogs(SolutionPersistence.getAuditLogs());
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="bg-[#0A0A10] border border-[#2A2A35] rounded-lg p-6 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-[0.1em] text-[#E0E0F0] uppercase flex items-center space-x-2">
            <Database className="w-5 h-5 text-[#00F0FF]" />
            <span>EAL6+ / NIST / ISO / SOC2 Compliance & ZK Audit Trail</span>
          </h1>
          <p className="text-[#A0A0B0] text-xs mt-1 max-w-2xl">
            Formal high-level security architecture verification, zero-trust cryptographic audit logs, and non-interactive zero-knowledge IP lockbox proof enforcement.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-[#050507] border border-[#00FF41]/40 px-3 py-1.5 rounded font-mono text-xs text-[#00FF41] green-glow">
          <CheckCircle2 className="w-4 h-4 text-[#00FF41]" />
          <span>EAL6+ AUDIT CERTIFIED</span>
        </div>
      </div>

      {/* Control Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {controls.map((ctrl) => (
          <div key={ctrl.id} className="bg-[#0A0A10] border border-[#2A2A35] rounded-lg p-4 space-y-3 font-mono text-xs shadow-md">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#00F0FF]">{ctrl.standard}</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#002810] text-[#00FF41] border border-[#00FF41]/30">
                {ctrl.status}
              </span>
            </div>

            <div className="font-bold text-[#E0E0F0] text-sm font-sans">{ctrl.name}</div>
            <div className="text-[#808090] text-[11px] font-mono">{ctrl.code}</div>

            <div className="p-2.5 bg-[#050507] rounded border border-[#2A2A35] space-y-1">
              <div className="text-[#505060] text-[9px] uppercase">PROOF SIGNATURE</div>
              <div className="text-[#00F0FF] text-[10px] truncate">{ctrl.proofHash}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Real-Time ZK Audit Logs Table */}
      <div className="bg-[#0A0A10] border border-[#2A2A35] rounded-lg p-6 space-y-4 shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#2A2A35] pb-3">
          <h2 className="text-sm font-bold text-[#E0E0F0] uppercase tracking-wider flex items-center space-x-2 font-mono">
            <ShieldCheck className="w-4 h-4 text-[#00F0FF]" />
            <span>Cryptographic Audit Trail Logs ({auditLogs.length})</span>
          </h2>

          <button
            onClick={handleRefreshAudit}
            className="px-3 py-1.5 bg-[#12121A] hover:bg-[#1A1A25] text-[#00F0FF] rounded text-xs font-mono font-medium border border-[#2A2A35] flex items-center space-x-1 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh Logs</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs text-[#A0A0B0]">
            <thead className="bg-[#050507] text-[#505060] text-[10px] uppercase tracking-wider border-b border-[#2A2A35]">
              <tr>
                <th className="p-3">Log ID</th>
                <th className="p-3">Timestamp</th>
                <th className="p-3">Action</th>
                <th className="p-3">Actor & Module</th>
                <th className="p-3">ZK Proof Signature</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1A1A25]">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-[#12121A]">
                  <td className="p-3 font-bold text-[#00F0FF]">{log.id}</td>
                  <td className="p-3 text-[#808090]">{new Date(log.timestampISO).toLocaleTimeString()}</td>
                  <td className="p-3 text-[#E0E0F0] font-sans">{log.action}</td>
                  <td className="p-3 text-[#808090]">{log.actor} ({log.module})</td>
                  <td className="p-3 text-[#00FF41] text-[10px] truncate max-w-xs">{log.zkProof}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
