import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Facebook, Instagram, Linkedin, Twitter, ArrowUpCircle, CheckCircle2, Loader2, Send } from 'lucide-react';
import { usePerspective } from '../../lib/PerspectiveContext';

interface Props { onOpenLeasing?: () => void; }

type FormStatus = 'idle' | 'submitting' | 'success';

const INTEREST_OPTIONS = {
  retail: ['Flagship Lease', 'Pop-Up Space', 'Luxury Wing', 'F&B Opportunity'],
  brand: ['Naming Rights', 'Zone Takeover', 'Digital Signage', 'Event Activation'],
  event: ['Concert / Live Show', 'Corporate Event', 'Product Launch', 'Convention / Expo'],
};

const CTA_COPY = {
  retail: { heading: 'Ready to Open Your Doors?', sub: 'Connect with our leasing team to explore available retail spaces.' },
  brand: { heading: 'Build Your Brand at Scale.', sub: 'Our partnership team will design an activation package around your goals.' },
  event: { heading: 'Book the Stage.', sub: 'Our events team is ready to make your production a reality.' },
};

export function FooterSection({ onOpenLeasing }: Props) {
  const { perspective } = usePerspective();
  const [status, setStatus] = useState<FormStatus>('idle');
  const [form, setForm] = useState({ name: '', company: '', email: '', interest: '', message: '' });

  const copy = CTA_COPY[perspective ?? 'retail'] ?? CTA_COPY.retail;
  const interestOptions = INTEREST_OPTIONS[perspective ?? 'retail'] ?? INTEREST_OPTIONS.retail;

  const scrollToTop = () => {
    document.getElementById('intro')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setStatus('submitting');
    setTimeout(() => setStatus('success'), 1800);
  };

  return (
    <section id="footer" className="snap-section bg-zinc-950 flex flex-col justify-center px-8 md:px-24 overflow-y-auto">
      <div className="max-w-7xl mx-auto w-full py-16 md:py-24">

        {/* Top grid: brand + contact form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start border-b border-white/5 pb-20 mb-16">

          {/* Left — brand block */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <div className="text-4xl font-display font-black text-white select-none">
              AD<span className="text-gold">.</span>
            </div>
            <div>
              <motion.h2
                key={perspective}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl md:text-3xl font-display text-white mb-4 leading-tight"
              >
                {copy.heading}
              </motion.h2>
              <p className="text-white/40 text-base font-light leading-relaxed">
                {copy.sub}
              </p>
            </div>
            <address className="not-italic text-sm text-white/50 font-light space-y-1">
              <p>1 American Dream Way</p>
              <p>East Rutherford, NJ 07073</p>
              <a href="mailto:leasing@americandream.com" className="text-gold hover:text-white transition-colors block mt-3 font-medium">
                leasing@americandream.com
              </a>
            </address>
            <div className="flex gap-3 mt-2">
              {[Instagram, Linkedin, Facebook, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-gold hover:border-gold transition-all"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Right — contact form */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center text-center gap-6 py-20 border border-gold/20 rounded-3xl bg-gold/5"
                >
                  <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center">
                    <CheckCircle2 className="text-gold" size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-display text-white mb-2">Message Received</h3>
                    <p className="text-white/50 text-sm max-w-sm">
                      Our commercial team will be in touch within one business day.
                    </p>
                  </div>
                  <button
                    onClick={() => { setStatus('idle'); setForm({ name: '', company: '', email: '', interest: '', message: '' }); }}
                    className="text-[10px] uppercase tracking-widest text-gold/60 hover:text-gold transition-colors font-black"
                  >
                    Send Another Inquiry
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 md:p-10"
                >
                  <p className="text-[10px] uppercase tracking-[0.4em] text-gold font-black mb-8">Start the Conversation</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] uppercase tracking-widest text-white/30 font-black">Name *</label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className="bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-gold/50 transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] uppercase tracking-widest text-white/30 font-black">Company</label>
                      <input
                        name="company"
                        value={form.company}
                        onChange={handleChange}
                        placeholder="Brand or organization"
                        className="bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-gold/50 transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] uppercase tracking-widest text-white/30 font-black">Email *</label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@company.com"
                        className="bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-gold/50 transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] uppercase tracking-widest text-white/30 font-black">I'm Interested In</label>
                      <select
                        name="interest"
                        value={form.interest}
                        onChange={handleChange}
                        className="bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white/80 focus:outline-none focus:border-gold/50 transition-colors appearance-none cursor-pointer"
                      >
                        <option value="" className="bg-zinc-900">Select an option…</option>
                        {interestOptions.map((opt) => (
                          <option key={opt} value={opt} className="bg-zinc-900">{opt}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 mb-8">
                    <label className="text-[10px] uppercase tracking-widest text-white/30 font-black">Message</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Tell us about your brand, timeline, or vision…"
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-gold/50 transition-colors resize-none"
                    />
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={status === 'submitting' || !form.name || !form.email}
                    className="w-full flex items-center justify-center gap-3 py-4 bg-gold text-black font-black uppercase tracking-[0.2em] text-[11px] rounded-2xl hover:bg-white transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-gold/20"
                  >
                    {status === 'submitting' ? (
                      <><Loader2 size={16} className="animate-spin" /> Sending…</>
                    ) : (
                      <><Send size={16} /> Submit Inquiry</>
                    )}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[10px] tracking-[0.4em] font-display text-white/20 select-none">
            © 2026 AMERICAN DREAM. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-8">
            <div className="flex gap-8 text-[10px] tracking-widest uppercase text-white/20">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Media Kit</a>
            </div>
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-3 text-gold hover:text-white transition-colors uppercase tracking-[0.3em] text-[10px] font-bold"
            >
              <ArrowUpCircle className="group-hover:-translate-y-1 transition-transform" size={28} />
              <span className="hidden md:inline">Back to Top</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
