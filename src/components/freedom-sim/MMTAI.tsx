import { motion } from 'motion/react';
import { ShieldAlert, Network, Fingerprint, Lock, Brain, Zap, ShieldCheck } from 'lucide-react';

export default function MMTAI() {
  return (
    <section id="mmtai" className="py-24 px-6 relative z-10 bg-black/40 border-y border-freedom-red/20">
      <div className="text-center max-w-4xl mx-auto mb-16">
        <h2 className="text-4xl font-bold text-freedom-red uppercase tracking-[2px] mb-4 relative inline-block">
          MMTAI Core Protocol v2.0
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-sovereign-gold to-freedom-red"></div>
        </h2>
        <p className="text-gray-400 text-lg mt-8 leading-relaxed font-mono text-sm">
          Modular Multi-Track Autonomous Infrastructure
        </p>
        <p className="text-gray-300 mt-4 max-w-3xl mx-auto">
          Solving the Compliance-Immutability Paradox through Vertical Data Segregation (VDS). 
          The Register-and-Burn Protocol enables provable zero-storage through universal automated state transitions for any legal, contractual, biometric, spatial, or temporal condition.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
        <div className="bg-panel-sovereign border border-sovereign-gold/20 p-8 rounded-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Network size={120} />
          </div>
          <h3 className="text-2xl text-sovereign-gold font-bold mb-4 font-mono">Track A: Compliance Reporting</h3>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-liberty-cyan mt-1">▹</span>
              Receives ONLY ZK-proof boolean outputs (condition satisfied/not satisfied).
            </li>
            <li className="flex items-start gap-2">
              <span className="text-liberty-cyan mt-1">▹</span>
              Zero raw data processing or storage.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-liberty-cyan mt-1">▹</span>
              Immutable audit trails of proofs, not source data.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-liberty-cyan mt-1">▹</span>
              Geo-fenced logic for jurisdiction-specific rule auto-execution.
            </li>
          </ul>
        </div>

        <div className="bg-panel-sovereign border border-liberty-cyan/20 p-8 rounded-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Fingerprint size={120} />
          </div>
          <h3 className="text-2xl text-liberty-cyan font-bold mb-4 font-mono">Track B: State Management</h3>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-freedom-red mt-1">▹</span>
              Zero-persistence layer with real-time ZK-proof generation from secret-shared data.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-freedom-red mt-1">▹</span>
              3-of-5 guardian distribution (Shamir's Secret Sharing).
            </li>
            <li className="flex items-start gap-2">
              <span className="text-freedom-red mt-1">▹</span>
              Predecessor authority with cryptographic Register-and-Burn capability.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-freedom-red mt-1">▹</span>
              Universal State Transition: automated authority transfer on trigger satisfaction.
            </li>
          </ul>
        </div>
      </div>

      {/* AI Integration Section */}
      <div className="max-w-6xl mx-auto mb-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-gradient-to-br from-[#0c0c14] to-[#1a1a2e] border border-purple-500/30 p-8 rounded-2xl shadow-2xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20">
              <Brain className="text-purple-500" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white uppercase tracking-widest">Gemini Neural Auditor</h3>
              <p className="text-xs text-gray-500 font-mono">Universal State Transition Analysis</p>
            </div>
          </div>
          <div className="space-y-6">
            <div className="p-4 bg-black/40 border border-white/5 rounded-xl">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest">Active Transition Stream</span>
                <span className="flex items-center gap-2 text-[10px] text-liberty-cyan font-mono animate-pulse">
                  <Zap size={12} /> LIVE ANALYSIS
                </span>
              </div>
              <div className="space-y-2 font-mono text-[10px] text-gray-500">
                <div className="flex gap-4">
                  <span className="text-purple-500">[05:39:01]</span>
                  <span>Monitoring encrypted predicates: Temporal, Biometric, Contractual...</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-purple-500">[05:39:02]</span>
                  <span className="text-gray-300">Condition Oracle: Biometric Vitality Verified. Triggering Transition.</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-purple-500">[05:39:03]</span>
                  <span className="text-liberty-cyan">SUCCESS: Authority transferred to Successor Fiduciary.</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-purple-500">[05:39:04]</span>
                  <span className="text-freedom-red italic">INITIATING REGISTER-AND-BURN ANNIHILATION...</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              The MMTAI protocol leverages Gemini's multimodal capabilities to audit universal state transitions. It monitors encrypted predicates across legal, biometric, and spatial domains, executing cryptographic burns of predecessor authority while activating successor states with information-theoretic security.
            </p>
          </div>
        </div>

        <div className="bg-[#0c0c14] border border-sovereign-gold/30 p-8 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <ShieldCheck className="text-sovereign-gold" size={24} />
              <h3 className="text-lg font-bold text-white uppercase tracking-widest">Zero-Trust VDS</h3>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed mb-6">
              Vertical Data Segregation ensures that Track A (Compliance) and Track B (State) remain air-gapped. Only ZK-proof boolean outputs cross the boundary.
            </p>
          </div>
          <div className="space-y-3">
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-sovereign-gold"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <div className="text-[9px] font-mono text-sovereign-gold text-center uppercase tracking-widest">
              Sovereignty Level: ABSOLUTE
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mb-16">
        <h3 className="text-xl text-sovereign-gold font-bold mb-8 text-center uppercase tracking-widest">Universal State Transition Use Cases</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { domain: 'Child Protection', trigger: 'Age ≥ 18' },
            { domain: 'Contract Maturity', trigger: 'Date ≥ Maturity' },
            { domain: 'Probation/Parole', trigger: 'Time Served' },
            { domain: 'Professional License', trigger: 'Exam Verified' },
            { domain: 'Supply Chain', trigger: 'GPS Confirmed' },
            { domain: 'Estate/Trust', trigger: 'Trustee Release' },
            { domain: 'Citizenship', trigger: 'Oath Verified' },
            { domain: 'Security Clearance', trigger: 'Investigation OK' },
            { domain: 'IoT/Physical', trigger: 'Temp > Threshold' },
            { domain: 'Content/Rights', trigger: 'License Expired' }
          ].map((useCase, idx) => (
            <div key={idx} className="p-4 bg-black/40 border border-white/5 rounded-lg text-center hover:border-sovereign-gold/30 transition-all group">
              <div className="text-[10px] text-sovereign-gold font-bold uppercase mb-1">{useCase.domain}</div>
              <div className="text-[9px] text-gray-500 font-mono group-hover:text-liberty-cyan transition-colors">{useCase.trigger}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto bg-[#0A0A0F] border border-freedom-red/30 p-8 rounded-xl">
        <h3 className="text-xl text-freedom-red font-bold mb-6 flex items-center gap-3">
          <ShieldAlert />
          Universal Register-and-Burn Protocol
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 border border-gray-800 rounded bg-black/50">
            <h4 className="text-sovereign-gold font-mono text-sm mb-2">01. Registration & SBT</h4>
            <p className="text-xs text-gray-500">Legal oracle verification (contracts, identity, physical status). Master secret generation and 3-of-5 Shamir's Secret Sharing across Trust/Legal/Infra/Human nodes.</p>
          </div>
          <div className="p-4 border border-gray-800 rounded bg-black/50">
            <h4 className="text-sovereign-gold font-mono text-sm mb-2">02. Active Proof Gen</h4>
            <p className="text-xs text-gray-500">SPDZ Secure Multi-Party Computation with Beaver triples preprocessing. Generates ZK-proofs for condition predicates without revealing underlying data.</p>
          </div>
          <div className="p-4 border border-gray-800 rounded bg-black/50">
            <h4 className="text-sovereign-gold font-mono text-sm mb-2">03. Transition & Burn</h4>
            <p className="text-xs text-gray-500">Universal trigger executes on predicate satisfaction (Temporal, Biometric, Spatial). Cryptographic revocation of predecessor authority and distributed deletion via ZK-PoD.</p>
          </div>
        </div>

        <div className="mt-8 p-4 bg-freedom-red/10 border-l-4 border-freedom-red text-sm text-gray-300 font-mono flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <span className="text-freedom-red font-bold">CRITICAL:</span> ZK-PoD (Proof of Deletion) proves previous existence, complete overwrite, and reconstruction failure. Absolute Zero Storage achieved via information-theoretic security.
          </div>
          <button 
            onClick={() => {
              // Custom event for SwarmOS to handle the burn sequence
              window.dispatchEvent(new CustomEvent('agate-burn-trigger'));
              window.scrollTo({ top: document.getElementById('swarm')?.offsetTop || 0, behavior: 'smooth' });
            }}
            className="px-6 py-2 bg-freedom-red text-white font-bold uppercase tracking-widest rounded hover:bg-red-700 transition-all shadow-[0_0_20px_rgba(220,20,60,0.4)]"
          >
            Trigger_Universal_Burn
          </button>
        </div>
      </div>
    </section>
  );
}
