'use client';

import { motion } from 'framer-motion';
import { DollarSign, AlertTriangle, Lock } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';

const problems = [
  {
    icon: DollarSign,
    title: 'Expensive',
    description: 'Professional career coaching costs hundreds of dollars — far out of reach for most college students.',
    color: 'text-rose-700',
    border: 'border-rose-200',
    bg: 'bg-rose-50/60',
    iconBg: 'bg-rose-100/80 text-rose-600',
  },
  {
    icon: AlertTriangle,
    title: 'Generic',
    description: 'Most resume tips ignore your target role, your skills, and what actually matters to modern recruiters.',
    color: 'text-amber-800',
    border: 'border-amber-200',
    bg: 'bg-amber-50/60',
    iconBg: 'bg-amber-100/80 text-amber-600',
  },
  {
    icon: Lock,
    title: 'Inaccessible',
    description: 'Interview practice is hard to find, inconsistent, and rarely gives real-time, actionable STAR feedback.',
    color: 'text-orange-800',
    border: 'border-orange-200',
    bg: 'bg-orange-50/60',
    iconBg: 'bg-orange-100/80 text-orange-600',
  },
];

const gaps = [
  'Measurable Results (XYZ)',
  'Clear Career Focus',
  'Project Proof & Links',
  'Tailored Role Alignment',
];

export default function ProblemSection() {
  return (
    <section className="section-padding bg-white" aria-labelledby="problem-heading">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-blue-600 text-xs font-bold tracking-widest uppercase block mb-2">
            The Industry Problem
          </span>
          <h2 id="problem-heading" className="font-sans text-3xl sm:text-5xl font-extrabold text-[#111827] tracking-tight mb-4">
            Career coaching is broken
          </h2>
          <p className="text-[#4B5563] text-lg max-w-2xl mx-auto leading-relaxed">
            Students deserve better than expensive, one-size-fits-all career advice that fails basic ATS parsers.
          </p>
        </motion.div>

        {/* Problem cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {problems.map((problem, i) => {
            const Icon = problem.icon;
            return (
              <GlassCard
                key={problem.title}
                delay={i * 0.1}
                className={`${problem.border} ${problem.bg} shadow-sm`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${problem.iconBg} border ${problem.border}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className={`font-sans text-xl font-bold mb-2.5 ${problem.color}`}>
                  {problem.title}
                </h3>
                <p className="text-[#4B5563] leading-relaxed text-sm">{problem.description}</p>
              </GlassCard>
            );
          })}
        </div>

        {/* What most resumes are lacking */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-[#4B5563] font-medium text-base mb-5">What most student resumes are lacking:</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {gaps.map((gap, i) => (
              <motion.div
                key={gap}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#F9FAFB] border border-[#E5E7EB] text-[#111827] text-sm font-semibold shadow-sm"
              >
                <span className="text-rose-600 font-bold">✗</span>
                {gap}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
