import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TrendingUp, Users, Target, BarChart3, ChevronRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';

type Industry = 'luxury' | 'tech' | 'retail';
type Duration = '1m' | '6m' | '1y';
type Reach = 'local' | 'global';

const MULTIPLIERS = {
  industry: {
    luxury: { scale: 1.5, engagement: 0.08, avgTxn: 450 },
    tech: { scale: 1.2, engagement: 0.15, avgTxn: 800 },
    retail: { scale: 1.0, engagement: 0.1, avgTxn: 120 }
  },
  duration: {
    '1m': 1,
    '6m': 5.5, // slightly better than linear
    '1y': 12
  },
  reach: {
    local: 1,
    global: 2.5
  }
};

interface Props { onOpenLeasing?: () => void; }

export function ROIModule({ onOpenLeasing }: Props) {
  const [industry, setIndustry] = useState<Industry>('luxury');
  const [duration, setDuration] = useState<Duration>('6m');
  const [reach, setReach] = useState<Reach>('global');

  const results = useMemo(() => {
    const baseVisitors = 3333333; // ~40M / 12 months
    const ind = MULTIPLIERS.industry[industry];
    const durM = MULTIPLIERS.duration[duration];
    const reachM = MULTIPLIERS.reach[reach];

    const impressions = Math.floor(baseVisitors * durM * reachM * 3.5); // avg 3.5 touchpoints
    const footTraffic = Math.floor(baseVisitors * durM * ind.engagement);
    const affinity = Math.floor(75 + (ind.scale * 5) + (durM > 1 ? 10 : 0));

    // Chart Data
    const months = duration === '1m' ? 4 : duration === '6m' ? 6 : 12;
    const chartData = Array.from({ length: months }).map((_, i) => ({
      name: duration === '1m' ? `Week ${i + 1}` : `Month ${i + 1}`,
      impressions: Math.floor((impressions / months) * (1 + i * 0.1)),
      traffic: Math.floor((footTraffic / months) * (1 + i * 0.05))
    }));

    return {
      impressions,
      footTraffic,
      affinity,
      chartData
    };
  }, [industry, duration, reach]);

  return (
    <section id="partnerships" className="snap-section min-h-screen bg-black flex items-center justify-center p-6 md:p-24 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left: Controls */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="mb-12"
            >
              <span className="text-gold tracking-[0.4em] uppercase text-[10px] font-black mb-4 block">Performance Projection</span>
              <h2 className="text-4xl md:text-6xl font-display text-white mb-6 uppercase leading-tight">
                Calculate Your <br />
                <span className="text-gold italic">Impact.</span>
              </h2>
              <p className="text-white/50 text-lg font-light">
                Estimate your brand's reach and growth using American Dream's 
                proprietary 40M+ annual visitor data engine.
              </p>
            </motion.div>

            <div className="space-y-10">
              {/* Industry Selection */}
              <div>
                <label className="text-[10px] uppercase tracking-[0.3em] text-white/40 block mb-6 font-black">Industry Vertical</label>
                <div className="grid grid-cols-3 gap-3">
                  {(['luxury', 'tech', 'retail'] as Industry[]).map((id) => (
                    <button
                      key={id}
                      onClick={() => setIndustry(id)}
                      className={`py-4 rounded-xl text-[10px] uppercase tracking-widest font-black transition-all border ${
                        industry === id 
                          ? 'bg-gold text-black border-gold' 
                          : 'bg-white/5 text-white/60 border-white/10 hover:border-white/30'
                      }`}
                    >
                      {id}
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration Slider-ish */}
              <div>
                <label className="text-[10px] uppercase tracking-[0.3em] text-white/40 block mb-6 font-black">Campaign Duration</label>
                <div className="flex bg-white/5 rounded-2xl p-1.5 border border-white/10">
                  {(['1m', '6m', '1y'] as Duration[]).map((d) => (
                    <button
                      key={d}
                      onClick={() => setDuration(d)}
                      className={`flex-1 py-3 rounded-xl text-[10px] uppercase tracking-widest font-black transition-all ${
                        duration === d ? 'bg-white/10 text-gold shadow-xl' : 'text-white/40 hover:text-white'
                      }`}
                    >
                      {d === '1m' ? '1 Month' : d === '6m' ? '6 Months' : '1 Year'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reach Toggle */}
              <div>
                <label className="text-[10px] uppercase tracking-[0.3em] text-white/40 block mb-6 font-black">Target Reach</label>
                <div className="grid grid-cols-2 gap-4">
                   {(['local', 'global'] as Reach[]).map((r) => (
                    <button
                      key={r}
                      onClick={() => setReach(r)}
                      className={`flex items-center justify-center gap-3 py-5 rounded-2xl border transition-all ${
                        reach === r 
                          ? 'border-gold bg-gold/5 text-gold' 
                          : 'border-white/10 bg-white/[0.02] text-white/40 hover:border-white/30'
                      }`}
                    >
                      {r === 'local' ? <Users size={16} /> : <Target size={16} />}
                      <span className="text-[10px] uppercase tracking-[0.2em] font-black">{r}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Results Visualization */}
          <div className="lg:col-span-7">
            <motion.div
              layout
              className="bg-zinc-900/50 backdrop-blur-3xl border border-white/5 rounded-[40px] p-8 md:p-12 shadow-2xl relative overflow-hidden"
            >
              {/* Results Grid */}
              <div className="grid grid-cols-3 gap-8 mb-12">
                <div className="space-y-2">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-black">Impressions</p>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={results.impressions}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-2xl md:text-3xl font-display text-white"
                    >
                      {(results.impressions / 1000000).toFixed(1)}M
                    </motion.p>
                  </AnimatePresence>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-black">Foot Traffic</p>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={results.footTraffic}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-2xl md:text-3xl font-display text-gold"
                    >
                      {(results.footTraffic / 1000).toFixed(0)}k+
                    </motion.p>
                  </AnimatePresence>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-black">Brand Affinity</p>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={results.affinity}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-2xl md:text-3xl font-display text-white"
                    >
                      {results.affinity}%
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>

              {/* Chart */}
              <div className="h-[300px] w-full mb-12 group">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={results.chartData}>
                    <defs>
                      <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#D4AF37" stopOpacity={0.8} />
                        <stop offset="100%" stopColor="#D4AF37" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#ffffff30', fontSize: 10, fontWeight: 700 }}
                      dy={10}
                    />
                    <Tooltip 
                      cursor={{ fill: '#ffffff05' }}
                      contentStyle={{ 
                        backgroundColor: '#000000ee', 
                        border: '1px solid rgba(212,175,55,0.3)', 
                        borderRadius: '12px',
                        fontSize: '10px',
                        padding: '12px'
                      }}
                      itemStyle={{ color: '#D4AF37' }}
                    />
                    <Bar dataKey="impressions" radius={[8, 8, 0, 0]}>
                      {results.chartData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill="url(#barGradient)"
                          fillOpacity={0.8 + (index / results.chartData.length) * 0.2}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Bottom CTA */}
              <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center transform group-hover:rotate-12 transition-transform">
                    <TrendingUp className="text-gold" size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm uppercase tracking-widest">Growth Forecast</h4>
                    <p className="text-white/30 text-[10px] font-black uppercase">Based on verified 2023-24 traffic</p>
                  </div>
                </div>
                <button onClick={onOpenLeasing} className="w-full md:w-auto px-10 py-5 bg-white text-black font-black uppercase tracking-[0.2em] text-[10px] rounded-full hover:bg-gold transition-all duration-500 shadow-2xl flex items-center justify-center gap-4 group">
                  CLOSE THE DEAL <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
