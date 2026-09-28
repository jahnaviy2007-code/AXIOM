






# 🚀 AXIOM – AI-Powered Resume & Interview Coach

> **"Rate your resume. Practise live with an AI interviewer. Get certified — free."**
> 
> *Private • On-device AI • Free for every student*

![AXIOM Hero Preview](https://raw.githubusercontent.com/axiom-coach/brand/main/preview.png)

---

## 🌟 Overview

Career coaching is expensive, generic, and inaccessible. Most student resumes struggle not because of a lack of talent, but due to **four systemic gaps**:
1. **No Measurable Results** (generic duties instead of quantified impact)
2. **Unclear Career Focus** (lacking recognizable domain keywords)
3. **No Project Proof** (missing GitHub codebases or live deployment links)
4. **Poor ATS Alignment** (formatting traps, missing essential contact or role markers)

**AXIOM** fixes this for every student with an entirely free, on-device AI coach that never compromises privacy.

---

## 🔒 100% Client-Side Privacy Guarantee

Unlike traditional career portals and cloud AI services that upload your personal data to remote databases and train on your resume:
- **Zero Cloud Storage**: Resumes are parsed directly in your browser's memory using `pdfjs-dist` (WebAssembly) and `mammoth.js`.
- **Local Video & Audio**: Mock interview webcam feeds and voice recordings execute locally via WebRTC `getUserMedia` and Web Speech APIs. Frames are discarded in RAM.
- **Deterministic Evaluation**: The 4-pillar scoring engine runs deterministic algorithms locally. No unpredictable hallucinations, no external API keys required.
- **Local Persistence**: History and bookmarks persist only in browser `localStorage`.

---

## 💎 Core Architecture & Features

### 0. AI Resume Builder from Scratch (`/builder`)
- **Interactive 5-Step Guided Q&A**: Designed for students and beginners starting from zero.
- **AI Bullet Polish (Google XYZ Formula)**: Transforms basic course notes into high-impact bullets (*"Accomplished [X], as measured by [Y], by doing [Z]"*).
- **Live Side-by-Side ATS Preview**: Real-time rendering in a standardized single-column layout tested against corporate ATS parsers.
- **1-Click Export & Diagnostic Audit**: Download clean PDF/text or send directly to the AXIOM Diagnostic Scorer.

### 1. AI Resume Diagnostic & XYZ Optimizer (`/resume`)
- Drag-and-drop parsing for PDF, DOCX, and raw text.
- 100-point circular readiness gauge with letter grades and percentile benchmarks.
- Detailed scoring across **Measurable Results (30)**, **Career Focus (20)**, **Project Proof (25)**, and **Tailored Alignment (25)**.
- ATS Compliance Audit with specific formatting checks.
- On-device XYZ Bullet Enhancer converting passive descriptions into quantified accomplishments.
- One-click ATS Diagnostic Report export to PDF.

### 2. Live AI Mock Interview Studio (`/interview`)
- Dual-panel interface with real-time video feed and interactive AI Robot Mascot interviewer.
- Speech-to-text voice recognition with browser `webkitSpeechRecognition`.
- Real-time cadence evaluation (words per minute), filler hesitation tracking, and eye contact / posture metrics.
- Text-to-speech audio question prompts via browser `speechSynthesis`.
- Post-interview comprehensive critique with question-by-question model answers (STAR method).

### 3. Foundational Tech Video Sessions (`/sessions`)
- 3 interactive video masterclasses for beginners new to tech:
  1. *The Modern Software Landscape & Agile Teams* (with headline generator).
  2. *Git, GitHub & Shipping Your First Real Project* (with project proof template).
  3. *Technical Interview Demystified & The STAR Framework* (with STAR answer builder).
- **Official Verifiable Certificate of Completion**: Instant high-resolution PDF download with custom student name, unique Credential ID, and official verification seal.

### 4. Video Masterclasses & Verified Certificate (`/#masterclass`)
- 3 interactive skill accelerator video modules:
  1. *The Google XYZ Formula for Bullets* (with built-in XYZ generator tool).
  2. *Project Proof & GitHub Signals* (with repository proof header template).
  3. *ATS Demystified & Keyword Optimization* (with core competency matrix).
- **Official Verifiable Certificate of Completion**: Generates a high-resolution PDF certificate with unique Credential ID and official verification seal.

### 4. Verified Free Certifications Directory (`/certifications`)
- Curated index of 15+ verified free courses and credentials from Harvard, Google, Microsoft, freeCodeCamp, and NPTEL.
- Filterable by discipline (Frontend, Backend, ML & AI, Data Science, Cloud & DevOps).
- Dynamic "Recommended for You" row tied directly to your target role.
- One-click course bookmarking.

### 5. Student Career Command Center (`/dashboard`)
- Recharts gradient area chart visualizing readiness score progression over time.
- 4-pillar milestone track from baseline audit to hire-readiness.
- History logs of interview simulations and bookmarked credentials.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Vanilla CSS Design System (Custom Glassmorphism, Starfield, Neon Glows)
- **State**: Zustand with `localStorage` persistence
- **Animation**: Framer Motion & CSS keyframe animations
- **Charts**: Recharts
- **Parsing**: `pdfjs-dist` (pinned 4.4.168) + `mammoth.js`
- **Export**: `jspdf` + `docx`
- **Icons**: Lucide React

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (tested on Node v20/v24)
- npm or pnpm

### Quick Setup

```bash
# 1. Clone or navigate to the repository
cd axiom

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Testing the 1-Click Demo

No resume file on hand? We've seeded 1-click demos across the app:
1. On `/resume`, click **"Load Sample Student Resume (1-Click Demo)"** to instantly audit Alex Chen's UC Berkeley software engineering resume.
2. On `/interview`, click **"Insert Demo Answer"** to test the vocal and technical critique engine without microphone access.
3. Test PDF report generation with the **"Export Audit PDF"** button.

---

## 📜 License

MIT License. Free and open source for all students worldwide.
