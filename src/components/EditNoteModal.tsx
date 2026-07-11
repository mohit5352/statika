import React, { useState } from 'react';
import { X, Eye, Edit3, Columns, Sparkles } from 'lucide-react';
import MathJaxRenderer from './MathJaxRenderer';

interface EditNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  noteInfo: {
    paper: string;
    sectionKey: string;
    sectionId: string;
    label: string;
    content: string;
  };
  onSave: (newContent: string, newLabel: string) => Promise<boolean>;
}

export const EditNoteModal: React.FC<EditNoteModalProps> = ({
  isOpen,
  onClose,
  noteInfo,
  onSave,
}) => {
  const [editLabel, setEditLabel] = useState(noteInfo.label);
  const [editContent, setEditContent] = useState(noteInfo.content);
  const [viewMode, setViewMode] = useState<'edit' | 'preview' | 'split'>('split');
  const [isSaving, setIsSaving] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editLabel.trim()) return alert('Section label cannot be empty.');
    setIsSaving(true);
    const success = await onSave(editContent, editLabel);
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
                Edit Revision Note Section
              </h3>
              <p className="text-[10px] text-slate-400">Paper: {noteInfo.paper.toUpperCase()} • Section Key: {noteInfo.sectionKey.toUpperCase()}</p>
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
            <span>Markdown & LaTeX Supported</span>
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
            <form onSubmit={handleSubmit} className="space-y-4 h-full flex flex-col">
              <div className="shrink-0">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Section Label / Title</label>
                <input
                  type="text"
                  required
                  value={editLabel}
                  onChange={(e) => setEditLabel(e.target.value)}
                  placeholder="e.g. 1. Probability Definitions"
                  className="w-full bg-white/5 border border-white/10 focus:border-indigo-500 focus:outline-hidden text-sm px-3.5 py-2.5 rounded-xl transition-all font-sans text-white placeholder:text-slate-600"
                />
              </div>

              <div className="flex-1 flex flex-col gap-1.5">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Content Body (Markdown & MathJax LaTeX formulas allowed)
                </label>
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  placeholder="Write formulas, proofs, and definitions using markdown and LaTeX..."
                  className="w-full flex-1 bg-white/5 border border-white/10 focus:border-indigo-500 focus:outline-hidden text-sm px-3.5 py-3 rounded-xl transition-all font-mono text-white placeholder:text-slate-600 min-h-[250px] resize-none"
                />
              </div>
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
                <span className="bg-indigo-500/25 text-indigo-300 border border-indigo-500/20 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase font-mono">
                  LIVE PREVIEW
                </span>
                <span className="text-slate-500 text-[11px] font-medium">• Accordion styling preview</span>
              </div>

              {/* Note preview block styled like RevisionNotes accordion body */}
              <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden backdrop-blur-xl pointer-events-none">
                <div className="px-4 py-3.5 bg-white/5 border-b border-white/5 text-xs font-bold text-slate-200 flex items-center gap-2">
                  <span className="text-indigo-400">▼</span>
                  {editLabel.trim() ? editLabel : <span className="text-slate-600 italic">No Title Given</span>}
                </div>
                <div className="px-5 py-5 bg-white/5 text-sm text-slate-300 font-sans leading-relaxed">
                  {editContent.trim() ? (
                    <MathJaxRenderer html={editContent} className="markdown-body" />
                  ) : (
                    <div className="text-slate-600 italic text-xs">
                      No note content written yet. Keep typing in the editor panel!
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
            {isSaving ? 'Saving Notes...' : 'Save Note Section'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default EditNoteModal;
