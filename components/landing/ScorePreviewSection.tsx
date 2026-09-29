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
          stroke="#E5E7EB"
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
            <stop offset="0%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#4F46E5" />
          </linearGradient>
        </defs>
      </svg>
      {/* Score text */}
      <div className="absolute text-center">
        <div className="text-4xl font-extrabold text-[#111827] font-sans">{score}</div>
        <div className="text-xs text-[#6B7280] font-medium">out of 100</div>
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
    <section className="section-padding bg-[#F9FAFB] border-y border-[#E5E7EB]" aria-labelledby="score-preview-heading">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-blue-600 text-xs font-bold tracking-widest uppercase block mb-2">
            Resume Analysis Preview
          </span>
          <h2 id="score-preview-heading" className="font-sans text-3xl sm:text-5xl font-extrabold text-[#111827] tracking-tight mb-3">
            Resume Analysis & Rating
          </h2>
          <p className="text-[#6B7280] text-sm">Sample resume score — your personalized results are generated on-device</p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-6 items-start">
          {/* Donut gauge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-1 bg-white border border-[#E5E7EB] rounded-2xl p-6 flex flex-col items-center gap-4 shadow-sm"
          >
            <DonutGauge score={82} />
            <div className="text-center">
              <div className="text-[#111827] font-bold text-base">Overall Readiness Score</div>
              <div className="text-emerald-600 text-xs font-semibold mt-0.5">Above average (Day 1)</div>
            </div>
            {/* Score breakdown mini bars */}
            {[
              { label: 'Measurable Results', val: 70 },
              { label: 'Career Focus', val: 85 },
              { label: 'Project Proof', val: 90 },
              { label: 'Tailored Alignment', val: 80 },
            ].map((item) => (
              <div key={item.label} className="w-full">
                <div className="flex justify-between text-xs text-[#4B5563] mb-1 font-medium">
                  <span>{item.label}</span>
                  <span className="font-semibold text-[#111827]">{item.val}%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.val}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="h-full rounded-full bg-blue-600"
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
                <GlassCard key={card.title} delay={card.delay} className="bg-white border border-[#E5E7EB] shadow-sm">
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-[#111827] text-sm">{card.title}</h3>
                  </div>
                  <ul className="space-y-2.5">
                    {card.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs">
                        <span className={card.positive[i] ? 'text-emerald-600 font-bold mt-0.5' : 'text-rose-500 font-bold mt-0.5'}>
                          {card.positive[i] ? '✓' : '✗'}
                        </span>
                        <span className="text-[#4B5563] leading-relaxed">{point}</span>
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
