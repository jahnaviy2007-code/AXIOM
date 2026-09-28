"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  GraduationCap,
  ExternalLink,
  Bookmark,
  BookmarkCheck,
  Search,
  CheckCircle,
  Clock,
  Sparkles,
  ShieldCheck,
  Filter,
  Layers,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/landing/Footer";
import Starfield from "@/components/landing/Starfield";
import { GlassCard } from "@/components/ui/GlassCard";
import { useAxiomStore } from "@/store/useAxiomStore";
import certData from "@/data/certifications.json";

interface CertItem {
  id: string;
  title: string;
  provider: string;
  url: string;
  level: string;
  duration: string;
  skills: string[];
  roles: string[];
  free: boolean;
  certificate: boolean;
  category: string;
  auditAvailable?: boolean;
}

const certifications = certData as CertItem[];

const CATEGORIES = [
  { id: "all", label: "All Disciplines" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "ml", label: "ML & AI" },
  { id: "data", label: "Data Science" },
  { id: "cloud", label: "Cloud & DevOps" },
  { id: "programming", label: "Software Engineering" },
];

export default function CertificationsPage() {
  const { selectedRole, savedCertifications, toggleSavedCertification } = useAxiomStore();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");

  // Recommended based on target role
  const recommended = useMemo(() => {
    const roleNormalized = selectedRole.toLowerCase();
    return certifications.filter((c) =>
      c.roles.some((r) => roleNormalized.includes(r) || r.includes(roleNormalized))
    ).slice(0, 3);
  }, [selectedRole]);

  // Filtered list
  const filteredCerts = useMemo(() => {
    return certifications.filter((c) => {
      const matchCat =
        selectedCategory === "all" ||
        c.category === selectedCategory ||
        (selectedCategory === "cloud" && c.category === "devops");

      const matchLevel = levelFilter === "all" || c.level.toLowerCase() === levelFilter.toLowerCase();

      const matchSearch =
        !searchQuery ||
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchCat && matchLevel && matchSearch;
    });
  }, [selectedCategory, levelFilter, searchQuery]);

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 relative overflow-hidden flex flex-col">
      <Starfield />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-32 pb-24 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-4">
            <GraduationCap className="w-4 h-4 text-cyan-400" />
            100% Free • Verified Course Catalog
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Free Certifications & Curriculum
          </h1>
          <p className="text-slate-300 text-base sm:text-lg">
            Zero tuition barriers. High-signal credentials and courses from Harvard, Google, freeCodeCamp, and Microsoft to fill verified resume gaps.
          </p>
        </div>

        {/* Recommended for User Row */}
        {recommended.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-violet-400" />
              <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
                Recommended for Your Goal: <span className="text-cyan-400">{selectedRole}</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recommended.map((c) => {
                const isSaved = savedCertifications.includes(c.id);
                return (
                  <GlassCard
                    key={c.id}
                    className="p-6 border-violet-500/30 hover:border-violet-500/60 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/20">
                          {c.provider}
                        </span>
                        <button
                          onClick={() => toggleSavedCertification(c.id)}
                          className="text-slate-400 hover:text-white"
                        >
                          {isSaved ? (
                            <BookmarkCheck className="w-4 h-4 text-cyan-400" />
                          ) : (
                            <Bookmark className="w-4 h-4" />
                          )}
                        </button>
                      </div>

                      <h3 className="font-semibold text-white text-base mb-2">{c.title}</h3>
                      <div className="flex items-center gap-4 text-xs text-slate-400 mb-4">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-500" /> {c.duration}
                        </span>
                        <span className="capitalize px-2 py-0.5 rounded bg-slate-800 text-[10px]">
                          {c.level}
                        </span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                      <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> Free Verified
                      </span>
                      <a
                        href={c.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
                      >
                        Enroll Now <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </GlassCard>
                );
              })}
            </div>
          </div>
        )}

        {/* Filter & Search Bar */}
        <div className="bg-navy-900/60 border border-slate-700/60 p-4 rounded-2xl mb-8 flex flex-col md:flex-row gap-4 justify-between items-center backdrop-blur-md">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === cat.id
                    ? "bg-cyan-500 text-navy-950 font-bold shadow-md shadow-cyan-500/20"
                    : "bg-navy-950/80 text-slate-300 border border-slate-800 hover:border-slate-600"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search & Level */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search skill, topic, or provider..."
                className="w-full bg-navy-950/80 border border-slate-700 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="bg-navy-950/80 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-cyan-400"
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCerts.map((c) => {
            const isSaved = savedCertifications.includes(c.id);
            return (
              <GlassCard
                key={c.id}
                className="p-6 border-slate-700/60 hover:border-slate-500 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {c.provider}
                    </span>
                    <button
                      onClick={() => toggleSavedCertification(c.id)}
                      className="text-slate-400 hover:text-white"
                    >
                      {isSaved ? (
                        <BookmarkCheck className="w-4 h-4 text-cyan-400" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <h3 className="font-semibold text-white text-base mb-2 leading-snug">{c.title}</h3>

                  <div className="flex items-center gap-3 text-xs text-slate-400 mb-4">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-500" /> {c.duration}
                    </span>
                    <span className="capitalize px-2 py-0.5 rounded bg-slate-800/80 text-[10px]">
                      {c.level}
                    </span>
                    {c.certificate && (
                      <span className="text-[10px] text-cyan-400 px-1.5 py-0.5 rounded bg-cyan-500/10">
                        Cert Included
                      </span>
                    )}
                  </div>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {c.skills.map((s, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded bg-navy-950/80 text-slate-400 border border-slate-800"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-emerald-400 font-medium">Free Access</span>
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
                  >
                    View Curriculum <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
