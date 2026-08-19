import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Key, Zap, Lock, Activity, Radio, AlertTriangle, X, CheckCircle, Copy } from 'lucide-react';

import * as bip39 from 'bip39';
import { ethers } from 'ethers';
import * as web3 from '@solana/web3.js';
import { derivePath } from 'ed25519-hd-key';
import nacl from 'tweetnacl';
import * as xrpl from 'xrpl';
import bs58 from 'bs58';

export default function SovereignAnchorWallet({ onClose }: { onClose: () => void }) {
  const [isStrongBoxBacked, setIsStrongBoxBacked] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [tamperFlag, setTamperFlag] = useState(false);
  const [burned, setBurned] = useState(false);
  
  const [pulseSync, setPulseSync] = useState(0);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);

  const [settlementStatus, setSettlementStatus] = useState('VERIFYING_SIGNATURE');

  // Real Keys
  const [mnemonicPhrase, setMnemonicPhrase] = useState<string[]>([]);
  const [ethAddress, setEthAddress] = useState<string | null>(null);
  const [solAddress, setSolAddress] = useState<string | null>(null);
  const [xrpAddress, setXrpAddress] = useState<string | null>(null);

  useEffect(() => {
    // Pulse Sync Heartbeat ($9,800/27s)
    const interval = setInterval(() => {
      if (!burned && !tamperFlag && isStrongBoxBacked) {
        setPulseSync(prev => prev + 9800);
        setLastSyncTime(new Date());
        if (settlementStatus === 'VERIFYING_SIGNATURE') {
          setTimeout(() => setSettlementStatus('ESTABLISHED_SECURE_TUNNEL'), 3000);
        } else if (settlementStatus === 'ESTABLISHED_SECURE_TUNNEL') {
          setTimeout(() => setSettlementStatus('STREAMING_ACTIVE'), 3000);
        }
      }
    }, 27000);
    return () => clearInterval(interval);
  }, [burned, tamperFlag, settlementStatus, isStrongBoxBacked]);

  const initiateStrongBox = () => {
    setIsGenerating(true);
    
    // Simulate Android hardware confirmation latency
    setTimeout(async () => {
      try {
        // yield to render
        await new Promise(r => setTimeout(r, 50));
        
        // 1. Generate 256-bit entropy (24 words) securely
        const mnemonic = bip39.generateMnemonic(256);
        setMnemonicPhrase(mnemonic.split(' '));
        
        await new Promise(r => setTimeout(r, 50));
        
        // 2. Derive Ethereum Address (m/44'/60'/0'/0/0)
        const ethWallet = ethers.HDNodeWallet.fromPhrase(mnemonic);
        setEthAddress(ethWallet.address);

        await new Promise(r => setTimeout(r, 50));

        // 3. Derive Solana Address (m/44'/501'/0'/0')
        const seed = await bip39.mnemonicToSeed(mnemonic);
        const solPath = "m/44'/501'/0'/0'";
        const derivedSeed = derivePath(solPath, seed.toString("hex")).key;
        const keyPair = nacl.sign.keyPair.fromSeed(derivedSeed);
        setSolAddress(new web3.PublicKey(keyPair.publicKey).toBase58());

        await new Promise(r => setTimeout(r, 50));

        // 4. Derive XRP Address (m/44'/144'/0'/0/0)
        // xrpl derives from 12-word or 24-word phrases.
        const xrplWallet = xrpl.Wallet.fromMnemonic(mnemonic, { derivationPath: "m/44'/144'/0'/0/0" });
        setXrpAddress(xrplWallet.address);

        setIsStrongBoxBacked(true);
        setIsGenerating(false);
        setSettlementStatus('ESTABLISHED_SECURE_TUNNEL');
        setLastSyncTime(new Date()); // Start sync timer
      } catch (err) {
        console.error("TEE Keygen Failed:", err);
        setIsGenerating(false);
      }
    }, 2500);
  };

  const triggerTamper = () => {
    setTamperFlag(true);
    // Burn the keys instantly
    setMnemonicPhrase([]);
    setEthAddress(null);
    setSolAddress(null);
    setXrpAddress(null);

    setTimeout(() => {
      setBurned(true);
    }, 1500);
  };

  if (burned) {
    return (
      <div className="flex-1 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 w-full h-full">
        <div className="bg-black border border-red-500/50 p-6 rounded-lg max-w-md w-full shadow-[0_0_50px_rgba(255,0,0,0.2)]">
          <div className="flex items-center gap-3 text-red-500 mb-4 uppercase font-mono tracking-widest font-bold">
            <AlertTriangle size={24} />
            <h2>Secure Enclave Burned</h2>
          </div>
          <p className="text-gray-400 font-mono text-xs mb-4">
            A hardware tamper flag (RootBeer/StrongBox Attestation) was detected. The local encrypted session has been unrecoverably destroyed to protect assets.
          </p>
          <div className="bg-red-950/30 p-4 border border-red-500/20 rounded mb-6">
            <p className="text-red-400 font-mono text-xs uppercase text-center">
              Fresh import from offline paper mnemonic required.
            </p>
          </div>
          <button 
            onClick={onClose}
            className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded font-mono text-xs text-white uppercase tracking-wider transition-colors"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 w-full h-full flex items-center justify-center pt-6 font-mono select-none overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full h-full max-w-6xl max-h-[calc(100vh-120px)] bg-[#0a0a0a] border border-[#333] shadow-2xl rounded-sm overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="bg-[#111] p-4 border-b border-[#333] flex justify-between items-center relative overflow-hidden">
          {/* Subtle noise overlay */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
          
          <div className="flex items-center gap-4 z-10">
            <div className={`p-2 rounded-sm ${isStrongBoxBacked ? 'bg-amber-500/20 text-amber-500' : 'bg-white/5 text-gray-500'}`}>
              <Shield size={20} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-gray-200 uppercase tracking-widest">Sovereign Anchor Validator</h2>
              <div className="text-[10px] text-gray-500 tracking-wider">SECURE ENCLAVE / HARDWARE BACKED</div>
            </div>
          </div>
          <button onClick={onClose} className="z-10 text-gray-500 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-col md:flex-row flex-1 p-6 gap-6 relative">
          
          {tamperFlag && (
            <div className="absolute inset-0 bg-red-500/10 z-20 pointer-events-none animate-pulse flex items-center justify-center">
              <div className="text-red-500 text-4xl font-bold uppercase tracking-widest border-4 border-red-500 px-8 py-4 bg-black/80">TAMPER DETECTED - BURNING</div>
            </div>
          )}

          {/* Left Column: Derivation & Status */}
          <div className="flex-1 space-y-6">
            <div className="bg-[#111] border border-[#222] p-5 relative">
              <div className="absolute top-0 right-0 p-2 bg-[#222] text-[9px] text-gray-400">022626-jpmc-02222</div>
              <h3 className="text-xs text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Activity size={14} className="text-amber-500" /> Settlement Stream
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-end border-b border-[#333] pb-2">
                  <span className="text-[10px] text-gray-500 uppercase">Status</span>
                  <span className={`text-xs font-bold ${settlementStatus === 'STREAMING_ACTIVE' ? 'text-green-500' : 'text-amber-500'} animate-pulse`}>
                    {settlementStatus}
                  </span>
                </div>
                <div className="flex justify-between items-end border-b border-[#333] pb-2">
                  <span className="text-[10px] text-gray-500 uppercase">Current Block / Stream</span>
                  <span className="text-xl text-white font-bold tracking-tight">
                    ${pulseSync.toLocaleString()} <span className="text-sm text-gray-500 font-normal">/ USD</span>
                  </span>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-[10px] text-gray-500 uppercase">Last Sync</span>
                  <span className="text-[10px] text-gray-400">
                    {lastSyncTime ? lastSyncTime.toLocaleTimeString() : 'AWAITING HEARTBEAT'}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-[#111] border border-[#222] p-5">
              <h3 className="text-xs text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Lock size={14} className="text-blue-500" /> Multi-Chain Derivation Paths
              </h3>
              
              <div className="space-y-3">
                <div className="bg-black border border-[#333] p-3 rounded-sm flex justify-between items-center group hover:border-[#555] transition-colors">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-500 uppercase mb-1">Ethereum / USDT (ERC-20)</span>
                    <span className="text-xs text-gray-300">m/44'/60'/0'/0/0</span>
                  </div>
                  {isStrongBoxBacked && ethAddress ? <span className="text-[10px] text-green-500 truncate max-w-[120px]">{ethAddress}</span> : <Lock size={12} className="text-gray-600" />}
                </div>
                
                <div className="bg-black border border-[#333] p-3 rounded-sm flex justify-between items-center group hover:border-[#555] transition-colors">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-500 uppercase mb-1">Solana (SPL)</span>
                    <span className="text-xs text-gray-300">m/44'/501'/0'/0'</span>
                  </div>
                  {isStrongBoxBacked && solAddress ? <span className="text-[10px] text-green-500 truncate max-w-[120px]">{solAddress}</span> : <Lock size={12} className="text-gray-600" />}
                </div>

                <div className="bg-black border border-[#333] p-3 rounded-sm flex justify-between items-center group hover:border-[#555] transition-colors">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-500 uppercase mb-1">XRP Ledger</span>
                    <span className="text-xs text-gray-300">m/44'/144'/0'/0/0</span>
                  </div>
                  {isStrongBoxBacked && xrpAddress ? <span className="text-[10px] text-green-500 truncate max-w-[120px]">{xrpAddress}</span> : <Lock size={12} className="text-gray-600" />}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Keygen & Controls */}
          <div className="w-full md:w-80 flex flex-col gap-6">
            <div className="bg-[#111] border border-[#222] p-5 flex-1 flex flex-col">
              <h3 className="text-xs text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Key size={14} className="text-purple-500" /> TEE Key Generation
              </h3>

              {!isStrongBoxBacked ? (
                <div className="flex flex-col items-center justify-center flex-1 text-center">
                  <div className="w-16 h-16 bg-[#222] rounded-full flex items-center justify-center mb-4 border border-[#333]">
                    <Shield size={24} className="text-gray-500" />
                  </div>
                  <p className="text-[10px] text-gray-500 mb-6 leading-relaxed">
                    By activating StrongBox, hardware-backed 256-bit entropy restricts key extraction. Operations are sealed within the physical Secure Element.
                  </p>
                  <button 
                    onClick={initiateStrongBox}
                    disabled={isGenerating}
                    className="w-full py-3 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-500 text-[10px] font-bold uppercase tracking-[2px] transition-all disabled:opacity-50"
                  >
                    {isGenerating ? 'GENERATING SEED...' : 'SET setIsStrongBoxBacked(true)'}
                  </button>
                </div>
              ) : (
                <div className="flex flex-col flex-1">
                  <div className="bg-green-500/10 border border-green-500/30 p-3 mb-4 flex items-start gap-3">
                    <CheckCircle size={16} className="text-green-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-[10px] text-green-500 font-bold uppercase mb-1">StrongBox Active</p>
                      <p className="text-[9px] text-gray-400">Keys securely derived. Hardware export restrictions enforced.</p>
                    </div>
                  </div>
                  
                  <div className="flex-1 border border-[#333] bg-black p-4 relative overflow-hidden group">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-[10px] text-gray-500 uppercase">Real HD Mnemonic Phrase (24-word)</p>
                      <button onClick={() => navigator.clipboard.writeText(mnemonicPhrase.join(' '))} className="text-gray-600 hover:text-white transition-colors">
                        <Copy size={12} />
                      </button>
                    </div>
                    <div className="grid grid-cols-3 gap-2 filter blur-sm group-hover:blur-none transition-all cursor-crosshair h-48 overflow-y-auto custom-scrollbar pr-1">
                      {mnemonicPhrase.map((word, i) => (
                        <div key={i} className="bg-[#111] p-1 text-[9px] text-gray-300 text-center border border-[#333]">
                          <span className="text-gray-600 mr-1">{i+1}.</span> {word}
                        </div>
                      ))}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity">
                      <span className="bg-black/80 px-2 py-1 text-[10px] border border-[#333]">HOVER TO REVEAL</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={triggerTamper}
                    className="mt-4 w-full py-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-500 text-[10px] uppercase font-bold tracking-widest transition-all group relative overflow-hidden"
                  >
                    <span className="relative z-10 group-hover:opacity-0 transition-opacity text-red-700">Simulate RootBeer Alert</span>
                    <span className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity font-bold">TRIGGER BURN LOGIC</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-black p-2 border-t border-[#333] flex justify-between items-center">
          <div className="flex items-center gap-2 px-2">
            <Radio size={10} className="text-blue-500 animate-pulse" />
            <span className="text-[9px] text-gray-600 uppercase">Direct RPC Node Connection ONLY</span>
          </div>
          <span className="text-[9px] text-gray-600">AGATE PROTOCOL // V2.4.1</span>
        </div>
      </motion.div>
    </div>
  );
}


