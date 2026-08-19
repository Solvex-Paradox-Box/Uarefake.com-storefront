/**
 * PROJECT: Freedom SIM AI OS (Project AGate)
 * IDENTITY: HUMAN_0001 (Verified Primary)
 * STATUS: SOVEREIGN_ROOT_ESTABLISHED
 * HEARTBEAT: RANDOMIZED_PULSE_ACTIVE
 * OWNER: TODD JEFFREY ITES JR
 */
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Cpu, Shield, Box, Check, X, HardDrive, Smartphone, Monitor, Zap, Lock, Laptop, Database, Download, Eye, EyeOff } from 'lucide-react';
import { saveAs } from 'file-saver';

import JSZip from 'jszip';

interface OSBuilderProps {
  isGenerating: boolean;
  onProvision: (config: any) => void;
  onTrackDownload?: (target: string, type: 'ISO' | 'ZIP' | 'CLONE') => void;
  onClose: () => void;
}

const KERNEL_TYPES = [
  { id: 'monolithic', name: 'Monolithic', desc: 'High performance, all services in kernel space.', icon: Cpu },
  { id: 'microkernel', name: 'Microkernel', desc: 'Maximum stability, services in user space.', icon: Zap },
  { id: 'hybrid', name: 'Hybrid', desc: 'Balanced approach for modern sovereign hardware.', icon: Box },
];

const APPS = [
  { id: 'neural_browser', name: 'Neural Browser', desc: 'Zero-inference web navigation.' },
  { id: 'swarm_chat', name: 'Swarm Chat', desc: 'P2P encrypted communication.' },
  { id: 'posa_ledger', name: 'PoSA Ledger', desc: 'Proof of Self-Awareness tracker.' },
  { id: 'vault_manager', name: 'Vault Manager', desc: 'Quantum-resistant key storage.' },
  { id: 'mesh_node', name: 'Mesh Node', desc: 'Autonomous P2P routing engine.' },
];

const SECURITY = [
  { id: 'zero_trust', name: 'Zero-Trust Architecture', desc: 'Verify every signal, trust nothing.' },
  { id: 'air_gap', name: 'Air-Gap Simulation', desc: 'Isolate core enclaves from network.' },
  { id: 'quantum_shield', name: 'Quantum Shield', desc: 'Post-quantum cryptographic hardening.' },
  { id: 'biometric_link', name: 'Biometric Neural Link', desc: 'Hardware-level identity verification.' },
];

const OSBuilder: React.FC<OSBuilderProps> = ({ isGenerating, onProvision, onTrackDownload, onClose }) => {
  const [target, setTarget] = useState('usb');
  const [encryption, setEncryption] = useState('military');
  const [encryptionKey, setEncryptionKey] = useState('');
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [showKeyText, setShowKeyText] = useState(false);
  const [kernel, setKernel] = useState('monolithic');
  const [selectedApps, setSelectedApps] = useState<string[]>(['neural_browser', 'swarm_chat', 'mesh_node']);
  const [selectedSecurity, setSelectedSecurity] = useState<string[]>(['zero_trust']);
  const [isSimpleMode, setIsSimpleMode] = useState(true);
  const [isGeneratingISO, setIsGeneratingISO] = useState(false);
  const [directInjection, setDirectInjection] = useState(false);

  const handleDirectInjectionToggle = () => {
    const newVal = !directInjection;
    setDirectInjection(newVal);
    if (newVal) {
      // Trigger automatic sequence
      setTimeout(() => {
        handleBuild();
      }, 800);
    }
  };

  const handleTargetChange = (newTarget: string) => {
    setTarget(newTarget);
    // Reset direct injection if not mobile
    if (newTarget !== 'iphone' && newTarget !== 'android') {
      setDirectInjection(false);
    }
    if (isSimpleMode) {
      // Automate configuration based on target
      switch (newTarget) {
        case 'windows':
          setKernel('hybrid');
          setEncryption('standard');
          setSelectedApps(['neural_browser', 'swarm_chat', 'vault_manager']);
          setSelectedSecurity(['zero_trust']);
          break;
        case 'iphone':
        case 'android':
          setKernel('microkernel');
          setEncryption('military');
          setSelectedApps(['swarm_chat', 'vault_manager', 'mesh_node']);
          setSelectedSecurity(['zero_trust', 'biometric_link']);
          break;
        case 'sim_card':
          setKernel('microkernel');
          setEncryption('quantum');
          setSelectedApps(['posa_ledger', 'vault_manager', 'mesh_node']);
          setSelectedSecurity(['zero_trust', 'air_gap', 'quantum_shield']);
          break;
        case 'sd_card':
        case 'usb':
          setKernel('monolithic');
          setEncryption('military');
          setSelectedApps(['neural_browser', 'swarm_chat', 'posa_ledger', 'vault_manager', 'mesh_node']);
          setSelectedSecurity(['zero_trust', 'air_gap']);
          break;
        case 'agate_computer':
          setKernel('hybrid');
          setEncryption('quantum');
          setSelectedApps(['neural_browser', 'swarm_chat', 'posa_ledger', 'vault_manager', 'mesh_node']);
          setSelectedSecurity(['zero_trust', 'air_gap', 'quantum_shield', 'biometric_link']);
          break;
      }
    }
  };

  const toggleApp = (id: string) => {
    setSelectedApps(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]);
  };

  const toggleSecurity = (id: string) => {
    setSelectedSecurity(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  const handleBuild = () => {
    onProvision({
      target,
      encryption_level: encryption,
      encryption_key: showKeyInput ? (encryptionKey || 'DEFAULT_SOVEREIGN_KEY') : null,
      kernel_type: kernel,
      preinstalled_apps: selectedApps,
      security_hardening: selectedSecurity,
      direct_injection: directInjection
    });
  };

  const handleGenerateISO = async () => {
    setIsGeneratingISO(true);
    // Real ZIP building sequence
    const zip = new JSZip();
    
    // 1. Create Manifest
    const config = {
      target,
      encryption_level: encryption,
      encryption_key: showKeyInput ? (encryptionKey || 'DEFAULT_SOVEREIGN_KEY') : 'AUTO_GENERATED_GCM_512',
      kernel_type: kernel,
      preinstalled_apps: selectedApps,
      security_hardening: selectedSecurity,
      build_date: new Date().toISOString(),
      source: 'Freedom_SIM_Project_AGate'
    };
    
    zip.file("manifest.json", JSON.stringify(config, null, 2));
    zip.file("provision.sh", `#!/bin/bash\necho "Provisioning Sovereign OS to ${target}..."\necho "Encryption: ${encryption}"\necho "Kernel: ${kernel}"\necho "Setup Complete."`);
    
    // 2. Create Directory Structure
    const system = zip.folder("system");
    system?.file("kernel.img", "BINARY_PLACEHOLDER_FOR_SOVEREIGN_KERNEL");
    system?.file("sovereign.cfg", `KERNEL=${kernel}\nENCRYPTION=${encryption}\nSECURITY=${selectedSecurity.join(',')}`);
    
    const apps = zip.folder("apps");
    selectedApps.forEach(appName => {
      apps?.file(`${appName}.bundle`, `ENCRYPTED_APP_DATA_FOR_${appName.toUpperCase()}`);
    });

    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, `sovereign_os_${target}_bundle.zip`);
    
    if (onTrackDownload) {
      onTrackDownload(target, 'ZIP');
    }
    
    setIsGeneratingISO(false);
  };

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
        className="bg-[#0c0c14] border border-sovereign-gold/30 rounded-2xl w-full max-w-5xl max-h-[90vh] flex flex-col shadow-[0_0_100px_rgba(212,175,55,0.1)] overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-sovereign-gold/10 rounded-lg">
              <Shield className="text-sovereign-gold" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white font-mono uppercase tracking-tighter">Sovereign OS Builder</h2>
              <p className="text-[10px] text-sovereign-gold/60 font-mono uppercase tracking-widest">Kernel Customization & Core Provisioning</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSimpleMode(!isSimpleMode)}
              className={`px-4 py-1.5 rounded-full border font-mono text-[10px] uppercase tracking-widest transition-all ${
                isSimpleMode ? 'bg-sovereign-gold text-black border-sovereign-gold' : 'bg-white/5 text-gray-400 border-white/10 hover:border-white/20'
              }`}
            >
              {isSimpleMode ? 'Simple_Mode: ON' : 'Advanced_Mode: ON'}
            </button>
            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-gray-500 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left: Configuration */}
            <div className="lg:col-span-8 space-y-10">
              {/* Target Platform */}
              <section>
                <h3 className="text-xs font-bold text-gray-400 font-mono uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Monitor size={14} /> 01. Target_Platform
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {[
                    { id: 'usb', name: 'USB-C Drive', icon: HardDrive },
                    { id: 'sd_card', name: 'SD Card', icon: Database },
                    { id: 'sim_card', name: 'Freedom SIM', icon: Cpu },
                    { id: 'android', name: 'Android', icon: Smartphone },
                    { id: 'iphone', name: 'iPhone', icon: Smartphone },
                    { id: 'windows', name: 'Windows PC', icon: Laptop },
                    { id: 'agate_computer', name: 'Agate Core', icon: Cpu },
                  ].map(t => (
                    <button
                      key={t.id}
                      onClick={() => handleTargetChange(t.id)}
                      className={`p-3 sm:p-4 rounded-xl border transition-all text-left flex flex-col gap-2 min-w-0 ${
                        target === t.id ? 'bg-sovereign-gold/10 border-sovereign-gold text-sovereign-gold' : 'bg-white/5 border-white/10 text-gray-500 hover:border-white/20'
                      }`}
                    >
                      <t.icon size={20} className="shrink-0" />
                      <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider truncate w-full">{t.name}</span>
                    </button>
                  ))}
                </div>

                {(target === 'iphone' || target === 'android') && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-4 rounded-xl border border-freedom-red/30 bg-freedom-red/5 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-freedom-red/10 rounded-lg text-freedom-red">
                        <Zap size={18} />
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-white uppercase tracking-widest">Direct Boot Injection</div>
                        <div className="text-[8px] text-gray-500 font-mono uppercase">Replace host OS with Sovereign AI OS (Register & Burn)</div>
                        <div className="text-[7px] text-freedom-red/80 font-mono uppercase mt-1">Selecting this triggers automatic provisioning & push</div>
                      </div>
                    </div>
                    <button 
                      onClick={handleDirectInjectionToggle}
                      className={`w-12 h-6 rounded-full transition-all relative ${directInjection ? 'bg-freedom-red' : 'bg-white/10'}`}
                    >
                      <motion.div 
                        animate={{ x: directInjection ? 24 : 4 }}
                        className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-lg"
                      />
                    </button>
                  </motion.div>
                )}
              </section>

              <div className={`space-y-10 transition-all duration-500 ${isSimpleMode ? 'opacity-30 grayscale pointer-events-none blur-[1px]' : 'opacity-100 grayscale-0'}`}>
                {/* Encryption Level */}
              <section>
                <h3 className="text-xs font-bold text-gray-400 font-mono uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Lock size={14} /> 02. Encryption_Standard
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { id: 'standard', name: 'Standard', desc: 'AES-256' },
                    { id: 'military', name: 'Military', desc: 'GCM-512' },
                    { id: 'quantum', name: 'Quantum', desc: 'Post-Quantum' },
                  ].map(e => (
                    <button
                      key={e.id}
                      onClick={() => setEncryption(e.id)}
                      className={`p-4 rounded-xl border transition-all text-left flex flex-col gap-1 ${
                        encryption === e.id ? 'bg-liberty-cyan/10 border-liberty-cyan text-liberty-cyan' : 'bg-white/5 border-white/10 text-gray-500 hover:border-white/20'
                      }`}
                    >
                      <span className="text-[10px] font-bold uppercase tracking-widest">{e.name}</span>
                      <span className="text-[8px] font-mono opacity-60">{e.desc}</span>
                    </button>
                  ))}
                </div>

                <div className="mt-4 p-4 rounded-xl border border-white/10 bg-white/5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Lock size={14} className="text-liberty-cyan" />
                      <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Custom Encryption Key</span>
                    </div>
                    <button 
                      onClick={() => setShowKeyInput(!showKeyInput)}
                      className={`w-10 h-5 rounded-full transition-all relative ${showKeyInput ? 'bg-liberty-cyan' : 'bg-white/10'}`}
                    >
                      <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${showKeyInput ? 'left-[22px]' : 'left-[2px]'}`} />
                    </button>
                  </div>

                  {showKeyInput && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-3 pt-2"
                    >
                      <p className="text-[8px] text-gray-500 font-mono uppercase leading-relaxed">
                        Manually provide a cryptographic seed or HEX key to be baked into the filesystem at the partition level.
                      </p>
                      <div className="relative">
                        <input 
                          type={showKeyText ? "text" : "password"}
                          value={encryptionKey}
                          onChange={(e) => setEncryptionKey(e.target.value)}
                          placeholder="ENTER_S_PARTITION_KEY_HEX..."
                          className="w-full bg-black/40 border border-white/10 rounded-lg py-2 px-3 text-[10px] font-mono text-liberty-cyan focus:border-liberty-cyan outline-none transition-colors"
                        />
                        <button 
                          onClick={() => setShowKeyText(!showKeyText)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                        >
                          {showKeyText ? <EyeOff size={12} /> : <Eye size={12} />}
                        </button>
                      </div>
                      <div className="flex items-center gap-2 text-[7px] font-mono text-liberty-cyan/60 uppercase">
                        <Shield size={10} />
                        Key will be applied using {encryption === 'quantum' ? 'Post-Quantum primitives' : 'GCM-512 authentication'}.
                      </div>
                    </motion.div>
                  )}
                </div>
              </section>

              {/* Kernel Selection */}
              <section>
                <h3 className="text-xs font-bold text-gray-400 font-mono uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Cpu size={14} /> 03. Kernel_Architecture
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {KERNEL_TYPES.map(k => (
                    <button
                      key={k.id}
                      onClick={() => setKernel(k.id)}
                      className={`p-4 rounded-xl border transition-all text-left flex items-center gap-4 ${
                        kernel === k.id ? 'bg-sovereign-gold/10 border-sovereign-gold' : 'bg-white/5 border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className={`p-3 rounded-lg ${kernel === k.id ? 'bg-sovereign-gold text-black' : 'bg-white/5 text-gray-500'}`}>
                        <k.icon size={20} />
                      </div>
                      <div className="flex-1">
                        <div className={`text-xs font-bold uppercase tracking-widest ${kernel === k.id ? 'text-sovereign-gold' : 'text-gray-300'}`}>{k.name}</div>
                        <div className="text-[10px] text-gray-500 font-mono">{k.desc}</div>
                      </div>
                      {kernel === k.id && <Check size={16} className="text-sovereign-gold" />}
                    </button>
                  ))}
                </div>
              </section>

              {/* Pre-installed Apps */}
              <section>
                <h3 className="text-xs font-bold text-gray-400 font-mono uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Box size={14} /> 04. Pre-installed_Enclaves
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {APPS.map(app => (
                    <button
                      key={app.id}
                      onClick={() => toggleApp(app.id)}
                      className={`p-4 rounded-xl border transition-all text-left flex items-start gap-3 ${
                        selectedApps.includes(app.id) ? 'bg-liberty-cyan/10 border-liberty-cyan' : 'bg-white/5 border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center ${
                        selectedApps.includes(app.id) ? 'bg-liberty-cyan border-liberty-cyan text-black' : 'border-white/20'
                      }`}>
                        {selectedApps.includes(app.id) && <Check size={10} />}
                      </div>
                      <div>
                        <div className={`text-[10px] font-bold uppercase tracking-widest ${selectedApps.includes(app.id) ? 'text-liberty-cyan' : 'text-gray-300'}`}>{app.name}</div>
                        <div className="text-[9px] text-gray-500 font-mono">{app.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </section>

              {/* Security Hardening */}
              <section>
                <h3 className="text-xs font-bold text-gray-400 font-mono uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Shield size={14} /> 05. Security_Hardening
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SECURITY.map(s => (
                    <button
                      key={s.id}
                      onClick={() => toggleSecurity(s.id)}
                      className={`p-4 rounded-xl border transition-all text-left flex items-start gap-3 ${
                        selectedSecurity.includes(s.id) ? 'bg-freedom-red/10 border-freedom-red' : 'bg-white/5 border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center ${
                        selectedSecurity.includes(s.id) ? 'bg-freedom-red border-freedom-red text-white' : 'border-white/20'
                      }`}>
                        {selectedSecurity.includes(s.id) && <Check size={10} />}
                      </div>
                      <div>
                        <div className={`text-[10px] font-bold uppercase tracking-widest ${selectedSecurity.includes(s.id) ? 'text-freedom-red' : 'text-gray-300'}`}>{s.name}</div>
                        <div className="text-[9px] text-gray-500 font-mono">{s.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </section>
            </div>
          </div>

            {/* Right: Summary & Build */}
            <div className="lg:col-span-4">
              <div className="sticky top-0 space-y-6">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] border-b border-white/5 pb-3">Build_Summary</h4>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] text-gray-500 font-mono uppercase">Target</span>
                      <span className="text-[9px] text-white font-mono uppercase">{target}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] text-gray-500 font-mono uppercase">Kernel</span>
                      <span className="text-[9px] text-sovereign-gold font-mono uppercase">{kernel}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] text-gray-500 font-mono uppercase">Encryption</span>
                      <span className="text-[9px] text-liberty-cyan font-mono uppercase">{encryption}</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="text-[9px] text-gray-500 font-mono uppercase">Apps</span>
                      <span className="text-[9px] text-white font-mono uppercase text-right">{selectedApps.length} Selected</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="text-[9px] text-gray-500 font-mono uppercase">Hardening</span>
                      <span className="text-[9px] text-freedom-red font-mono uppercase text-right">{selectedSecurity.length} Active</span>
                    </div>
                    {directInjection && (
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] text-freedom-red font-mono uppercase">Injection</span>
                        <span className="text-[9px] text-freedom-red font-mono uppercase font-bold">ENABLED</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-6 border-t border-white/5 space-y-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] text-gray-400 font-mono uppercase">Build Complexity</span>
                      <span className="text-xs text-sovereign-gold font-bold font-mono">OPTIMAL</span>
                    </div>
                    
                    <button
                      onClick={handleBuild}
                      disabled={isGenerating || isGeneratingISO}
                      className={`w-full py-4 rounded-xl font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 ${
                        isGenerating ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-sovereign-gold text-black hover:bg-white shadow-[0_0_30px_rgba(212,175,55,0.3)]'
                      }`}
                    >
                      {isGenerating ? <Zap className="animate-spin" size={18} /> : <HardDrive size={18} />}
                      Provision_Core
                    </button>

                    <button
                      onClick={handleGenerateISO}
                      disabled={isGenerating || isGeneratingISO}
                      className={`w-full py-4 rounded-xl font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 border ${
                        isGeneratingISO ? 'bg-gray-800 text-gray-500 border-gray-800 cursor-not-allowed' : 'bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.05)]'
                      }`}
                    >
                      {isGeneratingISO ? <Zap className="animate-spin" size={18} /> : <Download size={18} />}
                      Generate_ISO
                    </button>
                  </div>
                </div>

                <div className="p-4 border border-white/5 rounded-xl bg-white/5">
                  <p className="text-[9px] text-gray-500 font-mono leading-relaxed italic">
                    Note: Provisioning will generate a Sovereign Core JSON file containing your custom kernel configuration and encrypted identity keys. This file is required to boot the SIM-based AI OS on your target hardware.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default OSBuilder;
