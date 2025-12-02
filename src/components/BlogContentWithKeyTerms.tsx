'use client';

import React from 'react';
import { KeyTerm as MicroKeyTerm, keyTerms as microKeyTerms } from '@/data/apMicroTerms';
import { keyTerms as macroKeyTerms } from '@/data/apMacroTerms';
import { KeyTermTooltip } from './KeyTermTooltip';
import { ActivePredictionLoader } from './blog/ActivePredictionLoader';

interface BlogContentWithKeyTermsProps {
  children: React.ReactNode;
  subject?: 'ap_microeconomics' | 'ap_macroeconomics';
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

interface TextSegment {
  text: string;
  isKeyTerm: boolean;
  keyTerm?: UnifiedKeyTerm;
}

// Process text content to find and highlight key terms
function processTextForKeyTerms(
  text: string,
  allTerms: UnifiedKeyTerm[]
): React.ReactNode[] {
  if (!text || text.trim().length === 0) {
    return [text];
  }

  // Build search targets: each key term + its aliases
  // Also create normalized versions (remove parentheticals) for better matching
  const searchTargets = allTerms.flatMap((keyTerm) => {
    const base: { keyTerm: UnifiedKeyTerm; text: string }[] = [
      { keyTerm, text: keyTerm.term }
    ];
    
    // Add normalized version without parentheticals (e.g., "Aggregate Demand (AD)" -> "Aggregate Demand")
    const normalizedTerm = keyTerm.term.replace(/\s*\([^)]*\)\s*/g, '').trim();
    if (normalizedTerm !== keyTerm.term && normalizedTerm.length > 0) {
      base.push({ keyTerm, text: normalizedTerm });
    }
    
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

  // Sort search targets by length (longest first) to match longer phrases first
  const sortedTargets = [...searchTargets].sort((a, b) => b.text.length - a.text.length);

  // Function to find all occurrences of a search text (case-insensitive)
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

      // Check if it's a whole word/phrase (not part of another word)
      // For multi-word phrases, allow spaces within the phrase
      const before = index > 0 ? text[index - 1] : ' ';
      const after = index + searchText.length < text.length ? text[index + searchText.length] : ' ';
      
      // Word boundary check: before should be start/whitespace/punctuation, after should be end/whitespace/punctuation
      // For multi-word phrases, spaces within the phrase are allowed (they're part of searchText)
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
    const occurrences = findTermOccurrences(text, target.text, target.keyTerm);
    allOccurrences.push(...occurrences);
  });

  // Sort by length (longest first), then by start position
  allOccurrences.sort((a, b) => {
    const lengthDiff = (b.end - b.start) - (a.end - a.start);
    if (lengthDiff !== 0) return lengthDiff;
    return a.start - b.start;
  });

  // Remove overlapping occurrences, prioritizing longer matches
  // Since we've sorted by length (longest first), we process longer matches first
  const nonOverlapping: Array<{ start: number; end: number; term: UnifiedKeyTerm }> = [];
  for (const occurrence of allOccurrences) {
    // Check if this occurrence overlaps with any existing one
    const overlaps = nonOverlapping.some(
      (existing) =>
        (occurrence.start < existing.end && occurrence.end > existing.start)
    );
    
    if (!overlaps) {
      nonOverlapping.push(occurrence);
    } else {
      // If it overlaps, check if this occurrence is longer than the overlapping one(s)
      // If so, remove the shorter overlapping match(es) and add this one
      const overlappingIndices: number[] = [];
      for (let i = 0; i < nonOverlapping.length; i++) {
        const existing = nonOverlapping[i];
        if (occurrence.start < existing.end && occurrence.end > existing.start) {
          overlappingIndices.push(i);
        }
      }
      
      // If this occurrence is longer than all overlapping ones, replace them
      const occurrenceLength = occurrence.end - occurrence.start;
      const shouldReplace = overlappingIndices.every(
        (idx) => (nonOverlapping[idx].end - nonOverlapping[idx].start) < occurrenceLength
      );
      
      if (shouldReplace) {
        // Remove overlapping shorter matches (in reverse order to maintain indices)
        for (let i = overlappingIndices.length - 1; i >= 0; i--) {
          nonOverlapping.splice(overlappingIndices[i], 1);
        }
        nonOverlapping.push(occurrence);
      }
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
        text: text.substring(lastIndex, occurrence.start),
        isKeyTerm: false
      });
    }

    // Add the key term
    segments.push({
      text: text.substring(occurrence.start, occurrence.end),
      isKeyTerm: true,
      keyTerm: occurrence.term
    });

    lastIndex = occurrence.end;
  });

  // Add remaining text
  if (lastIndex < text.length) {
    segments.push({
      text: text.substring(lastIndex),
      isKeyTerm: false
    });
  }

  // If no segments were created (no matches), return original text
  if (segments.length === 0 || (segments.length === 1 && !segments[0].isKeyTerm)) {
    return [text];
  }

  // Convert segments to React nodes
  return segments.map((segment, index) => {
    if (segment.isKeyTerm && segment.keyTerm) {
      // Cast to KeyTerm type for KeyTermTooltip compatibility
      const keyTerm = segment.keyTerm as any;
      return (
        <KeyTermTooltip key={index} term={keyTerm}>
          {segment.text}
        </KeyTermTooltip>
      );
    }
    return <React.Fragment key={index}>{segment.text}</React.Fragment>;
  });
}

// Recursively process React children to find and highlight key terms in text nodes
function processChildren(
  children: React.ReactNode,
  allTerms: UnifiedKeyTerm[]
): React.ReactNode {
  return React.Children.map(children, (child, index) => {
    // If it's a string, process it for key terms
    if (typeof child === 'string') {
      return <React.Fragment key={index}>{processTextForKeyTerms(child, allTerms)}</React.Fragment>;
    }

    // If it's a number, convert to string and process
    if (typeof child === 'number') {
      return <React.Fragment key={index}>{processTextForKeyTerms(String(child), allTerms)}</React.Fragment>;
    }

    // If it's a React element, recursively process its children
    if (React.isValidElement(child)) {
      // Don't process certain elements that shouldn't have their text modified
      const tagName = typeof child.type === 'string' ? child.type : '';
      // Skip headings (h1-h6) - they should never have underlined words
      if (tagName === 'code' || tagName === 'pre' || tagName === 'script' || tagName === 'style' || 
          tagName === 'h1' || tagName === 'h2' || tagName === 'h3' || tagName === 'h4' || tagName === 'h5' || tagName === 'h6') {
        return child;
      }

      // Skip call-to-action boxes (divs with text-center and bg-gray-100 classes)
      // These are promotional/CTA sections and shouldn't have underlined terms
      if (tagName === 'div') {
        const className = child.props.className || '';
        if (className.includes('text-center') && className.includes('bg-gray-100')) {
          return child;
        }
      }

      // Check if this is an ActivePrediction marker div
      if (tagName === 'div' && child.props['data-active-prediction']) {
        const quizId = child.props['data-active-prediction'];
        return <ActivePredictionLoader key={index} id={quizId} />;
      }

      // Process the children recursively
      const processedChildren = processChildren(child.props.children, allTerms);
      
      // Clone the element with processed children
      return React.cloneElement(child, { key: index }, processedChildren);
    }

    // For arrays, process each item
    if (Array.isArray(child)) {
      return child.map((item, itemIndex) => processChildren(item, allTerms));
    }

    // For everything else, return as-is
    return child;
  });
}

export function BlogContentWithKeyTerms({ 
  children, 
  subject = 'ap_macroeconomics' 
}: BlogContentWithKeyTermsProps) {
  // Build unified term sets
  const microBase: UnifiedKeyTerm[] = microKeyTerms
    .filter((t) => t.subject === 'ap_microeconomics')
    .map<UnifiedKeyTerm>((t: MicroKeyTerm) => ({
      id: t.id,
      term: t.term,
      definition: t.definition,
      subject: t.subject,
      unit: t.unit,
      lessonIDs: t.lessonIDs,
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

  const allTerms: UnifiedKeyTerm[] =
    subject === 'ap_microeconomics' ? microBase : macroBase;

  // Process the children to highlight key terms
  return <>{processChildren(children, allTerms)}</>;
}

