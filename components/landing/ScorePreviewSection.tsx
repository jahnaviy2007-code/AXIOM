'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { TrendingUp, CheckCircle, Lightbulb } from 'lucide-react';

function DonutGauge({ score, size = 160 }: { score: number; size?: number }) {
  const radius = (size - 20) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="rotate-[-90deg]">
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="12"
        />
        {/* Progress arc */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#gaugeGrad)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={isInView ? { strokeDashoffset } : { strokeDashoffset: circumference }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
        <defs>
          <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22D3EE" />
            <stop offset="100%" stopColor="#7C5CFF" />
          </linearGradient>
        </defs>
      </svg>
      {/* Score text */}
      <div className="absolute text-center">
        <div className="text-4xl font-bold text-white font-display">{score}</div>
        <div className="text-xs text-white/50">out of 100</div>
      </div>
    </div>
  );
}

const infoCards = [
  {
    icon: TrendingUp,
    title: 'Strengths & Weaknesses',
    points: ['Strong technical skills', 'Good project section', 'Weak action verbs', 'Missing metrics'],
    positive: [true, true, false, false],
    delay: 0.1,
  },
  {
    icon: CheckCircle,
    title: 'ATS Compatibility',
    points: ['Keyword match: 68%', 'Correct section headers', 'Standard formatting', 'Missing: React, TypeScript'],
    positive: [true, true, true, false],
    delay: 0.2,
  },
  {
    icon: Lightbulb,
    title: 'Improvement Tips',
    points: ['Add % impact metrics', 'Match role keywords', 'Quantify achievements', 'Add GitHub links'],
    positive: [true, true, true, true],
    delay: 0.3,
  },
];

export default function ScorePreviewSection() {
  return (
    <section className="section-padding" aria-labelledby="score-preview-heading">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase">Resume Analysis Preview</span>
          <h2 id="score-preview-heading" className="font-display text-4xl sm:text-5xl font-bold text-white mt-3 mb-2">
            Resume Analysis & Rating
          </h2>
          <p className="text-white/50 text-sm">Sample resume score — your results will differ</p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-6 items-start">
          {/* Donut gauge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-1 glass rounded-2xl p-8 flex flex-col items-center gap-4"
          >
            <DonutGauge score={82} />
            <div className="text-center">
              <div className="text-white font-semibold">Overall Score</div>
              <div className="text-white/50 text-sm">Above average</div>
            </div>
            {/* Score breakdown mini bars */}
            {[
              { label: 'Measurable Results', val: 70 },
              { label: 'Career Focus', val: 85 },
              { label: 'Project Proof', val: 90 },
              { label: 'Tailored Alignment', val: 80 },
            ].map((item) => (
              <div key={item.label} className="w-full">
                <div className="flex justify-between text-xs text-white/60 mb-1">
                  <span>{item.label}</span>
                  <span>{item.val}%</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.val}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500"
                  />
                </div>
              </div>
            ))}
          </motion.div>

          {/* Info cards */}
          <div className="lg:col-span-3 grid sm:grid-cols-3 gap-6">
            {infoCards.map((card) => {
              const Icon = card.icon;
              return (
                <GlassCard key={card.title} delay={card.delay}>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-cyan-400" />
                    </div>
                    <h3 className="font-semibold text-white text-sm">{card.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {card.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className={card.positive[i] ? 'text-green-400 mt-0.5' : 'text-red-400 mt-0.5'}>
                          {card.positive[i] ? '✓' : '✗'}
                        </span>
                        <span className="text-white/70">{point}</span>
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
