import React, { useState } from 'react';
import { X, Eye, Edit3, Columns, Sparkles } from 'lucide-react';
import { Question } from '../types';
import MathJaxRenderer from './MathJaxRenderer';

interface EditExplanationModalProps {
  isOpen: boolean;
  onClose: () => void;
  question: Question;
  explanationText: string;
  onSave: (newExplanation: string) => Promise<boolean>;
}

export const EditExplanationModal: React.FC<EditExplanationModalProps> = ({
  isOpen,
  onClose,
  question,
  explanationText,
  onSave,
}) => {
  const [editExplText, setEditExplText] = useState(explanationText);
  const [viewMode, setViewMode] = useState<'edit' | 'preview' | 'split'>('split');
  const [isSaving, setIsSaving] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const success = await onSave(editExplText);
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
                Edit Explanation Q{question.number} ({question.year})
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
            <span>Markdown & MathJax LaTeX Supported</span>
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
            <form onSubmit={handleSubmit} className="h-full flex flex-col gap-2">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 shrink-0">
                Explanation Body (Markdown, HTML, & LaTeX)
              </label>
              <textarea
                value={editExplText}
                onChange={(e) => setEditExplText(e.target.value)}
                placeholder="Write the detailed solution... e.g. For independent variables, we know that \( E(XY) = E(X)E(Y) \)..."
                className="w-full flex-1 bg-white/5 border border-white/10 focus:border-indigo-500 focus:outline-hidden text-sm px-3.5 py-3 rounded-xl transition-all font-mono text-white placeholder:text-slate-600 min-h-[300px] resize-none"
              />
            </form>
          </div>

          {/* Live Preview Pane */}
          <div
            className={`flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-950/20 h-full ${
              (viewMode === 'edit' && 'hidden sm:hidden') || ''
            } ${viewMode === 'preview' ? 'w-full' : 'w-1/2'}`}
          >
            <div className="max-w-2xl mx-auto space-y-4">
              <div className="flex items-center gap-1.5">
                <span className="bg-emerald-500/25 text-emerald-300 border border-emerald-500/20 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase font-mono">
                  LIVE PREVIEW
                </span>
                <span className="text-slate-500 text-[11px] font-medium">• Rendered formulas block</span>
              </div>

              {/* Explanation preview block styled like the card */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 shadow-lg flex flex-col gap-3 font-sans backdrop-blur-xl pointer-events-none">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Official Answer & Explanation</h4>
                <div className="text-sm font-sans text-slate-300 leading-relaxed space-y-2">
                  <div className="font-semibold text-emerald-400 text-sm mb-2">
                    Correct Answer Option: ({question.options[0]?.label || 'A'})
                  </div>
                  {editExplText.trim() ? (
                    <MathJaxRenderer html={editExplText} className="markdown-body" />
                  ) : (
                    <div className="text-slate-600 italic text-xs">
                      No explanation text written yet. Keep typing in the editor panel!
                    </div>
                  )}
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
            {isSaving ? 'Saving Explanation...' : 'Save Explanation'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default EditExplanationModal;
