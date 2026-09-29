'use client';

import { motion } from 'framer-motion';
import { FileText, CheckSquare, Wand2, Video, Award, TrendingUp } from 'lucide-react';

const features = [
  { icon: FileText, label: 'Resume score', desc: 'Out of 100, 4 criteria', color: 'text-sky-700', bg: 'bg-sky-50 border-sky-200' },
  { icon: CheckSquare, label: 'ATS check', desc: 'Keyword & format scan', color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200' },
  { icon: Wand2, label: 'AI rewrite tips', desc: 'Before/after diff', color: 'text-indigo-700', bg: 'bg-indigo-50 border-indigo-200' },
  { icon: Video, label: 'Live AI interview', desc: 'Camera + voice', color: 'text-sky-700', bg: 'bg-sky-50 border-sky-200' },
  { icon: Award, label: 'Free certifications', desc: 'Matched to your role', color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200' },
  { icon: TrendingUp, label: 'Progress tracking', desc: 'Local history & chart', color: 'text-indigo-700', bg: 'bg-indigo-50 border-indigo-200' },
];

export default function FeaturesGlanceSection() {
  return (
    <section className="py-24 bg-[#F9FAFB] border-y border-[#E5E7EB]" aria-labelledby="features-heading">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-sky-700 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full bg-sky-50 border border-sky-200 inline-block mb-3">
            Features
          </span>
          <h2 id="features-heading" className="font-display text-4xl sm:text-5xl font-bold text-[#111827] mt-1 mb-4">
            Features at a Glance
          </h2>
          <p className="text-[#4B5563] text-base sm:text-lg max-w-2xl mx-auto">
            Comprehensive tooling engineered to diagnose and refine every layer of your technical candidacy.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
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
                className="bg-white rounded-2xl p-5 border border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:border-gray-300 hover:shadow-md cursor-default"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 border ${f.bg}`}>
                  <Icon className={`w-5 h-5 ${f.color}`} />
                </div>
                <h3 className="font-semibold text-[#111827] mb-1">{f.label}</h3>
                <p className="text-[#6B7280] text-xs">{f.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
