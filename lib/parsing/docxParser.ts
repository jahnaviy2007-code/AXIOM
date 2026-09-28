"use client";

/**
 * Extracts plain text from a DOCX file on the client side using mammoth.
 * Runs 100% on-device in browser memory.
 */
export async function parseDocxFile(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const mammoth = await import("mammoth");

    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value.trim();
  } catch (error) {
    console.error("DOCX Parsing error:", error);
    throw new Error(
      "Failed to read DOCX file client-side. Please ensure it is a valid .docx document."
    );
  }
}
