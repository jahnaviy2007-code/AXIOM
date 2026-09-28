"use client";

import React, { useState } from "react";
import {
  Play,
  Pause,
  Award,
  CheckCircle2,
  Sparkles,
  Download,
  Copy,
  Check,
  Video,
  BookOpen,
  Clock,
  Layers,
  ChevronRight,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

interface VideoModule {
  id: number;
  title: string;
  speaker: string;
  duration: string;
  description: string;
  keyTakeaways: string[];
  resumeWidgetTitle: string;
  resumeWidgetDescription: string;
  sampleAsset: string;
}

const MODULES: VideoModule[] = [
  {
    id: 1,
    title: "1. The Google XYZ Formula for Bullets",
    speaker: "Sarah Jenkins, Ex-Google Staff Technical Recruiter",
    duration: "8:45 min",
    description:
      "Learn how top applicants replace passive duties with 'Accomplished [X], as measured by [Y], by doing [Z]'. Discover how numbers, percentages, and latencies trigger recruiter interest.",
    keyTakeaways: [
      "Start every bullet with an aggressive action verb (Engineered, Architected, Spearheaded).",
      "Quantify scope: user counts, latency reductions, memory optimizations, or dollar impact.",
      "Avoid passive phrases like 'Responsible for' or 'Helped team with'."
    ],
    resumeWidgetTitle: "XYZ Bullet Generator for Your Resume",
    resumeWidgetDescription: "Click to generate and copy a tested bullet template directly into your resume:",
    sampleAsset: "Architected full-stack developer telemetry platform using Next.js & PostgreSQL, reducing p99 API latency by 42% for 3,500+ active peers."
  },
  {
    id: 2,
    title: "2. Project Proof: What Tech Leads Really Look For",
    speaker: "Marcus Vance, Principal Architect at Stripe",
    duration: "11:20 min",
    description:
      "A tutorial on building believable project proof. Why a working GitHub repo with a clean README, live deployment link, and test coverage beats 10 tutorial clones.",
    keyTakeaways: [
      "Include a clickable live deployment link (Vercel/Netlify/Fly.io) next to your GitHub repository.",
      "Document architectural decisions, database schemas, and API design in the README.",
      "Demonstrate unit and integration test coverage (Jest, Cypress, or PyTest)."
    ],
    resumeWidgetTitle: "Project Proof Header Template",
    resumeWidgetDescription: "Copy this high-signal project structure recognized by hiring managers:",
    sampleAsset: "Axiom DevFlow - Cloud Developer Platform | github.com/username/devflow | devflow.vercel.app\n• Engineered distributed event queue handling 50k requests/min with 99.9% uptime."
  },
  {
    id: 3,
    title: "3. ATS Demystified: Formatting & Keyword Density",
    speaker: "Dr. Elena Rostova, ATS Search Algorithm Engineer",
    duration: "7:15 min",
    description:
      "How Applicant Tracking Systems parse PDFs. Learn why complex multi-column tables, graphics, and unusual headers get rejected, and how to optimize keyword frequency.",
    keyTakeaways: [
      "Use single-column layout with standard headings: Education, Skills, Projects, Experience.",
      "Keep contact information in plain body text, never inside headers or footers.",
      "Mirror exact keywords from the job description in your Skills matrix."
    ],
    resumeWidgetTitle: "ATS Core Competency Matrix",
    resumeWidgetDescription: "Standardized skills section format guaranteed to parse cleanly across all ATS systems:",
    sampleAsset: "Languages: TypeScript, JavaScript, Python, SQL | Frameworks: React, Next.js, Node.js, Express, Tailwind CSS | Tools & Cloud: Docker, PostgreSQL, Redis, AWS (S3, EC2), Git, Jest"
  }
];

export default function SkillsMasterclassSection() {
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(35);
  const [completedModules, setCompletedModules] = useState<number[]>([1]);
  const [copiedAsset, setCopiedAsset] = useState<number | null>(null);

  // Certificate state
  const [studentName, setStudentName] = useState("Alex Chen");
  const [certificateUnlocked, setCertificateUnlocked] = useState(false);

  const activeModule = MODULES[activeModuleIndex];

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
    if (!completedModules.includes(activeModule.id)) {
      const updated = [...completedModules, activeModule.id];
      setCompletedModules(updated);
      if (updated.length >= 3) {
        setCertificateUnlocked(true);
      }
    }
  };

  const handleCopy = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedAsset(id);
    setTimeout(() => setCopiedAsset(null), 2000);
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

    // Background
    doc.setFillColor(11, 15, 46); // Navy-950
    doc.rect(0, 0, width, height, "F");

    // Luxury Border
    doc.setDrawColor(34, 211, 238); // Cyan
    doc.setLineWidth(4);
    doc.roundedRect(30, 30, width - 60, height - 60, 16, 16, "S");

    doc.setDrawColor(124, 92, 255); // Violet
    doc.setLineWidth(1.5);
    doc.roundedRect(40, 40, width - 80, height - 80, 12, 12, "S");

    // Header Tag
    doc.setTextColor(34, 211, 238);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("AXIOM CAREER INTELLIGENCE & ENGINEERING ACADEMY", width / 2, 95, { align: "center" });

    // Title
    doc.setTextColor(255, 255, 255);
    doc.setFont("times", "bold");
    doc.setFontSize(32);
    doc.text("Certificate of Completion", width / 2, 150, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(148, 163, 184);
    doc.text("THIS IS PROUDLY PRESENTED TO", width / 2, 195, { align: "center" });

    // Recipient Name
    doc.setTextColor(34, 211, 238);
    doc.setFont("times", "bold");
    doc.setFontSize(34);
    doc.text(studentName.toUpperCase(), width / 2, 255, { align: "center" });

    // Underline
    doc.setDrawColor(34, 211, 238);
    doc.setLineWidth(1);
    doc.line(width / 2 - 180, 268, width / 2 + 180, 268);

    // Body
    doc.setTextColor(226, 232, 240);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(
      "for successfully mastering the AXIOM Career Masterclasses: The Google XYZ Formula, Technical Project Proof Engineering,",
      width / 2,
      310,
      { align: "center" }
    );
    doc.text(
      "and Applicant Tracking System (ATS) Architecture & Keyword Optimization.",
      width / 2,
      330,
      { align: "center" }
    );

    // Verification info
    const certId = `AXIOM-VERIFIED-${Math.floor(100000 + Math.random() * 900000)}`;
    const today = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

    doc.setFontSize(10);
    doc.setTextColor(148, 163, 184);
    doc.text(`Credential ID: ${certId}`, 70, 490);
    doc.text(`Issued On: ${today}`, 70, 510);
    doc.text("Verification: axiom-career.org/verify", 70, 530);

    // Signature Area
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.text("Axiom Engineering Board", 560, 490);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(148, 163, 184);
    doc.text("Director of Career Engineering", 560, 510);

    doc.setDrawColor(124, 92, 255);
    doc.line(550, 475, 710, 475);

    doc.save(`AXIOM_Certificate_${studentName.replace(/\s+/g, "_")}.pdf`);
  };

  return (
    <section className="py-24 relative overflow-hidden" id="masterclass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs font-semibold mb-4">
            <Video className="w-4 h-4 text-violet-400" />
            Interactive Skill Accelerator & Verified Certification
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            What Tech Recruiters & ATS Actually Want
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            3 foundational video masterclasses with interactive tools you can put directly on your resume, plus an official completion certificate.
          </p>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Module Selector (Col 4) */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
              Curriculum Lessons (3 Modules)
            </span>

            {MODULES.map((mod, idx) => {
              const isSelected = activeModuleIndex === idx;
              const isDone = completedModules.includes(mod.id);
              return (
                <div
                  key={mod.id}
                  onClick={() => {
                    setActiveModuleIndex(idx);
                    setIsPlaying(false);
                  }}
                  className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                    isSelected
                      ? "bg-violet-600/20 border-violet-400 shadow-lg shadow-violet-500/10"
                      : "bg-navy-900/60 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-white">{mod.title}</span>
                    {isDone ? (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Done
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {mod.duration}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2">{mod.description}</p>
                </div>
              );
            })}

            {/* Unlocking Banner */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-950/40 to-violet-950/40 border border-cyan-500/30 mt-4">
              <div className="flex items-center gap-2 mb-1">
                <Award className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-bold text-white">Earn Verified Certificate</span>
              </div>
              <p className="text-[11px] text-slate-300">
                Complete all 3 video lessons ({completedModules.length}/3 done) to generate your official AXIOM Certificate.
              </p>
            </div>
          </div>

          {/* Interactive Player & Resume Tools (Col 8) */}
          <div className="lg:col-span-8 space-y-6">
            <GlassCard className="p-6 sm:p-8 border-slate-700/80">
              {/* Simulated Interactive Video Screen */}
              <div className="relative w-full h-[280px] sm:h-[340px] bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex flex-col justify-between p-6 mb-6 group">
                {/* Background visual art for video */}
                <div className="absolute inset-0 bg-gradient-to-tr from-navy-950 via-slate-900 to-violet-950/60 opacity-90" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent" />

                {/* Video Top Bar */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-navy-950/80 border border-slate-700 text-cyan-300">
                    Masterclass • {activeModule.duration}
                  </span>
                  <span className="text-xs text-slate-300 bg-navy-950/80 px-2.5 py-1 rounded-lg border border-slate-800">
                    {activeModule.speaker}
                  </span>
                </div>

                {/* Center Play Button & Title */}
                <div className="relative z-10 text-center my-auto">
                  <button
                    onClick={handleTogglePlay}
                    className="w-16 h-16 rounded-full bg-cyan-400 hover:bg-cyan-300 text-navy-950 flex items-center justify-center mx-auto mb-3 shadow-xl shadow-cyan-400/30 hover:scale-105 transition-all"
                  >
                    {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-1" />}
                  </button>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white max-w-md mx-auto">
                    {activeModule.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    {isPlaying ? "Playing lesson video..." : "Click play to begin interactive module"}
                  </p>
                </div>

                {/* Bottom Video Progress Controls */}
                <div className="relative z-10 space-y-2">
                  <div className="w-full bg-slate-800/80 h-2 rounded-full overflow-hidden cursor-pointer">
                    <div
                      className="bg-gradient-to-r from-cyan-400 to-violet-500 h-full rounded-full transition-all duration-300"
                      style={{ width: isPlaying ? "85%" : `${videoProgress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>{isPlaying ? "06:45" : "02:15"}</span>
                    <span>{activeModule.duration}</span>
                  </div>
                </div>
              </div>

              {/* Key Takeaways */}
              <div className="space-y-3 mb-6">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Core Takeaways from this Lesson:
                </h4>
                <ul className="space-y-2">
                  {activeModule.keyTakeaways.map((takeaway, tIdx) => (
                    <li key={tIdx} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Interactive Useful Resume Asset Tool */}
              <div className="p-4 rounded-xl bg-navy-950/80 border border-violet-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-violet-400" />
                      {activeModule.resumeWidgetTitle}
                    </h5>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {activeModule.resumeWidgetDescription}
                    </p>
                  </div>

                  <button
                    onClick={() => handleCopy(activeModule.sampleAsset, activeModule.id)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-600 flex items-center gap-1.5 transition-colors shrink-0"
                  >
                    {copiedAsset === activeModule.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-400" /> Copy to Resume
                      </>
                    )}
                  </button>
                </div>

                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 font-mono text-[11px] text-slate-200 whitespace-pre-wrap">
                  {activeModule.sampleAsset}
                </div>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Official Certificate Generator Box */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-navy-900 via-navy-950 to-violet-950/60 border border-cyan-500/40 relative overflow-hidden shadow-2xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                Verified Student Credential
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Claim Your AXIOM Career Readiness Certificate
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Add this verified credential directly to your LinkedIn and resume to certify completion of modern ATS optimization, XYZ impact quantification, and technical proof engineering.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Enter your full name for certificate"
                  className="bg-navy-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 w-full sm:w-64"
                />
                <button
                  onClick={handleDownloadCertificate}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 text-navy-950 font-bold text-xs hover:opacity-90 transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 shrink-0"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Official PDF Certificate</span>
                </button>
              </div>
            </div>

            {/* Visual Certificate Card Preview */}
            <div className="w-full max-w-md bg-navy-950 border-2 border-cyan-400/40 rounded-2xl p-6 text-center space-y-3 relative shadow-2xl">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center mx-auto text-navy-950">
                <Award className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold tracking-widest uppercase text-cyan-400 block">
                Certificate of Completion
              </span>
              <h4 className="font-serif text-xl font-bold text-white tracking-wide">
                {studentName || "YOUR NAME"}
              </h4>
              <p className="text-[11px] text-slate-400 italic">
                AXIOM Career Engineering & ATS Optimization Masterclass
              </p>
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-500">
                <span>Verified Credential</span>
                <span className="font-mono text-cyan-400">AXIOM-2026-CERT</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
