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
    <section className="py-24 bg-white" aria-labelledby="interview-heading">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-indigo-600 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 inline-block mb-3">
            Live AI Mock Interview
          </span>
          <h2 id="interview-heading" className="font-display text-4xl sm:text-5xl font-bold text-[#111827] mt-1 mb-4">
            Practise like it's the real thing
          </h2>
          <p className="text-[#4B5563] text-base sm:text-lg max-w-2xl mx-auto">
            Experience authentic high-pressure engineering interviews with real-time speech telemetry and instant gap diagnosis.
          </p>
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
                <div className="w-16 h-16 rounded-2xl bg-white border border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:border-indigo-400 hover:shadow-md transition-all flex items-center justify-center text-3xl cursor-default">
                  {step.icon}
                </div>
                <span className="text-[#4B5563] text-sm font-medium">{step.label}</span>
              </motion.div>
              {i < flow.length - 1 && (
                <div className="text-gray-300 text-xl hidden sm:block font-bold">›</div>
              )}
            </div>
          ))}
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-6">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <GlassCard key={b.title} delay={b.delay} className="text-center bg-white border-[#E5E7EB]">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="font-display font-bold text-[#111827] text-lg mb-2">{b.title}</h3>
                <p className="text-[#4B5563] text-sm leading-relaxed">{b.description}</p>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
