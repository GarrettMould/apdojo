'use client';

import type { Question } from '@/data/questionBanks/types';
import { splitMcqStemAttribution } from '@/lib/splitMcqStemAttribution';

const STEM_LINE_START =
  /^(Which of the following\b|Which model of\b|Based on the text\b|This quote is describing\b|This quote most clearly\b|This statement most directly\b|The "compound republic"|Select\b|Identify\b|Compared to\b|Under the\b)/i;

function stemLineStart(lineTrimmed: string): boolean {
  return STEM_LINE_START.test(lineTrimmed);
}

export type GovQuestionParts =
  | { mode: 'single'; text: string }
  | { mode: 'split'; excerpt: string; separator: string; stem: string; stemStart: number };

/**
 * Split Gov-style passage + stem for display and for highlight offset mapping.
 * Offsets are measured on `canonicalQuestionText` input.
 */
export function getGovQuestionParts(text: string): GovQuestionParts {
  const c = text.replace(/\r\n/g, '\n');
  const m = c.match(/\n\s*\n/);
  if (m && m.index !== undefined && m.index > 0) {
    const separator = m[0];
    const excerpt = c.slice(0, m.index);
    const stem = c.slice(m.index + separator.length);
    if (stem.length > 0) {
      const stemStart = excerpt.length + separator.length;
      return { mode: 'split', excerpt, separator, stem, stemStart };
    }
  }

  const lines = c.split('\n');
  const stemIdx = lines.findIndex((line, idx) => idx > 0 && stemLineStart(line.trim()));
  if (stemIdx > 0) {
    const excerpt = lines.slice(0, stemIdx).join('\n');
    const separator = '\n';
    const stemStart = excerpt.length + separator.length;
    const stem = lines.slice(stemIdx).join('\n');
    if (stem.length > 0) {
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

/**
 * Gov MCQ copy: excerpt italic + stem. Inserts the real separator text between parts so
 * `textContent` matches `canonicalQuestionText(raw)` for highlighting.
 */
function StemWithTrailingAttribution({ stem }: { stem: string }) {
  const s = splitMcqStemAttribution(stem);
  if (!s.attributionLine) {
    return <>{stem}</>;
  }
  return (
    <>
      <span className="not-italic">{s.stem}</span>
      <span className="mt-2 block text-base font-normal leading-snug text-gray-600 not-italic">
        {s.attributionLine}
      </span>
    </>
  );
}

export function ApGovQuestionText({ text }: ApGovQuestionTextProps) {
  const parts = getGovQuestionParts(text.replace(/\r\n/g, '\n'));

  if (parts.mode === 'single') {
    return <StemWithTrailingAttribution stem={parts.text} />;
  }

  const { excerpt, separator, stem } = parts;

  return (
    <>
      <span
        className="mb-3 block border-l-4 border-violet-400/80 pl-3.5 leading-relaxed tracking-tight text-gray-800 italic"
        lang="en"
      >
        {excerpt}
      </span>
      {separator}
      <span className="mt-3 block leading-relaxed tracking-normal text-gray-900 not-italic">
        <StemWithTrailingAttribution stem={stem} />
      </span>
    </>
  );
}
