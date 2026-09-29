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

  // Request camera and mic stream with graceful fallbacks
  const initMedia = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Stop any old stream tracks first
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((t) => t.stop());
          streamRef.current = null;
        }

        let stream: MediaStream | null = null;
        try {
          // Attempt standard video + audio
          stream = await navigator.mediaDevices.getUserMedia({
            video: {
              width: { ideal: 1280 },
              height: { ideal: 720 },
              facingMode: "user",
            },
            audio: true,
          });
        } catch (dualErr) {
          console.warn("Dual video+audio request failed, attempting video-only fallback:", dualErr);
          try {
            stream = await navigator.mediaDevices.getUserMedia({
              video: true,
            });
          } catch (vidErr) {
            console.warn("Video-only request also failed:", vidErr);
          }
        }

        if (stream) {
          streamRef.current = stream;
          setHasCamera(true);
          setCameraEnabled(true);
          setHasMic(stream.getAudioTracks().length > 0);

          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play().catch((e) => console.warn("Play error:", e));
          }
        } else {
          setHasCamera(false);
        }
      }
    } catch (err) {
      console.warn("Camera or microphone permission was not granted or device not found:", err);
      setHasCamera(false);
    }
  };

  // Ensure video stream is attached whenever the active video element is mounted in DOM
  useEffect(() => {
    if (stage === "active") {
      if (!streamRef.current) {
        initMedia();
      } else if (videoRef.current) {
        if (videoRef.current.srcObject !== streamRef.current) {
          videoRef.current.srcObject = streamRef.current;
        }
        videoRef.current.play().catch((e) => console.warn("Video play error:", e));
      }
    }
  }, [stage, cameraEnabled, hasCamera]);

  const toggleCamera = () => {
    const nextState = !cameraEnabled;
    setCameraEnabled(nextState);
    if (streamRef.current) {
      streamRef.current.getVideoTracks().forEach((track) => {
        track.enabled = nextState;
      });
    }
    if (nextState && !hasCamera) {
      initMedia();
    }
  };

  const toggleMic = () => {
    const nextState = !micEnabled;
    setMicEnabled(nextState);
    if (streamRef.current) {
      streamRef.current.getAudioTracks().forEach((track) => {
        track.enabled = nextState;
      });
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
    <div className="min-h-screen bg-white text-[#4B5563] relative overflow-hidden flex flex-col">
      <Starfield />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-32 pb-24 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-4 font-mono">
            <Sparkles className="w-4 h-4 text-blue-600" />
            Autonomous Humanoid AI Bots • 100% Client-Side Privacy
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#111827] mb-4">
            Cybernetic AI Humanoid Mock Interview Studio
          </h1>
          <p className="text-[#4B5563] text-base sm:text-lg">
            Face sleek, attractive humanoid AI interview bots with synthetic vocal synthesis, dynamic cyber-HUD telemetry, live audio captions, and STAR technique diagnostics.
          </p>
        </div>

        {/* STAGE 1: SETUP & PERSONA SELECTION */}
        {stage === "setup" && (
          <div className="max-w-4xl mx-auto">
            <GlassCard className="p-8 sm:p-10 border-[#E5E7EB] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)] space-y-8">
              {/* Select AI Interviewer Persona */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-base font-bold text-[#111827] flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-blue-600" /> Select Your Humanoid AI Interview Bot
                    </h3>
                    <p className="text-xs text-[#6B7280]">
                      Each autonomous AI bot is tuned with a distinct evaluation style, cognitive depth, and specialty focus.
                    </p>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-semibold font-mono">
                    3 Humanoid Bots
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {INTERVIEWER_PERSONAS.map((p) => {
                    const isSelected = selectedPersona.id === p.id;

                    return (
                      <div
                        key={p.id}
                        onClick={() => setSelectedPersona(p)}
                        className={`p-4 rounded-2xl cursor-pointer transition-all border relative overflow-hidden flex flex-col justify-between ${
                          isSelected
                            ? "bg-blue-50/60 border-blue-600 shadow-md ring-2 ring-blue-500/20 scale-[1.02]"
                            : "bg-white border-[#E5E7EB] hover:border-gray-300 hover:shadow-sm"
                        }`}
                      >
                        <div>
                          <div className="relative mb-3 rounded-xl overflow-hidden aspect-square border border-[#E5E7EB] group">
                            <img
                              src={p.avatarUrl}
                              alt={p.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent" />
                            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-gray-900/90 text-white border border-gray-700">
                                {p.name}
                              </span>
                              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                                ONLINE
                              </span>
                            </div>
                          </div>

                          <div className="mb-2">
                            <h4 className="text-sm font-bold text-[#111827] leading-tight font-mono">{p.botCodename}</h4>
                            <span className="text-[11px] text-blue-600 font-medium block">{p.company}</span>
                          </div>

                          <p className="text-[11px] text-[#4B5563] leading-snug mb-2 font-medium">{p.role}</p>
                          <p className="text-[10px] text-[#6B7280] line-clamp-2 mb-3">{p.bio}</p>
                        </div>

                        <div className="pt-2 border-t border-[#E5E7EB] flex items-center justify-between text-[10px] font-mono">
                          <span className="text-[#6B7280]">{p.specialtyBadge}</span>
                          {isSelected && (
                            <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Role Selection */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-[#6B7280] block mb-2.5">
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
                          ? "bg-blue-600 text-white font-bold border-blue-600 shadow-sm"
                          : "bg-[#F9FAFB] border-[#E5E7EB] text-[#4B5563] hover:bg-gray-100 hover:text-[#111827]"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty Selection */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-[#6B7280] block mb-2.5">
                  Seniority Level
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(["Intern", "Junior", "Mid-level"] as const).map((d) => (
                    <button
                      key={d}
                      onClick={() => setDifficulty(d)}
                      className={`p-3 rounded-xl text-xs font-medium text-center transition-all border ${
                        difficulty === d
                          ? "bg-indigo-600 text-white font-bold border-indigo-600 shadow-sm"
                          : "bg-[#F9FAFB] border-[#E5E7EB] text-[#4B5563] hover:bg-gray-100 hover:text-[#111827]"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Privacy & Camera Check Banner */}
              <div className="p-4 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-[#111827] flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    Zero Remote Streaming • Direct On-Device Evaluation
                  </span>
                  <p className="text-[11px] text-[#6B7280]">
                    Video frames and speech are analyzed strictly in your local browser sandbox.
                  </p>
                </div>
                <span className="text-[11px] text-emerald-700 font-semibold px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200">
                  Ready
                </span>
              </div>

              {/* Enter Interview Studio CTA */}
              <button
                onClick={handleStartInterview}
                className="w-full py-4 rounded-xl bg-gray-900 hover:bg-black text-white font-bold text-base transition-all shadow-[0_1px_3px_rgba(0,0,0,0.08)] flex items-center justify-center gap-2"
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
            <div className="flex flex-wrap items-center justify-between gap-4 bg-white border border-[#E5E7EB] p-4 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700">
                  Question {currentIndex + 1} of {questions.length}
                </span>
                <span className="text-xs text-[#4B5563]">
                  Interviewer: <strong className="text-[#111827]">{selectedPersona.name}</strong> • {role} ({difficulty})
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-xs font-mono text-blue-700 bg-[#F9FAFB] px-3 py-1 rounded-lg border border-[#E5E7EB]">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                  <span>
                    Answer Time: {Math.floor(secondsElapsed / 60)}:
                    {(secondsElapsed % 60).toString().padStart(2, "0")}
                  </span>
                </div>

                <button
                  onClick={() => setStage("setup")}
                  className="text-xs text-[#6B7280] hover:text-rose-600 transition-colors"
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
                <div className="p-4 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] text-xs text-[#4B5563]">
                  <span className="text-[10px] uppercase font-bold text-indigo-600 tracking-wider block mb-1">
                    Interviewer Context & Intent:
                  </span>
                  <p>{questions[currentIndex].contextHint}</p>
                </div>
              </div>

              {/* Feed 2: Candidate Video Feed & Real-time HUD */}
              <GlassCard className="p-5 flex flex-col justify-between min-h-[460px] bg-white border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                <div>
                  {/* Candidate Camera Stream */}
                  <div className="relative w-full h-[250px] sm:h-[280px] bg-gray-900 rounded-xl overflow-hidden flex items-center justify-center border border-gray-800 mb-4">
                    {hasCamera && cameraEnabled ? (
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        onLoadedMetadata={() => {
                          if (videoRef.current) {
                            videoRef.current.play().catch((e) => console.warn("Video metadata play:", e));
                          }
                        }}
                        className="w-full h-full object-cover transform -scale-x-100"
                      />
                    ) : (
                      <div className="text-center p-6 space-y-3">
                        <div className="w-14 h-14 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center mx-auto text-gray-400">
                          <VideoOff className="w-7 h-7" />
                        </div>
                        <p className="text-xs text-gray-300 font-medium">Camera is inactive or permissions denied.</p>
                        <button
                          onClick={initMedia}
                          className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-sm transition-colors inline-flex items-center gap-1.5"
                        >
                          <Video className="w-3.5 h-3.5" />
                          <span>Enable / Reconnect Camera</span>
                        </button>
                        <span className="text-[10px] text-gray-400 block">(Voice and typing are fully operational)</span>
                      </div>
                    )}

                    {/* HUD Overlay: Real-Time Eye Contact & Posture Meters */}
                    <div className="absolute top-3 left-3 bg-gray-950/85 backdrop-blur-md px-2.5 py-1 rounded-lg border border-gray-700 text-[11px] text-emerald-400 flex items-center gap-1.5 shadow-lg">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Eye Contact: 88% (Good)</span>
                    </div>

                    <div className="absolute top-3 right-3 bg-gray-950/85 backdrop-blur-md px-2.5 py-1 rounded-lg border border-gray-700 text-[11px] text-blue-300 shadow-lg">
                      Posture: Centered
                    </div>

                    {/* Thinking Time Overlay */}
                    {thinkingTimer !== null && (
                      <div className="absolute inset-0 bg-gray-950/80 backdrop-blur-sm flex flex-col items-center justify-center text-center p-4">
                        <span className="text-xs font-semibold text-gray-300">Gathering Thoughts...</span>
                        <span className="font-serif text-5xl font-bold text-blue-400 my-2">{thinkingTimer}</span>
                        <span className="text-[11px] text-gray-400">Recording will start automatically</span>
                      </div>
                    )}
                  </div>

                  {/* Device Control Pills */}
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E5E7EB]">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={toggleCamera}
                        className={`p-2 rounded-lg border text-xs flex items-center gap-1.5 transition-colors ${
                          cameraEnabled && hasCamera ? "bg-[#F9FAFB] border-[#E5E7EB] text-[#4B5563] hover:bg-gray-100" : "bg-rose-50 text-rose-700 border-rose-200"
                        }`}
                      >
                        {cameraEnabled && hasCamera ? <Video className="w-3.5 h-3.5 text-blue-600" /> : <VideoOff className="w-3.5 h-3.5" />}
                        <span className="text-[11px]">{cameraEnabled && hasCamera ? "Cam On" : "Cam Off"}</span>
                      </button>

                      <button
                        onClick={toggleMic}
                        className={`p-2 rounded-lg border text-xs flex items-center gap-1.5 transition-colors ${
                          micEnabled && hasMic ? "bg-[#F9FAFB] border-[#E5E7EB] text-[#4B5563] hover:bg-gray-100" : "bg-rose-50 text-rose-700 border-rose-200"
                        }`}
                      >
                        {micEnabled && hasMic ? <Mic className="w-3.5 h-3.5 text-indigo-600" /> : <MicOff className="w-3.5 h-3.5" />}
                        <span className="text-[11px]">{micEnabled && hasMic ? "Mic Active" : "Muted"}</span>
                      </button>
                    </div>

                    {/* Pre-Answer Thinking Button */}
                    <button
                      onClick={() => setThinkingTimer(10)}
                      disabled={isRecording || thinkingTimer !== null}
                      className="px-3 py-1.5 rounded-lg bg-[#F9FAFB] hover:bg-gray-100 border border-[#E5E7EB] text-xs text-[#4B5563] hover:text-[#111827] flex items-center gap-1.5 transition-colors disabled:opacity-40"
                    >
                      <Clock className="w-3.5 h-3.5 text-blue-600" />
                      <span>Take 10s to Think</span>
                    </button>
                  </div>

                  {/* Candidate Real-Time Answer Transcript & Input */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-[#111827] flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-blue-600" /> Your Live Speech Transcript:
                      </label>
                      <button
                        onClick={handleLoadDemoAnswer}
                        className="text-[11px] text-blue-600 hover:text-blue-800 underline"
                      >
                        Insert Demo Answer
                      </button>
                    </div>
                    <textarea
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      placeholder="Click 'Record Voice Answer' or start speaking. Your speech appears here in real time..."
                      rows={4}
                      className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-3 text-xs text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                {/* Bottom Action Controls */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#E5E7EB]">
                  <button
                    onClick={toggleRecording}
                    className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
                      isRecording
                        ? "bg-rose-500 text-white animate-pulse shadow-md shadow-rose-500/20"
                        : "bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100"
                    }`}
                  >
                    <Mic className="w-4 h-4" />
                    <span>{isRecording ? "Finish Speaking" : "Record Voice Answer"}</span>
                  </button>

                  <button
                    onClick={handleNextQuestion}
                    className="px-6 py-2.5 rounded-xl bg-gray-900 hover:bg-black text-white font-bold text-xs transition-all shadow-[0_1px_3px_rgba(0,0,0,0.08)] flex items-center gap-1.5"
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
            <GlassCard className="p-8 border-[#E5E7EB] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)] relative overflow-hidden">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-[#E5E7EB]">
                <div className="space-y-2 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
                    <UserCheck className="w-3.5 h-3.5 text-blue-600" />
                    Evaluated by {selectedPersona.name} ({selectedPersona.company})
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111827]">
                    {finalReport.role} Interview Assessment
                  </h2>
                  <p className="text-xs text-[#6B7280]">
                    Candidate Simulation • Seniority: {finalReport.difficulty} • Date: {finalReport.date}
                  </p>
                </div>

                <div className="flex flex-col items-center justify-center p-5 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] min-w-[150px]">
                  <span className="text-[11px] uppercase tracking-wider text-[#6B7280]">Hiring Probability</span>
                  <span className="font-serif text-4xl font-bold text-blue-600">
                    {finalReport.overallScore}%
                  </span>
                  <span className="text-[10px] text-emerald-600 font-semibold mt-1">Hire Ready Benchmark</span>
                </div>
              </div>

              {/* 4 Diagnostic Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6">
                <div className="p-4 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB]">
                  <span className="text-[10px] text-[#6B7280] block mb-1">Technical Rigor</span>
                  <span className="text-xl font-bold text-blue-600">{finalReport.technicalScore}%</span>
                  <span className="text-[10px] text-[#9CA3AF] block">Concept fidelity</span>
                </div>

                <div className="p-4 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB]">
                  <span className="text-[10px] text-[#6B7280] block mb-1">Communication Poise</span>
                  <span className="text-xl font-bold text-indigo-600">{finalReport.communicationScore}%</span>
                  <span className="text-[10px] text-[#9CA3AF] block">STAR alignment</span>
                </div>

                <div className="p-4 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB]">
                  <span className="text-[10px] text-[#6B7280] block mb-1">Vocal Pacing</span>
                  <span className="text-xl font-bold text-emerald-600">{finalReport.pacingWpm} WPM</span>
                  <span className="text-[10px] text-[#9CA3AF] block">Target: 120-150 WPM</span>
                </div>

                <div className="p-4 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB]">
                  <span className="text-[10px] text-[#6B7280] block mb-1">Hesitation Fillers</span>
                  <span className="text-xl font-bold text-amber-600">{finalReport.fillerWordCount} total</span>
                  <span className="text-[10px] text-[#9CA3AF] block">Minimal hesitations</span>
                </div>
              </div>

              {/* Strengths & Weaknesses */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                  <h4 className="text-xs font-semibold text-emerald-900 flex items-center gap-1.5 mb-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> High-Impact Strengths Identified
                  </h4>
                  <ul className="space-y-1.5 text-xs text-emerald-800">
                    {finalReport.feedback.strengths.map((s, idx) => (
                      <li key={idx}>+ {s}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                  <h4 className="text-xs font-semibold text-amber-900 flex items-center gap-1.5 mb-2">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600" /> Interviewer Recommendations
                  </h4>
                  <ul className="space-y-1.5 text-xs text-amber-800">
                    {finalReport.feedback.improvements.map((imp, idx) => (
                      <li key={idx}>• {imp}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </GlassCard>

            {/* Question by Question Review */}
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#111827]">
                Detailed Question-by-Question Analysis
              </h3>

              {finalReport.qaHistory.map((qa, index) => (
                <GlassCard key={index} className="p-6 border-[#E5E7EB] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)] space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-xs font-bold text-blue-600">Q{index + 1}: {qa.question}</span>
                  </div>

                  <div className="p-3.5 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] text-xs text-[#4B5563]">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280] block mb-1">
                      Your Spoken Answer:
                    </span>
                    <p className="italic">"{qa.answer}"</p>
                  </div>

                  <div className="p-3.5 rounded-lg bg-indigo-50/60 border border-indigo-200 text-xs text-indigo-950">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 block mb-1">
                      {selectedPersona.name}'s Critique:
                    </span>
                    <p>{qa.critique}</p>
                  </div>

                  <div className="p-3.5 rounded-lg bg-emerald-50/60 border border-emerald-200 text-xs text-emerald-950">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block mb-1">
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
                className="px-6 py-3 rounded-xl bg-white hover:bg-gray-50 text-[#4B5563] hover:text-[#111827] font-semibold text-xs border border-[#E5E7EB] flex items-center gap-2 transition-colors shadow-sm"
              >
                <RotateCcw className="w-4 h-4 text-blue-600" />
                Retake Simulation with Another Interviewer
              </button>

              <Link
                href="/dashboard"
                className="px-6 py-3 rounded-xl bg-gray-900 hover:bg-black text-white font-bold text-xs transition-all shadow-[0_1px_3px_rgba(0,0,0,0.08)] flex items-center gap-2"
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
