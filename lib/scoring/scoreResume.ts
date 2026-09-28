import roleKeywordsData from "@/data/roleKeywords.json";
import { ScoreBreakdown } from "@/store/useAxiomStore";
import { extractBulletsFromText, generateBulletRewrite } from "@/lib/llm/ruleBasedFallback";

interface RoleDef {
  title: string;
  keywords: string[];
  requiredSections: string[];
  actionVerbs: string[];
  metrics: string[];
}

const roleMap = roleKeywordsData as Record<string, RoleDef>;

export function scoreResume(
  resumeText: string,
  targetRoleInput: string = "fullstack",
  customJobDescription: string = ""
): ScoreBreakdown {
  const normalizedText = resumeText.toLowerCase();

  // Find matching role in roleMap
  const roleKey =
    Object.keys(roleMap).find(
      (key) =>
        key.toLowerCase() === targetRoleInput.toLowerCase() ||
        roleMap[key].title.toLowerCase() === targetRoleInput.toLowerCase()
    ) || "fullstack";

  const roleDef = roleMap[roleKey] || roleMap["fullstack"];

  // 1. MEASURABLE RESULTS (Max 30)
  const metricRegex =
    /(\d+(?:\.\d+)?%|\$\d+(?:,\d+)*(?:\.\d+)?[kmb]?|\b\d+\+?\s*(?:users|clients|customers|students|downloads|views|stars|requests|queries|seconds|minutes|hours|days|weeks|ms|fps|gb|tb|kb)\b|(?:reduced|increased|improved|cut|boosted|accelerated|scaled)\s+(?:by\s+)?\d+)/gi;

  const metricsFound = Array.from(new Set(resumeText.match(metricRegex) || []));
  const metricsCount = metricsFound.length;

  let measurableScore = 0;
  if (metricsCount >= 6) measurableScore = 30;
  else if (metricsCount >= 4) measurableScore = 26;
  else if (metricsCount >= 3) measurableScore = 22;
  else if (metricsCount >= 2) measurableScore = 17;
  else if (metricsCount >= 1) measurableScore = 12;
  else measurableScore = 6;

  // 2. CAREER FOCUS (Max 20)
  const sectionsFound: string[] = [];
  const requiredSections = ["experience", "projects", "skills", "education"];
  for (const sec of requiredSections) {
    if (normalizedText.includes(sec)) {
      sectionsFound.push(sec);
    }
  }

  // Count action verbs
  const verbsFound = roleDef.actionVerbs.filter((verb) =>
    new RegExp(`\\b${verb}\\b`, "i").test(normalizedText)
  );

  let careerFocusScore = Math.round(
    (sectionsFound.length / requiredSections.length) * 12 +
      Math.min(8, (verbsFound.length / 5) * 8)
  );
  careerFocusScore = Math.min(20, Math.max(5, careerFocusScore));

  // 3. PROJECT PROOF (Max 25)
  const linkRegex =
    /(?:https?:\/\/|www\.)?(?:github\.com|gitlab\.com|bitbucket\.org|vercel\.app|netlify\.app|[a-z0-9-]+\.dev|[a-z0-9-]+\.io)\/[^\s)]+/gi;
  const linksFound = Array.from(new Set(resumeText.match(linkRegex) || []));

  // Project sections detection
  const projectMentions = (
    normalizedText.match(/(?:project|portfolio|hackathon|repository|application)/g) || []
  ).length;

  let projectScore = 0;
  if (linksFound.length >= 3) projectScore += 15;
  else if (linksFound.length >= 2) projectScore += 12;
  else if (linksFound.length >= 1) projectScore += 8;
  else projectScore += 3;

  if (projectMentions >= 6) projectScore += 10;
  else if (projectMentions >= 3) projectScore += 7;
  else projectScore += 4;

  projectScore = Math.min(25, projectScore);

  // 4. TAILORED ALIGNMENT (Max 25)
  const targetKeywords = customJobDescription.trim().length > 30
    ? extractKeyTerms(customJobDescription)
    : roleDef.keywords;

  const matchedKeywords: string[] = [];
  const missingKeywords: string[] = [];

  for (const kw of targetKeywords) {
    if (new RegExp(`\\b${kw.replace(".", "\\.")}\\b`, "i").test(normalizedText)) {
      matchedKeywords.push(kw);
    } else {
      missingKeywords.push(kw);
    }
  }

  const matchRatio = targetKeywords.length > 0 ? matchedKeywords.length / targetKeywords.length : 0.5;
  let tailoredScore = Math.round(matchRatio * 25);
  tailoredScore = Math.min(25, Math.max(6, tailoredScore));

  // ATS Check
  const emailPresent = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(resumeText);
  const phonePresent = /(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/.test(resumeText);
  const linkedinOrGithub = /(?:linkedin\.com\/in|github\.com)/i.test(resumeText);

  const atsIssues: string[] = [];
  if (!emailPresent) atsIssues.push("No professional email address detected.");
  if (!phonePresent) atsIssues.push("No telephone contact detected.");
  if (!linkedinOrGithub) atsIssues.push("Missing LinkedIn or GitHub profile link in header.");
  if (resumeText.length < 500) atsIssues.push("Resume content is sparse (less than 500 characters).");
  if (sectionsFound.length < 3) atsIssues.push("Missing standard ATS section headings.");

  const atsScore = Math.max(50, 100 - atsIssues.length * 15);

  // Overall Score
  const overall = measurableScore + careerFocusScore + projectScore + tailoredScore;

  // Strengths & Weaknesses
  const strengths: string[] = [];
  const weaknesses: string[] = [];

  if (metricsCount >= 3) {
    strengths.push(`Strong quantitative impact with ${metricsCount} measurable data points.`);
  } else {
    weaknesses.push(`Weak quantification: only ${metricsCount} metric(s) detected. Aim for at least 4-5 numeric proofs.`);
  }

  if (linksFound.length >= 2) {
    strengths.push(`Direct project proof verified with ${linksFound.length} external codebase or live deployment links.`);
  } else {
    weaknesses.push("Missing live proof: add direct links to GitHub repositories or deployed apps.");
  }

  if (matchedKeywords.length >= 8) {
    strengths.push(`High keyword alignment for ${roleDef.title} (${matchedKeywords.length} matching core skills).`);
  } else {
    weaknesses.push(`Key skills for ${roleDef.title} absent: consider adding ${missingKeywords.slice(0, 4).join(", ")}.`);
  }

  if (verbsFound.length >= 4) {
    strengths.push(`Strong executive language utilizing ${verbsFound.length} distinct action verbs.`);
  }

  // Prioritized Action Items
  const actionItems: ScoreBreakdown["actionItems"] = [];

  if (metricsCount < 3) {
    actionItems.push({
      priority: "High",
      title: "Quantify 3 Project Bullets",
      description: "Replace generic task descriptions with the XYZ formula: 'Accomplished [X], as measured by [Y], by doing [Z]'."
    });
  }

  if (missingKeywords.length > 0) {
    actionItems.push({
      priority: "High",
      title: `Inject Core ${roleDef.title} Keywords`,
      description: `Integrate high-frequency ATS terms like ${missingKeywords.slice(0, 3).join(", ")} where relevant in your skills and project summaries.`
    });
  }

  if (linksFound.length === 0) {
    actionItems.push({
      priority: "Medium",
      title: "Add GitHub & Live Demo Links",
      description: "Recruiters spend 6-8 seconds skimming. Clickable proof of working software instantly builds trust."
    });
  }

  actionItems.push({
    priority: "Low",
    title: "Refine ATS Header Hierarchy",
    description: "Ensure your full name, email, phone, location, and GitHub profile are on plain unnested text lines."
  });

  // Extract bullets and generate sample rewrites
  const extractedBullets = extractBulletsFromText(resumeText);
  const sampleBullets = extractedBullets.length > 0 ? extractedBullets.slice(0, 3) : [
    "Worked on the user dashboard and fixed frontend bugs.",
    "Built a web app for tracking student assignments using React.",
    "Responsible for database schema design and writing SQL queries."
  ];

  const rewrittenBullets = sampleBullets.map((bullet) =>
    generateBulletRewrite(bullet, roleDef.title)
  );

  return {
    overall: Math.min(100, Math.max(25, overall)),
    measurableResults: {
      score: measurableScore,
      max: 30,
      feedback:
        metricsCount >= 4
          ? "Exceptional quantification. Demonstrates clear engineering outcomes."
          : `Found ${metricsCount} measurable metrics. Increase density of %, latency ms, users, or volume metrics.`,
      metricsFound: metricsFound.slice(0, 8)
    },
    careerFocus: {
      score: careerFocusScore,
      max: 20,
      feedback: `Structured with ${sectionsFound.length} standard sections and ${verbsFound.length} strong leadership verbs.`,
      targetRole: roleDef.title,
      matchedKeywords: verbsFound
    },
    projectProof: {
      score: projectScore,
      max: 25,
      feedback:
        linksFound.length > 0
          ? `Verified ${linksFound.length} repository/deployment link(s) verifying hands-on competence.`
          : "No repository or live deployment links detected. Add GitHub or live URLs directly.",
      linksFound: linksFound.slice(0, 5),
      projectsCount: Math.max(1, Math.floor(projectMentions / 2))
    },
    tailoredAlignment: {
      score: tailoredScore,
      max: 25,
      feedback: `Matched ${matchedKeywords.length} of ${targetKeywords.length} essential ${roleDef.title} competencies.`,
      missingKeywords: missingKeywords.slice(0, 8)
    },
    atsCheck: {
      score: atsScore,
      passed: atsIssues.length === 0,
      issues: atsIssues
    },
    strengths,
    weaknesses,
    actionItems,
    rewrittenBullets
  };
}

function extractKeyTerms(text: string): string[] {
  const commonStopwords = new Set([
    "the", "and", "for", "with", "this", "that", "you", "are", "have", "from", "will", "our", "team",
    "work", "skills", "experience", "years", "candidate", "role", "looking", "must", "plus", "ability"
  ]);

  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9#+.\s-]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !commonStopwords.has(w));

  const freq: Record<string, number> = {};
  for (const w of words) {
    freq[w] = (freq[w] || 0) + 1;
  }

  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)
    .map(([w]) => w);
}
