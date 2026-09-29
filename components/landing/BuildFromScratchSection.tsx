"use client";

import React from "react";
import Link from "next/link";
import {
  Wand2,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function BuildFromScratchSection() {
  return (
    <section className="py-24 bg-[#F9FAFB] border-y border-[#E5E7EB] relative overflow-hidden" id="build-scratch">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.06)] relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            {/* Left Content (Col 7) */}
            <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
                <Wand2 className="w-3.5 h-3.5 text-blue-600" />
                Zero Resume? Build from Scratch with AI
              </div>

              <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#111827] leading-tight">
                Don't Have a Resume Yet? <br />
                <span className="text-gradient-cyan">
                  Build One in 5 Simple Steps.
                </span>
              </h2>

              <p className="text-[#4B5563] text-base sm:text-lg leading-relaxed max-w-2xl">
                Designed specifically for students and beginners. AXIOM asks you targeted questions about your coursework, student projects, and tools—then formats everything into an ATS-compliant resume with quantified Google XYZ bullets.
              </p>

              {/* 4 Feature Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 text-left">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span className="text-xs text-[#4B5563]">
                    <strong className="text-[#111827] font-semibold">Guided Q&A Wizard:</strong> No blank page anxiety. Simple structured prompts.
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span className="text-xs text-[#4B5563]">
                    <strong className="text-[#111827] font-semibold">XYZ Formula AI:</strong> Auto-transforms basic duties into metric-driven bullets.
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs text-[#4B5563]">
                    <strong className="text-[#111827] font-semibold">ATS Single-Column:</strong> Clean layout guaranteed to parse on any hiring system.
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span className="text-xs text-[#4B5563]">
                    <strong className="text-[#111827] font-semibold">1-Click Diagnostic:</strong> Direct handoff to the 100-point AI Scorer.
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-center gap-3.5 justify-center lg:justify-start">
                <Link
                  href="/builder"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gray-900 hover:bg-black text-white font-semibold text-sm transition-all shadow-sm hover:shadow flex items-center justify-center gap-2"
                >
                  <Wand2 className="w-4 h-4 text-blue-400" />
                  <span>Start AI Resume Builder (Free)</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/resume"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-gray-50 text-gray-800 font-semibold text-sm border border-gray-300 transition-all text-center shadow-sm"
                >
                  Already have one? Rate It Instead
                </Link>
              </div>
            </div>

            {/* Right Card Graphic Preview (Col 5) */}
            <div className="lg:col-span-5">
              <div className="relative bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl p-6 shadow-sm space-y-3.5">
                <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-400" />
                    <span className="w-3 h-3 rounded-full bg-amber-400" />
                    <span className="w-3 h-3 rounded-full bg-emerald-400" />
                  </div>
                  <span className="text-xs text-blue-600 font-mono font-medium">AXIOM Builder Studio</span>
                </div>

                <div className="space-y-2.5">
                  <div className="p-3.5 rounded-xl bg-white border border-[#E5E7EB] text-xs shadow-sm">
                    <span className="text-[10px] text-[#6B7280] uppercase tracking-wider block font-semibold">Question 1</span>
                    <p className="text-[#111827] font-medium mt-0.5">"What technical project are you proudest of?"</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-indigo-50/70 border border-indigo-200/80 text-xs shadow-sm">
                    <span className="text-[10px] text-indigo-700 uppercase tracking-wider flex items-center gap-1 font-bold">
                      <Sparkles className="w-3 h-3" /> AI Enhancement (Google XYZ Formula)
                    </span>
                    <p className="text-indigo-950 italic mt-1 text-[11px] leading-relaxed">
                      "Architected web telemetry dashboard with WebSocket streaming, cutting page load times by 38% for 1,200 active peers."
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs flex items-center justify-between shadow-sm">
                    <span className="text-[11px] text-emerald-800 font-semibold">ATS Compatibility Score:</span>
                    <span className="text-sm font-bold text-emerald-700">100% Ready</span>
                  </div>
                </div>

                <div className="pt-1 text-center">
                  <span className="text-[11px] text-[#6B7280]">
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
