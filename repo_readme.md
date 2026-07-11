# UPSC ISS Statistics Question Bank

> 🌐 **Live:** [**Vercel**](https://iss-statistics-question-bank.vercel.app/) (primary, with API) · [GitHub Pages](https://mohit5352.github.io/iss-statistics-question-bank/main.html) — Free UPSC ISS Statistics question bank covering all four papers. **Paper I:** Probability & Statistics, Numerical Analysis, Computer. **Paper II:** Linear Models, Statistical Inference, Official Statistics. **Papers III & IV:** comprehensive descriptive-type **Revision Notes** (Sampling Techniques, Econometrics, Applied Statistics, Demography & Vital Statistics, Quality Control). 2017–2025. MathJax, instant answers, **Revision Notes** with markdown + LaTeX. **Study chat** (local **Ollama**) and per-question **Ask AI** are available **only after admin login** (same session as answer corrections).

This repository contains a web-based archive of **objective MCQs** from UPSC ISS **Statistics Paper I** and **Statistics Paper II**, plus comprehensive **Revision Notes** for all four ISS Statistics papers. Organised by **paper**, **section**, and **year**. Aligned with the official UPSC ISS syllabus:

**Paper I (Objective):**
- Probability & Statistics
- Numerical Analysis
- Computer Section

**Paper II (Objective):**
- Linear Models
- Statistical Inference and Hypothesis Testing
- Official Statistics

**Paper III (Descriptive — Revision Notes only):**
- Sampling Techniques (SRS, Stratified, Systematic, PPS, Cluster, Multistage)
- Econometrics (OLS/GLS, Autocorrelation, IV, Simultaneous Equations)
- Applied Statistics (Index Numbers, Time Series, ARIMA, Spectral Analysis)

**Paper IV (Descriptive — Revision Notes only):**
- Demography & Vital Statistics (Life Tables, Fertility/Mortality Rates, Migration, Projections)
- Quality Control (Control Charts, CUSUM/EWMA, Acceptance Sampling)

## 📁 File Structure

```
statistics_question_bank/
├── main.html                                      # Main navigation interface (paper + section + year switcher)
├── login.html                                     # Admin login — full-page photo; glass sign-in card; transparent hero chips + form fields
├── assets/
│   ├── top-hero-image-dark.webp                   # Sticky hero — dark theme (--top-hero-image)
│   ├── top-hero-image-light.webp                  # Sticky hero — light theme
│   ├── page-hero-image-dark.webp                  # Full-page backdrop — dark (--page-hero-image)
│   ├── page-hero-image-light.webp                 # Full-page backdrop — light (glass UI)
│   ├── IMAGE-PROMPTS.md                           # AI prompts for all four images
│   └── README.md                                  # Export specs, CSS tuning, QA checklist
│   # Optional unused duplicates (not wired in CSS): top-hero-image.webp, page-hero-image.webp
├── fonts.css                                      # Adobe font stacks (Freight Display/Big Pro, Atvik) + fallbacks
├── styles.css                                     # Bone & Charcoal glass theme, layout, components
├── answers.js                                     # Centralized answer keys for Show Answer feature
├── explanations.js                                # Explanations for each question (skeleton mirrors answers.js; empty template literals)
├── question_edits.js                              # Admin question edits (text, topic, options overrides)
├── notes.js                                       # Revision Notes for all 4 papers/sections (77 sections total; markdown + LaTeX)
├── syllabus.md                                    # ISS syllabus text (loaded into the chat system prompt for scope)
├── server.py                                      # Local server: static files + APIs + Ollama proxy (/api/ollama/chat, /api/ollama/health); writes answers/explanations/notes/question_edits; auth
├── chat/                                          # Study chat UI (Ollama, streaming, markdown + MathJax); loaded only for admins
│   ├── bootstrap.js                               # If session is admin: mounts ChatApp, sets window.questionBankChat for Ask AI
│   ├── app.js                                     # ChatApp: panel, streaming, typing indicator, prefillAndOpen()
│   ├── config.js                                  # Endpoints, default model, localStorage keys
│   ├── prompts.js                                 # System prompt + syllabus injection
│   ├── stream-client.js                           # NDJSON stream from same-origin proxy
│   ├── markdown-math.js                           # Markdown + preserved LaTeX for assistant messages
│   └── chat.css                                   # Chat panel / FAB styles
├── api/
│   ├── correct.js                                 # Vercel serverless API for live answer corrections (single or batch; updates GitHub)
│   ├── explanations.js                            # Vercel serverless API for live explanation edits (updates explanations.js in GitHub)
│   ├── questions.js                               # Vercel serverless API for live question edits (updates question_edits.js in GitHub)
│   ├── notes.js                                   # Vercel serverless API for Revision Notes edits (updates notes.js in GitHub)
│   ├── auth.js                                    # Admin login validation (ADMIN_USERNAME, ADMIN_PASSWORD)
│   ├── config.js                                  # Public config (CONTACT_EMAIL for login page)
│   └── ollama/
│       ├── chat.js                                # Vercel: stream JSON body to remote Ollama (needs OLLAMA_HOST)
│       └── health.js                              # Vercel: proxy GET /api/tags for status
├── vercel.json                                    # Vercel config (rewrites / to main.html, /login to login.html)
├── robots.txt                                     # Search engine crawl rules; points to sitemap
├── sitemap.xml                                    # Sitemap for search engines and AI crawlers
├── .env.example                                   # Example env vars (admin + optional OLLAMA_HOST for local proxy)
├── DEPLOYMENT.md                                  # Deployment guide for Vercel (live corrections, explanations, notes + admin login)
├── QUICK_START.md                                 # Quick start guide
├── start-server.sh                                # Quick start script for local server (Mac/Linux)
├── start-server.bat                               # Quick start script for local server (Windows)
├── pdfs/                                          # Source PDFs for all sections
├── extracted_htmls/                               # Extracted question HTML files
│   ├── stats_paper_1/
│   │   ├── Probability_&_Statistics/
│   │   │   └── Probability_and_Statistics_questions_YYYY.html
│   │   ├── Numerical_Analysis/
│   │   │   └── Numerical_Analysis_questions_YYYY.html
│   │   └── Computer/
│   │       └── Computer_questions_YYYY.html
│   └── stats_paper_2/
│       ├── Linear_Models/
│       │   └── Linear_Models_questions_YYYY.html
│       ├── Statistical_Inference_and_Hypothesis_Testing/
│       │   └── Statistical_Inference_and_Hypothesis_Testing_questions_YYYY.html
│       └── Official_Statistics/
│           └── Official_Statistics_questions_YYYY.html
└── README.md                                      # This file
```

## 🚀 Quick Start

### Desktop Usage (Easiest)
1. Open `main.html` directly in your web browser (double-click the file)
2. Select paper, section, and year from the dropdowns
3. Questions will load automatically

### Mobile Usage (Recommended: Local Web Server)
1. **Start the server** on your computer:
   - **Mac/Linux**: Double-click `start-server.sh` or run:
     ```bash
     cd "/path/to/statistics_question_bank"
     python3 server.py 8000
     ```
   - **Windows**: Double-click `start-server.bat` or run:
     ```cmd
     cd "path\to\statistics_question_bank"
     python server.py 8000
     ```
   - **Note**: `server.py` serves static files, **proxies Ollama** at `/api/ollama/chat` and `/api/ollama/health` (default `http://127.0.0.1:11434`), and supports **answer corrections** (`answers.js`), **explanation edits** (`explanations.js`), **Revision Notes** (`notes.js`), **question edits**, and **admin login**. The **Study chat** UI and **Ask AI** button load only when logged in as admin (`sessionStorage`); the Ollama proxy itself is not separately authenticated (same pattern as other write APIs — restrict network access if needed). For static-only serving, use `python3 -m http.server 8000` instead (no API routes, no Ollama proxy). For local login, create `.env` from `.env.example` and set `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `ADMIN_NAME`, `CONTACT_EMAIL`. Optional: `OLLAMA_HOST` if Ollama runs elsewhere.

2. **Find your computer's IP address**:
   - Mac: System Preferences → Network → IP Address
   - Windows: Run `ipconfig` → Look for IPv4 Address
   - Linux: Run `hostname -I`

3. **On your phone** (same WiFi network):
   - Open browser and go to: `http://YOUR_IP:8000/main.html`
   - Example: `http://192.168.1.100:8000/main.html`
   - Bookmark this URL for easy access!

**Note**: Mobile browsers block loading local files directly. Using a local web server is the most reliable method.

## 🖼 Hero & page backdrop images

The UI uses **four** production WebPs in `assets/` (green & gold editorial palette). CSS swaps them on theme toggle — see **[`assets/README.md`](assets/README.md)** and **[`assets/IMAGE-PROMPTS.md`](assets/IMAGE-PROMPTS.md)**.

| Asset | Variable | Used for |
|-------|----------|----------|
| `top-hero-image-dark.webp` / `top-hero-image-light.webp` | `--top-hero-image` | Sticky hero on `main.html` |
| `page-hero-image-dark.webp` / `page-hero-image-light.webp` | `--page-hero-image` | Full-page backdrop — questions/notes viewer (`PHOTO_BACKDROP`) and **`login.html`** |

**Behaviour:**

- **Sticky hero:** Photo stays pinned while scrolling; title compacts; mode/Paper/Year controls stay on the image (no separate solid toolbar). Theme toggle is a **bordered chip** on the photo (both themes).
- **Page backdrop:** When `body.app-photo-backdrop` is set, the page plate shows behind the viewer. **Dark:** frosted charcoal glass cards. **Light:** **transparent** question cards (blur + border) so the photo shows through; light page image must have visible texture (not flat white).
- **Mobile:** Same four files; CSS crops the 21:9 page plate via `--page-hero-position-mobile` (no separate mobile exports). Light mobile uses a transparent `body` over the photo so nothing paints solid bone between cards.

To replace images: regenerate from `assets/IMAGE-PROMPTS.md`, drop files in `assets/`, hard refresh. Tune scrims without re-exporting via `--page-backdrop-scrim`, `--hero-overlay-*` in `styles.css`.

To disable the page photo (solid theme only): set `PHOTO_BACKDROP = false` in `main.html` (removes `body.app-photo-backdrop`).

### Live Deployment (Vercel) — Answer Corrections, Explanations & Revision Notes on Production

To deploy so that **answer corrections**, **explanation edits**, and **Revision Notes** work on the live site (updating `answers.js`, `explanations.js`, and `notes.js` in GitHub), use **Vercel** (free tier). See **[DEPLOYMENT.md](DEPLOYMENT.md)** for step-by-step instructions (GitHub PAT, env vars, admin login, **Study chat** for admins on Vercel via `OLLAMA_HOST`). Set `GITHUB_TOKEN`, `GITHUB_OWNER`, `GITHUB_REPO` for corrections, explanations, and notes; and `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `ADMIN_NAME`, `CONTACT_EMAIL` for admin login.

## 🎯 Features

- **Sticky hero banner**: Theme-specific photo (`--top-hero-image` — dark/light WebPs in `assets/`) stays pinned while you scroll; title compacts to a shorter strip so controls remain on the image (no separate solid toolbar bar)
- **Page photo backdrop**: Theme-specific full-page plate (`--page-hero-image`) behind the questions/notes viewer when `app-photo-backdrop` is enabled — dark: frosted charcoal glass cards; light: transparent glass cards (blur + border) over a visible textured page photo
- **Paper Switcher**: Switch between all four ISS Statistics Papers
- **Section Switcher**:
  - Paper I: Probability & Statistics, Numerical Analysis, Computer
  - Paper II: Linear Models, Statistical Inference and Hypothesis Testing, Official Statistics
  - Paper III: Sampling Techniques, Econometrics, Applied Statistics *(Revision Notes only)*
  - Paper IV: Demography & Vital Statistics, Quality Control *(Revision Notes only)*
- **Year Navigation**: Browse questions from 2017 to 2025
- **Copy Button**: Each question has a copy button (📋) to easily copy the question text, topic, and options. Tables (`.q-table`) are emitted as **GitHub-flavored Markdown pipe tables** (with LaTeX in cells preserved when pre-MathJax capture ran) so paste and chat rendering stay structured.
- **Ask AI** (admin only): Sparkle icon next to Copy — same visibility as **Edit Question**. Opens **Study chat**, prefills the textarea with the current paper/section/year line plus the same text as Copy. Does not auto-send; edit and press **Send** when ready. Requires admin session, **Ollama**, and same-origin proxy (`server.py` locally, or Vercel + `OLLAMA_HOST`); see [DEPLOYMENT.md](DEPLOYMENT.md).
- **Study chat** (admin only): After **Admin Login**, `chat/chat.css` and `chat/bootstrap.js` load; floating **Chat** button and **⌘J** / **Ctrl+J** appear. Streams replies from **Ollama** through `/api/ollama/chat` (avoids browser CORS to `localhost:11434`). Loads `syllabus.md` into the system prompt. Default model is configurable in `chat/config.js` and in the UI (saved in `localStorage`). **Stop** aborts generation; **Clear** resets the thread. User and assistant bubbles use markdown + MathJax-safe LaTeX. **Not** official UPSC advice — verify facts on official sites.
- **Show Answer Button**: Eye icon (👁) that reveals the correct answer: a subtle tinted row (`--answer-highlight-*`), **(a)–(d)** label in the same **pill capsule** as the ✓ badge, and an animated checkmark on the right (matches mode toggle active segment / **KEY TOPICS** badge)
- **Admin Login**: An **Admin Login** link appears below the Paper/Section/Year controls. Only admins (logged in) can update answers, use **Study chat** / **Ask AI**, and other admin-only tools. See [Admin Login & Roles](#admin-login--roles).
- **Wrong Answer? / Correct Answer**: When logged in as admin and the answer is visible, a **Wrong Answer?** icon (⚠) appears at the top-right of the options grid. Click it to expand inline option chips (a)(b)(c)(d) — select the correct one to update `answers.js`. Corrections are **batched** (15s debounce) to minimize GitHub commits when deployed on Vercel. See [Answer Correction Scenarios](#-answer-correction-scenarios) for how updates work in different deployments.
- **Add/Edit Explanation**: When logged in as admin and the answer is visible, **Edit Explanation** opens the **same full-screen markdown editor** as Revision Notes (unified **`.revision-editor-unified`** card, **Split | Source | Preview**, **Cancel/Save**, live preview + MathJax, **?** tooltip on the source pane). The **question** strip uses **`<details>`**: summary = cloned **`.q-header`** (number + topic) + chevron on small screens (collapsed by default ≤720px); expanded body clones the **full stem** in DOM order — preceding **context-only** sibling cards, then **`q-context`**, **`q-text`**, **`q-table`**, **options** — aligned with **Copy / Ask AI** (`buildExplanationQuestionExpandBodyDom` in `main.html`). **MathJax** typesets the hero after open. Data: **`explanations.js`** / **`POST /api/explanations`** (same deployment pattern as answers).
- **Edit Question**: When logged in as admin, an **Edit Question** icon appears in the card header. Click it to edit the question text, topic, and options (supports LaTeX). Edits are stored in `question_edits.js` and follow the same deployment pattern as answers and explanations.
- **Revision Notes**: Mode toggle (**Questions** | **Revision Notes**) switches between the question bank and a revision notes viewer. Notes are organised by paper and section (e.g. Probability & Statistics, Linear Models). Features a **collapsible sidebar** for quick navigation between key topics. Each section has multiple subsections with titles and content. **Copy**, **Edit**, and **Delete** (admin) icon buttons appear in both the sidebar and each topic header. Add, edit, or delete sections; edit tips per topic. **Markdown** and **LaTeX** supported in notes. **Full-screen edit** (section content or topic tips) uses the **same shell** as explanation editing: **`.revision-editor-unified`** — one bordered surface with **breadcrumb** + **theme/close**, optional **title** row (notes only), **toolbar** (**Split** / **Source** / **Preview** | **Cancel** / **Save**), then the **split panes**. A compact **?** in the **Markdown source** header shows formatting tips in a **tooltip** (hover/focus). **Inline** “add section” flows still use a collapsible **Formatting help** (`<details class="note-format-hint">`) above a small textarea.
- **Questions Sidebar**: In Questions mode, a collapsible sidebar shows a Table of Contents with topic + question preview (ellipsis). Hover for full question text. **Hash routing** and **scroll sync** keep the active question highlighted as you scroll. **Outside click** closes the sidebar. On mobile, a floating **Questions** button (sticky glass FAB) opens the slide-out drawer.
- **Sidebar Navigation (Revision Notes)**: In Revision Notes mode, a sleek, collapsible sidebar provides an interactive Table of Contents. Each TOC item has **Copy**, **Edit**, and **Delete** (admin) icon buttons — Copy shows a checkmark "Copied" state like the question copy button. **Revision Tips** appears as the last TOC item when tips exist. The **active section is highlighted** as you scroll (works on both mobile and desktop). Links feature smooth hover transitions, a vertical bone/charcoal accent indicator, and bordered TOC rows (no fill). **Outside click** closes the sidebar. On mobile, the sidebar becomes a slide-out drawer accessible via a floating **Topics** button (same glass FAB as Questions).
- **Theme Toggle**: Sun/moon on the **hero photo** (bordered chip, top-right). Switches **dark/light** page chrome and swaps **`--top-hero-image`** / **`--page-hero-image`** to the matching WebP pair. Hero text: bone (dark) or charcoal (light). Preference in `localStorage`; `login.html` uses the same chip style on the hero panel.
- **Mobile optimized**: Touch-friendly controls; window scroll + sticky hero; page backdrop cropped for portrait (`--page-hero-position-mobile`); light theme keeps glass cards transparent on photo (see [Hero & page backdrop images](#-hero--page-backdrop-images))
- **Math Rendering**: MathJax with horizontal scroll for block formulas; in **Revision Notes** and callouts, `\[ ... \]` uses a bordered frame with accent stripe (no background fill); width-aware inline overflow (`.math-wide` after typeset)
- **Bone & Charcoal glass UI**: Strict **monochrome** palette — only **bone** (`#F1ECE3`) and **charcoal** (`#424242`), with steps derived via `color-mix` (no purple, green, or red accents). **Dark theme** (default): charcoal-deep page, frosted charcoal glass surfaces, bone text. **Light theme**: bone page, frosted bone glass, charcoal text. Highlights:
  - **Hero & login layout**: **Main** — sticky `--top-hero-image`; page `--page-hero-image` behind viewer (transparent glass cards in light). **Login** — full-viewport `--page-hero-image`; branding overlay + transparent **`.login-main`**; frosted glass only on **`.login-card`**; **Back**, theme toggle, inputs, and **Login** use transparent bordered controls (no fill). Prompts: `assets/IMAGE-PROMPTS.md`.
  - **Typography**: **Atvik** (sans) for UI; **Freight Display Pro** / **Freight Big Pro** (serif) for headings — via Adobe Fonts (`fonts.css`; uncomment Typekit link in `main.html` / `login.html` after adding your Web Project kit ID)
  - **Glass**: `backdrop-filter` on question cards, login card, chat panel; hero dock / mode tabs on the photo stay transparent (photo-native controls, not a second glass bar on scroll)
  - **Sticky FAB** (Questions | Topics): Frosted pill — `--fab-bg` / `--fab-bg-hover`, `--glass-border`, `backdrop-filter`, `--formula-shadow`; accent text (not filled `--pill-active-bg`)
  - **Bordered (no fill)**: Login hero chips + form fields, sidebar TOC rows, blockquotes, tip callouts, display math, and `.q-table` frames share `--glass-border` / `--formula-border` + `--formula-shadow` without background fills
  - **Paper Title (h1) / section titles**: Serif, bone (dark) or charcoal (light)
  - **Set Indicator**: Converging charcoal/bone gradient divider lines; `SET ◆ X` in accent tone
  - **Meta Controls**: Frosted pill panel; ALL-CAPS muted labels; bold accent values; hidden `<select>` overlay per zone
  - **Mode toggle** (Questions | Revision Notes): Segmented capsules — active segment uses `--pill-active-bg` / `--pill-active-fg` (same as **KEY TOPICS** badge and correct-answer ✓ / option labels)
  - **Floating FAB** (Questions | Topics): Glass pill (`--fab-bg`, blur + border + shadow); accent text (not filled `--pill-active-bg`)
  - **Question Cards**: On photo backdrop — dark: charcoal-tinted glass; light: **transparent** card (blur + border, no white fill) over `--page-hero-image`. Off backdrop: frosted `--surface-2` glass
  - **Question Number / header band**: Accent default tone; subtle glass header row
  - **Question Topic**: Italic primary text — inline annotation, no badge
  - **Question Text & MathJax**: Primary text; formulas use `--mathjax-color` (accent-soft)
  - **Context Block**: Muted context text; charcoal/bone gradient left stripe only — no label
  - **Options**: Primary text; `(a)`–`(d)` labels in small monochrome capsules (`--opt-label-bg` / `--opt-label-color`)
  - **Correct Answer Highlight**: Light tint row + border (`--answer-highlight-*`); **(a)–(d)** and **✓** both use `--pill-active-bg` / `--pill-active-fg` (dark: bone capsule + charcoal text; light: charcoal capsule + bone text)
  - **Primary actions**: **Save**, Add section, chat **Send** — filled `--btn-primary-bg` / `--btn-primary-fg`. **Login** submit on `login.html` — transparent bordered button (accent text). **Login** inputs — transparent with `--login-input-border`
  - **Tables**: Charcoal gradient header row (bone text), subtle first-column panel, minimal hairline separators; outer `.q-table` frame uses `--formula-border` / `--formula-shadow` (both themes)
  - **Blockquotes & tip callouts**: `--formula-border` frame + thick left accent; no gradient fill
  - **Charts** (inline SVG in notes): Series colors map to `--accent-*` / `--state-*` tokens (monochrome only)
- **Collapsible Explanation**: When the answer is revealed, a collapsible **Explanation** section appears with **Copy** and **Edit** (admin) icons in the header, plus an expand/collapse chevron. **Edit** opens the **full-screen markdown editor** (same as Revision Notes). Stored explanations support **Markdown**, **LaTeX**, and MathJax in preview.
- **Action Row**: Single row at bottom of each card — `[Show Answer]` and `[Copy]` icons on the right; subtle gradient separator above; copy uses accent highlight on success; answer button glows while active. **Card header actions**: **Copy**, **Ask AI** (admin), optional **Show Answer**, **Edit Question** (admin). **Wrong Answer?** icon (admin) appears at top-right of options grid; **Edit Explanation** icon (admin) in explanation section header.
- **Enhanced Tables**: Styled tables with colored headers, alternating rows, and hover effects
- **Offline Capable**: Question bank works without internet except MathJax CDN. **Study chat** (admins) needs a running **Ollama** instance and (in the browser) the Python server or Vercel proxy — it is not offline.
- **Smooth Animations**: Button hover effects, answer highlight animations, and transitions

## 📋 Instructions for Extracting Questions

### Step 1: Obtain the Source Material
1. Access the ISS Statistics examination paper (Paper I or Paper II) for the target year
2. Locate the relevant section:
   - **Paper I**: Probability & Statistics, Numerical Analysis, or Computer
   - **Paper II**: Linear Models, Statistical Inference and Hypothesis Testing, or Official Statistics
3. Identify questions numbered sequentially

### Step 2: Create the Year-Specific HTML Files

**For Paper I**, for each year `YYYY`, create up to **three** files (one per section) in their respective subfolders:
1. `extracted_htmls/stats_paper_1/Probability_&_Statistics/Probability_and_Statistics_questions_YYYY.html`
2. `extracted_htmls/stats_paper_1/Numerical_Analysis/Numerical_Analysis_questions_YYYY.html`
3. `extracted_htmls/stats_paper_1/Computer/Computer_questions_YYYY.html`

**For Paper II**, for each year `YYYY`, create up to **three** files (one per section) in their respective subfolders:
1. `extracted_htmls/stats_paper_2/Linear_Models/Linear_Models_questions_YYYY.html`
2. `extracted_htmls/stats_paper_2/Statistical_Inference_and_Hypothesis_Testing/Statistical_Inference_and_Hypothesis_Testing_questions_YYYY.html`
3. `extracted_htmls/stats_paper_2/Official_Statistics/Official_Statistics_questions_YYYY.html`

You can copy the base HTML structure from an existing year file and modify it.

### Step 3: HTML File Structure Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes">
    <link rel="stylesheet" href="../../../styles.css">
    <script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
    <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
</head>
<body>
<div class="year-section">
    <h2>ISS YYYY: Statistics Paper I - [SECTION NAME HERE]</h2>
    <!-- For Paper II, use: ISS YYYY: Statistics Paper II - [SECTION NAME HERE] -->

    <!-- Question cards go here -->
    
</div>
</body>
</html>
```

**Notes**: 
- The CSS path `../../../styles.css` is relative to the subfolder structure. Since question files are in `extracted_htmls/stats_paper_1/[Section]/` or `extracted_htmls/stats_paper_2/[Section]/`, the path goes up three levels (`[Section]/` → `stats_paper_1/` or `stats_paper_2/` → `extracted_htmls/` → `statistics_question_bank/`) to reach `styles.css` in the `statistics_question_bank/` directory.
- The `<h2>` tag styling is handled by CSS class `.year-section h2` - no inline styles needed. The header will automatically use the theme accent color, center alignment, and a bottom border.
- Update the header text to match the paper number (Paper I or Paper II) and section name.

### Step 4: Format Each Question

#### Basic Question Format:
```html
<div class="question-card">
    <div class="q-header">
        <span class="q-number">X.</span>
        <span class="q-topic">[Topic: Topic Name]</span>
    </div>
    <div class="q-text">
        Question text with mathematical notation using LaTeX syntax.
        For example: \( X \sim N(\mu, \sigma^2) \) for inline math.
        For display math: \[ E(X) = \mu \]
    </div>
    <div class="options-grid">
        <div class="option-item"><span class="opt-label">(a)</span> Option A text</div>
        <div class="option-item"><span class="opt-label">(b)</span> Option B text</div>
        <div class="option-item"><span class="opt-label">(c)</span> Option C text</div>
        <div class="option-item"><span class="opt-label">(d)</span> Option D text</div>
    </div>
</div>
```

#### Questions with Context/Setup:
```html
<div class="question-card">
    <div class="q-context">
        <strong>Consider the following for the next N items:</strong><br>
        Setup text with mathematical notation...
    </div>
</div>

<!-- Then follow with the individual questions using the basic format above -->
```

#### Questions with Tables:
```html
<div class="question-card">
    <div class="q-header">
        <span class="q-number">X.</span>
        <span class="q-topic">[Topic: Topic Name]</span>
    </div>
    <div class="q-text">Question text</div>
    <div class="q-table">
        <table>
            <tr>
                <td>Header 1</td>
                <td>Header 2</td>
            </tr>
            <tr>
                <td>Data 1</td>
                <td>Data 2</td>
            </tr>
        </table>
    </div>
    <div class="options-grid">
        <!-- Options here -->
    </div>
</div>
```

### Step 5: Mathematical Notation Guidelines

**⚠️ IMPORTANT**: Always use **LaTeX notation**, NOT HTML entities or tags!

- **Inline math**: Use `\( ... \)` for mathematical expressions within text
- **Display math**: Use `\[ ... \]` for centered, standalone equations

**Common symbols**:
- Greek letters: `\alpha`, `\beta`, `\mu`, `\sigma`, `\theta`, `\lambda`, `\pi`
- Distributions: `N(\mu, \sigma^2)`, `U(a, b)`, `\text{Beta}(\alpha, \beta)`, etc.
- Operators: `\sum`, `\prod`, `\int`, `\lim`, `\sqrt{}`, `\pm`, `\ge`, `\le`
- Relations: `\sim`, `\approx`, `\neq`, `\in`, `\subset`, `\cup`, `\cap`

**❌ WRONG** (HTML entities):
```html
X<sub>1</sub> with &lambda;<sub>1</sub> and &sigma; &ge; 0
```

**✅ CORRECT** (LaTeX):
```html
\( X_1 \) with \( \lambda_1 \) and \( \sigma \ge 0 \)
```

### Step 6: Update main.html

To add a new year, add it to the year dropdown in `main.html`:

```html
<option value="YYYY">YYYY</option>
```

The JavaScript automatically loads the correct file based on the selected paper, section, and year:

**Paper I:**
- Probability & Statistics → `extracted_htmls/stats_paper_1/Probability_&_Statistics/Probability_and_Statistics_questions_YYYY.html`
- Numerical Analysis → `extracted_htmls/stats_paper_1/Numerical_Analysis/Numerical_Analysis_questions_YYYY.html`
- Computer Section → `extracted_htmls/stats_paper_1/Computer/Computer_questions_YYYY.html`

**Paper II:**
- Linear Models → `extracted_htmls/stats_paper_2/Linear_Models/Linear_Models_questions_YYYY.html`
- Statistical Inference and Hypothesis Testing → `extracted_htmls/stats_paper_2/Statistical_Inference_and_Hypothesis_Testing/Statistical_Inference_and_Hypothesis_Testing_questions_YYYY.html`
- Official Statistics → `extracted_htmls/stats_paper_2/Official_Statistics/Official_Statistics_questions_YYYY.html`

### Step 7: Verify the Questions

For **each section file** and each year:
1. Ensure all questions are present and numbered sequentially
2. Check that all mathematical notation renders correctly (MathJax)
3. Verify that all four options (a, b, c, d) are present for each question
4. Test navigation in `main.html` to ensure files load correctly

## 🎨 CSS Classes Reference

### Theme changes in 3 steps

Use this workflow for any palette, contrast, or styling update — avoid editing individual component rules unless you are adding a **new** UI element.

**Step 1 — Edit tokens in one place**

Open `styles.css`. At the top you will find:

1. **Primitives** (lines ~7–13): `--bone`, `--charcoal`, `--charcoal-deep`, `--charcoal-elevated`, `--bone-elevated`, `--bone-dim` — the only hex anchors.
2. **Hero images** (lines ~26–30): `--top-hero-image`, `--page-hero-image` — four WebPs in `assets/` (dark in `:root`, light in `.light-theme`).
3. **Hero overlays** (lines ~33–55, `.light-theme` block): `--hero-overlay-*`, `--hero-fg*`, `--page-backdrop-scrim` — sticky hero + page backdrop scrims.
4. **Dark theme** — `:root { ... }`: semantic mappings (`--bg-color`, `--surface-*`, `--pill-active-*`, `--text-*`, etc.).
5. **Light theme** — `.light-theme { ... }`: page/surface tokens, light hero/page images, lighter page scrim, transparent glass cards on photo.

Change primitives first for a full rebrand; swap images via `assets/IMAGE-PROMPTS.md`; tune scrims/overlays in `:root` / `.light-theme` without re-exporting if needed.

**Step 2 — Verify dark and light**

1. Open `main.html` (and `login.html` if you touched auth styles).
2. Toggle **sun/moon** on the hero — preference is stored in `localStorage`.
3. Spot-check: sticky hero (scroll — image stays pinned, title compacts), hero dock tabs + meta, **dark + light** page photo behind cards, one question card (light = glass not white panel), **Questions** / **Topics** FAB (frosted `--fab-bg` on photo), **Show Answer**, `login.html` (transparent back/theme/inputs/login button inside glass card), revision **Save**, admin chat (if applicable). **Mobile:** repeat light theme — page visible between cards.

**Step 3 — Keep colors out of components**

- **CSS:** New or updated rules should use `var(--…)` only — no new `#hex` or `rgb()` in class selectors. Copy an existing pattern (e.g. `.sidebar-open-btn` → `--fab-bg` + blur + `--glass-border`; `.login-btn` → transparent + `--glass-border` + `--formula-shadow`; `.note-save-btn` → `--btn-primary-*`; `.mode-btn.active` → `--pill-active-*`).
- **Other stylesheets:** `chat/chat.css` uses the same semantic tokens; load order is `fonts.css` → `styles.css` → `chat/chat.css`.
- **JavaScript / inline SVG:** Use `getComputedStyle(document.documentElement).getPropertyValue('--accent-default')` (see `colVar()` in `main.html` for chart series) — do not hardcode colors in JS.
- **Sanity check** (optional) — find stray color literals in theme files:

  ```bash
  grep -E '#[0-9a-fA-F]{3,8}|rgb\(' styles.css chat/chat.css main.html
  ```

**Adding a new UI control?** Pick the closest token group from the table below (text → `--text-*`, filled button → `--btn-primary-*`, transparent framed control → `--glass-border` + `--formula-shadow`, selected capsule → `--pill-active-*`, subtle row highlight → `--answer-highlight-*`). If nothing fits, add a **new semantic variable** in `:root` and `.light-theme`, then reference it from your class — do not hardcode hex on the component.

---

Theme tokens live in `:root` (dark) and `.light-theme` in `styles.css`. **Change palette once** by editing base colors and semantic mappings only:

| Layer | Variables | Purpose |
|-------|-----------|---------|
| Primitives | `--bone`, `--charcoal`, `--charcoal-deep`, `--bone-elevated`, `--bone-dim` | Only hex anchors |
| Hero (main + login) | `--top-hero-image`, `--hero-overlay-*`, `--hero-fg*`, `--top-hero-position` | Sticky hero photo + scrim; dark/light image swap in `.light-theme` |
| Page backdrop | `--page-hero-image`, `--page-backdrop-scrim`, `--page-hero-position`, `--page-hero-position-mobile` | Full-page plate; light = lighter scrim + transparent glass cards; mobile crop |
| Surfaces & borders | `--bg-color`, `--surface-*`, `--border-*`, `--glass-*` | Layout glass |
| Text | `--text-primary`, `--text-context`, `--text-muted`, `--text-strong`, `--text-body` | Typography |
| Accent | `--accent-strong` … `--accent-muted` | Links, numbers, icons |
| State | `--state-success`, `--state-danger`, `--state-soft` | Monochrome emphasis |
| Pills & filled CTAs | `--pill-track-bg`, `--pill-active-bg`, `--pill-active-fg`, `--btn-primary-bg`, `--btn-primary-fg` | Mode toggle active, KEY TOPICS, save, chat send, correct-answer badges |
| Sticky FAB | `--fab-bg`, `--fab-bg-hover`, `--glass-border`, `--formula-shadow` | Questions / Topics bottom CTA (`.sidebar-open-btn`) |
| Bordered (no fill) | `--glass-border`, `--formula-border`, `--formula-shadow` | Login hero chips + form, TOC rows, blockquotes, callouts, display math, tables |
| Answer reveal | `--answer-highlight-bg`, `--answer-highlight-border` | Correct option row (subtle tint; labels use pill tokens) |

All component CSS uses semantic names only (no `--purple-*`, `--rose-*`, or `--green-*). To rebrand: edit primitives and the `:root` / `.light-theme` blocks in `styles.css` — not individual class rules.

- `.site-hero`: Full-bleed sticky hero — `--top-hero-image`, overlay scrim, compact `.is-compact` (shorter strip, copy hidden)
- `.site-hero__frame` / `.brand-wordmark` / `.site-hero__center`: Photo frame; SVG wordmark (`assets/upsc-iss-wordmark.svg`) pinned top-left in expanded **and** `.is-compact` (dock stacks below); light theme = no drop-shadow on wordmark; title + tagline centered; theme toggle top-right
- `.hero-dock` / `.hero-dock__meta`: Bottom-left controls on the hero (mode tabs, Paper/Section/Year, Set, admin link) — transparent on photo, no separate glass bar when scrolled
- `.login-page` / `.login-hero-panel` / `.login-main` / `.login-card`: Full-page `--page-hero-image`; transparent main column; frosted glass **`.login-card`** only; **`.login-back-btn`** / **`.login-theme-toggle`** on hero = transparent bordered chips
- `.login-field input` / `.login-btn`: Transparent inside card — `--login-input-border` / `--glass-border` + `--formula-shadow` (login button is not filled `--btn-primary-*`)
- `body.app-photo-backdrop`: Fixed `--page-hero-image` behind viewer; `.light-theme` transparent `.question-card` glass over visible photo
- `.paper-container`: Content wrapper below hero — horizontal padding; transparent background
- `.mode-toggle-wrap` / `.mode-btn` / `.mode-btn.active`: Segmented **Questions | Revision Notes** control; opaque `--pill-track-bg` track; active uses `--pill-active-bg` / `--pill-active-fg` (same as `.topic-badge`)
- `.set-indicator-wrap`: Flex row containing two converging gradient lines and the `SET ◆ X` text; sits between `h1` and the meta panel
- `.set-indicator-text` / `#set-letter`: Uppercase set label in `--accent-default` / `--accent-soft`
- `.auth-row` / `.auth-wrap` / `.auth-pill`: Admin Login link (or "Admin: [Name]" when logged in) below meta controls
- `.meta-controls`: Frosted pill panel for Paper / Section / Year **in legacy layouts**; on hero, `.hero-dock__meta` is flat text on the photo
- `.meta-item`: Individual clickable zone inside the panel (stacked label + value); a hidden `<select>` covers the zone for native dropdown behaviour
- `.meta-label`: Tiny ALL-CAPS muted label above each value
- `.meta-value`: Bold accent display value — brightens on hover
- `.meta-sep-line`: 1 px vertical hairline separator between meta zones
- `.question-card`: Card container — frosted glass; with `app-photo-backdrop`: dark uses `--card-glass-bg`, light uses transparent blur + border
- `.question-card.no-surface`: Transparent variant for context-only cards (no bg, no shadow, no blur)
- `.q-header`: Question header row — subtle accent gradient glass band, rounded (`8px`), bottom hairline
- `.q-number`: Question number — `--accent-default`
- `.q-topic`: Topic annotation — italic primary text, no badge or border
- `.q-text`: Main question text — `--text-primary`, `1.125rem`
- `.q-context`: Shared context block — `--text-context`; bone/charcoal gradient `::before` stripe; no "CONTEXT" label
- `.q-table`: Responsive table wrapper — `1px` border + theme shadow (`--formula-border`, `--formula-shadow`); charcoal gradient header (bone header text), tinted first column, minimal row separators
- `.options-grid`: 2-column grid (1-column on ≤ 600 px); bare transparent container
- `.option-item`: Individual option — primary text, no surface
- `.opt-label`: `(a)`–`(d)` monochrome capsule (`--opt-label-bg`, `--opt-label-color`)
- `.q-actions-row`: Action row at bottom of card — flex layout with separator above
- `.q-actions-left` / `.q-actions-right`: Left and right sections of the action row
- `.q-copy-btn`: Copy icon — accent icon; highlighted ring on success
- `.q-ask-ai-btn`: Ask AI icon button (admin-only); sparkle SVG; tooltip “Ask AI”
- `.q-answer-btn`: Show/Hide Answer — accent icon; glow while answer visible
- `.wrong-answer-wrap`: Flex container for Wrong Answer? icon and picker (admin only)
- `.wrong-answer-trigger`: "Wrong Answer?" — `--state-danger` (monochrome emphasis)
- `.wrong-answer-picker`: Expandable section with option chips
- `.wrong-answer-chip`: Option chip button
- `.correct-answer`: Correct option — `--answer-highlight-bg` tint + border; text stays `--text-primary`; MathJax uses `--mathjax-color`
- `.correct-answer .opt-label`: `(a)`–`(d)` capsule uses `--pill-active-bg` / `--pill-active-fg` (same as ✓ badge)
- `.correct-answer::after`: **✓** badge — `--pill-active-bg` / `--pill-active-fg`
- `.topic-badge` / `.mode-btn.active`: Filled capsule — `--pill-active-*`
- `.sidebar-open-btn`: Floating **Questions** / **Topics** FAB — `--fab-bg`, blur, `--glass-border`, `--formula-shadow`, accent text
- `.login-btn`: Login submit — transparent bordered (not `--btn-primary-*`); `.note-save-btn` / `.note-add-btn`: filled `--btn-primary-*`
- `.chat-btn-primary` (`chat/chat.css`): Chat **Send** — same primary tokens
- `.note-sep` / `.note-sep-line` / `.note-sep-glyph`: Revision-notes section divider (μ Σ ∫ glyph, theme `currentColor`)
- `.load-error` / `.load-error-callout`: Themed error panel when HTML fetch fails (replaces inline Material colors)
- `.notes-layout` / `.notes-sidebar` / `.notes-main-content`: Layout structure for Revision Notes; supports fixed positioning, unified transitions, and collapsible states
- `.toc-item` / `.question-toc-item`: Sidebar TOC rows — transparent background, border only; active/hover use border + left accent (no fill)
- `.toc-item-actions` / `.toc-action-btn`: Copy, Edit, Delete icon buttons; `.toc-action-btn.copied` shows checkmark state after copy
- `.note-blockquote` / `.note-callout.tip`: `--formula-border` frame + `--formula-shadow`, thick left accent — no background fill (ISS tip blockquotes use `--blockquote-tip-border`)
- `.toc-link` / `.toc-link.active`: Sidebar navigation links with hover states and vertical accent indicators; `.active` highlights the current section based on scroll position
- `.note-section-actions` / `.note-section-action-btn`: Topic header icon buttons (Copy, Edit, Delete); Copy shows "Copied" checkmark state
- **Full-screen revision / explanation editor** (`#revision-editor-overlay`, `revision-editor-panel`, optional `revision-editor-panel--question-explanation`): Inner **`revision-editor-unified`** wraps **chrome** + **`revision-editor-body`** in **one** rounded card (no separate top/bottom card chrome). **Chrome**: `revision-editor-top-bar` (breadcrumb, theme, close), optional `revision-editor-title-hero` (revision sections / tips), optional explanation **`revision-editor-question-hero-wrap`** (`<details>` + `revision-editor-question-expand-body`), then `revision-editor-toolbar-row` (**Split | Source | Preview** | **Cancel/Save**). **Body**: `revision-editor-body` with `revision-editor-pane-source` (header + **?** + textarea) and preview (`renderNoteHtml` + MathJax). Layout classes: `revision-editor-layout-split` / `source-only` / `preview-only`.
- `.sidebar-open-btn` / `.sidebar-close-btn`: Glass FAB opens drawer; close button in sidebar header
- `.year-section`: Wrapper for all questions of a year inside a loaded HTML file

## 📝 Checklist for Adding a New Year

**For Paper I:**
- [ ] Obtain ISS Statistics Paper I for the target year (PDFs are under `statistics_question_bank/pdfs/`)
- [ ] Extract all questions for each section
- [ ] Create `extracted_htmls/stats_paper_1/Probability_&_Statistics/Probability_and_Statistics_questions_YYYY.html`
- [ ] Create `extracted_htmls/stats_paper_1/Numerical_Analysis/Numerical_Analysis_questions_YYYY.html`
- [ ] Create `extracted_htmls/stats_paper_1/Computer/Computer_questions_YYYY.html`
- [ ] Format each question using the HTML structure above
- [ ] **Use LaTeX notation** for all mathematical expressions (NOT HTML entities)
- [ ] Verify questions are numbered sequentially within each section
- [ ] Check that all questions have 4 options (a, b, c, d)
- [ ] Add year option to dropdown in `main.html` (if not already present)
- [ ] Add answer keys to `answers.js` (see Show Answer Feature section)
- [ ] (Optional) Add explanations to `explanations.js` or use Add/Edit Explanation in the UI
- [ ] (Optional) Add or edit Revision Notes in `notes.js` via the Revision Notes mode in the UI
- [ ] Test that all section files load correctly
- [ ] Verify MathJax renders all mathematical expressions correctly

**For Paper II:**
- [ ] Obtain ISS Statistics Paper II for the target year (PDFs are under `statistics_question_bank/pdfs/`)
- [ ] Extract all questions for each section
- [ ] Create `extracted_htmls/stats_paper_2/Linear_Models/Linear_Models_questions_YYYY.html`
- [ ] Create `extracted_htmls/stats_paper_2/Statistical_Inference_and_Hypothesis_Testing/Statistical_Inference_and_Hypothesis_Testing_questions_YYYY.html`
- [ ] Create `extracted_htmls/stats_paper_2/Official_Statistics/Official_Statistics_questions_YYYY.html`
- [ ] Format each question using the HTML structure above
- [ ] **Use LaTeX notation** for all mathematical expressions (NOT HTML entities)
- [ ] Verify questions are numbered sequentially within each section
- [ ] Check that all questions have 4 options (a, b, c, d)
- [ ] Add year option to dropdown in `main.html` (if not already present)
- [ ] Add answer keys to `answers.js` (see Show Answer Feature section)
- [ ] (Optional) Add explanations to `explanations.js` or use Add/Edit Explanation in the UI
- [ ] (Optional) Add or edit Revision Notes in `notes.js` via the Revision Notes mode in the UI
- [ ] Test that all section files load correctly
- [ ] Verify MathJax renders all mathematical expressions correctly

## 🔧 Technical Details

- **Sticky Header**: Header with Paper/Section/Year controls stays at the top while scrolling using `position: sticky`
- **Math Rendering**: MathJax 3.x is used for rendering mathematical notation. Math expressions are properly rendered in all elements (q-text, q-context, option-item) with consistent styling across desktop and mobile. Block formulas in **`.note-section-content`** and **`.callout-content`** scroll horizontally inside a padded border frame (`--formula-border`, accent left stripe); they do **not** use `--formula-bg` (that token remains for chat code blocks).
- **Answer System**: Answers are stored in `answers.js` and loaded dynamically via JavaScript. The `main.html` script injects show answer buttons and handles toggle functionality.
- **Copy / Table Handling**: Copy captures LaTeX source (pre-MathJax) when available. Tables (`.q-table`) are formatted as **GFM Markdown pipe tables** so paste, editors, and chat markdown render stay aligned. **Ask AI** reuses the same `buildQuestionPlainTextForCopy()` helper.
- **Study chat**: When `window.isAdmin()` is true (same helper as Wrong Answer? / edits), `main.html` injects `chat/chat.css` and loads `chat/bootstrap.js`; `bootstrap.js` mounts after load even if `DOMContentLoaded` already fired (dynamic module). Sets `window.questionBankChat` for **Ask AI**. Server-side, `server.py` forwards chat POSTs to Ollama; Vercel uses `api/ollama/chat.js` and `api/ollama/health.js` when `OLLAMA_HOST` (or `OLLAMA_BASE_URL`) points to a reachable Ollama base URL. See [DEPLOYMENT.md](DEPLOYMENT.md) for **Study chat (Ollama)**.
- **Answer Correction System**: Corrections are submitted via `POST /api/correct`. Only **admins** (logged in) can submit corrections. On Vercel, the frontend **batches** corrections (15s debounce) and sends them in one request to reduce GitHub commits; `sendBeacon` flushes the queue on page unload. Behaviour by deployment: **Local** (`server.py`) writes to `answers.js`; **Vercel** (`api/correct.js`) pushes updates to GitHub; **GitHub Pages** / static hosting falls back to `localStorage`.
- **Explanation System**: Explanations are stored in `explanations.js` (skeleton mirrors `answers.js`; values are empty template literals). Admins open **Edit Explanation** when the answer is visible; editing uses **`buildRevisionEditorMarkup`** + **`openRevisionEditorOverlay`** (same pipeline as Revision Notes). **`showExplanationFullEditor`** / **`saveExplanationFromRevisionEditor`** wire **Save** to **`saveNoteEdit`** (debounced **`POST /api/explanations`**). The question preview clones stem nodes in **DOM order** (preamble context cards, `q-context`, `q-text`, `q-table`, `options-grid`) via **`buildExplanationQuestionExpandBodyDom`** / **`collectPrecedingContextPreambleCards`**, aligned with **Copy / Ask AI**. Behaviour by deployment: **Local** (`server.py`) writes to `explanations.js`; **Vercel** (`api/explanations.js`) pushes updates to GitHub; **GitHub Pages** / static hosting falls back to `localStorage`.
- **Question Edit System**: Edits (text, topic, options) are stored in `question_edits.js`. Admins can edit via **Edit Question** icon in the card header. Edits are submitted via `POST /api/questions`. **Local** writes to `question_edits.js`; **Vercel** (`api/questions.js`) pushes to GitHub; **GitHub Pages** / static falls back to `localStorage`.
- **Revision Notes System**: Notes are stored in `notes.js` (structure: `paper`, `section`, `sections[]` with `id`, `label`, `content`, plus `tips` per topic). **Markdown** supports: headers (`#`–`######`), **bold** (`**text**`), *italic* (`*text*`), `inline code`, fenced code blocks (` ``` `), lists (`-` or `1.`), blockquote (`>`), horizontal rule (`---`), tables (`| col | col |`). **LaTeX**: inline `\( ... \)`, block `\[ ... \]`, or `$...$` / `$$...$$`. **Formatting help**: small in-page editors use `<details class="note-format-hint">`; the **full-screen editor** (`buildRevisionEditorMarkup`) shares **`NOTE_FORMAT_HINT_BODY`** in a **?** tooltip (`.revision-editor-format-tooltip`) on the source pane header. **UI shell**: **`revision-editor-unified`** + **`revision-editor-chrome`** + **`revision-editor-body`** in `styles.css` (explanation mode adds **`revision-editor-panel--question-explanation`**, collapsible question strip, mobile-friendly split heights). Edits are submitted via `POST /api/notes`. **Local** writes to `notes.js`; **Vercel** (`api/notes.js`) pushes to GitHub; **GitHub Pages** / static: not available. **Sidebar TOC** highlights the active section on scroll; outside click closes the sidebar. **Copy** / **Edit** / **Delete** (admin) in sidebar and topic headers; Copy shows checkmark **Copied** state.
- **Admin Login**: Credentials are validated via `POST /api/auth`; contact email is served via `GET /api/config`. Env vars: `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `ADMIN_NAME`, `CONTACT_EMAIL`.
- **Responsive Design**: The layout adapts to different screen sizes
  - Options grid: 2 columns on desktop, 1 column on mobile (< 600px)
  - Touch-friendly controls on mobile (minimum 44px touch targets)
  - Responsive tables with horizontal scroll on mobile
  - Full-width layout (no max-width constraint) for better screen utilization
- **Typography**: Consistent rem-based font sizes with responsive scaling:
  - Question text: `1.125rem` (desktop) → `1rem` (tablet) → `0.9375rem` (mobile)
  - Context text: `1.0625rem` (desktop) → `1rem` (tablet) → `0.9375rem` (mobile)
  - Option items: `1.0625rem` (desktop) → `0.9rem` (tablet) → `0.9375rem` (mobile)
  - All font sizes use rem units for consistent scaling and accessibility
- **Color scheme**: **Dark** (default) — `--charcoal-deep` page chrome, frosted `--charcoal` glass, **bone** text. **Light** — `--bone` page chrome, **charcoal** text. **Hero/page photos** swap per theme (`--top-hero-image`, `--page-hero-image`); hero text is bone (dark) or charcoal (light). Strict monochrome UI: `color-mix` of `#F1ECE3` and `#424242` only. Theme in `localStorage`; login syncs. See `styles.css` and `fonts.css`.
- **Browser Compatibility**: Works in all modern browsers that support ES6 and MathJax
- **Loading Method**: Unified fetch/XMLHttpRequest approach works for both desktop and mobile without iframe isolation
- **Animations**: CSS animations for button hover states, answer highlight transitions, and checkmark pop-in effect
- **SEO**: Meta tags aligned with UPSC ISS syllabus (description, keywords: UPSC ISS, Indian Statistical Service, Statistics Paper 1 & 2, probability, numerical analysis, linear models, statistical inference, official statistics), Open Graph, Twitter Card, JSON-LD (WebApplication schema with syllabus topics), `robots.txt`, `sitemap.xml`, canonical URLs (Vercel: https://iss-statistics-question-bank.vercel.app/), and `noscript` fallback for crawlers. Optimised for search engines and AI tools. If using a custom domain, update canonical/og URLs in `main.html`, `login.html`, `robots.txt`, and `sitemap.xml`.

## 📱 Mobile Features

- ✅ Sticky hero (photo pinned; compact mode for controls)
- ✅ Full-screen content display; window scroll (no nested trap on `#year-viewer`)
- ✅ Page backdrop: CSS crop of 21:9 plate (`--page-hero-position-mobile`; ≤480px uses `center 34%`)
- ✅ Light theme on photo: transparent glass cards; body does not paint solid bone over the backdrop
- ✅ Touch-friendly navigation buttons
- ✅ Zoomable content (pinch to zoom math formulas)
- ✅ Responsive tables (horizontal scroll on small screens)
- ✅ Single-column options on small screens
- ✅ Optimized text sizes for readability

### Mobile Setup Tips

1. **Add to Home Screen**:
   - **iOS**: Safari → Share → "Add to Home Screen"
   - **Android**: Chrome → Menu → "Add to Home Screen"
   - Now it works like an app!

2. **Best Browser**:
   - **iOS**: Safari (best performance)
   - **Android**: Chrome (best compatibility)

3. **Offline Access**:
   - After loading once, browser caches files
   - Works offline if you've visited before
   - MathJax requires internet connection

## 🐛 Troubleshooting

### Questions not loading on desktop?
- Make sure all HTML files are in their correct subfolders under `extracted_htmls/stats_paper_1/` or `extracted_htmls/stats_paper_2/`
- Verify the file paths match the structure: `extracted_htmls/stats_paper_1/[Section]/[Filename].html` or `extracted_htmls/stats_paper_2/[Section]/[Filename].html`
- Check that the paper selector matches the file location (Paper I files in `stats_paper_1/`, Paper II files in `stats_paper_2/`)
- Verify section names match exactly (including underscores and capitalization)
- Check browser console for errors
- Try refreshing the page

### Questions not loading on mobile?
- **Use a local web server** (see Quick Start section above)
- Mobile browsers block loading local files directly due to security restrictions
- Make sure phone and computer are on the same WiFi network

### Math not rendering?
- Check internet connection (MathJax loads from CDN)
- Verify LaTeX syntax is correct (use `\( ... \)` for inline, `\[ ... \]` for display)
- Check browser console for MathJax errors

### Study chat / Ask AI not working?
- **Log in as admin** (Admin Login → return to `main.html`). Chat scripts and styles load only with an admin session; refresh after login if needed.
- Use **`python3 server.py 8000`**, not plain `http.server`, so `/api/ollama/chat` exists.
- Run **Ollama** locally (`ollama serve`) and pull your model (e.g. `ollama pull qwen2.5:7b`). Match the model name in the chat panel to what you pulled.
- **Vercel**: set `OLLAMA_HOST` to a URL where Ollama is reachable from the internet (e.g. tunnel to your Mac). Without it, the health check shows off and chat returns 503. Details in [DEPLOYMENT.md](DEPLOYMENT.md).
- **Ask AI** shows “Study chat unavailable” if you are not admin or scripts did not load — log in as admin and refresh.

### Tables not displaying correctly?
- Make sure tables are wrapped in `<div class="q-table">` (not on the `<table>` itself)
- Check that table structure is valid HTML
- Tables use `.q-table` styling: bordered frame (`--formula-border`, `--formula-shadow`), charcoal/bone gradient headers, alternating row warmth, and hover highlights (all from theme tokens in `styles.css`)

### Show Answer button not appearing?
- Make sure `answers.js` is loaded (check browser console for 404 errors)
- Verify the question has an answer key in `answers.js` for the current paper/section/year
- Check browser console for JavaScript errors
- Make sure the question has a `.q-number` element with a valid question number

### Answer highlight not working?
- Verify the correct answer format in `answers.js` (use "a", "b", "c", or "d" - lowercase)
- Check that the question has a `.options-grid` with `.option-item` elements
- Make sure option labels are formatted as `(a)`, `(b)`, `(c)`, `(d)`

### Corrections not updating answers.js?
- **GitHub Pages / file://**: Corrections are stored in `localStorage` only — they do not update the file. Deploy to [Vercel](DEPLOYMENT.md) or run `server.py` locally for persistent updates.
- **Vercel**: Ensure `GITHUB_TOKEN`, `GITHUB_OWNER`, `GITHUB_REPO` are set in Environment Variables. Redeploy after adding env vars.
- **Local server**: Use `python3 server.py 8000` (not `python3 -m http.server`) so the `/api/correct` endpoint is available.
- **Wrong Answer? not visible?**: You must be logged in as admin. See [Admin Login & Roles](#admin-login--roles). Set `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `ADMIN_NAME`, `CONTACT_EMAIL` in env vars.

### Explanations not updating explanations.js?
- **GitHub Pages / file://**: Explanation edits are stored in `localStorage` only. Deploy to [Vercel](DEPLOYMENT.md) or run `server.py` locally for persistent updates.
- **Vercel**: Same env vars as corrections (`GITHUB_TOKEN`, `GITHUB_OWNER`, `GITHUB_REPO`). Redeploy after adding env vars.
- **Local server**: Use `python3 server.py 8000` so the `/api/explanations` endpoint is available.
- **Add/Edit Explanation not visible?**: You must be logged in as admin. Run `node generate_explanations.js` if `explanations.js` structure is out of sync with `answers.js`.

### Revision Notes (notes.js) not updating?
- **GitHub Pages / file://**: Revision Notes edits are not persisted on static hosting. Deploy to [Vercel](DEPLOYMENT.md) or run `server.py` locally.
- **Vercel**: Ensure `api/notes.js` is deployed (Vercel creates `/api/notes` from it). Same env vars: `GITHUB_TOKEN`, `GITHUB_OWNER`, `GITHUB_REPO`. Check Network tab for 404 on `/api/notes`.
- **Local server**: Use `python3 server.py 8000` so the `/api/notes` endpoint is available.

## 📚 Example Question Structure

Here's a complete example of a formatted question:

```html
<div class="question-card">
    <div class="q-header">
        <span class="q-number">1.</span>
        <span class="q-topic">[Topic: Order Statistics]</span>
    </div>
    <div class="q-text">
        If \( X_{(1)}, X_{(2)}, X_{(3)}, X_{(4)}, X_{(5)} \) are order statistics 
        from a population with pdf \( f(x)=2e^{-2x}, x > 0 \), then what is the 
        density function of \( X_{(1)} \)?
    </div>
    <div class="options-grid">
        <div class="option-item"><span class="opt-label">(a)</span> \( 10e^{-10x} \)</div>
        <div class="option-item"><span class="opt-label">(b)</span> \( 1-e^{-2x} \)</div>
        <div class="option-item"><span class="opt-label">(c)</span> \( 1-e^{-10x} \)</div>
        <div class="option-item"><span class="opt-label">(d)</span> \( 10e^{-2x} \)</div>
    </div>
</div>
```

## 📌 Important Notes

- Each **section file** should contain all questions for that section and year
- Questions should be numbered sequentially within each section (starting from 1)
- All questions must have exactly 4 options (a, b, c, d)
- **Mathematical notation must use LaTeX syntax** (NOT HTML entities like `&lambda;`, `&sigma;`, etc.)
- Topic tags should be descriptive and placed in square brackets
- The file naming conventions are strict and must be followed exactly
- Always include viewport meta tag in question HTML files for mobile support

## 🎯 Show Answer & Correct Answer Feature

The repository includes a **Show Answer** feature and a **Wrong Answer?** flow that lets admins suggest corrections when an answer is incorrect.

### Admin Login & Roles

- **Admin**: Only admins can update answers, use **Study chat** and **Ask AI**, and use other admin-only editing tools. Log in via the **Admin Login** link (below Paper/Section/Year controls). After login, you see "Admin: [Name]" with a logout icon.
- **User**: Regular users can browse questions, show answers, and copy — but cannot update answers (no Wrong Answer? link) and do not see the chat FAB, keyboard shortcut, or Ask AI button.
- **Login page** (`/login` or `login.html`): Full-page **`--page-hero-image`** (theme-aware); left branding overlay; **transparent** sign-in column with glass **`.login-card`** only; **Back** + **theme** on the photo. **Login** button uses `--btn-primary-*`. Contact email for credential requests (`mailto:` when it contains `@`).
- **Env vars**: `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `ADMIN_NAME`, `CONTACT_EMAIL`. See [DEPLOYMENT.md](DEPLOYMENT.md) or `.env.example`.

### Show Answer — How It Works:
1. Answers are stored centrally in `answers.js` (no need to modify individual HTML files)
2. A **Show Answer** eye-icon button appears in the action row at the bottom of each question card
3. Clicking the button highlights the correct option (tinted row), styles the **(a)–(d)** label and **✓** with the shared pill capsule (`--pill-active-bg` / `--pill-active-fg`)
4. Clicking again hides the answer and removes the highlight

### Wrong Answer? — How It Works:
1. When logged in as admin and the answer is visible, a **Wrong Answer?** icon (⚠) appears at the top-right of the options grid
2. Click the icon to expand the inline picker: **Choose correct answer:** followed by (a)(b)(c)(d) chips
3. Click the correct option chip — the displayed answer updates immediately; the correction is queued and saved according to the deployment scenario (see below)
4. **Batching (Vercel)**: Corrections are queued and sent in a single batch after 15 seconds of inactivity, or when you leave the page (`sendBeacon`), to minimize GitHub commits

### Answer Correction Scenarios

| Deployment | Correction behaviour |
|------------|----------------------|
| **Local (server.py)** | Corrections, explanations, and Revision Notes are written directly to `answers.js`, `explanations.js`, and `notes.js` on your machine. Run `python3 server.py 8000` and open `http://localhost:8000/main.html`. |
| **Vercel (live)** | Corrections and explanations are batched (15s debounce) and pushed to GitHub via `/api/correct` and `/api/explanations`. Revision Notes are pushed via `/api/notes`. Multiple edits in one session become a single commit. Requires `GITHUB_TOKEN`, `GITHUB_OWNER`, `GITHUB_REPO`; `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `ADMIN_NAME`, `CONTACT_EMAIL` for admin login. See [DEPLOYMENT.md](DEPLOYMENT.md). |
| **GitHub Pages** | No backend — corrections and explanations are stored in `localStorage` only (per browser/device). Revision Notes are not persisted. Toast shows *"Saved (use server to update answers.js)"* or *"Saved (use server to update explanations.js)"*. To persist edits, deploy to Vercel or run the local server. |
| **Static / file://** | Same as GitHub Pages — corrections and explanations go to `localStorage` only; Revision Notes are not persisted. |

### Adding Answer Keys:
To add answer keys, edit `answers.js` following this format:

```javascript
const QUESTION_ANSWERS = {
    "paper1": {  // Paper I
        "prob": {  // Probability & Statistics
            "2025": {
                "1": "a",  // Question 1 correct answer is (a)
                "2": "c",
                // ... more answers
            }
        },
        // ... other sections
    },
    "paper2": {  // Paper II
        "linear": {  // Linear Models
            "2025": {
                "51": "a",
                // ... more answers
            }
        },
        // ... other sections
    }
};
```

### Benefits:
- **Centralized**: All answers in one file — easy to manage and update
- **Dynamic**: No need to modify question HTML files
- **Extensible**: Simply add more answer keys as needed
- **Admin corrections**: On Vercel or local server, admins (logged in) can submit corrections that update `answers.js` directly

## 📒 Revision Notes & Markdown Formatting

Revision Notes are stored in `notes.js` and organised by paper and section across **all four ISS Statistics Papers** (77 sections total). Each topic has multiple subsections with titles and content. Use **Markdown** and **LaTeX** when editing:

**Current coverage in `notes.js`:**

| Paper | Topic | Sections |
|---|---|---|
| I | Probability & Statistics | 10 |
| I | Numerical Analysis | 6 |
| I | Computer | 6 |
| II | Linear Models | 6 |
| II | Statistical Inference | 9 |
| II | Official Statistics | 8 |
| III | Sampling Techniques | 8 |
| III | Econometrics | 6 |
| III | Applied Statistics | 5 |
| **IV** | **Demography & Vital Statistics** | **6** |
| **IV** | **Quality Control** | **6** |

**Paper IV — Demography (6 sections):** Sources & Indian Census profile · Complete life table & Makeham/Gompertz · UN model tables, abridged tables & stable/stationary populations · Fertility measures (CBR→NRR) · Mortality (CDR, SMR, IMR, cause-specific) · Migration, projections (logistic) & census machinery.

**Paper IV — Quality Control (6 sections):** QC foundations (causes of variation, WECO rules) · Attribute charts (p, np, c, u) · Variable charts (X-bar, R, S with constants table) · OC curve, ARL & process capability (Cp, Cpk) · MA, EWMA, CUSUM (V-mask + tabular) & economic design · Acceptance sampling (single, double plans, AOQ/AOQL).

| Syntax | Example |
|--------|---------|
| **Headers** | `#` `##` `###` … `######` |
| **Bold** | `**text**` |
| **Italic** | `*text*` |
| **Inline code** | `` `code` `` |
| **Code block** | ` ``` ` on its own line, code, ` ``` ` |
| **Lists** | `- item` or `1. item` |
| **Blockquote** | `> quote` |
| **Horizontal rule** | `---` |
| **Table** | `| A | B |` header, `| --- | --- |` separator, `| 1 | 2 |` rows |
| **LaTeX inline** | `\( E = mc^2 \)` or `$...$` |
| **LaTeX block** | `\[ ... \]` or `$$...$$` |

### Editing UIs

- **Full-screen editor** (shared by **Revision Notes** section/tips edit and **question explanations**): Full-viewport overlay (`#revision-editor-overlay`). Content lives in **`revision-editor-unified`** — one card containing chrome (breadcrumb **theme** / **close**, middle rows, toolbar) and the **markdown | live preview** grid. **Breadcrumb** stays on one row on small screens (wraps/truncates). **Toolbar**: **Split** / **Source** / **Preview** left; **Cancel** / **Save** right; control heights align. **Markdown source** pane: header label + **?** tooltip (same reference body as collapsible help elsewhere). **Preview** uses **`renderNoteHtml`** + MathJax like the reader. **Preview-only** hides source (and **?**) — use Split or Source for formatting help.
- **Revision Notes only**: **Section title** row (`.revision-editor-title-hero`) under the breadcrumb; explanation mode **omits** that row and instead shows the **question** strip (see below).
- **Question explanation only** (`revision-editor-panel--question-explanation`): Breadcrumb includes paper, section label, set, year, **Qn**. Below it, a **border-top** band (like the title row in notes) leads into **`<details class="revision-editor-question-hero-wrap">`**: **summary** = cloned **`.q-header`** (number + topic) + **chevron** (mobile; desktop stays open, no chevron). Expanded body = **`.revision-editor-question-expand-body`**: preamble **context-only** sibling cards, then in-order **`q-context`**, **`q-text`**, **`q-table`**, **options** (so **tables** and multi-block stems match the card). **MathJax.typesetPromise** runs on the hero after open.
- **Small in-page editors** (e.g. add subsection modal): Collapsible **Formatting help** (`<details class="note-format-hint">`) above a textarea — not the full-screen overlay.

Use `*text*` for italics (avoid `_text_` as it can conflict with LaTeX subscripts).

## 🔄 Maintenance

When updating or fixing questions:
- Always maintain the HTML structure
- Preserve the CSS class names
- Use LaTeX notation for math (not HTML entities)
- Ensure MathJax compatibility
- Test in multiple browsers if possible
- Test on mobile devices

---

**Last Updated**: May 2026 — **Bone & Charcoal glass UI rebrand:**
- Strict **monochrome** palette: **bone** `#F1ECE3`, **charcoal** `#424242` (plus `color-mix` only); semantic CSS tokens in `:root` / `.light-theme` (no legacy `--purple-*` names)
- **Glassmorphism** + opaque segmented **Questions | Revision Notes** track
- **Typography**: Atvik + Freight via `fonts.css` / optional Adobe Fonts Typekit
- **Filled capsules**: `--pill-active-bg` / `--pill-active-fg` for mode toggle active, KEY TOPICS, correct **(a)–(d)** label, and **✓** badge; `--btn-primary-*` for save, add-section, chat send
- **Sticky FAB**: Questions / Topics CTA — `--fab-bg` + blur + border (readable on page photo)
- **Bordered (no fill)**: Login hero chips + form, sidebar TOC rows, blockquotes, callouts, display math, `.q-table` — `--glass-border` / `--formula-border` + `--formula-shadow`
- **Show Answer**: `--answer-highlight-*` row tint (readable text/MathJax); pill tokens on label + checkmark
- `chat/chat.css`, chart `colVar()` in `main.html`, and `.load-error` aligned to theme tokens

**Earlier 2026 — Papers III & IV Revision Notes — deep syllabus coverage added:**
- **Paper IV — Demography & Vital Statistics (6 sections, ~5,300 words):** Sources of demographic data (Census, CRS, SRS, hospital records) + SRS dual-record design + Census 2011 profile · Complete life table (all 10 columns, Reed–Merrell, recursive relations, infant correction) + Makeham/Gompertz mortality laws · UN Coale–Demeny model life tables (4 families, West = default for India), abridged tables (Greville formula), stable and stationary populations, Euler–Lotka equation · All six fertility measures (CBR → GFR → ASFR → TFR → GRR → NRR) with formulas and India NFHS-5 data · Mortality (CDR, direct/indirect standardisation, SMR, IMR components, cause-specific rates) · Migration models (gravity, Stouffer, Lee), four projection methods (arithmetic, geometric, Pearl–Reed logistic), intercensal/postcensal estimates, Indian Census machinery. Each section has a real-life India example and ISS exam tips.
- **Paper IV — Quality Control (6 sections, ~36,000 chars):** QC foundations (Juran/Crosby definitions, common vs assignable causes, 3σ theory, ARL₀ ≈ 370, rational subgrouping, 6 WECO rules) · Attribute charts — p, np (Binomial), c, u (Poisson) — full formulas, variable vs fixed n rules · Variable charts — complete constants table (n = 2–10), R-chart, (X̄,R) pair, (X̄,S) pair, I-MR chart, all derivations · OC curve formula (Φ(3−δ√n) − Φ(−3−δ√n)), ARL comparison table, process capability (Cp, Cpk, Cpm) with ppm table, control by gauging · MA chart, EWMA (Z_t = λX_t + (1−λ)Z_{t−1}, steady-state variance λσ²/(2−λ)), CUSUM — tabular (k, h) and V-mask (tan θ = k, d = h/k), Duncan economic design · Acceptance sampling — OC curve (Binomial/Poisson), AOQ/AOQL concept, ATI, single plan design, double sampling procedure + ASN formula, variables k-method.
- **Split from 3 → 6 sections per paper** for both Demography and Quality Control, matching the granularity of Papers I & II (8–10 sections per topic cluster). Total sections: **77** across all four papers.

**Earlier 2026 — Unified full-screen markdown editor** (Revision Notes + question explanations):
- **`revision-editor-unified`** single-card layout; **`buildRevisionEditorMarkup`** / **`openRevisionEditorOverlay`**; **Split | Source | Preview**, **Cancel/Save**, **?** tooltip on source header, live preview + MathJax
- **Explanations** reuse the same editor (`showExplanationFullEditor`, `saveExplanationFromRevisionEditor`, `saveNoteEdit` + `/api/explanations`); question stem clone matches **Copy / Ask AI** order (preamble context cards, `q-context`, `q-text`, `q-table`, options); collapsible **q-header** row on mobile; **MathJax** on hero
- Styles: `.revision-editor-*`, `.revision-editor-question-hero-wrap`, `.revision-editor-question-expand-body`, `.revision-editor-panel--question-explanation` in `styles.css`

**Earlier — 2025/2026 Study chat & Ask AI** (admin-only UI):
- **`chat/`** module: Ollama-backed streaming chat, `syllabus.md` in system prompt, typing indicator, **⌘J** / **Ctrl+J**; mounted only when `iss_admin` session is set
- **`server.py`** + **`api/ollama/`**: same-origin proxy for `/api/ollama/chat` and `/api/ollama/health`; optional **`OLLAMA_HOST`**
- **Ask AI** (admin): sparkle on question cards; prefills chat via `window.questionBankChat.prefillAndOpen()`; shared text builder with Copy
- **`buildQuestionPlainTextForCopy()`** in `main.html` for copy + Ask AI; tables as GFM markdown in captured text

**Earlier — Questions mode UX overhaul**:
- **Questions Sidebar**: Collapsible TOC with topic + question preview, hover for full text; hash routing and scroll sync; outside click closes
- **Icon-based actions**: Wrong Answer? (top-right of options grid), Edit Question (card header), Edit Explanation (explanation header); all with tooltips
- **Collapsible Explanation**: Copy, **Edit** (opens full-screen markdown editor), expand/collapse chevron in header; Wrong Answer picker uses flex layout (align/justify end; column when open)
- **Edit Question** and **question_edits.js** with Vercel `api/questions.js` for live updates
- **Theme toggle** (dark/light), **Revision Notes** mode, markdown formatting, Vercel `api/notes.js`; full UI redesign *(later superseded by Bone & Charcoal theme, May 2026)*:
- Sticky header, set indicator, meta-controls pill panel, glass question cards, sidebar TOC with floating Topics/Questions FAB (frosted glass), correct-answer highlight, themed tables, unified loading, MathJax 3.x, centralized `answers.js`

