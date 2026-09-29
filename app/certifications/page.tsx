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
    <div className="min-h-screen bg-white text-[#4B5563] relative overflow-hidden flex flex-col">
      <Starfield />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-32 pb-24 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-4">
            <GraduationCap className="w-4 h-4 text-blue-600" />
            100% Free • Verified Course Catalog
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#111827] mb-4">
            Free Certifications & Curriculum
          </h1>
          <p className="text-[#4B5563] text-base sm:text-lg">
            Zero tuition barriers. High-signal credentials and courses from Harvard, Google, freeCodeCamp, and Microsoft to fill verified resume gaps.
          </p>
        </div>

        {/* Recommended for User Row */}
        {recommended.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[#6B7280]">
                Recommended for Your Goal: <span className="text-blue-700 font-bold">{selectedRole}</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recommended.map((c) => {
                const isSaved = savedCertifications.includes(c.id);
                return (
                  <GlassCard
                    key={c.id}
                    className="p-6 bg-white border-[#E5E7EB] hover:border-blue-300 shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                          {c.provider}
                        </span>
                        <button
                          onClick={() => toggleSavedCertification(c.id)}
                          className="text-[#6B7280] hover:text-[#111827]"
                        >
                          {isSaved ? (
                            <BookmarkCheck className="w-4 h-4 text-blue-600" />
                          ) : (
                            <Bookmark className="w-4 h-4" />
                          )}
                        </button>
                      </div>

                      <h3 className="font-semibold text-[#111827] text-base mb-2">{c.title}</h3>
                      <div className="flex items-center gap-4 text-xs text-[#6B7280] mb-4">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#9CA3AF]" /> {c.duration}
                        </span>
                        <span className="capitalize px-2 py-0.5 rounded bg-gray-100 text-[#4B5563] text-[10px] font-medium">
                          {c.level}
                        </span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#E5E7EB] flex items-center justify-between">
                      <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 text-emerald-600" /> Free Verified
                      </span>
                      <a
                        href={c.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
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
        <div className="bg-[#F9FAFB] border border-[#E5E7EB] p-4 rounded-2xl mb-8 flex flex-col md:flex-row gap-4 justify-between items-center shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === cat.id
                    ? "bg-blue-600 text-white font-bold shadow-sm"
                    : "bg-white text-[#4B5563] border border-[#E5E7EB] hover:bg-gray-100 hover:text-[#111827]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search & Level */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search skill, topic, or provider..."
                className="w-full bg-white border border-[#E5E7EB] rounded-lg pl-9 pr-3 py-1.5 text-xs text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="bg-white border border-[#E5E7EB] rounded-lg px-2.5 py-1.5 text-xs text-[#4B5563] focus:outline-none focus:border-blue-500"
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
                className="p-6 bg-white border-[#E5E7EB] hover:border-gray-300 shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-gray-100 text-[#4B5563] border border-gray-200">
                      {c.provider}
                    </span>
                    <button
                      onClick={() => toggleSavedCertification(c.id)}
                      className="text-[#6B7280] hover:text-[#111827]"
                    >
                      {isSaved ? (
                        <BookmarkCheck className="w-4 h-4 text-blue-600" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <h3 className="font-semibold text-[#111827] text-base mb-2 leading-snug">{c.title}</h3>

                  <div className="flex items-center gap-3 text-xs text-[#6B7280] mb-4">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#9CA3AF]" /> {c.duration}
                    </span>
                    <span className="capitalize px-2 py-0.5 rounded bg-gray-100 text-[#4B5563] text-[10px] font-medium">
                      {c.level}
                    </span>
                    {c.certificate && (
                      <span className="text-[10px] text-blue-700 px-1.5 py-0.5 rounded bg-blue-50 font-medium">
                        Cert Included
                      </span>
                    )}
                  </div>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {c.skills.map((s, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded bg-[#F9FAFB] text-[#4B5563] border border-[#E5E7EB]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E5E7EB] flex items-center justify-between">
                  <span className="text-[11px] text-emerald-700 font-semibold">Free Access</span>
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
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
