import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

// Initialize Gemini SDK with User-Agent for telemetry
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

const DATA_DIR = path.join(process.cwd(), "src/data");
const QUESTIONS_PATH = path.join(DATA_DIR, "questions.json");
const EXPLANATIONS_PATH = path.join(DATA_DIR, "explanations.json");

async function main() {
  if (!process.env.GEMINI_API_KEY) {
    console.error("GEMINI_API_KEY is not defined in the environment!");
    process.exit(1);
  }

  console.log("Reading data files...");
  const questions = JSON.parse(fs.readFileSync(QUESTIONS_PATH, "utf8"));
  const explanations = JSON.parse(fs.readFileSync(EXPLANATIONS_PATH, "utf8"));

  // Ensure path structures exist in explanations
  if (!explanations.paper3) explanations.paper3 = {};

  // Find all missing 2026 Paper 3 questions
  const paper3Questions = questions.filter(
    (q) => q.paper === "paper3" && q.year === 2026
  );

  const missing = [];
  for (const q of paper3Questions) {
    const numStr = String(q.number);
    const hasExpl =
      explanations.paper3[q.section] &&
      explanations.paper3[q.section]["2026"] &&
      explanations.paper3[q.section]["2026"][numStr];

    if (!hasExpl || explanations.paper3[q.section]["2026"][numStr].trim().length < 100) {
      missing.push(q);
    }
  }

  console.log(`Found ${missing.length} missing questions for Paper 3, 2026.`);
  if (missing.length === 0) {
    console.log("No missing questions to generate! All 2026 questions are present.");
    return;
  }

  const models = ["gemini-3.1-flash-lite", "gemini-flash-latest", "gemini-3.5-flash"];

  for (const q of missing) {
    console.log(`\nGenerating explanation for Paper 3, 2026, Section: ${q.section}, Q: ${q.number}...`);

    const systemInstruction = 
      "You are an expert university professor and UPSC ISS (Indian Statistical Service) Statistics examiner.\n" +
      "Your goal is to write a highly rigorous, mathematically complete, and step-by-step model solution for the given subjective exam question.\n" +
      "Format rules:\n" +
      "1. Start directly with '<h3><b>UPSC ISS Statistics Paper III (2026) — Model Solution</b></h3><br>'.\n" +
      "2. Structure your response using markdown with clear headings, paragraphs, and lists.\n" +
      "3. Frame formulas within standard LaTeX delimiters: use '$$ ... $$' for block equations and '$ ... $' for inline equations.\n" +
      "4. Ensure ALL mathematical steps, matrix derivations, calculations, and explanations are fully derived. Do not hand-wave, skip steps, or write placeholders. Every mathematical symbol must be defined and correct.\n" +
      "5. Use proper HTML tags like <p>, <br>, <ul>, <li> alongside Markdown if needed, but keep it clean. End the proof or model solution with a bold Q.E.D indicator like <span style=\"color: green;\"><b>[Q.E.D.]</b></span>.\n" +
      "6. Do NOT include any introductory or concluding conversational text outside the model solution itself. Only output the solution content.";

    const userPrompt = `
Question details:
Paper: UPSC ISS Statistics Paper III
Year: 2026
Section: ${q.section} (Topic: ${q.topic})
Question Number: ${q.number}

Question text:
${q.text}

${q.context ? `Context/preamble of question:\n${q.context}` : ""}
${q.table ? `Table data provided with question:\n${q.table}` : ""}

Please generate the complete, mathematically rigorous model solution for this question following the system instructions.
`;

    let success = false;
    let attempts = 0;

    while (!success && attempts < 5) {
      const modelName = models[attempts % models.length];
      attempts++;
      console.log(`Attempt ${attempts} using model: ${modelName}...`);

      try {
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Request timed out after 90 seconds")), 90000)
        );
        const apiPromise = ai.models.generateContent({
          model: modelName,
          contents: userPrompt,
          config: {
            systemInstruction: systemInstruction,
            temperature: 0.15,
          }
        });
        const response = await Promise.race([apiPromise, timeoutPromise]);

        const text = response.text;
        if (!text || text.trim().length < 100) {
          throw new Error("Empty or extremely short response from Gemini");
        }

        // Save to explanations object
        if (!explanations.paper3[q.section]) explanations.paper3[q.section] = {};
        if (!explanations.paper3[q.section]["2026"]) explanations.paper3[q.section]["2026"] = {};
        
        explanations.paper3[q.section]["2026"][String(q.number)] = text.trim();
        success = true;
        console.log(`Successfully generated explanation for Q: ${q.number} using model: ${modelName}`);
      } catch (err) {
        console.error(`Attempt ${attempts} failed for Q: ${q.number} with model ${modelName}. Error:`, err.message || err);
        if (attempts >= 5) {
          console.error(`Skipping Q: ${q.number} after 5 failed attempts.`);
        } else {
          console.log("Waiting 10 seconds before next attempt...");
          await new Promise((resolve) => setTimeout(resolve, 10000));
        }
      }
    }

    // Intermediary write to prevent data loss
    if (success) {
      fs.writeFileSync(EXPLANATIONS_PATH, JSON.stringify(explanations, null, 2), "utf8");
    }
  }

  console.log("\nAll missing explanations for Paper 3 2026 have been processed and saved!");
}

main().catch(console.error);
