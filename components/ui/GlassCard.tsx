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
    default: 'glass',
    panel: 'glass-panel',
    specular: 'glass glass-specular',
  }[variant];

  const glowClass = {
    cyan: 'glow-cyan border-cyan-500/40 shadow-cyan-500/20',
    violet: 'glow-violet border-violet-500/40 shadow-violet-500/20',
    amber: 'border-amber-500/40 shadow-[0_0_25px_rgba(245,158,11,0.25)]',
    none: '',
  }[glow];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay }}
      whileHover={hover ? { y: -4, transition: { duration: 0.2 } } : undefined}
      onClick={onClick}
      className={cn(
        variantClass,
        'p-6 relative',
        glowClass,
        className
      )}
    >
      {/* Specular Top Border Sheen */}
      <div className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
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
        'rounded-xl flex items-center justify-center backdrop-blur-md',
        'bg-violet-500/20 border border-violet-400/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]',
        className
      )}
    >
      {children}
    </div>
  );
}
