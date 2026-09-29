'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: 'cyan' | 'violet' | 'amber' | 'none';
  variant?: 'default' | 'panel' | 'specular';
  delay?: number;
  onClick?: () => void;
}

export function GlassCard({
  children,
  className,
  hover = true,
  glow = 'none',
  variant = 'default',
  delay = 0,
  onClick,
}: GlassCardProps) {
  const variantClass = {
    default: 'bg-white border border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.06)]',
    panel: 'bg-[#F9FAFB] border border-[#E5E7EB] shadow-[0_1px_2px_rgba(0,0,0,0.04)]',
    specular: 'bg-white border border-[#E5E7EB] shadow-[0_2px_4px_rgba(0,0,0,0.05)]',
  }[variant];

  const glowClass = {
    cyan: 'hover:border-sky-300 hover:shadow-[0_8px_20px_rgba(2,132,199,0.08)]',
    violet: 'hover:border-indigo-300 hover:shadow-[0_8px_20px_rgba(79,70,229,0.08)]',
    amber: 'hover:border-amber-300 hover:shadow-[0_8px_20px_rgba(217,119,6,0.08)]',
    none: 'hover:border-gray-300 hover:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.06)]',
  }[glow];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay }}
      whileHover={hover ? { y: -3, transition: { duration: 0.2 } } : undefined}
      onClick={onClick}
      className={cn(
        'rounded-2xl p-6 relative transition-all duration-200',
        variantClass,
        hover && glowClass,
        className
      )}
    >
      {children}
    </motion.div>
  );
}

interface IconTileProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function IconTile({ children, className, size = 'md' }: IconTileProps) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };
  return (
    <div
      className={cn(
        sizes[size],
        'rounded-xl flex items-center justify-center',
        'bg-indigo-50 border border-indigo-100 text-indigo-600 shadow-sm',
        className
      )}
    >
      {children}
    </div>
  );
}
