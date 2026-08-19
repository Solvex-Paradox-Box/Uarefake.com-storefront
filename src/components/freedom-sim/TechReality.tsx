export default function TechReality() {
  return (
    <section id="deploy" className="py-24 px-6 relative z-10">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-4xl font-bold text-sovereign-gold uppercase tracking-[2px] mb-4 relative inline-block">
          Technical Reality
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-freedom-red to-liberty-cyan"></div>
        </h2>
        <p className="text-gray-400 text-lg mt-8 leading-relaxed">
          Sovereignty through extreme efficiency. We prove that freedom doesn't require massive infrastructure—
          just intelligent architecture.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16">
        {[
          { val: "32KB", label: "Total RAM" },
          { val: "256KB", label: "Flash Storage" },
          { val: "30MHz", label: "ARM SC300" },
          { val: "0%", label: "Cloud Dependency" }
        ].map((stat, idx) => (
          <div key={idx} className="bg-black/30 border border-sovereign-gold/20 rounded-xl p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-liberty-cyan hover:shadow-[0_10px_30px_rgba(0,206,209,0.1)]">
            <span className="block text-3xl md:text-4xl font-bold text-liberty-cyan mb-2 font-mono drop-shadow-[0_0_10px_rgba(0,206,209,0.3)]">{stat.val}</span>
            <span className="text-gray-500 text-xs md:text-sm uppercase tracking-[1px]">{stat.label}</span>
          </div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto bg-[#0c0c14] rounded-xl overflow-hidden border border-freedom-red/30 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
        <div className="bg-[#161622] px-6 py-4 flex items-center gap-2 border-b border-sovereign-gold/10">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
          <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
          <span className="ml-4 text-gray-500 font-mono text-sm">sovereign@freedom-node:~</span>
        </div>
        <div className="p-8 font-mono text-sm md:text-base leading-relaxed overflow-x-auto">
          <div className="mb-4">
            <span className="text-freedom-red font-bold mr-2">$</span>
            <span className="text-[#abb2bf]"><span className="text-sovereign-gold">sovereign-cli</span> status</span>
          </div>
          <div className="ml-6 text-gray-400 mb-8">
            <span className="text-liberty-cyan">● Sovereign Freedom Sim OS v2.0.1</span> (liberation build)<br/>
            Hardware: <span className="text-sovereign-gold">ARM SC300 Secure Element</span><br/>
            Memory: <span className="text-freedom-red">28KB/32KB</span> free (87.5% utilized)<br/>
            AI Runtime: <span className="text-liberty-cyan">ACTIVE</span> (quantized INT8)<br/>
            MMTAI Protocol: <span className="text-sovereign-gold">v2.0 ACTIVE</span> (Universal State Transition)<br/>
            VDS Architecture: <span className="text-liberty-cyan">ENFORCED</span> (Track A/B Segregated)<br/>
            Network: <span className="text-freedom-red">DISABLED</span> (air-gapped mode)<br/>
            Sovereignty: <span className="text-sovereign-gold">✓ VERIFIED</span> (keys generated on-card)<br/>
            Carrier Lock: <span className="text-liberty-cyan">✓ BYPASSED</span> (permanent unlock)<br/>
            Uptime: 47 days, 12 hours, 33 minutes
          </div>
          
          <div className="mb-4">
            <span className="text-freedom-red font-bold mr-2">$</span>
            <span className="text-[#abb2bf]"><span className="text-sovereign-gold">sovereign-cli</span> identity generate --type=sovereign</span>
          </div>
          <div className="ml-6 text-gray-400">
            Generating 256-bit sovereign identity... <span className="text-liberty-cyan">[OK]</span><br/>
            Private key: <span className="text-freedom-red">[SECURE ELEMENT - NEVER EXPORTED]</span><br/>
            Public key: 0x7f8a9b...c2d3e4f5<br/>
            DID: did:sov:freedom:<span className="text-sovereign-gold">sim-8f3a9c2e1d</span><br/>
            <span className="text-[#5c6370] italic"># Your identity is now permanent, portable, and completely under your control</span>
          </div>
        </div>
      </div>
    </section>
  );
}
