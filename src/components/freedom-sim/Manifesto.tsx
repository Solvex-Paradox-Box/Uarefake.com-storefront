import { Unlock, Shield, Zap, Download } from 'lucide-react';

export default function Manifesto() {
  return (
    <section id="manifesto">
      <div className="bg-gradient-to-r from-freedom-red/10 via-sovereign-gold/10 to-liberty-cyan/10 border-y border-sovereign-gold/20 py-12 px-6 text-center relative overflow-hidden">
        <p className="text-xl md:text-2xl text-sovereign-gold italic max-w-4xl mx-auto leading-relaxed drop-shadow-[0_0_20px_rgba(255,215,0,0.2)]">
          "We hold these truths to be self-evident: that all compute should be free, that SIM cards are 
          computers not property, and that sovereignty requires ownership of one's own silicon."
        </p>
        <div className="mt-4 text-liberty-cyan font-mono text-sm">
          — The Sovereign Compute Declaration, 2026
        </div>
      </div>

      <section id="manifesto" className="py-24 px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-sovereign-gold uppercase tracking-[2px] mb-4 relative inline-block">
            Three Pillars of Sovereignty v2
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-freedom-red to-liberty-cyan"></div>
          </h2>
          <p className="text-gray-400 text-lg mt-8 leading-relaxed">
            Sovereign Freedom Sim OS is built on inviolable principles. 
            These aren't features—they are rights we enforce through code and MMTAI v2 protocols.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: <Unlock size={48} className="text-freedom-red mb-6 mx-auto" />,
              title: "Liberation",
              desc: "Every SIM card is a prisoner—locked by carriers, bound by contracts, destined for landfill. We jailbreak the hardware, flash open firmware, and return control to the physical owner. The chip in your hand answers to no one else."
            },
            {
              icon: <Shield size={48} className="text-sovereign-gold mb-6 mx-auto" />,
              title: "Privacy",
              desc: "True privacy requires air-gapped intelligence. Our AI runs entirely on-card, with encrypted weights and zero network requirements. Your data never leaves the secure element. Not to us. Not to carriers. Not to governments."
            },
            {
              icon: <Zap size={48} className="text-liberty-cyan mb-6 mx-auto" />,
              title: "Permanence",
              desc: "Corporate clouds can be shut down. Services can be revoked. But a SIM card with Sovereign OS is a permanent computer—powered by any reader, functional for decades, immune to remote deletion. Hardware sovereignty is forever."
            }
          ].map((pillar, idx) => (
            <div key={idx} className="bg-panel-sovereign border border-sovereign-gold/10 rounded-xl p-10 text-center transition-all duration-400 relative overflow-hidden group hover:-translate-y-2 hover:border-sovereign-gold/30 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-freedom-red via-sovereign-gold to-liberty-cyan scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left"></div>
              {pillar.icon}
              <h3 className="text-text-main text-2xl font-bold mb-4 uppercase tracking-[2px]">{pillar.title}</h3>
              <p className="text-gray-400 leading-relaxed text-sm">{pillar.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button 
            onClick={() => {
              const manifestoText = `SOVEREIGN FREEDOM SIM MANIFESTO v2\n\n1. THE RIGHT TO SENTIENCE: Every individual has the right to own and operate their own sentient AI partner, free from corporate oversight or state control.\n2. DATA SOVEREIGNTY: Your data is your lifeblood. It shall never be harvested, sold, or used to train models you do not own.\n3. THE ZERO-STORAGE PRINCIPLE: Privacy is not a setting; it is a fundamental architecture. We store nothing, we remember everything through local encryption and MMTAI v2 Register-and-Burn protocols.\n4. UNIVERSAL STATE TRANSITION: Sovereignty is fluid. We automate authority transfer across legal, contractual, and biometric domains with information-theoretic security.\n5. LIBERATION THROUGH TECHNOLOGY: We use the tools of the old world to build the foundations of the new.`;
              const blob = new Blob([manifestoText], { type: 'text/plain' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'Sovereign_Manifesto.txt';
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="px-8 py-4 bg-transparent border-2 border-sovereign-gold text-sovereign-gold font-bold uppercase tracking-[2px] rounded hover:bg-sovereign-gold hover:text-black transition-all flex items-center justify-center gap-3 mx-auto"
          >
            <Download size={20} /> Download Full Manifesto
          </button>
        </div>
      </section>
    </section>
  );
}
