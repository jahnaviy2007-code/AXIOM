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
      format: "letter",
    });

    const width = 792;
    const height = 612;

    // Clean Premium White Background
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, width, height, "F");

    // Luxury Navy & Indigo Borders
    doc.setDrawColor(17, 24, 39);
    doc.setLineWidth(3);
    doc.roundedRect(30, 30, width - 60, height - 60, 16, 16, "S");

    doc.setDrawColor(79, 70, 229);
    doc.setLineWidth(1.5);
    doc.roundedRect(42, 42, width - 84, height - 84, 12, 12, "S");

    // Header Badge
    doc.setTextColor(79, 70, 229);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text("AXIOM CAREER INTELLIGENCE & ENGINEERING ACADEMY", width / 2, 90, { align: "center" });

    // Certificate Title
    doc.setTextColor(17, 24, 39);
    doc.setFont("times", "bold");
    doc.setFontSize(30);
    doc.text("Foundations of Tech & Engineering Readiness", width / 2, 140, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(107, 114, 128);
    doc.text("THIS VERIFIED CERTIFICATE OF ACHIEVEMENT IS PROUDLY CONFERRED UPON", width / 2, 185, { align: "center" });

    // Recipient Name
    doc.setTextColor(17, 24, 39);
    doc.setFont("times", "bold");
    doc.setFontSize(32);
    doc.text(studentName.toUpperCase(), width / 2, 240, { align: "center" });

    // Decorative underline
    doc.setDrawColor(79, 70, 229);
    doc.setLineWidth(1.5);
    doc.line(width / 2 - 180, 252, width / 2 + 180, 252);

    // Curriculum Description
    doc.setTextColor(75, 85, 99);
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
    doc.setTextColor(79, 70, 229);
    doc.text("VERIFIED COMPETENCIES: GIT & GITHUB • FULL-STACK DEPLOYMENT • AGILE SPRINTS • STAR INTERVIEWING", width / 2, 355, { align: "center" });

    // Footer Credentials & Verification
    const certId = `AXIOM-TECH-${Math.floor(100000 + Math.random() * 900000)}`;
    const today = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

    doc.setFontSize(9.5);
    doc.setTextColor(107, 114, 128);
    doc.text(`Credential ID: ${certId}`, 70, 480);
    doc.text(`Issued On: ${today}`, 70, 500);
    doc.text("Verification URL: axiom-career.org/verify", 70, 520);

    // Signatures
    doc.setTextColor(17, 24, 39);
    doc.setFont("helvetica", "bold");
    doc.text("Axiom Engineering Board", 560, 480);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(107, 114, 128);
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
    <div className="min-h-screen bg-white text-[#4B5563] relative overflow-hidden flex flex-col">
      <Starfield />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-32 pb-24 relative z-10">
        {/* Header Banner */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-4">
            <PlayCircle className="w-4 h-4 text-blue-600" />
            3 Foundational Tech Sessions • Beginner to Junior Engineer
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#111827] mb-4">
            New to the Tech World? Start Here.
          </h1>
          <p className="text-[#4B5563] text-base sm:text-lg leading-relaxed">
            3 foundational video sessions teaching you how software engineering works in reality, how to ship real projects with Git, and how to pass technical interviews—with copyable resume templates and a verified certificate.
          </p>

          {/* Progress Tracker Card */}
          <div className="mt-6 p-4 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.06)] flex flex-wrap items-center justify-between gap-4 max-w-xl mx-auto">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                <Award className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="text-xs font-bold text-[#111827] block">Certificate Progress</span>
                <span className="text-[11px] text-[#6B7280]">
                  {completedSessions.length} of {SESSIONS.length} Sessions Completed
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-32 bg-gray-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-blue-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${(completedSessions.length / SESSIONS.length) * 100}%` }}
                />
              </div>
              <span className="text-xs font-bold text-blue-700">
                {Math.round((completedSessions.length / SESSIONS.length) * 100)}%
              </span>
            </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Left Column: Session Selector List (Col 4) */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#6B7280] block mb-1">
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
                      ? "bg-blue-50/70 border-blue-600 shadow-sm ring-1 ring-blue-500/20"
                      : "bg-white border-[#E5E7EB] hover:border-gray-300 hover:shadow-sm"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[#111827]">{session.title}</span>
                    {isDone ? (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Completed
                      </span>
                    ) : (
                      <span className="text-[10px] text-[#6B7280] flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {session.duration}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-[#4B5563] font-medium mb-1.5">{session.subtitle}</p>
                  <span className="text-[10px] text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md inline-block font-medium">
                    {session.speaker}
                  </span>
                </div>
              );
            })}

            {/* Resume Builder Quick Link */}
            <div className="p-5 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.06)] space-y-3">
              <span className="text-xs font-bold text-[#111827] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-blue-600" /> Put These Skills to Work
              </span>
              <p className="text-[11px] text-[#4B5563] leading-relaxed">
                Ready to turn what you learned into an actual resume? Use our 5-step AI builder from scratch.
              </p>
              <Link
                href="/builder"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 underline"
              >
                Open AI Resume Builder <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: Active Video Player & Resume Feature Widget (Col 8) */}
          <div className="lg:col-span-8 space-y-6">
            <GlassCard className="p-6 sm:p-8 bg-white border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
              {/* Interactive Video Player Canvas */}
              <div className="relative w-full h-[300px] sm:h-[380px] bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 flex flex-col justify-between p-6 mb-6 group shadow-md">
                {/* Background video simulation art */}
                <div className="absolute inset-0 bg-gradient-to-tr from-gray-950 via-gray-900 to-indigo-950/80 opacity-95" />

                {/* Top Info Bar */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-950/90 border border-gray-700 text-blue-300 flex items-center gap-1.5">
                    <Video className="w-3.5 h-3.5 text-blue-400" />
                    Session {activeSession.id} • {activeSession.duration}
                  </span>
                  <span className="text-xs text-gray-300 bg-gray-950/90 px-3 py-1 rounded-lg border border-gray-800">
                    {activeSession.level}
                  </span>
                </div>

                {/* Center Play Button & Title */}
                <div className="relative z-10 text-center my-auto">
                  <button
                    onClick={handleTogglePlay}
                    className="w-20 h-20 rounded-full bg-blue-500 hover:bg-blue-400 text-white flex items-center justify-center mx-auto mb-3 shadow-xl hover:scale-105 transition-all"
                  >
                    {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
                  </button>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white max-w-lg mx-auto leading-snug">
                    {activeSession.title}
                  </h3>
                  <p className="text-xs text-gray-300 mt-1">Instructor: {activeSession.speaker}</p>
                </div>

                {/* Bottom Scrub Controls */}
                <div className="relative z-10 space-y-2">
                  <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden cursor-pointer">
                    <div
                      className="bg-blue-500 h-full rounded-full transition-all duration-300"
                      style={{ width: isPlaying ? "75%" : "25%" }}
                    />
                  </div>
                  <div className="flex justify-between items-center text-[11px] text-gray-400 font-mono">
                    <span>{isPlaying ? "08:15" : "01:45"}</span>
                    <button
                      onClick={() => handleMarkCompleted(activeSession.id)}
                      className="text-blue-400 hover:text-blue-300 font-sans font-semibold text-xs flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" /> Mark Completed
                    </button>
                    <span>{activeSession.duration}</span>
                  </div>
                </div>
              </div>

              {/* Learning Outcomes */}
              <div className="space-y-3 mb-6">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-blue-700 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" /> What You Learn in this Session:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeSession.learningOutcomes.map((outcome, oIdx) => (
                    <div
                      key={oIdx}
                      className="p-3 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] text-xs text-[#4B5563] flex items-start gap-2"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chapters Timeline */}
              <div className="mb-6 p-4 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB]">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6B7280] block mb-2">
                  Session Chapters & Timestamps:
                </span>
                <div className="space-y-1.5">
                  {activeSession.chapters.map((chap, cIdx) => (
                    <div key={cIdx} className="flex items-center justify-between text-xs text-[#4B5563] py-1 border-b border-[#E5E7EB] last:border-0">
                      <span>{chap.label}</span>
                      <span className="font-mono text-blue-700 text-[11px]">{chap.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resume Asset Tool Widget */}
              <div className="p-5 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.06)] space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="text-xs font-bold text-[#111827] flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-indigo-600" />
                      {activeSession.resumeFeatureTitle}
                    </h5>
                    <p className="text-[11px] text-[#6B7280] mt-0.5">
                      {activeSession.resumeFeatureDescription}
                    </p>
                  </div>

                  <button
                    onClick={() => handleCopy(activeSession.resumeSnippet, activeSession.id)}
                    className="px-3.5 py-1.5 rounded-lg bg-white hover:bg-gray-50 text-[#4B5563] text-xs font-semibold border border-[#E5E7EB] shadow-sm flex items-center gap-1.5 transition-colors shrink-0"
                  >
                    {copiedSnippet === activeSession.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#6B7280]" /> Copy Snippet
                      </>
                    )}
                  </button>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-[#E5E7EB] font-mono text-[11px] text-[#111827] whitespace-pre-wrap leading-relaxed shadow-inner">
                  {activeSession.resumeSnippet}
                </div>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Certificate of Completion Generator Section */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.08)] relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content (Col 7) */}
            <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                Verified Student Credential
              </div>

              <h3 className="font-serif text-2xl sm:text-4xl font-bold text-[#111827]">
                Claim Your Foundations of Tech Certificate
              </h3>

              <p className="text-[#4B5563] text-sm sm:text-base leading-relaxed">
                Add this verified achievement to your LinkedIn profile and resume to demonstrate hands-on understanding of modern software architecture, production Git workflows, and STAR interview methodology.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Enter your full name for certificate"
                  className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl px-4 py-3 text-xs text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:border-blue-500 focus:bg-white w-full sm:w-72 transition-colors"
                />
                <button
                  onClick={handleDownloadCertificate}
                  className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gray-900 hover:bg-black text-white font-bold text-xs transition-all shadow-[0_1px_3px_rgba(0,0,0,0.08)] flex items-center justify-center gap-2 shrink-0"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Official PDF Certificate</span>
                </button>
              </div>

              <span className="text-[11px] text-[#6B7280] block pt-1">
                Zero fees • Issued on-demand by AXIOM Engineering Academy
              </span>
            </div>

            {/* Right Certificate Graphic Preview (Col 5) */}
            <div className="lg:col-span-5">
              <div className="bg-[#F9FAFB] border-2 border-blue-500/30 rounded-2xl p-6 sm:p-8 text-center space-y-3 relative shadow-md">
                <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center mx-auto shadow-sm">
                  <Award className="w-7 h-7" />
                </div>
                <span className="text-[10px] font-bold tracking-widest uppercase text-blue-700 block">
                  Official Certificate of Completion
                </span>
                <h4 className="font-serif text-2xl font-bold text-[#111827] tracking-wide">
                  {studentName || "YOUR NAME"}
                </h4>
                <p className="text-xs text-[#4B5563] font-medium">
                  Foundations of Tech & Engineering Readiness
                </p>
                <p className="text-[10px] text-[#6B7280] italic">
                  Competencies: Git/GitHub • Full-Stack Deployments • STAR Interviewing
                </p>
                <div className="pt-4 border-t border-[#E5E7EB] flex items-center justify-between text-[10px] text-[#6B7280]">
                  <span>Verified Credential</span>
                  <span className="font-mono text-blue-700 font-semibold">AXIOM-TECH-VERIFIED</span>
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
