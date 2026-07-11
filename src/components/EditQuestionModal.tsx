import React, { useState } from 'react';
import { X, Eye, Edit3, Columns, Sparkles } from 'lucide-react';
import { Question } from '../types';
import MathJaxRenderer from './MathJaxRenderer';

interface EditQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  question: Question;
  onSave: (text: string, topic: string, options: Array<{ label: string; text: string }>) => Promise<boolean>;
}

export const EditQuestionModal: React.FC<EditQuestionModalProps> = ({
  isOpen,
  onClose,
  question,
  onSave,
}) => {
  const [editText, setEditText] = useState(question.text);
  const [editTopic, setEditTopic] = useState(question.topic);
  const [editOptions, setEditOptions] = useState(question.options.map(o => ({ ...o })));
  
  // Controls 'edit' | 'preview' tabs on mobile, or view mode on desktop
  const [viewMode, setViewMode] = useState<'edit' | 'preview' | 'split'>('split');
  const [isSaving, setIsSaving] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const success = await onSave(editText, editTopic, editOptions);
    setIsSaving(false);
    if (success) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md flex items-center justify-center z-[100] p-2 sm:p-4">
      <div className="bg-slate-900 border border-white/15 rounded-2xl shadow-2xl w-full max-w-5xl h-[95vh] md:h-[85vh] flex flex-col text-slate-100 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
              <Edit3 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold font-display text-white">
                Edit Question Q{question.number} ({question.year})
              </h3>
              <p className="text-[10px] text-slate-400">Paper: {question.paper.toUpperCase()} • Section: {question.section.toUpperCase()}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Switcher Buttons */}
        <div className="bg-slate-950/30 px-4 py-2 border-b border-white/5 flex items-center justify-between gap-2 shrink-0 overflow-x-auto scrollbar-none">
          {/* Mobile view selector */}
          <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 sm:hidden w-full">
            <button
              onClick={() => setViewMode('edit')}
              className={`flex-1 py-1.5 text-center rounded-lg text-xs font-bold transition-all ${
                viewMode === 'edit' || viewMode === 'split' ? 'bg-indigo-600 text-white' : 'text-slate-400'
              }`}
            >
              Write
            </button>
            <button
              onClick={() => setViewMode('preview')}
              className={`flex-1 py-1.5 text-center rounded-lg text-xs font-bold transition-all ${
                viewMode === 'preview' ? 'bg-indigo-600 text-white' : 'text-slate-400'
              }`}
            >
              Preview
            </button>
          </div>

          {/* Desktop view selector */}
          <div className="hidden sm:flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
            <button
              onClick={() => setViewMode('edit')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                viewMode === 'edit' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              Write Only
            </button>
            <button
              onClick={() => setViewMode('split')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                viewMode === 'split' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
              Split Pane
            </button>
            <button
              onClick={() => setViewMode('preview')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                viewMode === 'preview' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              Preview Only
            </button>
          </div>

          <div className="hidden md:flex items-center gap-1.5 text-slate-500 font-mono text-[10px] uppercase font-bold">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>LaTeX & HTML Supported</span>
          </div>
        </div>

        {/* Main Work Area */}
        <div className="flex-1 overflow-hidden flex flex-row">
          {/* Write pane */}
          <div
            className={`flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 border-r border-white/10 h-full ${
              viewMode === 'preview' && 'hidden sm:hidden'
            } ${viewMode === 'edit' ? 'w-full' : 'w-1/2'}`}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Topic Tag</label>
                <input
                  type="text"
                  value={editTopic}
                  onChange={(e) => setEditTopic(e.target.value)}
                  placeholder="e.g. Probability Basics"
                  className="w-full bg-white/5 border border-white/10 focus:border-indigo-500 focus:outline-hidden text-sm px-3.5 py-2 rounded-xl transition-all font-sans text-white placeholder:text-slate-600"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Question Stem (HTML & LaTeX allowed)
                </label>
                <textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  rows={8}
                  placeholder="State the question... Use \( ... \) for inline math and \[ ... \] for block math equations."
                  className="w-full bg-white/5 border border-white/10 focus:border-indigo-500 focus:outline-hidden text-sm px-3.5 py-2.5 rounded-xl transition-all font-mono text-white placeholder:text-slate-600 h-44 sm:h-52 resize-none"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Options</label>
                {editOptions.map((opt, idx) => (
                  <div key={opt.label} className="flex gap-2.5 items-center">
                    <span className="uppercase text-xs font-bold w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400">
                      {opt.label}
                    </span>
                    <input
                      type="text"
                      value={opt.text}
                      onChange={(e) => {
                        const updated = [...editOptions];
                        updated[idx].text = e.target.value;
                        setEditOptions(updated);
                      }}
                      className="flex-1 bg-white/5 border border-white/10 focus:border-indigo-500 focus:outline-hidden text-sm px-3.5 py-2 rounded-xl transition-all font-sans text-white"
                    />
                  </div>
                ))}
              </div>
            </form>
          </div>

          {/* Live Preview Pane */}
          <div
            className={`flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-950/20 h-full ${
              (viewMode === 'edit' && 'hidden sm:hidden') || ''
            } ${viewMode === 'preview' ? 'w-full' : 'w-1/2'}`}
          >
            <div className="max-w-xl mx-auto space-y-4">
              <div className="flex items-center gap-1.5">
                <span className="bg-indigo-500/25 text-indigo-300 border border-indigo-500/20 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase font-mono">
                  LIVE PREVIEW
                </span>
                <span className="text-slate-500 text-[11px] font-medium">• Responsive view styling</span>
              </div>

              {/* Question Preview Card Layout */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 shadow-lg flex flex-col gap-4 font-sans backdrop-blur-xl pointer-events-none">
                {/* Meta Row */}
                <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-indigo-500/25 text-indigo-300 border border-indigo-500/20 text-xs font-semibold px-2.5 py-1 rounded-lg">
                      Q{question.number}
                    </span>
                    <span className="bg-white/10 text-slate-300 border border-white/10 text-xs font-semibold px-2.5 py-1 rounded-lg font-mono">
                      {question.year}
                    </span>
                    {editTopic && (
                      <span className="text-slate-400 text-xs font-medium bg-white/5 border border-white/10 px-2 py-1 rounded-lg truncate max-w-[150px]">
                        {editTopic}
                      </span>
                    )}
                  </div>
                </div>

                {/* Context (inherited if exists) */}
                {question.context && (
                  <div className="bg-indigo-500/10 border-l-3 border-indigo-500 rounded-r-xl p-3.5 text-sm text-slate-300 font-sans leading-relaxed">
                    <MathJaxRenderer html={question.context} />
                  </div>
                )}

                {/* Question Stem text */}
                <div className="text-[15px] text-slate-100 font-sans font-medium leading-relaxed break-words">
                  {editText.trim() ? (
                    <MathJaxRenderer html={editText} />
                  ) : (
                    <span className="text-slate-600 italic">No text written yet.</span>
                  )}
                </div>

                {/* Table (inherited if exists) */}
                {question.table && (
                  <div className="overflow-x-auto my-1">
                    <MathJaxRenderer html={question.table} />
                  </div>
                )}

                {/* Options Listing Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-1">
                  {editOptions.map((opt) => (
                    <div
                      key={opt.label}
                      className="flex items-start text-left gap-3 p-3.5 rounded-xl border border-white/10 bg-white/5 text-slate-300 text-sm"
                    >
                      <span className="px-1.5 py-0.5 rounded-md text-xs font-semibold shrink-0 uppercase bg-white/10 text-slate-400">
                        {opt.label}
                      </span>
                      {opt.text.trim() ? (
                        <MathJaxRenderer html={opt.text} className="flex-1 break-words" />
                      ) : (
                        <span className="text-slate-600 italic">Option text empty</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-white/10 bg-slate-950/50 flex justify-end gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 px-4.5 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSaving}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-800 text-white px-5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-md cursor-pointer transition-colors"
          >
            {isSaving ? 'Saving Overrides...' : 'Save Overrides'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default EditQuestionModal;
