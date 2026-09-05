# Statika — UPSC ISS & UPHESC Statistics Portal

> **Interactive revision portal for UPSC Indian Statistical Service (ISS) and UPHESC Assistant Professor (Statistics) aspirants.**  
> ISS Papers I–IV · General English · General Studies · UPHESC 10-unit notes · Official syllabi · Model answers · Light & dark themes · AI study assistant

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

Statika is a single-page study app with **light and dark** themes (persisted in `localStorage`) and a frosted glass UI. Switch **exam mode** in the sidebar between **UPSC ISS** and **UPHESC Assistant Professor** — filters, notes, and the syllabus modal stay scoped to that mode.

### UPSC ISS

It covers the full written ISS suite:

| Paper | Type | Years |
|-------|------|-------|
| **Paper I** | Objective (MCQ) | 2017–2026 |
| **Paper II** | Objective (MCQ) | 2017–2026 |
| **Paper III** | Subjective | 2016–2026 |
| **Paper IV** | Subjective | 2016–2026 |
| **General English** | Subjective | 2016–2026 |
| **General Studies** | Subjective | 2016–2026 |

### Statistics papers
Model solutions for Papers III & IV are step-by-step answers grounded in standard textbooks (Cochran, Gujarati & Porter, Box–Jenkins, Brockwell & Davis, Greene, Kendall & Stuart, Montgomery, Casella & Berger, etc.).

Paper IV sections include Demography & Vital Statistics, SQC, Operations Research, Survival Analysis, Multivariate Analysis, Design of Experiments, and Computing with C/R.

### General English & General Studies
- Structured PYQs with essay, précis, paragraph, word usage, idioms, and sentence correction (GE)
- Four GS blocks matching the ISS paper: History & Culture · Geography / Environment & Science · Economy & Social Development · Polity / Governance & IR
- Model answers in UPSC-style point format (~200 words for GS; fuller essays/précis for GE)
- **2021** rebuilt from the authentic Drive PDFs (previously duplicated 2022 by mistake)
- **2026** papers added from the latest exam PDFs
- Year filter is paper-specific and updates dynamically (GE/GS show 2016–2026)

> Descriptive GE/GS papers have **no official UPSC answer key**. Bundled answers are high-quality model solutions grounded in NCERT, Laxmikanth, Constitution articles, and official scheme documentation (e.g. COP26 Panchamrit, PMJVM / TRIFED).

### UPHESC Assistant Professor — Statistics (Subject Code-77)

Unit-wise preparation notes aligned to the official U.P. Higher Education Services Commission syllabus. Content lives in `uphesc_notes.json` (not mixed into ISS notes).

| Unit | Title |
|------|--------|
| 1 | Probability Theory |
| 2 | Distribution Theory |
| 3 | Statistical Methods |
| 4 | Statistical Quality Control and Time Series |
| 5 | Demography and Index Numbers |
| 6 | Statistical Inference |
| 7 | Sampling Theory |
| 8 | Linear Estimation and Design of Experiments |
| 9 | Multivariate Analysis |
| 10 | Advance Probability Theory |

Each unit includes syllabus-mapped sections, MathJax formulas, comparison tables, and exam tips / common pitfalls. The in-app syllabus view matches the official notification (no ISS/UPHESC tab mixing).

---

## Features

### Exam modes
- Sidebar switcher: **UPSC ISS** vs **UPHESC A.P.**
- ISS mode: PYQs + revision notes + ISS syllabus
- UPHESC mode: 10-unit notes + UPHESC syllabus only
- Filter chips and URL params (`mode`, paper, section, year, notes) stay consistent with the selected exam

### Theme
- **Light / dark** toggle in the header (moon / sun)
- Preference stored as `statika-theme` in `localStorage`
- Shared indigo (ISS) / violet (UPHESC) accents on both themes

### PYQ module (ISS)
- Filter by **Paper → Subject section → Year** (borderless radio lists + year pills)
- **Newest-year-first** ordering when “All years” is selected
- **URL persistence** — reload restores exam mode, paper, section, year, and notes context
- **Show Answer** renders HTML + LaTeX via MathJax 3; tables scroll horizontally on mobile
- **Copy question / copy answer** — plain-text clipboard with context, tables, and options
- Collapsible **draft answer** box for subjective papers (localStorage)
- **Ask AI** opens a context-aware study chat
- Progress tracking across the bank

### Revision notes
- ISS: formula sheets and proofs for Papers I–IV
- UPHESC: comprehensive notes for all 10 official units
- Accordion layout; mobile-friendly topic chips and scrollable tables

### Official syllabus
- ISS: Papers I–IV sections (same pattern as the UPSC scheme)
- UPHESC: Units 1–10 from the official Code-77 notification
- Opens locked to the exam you clicked — no mixed tabs

### AI study assistant
- Server-side **Gemini API** chat
- Explain derivations, evaluate drafts, clarify syllabus topics

### Admin panel
- Edit questions, answer keys, explanations, and notes in-browser
- Toggle from the app footer (credentials via env)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [React 19](https://react.dev/) + [Vite 6](https://vite.dev/) |
| Language | [TypeScript 5](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Math | [MathJax 3](https://www.mathjax.org/) (`tex-chtml`) |
| Server | [Express 4](https://expressjs.com/) (Node / `tsx`) |
| AI | [Google Gemini API](https://ai.google.dev/) (`@google/genai`) |

---

## Project Structure

```
.
├── index.html
├── package.json
├── vite.config.ts
├── server.ts
├── scripts/                         # Bulk content / conversion helpers
│   ├── convert_gen_papers.cjs       # staticPapersData → gen_papers_*.json
│   ├── gs_answers_2021_2026.py      # GS model answers (2021 & 2026)
│   ├── update_ge_gs_2021_2026.py    # Rebuild GE/GS questions for those years
│   └── generate_paper4_*.cjs        # Paper IV answer injection by year
│
├── src/
│   ├── App.tsx                      # Shell: exam mode, theme, filters, URL state
│   ├── types.ts
│   ├── index.css                    # Tailwind v4 + light/dark tokens
│   ├── components/
│   │   ├── QuestionCard.tsx         # PYQ card, copy, draft, answer panel
│   │   ├── MathJaxRenderer.tsx
│   │   ├── MathQuestionSeparator.tsx
│   │   ├── RevisionNotes.tsx
│   │   ├── StudyAssistant.tsx
│   │   ├── AdminPanel.tsx
│   │   ├── EditQuestionModal.tsx
│   │   ├── EditExplanationModal.tsx
│   │   ├── EditNoteModal.tsx
│   │   └── SyllabusModal.tsx
│   └── data/
│       ├── questions.json           # Statistics Papers I–IV
│       ├── explanations.json        # Statistics model solutions
│       ├── answers.json             # MCQ answer keys
│       ├── notes.json               # ISS revision notes (Papers I–IV)
│       ├── uphesc_notes.json        # UPHESC Asst. Prof. notes (Units 1–10)
│       ├── gen_papers_questions.json    # General English + Studies questions
│       └── gen_papers_explanations.json # GE/GS model answers
│
└── assets/
```

---

## Data Architecture

### Statistics — `questions.json` / `explanations.json` / `answers.json`

Question objects:

```ts
{
  paper:   "paper1" | "paper2" | "paper3" | "paper4",
  section: string,          // e.g. "sampling", "demography"
  year:    number,
  number:  number,
  topic:   string,
  text:    string,          // HTML + LaTeX
  context: string | null,
  table:   string | null,
  options: { label: string; text: string }[]  // empty for subjective
}
```

Explanations are nested: `paper → section → year (string) → number (string)`.

### General papers — `gen_papers_questions.json` / `gen_papers_explanations.json`

Same question shape with:

```ts
paper: "general_english" | "general_studies"
marks?: number | string
```

**GE sections:** `essay` · `precis` · `paragraph` · `word_usage` · `grammar_idiom` · `grammar_correct`  
**GS sections:** `history_culture` · `geography_env` · `economy_social` · `polity_ir`

The app merges statistics + general JSON at load time. Years in the filter are derived from loaded questions (no hard-coded year list).

### Notes — `notes.json` / `uphesc_notes.json`

Same `NoteBook` shape: `paper → sectionKey → { title, sections[], tips? }`.

- ISS books: `paper1` … `paper4`
- UPHESC book: `uphesc` with keys `unit1` … `unit10`

`App.tsx` merges both files into one notes store; the drawer only shows the book for the active exam mode.

---

## Getting Started

### Prerequisites
- **Node.js** ≥ 18  
- **npm** ≥ 9  

### 1. Clone and install

```bash
git clone <repo-url>
cd statika
npm install
```

### 2. Environment

```bash
cp .env.example .env.local
# Add GEMINI_API_KEY (and admin credentials if using Admin Panel)
```

### 3. Develop

```bash
npm run dev
```

App at **http://localhost:3000**.

### 4. Production build

```bash
npm run build
npm run start
```

---

## Environment Variables

```env
# Required for AI Study Assistant
GEMINI_API_KEY=your_google_gemini_api_key_here

# Optional
PORT=3000
```

See `.env.example` for the full template (including admin-related keys if present).

---

## Scripts Reference

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server with HMR |
| `npm run build` | Production client + server bundles |
| `npm run start` | Serve production build |
| `npm run clean` | Remove `dist/` |
| `npm run lint` | TypeScript check |

### Content helpers (`scripts/`)

| Script | Purpose |
|--------|---------|
| `convert_gen_papers.cjs` | Convert static general-paper source → `gen_papers_*.json` |
| `update_ge_gs_2021_2026.py` | Rebuild GE/GS **questions** for 2021 & 2026 |
| `gs_answers_2021_2026.py` | Patch GS **explanations** for 2021 & 2026 |
| `patch_explanations_2021_2026.py` | Patch GE explanations (uses companion answer modules) |
| `generate_paper4_<year>.cjs` | Inject Paper IV model solutions for a given year |

Run Python helpers from `scripts/`:

```bash
cd scripts
python3 gs_answers_2021_2026.py
```

---

## Adding / Updating Content

### Statistics question / explanation
1. Edit `src/data/questions.json` and/or `explanations.json` (and `answers.json` for MCQs).
2. Or use the Admin Panel in development.

### General English / Studies
1. Prefer updating `gen_papers_questions.json` and `gen_papers_explanations.json`.
2. Keep GS keys aligned with question numbers (`1`–`20` across the four sections).
3. After adding a year, the year pills update automatically.

### New exam year (any paper)
1. Add questions (+ explanations / answer keys as needed).
2. No App.tsx year-list change required — filters are data-driven.
3. List order is sorted **newest year first** in the UI.

### UPHESC notes
1. Edit `src/data/uphesc_notes.json` under the relevant `unitN` key.
2. Keep Markdown + MathJax (`\\( \\)` / `\\[ \\]`) consistent with existing units.
3. Wide tables should be Markdown tables — the renderer wraps them for mobile scroll.
4. Or use the Admin Panel **Edit Note** flow while in UPHESC mode.

---

## Deployment

| Platform | Notes |
|----------|-------|
| **Railway / Render** | `npm run build && npm run start` |
| **VPS** | Same, behind Nginx |
| **Vercel** | Needs an Express-compatible adapter; Railway/Render are simpler |

Set `GEMINI_API_KEY` (and any admin secrets) as environment variables on the host.

---

## Contributing

1. **Statistics explanations:** Rigorous derivations; cite standard texts; keep MathJax-friendly markup.
2. **GE/GS model answers:** Structured UPSC style; prefer verifiable facts (Articles, Acts, official scheme names). Do not invent statistics or case citations.
3. **UPHESC notes:** Stay aligned to the official Code-77 syllabus wording; keep ISS and UPHESC JSON separate.
4. **Bug fixes / features:** Clear PRs; discuss large features in an issue first.
5. Do not commit `.env`, `.env.local`, or `__pycache__/`.

---

*Built for UPSC ISS and UPHESC Statistics aspirants who take preparation seriously.*
