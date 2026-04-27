import React from 'react';
import { motion } from 'motion/react';

const LUXURY_EASE = [0.16, 1, 0.3, 1];

interface BigStatementProps {
  number: string;
  text: string;
  subtext?: string;
  className?: string;
}

export function BigStatement({ number, text, subtext, className }: BigStatementProps) {
  return (
    <section className={`py-40 md:py-60 px-8 flex items-center justify-center bg-black overflow-hidden relative ${className}`}>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="text-center relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 1.5, ease: LUXURY_EASE }}
          className="flex flex-col items-center"
        >
          <span className="text-gold uppercase tracking-[0.5em] text-xs font-bold mb-8 block opacity-40">Impact Report</span>
          <h2 className="text-7xl md:text-[12rem] font-display font-medium text-white leading-none tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/20">
            {number}
          </h2>
          <p className="text-xl md:text-3xl font-light text-white/50 tracking-widest uppercase max-w-2xl mx-auto">
            {text}
          </p>
          {subtext && (
            <p className="text-gold/40 text-[10px] uppercase tracking-[0.3em] font-bold mt-8">
              {subtext}
            </p>
          )}
        </motion.div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05)_0%,transparent_70%)] pointer-events-none" />
    </section>
  );
}
