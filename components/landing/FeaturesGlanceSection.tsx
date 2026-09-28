'use client';

import { motion } from 'framer-motion';
import { FileText, CheckSquare, Wand2, Video, Award, TrendingUp } from 'lucide-react';

const features = [
  { icon: FileText, label: 'Resume score', desc: 'Out of 100, 4 criteria', color: 'text-cyan-400', bg: 'bg-cyan-400/10 border-cyan-400/30' },
  { icon: CheckSquare, label: 'ATS check', desc: 'Keyword & format scan', color: 'text-green-400', bg: 'bg-green-400/10 border-green-400/30' },
  { icon: Wand2, label: 'AI rewrite tips', desc: 'Before/after diff', color: 'text-violet-400', bg: 'bg-violet-500/10 border-violet-500/30' },
  { icon: Video, label: 'Live AI interview', desc: 'Camera + voice', color: 'text-cyan-400', bg: 'bg-cyan-400/10 border-cyan-400/30' },
  { icon: Award, label: 'Free certifications', desc: 'Matched to your role', color: 'text-yellow-400', bg: 'bg-yellow-400/10 border-yellow-400/30' },
  { icon: TrendingUp, label: 'Progress tracking', desc: 'Local history & chart', color: 'text-violet-400', bg: 'bg-violet-500/10 border-violet-500/30' },
];

export default function FeaturesGlanceSection() {
  return (
    <section className="section-padding" aria-labelledby="features-heading">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase">Features</span>
          <h2 id="features-heading" className="font-display text-4xl sm:text-5xl font-bold text-white mt-3 mb-4">
            Features at a Glance
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`glass rounded-2xl p-5 border ${f.bg} cursor-default`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 border ${f.bg}`}>
                  <Icon className={`w-5 h-5 ${f.color}`} />
                </div>
                <h3 className="font-semibold text-white mb-1">{f.label}</h3>
                <p className="text-white/50 text-xs">{f.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
