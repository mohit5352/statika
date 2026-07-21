# Statika — UPSC ISS Statistics Question Bank

> **The complete interactive revision portal for UPSC Indian Statistical Service (ISS) aspirants.**  
> Previous-year questions (2016–2026) · Model solutions · Formula sheets · AI study assistant

---

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Project Structure](#project-structure)
5. [Data Architecture](#data-architecture)
6. [Getting Started](#getting-started)
7. [Environment Variables](#environment-variables)
8. [Scripts Reference](#scripts-reference)
9. [Adding / Updating Content](#adding--updating-content)
10. [Deployment](#deployment)
11. [Contributing](#contributing)

---

## Overview

Statika is a high-performance, single-page application built around a **Bone & Charcoal Glassmorphism UI** optimized for long sessions of intense mathematical reading. It covers all four UPSC ISS Statistics papers:

| Paper | Type | Coverage |
|-------|------|----------|
| Paper I   | Objective (MCQ)           | 2017–2026 |
| Paper II  | Objective (MCQ)           | 2017–2026 |
| Paper III | Subjective (Descriptive)  | 2016–2026 |
| Paper IV  | Subjective (Descriptive)  | 2016–2026 |

All answers and explanations for Papers III & IV are **rigorous, step-by-step model solutions** grounded in standard authoritative textbooks (Cochran, Gujarati & Porter, Box-Jenkins, Brockwell & Davis, Greene, Kendall & Stuart, Montgomery, Casella & Berger, etc.).

Paper IV model solutions cover all sections:
- **Demography & Vital Statistics** — life tables, fertility/mortality rates, population models, Indian Census data
- **Statistical Quality Control** — control charts (Shewhart, CUSUM, EWMA), process capability (Cₚ, Cₚₖ), acceptance sampling (SSP, DSP, sequential), OC curves

---

## Features

### PYQ Module
- Filter by **Paper → Section → Year** with zero page reloads
- **URL persistence** — filters are encoded in the URL; reloading restores the exact view
- **Show Answer** renders full HTML + LaTeX via MathJax 3
- **Copy Question** outputs GitHub-flavored Markdown for note-taking
- **Ask AI** opens a context-aware chat for the selected question
- Progress tracking with per-session score counter

### Revision Notes
- Built-in formula sheets and proofs for all four paper syllabi:
  - **Paper I**: Probability, Numerical Analysis, Computer Applications
  - **Paper II**: Linear Models, Statistical Inference, Official Statistics
  - **Paper III**: Sampling, Econometrics, Time Series, Applied Statistics
  - **Paper IV**: Operations Research, Demography, Survival Analysis, SQC, Multivariate Analysis, Design of Experiments
- Accordion layout with responsive, dense typography optimised for long study sessions

### AI Study Assistant
- Inline chat backed by server-side **Gemini API** endpoints
- Can explain derivations, suggest practice, and clarify syllabus topics
- Streamed responses for snappy UX

### Admin Panel
- In-browser modals to edit questions, answer keys, explanations, and notes
- Toggle with admin credentials from the app footer
- Changes write directly to the JSON data files (development only)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [React 19](https://react.dev/) + [Vite 6](https://vite.dev/) |
| Language | [TypeScript 5](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Math rendering | [MathJax 3](https://www.mathjax.org/) (`tex-chtml`) |
| Animations | [Motion](https://motion.dev/) |
| Server | [Express 4](https://expressjs.com/) (Node/TypeScript via `tsx`) |
| AI | [Google Gemini API](https://ai.google.dev/) (`@google/genai`) |
| Build tooling | `esbuild` (server bundle) · `vite build` (client bundle) |

---

## Project Structure

```
.
├── index.html                  # HTML shell — meta tags, MathJax bootstrap
├── package.json
├── vite.config.ts              # Vite + Tailwind plugin config
├── tsconfig.json
├── server.ts                   # Express server — API routes + static serving
├── metadata.json               # App capabilities descriptor
│
├── src/
│   ├── main.tsx                # React entry point
│   ├── App.tsx                 # Root shell: sidebar, routing, global state
│   ├── index.css               # Tailwind directives + global styles
│   ├── types.ts                # Shared TypeScript interfaces & enums
│   │
│   ├── components/
│   │   ├── QuestionCard.tsx        # PYQ card: render, answer reveal, actions
│   │   ├── MathJaxRenderer.tsx     # High-performance MathJax re-render wrapper
│   │   ├── RevisionNotes.tsx       # Accordion formula-sheet module
│   │   ├── StudyAssistant.tsx      # AI chat assistant panel
│   │   ├── AdminPanel.tsx          # Admin toggle and action dispatcher
│   │   ├── EditQuestionModal.tsx   # Modal: edit question text + options
│   │   ├── EditExplanationModal.tsx# Modal: edit model answer / explanation
│   │   ├── EditNoteModal.tsx       # Modal: edit revision note section
│   │   └── SyllabusModal.tsx       # Syllabus overview modal
│   │
│   ├── data/
│   │   ├── questions.json      # All PYQ question objects (Papers I–IV, 2016–2026)
│   │   ├── explanations.json   # Model solutions keyed by paper/section/year/number
│   │   └── notes.json          # Revision notes and formula sheets
│   │
│   └── scripts/ (root level)   # Bulk-injection scripts for model answers
│       └── generate_paper4_<year>.cjs  — one script per year, run once to inject answers
│
└── assets/
    └── og-cover.png            # Open Graph share image (1200×630)
```

---

## Data Architecture

### `questions.json`

An array of question objects. Each object has:

```ts
{
  paper:   "paper1" | "paper2" | "paper3" | "paper4",
  section: "sampling" | "econometrics" | "timeseries" | "applied" | ...,
  year:    number,          // e.g. 2023
  number:  number,          // e.g. 1.1 (Q1 part a) or 42 (MCQ)
  topic:   string,
  text:    string,          // HTML string, may contain LaTeX delimiters $ … $
  context: string | null,   // Optional preamble / reading passage
  table:   string | null,   // Optional Markdown table
  options: string[]         // MCQ options (Papers I & II); empty array for III & IV
}
```

### `explanations.json`

Nested object keyed as `paper → section → year (string) → question number (string)`.  
Values are HTML strings with embedded LaTeX (`$ … $` / `$$ … $$`).

```jsonc
{
  "paper3": {
    "sampling": {
      "2023": {
        "1.1": "<h3>...</h3><p>...</p>$$...$$<span style='color:green'><b>[Q.E.D.]</b></span>"
      }
    }
  }
}
```

**Explanation format conventions (Papers III & IV):**
- Start with `<h3>` title, then structured `<h4>` / `<p>` / `<ul>` / `<ol>` blocks
- Block equations: `$$...$$` — inline equations: `$...$` (rendered by MathJax 3)
- End with `<span style="color:green"><b>[Q.E.D.]</b></span>` for derivations
- No backgrounds on table `<tr>` header rows (stripped for consistent dark-theme rendering)
- Paper IV: use `\(` `\)` for inline and `\[` `\]` for display math (both MathJax formats supported)

### `notes.json`

Array of revision-note section objects used by `RevisionNotes.tsx`.

---

## Getting Started

### Prerequisites
- **Node.js** ≥ 18
- **npm** ≥ 9

### 1. Clone and install

```bash
git clone <repo-url>
cd statika-upsc-iss
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env
# Edit .env and add your GEMINI_API_KEY
```

See [Environment Variables](#environment-variables) for details.

### 3. Start the development server

```bash
npm run dev
```

Opens at **http://localhost:3000** with hot-module replacement.

### 4. Build for production

```bash
npm run build
```

Produces:
- `dist/` — optimised client bundle (Vite)
- `dist/server.cjs` — bundled Express server (esbuild)

### 5. Run the production build locally

```bash
npm run start
```

---

## Environment Variables

Create a `.env` file in the project root:

```env
# Required — Gemini API key for the AI Study Assistant
GEMINI_API_KEY=your_google_gemini_api_key_here

# Optional — port override (default: 3000)
PORT=3000
```

The AI assistant gracefully degrades (hides the chat panel) if `GEMINI_API_KEY` is not set.

---

## Scripts Reference

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with HMR at `localhost:3000` |
| `npm run build` | Production build (client + server bundles) |
| `npm run start` | Serve the production build |
| `npm run clean` | Remove the `dist/` directory |
| `npm run lint` | TypeScript type-check (no emit) |

### Bulk answer-injection scripts

Scripts in `scripts/generate_paper4_<year>.cjs` inject model solutions for Paper IV (Demography & SQC) into `explanations.json`. Run once per year:

```bash
node scripts/generate_paper4_2026.cjs   # injects 2026 answers
node scripts/generate_paper4_2025.cjs   # injects 2025 answers
# ...etc down to 2016
```

Each script is idempotent — safe to re-run; it overwrites its own keys only.

---

## Adding / Updating Content

### Adding a new question

Add an object to `src/data/questions.json` following the schema above. The UI will automatically pick it up on next render.

### Adding / editing a model solution (explanation)

Explanations live in `src/data/explanations.json`. Key path: `paper3 → <section> → "<year>" → "<number>"`.

To bulk-add explanations for a year, write a one-off Node script in `src/scripts/`:

```js
// src/scripts/patch_2025.js  (ESM, run with: node src/scripts/patch_2025.js)
import fs from "fs";
const EP = "./src/data/explanations.json";
const exp = JSON.parse(fs.readFileSync(EP, "utf8"));

exp.paper3.sampling["2025"]["1.1"] = `<h3>...</h3>...`;

fs.writeFileSync(EP, JSON.stringify(exp, null, 2), "utf8");
```

Delete the script after running.

### Updating revision notes

Edit `src/data/notes.json` directly, or use the in-app **Admin Panel** (toggle from the footer).

### Adding a new exam year

1. Add all question objects for the year to `questions.json`
2. Add corresponding explanations to `explanations.json` (or write a `scripts/generate_paper4_<year>.cjs` bulk-inject script)
3. The year filter in the UI updates dynamically — no code changes needed
4. The year range label in the drawer (e.g. "All Years (2016–2026)") also updates automatically

---

## Deployment

The app is a standard Node/Express + Vite SPA. It can be deployed to any platform that runs Node.js:

| Platform | Notes |
|----------|-------|
| **Railway / Render** | Point to `npm run build && npm run start` |
| **Fly.io** | Use the included `Dockerfile` if added, or `npm run start` |
| **Vercel** | Not recommended (requires Express adapter); use Railway instead |
| **VPS / EC2** | `npm run build && npm run start` behind Nginx reverse-proxy |

Set `GEMINI_API_KEY` as a secret environment variable on the hosting platform.

---

## Contributing

1. **Questions / Explanations:** Follow the [data format conventions](#data-architecture). All answers must be mathematically rigorous and grounded in standard textbooks (Cochran, Gujarati & Porter, Box-Jenkins, Brockwell & Davis, Greene, etc.).
2. **Bug fixes:** Open a PR with a clear description of the bug and the fix.
3. **New features:** Discuss in an issue first before opening a large PR.
4. **Explanation quality bar:** Every model answer must include: header `<h3>`, section references, full derivations (no skipped steps), and the `[Q.E.D.]` marker.

---

*Built for UPSC ISS aspirants who take statistics seriously.*
