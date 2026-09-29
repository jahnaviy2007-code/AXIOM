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
    <section className="section-padding bg-white" aria-labelledby="gaps-heading">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-blue-600 text-xs font-bold tracking-widest uppercase block mb-2">
            The 4 Gaps We Fix
          </span>
          <h2 id="gaps-heading" className="font-sans text-3xl sm:text-5xl font-extrabold text-[#111827] tracking-tight mb-4">
            Before → After AXIOM
          </h2>
          <p className="text-[#4B5563] text-lg max-w-2xl mx-auto leading-relaxed">
            See exactly how we transform weak resume lines into powerful, recruiter-winning statements.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {gaps.map((gap, i) => (
            <motion.div
              key={gap.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group"
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#E5E7EB] shadow-xs flex items-center justify-center text-xl">
                  {gap.icon}
                </div>
                <h3 className="font-sans font-bold text-[#111827] text-lg">{gap.title}</h3>
              </div>

              {/* Weak version */}
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-rose-50 border border-rose-200/80 mb-2">
                <span className="text-rose-600 font-bold text-base mt-0.5 flex-shrink-0">✗</span>
                <div>
                  <div className="text-[11px] text-rose-700 font-semibold mb-0.5 uppercase tracking-wide">Before</div>
                  <p className="text-rose-950 text-xs sm:text-sm italic">"{gap.weak}"</p>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex items-center justify-center my-1">
                <div className="text-blue-600 text-base font-bold">↓</div>
              </div>

              {/* Strong version */}
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200/80">
                <span className="text-emerald-600 font-bold text-base mt-0.5 flex-shrink-0">✓</span>
                <div>
                  <div className="text-[11px] text-emerald-700 font-semibold mb-0.5 uppercase tracking-wide">After AXIOM</div>
                  <p className="text-emerald-950 text-xs sm:text-sm font-medium">"{gap.strong}"</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
