export interface InterviewQuestion {
  id: string;
  role: string;
  difficulty: "Intern" | "Junior" | "Mid-level";
  category: "Technical" | "Behavioral" | "System Design" | "Problem Solving";
  question: string;
  contextHint: string;
  keyPointsExpected: string[];
  sampleStrongAnswer: string;
}

export const QUESTION_BANK: InterviewQuestion[] = [
  // Full-Stack / Software Engineering
  {
    id: "fs-1",
    role: "Full-Stack Developer",
    difficulty: "Intern",
    category: "Technical",
    question: "Can you explain the difference between client-side rendering and server-side rendering, and when you would choose one over the other?",
    contextHint: "Focus on initial page load, SEO, server workload, and interactive dynamic applications.",
    keyPointsExpected: [
      "Client-side renders JavaScript in the browser",
      "Server-side pre-renders HTML on the server before sending to client",
      "SSR benefits SEO and fast First Contentful Paint",
      "CSR provides smooth in-app navigation once loaded"
    ],
    sampleStrongAnswer:
      "In Client-Side Rendering, the server returns a minimal HTML shell and a JS bundle that executes in the user's browser to build the DOM. In Server-Side Rendering, the server compiles the HTML for each request and delivers fully populated markup. I choose SSR when SEO and initial load speed are critical—such as e-commerce product pages—and CSR when building rich authenticated dashboards where fast interactive state transitions outweigh first-load SEO."
  },
  {
    id: "fs-2",
    role: "Full-Stack Developer",
    difficulty: "Junior",
    category: "Technical",
    question: "Walk me through how you optimize database queries when an API endpoint starts experiencing high latency under load.",
    contextHint: "Mention indexing, EXPLAIN ANALYZE, query N+1 detection, caching, and connection pooling.",
    keyPointsExpected: [
      "Profiling with EXPLAIN ANALYZE to identify sequential scans",
      "Adding strategic compound indexes on filtered/sorted columns",
      "Eliminating ORM N+1 query patterns with eager loading",
      "Implementing Redis caching for read-heavy hotspots"
    ],
    sampleStrongAnswer:
      "First, I inspect the execution plan using EXPLAIN ANALYZE to pinpoint full table scans or costly joins. Next, I verify whether an appropriate B-tree or compound index can support the WHERE and ORDER BY clauses. I also check for N+1 queries from ORM lazy loading and resolve them with eager joins. For frequently accessed, slow-changing data, I introduce an in-memory Redis cache with an appropriate TTL."
  },
  {
    id: "fs-3",
    role: "Full-Stack Developer",
    difficulty: "Junior",
    category: "Behavioral",
    question: "Tell me about a time when you encountered a stubborn bug right before a project deadline. How did you diagnose and resolve it?",
    contextHint: "Use the STAR method: Situation, Task, Action, Result.",
    keyPointsExpected: [
      "Clear description of the high-stakes bug",
      "Systematic isolation approach (logs, git bisect, network tab)",
      "Communication with team / stakeholders",
      "Root cause fix and prevention"
    ],
    sampleStrongAnswer:
      "During our capstone showcase 12 hours before presentation, our authentication session was randomly dropping users. As lead developer, I isolated the issue by reproducing it across incognito environments while tracing network headers. I discovered an inconsistent SameSite and Secure cookie attribute conflict between our staging HTTPS proxy and local API. I updated the reverse-proxy cookie policy, confirmed end-to-end auth persistence, and presented the project successfully with zero dropped sessions."
  },
  // Frontend
  {
    id: "fe-1",
    role: "Frontend Developer",
    difficulty: "Junior",
    category: "Technical",
    question: "How does the React reconciliation algorithm work, and why are keys so critical in list rendering?",
    contextHint: "Mention the Virtual DOM, diffing heuristics, and component identity preservation.",
    keyPointsExpected: [
      "Diffing O(n) heuristic between Virtual DOM trees",
      "Keys allow React to identify items that moved, added, or removed",
      "Using index as key causes state corruption when items reorder"
    ],
    sampleStrongAnswer:
      "React compares the current and new Virtual DOM using a heuristic diffing algorithm that runs in O(n). To determine whether an element should be remounted or merely updated, React relies on element types and unique keys. In dynamic lists, stable keys allow React to track which item moved or mutated. Using array indexes as keys breaks this when items are inserted or filtered, causing child input state to misbind."
  },
  // Data Science / ML
  {
    id: "ds-1",
    role: "Data Scientist",
    difficulty: "Junior",
    category: "Technical",
    question: "How do you detect and handle data leakage in machine learning pipelines?",
    contextHint: "Mention train-test split before preprocessing, target encoding traps, and time-series splits.",
    keyPointsExpected: [
      "Fitting scalers or encoders only on training folds",
      "Temporal cross-validation for time-series data",
      "Excluding proxy features that capture future ground truth"
    ],
    sampleStrongAnswer:
      "Data leakage occurs when information outside the training dataset contaminates model training. I prevent this by enforcing strict pipeline encapsulation: all scalers, imputers, and encoders are fit exclusively on training folds during cross-validation. For time-series data, I always employ chronological TimeSeriesSplit rather than random shuffle. Additionally, I audit feature importances for unrealistically high predictive signals that indicate post-event indicators."
  },
  // General Behavioral
  {
    id: "gen-1",
    role: "Software Engineer",
    difficulty: "Intern",
    category: "Behavioral",
    question: "Why are you interested in this software engineering position, and what unique perspective do you bring as a student?",
    contextHint: "Show passion, hands-on curiosity, eagerness to learn, and concrete project experience.",
    keyPointsExpected: [
      "Alignment with modern tech stack and problem domain",
      "Self-directed learning outside coursework",
      "Fresh perspective and enthusiasm for collaborative growth"
    ],
    sampleStrongAnswer:
      "I'm passionate about engineering resilient, user-first software. Beyond my academic coursework, I've spent the last year building end-to-end projects with Next.js, TypeScript, and distributed databases. What I bring is a high-velocity learning mindset: I love deep-diving into documentation, dissecting open-source code, and turning complex constraints into clean, maintainable systems."
  }
];

export function getQuestionsForRole(
  roleName: string,
  difficulty: "Intern" | "Junior" | "Mid-level"
): InterviewQuestion[] {
  const normalized = roleName.toLowerCase();
  const filtered = QUESTION_BANK.filter(
    (q) =>
      q.difficulty === difficulty &&
      (q.role.toLowerCase().includes(normalized) || normalized.includes(q.role.toLowerCase()))
  );

  if (filtered.length >= 3) {
    return filtered.slice(0, 4);
  }

  // Fallback: mix role questions with general behavioral / technical
  const generic = QUESTION_BANK.filter((q) => q.difficulty === difficulty || q.role === "Full-Stack Developer");
  return Array.from(new Set([...filtered, ...generic])).slice(0, 4);
}
