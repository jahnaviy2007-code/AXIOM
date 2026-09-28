'use client';

import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const data = [
  { attempt: 'Attempt 1', score: 52 },
  { attempt: 'Attempt 2', score: 61 },
  { attempt: 'Attempt 3', score: 68 },
  { attempt: 'Attempt 4', score: 75 },
  { attempt: 'Attempt 5', score: 83 },
];

const cards = [
  {
    title: 'Personal roadmap',
    desc: 'Step-by-step plan built from your resume gaps and interview feedback.',
    icon: '🗺️',
    delay: 0.1,
  },
  {
    title: 'Learning resources',
    desc: 'Curated articles, videos and courses for your exact weak areas.',
    icon: '📚',
    delay: 0.2,
  },
  {
    title: 'Keep practising',
    desc: 'Every attempt builds confidence. Set goals and track your streak.',
    icon: '🏆',
    delay: 0.3,
  },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass rounded-lg px-3 py-2 border border-cyan-400/30">
        <p className="text-xs text-white/60">{label}</p>
        <p className="text-cyan-400 font-bold">{payload[0].value}/100</p>
      </div>
    );
  }
  return null;
};

export default function ProgressSection() {
  return (
    <section className="section-padding" aria-labelledby="progress-heading">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-violet-400 text-sm font-semibold tracking-widest uppercase">Guidance & Progress</span>
          <h2 id="progress-heading" className="font-display text-4xl sm:text-5xl font-bold text-white mt-3 mb-4">
            Watch yourself improve
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display font-bold text-white text-lg">Score Over Time</h3>
              <div className="flex items-center gap-2 text-green-400 text-sm font-semibold">
                <span>↑ +31 points</span>
              </div>
            </div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 5, right: 10, bottom: 5, left: -20 }}>
                  <defs>
                    <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22D3EE" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#22D3EE" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="attempt"
                    tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => v.replace('Attempt ', '#')}
                  />
                  <YAxis
                    domain={[40, 100]}
                    tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="#22D3EE"
                    strokeWidth={3}
                    fill="url(#scoreGrad)"
                    dot={{ fill: '#22D3EE', r: 5, strokeWidth: 0 }}
                    activeDot={{ r: 7, fill: '#22D3EE', stroke: '#0B0F2E', strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Cards */}
          <div className="space-y-4">
            {cards.map((card) => (
              <GlassCard key={card.title} delay={card.delay} hover={false}>
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{card.icon}</span>
                  <div>
                    <h4 className="font-semibold text-white mb-1">{card.title}</h4>
                    <p className="text-white/60 text-sm">{card.desc}</p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
