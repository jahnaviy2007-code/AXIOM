import { NextResponse } from "next/server";
import { getAllInterviews, saveInterview } from "@/lib/db/sqlite";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const records = getAllInterviews();
    return NextResponse.json({ success: true, count: records.length, data: records });
  } catch (error: any) {
    console.error("SQLite GET /api/interview error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch interview history" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body || !body.id) {
      return NextResponse.json(
        { success: false, error: "Interview attempt id is required" },
        { status: 400 }
      );
    }

    const saved = saveInterview({
      id: body.id,
      role: body.role || "Full-Stack Developer",
      difficulty: body.difficulty || "Junior",
      bot_persona: body.botPersona || body.persona?.name || "NEXUS-01",
      overall_score: body.overallScore || body.score || 80,
      star_score: body.starScore || 85,
      eye_contact_score: body.eyeContactPercent || body.eyeContactScore || 88,
      duration_seconds: body.durationSeconds || body.duration || 120,
      answers_json: typeof body.answers === "string" ? body.answers : JSON.stringify(body.answers || []),
    });

    return NextResponse.json({
      success: true,
      message: "Interview session persisted to SQLite DB",
      data: saved,
    });
  } catch (error: any) {
    console.error("SQLite POST /api/interview error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to save interview session" },
      { status: 500 }
    );
  }
}
