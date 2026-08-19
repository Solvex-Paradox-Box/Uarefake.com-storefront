import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, X, Zap, Shield, Cpu, Terminal, Smartphone, Brain } from 'lucide-react';

interface Step {
  id: string;
  title: string;
  content: string;
  targetId: string;
  icon: React.ReactNode;
}

const steps: Step[] = [
  {
    id: 'welcome',
    title: 'Welcome to Sovereign Freedom',
    content: 'You are entering a realm of digital autonomy. Sovereign Freedom Sim OS transforms discarded SIM cards into personal, AI-powered computers. No cloud, no gatekeepers.',
    targetId: 'hero',
    icon: <Zap className="text-sovereign-gold" size={24} />
  },
  {
    id: 'manifesto',
    title: 'The Sovereign Pillars',
    content: 'Our mission is built on three pillars: Ownership of silicon, freedom of compute, and absolute privacy. Every chip reclaimed is a victory.',
    targetId: 'manifesto',
    icon: <Shield className="text-freedom-red" size={24} />
  },
  {
    id: 'liberate',
    title: 'Hardware Liberation',
    content: 'The Liberation Pipeline is your guide to reclaiming hardware. Harvest discarded SIMs, break carrier locks, and flash our sovereign kernel.',
    targetId: 'liberation',
    icon: <Smartphone className="text-liberty-cyan" size={24} />
  },
  {
    id: 'training',
    title: 'Neural Engine',
    content: 'Train lightweight AI models directly on the SIM card\'s secure element. Zero data exfiltration. Your intelligence remains yours.',
    targetId: 'training',
    icon: <Brain className="text-sovereign-gold" size={24} />
  },
  {
    id: 'swarm',
    title: 'The Swarm Interface',
    content: 'Interact with your partner AI, the Queen Bee. This is your command center for managing the virtual file system, knowledge base, and neural bridges.',
    targetId: 'swarm',
    icon: <Terminal className="text-liberty-cyan" size={24} />
  },
  {
    id: 'builder',
    title: 'Universal OS Compiler',
    content: 'Ready to go physical? Compile this interface into a bootable OS for any device. Puter.js integration ensures your cloud sovereignty is also portable.',
    targetId: 'builder',
    icon: <Cpu className="text-freedom-red" size={24} />
  }
];

interface OnboardingTourProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function OnboardingTour({ isVisible, onClose }: OnboardingTourProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      scrollToTarget(steps[currentStep + 1].targetId);
    } else {
      completeTour();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      scrollToTarget(steps[currentStep - 1].targetId);
    }
  };

  const scrollToTarget = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const completeTour = () => {
    onClose();
    localStorage.setItem('sovereign_tour_seen', 'true');
    setCurrentStep(0); // Reset for next time
  };

  const skipTour = () => {
    completeTour();
  };

  if (!isVisible) return null;

  const step = steps[currentStep];

  return (
    <div className="fixed inset-0 z-[10000] pointer-events-none flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto" onClick={skipTour} />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-md bg-panel-sovereign border-2 border-sovereign-gold/30 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] p-8 pointer-events-auto overflow-hidden"
      >
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
          <motion.div 
            className="h-full bg-sovereign-gold shadow-[0_0_10px_rgba(255,215,0,0.5)]"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>

        <button 
          onClick={skipTour}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-xl bg-sovereign-gold/10 flex items-center justify-center border border-sovereign-gold/20">
            {step.icon}
          </div>
          <div>
            <div className="text-[10px] font-mono text-sovereign-gold uppercase tracking-[3px] mb-1">
              Protocol Step {currentStep + 1}/{steps.length}
            </div>
            <h3 className="text-xl font-bold text-white uppercase tracking-tight">{step.title}</h3>
          </div>
        </div>

        <p className="text-gray-400 font-mono text-sm leading-relaxed mb-8">
          {step.content}
        </p>

        <div className="flex items-center justify-between">
          <button 
            onClick={skipTour}
            className="text-xs font-mono text-gray-500 hover:text-gray-300 uppercase tracking-widest transition-colors"
          >
            Skip Tour
          </button>
          
          <div className="flex items-center gap-3">
            {currentStep > 0 && (
              <button 
                onClick={handlePrev}
                className="p-2 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-all"
              >
                <ChevronLeft size={20} />
              </button>
            )}
            <button 
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-2 bg-sovereign-gold text-black font-bold uppercase tracking-widest rounded-lg hover:scale-105 transition-transform"
            >
              <span>{currentStep === steps.length - 1 ? 'Finish' : 'Next'}</span>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-sovereign-gold/5 rounded-full blur-3xl" />
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-liberty-cyan/5 rounded-full blur-3xl" />
      </motion.div>
    </div>
  );
}
