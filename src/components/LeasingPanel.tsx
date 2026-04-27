import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronRight, Mail, Users, Clock, ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';
import { cn } from '@/src/lib/utils';

type OfferingType = 'luxury' | 'activations' | 'entertainment';

interface OfferingData {
  title: string;
  traffic: string;
  dwell: string;
  summary: string;
  color: string;
}

const offerings: Record<OfferingType, OfferingData> = {
  luxury: {
    title: 'Luxury Retail',
    traffic: '12M+ Annual High-Value Visitors',
    dwell: '4.2 Hours Avg Dwell Time',
    summary: 'The Avenue at American Dream is home to the world\'s most iconic houses. Dedicated Saks wing and flagship Hermès presence.',
    color: 'gold'
  },
  activations: {
    title: 'Brand Activations',
    traffic: '150k+ Daily Foot Traffic',
    dwell: '3.5 Hours Avg Dwell Time',
    summary: 'Flexible open-court spaces for pop-ups, technology showcases, and global brand launches.',
    color: 'blue-500'
  },
  entertainment: {
    title: 'Entertainment Partnerships',
    traffic: '40M+ Annual Visitors',
    dwell: '5+ Hours Avg Dwell Time',
    summary: 'World-record anchors including Nickelodeon Universe and Big SNOW. Integrated branding across digital and physical stages.',
    color: 'purple-500'
  }
};

export function LeasingPanel({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [selectedPath, setSelectedPath] = React.useState<OfferingType | null>(null);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
         <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100]"
          />

          <motion.div
            initial={{ x: '100%', filter: 'blur(10px)' }}
            animate={{ x: 0, filter: 'blur(0px)' }}
            exit={{ x: '100%', filter: 'blur(10px)' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 h-full w-full md:w-[650px] bg-black/40 backdrop-blur-3xl border-l border-white/5 z-[101] shadow-[0_0_100px_rgba(0,0,0,1)] overflow-y-auto"
          >
            <div className="p-8 md:p-16 h-full flex flex-col relative">
              {/* Background Accent */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

              <div className="flex justify-between items-center mb-24 relative z-10">
                <div className="flex items-center gap-4">
                    {selectedPath && (
                        <button 
                            onClick={() => setSelectedPath(null)}
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-gold hover:text-black transition-all"
                        >
                            <ArrowLeft size={18} />
                        </button>
                    )}
                    <div>
                      <p className="text-[10px] text-white/40 uppercase tracking-[0.4em] font-black leading-none mb-1">PARTNERSHIP</p>
                      <h2 className="text-xl font-display text-gold uppercase tracking-widest leading-none">Concierge</h2>
                    </div>
                </div>
                <button 
                  onClick={onClose}
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-all text-white/40 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>

              {!selectedPath ? (
                <div className="space-y-16 flex-1 relative z-10">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <span className="text-gold uppercase tracking-[0.6em] text-[8px] font-black mb-4 block">Strategic Integration</span>
                    <h3 className="text-5xl md:text-6xl font-display text-white mb-6 leading-none">Elevate Your <br /><span className="text-gold italic">Presence</span></h3>
                    <p className="text-white/40 font-light text-lg leading-relaxed max-w-sm">Select your industry vertical to explore bespoke commercial opportunities.</p>
                  </motion.div>

                  <div className="space-y-4">
                    {(Object.keys(offerings) as OfferingType[]).map((key, idx) => {
                      const item = offerings[key];
                      return (
                        <motion.button
                          key={key}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + idx * 0.1 }}
                          onClick={() => setSelectedPath(key)}
                          className="w-full group relative flex items-center justify-between p-10 bg-white/[0.02] rounded-[40px] border border-white/5 hover:border-gold/30 transition-all duration-700 text-left overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                          <div className="relative z-10">
                            <span className="text-[9px] uppercase tracking-[0.3em] text-white/30 block mb-3 font-black">SECTOR {idx + 1}</span>
                            <div className="text-3xl font-display text-white group-hover:text-gold transition-colors duration-700">{item.title}</div>
                          </div>
                          <div className="relative z-10 w-12 h-12 border border-white/10 rounded-full flex items-center justify-center group-hover:bg-gold group-hover:text-black transition-all duration-700">
                            <ChevronRight size={24} />
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, filter: 'blur(0px)' }}
                  className="flex-1 space-y-16 relative z-10"
                >
                  <div>
                    <span className="text-gold uppercase tracking-[0.6em] text-[8px] font-black mb-4 block">Offering Portfolio</span>
                    <h3 className="text-5xl font-display text-white mb-8 uppercase tracking-tighter">{offerings[selectedPath].title}</h3>
                    <p className="text-white/50 text-xl leading-relaxed font-light">{offerings[selectedPath].summary}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-8 bg-white/[0.03] rounded-[32px] border border-white/5">
                      <Users className="text-gold mb-4" size={24} strokeWidth={1.5} />
                      <div className="text-3xl font-display text-white mb-1 tracking-tighter">{offerings[selectedPath].traffic.split(' ')[0]}</div>
                      <div className="text-[9px] text-white/30 uppercase tracking-[0.3em] font-black">Qualified Reach</div>
                    </div>
                    <div className="p-8 bg-white/[0.03] rounded-[32px] border border-white/5">
                      <Clock className="text-gold mb-4" size={24} strokeWidth={1.5} />
                      <div className="text-3xl font-display text-white mb-1 tracking-tighter">{offerings[selectedPath].dwell.split(' ')[0]} {offerings[selectedPath].dwell.split(' ')[1]}</div>
                      <div className="text-[9px] text-white/30 uppercase tracking-[0.3em] font-black">Brand Interaction</div>
                    </div>
                  </div>

                  <div className="pt-16 border-t border-white/5">
                    <h4 className="text-[10px] uppercase tracking-[0.5em] text-gold font-black mb-10">Request Digital Dossier</h4>
                    
                    {isSubmitted ? (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-gold/5 p-12 rounded-[40px] border border-gold/20 text-center"
                        >
                            <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                              <Mail className="text-gold" size={32} />
                            </div>
                            <div className="text-gold font-display text-2xl mb-2">Dossier Request Sent</div>
                            <p className="text-gold/60 text-sm font-medium">An executive consultant will review your profile shortly.</p>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <input 
                                    required
                                    type="text" 
                                    placeholder="Entity Name"
                                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-6 text-white focus:border-gold outline-none transition-all placeholder:text-white/20" 
                                />
                            </div>
                            <div>
                                <input 
                                    required
                                    type="email" 
                                    placeholder="Corporate Email Address"
                                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-6 text-white focus:border-gold outline-none transition-all placeholder:text-white/20" 
                                />
                            </div>
                            <button className="w-full py-6 bg-gold text-black font-black uppercase tracking-[0.4em] text-[10px] rounded-2xl hover:bg-gold/90 transition-all shadow-2xl shadow-gold/20 flex items-center justify-center gap-3">
                                SECURE PROSPECTUS <ArrowRight size={18} />
                            </button>
                        </form>
                    )}
                  </div>
                </motion.div>
              )}

              <footer className="mt-auto pt-16 flex items-center justify-between border-t border-white/5 relative z-10">
                <p className="text-[9px] text-white/20 tracking-[0.4em] uppercase font-black">Executive Partner Relations</p>
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                  <ShieldCheck size={14} className="text-white/20" />
                </div>
              </footer>
            </div>
          </motion.div>
         </>
      )}
    </AnimatePresence>
  );
}
