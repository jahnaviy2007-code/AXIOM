import { NextResponse } from "next/server";
import { evaluateAnswerWithGroq } from "@/lib/llm/groqClient";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { question, answer, role, category } = body;

    if (!question || !answer) {
      return NextResponse.json(
        { success: false, error: "Question and answer are required" },
        { status: 400 }
      );
    }

    const evaluation = await evaluateAnswerWithGroq(
      question,
      answer,
      role || "Full-Stack Developer",
      category || "Technical"
    );

    if (!evaluation) {
      return NextResponse.json({
        success: false,
        source: "fallback",
        message: "Groq offline or unavailable, fallback recommended",
      });
    }

    return NextResponse.json({
      success: true,
      source: "groq",
      evaluation,
    });
  } catch (error: any) {
    console.error("POST /api/ai/evaluate-answer error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to evaluate answer" },
      { status: 500 }
    );
  }
}
