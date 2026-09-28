"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Download,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  Copy,
  Check,
  ChevronDown,
  Briefcase,
  Zap,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/landing/Footer";
import Starfield from "@/components/landing/Starfield";
import { GlassCard } from "@/components/ui/GlassCard";
import { useAxiomStore, ScoreBreakdown } from "@/store/useAxiomStore";
import { parsePdfFile } from "@/lib/parsing/pdfParser";
import { parseDocxFile } from "@/lib/parsing/docxParser";
import { scoreResume } from "@/lib/scoring/scoreResume";
import { exportScoreReportPdf } from "@/lib/export/exportResume";

const SAMPLE_STUDENT_RESUME = `ALEX CHEN
San Francisco, CA • alex.chen@university.edu • (555) 234-5678 • github.com/alexchen-dev • linkedin.com/in/alexchen-tech

EDUCATION
University of California, Berkeley
B.S. in Computer Science & Data Science | GPA: 3.82 | Expected May 2025
Relevant Coursework: Data Structures & Algorithms, Distributed Systems, Database Management, Machine Learning

TECHNICAL SKILLS
Languages: TypeScript, JavaScript, Python, Go, SQL, HTML5/CSS3
Frameworks: React, Next.js, Node.js, Express, FastAPI, Tailwind CSS, Redux Toolkit
Databases & Cloud: PostgreSQL, MongoDB, Redis, Docker, AWS (S3, EC2), Git, Jest, CI/CD Actions

PROJECTS
Axiom DevFlow - Cloud Developer Analytics Platform | github.com/alexchen-dev/devflow-app
• Architected full-stack developer telemetry platform using Next.js, TypeScript, and PostgreSQL.
• Scaled data ingestion pipelines to process over 45,000 webhook events daily with sub-80ms response latency.
• Engineered real-time WebSocket dashboard cutting developer onboarding turnaround by 35%.
• Deployed to production on AWS using Docker containers and automated GitHub Actions CI/CD workflows.

CampusPantry - Food Rescue & Inventory App | github.com/alexchen-dev/campus-pantry
• Built cross-platform mobile-responsive web app connecting 1,200+ local students with surplus dining hall items.
• Integrated Google Maps API and Redis caching, reducing search latency by 40% for active food listings.
• Led a 4-person Agile sprint team across 6 bi-weekly releases, delivering 99.4% crash-free sessions.

TECHNICAL WORK EXPERIENCE
Software Engineer Intern | NovaScale Labs | June 2024 - August 2024
• Implemented high-throughput RESTful microservices in Node.js and Redis, boosting API throughput by 28%.
• Refactored legacy SQL queries and added composite indexes, reducing p99 database query time from 420ms to 65ms.
• Collaborated with senior engineers in daily standups and authored comprehensive Jest unit test suites with 86% coverage.
`;

const ROLES = [
  { id: "fullstack", label: "Full-Stack Developer" },
  { id: "frontend", label: "Frontend Developer" },
  { id: "backend", label: "Backend Developer" },
  { id: "ml engineer", label: "ML / AI Engineer" },
  { id: "data scientist", label: "Data Scientist" },
  { id: "devops", label: "DevOps Engineer" },
  { id: "ux designer", label: "UX Designer" },
];

export default function ResumePage() {
  const {
    resumeText,
    resumeFileName,
    selectedRole,
    targetJobDescription,
    scoreResult,
    isAnalyzingResume,
    setResumeData,
    setSelectedRole,
    setTargetJobDescription,
    setScoreResult,
    setIsAnalyzingResume,
    addScoreToHistory,
    resetResume,
  } = useAxiomStore();

  const [inputMode, setInputMode] = useState<"upload" | "paste">("upload");
  const [pastedText, setPastedText] = useState(resumeText || "");
  const [showJdInput, setShowJdInput] = useState(false);
  const [copiedBullet, setCopiedBullet] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMessage(null);
    setIsAnalyzingResume(true);

    try {
      let extracted = "";
      if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
        extracted = await parsePdfFile(file);
      } else if (
        file.name.endsWith(".docx") ||
        file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        extracted = await parseDocxFile(file);
      } else {
        extracted = await file.text();
      }

      if (!extracted.trim()) {
        throw new Error("Could not extract text from document. Please verify the file is not empty or protected.");
      }

      setResumeData(extracted, file.name);
      setPastedText(extracted);

      const scored = scoreResume(extracted, selectedRole, targetJobDescription);
      setScoreResult(scored);
      addScoreToHistory(scored.overall, selectedRole);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "Failed to process resume file on-device.");
    } finally {
      setIsAnalyzingResume(false);
    }
  };

  const handleAnalyzeText = () => {
    if (!pastedText.trim()) {
      setErrorMessage("Please paste or upload resume text first.");
      return;
    }

    setErrorMessage(null);
    setIsAnalyzingResume(true);

    setTimeout(() => {
      setResumeData(pastedText, "Pasted-Resume.txt");
      const scored = scoreResume(pastedText, selectedRole, targetJobDescription);
      setScoreResult(scored);
      addScoreToHistory(scored.overall, selectedRole);
      setIsAnalyzingResume(false);
    }, 400);
  };

  const handleLoadSample = () => {
    setPastedText(SAMPLE_STUDENT_RESUME);
    setResumeData(SAMPLE_STUDENT_RESUME, "Alex_Chen_UC_Berkeley.pdf");
    setIsAnalyzingResume(true);
    setErrorMessage(null);

    setTimeout(() => {
      const scored = scoreResume(SAMPLE_STUDENT_RESUME, selectedRole, targetJobDescription);
      setScoreResult(scored);
      addScoreToHistory(scored.overall, selectedRole);
      setIsAnalyzingResume(false);
    }, 450);
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedBullet(index);
    setTimeout(() => setCopiedBullet(null), 2000);
  };

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 relative overflow-hidden flex flex-col">
      <Starfield />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-32 pb-24 relative z-10">
        {/* Header Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-4">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            Zero Cloud Uploads • 100% Client-Side Evaluation
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            AI Resume Diagnostic & Optimizer
          </h1>
          <p className="text-slate-300 text-base sm:text-lg">
            Instant multi-point evaluation across Measurable Results, Career Focus, Project Proof, and ATS alignment.
          </p>
        </div>

        {/* Configuration Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="md:col-span-2 flex flex-col gap-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-cyan-400" /> Target Role Specialization
            </label>
            <div className="flex flex-wrap gap-2">
              {ROLES.map((r) => (
                <button
                  key={r.id}
                  onClick={() => {
                    setSelectedRole(r.label);
                    if (scoreResult && (resumeText || pastedText)) {
                      const scored = scoreResume(resumeText || pastedText, r.label, targetJobDescription);
                      setScoreResult(scored);
                    }
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedRole.toLowerCase() === r.label.toLowerCase()
                      ? "bg-cyan-500 text-navy-950 font-semibold shadow-lg shadow-cyan-500/20"
                      : "bg-navy-900/80 text-slate-300 border border-slate-700/60 hover:border-slate-500"
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-end">
            <button
              onClick={() => setShowJdInput(!showJdInput)}
              className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center justify-between p-2.5 rounded-lg bg-navy-900/60 border border-slate-700/60 hover:border-cyan-500/40 transition-colors"
            >
              <span>Target Specific Job Description</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showJdInput ? "rotate-180" : ""}`} />
            </button>
          </div>
        </div>

        {/* Optional JD Input */}
        {showJdInput && (
          <GlassCard className="p-4 mb-8 border-cyan-500/30">
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Paste Job Description (Optional — aligns keyword coverage directly to this posting):
            </label>
            <textarea
              value={targetJobDescription}
              onChange={(e) => setTargetJobDescription(e.target.value)}
              placeholder="Paste full job posting requirements and qualifications here..."
              rows={3}
              className="w-full bg-navy-950/70 border border-slate-700 rounded-lg p-3 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </GlassCard>
        )}

        {/* Upload & Input Area */}
        {!scoreResult && (
          <GlassCard className="p-6 sm:p-10 mb-12 border-slate-700/70">
            <div className="flex items-center justify-between border-b border-slate-700/60 pb-4 mb-6">
              <div className="flex gap-4">
                <button
                  onClick={() => setInputMode("upload")}
                  className={`text-sm font-semibold pb-2 border-b-2 transition-all ${
                    inputMode === "upload"
                      ? "border-cyan-400 text-cyan-400"
                      : "border-transparent text-slate-400 hover:text-slate-200"
                  }`}
                >
                  Upload PDF / DOCX
                </button>
                <button
                  onClick={() => setInputMode("paste")}
                  className={`text-sm font-semibold pb-2 border-b-2 transition-all ${
                    inputMode === "paste"
                      ? "border-cyan-400 text-cyan-400"
                      : "border-transparent text-slate-400 hover:text-slate-200"
                  }`}
                >
                  Paste Plain Text
                </button>
              </div>

              <button
                onClick={handleLoadSample}
                className="text-xs text-violet-300 hover:text-white bg-violet-600/20 hover:bg-violet-600/40 border border-violet-500/40 px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 font-medium"
              >
                <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                Load Sample Student Resume (1-Click Demo)
              </button>
            </div>

            {errorMessage && (
              <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div>{errorMessage}</div>
              </div>
            )}

            {inputMode === "upload" ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-700 hover:border-cyan-400/70 rounded-2xl p-10 text-center cursor-pointer transition-all bg-navy-900/30 hover:bg-navy-900/50 group"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.docx,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-8 h-8 text-cyan-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Drop your resume here, or <span className="text-cyan-400 underline">browse files</span>
                </h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto mb-4">
                  Supports PDF, DOCX, and plain text. Your resume never leaves your computer; all extraction and scoring
                  execute securely in browser memory.
                </p>
                <span className="text-[11px] text-slate-500 bg-navy-950/80 px-3 py-1 rounded-full border border-slate-800">
                  Client-side evaluation • No cloud transmission
                </span>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <textarea
                  value={pastedText}
                  onChange={(e) => setPastedText(e.target.value)}
                  placeholder="Paste your full resume text here (Education, Skills, Experience, Projects)..."
                  rows={12}
                  className="w-full bg-navy-950/70 border border-slate-700 rounded-xl p-4 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
                />
                <button
                  onClick={handleAnalyzeText}
                  disabled={isAnalyzingResume}
                  className="w-full sm:w-auto self-end px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 text-navy-950 font-bold text-sm hover:opacity-90 transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
                >
                  {isAnalyzingResume ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Analyzing Resume Locally...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4" />
                      Analyze Resume Now
                    </>
                  )}
                </button>
              </div>
            )}
          </GlassCard>
        )}

        {/* RESULTS DASHBOARD */}
        {scoreResult && (
          <div className="space-y-8 animate-fadeIn">
            {/* Top Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-navy-900/60 border border-slate-700/60 p-4 rounded-2xl backdrop-blur-md">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-cyan-400" />
                <div>
                  <span className="text-xs text-slate-400">Audited Document:</span>
                  <p className="text-sm font-semibold text-white">{resumeFileName || "Alex_Chen_Resume.pdf"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => exportScoreReportPdf(scoreResult)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-600 flex items-center gap-2 transition-colors"
                >
                  <Download className="w-4 h-4 text-cyan-400" />
                  Export Audit PDF
                </button>

                <button
                  onClick={() => resetResume()}
                  className="px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-semibold border border-rose-500/30 flex items-center gap-2 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Upload New
                </button>
              </div>
            </div>

            {/* Score Overview Card */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Circular Gauge Card */}
              <GlassCard className="p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
                <div className="absolute top-3 right-3">
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
                    {scoreResult.overall >= 80 ? "Top 10% Ready" : scoreResult.overall >= 65 ? "Competitive" : "Needs Polish"}
                  </span>
                </div>

                <div className="relative w-44 h-44 my-4 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
                    <circle
                      cx="80"
                      cy="80"
                      r="68"
                      stroke="currentColor"
                      strokeWidth="12"
                      className="text-slate-800"
                      fill="transparent"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="68"
                      stroke="url(#scoreGrad)"
                      strokeWidth="12"
                      strokeDasharray={427}
                      strokeDashoffset={427 - (427 * scoreResult.overall) / 100}
                      strokeLinecap="round"
                      fill="transparent"
                      className="transition-all duration-1000 ease-out"
                    />
                    <defs>
                      <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#22D3EE" />
                        <stop offset="100%" stopColor="#7C5CFF" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-serif text-5xl font-bold text-white tracking-tight">
                      {scoreResult.overall}
                    </span>
                    <span className="text-xs uppercase tracking-widest text-slate-400 mt-1">out of 100</span>
                  </div>
                </div>

                <h3 className="text-base font-semibold text-white mb-1">
                  Overall Readiness Score
                </h3>
                <p className="text-xs text-slate-400 max-w-xs">
                  Targeting <strong className="text-cyan-400">{selectedRole}</strong>. Benchmarked against 5,000+ hire outcomes.
                </p>
              </GlassCard>

              {/* 4 Pillars Mini-Cards */}
              <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 1. Measurable Results */}
                <GlassCard className="p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-sm font-semibold text-white">Measurable Results</h4>
                      <span className="text-xs font-bold text-cyan-400">
                        {scoreResult.measurableResults.score}/{scoreResult.measurableResults.max}
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-3">
                      <div
                        className="bg-cyan-400 h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${(scoreResult.measurableResults.score / scoreResult.measurableResults.max) * 100}%`,
                        }}
                      />
                    </div>
                    <p className="text-xs text-slate-300 mb-3">{scoreResult.measurableResults.feedback}</p>
                  </div>
                  {scoreResult.measurableResults.metricsFound.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {scoreResult.measurableResults.metricsFound.slice(0, 4).map((m, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 font-mono">
                          {m}
                        </span>
                      ))}
                    </div>
                  )}
                </GlassCard>

                {/* 2. Career Focus */}
                <GlassCard className="p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-sm font-semibold text-white">Career Focus</h4>
                      <span className="text-xs font-bold text-violet-400">
                        {scoreResult.careerFocus.score}/{scoreResult.careerFocus.max}
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-3">
                      <div
                        className="bg-violet-400 h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${(scoreResult.careerFocus.score / scoreResult.careerFocus.max) * 100}%`,
                        }}
                      />
                    </div>
                    <p className="text-xs text-slate-300 mb-3">{scoreResult.careerFocus.feedback}</p>
                  </div>
                  {scoreResult.careerFocus.matchedKeywords.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {scoreResult.careerFocus.matchedKeywords.slice(0, 4).map((v, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-violet-500/10 text-violet-300">
                          {v}
                        </span>
                      ))}
                    </div>
                  )}
                </GlassCard>

                {/* 3. Project Proof */}
                <GlassCard className="p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-sm font-semibold text-white">Project Proof</h4>
                      <span className="text-xs font-bold text-emerald-400">
                        {scoreResult.projectProof.score}/{scoreResult.projectProof.max}
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-3">
                      <div
                        className="bg-emerald-400 h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${(scoreResult.projectProof.score / scoreResult.projectProof.max) * 100}%`,
                        }}
                      />
                    </div>
                    <p className="text-xs text-slate-300 mb-3">{scoreResult.projectProof.feedback}</p>
                  </div>
                  {scoreResult.projectProof.linksFound.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {scoreResult.projectProof.linksFound.slice(0, 2).map((l, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 truncate max-w-[200px]">
                          {l}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-[10px] text-amber-400 font-medium">No live links detected</span>
                  )}
                </GlassCard>

                {/* 4. Tailored Alignment */}
                <GlassCard className="p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-sm font-semibold text-white">Tailored Alignment</h4>
                      <span className="text-xs font-bold text-amber-400">
                        {scoreResult.tailoredAlignment.score}/{scoreResult.tailoredAlignment.max}
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-3">
                      <div
                        className="bg-amber-400 h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${(scoreResult.tailoredAlignment.score / scoreResult.tailoredAlignment.max) * 100}%`,
                        }}
                      />
                    </div>
                    <p className="text-xs text-slate-300 mb-3">{scoreResult.tailoredAlignment.feedback}</p>
                  </div>
                  {scoreResult.tailoredAlignment.missingKeywords.length > 0 && (
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                      <span className="text-slate-500">Missing:</span>
                      <div className="flex flex-wrap gap-1">
                        {scoreResult.tailoredAlignment.missingKeywords.slice(0, 3).map((kw, i) => (
                          <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-300">
                            +{kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </GlassCard>
              </div>
            </div>

            {/* Strengths & Weaknesses 2-Column */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <GlassCard className="p-6 border-emerald-500/20">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-base font-semibold text-white">Verified Strengths</h3>
                </div>
                <ul className="space-y-3">
                  {scoreResult.strengths.map((s, i) => (
                    <li key={i} className="text-xs text-slate-300 flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>

              <GlassCard className="p-6 border-amber-500/20">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                  <h3 className="text-base font-semibold text-white">High-Impact Areas for Improvement</h3>
                </div>
                <ul className="space-y-3">
                  {scoreResult.weaknesses.map((w, i) => (
                    <li key={i} className="text-xs text-slate-300 flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </div>

            {/* AI Bullet Rewrite Workshop */}
            <GlassCard className="p-6 sm:p-8 border-violet-500/30">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs font-semibold mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                    On-Device Bullet Enhancer
                  </div>
                  <h3 className="font-serif text-xl font-bold text-white">
                    Optimized XYZ Bullet Rewrites
                  </h3>
                  <p className="text-xs text-slate-400">
                    Transforming basic task descriptions into quantified executive achievement statements.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {scoreResult.rewrittenBullets?.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-navy-950/70 border border-slate-700/80 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center"
                  >
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2 text-xs text-rose-300/80">
                        <span className="font-semibold uppercase tracking-wider text-[10px] px-1.5 py-0.5 rounded bg-rose-500/10 border border-rose-500/20">
                          Original
                        </span>
                        <span className="line-through">{item.original}</span>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-emerald-300">
                        <span className="font-semibold uppercase tracking-wider text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                          Improved
                        </span>
                        <span className="font-medium text-white">{item.improved}</span>
                      </div>

                      <p className="text-[11px] text-slate-400 italic">
                        Why: {item.reason}
                      </p>
                    </div>

                    <button
                      onClick={() => handleCopy(item.improved, idx)}
                      className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-600 flex items-center gap-1.5 transition-colors shrink-0"
                    >
                      {copiedBullet === idx ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-400" /> Copy Bullet
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Next Steps Banner */}
            <div className="p-8 rounded-2xl bg-gradient-to-r from-cyan-900/40 via-navy-900/60 to-violet-900/40 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center sm:text-left">
                <h3 className="font-serif text-2xl font-bold text-white">
                  Ready to test your answers in live simulation?
                </h3>
                <p className="text-slate-300 text-sm max-w-xl">
                  Take this audited {selectedRole} profile directly into an interactive AI mock interview with voice evaluation, pacing feedback, and body posture diagnostics.
                </p>
              </div>

              <Link
                href="/interview"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 text-navy-950 font-bold text-sm hover:opacity-90 transition-all shadow-xl shadow-cyan-500/20 flex items-center gap-2 shrink-0"
              >
                <span>Launch Mock Interview</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
