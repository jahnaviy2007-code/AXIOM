"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  EyeOff,
  Cpu,
  ServerOff,
  Database,
  ArrowRight,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/landing/Footer";
import Starfield from "@/components/landing/Starfield";
import { GlassCard } from "@/components/ui/GlassCard";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 relative overflow-hidden flex flex-col">
      <Starfield />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-32 pb-24 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-4">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            Architected for Zero Surveillance
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Our Privacy Guarantee
          </h1>
          <p className="text-slate-300 text-base">
            No marketing euphemisms. Your career data, resume, webcam feed, and voice recordings belong entirely to you.
          </p>
        </div>

        {/* 4 Pillars of Client-Side Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <GlassCard className="p-6">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
              <ServerOff className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white mb-2">Zero Cloud Storage</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              When you drop your resume or record an answer, the bytes are processed entirely in your browser's local sandbox memory. We maintain no backend databases storing your personal identity, contact info, or employment history.
            </p>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/30 flex items-center justify-center text-violet-400 mb-4">
              <EyeOff className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white mb-2">Local Video & Audio</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              During mock interviews, your camera and microphone feeds run directly inside the browser using standard WebRTC APIs. Video frames and voice data are analyzed locally on-device and instantly discarded upon question completion.
            </p>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white mb-2">Deterministic Scoring Engine</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Our 4-pillar algorithm (Measurable Results, Career Focus, Project Proof, Tailored Alignment) runs deterministic rule-based algorithms client-side. Your career evaluation is mathematically consistent, transparent, and prompt-injection immune.
            </p>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white mb-2">Local Persistence Only</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Diagnostic progress charts and saved course bookmarks are stored solely in your local browser storage (<code className="text-cyan-400 font-mono">localStorage</code>). Clearing your browser cookies completely erases all records.
            </p>
          </GlassCard>
        </div>

        {/* Comparison Table */}
        <GlassCard className="p-8 mb-12">
          <h3 className="font-serif text-xl font-bold text-white mb-6 text-center">
            How AXIOM Compares to Industry Platforms
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-700 text-slate-400">
                  <th className="pb-3 font-semibold">Privacy Feature</th>
                  <th className="pb-3 font-semibold text-cyan-400">AXIOM</th>
                  <th className="pb-3 font-semibold text-slate-400">Traditional Job Portals</th>
                  <th className="pb-3 font-semibold text-slate-400">Cloud AI Tools</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr>
                  <td className="py-3.5 text-white font-medium">Resume File Upload to Remote Server</td>
                  <td className="py-3.5 text-emerald-400 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> NEVER (Client-Only)
                  </td>
                  <td className="py-3.5 text-rose-400 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4" /> Permanent Database
                  </td>
                  <td className="py-3.5 text-rose-400 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4" /> Transmitted to Cloud LLM
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 text-white font-medium">Webcam & Audio Video Recording</td>
                  <td className="py-3.5 text-emerald-400 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Discarded in RAM
                  </td>
                  <td className="py-3.5 text-rose-400 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4" /> Stored for recruiters
                  </td>
                  <td className="py-3.5 text-rose-400 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4" /> Streamed to server
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 text-white font-medium">Resume Data Resold to Recruiters / Ads</td>
                  <td className="py-3.5 text-emerald-400 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> ZERO Third Parties
                  </td>
                  <td className="py-3.5 text-rose-400 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4" /> Core Business Model
                  </td>
                  <td className="py-3.5 text-slate-400">Varies by Terms</td>
                </tr>
                <tr>
                  <td className="py-3.5 text-white font-medium">Open Source & Inspectable Code</td>
                  <td className="py-3.5 text-emerald-400 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> 100% Client Code
                  </td>
                  <td className="py-3.5 text-rose-400 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4" /> Proprietary black-box
                  </td>
                  <td className="py-3.5 text-rose-400 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4" /> Proprietary API
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </GlassCard>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/resume"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 text-navy-950 font-bold text-sm hover:opacity-90 transition-all shadow-xl shadow-cyan-500/20"
          >
            <span>Start Free Diagnostic (Zero Sign-Up Required)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
