'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';

const scores = [
  { label: 'Communication', value: 78, color: '#22D3EE' },
  { label: 'Confidence', value: 70, color: '#7C5CFF' },
  { label: 'Technical', value: 85, color: '#22C55E' },
];

const explainers = [
  { title: 'Clarity, pace & structure', desc: 'Your answers were clear and well-structured. Work on reducing filler words and maintaining a steady pace.' },
  { title: 'Eye contact & posture', desc: 'Good eye contact maintained. Sit slightly straighter to project more confidence to interviewers.' },
  { title: 'Accuracy of answers', desc: 'Strong technical answers. Practise explaining trade-offs for senior-level questions.' },
];

function HorizontalBar({ label, value, color, delay }: { label: string; value: number; color: string; delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-white/80 font-medium">{label}</span>
        <span className="font-bold" style={{ color }}>{value}%</span>
      </div>
      <div className="h-3 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${value}%` } : {}}
          transition={{ duration: 1, delay, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}99, ${color})` }}
        />
      </div>
    </div>
  );
}

export default function FeedbackReportSection() {
  return (
    <section className="section-padding" aria-labelledby="feedback-heading">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase">Interview Feedback Report</span>
          <h2 id="feedback-heading" className="font-display text-4xl sm:text-5xl font-bold text-white mt-3 mb-2">
            Instant, detailed feedback
          </h2>
          <p className="text-white/50 text-sm">Sample feedback report preview</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Bar chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8 space-y-6"
          >
            <h3 className="font-display font-bold text-white text-xl mb-6">Performance Breakdown</h3>
            {scores.map((s, i) => (
              <HorizontalBar key={s.label} {...s} delay={i * 0.2} />
            ))}
            <div className="pt-4 border-t border-white/10">
              <div className="flex justify-between items-center">
                <span className="text-white/60 text-sm">Overall interview score</span>
                <span className="text-2xl font-bold text-gradient-cyan font-display">77.7%</span>
              </div>
            </div>
          </motion.div>

          {/* Explainer cards */}
          <div className="space-y-4">
            {explainers.map((e, i) => (
              <GlassCard key={e.title} delay={i * 0.1} hover={false}>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-cyan-400 text-sm font-bold">{i + 1}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">{e.title}</h4>
                    <p className="text-white/60 text-sm leading-relaxed">{e.desc}</p>
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
