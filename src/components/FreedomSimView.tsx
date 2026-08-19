import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  Terminal, 
  Hammer, 
  Lightbulb, 
  HardDrive, 
  Usb, 
  Rocket, 
  Wallet, 
  BookOpen, 
  ShieldCheck, 
  Layers, 
  HelpCircle,
  FolderPlus
} from 'lucide-react';

import SwarmOS from './freedom-sim/SwarmOS';
import OSBuilder from './freedom-sim/OSBuilder';
import InventionLab from './freedom-sim/InventionLab';
import FileSystemBrowser from './freedom-sim/FileSystemBrowser';
import HardwareBridge from './freedom-sim/HardwareBridge';
import AutomatedDeploymentEngine from './freedom-sim/AutomatedDeploymentEngine';
import SovereignAnchorWallet from './freedom-sim/SovereignAnchorWallet';
import UserManual from './freedom-sim/UserManual';
import MMTAI from './freedom-sim/MMTAI';
import Hero from './freedom-sim/Hero';
import Manifesto from './freedom-sim/Manifesto';
import Liberation from './freedom-sim/Liberation';
import TechReality from './freedom-sim/TechReality';
import TrainingModule from './freedom-sim/TrainingModule';
import AppIngest from './freedom-sim/AppIngest';
import OnboardingTour from './freedom-sim/OnboardingTour';

export type FreedomSimTab = 
  | 'swarm_os' 
  | 'os_builder' 
  | 'invention_lab' 
  | 'hardware_bridge' 
  | 'filesystem' 
  | 'deployment' 
  | 'anchor_wallet' 
  | 'mmtai_protocol' 
  | 'user_manual' 
  | 'full_experience';

export function FreedomSimView() {
  const [activeSubTab, setActiveSubTab] = useState<FreedomSimTab>('swarm_os');
  const [isTourVisible, setIsTourVisible] = useState(false);

  // Inventions State
  const [inventions, setInventions] = useState([
    {
      name: 'Zero-Vault Mesh Router',
      description: 'Autonomous cryptographic relay with hardware-locked enclave execution.',
      components: ['ARM Cortex-M Secure Enclave', 'Ed25519 Microkernel', 'ZK Prover'],
      timestamp: new Date().toISOString(),
      author: 'Queen Bee Core'
    },
    {
      name: 'Puter Sovereign Bridge',
      description: 'Decentralized cloud persistence binding local filesystem nodes.',
      components: ['Puter.js Native Adapter', 'Local State Sync', 'Ghost Recorder'],
      timestamp: new Date().toISOString(),
      author: 'Alpha Node'
    }
  ]);

  // File System State
  const [virtualFs, setVirtualFs] = useState<Record<string, string>>({
    '/kernel/config.json': '{\n  "version": "2.4.0",\n  "node": "HUMAN_0001",\n  "sovereignty": "ESTABLISHED",\n  "heartbeat": "ACTIVE"\n}',
    '/kernel/mmtai_v2_core.c': '// MMTAI v2.0 Protocol Engine\n#include <stdio.h>\nint main() { printf("Sovereign Root Initialized\\n"); return 0; }',
    '/vault/consensus_memory.json': '{\n  "settlement": "022626-jpmc-02222",\n  "wallet": "0x119...E013",\n  "velocityLimit": 9800,\n  "heartbeatSeconds": 27\n}',
    '/inventions/mesh_router.json': '{\n  "title": "Zero-Vault Mesh Router",\n  "status": "VERIFIED"\n}'
  });

  const subTabs = [
    { id: 'swarm_os', label: 'SwarmOS Terminal', icon: Terminal, badge: 'Queen Bee' },
    { id: 'os_builder', label: 'OS Builder', icon: Hammer, badge: 'Kernel' },
    { id: 'invention_lab', label: 'Invention Lab', icon: Lightbulb, badge: 'AI Schematics' },
    { id: 'hardware_bridge', label: 'Hardware Bridge', icon: Usb, badge: 'Rock Interface' },
    { id: 'filesystem', label: 'File System', icon: HardDrive, badge: 'Puter FS' },
    { id: 'deployment', label: 'Auto Deployment', icon: Rocket, badge: 'JIT' },
    { id: 'anchor_wallet', label: 'Sovereign Wallet', icon: Wallet, badge: '0x119...E013' },
    { id: 'mmtai_protocol', label: 'MMTAI v2.0', icon: ShieldCheck, badge: 'Zero-Vault' },
    { id: 'user_manual', label: 'User Manual', icon: BookOpen, badge: 'Docs' },
    { id: 'full_experience', label: 'Full Stream', icon: Layers, badge: 'All Modules' },
  ];

  return (
    <div className="min-h-screen bg-[#07070c] text-slate-100 font-sans pb-24 selection:bg-rose-600 selection:text-white">
      <OnboardingTour isVisible={isTourVisible} onClose={() => setIsTourVisible(false)} />

      {/* Sovereign Header Banner */}
      <div className="border-b border-amber-500/20 bg-gradient-to-r from-slate-950 via-[#0e0f1a] to-slate-950 px-4 sm:px-6 py-4 shadow-xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-600 to-cyan-400 p-0.5 shadow-lg shadow-amber-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Zap className="w-5 h-5 text-amber-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-rose-400 to-cyan-300">
                  FREEDOM SIM AI OS
                </h1>
                <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full">
                  SWARM-OS v2.4
                </span>
                <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
                  PUTER.JS CLOUD READY
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Sovereign Root Execution Layer • Todd Jeffrey Ites Jr (HUMAN_0001) • MMTAI Zero-Vault Protocol
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsTourVisible(true)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 font-mono text-xs transition-all"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>OS Tour</span>
            </button>
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>NODE: ::SIM-01 ONLINE</span>
            </div>
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="max-w-7xl mx-auto mt-4 pt-2 border-t border-slate-800/80 flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
          {subTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as FreedomSimTab)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-mono whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500 to-rose-600 text-slate-950 font-bold shadow-lg shadow-amber-500/30 ring-1 ring-amber-300'
                    : 'text-slate-300 hover:text-white bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
                <span>{tab.label}</span>
                <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold ${
                  isActive ? 'bg-black/30 text-white' : 'bg-slate-800 text-slate-400'
                }`}>
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <AnimatePresence mode="wait">
          {activeSubTab === 'swarm_os' && (
            <motion.div
              key="swarm_os"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <SwarmOS />
            </motion.div>
          )}

          {activeSubTab === 'os_builder' && (
            <motion.div
              key="os_builder"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <OSBuilder 
                isGenerating={false}
                onProvision={(config) => {
                  console.log('OS Provisioned:', config);
                }}
                onClose={() => setActiveSubTab('swarm_os')}
              />
            </motion.div>
          )}

          {activeSubTab === 'invention_lab' && (
            <motion.div
              key="invention_lab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <InventionLab 
                inventions={inventions}
                onGenerate={(name, description, comps) => {
                  const newInv = {
                    name,
                    description,
                    components: comps.split(',').map(c => c.trim()),
                    timestamp: new Date().toISOString(),
                    author: 'Sovereign Architect'
                  };
                  setInventions(prev => [newInv, ...prev]);
                }}
                onSaveToFS={(inv) => {
                  const path = `/inventions/${inv.name.toLowerCase().replace(/\\s+/g, '_')}.json`;
                  setVirtualFs(prev => ({
                    ...prev,
                    [path]: JSON.stringify(inv, null, 2)
                  }));
                }}
                onClose={() => setActiveSubTab('swarm_os')}
              />
            </motion.div>
          )}

          {activeSubTab === 'hardware_bridge' && (
            <motion.div
              key="hardware_bridge"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <HardwareBridge 
                onClose={() => setActiveSubTab('swarm_os')}
              />
            </motion.div>
          )}

          {activeSubTab === 'filesystem' && (
            <motion.div
              key="filesystem"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <FileSystemBrowser 
                fs={virtualFs}
                onDelete={(path) => {
                  setVirtualFs(prev => {
                    const copy = { ...prev };
                    delete copy[path];
                    return copy;
                  });
                }}
                onMkdir={(dirPath) => {
                  setVirtualFs(prev => ({
                    ...prev,
                    [`${dirPath}/.keep`]: ''
                  }));
                }}
                onWrite={(path, content) => {
                  setVirtualFs(prev => ({
                    ...prev,
                    [path]: content
                  }));
                }}
                onClose={() => setActiveSubTab('swarm_os')}
              />
            </motion.div>
          )}

          {activeSubTab === 'deployment' && (
            <motion.div
              key="deployment"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <AutomatedDeploymentEngine 
                onClose={() => setActiveSubTab('swarm_os')}
              />
            </motion.div>
          )}

          {activeSubTab === 'anchor_wallet' && (
            <motion.div
              key="anchor_wallet"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <SovereignAnchorWallet 
                onClose={() => setActiveSubTab('swarm_os')}
              />
            </motion.div>
          )}

          {activeSubTab === 'mmtai_protocol' && (
            <motion.div
              key="mmtai_protocol"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <MMTAI />
            </motion.div>
          )}

          {activeSubTab === 'user_manual' && (
            <motion.div
              key="user_manual"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <UserManual 
                onClose={() => setActiveSubTab('swarm_os')}
              />
            </motion.div>
          )}

          {activeSubTab === 'full_experience' && (
            <motion.div
              key="full_experience"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-16"
            >
              <Hero />
              <Manifesto />
              <Liberation />
              <TechReality />
              <TrainingModule />
              <SwarmOS />
              <AppIngest />
              <MMTAI />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
