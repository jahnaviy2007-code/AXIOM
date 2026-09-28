"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  BarChart3,
  TrendingUp,
  Award,
  Video,
  FileText,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ExternalLink,
  Target,
  Database,
  RefreshCw,
  HardDrive,
  Cpu,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import Footer from "@/components/landing/Footer";
import Starfield from "@/components/landing/Starfield";
import { GlassCard } from "@/components/ui/GlassCard";
import { useAxiomStore } from "@/store/useAxiomStore";
import certData from "@/data/certifications.json";

export default function DashboardPage() {
  const {
    scoreHistory,
    interviewHistory,
    savedCertifications,
    selectedRole,
    scoreResult,
  } = useAxiomStore();

  const currentScore = scoreResult
    ? scoreResult.overall
    : scoreHistory[scoreHistory.length - 1]?.score || 78;

  const savedCoursesList = certData.filter((c) =>
    savedCertifications.includes(c.id)
  );

  // SQLite DB Live State
  const [dbStats, setDbStats] = useState<{
    totalResumes: number;
    totalInterviews: number;
    totalCertificates: number;
    averageInterviewScore: number;
  } | null>(null);
  const [isRefreshingDb, setIsRefreshingDb] = useState(false);
  const [dbResumes, setDbResumes] = useState<any[]>([]);

  const fetchDbTelemetry = async () => {
    setIsRefreshingDb(true);
    try {
      const [statsRes, resumesRes] = await Promise.all([
        fetch("/api/stats"),
        fetch("/api/resumes"),
      ]);
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setDbStats(statsData.data);
      }
      if (resumesRes.ok) {
        const resumesData = await resumesRes.json();
        setDbResumes(resumesData.data || []);
      }
    } catch (err) {
      console.warn("Error querying SQLite backend:", err);
    } finally {
      setIsRefreshingDb(false);
    }
  };

  useEffect(() => {
    fetchDbTelemetry();
  }, []);

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 relative overflow-hidden flex flex-col">
      <Starfield />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-32 pb-24 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-3 font-mono">
              <Database className="w-3.5 h-3.5 text-cyan-400" />
              SQLite DB Backend Active • Ultra-Frosted Glassmorphism
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2">
              Student Career Command Center
            </h1>
            <p className="text-slate-400 text-sm">
              Target Track: <strong className="text-cyan-400">{selectedRole}</strong>
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              href="/resume"
              className="px-4 py-2.5 rounded-xl glass hover:bg-slate-800 text-slate-200 text-xs font-semibold border border-white/10 flex items-center gap-2 transition-all"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              Audit Resume
            </Link>
            <Link
              href="/interview"
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 text-navy-950 text-xs font-bold hover:opacity-90 transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2"
            >
              <Video className="w-4 h-4" />
              Live AI Interview
            </Link>
          </div>
        </div>

        {/* SQLite Backend Telemetry Glass Bar */}
        <GlassCard variant="specular" className="p-5 mb-8 border-cyan-500/30">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-md">
                <HardDrive className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white font-mono">
                    SQLite Database Engine
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    WAL SYNCHRONIZED
                  </span>
                </div>
                <span className="text-xs text-slate-400 block font-mono">
                  Database file: <code className="text-cyan-300">data/axiom.db</code>
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
              <div className="px-3 py-1.5 rounded-xl glass-panel text-slate-300">
                Resumes in DB:{" "}
                <strong className="text-cyan-400 font-bold">
                  {dbStats ? dbStats.totalResumes : dbResumes.length || 1}
                </strong>
              </div>
              <div className="px-3 py-1.5 rounded-xl glass-panel text-slate-300">
                Interviews in DB:{" "}
                <strong className="text-violet-400 font-bold">
                  {dbStats ? dbStats.totalInterviews : interviewHistory.length || 2}
                </strong>
              </div>
              <div className="px-3 py-1.5 rounded-xl glass-panel text-slate-300">
                Certificates:{" "}
                <strong className="text-emerald-400 font-bold">
                  {dbStats ? dbStats.totalCertificates : 1}
                </strong>
              </div>

              <button
                onClick={fetchDbTelemetry}
                disabled={isRefreshingDb}
                className="p-2 rounded-xl glass hover:bg-slate-800 text-cyan-300 transition-colors disabled:opacity-50"
                title="Refresh SQLite database telemetry"
              >
                <RefreshCw
                  className={`w-4 h-4 ${isRefreshingDb ? "animate-spin" : ""}`}
                />
              </button>
            </div>
          </div>
        </GlassCard>

        {/* Top Summary KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <GlassCard variant="specular" glow="cyan" className="p-5 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 block mb-1">Current Readiness</span>
              <span className="text-3xl font-serif font-bold text-white">{currentScore}/100</span>
              <span className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1 font-mono">
                <TrendingUp className="w-3 h-3" /> +31 pts since Day 1
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-lg">
              <Target className="w-6 h-6" />
            </div>
          </GlassCard>

          <GlassCard variant="specular" glow="violet" className="p-5 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 block mb-1">Simulations Completed</span>
              <span className="text-3xl font-serif font-bold text-white">
                {dbStats ? dbStats.totalInterviews : interviewHistory.length || 2}
              </span>
              <span className="text-[11px] text-violet-400 block mt-1 font-mono">Avg Score: 85%</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/30 flex items-center justify-center text-violet-400 shadow-lg">
              <Video className="w-6 h-6" />
            </div>
          </GlassCard>

          <GlassCard variant="specular" glow="amber" className="p-5 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 block mb-1">Saved Courses</span>
              <span className="text-3xl font-serif font-bold text-white">
                {savedCertifications.length || 3}
              </span>
              <span className="text-[11px] text-amber-400 block mt-1 font-mono">Free credentials</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-lg">
              <Award className="w-6 h-6" />
            </div>
          </GlassCard>

          <GlassCard variant="specular" className="p-5 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 block mb-1">ATS Pass Probability</span>
              <span className="text-3xl font-serif font-bold text-white">96%</span>
              <span className="text-[11px] text-emerald-400 block mt-1 font-mono">Clean hierarchy</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-lg">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </GlassCard>
        </div>

        {/* Charts & Roadmap Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Progress Chart */}
          <GlassCard variant="panel" className="p-6 lg:col-span-2 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-semibold text-white">Readiness Score Growth</h3>
                <p className="text-xs text-slate-400">ATS optimization & mock interview score trend over time</p>
              </div>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20">
                Live Analytics
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={scoreHistory}>
                  <defs>
                    <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22D3EE" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#22D3EE" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                  <XAxis dataKey="date" stroke="#64748B" fontSize={11} tickLine={false} />
                  <YAxis stroke="#64748B" fontSize={11} tickLine={false} domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0B0F2E",
                      borderColor: "#334155",
                      borderRadius: "0.75rem",
                      fontSize: "12px",
                      color: "#fff",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="#22D3EE"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#scoreGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          {/* Quick Target Checklist */}
          <GlassCard variant="panel" className="p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-base font-semibold text-white mb-1">Phase 1 Milestones</h3>
              <p className="text-xs text-slate-400 mb-4">Essential steps to achieve 90+ overall readiness</p>

              <div className="space-y-3">
                {[
                  { title: "Build ATS-formatted Resume", done: true },
                  { title: "Complete Git & Deployment Session", done: true },
                  { title: "Score 80+ with AI Humanoid Bot", done: true },
                  { title: "Verify Cloud Architecture Certificate", done: false },
                  { title: "Practice STAR Edge-Case Prompt", done: false },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-2.5 rounded-xl glass text-xs"
                  >
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center ${
                        item.done ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40" : "bg-slate-800 text-slate-500"
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span className={item.done ? "text-slate-200" : "text-slate-400"}>
                      {item.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">Total Completion:</span>
              <span className="font-bold text-cyan-400 font-mono">60% Done</span>
            </div>
          </GlassCard>
        </div>

        {/* Saved Free Certifications Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-white">Your Saved Certifications</h2>
              <p className="text-xs text-slate-400">100% free credentials verified on your resume</p>
            </div>
            <Link
              href="/certifications"
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
            >
              Explore Catalog <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {savedCoursesList.length > 0 ? (
              savedCoursesList.map((course) => (
                <GlassCard key={course.id} className="p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                        {course.provider}
                      </span>
                      <span className="text-[10px] text-emerald-400 font-semibold uppercase">{course.level}</span>
                    </div>
                    <h3 className="text-sm font-bold text-white mb-1.5">{course.title}</h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mb-3">
                      Skills: {course.skills.slice(0, 3).join(", ")}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {course.duration}
                    </span>
                    <a
                      href={course.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
                    >
                      Open Course <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </GlassCard>
              ))
            ) : (
              <GlassCard className="p-6 col-span-3 text-center">
                <p className="text-xs text-slate-400 mb-3">No saved certifications yet.</p>
                <Link
                  href="/certifications"
                  className="px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-bold"
                >
                  Browse Free Certifications
                </Link>
              </GlassCard>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
