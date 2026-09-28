'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Shield, Cpu, GraduationCap, ArrowRight } from 'lucide-react';
import RobotMascot from './RobotMascot';

const badges = [
  { icon: Shield, label: 'Private' },
  { icon: Cpu, label: 'On-device AI' },
  { icon: GraduationCap, label: 'Free for every student' },
];

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center section-padding pt-24"
      aria-label="Hero"
    >
      {/* Background glow blobs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #22D3EE, transparent)' }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #7C5CFF, transparent)' }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
        {/* Text content */}
        <div className="text-center lg:text-left order-2 lg:order-1">
          {/* Team badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-cyan-400/30 text-cyan-400 text-sm font-medium mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            TEAM AXIOM
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4"
          >
            AI-Powered{' '}
            <span className="text-gradient-cyan">Resume & Interview</span>{' '}
            Coach
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-white/70 mb-8 leading-relaxed"
          >
            Rate your resume. Practise live with an AI interviewer.{' '}
            <strong className="text-cyan-400">Get certified — free.</strong>
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row flex-wrap gap-3.5 justify-center lg:justify-start mb-10"
          >
            <Link
              href="/builder"
              className="group flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 text-navy-950 font-bold text-base hover:opacity-95 transition-all shadow-xl shadow-cyan-400/25 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <ArrowRight className="w-4 h-4" />
              Build My Resume (From Scratch)
            </Link>
            <Link
              href="/resume"
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl glass border border-white/20 text-white font-semibold text-sm hover:border-cyan-400/50 hover:bg-white/5 transition-all"
            >
              Rate Existing Resume
            </Link>
            <Link
              href="/interview"
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl glass border border-violet-500/50 text-violet-300 font-semibold text-sm hover:border-violet-400 hover:shadow-xl hover:shadow-violet-500/20 transition-all"
            >
              Live Mock Interview
            </Link>
          </motion.div>

          {/* Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-3 justify-center lg:justify-start"
          >
            {badges.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-white/10 text-white/60 text-sm"
              >
                <Icon className="w-3.5 h-3.5 text-cyan-400" />
                {label}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Mascot */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, type: 'spring' }}
          className="order-1 lg:order-2 flex justify-center"
        >
          <RobotMascot />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-white/30 text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent" />
      </motion.div>
    </section>
  );
}
