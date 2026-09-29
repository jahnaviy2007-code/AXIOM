'use client';

import { motion } from 'framer-motion';

const steps = [
  { num: 1, label: 'Upload resume', icon: '📄', desc: 'PDF or DOCX — parsed on your device' },
  { num: 2, label: 'Rating & fixes', icon: '📊', desc: 'Score, ATS check, AI rewrite suggestions' },
  { num: 3, label: 'Live mock interview', icon: '🎥', desc: 'AI interviewer, real-time questions' },
  { num: 4, label: 'Feedback report', icon: '📋', desc: 'Scores, tips and per-question notes' },
  { num: 5, label: 'Free certs & plan', icon: '🎓', desc: 'Personalised learning roadmap' },
];

export default function JourneySection() {
  return (
    <section className="py-24 bg-white" aria-labelledby="journey-heading">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sky-700 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full bg-sky-50 border border-sky-200 inline-block mb-3">
            End-to-End Journey
          </span>
          <h2 id="journey-heading" className="font-display text-4xl sm:text-5xl font-bold text-[#111827] mt-1 mb-4">
            Your complete career boost
          </h2>
          <p className="text-[#4B5563] text-base sm:text-lg max-w-2xl mx-auto">
            From initial resume drafting to realistic live mock interviews and verified certifications.
          </p>
        </motion.div>

        {/* Vertical steps */}
        <div className="max-w-2xl mx-auto relative">
          {/* Vertical line */}
          <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-[#E5E7EB]" aria-hidden="true" />

          <div className="space-y-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-6 group"
              >
                {/* Number circle */}
                <div className="relative flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-white border border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.06)] flex flex-col items-center justify-center group-hover:border-indigo-400 group-hover:shadow-md transition-all">
                    <span className="text-2xl">{step.icon}</span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center shadow-sm">
                    <span className="text-white text-xs font-bold">{step.num}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl p-5 flex-1 shadow-[0_1px_3px_rgba(0,0,0,0.04)] group-hover:border-indigo-300 group-hover:bg-white transition-all">
                  <h3 className="font-display font-bold text-[#111827] text-lg mb-1">{step.label}</h3>
                  <p className="text-[#4B5563] text-sm">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12 text-[#6B7280] text-base italic"
        >
          "Repeat any time — every attempt builds confidence."
        </motion.p>
      </div>
    </section>
  );
}
