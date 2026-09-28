'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

const navLinks = [
  { href: '/resume', label: 'Resume Coach' },
  { href: '/interview', label: 'Mock Interview' },
  { href: '/certifications', label: 'Certifications' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/privacy', label: 'Privacy' },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 section-padding py-12" role="contentinfo">
      <div className="max-w-7xl mx-auto">
        {/* CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8 text-center mb-12 border border-cyan-400/20"
        >
          <h3 className="font-display text-3xl font-bold text-white mb-3">
            Ready to land your dream job?
          </h3>
          <p className="text-white/60 mb-6">Start with your resume — it takes 30 seconds.</p>
          <Link
            href="/resume"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-cyan-400 text-navy-900 font-semibold hover:bg-cyan-300 transition-all hover:shadow-xl hover:shadow-cyan-400/30"
          >
            Rate My Resume — Free
            <Zap className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-bold text-xl text-white">AXIOM</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              AI-Powered Resume & Interview Coach. Free, private and built for students.
            </p>
          </div>

          {/* Nav */}
          <div>
            <h4 className="font-semibold text-white mb-4">Features</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/50 hover:text-cyan-400 transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Privacy note */}
          <div>
            <h4 className="font-semibold text-white mb-4">Privacy Promise</h4>
            <p className="text-white/50 text-sm leading-relaxed">
              Your resume and video never leave your device. All AI runs locally in your browser using WebGPU. No account required. No data collected.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm text-center">
            Thank You – Team AXIOM | AI-Powered Resume & Interview Coach
          </p>
          <p className="text-white/30 text-xs">
            🔒 All processing is on-device. Nothing is uploaded.
          </p>
        </div>
      </div>
    </footer>
  );
}
