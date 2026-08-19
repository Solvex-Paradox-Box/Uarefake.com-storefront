import { motion } from 'motion/react';
import { Cpu, Shield, Zap, Activity, ChevronRight, Terminal } from 'lucide-react';

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-6 pt-32 pb-16 relative overflow-hidden">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-sovereign-gold/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-freedom-red/5 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
        
        {/* Left Content: The Message */}
        <div className="lg:col-span-7 flex flex-col items-start">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 px-3 py-1 bg-black/40 border border-sovereign-gold/30 rounded-full mb-8 backdrop-blur-sm"
          >
            <div className="w-2 h-2 rounded-full bg-sovereign-gold animate-ping" />
            <span className="text-[10px] font-mono text-sovereign-gold uppercase tracking-[3px]">MMTAI v2.0 Protocol Active</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-6xl md:text-8xl font-bold leading-[0.9] mb-8 uppercase tracking-tighter"
          >
            <span className="block text-white">SOVEREIGN.</span>
            <span className="block text-gradient-gold-cyan">AI. OS.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-400 mb-10 max-w-xl leading-tight font-light tracking-tight"
          >
            The Universal State Transition for Digital Freedom. Reclaim your compute from corporate waste. 
            <span className="text-freedom-red font-bold"> Register & Burn.</span>
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-6"
          >
            <a 
              href="#liberation" 
              className="group relative px-10 py-5 bg-freedom-red text-white font-bold uppercase tracking-[3px] text-xs overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(220,20,60,0.5)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                Register & Burn <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </a>
            
            <a 
              href="#swarm" 
              className="group px-10 py-5 bg-transparent border border-white/20 text-white font-bold uppercase tracking-[3px] text-xs hover:border-liberty-cyan hover:text-liberty-cyan transition-all flex items-center gap-2"
            >
              <Terminal size={16} /> Enter Portal
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-16 grid grid-cols-3 gap-8 border-t border-white/5 pt-8 w-full"
          >
            <div>
              <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Architecture</div>
              <div className="text-sm font-mono text-white">VDS HARDENED</div>
            </div>
            <div>
              <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Encryption</div>
              <div className="text-sm font-mono text-white">POST-QUANTUM</div>
            </div>
            <div>
              <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Kernel</div>
              <div className="text-sm font-mono text-white">MMTAI v2.0</div>
            </div>
          </motion.div>
        </div>

        {/* Right Content: The Visual */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          <div className="relative w-full aspect-square max-w-[500px]">
            {/* Orbital Rings */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border border-white/5 rounded-full"
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute inset-8 border border-white/10 rounded-full border-dashed"
            />
            
            {/* Central Core Visual */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute inset-20 bg-gradient-to-br from-panel-sovereign to-black rounded-3xl border border-sovereign-gold/20 shadow-[0_0_100px_rgba(255,215,0,0.1)] flex flex-col items-center justify-center p-8 overflow-hidden group"
            >
              {/* Internal HUD Elements */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-center opacity-40">
                <div className="text-[8px] font-mono text-sovereign-gold">CORE_LINK_STABLE</div>
                <Activity size={12} className="text-liberty-cyan animate-pulse" />
              </div>

              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-sovereign-gold/10 rounded-full flex items-center justify-center mb-6 border border-sovereign-gold/30 group-hover:scale-110 transition-transform duration-500">
                  <Shield size={40} className="text-sovereign-gold" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 tracking-tighter">AGATE_CORE</h3>
                <p className="text-[10px] font-mono text-gray-500 uppercase tracking-[4px]">Sovereign Identity</p>
              </div>

              {/* Data Streams */}
              <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-sovereign-gold to-transparent animate-scan" />
              </div>
            </motion.div>

            {/* Floating Nodes */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 right-10 p-4 bg-black/60 backdrop-blur-md border border-freedom-red/30 rounded-xl shadow-2xl"
            >
              <Zap size={20} className="text-freedom-red mb-2" />
              <div className="text-[8px] font-mono text-gray-400 uppercase">Power_Draw</div>
              <div className="text-xs font-bold text-white">0.02W</div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-10 left-0 p-4 bg-black/60 backdrop-blur-md border border-liberty-cyan/30 rounded-xl shadow-2xl"
            >
              <Cpu size={20} className="text-liberty-cyan mb-2" />
              <div className="text-[8px] font-mono text-gray-400 uppercase">Neural_Load</div>
              <div className="text-xs font-bold text-white">OPTIMAL</div>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
