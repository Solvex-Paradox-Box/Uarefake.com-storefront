import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lightbulb, Plus, Trash2, Cpu, Zap, Shield, ChevronRight, X, Download, Users, Brain, Activity, Database } from 'lucide-react';

interface Invention {
  name: string;
  description: string;
  components: string[];
  timestamp: string;
  author?: string;
}

interface InventionLabProps {
  inventions: Invention[];
  onGenerate: (name: string, description: string, components: string) => void;
  onSaveToFS?: (invention: Invention) => void;
  onClose: () => void;
  isGenerating?: boolean;
}

export default function InventionLab({ inventions, onGenerate, onSaveToFS, onClose, isGenerating }: InventionLabProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [components, setComponents] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedInvention, setSelectedInvention] = useState<Invention | null>(null);

  const handleSaveToFS = () => {
    if (selectedInvention && onSaveToFS) {
      onSaveToFS(selectedInvention);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description || !components) return;
    onGenerate(name, description, components);
    setName('');
    setDescription('');
    setComponents('');
    setIsFormOpen(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="flex-1 w-full h-full flex items-center justify-center pt-6 pointer-events-auto"
    >
      
      <div className="relative w-full max-w-5xl h-[85vh] bg-[#050508] border border-white/10 rounded-3xl overflow-hidden flex flex-col shadow-[0_0_100px_rgba(0,0,0,0.8)]">
        {/* Header */}
        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-black/40">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-sovereign-gold/20 rounded-xl flex items-center justify-center text-sovereign-gold border border-sovereign-gold/30">
              <Lightbulb size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Neural_Invention_Lab</h2>
              <div className="flex items-center gap-2">
                <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">Sovereign_Fabrication_v1.0.0</p>
                {isGenerating && (
                  <div className="flex items-center gap-1 px-2 py-0.5 bg-liberty-cyan/10 border border-liberty-cyan/30 rounded-full">
                    <Activity size={8} className="text-liberty-cyan animate-pulse" />
                    <span className="text-[8px] text-liberty-cyan font-mono uppercase animate-pulse">Autonomous_Fabrication_In_Progress</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg border border-white/10">
              <Users size={14} className="text-sovereign-gold" />
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">Collaborators: Queen Bee, Alpha, Beta</span>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-white/5 rounded-full text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Sidebar: Invention List */}
          <div className="w-full md:w-80 border-r border-white/5 bg-black/20 overflow-y-auto custom-scrollbar">
            <div className="p-4 border-b border-white/5 flex justify-between items-center">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Stored_Schematics</h3>
              <span className="text-[10px] font-mono text-sovereign-gold bg-sovereign-gold/10 px-2 py-0.5 rounded-full border border-sovereign-gold/20">
                {inventions.length}
              </span>
            </div>
            
            <div className="p-2 space-y-2">
              <button 
                onClick={() => setIsFormOpen(true)}
                className="w-full p-4 bg-sovereign-gold/10 border border-dashed border-sovereign-gold/30 rounded-xl text-sovereign-gold font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-sovereign-gold/20 transition-all group"
              >
                <Plus size={16} className="group-hover:rotate-90 transition-transform" />
                New_Invention
              </button>

              {inventions.length === 0 ? (
                <div className="py-20 text-center">
                  <Lightbulb size={32} className="mx-auto text-gray-800 mb-4 opacity-20" />
                  <p className="text-[10px] text-gray-600 font-mono uppercase">No schematics found in enclave.</p>
                </div>
              ) : (
                inventions.map((inv, i) => (
                  <button 
                    key={i}
                    onClick={() => {
                      setSelectedInvention(inv);
                      setIsFormOpen(false);
                    }}
                    className={`w-full p-4 border rounded-xl text-left transition-all group ${selectedInvention === inv ? 'bg-sovereign-gold/10 border-sovereign-gold/30' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <div className={`text-xs font-bold uppercase tracking-tight transition-colors ${selectedInvention === inv ? 'text-sovereign-gold' : 'text-white group-hover:text-sovereign-gold'}`}>{inv.name}</div>
                      {inv.author && (
                        <div className="px-1.5 py-0.5 bg-white/5 rounded text-[7px] font-mono text-gray-500 uppercase">{inv.author}</div>
                      )}
                    </div>
                    <div className="text-[9px] text-gray-500 font-mono line-clamp-2">{inv.description}</div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-[8px] text-gray-600 font-mono">{new Date(inv.timestamp).toLocaleDateString()}</span>
                      <ChevronRight size={12} className={`transition-all ${selectedInvention === inv ? 'text-sovereign-gold translate-x-1' : 'text-gray-700 group-hover:text-sovereign-gold group-hover:translate-x-1'}`} />
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Main Content: Form or Details */}
          <div className="flex-1 bg-black/40 overflow-y-auto custom-scrollbar p-8">
            <AnimatePresence mode="wait">
              {isFormOpen ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  onSubmit={handleSubmit}
                  className="max-w-2xl mx-auto space-y-8"
                >
                  <div className="flex items-center gap-3 mb-8">
                    <Plus size={24} className="text-sovereign-gold" />
                    <h3 className="text-xl font-bold text-white uppercase tracking-tight">New_Fabrication_Request</h3>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-sovereign-gold uppercase tracking-[0.2em]">Invention_Name</label>
                    <input 
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g., Decentralized Mesh Router"
                      className="w-full bg-black/60 border border-white/10 rounded-xl p-4 text-white focus:border-sovereign-gold/50 outline-none transition-all font-mono text-sm"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-sovereign-gold uppercase tracking-[0.2em]">Technical_Description</label>
                    <textarea 
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe the purpose and functionality of this invention..."
                      className="w-full bg-black/60 border border-white/10 rounded-xl p-4 text-white focus:border-sovereign-gold/50 outline-none transition-all font-mono text-sm h-32 resize-none"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-sovereign-gold uppercase tracking-[0.2em]">Required_Components</label>
                    <input 
                      type="text"
                      value={components}
                      onChange={(e) => setComponents(e.target.value)}
                      placeholder="e.g., Raspberry Pi Zero W, LoRa module, encrypted flash storage"
                      className="w-full bg-black/60 border border-white/10 rounded-xl p-4 text-white focus:border-sovereign-gold/50 outline-none transition-all font-mono text-sm"
                      required
                    />
                  </div>

                  <div className="pt-4 flex gap-4">
                    <button 
                      type="submit"
                      className="flex-1 py-4 bg-sovereign-gold text-black font-black uppercase tracking-widest rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                    >
                      <Zap size={18} /> Generate_Schematic
                    </button>
                    <button 
                      type="button"
                      onClick={() => setIsFormOpen(false)}
                      className="px-8 py-4 bg-white/5 border border-white/10 text-gray-400 font-bold uppercase tracking-widest rounded-xl hover:bg-white/10 transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </motion.form>
              ) : selectedInvention ? (
                <motion.div 
                  key="details"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="max-w-3xl mx-auto space-y-8"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-3xl font-black text-white uppercase tracking-tighter">{selectedInvention.name}</h3>
                        {selectedInvention.author && (
                          <span className="px-2 py-1 bg-sovereign-gold/10 border border-sovereign-gold/30 rounded text-[8px] font-mono text-sovereign-gold uppercase">
                            Authored_By: {selectedInvention.author}
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">
                        Fabricated: {new Date(selectedInvention.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {onSaveToFS && (
                        <button 
                          onClick={handleSaveToFS}
                          className="p-3 bg-sovereign-gold/10 border border-sovereign-gold/30 rounded-xl text-sovereign-gold hover:text-white hover:bg-sovereign-gold/20 transition-all flex items-center gap-2"
                        >
                          <Database size={16} />
                          <span className="text-[10px] font-bold uppercase tracking-widest">Save_to_FS</span>
                        </button>
                      )}
                      <button className="p-3 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                        <Download size={20} />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-6">
                      <div className="p-6 bg-black/40 border border-white/5 rounded-2xl">
                        <h4 className="text-[10px] font-bold text-sovereign-gold uppercase tracking-widest mb-4 flex items-center gap-2">
                          <Brain size={14} /> Neural_Schematic_Description
                        </h4>
                        <p className="text-gray-300 leading-relaxed text-sm">
                          {selectedInvention.description}
                        </p>
                      </div>

                      <div className="p-6 bg-black/40 border border-white/5 rounded-2xl">
                        <h4 className="text-[10px] font-bold text-liberty-cyan uppercase tracking-widest mb-4 flex items-center gap-2">
                          <Cpu size={14} /> Hardware_Component_Manifest
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedInvention.components.map((comp, i) => (
                            <span key={i} className="px-3 py-1.5 bg-liberty-cyan/5 border border-liberty-cyan/20 rounded-lg text-[10px] font-mono text-liberty-cyan">
                              {comp}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="p-6 bg-sovereign-gold/5 border border-sovereign-gold/20 rounded-2xl">
                        <h4 className="text-[10px] font-bold text-sovereign-gold uppercase tracking-widest mb-4">Fabrication_Status</h4>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center text-[10px] font-mono">
                            <span className="text-gray-500">DESIGN</span>
                            <span className="text-green-500">VERIFIED</span>
                          </div>
                          <div className="flex justify-between items-center text-[10px] font-mono">
                            <span className="text-gray-500">LOGIC</span>
                            <span className="text-green-500">COMPILED</span>
                          </div>
                          <div className="flex justify-between items-center text-[10px] font-mono">
                            <span className="text-gray-500">PHYSICAL</span>
                            <span className="text-sovereign-gold animate-pulse">AWAITING_USB</span>
                          </div>
                        </div>
                      </div>

                      <button className="w-full py-4 bg-white/5 border border-white/10 rounded-xl text-gray-400 font-bold text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                        <Shield size={14} /> Verify_Integrity
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center space-y-6"
                >
                  <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center text-gray-700 border border-white/5">
                    <Lightbulb size={48} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white uppercase tracking-tight">Neural_Invention_Lab</h3>
                    <p className="text-gray-500 max-w-md mt-2 text-sm">
                      Synthesize new hardware and software schematics. Use the 'New Invention' button to begin the fabrication process.
                    </p>
                  </div>
                  <button 
                    onClick={() => setIsFormOpen(true)}
                    className="px-8 py-4 bg-white/5 border border-white/10 text-sovereign-gold font-bold uppercase tracking-widest rounded-xl hover:bg-sovereign-gold hover:text-black transition-all"
                  >
                    Begin_Fabrication
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
