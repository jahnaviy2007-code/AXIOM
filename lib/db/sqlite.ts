// @ts-ignore
import { DatabaseSync } from "node:sqlite";
import path from "node:path";
import fs from "node:fs";

// Resolve data directory and DB path
const DATA_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "axiom.db");

// Singleton connection instance
let dbInstance: DatabaseSync | null = null;

export function getDatabase(): DatabaseSync {
  if (!dbInstance) {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    dbInstance = new DatabaseSync(DB_PATH);

    // Performance and integrity pragmas
    dbInstance.exec("PRAGMA journal_mode = WAL;");
    dbInstance.exec("PRAGMA synchronous = NORMAL;");
    dbInstance.exec("PRAGMA foreign_keys = ON;");

    // Initialize Schema
    initSchema(dbInstance);
  }

  return dbInstance;
}

function initSchema(db: DatabaseSync) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS resumes (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      full_name TEXT NOT NULL,
      email TEXT,
      phone TEXT,
      location TEXT,
      summary TEXT,
      target_role TEXT,
      content_json TEXT NOT NULL,
      ats_score INTEGER DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS interviews (
      id TEXT PRIMARY KEY,
      role TEXT NOT NULL,
      difficulty TEXT NOT NULL,
      bot_persona TEXT NOT NULL,
      overall_score INTEGER NOT NULL,
      star_score INTEGER NOT NULL,
      eye_contact_score INTEGER NOT NULL,
      duration_seconds INTEGER DEFAULT 0,
      answers_json TEXT NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS certificates (
      id TEXT PRIMARY KEY,
      student_name TEXT NOT NULL,
      course_id TEXT NOT NULL,
      course_title TEXT NOT NULL,
      issue_date TEXT NOT NULL,
      skills_json TEXT,
      status TEXT DEFAULT 'verified',
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS sessions_progress (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      session_id TEXT UNIQUE NOT NULL,
      user_id TEXT DEFAULT 'guest',
      completed INTEGER DEFAULT 0,
      updated_at TEXT NOT NULL
    );
  `);
}

// ----------------- RESUME OPERATIONS -----------------
export interface ResumeDBRecord {
  id: string;
  title: string;
  full_name: string;
  email?: string;
  phone?: string;
  location?: string;
  summary?: string;
  target_role?: string;
  content_json: string;
  ats_score?: number;
  created_at?: string;
  updated_at?: string;
}

export function getAllResumes(): any[] {
  const db = getDatabase();
  const query = db.prepare(`SELECT * FROM resumes ORDER BY updated_at DESC`);
  return query.all();
}

export function getResumeById(id: string): any {
  const db = getDatabase();
  const query = db.prepare(`SELECT * FROM resumes WHERE id = ?`);
  return query.get(id);
}

export function saveResume(resume: ResumeDBRecord) {
  const db = getDatabase();
  const now = new Date().toISOString();
  const query = db.prepare(`
    INSERT INTO resumes (
      id, title, full_name, email, phone, location, summary, target_role, content_json, ats_score, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      title = excluded.title,
      full_name = excluded.full_name,
      email = excluded.email,
      phone = excluded.phone,
      location = excluded.location,
      summary = excluded.summary,
      target_role = excluded.target_role,
      content_json = excluded.content_json,
      ats_score = excluded.ats_score,
      updated_at = excluded.updated_at
  `);

  query.run(
    resume.id,
    resume.title || "Untitled Resume",
    resume.full_name || "Anonymous Candidate",
    resume.email || "",
    resume.phone || "",
    resume.location || "",
    resume.summary || "",
    resume.target_role || "General",
    resume.content_json,
    resume.ats_score || 0,
    resume.created_at || now,
    now
  );

  return getResumeById(resume.id);
}

export function deleteResume(id: string) {
  const db = getDatabase();
  const query = db.prepare(`DELETE FROM resumes WHERE id = ?`);
  query.run(id);
  return { success: true, deletedId: id };
}

// ----------------- INTERVIEW OPERATIONS -----------------
export interface InterviewDBRecord {
  id: string;
  role: string;
  difficulty: string;
  bot_persona: string;
  overall_score: number;
  star_score: number;
  eye_contact_score: number;
  duration_seconds: number;
  answers_json: string;
  created_at?: string;
}

export function getAllInterviews(): any[] {
  const db = getDatabase();
  const query = db.prepare(`SELECT * FROM interviews ORDER BY created_at DESC`);
  return query.all();
}

export function saveInterview(interview: InterviewDBRecord) {
  const db = getDatabase();
  const now = new Date().toISOString();
  const query = db.prepare(`
    INSERT INTO interviews (
      id, role, difficulty, bot_persona, overall_score, star_score, eye_contact_score, duration_seconds, answers_json, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      overall_score = excluded.overall_score,
      star_score = excluded.star_score,
      eye_contact_score = excluded.eye_contact_score,
      answers_json = excluded.answers_json
  `);

  query.run(
    interview.id,
    interview.role,
    interview.difficulty,
    interview.bot_persona,
    interview.overall_score,
    interview.star_score,
    interview.eye_contact_score,
    interview.duration_seconds || 0,
    interview.answers_json,
    interview.created_at || now
  );

  return interview;
}

// ----------------- CERTIFICATE OPERATIONS -----------------
export interface CertificateDBRecord {
  id: string;
  student_name: string;
  course_id: string;
  course_title: string;
  issue_date: string;
  skills_json?: string;
  status?: string;
  created_at?: string;
}

export function getAllCertificates(): any[] {
  const db = getDatabase();
  const query = db.prepare(`SELECT * FROM certificates ORDER BY created_at DESC`);
  return query.all();
}

export function getCertificateById(id: string): any {
  const db = getDatabase();
  const query = db.prepare(`SELECT * FROM certificates WHERE id = ?`);
  return query.get(id);
}

export function saveCertificate(cert: CertificateDBRecord) {
  const db = getDatabase();
  const now = new Date().toISOString();
  const query = db.prepare(`
    INSERT INTO certificates (
      id, student_name, course_id, course_title, issue_date, skills_json, status, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      student_name = excluded.student_name,
      status = excluded.status
  `);

  query.run(
    cert.id,
    cert.student_name,
    cert.course_id,
    cert.course_title,
    cert.issue_date,
    cert.skills_json || "[]",
    cert.status || "verified",
    cert.created_at || now
  );

  return getCertificateById(cert.id);
}

// ----------------- AGGREGATE STATS -----------------
export function getPlatformStats() {
  const db = getDatabase();
  const resumeCount = (db.prepare(`SELECT COUNT(*) as count FROM resumes`).get() as any)?.count || 0;
  const interviewCount = (db.prepare(`SELECT COUNT(*) as count FROM interviews`).get() as any)?.count || 0;
  const certCount = (db.prepare(`SELECT COUNT(*) as count FROM certificates`).get() as any)?.count || 0;
  const avgScore = (db.prepare(`SELECT AVG(overall_score) as avg FROM interviews`).get() as any)?.avg || 82;

  return {
    totalResumes: resumeCount,
    totalInterviews: interviewCount,
    totalCertificates: certCount,
    averageInterviewScore: Math.round(avgScore),
  };
}
