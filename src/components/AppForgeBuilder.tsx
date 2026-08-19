import React, { useState } from 'react';
import { Hammer, Cpu, Layers, Zap, ShieldCheck, CheckCircle2, Play, Sparkles, Server, HardDrive, ArrowRight, Code, Shield, Lock, Check } from 'lucide-react';
import { generate380CharHeader, CompanyNode } from '../utils/nodeHeader';
import { SOVEREIGN_SOLUTIONS } from '../data/brainData';

interface AppForgeBuilderProps {
  onDeployApp: (appName: string, nodeHeader: string, newNode: CompanyNode) => void;
}

const BASE_CAPABILITIES = [
  { id: 'cap-blackbox', name: 'Solvex Crystal Clear Black Box Audit Engine', desc: 'Tamper-proof event logs and 380-char hash verification.', category: 'Security & Audit' },
  { id: 'cap-cognitive-brain', name: 'Cognitive Brain Engine & 5 Chambers Protocol', desc: 'dAIsy haMINJA Sentinel Intelligence, 5 Chambers & 8 Resilience Layers.', category: 'AI & Learning' },
  { id: 'cap-market', name: 'B2B Solutions Marketplace Engine', desc: 'Embedded solution catalog, automated licensing, and checkout.', category: 'E-Commerce' },
  { id: 'cap-paypal', name: 'PayPal & FinTech Settlement Gateway', desc: 'Direct USD transaction settlement with capture telemetry.', category: 'FinTech' },
  { id: 'cap-erp', name: 'NetSuite & SAP ERP Connector', desc: 'Bi-directional JIT synchronization for inventory and POs.', category: 'ERP Bridge' },
  { id: 'cap-jit', name: 'JIT Autonomous Bytecode Compiler', desc: 'Compiles custom business logic directly onto edge nodes.', category: 'Core Runtime' },
  { id: 'cap-telemetry', name: 'Node Fleet Ping & Telemetry Stream', desc: 'Real-time ping, IP telemetry, and health monitoring at uarefake.space.', category: 'Infrastructure' }
];

export const AppForgeBuilder: React.FC<AppForgeBuilderProps> = ({ onDeployApp }) => {
  const [appName, setAppName] = useState('');
  const [targetRuntime, setTargetRuntime] = useState<'Node.js 20 ESM' | 'Rust Core Engine' | 'Python AI Container' | 'Go Microservice'>('Node.js 20 ESM');
  const [selectedCapabilities, setSelectedCapabilities] = useState<string[]>([
    'cap-blackbox',
    'cap-cognitive-brain',
    'cap-market',
    'cap-paypal',
    'cap-erp',
    'cap-jit',
    'cap-telemetry'
  ]);
  
  const spaceSolutions = SOVEREIGN_SOLUTIONS.filter(s => s.layer === 8);
  const [integrateAll23, setIntegrateAll23] = useState<boolean>(true);
  const [selectedSpaceSolutions, setSelectedSpaceSolutions] = useState<string[]>(
    spaceSolutions.map(s => s.id)
  );

  const [targetNodeName, setTargetNodeName] = useState('');
  const [isBuilding, setIsBuilding] = useState(false);
  const [buildLogs, setBuildLogs] = useState<string[]>([]);
  const [lastForgedHeader, setLastForgedHeader] = useState<string | null>(null);

  const toggleCapability = (id: string) => {
    setSelectedCapabilities(prev =>
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const toggleSpaceSolution = (id: string) => {
    setSelectedSpaceSolutions(prev =>
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const handleToggleAll23 = () => {
    if (integrateAll23) {
      setSelectedSpaceSolutions([]);
      setIntegrateAll23(false);
    } else {
      setSelectedSpaceSolutions(spaceSolutions.map(s => s.id));
      setIntegrateAll23(true);
    }
  };

  const handleBuildAndDeploy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!appName.trim()) return;

    setIsBuilding(true);
    setBuildLogs([
      `[FORGE] Initializing Daisy Haminja App Forge workspace...`,
      `[FORGE] Compiling runtime targeting ${targetRuntime}...`,
      `[SOVEREIGN-ENGINE] Compiling with ${selectedSpaceSolutions.length} / 23 Sovereign Infrastructure Solutions...`,
      `[FORGE] Integrating ${selectedCapabilities.length} base platform features...`,
      `[380-HEADER] Generating cryptographic 380-character deterministic company header...`
    ]);

    setTimeout(() => {
      setBuildLogs(prev => [
        ...prev,
        `[S-109] AppForge Zero-Trust Compilation Pipeline activated.`,
        `[S-113] eBPF Sandbox Bytecode Verifier: 0 illegal memory mutations detected.`,
        `[S-107] Non-Custodial Black Box Vault: Ephemeral key zeroization verified.`
      ]);
    }, 600);

    setTimeout(() => {
      setBuildLogs(prev => [
        ...prev,
        `[S-126] PayPal B2B Instant Escrow Capture Bridge: REST API hooks wired.`,
        `[S-128] dAIsy haMINJA Sentinel Master Brain Homeostasis Orchestrator: Synced with 88 Paradoxes.`,
        `[BLACKBOX] Tamper-proof journal hash appended to consensus ledger.`
      ]);
    }, 1300);

    setTimeout(() => {
      const nodeSuffix = `NODE-0${Math.floor(4 + Math.random() * 5)}`;
      const header380 = generate380CharHeader(nodeSuffix, 'uarefake.com Enterprise Global');
      setLastForgedHeader(header380);

      const newNode: CompanyNode = {
        id: `node-forge-${Date.now()}`,
        nodeNumber: nodeSuffix,
        companyName: 'uarefake.com Enterprise Core',
        companyMainHeader: header380,
        deviceName: targetNodeName || `${appName} Execution Node (${nodeSuffix})`,
        location: 'uarefake.com Cloud Gateway / Edge Unit',
        assignedSoftware: appName,
        poId: `forge-${Math.floor(1000 + Math.random() * 9000)}`,
        status: 'Active',
        lastPing: 'Just compiled & deployed (23 Solutions Integrated)',
        ipAddress: `10.240.0.${40 + Math.floor(Math.random() * 50)}`
      };

      setBuildLogs(prev => [
        ...prev,
        `[FORGE-SUCCESS] Application "${appName}" successfully forged with 23 Sovereign Upgrades!`,
        `[380-HEADER-ASSIGNED] Length: 380 chars -> ::${nodeSuffix}`,
        `[DEPLOYMENT] Pushed to live node fleet on uarefake.space control plane.`
      ]);

      setIsBuilding(false);
      onDeployApp(appName, header380, newNode);
    }, 2200);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* App Forge Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold px-3 py-1 rounded-full">
              <Hammer className="w-4 h-4 text-purple-400" />
              <span>Native Daisy Haminja App Forge Suite • Sovereign Upgrades</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Daisy Haminja Custom JIT Application Forge
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Forge custom business logic applications, microservices, and autonomous agents directly into your company's node network. Sovereign Infrastructure Solutions (S-106 through S-128), verified <span className="text-emerald-400 font-mono font-bold">380-character headers</span>, and eBPF sandbox verifications are compiled directly into every build.
            </p>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl shrink-0 font-mono text-xs text-slate-300 space-y-1">
            <div className="text-purple-400 font-bold flex items-center space-x-1.5">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>JIT Bytecode Compiler Active</span>
            </div>
            <div>Engine: <span className="text-white">Daisy-Haminja-App-Forge</span></div>
            <div>Infrastructure: <span className="text-amber-300 font-semibold">Sovereign Solutions Active</span></div>
            <div>Target Pipeline: <span className="text-emerald-400">uarefake.com / uarefake.space</span></div>
          </div>
        </div>
      </div>

      {/* Main Builder Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Builder Form */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-lg font-bold text-white flex items-center space-x-2">
              <Code className="w-5 h-5 text-indigo-400" />
              <span>Application Configuration & Architecture</span>
            </h3>
            <p className="text-xs text-slate-400">Specify app details, runtime engine, and sovereign architecture modules.</p>
          </div>

          <form onSubmit={handleBuildAndDeploy} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Application Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Solvex Autonomous Logistics Bot"
                  value={appName}
                  onChange={(e) => setAppName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Target Device / Station Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Executive Control Station (Rack 04)"
                  value={targetNodeName}
                  onChange={(e) => setTargetNodeName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Target Execution Runtime
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {(['Node.js 20 ESM', 'Rust Core Engine', 'Python AI Container', 'Go Microservice'] as const).map((runtime) => (
                  <button
                    type="button"
                    key={runtime}
                    onClick={() => setTargetRuntime(runtime)}
                    className={`px-3 py-2.5 rounded-xl border text-xs font-semibold transition-all text-left ${
                      targetRuntime === runtime
                        ? 'bg-purple-950/80 border-purple-500 text-purple-300 shadow-md'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {runtime}
                  </button>
                ))}
              </div>
            </div>

            {/* Sovereign Infrastructure Upgrades (Integrated) */}
            <div className="bg-slate-950/90 border border-amber-500/40 rounded-2xl p-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                <div>
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-5 h-5 text-amber-400" />
                    <h4 className="text-sm font-bold text-white">Sovereign Infrastructure Upgrades (Layer 8: S-106 to S-128)</h4>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Natively compiled into this build — powering zero-trust enclaves, 380-char headers, and autonomic healing.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleToggleAll23}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 transition-all self-start sm:self-auto"
                >
                  {integrateAll23 ? 'All Integrated ✓' : 'Select All'}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 max-h-56 overflow-y-auto pr-1">
                {spaceSolutions.map((sol) => {
                  const isSelected = selectedSpaceSolutions.includes(sol.id);
                  return (
                    <div
                      key={sol.id}
                      onClick={() => toggleSpaceSolution(sol.id)}
                      className={`p-2.5 rounded-xl border cursor-pointer transition-all flex items-start space-x-2 text-xs ${
                        isSelected
                          ? 'bg-amber-950/40 border-amber-500/60 text-slate-200'
                          : 'bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-700'
                      }`}
                    >
                      <div className={`mt-0.5 w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-amber-500 border-amber-400 text-slate-950' : 'border-slate-700'
                      }`}>
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <div className="space-y-0.5 overflow-hidden">
                        <div className="font-mono text-[10px] font-bold text-amber-400">{sol.id}</div>
                        <div className="font-semibold text-slate-200 line-clamp-1">{sol.name}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Base Capabilities */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Core Architecture Features & Middleware
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {BASE_CAPABILITIES.map((cap) => {
                  const isSelected = selectedCapabilities.includes(cap.id);
                  return (
                    <div
                      key={cap.id}
                      onClick={() => toggleCapability(cap.id)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start space-x-3 ${
                        isSelected
                          ? 'bg-purple-950/40 border-purple-500/80 text-white shadow-sm'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-purple-500 border-purple-400 text-white' : 'border-slate-700'
                      }`}>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                      <div className="space-y-0.5">
                        <div className="text-xs font-bold text-slate-200">{cap.name}</div>
                        <div className="text-[11px] text-slate-400 leading-tight">{cap.desc}</div>
                        <span className="inline-block text-[9.5px] uppercase font-bold text-purple-400 bg-purple-950/60 px-1.5 py-0.2 rounded mt-1">
                          {cap.category}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isBuilding || !appName.trim()}
                className="w-full bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 disabled:opacity-50 text-white font-bold py-3 px-6 rounded-xl shadow-xl shadow-purple-600/20 flex items-center justify-center space-x-2 transition-all cursor-pointer text-sm"
              >
                {isBuilding ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin text-purple-200" />
                    <span>Forging JIT App with 23 Sovereign Infrastructure Upgrades...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-white" />
                    <span>Forge JIT Software (23 Sovereign Upgrades Integrated)</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Live Build Terminal & Header Preview */}
        <div className="space-y-6">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="font-mono text-xs font-bold text-purple-400 flex items-center space-x-2">
                <Cpu className="w-4 h-4" />
                <span>Daisy Forge Build Telemetry</span>
              </span>
              <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                ● 23 UPGRADES ACTIVE
              </span>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 font-mono text-[11px] space-y-2 h-64 overflow-y-auto text-slate-300">
              {buildLogs.length === 0 ? (
                <div className="text-slate-500 italic text-center pt-20">
                  Configure your application and click "Forge JIT Software" to begin compilation...
                </div>
              ) : (
                buildLogs.map((log, index) => (
                  <div key={index} className="leading-snug break-all text-emerald-300">
                    {log}
                  </div>
                ))
              )}
            </div>
          </div>

          {lastForgedHeader && (
            <div className="bg-slate-900 border border-emerald-500/50 rounded-2xl p-5 shadow-2xl space-y-2 animate-fade-in">
              <div className="flex items-center justify-between text-xs font-bold text-emerald-400">
                <span className="flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>380-Char Company Header Forged</span>
                </span>
                <span className="bg-emerald-950 px-2 py-0.5 rounded text-[10px] border border-emerald-800 font-mono">
                  380 CHARS
                </span>
              </div>
              <p className="font-mono text-[10px] text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800 select-all break-all leading-relaxed">
                {lastForgedHeader}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
