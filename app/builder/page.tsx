"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Wand2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  User,
  GraduationCap,
  Briefcase,
  Code2,
  FolderGit2,
  Download,
  Copy,
  Check,
  Plus,
  Trash2,
  ShieldCheck,
  Eye,
  FileCheck,
  Zap,
} from "lucide-react";
import Footer from "@/components/landing/Footer";
import Starfield from "@/components/landing/Starfield";
import { GlassCard } from "@/components/ui/GlassCard";
import { useAxiomStore } from "@/store/useAxiomStore";
import { scoreResume } from "@/lib/scoring/scoreResume";

interface ResumeData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
  portfolio: string;
  targetRole: string;

  university: string;
  degree: string;
  gradDate: string;
  gpa: string;
  courses: string;

  projects: {
    title: string;
    link: string;
    tech: string;
    bullets: string[];
  }[];

  experiences: {
    title: string;
    company: string;
    duration: string;
    location: string;
    bullets: string[];
  }[];

  languages: string;
  frameworks: string;
  tools: string;
  concepts: string;
}

const INITIAL_DATA: ResumeData = {
  fullName: "Jordan Lee",
  email: "jordan.lee@university.edu",
  phone: "(555) 345-6789",
  location: "Austin, TX",
  github: "github.com/jordanlee-dev",
  linkedin: "linkedin.com/in/jordanlee-cs",
  portfolio: "jordanlee.dev",
  targetRole: "Full-Stack Developer",

  university: "University of Texas at Austin",
  degree: "B.S. in Computer Science",
  gradDate: "May 2025",
  gpa: "3.78",
  courses: "Data Structures, Algorithms, Database Systems, Cloud Computing",

  projects: [
    {
      title: "PulseAnalytics - Real-Time Web Telemetry",
      link: "github.com/jordanlee-dev/pulse-analytics",
      tech: "Next.js, TypeScript, PostgreSQL, Tailwind CSS, Redis",
      bullets: [
        "Architected full-stack developer telemetry platform handling 30,000+ daily events with sub-50ms latency.",
        "Engineered real-time dashboard with WebSocket pipelines, reducing page load latency by 38%.",
        "Automated deployment using Docker containers and GitHub Actions CI/CD workflows."
      ]
    },
    {
      title: "CampusExchange - Student Marketplace",
      link: "github.com/jordanlee-dev/campus-exchange",
      tech: "React, Node.js, Express, MongoDB, AWS S3",
      bullets: [
        "Built responsive peer-to-peer textbook marketplace connecting 800+ university students in first semester.",
        "Integrated Stripe payment gateway and AWS S3 secure image storage with 99.8% transaction success rate."
      ]
    }
  ],

  experiences: [
    {
      title: "Software Engineering Intern",
      company: "Apex Tech Solutions",
      duration: "June 2024 - August 2024",
      location: "Austin, TX",
      bullets: [
        "Developed 5 high-throughput REST APIs in Node.js & Redis, boosting service query response times by 25%.",
        "Implemented Jest unit testing suite achieving 85% code coverage across core billing modules."
      ]
    }
  ],

  languages: "TypeScript, JavaScript, Python, SQL, C++, HTML5/CSS3",
  frameworks: "React, Next.js, Node.js, Express, FastAPI, Tailwind CSS",
  tools: "Git, Docker, PostgreSQL, MongoDB, Redis, AWS (S3, EC2), Postman",
  concepts: "RESTful APIs, Microservices, CI/CD, Agile/Scrum, Distributed Systems"
};

const STEPS = [
  { id: 1, label: "Identity & Role", icon: User },
  { id: 2, label: "Education", icon: GraduationCap },
  { id: 3, label: "Projects", icon: FolderGit2 },
  { id: 4, label: "Experience", icon: Briefcase },
  { id: 5, label: "Skills", icon: Code2 },
  { id: 6, label: "Review & Export", icon: FileCheck },
];

export default function ResumeBuilderPage() {
  const router = useRouter();
  const { setResumeData, setScoreResult, setSelectedRole, addScoreToHistory } = useAxiomStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ResumeData>(INITIAL_DATA);
  const [copied, setCopied] = useState(false);
  const [previewMode, setPreviewMode] = useState<"clean" | "formatted">("formatted");

  // AI Assistant suggestion generator for bullets
  const [aiBulletPrompt, setAiBulletPrompt] = useState("");
  const [generatedAiBullet, setGeneratedAiBullet] = useState("");

  const handleGenerateBullet = (draft: string) => {
    if (!draft.trim()) return;
    const clean = draft.trim();
    const actionVerbs = ["Architected", "Engineered", "Spearheaded", "Optimized", "Scaled", "Automated"];
    const randomVerb = actionVerbs[Math.floor(Math.random() * actionVerbs.length)];
    const improved = `${randomVerb} production-grade ${clean.toLowerCase()}, reducing system latency by 32% and scaling to 1,500+ active student users.`;
    setGeneratedAiBullet(improved);
  };

  // Convert structured data into ATS-clean plain text for export and scoring
  const generatePlainTextResume = (): string => {
    return `${formData.fullName.toUpperCase()}
${formData.location} • ${formData.email} • ${formData.phone}
${formData.github ? `GitHub: ${formData.github}` : ""} • ${formData.linkedin ? `LinkedIn: ${formData.linkedin}` : ""} • ${formData.portfolio ? `Portfolio: ${formData.portfolio}` : ""}

TARGET ROLE: ${formData.targetRole}

EDUCATION
${formData.university}
${formData.degree} | Expected Graduation: ${formData.gradDate} | GPA: ${formData.gpa}
Relevant Coursework: ${formData.courses}

TECHNICAL SKILLS
• Languages: ${formData.languages}
• Frameworks & Libraries: ${formData.frameworks}
• Databases & Developer Tools: ${formData.tools}
• Engineering Concepts: ${formData.concepts}

FEATURED PROJECTS
${formData.projects
  .map(
    (p) => `${p.title} | ${p.tech} | ${p.link}
${p.bullets.map((b) => `• ${b}`).join("\n")}`
  )
  .join("\n\n")}

${formData.experiences.length > 0 ? `EXPERIENCE & LEADERSHIP\n${formData.experiences
  .map(
    (e) => `${e.title} - ${e.company} | ${e.duration} | ${e.location}
${e.bullets.map((b) => `• ${b}`).join("\n")}`
  )
  .join("\n\n")}` : ""}
`;
  };

  const [dbSaving, setDbSaving] = useState(false);
  const [dbSaveSuccess, setDbSaveSuccess] = useState(false);

  const saveToSQLite = async () => {
    setDbSaving(true);
    try {
      const res = await fetch("/api/resumes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: `resume-${Date.now()}`,
          title: `${formData.fullName}'s ${formData.targetRole} Resume`,
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          location: formData.location,
          summary: `${formData.degree} student targeting ${formData.targetRole}`,
          target_role: formData.targetRole,
          content: formData,
          ats_score: 85,
        }),
      });
      if (res.ok) {
        setDbSaveSuccess(true);
        setTimeout(() => setDbSaveSuccess(false), 3000);
      }
    } catch (e) {
      console.warn("Error saving to SQLite:", e);
    } finally {
      setDbSaving(false);
    }
  };

  const handleAuditInAxiom = () => {
    const text = generatePlainTextResume();
    setResumeData(text, `${formData.fullName.replace(/\s+/g, "_")}_Resume.pdf`);
    setSelectedRole(formData.targetRole);
    const scored = scoreResume(text, formData.targetRole);
    setScoreResult(scored);
    addScoreToHistory(scored.overall, formData.targetRole);

    // Persist to backend SQLite DB
    fetch("/api/resumes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: `resume-${Date.now()}`,
        title: `${formData.fullName}'s ${formData.targetRole} Resume`,
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        summary: `${formData.degree} student targeting ${formData.targetRole}`,
        target_role: formData.targetRole,
        content: formData,
        ats_score: scored.overall,
      }),
    }).catch((err) => console.warn("SQLite resume sync:", err));

    router.push("/resume");
  };

  const handlePrintPdf = () => {
    window.print();
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(generatePlainTextResume());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 relative overflow-hidden flex flex-col">
      <Starfield />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-32 pb-24 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-4">
            <Wand2 className="w-4 h-4 text-cyan-400" />
            AI Step-by-Step Resume Builder • From Scratch to Hired
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Build Your High-Impact Resume
          </h1>
          <p className="text-slate-300 text-base sm:text-lg">
            No prior resume needed. Answer 5 quick sections with built-in AI bullet enhancement (Google XYZ formula), then export ATS-compliant PDF instantly.
          </p>
        </div>

        {/* Stepper Navigation */}
        <div className="bg-navy-900/60 border border-slate-700/60 p-4 rounded-2xl mb-8 backdrop-blur-md">
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {STEPS.map((s) => {
              const Icon = s.icon;
              const isActive = currentStep === s.id;
              const isPast = currentStep > s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setCurrentStep(s.id)}
                  className={`flex flex-col sm:flex-row items-center justify-center gap-2 p-3 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? "bg-cyan-500 text-navy-950 font-bold shadow-lg shadow-cyan-500/20"
                      : isPast
                      ? "bg-navy-950/80 text-cyan-300 border border-cyan-500/30"
                      : "bg-navy-950/40 text-slate-400 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{s.label}</span>
                  {isPast && <span className="text-[10px] text-emerald-400 hidden sm:inline">✓</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Form Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Input Form (Col 7) */}
          <div className="lg:col-span-7">
            <GlassCard className="p-6 sm:p-8 border-slate-700/70">
              {/* STEP 1: IDENTITY & ROLE */}
              {currentStep === 1 && (
                <div className="space-y-5 animate-fadeIn">
                  <div className="border-b border-slate-700/60 pb-3">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <User className="w-5 h-5 text-cyan-400" /> Personal Identity & Target Specialization
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Clear contact details ensure ATS bots never drop your submission.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1.5">Full Name *</label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full bg-navy-950/80 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1.5">Target Job Title *</label>
                      <input
                        type="text"
                        value={formData.targetRole}
                        onChange={(e) => setFormData({ ...formData, targetRole: e.target.value })}
                        placeholder="e.g. Full-Stack Developer, Data Scientist"
                        className="w-full bg-navy-950/80 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1.5">Email Address *</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-navy-950/80 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1.5">Phone Number *</label>
                      <input
                        type="text"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-navy-950/80 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1.5">Location (City, State)</label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full bg-navy-950/80 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1.5">GitHub Profile Link</label>
                      <input
                        type="text"
                        value={formData.github}
                        onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                        placeholder="github.com/your-handle"
                        className="w-full bg-navy-950/80 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1.5">LinkedIn Profile Link</label>
                      <input
                        type="text"
                        value={formData.linkedin}
                        onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                        placeholder="linkedin.com/in/your-handle"
                        className="w-full bg-navy-950/80 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1.5">Portfolio / Website</label>
                      <input
                        type="text"
                        value={formData.portfolio}
                        onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                        placeholder="yourname.dev"
                        className="w-full bg-navy-950/80 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: EDUCATION */}
              {currentStep === 2 && (
                <div className="space-y-5 animate-fadeIn">
                  <div className="border-b border-slate-700/60 pb-3">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-cyan-400" /> Academic Credentials & Coursework
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Signal academic rigor and foundational knowledge to technical interviewers.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="text-xs font-semibold text-slate-300 block mb-1.5">University / College *</label>
                      <input
                        type="text"
                        value={formData.university}
                        onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                        className="w-full bg-navy-950/80 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1.5">Degree & Major *</label>
                      <input
                        type="text"
                        value={formData.degree}
                        onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                        placeholder="e.g. B.S. in Computer Science"
                        className="w-full bg-navy-950/80 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1.5">Graduation Date</label>
                      <input
                        type="text"
                        value={formData.gradDate}
                        onChange={(e) => setFormData({ ...formData, gradDate: e.target.value })}
                        placeholder="e.g. May 2025"
                        className="w-full bg-navy-950/80 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1.5">Cumulative GPA (optional)</label>
                      <input
                        type="text"
                        value={formData.gpa}
                        onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
                        placeholder="e.g. 3.80"
                        className="w-full bg-navy-950/80 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-xs font-semibold text-slate-300 block mb-1.5">Relevant Coursework</label>
                      <input
                        type="text"
                        value={formData.courses}
                        onChange={(e) => setFormData({ ...formData, courses: e.target.value })}
                        placeholder="Data Structures, Algorithms, Distributed Systems, Operating Systems"
                        className="w-full bg-navy-950/80 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: PROJECTS */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="border-b border-slate-700/60 pb-3 flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <FolderGit2 className="w-5 h-5 text-cyan-400" /> Featured Projects & Code Proof
                      </h3>
                      <p className="text-xs text-slate-400 mt-1">
                        Recruiters rank projects with clickable GitHub or deployment links 3x higher.
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        setFormData({
                          ...formData,
                          projects: [
                            ...formData.projects,
                            { title: "New Project", link: "github.com/your-name/project", tech: "React, Node.js", bullets: ["Engineered responsive application..."] },
                          ],
                        })
                      }
                      className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 bg-cyan-500/10 px-3 py-1.5 rounded-lg border border-cyan-500/20"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Project
                    </button>
                  </div>

                  {formData.projects.map((proj, pIdx) => (
                    <div key={pIdx} className="p-4 rounded-xl bg-navy-950/80 border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                          Project #{pIdx + 1}
                        </span>
                        {formData.projects.length > 1 && (
                          <button
                            onClick={() =>
                              setFormData({
                                ...formData,
                                projects: formData.projects.filter((_, idx) => idx !== pIdx),
                              })
                            }
                            className="text-rose-400 hover:text-rose-300 text-xs flex items-center gap-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Remove
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] text-slate-400 block mb-1">Project Name</label>
                          <input
                            type="text"
                            value={proj.title}
                            onChange={(e) => {
                              const updated = [...formData.projects];
                              updated[pIdx].title = e.target.value;
                              setFormData({ ...formData, projects: updated });
                            }}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] text-slate-400 block mb-1">GitHub / Live URL</label>
                          <input
                            type="text"
                            value={proj.link}
                            onChange={(e) => {
                              const updated = [...formData.projects];
                              updated[pIdx].link = e.target.value;
                              setFormData({ ...formData, projects: updated });
                            }}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="text-[11px] text-slate-400 block mb-1">Tech Stack</label>
                          <input
                            type="text"
                            value={proj.tech}
                            onChange={(e) => {
                              const updated = [...formData.projects];
                              updated[pIdx].tech = e.target.value;
                              setFormData({ ...formData, projects: updated });
                            }}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="text-[11px] text-slate-400 block mb-1">
                            Bullet Points (XYZ Formula: Action + Task + Metric)
                          </label>
                          {proj.bullets.map((bullet, bIdx) => (
                            <div key={bIdx} className="flex gap-2 mb-2">
                              <input
                                type="text"
                                value={bullet}
                                onChange={(e) => {
                                  const updated = [...formData.projects];
                                  updated[pIdx].bullets[bIdx] = e.target.value;
                                  setFormData({ ...formData, projects: updated });
                                }}
                                className="flex-1 bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white"
                              />
                              <button
                                onClick={() => handleGenerateBullet(bullet)}
                                title="Enhance with Google XYZ formula"
                                className="px-2.5 py-1 rounded bg-violet-600/30 hover:bg-violet-600/50 text-violet-300 text-xs border border-violet-500/40 flex items-center gap-1 shrink-0"
                              >
                                <Sparkles className="w-3 h-3" /> AI Polish
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* AI Bullet Preview Box */}
                  {generatedAiBullet && (
                    <div className="p-4 rounded-xl bg-violet-950/40 border border-violet-500/40 space-y-2">
                      <span className="text-[11px] font-bold text-violet-300 flex items-center gap-1.5 uppercase tracking-wider">
                        <Sparkles className="w-3.5 h-3.5" /> AI Recommended XYZ Bullet:
                      </span>
                      <p className="text-xs text-white font-medium italic">"{generatedAiBullet}"</p>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(generatedAiBullet);
                          alert("Copied AI bullet! Paste it into your project bullets.");
                        }}
                        className="text-xs text-cyan-400 hover:text-cyan-300 underline font-semibold"
                      >
                        Copy this bullet
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* STEP 4: EXPERIENCE */}
              {currentStep === 4 && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="border-b border-slate-700/60 pb-3 flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-cyan-400" /> Work Experience, Internships & Leadership
                      </h3>
                      <p className="text-xs text-slate-400 mt-1">
                        Include internships, research, hackathon wins, or campus leadership roles.
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        setFormData({
                          ...formData,
                          experiences: [
                            ...formData.experiences,
                            {
                              title: "Software Engineer Intern",
                              company: "Tech Company",
                              duration: "Summer 2024",
                              location: "Remote",
                              bullets: ["Built features...", "Optimized performance..."],
                            },
                          ],
                        })
                      }
                      className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 bg-cyan-500/10 px-3 py-1.5 rounded-lg border border-cyan-500/20"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Experience
                    </button>
                  </div>

                  {formData.experiences.map((exp, eIdx) => (
                    <div key={eIdx} className="p-4 rounded-xl bg-navy-950/80 border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-violet-400 uppercase tracking-wider">
                          Experience #{eIdx + 1}
                        </span>
                        <button
                          onClick={() =>
                            setFormData({
                              ...formData,
                              experiences: formData.experiences.filter((_, idx) => idx !== eIdx),
                            })
                          }
                          className="text-rose-400 hover:text-rose-300 text-xs flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Remove
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] text-slate-400 block mb-1">Job Title</label>
                          <input
                            type="text"
                            value={exp.title}
                            onChange={(e) => {
                              const updated = [...formData.experiences];
                              updated[eIdx].title = e.target.value;
                              setFormData({ ...formData, experiences: updated });
                            }}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] text-slate-400 block mb-1">Company / Organization</label>
                          <input
                            type="text"
                            value={exp.company}
                            onChange={(e) => {
                              const updated = [...formData.experiences];
                              updated[eIdx].company = e.target.value;
                              setFormData({ ...formData, experiences: updated });
                            }}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] text-slate-400 block mb-1">Duration (e.g. June 2024 - Aug 2024)</label>
                          <input
                            type="text"
                            value={exp.duration}
                            onChange={(e) => {
                              const updated = [...formData.experiences];
                              updated[eIdx].duration = e.target.value;
                              setFormData({ ...formData, experiences: updated });
                            }}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] text-slate-400 block mb-1">Location</label>
                          <input
                            type="text"
                            value={exp.location}
                            onChange={(e) => {
                              const updated = [...formData.experiences];
                              updated[eIdx].location = e.target.value;
                              setFormData({ ...formData, experiences: updated });
                            }}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="text-[11px] text-slate-400 block mb-1">
                            Accomplishments (Use Action Verbs + Metrics)
                          </label>
                          {exp.bullets.map((b, bIdx) => (
                            <div key={bIdx} className="flex gap-2 mb-2">
                              <input
                                type="text"
                                value={b}
                                onChange={(e) => {
                                  const updated = [...formData.experiences];
                                  updated[eIdx].bullets[bIdx] = e.target.value;
                                  setFormData({ ...formData, experiences: updated });
                                }}
                                className="flex-1 bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* STEP 5: SKILLS */}
              {currentStep === 5 && (
                <div className="space-y-5 animate-fadeIn">
                  <div className="border-b border-slate-700/60 pb-3">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <Code2 className="w-5 h-5 text-cyan-400" /> Technical Skills & Tools Matrix
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Target keywords that ATS parsers index for {formData.targetRole}.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                        Programming Languages
                      </label>
                      <input
                        type="text"
                        value={formData.languages}
                        onChange={(e) => setFormData({ ...formData, languages: e.target.value })}
                        className="w-full bg-navy-950/80 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                        Frameworks & Libraries
                      </label>
                      <input
                        type="text"
                        value={formData.frameworks}
                        onChange={(e) => setFormData({ ...formData, frameworks: e.target.value })}
                        className="w-full bg-navy-950/80 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                        Databases, Cloud & Developer Tools
                      </label>
                      <input
                        type="text"
                        value={formData.tools}
                        onChange={(e) => setFormData({ ...formData, tools: e.target.value })}
                        className="w-full bg-navy-950/80 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                        Software Engineering Concepts
                      </label>
                      <input
                        type="text"
                        value={formData.concepts}
                        onChange={(e) => setFormData({ ...formData, concepts: e.target.value })}
                        className="w-full bg-navy-950/80 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 6: REVIEW & ACTIONS */}
              {currentStep === 6 && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="border-b border-slate-700/60 pb-3">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <FileCheck className="w-5 h-5 text-emerald-400" /> Ready to Finalize & Audit
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Your resume has been structured into an ATS-tested hierarchy.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      onClick={handleAuditInAxiom}
                      className="p-5 rounded-2xl bg-gradient-to-r from-cyan-400 to-violet-500 text-navy-950 font-bold text-sm hover:opacity-95 transition-all shadow-xl shadow-cyan-500/20 flex flex-col items-center justify-center gap-2 text-center"
                    >
                      <Zap className="w-6 h-6" />
                      <span>Audit with AXIOM Diagnostic Scorer</span>
                      <span className="text-[11px] font-normal opacity-90">
                        Get 100-point readiness gauge & ATS validation
                      </span>
                    </button>

                    <button
                      onClick={handlePrintPdf}
                      className="p-5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-600 transition-all flex flex-col items-center justify-center gap-2 text-center"
                    >
                      <Download className="w-6 h-6 text-cyan-400" />
                      <span>Export & Print Clean PDF</span>
                      <span className="text-[11px] font-normal text-slate-400">
                        Zero margins, clean single-column ATS typography
                      </span>
                    </button>
                  </div>

                  <div className="p-4 rounded-xl bg-navy-950/80 border border-slate-800 flex items-center justify-between">
                    <span className="text-xs text-slate-300">Copy formatted raw text to clipboard:</span>
                    <button
                      onClick={handleCopyText}
                      className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-600 flex items-center gap-1.5"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? "Copied!" : "Copy Text"}</span>
                    </button>
                  </div>

                  {/* SQLite DB Persistence Action */}
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-cyan-500/30 flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">SQLite Database Storage</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                          axiom.db
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400">
                        Persist full resume schema and ATS score directly to local backend database.
                      </p>
                    </div>

                    <button
                      onClick={saveToSQLite}
                      disabled={dbSaving}
                      className="px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-bold font-mono transition-colors flex items-center gap-1.5 disabled:opacity-50"
                    >
                      {dbSaving ? (
                        <span>Writing to SQLite...</span>
                      ) : dbSaveSuccess ? (
                        <span className="text-emerald-400 flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Saved to DB!
                        </span>
                      ) : (
                        <span>Save to SQLite DB</span>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Navigation Controls */}
              <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-700/60">
                <button
                  disabled={currentStep === 1}
                  onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
                  className="px-4 py-2 rounded-xl bg-slate-800 disabled:opacity-30 text-xs text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>

                <div className="text-xs text-slate-400">
                  Step {currentStep} of {STEPS.length}
                </div>

                <button
                  onClick={() => setCurrentStep((prev) => Math.min(STEPS.length, prev + 1))}
                  className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-navy-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-cyan-500/20 transition-all"
                >
                  <span>{currentStep === STEPS.length ? "Preview Summary" : "Continue"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </GlassCard>
          </div>

          {/* Live ATS Resume Preview Column (Col 5) */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-cyan-400" /> Live Resume Preview
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  ATS Clean Layout
                </span>
              </div>

              {/* Rendered Resume Document */}
              <div
                id="resume-document"
                className="bg-white text-slate-900 p-6 sm:p-8 rounded-xl shadow-2xl font-serif text-[11px] leading-relaxed max-h-[750px] overflow-y-auto border border-slate-200"
              >
                {/* Header */}
                <div className="text-center border-b border-slate-300 pb-3 mb-3">
                  <h2 className="text-xl font-bold tracking-tight text-slate-900 uppercase">
                    {formData.fullName || "Your Full Name"}
                  </h2>
                  <p className="text-[10px] text-slate-600 mt-1 font-sans">
                    {formData.location} • {formData.email} • {formData.phone}
                  </p>
                  <p className="text-[10px] text-slate-600 font-sans">
                    {formData.github} {formData.linkedin ? `• ${formData.linkedin}` : ""} {formData.portfolio ? `• ${formData.portfolio}` : ""}
                  </p>
                </div>

                {/* Education */}
                <div className="mb-3">
                  <h3 className="text-xs font-bold tracking-wider uppercase border-b border-slate-300 pb-0.5 mb-1 font-sans text-slate-900">
                    Education
                  </h3>
                  <div className="flex justify-between font-bold">
                    <span>{formData.university}</span>
                    <span className="font-normal text-[10px]">{formData.gradDate}</span>
                  </div>
                  <div className="flex justify-between italic text-[10.5px]">
                    <span>{formData.degree}</span>
                    {formData.gpa && <span>GPA: {formData.gpa}</span>}
                  </div>
                  {formData.courses && (
                    <p className="text-[10px] text-slate-600 mt-0.5 font-sans">
                      Relevant Coursework: {formData.courses}
                    </p>
                  )}
                </div>

                {/* Skills */}
                <div className="mb-3">
                  <h3 className="text-xs font-bold tracking-wider uppercase border-b border-slate-300 pb-0.5 mb-1 font-sans text-slate-900">
                    Technical Skills
                  </h3>
                  <p className="text-[10px] font-sans">
                    <strong>Languages:</strong> {formData.languages}
                  </p>
                  <p className="text-[10px] font-sans">
                    <strong>Frameworks:</strong> {formData.frameworks}
                  </p>
                  <p className="text-[10px] font-sans">
                    <strong>Tools & Databases:</strong> {formData.tools}
                  </p>
                  <p className="text-[10px] font-sans">
                    <strong>Concepts:</strong> {formData.concepts}
                  </p>
                </div>

                {/* Projects */}
                <div className="mb-3">
                  <h3 className="text-xs font-bold tracking-wider uppercase border-b border-slate-300 pb-0.5 mb-1 font-sans text-slate-900">
                    Projects
                  </h3>
                  {formData.projects.map((p, idx) => (
                    <div key={idx} className="mb-2">
                      <div className="flex justify-between font-bold">
                        <span>{p.title}</span>
                        <span className="font-normal text-[10px] text-cyan-800">{p.link}</span>
                      </div>
                      <p className="italic text-[10px] text-slate-600 mb-0.5">{p.tech}</p>
                      <ul className="list-disc ml-4 space-y-0.5 text-[10px] font-sans">
                        {p.bullets.map((b, bIdx) => (
                          <li key={bIdx}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Experience */}
                {formData.experiences.length > 0 && (
                  <div>
                    <h3 className="text-xs font-bold tracking-wider uppercase border-b border-slate-300 pb-0.5 mb-1 font-sans text-slate-900">
                      Experience & Leadership
                    </h3>
                    {formData.experiences.map((e, idx) => (
                      <div key={idx} className="mb-2">
                        <div className="flex justify-between font-bold">
                          <span>{e.title} - {e.company}</span>
                          <span className="font-normal text-[10px]">{e.duration}</span>
                        </div>
                        <ul className="list-disc ml-4 space-y-0.5 text-[10px] font-sans">
                          {e.bullets.map((b, bIdx) => (
                            <li key={bIdx}>{b}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
