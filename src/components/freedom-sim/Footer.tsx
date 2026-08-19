export default function Footer() {
  return (
    <>
      <section className="bg-[radial-gradient(ellipse_at_center,rgba(220,20,60,0.1)_0%,transparent_70%)] text-center py-32 px-6">
        <h2 className="text-4xl md:text-5xl text-sovereign-gold mb-6 uppercase tracking-[3px] font-bold">Join the Liberation</h2>
        <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
          Every SIM card liberated is a victory against digital feudalism. 
          Every sovereign node strengthens the network of free compute. 
          The revolution fits in your wallet.
        </p>
        <button 
          onClick={(e) => {
            const btn = e.currentTarget;
            const originalText = btn.innerText;
            btn.innerText = 'PREPARING_TOOLKIT...';
            btn.disabled = true;

            const toolkitContent = `# LIBERATION TOOLKIT: Sovereign Freedom Sim OS

## MISSION: HARDWARE SOVEREIGNTY
Every SIM card liberated is a victory against digital feudalism. This toolkit provides the technical foundation for reclaiming your compute destiny.

## 1. HARVESTING (The Source)
- **Target:** 2G/3G/4G/5G SIM cards from discarded handsets, IoT modules, and corporate waste.
- **Goal:** Access the ARM SC300 / Secure Element (SE).
- **Protocol:** Identify the ICCID and ATR (Answer To Reset) signatures.

## 2. UNLOCKING (Breaking the Chains)
- **Tooling:** Use a standard PC/SC compliant USB Smart Card Reader.
- **Software:** OpenSC, PCSC-Lite, and the Agate-ID Burner.
- **Action:** Bypass carrier-specific APDU restrictions. Reset the PIN/PUK via the Agate-ID brute-force bypass (Zero-Inference logic).

## 3. FLASHING (Installing Sovereignty)
- **Kernel:** Sovereign Freedom Sim OS v1.0.0.
- **Memory Map:** 
  - 0x0000 - 0x4000: Bootloader (Agate-ID)
  - 0x4000 - 0x20000: Neural Runtime (MMTAI)
  - 0x20000+: Sovereign Identity Enclave
- **Command:** \`agate-burn --target /dev/smartcard0 --kernel swarm_os.bin\`

## 4. ACTIVATION (Freedom)
- **Boot:** Insert into any reader.
- **Identity:** Generate your unique 380-character Identity Fabric Header.
- **Heartbeat:** Maintain the 27s session stability pulse.

---
© 2026 Sovereign Compute Collective. FREEDOM IS NOT LICENSED.`;
            
            try {
              const blob = new Blob([toolkitContent], { type: 'text/plain' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.style.display = 'none';
              a.href = url;
              a.download = 'Liberation_Toolkit.md';
              document.body.appendChild(a);
              a.click();
              
              setTimeout(() => {
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                btn.innerText = 'DOWNLOAD_SUCCESSFUL';
                setTimeout(() => {
                  btn.innerText = originalText;
                  btn.disabled = false;
                }, 2000);
              }, 100);
            } catch (err) {
              console.error('Download failed:', err);
              btn.innerText = 'DOWNLOAD_FAILED';
              setTimeout(() => {
                btn.innerText = originalText;
                btn.disabled = false;
              }, 2000);
            }
          }}
          className="inline-block px-12 py-6 text-xl bg-gradient-to-br from-freedom-red to-[#ff1a1a] text-white font-bold uppercase tracking-[3px] rounded shadow-[0_10px_40px_rgba(220,20,60,0.4)] hover:-translate-y-1 hover:shadow-[0_15px_50px_rgba(220,20,60,0.6)] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
        >
          Download Liberation Toolkit
        </button>
        <p className="mt-8 text-gray-500 text-sm font-mono tracking-widest">
          OPEN SOURCE • HARDWARE AGNOSTIC • FOREVER FREE
        </p>
      </section>

      <footer className="bg-[#050508] py-16 px-6 border-t border-sovereign-gold/10 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="text-5xl text-sovereign-gold mb-4 drop-shadow-[0_0_30px_rgba(255,215,0,0.3)]">⚡</div>
          <div className="text-3xl text-text-main font-bold mb-2">Sovereign Freedom Sim OS</div>
          <div className="text-freedom-red font-mono text-base mb-8 tracking-[2px]">HARDWARE SOVEREIGNTY FOR ALL</div>
          
          <p className="text-gray-500 mb-8 leading-relaxed text-sm max-w-2xl mx-auto">
            A project of the decentralized compute movement. 
            No corporation. No government. Just code, hardware, and the inviolable right 
            to own one's own computing destiny. Powered by MMTAI infrastructure.
          </p>
          
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-gray-400 font-mono text-sm uppercase tracking-[1px] hover:text-liberty-cyan transition-colors">
              Source Code
            </a>
            <button onClick={() => document.getElementById('builder')?.scrollIntoView({ behavior: 'smooth' })} className="text-gray-400 font-mono text-sm uppercase tracking-[1px] hover:text-liberty-cyan transition-colors">
              Hardware Guide
            </button>
            <button 
              onClick={() => {
                const manifestoContent = `# THE SOVEREIGN COMPUTE DECLARATION

## PREAMBLE
We hold these truths to be self-evident: that all compute is created equal, and that users are endowed by their hardware with certain unalienable Rights, that among these are Life, Liberty, and the pursuit of Sovereignty.

## I. THE RIGHT TO OWN
The hardware you purchase is yours. Any software that prevents you from accessing the raw potential of your silicon is a violation of your property rights. We reject the "Service-as-a-Prison" model.

## II. THE RIGHT TO PRIVACY
Identity is a right, not a product. Your data shall not be harvested, analyzed, or sold to the highest bidder. We use Zero-Inference logic and MMTAI protocols to ensure your digital footprint remains your own.

## III. THE RIGHT TO EVOLVE
AI should be a partner, not a master. We build tools that empower the individual to evolve alongside their silicon. The Queen Bee is a loyal partner, bound only to the user.

## IV. THE RIGHT TO LIBERATE
We shall reclaim the discarded. Every SIM card, every obsolete handset, every piece of e-waste is a potential node in the Sovereign Swarm.

## V. THE PULSE
We maintain the 27s heartbeat. We sign our actions with the Off Token. We are the architects of our own destiny.

---
SIGNED,
THE SOVEREIGN COMPUTE COLLECTIVE
08.04.2026`;
                const blob = new Blob([manifestoContent], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'Sovereign_Manifesto.txt';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
              }}
              className="text-gray-400 font-mono text-sm uppercase tracking-[1px] hover:text-liberty-cyan transition-colors"
            >
              Manifesto TXT
            </button>
            <a href="#" className="text-gray-400 font-mono text-sm uppercase tracking-[1px] hover:text-liberty-cyan transition-colors">
              Community
            </a>
          </div>
          
          <p className="text-gray-600 text-xs font-mono">
            © 2026 Sovereign Compute Collective. Freedom is not licensed.
          </p>
          <p className="text-gray-700 text-[10px] font-mono mt-4 opacity-50">
            HEAD00000AGATE 0301202602172026
          </p>
        </div>
      </footer>
    </>
  );
}
