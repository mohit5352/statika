import React, { useState } from 'react';
import { Eye, EyeOff, Sparkles, AlertTriangle, Edit3, CheckCircle, RefreshCw, Key, HelpCircle } from 'lucide-react';
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

  const isSubjective = question.paper === 'paper3' || question.paper === 'paper4';
  const storageKey = `draft_${question.paper}_${question.section}_${question.year}_${question.number}`;
  const [userDraft, setUserDraft] = useState(() => localStorage.getItem(storageKey) || '');

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
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-indigo-500/50 transition-all duration-200 flex flex-col gap-4 font-sans relative backdrop-blur-xl shadow-lg">
      
      {/* Optional Section Instructions Banner */}
      {question.instructions && (
        <div className="bg-indigo-950/30 border border-indigo-500/15 text-slate-300 text-xs p-3 rounded-xl flex items-start gap-2">
          <HelpCircle className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-indigo-300 uppercase tracking-wider text-[9px] block mb-0.5">Section Instructions</span>
            {question.instructions}
          </div>
        </div>
      )}

      {/* Top Meta Info Header */}
      <div className="flex flex-col gap-1.5 border-b border-white/10 pb-3">

        {/* Row 1: identifiers (always single-line) + reset action */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            {/* Question number */}
            <span className="bg-indigo-500/25 text-indigo-300 border border-indigo-500/20 text-xs font-bold px-2.5 py-1 rounded-lg font-mono tracking-wide">
              Q{question.number}
            </span>
            {/* Marks — separate badge so it never crowds the Q number */}
            {question.marks && (
              <span className="bg-amber-500/15 text-amber-300 border border-amber-500/20 text-[10px] font-bold px-2 py-1 rounded-lg uppercase tracking-wide">
                {question.marks}M
              </span>
            )}
            {/* Year */}
            <span className="bg-white/8 text-slate-300 border border-white/10 text-xs font-semibold px-2.5 py-1 rounded-lg font-mono">
              {question.year}
            </span>
          </div>

          {/* Reset choice — shrink-0 so it never wraps under the badges */}
          {selectedOption && (
            <button
              onClick={resetCard}
              className="shrink-0 text-[11px] text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 transition-colors"
            >
              <RefreshCw className="w-3 h-3" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}
        </div>

        {/* Row 2: topic — always on its own line, never competes for horizontal space */}
        {question.topic && (
          <p className="text-[11px] text-slate-400 font-medium leading-snug pl-0.5">
            {question.topic}
          </p>
        )}
      </div>

      {/* Context (Item Information / Paragraph Context) */}
      {question.context && (
        <div className="bg-indigo-500/10 border-l-3 border-indigo-500 rounded-r-xl p-3.5 text-sm text-slate-300 font-sans leading-relaxed">
          <MathJaxRenderer html={question.context} />
        </div>
      )}

      {/* Stem/Text of the Question */}
      <div className="text-[15px] text-slate-100 font-sans font-medium leading-relaxed">
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
            
            let optionStyles = "bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/20 text-slate-300";
            let badgeStyles = "bg-white/10 text-slate-400";

            if (selectedOption) {
              if (isOptionCorrect) {
                optionStyles = "bg-emerald-500/20 border-emerald-500/50 text-emerald-300 font-medium";
                badgeStyles = "bg-emerald-500 text-white";
              } else if (isSelected) {
                optionStyles = "bg-red-500/20 border-red-500/40 text-red-300";
                badgeStyles = "bg-red-500 text-white";
              } else {
                optionStyles = "bg-white/5 border-white/5 text-slate-500 opacity-55";
                badgeStyles = "bg-white/5 text-slate-600";
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
        <div className="space-y-3 mt-1 bg-slate-950/20 border border-white/5 p-4 rounded-xl">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Draft Your Answer Outline / Key Steps</label>
          <textarea
            value={userDraft}
            onChange={(e) => {
              const val = e.target.value;
              setUserDraft(val);
              localStorage.setItem(storageKey, val);
            }}
            placeholder="Type your outline, formulas, or proof steps here. Click the Sparkles icon or 'AI Draft Evaluation' to have the Study Assistant grade your outline!"
            className="w-full min-h-[140px] bg-slate-950/40 border border-white/10 hover:border-white/15 focus:border-indigo-500 rounded-xl p-3.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-hidden transition-all resize-y font-mono leading-relaxed"
          />
          {userDraft.trim() && (
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setUserDraft('');
                  localStorage.removeItem(storageKey);
                }}
                className="px-2.5 py-1.5 text-slate-500 hover:text-slate-300 text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Clear Outline
              </button>
              <button
                onClick={() => {
                  onAskAI(`Here is my draft answer outline for UPSC ISS ${question.paper.toUpperCase().replace('PAPER', 'Paper ')} ${question.section.toUpperCase()} Q${question.number} (${question.year}):\n\n"${userDraft}"\n\nPlease evaluate my draft solution based on the question:\n"${question.text}".\n\nIdentify what is correct, note missing steps or equations, and show how to write a standard high-scoring UPSC answer.`);
                }}
                className="px-3.5 py-1.5 bg-emerald-600/10 hover:bg-emerald-600/20 border border-emerald-500/20 hover:border-emerald-500/35 text-emerald-400 hover:text-emerald-300 rounded-xl text-xs font-bold uppercase tracking-wide transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                AI Draft Evaluation
              </button>
            </div>
          )}
        </div>
      )}

      {/* Question Cards footer Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4 mt-2">
        <div className="flex items-center gap-2">
          {/* Explanation Button */}
          <button
            onClick={() => {
              setShowExplanation(!showExplanation);
            }}
            className={`p-2 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center cursor-pointer ${
              showExplanation
                ? 'bg-indigo-500/30 text-indigo-300 border border-indigo-500/40'
                : 'bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300'
            }`}
            title={showExplanation ? 'Hide Answer' : 'Show Answer & Expl.'}
            aria-label={showExplanation ? 'Hide Answer' : 'Show Answer & Expl.'}
          >
            {showExplanation ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>

          {/* Ask AI Helper */}
          <button
            onClick={() => onAskAI(`Question ${question.number} (${question.year}): ${question.text}`)}
            className="p-2 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/20 text-emerald-400 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center cursor-pointer"
            title="Ask Study AI"
            aria-label="Ask Study AI"
          >
            <Sparkles className="w-4 h-4" />
          </button>
        </div>

        {/* Correct answer indicator */}
        {selectedOption && (
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
        )}

        {/* Admin Tools Row */}
        {isAdmin && (
          <div className="flex items-center gap-2">
            {/* Wrong Answer tool */}
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
                  <div className="absolute bottom-full right-0 mb-2 bg-slate-900 border border-white/10 p-3 rounded-xl shadow-lg z-20 flex flex-col gap-2 min-w-[150px] animate-in fade-in slide-in-from-bottom-2 duration-150">
                    <span className="text-[10px] text-slate-400 font-bold block text-center uppercase tracking-wider">Select Correct Key:</span>
                    <div className="flex gap-1 justify-center">
                      {['A', 'B', 'C', 'D'].map((opt) => (
                        <button
                          key={opt}
                          onClick={() => handleCorrectAnswerChange(opt)}
                          className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                            correctAnswer?.toUpperCase() === opt
                              ? 'bg-emerald-600 text-white'
                              : 'bg-white/5 hover:bg-white/10 text-slate-300'
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

            {/* Edit Question */}
            <button
              onClick={() => {
                onEditQuestionClick(question);
              }}
              className="bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 text-xs p-2 rounded-xl transition-colors flex items-center justify-center cursor-pointer"
              title="Edit Question"
              aria-label="Edit Question"
            >
              <Edit3 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Explanation Segment */}
      {showExplanation && (
        <div className="mt-2 border-t border-white/10 pt-4 bg-white/5 rounded-xl p-4 backdrop-blur-md">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {isSubjective ? 'Model Solution & Suggested Answer' : 'Official Answer & Explanation'}
            </h4>
            {isAdmin && (
              <button
                onClick={() => {
                  onEditExplanationClick(question, explanation || '');
                }}
                className="text-indigo-400 hover:text-indigo-300 p-1 rounded-md hover:bg-white/5 transition-colors flex items-center justify-center cursor-pointer"
                title="Edit Explanation"
                aria-label="Edit Explanation"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            )}
          </div>
          
          <div className="text-sm font-sans text-slate-300 leading-relaxed space-y-2">
            {!isSubjective ? (
              <div className="font-semibold text-emerald-400 text-sm mb-2">
                Correct Answer Option: ({correctAnswer || 'Not Set'})
              </div>
            ) : (
              <div className="font-semibold text-emerald-400 text-xs mb-2 flex items-center gap-1.5 uppercase tracking-wider font-mono">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                Suggested UPSC Model Solution Guide
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
