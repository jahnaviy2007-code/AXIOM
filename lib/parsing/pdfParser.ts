"use client";

/**
 * Extracts plain text from a PDF file on the client side using pdfjs-dist.
 * Ensures zero network transmission — strictly on-device.
 */
export async function parsePdfFile(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();

    // Dynamically import pdfjs-dist on client side
    const pdfjs = await import("pdfjs-dist");

    // Set worker src to cdnjs or unpkg matching the version
    if (!pdfjs.GlobalWorkerOptions.workerSrc) {
      pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.mjs`;
    }

    const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;

    let fullText = "";

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str || "")
        .join(" ");
      fullText += pageText + "\n\n";
    }

    return fullText.trim();
  } catch (error) {
    console.error("PDF Parsing error:", error);
    throw new Error(
      "Failed to read PDF file client-side. Please ensure it is an uncorrupted PDF or try copying the text directly."
    );
  }
}
