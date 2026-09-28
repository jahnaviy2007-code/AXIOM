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
    <section className="section-padding" aria-labelledby="journey-heading">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase">End-to-End Journey</span>
          <h2 id="journey-heading" className="font-display text-4xl sm:text-5xl font-bold text-white mt-3 mb-4">
            Your complete career boost
          </h2>
        </motion.div>

        {/* Vertical steps */}
        <div className="max-w-2xl mx-auto relative">
          {/* Vertical line */}
          <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-gradient-to-b from-cyan-400 via-violet-500 to-cyan-400 opacity-30" aria-hidden="true" />

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
                  <div className="w-16 h-16 rounded-full glass border border-cyan-400/40 flex flex-col items-center justify-center group-hover:border-cyan-400 group-hover:shadow-lg group-hover:shadow-cyan-400/20 transition-all">
                    <span className="text-2xl">{step.icon}</span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-cyan-400 flex items-center justify-center">
                    <span className="text-navy-900 text-xs font-bold">{step.num}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="glass rounded-2xl p-5 flex-1 group-hover:border-cyan-400/30 transition-all">
                  <h3 className="font-display font-bold text-white text-lg mb-1">{step.label}</h3>
                  <p className="text-white/60 text-sm">{step.desc}</p>
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
          className="text-center mt-12 text-white/60 text-lg italic"
        >
          "Repeat any time — every attempt builds confidence."
        </motion.p>
      </div>
    </section>
  );
}
