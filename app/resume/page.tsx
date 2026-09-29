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
    <div className="min-h-screen bg-white text-[#111827] relative overflow-hidden flex flex-col">
      <Starfield />

      <main className="flex-1 max-w-[1200px] mx-auto w-full px-4 sm:px-6 lg:px-8 pt-28 pb-24 relative z-10">
        {/* Header Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-semibold mb-4">
            <ShieldCheck className="w-4 h-4 text-sky-600" />
            Zero Cloud Uploads • 100% Client-Side Evaluation
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#111827] mb-4">
            AI Resume Diagnostic & Optimizer
          </h1>
          <p className="text-[#4B5563] text-base sm:text-lg">
            Instant multi-point evaluation across Measurable Results, Career Focus, Project Proof, and ATS alignment.
          </p>
        </div>

        {/* Configuration Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="md:col-span-2 flex flex-col gap-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#6B7280] flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-indigo-600" /> Target Role Specialization
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
                      ? "bg-indigo-600 text-white font-semibold shadow-sm"
                      : "bg-white text-[#4B5563] border border-[#E5E7EB] hover:border-gray-300 shadow-sm"
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
              className="text-xs text-[#4B5563] hover:text-[#111827] flex items-center justify-between p-2.5 rounded-lg bg-white border border-[#E5E7EB] hover:border-gray-300 shadow-sm transition-colors"
            >
              <span>Target Specific Job Description</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showJdInput ? "rotate-180" : ""}`} />
            </button>
          </div>
        </div>

        {/* Optional JD Input */}
        {showJdInput && (
          <GlassCard className="p-4 mb-8 bg-white border-[#E5E7EB] shadow-sm">
            <label className="block text-xs font-semibold text-[#111827] mb-2">
              Paste Job Description (Optional — aligns keyword coverage directly to this posting):
            </label>
            <textarea
              value={targetJobDescription}
              onChange={(e) => setTargetJobDescription(e.target.value)}
              placeholder="Paste full job posting requirements and qualifications here..."
              rows={3}
              className="w-full bg-white border border-[#E5E7EB] rounded-lg p-3 text-xs text-[#111827] placeholder:text-gray-400 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
            />
          </GlassCard>
        )}

        {/* Upload & Input Area */}
        {!scoreResult && (
          <GlassCard className="p-6 sm:p-10 mb-12 bg-white border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
            <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-4 mb-6">
              <div className="flex gap-4">
                <button
                  onClick={() => setInputMode("upload")}
                  className={`text-sm font-semibold pb-2 border-b-2 transition-all ${
                    inputMode === "upload"
                      ? "border-indigo-600 text-indigo-700"
                      : "border-transparent text-[#6B7280] hover:text-[#111827]"
                  }`}
                >
                  Upload PDF / DOCX
                </button>
                <button
                  onClick={() => setInputMode("paste")}
                  className={`text-sm font-semibold pb-2 border-b-2 transition-all ${
                    inputMode === "paste"
                      ? "border-indigo-600 text-indigo-700"
                      : "border-transparent text-[#6B7280] hover:text-[#111827]"
                  }`}
                >
                  Paste Plain Text
                </button>
              </div>

              <button
                onClick={handleLoadSample}
                className="text-xs text-indigo-700 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 font-medium"
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                Load Sample Student Resume (1-Click Demo)
              </button>
            </div>

            {errorMessage && (
              <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div>{errorMessage}</div>
              </div>
            )}

            {inputMode === "upload" ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-[#E5E7EB] hover:border-indigo-400 rounded-2xl p-10 text-center cursor-pointer transition-all bg-[#F9FAFB] hover:bg-white group shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.docx,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform">
                  <UploadCloud className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-[#111827] mb-2">
                  Drop your resume here, or <span className="text-indigo-600 underline font-medium">browse files</span>
                </h3>
                <p className="text-xs text-[#6B7280] max-w-md mx-auto mb-4">
                  Supports PDF, DOCX, and plain text. Your resume never leaves your computer; all extraction and scoring
                  execute securely in browser memory.
                </p>
                <span className="text-[11px] text-[#6B7280] bg-white px-3 py-1 rounded-full border border-[#E5E7EB] shadow-sm">
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
                  className="w-full bg-white border border-[#E5E7EB] rounded-xl p-4 text-sm text-[#111827] placeholder:text-gray-400 focus:outline-none focus:border-indigo-600 font-mono shadow-sm"
                />
                <button
                  onClick={handleAnalyzeText}
                  disabled={isAnalyzingResume}
                  className="w-full sm:w-auto self-end px-8 py-3 rounded-xl bg-gray-900 hover:bg-gray-800 text-white font-semibold text-sm transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  {isAnalyzingResume ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Analyzing Resume Locally...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 text-sky-400" />
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
            <div className="flex flex-wrap items-center justify-between gap-4 bg-[#F9FAFB] border border-[#E5E7EB] p-4 rounded-2xl shadow-sm">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-indigo-600" />
                <div>
                  <span className="text-xs text-[#6B7280]">Audited Document:</span>
                  <p className="text-sm font-semibold text-[#111827]">{resumeFileName || "Alex_Chen_Resume.pdf"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => exportScoreReportPdf(scoreResult)}
                  className="px-4 py-2 rounded-xl bg-white hover:bg-gray-50 text-[#111827] text-xs font-semibold border border-[#E5E7EB] shadow-sm flex items-center gap-2 transition-colors"
                >
                  <Download className="w-4 h-4 text-indigo-600" />
                  Export Audit PDF
                </button>

                <button
                  onClick={() => resetResume()}
                  className="px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold border border-rose-200 flex items-center gap-2 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Upload New
                </button>
              </div>
            </div>

            {/* Score Overview Card */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Circular Gauge Card */}
              <GlassCard className="p-6 flex flex-col items-center justify-center text-center relative overflow-hidden bg-white border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                <div className="absolute top-3 right-3">
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700">
                    {scoreResult.overall >= 80 ? "Top 10% Ready" : scoreResult.overall >= 65 ? "Competitive" : "Needs Polish"}
                  </span>
                </div>

                <div className="relative w-44 h-44 my-4 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
                    <circle
                      cx="80"
                      cy="80"
                      r="68"
                      stroke="#E5E7EB"
                      strokeWidth="12"
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
                        <stop offset="0%" stopColor="#0284C7" />
                        <stop offset="100%" stopColor="#4F46E5" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-serif text-5xl font-bold text-[#111827] tracking-tight">
                      {scoreResult.overall}
                    </span>
                    <span className="text-xs uppercase tracking-widest text-[#6B7280] mt-1">out of 100</span>
                  </div>
                </div>

                <h3 className="text-base font-semibold text-[#111827] mb-1">
                  Overall Readiness Score
                </h3>
                <p className="text-xs text-[#6B7280] max-w-xs">
                  Targeting <strong className="text-indigo-600">{selectedRole}</strong>. Benchmarked against 5,000+ hire outcomes.
                </p>
              </GlassCard>

              {/* 4 Pillars Mini-Cards */}
              <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 1. Measurable Results */}
                <GlassCard className="p-5 flex flex-col justify-between bg-white border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-sm font-semibold text-[#111827]">Measurable Results</h4>
                      <span className="text-xs font-bold text-sky-700">
                        {scoreResult.measurableResults.score}/{scoreResult.measurableResults.max}
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden mb-3">
                      <div
                        className="bg-sky-600 h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${(scoreResult.measurableResults.score / scoreResult.measurableResults.max) * 100}%`,
                        }}
                      />
                    </div>
                    <p className="text-xs text-[#4B5563] mb-3">{scoreResult.measurableResults.feedback}</p>
                  </div>
                  {scoreResult.measurableResults.metricsFound.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {scoreResult.measurableResults.metricsFound.slice(0, 4).map((m, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-100 font-mono">
                          {m}
                        </span>
                      ))}
                    </div>
                  )}
                </GlassCard>

                {/* 2. Career Focus */}
                <GlassCard className="p-5 flex flex-col justify-between bg-white border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-sm font-semibold text-[#111827]">Career Focus</h4>
                      <span className="text-xs font-bold text-indigo-700">
                        {scoreResult.careerFocus.score}/{scoreResult.careerFocus.max}
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden mb-3">
                      <div
                        className="bg-indigo-600 h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${(scoreResult.careerFocus.score / scoreResult.careerFocus.max) * 100}%`,
                        }}
                      />
                    </div>
                    <p className="text-xs text-[#4B5563] mb-3">{scoreResult.careerFocus.feedback}</p>
                  </div>
                  {scoreResult.careerFocus.matchedKeywords.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {scoreResult.careerFocus.matchedKeywords.slice(0, 4).map((v, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-100">
                          {v}
                        </span>
                      ))}
                    </div>
                  )}
                </GlassCard>

                {/* 3. Project Proof */}
                <GlassCard className="p-5 flex flex-col justify-between bg-white border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-sm font-semibold text-[#111827]">Project Proof</h4>
                      <span className="text-xs font-bold text-emerald-700">
                        {scoreResult.projectProof.score}/{scoreResult.projectProof.max}
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden mb-3">
                      <div
                        className="bg-emerald-600 h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${(scoreResult.projectProof.score / scoreResult.projectProof.max) * 100}%`,
                        }}
                      />
                    </div>
                    <p className="text-xs text-[#4B5563] mb-3">{scoreResult.projectProof.feedback}</p>
                  </div>
                  {scoreResult.projectProof.linksFound.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {scoreResult.projectProof.linksFound.slice(0, 2).map((l, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-100 truncate max-w-[200px]">
                          {l}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-[10px] text-amber-700 font-medium">No live links detected</span>
                  )}
                </GlassCard>

                {/* 4. Tailored Alignment */}
                <GlassCard className="p-5 flex flex-col justify-between bg-white border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-sm font-semibold text-[#111827]">Tailored Alignment</h4>
                      <span className="text-xs font-bold text-amber-700">
                        {scoreResult.tailoredAlignment.score}/{scoreResult.tailoredAlignment.max}
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden mb-3">
                      <div
                        className="bg-amber-600 h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${(scoreResult.tailoredAlignment.score / scoreResult.tailoredAlignment.max) * 100}%`,
                        }}
                      />
                    </div>
                    <p className="text-xs text-[#4B5563] mb-3">{scoreResult.tailoredAlignment.feedback}</p>
                  </div>
                  {scoreResult.tailoredAlignment.missingKeywords.length > 0 && (
                    <div className="flex items-center gap-1.5 text-[11px] text-[#6B7280]">
                      <span className="text-[#6B7280]">Missing:</span>
                      <div className="flex flex-wrap gap-1">
                        {scoreResult.tailoredAlignment.missingKeywords.slice(0, 3).map((kw, i) => (
                          <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
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
              <GlassCard className="p-6 bg-white border-[#E5E7EB] shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-base font-semibold text-[#111827]">Verified Strengths</h3>
                </div>
                <ul className="space-y-3">
                  {scoreResult.strengths.map((s, i) => (
                    <li key={i} className="text-xs text-[#4B5563] flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>

              <GlassCard className="p-6 bg-white border-[#E5E7EB] shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  <h3 className="text-base font-semibold text-[#111827]">High-Impact Areas for Improvement</h3>
                </div>
                <ul className="space-y-3">
                  {scoreResult.weaknesses.map((w, i) => (
                    <li key={i} className="text-xs text-[#4B5563] flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0" />
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </div>

            {/* AI Bullet Rewrite Workshop */}
            <GlassCard className="p-6 sm:p-8 bg-white border-[#E5E7EB] shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                    On-Device Bullet Enhancer
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#111827]">
                    Optimized XYZ Bullet Rewrites
                  </h3>
                  <p className="text-xs text-[#6B7280]">
                    Transforming basic task descriptions into quantified executive achievement statements.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {scoreResult.rewrittenBullets?.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] flex flex-col md:flex-row gap-4 justify-between items-start md:items-center"
                  >
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2 text-xs text-rose-700">
                        <span className="font-semibold uppercase tracking-wider text-[10px] px-1.5 py-0.5 rounded bg-rose-50 border border-rose-200">
                          Original
                        </span>
                        <span className="line-through">{item.original}</span>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-emerald-800">
                        <span className="font-semibold uppercase tracking-wider text-[10px] px-1.5 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-700">
                          Improved
                        </span>
                        <span className="font-semibold text-[#111827]">{item.improved}</span>
                      </div>

                      <p className="text-[11px] text-[#6B7280] italic">
                        Why: {item.reason}
                      </p>
                    </div>

                    <button
                      onClick={() => handleCopy(item.improved, idx)}
                      className="px-3.5 py-2 rounded-lg bg-white hover:bg-gray-50 text-[#111827] text-xs font-semibold border border-[#E5E7EB] shadow-sm flex items-center gap-1.5 transition-colors shrink-0"
                    >
                      {copiedBullet === idx ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-[#6B7280]" /> Copy Bullet
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Next Steps Banner */}
            <div className="p-8 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
              <div className="space-y-2 text-center sm:text-left">
                <h3 className="font-serif text-2xl font-bold text-[#111827]">
                  Ready to test your answers in live simulation?
                </h3>
                <p className="text-[#4B5563] text-sm max-w-xl">
                  Take this audited {selectedRole} profile directly into an interactive AI mock interview with voice evaluation, pacing feedback, and body posture diagnostics.
                </p>
              </div>

              <Link
                href="/interview"
                className="px-6 py-3.5 rounded-xl bg-gray-900 hover:bg-gray-800 text-white font-semibold text-sm transition-all shadow-sm flex items-center gap-2 shrink-0"
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
