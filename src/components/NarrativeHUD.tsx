import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2 } from 'lucide-react';

const narratives: Record<string, string> = {
  intro: "Welcome to American Dream. A new paradigm of retail and entertainment in the heart of the New York Metro area.",
  location: "Minutes from Manhattan, we are the gateway to the world's most affluent consumer market.",
  retail: "Integrated entertainment drives 22% higher conversion than traditional retail environments.",
  luxury: "Step into The Avenue. A curated sanctuary for the world's most iconic luxury houses and their VIP clients.",
  lifestyle: "Experience flavor as theater. Our dining anchors ensure sustained engagement and high-frequency visitation.",
  entertainment: "World-record breaking attractions ensure consistent foot traffic every single day, regardless of season.",
  conventions: "Our infrastructure is built for high-impact cultural spectacles, global launches, and massive expositions.",
  capacity: "Intelligent spatial design allows for seamless activations of any scale, from 500 to 5,000+ guests.",
  events: "This is where moments happen. Partner with us to activate your brand on the world's largest interactive stage.",
};

export function NarrativeHUD({ activeSection, isActive, onToggle }: { activeSection: string; isActive: boolean; onToggle: () => void }) {
  const text = narratives[activeSection];

  return (
    <AnimatePresence>
      {isActive && text && (
        <motion.div
          initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[60] w-[90%] max-w-2xl"
        >
          <button 
            onClick={onToggle}
            className="w-full text-left bg-black/40 backdrop-blur-2xl border border-white/10 p-6 md:p-8 rounded-3xl shadow-2xl flex gap-6 items-center group transition-all hover:bg-black/60 hover:border-gold/30 hover:scale-[1.02]"
          >
            <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center shrink-0 group-hover:bg-gold/20 transition-colors">
               <Volume2 className="text-gold animate-pulse" size={20} />
            </div>
            <div className="flex-1">
               <div className="flex justify-between items-center mb-2">
                 <div className="text-[10px] text-gold tracking-[0.3em] font-bold uppercase">Narrative Insight</div>
                 <div className="text-[8px] text-white/30 tracking-widest uppercase group-hover:text-gold transition-colors">Click to pause tour</div>
               </div>
               <p className="text-white/80 font-light leading-relaxed">
                 {text}
               </p>
            </div>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
