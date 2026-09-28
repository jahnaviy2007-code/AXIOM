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
    <section className="section-padding" aria-labelledby="comparison-heading">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase">Why AXIOM</span>
          <h2 id="comparison-heading" className="font-display text-4xl sm:text-5xl font-bold text-white mt-3 mb-4">
            Traditional vs AXIOM
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="grid grid-cols-3 bg-white/5 border-b border-white/10">
            <div className="p-4 text-white/50 text-sm font-medium">Feature</div>
            <div className="p-4 text-red-400 text-sm font-medium border-x border-white/10 text-center">Traditional Coaching</div>
            <div className="p-4 text-cyan-400 text-sm font-medium text-center flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
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
              className="grid grid-cols-3 border-b border-white/5 hover:bg-white/2 transition-colors"
            >
              <div className="p-4 text-white/70 text-sm font-medium">{row.feature}</div>
              <div className="p-4 border-x border-white/10">
                <div className="flex items-start gap-2">
                  <span className="text-red-400 text-xs mt-0.5 flex-shrink-0">✗</span>
                  <span className="text-white/50 text-sm">{row.traditional}</span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-start gap-2">
                  <span className="text-green-400 text-xs mt-0.5 flex-shrink-0">✓</span>
                  <span className="text-white text-sm font-medium">{row.axiom}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
