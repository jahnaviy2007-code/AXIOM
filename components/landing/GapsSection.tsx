'use client';

import { motion } from 'framer-motion';

const gaps = [
  {
    title: 'Measurable Results',
    weak: 'Improved app speed',
    strong: 'Cut load time by 40%, serving 10K+ users daily',
    icon: '📈',
  },
  {
    title: 'Clear Career Focus',
    weak: 'Seeking a good job in tech',
    strong: 'Aspiring ML Engineer (NLP) with 3 published models',
    icon: '🎯',
  },
  {
    title: 'Project Proof',
    weak: 'Built a website for a class project',
    strong: 'Built live SaaS app — demo.io · GitHub · 200 users',
    icon: '🚀',
  },
  {
    title: 'Tailored Alignment',
    weak: 'Used same resume for every application',
    strong: 'Keywords matched to React + Node.js job description',
    icon: '🔑',
  },
];

export default function GapsSection() {
  return (
    <section className="section-padding" aria-labelledby="gaps-heading">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase">The 4 Gaps We Fix</span>
          <h2 id="gaps-heading" className="font-display text-4xl sm:text-5xl font-bold text-white mt-3 mb-4">
            Before → After AXIOM
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            See exactly how we transform weak resume lines into powerful, recruiter-winning statements.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {gaps.map((gap, i) => (
            <motion.div
              key={gap.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-6 hover:border-cyan-400/30 transition-all group"
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-xl">
                  {gap.icon}
                </div>
                <h3 className="font-display font-bold text-white text-lg">{gap.title}</h3>
              </div>

              {/* Weak version */}
              <div className="flex items-start gap-3 p-3 rounded-xl bg-red-500/10 border border-red-500/20 mb-3">
                <span className="text-red-400 font-bold text-lg mt-0.5 flex-shrink-0">✗</span>
                <div>
                  <div className="text-xs text-red-400/70 font-medium mb-1 uppercase tracking-wide">Before</div>
                  <p className="text-white/70 text-sm italic">"{gap.weak}"</p>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex items-center justify-center my-2">
                <div className="text-cyan-400 text-xl">↓</div>
              </div>

              {/* Strong version */}
              <div className="flex items-start gap-3 p-3 rounded-xl bg-green-500/10 border border-green-500/20">
                <span className="text-green-400 font-bold text-lg mt-0.5 flex-shrink-0">✓</span>
                <div>
                  <div className="text-xs text-green-400/70 font-medium mb-1 uppercase tracking-wide">After AXIOM</div>
                  <p className="text-white text-sm font-medium">"{gap.strong}"</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
