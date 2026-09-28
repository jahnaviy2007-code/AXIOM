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
    <section className="section-padding" aria-labelledby="certs-heading">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase">Free Certifications</span>
          <h2 id="certs-heading" className="font-display text-4xl sm:text-5xl font-bold text-white mt-3 mb-4">
            Choose by requirement
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Checklist */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8"
          >
            <h3 className="font-display font-bold text-white text-xl mb-6">We filter by:</h3>
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
                  <div className="w-6 h-6 rounded-full bg-cyan-400/20 border border-cyan-400/40 flex items-center justify-center flex-shrink-0">
                    <span className="text-cyan-400 text-xs font-bold">✓</span>
                  </div>
                  <span className="text-white/80">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Cards */}
          <div className="space-y-4">
            {cards.map((card) => {
              const Icon = card.icon;
              return (
                <GlassCard key={card.title} delay={card.delay} hover={false}>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-violet-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">{card.title}</h4>
                      <p className="text-white/60 text-sm">{card.desc}</p>
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
