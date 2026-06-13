'use client';

import React, { useEffect, useRef } from 'react';
import type { Question } from '@/data/questionBanks/types';
import { canonicalQuestionText } from '@/lib/questionTextCanonical';
import {
  getGovQuestionParts,
  isApGovQuestion,
  isGovMcqPromptLine,
  GOV_MCQ_ATTRIBUTION_CLASS,
  GOV_MCQ_EXCERPT_BLOCK_CLASS,
  GOV_MCQ_EXCERPT_QUOTE_CLASS,
  GOV_MCQ_PREAMBLE_CLASS,
  GOV_MCQ_STEM_BLOCK_CLASS,
} from '@/components/ApGovQuestionText';
import { splitMcqStemAttribution } from '@/lib/splitMcqStemAttribution';
import { QuestionWithKeyTerms } from '@/components/QuestionWithKeyTerms';
import { apQuestionSubjectTag } from '@/lib/courseSubject';
import type { CourseSubject } from '@/lib/courseSubject';
import { renderMathText, type MathTextHighlight } from '@/utils/processMathContent';

export type QuestionTextHighlight = MathTextHighlight;

function applyMarksToSegment(
  text: string,
  offset: number,
  highlights: QuestionTextHighlight[],
  onRemove: (id: string) => void
): React.ReactNode {
  return renderMathText(text, {
    highlights,
    onRemoveHighlight: onRemove,
    textOffset: offset,
  });
}
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

  const renderGovExcerpt = (excerpt: string, offset: number) => {
    const trimmed = excerpt.trimEnd();
    const excerptSplit = splitMcqStemAttribution(trimmed);
    const attrIdx = excerptSplit.attributionStartIndex;
    if (
      excerptSplit.attributionLine != null &&
      attrIdx != null &&
      attrIdx > 0 &&
      attrIdx <= trimmed.length
    ) {
      return (
        <span className={GOV_MCQ_EXCERPT_BLOCK_CLASS} lang="en">
          <span className={GOV_MCQ_EXCERPT_QUOTE_CLASS}>
            {applyMarksToSegment(trimmed.slice(0, attrIdx), offset, highlights, removeHighlight)}
          </span>
          <span className={GOV_MCQ_ATTRIBUTION_CLASS}>
            {applyMarksToSegment(trimmed.slice(attrIdx), offset + attrIdx, highlights, removeHighlight)}
          </span>
        </span>
      );
    }
    return (
      <span
        className={`${GOV_MCQ_EXCERPT_BLOCK_CLASS} ${GOV_MCQ_EXCERPT_QUOTE_CLASS}`}
        lang="en"
      >
        {applyMarksToSegment(excerpt, offset, highlights, removeHighlight)}
      </span>
    );
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
    const t = parts.text.trimEnd();
    const singleSplit = splitMcqStemAttribution(t);
    const six = singleSplit.attributionStartIndex;
    if (
      singleSplit.attributionLine != null &&
      six != null &&
      six > 0 &&
      six <= t.length
    ) {
      const head = t.slice(0, six);
      const tail = t.slice(six);
      const promptLine =
        head
          .trim()
          .split('\n')
          .map((line) => line.trim())
          .findLast((line) => line.length > 0) ?? '';
      if (!isGovMcqPromptLine(promptLine)) {
        return (
          <span ref={rootRef} className={rootClassName}>
            {renderGovExcerpt(t, 0)}
          </span>
        );
      }
      return (
        <span ref={rootRef} className={rootClassName}>
          <span className={GOV_MCQ_STEM_BLOCK_CLASS}>
            {applyMarksToSegment(head, 0, highlights, removeHighlight)}
          </span>
          <span className={GOV_MCQ_ATTRIBUTION_CLASS}>
            {applyMarksToSegment(tail, six, highlights, removeHighlight)}
          </span>
        </span>
      );
    }
    return (
      <span ref={rootRef} className={rootClassName}>
        {applyMarksToSegment(parts.text, 0, highlights, removeHighlight)}
      </span>
    );
  }

  const { preamble, preambleSeparator, excerpt, separator, stem, stemStart } = parts;
  const hasExcerpt = excerpt.trim().length > 0;
  const preambleLen = preamble ? preamble.length + (preambleSeparator?.length ?? 0) : 0;
  const stemTrim = stem.trimEnd();
  const stemSplit = splitMcqStemAttribution(stemTrim);
  const idx = stemSplit.attributionStartIndex;

  const renderPreamble = () =>
    preamble ? (
      <>
        <span className={GOV_MCQ_PREAMBLE_CLASS}>
          {applyMarksToSegment(preamble, 0, highlights, removeHighlight)}
        </span>
        {preambleSeparator}
      </>
    ) : null;

  if (
    stemSplit.attributionLine != null &&
    idx != null &&
    idx > 0 &&
    idx <= stemTrim.length
  ) {
    const head = stemTrim.slice(0, idx);
    const tail = stemTrim.slice(idx);
    return (
      <span ref={rootRef} className={rootClassName}>
        {renderPreamble()}
        {renderGovExcerpt(excerpt, preambleLen)}
        {separator}
        <span className={GOV_MCQ_STEM_BLOCK_CLASS}>
          <span className="block">{applyMarksToSegment(head, stemStart, highlights, removeHighlight)}</span>
          <span className={GOV_MCQ_ATTRIBUTION_CLASS}>
            {applyMarksToSegment(tail, stemStart + idx, highlights, removeHighlight)}
          </span>
        </span>
      </span>
    );
  }

  return (
    <span ref={rootRef} className={rootClassName}>
      {renderPreamble()}
      {hasExcerpt ? renderGovExcerpt(excerpt, preambleLen) : null}
      {hasExcerpt ? separator : null}
      <span className={GOV_MCQ_STEM_BLOCK_CLASS}>
        {applyMarksToSegment(stem, stemStart, highlights, removeHighlight)}
      </span>
    </span>
  );
}
