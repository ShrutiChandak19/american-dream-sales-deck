import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { TrendingUp, Target, Calendar, Download, CheckCircle2 } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const LUXURY_EASE = [0.16, 1, 0.3, 1];

type Industry = 'luxury' | 'tech' | 'mass';
type Duration = '1m' | '6m' | '1y';
type Reach = 'local' | 'global';

export function BrandROIModule() {
  const [industry, setIndustry] = useState<Industry>('luxury');
  const [duration, setDuration] = useState<Duration>('6m');
  const [reach, setReach] = useState<Reach>('global');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const stats = useMemo(() => {
    const baseVisitors = 40000000; // 40M annually
    
    // Multipliers
    const industryMult = industry === 'luxury' ? 1.5 : industry === 'tech' ? 1.2 : 1;
    const reachMult = reach === 'global' ? 1.4 : 1;
    const durationMult = duration === '1m' ? 1/12 : duration === '6m' ? 0.5 : 1;

    const impressions = Math.floor(baseVisitors * industryMult * reachMult * durationMult * 3);
    const footTraffic = Math.floor(baseVisitors * reachMult * durationMult * 0.15);
    const affinityScore = industry === 'luxury' ? 94 : industry === 'tech' ? 88 : 76;

    return { impressions, footTraffic, affinityScore };
  }, [industry, duration, reach]);

  const chartData = useMemo(() => {
    const months = duration === '1m' ? 4 : duration === '6m' ? 6 : 12;
    const data = [];
    const baseValue = stats.impressions / months;

    for (let i = 1; i <= months; i++) {
      data.push({
        name: duration === '1m' ? `Week ${i}` : `Month ${i}`,
        value: Math.floor(baseValue * (0.8 + Math.random() * 0.4) * i)
      });
    }
    return data;
  }, [stats, duration]);

  const handleSubmit = () => {
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="w-full bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[40px] overflow-hidden shadow-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        
        {/* Left Panel: Inputs */}
        <div className="lg:col-span-5 p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-white/10">
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gold/10 rounded-lg">
                <TrendingUp size={20} className="text-gold" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-bold">Partnership ROI</span>
            </div>
            <h3 className="text-3xl font-display text-white mb-4">Impact Projection</h3>
            <p className="text-white/50 text-sm font-light">Custom metrics based on your brand vertical and campaign scope.</p>
          </header>

          <div className="space-y-10">
            {/* Industry Vertical */}
            <div>
              <label className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-black mb-4 block">Industry Vertical</label>
              <div className="grid grid-cols-3 gap-3">
                {(['luxury', 'tech', 'mass'] as Industry[]).map((i) => (
                  <button
                    key={i}
                    onClick={() => setIndustry(i)}
                    className={cn(
                      "py-3 rounded-xl border text-[10px] uppercase tracking-widest font-bold transition-all duration-300",
                      industry === i ? "bg-gold border-gold text-black shadow-[0_0_20px_rgba(212,175,55,0.3)]" : "bg-white/5 border-white/10 text-white/50 hover:border-gold/30"
                    )}
                  >
                    {i === 'mass' ? 'Market' : i}
                  </button>
                ))}
              </div>
            </div>

            {/* Campaign Duration */}
            <div>
              <label className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-black mb-4 block">Campaign Duration</label>
              <div className="grid grid-cols-3 gap-3">
                {(['1m', '6m', '1y'] as Duration[]).map((d) => (
                  <button
                    key={d}
                    onClick={() => setDuration(d)}
                    className={cn(
                      "py-3 rounded-xl border text-[10px] uppercase tracking-widest font-bold transition-all duration-300",
                      duration === d ? "bg-gold border-gold text-black shadow-[0_0_20px_rgba(212,175,55,0.3)]" : "bg-white/5 border-white/10 text-white/50 hover:border-gold/30"
                    )}
                  >
                    {d === '1m' ? '1 Month' : d === '6m' ? '6 Months' : '1 Year'}
                  </button>
                ))}
              </div>
            </div>

            {/* Target Reach */}
            <div>
              <label className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-black mb-4 block">Target Reach</label>
              <div className="grid grid-cols-2 gap-3">
                {(['local', 'global'] as Reach[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => setReach(r)}
                    className={cn(
                      "py-3 rounded-xl border text-[10px] uppercase tracking-widest font-bold transition-all duration-300",
                      reach === r ? "bg-gold border-gold text-black shadow-[0_0_20px_rgba(212,175,55,0.3)]" : "bg-white/5 border-white/10 text-white/50 hover:border-gold/30"
                    )}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: Visualization */}
        <div className="lg:col-span-7 p-8 md:p-12 flex flex-col">
          <div className="grid grid-cols-3 gap-6 mb-12">
            <div>
              <p className="text-[9px] uppercase tracking-widest text-white/30 font-bold mb-2">Impressions</p>
              <p className="text-2xl md:text-3xl font-display text-gold">{(stats.impressions / 1000000).toFixed(1)}M</p>
            </div>
            <div>
              <p className="text-[9px] uppercase tracking-widest text-white/30 font-bold mb-2">Foot Traffic</p>
              <p className="text-2xl md:text-3xl font-display text-gold">{(stats.footTraffic / 1000).toFixed(0)}K</p>
            </div>
            <div>
              <p className="text-[9px] uppercase tracking-widest text-white/30 font-bold mb-2">Brand Affinity</p>
              <p className="text-2xl md:text-3xl font-display text-gold">{stats.affinityScore}%</p>
            </div>
          </div>

          <div className="flex-1 min-h-[300px] mb-12">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontWeight: 700 }}
                  dy={10}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '12px' }}
                  itemStyle={{ color: '#D4AF37', fontSize: '12px' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#D4AF37" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-auto">
            <button 
              onClick={handleSubmit}
              className="w-full py-5 bg-gold text-black rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] hover:bg-gold-light transition-all flex items-center justify-center gap-3 shadow-lg shadow-gold/20"
            >
              <Download size={18} /> Download Full Feasibility Study
            </button>
            <AnimatePresence>
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-6 flex items-center justify-center gap-3 text-gold"
                >
                  <CheckCircle2 size={18} />
                  <p className="text-[10px] uppercase tracking-widest font-bold">Report sent to Commercial Team</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
