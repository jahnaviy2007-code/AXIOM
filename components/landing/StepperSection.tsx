'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const steps = [
  { label: 'Upload', sublabel: 'PDF or DOCX', icon: '📄' },
  { label: 'Parse', sublabel: 'Extract sections', icon: '🔍' },
  { label: 'ATS Check', sublabel: 'Keyword match', icon: '✅' },
  { label: 'Score', sublabel: 'Out of 100', icon: '📊' },
  { label: 'Find Gaps', sublabel: '4 criteria', icon: '🎯' },
  { label: 'AI Rewrite', sublabel: 'Smart suggestions', icon: '✨' },
  { label: 'Improved Resume', sublabel: 'Download ready', icon: '🚀' },
];

export default function StepperSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeStep, setActiveStep] = useState(-1);

  // Auto-animate steps when in view
  if (isInView && activeStep === -1) {
    setTimeout(() => setActiveStep(0), 500);
    steps.forEach((_, i) => {
      setTimeout(() => setActiveStep(i), 500 + i * 400);
    });
  }

  return (
    <section className="section-padding" ref={ref} aria-labelledby="stepper-heading">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase">How it works</span>
          <h2 id="stepper-heading" className="font-display text-4xl sm:text-5xl font-bold text-white mt-3 mb-4">
            How we build your better resume
          </h2>
          <p className="text-white/60 text-lg">
            Every step runs on-device, so your resume stays private.
          </p>
        </motion.div>

        {/* Stepper — horizontal scroll on mobile */}
        <div className="overflow-x-auto pb-4">
          <div className="flex items-start min-w-max mx-auto px-4" style={{ gap: 0 }}>
            {steps.map((step, i) => (
              <div key={step.label} className="flex items-start">
                {/* Step node */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5 + i * 0.15, type: 'spring' }}
                  className="flex flex-col items-center w-28"
                >
                  {/* Circle */}
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl mb-3 border-2 transition-all duration-500 ${
                      i <= activeStep
                        ? 'border-cyan-400 bg-cyan-400/20 shadow-lg shadow-cyan-400/30'
                        : 'border-white/20 bg-white/5'
                    }`}
                  >
                    {step.icon}
                  </div>

                  {/* Step number */}
                  <div
                    className={`text-xs font-bold mb-1 transition-colors duration-500 ${
                      i <= activeStep ? 'text-cyan-400' : 'text-white/30'
                    }`}
                  >
                    Step {i + 1}
                  </div>

                  {/* Label */}
                  <div
                    className={`font-semibold text-sm text-center mb-1 transition-colors duration-500 ${
                      i <= activeStep ? 'text-white' : 'text-white/50'
                    }`}
                  >
                    {step.label}
                  </div>

                  {/* Sublabel */}
                  <div className="text-white/40 text-xs text-center">{step.sublabel}</div>
                </motion.div>

                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="flex items-center mt-7 w-8 flex-shrink-0">
                    <div className="w-full h-0.5 relative overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={i < activeStep ? { scaleX: 1 } : { scaleX: 0 }}
                        transition={{ duration: 0.4, delay: 0.5 + i * 0.15 }}
                        style={{ originX: 0 }}
                        className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-violet-500 rounded-full"
                      />
                    </div>
                    <div className={`flex-shrink-0 text-xs ml-0.5 transition-colors duration-500 ${i < activeStep ? 'text-cyan-400' : 'text-white/20'}`}>▶</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8"
        >
          <span className="inline-flex items-center gap-2 text-cyan-400/70 text-sm">
            🔒 Every step runs on-device — your resume never leaves your browser.
          </span>
        </motion.div>
      </div>
    </section>
  );
}
