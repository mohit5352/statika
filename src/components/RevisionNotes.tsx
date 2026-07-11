import React, { useState } from 'react';
import { BookOpen, HelpCircle, ChevronDown, ChevronRight, Edit3, Lightbulb } from 'lucide-react';
import { NoteBook, NoteTopic, NoteSection } from '../types';
import MathJaxRenderer from './MathJaxRenderer';

interface RevisionNotesProps {
  notesData: NoteBook;
  paper: string; // 'paper1' | 'paper2' | 'paper3' | 'paper4'
  isAdmin: boolean;
  activeSectionKey: string;
  setActiveSectionKey: (key: string) => void;
  onEditNoteClick: (noteInfo: { paper: string; sectionKey: string; sectionId: string; label: string; content: string }) => void;
}

export const RevisionNotes: React.FC<RevisionNotesProps> = ({
  notesData,
  paper,
  isAdmin,
  activeSectionKey,
  setActiveSectionKey,
  onEditNoteClick,
}) => {
  // Get notes sections available for this paper
  const paperNotes = notesData[paper] || {};
  const sectionKeys = Object.keys(paperNotes);

  const [expandedSectionId, setExpandedSectionId] = useState<string | null>(null);

  const currentTopic: NoteTopic | undefined = paperNotes[activeSectionKey];

  // Reset expanded notes section when paper or topic changes
  React.useEffect(() => {
    setExpandedSectionId(null);
  }, [paper, activeSectionKey]);

  const toggleSection = (id: string) => {
    if (expandedSectionId === id) {
      setExpandedSectionId(null);
    } else {
      setExpandedSectionId(id);
    }
  };

  if (sectionKeys.length === 0) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center text-slate-400 font-sans backdrop-blur-xl">
        <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-50 text-slate-400" />
        No revision notes compiled for this paper yet.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 font-sans">
      {/* Mobile-only Horizontal Topics Selector */}
      <div className="lg:hidden flex flex-col gap-1.5">
        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1">Topics List</h4>
        <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-none -mx-4 px-4 sm:-mx-6 sm:px-6">
          {sectionKeys.map((key) => {
            const isActive = activeSectionKey === key;
            return (
              <button
                key={key}
                onClick={() => {
                  setActiveSectionKey(key);
                  setExpandedSectionId(null);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold font-display whitespace-nowrap transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                {paperNotes[key].title}
              </button>
            );
          })}
        </div>
      </div>

      {/* Desktop-only Sticky Sidebar Topics Selector */}
      <div className="hidden lg:block lg:col-span-1 space-y-1.5 lg:sticky lg:top-[125px] self-start lg:max-h-[calc(100vh-160px)] lg:overflow-y-auto pr-1">
        <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 mb-2">Topics List</h4>
        {sectionKeys.map((key) => {
          const isActive = activeSectionKey === key;
          return (
            <button
              key={key}
              onClick={() => {
                setActiveSectionKey(key);
                setExpandedSectionId(null);
              }}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold font-display tracking-tight transition-all duration-150 cursor-pointer ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white'
              }`}
            >
              {paperNotes[key].title}
            </button>
          );
        })}
      </div>

      {/* Main Content Area */}
      <div className="lg:col-span-3 space-y-5">
        {currentTopic && (
          <>
            {/* Header Title Banner */}
            <p className="text-xs text-slate-400 font-medium tracking-wide">
              Comprehensive revision formulas & proofs for ISS
            </p>

            {/* Accordion List for Section Topics */}
            <div className="space-y-3">
              {currentTopic.sections.map((section) => {
                const isExpanded = expandedSectionId === section.id;
                return (
                  <div
                    key={section.id}
                    className="bg-white/5 border border-white/10 rounded-xl overflow-hidden transition-all duration-200"
                  >
                    {/* Header Trigger */}
                    <div
                      onClick={() => toggleSection(section.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          toggleSection(section.id);
                        }
                      }}
                      role="button"
                      tabIndex={0}
                      className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-white/10 text-left transition-colors focus:outline-hidden cursor-pointer select-none"
                    >
                      <span className="text-xs font-bold text-slate-200 font-display flex items-center gap-2">
                        {isExpanded ? (
                          <ChevronDown className="w-4 h-4 text-indigo-400 shrink-0" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                        )}
                        {section.label}
                      </span>
                      {isAdmin && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent accordion toggling
                            onEditNoteClick({
                              paper,
                              sectionKey: activeSectionKey,
                              sectionId: section.id,
                              label: section.label,
                              content: section.content,
                            });
                          }}
                          className="p-1.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 hover:text-indigo-300 rounded-md transition-colors flex items-center justify-center cursor-pointer"
                          title="Edit Note"
                          aria-label="Edit Note"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    {/* Content Body */}
                    {isExpanded && (
                      <div className="px-5 pb-5 pt-2 border-t border-white/10 bg-white/5 text-sm text-slate-300 font-sans leading-relaxed">
                        <MathJaxRenderer html={section.content} className="markdown-body" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Exam Tips Block */}
            {currentTopic.tips && (
              <div className="bg-indigo-500/10 border-l-3 border-indigo-500 rounded-xl p-4 flex gap-3 shadow-md">
                <Lightbulb className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold font-display text-indigo-300 uppercase tracking-wider mb-1">
                    Exam Tips & Common Pitfalls
                  </h5>
                  <div className="text-xs text-indigo-200 leading-relaxed font-sans">
                    <MathJaxRenderer html={currentTopic.tips} className="markdown-body" />
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

    </div>
  );
};
export default RevisionNotes;
