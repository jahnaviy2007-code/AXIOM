import { NextResponse } from "next/server";
import { getPlatformStats } from "@/lib/db/sqlite";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const stats = getPlatformStats();
    return NextResponse.json({
      success: true,
      database: "SQLite (axiom.db)",
      data: stats,
    });
  } catch (error: any) {
    console.error("SQLite GET /api/stats error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch platform stats" },
      { status: 500 }
    );
  }
}
