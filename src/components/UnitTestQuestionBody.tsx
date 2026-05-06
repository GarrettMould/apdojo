'use client';

import React, { useEffect, useRef } from 'react';
import type { Question } from '@/data/questionBanks/types';
import { canonicalQuestionText } from '@/lib/questionTextCanonical';
import { getGovQuestionParts, isApGovQuestion } from '@/components/ApGovQuestionText';
import { QuestionWithKeyTerms } from '@/components/QuestionWithKeyTerms';
import { apQuestionSubjectTag } from '@/lib/courseSubject';
import type { CourseSubject } from '@/lib/courseSubject';

export type QuestionTextHighlight = { start: number; end: number; id: string };

function mergeNewHighlight(
  existing: QuestionTextHighlight[],
  start: number,
  end: number
): QuestionTextHighlight[] {
  const lo = Math.min(start, end);
  const hi = Math.max(start, end);
  if (hi <= lo) return existing;
  const next: QuestionTextHighlight = {
    start: lo,
    end: hi,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
  };
  const filtered = existing.filter(
    (h) =>
      !(
        (lo >= h.start && lo < h.end) ||
        (hi > h.start && hi <= h.end) ||
        (lo <= h.start && hi >= h.end)
      )
  );
  filtered.push(next);
  return filtered.sort((a, b) => a.start - b.start);
}

function applyMarksToSegment(
  segment: string,
  segmentOffset: number,
  all: QuestionTextHighlight[],
  onRemove: (id: string) => void
): React.ReactNode {
  const local = all
    .map((h) => {
      const s = Math.max(h.start, segmentOffset);
      const e = Math.min(h.end, segmentOffset + segment.length);
      return { id: h.id, start: s - segmentOffset, end: e - segmentOffset };
    })
    .filter((h) => h.end > h.start && h.start >= 0)
    .sort((a, b) => a.start - b.start);

  if (local.length === 0) return segment;

  const parts: React.ReactNode[] = [];
  let last = 0;
  local.forEach((h, i) => {
    if (h.start > last) {
      parts.push(segment.slice(last, h.start));
    }
    parts.push(
      <mark
        key={`${h.id}-${i}`}
        className="cursor-pointer rounded-sm bg-yellow-200/95 px-px text-inherit"
        style={{ backgroundColor: 'rgb(254 240 138)' }}
        title="Click to remove highlight"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onRemove(h.id);
        }}
      >
        {segment.slice(h.start, h.end)}
      </mark>
    );
    last = h.end;
  });
  if (last < segment.length) parts.push(segment.slice(last));
  return <>{parts}</>;
}

interface UnitTestQuestionBodyProps {
  question: Question;
  examType: CourseSubject;
  highlightMode: boolean;
  highlights: QuestionTextHighlight[];
  onHighlightsChange: (highlights: QuestionTextHighlight[]) => void;
  /** Custom assignment uses key-term tooltips — highlighting disabled in that mode. */
  isCustomAssignment?: boolean;
}

/**
 * Renders unit-test question prose with optional yellow highlights. Selection → highlight only when
 * `highlightMode` is true and selection lies inside this body (not answer options).
 */
export function UnitTestQuestionBody({
  question,
  examType,
  highlightMode,
  highlights,
  onHighlightsChange,
  isCustomAssignment = false,
}: UnitTestQuestionBodyProps) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const highlightsRef = useRef(highlights);
  highlightsRef.current = highlights;
  const onHighlightsChangeRef = useRef(onHighlightsChange);
  onHighlightsChangeRef.current = onHighlightsChange;

  const canon = canonicalQuestionText(question.question);

  useEffect(() => {
    if (!highlightMode || isCustomAssignment || !rootRef.current) return;

    const applySelection = () => {
      const root = rootRef.current;
      if (!root) return;
      const sel = window.getSelection();
      if (!sel || sel.rangeCount === 0 || sel.isCollapsed) return;
      const range = sel.getRangeAt(0);
      if (!root.contains(range.commonAncestorContainer)) return;

      const pre = range.cloneRange();
      pre.selectNodeContents(root);
      pre.setEnd(range.startContainer, range.startOffset);
      const start = pre.toString().length;
      const text = range.toString();
      const end = start + text.length;
      if (!text.trim() || end <= start) {
        sel.removeAllRanges();
        return;
      }

      onHighlightsChangeRef.current(
        mergeNewHighlight(highlightsRef.current, start, end)
      );
      sel.removeAllRanges();
    };

    const onUp = () => {
      requestAnimationFrame(applySelection);
    };
    document.addEventListener('mouseup', onUp);
    document.addEventListener('touchend', onUp, { passive: true });
    return () => {
      document.removeEventListener('mouseup', onUp);
      document.removeEventListener('touchend', onUp);
    };
  }, [highlightMode, isCustomAssignment]);

  const removeHighlight = (id: string) => {
    onHighlightsChange(highlights.filter((h) => h.id !== id));
  };

  const rootClassName = `inline-block min-w-0 w-full align-top ${
    highlightMode ? 'cursor-text' : ''
  }`;

  if (isCustomAssignment) {
    return (
      <QuestionWithKeyTerms
        questionText={question.question}
        unit={question.unit}
        subject={apQuestionSubjectTag(examType)}
      />
    );
  }

  if (!isApGovQuestion(question)) {
    return (
      <span ref={rootRef} className={rootClassName}>
        {applyMarksToSegment(canon, 0, highlights, removeHighlight)}
      </span>
    );
  }

  const parts = getGovQuestionParts(canon);

  if (parts.mode === 'single') {
    return (
      <span ref={rootRef} className={rootClassName}>
        {applyMarksToSegment(parts.text, 0, highlights, removeHighlight)}
      </span>
    );
  }

  const { excerpt, separator, stem, stemStart } = parts;

  return (
    <span ref={rootRef} className={rootClassName}>
      <span className="block mb-3 border-l-4 border-violet-400/80 pl-3.5 text-gray-800 italic leading-relaxed tracking-tight" lang="en">
        {applyMarksToSegment(excerpt, 0, highlights, removeHighlight)}
      </span>
      {separator}
      <span className="mt-3 block not-italic font-normal leading-relaxed tracking-normal text-gray-900">
        {applyMarksToSegment(stem, stemStart, highlights, removeHighlight)}
      </span>
    </span>
  );
}
