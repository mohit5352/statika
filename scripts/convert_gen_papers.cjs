/**
 * convert_gen_papers.cjs
 *
 * Reads src/data/staticPapersData.ts (CommonJS-compatible after stripping TS types)
 * and emits two JSON files:
 *   - src/data/gen_papers_questions.json   (flat Question[] array)
 *   - src/data/gen_papers_explanations.json (nested ExplanationKey map)
 */

'use strict';

const fs   = require('fs');
const path = require('path');

// ── 1. Load the source data ────────────────────────────────────────────────

const SRC_PATH = path.join(__dirname, '../src/data/staticPapersData.ts');
let src = fs.readFileSync(SRC_PATH, 'utf8');

// Strip TypeScript constructs so Node can eval it as JS
src = src
  // Remove export keyword from interfaces / type declarations
  .replace(/export\s+(interface|type)\s+\w+[^{]*\{[^}]*\}/gs, '')
  // Remove import statements if any
  .replace(/^import\s+.*$/gm, '')
  // Turn `export const staticPapersData: ...Type... =` → `global.staticPapersData =`
  .replace(/export\s+const\s+staticPapersData\s*:[^=]+=/, 'global.staticPapersData =')
  // Remove remaining standalone `export` keywords
  .replace(/^export\s+/gm, '');

global.staticPapersData = undefined;
// eslint-disable-next-line no-eval
eval(src);

const staticPapersData = global.staticPapersData;
if (!staticPapersData) {
  console.error('ERROR: staticPapersData was not parsed correctly.');
  process.exit(1);
}

// ── 2. Section key mapping helpers ────────────────────────────────────────

function sectionKeyGE(title) {
  const t = title.toLowerCase();
  if (t.includes('essay'))                                    return 'essay';
  if (t.includes('précis') || t.includes('precis'))         return 'precis';
  if (t.includes('comprehension') || t.includes('reading')) return 'comprehension';
  if (t.includes('sentence transform') || t.includes('transformation')) return 'grammar_transform';
  if (t.includes('idiom'))                                   return 'grammar_idiom';
  if (t.includes('correction') || t.includes('error'))      return 'grammar_correct';
  return 'grammar_misc';
}

function sectionKeyGS(title) {
  const t = title.toLowerCase();
  if (t.includes('polity') || t.includes('governance') || t.includes('history')) return 'polity';
  if (t.includes('science') || t.includes('technology') || t.includes('environment')) return 'science_tech';
  if (t.includes('economy') || t.includes('social'))       return 'economy';
  return 'governance';
}

// ── 3. num string → number encoding ────────────────────────────────────────

function numToNumber(numStr) {
  // "1" → 1
  // "1(a)" → 1.1, "1(b)" → 1.2, ...
  const simple = numStr.match(/^(\d+)$/);
  if (simple) return parseInt(simple[1], 10);

  const sub = numStr.match(/^(\d+)\(([a-j])\)$/i);
  if (sub) {
    const base = parseInt(sub[1], 10);
    const offset = sub[2].toLowerCase().charCodeAt(0) - 'a'.charCodeAt(0) + 1; // a→1, b→2 …
    return parseFloat((base + offset * 0.1).toFixed(2));
  }

  // Fallback: try to extract leading number
  const fallback = numStr.match(/^(\d+)/);
  if (fallback) return parseInt(fallback[1], 10);

  return 0;
}

// ── 4. Main conversion loop ────────────────────────────────────────────────

const questions     = [];
const explanations  = {};
const counts        = {};   // { year: { subject: count } }

for (const [yearStr, subjects] of Object.entries(staticPapersData)) {
  const year = parseInt(yearStr, 10);

  for (const [subject, paperData] of Object.entries(subjects)) {
    const paperKey = subject === 'General English' ? 'general_english' : 'general_studies';
    const getSectionKey = subject === 'General English' ? sectionKeyGE : sectionKeyGS;

    // Ensure explanation map structure
    if (!explanations[paperKey]) explanations[paperKey] = {};

    let qCount = 0;

    for (const section of paperData.sections) {
      const secKey = getSectionKey(section.title);

      if (!explanations[paperKey][secKey])          explanations[paperKey][secKey] = {};
      if (!explanations[paperKey][secKey][yearStr]) explanations[paperKey][secKey][yearStr] = {};

      for (const q of section.questions) {
        const numStr = q.num;
        const numVal = numToNumber(numStr);
        const numKey = String(numVal);

        // Build Question entry
        questions.push({
          paper:        paperKey,
          section:      secKey,
          year,
          number:       numVal,
          topic:        section.title.replace(/^Section [A-Z]:\s*/i, '').trim(),
          context:      null,
          text:         q.text,
          table:        null,
          options:      [],
          marks:        q.marks,
          instructions: section.instructions || null,
        });

        // Build Explanation entry
        if (q.suggestedAnswer && q.suggestedAnswer.trim()) {
          explanations[paperKey][secKey][yearStr][numKey] = q.suggestedAnswer;
        }

        qCount++;
      }
    }

    if (!counts[yearStr]) counts[yearStr] = {};
    counts[yearStr][subject] = qCount;
  }
}

// ── 5. Write outputs ───────────────────────────────────────────────────────

const OUT_DIR = path.join(__dirname, '../src/data');

fs.writeFileSync(
  path.join(OUT_DIR, 'gen_papers_questions.json'),
  JSON.stringify(questions, null, 2),
  'utf8'
);
console.log(`✓ gen_papers_questions.json written (${questions.length} questions)`);

fs.writeFileSync(
  path.join(OUT_DIR, 'gen_papers_explanations.json'),
  JSON.stringify(explanations, null, 2),
  'utf8'
);
console.log('✓ gen_papers_explanations.json written');

// ── 6. Per-year count report ──────────────────────────────────────────────

console.log('\n── Question counts by year ──────────────');
for (const yr of Object.keys(counts).sort()) {
  const ge = counts[yr]['General English'] ?? 0;
  const gs = counts[yr]['General Studies'] ?? 0;
  console.log(`  ${yr} | General English: ${ge.toString().padStart(3)} | General Studies: ${gs.toString().padStart(3)}`);
}
console.log('─────────────────────────────────────────\n');
