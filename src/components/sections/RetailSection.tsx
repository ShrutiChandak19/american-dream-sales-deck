import React from 'react';
import { motion } from 'motion/react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, ShoppingBag, Globe2, ArrowRight } from 'lucide-react';
import { VideoBackground } from '../VideoBackground';

const data = [
  { month: 'Jan', traffic: 2.1, sales: 1.8 },
  { month: 'Feb', traffic: 2.3, sales: 1.9 },
  { month: 'Mar', traffic: 2.8, sales: 2.4 },
  { month: 'Apr', traffic: 3.2, sales: 2.8 },
  { month: 'May', traffic: 3.5, sales: 3.1 },
  { month: 'Jun', traffic: 4.1, sales: 3.8 },
];

const stats = [
  { icon: Globe2, label: 'Annual Visitors', value: '40M+', detail: 'Global Reach' },
  { icon: ShoppingBag, label: 'Total Retailers', value: '450+', detail: 'Luxury & High-Street' },
  { icon: Users, label: 'Avg Dwell Time', value: '3.5 Hrs', detail: 'Higher Engagement' },
  { icon: TrendingUp, label: 'Conversion Rate', value: '+22%', detail: 'Above Industry Avg' },
];

interface Props { scrollContainer?: React.RefObject<HTMLElement>; }

export function RetailSection({ scrollContainer }: Props) {
  const vp = { root: scrollContainer };
  const [isInView, setIsInView] = React.useState(false);

  return (
    <section id="retail" className="snap-section min-h-screen flex items-center justify-center p-6 md:p-12 lg:p-24 overflow-hidden relative">
      <VideoBackground src="/videos/retail-floor.mp4" overlayOpacity={0.7} scrollContainer={scrollContainer} />
      
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center relative z-10">
        <div>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
          viewport={vp}
            className="mb-8"
          >
            <span className="text-gold tracking-[0.4em] uppercase text-xs font-bold mb-4 block">Commercial Hub</span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-display text-white mb-6 leading-tight">
              The Data of <span className="text-gold italic">Dreaming</span>
            </h2>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={vp}
            transition={{ delay: 0.2 }}
            className="text-white/70 text-lg md:text-xl font-light mb-12 max-w-xl leading-relaxed"
          >
            Position your brand where the world meets. Our unique mix of entertainment 
            and retail drives unprecedented foot traffic and sustained engagement.
          </motion.p>

          <div className="grid grid-cols-2 gap-8 mb-12">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={vp}
                transition={{ delay: i * 0.1 }}
                className="group p-6 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/5 hover:border-gold/30 transition-all hover:bg-white/[0.06]"
              >
                <stat.icon className="text-gold mb-4 opacity-60 group-hover:opacity-100 transition-opacity" size={28} />
                <div className="text-4xl font-display font-medium text-white mb-1">{stat.value}</div>
                <div className="text-[10px] uppercase tracking-widest text-white/40 font-bold">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <motion.button 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={vp}
            className="group flex items-center gap-4 bg-white text-black px-10 py-5 rounded-full font-black uppercase tracking-[0.2em] text-[11px] hover:bg-gold transition-all duration-500"
          >
            Explore Leasing Opportunities <ArrowRight size={16} />
          </motion.button>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={vp}
          onViewportEnter={() => setIsInView(true)}
          className="bg-black/60 border border-white/10 p-10 rounded-[40px] backdrop-blur-2xl relative overflow-hidden min-h-[500px] flex flex-col"
        >
          <div className="absolute top-0 right-0 p-6">
            <span className="text-[10px] uppercase tracking-widest text-gold bg-gold/10 px-2 py-1 rounded">2026 Forecast</span>
          </div>
          
          <h3 className="text-xl font-display mb-8">Traffic Growth Analysis</h3>
          
          <div className="w-full h-64 relative min-h-[256px] min-w-0">
            {isInView && (
              <ResponsiveContainer width="100%" height="100%" debounce={50}>
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorGold" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                  <XAxis 
                    dataKey="month" 
                    stroke="#ffffff40" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111', border: '1px solid #D4AF3730', borderRadius: '12px' }}
                    itemStyle={{ color: '#D4AF37' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="traffic" 
                    stroke="#D4AF37" 
                    fillOpacity={1} 
                    fill="url(#colorGold)" 
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
          
          <div className="mt-auto flex items-center justify-between text-xs text-white/30 tracking-tight pt-8 border-t border-white/5">
            <span>UNMATCHED PERFORMANCE</span>
            <span>VERIFIED DATA BY VISTA RETAIL</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
