import { InterviewQuestion } from "./questionBank";
import { InterviewAttempt } from "@/store/useAxiomStore";

export interface CritiqueResult {
  technicalScore: number;
  communicationScore: number;
  pacingWpm: number;
  fillerWordCount: number;
  fillerWordsFound: string[];
  starAlignmentScore: number;
  summary: string;
  strengths: string[];
  improvements: string[];
  modelAnswer: string;
}

const FILLER_WORDS = ["um", "uh", "like", "you know", "basically", "actually", "literally", "sort of", "kind of"];

export function evaluateAnswer(
  question: InterviewQuestion,
  answerText: string,
  durationSeconds: number = 60
): CritiqueResult {
  const words = answerText.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  // Words per minute (defaulting to reasonable bounds if duration is small)
  const effectiveMinutes = Math.max(0.5, durationSeconds / 60);
  const pacingWpm = Math.round(wordCount / effectiveMinutes);

  // Filler words
  const normalized = answerText.toLowerCase();
  const fillerWordsFound: string[] = [];
  let fillerCount = 0;

  for (const filler of FILLER_WORDS) {
    const matches = normalized.match(new RegExp(`\\b${filler}\\b`, "gi"));
    if (matches) {
      fillerCount += matches.length;
      fillerWordsFound.push(`${filler} (${matches.length}x)`);
    }
  }

  // Key expected points check
  let matchedPoints = 0;
  for (const pt of question.keyPointsExpected) {
    const keywords = pt.toLowerCase().split(/\s+/).filter((w) => w.length > 4);
    const hit = keywords.some((kw) => normalized.includes(kw));
    if (hit) matchedPoints++;
  }

  const pointRatio = question.keyPointsExpected.length > 0
    ? matchedPoints / question.keyPointsExpected.length
    : 0.7;

  // STAR Method detection (for behavioral)
  let starScore = 70;
  if (question.category === "Behavioral") {
    const hasSituation = /(?:when|during|at my|in our|project|time)/i.test(normalized);
    const hasAction = /(?:i led|i built|i designed|i investigated|i implemented|i resolved|i did)/i.test(normalized);
    const hasResult = /(?:result|outcome|improved|reduced|increased|successfully|achieved|learned)/i.test(normalized);
    starScore = (hasSituation ? 30 : 10) + (hasAction ? 40 : 15) + (hasResult ? 30 : 10);
  }

  // Scoring
  let technicalScore = Math.round(50 + pointRatio * 45);
  if (wordCount < 25) technicalScore = Math.max(35, technicalScore - 25);
  technicalScore = Math.min(98, Math.max(30, technicalScore));

  let commScore = 85;
  if (pacingWpm > 180) commScore -= 12; // too fast
  if (pacingWpm < 90 && wordCount > 10) commScore -= 10; // too slow
  if (fillerCount > 5) commScore -= Math.min(20, fillerCount * 2);
  commScore = Math.min(98, Math.max(40, commScore));

  // Strengths & Improvements
  const strengths: string[] = [];
  const improvements: string[] = [];

  if (pacingWpm >= 110 && pacingWpm <= 160) {
    strengths.push(`Excellent pacing at ${pacingWpm} WPM (ideal professional cadence is 120-150 WPM).`);
  } else if (pacingWpm > 160) {
    improvements.push(`Fast conversational tempo (${pacingWpm} WPM). Pause briefly after key insights to let the interviewer absorb them.`);
  } else {
    improvements.push(`Deliberate pacing (${pacingWpm} WPM). Elaborate further on practical examples to demonstrate domain depth.`);
  }

  if (fillerCount <= 2) {
    strengths.push("High vocal clarity with minimal hesitation fillers.");
  } else {
    improvements.push(`Detected ${fillerCount} filler words (${fillerWordsFound.slice(0, 3).join(", ")}). Practice pausing silently instead of uttering filler sounds.`);
  }

  if (pointRatio >= 0.6) {
    strengths.push(`Addressed core conceptual elements including ${question.keyPointsExpected[0]}.`);
  } else {
    improvements.push(`Incorporate explicit discussion of: "${question.keyPointsExpected.slice(0, 2).join('" and "')}".`);
  }

  if (question.category === "Behavioral" && starScore >= 75) {
    strengths.push("Followed the STAR method cleanly with identifiable context, initiative, and outcomes.");
  }

  const summary = `Delivered a ${wordCount}-word response addressing ${matchedPoints}/${question.keyPointsExpected.length} primary technical benchmarks with ${commScore}% communication poise.`;

  return {
    technicalScore,
    communicationScore: commScore,
    pacingWpm,
    fillerWordCount: fillerCount,
    fillerWordsFound,
    starAlignmentScore: starScore,
    summary,
    strengths,
    improvements,
    modelAnswer: question.sampleStrongAnswer,
  };
}

export function compileInterviewAttempt(
  role: string,
  difficulty: "Intern" | "Junior" | "Mid-level",
  results: {
    question: InterviewQuestion;
    answer: string;
    critique: CritiqueResult;
  }[],
  webcamMetrics: { eyeContactPercent: number; postureScore: number }
): InterviewAttempt {
  const avgTech = Math.round(
    results.reduce((acc, r) => acc + r.critique.technicalScore, 0) / Math.max(1, results.length)
  );
  const avgComm = Math.round(
    results.reduce((acc, r) => acc + r.critique.communicationScore, 0) / Math.max(1, results.length)
  );
  const totalFillers = results.reduce((acc, r) => acc + r.critique.fillerWordCount, 0);
  const avgWpm = Math.round(
    results.reduce((acc, r) => acc + r.critique.pacingWpm, 0) / Math.max(1, results.length)
  );

  const overall = Math.round(
    avgTech * 0.45 +
      avgComm * 0.35 +
      (webcamMetrics.eyeContactPercent || 80) * 0.1 +
      (webcamMetrics.postureScore || 85) * 0.1
  );

  const allStrengths = Array.from(new Set(results.flatMap((r) => r.critique.strengths))).slice(0, 4);
  const allImprovements = Array.from(new Set(results.flatMap((r) => r.critique.improvements))).slice(0, 4);

  return {
    id: `interview-${Date.now()}`,
    date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    role,
    difficulty,
    overallScore: Math.min(99, Math.max(35, overall)),
    technicalScore: avgTech,
    communicationScore: avgComm,
    pacingWpm: avgWpm,
    fillerWordCount: totalFillers,
    eyeContactPercent: webcamMetrics.eyeContactPercent,
    postureScore: webcamMetrics.postureScore,
    feedback: {
      summary: `Completed a ${results.length}-question ${difficulty} ${role} simulation. Demonstrates solid technical foundation with strong communication upside.`,
      strengths: allStrengths,
      improvements: allImprovements,
    },
    qaHistory: results.map((r) => ({
      question: r.question.question,
      answer: r.answer,
      critique: r.critique.summary,
      sampleStrongAnswer: r.critique.modelAnswer,
    })),
  };
}
