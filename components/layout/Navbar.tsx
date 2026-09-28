'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap, Wand2, PlayCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/builder', label: 'Build Resume', icon: Wand2, highlight: true },
  { href: '/resume', label: 'Rate Resume' },
  { href: '/interview', label: 'Interview' },
  { href: '/sessions', label: 'Sessions', icon: PlayCircle },
  { href: '/certifications', label: 'Certifications' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/privacy', label: 'Privacy' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-navy-950/80 backdrop-blur-2xl border-b border-white/12 shadow-[0_10px_30px_rgba(0,0,0,0.45),inset_0_1px_1px_rgba(255,255,255,0.15)]'
          : 'bg-navy-950/30 backdrop-blur-md border-b border-white/5'
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center glow-cyan group-hover:scale-110 transition-transform">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-xl text-white">AXIOM</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5',
                    link.highlight
                      ? 'text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500/20'
                      : pathname === link.href
                      ? 'text-cyan-400 bg-cyan-400/10'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  )}
                >
                  {Icon && <Icon className="w-4 h-4 text-cyan-400" />}
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/builder"
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-violet-500 text-navy-950 text-sm font-bold hover:opacity-95 transition-all shadow-lg shadow-cyan-400/25 flex items-center gap-1.5"
            >
              <Wand2 className="w-4 h-4" />
              <span>Build My Resume</span>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-white/70 hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-white/10 py-4 space-y-1"
            >
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all',
                      pathname === link.href
                        ? 'text-cyan-400 bg-cyan-400/10'
                        : 'text-white/70 hover:text-white'
                    )}
                  >
                    {Icon && <Icon className="w-4 h-4 text-cyan-400" />}
                    <span>{link.label}</span>
                  </Link>
                );
              })}
              <div className="pt-2 px-4">
                <Link
                  href="/builder"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full text-center px-4 py-2.5 rounded-lg bg-gradient-to-r from-cyan-400 to-violet-500 text-navy-950 text-sm font-bold shadow-lg shadow-cyan-500/20"
                >
                  <Wand2 className="w-4 h-4" />
                  <span>Build My Resume</span>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
