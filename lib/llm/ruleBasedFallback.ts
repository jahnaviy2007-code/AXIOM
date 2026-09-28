/**
 * Rule-Based Fallback Engine
 * Provides instant, zero-latency, on-device bullet rewrites and tailored recommendations
 * without needing an external API key or WebGPU model download.
 */

interface BulletRewriteRule {
  trigger: RegExp;
  formula: string;
  exampleOriginal: string;
  exampleImproved: string;
  reason: string;
}

const REWRITE_RULES: BulletRewriteRule[] = [
  {
    trigger: /(?:worked on|responsible for|helped with|assisted in)\s+(.*)/i,
    formula: "Action Verb + Task/Scope + Measurable Outcome (X% / $Y / N users)",
    exampleOriginal: "Responsible for developing the student portal dashboard.",
    exampleImproved: "Architected responsive student dashboard in Next.js & TypeScript, cutting page latency by 42% for 3,500+ active peers.",
    reason: "Replaces passive duty phrasing with active leadership and quantified user impact."
  },
  {
    trigger: /(?:created|made|built)\s+(?:a|an)\s+(?:website|app|application|tool)/i,
    formula: "Action Verb + Modern Tech Stack + Business/User Impact",
    exampleOriginal: "Built a web app for tracking college events.",
    exampleImproved: "Engineered full-stack event discovery platform using React & Node.js, onboarding 12 student clubs and scaling to 1,200 monthly visits.",
    reason: "Demonstrates production architecture, scale, and multi-user adoption."
  },
  {
    trigger: /(?:used|utilised|utilizing)\s+(?:python|javascript|react|sql)/i,
    formula: "Specific Technical Implementation + Optimization Metric",
    exampleOriginal: "Used Python and SQL to clean data and generate reports.",
    exampleImproved: "Automated end-to-end ETL pipelines in Python & PostgreSQL, processing 50K+ daily records and saving 6 weekly manual analyst hours.",
    reason: "Moves beyond tool listing into engineering ROI and operational time saved."
  },
  {
    trigger: /(?:fixed bugs|tested features|maintenance)/i,
    formula: "Quality Engineering + Test Coverage / Defect Reduction",
    exampleOriginal: "Fixed bugs and performed QA testing before releases.",
    exampleImproved: "Introduced Jest & Cypress end-to-end test suite, elevating test coverage from 45% to 88% and eliminating critical sprint regressions.",
    reason: "Proves systematic reliability engineering rather than ad-hoc bug patching."
  }
];

export function generateBulletRewrite(bullet: string, roleTitle: string): { original: string; improved: string; reason: string } {
  const cleaned = bullet.trim().replace(/^[-•*]\s*/, "");

  for (const rule of REWRITE_RULES) {
    if (rule.trigger.test(cleaned)) {
      // Craft an improved version maintaining context
      return {
        original: cleaned,
        improved: cleaned
          .replace(/(?:worked on|responsible for|helped with|assisted in)\s+/i, "Spearheaded development of ")
          .replace(/(?:built|created|made)\s+(?:a|an)\s+/i, "Engineered production-grade ")
          + ", accelerating turnaround by 35% and improving data accuracy across 2,000+ interactions.",
        reason: rule.reason
      };
    }
  }

  // General enhancement fallback
  return {
    original: cleaned,
    improved: `Engineered and deployed ${cleaned.toLowerCase()}, boosting system throughput by 28% and ensuring 99.9% uptime for end-users.`,
    reason: "Strengthened action verb, specified engineering contribution, and added quantified impact."
  };
}

export function extractBulletsFromText(text: string): string[] {
  const lines = text.split("\n").map((l) => l.trim());
  const bullets: string[] = [];

  for (const line of lines) {
    if (/^[-•*▪]\s+/.test(line) || /^\d+\.\s+/.test(line)) {
      const content = line.replace(/^[-•*▪\d\.]+\s*/, "").trim();
      if (content.length > 20) {
        bullets.push(content);
      }
    } else if (line.length > 30 && line.length < 200 && /^[A-Z]/.test(line) && !line.endsWith(":")) {
      // Potentially a bullet line without bullet point marker
      bullets.push(line);
    }
  }

  return bullets.slice(0, 10);
}
