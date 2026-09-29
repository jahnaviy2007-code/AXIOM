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
    setTimeout(() => setActiveStep(0), 400);
    steps.forEach((_, i) => {
      setTimeout(() => setActiveStep(i), 400 + i * 350);
    });
  }

  return (
    <section className="section-padding bg-white" ref={ref} aria-labelledby="stepper-heading">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-blue-600 text-xs font-bold tracking-widest uppercase block mb-2">
            How it works
          </span>
          <h2 id="stepper-heading" className="font-sans text-3xl sm:text-5xl font-extrabold text-[#111827] tracking-tight mb-4">
            How we build your better resume
          </h2>
          <p className="text-[#4B5563] text-lg max-w-xl mx-auto leading-relaxed">
            Every step runs on-device, so your resume stays strictly private and secure.
          </p>
        </motion.div>

        {/* Stepper — horizontal scroll on mobile */}
        <div className="overflow-x-auto pb-6">
          <div className="flex items-start min-w-max mx-auto px-4 justify-center" style={{ gap: 0 }}>
            {steps.map((step, i) => (
              <div key={step.label} className="flex items-start">
                {/* Step node */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, type: 'spring' }}
                  className="flex flex-col items-center w-28"
                >
                  {/* Circle */}
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-3 border transition-all duration-300 shadow-sm ${
                      i <= activeStep
                        ? 'border-blue-600 bg-blue-50 shadow-md scale-105'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    {step.icon}
                  </div>

                  {/* Step number */}
                  <div
                    className={`text-xs font-bold mb-1 transition-colors duration-300 ${
                      i <= activeStep ? 'text-blue-600' : 'text-gray-400'
                    }`}
                  >
                    Step {i + 1}
                  </div>

                  {/* Label */}
                  <div
                    className={`font-semibold text-sm text-center mb-0.5 transition-colors duration-300 ${
                      i <= activeStep ? 'text-[#111827]' : 'text-gray-400'
                    }`}
                  >
                    {step.label}
                  </div>

                  {/* Sublabel */}
                  <div className="text-[#6B7280] text-xs text-center">{step.sublabel}</div>
                </motion.div>

                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="flex items-center mt-7 w-8 flex-shrink-0">
                    <div className="w-full h-0.5 relative overflow-hidden rounded-full bg-gray-200">
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={i < activeStep ? { scaleX: 1 } : { scaleX: 0 }}
                        transition={{ duration: 0.3, delay: 0.3 + i * 0.1 }}
                        style={{ originX: 0 }}
                        className="absolute inset-0 bg-blue-600 rounded-full"
                      />
                    </div>
                    <div className={`flex-shrink-0 text-xs ml-0.5 transition-colors duration-300 ${i < activeStep ? 'text-blue-600' : 'text-gray-300'}`}>▶</div>
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
          className="text-center mt-6"
        >
          <span className="inline-flex items-center gap-2 text-[#6B7280] text-xs font-medium bg-gray-50 px-3.5 py-1.5 rounded-full border border-gray-200 shadow-sm">
            🔒 Every step runs on-device — your resume never leaves your browser.
          </span>
        </motion.div>
      </div>
    </section>
  );
}
