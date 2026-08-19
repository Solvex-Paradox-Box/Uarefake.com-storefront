import { Smartphone, Unlock, HardDrive, Rocket } from 'lucide-react';

export default function Liberation() {
  const steps = [
    {
      num: "01",
      title: "Collect the Discarded",
      action: "Harvest",
      icon: <Smartphone size={64} className="text-freedom-red" />,
      desc: "Source old SIM cards from phones, tablets, IoT devices, and corporate waste streams. 2G through 5G—all are valid. The more obsolete to carriers, the more valuable to us. Every discarded chip is a potential sovereign node."
    },
    {
      num: "02",
      title: "Break the Chains",
      action: "Unlock",
      icon: <Unlock size={64} className="text-sovereign-gold" />,
      desc: "Use the Liberation Toolkit to bypass carrier locks, disable remote management, and access the raw ARM SC300 secure element. We replace proprietary JavaCard VMs with bare-metal freedom. The hardware is yours—we just remove the software prisons."
    },
    {
      num: "03",
      title: "Flash Sovereignty",
      action: "Install",
      icon: <HardDrive size={64} className="text-liberty-cyan" />,
      desc: "Burn the Sovereign Freedom Sim OS kernel onto the 256KB flash. Includes MMTAI v2.0 microkernel, neural runtime, and VDS state management. The card becomes a self-contained, AI-capable sovereign computer—no network required."
    },
    {
      num: "04",
      title: "Activate Freedom",
      action: "Deploy",
      icon: <Rocket size={64} className="text-white" />,
      desc: "Insert into any USB reader or initiate Direct Injection. The OS boots instantly, replacing the host environment with the Sovereign AI OS. It generates sovereign cryptographic keys and begins local AI inference. No accounts. No subscriptions. Just compute."
    }
  ];

  return (
    <section id="liberation" className="py-24 px-6 bg-gradient-to-b from-dark-sovereign to-[#0f0f18]">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-4xl font-bold text-sovereign-gold uppercase tracking-[2px] mb-4 relative inline-block">
          The Liberation Pipeline
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-freedom-red to-liberty-cyan"></div>
        </h2>
        <p className="text-gray-400 text-lg mt-8 leading-relaxed">
          From corporate e-waste to sovereign compute node. Four steps to digital freedom.
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        {steps.map((step, idx) => (
          <div key={idx} className={`flex flex-col md:flex-row items-center mb-12 bg-panel-sovereign rounded-2xl overflow-hidden border border-sovereign-gold/10 transition-all duration-300 hover:border-sovereign-gold/30 hover:shadow-[0_10px_40px_rgba(0,0,0,0.4)] ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
            <div className="w-full md:w-[250px] h-[200px] md:h-auto self-stretch bg-gradient-to-br from-freedom-red/10 to-sovereign-gold/10 flex items-center justify-center shrink-0 border-b md:border-b-0 md:border-r border-sovereign-gold/10">
              {step.icon}
            </div>
            <div className="p-8 md:p-10 flex-1">
              <div className="font-mono text-sm text-freedom-red mb-2 uppercase tracking-[2px]">
                Step {step.num}: {step.action}
              </div>
              <h3 className="text-2xl text-sovereign-gold font-bold mb-4">{step.title}</h3>
              <p className="text-gray-400 leading-relaxed">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-16">
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
- **Kernel:** Sovereign Freedom Sim OS v2.0.0 (MMTAI v2).
- **Architecture:** Vertical Data Segregation (VDS) - Track A/B.
- **Memory Map:** 
  - 0x0000 - 0x4000: Bootloader (Agate-ID)
  - 0x4000 - 0x20000: Neural Runtime (MMTAI v2)
  - 0x20000+: Sovereign Identity Enclave
- **Command:** \`agate-burn --target /dev/smartcard0 --kernel swarm_os_v2.bin\`

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
          className="px-10 py-5 bg-freedom-red text-white font-bold uppercase tracking-[2px] rounded shadow-[0_10px_30px_rgba(220,20,60,0.3)] hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(220,20,60,0.5)] transition-all disabled:opacity-70"
        >
          Download Liberation Toolkit
        </button>
      </div>
    </section>
  );
}
