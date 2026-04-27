import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, ArrowRight } from 'lucide-react';
import { usePerspective } from '../lib/PerspectiveContext';

const LUXURY_EASE = [0.16, 1, 0.3, 1];

// Global event bus so FloatingCTA can open the leasing panel without prop drilling
export const openLeasingPanel = () => {
  window.dispatchEvent(new CustomEvent('open-leasing-panel'));
};

export function FloatingCTA() {
  const { perspective } = usePerspective();

  const getLabel = () => {
    switch (perspective) {
      case 'retail': return 'Inquire Leasing';
      case 'event': return 'Book Venue';
      case 'brand': return 'Partner Now';
      default: return 'Get In Touch';
    }
  };

  const handleClick = () => {
    // Scroll to footer contact form, or fire leasing panel
    openLeasingPanel();
  };

  return (
    <div className="fixed bottom-10 right-10 z-[60] pointer-events-none">
      <motion.button
        onClick={handleClick}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2, duration: 1, ease: LUXURY_EASE }}
        className="pointer-events-auto group relative flex items-center gap-4 bg-gold px-8 py-5 rounded-full shadow-2xl shadow-gold/20 hover:shadow-gold/40 transition-all duration-500 hover:scale-105 active:scale-95"
      >
        <Mail size={20} className="text-black transition-transform duration-500 group-hover:rotate-12" />
        <span className="text-black font-black uppercase tracking-[0.2em] text-[11px] whitespace-nowrap">
          {getLabel()}
        </span>
        <ArrowRight size={16} className="text-black transition-transform duration-500 group-hover:translate-x-1" />
        <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-md" />
      </motion.button>
    </div>
  );
}
