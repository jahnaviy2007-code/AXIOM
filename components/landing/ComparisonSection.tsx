'use client';

import { motion } from 'framer-motion';

const rows = [
  { feature: 'Cost', traditional: 'Expensive ($100s/hr)', axiom: 'Free — always' },
  { feature: 'Advice quality', traditional: 'Generic tips', axiom: 'Personalised to your role' },
  { feature: 'Availability', traditional: 'Limited slots', axiom: 'Practise any time' },
  { feature: 'Privacy', traditional: 'Data shared with servers', axiom: 'Private, on-device' },
  { feature: 'Feedback speed', traditional: 'Days or weeks', axiom: 'Instant' },
  { feature: 'Certifications', traditional: 'Not included', axiom: 'Curated free links' },
];

export default function ComparisonSection() {
  return (
    <section className="py-24 bg-[#F9FAFB] border-y border-[#E5E7EB]" aria-labelledby="comparison-heading">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-sky-700 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full bg-sky-50 border border-sky-200 inline-block mb-3">
            Why AXIOM
          </span>
          <h2 id="comparison-heading" className="font-display text-4xl sm:text-5xl font-bold text-[#111827] mt-1 mb-4">
            Traditional vs AXIOM
          </h2>
          <p className="text-[#4B5563] text-base sm:text-lg max-w-xl mx-auto">
            See how AXIOM provides immediate, private, high-signal career feedback at zero cost.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl border border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.06)] overflow-hidden"
        >
          {/* Header */}
          <div className="grid grid-cols-3 bg-gray-50 border-b border-[#E5E7EB]">
            <div className="p-4 text-[#6B7280] text-sm font-semibold">Feature</div>
            <div className="p-4 text-rose-700 text-sm font-semibold border-x border-[#E5E7EB] text-center">Traditional Coaching</div>
            <div className="p-4 text-indigo-700 text-sm font-bold text-center flex items-center justify-center gap-2 bg-indigo-50/50">
              <span className="w-2 h-2 rounded-full bg-indigo-600" />
              AXIOM
            </div>
          </div>

          {/* Rows */}
          {rows.map((row, i) => (
            <motion.div
              key={row.feature}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="grid grid-cols-3 border-b border-[#E5E7EB] last:border-b-0 hover:bg-gray-50/60 transition-colors"
            >
              <div className="p-4 text-[#111827] text-sm font-medium">{row.feature}</div>
              <div className="p-4 border-x border-[#E5E7EB]">
                <div className="flex items-start gap-2">
                  <span className="text-rose-500 text-xs mt-0.5 flex-shrink-0">✗</span>
                  <span className="text-[#6B7280] text-sm">{row.traditional}</span>
                </div>
              </div>
              <div className="p-4 bg-indigo-50/20">
                <div className="flex items-start gap-2">
                  <span className="text-emerald-600 text-xs mt-0.5 flex-shrink-0 font-bold">✓</span>
                  <span className="text-[#111827] text-sm font-semibold">{row.axiom}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
