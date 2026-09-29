'use client';

import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { BookOpen, Award, CalendarCheck } from 'lucide-react';

const checklist = [
  'Skill gaps found in your resume',
  'Target role from your interview',
  'Beginner to advanced levels',
  'Direct free certification links',
];

const cards = [
  {
    icon: BookOpen,
    title: 'Recommended courses',
    desc: 'Hand-picked free courses matched to your skill gaps and target role.',
    delay: 0.1,
  },
  {
    icon: Award,
    title: 'Free certificates',
    desc: 'Google, Coursera (audit), freeCodeCamp, NPTEL, Microsoft Learn and more.',
    delay: 0.2,
  },
  {
    icon: CalendarCheck,
    title: 'Practice plan',
    desc: 'A week-by-week learning schedule you can start today.',
    delay: 0.3,
  },
];

export default function CertificationsSection() {
  return (
    <section className="py-24 bg-white" aria-labelledby="certs-heading">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sky-700 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full bg-sky-50 border border-sky-200 inline-block mb-3">
            Free Certifications
          </span>
          <h2 id="certs-heading" className="font-display text-4xl sm:text-5xl font-bold text-[#111827] mt-1 mb-4">
            Choose by requirement
          </h2>
          <p className="text-[#4B5563] text-base sm:text-lg max-w-2xl mx-auto">
            Close verified technical skill gaps with zero-cost certified coursework from top engineering organizations.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Checklist */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl p-8 shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
          >
            <h3 className="font-display font-bold text-[#111827] text-xl mb-6">We filter by:</h3>
            <ul className="space-y-4">
              {checklist.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center flex-shrink-0">
                    <span className="text-emerald-600 text-xs font-bold">✓</span>
                  </div>
                  <span className="text-[#4B5563] font-medium">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Cards */}
          <div className="space-y-4">
            {cards.map((card) => {
              const Icon = card.icon;
              return (
                <GlassCard key={card.title} delay={card.delay} hover={false} className="bg-white border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#111827] mb-1">{card.title}</h4>
                      <p className="text-[#4B5563] text-sm">{card.desc}</p>
                    </div>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
