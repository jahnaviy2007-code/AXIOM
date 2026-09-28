import { NextResponse } from "next/server";
import { getAllResumes, saveResume, deleteResume } from "@/lib/db/sqlite";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const resumes = getAllResumes();
    return NextResponse.json({ success: true, count: resumes.length, data: resumes });
  } catch (error: any) {
    console.error("SQLite GET /api/resumes error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch resumes from database" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body || !body.id) {
      return NextResponse.json(
        { success: false, error: "Resume id and payload are required" },
        { status: 400 }
      );
    }

    const saved = saveResume({
      id: body.id,
      title: body.title || "My Technical Resume",
      full_name: body.full_name || body.name || "Candidate",
      email: body.email || "",
      phone: body.phone || "",
      location: body.location || "",
      summary: body.summary || "",
      target_role: body.target_role || body.targetRole || "Software Engineer",
      content_json: typeof body.content === "string" ? body.content : JSON.stringify(body.content || body),
      ats_score: body.ats_score || body.atsScore || 0,
    });

    return NextResponse.json({ success: true, message: "Resume saved to SQLite DB", data: saved });
  } catch (error: any) {
    console.error("SQLite POST /api/resumes error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to save resume to database" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, error: "Missing resume id" }, { status: 400 });
    }

    const result = deleteResume(id);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error("SQLite DELETE /api/resumes error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete resume" },
      { status: 500 }
    );
  }
}
