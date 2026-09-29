'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Shield, Cpu, GraduationCap, ArrowRight } from 'lucide-react';
import RobotMascot from './RobotMascot';

const badges = [
  { icon: Shield, label: 'Private & On-Device' },
  { icon: Cpu, label: 'SQLite Backed Engine' },
  { icon: GraduationCap, label: '100% Free for Students' },
];

export default function HeroSection() {
  return (
    <section
      className="relative min-h-[90vh] flex items-center justify-center section-padding pt-24 pb-20 bg-white"
      aria-label="Hero"
    >
      <div className="max-w-[1200px] mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
        {/* Text content */}
        <div className="text-center lg:text-left order-2 lg:order-1">
          {/* Team badge */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold mb-6 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            TEAM AXIOM • CAREER ACCELERATION
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-sans text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#111827] leading-[1.12] tracking-tight mb-5"
          >
            AI-Powered{' '}
            <span className="text-gradient-cyan">Resume & Interview</span>{' '}
            Coach
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-[#4B5563] mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0"
          >
            Rate your resume against ATS algorithms. Practise with autonomous AI interview bots.{' '}
            <strong className="text-[#111827] font-semibold">Get certified — free.</strong>
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row flex-wrap gap-3.5 justify-center lg:justify-start mb-10"
          >
            <Link
              href="/builder"
              className="group flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gray-900 hover:bg-black text-white font-semibold text-base transition-all shadow-sm hover:shadow"
            >
              <span>Build Resume from Scratch</span>
              <ArrowRight className="w-4 h-4 text-blue-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/resume"
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-gray-50 text-gray-800 font-semibold text-sm border border-gray-300 transition-all shadow-sm"
            >
              Rate Existing Resume
            </Link>
            <Link
              href="/interview"
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-sm border border-blue-200 transition-all shadow-sm"
            >
              Live Mock Interview
            </Link>
          </motion.div>

          {/* Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-2.5 justify-center lg:justify-start"
          >
            {badges.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200 text-[#4B5563] text-xs font-medium shadow-sm"
              >
                <Icon className="w-3.5 h-3.5 text-blue-600" />
                {label}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Mascot */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="order-1 lg:order-2 flex justify-center"
        >
          <RobotMascot />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1.5 pointer-events-none"
        aria-hidden="true"
      >
        <span className="text-[#6B7280] text-[10px] tracking-widest uppercase font-semibold">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-gray-300 to-transparent" />
      </motion.div>
    </section>
  );
}
