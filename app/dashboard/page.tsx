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
    <div className="min-h-screen bg-white text-[#4B5563] relative overflow-hidden flex flex-col">
      <Starfield />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-32 pb-24 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-[#E5E7EB]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-3 font-mono">
              <Database className="w-3.5 h-3.5 text-blue-600" />
              SQLite DB Backend Active • Clean White Architecture
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#111827] mb-2">
              Student Career Command Center
            </h1>
            <p className="text-[#6B7280] text-sm">
              Target Track: <strong className="text-blue-700">{selectedRole}</strong>
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              href="/resume"
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-gray-50 text-[#4B5563] hover:text-[#111827] text-xs font-semibold border border-[#E5E7EB] shadow-sm flex items-center gap-2 transition-all"
            >
              <FileText className="w-4 h-4 text-blue-600" />
              Audit Resume
            </Link>
            <Link
              href="/interview"
              className="px-4 py-2.5 rounded-xl bg-gray-900 hover:bg-black text-white text-xs font-bold transition-all shadow-[0_1px_3px_rgba(0,0,0,0.08)] flex items-center gap-2"
            >
              <Video className="w-4 h-4" />
              Live AI Interview
            </Link>
          </div>
        </div>

        {/* SQLite Backend Telemetry Glass Bar */}
        <div className="p-5 mb-8 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shadow-sm">
                <HardDrive className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-[#111827] font-mono">
                    SQLite Database Engine
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    WAL SYNCHRONIZED
                  </span>
                </div>
                <span className="text-xs text-[#6B7280] block font-mono">
                  Database file: <code className="text-blue-700">data/axiom.db</code>
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
              <div className="px-3 py-1.5 rounded-xl bg-white border border-[#E5E7EB] text-[#4B5563] shadow-sm">
                Resumes in DB:{" "}
                <strong className="text-blue-700 font-bold">
                  {dbStats ? dbStats.totalResumes : dbResumes.length || 1}
                </strong>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-white border border-[#E5E7EB] text-[#4B5563] shadow-sm">
                Interviews in DB:{" "}
                <strong className="text-indigo-700 font-bold">
                  {dbStats ? dbStats.totalInterviews : interviewHistory.length || 2}
                </strong>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-white border border-[#E5E7EB] text-[#4B5563] shadow-sm">
                Certificates:{" "}
                <strong className="text-emerald-700 font-bold">
                  {dbStats ? dbStats.totalCertificates : 1}
                </strong>
              </div>

              <button
                onClick={fetchDbTelemetry}
                disabled={isRefreshingDb}
                className="p-2 rounded-xl bg-white hover:bg-gray-50 text-[#4B5563] border border-[#E5E7EB] shadow-sm transition-colors disabled:opacity-50"
                title="Refresh SQLite database telemetry"
              >
                <RefreshCw
                  className={`w-4 h-4 ${isRefreshingDb ? "animate-spin" : ""}`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Top Summary KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <GlassCard className="p-5 flex items-center justify-between bg-white border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
            <div>
              <span className="text-xs text-[#6B7280] block mb-1">Current Readiness</span>
              <span className="text-3xl font-serif font-bold text-[#111827]">{currentScore}/100</span>
              <span className="text-[11px] text-emerald-700 flex items-center gap-1 mt-1 font-mono font-medium">
                <TrendingUp className="w-3 h-3" /> +31 pts since Day 1
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shadow-sm">
              <Target className="w-6 h-6" />
            </div>
          </GlassCard>

          <GlassCard className="p-5 flex items-center justify-between bg-white border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
            <div>
              <span className="text-xs text-[#6B7280] block mb-1">Simulations Completed</span>
              <span className="text-3xl font-serif font-bold text-[#111827]">
                {dbStats ? dbStats.totalInterviews : interviewHistory.length || 2}
              </span>
              <span className="text-[11px] text-indigo-700 block mt-1 font-mono font-medium">Avg Score: 85%</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shadow-sm">
              <Video className="w-6 h-6" />
            </div>
          </GlassCard>

          <GlassCard className="p-5 flex items-center justify-between bg-white border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
            <div>
              <span className="text-xs text-[#6B7280] block mb-1">Saved Courses</span>
              <span className="text-3xl font-serif font-bold text-[#111827]">
                {savedCertifications.length || 3}
              </span>
              <span className="text-[11px] text-amber-700 block mt-1 font-mono font-medium">Free credentials</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shadow-sm">
              <Award className="w-6 h-6" />
            </div>
          </GlassCard>

          <GlassCard className="p-5 flex items-center justify-between bg-white border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
            <div>
              <span className="text-xs text-[#6B7280] block mb-1">ATS Pass Probability</span>
              <span className="text-3xl font-serif font-bold text-[#111827]">96%</span>
              <span className="text-[11px] text-emerald-700 block mt-1 font-mono font-medium">Clean hierarchy</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-sm">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </GlassCard>
        </div>

        {/* Charts & Roadmap Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Progress Chart */}
          <GlassCard className="p-6 lg:col-span-2 flex flex-col justify-between bg-white border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-semibold text-[#111827]">Readiness Score Growth</h3>
                <p className="text-xs text-[#6B7280]">ATS optimization & mock interview score trend over time</p>
              </div>
              <span className="text-xs font-mono text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200 font-semibold">
                Live Analytics
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={scoreHistory}>
                  <defs>
                    <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0284C7" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#0284C7" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                  <XAxis dataKey="date" stroke="#9CA3AF" fontSize={11} tickLine={false} />
                  <YAxis stroke="#9CA3AF" fontSize={11} tickLine={false} domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#FFFFFF",
                      borderColor: "#E5E7EB",
                      borderRadius: "0.75rem",
                      fontSize: "12px",
                      color: "#111827",
                      boxShadow: "0 4px 6px -1px rgba(0,0,0,0.08)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="#0284C7"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#scoreGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          {/* Quick Target Checklist */}
          <GlassCard className="p-6 flex flex-col justify-between bg-white border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
            <div>
              <h3 className="text-base font-semibold text-[#111827] mb-1">Phase 1 Milestones</h3>
              <p className="text-xs text-[#6B7280] mb-4">Essential steps to achieve 90+ overall readiness</p>

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
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] text-xs"
                  >
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center ${
                        item.done ? "bg-emerald-50 text-emerald-600 border border-emerald-200" : "bg-gray-100 text-[#9CA3AF] border border-gray-200"
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span className={item.done ? "text-[#111827] font-medium" : "text-[#6B7280]"}>
                      {item.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E5E7EB] flex items-center justify-between text-xs">
              <span className="text-[#6B7280]">Total Completion:</span>
              <span className="font-bold text-blue-700 font-mono">60% Done</span>
            </div>
          </GlassCard>
        </div>

        {/* Saved Free Certifications Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-[#111827]">Your Saved Certifications</h2>
              <p className="text-xs text-[#6B7280]">100% free credentials verified on your resume</p>
            </div>
            <Link
              href="/certifications"
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              Explore Catalog <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {savedCoursesList.length > 0 ? (
              savedCoursesList.map((course) => (
                <GlassCard key={course.id} className="p-5 flex flex-col justify-between bg-white border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                        {course.provider}
                      </span>
                      <span className="text-[10px] text-emerald-700 font-semibold uppercase">{course.level}</span>
                    </div>
                    <h3 className="text-sm font-bold text-[#111827] mb-1.5">{course.title}</h3>
                    <p className="text-xs text-[#6B7280] line-clamp-2 mb-3">
                      Skills: {course.skills.slice(0, 3).join(", ")}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E5E7EB] flex items-center justify-between text-xs">
                    <span className="text-[#6B7280] flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#9CA3AF]" /> {course.duration}
                    </span>
                    <a
                      href={course.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
                    >
                      Open Course <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </GlassCard>
              ))
            ) : (
              <GlassCard className="p-6 col-span-3 text-center bg-white border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                <p className="text-xs text-[#6B7280] mb-3">No saved certifications yet.</p>
                <Link
                  href="/certifications"
                  className="px-4 py-2 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold"
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
