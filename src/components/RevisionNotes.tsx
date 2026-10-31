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
  paper: string;
  isAdmin: boolean;
  activeSectionKey: string;
  setActiveSectionKey: (key: string) => void;
  onEditNoteClick: (noteInfo: {
    paper: string;
    sectionKey: string;
    sectionId: string;
    label: string;
    content: string;
  }) => void;
}

export const RevisionNotes: React.FC<RevisionNotesProps> = ({
  notesData,
  paper,
  isAdmin,
  activeSectionKey,
  setActiveSectionKey,
  onEditNoteClick,
}) => {
  const paperNotes = notesData[paper] || {};
  const sectionKeys = Object.keys(paperNotes);
  const notesTopRef = useRef<HTMLDivElement>(null);
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const intendedNoteId = useRef<string | null>(null);

  // Flat list of all entries across all topics (for global prev/next navigation)
  const entries: NoteEntry[] = sectionKeys.flatMap((topicKey) =>
    (paperNotes[topicKey]?.sections ?? []).map((section) => ({ topicKey, section }))
  );

  // When unit (activeSectionKey) changes, default to first section — unless an intended section is set
  React.useEffect(() => {
    const topic = paperNotes[activeSectionKey];
    const ids = topic?.sections.map((s) => s.id) ?? [];
    const intended = intendedNoteId.current;
    intendedNoteId.current = null;
    setActiveNoteId(intended && ids.includes(intended) ? intended : (ids[0] ?? null));
  }, [paper, activeSectionKey]); // eslint-disable-line react-hooks/exhaustive-deps

  const matchedIndex = entries.findIndex(
    (e) => e.topicKey === activeSectionKey && e.section.id === activeNoteId
  );
  const topicStart = entries.findIndex((e) => e.topicKey === activeSectionKey);
  const currentIndex = matchedIndex >= 0 ? matchedIndex : Math.max(0, topicStart);
  const currentEntry = entries[currentIndex];
  const currentTopic = currentEntry ? paperNotes[currentEntry.topicKey] : undefined;
  const topicSections = currentTopic?.sections ?? [];
  const indexInTopic = Math.max(
    0,
    topicSections.findIndex((s) => s.id === currentEntry?.section.id)
  );
  const isLastInTopic = topicSections.length > 0 && indexInTopic === topicSections.length - 1;

  // Global prev/next (crosses unit boundaries)
  const goToEntry = (index: number) => {
    const entry = entries[index];
    if (!entry) return;
    intendedNoteId.current = entry.section.id;
    setActiveNoteId(entry.section.id);
    if (entry.topicKey !== activeSectionKey) setActiveSectionKey(entry.topicKey);
    notesTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Section tab click — stays within current unit
  const selectSection = (sectionId: string) => {
    intendedNoteId.current = sectionId;
    setActiveNoteId(sectionId);
    notesTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (sectionKeys.length === 0) {
    return (
      <div className="bg-black/5 dark:bg-white/5 border border-black/8 dark:border-white/10 rounded-2xl p-12 text-center text-slate-500 dark:text-slate-400 font-sans backdrop-blur-xl">
        <BookOpen className="w-8 h-8 mx-auto mb-3 opacity-40" />
        <p className="text-sm font-medium">No revision notes compiled for this paper yet.</p>
      </div>
    );
  }

  // ── Accent color system ────────────────────────────────────────────────────
  const isGKSection = activeSectionKey.startsWith('gk_');

  const colors =
    paper !== 'uphesc'
      ? {
          tabActive: 'border-indigo-500 text-indigo-700 dark:text-indigo-300 bg-indigo-500/5',
          badgeActive: 'bg-indigo-600',
          tip: {
            bg: 'bg-indigo-500/10',
            border: 'border-indigo-500',
            icon: 'text-indigo-500 dark:text-indigo-400',
            title: 'text-indigo-600 dark:text-indigo-300',
            text: 'text-indigo-800 dark:text-indigo-100',
          },
        }
      : isGKSection
      ? {
          tabActive: 'border-emerald-500 text-emerald-700 dark:text-emerald-300 bg-emerald-500/5',
          badgeActive: 'bg-emerald-600',
          tip: {
            bg: 'bg-emerald-500/10',
            border: 'border-emerald-500',
            icon: 'text-emerald-500 dark:text-emerald-400',
            title: 'text-emerald-600 dark:text-emerald-300',
            text: 'text-emerald-800 dark:text-emerald-100',
          },
        }
      : {
          tabActive: 'border-violet-500 text-violet-700 dark:text-violet-300 bg-violet-500/5',
          badgeActive: 'bg-violet-600',
          tip: {
            bg: 'bg-violet-500/10',
            border: 'border-violet-500',
            icon: 'text-violet-500 dark:text-violet-400',
            title: 'text-violet-600 dark:text-violet-300',
            text: 'text-violet-800 dark:text-violet-100',
          },
        };

  const contextLabel =
    paper === 'uphesc'
      ? isGKSection
        ? 'UPHESC A.P. · General Knowledge (30 Qs)'
        : 'UPHESC A.P. · Statistics (70 Qs)'
      : `ISS · ${paper.replace('paper', 'Paper ')}`;

  return (
    <div ref={notesTopRef} className="space-y-0 font-sans scroll-mt-28">
      {currentEntry && currentTopic ? (
        <>
          {/* ── Unit Header ── */}
          <div className="flex items-start justify-between gap-4 pb-5">
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 mb-2 tracking-wider uppercase">
                {contextLabel}
              </p>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white leading-snug">
                {currentTopic.title}
              </h2>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-2 font-medium">
                {topicSections.length} section{topicSections.length !== 1 ? 's' : ''} · viewing{' '}
                <b className="text-slate-600 dark:text-slate-300">
                  {indexInTopic + 1} of {topicSections.length}
                </b>
              </p>
            </div>
            {isAdmin && (
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
                className="p-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/20 rounded-lg transition-colors cursor-pointer shrink-0 mt-1"
                title="Edit Note"
                aria-label="Edit Note"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* ── Section Tabs ── */}
          <div className="border-b border-black/8 dark:border-white/10 -mx-0.5">
            <div className="flex overflow-x-auto scrollbar-none -mb-px">
              {topicSections.map((sec, idx) => {
                const isActive = activeNoteId === sec.id;
                const letter = String.fromCharCode(65 + idx);
                // Strip leading "A. " prefix if data already has it
                const cleanLabel = sec.label.replace(/^[A-Za-z]\.\s+/, '');
                return (
                  <button
                    key={sec.id}
                    onClick={() => selectSection(sec.id)}
                    title={sec.label}
                    className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 text-xs font-semibold whitespace-nowrap border-b-2 transition-all duration-150 shrink-0 cursor-pointer ${
                      isActive
                        ? colors.tabActive
                        : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-600'
                    }`}
                  >
                    {/* Letter badge */}
                    <span
                      className={`w-5 h-5 rounded text-[9px] font-black flex items-center justify-center shrink-0 transition-colors ${
                        isActive
                          ? `${colors.badgeActive} text-white`
                          : 'bg-black/8 dark:bg-white/10 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {letter}
                    </span>
                    {/* Label — truncated on small screens */}
                    <span className="hidden sm:inline truncate max-w-[140px] xl:max-w-[220px]">
                      {cleanLabel}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Content Card ── */}
          <div className="bg-white/70 dark:bg-white/5 backdrop-blur-sm border border-black/8 dark:border-white/10 rounded-xl overflow-hidden shadow-sm dark:shadow-none mt-5">
            <div className="px-4 sm:px-6 py-5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed overflow-x-auto overscroll-x-contain">
              <MathJaxRenderer html={currentEntry.section.content} className="markdown-body" />
            </div>
          </div>

          {/* ── Exam Tips (shown only on the last section of a unit) ── */}
          {isLastInTopic && currentTopic.tips && (
            <div
              className={`rounded-xl p-4 flex gap-3 shadow-md border-l-[3px] mt-5 ${colors.tip.bg} ${colors.tip.border}`}
            >
              <Lightbulb className={`w-5 h-5 shrink-0 mt-0.5 ${colors.tip.icon}`} />
              <div className="min-w-0 flex-1 overflow-x-auto">
                <h5 className={`text-xs font-bold uppercase tracking-wider mb-1 ${colors.tip.title}`}>
                  Exam Tips & Common Pitfalls
                </h5>
                <div className={`text-xs leading-relaxed ${colors.tip.text}`}>
                  <MathJaxRenderer html={currentTopic.tips} className="markdown-body" />
                </div>
              </div>
            </div>
          )}

          {/* ── Global Prev / Next Navigation ── */}
          {entries.length > 1 && (
            <div className="flex items-center justify-between gap-4 pt-6 mt-2 border-t border-black/5 dark:border-white/5">
              <button
                onClick={() => goToEntry(currentIndex - 1)}
                disabled={currentIndex === 0}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 bg-black/5 dark:bg-white/5 border border-black/8 dark:border-white/10 hover:bg-black/8 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                Previous
              </button>
              <span className="text-xs text-slate-400 dark:text-slate-500 font-mono select-none">
                <b className="text-slate-700 dark:text-slate-300">{currentIndex + 1}</b>
                <span className="mx-1 opacity-50">/</span>
                {entries.length}
              </span>
              <button
                onClick={() => goToEntry(currentIndex + 1)}
                disabled={currentIndex >= entries.length - 1}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 bg-black/5 dark:bg-white/5 border border-black/8 dark:border-white/10 hover:bg-black/8 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                Next
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </>
      ) : null}
    </div>
  );
};

export default RevisionNotes;
