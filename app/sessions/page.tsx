"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  PlayCircle,
  Play,
  Pause,
  Award,
  CheckCircle2,
  Clock,
  Download,
  Copy,
  Check,
  Video,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  BookOpen,
  Code2,
  GitBranch,
  Terminal,
  HelpCircle,
  FileCheck,
  Zap,
} from "lucide-react";
import Footer from "@/components/landing/Footer";
import Starfield from "@/components/landing/Starfield";
import { GlassCard } from "@/components/ui/GlassCard";

interface Session {
  id: number;
  title: string;
  subtitle: string;
  speaker: string;
  duration: string;
  level: string;
  description: string;
  learningOutcomes: string[];
  chapters: { time: string; label: string }[];
  resumeFeatureTitle: string;
  resumeFeatureDescription: string;
  resumeSnippet: string;
}

const SESSIONS: Session[] = [
  {
    id: 1,
    title: "1. The Modern Software Landscape: Where to Begin",
    subtitle: "Understanding Roles, Agile Teams & What Recruiters Look For in Beginners",
    speaker: "David Kim, Principal Engineer at Google & Student Mentor",
    duration: "12:40 min",
    level: "Beginner Friendly",
    description:
      "A complete guide for students stepping into tech. We demystify the difference between Frontend, Backend, Cloud, and AI roles, explain how software teams build features in 2-week sprints, and teach you how to pick your first high-demand specialization.",
    learningOutcomes: [
      "Understand the tech industry hierarchy: Frontend, Backend, Full-Stack, Cloud & ML.",
      "Learn how Agile sprints, Jira tickets, and code reviews actually work in production.",
      "How to choose a focused tech stack instead of spreading yourself too thin.",
      "What recruiters look for when an applicant has zero prior company experience."
    ],
    chapters: [
      { time: "00:00", label: "Welcome & Busting the 'CS Degree Only' Myth" },
      { time: "03:15", label: "Breaking Down Tech Disciplines (Frontend vs Backend vs DevOps)" },
      { time: "06:40", label: "How Real Engineering Teams Ship Code (Sprints & PRs)" },
      { time: "09:30", label: "The 3 Things Recruiters Prioritize for Entry-Level Hires" },
      { time: "11:50", label: "How to Frame Your Student Journey on Your Resume" }
    ],
    resumeFeatureTitle: "Headline & Career Objective Generator",
    resumeFeatureDescription: "Use this clean, recruiter-approved header summary on your resume:",
    resumeSnippet: "Aspiring Full-Stack Software Engineer with foundational proficiency in TypeScript, React, and RESTful API architecture. Passionate about building resilient, user-focused web systems with modern CI/CD practices."
  },
  {
    id: 2,
    title: "2. Git, GitHub & Shipping Your First Real Project",
    subtitle: "From Local Repository to Live Deployed Production URL",
    speaker: "Maya Lin, Senior Staff Engineer at GitHub",
    duration: "15:10 min",
    level: "Hands-on Practical",
    description:
      "Tutorial projects stored on your laptop don't get you hired. Learn professional Git workflows, how to structure an impressive GitHub README with architectural diagrams, and how to deploy your app live on Vercel or Render with zero hosting costs.",
    learningOutcomes: [
      "Master essential Git commands: commit hygiene, branching, and pull request etiquette.",
      "Craft a README that tells a story: Problem, Architecture, Tech Stack, and Live Demo.",
      "Deploy full-stack web applications to production with free cloud tiers (Vercel & Render).",
      "Format clickable project links that pass ATS scanners with 100% reliability."
    ],
    chapters: [
      { time: "00:00", label: "Why 'Green Squares' & GitHub Commits Matter" },
      { time: "03:30", label: "Writing Clean Commits & Semantic Branching" },
      { time: "07:15", label: "The Anatomy of a Top 1% Project README" },
      { time: "11:00", label: "Live 1-Click Deployment to Vercel & Render" },
      { time: "13:45", label: "Adding Live Project Proof to Your Resume" }
    ],
    resumeFeatureTitle: "High-Signal Project Proof Template",
    resumeFeatureDescription: "Copy this exact project entry format onto your resume:",
    resumeSnippet: "Axiom DevFlow - Developer Telemetry Platform | github.com/username/devflow | devflow.vercel.app\n• Architected full-stack web application in TypeScript & Next.js, processing real-time telemetry events.\n• Implemented automated GitHub Actions CI/CD pipeline achieving 99.8% build uptime on production."
  },
  {
    id: 3,
    title: "3. Technical Interview Demystified: The STAR Framework",
    subtitle: "Thinking Out Loud, Tradeoff Articulation & Behavioral Confidence",
    speaker: "Kevin Patel, Engineering Hiring Lead at Netflix",
    duration: "14:25 min",
    level: "Interview Preparation",
    description:
      "First-time interviews are intimidating. Learn the mental model of engineering interviewers, how to think out loud when you don't know the exact solution, and how to turn classroom projects into compelling STAR method behavioral answers.",
    learningOutcomes: [
      "The 'Think Out Loud' strategy: Why communication matters more than instant syntax.",
      "The STAR Method simplified for students: Situation, Task, Action, and Result.",
      "How to talk about bugs, dead ends, and mistakes constructively without sounding inexperienced.",
      "Key questions every student should ask the interviewer at the end of the session."
    ],
    chapters: [
      { time: "00:00", label: "What Interviewers Actually Score Behind Closed Doors" },
      { time: "02:50", label: "The STAR Framework Explained with Student Project Examples" },
      { time: "06:10", label: "Handling Tough Coding Questions When You Freeze" },
      { time: "09:40", label: "Turning Classroom Group Projects into Leadership Stories" },
      { time: "12:30", label: "Winning the Final 5 Minutes: Reverse-Interviewing Your Manager" }
    ],
    resumeFeatureTitle: "STAR Behavioral Formulation Cheat Sheet",
    resumeFeatureDescription: "Format your leadership and problem-solving bullets using this template:",
    resumeSnippet: "Diagnosed stubborn session dropout bug 12 hours before capstone showcase; isolated cookie proxy conflict via network inspector logs, updated CORS headers, and delivered uninterrupted demo to 200+ attendees."
  }
];

export default function SessionsPage() {
  const [activeSessionIndex, setActiveSessionIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [completedSessions, setCompletedSessions] = useState<number[]>([1]);
  const [copiedSnippet, setCopiedSnippet] = useState<number | null>(null);

  // Certificate state
  const [studentName, setStudentName] = useState("Alex Chen");

  const activeSession = SESSIONS[activeSessionIndex];

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
    if (!completedSessions.includes(activeSession.id)) {
      setCompletedSessions((prev) => [...prev, activeSession.id]);
    }
  };

  const handleMarkCompleted = (id: number) => {
    if (!completedSessions.includes(id)) {
      setCompletedSessions((prev) => [...prev, id]);
    }
  };

  const handleCopy = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  const handleDownloadCertificate = async () => {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "pt",
      format: "letter"
    });

    const width = 792;
    const height = 612;

    // Dark Background
    doc.setFillColor(11, 15, 46); // Navy-950
    doc.rect(0, 0, width, height, "F");

    // Luxury Cyan & Violet Borders
    doc.setDrawColor(34, 211, 238); // Cyan
    doc.setLineWidth(4);
    doc.roundedRect(30, 30, width - 60, height - 60, 16, 16, "S");

    doc.setDrawColor(124, 92, 255); // Violet
    doc.setLineWidth(1.5);
    doc.roundedRect(42, 42, width - 84, height - 84, 12, 12, "S");

    // Header Badge
    doc.setTextColor(34, 211, 238);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text("AXIOM CAREER INTELLIGENCE & ENGINEERING ACADEMY", width / 2, 90, { align: "center" });

    // Certificate Title
    doc.setTextColor(255, 255, 255);
    doc.setFont("times", "bold");
    doc.setFontSize(30);
    doc.text("Foundations of Tech & Engineering Readiness", width / 2, 140, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(148, 163, 184);
    doc.text("THIS VERIFIED CERTIFICATE OF ACHIEVEMENT IS PROUDLY CONFERRED UPON", width / 2, 185, { align: "center" });

    // Recipient Name
    doc.setTextColor(34, 211, 238);
    doc.setFont("times", "bold");
    doc.setFontSize(32);
    doc.text(studentName.toUpperCase(), width / 2, 240, { align: "center" });

    // Decorative underline
    doc.setDrawColor(34, 211, 238);
    doc.setLineWidth(1);
    doc.line(width / 2 - 180, 252, width / 2 + 180, 252);

    // Curriculum Description
    doc.setTextColor(226, 232, 240);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11.5);
    doc.text(
      "for successfully completing the 3 AXIOM Foundational Tech Sessions: Modern Software Architecture & Agile Teams,",
      width / 2,
      295,
      { align: "center" }
    );
    doc.text(
      "Git/GitHub Production Deployment Workflows, and Technical Interview Communication (STAR Framework).",
      width / 2,
      315,
      { align: "center" }
    );

    // Skills Matrix Badge
    doc.setFontSize(10);
    doc.setTextColor(124, 92, 255);
    doc.text("VERIFIED COMPETENCIES: GIT & GITHUB • FULL-STACK DEPLOYMENT • AGILE SPRINTS • STAR INTERVIEWING", width / 2, 355, { align: "center" });

    // Footer Credentials & Verification
    const certId = `AXIOM-TECH-${Math.floor(100000 + Math.random() * 900000)}`;
    const today = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

    doc.setFontSize(9.5);
    doc.setTextColor(148, 163, 184);
    doc.text(`Credential ID: ${certId}`, 70, 480);
    doc.text(`Issued On: ${today}`, 70, 500);
    doc.text("Verification URL: axiom-career.org/verify", 70, 520);

    // Signatures
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.text("Axiom Engineering Board", 560, 480);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(148, 163, 184);
    doc.text("Dean of Software Engineering Education", 560, 500);

    // Persist verified certificate to SQLite backend DB
    fetch("/api/certificates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: certId,
        studentName: studentName || "Alex Chen",
        courseId: "tech-foundations-2026",
        courseTitle: "AXIOM High-Impact Software Engineering Foundations",
        issueDate: new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
        skills: [
          "Full-Stack Web Architecture",
          "Git/GitHub Deployments",
          "STAR Behavioral Methodology",
        ],
      }),
    }).catch((err) => console.warn("SQLite cert sync:", err));

    doc.save(`AXIOM_Tech_Foundations_Certificate_${studentName.replace(/\s+/g, "_")}.pdf`);
  };

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 relative overflow-hidden flex flex-col">
      <Starfield />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-32 pb-24 relative z-10">
        {/* Header Banner */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-4">
            <PlayCircle className="w-4 h-4 text-cyan-400" />
            3 Foundational Tech Sessions • Beginner to Junior Engineer
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            New to the Tech World? Start Here.
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            3 foundational video sessions teaching you how software engineering works in reality, how to ship real projects with Git, and how to pass technical interviews—with copyable resume templates and a verified certificate.
          </p>

          {/* Progress Tracker Card */}
          <div className="mt-6 p-4 rounded-2xl bg-navy-900/60 border border-slate-700/60 backdrop-blur-md flex flex-wrap items-center justify-between gap-4 max-w-xl mx-auto">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Award className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="text-xs font-bold text-white block">Certificate Progress</span>
                <span className="text-[11px] text-slate-400">
                  {completedSessions.length} of {SESSIONS.length} Sessions Completed
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-32 bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-cyan-400 to-violet-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${(completedSessions.length / SESSIONS.length) * 100}%` }}
                />
              </div>
              <span className="text-xs font-bold text-cyan-400">
                {Math.round((completedSessions.length / SESSIONS.length) * 100)}%
              </span>
            </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Left Column: Session Selector List (Col 4) */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
              Curriculum Sessions
            </span>

            {SESSIONS.map((session, idx) => {
              const isSelected = activeSessionIndex === idx;
              const isDone = completedSessions.includes(session.id);
              return (
                <div
                  key={session.id}
                  onClick={() => {
                    setActiveSessionIndex(idx);
                    setIsPlaying(false);
                  }}
                  className={`p-5 rounded-2xl cursor-pointer transition-all border ${
                    isSelected
                      ? "bg-violet-600/20 border-violet-400 shadow-xl shadow-violet-500/15"
                      : "bg-navy-900/60 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-white">{session.title}</span>
                    {isDone ? (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Completed
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {session.duration}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-300 font-medium mb-1.5">{session.subtitle}</p>
                  <span className="text-[10px] text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-md inline-block">
                    {session.speaker}
                  </span>
                </div>
              );
            })}

            {/* Resume Builder Quick Link */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-cyan-950/40 to-navy-900/80 border border-cyan-500/30 space-y-3">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-cyan-400" /> Put These Skills to Work
              </span>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Ready to turn what you learned into an actual resume? Use our 5-step AI builder from scratch.
              </p>
              <Link
                href="/builder"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 underline"
              >
                Open AI Resume Builder <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: Active Video Player & Resume Feature Widget (Col 8) */}
          <div className="lg:col-span-8 space-y-6">
            <GlassCard className="p-6 sm:p-8 border-slate-700/80">
              {/* Interactive Video Player Canvas */}
              <div className="relative w-full h-[300px] sm:h-[380px] bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex flex-col justify-between p-6 mb-6 group">
                {/* Background video simulation art */}
                <div className="absolute inset-0 bg-gradient-to-tr from-navy-950 via-slate-900 to-violet-950/80 opacity-95" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent" />

                {/* Top Info Bar */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-navy-950/90 border border-slate-700 text-cyan-300 flex items-center gap-1.5">
                    <Video className="w-3.5 h-3.5 text-cyan-400" />
                    Session {activeSession.id} • {activeSession.duration}
                  </span>
                  <span className="text-xs text-slate-300 bg-navy-950/90 px-3 py-1 rounded-lg border border-slate-800">
                    {activeSession.level}
                  </span>
                </div>

                {/* Center Play Button & Title */}
                <div className="relative z-10 text-center my-auto">
                  <button
                    onClick={handleTogglePlay}
                    className="w-20 h-20 rounded-full bg-cyan-400 hover:bg-cyan-300 text-navy-950 flex items-center justify-center mx-auto mb-3 shadow-2xl shadow-cyan-400/40 hover:scale-105 transition-all"
                  >
                    {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
                  </button>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white max-w-lg mx-auto leading-snug">
                    {activeSession.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">Instructor: {activeSession.speaker}</p>
                </div>

                {/* Bottom Scrub Controls */}
                <div className="relative z-10 space-y-2">
                  <div className="w-full bg-slate-800/80 h-2 rounded-full overflow-hidden cursor-pointer">
                    <div
                      className="bg-gradient-to-r from-cyan-400 to-violet-500 h-full rounded-full transition-all duration-300"
                      style={{ width: isPlaying ? "75%" : "25%" }}
                    />
                  </div>
                  <div className="flex justify-between items-center text-[11px] text-slate-400 font-mono">
                    <span>{isPlaying ? "08:15" : "01:45"}</span>
                    <button
                      onClick={() => handleMarkCompleted(activeSession.id)}
                      className="text-cyan-400 hover:text-cyan-300 font-sans font-semibold text-xs flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" /> Mark Completed
                    </button>
                    <span>{activeSession.duration}</span>
                  </div>
                </div>
              </div>

              {/* Learning Outcomes */}
              <div className="space-y-3 mb-6">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" /> What You Learn in this Session:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeSession.learningOutcomes.map((outcome, oIdx) => (
                    <div
                      key={oIdx}
                      className="p-3 rounded-xl bg-navy-950/60 border border-slate-800/80 text-xs text-slate-300 flex items-start gap-2"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chapters Timeline */}
              <div className="mb-6 p-4 rounded-xl bg-navy-950/40 border border-slate-800/80">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                  Session Chapters & Timestamps:
                </span>
                <div className="space-y-1.5">
                  {activeSession.chapters.map((chap, cIdx) => (
                    <div key={cIdx} className="flex items-center justify-between text-xs text-slate-300 py-1 border-b border-slate-900 last:border-0">
                      <span>{chap.label}</span>
                      <span className="font-mono text-cyan-400 text-[11px]">{chap.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resume Asset Tool Widget */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-navy-950 to-violet-950/30 border border-violet-500/40 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-violet-400" />
                      {activeSession.resumeFeatureTitle}
                    </h5>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {activeSession.resumeFeatureDescription}
                    </p>
                  </div>

                  <button
                    onClick={() => handleCopy(activeSession.resumeSnippet, activeSession.id)}
                    className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-600 flex items-center gap-1.5 transition-colors shrink-0"
                  >
                    {copiedSnippet === activeSession.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-400" /> Copy Snippet
                      </>
                    )}
                  </button>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-[11px] text-slate-200 whitespace-pre-wrap leading-relaxed">
                  {activeSession.resumeSnippet}
                </div>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Certificate of Completion Generator Section */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-navy-900 via-navy-950 to-violet-950/70 border border-cyan-500/40 relative overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content (Col 7) */}
            <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                Verified Student Credential
              </div>

              <h3 className="font-serif text-2xl sm:text-4xl font-bold text-white">
                Claim Your Foundations of Tech Certificate
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Add this verified achievement to your LinkedIn profile and resume to demonstrate hands-on understanding of modern software architecture, production Git workflows, and STAR interview methodology.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Enter your full name for certificate"
                  className="bg-navy-950 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 w-full sm:w-72"
                />
                <button
                  onClick={handleDownloadCertificate}
                  className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 text-navy-950 font-bold text-xs hover:opacity-95 transition-all shadow-xl shadow-cyan-500/25 flex items-center justify-center gap-2 shrink-0"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Official PDF Certificate</span>
                </button>
              </div>

              <span className="text-[11px] text-slate-400 block pt-1">
                Zero fees • Issued on-demand by AXIOM Engineering Academy
              </span>
            </div>

            {/* Right Certificate Graphic Preview (Col 5) */}
            <div className="lg:col-span-5">
              <div className="bg-navy-950 border-2 border-cyan-400/50 rounded-2xl p-6 sm:p-8 text-center space-y-3 relative shadow-2xl">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center mx-auto text-navy-950">
                  <Award className="w-7 h-7" />
                </div>
                <span className="text-[10px] font-bold tracking-widest uppercase text-cyan-400 block">
                  Official Certificate of Completion
                </span>
                <h4 className="font-serif text-2xl font-bold text-white tracking-wide">
                  {studentName || "YOUR NAME"}
                </h4>
                <p className="text-xs text-slate-300 font-medium">
                  Foundations of Tech & Engineering Readiness
                </p>
                <p className="text-[10px] text-slate-500 italic">
                  Competencies: Git/GitHub • Full-Stack Deployments • STAR Interviewing
                </p>
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                  <span>Verified Credential</span>
                  <span className="font-mono text-cyan-400 font-semibold">AXIOM-TECH-VERIFIED</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
