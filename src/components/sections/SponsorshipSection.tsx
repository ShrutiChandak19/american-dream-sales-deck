import React from 'react';
import { motion } from 'motion/react';
import { Check, Star, ShieldCheck, TrendingUp, ArrowRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { VideoBackground } from '../VideoBackground';

const tiers = [
  {
    id: 'tier1',
    name: 'Property Partner',
    sub: 'Logo Placement & Signage',
    price: 'Custom',
    features: [
      'Logo on digital signage',
      'Basic foot traffic data',
      'Social media mentions',
      'Shared sponsorship credits'
    ],
    highlight: false
  },
  {
    id: 'tier2',
    name: 'Zone Takeover',
    sub: 'Naming Rights & Physical Activations',
    price: 'Premium',
    features: [
      'Naming rights to specific wings',
      'Custom physical brand activations',
      'Lead generation integration',
      'Advanced demographic heatmaps',
      'Quarterly performance audits'
    ],
    highlight: true
  },
  {
    id: 'tier3',
    name: 'Global Anchor',
    sub: 'Category Exclusivity & 360 Integration',
    price: 'Elite',
    features: [
      'Total category exclusivity',
      '360-degree digital & social push',
      'VIP hosting & event rights',
      'Bespoke co-branded storytelling',
      'Dedicated partnership manager',
      'Full facility access for productions'
    ],
    highlight: false
  }
];

interface Props { scrollContainer?: React.RefObject<HTMLElement>; }

export function SponsorshipSection({ scrollContainer }: Props) {
  const vp = { root: scrollContainer };
  return (
    <section id="partnerships" className="snap-section min-h-screen pt-32 pb-24 px-8 md:px-24 relative overflow-hidden flex items-center justify-center">
      <VideoBackground src="/videos/convention-expo.mp4" overlayOpacity={0.85} />
      
      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <header className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
          >
            <span className="text-gold uppercase tracking-[0.6em] text-[10px] font-black mb-6 block">The Partnership Ecosystem</span>
            <h2 className="text-5xl md:text-[6rem] font-display text-white mb-10 leading-none">
              A Global <span className="italic text-gold">Stage</span>
            </h2>
            <p className="text-white/50 text-xl max-w-3xl mx-auto font-light leading-relaxed">
              We offer a high-performance platform for global brands to connect with 
              millions of high-intent visitors in a digitally-integrated physical space.
            </p>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, idx) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ delay: idx * 0.1 }}
              className={cn(
                "group relative p-12 rounded-[48px] border border-white/5 bg-white/[0.03] backdrop-blur-2xl transition-all duration-700 flex flex-col hover:border-gold/30",
                tier.highlight && "border-gold/20 bg-gold/[0.02] shadow-[0_40px_80px_rgba(212,175,55,0.1)]"
              )}
            >
              {tier.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold text-black text-[10px] font-black uppercase tracking-[0.2em] px-6 py-2 rounded-full shadow-2xl">
                  Most Preferred
                </div>
              )}

              <div className="mb-12">
                <div className="flex justify-between items-start mb-8">
                  <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center group-hover:bg-gold/10 transition-colors border border-white/5">
                    {idx === 0 ? <Star className="text-gold" size={28} /> : idx === 1 ? <TrendingUp className="text-gold" size={28} /> : <ShieldCheck className="text-gold" size={28} />}
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-white/30 uppercase tracking-[0.3em] mb-2 font-black">Investment</p>
                    <p className="text-gold font-display text-2xl tracking-tighter">{tier.price}</p>
                  </div>
                </div>
                <h3 className="text-3xl font-display text-white mb-4 uppercase tracking-tight">{tier.name}</h3>
                <p className="text-white/40 text-sm font-light leading-relaxed">{tier.sub}</p>
              </div>

              <ul className="space-y-5 mb-14 flex-1">
                {tier.features.map((feature, fidx) => (
                  <li key={fidx} className="flex items-start gap-4 text-white/60 text-sm font-medium">
                    <div className="w-5 h-5 rounded-full bg-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={12} className="text-gold" />
                    </div>
                    <span className="leading-tight">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className="w-full py-6 rounded-3xl border border-white/10 text-white/60 group-hover:border-gold group-hover:bg-gold group-hover:text-black transition-all duration-500 font-black uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-3 shadow-2xl shadow-gold/10">
                INQUIRE NOW <ArrowRight size={16} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
