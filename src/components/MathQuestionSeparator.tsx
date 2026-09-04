import React from 'react';

/** Decorative divider between question cards — maths glyphs on a soft theme line. */
export const MathQuestionSeparator: React.FC = () => (
  <div
    className="flex items-center gap-3 py-1 select-none"
    aria-hidden="true"
    role="presentation"
  >
    <div className="h-px flex-1 bg-linear-to-r from-transparent via-indigo-500/35 to-indigo-400/20" />
    <div className="flex items-center gap-2 sm:gap-2.5 px-1 font-mono text-[11px] sm:text-xs tracking-[0.2em] text-indigo-400/45">
      <span className="text-indigo-400/60" title="summation">∑</span>
      <span className="text-indigo-400/35 text-[8px]">◆</span>
      <span className="text-indigo-400/55" title="pi">π</span>
      <span className="text-indigo-400/35 text-[8px]">◆</span>
      <span className="text-indigo-300/55" title="integral">∫</span>
      <span className="text-indigo-400/35 text-[8px]">◆</span>
      <span className="text-amber-400/50" title="square root">√</span>
      <span className="text-indigo-400/35 text-[8px]">◆</span>
      <span className="text-indigo-400/50" title="infinity">∞</span>
    </div>
    <div className="h-px flex-1 bg-linear-to-l from-transparent via-indigo-500/35 to-indigo-400/20" />
  </div>
);

export default MathQuestionSeparator;
