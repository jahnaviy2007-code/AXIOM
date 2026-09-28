'use client';

import { motion } from 'framer-motion';
import { FileText, Video, Award, Map } from 'lucide-react';
import { GlassCard, IconTile } from '@/components/ui/GlassCard';

const solutions = [
  {
    icon: FileText,
    title: 'Resume Rating',
    description: 'Get an instant score out of 100, ATS compatibility check, and clear, actionable fixes tailored to your target role.',
    color: 'text-cyan-400',
    delay: 0,
  },
  {
    icon: Video,
    title: 'Live AI Mock Interview',
    description: 'Camera-on interview with a real-time AI interviewer. Get spoken questions, live transcript, and instant feedback.',
    color: 'text-violet-400',
    delay: 0.1,
  },
  {
    icon: Award,
    title: 'Free Certifications',
    description: 'Curated, 100% free certification links matched to your skill gaps and target role — from Google, Coursera, and more.',
    color: 'text-cyan-400',
    delay: 0.2,
  },
  {
    icon: Map,
    title: 'Personal Guidance',
    description: 'A personalised roadmap built from your resume and interview results, with resources for your exact weak areas.',
    color: 'text-violet-400',
    delay: 0.3,
  },
];

export default function SolutionSection() {
  return (
    <section className="section-padding" aria-labelledby="solution-heading">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase">Our Solution</span>
          <h2 id="solution-heading" className="font-display text-4xl sm:text-5xl font-bold text-white mt-3 mb-4">
            One AI coach, four pillars
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Everything you need to land your first job — free, private, and on your device.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {solutions.map((s) => {
            const Icon = s.icon;
            return (
              <GlassCard key={s.title} delay={s.delay} className="text-center">
                <IconTile className={`mx-auto mb-4 ${s.color === 'text-cyan-400' ? 'bg-cyan-400/10 border-cyan-400/30' : 'bg-violet-500/10 border-violet-500/30'}`}>
                  <Icon className={`w-6 h-6 ${s.color}`} />
                </IconTile>
                <h3 className="font-display text-lg font-bold text-white mb-2">{s.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{s.description}</p>
              </GlassCard>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-cyan-400/80 text-sm font-medium"
        >
          ⚡ Runs on-device: fast, private and free to access.
        </motion.p>
      </div>
    </section>
  );
}
