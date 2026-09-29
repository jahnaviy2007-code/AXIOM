'use client';

import { motion } from 'framer-motion';
import { FileText, Video, Award, Map } from 'lucide-react';
import { GlassCard, IconTile } from '@/components/ui/GlassCard';

const solutions = [
  {
    icon: FileText,
    title: 'Resume Rating',
    description: 'Get an instant score out of 100, ATS compatibility check, and clear, actionable fixes tailored to your target role.',
    color: 'text-blue-600',
    iconBg: 'bg-blue-50 border-blue-100 text-blue-600',
    delay: 0,
  },
  {
    icon: Video,
    title: 'Live AI Mock Interview',
    description: 'Camera-on interview with realistic humanoid AI bots. Get spoken questions, live transcript, and instant STAR feedback.',
    color: 'text-indigo-600',
    iconBg: 'bg-indigo-50 border-indigo-100 text-indigo-600',
    delay: 0.1,
  },
  {
    icon: Award,
    title: 'Free Certifications',
    description: 'Curated, 100% free certification links matched to your skill gaps and target role — from Google, freeCodeCamp, and more.',
    color: 'text-blue-600',
    iconBg: 'bg-blue-50 border-blue-100 text-blue-600',
    delay: 0.2,
  },
  {
    icon: Map,
    title: 'Personal Guidance',
    description: 'A personalised roadmap built from your resume and interview results, with resources for your exact weak areas.',
    color: 'text-indigo-600',
    iconBg: 'bg-indigo-50 border-indigo-100 text-indigo-600',
    delay: 0.3,
  },
];

export default function SolutionSection() {
  return (
    <section className="section-padding bg-[#F9FAFB] border-y border-[#E5E7EB]" aria-labelledby="solution-heading">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-blue-600 text-xs font-bold tracking-widest uppercase block mb-2">
            Our Solution
          </span>
          <h2 id="solution-heading" className="font-sans text-3xl sm:text-5xl font-extrabold text-[#111827] tracking-tight mb-4">
            One AI coach, four pillars
          </h2>
          <p className="text-[#4B5563] text-lg max-w-2xl mx-auto leading-relaxed">
            Everything you need to land your first tech job — free, private, and stored locally in your browser.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {solutions.map((s) => {
            const Icon = s.icon;
            return (
              <GlassCard key={s.title} delay={s.delay} className="text-center bg-white border border-[#E5E7EB] shadow-sm">
                <IconTile className={`mx-auto mb-4 ${s.iconBg}`}>
                  <Icon className="w-5 h-5" />
                </IconTile>
                <h3 className="font-sans text-lg font-bold text-[#111827] mb-2">{s.title}</h3>
                <p className="text-[#4B5563] text-sm leading-relaxed">{s.description}</p>
              </GlassCard>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-[#4B5563] text-sm font-medium mt-6"
        >
          ⚡ Runs on-device: fast, private, and backed by local SQLite storage.
        </motion.p>
      </div>
    </section>
  );
}
