import React, { useRef, useState } from 'react';
import { BookOpen, ChevronLeft, ChevronRight, Edit3, Lightbulb } from 'lucide-react';
import { NoteBook, NoteSection } from '../types';
import MathJaxRenderer from './MathJaxRenderer';

interface NoteEntry {
  topicKey: string;
  section: NoteSection;
}

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

  const notesTopRef = useRef<HTMLDivElement>(null);
  // Section chosen by the pager. Null means "first section of the active topic"
  // (sidebar or paper change), so finishing a topic can continue into the next one.
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const intendedNoteId = useRef<string | null>(null);

  const entries: NoteEntry[] = sectionKeys.flatMap((topicKey) =>
    (paperNotes[topicKey]?.sections ?? []).map((section) => ({ topicKey, section }))
  );

  React.useEffect(() => {
    const topic = paperNotes[activeSectionKey];
    const ids = topic?.sections.map((section) => section.id) ?? [];
    const intended = intendedNoteId.current;
    intendedNoteId.current = null;
    if (intended && ids.includes(intended)) {
      setActiveNoteId(intended);
    } else {
      setActiveNoteId(ids[0] ?? null);
    }
  }, [paper, activeSectionKey]); // eslint-disable-line react-hooks/exhaustive-deps

  const matchedIndex = entries.findIndex(
    (entry) => entry.topicKey === activeSectionKey && entry.section.id === activeNoteId
  );
  const topicStart = entries.findIndex((entry) => entry.topicKey === activeSectionKey);
  const currentIndex = matchedIndex >= 0 ? matchedIndex : Math.max(0, topicStart);
  const currentEntry = entries[currentIndex];
  const currentTopic = currentEntry ? paperNotes[currentEntry.topicKey] : undefined;
  const topicSections = currentTopic?.sections ?? [];
  const indexInTopic = Math.max(0, topicSections.findIndex((section) => section.id === currentEntry?.section.id));
  const isLastInTopic = topicSections.length > 0 && indexInTopic === topicSections.length - 1;

  const goToEntry = (index: number) => {
    const entry = entries[index];
    if (!entry) return;
    intendedNoteId.current = entry.section.id;
    setActiveNoteId(entry.section.id);
    if (entry.topicKey !== activeSectionKey) {
      setActiveSectionKey(entry.topicKey);
    }
    notesTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const selectTopic = (key: string) => {
    intendedNoteId.current = null;
    const firstId = paperNotes[key]?.sections[0]?.id ?? null;
    setActiveNoteId(firstId);
    setActiveSectionKey(key);
    notesTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (sectionKeys.length === 0) {
    return (
      <div className="bg-black/5 dark:bg-white/5 border border-black/8 dark:border-white/10 rounded-2xl p-8 text-center text-slate-500 dark:text-slate-400 font-sans backdrop-blur-xl">
        <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-50 text-slate-400" />
        No revision notes compiled for this paper yet.
      </div>
    );
  }

  const pagerButtonClass =
    'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-black/8 dark:hover:bg-white/10 disabled:opacity-25 disabled:cursor-not-allowed transition-all';

  return (
    <div ref={notesTopRef} className="grid grid-cols-1 lg:grid-cols-4 gap-6 font-sans scroll-mt-32">
      {/* Mobile-only Horizontal Topics Selector */}
      <div className="lg:hidden flex flex-col gap-1.5">
        <h4 className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-1">Topics List</h4>
        <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-none -mx-4 px-4 sm:-mx-6 sm:px-6">
          {sectionKeys.map((key) => {
            const isActive = activeSectionKey === key;
            return (
              <button
                key={key}
                onClick={() => selectTopic(key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold font-display whitespace-nowrap transition-all duration-150 cursor-pointer ${
                  isActive
                    ? `${paper === 'uphesc' ? 'bg-violet-600' : 'bg-indigo-600'} text-white shadow-md`
                    : 'bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/8 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
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
        <h4 className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-2 mb-2">Topics List</h4>
        {sectionKeys.map((key) => {
          const isActive = activeSectionKey === key;
          return (
            <button
              key={key}
              onClick={() => selectTopic(key)}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold font-display tracking-tight transition-all duration-150 cursor-pointer ${
                isActive
                  ? `${paper === 'uphesc' ? 'bg-violet-600' : 'bg-indigo-600'} text-white shadow-md`
                  : 'bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/8 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {paperNotes[key].title}
            </button>
          );
        })}
      </div>

      {/* Main Content Area — one open section, pager stays top-right */}
      <div className="lg:col-span-3 space-y-5">
        {currentEntry && currentTopic && (
          <>
            <div className="flex items-center justify-between gap-3">
              <span className="px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/8 dark:border-white/10 text-[11px] font-semibold text-slate-600 dark:text-slate-300 font-mono select-none">
                <b className="text-slate-900 dark:text-white">{indexInTopic + 1}</b>
                <span className="text-slate-400 dark:text-slate-500 mx-1">/</span>
                {topicSections.length}
                <span className="text-slate-400 dark:text-slate-500 ml-1 font-sans font-medium">sections</span>
              </span>

              {entries.length > 1 && (
                <div className="flex items-center gap-0 rounded-full bg-black/5 dark:bg-white/5 border border-black/8 dark:border-white/10 overflow-hidden shrink-0">
                  <button
                    onClick={() => goToEntry(currentIndex - 1)}
                    disabled={currentIndex === 0}
                    className={`px-2.5 py-1.5 border-r border-black/8 dark:border-white/10 ${pagerButtonClass}`}
                    aria-label="Previous section"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 py-1 text-[11px] font-semibold font-mono text-slate-600 dark:text-slate-300 select-none">
                    <b className="text-slate-900 dark:text-white">{currentIndex + 1}</b>
                    <span className="text-slate-400 dark:text-slate-500 mx-1">/</span>
                    {entries.length}
                  </span>
                  <button
                    onClick={() => goToEntry(currentIndex + 1)}
                    disabled={currentIndex >= entries.length - 1}
                    className={`px-2.5 py-1.5 border-l border-black/8 dark:border-white/10 ${pagerButtonClass}`}
                    aria-label="Next section"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium tracking-wide">
              {paper === 'uphesc'
                ? 'UPHESC Assistant Professor — Comprehensive unit-wise preparation notes'
                : 'Comprehensive revision formulas & proofs for ISS'}
            </p>

            <div className="bg-white/70 dark:bg-white/5 backdrop-blur-sm border border-black/8 dark:border-white/10 rounded-xl overflow-hidden shadow-sm dark:shadow-none">
              {isAdmin && (
                <div className="flex justify-end px-3 pt-3">
                  <button
                    onClick={() =>
                      onEditNoteClick({
                        paper,
                        sectionKey: currentEntry.topicKey,
                        sectionId: currentEntry.section.id,
                        label: currentEntry.section.label,
                        content: currentEntry.section.content,
                      })
                    }
                    className="p-1.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 rounded-md transition-colors flex items-center justify-center cursor-pointer shrink-0"
                    title="Edit Note"
                    aria-label="Edit Note"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>
              )}
              <div className="px-4 sm:px-5 py-4 text-sm text-slate-600 dark:text-slate-300 font-sans leading-relaxed overflow-x-auto min-w-0 overscroll-x-contain">
                <MathJaxRenderer html={currentEntry.section.content} className="markdown-body" />
              </div>
            </div>

            {isLastInTopic && currentTopic.tips && (
              <div className={`rounded-xl p-4 flex gap-3 shadow-md border-l-[3px] ${
                paper === 'uphesc'
                  ? 'bg-violet-500/10 border-violet-500'
                  : 'bg-indigo-500/10 border-indigo-500'
              }`}>
                <Lightbulb className={`w-5 h-5 shrink-0 mt-0.5 ${paper === 'uphesc' ? 'text-violet-500 dark:text-violet-400' : 'text-indigo-500 dark:text-indigo-400'}`} />
                <div className="min-w-0 flex-1 overflow-x-auto">
                  <h5 className={`text-xs font-bold font-display uppercase tracking-wider mb-1 ${
                    paper === 'uphesc' ? 'text-violet-600 dark:text-violet-300' : 'text-indigo-600 dark:text-indigo-300'
                  }`}>
                    Exam Tips & Common Pitfalls
                  </h5>
                  <div className={`text-xs leading-relaxed font-sans ${
                    paper === 'uphesc' ? 'text-violet-800 dark:text-violet-100' : 'text-indigo-800 dark:text-indigo-200'
                  }`}>
                    <MathJaxRenderer html={currentTopic.tips} className="markdown-body" />
                  </div>
                </div>
              </div>
            )}

            {entries.length > 1 && (
              <div className="flex items-center justify-center pt-2">
                <div className="flex items-center gap-0 rounded-full bg-black/5 dark:bg-white/5 border border-black/8 dark:border-white/10 overflow-hidden">
                  <button
                    onClick={() => goToEntry(currentIndex - 1)}
                    disabled={currentIndex === 0}
                    className={`px-3 py-2 border-r border-black/8 dark:border-white/10 ${pagerButtonClass}`}
                    aria-label="Previous section"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 text-sm font-semibold font-mono text-slate-600 dark:text-slate-300 select-none">
                    <b className="text-slate-900 dark:text-white">{currentIndex + 1}</b>
                    <span className="text-slate-400 dark:text-slate-500 mx-1.5">/</span>
                    {entries.length}
                  </span>
                  <button
                    onClick={() => goToEntry(currentIndex + 1)}
                    disabled={currentIndex >= entries.length - 1}
                    className={`px-3 py-2 border-l border-black/8 dark:border-white/10 ${pagerButtonClass}`}
                    aria-label="Next section"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
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
