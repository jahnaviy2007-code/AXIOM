'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';

const scores = [
  { label: 'Communication', value: 78, color: '#0284C7' },
  { label: 'Confidence', value: 70, color: '#4F46E5' },
  { label: 'Technical', value: 85, color: '#16A34A' },
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
        <span className="text-[#4B5563] font-medium">{label}</span>
        <span className="font-bold" style={{ color }}>{value}%</span>
      </div>
      <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${value}%` } : {}}
          transition={{ duration: 1, delay, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ background: color }}
        />
      </div>
    </div>
  );
}

export default function FeedbackReportSection() {
  return (
    <section className="py-24 bg-[#F9FAFB] border-y border-[#E5E7EB]" aria-labelledby="feedback-heading">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-sky-700 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full bg-sky-50 border border-sky-200 inline-block mb-3">
            Interview Feedback Report
          </span>
          <h2 id="feedback-heading" className="font-display text-4xl sm:text-5xl font-bold text-[#111827] mt-1 mb-2">
            Instant, detailed feedback
          </h2>
          <p className="text-[#6B7280] text-sm">Sample live interview diagnostic telemetry preview</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Bar chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white border border-[#E5E7EB] rounded-2xl p-8 space-y-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
          >
            <h3 className="font-display font-bold text-[#111827] text-xl mb-6">Performance Breakdown</h3>
            {scores.map((s, i) => (
              <HorizontalBar key={s.label} {...s} delay={i * 0.2} />
            ))}
            <div className="pt-4 border-t border-[#E5E7EB]">
              <div className="flex justify-between items-center">
                <span className="text-[#6B7280] text-sm font-medium">Overall interview score</span>
                <span className="text-3xl font-bold text-[#111827] font-display">77.7%</span>
              </div>
            </div>
          </motion.div>

          {/* Explainer cards */}
          <div className="space-y-4">
            {explainers.map((e, i) => (
              <GlassCard key={e.title} delay={i * 0.1} hover={false} className="bg-white border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-sky-700 text-sm font-bold">{i + 1}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#111827] mb-1">{e.title}</h4>
                    <p className="text-[#4B5563] text-sm leading-relaxed">{e.desc}</p>
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
