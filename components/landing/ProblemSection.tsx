'use client';

import { motion } from 'framer-motion';
import { DollarSign, AlertTriangle, Lock } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';

const problems = [
  {
    icon: DollarSign,
    title: 'Expensive',
    description: 'Professional career coaching costs hundreds of dollars — far out of reach for most students.',
    color: 'text-red-400',
    border: 'border-red-400/20',
    bg: 'bg-red-400/5',
  },
  {
    icon: AlertTriangle,
    title: 'Generic',
    description: 'Most resume tips ignore your target role, your skills, and what actually matters to recruiters.',
    color: 'text-yellow-400',
    border: 'border-yellow-400/20',
    bg: 'bg-yellow-400/5',
  },
  {
    icon: Lock,
    title: 'Inaccessible',
    description: 'Interview practice is hard to find, inconsistent, and rarely gives real-time, useful feedback.',
    color: 'text-orange-400',
    border: 'border-orange-400/20',
    bg: 'bg-orange-400/5',
  },
];

const gaps = [
  'Measurable Results',
  'Clear Career Focus',
  'Project Proof',
  'Tailored Alignment',
];

export default function ProblemSection() {
  return (
    <section className="section-padding" aria-labelledby="problem-heading">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase">The Problem</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mt-3 mb-4">
            Career coaching is broken
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Students deserve better than expensive, one-size-fits-all career advice.
          </p>
        </motion.div>

        {/* Problem cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {problems.map((problem, i) => {
            const Icon = problem.icon;
            return (
              <GlassCard key={problem.title} delay={i * 0.1} className={`${problem.border} ${problem.bg}`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${problem.bg} border ${problem.border}`}>
                  <Icon className={`w-6 h-6 ${problem.color}`} />
                </div>
                <h3 className={`font-display text-xl font-bold mb-2 ${problem.color}`}>
                  {problem.title}
                </h3>
                <p className="text-white/60 leading-relaxed">{problem.description}</p>
              </GlassCard>
            );
          })}
        </div>

        {/* What most resumes are lacking */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-white/60 text-lg mb-6">What most student resumes are lacking:</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {gaps.map((gap, i) => (
              <motion.div
                key={gap}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full glass border border-violet-500/40 text-white font-medium"
              >
                <span className="text-red-400 font-bold">✗</span>
                {gap}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
