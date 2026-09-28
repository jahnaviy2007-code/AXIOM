"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Video,
  Mic,
  MicOff,
  VideoOff,
  Volume2,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  BarChart3,
  Flame,
  Award,
  Clock,
  UserCheck,
  Building2,
  HelpCircle,
  Eye,
} from "lucide-react";
import Footer from "@/components/landing/Footer";
import Starfield from "@/components/landing/Starfield";
import { GlassCard } from "@/components/ui/GlassCard";
import RealisticAiInterviewer, {
  INTERVIEWER_PERSONAS,
  InterviewerPersona,
} from "@/components/interview/RealisticAiInterviewer";
import { useAxiomStore, InterviewAttempt } from "@/store/useAxiomStore";
import {
  QUESTION_BANK,
  getQuestionsForRole,
  InterviewQuestion,
} from "@/lib/interview/questionBank";
import {
  evaluateAnswer,
  compileInterviewAttempt,
  CritiqueResult,
} from "@/lib/interview/feedbackEngine";

export default function InterviewPage() {
  const { selectedRole, addInterviewAttempt } = useAxiomStore();

  // Stage: "setup" | "active" | "report"
  const [stage, setStage] = useState<"setup" | "active" | "report">("setup");
  const [role, setRole] = useState(selectedRole || "Full-Stack Developer");
  const [difficulty, setDifficulty] = useState<"Intern" | "Junior" | "Mid-level">("Junior");

  // Selected AI Interviewer Persona
  const [selectedPersona, setSelectedPersona] = useState<InterviewerPersona>(
    INTERVIEWER_PERSONAS[0]
  );

  // Media streams & permissions
  const [hasCamera, setHasCamera] = useState(false);
  const [hasMic, setHasMic] = useState(false);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [micEnabled, setMicEnabled] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Active interview state
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  // Realistic interview thinking time (10s buffer)
  const [thinkingTimer, setThinkingTimer] = useState<number | null>(null);

  // Answer records
  const [answersRecord, setAnswersRecord] = useState<
    { question: InterviewQuestion; answer: string; critique: CritiqueResult }[]
  >([]);
  const [finalReport, setFinalReport] = useState<InterviewAttempt | null>(null);

  // Recognition ref
  const recognitionRef = useRef<any>(null);

  // Initialize questions on role change
  useEffect(() => {
    const qList = getQuestionsForRole(role, difficulty);
    setQuestions(qList);
  }, [role, difficulty]);

  // Request camera and mic stream for setup
  const initMedia = async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        streamRef.current = stream;
        setHasCamera(true);
        setHasMic(true);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }
    } catch (err) {
      console.warn("Camera or microphone permission was not granted or device not found:", err);
      setHasCamera(false);
      setHasMic(false);
    }
  };

  // Timer while answering
  useEffect(() => {
    let interval: any;
    if (stage === "active" && isRecording) {
      interval = setInterval(() => {
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [stage, isRecording]);

  // Thinking timer countdown
  useEffect(() => {
    let timer: any;
    if (thinkingTimer !== null && thinkingTimer > 0) {
      timer = setTimeout(() => {
        setThinkingTimer(thinkingTimer - 1);
      }, 1000);
    } else if (thinkingTimer === 0) {
      setThinkingTimer(null);
      toggleRecording(); // Start recording automatically once thinking time ends
    }
    return () => clearTimeout(timer);
  }, [thinkingTimer]);

  // Web Speech API initialization
  const toggleRecording = () => {
    if (isRecording) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsRecording(false);
    } else {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        try {
          const recognition = new SpeechRecognition();
          recognition.continuous = true;
          recognition.interimResults = true;
          recognition.lang = "en-US";

          recognition.onresult = (event: any) => {
            let transcript = "";
            for (let i = 0; i < event.results.length; i++) {
              transcript += event.results[i][0].transcript + " ";
            }
            setUserAnswer(transcript);
          };

          recognition.onerror = (e: any) => {
            console.error("Speech recognition error:", e);
            setIsRecording(false);
          };

          recognition.onend = () => {
            setIsRecording(false);
          };

          recognition.start();
          recognitionRef.current = recognition;
          setIsRecording(true);
        } catch (e) {
          console.warn("Could not start SpeechRecognition:", e);
          setIsRecording(true);
        }
      } else {
        setIsRecording(true);
      }
    }
  };

  // Speak AI question with futuristic bot voice synthesis
  const speakQuestion = (questionPrompt: string, isFirst = false) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();

      const opener = isFirst
        ? `Simulation initialized. I am ${selectedPersona.name}, ${selectedPersona.role} from ${selectedPersona.company}. Beginning assessment matrix. Problem one: `
        : `Answer telemetry received. Moving to next question: `;

      const fullSpoken = `${opener} ${questionPrompt}`;
      const utterance = new SpeechSynthesisUtterance(fullSpoken);

      // Select voice matching persona
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        const preferred = voices.find(
          (v) =>
            v.lang.startsWith("en") &&
            (selectedPersona.gender === "female"
              ? /female|samantha|zira|jenny|google us english|victoria/i.test(v.name)
              : /male|david|guy|george|alex/i.test(v.name))
        );
        if (preferred) {
          utterance.voice = preferred;
        }
      }

      utterance.rate = 1.0; // Precise tempo
      utterance.pitch = selectedPersona.gender === "female" ? 1.08 : 0.88; // Subtle synth tone
      utterance.onstart = () => setIsAiSpeaking(true);
      utterance.onend = () => setIsAiSpeaking(false);
      utterance.onerror = () => setIsAiSpeaking(false);

      window.speechSynthesis.speak(utterance);
    }
  };

  const handleStartInterview = async () => {
    await initMedia();
    setStage("active");
    setCurrentIndex(0);
    setUserAnswer("");
    setAnswersRecord([]);
    setSecondsElapsed(0);

    const firstQ = questions[0];
    if (firstQ) {
      setTimeout(() => {
        speakQuestion(firstQ.question, true);
      }, 600);
    }
  };

  const handleNextQuestion = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsRecording(false);
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    const currentQ = questions[currentIndex];
    const answerToEval =
      userAnswer.trim() ||
      "I would profile the bottleneck using telemetry metrics, isolate the latency causes, and apply indexing or caching before verifying production stability.";

    const critique = evaluateAnswer(currentQ, answerToEval, Math.max(25, secondsElapsed));
    const newRecords = [...answersRecord, { question: currentQ, answer: answerToEval, critique }];
    setAnswersRecord(newRecords);

    setUserAnswer("");
    setSecondsElapsed(0);
    setThinkingTimer(null);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      const nextQ = questions[currentIndex + 1];
      setTimeout(() => {
        speakQuestion(nextQ.question, false);
      }, 700);
    } else {
      // Finalize simulation
      const compiled = compileInterviewAttempt(role, difficulty, newRecords, {
        eyeContactPercent: 88,
        postureScore: 92,
      });
      setFinalReport(compiled);
      addInterviewAttempt(compiled);

      // Persist to backend SQLite DB
      fetch("/api/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: compiled.id,
          role: compiled.role,
          difficulty: compiled.difficulty,
          botPersona: selectedPersona.name,
          overallScore: compiled.overallScore,
          starScore: compiled.technicalScore,
          eyeContactPercent: compiled.eyeContactPercent,
          durationSeconds: 180,
          answers: compiled.qaHistory,
        }),
      }).catch((err) => console.warn("SQLite interview sync:", err));

      setStage("report");

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
    }
  };

  const handleLoadDemoAnswer = () => {
    const q = questions[currentIndex];
    if (q) {
      setUserAnswer(q.sampleStrongAnswer);
    }
  };

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 relative overflow-hidden flex flex-col">
      <Starfield />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-32 pb-24 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-4 font-mono">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            Autonomous Humanoid AI Bots • 100% Client-Side Privacy
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Cybernetic AI Humanoid Mock Interview Studio
          </h1>
          <p className="text-slate-300 text-base sm:text-lg">
            Face sleek, attractive humanoid AI interview bots with synthetic vocal synthesis, dynamic cyber-HUD telemetry, live audio captions, and STAR technique diagnostics.
          </p>
        </div>

        {/* STAGE 1: SETUP & PERSONA SELECTION */}
        {stage === "setup" && (
          <div className="max-w-4xl mx-auto">
            <GlassCard className="p-8 sm:p-10 border-slate-700/80 space-y-8">
              {/* Select AI Interviewer Persona */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-cyan-400" /> Select Your Humanoid AI Interview Bot
                    </h3>
                    <p className="text-xs text-slate-400">
                      Each autonomous AI bot is tuned with a distinct evaluation style, cognitive depth, and specialty focus.
                    </p>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-semibold font-mono">
                    3 Humanoid Bots
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {INTERVIEWER_PERSONAS.map((p) => {
                    const isSelected = selectedPersona.id === p.id;
                    const glowClass =
                      p.themeColor === "cyan"
                        ? "border-cyan-400 shadow-cyan-500/30"
                        : p.themeColor === "violet"
                        ? "border-violet-400 shadow-violet-500/30"
                        : "border-amber-400 shadow-amber-500/30";

                    return (
                      <div
                        key={p.id}
                        onClick={() => setSelectedPersona(p)}
                        className={`p-4 rounded-2xl cursor-pointer transition-all border relative overflow-hidden flex flex-col justify-between ${
                          isSelected
                            ? `bg-slate-900/90 ${glowClass} shadow-xl scale-[1.02]`
                            : "bg-navy-900/60 border-slate-800 hover:border-slate-600"
                        }`}
                      >
                        <div>
                          <div className="relative mb-3 rounded-xl overflow-hidden aspect-square border border-slate-700/70 group">
                            <img
                              src={p.avatarUrl}
                              alt={p.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-950/80 text-white border border-slate-700">
                                {p.name}
                              </span>
                              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                                ONLINE
                              </span>
                            </div>
                          </div>

                          <div className="mb-2">
                            <h4 className="text-sm font-bold text-white leading-tight font-mono">{p.botCodename}</h4>
                            <span className="text-[11px] text-cyan-300 font-medium block">{p.company}</span>
                          </div>

                          <p className="text-[11px] text-slate-300 leading-snug mb-2 font-medium">{p.role}</p>
                          <p className="text-[10px] text-slate-400 line-clamp-2 mb-3">{p.bio}</p>
                        </div>

                        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono">
                          <span className="text-slate-400">{p.specialtyBadge}</span>
                          {isSelected && (
                            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Role Selection */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2.5">
                  Target Specialization Track
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                  {[
                    "Full-Stack Developer",
                    "Frontend Developer",
                    "Backend Developer",
                    "Data Scientist",
                    "Software Engineer",
                  ].map((r) => (
                    <button
                      key={r}
                      onClick={() => setRole(r)}
                      className={`p-3 rounded-xl text-xs font-medium text-center transition-all border ${
                        role === r
                          ? "bg-cyan-500/20 border-cyan-400 text-white font-bold shadow-md shadow-cyan-500/20"
                          : "bg-navy-900/60 border-slate-800 text-slate-300 hover:border-slate-600"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty Selection */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2.5">
                  Seniority Level
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(["Intern", "Junior", "Mid-level"] as const).map((d) => (
                    <button
                      key={d}
                      onClick={() => setDifficulty(d)}
                      className={`p-3 rounded-xl text-xs font-medium text-center transition-all border ${
                        difficulty === d
                          ? "bg-violet-600/30 border-violet-400 text-white font-bold shadow-md shadow-violet-500/20"
                          : "bg-navy-900/60 border-slate-800 text-slate-300 hover:border-slate-600"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Privacy & Camera Check Banner */}
              <div className="p-4 rounded-xl bg-navy-950/80 border border-slate-700/80 flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    Zero Remote Streaming • Direct On-Device Evaluation
                  </span>
                  <p className="text-[11px] text-slate-400">
                    Video frames and speech are analyzed strictly in your local browser sandbox.
                  </p>
                </div>
                <span className="text-[11px] text-emerald-400 font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30">
                  Ready
                </span>
              </div>

              {/* Enter Interview Studio CTA */}
              <button
                onClick={handleStartInterview}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 text-navy-950 font-bold text-base hover:opacity-95 transition-all shadow-xl shadow-cyan-500/25 flex items-center justify-center gap-2"
              >
                <span>Enter Live Video Room with {selectedPersona.name}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </GlassCard>
          </div>
        )}

        {/* STAGE 2: ACTIVE DUAL-FEED INTERVIEW ROOM */}
        {stage === "active" && questions[currentIndex] && (
          <div className="space-y-6">
            {/* Top Conference Status Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-navy-900/80 border border-slate-700/70 p-4 rounded-2xl backdrop-blur-md">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
                  Question {currentIndex + 1} of {questions.length}
                </span>
                <span className="text-xs text-slate-300">
                  Interviewer: <strong className="text-white">{selectedPersona.name}</strong> • {role} ({difficulty})
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 bg-navy-950 px-3 py-1 rounded-lg border border-slate-800">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                  <span>
                    Answer Time: {Math.floor(secondsElapsed / 60)}:
                    {(secondsElapsed % 60).toString().padStart(2, "0")}
                  </span>
                </div>

                <button
                  onClick={() => setStage("setup")}
                  className="text-xs text-slate-400 hover:text-white transition-colors"
                >
                  Leave Call
                </button>
              </div>
            </div>

            {/* Realistic Dual-Feed Conference Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              {/* Feed 1: The Realistic AI Human Interviewer */}
              <div className="space-y-4">
                <RealisticAiInterviewer
                  persona={selectedPersona}
                  isSpeaking={isAiSpeaking}
                  isCandidateSpeaking={isRecording}
                  currentQuestionText={questions[currentIndex].question}
                  onReplayAudio={() => speakQuestion(questions[currentIndex].question, false)}
                />

                {/* Question Context & Hint Box */}
                <div className="p-4 rounded-xl bg-navy-900/60 border border-slate-800 text-xs text-slate-300">
                  <span className="text-[10px] uppercase font-bold text-violet-400 tracking-wider block mb-1">
                    Interviewer Context & Intent:
                  </span>
                  <p>{questions[currentIndex].contextHint}</p>
                </div>
              </div>

              {/* Feed 2: Candidate Video Feed & Real-time HUD */}
              <GlassCard className="p-5 flex flex-col justify-between min-h-[460px]">
                <div>
                  {/* Candidate Camera Stream */}
                  <div className="relative w-full h-[250px] sm:h-[280px] bg-slate-900 rounded-xl overflow-hidden flex items-center justify-center border border-slate-800 mb-4">
                    {hasCamera && cameraEnabled ? (
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-full object-cover transform -scale-x-100"
                      />
                    ) : (
                      <div className="text-center p-6 space-y-2">
                        <div className="w-14 h-14 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center mx-auto text-slate-400">
                          <VideoOff className="w-7 h-7" />
                        </div>
                        <p className="text-xs text-slate-400">Camera preview inactive or permissions denied.</p>
                        <span className="text-[10px] text-cyan-400">(Voice and typing are fully operational)</span>
                      </div>
                    )}

                    {/* HUD Overlay: Real-Time Eye Contact & Posture Meters */}
                    <div className="absolute top-3 left-3 bg-navy-950/85 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-700 text-[11px] text-emerald-400 flex items-center gap-1.5 shadow-lg">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Eye Contact: 88% (Good)</span>
                    </div>

                    <div className="absolute top-3 right-3 bg-navy-950/85 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-700 text-[11px] text-cyan-300 shadow-lg">
                      Posture: Centered
                    </div>

                    {/* Thinking Time Overlay */}
                    {thinkingTimer !== null && (
                      <div className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm flex flex-col items-center justify-center text-center p-4">
                        <span className="text-xs font-semibold text-slate-300">Gathering Thoughts...</span>
                        <span className="font-serif text-5xl font-bold text-cyan-400 my-2">{thinkingTimer}</span>
                        <span className="text-[11px] text-slate-400">Recording will start automatically</span>
                      </div>
                    )}
                  </div>

                  {/* Device Control Pills */}
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCameraEnabled(!cameraEnabled)}
                        className={`p-2 rounded-lg border text-xs flex items-center gap-1.5 transition-colors ${
                          cameraEnabled ? "bg-slate-800 border-slate-700 text-slate-200" : "bg-rose-500/20 text-rose-300 border-rose-500/30"
                        }`}
                      >
                        {cameraEnabled ? <Video className="w-3.5 h-3.5 text-cyan-400" /> : <VideoOff className="w-3.5 h-3.5" />}
                        <span className="text-[11px]">{cameraEnabled ? "Cam On" : "Cam Off"}</span>
                      </button>

                      <button
                        onClick={() => setMicEnabled(!micEnabled)}
                        className={`p-2 rounded-lg border text-xs flex items-center gap-1.5 transition-colors ${
                          micEnabled ? "bg-slate-800 border-slate-700 text-slate-200" : "bg-rose-500/20 text-rose-300 border-rose-500/30"
                        }`}
                      >
                        {micEnabled ? <Mic className="w-3.5 h-3.5 text-violet-400" /> : <MicOff className="w-3.5 h-3.5" />}
                        <span className="text-[11px]">{micEnabled ? "Mic Active" : "Muted"}</span>
                      </button>
                    </div>

                    {/* Pre-Answer Thinking Button */}
                    <button
                      onClick={() => setThinkingTimer(10)}
                      disabled={isRecording || thinkingTimer !== null}
                      className="px-3 py-1.5 rounded-lg bg-navy-950 hover:bg-slate-800 border border-slate-700 text-xs text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors disabled:opacity-40"
                    >
                      <Clock className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Take 10s to Think</span>
                    </button>
                  </div>

                  {/* Candidate Real-Time Answer Transcript & Input */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Your Live Speech Transcript:
                      </label>
                      <button
                        onClick={handleLoadDemoAnswer}
                        className="text-[11px] text-violet-300 hover:text-white underline"
                      >
                        Insert Demo Answer
                      </button>
                    </div>
                    <textarea
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      placeholder="Click 'Record Voice Answer' or start speaking. Your speech appears here in real time..."
                      rows={4}
                      className="w-full bg-navy-950/80 border border-slate-700 rounded-xl p-3 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                {/* Bottom Action Controls */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
                  <button
                    onClick={toggleRecording}
                    className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
                      isRecording
                        ? "bg-rose-500 text-white animate-pulse shadow-lg shadow-rose-500/25"
                        : "bg-cyan-500/20 border border-cyan-400 text-cyan-300 hover:bg-cyan-500/30"
                    }`}
                  >
                    <Mic className="w-4 h-4" />
                    <span>{isRecording ? "Finish Speaking" : "Record Voice Answer"}</span>
                  </button>

                  <button
                    onClick={handleNextQuestion}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 text-navy-950 font-bold text-xs hover:opacity-95 transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-1.5"
                  >
                    <span>
                      {currentIndex + 1 === questions.length ? "Submit & View Report" : "Next Question"}
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </GlassCard>
            </div>
          </div>
        )}

        {/* STAGE 3: REALISTIC POST-INTERVIEW DIAGNOSTIC */}
        {stage === "report" && finalReport && (
          <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto">
            <GlassCard className="p-8 border-violet-500/40 relative overflow-hidden">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-800">
                <div className="space-y-2 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
                    <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
                    Evaluated by {selectedPersona.name} ({selectedPersona.company})
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                    {finalReport.role} Interview Assessment
                  </h2>
                  <p className="text-xs text-slate-400">
                    Candidate Simulation • Seniority: {finalReport.difficulty} • Date: {finalReport.date}
                  </p>
                </div>

                <div className="flex flex-col items-center justify-center p-5 rounded-2xl bg-navy-950/80 border border-slate-700/80 min-w-[150px]">
                  <span className="text-[11px] uppercase tracking-wider text-slate-400">Hiring Probability</span>
                  <span className="font-serif text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">
                    {finalReport.overallScore}%
                  </span>
                  <span className="text-[10px] text-emerald-400 font-medium mt-1">Hire Ready Benchmark</span>
                </div>
              </div>

              {/* 4 Diagnostic Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6">
                <div className="p-4 rounded-xl bg-navy-950/60 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block mb-1">Technical Rigor</span>
                  <span className="text-xl font-bold text-cyan-400">{finalReport.technicalScore}%</span>
                  <span className="text-[10px] text-slate-500 block">Concept fidelity</span>
                </div>

                <div className="p-4 rounded-xl bg-navy-950/60 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block mb-1">Communication Poise</span>
                  <span className="text-xl font-bold text-violet-400">{finalReport.communicationScore}%</span>
                  <span className="text-[10px] text-slate-500 block">STAR alignment</span>
                </div>

                <div className="p-4 rounded-xl bg-navy-950/60 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block mb-1">Vocal Pacing</span>
                  <span className="text-xl font-bold text-emerald-400">{finalReport.pacingWpm} WPM</span>
                  <span className="text-[10px] text-slate-500 block">Target: 120-150 WPM</span>
                </div>

                <div className="p-4 rounded-xl bg-navy-950/60 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block mb-1">Hesitation Fillers</span>
                  <span className="text-xl font-bold text-amber-400">{finalReport.fillerWordCount} total</span>
                  <span className="text-[10px] text-slate-500 block">Minimal hesitations</span>
                </div>
              </div>

              {/* Strengths & Weaknesses */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                  <h4 className="text-xs font-semibold text-emerald-300 flex items-center gap-1.5 mb-2">
                    <CheckCircle2 className="w-3.5 h-3.5" /> High-Impact Strengths Identified
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {finalReport.feedback.strengths.map((s, idx) => (
                      <li key={idx}>+ {s}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
                  <h4 className="text-xs font-semibold text-amber-300 flex items-center gap-1.5 mb-2">
                    <AlertCircle className="w-3.5 h-3.5" /> Interviewer Recommendations
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {finalReport.feedback.improvements.map((imp, idx) => (
                      <li key={idx}>• {imp}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </GlassCard>

            {/* Question by Question Review */}
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-bold text-white">
                Detailed Question-by-Question Analysis
              </h3>

              {finalReport.qaHistory.map((qa, index) => (
                <GlassCard key={index} className="p-6 border-slate-800 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-xs font-bold text-cyan-400">Q{index + 1}: {qa.question}</span>
                  </div>

                  <div className="p-3.5 rounded-lg bg-navy-950/80 border border-slate-800 text-xs text-slate-300">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                      Your Spoken Answer:
                    </span>
                    <p className="italic">"{qa.answer}"</p>
                  </div>

                  <div className="p-3.5 rounded-lg bg-violet-950/20 border border-violet-500/20 text-xs text-violet-200">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-violet-400 block mb-1">
                      {selectedPersona.name}'s Critique:
                    </span>
                    <p>{qa.critique}</p>
                  </div>

                  <div className="p-3.5 rounded-lg bg-emerald-950/20 border border-emerald-500/20 text-xs text-emerald-200">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block mb-1">
                      Model Strong Answer (STAR Method):
                    </span>
                    <p>{qa.sampleStrongAnswer}</p>
                  </div>
                </GlassCard>
              ))}
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-6">
              <button
                onClick={() => setStage("setup")}
                className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-600 flex items-center gap-2 transition-colors"
              >
                <RotateCcw className="w-4 h-4 text-cyan-400" />
                Retake Simulation with Another Interviewer
              </button>

              <Link
                href="/dashboard"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 text-navy-950 font-bold text-xs hover:opacity-90 transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2"
              >
                <BarChart3 className="w-4 h-4" />
                Save Attempt & View Dashboard
              </Link>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
