/**
 * Vercel Serverless Function — API handler for Statika.
 *
 * Used ONLY when deployed to Vercel. Local development and Railway use server.ts.
 *
 * Persistence strategy:
 *   - Bundled JSON files (src/data/*.json) are the read-only BASE layer.
 *   - Admin writes are stored in Vercel KV as lightweight partial override objects.
 *   - GET /api/overrides returns all KV overrides so the client can merge them
 *     into React state on every page load, keeping admin changes visible after refresh.
 *   - On Railway / local, IS_VERCEL is false and all writes go to the filesystem as normal.
 */

import express from "express";
import path from "path";
import fs from "fs";
import { kv } from "@vercel/kv";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// ── Environment detection ────────────────────────────────────────────────────

/** True when Vercel KV credentials are available (i.e. running on Vercel). */
const IS_VERCEL = !!process.env.KV_REST_API_URL;

// ── Data file paths ──────────────────────────────────────────────────────────
// On Vercel, __dirname is the function's bundle directory.
// vercel.json's includeFiles ensures src/data/** is copied alongside the function.

const DATA_DIR = path.join(__dirname, "../src/data");
const QUESTIONS_PATH = path.join(DATA_DIR, "questions.json");
const ANSWERS_PATH = path.join(DATA_DIR, "answers.json");
const EXPLANATIONS_PATH = path.join(DATA_DIR, "explanations.json");
const NOTES_PATH = path.join(DATA_DIR, "notes.json");
const QUESTION_EDITS_PATH = path.join(DATA_DIR, "question_edits.json");

// ── JSON file helpers (Railway / local only) ─────────────────────────────────

function readJSONFile(filePath: string, defaultValue: any = null): any {
  try {
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, "utf-8"));
    }
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
  }
  return defaultValue;
}

function writeJSONFile(filePath: string, data: any): boolean {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err);
    return false;
  }
}

// ── KV helpers ────────────────────────────────────────────────────────────────

async function kvGet<T = any>(key: string): Promise<T | null> {
  try {
    return await kv.get<T>(key);
  } catch (err) {
    console.error(`KV get error for key "${key}":`, err);
    return null;
  }
}

async function kvSet(key: string, value: any): Promise<void> {
  try {
    await kv.set(key, value);
  } catch (err) {
    console.error(`KV set error for key "${key}":`, err);
  }
}

// ── Deep merge helper (for nested answer / explanation objects) ───────────────

function deepMerge(base: any, overrides: any): any {
  if (!overrides || typeof overrides !== "object" || Array.isArray(overrides)) {
    return overrides ?? base;
  }
  const result = { ...base };
  for (const key of Object.keys(overrides)) {
    if (
      overrides[key] &&
      typeof overrides[key] === "object" &&
      !Array.isArray(overrides[key]) &&
      typeof result[key] === "object" &&
      !Array.isArray(result[key])
    ) {
      result[key] = deepMerge(result[key], overrides[key]);
    } else {
      result[key] = overrides[key];
    }
  }
  return result;
}

// ── KV Override Key Names ─────────────────────────────────────────────────────
// Each key stores a PARTIAL override object — only the entries changed by admin.
// Structure mirrors the original JSON structure so client can deep-merge easily.
//
// "overrides:answers"      — partial nested AnswerKey object
// "overrides:explanations" — partial nested ExplanationKey object
// "overrides:questions"    — array of {paper,section,year,number,text,topic,options}
// "overrides:notes"        — array of {paper,sectionKey,sectionId,label,content}

// ── Express app ──────────────────────────────────────────────────────────────

const app = express();
app.use(express.json({ limit: "10mb" }));

// Initialise Gemini SDK
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: { headers: { "User-Agent": "aistudio-build" } },
});

// ── 0. GET /api/overrides — client fetches this on mount to rehydrate admin edits ──

app.get("/api/overrides", async (_req, res) => {
  if (!IS_VERCEL) {
    // On Railway / local, the filesystem is the source of truth — no overrides needed.
    return res.json({ answers: {}, explanations: {}, questions: [], notes: [] });
  }

  const [answers, explanations, questions, notes] = await Promise.all([
    kvGet("overrides:answers"),
    kvGet("overrides:explanations"),
    kvGet("overrides:questions"),
    kvGet("overrides:notes"),
  ]);

  res.json({
    answers: answers ?? {},
    explanations: explanations ?? {},
    questions: questions ?? [],
    notes: notes ?? [],
  });
});

// ── 1. POST /api/auth/login ───────────────────────────────────────────────────

app.post("/api/auth/login", (req, res) => {
  const { username, password } = req.body;
  const adminUsername = process.env.ADMIN_USERNAME || "admin";
  const adminPassword = process.env.ADMIN_PASSWORD || "password";

  if (username === adminUsername && password === adminPassword) {
    res.json({ success: true, token: "admin-jwt-token-stub" });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

// ── 2. POST /api/answers/correct ──────────────────────────────────────────────

app.post("/api/answers/correct", async (req, res) => {
  const { paper, section, year, questionNumber, correctOption } = req.body;

  if (!paper || !section || !year || !questionNumber || !correctOption) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  const value = correctOption.toUpperCase();

  if (IS_VERCEL) {
    // Read existing answer overrides, apply new entry, write back.
    const existing = (await kvGet<any>("overrides:answers")) ?? {};
    if (!existing[paper]) existing[paper] = {};
    if (!existing[paper][section]) existing[paper][section] = {};
    if (!existing[paper][section][year]) existing[paper][section][year] = {};
    existing[paper][section][year][questionNumber] = value;
    await kvSet("overrides:answers", existing);
    return res.json({ success: true });
  }

  // Railway / local: write to filesystem.
  const answers = readJSONFile(ANSWERS_PATH, {});
  if (!answers[paper]) answers[paper] = {};
  if (!answers[paper][section]) answers[paper][section] = {};
  if (!answers[paper][section][year]) answers[paper][section][year] = {};
  answers[paper][section][year][questionNumber] = value;

  if (writeJSONFile(ANSWERS_PATH, answers)) {
    res.json({ success: true, answers });
  } else {
    res.status(500).json({ success: false, message: "Failed to write answers file" });
  }
});

// ── 3. POST /api/questions/edit ───────────────────────────────────────────────

app.post("/api/questions/edit", async (req, res) => {
  const { paper, section, year, questionNumber, text, topic, options } = req.body;

  if (!paper || !section || !year || !questionNumber) {
    return res.status(400).json({ success: false, message: "Missing primary question keys" });
  }

  const editData = { paper, section, year: parseInt(year, 10), number: parseFloat(questionNumber), text, topic, options: options ?? [] };

  if (IS_VERCEL) {
    const existing: any[] = (await kvGet<any[]>("overrides:questions")) ?? [];
    const idx = existing.findIndex(
      (q) => q.paper === paper && q.section === section && q.year === parseInt(year, 10) && q.number === parseFloat(questionNumber)
    );
    if (idx !== -1) {
      existing[idx] = { ...existing[idx], ...editData };
    } else {
      existing.push(editData);
    }
    await kvSet("overrides:questions", existing);
    return res.json({ success: true, message: "Question override saved to KV" });
  }

  // Railway / local: write to both question_edits.json and questions.json.
  const edits = readJSONFile(QUESTION_EDITS_PATH, {});
  if (!edits[paper]) edits[paper] = {};
  if (!edits[paper][section]) edits[paper][section] = {};
  if (!edits[paper][section][year]) edits[paper][section][year] = {};
  edits[paper][section][year][questionNumber] = JSON.stringify({ text, topic, options: options ?? [] });
  writeJSONFile(QUESTION_EDITS_PATH, edits);

  const questions = readJSONFile(QUESTIONS_PATH, []);
  const qIdx = questions.findIndex(
    (q: any) =>
      q.paper === paper &&
      q.section === section &&
      q.year === parseInt(year, 10) &&
      q.number === parseFloat(questionNumber)
  );
  if (qIdx !== -1) {
    if (text !== undefined) questions[qIdx].text = text;
    if (topic !== undefined) questions[qIdx].topic = topic;
    if (options !== undefined) questions[qIdx].options = options;
    writeJSONFile(QUESTIONS_PATH, questions);
  }

  res.json({ success: true, message: "Question overrides saved and compiled successfully" });
});

// ── 4. POST /api/explanations/edit ───────────────────────────────────────────

app.post("/api/explanations/edit", async (req, res) => {
  const { paper, section, year, questionNumber, explanation } = req.body;

  if (!paper || !section || !year || !questionNumber || explanation === undefined) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  if (IS_VERCEL) {
    const existing = (await kvGet<any>("overrides:explanations")) ?? {};
    if (!existing[paper]) existing[paper] = {};
    if (!existing[paper][section]) existing[paper][section] = {};
    if (!existing[paper][section][year]) existing[paper][section][year] = {};
    existing[paper][section][year][questionNumber] = explanation;
    await kvSet("overrides:explanations", existing);
    return res.json({ success: true, message: "Explanation updated in KV" });
  }

  // Railway / local: write to filesystem.
  const explanations = readJSONFile(EXPLANATIONS_PATH, {});
  if (!explanations[paper]) explanations[paper] = {};
  if (!explanations[paper][section]) explanations[paper][section] = {};
  if (!explanations[paper][section][year]) explanations[paper][section][year] = {};
  explanations[paper][section][year][questionNumber] = explanation;

  if (writeJSONFile(EXPLANATIONS_PATH, explanations)) {
    res.json({ success: true, message: "Explanation updated successfully" });
  } else {
    res.status(500).json({ success: false, message: "Failed to write explanation data" });
  }
});

// ── 5. POST /api/notes/edit ───────────────────────────────────────────────────

app.post("/api/notes/edit", async (req, res) => {
  const { paper, sectionKey, sectionId, content, label } = req.body;

  if (!paper || !sectionKey || !sectionId || content === undefined) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  if (IS_VERCEL) {
    const existing: any[] = (await kvGet<any[]>("overrides:notes")) ?? [];
    const idx = existing.findIndex(
      (n) => n.paper === paper && n.sectionKey === sectionKey && n.sectionId === sectionId
    );
    const entry = { paper, sectionKey, sectionId, content, label };
    if (idx !== -1) {
      existing[idx] = entry;
    } else {
      existing.push(entry);
    }
    await kvSet("overrides:notes", existing);
    return res.json({ success: true, message: "Note override saved to KV" });
  }

  // Railway / local: write to filesystem.
  const notes = readJSONFile(NOTES_PATH, {});
  if (notes[paper] && notes[paper][sectionKey]) {
    const secObj = notes[paper][sectionKey];
    const sIdx = secObj.sections.findIndex((s: any) => s.id === sectionId);
    if (sIdx !== -1) {
      secObj.sections[sIdx].content = content;
      if (label !== undefined) secObj.sections[sIdx].label = label;
      writeJSONFile(NOTES_PATH, notes);
      return res.json({ success: true, message: "Note section updated successfully" });
    }
  }
  res.status(404).json({ success: false, message: "Revision note section not found" });
});

// ── 6. POST /api/chat — Gemini streaming SSE ─────────────────────────────────

app.post("/api/chat", async (req, res) => {
  const { messages, context } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Messages array is required" });
  }

  try {
    let systemInstruction =
      "You are an expert UPSC ISS (Indian Statistical Service) Statistics teacher, mentor, and assistant.\n" +
      "Help students master statistics, linear models, inference, probability, sampling, demography, official statistics, computer processing, etc.\n" +
      "Explain complex formulas step-by-step using precise mathematical notation with LaTeX syntax.\n" +
      "Provide exam tips, tricks, and common pitfalls.\n" +
      "Keep explanations clear, structured, and focused. Frame formulas within standard LaTeX delimiters: \\( ... \\) for inline math and \\[ ... \\] for block math.\n";

    if (context) {
      systemInstruction += `\nHere is some context about the current study item the user is looking at:\n${context}\n`;
    }

    const contents = messages.map((m: any) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    }));

    const responseStream = await ai.models.generateContentStream({
      model: "gemini-3.5-flash",
      contents,
      config: { systemInstruction },
    });

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    for await (const chunk of responseStream) {
      if (chunk.text) {
        res.write(`data: ${JSON.stringify({ text: chunk.text })}\n\n`);
      }
    }

    res.write("data: [DONE]\n\n");
    res.end();
  } catch (err: any) {
    console.error("Gemini API Error:", err);
    res.status(500).json({ error: err.message || "Failed to communicate with Gemini API" });
  }
});

export default app;
