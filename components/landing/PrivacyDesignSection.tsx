'use client';

import { motion } from 'framer-motion';
import { Monitor, Cpu, Lock } from 'lucide-react';

const nodes = [
  {
    icon: Monitor,
    label: 'Your Device',
    desc: 'Resume & video stay local',
    color: 'text-cyan-400',
    bg: 'bg-cyan-400/10 border-cyan-400/30',
  },
  {
    icon: Cpu,
    label: 'On-device AI',
    desc: 'Fast responses, no server',
    color: 'text-violet-400',
    bg: 'bg-violet-500/10 border-violet-500/30',
  },
  {
    icon: Lock,
    label: 'Private Results',
    desc: 'Works for everyone',
    color: 'text-green-400',
    bg: 'bg-green-400/10 border-green-400/30',
  },
];

export default function PrivacyDesignSection() {
  return (
    <section className="section-padding" aria-labelledby="privacy-design-heading">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-green-400 text-sm font-semibold tracking-widest uppercase">Privacy First</span>
          <h2 id="privacy-design-heading" className="font-display text-4xl sm:text-5xl font-bold text-white mt-3 mb-4">
            Private by Design
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Your resume and video never leave your browser. Everything runs on-device.
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
                  className={`glass rounded-2xl p-6 border ${node.bg} text-center w-48 hover:scale-105 transition-transform`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 border ${node.bg}`}>
                    <Icon className={`w-6 h-6 ${node.color}`} />
                  </div>
                  <h3 className="font-semibold text-white mb-1">{node.label}</h3>
                  <p className="text-white/50 text-xs">{node.desc}</p>
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
                      <div className="w-8 h-0.5 bg-gradient-to-r from-cyan-400 to-violet-500" />
                      <div className="text-cyan-400 text-xs">→</div>
                    </div>
                    <div className="sm:hidden text-cyan-400 text-2xl">↓</div>
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
            <div key={point} className="flex items-center gap-2 px-4 py-2 glass rounded-full text-white/70 text-sm border border-green-400/20">
              {point}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
