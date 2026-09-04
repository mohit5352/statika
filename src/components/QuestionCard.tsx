import React, { useState } from 'react';
import { Eye, EyeOff, Sparkles, AlertTriangle, Edit3, CheckCircle, RefreshCw, Key, HelpCircle, ChevronDown, PenLine, Copy, Check } from 'lucide-react';
import { Question } from '../types';
import MathJaxRenderer from './MathJaxRenderer';

interface QuestionCardProps {
  question: Question;
  correctAnswer: string | undefined;
  explanation: string | undefined;
  isAdmin: boolean;
  onAnswerChange: (paper: string, section: string, year: number, number: number, correctOption: string) => void;
  onAskAI: (questionText: string) => void;
  onEditQuestionClick: (question: Question) => void;
  onEditExplanationClick: (question: Question, explanationText: string) => void;
}

function decodeHtmlEntities(text: string): string {
  if (typeof document === 'undefined') {
    return text
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");
  }
  const el = document.createElement('textarea');
  el.innerHTML = text;
  return el.value;
}

/** Convert HTML (and light LaTeX table markup) to readable plain text for clipboard. */
function htmlToPlainText(html: string | null | undefined): string {
  if (!html) return '';
  let s = html;

  // Prefer structured tables as markdown-ish grids
  s = s.replace(/<table[\s\S]*?>[\s\S]*?<\/table>/gi, (tableHtml) => {
    const rows: string[][] = [];
    const rowRe = /<tr[\s\S]*?>([\s\S]*?)<\/tr>/gi;
    let rowMatch: RegExpExecArray | null;
    while ((rowMatch = rowRe.exec(tableHtml)) !== null) {
      const cells: string[] = [];
      const cellRe = /<(td|th)[\s\S]*?>([\s\S]*?)<\/\1>/gi;
      let cellMatch: RegExpExecArray | null;
      while ((cellMatch = cellRe.exec(rowMatch[1])) !== null) {
        const cellText = htmlToPlainText(cellMatch[2]).replace(/\s+/g, ' ').trim();
        cells.push(cellText);
      }
      if (cells.length) rows.push(cells);
    }
    if (!rows.length) return '\n[Table]\n';
    const widths = rows[0].map((_, i) => Math.max(...rows.map((r) => (r[i] || '').length), 1));
    const formatRow = (r: string[]) =>
      '| ' + widths.map((w, i) => (r[i] || '').padEnd(w)).join(' | ') + ' |';
    const sep = '| ' + widths.map((w) => '-'.repeat(w)).join(' | ') + ' |';
    return '\n' + [formatRow(rows[0]), sep, ...rows.slice(1).map(formatRow)].join('\n') + '\n';
  });

  s = s
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<\/div>/gi, '\n')
    .replace(/<\/li>/gi, '\n')
    .replace(/<li[^>]*>/gi, '• ')
    .replace(/<\/h[1-6]>/gi, '\n\n')
    .replace(/<[^>]+>/g, '')
    .replace(/\\begin\{tabular\}[\s\S]*?\\end\{tabular\}/g, '\n[Table]\n');

  s = decodeHtmlEntities(s);
  return s.replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
}

function buildQuestionCopyText(question: Question): string {
  const parts: string[] = [];
  const meta = [
    `Q${question.number}`,
    `(${question.year})`,
    question.marks != null ? `${question.marks} marks` : null,
    question.topic ? `Topic: ${question.topic}` : null,
  ]
    .filter(Boolean)
    .join(' · ');
  parts.push(meta);

  if (question.instructions) {
    parts.push('', 'Instructions:', htmlToPlainText(question.instructions));
  }
  if (question.context) {
    parts.push('', 'Context:', htmlToPlainText(question.context));
  }
  parts.push('', 'Question:', htmlToPlainText(question.text));
  if (question.table) {
    parts.push('', 'Table:', htmlToPlainText(question.table));
  }
  if (question.options?.length) {
    parts.push('', 'Options:');
    for (const opt of question.options) {
      parts.push(`(${opt.label.toUpperCase()}) ${htmlToPlainText(opt.text)}`);
    }
  }
  return parts.join('\n').trim() + '\n';
}

function buildAnswerCopyText(
  question: Question,
  correctAnswer: string | undefined,
  explanation: string | undefined,
  isSubjective: boolean
): string {
  const parts: string[] = [`Q${question.number} (${question.year})`];
  if (!isSubjective) {
    parts.push(`Correct Answer: (${correctAnswer || 'Not Set'})`);
  } else {
    parts.push('Model Solution:');
  }
  if (explanation) {
    parts.push('', htmlToPlainText(explanation));
  } else {
    parts.push('', 'No explanation available.');
  }
  return parts.join('\n').trim() + '\n';
}

async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through */
  }
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  correctAnswer,
  explanation,
  isAdmin,
  onAnswerChange,
  onAskAI,
  onEditQuestionClick,
  onEditExplanationClick,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isWrongAnswerActive, setIsWrongAnswerActive] = useState(false);
  const [draftExpanded, setDraftExpanded] = useState(false);
  const [copiedQuestion, setCopiedQuestion] = useState(false);
  const [copiedAnswer, setCopiedAnswer] = useState(false);

  const isSubjective =
    question.paper === 'paper3' ||
    question.paper === 'paper4' ||
    question.paper === 'general_english' ||
    question.paper === 'general_studies';
  const storageKey = `draft_${question.paper}_${question.section}_${question.year}_${question.number}`;
  const [userDraft, setUserDraft] = useState(() => localStorage.getItem(storageKey) || '');

  const handleCopyQuestion = async () => {
    const ok = await copyToClipboard(buildQuestionCopyText(question));
    if (!ok) return;
    setCopiedQuestion(true);
    window.setTimeout(() => setCopiedQuestion(false), 1600);
  };

  const handleCopyAnswer = async () => {
    const ok = await copyToClipboard(
      buildAnswerCopyText(question, correctAnswer, explanation, isSubjective)
    );
    if (!ok) return;
    setCopiedAnswer(true);
    window.setTimeout(() => setCopiedAnswer(false), 1600);
  };

  const handleOptionClick = (label: string) => {
    if (selectedOption) return; // Prevent changing choice once made
    setSelectedOption(label.toLowerCase());
  };

  const handleCorrectAnswerChange = async (option: string) => {
    try {
      const res = await fetch('/api/answers/correct', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paper: question.paper,
          section: question.section,
          year: question.year.toString(),
          questionNumber: question.number.toString(),
          correctOption: option.toUpperCase(),
        }),
      });
      const data = await res.json();
      if (data.success) {
        onAnswerChange(question.paper, question.section, question.year, question.number, option.toUpperCase());
        setIsWrongAnswerActive(false);
      } else {
        alert('Failed to update answer key on server.');
      }
    } catch (err) {
      alert('Network error correcting answer.');
    }
  };

  const resetCard = () => {
    setSelectedOption(null);
    setShowExplanation(false);
  };

  const isUserCorrect = selectedOption === correctAnswer?.toLowerCase();

  return (
    <div className="rounded-2xl py-4 flex flex-col gap-4 font-sans relative">
      
      {/* Optional Section Instructions Banner */}
      {question.instructions && (
        <div className="bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-500/20 text-slate-600 dark:text-slate-300 text-xs p-3 rounded-xl flex items-start gap-2">
          <HelpCircle className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-indigo-300 uppercase tracking-wider text-[9px] block mb-0.5">Section Instructions</span>
            {question.instructions}
          </div>
        </div>
      )}

      {/* Header: badges + show answer / ask AI on one row */}
      <div className="flex flex-col gap-2 pb-3 border-b border-black/8 dark:border-white/10">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 flex-wrap min-w-0">
            <span className="bg-indigo-500/25 text-indigo-300 border border-indigo-500/25 text-xs font-bold px-2.5 py-1 rounded-lg font-mono tracking-wide">
              Q{question.number}
            </span>
            {question.marks && (
              <span className="bg-amber-500/15 text-amber-300 border border-amber-500/25 text-[10px] font-bold px-2 py-1 rounded-lg uppercase tracking-wide">
                {question.marks}M
              </span>
            )}
            <span className="bg-black/8 dark:bg-white/8 text-slate-600 dark:text-slate-300 border border-black/10 dark:border-white/12 text-xs font-semibold px-2.5 py-1 rounded-lg font-mono">
              {question.year}
            </span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {selectedOption && (
              <button
                onClick={resetCard}
                className="p-2 rounded-xl text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 border border-transparent hover:border-emerald-500/25 transition-colors cursor-pointer"
                title="Reset choice"
                aria-label="Reset choice"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={handleCopyQuestion}
              className={`p-2 rounded-xl transition-colors flex items-center justify-center cursor-pointer ${
                copiedQuestion
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/35'
                  : 'bg-white/5 hover:bg-white/10 border border-white/12 text-slate-300'
              }`}
              title={copiedQuestion ? 'Copied!' : 'Copy question'}
              aria-label={copiedQuestion ? 'Copied' : 'Copy question'}
            >
              {copiedQuestion ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setShowExplanation(!showExplanation)}
              className={`p-2 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center cursor-pointer ${
                showExplanation
                  ? 'bg-indigo-500/30 text-indigo-300 border border-indigo-500/45'
                  : 'bg-white/5 hover:bg-white/10 border border-white/12 text-slate-300'
              }`}
              title={showExplanation ? 'Hide Answer' : 'Show Answer & Expl.'}
              aria-label={showExplanation ? 'Hide Answer' : 'Show Answer & Expl.'}
            >
              {showExplanation ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
            <button
              onClick={() => onAskAI(`Question ${question.number} (${question.year}): ${question.text}`)}
              className="p-2 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/25 text-emerald-400 rounded-xl transition-colors flex items-center justify-center cursor-pointer"
              title="Ask Study AI"
              aria-label="Ask Study AI"
            >
              <Sparkles className="w-4 h-4" />
            </button>
          </div>
        </div>

        {question.topic && (
          <p className="text-[11px] text-slate-400 font-medium leading-snug pl-0.5">
            {question.topic}
          </p>
        )}
      </div>

      {/* Context (Item Information / Paragraph Context) */}
      {question.context && (
        <div className="bg-indigo-50 dark:bg-indigo-500/10 border-l-3 border-indigo-500 rounded-r-xl p-3.5 text-sm text-slate-600 dark:text-slate-300 font-sans leading-relaxed">
          <MathJaxRenderer html={question.context} />
        </div>
      )}

      {/* Stem/Text of the Question */}
      <div className="text-[15px] text-slate-800 dark:text-slate-100 font-sans font-medium leading-relaxed">
        <MathJaxRenderer html={question.text} />
      </div>

      {/* Table (If there is a data table, e.g. contingency table, ANOVA) */}
      {question.table && (
        <div className="q-table overflow-x-auto my-1">
          <MathJaxRenderer html={question.table} />
        </div>
      )}

      {/* Options Listing or Subjective Draft Canvas */}
      {!isSubjective ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-1">
          {question.options.map((opt) => {
            const isSelected = selectedOption === opt.label.toLowerCase();
            const isOptionCorrect = correctAnswer?.toLowerCase() === opt.label.toLowerCase();
            
            let optionStyles = "bg-black/5 dark:bg-white/5 hover:bg-black/8 dark:hover:bg-white/10 border-black/8 dark:border-white/10 hover:border-black/12 dark:hover:border-white/20 text-slate-600 dark:text-slate-300";
            let badgeStyles = "bg-black/8 dark:bg-white/10 text-slate-500 dark:text-slate-400";

            if (selectedOption) {
              if (isOptionCorrect) {
                optionStyles = "bg-emerald-500/20 border-emerald-500/50 text-emerald-300 font-medium";
                badgeStyles = "bg-emerald-500 text-white";
              } else if (isSelected) {
                optionStyles = "bg-red-500/20 border-red-500/40 text-red-300";
                badgeStyles = "bg-red-500 text-white";
              } else {
                optionStyles = "bg-black/5 dark:bg-white/5 border-black/5 dark:border-white/5 text-slate-400 dark:text-slate-500 opacity-55";
                badgeStyles = "bg-black/5 dark:bg-white/5 text-slate-400 dark:text-slate-600";
              }
            }

            return (
              <button
                key={opt.label}
                onClick={() => handleOptionClick(opt.label)}
                disabled={!!selectedOption}
                className={`flex items-start text-left gap-3 p-3.5 rounded-xl border transition-all text-sm duration-150 focus:outline-hidden ${optionStyles}`}
              >
                <span className={`px-1.5 py-0.5 rounded-md text-xs font-semibold shrink-0 uppercase ${badgeStyles}`}>
                  {opt.label}
                </span>
                <MathJaxRenderer html={opt.text} className="flex-1 min-w-0 overflow-x-auto scrollbar-thin pb-0.5" />
              </button>
            );
          })}
        </div>
      ) : (
        <div className="mt-1 border border-black/8 dark:border-white/10 rounded-xl overflow-hidden">
          <button
            type="button"
            onClick={() => setDraftExpanded((v) => !v)}
            className="w-full flex items-center justify-between gap-3 px-3.5 py-3 text-left hover:bg-black/5 dark:hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
            aria-expanded={draftExpanded}
          >
            <span className="flex items-center gap-2 min-w-0">
              <PenLine className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                Draft your answer
              </span>
              {userDraft.trim() && !draftExpanded && (
                <span className="text-[10px] font-mono text-emerald-400/80 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded-md truncate max-w-[140px]">
                  Saved
                </span>
              )}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                draftExpanded ? 'rotate-180' : ''
              }`}
            />
          </button>

          {draftExpanded && (
            <div className="px-3.5 pb-3.5 space-y-3 border-t border-black/8 dark:border-white/10">
              <textarea
                value={userDraft}
                onChange={(e) => {
                  const val = e.target.value;
                  setUserDraft(val);
                  localStorage.setItem(storageKey, val);
                }}
                placeholder="Outline key steps, formulas, or points here — then ask AI to evaluate."
                className="w-full min-h-[140px] mt-3 bg-transparent border-0 focus:ring-0 p-0 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-hidden resize-y font-mono leading-relaxed"
              />
              <div className="flex justify-end gap-2 pt-1">
                {userDraft.trim() && (
                  <button
                    type="button"
                    onClick={() => {
                      setUserDraft('');
                      localStorage.removeItem(storageKey);
                    }}
                    className="px-2.5 py-1.5 text-slate-500 hover:text-slate-300 text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Clear
                  </button>
                )}
                <button
                  type="button"
                  disabled={!userDraft.trim()}
                  onClick={() => {
                    onAskAI(`Here is my draft answer outline for UPSC ISS ${question.paper.toUpperCase().replace('PAPER', 'Paper ')} ${question.section.toUpperCase()} Q${question.number} (${question.year}):\n\n"${userDraft}"\n\nPlease evaluate my draft solution based on the question:\n"${question.text}".\n\nIdentify what is correct, note missing steps or equations, and show how to write a standard high-scoring UPSC answer.`);
                  }}
                  className="px-3.5 py-1.5 bg-emerald-600/10 hover:bg-emerald-600/20 border border-emerald-500/20 hover:border-emerald-500/35 text-emerald-400 hover:text-emerald-300 rounded-xl text-xs font-bold uppercase tracking-wide transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-35 disabled:cursor-not-allowed"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  AI Evaluate
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Footer: result feedback + admin tools (actions live in header) */}
      {(selectedOption || isAdmin) && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-black/8 dark:border-white/10 pt-4 mt-1">
          {selectedOption ? (
            <div className="flex items-center gap-1.5 text-xs">
              {isUserCorrect ? (
                <span className="text-emerald-400 font-semibold flex items-center gap-1 bg-emerald-500/20 border border-emerald-500/30 px-2.5 py-1 rounded-lg">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Correct! Answer is ({correctAnswer})
                </span>
              ) : (
                <span className="text-red-400 font-semibold flex items-center gap-1 bg-red-500/20 border border-red-500/30 px-2.5 py-1 rounded-lg">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Incorrect. Correct Answer: ({correctAnswer})
                </span>
              )}
            </div>
          ) : (
            <span />
          )}

          {isAdmin && (
            <div className="flex items-center gap-2 ml-auto">
              {!isSubjective && (
                <div className="relative">
                  <button
                    onClick={() => setIsWrongAnswerActive(!isWrongAnswerActive)}
                    className="bg-red-500/20 hover:bg-red-500/30 text-red-400 text-xs p-2 rounded-xl border border-red-500/30 transition-colors flex items-center justify-center cursor-pointer"
                    title="Change Correct Answer Key"
                    aria-label="Change Correct Answer Key"
                  >
                    <Key className="w-4 h-4" />
                  </button>
                  {isWrongAnswerActive && (
                    <div className="absolute bottom-full right-0 mb-2 bg-white dark:bg-slate-900 border border-black/10 dark:border-white/10 p-3 rounded-xl shadow-lg z-20 flex flex-col gap-2 min-w-[150px] animate-in fade-in slide-in-from-bottom-2 duration-150">
                      <span className="text-[10px] text-slate-400 font-bold block text-center uppercase tracking-wider">Select Correct Key:</span>
                      <div className="flex gap-1 justify-center">
                        {['A', 'B', 'C', 'D'].map((opt) => (
                          <button
                            key={opt}
                            onClick={() => handleCorrectAnswerChange(opt)}
                            className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                              correctAnswer?.toUpperCase() === opt
                                ? 'bg-emerald-600 text-white'
                                : 'bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
              <button
                onClick={() => onEditQuestionClick(question)}
                className="bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 text-xs p-2 rounded-xl transition-colors flex items-center justify-center cursor-pointer"
                title="Edit Question"
                aria-label="Edit Question"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Explanation Segment */}
      {showExplanation && (
        <div className="mt-1 border border-black/8 dark:border-white/10 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between gap-2 px-3.5 py-3 border-b border-black/8 dark:border-white/10">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 min-w-0">
              {isSubjective ? (
                <>
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">Model Solution</span>
                </>
              ) : (
                <span className="truncate">Answer & Explanation</span>
              )}
            </h4>
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={handleCopyAnswer}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  copiedAnswer
                    ? 'text-emerald-300 bg-emerald-500/15'
                    : 'text-slate-500 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-300 hover:bg-black/5 dark:hover:bg-white/5'
                }`}
                title={copiedAnswer ? 'Copied!' : 'Copy answer'}
                aria-label={copiedAnswer ? 'Copied' : 'Copy answer'}
              >
                {copiedAnswer ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
              {isAdmin && (
                <button
                  onClick={() => onEditExplanationClick(question, explanation || '')}
                  className="text-indigo-400 hover:text-indigo-300 p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
                  title="Edit Explanation"
                  aria-label="Edit Explanation"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setShowExplanation(false)}
                className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-300 hover:bg-indigo-500/10 border border-transparent hover:border-indigo-500/25 transition-colors cursor-pointer"
                title="Hide Answer"
                aria-label="Hide Answer"
              >
                <EyeOff className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="px-3.5 py-3.5 text-sm font-sans text-slate-600 dark:text-slate-300 leading-relaxed space-y-2">
            {!isSubjective && (
              <div className="font-semibold text-emerald-400 text-sm mb-2">
                Correct Answer Option: ({correctAnswer || 'Not Set'})
              </div>
            )}
            {explanation ? (
              <MathJaxRenderer html={explanation} className="markdown-body" />
            ) : (
              <div className="text-slate-500 italic text-xs">
                No detailed explanation has been written for this question yet. Ask our AI Study Assistant to generate a step-by-step solution!
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
export default QuestionCard;
