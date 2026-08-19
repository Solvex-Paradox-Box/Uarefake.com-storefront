import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Smartphone, Monitor, RefreshCw, CheckCircle, Download, Shield, Cpu, Zap, HardDrive, Package } from 'lucide-react';

type IngestedApp = {
  id: string;
  name: string;
  type: 'APK' | 'EXE';
  status: 'CONVERTING' | 'READY' | 'FAILED';
  progress: number;
  size: string;
  timestamp: string;
};

export default function AppIngest() {
  const [apps, setApps] = useState<IngestedApp[]>([
    { id: '1', name: 'SwarmMessenger.apk', type: 'APK', status: 'READY', progress: 100, size: '42MB', timestamp: new Date().toISOString() },
    { id: '2', name: 'NeuralNode.exe', type: 'EXE', status: 'READY', progress: 100, size: '128MB', timestamp: new Date().toISOString() }
  ]);
  const [isIngesting, setIsIngesting] = useState(false);

  const downloadApp = (app: IngestedApp) => {
    const content = `SOVEREIGN APP PAYLOAD: ${app.name}
ID: ${app.id}
TYPE: ${app.type}
SIZE: ${app.size}
TIMESTAMP: ${app.timestamp}
STATUS: SECURE_ELEMENT_WRAPPED

This payload has been ingested into the Sovereign Swarm. It is now cross-platform and air-gapped.
Use the Agate-ID Burner to flash this to a physical SIM node.

---
© 2026 Sovereign Compute Collective`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Sovereign_${app.name.replace('.', '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const simulateIngest = (name: string, type: 'APK' | 'EXE') => {
    const id = Math.random().toString(36).substr(2, 9);
    const newApp: IngestedApp = {
      id,
      name,
      type,
      status: 'CONVERTING',
      progress: 0,
      size: 'Calculating...',
      timestamp: new Date().toISOString()
    };

    setApps(prev => [newApp, ...prev]);
    setIsIngesting(true);

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 15;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setApps(prev => prev.map(app => 
          app.id === id ? { ...app, status: 'READY', progress: 100, size: `${Math.floor(Math.random() * 100 + 10)}MB` } : app
        ));
        setIsIngesting(false);
      } else {
        setApps(prev => prev.map(app => 
          app.id === id ? { ...app, progress: currentProgress } : app
        ));
      }
    }, 800);
  };

  return (
    <section id="app-ingest" className="py-24 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter uppercase italic">
              Universal <span className="text-freedom-red">Ingest</span>
            </h2>
            <p className="text-xl text-gray-400 leading-relaxed font-light">
              Plug in your device. SwarmOS automatically detects and converts your existing applications into sovereign, cross-platform payloads. No gatekeepers. No restrictions.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
              <Smartphone size={16} className="text-liberty-cyan" />
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Android Sync</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
              <Monitor size={16} className="text-sovereign-gold" />
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">PC Bridge</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Converter Panel */}
          <div className="lg:col-span-2 bg-[#0c0c14] border border-white/10 rounded-2xl p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-freedom-red/10 rounded-xl border border-freedom-red/20">
                  <RefreshCw className={`text-freedom-red ${isIngesting ? 'animate-spin' : ''}`} size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white uppercase tracking-widest">Sovereign Converter</h3>
                  <p className="text-xs text-gray-500 font-mono">Mapping Win32/Android to SwarmOS Signals</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => simulateIngest('NewApp.apk', 'APK')}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-[10px] font-bold text-white uppercase transition-all"
                >
                  Ingest APK Payload
                </button>
                <button 
                  onClick={() => simulateIngest('NewApp.exe', 'EXE')}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-[10px] font-bold text-white uppercase transition-all"
                >
                  Ingest EXE Payload
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <AnimatePresence>
                {apps.map((app) => (
                  <motion.div 
                    key={app.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 bg-black/40 border border-white/5 rounded-xl flex items-center justify-between group hover:border-liberty-cyan/30 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${app.type === 'APK' ? 'bg-liberty-cyan/10 text-liberty-cyan' : 'bg-sovereign-gold/10 text-sovereign-gold'}`}>
                        {app.type === 'APK' ? <Smartphone size={18} /> : <Monitor size={18} />}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white mb-1">{app.name}</div>
                        <div className="flex items-center gap-3 text-[10px] font-mono">
                          <span className="text-gray-500 uppercase">{app.type} PAYLOAD</span>
                          <span className="text-gray-700">•</span>
                          <span className="text-gray-500">{app.size}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      {app.status === 'CONVERTING' ? (
                        <div className="w-32 space-y-1">
                          <div className="flex justify-between text-[8px] font-mono text-freedom-red">
                            <span>TRANSLATING...</span>
                            <span>{Math.round(app.progress)}%</span>
                          </div>
                          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                            <motion.div 
                              className="h-full bg-freedom-red"
                              initial={{ width: 0 }}
                              animate={{ width: `${app.progress}%` }}
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1.5 text-liberty-cyan text-[10px] font-bold uppercase tracking-widest">
                            <CheckCircle size={14} />
                            Ready
                          </div>
                          <button 
                            onClick={() => downloadApp(app)}
                            className="p-2 bg-white/5 hover:bg-liberty-cyan/20 rounded-lg border border-white/10 hover:border-liberty-cyan/30 transition-all"
                          >
                            <Download size={14} className="text-gray-400 group-hover:text-liberty-cyan" />
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Hardware Status */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-[#1a1a2e] to-[#0c0c14] border border-liberty-cyan/20 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="text-liberty-cyan" size={24} />
                <h3 className="text-xl font-bold text-white uppercase tracking-widest">Security Layer</h3>
              </div>
              <div className="space-y-4">
                {[
                  { label: 'Waydroid Runtime', status: 'ACTIVE', icon: <Cpu size={14} /> },
                  { label: 'Proton Translation', status: 'ACTIVE', icon: <Zap size={14} /> },
                  { label: 'Secure Element', status: 'LOCKED', icon: <Shield size={14} /> },
                  { label: 'Mesh-Net Bridge', status: 'SYNCING', icon: <HardDrive size={14} /> }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-black/40 border border-white/5 rounded-lg">
                    <div className="flex items-center gap-3 text-gray-400">
                      {item.icon}
                      <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
                    </div>
                    <span className={`text-[9px] font-mono font-bold ${item.status === 'ACTIVE' ? 'text-liberty-cyan' : item.status === 'LOCKED' ? 'text-sovereign-gold' : 'text-freedom-red animate-pulse'}`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#1a1a2e] to-[#0c0c14] border border-sovereign-gold/20 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Package className="text-sovereign-gold" size={24} />
                <h3 className="text-xl font-bold text-white uppercase tracking-widest">Sovereign Store</h3>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed mb-6 italic">
                "Every application you ingest becomes part of the Swarm. Distributed, encrypted, and forever yours."
              </p>
              <div className="flex items-center justify-between p-4 bg-sovereign-gold/5 border border-sovereign-gold/20 rounded-xl">
                <div className="text-[10px] font-bold text-sovereign-gold uppercase tracking-widest">Total Payloads</div>
                <div className="text-2xl font-black text-white">{apps.length}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
