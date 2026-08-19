import React, { useState } from 'react';
import { Server, ShieldCheck, Copy, Check, Cpu, Zap, Activity, HardDrive, Plus, MapPin, Search, ExternalLink, RefreshCw, AlertCircle } from 'lucide-react';
import { CompanyNode, generate380CharHeader } from '../utils/nodeHeader';

interface CompanyNodeTrackerProps {
  nodes: CompanyNode[];
  onAddNode: (newNode: CompanyNode) => void;
}

export const CompanyNodeTracker: React.FC<CompanyNodeTrackerProps> = ({ nodes, onAddNode }) => {
  const [copiedHeaderId, setCopiedHeaderId] = useState<string | null>(null);
  const [searchFilter, setSearchFilter] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // New Node Form state
  const [deviceName, setDeviceName] = useState('');
  const [location, setLocation] = useState('');
  const [assignedSoftware, setAssignedSoftware] = useState('');

  const handleCopyHeader = (nodeId: string, headerText: string) => {
    navigator.clipboard.writeText(headerText);
    setCopiedHeaderId(nodeId);
    setTimeout(() => setCopiedHeaderId(null), 2500);
  };

  const handleCreateNode = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage(null);

    const nextNodeNumber = `NODE-${String(nodes.length + 1).padStart(2, '0')}`;
    const header = generate380CharHeader(nextNodeNumber, 'uarefake.com Enterprise Core');

    const nodePayload = {
      nodeNumber: nextNodeNumber,
      companyName: 'uarefake.com Enterprise Core',
      companyMainHeader: header,
      deviceName: deviceName.trim() || `Solvex Node Terminal ${nextNodeNumber}`,
      location: location.trim() || 'Company Facility / Data Center',
      assignedSoftware: assignedSoftware.trim() || 'Solvex JIT Software Suite',
      poId: `po-auto-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'Active' as const,
      ipAddress: `10.240.0.${20 + nodes.length}`
    };

    try {
      const res = await fetch('/api/nodes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nodePayload)
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        const savedNode: CompanyNode = data.node || {
          ...nodePayload,
          id: `node-${Date.now()}`,
          lastPing: 'Just created'
        };
        onAddNode(savedNode);
        setDeviceName('');
        setLocation('');
        setAssignedSoftware('');
        setErrorMessage(null);
        setShowAddModal(false);
      } else {
        const msg = data.error || data.details || `Server returned HTTP ${res.status}: Failed to register node.`;
        setErrorMessage(msg);
      }
    } catch (err: any) {
      console.error('Node registration network error:', err);
      setErrorMessage(err.message || 'Network error: Failed to connect to /api/nodes endpoint.');
    } finally {
      setSubmitting(false);
    }
  };

  const filteredNodes = nodes.filter(
    (n) =>
      n.deviceName.toLowerCase().includes(searchFilter.toLowerCase()) ||
      n.nodeNumber.toLowerCase().includes(searchFilter.toLowerCase()) ||
      n.assignedSoftware.toLowerCase().includes(searchFilter.toLowerCase()) ||
      n.location.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const mainCompanyHeader = nodes[0]?.companyMainHeader || generate380CharHeader('NODE-01');

  return (
    <div className="space-y-6 animate-fade-in">
      {/* 380-Character Company Master Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold px-3 py-1 rounded-full">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Enterprise 380-Character Master Header System Active</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Company Master Header & Node Tracker
              </h2>
              <p className="text-sm text-slate-300 max-w-2xl">
                Tracks individual software deployments across device nodes in the company using a standardized <span className="text-emerald-400 font-mono font-bold">380-character cryptographic company header</span> with unique node suffixes (<span className="text-indigo-300 font-mono font-bold">NODE-01</span>, <span className="text-indigo-300 font-mono font-bold">NODE-02</span>, etc.) synced live to <span className="text-purple-300 font-mono font-bold">uarefake.space / uarefake.com</span> build registry.
              </p>
            </div>

            <div className="flex items-center space-x-3 shrink-0">
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl shadow-lg shadow-indigo-600/20 flex items-center space-x-2 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Register New Device Node</span>
              </button>
            </div>
          </div>

          {/* Master 380-Character Header Code Box */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3 font-mono text-xs text-slate-200 shadow-inner">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
              <div className="flex items-center space-x-2">
                <Cpu className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-slate-200">COMPANY MASTER HEADER STRING (380 CHARACTERS)</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded border border-emerald-800/80">
                  LENGTH: {mainCompanyHeader.length} / 380 CHARACTERS
                </span>
                <button
                  onClick={() => handleCopyHeader('master', mainCompanyHeader)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-2.5 py-1 rounded-lg flex items-center space-x-1.5 transition-all text-[11px]"
                >
                  {copiedHeaderId === 'master' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">Copied 380 Chars!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Master Header</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <p className="text-slate-300 break-all leading-relaxed bg-slate-900/80 p-3 rounded-xl border border-slate-800/60 select-all font-mono text-[11px]">
              {mainCompanyHeader}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400 pt-1">
              <span>Target Company: <strong className="text-white font-sans">uarefake.com Enterprise Global</strong></span>
              <span>Active Company Nodes: <strong className="text-indigo-300 font-mono font-bold">{nodes.length} Registered</strong></span>
              <span>Distribution Pipeline: <strong className="text-emerald-400 font-mono font-bold">Solvex JIT Stream</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 p-4 rounded-2xl">
        <div className="relative flex-1 w-full max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Filter nodes by device name, NODE-XX, location, or software..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center space-x-2 text-xs text-slate-400">
          <Activity className="w-4 h-4 text-emerald-400" />
          <span>Real-time Node Telemetry Active</span>
        </div>
      </div>

      {/* Company Nodes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNodes.map((node) => (
          <div
            key={node.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all shadow-xl flex flex-col justify-between space-y-4 group relative overflow-hidden"
          >
            <div className="space-y-3">
              {/* Header Badge */}
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center space-x-1.5 font-mono text-xs font-bold bg-indigo-950 text-indigo-300 border border-indigo-700/60 px-3 py-1 rounded-lg">
                  <Server className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{node.nodeNumber}</span>
                </span>

                <span className="text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  ● {node.status}
                </span>
              </div>

              {/* Device Title & Location */}
              <div>
                <h3 className="font-bold text-white text-base group-hover:text-indigo-300 transition-colors">
                  {node.deviceName}
                </h3>
                <p className="text-xs text-slate-400 flex items-center space-x-1 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span className="truncate">{node.location}</span>
                </p>
              </div>

              {/* Installed Software */}
              <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800/80 space-y-1">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Assigned JIT Software</div>
                <div className="text-xs font-bold text-emerald-300 flex items-center space-x-1.5">
                  <Zap className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">{node.assignedSoftware}</span>
                </div>
              </div>

              {/* 380-Character Header Preview */}
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-[10px] text-slate-400 space-y-1.5">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="font-bold text-slate-300">Node Header (380 Chars)</span>
                  <span className="text-indigo-400 font-bold">{node.companyMainHeader.length} Chars</span>
                </div>

                <p className="text-slate-300 break-all select-all line-clamp-3 bg-slate-900/60 p-2 rounded-lg border border-slate-800 text-[9.5px]">
                  {node.companyMainHeader}
                </p>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] text-emerald-400 font-bold">
                    Suffix: ::{node.nodeNumber}
                  </span>
                  <button
                    onClick={() => handleCopyHeader(node.id, node.companyMainHeader)}
                    className="text-slate-400 hover:text-white flex items-center space-x-1 hover:underline text-[10px]"
                  >
                    {copiedHeaderId === node.id ? (
                      <span className="text-emerald-400 font-bold flex items-center space-x-1">
                        <Check className="w-3 h-3" />
                        <span>Copied!</span>
                      </span>
                    ) : (
                      <span className="flex items-center space-x-1">
                        <Copy className="w-3 h-3" />
                        <span>Copy Node Header</span>
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Footer Telemetry */}
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span>IP: {node.ipAddress}</span>
              <span>Last Ping: {node.lastPing}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Node Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 text-slate-100 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-lg text-white">Register New Company Node</h3>
                <p className="text-xs text-slate-400">Generates next 380-character header ending in NODE-{String(nodes.length + 1).padStart(2, '0')}</p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            {errorMessage && (
              <div className="bg-rose-950/80 border border-rose-500/60 rounded-xl p-3.5 flex items-start space-x-2.5 text-rose-200 text-xs">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="font-bold text-rose-300">Registration Failed:</span>
                  <p>{errorMessage}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleCreateNode} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Device Name / Station Identifier
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Server Rack 04 - Chicago Facility"
                  value={deviceName}
                  onChange={(e) => setDeviceName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Physical / Cloud Location
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Building 2, Server Room B"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Assigned JIT Software / Solution
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Solvex Autonomous PO Dispatch Engine"
                  value={assignedSoftware}
                  onChange={(e) => setAssignedSoftware(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-mono text-slate-300 space-y-1">
                <div className="text-emerald-400 font-bold">Auto-Generated Node Header Suffix:</div>
                <div>::NODE-{String(nodes.length + 1).padStart(2, '0')}</div>
                <div className="text-slate-500 text-[10px]">Header length will strictly equal 380 characters.</div>
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white px-5 py-2 rounded-xl text-xs font-semibold shadow-lg shadow-indigo-600/30 flex items-center space-x-2"
                >
                  {submitting ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Provisioning Node...</span>
                    </>
                  ) : (
                    <span>Confirm & Provision Node</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
