import React from 'react';
import { KatexRenderer } from '@/components/KatexRenderer';

/**
 * Processes React content to find and render KaTeX math formulas
 * Looks for strings containing $$...$$ (display math) or $...$ (inline math)
 */
export function processMathContent(content: React.ReactNode): React.ReactNode {
  if (!content) return content;

  // If content is a string, check for math formulas
  if (typeof content === 'string') {
    return processStringForMath(content);
  }

  // If content is a number, boolean, null, or undefined, return as-is
  if (typeof content !== 'object') {
    return content;
  }

  // If content is an array, process each element
  if (Array.isArray(content)) {
    return content.map((child, index) => (
      <React.Fragment key={index}>
        {processMathContent(child)}
      </React.Fragment>
    ));
  }

  // If content is a React element, process its children
  if (React.isValidElement(content)) {
    const props = content.props;
    
    // Process children if they exist
    if (props.children !== undefined && props.children !== null) {
      const processedChildren = processMathContent(props.children);
      // If processing resulted in a single child that's different, replace it
      // Otherwise clone with processed children
      return React.cloneElement(content, { ...props, children: processedChildren } as any);
    }
    
    return content;
  }

  return content;
}

/**
 * Processes a string to find and replace math formulas with KaTeX renderers
 */
function processStringForMath(text: string): React.ReactNode {
  // Check if the entire string is a math formula (common case for template literals)
  const trimmedText = text.trim();
  if (trimmedText.startsWith('$$') && trimmedText.endsWith('$$')) {
    // The entire string is a math formula
    return (
      <KatexRenderer
        key="math-display-full"
        math={trimmedText}
        displayMode={true}
        className="my-4"
      />
    );
  }

  // Pattern to match $$...$$ (display math) - using non-greedy match to handle multiple formulas
  // Updated to match across newlines and handle escaped characters
  // Using [\s\S] instead of . to match newlines, and *? for non-greedy matching
  const displayMathPattern = /\$\$([\s\S]*?)\$\$/g;

  const parts: React.ReactNode[] = [];
  let keyCounter = 0;

  // First, find all display math blocks ($$...$$)
  const displayMatches: Array<{ start: number; end: number; content: string }> = [];
  let match;
  
  // Reset regex and find all matches
  displayMathPattern.lastIndex = 0;
  while ((match = displayMathPattern.exec(text)) !== null) {
    displayMatches.push({
      start: match.index,
      end: match.index + match[0].length,
      content: match[1].trim(), // Trim whitespace from content
    });
  }

  // Process display math matches
  let currentIndex = 0;
  for (const mathMatch of displayMatches) {
    // Add text before the math
    if (mathMatch.start > currentIndex) {
      const textBefore = text.substring(currentIndex, mathMatch.start);
      if (textBefore) {
        parts.push(...processInlineMathInText(textBefore, keyCounter));
        keyCounter += textBefore.length;
      }
    }

    // Add the math renderer - preserve the original format with $$
    parts.push(
      <KatexRenderer
        key={`math-display-${keyCounter++}`}
        math={`$$${mathMatch.content}$$`}
        displayMode={true}
        className="my-4"
      />
    );

    currentIndex = mathMatch.end;
  }

  // Add remaining text after last display math
  if (currentIndex < text.length) {
    const remainingText = text.substring(currentIndex);
    if (remainingText) {
      parts.push(...processInlineMathInText(remainingText, keyCounter));
    }
  }

  // If no display math was found, process for inline math only
  if (displayMatches.length === 0) {
    return processInlineMathInText(text, 0);
  }

  return parts.length === 1 ? parts[0] : <>{parts}</>;
}

/** True when $...$ content is a plain currency amount (e.g. $900), not LaTeX math. */
function isCurrencyMathContent(content: string): boolean {
  return /^\d[\d,]*(?:\.\d+)?$/.test(content.trim());
}

/**
 * Processes text for inline math ($...$).
 * Uses delimiter scanning so expressions like $1.5 \times IQR$ parse correctly.
 */
function processInlineMathInText(text: string, startKey: number): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let keyCounter = startKey;
  let cursor = 0;

  while (cursor < text.length) {
    const openIndex = text.indexOf('$', cursor);

    if (openIndex === -1) {
      const remainingText = text.slice(cursor);
      if (remainingText) {
        parts.push(
          <React.Fragment key={`text-${keyCounter++}`}>{remainingText}</React.Fragment>
        );
      }
      break;
    }

    if (openIndex > cursor) {
      parts.push(
        <React.Fragment key={`text-${keyCounter++}`}>
          {text.slice(cursor, openIndex)}
        </React.Fragment>
      );
    }

    // Skip escaped/display delimiters ($$)
    if (text[openIndex + 1] === '$') {
      parts.push(
        <React.Fragment key={`text-${keyCounter++}`}>$</React.Fragment>
      );
      cursor = openIndex + 1;
      continue;
    }

    const closeIndex = text.indexOf('$', openIndex + 1);
    if (closeIndex === -1) {
      parts.push(
        <React.Fragment key={`text-${keyCounter++}`}>
          {text.slice(openIndex)}
        </React.Fragment>
      );
      break;
    }

    const mathContent = text.slice(openIndex + 1, closeIndex);
    if (isCurrencyMathContent(mathContent)) {
      parts.push(
        <React.Fragment key={`text-${keyCounter++}`}>
          {text.slice(openIndex, closeIndex + 1)}
        </React.Fragment>
      );
    } else {
      parts.push(
        <KatexRenderer
          key={`math-inline-${keyCounter++}`}
          math={`$${mathContent}$`}
          displayMode={false}
        />
      );
    }

    cursor = closeIndex + 1;
  }

  if (parts.length === 0) {
    return [<React.Fragment key={startKey}>{text}</React.Fragment>];
  }

  return parts;
}

export type MathTextHighlight = { start: number; end: number; id: string };

/** Single-asterisk emphasis (`*case name*`) used in Gov MCQ copy. */
const SINGLE_EMPHASIS_PATTERN = /\*([^*]+)\*/g;

function applyHighlightsToPlainText(
  segment: string,
  segmentOffset: number,
  highlights: MathTextHighlight[],
  onRemoveHighlight?: (id: string) => void
): React.ReactNode {
  // Only recurse into emphasis rendering when a valid *...* pair exists.
  // Plain stray asterisks (e.g. "p*") should be treated as normal text.
  SINGLE_EMPHASIS_PATTERN.lastIndex = 0;
  if (SINGLE_EMPHASIS_PATTERN.test(segment)) {
    SINGLE_EMPHASIS_PATTERN.lastIndex = 0;
    return renderEmphasisWithHighlights(
      segment,
      segmentOffset,
      highlights,
      onRemoveHighlight,
    );
  }

  if (highlights.length === 0) return segment;

  const local = highlights
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
          onRemoveHighlight?.(h.id);
        }}
      >
        {segment.slice(h.start, h.end)}
      </mark>
    );
    last = h.end;
  });
  if (last < segment.length) parts.push(segment.slice(last));
  return parts.length === 1 ? parts[0] : <>{parts}</>;
}

function renderEmphasisWithHighlights(
  text: string,
  textOffset: number,
  highlights: MathTextHighlight[],
  onRemoveHighlight?: (id: string) => void,
): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;
  let match: RegExpExecArray | null;
  SINGLE_EMPHASIS_PATTERN.lastIndex = 0;

  while ((match = SINGLE_EMPHASIS_PATTERN.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(
        <React.Fragment key={`em-plain-${key++}`}>
          {applyHighlightsToPlainText(
            text.slice(lastIndex, match.index),
            textOffset + lastIndex,
            highlights,
            onRemoveHighlight,
          )}
        </React.Fragment>,
      );
    }

    const inner = match[1];
    const innerOffset = textOffset + match.index + 1;
    parts.push(
      <em key={`em-${key++}`} className="italic">
        {applyHighlightsToPlainText(inner, innerOffset, highlights, onRemoveHighlight)}
      </em>,
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(
      <React.Fragment key={`em-plain-${key++}`}>
        {applyHighlightsToPlainText(
          text.slice(lastIndex),
          textOffset + lastIndex,
          highlights,
          onRemoveHighlight,
        )}
      </React.Fragment>,
    );
  }

  return parts.length === 1 ? parts[0] : <>{parts}</>;
}

function appendInlineMathParts(
  text: string,
  startKey: number,
  textOffset: number,
  highlights: MathTextHighlight[],
  onRemoveHighlight: ((id: string) => void) | undefined,
  parts: React.ReactNode[]
): number {
  let keyCounter = startKey;
  let cursor = 0;
  let charOffset = textOffset;

  while (cursor < text.length) {
    const openIndex = text.indexOf('$', cursor);

    if (openIndex === -1) {
      const remainingText = text.slice(cursor);
      if (remainingText) {
        parts.push(
          <React.Fragment key={`text-${keyCounter++}`}>
            {applyHighlightsToPlainText(remainingText, charOffset, highlights, onRemoveHighlight)}
          </React.Fragment>
        );
      }
      break;
    }

    if (openIndex > cursor) {
      const chunk = text.slice(cursor, openIndex);
      parts.push(
        <React.Fragment key={`text-${keyCounter++}`}>
          {applyHighlightsToPlainText(chunk, charOffset, highlights, onRemoveHighlight)}
        </React.Fragment>
      );
      charOffset += chunk.length;
    }

    if (text[openIndex + 1] === '$') {
      parts.push(<React.Fragment key={`text-${keyCounter++}`}>$</React.Fragment>);
      charOffset += 1;
      cursor = openIndex + 1;
      continue;
    }

    const closeIndex = text.indexOf('$', openIndex + 1);
    if (closeIndex === -1) {
      const tail = text.slice(openIndex);
      parts.push(
        <React.Fragment key={`text-${keyCounter++}`}>
          {applyHighlightsToPlainText(tail, charOffset, highlights, onRemoveHighlight)}
        </React.Fragment>
      );
      break;
    }

    const mathContent = text.slice(openIndex + 1, closeIndex);
    const fullMatch = text.slice(openIndex, closeIndex + 1);
    if (isCurrencyMathContent(mathContent)) {
      parts.push(
        <React.Fragment key={`text-${keyCounter++}`}>
          {applyHighlightsToPlainText(fullMatch, charOffset, highlights, onRemoveHighlight)}
        </React.Fragment>
      );
    } else {
      parts.push(
        <KatexRenderer
          key={`math-inline-${keyCounter++}`}
          math={`$${mathContent}$`}
          displayMode={false}
        />
      );
    }

    charOffset += fullMatch.length;
    cursor = closeIndex + 1;
  }

  return keyCounter;
}

/**
 * Render a plain string with optional `$...$` / `$$...$$` KaTeX and optional exam highlights.
 * Use this (or `<MathText />`) anywhere user-facing copy includes LaTeX delimiters.
 */
export function renderMathText(
  text: string,
  options?: {
    highlights?: MathTextHighlight[];
    onRemoveHighlight?: (id: string) => void;
    textOffset?: number;
  }
): React.ReactNode {
  const highlights = options?.highlights ?? [];
  const textOffset = options?.textOffset ?? 0;
  const onRemoveHighlight = options?.onRemoveHighlight;

  if (!text.includes('$')) {
    return applyHighlightsToPlainText(text, textOffset, highlights, onRemoveHighlight);
  }

  if (highlights.length === 0) {
    return processStringForMath(text);
  }

  const trimmedText = text.trim();
  if (trimmedText.startsWith('$$') && trimmedText.endsWith('$$')) {
    return (
      <KatexRenderer math={trimmedText} displayMode={true} className="my-4" />
    );
  }

  const displayMathPattern = /\$\$([\s\S]*?)\$\$/g;
  const displayMatches: Array<{ start: number; end: number; content: string }> = [];
  let match;
  displayMathPattern.lastIndex = 0;
  while ((match = displayMathPattern.exec(text)) !== null) {
    displayMatches.push({
      start: match.index,
      end: match.index + match[0].length,
      content: match[1].trim(),
    });
  }

  if (displayMatches.length === 0) {
    const parts: React.ReactNode[] = [];
    appendInlineMathParts(text, 0, textOffset, highlights, onRemoveHighlight, parts);
    return parts.length === 1 ? parts[0] : <>{parts}</>;
  }

  const parts: React.ReactNode[] = [];
  let keyCounter = 0;
  let currentIndex = 0;
  let charOffset = textOffset;

  for (const mathMatch of displayMatches) {
    if (mathMatch.start > currentIndex) {
      const textBefore = text.substring(currentIndex, mathMatch.start);
      keyCounter = appendInlineMathParts(
        textBefore,
        keyCounter,
        charOffset,
        highlights,
        onRemoveHighlight,
        parts
      );
      charOffset += textBefore.length;
    }

    parts.push(
      <KatexRenderer
        key={`math-display-${keyCounter++}`}
        math={`$$${mathMatch.content}$$`}
        displayMode={true}
        className="my-4"
      />
    );
    charOffset += mathMatch.end - mathMatch.start;
    currentIndex = mathMatch.end;
  }

  if (currentIndex < text.length) {
    appendInlineMathParts(
      text.substring(currentIndex),
      keyCounter,
      charOffset,
      highlights,
      onRemoveHighlight,
      parts
    );
  }

  return parts.length === 1 ? parts[0] : <>{parts}</>;
}

