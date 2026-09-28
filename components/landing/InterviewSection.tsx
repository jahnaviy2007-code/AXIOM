'use client';

import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { UserCheck, MessageCircle, Repeat } from 'lucide-react';

const flow = [
  { label: 'Camera On', icon: '📹' },
  { label: 'AI Asks Questions', icon: '🤖' },
  { label: 'You Answer Live', icon: '🎤' },
  { label: 'Instant Feedback', icon: '📋' },
];

const benefits = [
  {
    icon: UserCheck,
    title: 'Tailored to your profile',
    description: 'Questions are generated from your resume and target role — not generic templates.',
    delay: 0.1,
  },
  {
    icon: MessageCircle,
    title: 'Natural conversation',
    description: 'AI asks follow-up questions, listens, and responds like a real interviewer.',
    delay: 0.2,
  },
  {
    icon: Repeat,
    title: 'Practise unlimited',
    description: 'No slots, no waiting. Practise any time, any number of times — all free.',
    delay: 0.3,
  },
];

export default function InterviewSection() {
  return (
    <section className="section-padding" aria-labelledby="interview-heading">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-violet-400 text-sm font-semibold tracking-widest uppercase">Live AI Mock Interview</span>
          <h2 id="interview-heading" className="font-display text-4xl sm:text-5xl font-bold text-white mt-3 mb-4">
            Practise like it's the real thing
          </h2>
        </motion.div>

        {/* Flow */}
        <div className="flex flex-wrap gap-4 justify-center items-center mb-16">
          {flow.map((step, i) => (
            <div key={step.label} className="flex items-center gap-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-16 h-16 rounded-2xl glass border border-violet-500/40 flex items-center justify-center text-3xl hover:border-violet-400 hover:shadow-lg hover:shadow-violet-500/20 transition-all cursor-default">
                  {step.icon}
                </div>
                <span className="text-white/70 text-sm font-medium">{step.label}</span>
              </motion.div>
              {i < flow.length - 1 && (
                <div className="text-violet-400/60 text-xl hidden sm:block">›</div>
              )}
            </div>
          ))}
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-6">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <GlassCard key={b.title} delay={b.delay} className="text-center">
                <div className="w-12 h-12 rounded-xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-violet-400" />
                </div>
                <h3 className="font-display font-bold text-white text-lg mb-2">{b.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{b.description}</p>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
