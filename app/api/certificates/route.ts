import { NextResponse } from "next/server";
import {
  getAllCertificates,
  getCertificateById,
  saveCertificate,
} from "@/lib/db/sqlite";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
      const cert = getCertificateById(id);
      if (!cert) {
        return NextResponse.json(
          { success: false, error: "Certificate not found in database" },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, data: cert });
    }

    const certs = getAllCertificates();
    return NextResponse.json({ success: true, count: certs.length, data: certs });
  } catch (error: any) {
    console.error("SQLite GET /api/certificates error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch certificates" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body || !body.studentName || !body.courseTitle) {
      return NextResponse.json(
        { success: false, error: "Student name and course title are required" },
        { status: 400 }
      );
    }

    const certId = body.id || `AXIOM-2026-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    const saved = saveCertificate({
      id: certId,
      student_name: body.studentName,
      course_id: body.courseId || "foundation-2026",
      course_title: body.courseTitle,
      issue_date: body.issueDate || new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      skills_json: JSON.stringify(body.skills || []),
      status: "verified",
    });

    return NextResponse.json({
      success: true,
      message: "Certificate verified and persisted to SQLite DB",
      data: saved,
    });
  } catch (error: any) {
    console.error("SQLite POST /api/certificates error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to issue certificate" },
      { status: 500 }
    );
  }
}
