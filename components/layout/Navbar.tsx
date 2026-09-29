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
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 left-0 right-0 z-50 transition-all duration-200 bg-white border-b border-[#E5E7EB]',
        scrolled ? 'shadow-[0_1px_3px_rgba(0,0,0,0.06)]' : 'shadow-none'
      )}
    >
      <nav className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center text-white shadow-sm group-hover:bg-blue-600 transition-colors">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-sans font-bold text-xl tracking-tight text-gray-900">
              AXIOM
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5',
                    link.highlight
                      ? 'text-blue-700 bg-blue-50 border border-blue-200/80 hover:bg-blue-100 font-semibold'
                      : isActive
                      ? 'text-blue-600 bg-blue-50/70 font-semibold'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  )}
                >
                  {Icon && <Icon className="w-3.5 h-3.5 text-blue-600" />}
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/builder"
              className="px-4 py-2 rounded-lg bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold transition-all shadow-sm hover:shadow flex items-center gap-1.5"
            >
              <Wand2 className="w-3.5 h-3.5 text-blue-400" />
              <span>Build My Resume</span>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
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
              className="md:hidden border-t border-[#E5E7EB] py-3 space-y-1 bg-white"
            >
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all',
                      isActive
                        ? 'text-blue-600 bg-blue-50 font-semibold'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    )}
                  >
                    {Icon && <Icon className="w-4 h-4 text-blue-600" />}
                    <span>{link.label}</span>
                  </Link>
                );
              })}
              <div className="pt-2 px-3">
                <Link
                  href="/builder"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full text-center px-4 py-2.5 rounded-lg bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold shadow-sm"
                >
                  <Wand2 className="w-4 h-4 text-blue-400" />
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
