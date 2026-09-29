'use client';

import { motion } from 'framer-motion';
import { Monitor, Cpu, Lock } from 'lucide-react';

const nodes = [
  {
    icon: Monitor,
    label: 'Your Device',
    desc: 'Resume & video stay local',
    color: 'text-sky-700',
    bg: 'bg-sky-50 border-sky-200',
  },
  {
    icon: Cpu,
    label: 'On-device AI',
    desc: 'Fast responses, no server',
    color: 'text-indigo-700',
    bg: 'bg-indigo-50 border-indigo-200',
  },
  {
    icon: Lock,
    label: 'Private Results',
    desc: 'Works for everyone',
    color: 'text-emerald-700',
    bg: 'bg-emerald-50 border-emerald-200',
  },
];

export default function PrivacyDesignSection() {
  return (
    <section className="py-24 bg-white" aria-labelledby="privacy-design-heading">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-emerald-700 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 inline-block mb-3">
            Privacy First
          </span>
          <h2 id="privacy-design-heading" className="font-display text-4xl sm:text-5xl font-bold text-[#111827] mt-1 mb-4">
            Private by Design
          </h2>
          <p className="text-[#4B5563] text-base sm:text-lg max-w-2xl mx-auto">
            Your resume and video never leave your browser. Everything executes strictly on-device with zero cloud telemetry.
          </p>
        </motion.div>

        {/* Diagram */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-0 max-w-3xl mx-auto">
          {nodes.map((node, i) => {
            const Icon = node.icon;
            return (
              <div key={node.label} className="flex items-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="bg-[#F9FAFB] rounded-2xl p-6 border border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.06)] text-center w-48 hover:scale-105 transition-transform"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 border ${node.bg}`}>
                    <Icon className={`w-6 h-6 ${node.color}`} />
                  </div>
                  <h3 className="font-semibold text-[#111827] mb-1">{node.label}</h3>
                  <p className="text-[#6B7280] text-xs">{node.desc}</p>
                </motion.div>

                {/* Arrow */}
                {i < nodes.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 + 0.1 }}
                    className="flex-shrink-0 mx-2 sm:mx-4"
                  >
                    <div className="hidden sm:flex flex-col items-center gap-1">
                      <div className="w-8 h-0.5 bg-gray-300" />
                      <div className="text-gray-400 text-xs">→</div>
                    </div>
                    <div className="sm:hidden text-gray-400 text-2xl">↓</div>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>

        {/* Privacy points */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 flex flex-wrap gap-4 justify-center"
        >
          {[
            '🔒 Resume & video stay local',
            '⚡ Fast responses — no network latency',
            '🌍 Works for everyone, even offline',
          ].map((point) => (
            <div key={point} className="flex items-center gap-2 px-4 py-2 bg-white rounded-full text-[#4B5563] text-sm border border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
              {point}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
