'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

const navLinks = [
  { href: '/builder', label: 'Build Resume' },
  { href: '/resume', label: 'Rate Resume' },
  { href: '/interview', label: 'Mock Interview' },
  { href: '/sessions', label: 'Foundational Sessions' },
  { href: '/certifications', label: 'Certifications' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/privacy', label: 'Privacy' },
];

export default function Footer() {
  return (
    <footer className="bg-[#F9FAFB] border-t border-[#E5E7EB] py-16" role="contentinfo">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-8 sm:p-12 text-center mb-16 border border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
        >
          <h3 className="font-sans text-2xl sm:text-3xl font-bold text-[#111827] mb-3">
            Ready to land your dream job?
          </h3>
          <p className="text-[#4B5563] text-base mb-6 max-w-xl mx-auto">
            Start with your resume or build one from scratch — fast, free, and privacy-first.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/builder"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-900 hover:bg-black text-white font-semibold transition-all shadow-sm hover:shadow"
            >
              Build Resume from Scratch
              <Zap className="w-4 h-4 text-blue-400" />
            </Link>
            <Link
              href="/resume"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-gray-50 text-gray-800 font-semibold border border-gray-300 transition-all shadow-sm"
            >
              Rate My Resume — Free
            </Link>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center shadow-sm">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-sans font-bold text-xl text-[#111827]">AXIOM</span>
            </div>
            <p className="text-[#4B5563] text-sm leading-relaxed">
              AI-Powered Resume & Interview Coach. Free, private and built for students to transition into tech careers.
            </p>
          </div>

          {/* Nav */}
          <div>
            <h4 className="font-semibold text-[#111827] mb-4 text-sm uppercase tracking-wider">Features</h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[#4B5563] hover:text-[#111827] transition-colors text-sm font-medium">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Privacy note */}
          <div>
            <h4 className="font-semibold text-[#111827] mb-4 text-sm uppercase tracking-wider">Privacy Promise</h4>
            <p className="text-[#4B5563] text-sm leading-relaxed">
              Your resume, speech, and video never leave your device without consent. All processing runs locally in your browser sandbox with local SQLite persistence. No account required.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#E5E7EB] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[#6B7280]">
          <p className="text-center sm:text-left">
            Thank You – Team AXIOM | AI-Powered Resume & Interview Coach
          </p>
          <p className="text-xs">
            🔒 On-device privacy • Zero tracking
          </p>
        </div>
      </div>
    </footer>
  );
}
