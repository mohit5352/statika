import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;

app.use(express.json());

// Initialize Gemini SDK with User-Agent for telemetry
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// Paths to JSON data files
const DATA_DIR = path.join(process.cwd(), "src/data");
const QUESTIONS_PATH = path.join(DATA_DIR, "questions.json");
const ANSWERS_PATH = path.join(DATA_DIR, "answers.json");
const EXPLANATIONS_PATH = path.join(DATA_DIR, "explanations.json");
const NOTES_PATH = path.join(DATA_DIR, "notes.json");
const QUESTION_EDITS_PATH = path.join(DATA_DIR, "question_edits.json");

// Helper function to read JSON data safely
function readJSONFile(filePath: string, defaultValue: any = null) {
  try {
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, "utf-8"));
    }
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
  }
  return defaultValue;
}

// Helper function to write JSON safely
function writeJSONFile(filePath: string, data: any) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err);
    return false;
  }
}

// Ensure the DATA_DIR exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// ==================== API ENDPOINTS ====================
// 0. GET /api/overrides — returns empty on local/Railway (filesystem is source of truth here).
// On Vercel this route is handled by api/index.ts which returns KV overrides.
app.get('/api/overrides', (_req, res) => {
  res.json({ answers: {}, explanations: {}, questions: [], notes: [] });
});


// 1. Admin Auth
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

// 2. Correct/Set Answer Key
app.post("/api/answers/correct", (req, res) => {
  const { paper, section, year, questionNumber, correctOption } = req.body;

  if (!paper || !section || !year || !questionNumber || !correctOption) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  const answers = readJSONFile(ANSWERS_PATH, {});
  
  if (!answers[paper]) answers[paper] = {};
  if (!answers[paper][section]) answers[paper][section] = {};
  if (!answers[paper][section][year]) answers[paper][section][year] = {};
  
  answers[paper][section][year][questionNumber] = correctOption.toUpperCase();
  
  const success = writeJSONFile(ANSWERS_PATH, answers);
  
  if (success) {
    res.json({ success: true, answers });
  } else {
    res.status(500).json({ success: false, message: "Failed to write data file" });
  }
});

// 3. Edit Question Text or Details
app.post("/api/questions/edit", (req, res) => {
  const { paper, section, year, questionNumber, text, topic, options } = req.body;

  if (!paper || !section || !year || !questionNumber) {
    return res.status(400).json({ success: false, message: "Missing primary question keys" });
  }

  // Load question edits overrides
  const edits = readJSONFile(QUESTION_EDITS_PATH, {});
  if (!edits[paper]) edits[paper] = {};
  if (!edits[paper][section]) edits[paper][section] = {};
  if (!edits[paper][section][year]) edits[paper][section][year] = {};

  const editData = {
    text,
    topic,
    options: options || []
  };

  edits[paper][section][year][questionNumber] = JSON.stringify(editData);
  writeJSONFile(QUESTION_EDITS_PATH, edits);

  // Update compiled questions.json in real time so client lists are immediately updated
  const questions = readJSONFile(QUESTIONS_PATH, []);
  const idx = questions.findIndex(
    (q: any) =>
      q.paper === paper &&
      q.section === section &&
      q.year === parseInt(year, 10) &&
      q.number === parseFloat(questionNumber)
  );

  if (idx !== -1) {
    if (text !== undefined) questions[idx].text = text;
    if (topic !== undefined) questions[idx].topic = topic;
    if (options !== undefined) questions[idx].options = options;
    writeJSONFile(QUESTIONS_PATH, questions);
  }

  res.json({ success: true, message: "Question overrides saved and compiled successfully" });
});

// 4. Edit/Save Explanations
app.post("/api/explanations/edit", (req, res) => {
  const { paper, section, year, questionNumber, explanation } = req.body;

  if (!paper || !section || !year || !questionNumber || explanation === undefined) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  const explanations = readJSONFile(EXPLANATIONS_PATH, {});
  if (!explanations[paper]) explanations[paper] = {};
  if (!explanations[paper][section]) explanations[paper][section] = {};
  if (!explanations[paper][section][year]) explanations[paper][section][year] = {};

  explanations[paper][section][year][questionNumber] = explanation;
  const success = writeJSONFile(EXPLANATIONS_PATH, explanations);

  if (success) {
    res.json({ success: true, message: "Explanation updated successfully" });
  } else {
    res.status(500).json({ success: false, message: "Failed to write explanation data" });
  }
});

// 5. Edit Revision Notes
app.post("/api/notes/edit", (req, res) => {
  const { paper, sectionKey, sectionId, content, label } = req.body;

  if (!paper || !sectionKey || !sectionId || content === undefined) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  const notes = readJSONFile(NOTES_PATH, {});
  if (notes[paper] && notes[paper][sectionKey]) {
    const secObj = notes[paper][sectionKey];
    const sectionIndex = secObj.sections.findIndex((s: any) => s.id === sectionId);
    if (sectionIndex !== -1) {
      secObj.sections[sectionIndex].content = content;
      if (label !== undefined) {
        secObj.sections[sectionIndex].label = label;
      }
      writeJSONFile(NOTES_PATH, notes);
      return res.json({ success: true, message: "Note section updated successfully" });
    }
  }

  res.status(404).json({ success: false, message: "Revision note section not found" });
});

// 6. Gemini Study Assistant / Q&A Proxy
app.post("/api/chat", async (req, res) => {
  const { messages, context } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Messages array is required" });
  }

  try {
    // Generate system prompt incorporating context if provided
    let systemInstruction = "You are an expert UPSC ISS (Indian Statistical Service) Statistics teacher, mentor, and assistant.\n" +
      "Help students master statistics, linear models, inference, probability, sampling, demography, official statistics, computer processing, etc.\n" +
      "Explain complex formulas step-by-step using precise mathematical notation with LaTeX syntax.\n" +
      "Provide exam tips, tricks, and common pitfalls.\n" +
      "Keep explanations clear, structured, and focused. Frame formulas within standard LaTeX delimiters: \\( ... \\) for inline math and \\[ ... \\] for block math.\n";

    if (context) {
      systemInstruction += `\nHere is some context about the current study item the user is looking at:\n${context}\n`;
    }

    // Format chat history for Gemini API
    const contents = messages.map((m: any) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    }));

    // Stream the result using generateContentStream
    const responseStream = await ai.models.generateContentStream({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
      },
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


// ==================== VITE MIDDLEWARE / STATIC SERVING ====================

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development middleware mounted.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving compiled static assets from dist/");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`UPSC ISS Question Bank Server running on http://localhost:${PORT}`);
  });
}

startServer();
