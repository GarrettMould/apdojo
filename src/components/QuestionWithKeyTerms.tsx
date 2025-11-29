'use client';

import React from 'react';
import { KeyTerm as MicroKeyTerm, keyTerms as microKeyTerms } from '@/data/apMicroTerms';
import { keyTerms as macroKeyTerms } from '@/data/apMacroTerms';
import { KeyTermTooltip } from './KeyTermTooltip';
import { unit5MicroScaffoldTerms } from '@/data/unitMcqScaffoldTerms';

interface QuestionWithKeyTermsProps {
  questionText: string;
  unit: number;
  subject: 'ap_microeconomics' | 'ap_macroeconomics';
}

interface TextSegment {
  text: string;
  isKeyTerm: boolean;
  keyTerm?: UnifiedKeyTerm;
}

type UnifiedKeyTerm = {
  id: string;
  term: string;
  definition: string;
  subject: 'ap_microeconomics' | 'ap_macroeconomics';
  unit: number;
  lessonIDs: string[];
  aliases?: string[];
  subNotes?: string[];
};

export function QuestionWithKeyTerms({ questionText, unit, subject }: QuestionWithKeyTermsProps) {
  // Build unified term sets for micro and macro
  const microBase: UnifiedKeyTerm[] = microKeyTerms
    .filter((t) => t.subject === 'ap_microeconomics')
    .map<UnifiedKeyTerm>((t: MicroKeyTerm) => ({
      id: t.id,
      term: t.term,
      definition: t.definition,
      subject: t.subject,
      unit: t.unit,
      lessonIDs: t.lessonIDs,
      // aliases are only defined on micro terms for now
      aliases: (t as any).aliases,
      subNotes: t.subNotes
    }));

  const macroBase: UnifiedKeyTerm[] = macroKeyTerms
    .filter((t) => t.subject === 'ap_macroeconomics')
    .map<UnifiedKeyTerm>((t: any) => ({
      id: t.id,
      term: t.term,
      definition: t.definition,
      subject: t.subject,
      unit: t.unit,
      lessonIDs: t.lessonIDs,
      subNotes: t.subNotes
    }));

  // Micro-only scaffolding (Unit 5 support terms)
  const microScaffold: UnifiedKeyTerm[] =
    subject === 'ap_microeconomics'
      ? unit5MicroScaffoldTerms.map((t) => ({
          id: `scaffold-${t.id}`,
          term: t.text,
          definition: t.definition,
          subject: 'ap_microeconomics',
          unit: 5,
          lessonIDs: []
        }))
      : [];

  const allTerms: UnifiedKeyTerm[] =
    subject === 'ap_microeconomics'
      ? [...microBase, ...microScaffold]
      : macroBase;

  // If we somehow have no terms for this subject, just render plain text
  if (allTerms.length === 0) {
    return <>{questionText}</>;
  }

  // Build search targets: each key term + its aliases
  const searchTargets = allTerms.flatMap((keyTerm) => {
    const base: { keyTerm: UnifiedKeyTerm; text: string }[] = [
      { keyTerm, text: keyTerm.term }
    ];
    if (keyTerm.aliases && keyTerm.aliases.length > 0) {
      base.push(
        ...keyTerm.aliases.map((alias) => ({
          keyTerm,
          text: alias
        }))
      );
    }
    return base;
  });

  // Sort search targets by length of text (longest first) to match longer phrases first
  const sortedTargets = [...searchTargets].sort((a, b) => b.text.length - a.text.length);

  // Function to find all occurrences of a search text in the question (case-insensitive)
  const findTermOccurrences = (
    text: string,
    searchText: string,
    keyTerm: UnifiedKeyTerm
  ): Array<{ start: number; end: number; term: UnifiedKeyTerm }> => {
    const occurrences: Array<{ start: number; end: number; term: UnifiedKeyTerm }> = [];
    const lowerText = text.toLowerCase();
    const lowerSearch = searchText.toLowerCase();
    let searchIndex = 0;

    while (searchIndex < text.length) {
      const index = lowerText.indexOf(lowerSearch, searchIndex);
      if (index === -1) break;

      // Check if it's a whole word (not part of another word)
      // Allow word boundaries: start of string, end of string, whitespace, punctuation, parentheses, hyphens
      // For compound terms, allow hyphens as valid characters within the term
      const before = index > 0 ? text[index - 1] : ' ';
      const after = index + searchText.length < text.length ? text[index + searchText.length] : ' ';
      const isWordBoundary =
        (index === 0 || /[\s\W\(\)]/.test(before)) &&
        (index + searchText.length >= text.length || /[\s\W\(\)]/.test(after));

      if (isWordBoundary) {
        occurrences.push({
          start: index,
          end: index + searchText.length,
          term: keyTerm
        });
      }
      searchIndex = index + 1;
    }

    return occurrences;
  };

  // Find all key term occurrences (including aliases)
  const allOccurrences: Array<{ start: number; end: number; term: UnifiedKeyTerm }> = [];
  sortedTargets.forEach((target) => {
    const occurrences = findTermOccurrences(questionText, target.text, target.keyTerm);
    allOccurrences.push(...occurrences);
  });

  // Sort by length (longest first), then by start position
  // This ensures longer compound terms are processed before shorter individual words
  allOccurrences.sort((a, b) => {
    const lengthDiff = (b.end - b.start) - (a.end - a.start);
    if (lengthDiff !== 0) return lengthDiff;
    return a.start - b.start;
  });

  // Remove overlapping occurrences, prioritizing longer matches
  // When a longer match is found, remove any shorter matches that are contained within it
  const nonOverlapping: Array<{ start: number; end: number; term: UnifiedKeyTerm }> = [];
  for (const occurrence of allOccurrences) {
    // Check if this occurrence overlaps with or is contained within any existing match
    const isOverlapped = nonOverlapping.some(
      (existing) =>
        (occurrence.start >= existing.start && occurrence.start < existing.end) ||
        (occurrence.end > existing.start && occurrence.end <= existing.end) ||
        (occurrence.start <= existing.start && occurrence.end >= existing.end)
    );
    
    if (!isOverlapped) {
      // Remove any existing shorter matches that are contained within this longer match
      for (let i = nonOverlapping.length - 1; i >= 0; i--) {
        const existing = nonOverlapping[i];
        if (
          existing.start >= occurrence.start &&
          existing.end <= occurrence.end &&
          (existing.end - existing.start) < (occurrence.end - occurrence.start)
        ) {
          nonOverlapping.splice(i, 1);
        }
      }
      nonOverlapping.push(occurrence);
    }
  }
  
  // Re-sort by start position for rendering
  nonOverlapping.sort((a, b) => a.start - b.start);

  // Build segments
  const segments: TextSegment[] = [];
  let lastIndex = 0;

  nonOverlapping.forEach((occurrence) => {
    // Add text before the key term
    if (occurrence.start > lastIndex) {
      segments.push({
        text: questionText.substring(lastIndex, occurrence.start),
        isKeyTerm: false
      });
    }

    // Add the key term
    segments.push({
      text: questionText.substring(occurrence.start, occurrence.end),
      isKeyTerm: true,
      keyTerm: occurrence.term
    });

    lastIndex = occurrence.end;
  });

  // Add remaining text
  if (lastIndex < questionText.length) {
    segments.push({
      text: questionText.substring(lastIndex),
      isKeyTerm: false
    });
  }

  // If no segments were created (no matches), return original text
  if (segments.length === 0 || (segments.length === 1 && !segments[0].isKeyTerm)) {
    return <>{questionText}</>;
  }

  return (
    <>
      {segments.map((segment, index) => {
        if (segment.isKeyTerm && segment.keyTerm) {
          return (
            <KeyTermTooltip key={index} term={segment.keyTerm}>
              {segment.text}
            </KeyTermTooltip>
          );
        }
        return <React.Fragment key={index}>{segment.text}</React.Fragment>;
      })}
    </>
  );
}

