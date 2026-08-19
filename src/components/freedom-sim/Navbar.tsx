import { motion } from 'motion/react';
import { Zap, HelpCircle } from 'lucide-react';

interface NavbarProps {
  onStartTour: () => void;
}

export default function Navbar({ onStartTour }: NavbarProps) {
  return (
    <nav className="fixed top-0 w-full px-6 py-4 flex justify-between items-center bg-dark-sovereign/90 backdrop-blur-md z-50 border-b border-sovereign-gold/20">
      <a href="#" className="flex items-center gap-2 text-sovereign-gold font-mono font-bold text-xl no-underline">
        <motion.div
          animate={{ opacity: [1, 0.7, 1], scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Zap className="text-liberty-cyan drop-shadow-[0_0_15px_rgba(0,206,209,1)]" size={24} />
        </motion.div>
        SOVEREIGN AI SIM
      </a>
      <ul className="hidden md:flex gap-6 lg:gap-8 list-none m-0 p-0 items-center">
        {['Manifesto', 'Liberation', 'Training', 'Swarm', 'Ingest', 'Builder', 'MMTAI'].map((item) => (
          <li key={item}>
            <a
              href={`#${item.toLowerCase() === 'ingest' ? 'app-ingest' : item.toLowerCase()}`}
              className="text-text-main font-mono text-sm uppercase tracking-wider no-underline relative group hover:text-liberty-cyan transition-colors duration-300"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-freedom-red transition-all duration-300 group-hover:w-full shadow-[0_0_10px_rgba(220,20,60,1)]"></span>
            </a>
          </li>
        ))}
        <li>
          <button 
            onClick={onStartTour}
            className="flex items-center gap-2 px-4 py-2 bg-sovereign-gold/10 border border-sovereign-gold/30 text-sovereign-gold rounded-full hover:bg-sovereign-gold hover:text-black transition-all font-mono text-xs uppercase tracking-widest"
          >
            <HelpCircle size={14} />
            Tour
          </button>
        </li>
      </ul>
    </nav>
  );
}
