'use client';

import type { Question } from '@/data/questionBanks/types';
import { splitMcqStemAttribution } from '@/lib/splitMcqStemAttribution';
import { renderMathText } from '@/utils/processMathContent';

const STEM_LINE_START =
  /^(Which of the following\b|In which of the following\b|Which model of\b|Based on the (?:text|data|excerpt)\b|This quote is describing\b|This quote most clearly\b|This statement most directly\b|The principle outlined\b|The historical scenario\b|The constitutional text above\b|The "compound republic"|How does\b|The decision in\b|Select\b|Identify\b|Compared to\b|Under the\b)/i;

export function isGovMcqPromptLine(lineTrimmed: string): boolean {
  return STEM_LINE_START.test(lineTrimmed);
}

function stemLineStart(lineTrimmed: string): boolean {
  return isGovMcqPromptLine(lineTrimmed);
}

export type GovQuestionParts =
  | { mode: 'single'; text: string }
  | {
      mode: 'split';
      /** e.g. "Questions 3-4 refer to the following excerpt." */
      preamble?: string;
      preambleSeparator?: string;
      excerpt: string;
      separator: string;
      stem: string;
      stemStart: number;
    };

/** College Board-style lead-in before a shared stimulus (not part of the passage body). */
export function isGovMcqExcerptPreamble(line: string): boolean {
  return /refers? to the following (?:excerpt|text|table|summary|passage|chart|graph)[.:]?\s*$/i.test(
    line.trim(),
  );
}

/**
 * Split Gov-style passage + stem for display and for highlight offset mapping.
 * Offsets are measured on `canonicalQuestionText` input.
 */
export function getGovQuestionParts(text: string): GovQuestionParts {
  const c = text.replace(/\r\n/g, '\n');
  const lines = c.split('\n');
  const stemIdx = lines.findIndex((line, idx) => idx > 0 && stemLineStart(line.trim()));

  if (stemIdx > 0) {
    const beforeStem = lines.slice(0, stemIdx).join('\n');
    const stem = lines.slice(stemIdx).join('\n');
    const stemStart = beforeStem.length + 1;

    let preamble: string | undefined;
    let preambleSeparator: string | undefined;
    let excerpt = beforeStem;

    const preambleBreak = beforeStem.match(/^([^\n]+)\n\n([\s\S]+)$/);
    if (preambleBreak && isGovMcqExcerptPreamble(preambleBreak[1])) {
      preamble = preambleBreak[1];
      preambleSeparator = '\n\n';
      excerpt = preambleBreak[2];
    }

    return { mode: 'split', preamble, preambleSeparator, excerpt, separator: '\n', stem, stemStart };
  }

  const m = c.match(/\n\s*\n/);
  if (m && m.index !== undefined && m.index > 0) {
    const separator = m[0];
    const excerpt = c.slice(0, m.index);
    const stem = c.slice(m.index + separator.length);
    const firstStemLine = stem.split('\n')[0]?.trim() ?? '';
    if (stem.length > 0 && stemLineStart(firstStemLine) && !isGovMcqExcerptPreamble(excerpt.trim())) {
      const stemStart = excerpt.length + separator.length;
      return { mode: 'split', excerpt, separator, stem, stemStart };
    }
  }

  return { mode: 'single', text: c };
}

/** @deprecated use getGovQuestionParts */
export function partitionGovQuestionStem(text: string): { excerpt: string; stem?: string } {
  const parts = getGovQuestionParts(text.replace(/\r\n/g, '\n'));
  if (parts.mode === 'single') return { excerpt: parts.text };
  return { excerpt: parts.excerpt, stem: parts.stem };
}

export function isApGovQuestion(question: Question): boolean {
  const s = question.subject;
  return s === 'ap_us_government' || (Array.isArray(s) && s.includes('ap_us_government'));
}

interface ApGovQuestionTextProps {
  /** Raw question string from the bank */
  text: string;
}

export const GOV_MCQ_PREAMBLE_CLASS =
  'mb-2 block font-normal leading-relaxed text-gray-800 not-italic';
export const GOV_MCQ_EXCERPT_BLOCK_CLASS =
  'mb-3 block border-l-4 border-violet-400/80 pl-3.5 leading-relaxed tracking-tight text-gray-800';
export const GOV_MCQ_EXCERPT_QUOTE_CLASS = 'font-normal italic';
export const GOV_MCQ_ATTRIBUTION_CLASS =
  'mt-2 block text-base font-semibold leading-snug text-gray-900 not-italic';
export const GOV_MCQ_STEM_BLOCK_CLASS =
  'mt-3 block font-semibold leading-relaxed tracking-normal text-gray-900 not-italic';

/** Passage quote (normal weight, italic) with optional trailing source line (semibold). */
export function GovExcerptBlock({ excerpt }: { excerpt: string }) {
  const split = splitMcqStemAttribution(excerpt.trimEnd());
  if (!split.attributionLine) {
    return (
      <span className={`${GOV_MCQ_EXCERPT_BLOCK_CLASS} ${GOV_MCQ_EXCERPT_QUOTE_CLASS}`} lang="en">
        {renderMathText(excerpt)}
      </span>
    );
  }
  return (
    <span className={GOV_MCQ_EXCERPT_BLOCK_CLASS} lang="en">
      <span className={GOV_MCQ_EXCERPT_QUOTE_CLASS}>{renderMathText(split.stem)}</span>
      <span className={GOV_MCQ_ATTRIBUTION_CLASS}>{renderMathText(split.attributionLine)}</span>
    </span>
  );
}

/**
 * Gov MCQ copy: excerpt italic + stem. Inserts the real separator text between parts so
 * `textContent` matches `canonicalQuestionText(raw)` for highlighting.
 */
function StemWithTrailingAttribution({ stem }: { stem: string }) {
  const s = splitMcqStemAttribution(stem);
  if (!s.attributionLine) {
    return <>{renderMathText(stem)}</>;
  }
  return (
    <>
      <span className="not-italic">{renderMathText(s.stem)}</span>
      <span className={GOV_MCQ_ATTRIBUTION_CLASS}>{renderMathText(s.attributionLine)}</span>
    </>
  );
}

export function ApGovQuestionText({ text }: ApGovQuestionTextProps) {
  const parts = getGovQuestionParts(text.replace(/\r\n/g, '\n'));

  if (parts.mode === 'single') {
    return (
      <span className={GOV_MCQ_STEM_BLOCK_CLASS}>
        <StemWithTrailingAttribution stem={parts.text} />
      </span>
    );
  }

  const { preamble, preambleSeparator, excerpt, separator, stem } = parts;
  const hasExcerpt = excerpt.trim().length > 0;

  return (
    <>
      {preamble ? (
        <>
          <span className={GOV_MCQ_PREAMBLE_CLASS}>{preamble}</span>
          {preambleSeparator}
        </>
      ) : null}
      {hasExcerpt ? <GovExcerptBlock excerpt={excerpt} /> : null}
      {hasExcerpt ? separator : null}
      <span className={GOV_MCQ_STEM_BLOCK_CLASS}>
        <StemWithTrailingAttribution stem={stem} />
      </span>
    </>
  );
}
