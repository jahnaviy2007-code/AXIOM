"use client";

import React from "react";
import Link from "next/link";
import {
  Wand2,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Code2,
  FileCheck,
  Zap,
  Layers,
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

export default function BuildFromScratchSection() {
  return (
    <section className="py-20 relative overflow-hidden" id="build-scratch">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-cyan-950/40 via-navy-900/80 to-violet-950/50 border border-cyan-500/40 shadow-2xl relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Content (Col 7) */}
            <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
                <Wand2 className="w-4 h-4 text-cyan-400" />
                Zero Resume? Build from Scratch with AI
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
                Don't Have a Resume Yet? <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-violet-400">
                  Build One in 5 Simple Steps.
                </span>
              </h2>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
                Designed for students and new creators. AXIOM asks you targeted questions about your coursework, student projects, and tools—then formats everything into a recruiter-approved, ATS-compliant resume with quantified XYZ bullets.
              </p>

              {/* 4 Feature Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-left">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-300">
                    <strong className="text-white">Guided Q&A Wizard:</strong> No blank page anxiety. Simple guided prompts.
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-300">
                    <strong className="text-white">XYZ Formula AI:</strong> Auto-transforms basic duties into metric bullets.
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-300">
                    <strong className="text-white">ATS Single-Column:</strong> Clean layout guaranteed to parse on any hiring system.
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-300">
                    <strong className="text-white">1-Click Diagnostic:</strong> Direct handoff to the 100-point AI Scorer.
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <Link
                  href="/builder"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 text-navy-950 font-bold text-sm hover:opacity-95 transition-all shadow-xl shadow-cyan-500/25 flex items-center justify-center gap-2"
                >
                  <Wand2 className="w-4 h-4" />
                  <span>Start AI Resume Builder (Free)</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/resume"
                  className="w-full sm:w-auto px-6 py-4 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition-all text-center"
                >
                  Already have one? Rate It Instead
                </Link>
              </div>
            </div>

            {/* Right Card Graphic Preview (Col 5) */}
            <div className="lg:col-span-5">
              <div className="relative bg-navy-950/90 border border-slate-700/80 rounded-2xl p-6 shadow-2xl backdrop-blur-md space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-[11px] text-cyan-400 font-mono">AXIOM Builder Studio</span>
                </div>

                <div className="space-y-2.5">
                  <div className="p-3 rounded-lg bg-navy-900/80 border border-slate-800 text-xs">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Question 1</span>
                    <p className="text-slate-200 font-medium">"What technical project are you proudest of?"</p>
                  </div>

                  <div className="p-3 rounded-lg bg-violet-950/30 border border-violet-500/30 text-xs">
                    <span className="text-[10px] text-violet-400 uppercase tracking-wider flex items-center gap-1 font-semibold">
                      <Sparkles className="w-3 h-3" /> AI Enhancement (XYZ Formula)
                    </span>
                    <p className="text-white italic mt-1 text-[11px]">
                      "Architected web telemetry dashboard with WebSocket streaming, cutting page load times by 38% for 1,200 active peers."
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-xs flex items-center justify-between">
                    <span className="text-[11px] text-emerald-300 font-semibold">ATS Compatibility Score:</span>
                    <span className="text-sm font-bold text-emerald-400">100% Ready</span>
                  </div>
                </div>

                <div className="pt-2 text-center">
                  <span className="text-[11px] text-slate-400">
                    Outputs high-resolution PDF + editable text in under 5 minutes
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
