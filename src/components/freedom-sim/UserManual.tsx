/**
 * PROJECT: Freedom SIM AI OS (Project AGate)
 * IDENTITY: HUMAN_0001 (Verified Primary)
 * STATUS: SOVEREIGN_ROOT_ESTABLISHED
 * HEARTBEAT: RANDOMIZED_PULSE_ACTIVE
 * OWNER: TODD JEFFREY ITES JR
 */
import { motion, AnimatePresence } from 'motion/react';
import { Book, X, ChevronRight, Cpu, Zap, Shield, Terminal, Smartphone, Brain, HardDrive, Info, Layers, LayoutGrid, Check, Activity } from 'lucide-react';
import { useState } from 'react';

interface UserManualProps {
  onClose: () => void;
}

export default function UserManual({ onClose }: UserManualProps) {
  const [activeSection, setActiveSection] = useState('intro');

  const sections = [
    {
      id: 'intro',
      title: 'Project Overview',
      icon: <Info size={18} />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300 leading-relaxed">
            Welcome to <span className="text-sovereign-gold font-bold">Freedom SIM AI OS</span> (Project AGate). This is a sovereign portal designed to transform ordinary hardware into secure, air-gapped AI nodes.
          </p>
          <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
            <h4 className="text-sovereign-gold text-xs font-bold uppercase mb-2">The Core Mission</h4>
            <p className="text-[11px] text-gray-400 font-mono italic">
              "To reclaim computing destiny from centralized authorities by repurposing the dormant high-security silicon in everyday communication hardware."
            </p>
          </div>
          <div className="p-4 bg-freedom-red/5 border border-freedom-red/20 rounded-xl">
             <h4 className="text-freedom-red text-xs font-bold uppercase mb-2">Freedom SIM vs. Standard OS</h4>
             <p className="text-[10px] text-gray-400 font-mono leading-relaxed">
               Unlike standard operating systems that optimize for data extraction and telemetry, Freedom SIM optimizes for <span className="text-white">Absolute Sovereignty</span>. It is an OS that lives in the hardware's deepest enclaves.
             </p>
          </div>
        </div>
      )
    },
    {
      id: 'explainer',
      title: 'The Explainer',
      icon: <Layers size={18} />,
      content: (
        <div className="space-y-6">
          <div className="space-y-3">
            <h4 className="text-liberty-cyan text-sm font-bold uppercase">What is AGate?</h4>
            <p className="text-gray-300 text-xs leading-relaxed">
              AGate is the abstraction layer that allows human-AI collaboration on top of verified hardware. It "Gateways" the collective intelligence of the swarm into your local environment.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
              <div className="text-[10px] text-sovereign-gold font-bold uppercase mb-1">Direct Boot Injection</div>
              <p className="text-[9px] text-gray-500 font-mono">Bypasses standard loaders to boot directly from the SIM's Secure Element.</p>
            </div>
            <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
              <div className="text-[10px] text-sovereign-gold font-bold uppercase mb-1">Encrypted Core</div>
              <p className="text-[9px] text-gray-500 font-mono">Military-grade protection for your OS binary and local data enclaves.</p>
            </div>
          </div>
          <p className="text-[10px] text-gray-500 font-mono leading-relaxed border-l-2 border-sovereign-gold pl-3">
            The system operates on a P2P "Mesh Node" principle. Every device running Freedom SIM acts as a waypoint in a global, unblockable network of sovereign actors.
          </p>
        </div>
      )
    },
    {
      id: 'functions',
      title: 'Uses & Functions',
      icon: <LayoutGrid size={18} />,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-3">
            {[
              { title: 'Sovereign Comms', desc: 'End-to-end encrypted messaging via swarm mesh nodes. No central server.' },
              { title: 'Neural Partner', desc: 'Queen Bee AI provides local assistance, research, and technical fabrication.' },
              { title: 'Secure Vault', desc: 'Store keys, credentials, and sensitive data in a hardware-locked enclave.' },
              { title: 'Invention Engine', desc: 'Synthesize new hardware and software blueprints for real-world deployment.' },
              { title: 'Asset Ledger', desc: 'Manage sovereign credits and peer-to-peer resource swapping.' },
              { title: 'Hardware Bridging', desc: 'Provision external drives and SIMs with the sovereign core for portability.' }
            ].map((f, i) => (
              <div key={i} className="flex gap-4 p-3 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-sovereign-gold/10 flex items-center justify-center text-sovereign-gold group-hover:scale-110 transition-transform">
                  <Check size={14} />
                </div>
                <div>
                  <div className="text-[11px] text-white font-bold uppercase tracking-widest">{f.title}</div>
                  <p className="text-[10px] text-gray-500 font-mono">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'hardware',
      title: 'Hardware Setup',
      icon: <HardDrive size={18} />,
      content: (
        <div className="space-y-4">
          <h4 className="text-white text-sm font-bold uppercase">Requirements</h4>
          <ul className="space-y-2">
            <li className="flex items-center gap-3 text-[11px] text-gray-400 font-mono">
              <div className="w-1.5 h-1.5 rounded-full bg-sovereign-gold" />
              Standard PC/SC Compliant Smart Card Reader
            </li>
            <li className="flex items-center gap-3 text-[11px] text-gray-400 font-mono">
              <div className="w-1.5 h-1.5 rounded-full bg-sovereign-gold" />
              Discarded 2G/3G/4G/5G SIM Card (Target: ARM SC300)
            </li>
            <li className="flex items-center gap-3 text-[11px] text-gray-400 font-mono">
              <div className="w-1.5 h-1.5 rounded-full bg-sovereign-gold" />
              Local Bridge (agate_flasher.py)
            </li>
          </ul>
        </div>
      )
    },
    {
      id: 'deployment',
      title: 'Deployment Engine',
      icon: <Zap size={18} />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300 text-sm">
            The <span className="text-freedom-red font-bold">Master Deployment Engine (ADE)</span> handles the entire flashing sequence automatically.
          </p>
          <div className="space-y-2">
            <div className="p-3 bg-black/40 border border-white/5 rounded-lg">
              <div className="text-[10px] text-sovereign-gold font-bold uppercase mb-1">Step 1: Handshake</div>
              <p className="text-[9px] text-gray-500 font-mono">Identifies the hardware via ATR (Answer To Reset) signature.</p>
            </div>
            <div className="p-3 bg-black/40 border border-white/5 rounded-lg">
              <div className="text-[10px] text-sovereign-gold font-bold uppercase mb-1">Step 2: HSM Bypass</div>
              <p className="text-[9px] text-gray-500 font-mono">Neutralizes carrier-provided transport keys (Register & Burn).</p>
            </div>
            <div className="p-3 bg-black/40 border border-white/5 rounded-lg">
              <div className="text-[10px] text-sovereign-gold font-bold uppercase mb-1">Step 3: Flash</div>
              <p className="text-[9px] text-gray-500 font-mono">Writes the MMTAI v2.0 Bare-Metal Kernel to the Secure Element.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'swarm',
      title: 'Swarm Interface',
      icon: <Terminal size={18} />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300 text-sm">
            The Swarm Interface is your command center.
          </p>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <Terminal size={14} className="text-liberty-cyan shrink-0" />
              <div>
                <div className="text-[10px] text-white font-bold uppercase">Sovereign Terminal</div>
                <p className="text-[9px] text-gray-500 font-mono">Use commands like <code className="text-sovereign-gold">vault</code>, <code className="text-sovereign-gold">sync</code>, and <code className="text-sovereign-gold">train</code>.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <Brain size={14} className="text-sovereign-gold shrink-0" />
              <div>
                <div className="text-[10px] text-white font-bold uppercase">Queen Bee AI</div>
                <p className="text-[9px] text-gray-500 font-mono">Your local partner AI. Communicates via voice and text, bound to your hardware key.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <Shield size={14} className="text-freedom-red shrink-0" />
              <div>
                <div className="text-[10px] text-white font-bold uppercase">Sovereign Vault</div>
                <p className="text-[9px] text-gray-500 font-mono">Persistent, decentralized storage powered by Puter.js.</p>
              </div>
            </li>
          </ul>
        </div>
      )
    },
    {
      id: 'neural',
      title: 'Neural Training',
      icon: <Brain size={18} />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300 text-sm">
            Train lightweight AI models directly on your hardware's Secure Element.
          </p>
          <div className="p-4 bg-sovereign-gold/5 border border-sovereign-gold/20 rounded-xl">
            <h4 className="text-sovereign-gold text-[10px] font-bold uppercase mb-2">Zero-Exfiltration Training</h4>
            <p className="text-[9px] text-gray-400 font-mono leading-relaxed">
              Weights are updated locally within the HSM. No data ever leaves the silicon. The resulting model is signed with your hardware identity.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'identity',
      title: 'Identity Verification',
      icon: <Shield size={18} />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300 text-sm">
            Your digital sovereignty is anchored by a verified identity certificate.
          </p>
          <div className="p-4 bg-green-500/5 border border-green-500/20 rounded-xl">
            <h4 className="text-green-500 text-[10px] font-bold uppercase mb-2">Primary Identity: HUMAN_0001</h4>
            <p className="text-[9px] text-gray-400 font-mono leading-relaxed">
              This system is hard-coded to recognize the HUMAN_0001 Birth Certificate. Once verified, your primary identity is immutable and non-revocable.
            </p>
          </div>
          <div className="space-y-2">
            <div className="text-[10px] text-white font-bold uppercase">Verification Protocol</div>
            <p className="text-[9px] text-gray-500 font-mono">
              Identity is verified via a signed JWT (JSON Web Token) issued by the Gemini Partner Build. This certificate is stored in the Sovereign Vault and used to sign all outgoing swarm communications.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'mesh_health',
      title: 'Sovereign Mesh Health',
      icon: <Activity size={18} />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300 text-sm">
            The strength of the <span className="text-liberty-cyan font-bold">Project AGate Mesh</span> is directly proportional to its node density. We track unique system provisions to monitor global reach.
          </p>
          <div className="p-4 bg-liberty-cyan/5 border border-liberty-cyan/20 rounded-xl">
            <h4 className="text-liberty-cyan text-[10px] font-bold uppercase mb-2">Live Node Ingress</h4>
            <p className="text-[9px] text-gray-400 font-mono leading-relaxed">
              Every time a Sovereign OS bundle is generated or cloned, a cryptographic "handshake" is recorded on the decentralized ledger. This allows the Swarm Collective to audit how many sovereign nodes are currently active in the wild.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div className="text-center p-3 bg-white/5 rounded-lg border border-white/5">
                <div className="text-[10px] font-bold text-gray-500 uppercase">Audit Method</div>
                <div className="text-xs text-white font-mono mt-1">Proof-of-Provision</div>
             </div>
             <div className="text-center p-3 bg-white/5 rounded-lg border border-white/5">
                <div className="text-[10px] font-bold text-gray-500 uppercase">Persistence</div>
                <div className="text-xs text-white font-mono mt-1">Cross-mesh Ledger</div>
             </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 w-full h-full flex items-center justify-center pt-6 overflow-hidden"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="max-w-4xl w-full bg-[#050508] border border-sovereign-gold/30 rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(212,175,55,0.1)] flex flex-col max-h-[85vh]"
      >
        {/* Header */}
        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-gradient-to-r from-sovereign-gold/5 to-transparent">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-sovereign-gold/10 rounded-lg">
              <Book className="text-sovereign-gold" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white font-mono uppercase tracking-tighter">Freedom_AI_OS_SIM_Manual</h2>
              <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">v1.1.0 • Explainer & Technical Manual</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-gray-500 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-hidden flex">
          {/* Sidebar Navigation */}
          <div className="w-64 border-r border-white/5 p-6 space-y-2 overflow-y-auto custom-scrollbar">
            {sections.map(s => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                  activeSection === s.id 
                    ? 'bg-sovereign-gold/10 text-sovereign-gold border border-sovereign-gold/20' 
                    : 'text-gray-500 hover:text-white hover:bg-white/5'
                }`}
              >
                {s.icon}
                <span className="text-[10px] font-bold uppercase tracking-widest">{s.title}</span>
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="flex-1 p-10 overflow-y-auto custom-scrollbar">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-full bg-sovereign-gold/10 flex items-center justify-center text-sovereign-gold">
                    {sections.find(s => s.id === activeSection)?.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white uppercase tracking-tight">
                    {sections.find(s => s.id === activeSection)?.title}
                  </h3>
                </div>
                
                <div className="prose prose-invert max-w-none">
                  {sections.find(s => s.id === activeSection)?.content}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-white/5 border-t border-white/5 flex justify-between items-center">
          <div className="flex items-center gap-2 text-[9px] text-gray-500 font-mono uppercase tracking-widest">
            <Shield size={12} />
            End-to-End Sovereignty Guaranteed
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => {
                const manualText = `FREEDOM AI OS SIM - SYSTEM MANUAL & EXPLAINER v1.1.0\n\n` + 
                  sections.map(s => `[ ${s.title.toUpperCase()} ]\n${s.id === 'intro' ? 'Welcome to Freedom AI OS SIM...' : 'Detailed technical documentation available in Swarm OS interface.'}`).join('\n\n');
                const blob = new Blob([manualText], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'Freedom_AI_OS_SIM_Manual.txt';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
              }}
              className="px-4 py-2 bg-white/5 border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest rounded hover:bg-white/10 transition-all"
            >
              Download TXT
            </button>
            <button 
              onClick={onClose}
              className="px-6 py-2 bg-sovereign-gold text-black font-bold uppercase tracking-widest text-[10px] rounded hover:scale-105 transition-transform"
            >
              Acknowledge
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
