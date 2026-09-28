import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface ScoreBreakdown {
  overall: number; // 0 - 100
  measurableResults: { score: number; max: 30; feedback: string; metricsFound: string[] };
  careerFocus: { score: number; max: 20; feedback: string; targetRole: string; matchedKeywords: string[] };
  projectProof: { score: number; max: 25; feedback: string; linksFound: string[]; projectsCount: number };
  tailoredAlignment: { score: number; max: 25; feedback: string; missingKeywords: string[] };
  atsCheck: { score: number; passed: boolean; issues: string[] };
  strengths: string[];
  weaknesses: string[];
  actionItems: { priority: "High" | "Medium" | "Low"; title: string; description: string }[];
  rewrittenBullets?: { original: string; improved: string; reason: string }[];
}

export interface InterviewAttempt {
  id: string;
  date: string;
  role: string;
  difficulty: "Intern" | "Junior" | "Mid-level";
  overallScore: number;
  technicalScore: number;
  communicationScore: number;
  pacingWpm: number;
  fillerWordCount: number;
  eyeContactPercent: number;
  postureScore: number;
  feedback: {
    summary: string;
    strengths: string[];
    improvements: string[];
  };
  qaHistory: {
    question: string;
    answer: string;
    critique: string;
    sampleStrongAnswer: string;
  }[];
}

export interface ProgressDataPoint {
  date: string;
  score: number;
  role: string;
  label: string;
}

interface AxiomStoreState {
  // Resume state
  resumeText: string;
  resumeFileName: string;
  selectedRole: string;
  targetJobDescription: string;
  scoreResult: ScoreBreakdown | null;
  isAnalyzingResume: boolean;

  // History / Progress
  scoreHistory: ProgressDataPoint[];
  interviewHistory: InterviewAttempt[];
  savedCertifications: string[];

  // Actions
  setResumeData: (text: string, fileName: string) => void;
  setSelectedRole: (role: string) => void;
  setTargetJobDescription: (jd: string) => void;
  setScoreResult: (result: ScoreBreakdown | null) => void;
  setIsAnalyzingResume: (val: boolean) => void;
  addScoreToHistory: (score: number, role: string) => void;
  addInterviewAttempt: (attempt: InterviewAttempt) => void;
  toggleSavedCertification: (certId: string) => void;
  resetResume: () => void;
}

const defaultProgress: ProgressDataPoint[] = [
  { date: "Day 1", score: 52, role: "Frontend Dev", label: "Initial Upload" },
  { date: "Day 3", score: 64, role: "Frontend Dev", label: "Action Verbs" },
  { date: "Day 6", score: 71, role: "Frontend Dev", label: "Quantified Impact" },
  { date: "Day 10", score: 83, role: "Frontend Dev", label: "Role Tailoring" },
];

export const useAxiomStore = create<AxiomStoreState>()(
  persist(
    (set, get) => ({
      resumeText: "",
      resumeFileName: "",
      selectedRole: "Full-Stack Developer",
      targetJobDescription: "",
      scoreResult: null,
      isAnalyzingResume: false,

      scoreHistory: defaultProgress,
      interviewHistory: [],
      savedCertifications: [],

      setResumeData: (text, fileName) => set({ resumeText: text, resumeFileName: fileName }),
      setSelectedRole: (role) => set({ selectedRole: role }),
      setTargetJobDescription: (jd) => set({ targetJobDescription: jd }),
      setScoreResult: (result) => set({ scoreResult: result }),
      setIsAnalyzingResume: (val) => set({ isAnalyzingResume: val }),

      addScoreToHistory: (score, role) => {
        const today = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" });
        set((state) => ({
          scoreHistory: [
            ...state.scoreHistory,
            { date: today, score, role, label: `Revision #${state.scoreHistory.length + 1}` },
          ],
        }));
      },

      addInterviewAttempt: (attempt) => {
        set((state) => ({
          interviewHistory: [attempt, ...state.interviewHistory],
        }));
      },

      toggleSavedCertification: (certId) => {
        set((state) => {
          const exists = state.savedCertifications.includes(certId);
          return {
            savedCertifications: exists
              ? state.savedCertifications.filter((id) => id !== certId)
              : [...state.savedCertifications, certId],
          };
        });
      },

      resetResume: () =>
        set({
          resumeText: "",
          resumeFileName: "",
          scoreResult: null,
        }),
    }),
    {
      name: "axiom-storage-v1",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        selectedRole: state.selectedRole,
        scoreHistory: state.scoreHistory,
        interviewHistory: state.interviewHistory,
        savedCertifications: state.savedCertifications,
      }),
    }
  )
);
