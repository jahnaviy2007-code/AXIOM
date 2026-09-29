import { NextResponse } from "next/server";
import { rewriteBulletWithGroq } from "@/lib/llm/groqClient";
import { generateBulletRewrite } from "@/lib/llm/ruleBasedFallback";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { bullet, roleTitle } = body;

    if (!bullet) {
      return NextResponse.json(
        { success: false, error: "Bullet is required" },
        { status: 400 }
      );
    }

    const groqRewrite = await rewriteBulletWithGroq(bullet, roleTitle || "Software Engineer");

    if (groqRewrite) {
      return NextResponse.json({
        success: true,
        source: "groq",
        data: groqRewrite,
      });
    }

    // Graceful fallback to rule-based engine
    const fallbackRewrite = generateBulletRewrite(bullet, roleTitle || "Software Engineer");
    return NextResponse.json({
      success: true,
      source: "rule-based",
      data: fallbackRewrite,
    });
  } catch (error: any) {
    console.error("POST /api/ai/rewrite-bullet error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to rewrite bullet" },
      { status: 500 }
    );
  }
}
