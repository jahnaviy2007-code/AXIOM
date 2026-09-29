/**
 * Groq AI Client for AXIOM
 * Supercharged fast inference using Groq API
 */

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_MODEL = process.env.GROQ_MODEL || "qwen/qwen3.8-27b";

interface GroqMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export async function callGroqChat(
  messages: GroqMessage[],
  jsonMode: boolean = false,
  temperature: number = 0.3
): Promise<string | null> {
  if (!GROQ_API_KEY) {
    return null;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    const bodyPayload: any = {
      model: GROQ_MODEL,
      messages,
      temperature,
    };

    if (jsonMode) {
      bodyPayload.response_format = { type: "json_object" };
    }

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
        "User-Agent": "AxiomApp/1.0",
      },
      body: JSON.stringify(bodyPayload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      console.warn(`Groq API error: ${res.status} ${res.statusText}`);
      return null;
    }

    const data = await res.json();
    return data?.choices?.[0]?.message?.content || null;
  } catch (err) {
    console.warn("Groq request failed, using local engine:", err);
    return null;
  }
}

export interface GroqAnswerEvaluation {
  technicalScore: number;
  communicationScore: number;
  summary: string;
  strengths: string[];
  improvements: string[];
  followUpTip?: string;
}

export async function evaluateAnswerWithGroq(
  question: string,
  answer: string,
  role: string = "Full-Stack Developer",
  category: string = "Technical"
): Promise<GroqAnswerEvaluation | null> {
  const prompt = [
    {
      role: "system" as const,
      content: `You are an elite Silicon Valley technical interviewer and interview coach assessing a candidate for a ${role} position.
Evaluate the candidate's spoken/written answer to the ${category} question.
Output strictly valid JSON with this exact schema:
{
  "technicalScore": <number between 30 and 99>,
  "communicationScore": <number between 40 and 99>,
  "summary": "<2-3 sentence incisive professional critique>",
  "strengths": ["<strength 1>", "<strength 2>"],
  "improvements": ["<actionable improvement 1>", "<actionable improvement 2>"],
  "followUpTip": "<concise high-yield tip for answering this in real interview>"
}`,
    },
    {
      role: "user" as const,
      content: `Question: "${question}"\n\nCandidate Answer: "${answer}"`,
    },
  ];

  const rawJson = await callGroqChat(prompt, true, 0.2);
  if (!rawJson) return null;

  try {
    const parsed = JSON.parse(rawJson);
    return {
      technicalScore: Math.min(99, Math.max(30, Number(parsed.technicalScore) || 75)),
      communicationScore: Math.min(99, Math.max(40, Number(parsed.communicationScore) || 80)),
      summary: String(parsed.summary || "Delivered answer evaluated by Groq AI."),
      strengths: Array.isArray(parsed.strengths) ? parsed.strengths.slice(0, 3) : ["Good attempt."],
      improvements: Array.isArray(parsed.improvements)
        ? parsed.improvements.slice(0, 3)
        : ["Elaborate further with concrete examples."],
      followUpTip: parsed.followUpTip ? String(parsed.followUpTip) : undefined,
    };
  } catch (e) {
    console.error("Failed to parse Groq response JSON:", e);
    return null;
  }
}

export async function rewriteBulletWithGroq(
  bullet: string,
  roleTitle: string
): Promise<{ original: string; improved: string; reason: string } | null> {
  const prompt = [
    {
      role: "system" as const,
      content: `You are an executive resume writer for top tech companies (Google, Meta, Apple).
Rewrite the given resume bullet for a ${roleTitle} role using Google XYZ formula (Accomplished [X] as measured by [Y], by doing [Z]) with strong action verbs and quantified impact.
Return strictly JSON:
{
  "improved": "<single rewritten bullet without markdown bullets>",
  "reason": "<1 concise sentence explaining the strategic improvement>"
}`,
    },
    {
      role: "user" as const,
      content: `Original bullet: "${bullet}"`,
    },
  ];

  const rawJson = await callGroqChat(prompt, true, 0.3);
  if (!rawJson) return null;

  try {
    const parsed = JSON.parse(rawJson);
    if (parsed.improved) {
      return {
        original: bullet,
        improved: parsed.improved,
        reason: parsed.reason || "Enhanced with quantified business metrics and leadership verbs via Groq AI.",
      };
    }
  } catch (e) {
    console.error("Error parsing Groq bullet rewrite:", e);
  }
  return null;
}
