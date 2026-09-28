"use client";

import { ScoreBreakdown } from "@/store/useAxiomStore";

/**
 * Generates and downloads a clean, styled ATS-compliant Diagnostic Report PDF using jsPDF
 */
export async function exportScoreReportPdf(
  score: ScoreBreakdown,
  fileName: string = "AXIOM-Diagnostic-Report.pdf"
) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({
    unit: "pt",
    format: "letter"
  });

  const margin = 40;
  let y = 50;

  // Header banner
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, 612, 100, "F");

  doc.setTextColor(34, 211, 238); // Cyan
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("AXIOM CAREER AUDIT REPORT", margin, y);

  y += 24;
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text("Privacy-First Client-Side Resume Diagnostic", margin, y);

  doc.setTextColor(148, 163, 184); // slate-400
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, 420, y);

  y = 135;

  // Overall Score Box
  doc.setFillColor(241, 245, 249);
  doc.roundedRect(margin, y, 532, 70, 8, 8, "F");

  doc.setTextColor(15, 23, 42);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("OVERALL READINESS SCORE", margin + 20, y + 30);

  doc.setFontSize(28);
  doc.setTextColor(124, 92, 255); // Violet
  doc.text(`${score.overall} / 100`, margin + 20, y + 58);

  doc.setFontSize(11);
  doc.setTextColor(100, 116, 139);
  doc.setFont("helvetica", "normal");
  doc.text(
    `ATS Compatibility: ${score.atsCheck.passed ? "PASSED (Clean)" : "ATTENTION NEEDED"} (${score.atsCheck.score}/100)`,
    280,
    y + 45
  );

  y += 100;

  // Criteria Breakdown Table
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(15, 23, 42);
  doc.text("Core Pillar Breakdown", margin, y);
  y += 20;

  const pillars = [
    { name: "Measurable Results", score: `${score.measurableResults.score}/${score.measurableResults.max}`, note: score.measurableResults.feedback },
    { name: "Career Focus", score: `${score.careerFocus.score}/${score.careerFocus.max}`, note: score.careerFocus.feedback },
    { name: "Project Proof", score: `${score.projectProof.score}/${score.projectProof.max}`, note: score.projectProof.feedback },
    { name: "Tailored Alignment", score: `${score.tailoredAlignment.score}/${score.tailoredAlignment.max}`, note: score.tailoredAlignment.feedback },
  ];

  for (const p of pillars) {
    doc.setFillColor(248, 250, 252);
    doc.rect(margin, y, 532, 32, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(30, 41, 59);
    doc.text(p.name, margin + 10, y + 20);

    doc.setTextColor(124, 92, 255);
    doc.text(p.score, margin + 170, y + 20);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(71, 85, 105);
    const truncatedNote = p.note.length > 55 ? p.note.substring(0, 52) + "..." : p.note;
    doc.text(truncatedNote, margin + 230, y + 20);

    y += 36;
  }

  y += 15;

  // Strengths
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(16, 185, 129); // emerald
  doc.text("Key Strengths Verified:", margin, y);
  y += 18;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(51, 65, 85);
  for (const s of score.strengths) {
    doc.text(`+  ${s}`, margin + 10, y);
    y += 16;
  }

  y += 10;

  // Critical Action Items
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(239, 68, 68); // red/rose
  doc.text("Immediate High-Impact Priorities:", margin, y);
  y += 18;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(51, 65, 85);
  for (const a of score.actionItems) {
    doc.setFont("helvetica", "bold");
    doc.text(`[${a.priority}] ${a.title}:`, margin + 10, y);
    doc.setFont("helvetica", "normal");
    const desc = doc.splitTextToSize(a.description, 480);
    doc.text(desc, margin + 25, y + 14);
    y += 16 + desc.length * 12;
  }

  // Footer note
  doc.setFontSize(9);
  doc.setTextColor(148, 163, 184);
  doc.text(
    "AXIOM Career Intelligence -- 100% Client-Side Privacy Guarantee. Zero tracking, zero server uploads.",
    margin,
    750
  );

  doc.save(fileName);
}
