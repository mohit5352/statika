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
  requestedSectionId?: string | null;
  sectionRequestTick?: number;
  onVisibleNoteId?: (id: string | null) => void;
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
  requestedSectionId = null,
  sectionRequestTick = 0,
  onVisibleNoteId,
  onEditNoteClick,
}) => {
  const paperNotes = notesData[paper] || {};
  const sectionKeys = Object.keys(paperNotes);
  const notesTopRef = useRef<HTMLDivElement>(null);
  const sectionChipRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const intendedNoteId = useRef<string | null>(null);

  // Flat list of all entries across all topics (for global prev/next navigation)
  const entries: NoteEntry[] = sectionKeys.flatMap((topicKey) =>
    (paperNotes[topicKey]?.sections ?? []).map((section) => ({ topicKey, section }))
  );

  // When the unit changes, open the first section unless prev/next or the
  // sidebar named a specific section in this unit.
  React.useEffect(() => {
    const topic = paperNotes[activeSectionKey];
    const ids = topic?.sections.map((s) => s.id) ?? [];
    const intended = intendedNoteId.current;
    intendedNoteId.current = null;
    if (intended && ids.includes(intended)) {
      setActiveNoteId(intended);
    } else if (requestedSectionId && ids.includes(requestedSectionId)) {
      setActiveNoteId(requestedSectionId);
    } else {
      setActiveNoteId(ids[0] ?? null);
    }
  }, [paper, activeSectionKey, requestedSectionId, sectionRequestTick]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    onVisibleNoteId?.(activeNoteId);
    if (activeNoteId) {
      const chip = sectionChipRefs.current[activeNoteId];
      const scroller = chip?.parentElement;
      if (chip && scroller) {
        scroller.scrollTo({
          left: chip.offsetLeft - scroller.clientWidth / 2 + chip.clientWidth / 2,
          behavior: 'smooth',
        });
      }
    }
  }, [activeNoteId]); // eslint-disable-line react-hooks/exhaustive-deps

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
          chipOn: 'bg-indigo-500/20 text-indigo-800 dark:text-indigo-100 border-indigo-400/35',
          badgeOn: 'bg-indigo-500 text-white',
          tip: {
            bg: 'bg-indigo-500/10',
            border: 'border-indigo-500',
            icon: 'text-indigo-500 dark:text-indigo-400',
            title: 'text-indigo-600 dark:text-indigo-300',
            text: 'text-indigo-800 dark:text-indigo-100',
          },
        }
      : {
          chipOn: 'bg-violet-500/20 text-violet-800 dark:text-violet-100 border-violet-400/35',
          badgeOn: 'bg-violet-500 text-white',
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
        : 'UPHESC A.P. · Statistics (90 Qs)'
      : `ISS · ${paper.replace('paper', 'Paper ')}`;

  return (
    <div ref={notesTopRef} className="flex flex-col font-sans scroll-mt-32">
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
                {topicSections.length} {topicSections.length === 1 ? 'section' : 'sections'} · viewing{' '}
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

          {/* ── Sticky section + pager bar. One row, scrolls sideways. ── */}
          <div className="order-first sticky top-[6.35rem] lg:top-14 z-20 -mx-4 sm:-mx-6 lg:-mx-8 -mt-6 mb-4 px-4 sm:px-6 lg:px-8 py-2 flex items-center gap-2 bg-white/55 dark:bg-slate-950/50 backdrop-blur-2xl border-b border-black/8 dark:border-white/10">
            <div className="flex-1 flex gap-1.5 overflow-x-auto scrollbar-none min-w-0">
              {topicSections.map((sec, idx) => {
                const isActive = activeNoteId === sec.id;
                const letter = String.fromCharCode(65 + idx);
                const cleanLabel = sec.label.replace(/^[A-Za-z]\.\s+/, '');
                return (
                  <button
                    key={sec.id}
                    ref={(node) => { sectionChipRefs.current[sec.id] = node; }}
                    onClick={() => selectSection(sec.id)}
                    className={`shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium whitespace-nowrap border backdrop-blur-md transition-all cursor-pointer ${
                      isActive
                        ? colors.chipOn
                        : 'bg-white/40 dark:bg-white/[0.04] border-black/8 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-white/70 dark:hover:bg-white/10'
                    }`}
                  >
                    <span className={`w-4 h-4 rounded text-[8px] font-black flex items-center justify-center shrink-0 ${isActive ? colors.badgeOn : 'bg-black/8 dark:bg-white/10 text-slate-500 dark:text-slate-400'}`}>
                      {letter}
                    </span>
                    {cleanLabel}
                  </button>
                );
              })}
            </div>
            {entries.length > 1 && (
              <div className="shrink-0 flex items-center rounded-full bg-white/50 dark:bg-white/[0.04] border border-black/8 dark:border-white/10 overflow-hidden backdrop-blur-md">
                <button
                  onClick={() => goToEntry(currentIndex - 1)}
                  disabled={currentIndex === 0}
                  className="px-2 py-1 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 disabled:opacity-25 disabled:cursor-not-allowed border-r border-black/8 dark:border-white/10"
                  aria-label="Previous section"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <span className="px-2.5 py-1 text-[11px] font-semibold font-mono text-slate-600 dark:text-slate-300 select-none">
                  <b className="text-slate-900 dark:text-white">{currentIndex + 1}</b>
                  <span className="text-slate-400 mx-1">/</span>
                  {entries.length}
                </span>
                <button
                  onClick={() => goToEntry(currentIndex + 1)}
                  disabled={currentIndex >= entries.length - 1}
                  className="px-2 py-1 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 disabled:opacity-25 disabled:cursor-not-allowed border-l border-black/8 dark:border-white/10"
                  aria-label="Next section"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* ── Content Card ── */}
          <div className="mt-5">
            <div className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed overflow-x-auto overscroll-x-contain">
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

          {entries.length > 1 && (
            <div className="flex items-center justify-center pt-6">
              <div className="flex items-center rounded-full bg-white/50 dark:bg-white/[0.04] border border-black/8 dark:border-white/10 overflow-hidden backdrop-blur-md">
                <button
                  onClick={() => goToEntry(currentIndex - 1)}
                  disabled={currentIndex === 0}
                  className="px-3 py-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 disabled:opacity-25 disabled:cursor-not-allowed border-r border-black/8 dark:border-white/10"
                  aria-label="Previous section"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 text-sm font-semibold font-mono text-slate-600 dark:text-slate-300 select-none">
                  <b className="text-slate-900 dark:text-white">{currentIndex + 1}</b>
                  <span className="text-slate-400 mx-1.5">/</span>
                  {entries.length}
                </span>
                <button
                  onClick={() => goToEntry(currentIndex + 1)}
                  disabled={currentIndex >= entries.length - 1}
                  className="px-3 py-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 disabled:opacity-25 disabled:cursor-not-allowed border-l border-black/8 dark:border-white/10"
                  aria-label="Next section"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </>
      ) : null}
    </div>
  );
};

export default RevisionNotes;
