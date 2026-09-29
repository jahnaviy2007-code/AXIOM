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
      <div className="bg-white rounded-lg px-3 py-2 border border-[#E5E7EB] shadow-md">
        <p className="text-xs text-[#6B7280]">{label}</p>
        <p className="text-indigo-600 font-bold">{payload[0].value}/100</p>
      </div>
    );
  }
  return null;
};

export default function ProgressSection() {
  return (
    <section className="py-24 bg-[#F9FAFB] border-y border-[#E5E7EB]" aria-labelledby="progress-heading">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-indigo-700 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 inline-block mb-3">
            Guidance & Progress
          </span>
          <h2 id="progress-heading" className="font-display text-4xl sm:text-5xl font-bold text-[#111827] mt-1 mb-4">
            Watch yourself improve
          </h2>
          <p className="text-[#4B5563] text-base sm:text-lg max-w-2xl mx-auto">
            Continuously evaluate performance across iterative attempts and monitor your progression toward top-tier candidate benchmarks.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display font-bold text-[#111827] text-lg">Score Over Time</h3>
              <div className="flex items-center gap-1.5 text-emerald-700 text-xs font-semibold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                <span>↑ +31 points gain</span>
              </div>
            </div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 5, right: 10, bottom: 5, left: -20 }}>
                  <defs>
                    <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="attempt"
                    tick={{ fill: '#6B7280', fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => v.replace('Attempt ', '#')}
                  />
                  <YAxis
                    domain={[40, 100]}
                    tick={{ fill: '#6B7280', fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="#4F46E5"
                    strokeWidth={3}
                    fill="url(#scoreGrad)"
                    dot={{ fill: '#4F46E5', r: 5, strokeWidth: 0 }}
                    activeDot={{ r: 7, fill: '#4F46E5', stroke: '#FFFFFF', strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Cards */}
          <div className="space-y-4">
            {cards.map((card) => (
              <GlassCard key={card.title} delay={card.delay} hover={false} className="bg-white border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{card.icon}</span>
                  <div>
                    <h4 className="font-semibold text-[#111827] mb-1">{card.title}</h4>
                    <p className="text-[#4B5563] text-sm">{card.desc}</p>
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
