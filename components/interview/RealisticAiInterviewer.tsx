"use client";

import React, { useEffect, useState } from "react";
import {
  Volume2,
  Sparkles,
  Cpu,
  Radio,
  Zap,
  Activity,
  Terminal,
  Shield,
  Layers,
} from "lucide-react";

export interface InterviewerPersona {
  id: string;
  name: string;
  botCodename: string;
  role: string;
  company: string;
  avatarUrl: string;
  accent: string;
  gender: "female" | "male";
  themeColor: "cyan" | "violet" | "amber";
  bio: string;
  specialtyBadge: string;
}

export const INTERVIEWER_PERSONAS: InterviewerPersona[] = [
  {
    id: "nexus-01",
    name: "NEXUS-01",
    botCodename: "Apex Humanoid Intelligence",
    role: "Autonomous Principal Engineering Bot",
    company: "AXIOM Neural / DeepMind Core",
    avatarUrl: "/interviewer/nexus-7.jpg",
    accent: "Synthetic Precision · Clear & Resonant",
    gender: "female",
    themeColor: "cyan",
    bio: "Next-gen humanoid cognitive bot engineered for algorithmic rigor, scalable system architecture, and real-time technical problem solving.",
    specialtyBadge: "Distributed Systems & Algorithms",
  },
  {
    id: "cypher-v",
    name: "CYPHER-V",
    botCodename: "Titan Cybernetic Evaluator",
    role: "Cybernetic Architecture & Systems Bot",
    company: "AXIOM Neural / Stripe Infrastructure",
    avatarUrl: "/interviewer/cypher-v.jpg",
    accent: "Low-Frequency Cyber · Deep & Analytical",
    gender: "male",
    themeColor: "violet",
    bio: "High-bandwidth synthetic interviewer trained on 500,000+ technical whitepapers, evaluating design trade-offs, concurrency, and backend fault tolerance.",
    specialtyBadge: "System Design & Edge Cases",
  },
  {
    id: "aura-09",
    name: "AURA-09",
    botCodename: "Solstice Neural Evaluator",
    role: "Neural Talent & Behavioral Bot",
    company: "AXIOM Neural / Apple Intelligence",
    avatarUrl: "/interviewer/aura-9.jpg",
    accent: "Harmonic Fluid · Empathetic & Structured",
    gender: "female",
    themeColor: "amber",
    bio: "Sophisticated humanoid neural bot specialized in STAR behavioral evaluation, leadership principles, cross-functional collaboration, and candidate grit.",
    specialtyBadge: "STAR Behavioral & Leadership",
  },
];

interface RealisticAiInterviewerProps {
  persona: InterviewerPersona;
  isSpeaking: boolean;
  isCandidateSpeaking: boolean;
  currentQuestionText: string;
  onReplayAudio?: () => void;
}

export default function RealisticAiInterviewer({
  persona,
  isSpeaking,
  isCandidateSpeaking,
  currentQuestionText,
  onReplayAudio,
}: RealisticAiInterviewerProps) {
  // Dynamic audio spectrum wave bars
  const [audioWaveBars, setAudioWaveBars] = useState([25, 45, 80, 55, 30, 65, 40]);
  const [glitchPulse, setGlitchPulse] = useState(false);
  const [coreTelemetry, setCoreTelemetry] = useState({
    cpuLoad: 94.2,
    latencyMs: 14,
    speechFreq: 44.1,
  });

  // Color themes
  const themeGlow = {
    cyan: {
      border: "border-cyan-500/50",
      glow: "shadow-[0_0_35px_rgba(6,182,212,0.25)]",
      text: "text-cyan-400",
      bgBadge: "bg-cyan-950/80 text-cyan-300 border-cyan-500/40",
      accentBar: "bg-cyan-400",
      pulseRing: "border-cyan-400/40",
    },
    violet: {
      border: "border-violet-500/50",
      glow: "shadow-[0_0_35px_rgba(139,92,246,0.25)]",
      text: "text-violet-400",
      bgBadge: "bg-violet-950/80 text-violet-300 border-violet-500/40",
      accentBar: "bg-violet-400",
      pulseRing: "border-violet-400/40",
    },
    amber: {
      border: "border-amber-500/50",
      glow: "shadow-[0_0_35px_rgba(245,158,11,0.25)]",
      text: "text-amber-400",
      bgBadge: "bg-amber-950/80 text-amber-300 border-amber-500/40",
      accentBar: "bg-amber-400",
      pulseRing: "border-amber-400/40",
    },
  }[persona.themeColor || "cyan"];

  // Audio wave and speech animation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSpeaking) {
      interval = setInterval(() => {
        setAudioWaveBars([
          Math.floor(Math.random() * 65) + 30,
          Math.floor(Math.random() * 85) + 20,
          Math.floor(Math.random() * 95) + 35,
          Math.floor(Math.random() * 75) + 25,
          Math.floor(Math.random() * 90) + 40,
          Math.floor(Math.random() * 70) + 30,
          Math.floor(Math.random() * 55) + 20,
        ]);
        setCoreTelemetry((prev) => ({
          ...prev,
          cpuLoad: +(92 + Math.random() * 6).toFixed(1),
          latencyMs: Math.floor(10 + Math.random() * 8),
        }));
      }, 100);
    } else {
      setAudioWaveBars([15, 20, 30, 20, 25, 20, 15]);
      setCoreTelemetry((prev) => ({
        ...prev,
        cpuLoad: 28.4,
        latencyMs: 12,
      }));
    }
    return () => clearInterval(interval);
  }, [isSpeaking]);

  // Periodic subtle ocular scanning sweep
  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setGlitchPulse(true);
      setTimeout(() => setGlitchPulse(false), 260);
    }, 4500);
    return () => clearInterval(pulseInterval);
  }, []);

  return (
    <div
      className={`relative w-full h-[380px] sm:h-[430px] bg-slate-950 rounded-2xl overflow-hidden border ${themeGlow.border} ${themeGlow.glow} flex flex-col justify-between transition-all duration-500`}
    >
      {/* Background Humanoid Bot Image Feed */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ${
          isSpeaking ? "scale-[1.03] brightness-105" : "scale-100 brightness-95"
        }`}
        style={{
          backgroundImage: `url(${persona.avatarUrl})`,
        }}
      />

      {/* Cybernetic Holographic Scanlines & Grid Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(14, 165, 233, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(14, 165, 233, 0.15) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      {/* Cyber Vignette & Depth Shading */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-slate-950/60 pointer-events-none" />

      {/* Cyber Scanning Laser Line */}
      <div
        className={`absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent pointer-events-none transition-all duration-1000 ${
          isSpeaking ? "animate-pulse top-1/2 opacity-70" : "top-1/4 opacity-20"
        }`}
      />

      {/* Futuristic Corner Tech Brackets */}
      <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-cyan-400/60 pointer-events-none" />
      <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-cyan-400/60 pointer-events-none" />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-cyan-400/60 pointer-events-none" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-cyan-400/60 pointer-events-none" />

      {/* TOP HUD: Bot Identity & Telemetry */}
      <div className="relative z-10 p-3.5 sm:p-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5 bg-slate-950/85 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-700/80 shadow-lg">
          <div className="relative">
            <Cpu className={`w-4 h-4 ${themeGlow.text} animate-pulse`} />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <div className="text-left">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black tracking-wider text-white font-mono uppercase">
                {persona.name}
              </span>
              <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold uppercase ${themeGlow.bgBadge}`}>
                AI BOT
              </span>
            </div>
            <span className="text-[10px] text-slate-300 font-medium block">
              {persona.role}
            </span>
          </div>
        </div>

        {/* Right Telemetry Cues */}
        <div className="flex items-center gap-2">
          {onReplayAudio && (
            <button
              onClick={onReplayAudio}
              title="Re-synthesize question audio"
              className="px-2.5 py-1.5 rounded-xl bg-slate-950/85 hover:bg-slate-800 text-cyan-300 border border-slate-700/80 backdrop-blur-md text-xs flex items-center gap-1.5 transition-colors font-mono"
            >
              <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-[10px] font-bold hidden sm:inline">Re-vocalize</span>
            </button>
          )}

          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-700/80 text-[10px] font-mono text-slate-300">
            <Activity className="w-3 h-3 text-emerald-400" />
            <span>PING: {coreTelemetry.latencyMs}ms</span>
            <span className="text-slate-600">|</span>
            <span>FREQ: {coreTelemetry.speechFreq}kHz</span>
          </div>
        </div>
      </div>

      {/* CENTER INTERACTIVE STATUS HUD */}
      <div className="relative z-10 my-auto text-center pointer-events-none px-4">
        {/* Holographic Pulse Reticle */}
        <div className="inline-flex flex-col items-center gap-2">
          <div
            className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-950/90 backdrop-blur-md border border-slate-700 shadow-2xl transition-all duration-300`}
          >
            {isSpeaking ? (
              <>
                {/* Dynamic Cyber Audio Waveform */}
                <div className="flex items-center gap-1 h-4 px-1">
                  {audioWaveBars.map((height, i) => (
                    <span
                      key={i}
                      className={`w-1 rounded-full ${themeGlow.accentBar} shadow-[0_0_8px_currentColor] transition-all duration-100`}
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
                <span className={`text-xs font-bold font-mono uppercase tracking-wide ${themeGlow.text}`}>
                  SYNTHESIZING VOCAL OUTPUT...
                </span>
              </>
            ) : isCandidateSpeaking ? (
              <>
                <Radio className="w-3.5 h-3.5 text-violet-400 animate-spin" />
                <span className="text-xs font-semibold font-mono text-violet-300">
                  NEURAL LINK RECEIVING · DECODING STAR METRICS
                </span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                <span className="text-xs font-mono text-slate-300">
                  AWAITING CANDIDATE TRANSMISSION
                </span>
              </>
            )}
          </div>

          {/* Specialty Subtitle Badge */}
          <div className="text-[10px] font-mono text-slate-400 bg-slate-950/70 px-2.5 py-0.5 rounded-md border border-slate-800">
            SPECIALIZATION: {persona.specialtyBadge}
          </div>
        </div>
      </div>

      {/* BOTTOM TELEPROMPTER & HOLOGRAPHIC TRANSCRIPT */}
      <div className="relative z-10 p-3 sm:p-4 bg-gradient-to-t from-slate-950 via-slate-950/95 to-transparent">
        <div className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-700/80 backdrop-blur-md text-left shadow-2xl">
          <div className="flex items-center justify-between mb-1.5">
            <span className={`text-[10px] font-bold font-mono uppercase tracking-wider ${themeGlow.text} flex items-center gap-1.5`}>
              <Zap className="w-3 h-3" /> [INTERVIEW BOT PROMPT]
            </span>
            <div className="flex items-center gap-1 text-[10px] font-mono text-slate-400">
              <Terminal className="w-3 h-3 text-cyan-400" />
              <span>LIVE VOCAL CAPTION</span>
            </div>
          </div>
          <p className="text-xs sm:text-sm font-medium text-white line-clamp-2 leading-relaxed tracking-wide">
            "{currentQuestionText}"
          </p>
        </div>
      </div>
    </div>
  );
}
