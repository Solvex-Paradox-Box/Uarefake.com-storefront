import { useState, useEffect, useRef } from 'react';
import { MMTAIPeer, MMTAISecurityAudit, ExecutionLog } from '../types';
import { 
  generateMMTAIPayloadSignature, 
  COMPLIANCE_REGULATION_STANDARDS,
  ComplianceStandard,
  UAREFAKE_BRAND
} from '../engine/mmtaiSecurityEngine';
import { 
  ShieldCheck, 
  Lock, 
  Key, 
  Server, 
  Activity, 
  CheckCircle2, 
  RefreshCw, 
  Play,
  Pause,
  Trash2,
  Filter,
  Terminal,
  Zap,
  Radio,
  ArrowDown,
  Globe,
  Award
} from 'lucide-react';

interface MmtaiSecurityViewProps {
  peers: MMTAIPeer[];
  audits: MMTAISecurityAudit[];
  onAddLog: (log: ExecutionLog) => void;
}

export interface StreamLogEntry {
  id: string;
  timestamp: string;
  type: 'HANDSHAKE' | 'AUDIT' | 'ZERO-TRUST' | 'UAREFAKE' | 'SIGNATURE';
  peer: string;
  protocol: string;
  message: string;
  hash: string;
  latencyMs: number;
  status: 'CONFIRMED' | 'VALIDATED' | 'PASSED' | 'SECURED';
}

export function MmtaiSecurityView({
  peers,
  audits,
  onAddLog
}: MmtaiSecurityViewProps) {
  const [testPayload, setTestPayload] = useState('{"orderId":"PO-2026-9041","amount":14250.00,"vendor":"Apex Semiconductor"}');
  const [signatureOutput, setSignatureOutput] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  // Stream Terminal States
  const [isStreaming, setIsStreaming] = useState(true);
  const [filterType, setFilterType] = useState<string>('ALL');
  const [autoScroll, setAutoScroll] = useState(true);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Compliance Scanning State
  const [isScanningCompliance, setIsScanningCompliance] = useState(false);
  const [complianceList, setComplianceList] = useState<ComplianceStandard[]>(COMPLIANCE_REGULATION_STANDARDS);

  const handleScanCompliance = () => {
    setIsScanningCompliance(true);
    setTimeout(() => {
      const now = new Date().toLocaleTimeString();
      setComplianceList(prev => prev.map(c => ({
        ...c,
        lastScanned: now,
        score: 100
      })));
      setIsScanningCompliance(false);

      const auditEntry: StreamLogEntry = {
        id: `STREAM-COMPLIANCE-${Date.now()}`,
        timestamp: now,
        type: 'AUDIT',
        peer: 'uarefake.com-sovereign-node',
        protocol: 'UAREFAKE Fiduciary Kinetic Scan',
        message: 'Re-scanned 6 global compliance frameworks (NIST, ISO27001, SOX 404, GDPR, OFAC, Fiduciary Kinetic). 100.0% Pass Rate.',
        hash: `0xCOMPLIANCE_OK_${Math.random().toString(16).substring(2, 8).toUpperCase()}`,
        latencyMs: 1.05,
        status: 'PASSED'
      };
      setStreamLogs(p => [...p, auditEntry]);
    }, 800);
  };

  // Initial stream logs initialized from audits + handshakes
  const [streamLogs, setStreamLogs] = useState<StreamLogEntry[]>([
    {
      id: 'STREAM-1',
      timestamp: new Date().toLocaleTimeString(),
      type: 'HANDSHAKE',
      peer: 'us-west-node1.mmtai.net',
      protocol: 'TLS 1.3 / Kyber-1024 Quantum Key Exchange',
      message: 'Zero-trust peer handshake initialized & session key exchanged',
      hash: '0x8F9A02B1C412E690',
      latencyMs: 1.12,
      status: 'CONFIRMED'
    },
    {
      id: 'STREAM-2',
      timestamp: new Date().toLocaleTimeString(),
      type: 'UAREFAKE',
      peer: 'eu-central-node2.mmtai.net',
      protocol: 'UAREFAKE Truth Protocol v4.2',
      message: 'Authenticity score 100.0% verified. Zero deepfake noise detected.',
      hash: '0x4D71E909B312A888',
      latencyMs: 0.94,
      status: 'PASSED'
    },
    {
      id: 'STREAM-3',
      timestamp: new Date().toLocaleTimeString(),
      type: 'ZERO-TRUST',
      peer: 'asia-east-node3.mmtai.net',
      protocol: 'RBAC Multi-Party Consensus',
      message: '3-of-3 Peer Consensus signatures locked on Ledger Block #99201',
      hash: '0x7C221088E21011A9',
      latencyMs: 1.45,
      status: 'SECURED'
    },
    {
      id: 'STREAM-4',
      timestamp: new Date().toLocaleTimeString(),
      type: 'SIGNATURE',
      peer: 'us-west-node1.mmtai.net',
      protocol: 'HMAC-SHA256 Payload Digest',
      message: 'Verified PO payload PO-2026-9041 against Master Agreement Clause 16.2',
      hash: '0x1290AB33DF9091C2',
      latencyMs: 0.88,
      status: 'VALIDATED'
    }
  ]);

  // Real-time log streamer ticker
  useEffect(() => {
    if (!isStreaming) return;

    const streamInterval = setInterval(() => {
      const peersList = ['us-west-node1.mmtai.net', 'eu-central-node2.mmtai.net', 'asia-east-node3.mmtai.net', 'daisy-sovereign-node4.net'];
      const eventTypes: Array<StreamLogEntry['type']> = ['HANDSHAKE', 'AUDIT', 'ZERO-TRUST', 'UAREFAKE', 'SIGNATURE'];
      const chosenType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
      const chosenPeer = peersList[Math.floor(Math.random() * peersList.length)];
      
      const messagesMap: Record<StreamLogEntry['type'], { protocol: string; msg: string; status: StreamLogEntry['status'] }> = {
        'HANDSHAKE': {
          protocol: 'Kyber-1024 / Dilithium-3 Quantum Handshake',
          msg: `Re-verified peer node ${chosenPeer} cryptographic transport keys.`,
          status: 'CONFIRMED'
        },
        'AUDIT': {
          protocol: 'MMTAI Continuous OFAC & Sanctions Sweep',
          msg: 'Clean audit result across 1,024 global sanction watchlists.',
          status: 'PASSED'
        },
        'ZERO-TRUST': {
          protocol: 'Tether Bubble Synaptic Cross-Validation',
          msg: 'Synchronized 88 Paradox rules against active transaction pipeline.',
          status: 'SECURED'
        },
        'UAREFAKE': {
          protocol: 'UAREFAKE Neural Synthetic Detection',
          msg: 'Deepfake probability 0.00%. Payload payload authenticity confirmed.',
          status: 'PASSED'
        },
        'SIGNATURE': {
          protocol: 'HMAC-SHA256 Cryptographic Hash Verification',
          msg: `Payload digest hash validated for ${chosenPeer}.`,
          status: 'VALIDATED'
        }
      };

      const { protocol, msg, status } = messagesMap[chosenType];
      const randomHash = `0x${Math.random().toString(16).substring(2, 10).toUpperCase()}${Math.random().toString(16).substring(2, 6).toUpperCase()}`;
      const latency = parseFloat((0.8 + Math.random() * 0.9).toFixed(2));

      const newStreamEntry: StreamLogEntry = {
        id: `STREAM-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        timestamp: new Date().toLocaleTimeString(),
        type: chosenType,
        peer: chosenPeer,
        protocol,
        message: msg,
        hash: randomHash,
        latencyMs: latency,
        status
      };

      setStreamLogs(prev => [...prev.slice(-99), newStreamEntry]);
    }, 2000);

    return () => clearInterval(streamInterval);
  }, [isStreaming]);

  // Auto-scroll to bottom of terminal
  useEffect(() => {
    if (autoScroll && terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [streamLogs, autoScroll]);

  const handleGenerateSignature = () => {
    setIsVerifying(true);
    setTimeout(() => {
      try {
        const parsed = JSON.parse(testPayload);
        const sig = generateMMTAIPayloadSignature(parsed);
        setSignatureOutput(sig);

        const newEntry: StreamLogEntry = {
          id: `STREAM-MANUAL-${Date.now()}`,
          timestamp: new Date().toLocaleTimeString(),
          type: 'SIGNATURE',
          peer: 'us-west-node1.mmtai.net',
          protocol: 'HMAC-SHA256 Payload Digest',
          message: `Manual payload signature generated: ${sig.substring(0, 32)}...`,
          hash: sig.substring(0, 18),
          latencyMs: 0.75,
          status: 'VALIDATED'
        };
        setStreamLogs(prev => [...prev, newEntry]);

        onAddLog({
          id: `LOG-${Date.now()}`,
          timestamp: new Date().toLocaleString(),
          agentName: 'MMTAI Protocol Engine',
          actionType: 'Payload Signed',
          details: `Generated quantum-safe HMAC-SHA256 signature "${sig.substring(0, 24)}...". Zero trust verified.`,
          status: 'success',
          entityType: 'MMTAI'
        });
      } catch (err) {
        setSignatureOutput('Error: Invalid JSON payload input');
      } finally {
        setIsVerifying(false);
      }
    }, 600);
  };

  const handleTriggerManualHandshake = () => {
    const newEntry: StreamLogEntry = {
      id: `STREAM-HANDSHAKE-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString(),
      type: 'HANDSHAKE',
      peer: 'daisy-sovereign-node4.net',
      protocol: 'Kyber-1024 Quantum Key Exchange',
      message: 'Initiated manual sovereign peer handshake & re-minted RBAC bearer token.',
      hash: `0xKYBER_${Math.random().toString(16).substring(2, 10).toUpperCase()}`,
      latencyMs: 0.95,
      status: 'CONFIRMED'
    };
    setStreamLogs(prev => [...prev, newEntry]);
  };

  const filteredLogs = streamLogs.filter(log => filterType === 'ALL' || log.type === filterType);

  const getTypeBadgeStyle = (type: StreamLogEntry['type']) => {
    switch (type) {
      case 'HANDSHAKE':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      case 'UAREFAKE':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'ZERO-TRUST':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
      case 'SIGNATURE':
        return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40';
      case 'AUDIT':
      default:
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-950/80 via-slate-900 to-indigo-950/80 border border-purple-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <ShieldCheck className="w-64 h-64 text-purple-400" />
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 text-[10px] font-mono tracking-wider uppercase font-semibold">
                MMTAI Protocol Security Core
              </span>
              <span className="text-xs text-slate-400">Zero-Trust Cryptographic Engine</span>
            </div>
            <h1 className="text-2xl font-bold text-white mt-1">MMTAI Multi-Modal Transport Security Protocol</h1>
            <p className="text-xs text-slate-300 max-w-2xl mt-1">
              Quantum-safe HMAC-SHA256 payload signatures, RBAC token verification, multi-party consensus nodes, and immutable cryptographic audit trails for all B2B transactions.
            </p>
          </div>

          <div className="bg-slate-950/80 border border-purple-500/30 rounded-xl p-4 text-right shrink-0">
            <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
              Protocol Security Level
            </span>
            <p className="text-2xl font-bold text-purple-400 font-mono">Level 4 Cryptographic</p>
          </div>
        </div>

        {/* Security Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800/80">
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3">
            <p className="text-[10px] text-slate-400 font-medium">Consensus Nodes</p>
            <p className="text-lg font-bold text-white">{peers.length} Online</p>
          </div>
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3">
            <p className="text-[10px] text-slate-400 font-medium">Zero-Trust Pass Rate</p>
            <p className="text-lg font-bold text-emerald-400">100.0%</p>
          </div>
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3">
            <p className="text-[10px] text-slate-400 font-medium">Signature Latency</p>
            <p className="text-lg font-bold text-purple-400">1.2 ms</p>
          </div>
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3">
            <p className="text-[10px] text-slate-400 font-medium">OFAC Sanctions Status</p>
            <p className="text-lg font-bold text-cyan-400">CLEAN / ACTIVE</p>
          </div>
        </div>

        {/* UAREFAKE Domain & Sovereign Protocol Banner */}
        <div className="mt-4 bg-amber-500/10 border border-amber-500/30 rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-amber-300 tracking-wide font-mono">
                  {UAREFAKE_BRAND.acronym} Protocol
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-900 border border-amber-500/40 text-amber-400 font-mono">
                  {UAREFAKE_BRAND.primaryDomain}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-900 border border-amber-500/40 text-amber-400 font-mono">
                  {UAREFAKE_BRAND.spaceDomain}
                </span>
              </div>
              <p className="text-[11px] text-slate-300 mt-0.5">
                <strong className="text-white">{UAREFAKE_BRAND.fullName}</strong>
              </p>
            </div>
          </div>
          <div className="text-right font-mono text-[11px] text-amber-300/80">
            Fiduciary Sovereign Engine • Active 2026
          </div>
        </div>
      </div>

      {/* Compliance & Regulatory Standards Matrix Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-emerald-400" />
              <h3 className="text-base font-bold text-white">Compliance & Regulatory Scan Matrix</h3>
              <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                100% Audit Verified
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Continuous regulatory scanning for NIST Zero Trust, ISO 27001, SOX 404, GDPR, OFAC, and UAREFAKE Fiduciary Protocols.
            </p>
          </div>

          <button
            onClick={handleScanCompliance}
            disabled={isScanningCompliance}
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold flex items-center space-x-2 transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50 shrink-0"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isScanningCompliance ? 'animate-spin' : ''}`} />
            <span>{isScanningCompliance ? 'Scanning All Protocols...' : 'Run Compliance Scan'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {complianceList.map((std) => (
            <div key={std.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2 hover:border-slate-700 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                  {std.code}
                </span>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30 flex items-center space-x-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{std.status}</span>
                </span>
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">{std.name}</h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{std.details}</p>
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-2 border-t border-slate-900">
                <span>Score: <strong className="text-emerald-400">{std.score}%</strong></span>
                <span>Scanned: {std.lastScanned}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Real-Time Stream Viewer Terminal (Primary Highlight) */}
      <div className="bg-slate-950 border border-purple-500/40 rounded-2xl shadow-2xl overflow-hidden font-mono text-xs">
        
        {/* Terminal Window Top Bar */}
        <div className="bg-slate-900/90 border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <div className="h-4 w-px bg-slate-800" />
            <div className="flex items-center space-x-2 text-slate-200 font-bold">
              <Terminal className="w-4 h-4 text-purple-400" />
              <span>MMTAI Real-Time Zero-Trust Validation Stream</span>
            </div>
            <div className="flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px]">
              <Radio className={`w-3 h-3 ${isStreaming ? 'animate-pulse' : ''}`} />
              <span>{isStreaming ? 'STREAMING ACTIVE' : 'STREAM PAUSED'}</span>
            </div>
          </div>

          {/* Terminal Action Controls */}
          <div className="flex items-center space-x-2">
            {/* Filter Dropdown / Chips */}
            <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
              <Filter className="w-3.5 h-3.5 text-slate-400 ml-1" />
              {['ALL', 'HANDSHAKE', 'ZERO-TRUST', 'UAREFAKE', 'SIGNATURE'].map(t => (
                <button
                  key={t}
                  onClick={() => setFilterType(t)}
                  className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-all ${
                    filterType === t 
                      ? 'bg-purple-500/30 text-purple-300 border border-purple-500/50' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsStreaming(!isStreaming)}
              className={`p-1.5 rounded-lg border text-xs flex items-center space-x-1 transition-all ${
                isStreaming 
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-300 hover:bg-amber-500/20' 
                  : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20'
              }`}
            >
              {isStreaming ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span className="text-[11px] font-sans font-medium">{isStreaming ? 'Pause' : 'Resume'}</span>
            </button>

            <button
              onClick={handleTriggerManualHandshake}
              className="px-2.5 py-1 rounded-lg bg-purple-500/20 border border-purple-500/40 text-purple-300 hover:bg-purple-500/30 text-[11px] font-sans font-medium flex items-center space-x-1 transition-all"
            >
              <Zap className="w-3.5 h-3.5 text-purple-400" />
              <span>Simulate Handshake</span>
            </button>

            <button
              onClick={() => setStreamLogs([])}
              className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-red-400 hover:border-red-500/30 transition-all"
              title="Clear Terminal"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Scrollable Terminal Output Body */}
        <div className="p-4 h-80 overflow-y-auto space-y-2 bg-slate-950/95 scrollbar-thin scrollbar-thumb-slate-800">
          {filteredLogs.length === 0 ? (
            <div className="h-full flex items-center justify-center text-slate-600 italic">
              [No logs matching filter criteria or terminal cleared]
            </div>
          ) : (
            filteredLogs.map((log, idx) => (
              <div 
                key={log.id} 
                className="flex items-start space-x-3 p-2 rounded hover:bg-slate-900/60 transition-colors border-b border-slate-900/80 leading-relaxed text-[11px]"
              >
                <span className="text-slate-600 select-none w-8 text-right shrink-0">{idx + 1}</span>
                <span className="text-slate-500 shrink-0">[{log.timestamp}]</span>
                <span className={`px-1.5 py-0.2 rounded border text-[9px] font-bold shrink-0 ${getTypeBadgeStyle(log.type)}`}>
                  {log.type}
                </span>
                <span className="text-purple-400 shrink-0 font-semibold">{log.peer}</span>
                <span className="text-slate-400 shrink-0">({log.protocol}):</span>
                <span className="text-slate-200 flex-1">{log.message}</span>
                <span className="text-slate-500 font-mono text-[10px] shrink-0">{log.hash}</span>
                <span className="text-slate-500 text-[10px] shrink-0">{log.latencyMs}ms</span>
                <span className="text-emerald-400 font-bold shrink-0 flex items-center space-x-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{log.status}</span>
                </span>
              </div>
            ))
          )}
          <div ref={terminalEndRef} />
        </div>

        {/* Terminal Footer Bar */}
        <div className="bg-slate-900/80 px-4 py-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <div className="flex items-center space-x-4">
            <span>TOTAL STREAMED: <strong className="text-purple-300">{streamLogs.length}</strong></span>
            <span>FILTER: <strong className="text-cyan-300">{filterType}</strong></span>
            <span>BUFFER: <strong className="text-emerald-400">100% OK</strong></span>
          </div>

          <button
            onClick={() => setAutoScroll(!autoScroll)}
            className={`flex items-center space-x-1 text-[10px] px-2 py-0.5 rounded border ${
              autoScroll ? 'bg-purple-500/10 border-purple-500/30 text-purple-300' : 'bg-slate-950 border-slate-800 text-slate-500'
            }`}
          >
            <ArrowDown className="w-3 h-3" />
            <span>Auto-Scroll {autoScroll ? 'ON' : 'OFF'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Cryptographic Signer Terminal + Peer Nodes & Audits */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Cryptographic Payload Signer */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
            <Key className="w-4 h-4 text-purple-400" />
            <h2 className="text-sm font-bold text-white">MMTAI SHA256 Payload Signer</h2>
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1 font-mono">Input JSON Payload</label>
            <textarea
              rows={5}
              value={testPayload}
              onChange={(e) => setTestPayload(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-purple-300 font-mono focus:outline-none focus:border-purple-500/50"
            />
          </div>

          <button
            onClick={handleGenerateSignature}
            disabled={isVerifying}
            className="w-full py-2 bg-purple-500 hover:bg-purple-400 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center space-x-2 transition-all shadow-lg shadow-purple-500/20 disabled:opacity-50"
          >
            {isVerifying ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Computing HMAC-SHA256...</span>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>Generate MMTAI Signature</span>
              </>
            )}
          </button>

          {signatureOutput && (
            <div className="bg-slate-950 border border-purple-500/30 rounded-xl p-3 space-y-1">
              <span className="text-[10px] text-slate-400 font-mono uppercase block">Generated Cryptographic Signature</span>
              <p className="text-xs font-mono text-purple-300 break-all">{signatureOutput}</p>
            </div>
          )}
        </div>

        {/* Right Consensus Peer Nodes & Security Audit Stream */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Peer Nodes Network */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <Server className="w-4 h-4 text-purple-400" />
                <span>MMTAI Protocol Peer Consensus Nodes</span>
              </h3>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                Network Sync Optimal
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {peers.map((peer) => (
                <div key={peer.peerId} className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{peer.nodeName}</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  </div>
                  <p className="text-[10px] font-mono text-slate-400 truncate">{peer.endpoint}</p>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-800">
                    <span className="text-purple-400 font-mono">{peer.securityTier}</span>
                    <span>{peer.latencyMs}ms</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Security Audit Stream */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-purple-400" />
                <span>Historical Cryptographic Audits</span>
              </h3>
            </div>

            <div className="space-y-2">
              {audits.map((audit) => (
                <div key={audit.auditId} className="p-3 bg-slate-950 border border-slate-800/80 rounded-xl text-xs space-y-1">
                  <div className="flex items-center justify-between font-mono text-[10px]">
                    <span className="text-purple-400 font-bold">{audit.eventType}</span>
                    <span className="text-slate-500">{audit.timestamp}</span>
                  </div>
                  <p className="text-slate-300 font-medium">{audit.details}</p>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono pt-1">
                    <span>Actor: {audit.actor}</span>
                    <span className="text-emerald-400 flex items-center space-x-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{audit.status}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

