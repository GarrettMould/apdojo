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

/**
 * Processes text for inline math ($...$)
 */
function processInlineMathInText(text: string, startKey: number): React.ReactNode[] {
  // Match $...$ where the $ is not doubled, and the first char after $ is NOT a digit
  // This avoids treating currency amounts like $900 as math.
  const inlineMathPattern = /(?<!\$)\$(?!\$)(?!\d)([^$\n]+?)\$(?!\$)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let keyCounter = startKey;
  let match;

  while ((match = inlineMathPattern.exec(text)) !== null) {
    // Add text before the math
    if (match.index > lastIndex) {
      const textBefore = text.substring(lastIndex, match.index);
      if (textBefore) {
        parts.push(
          <React.Fragment key={`text-${keyCounter++}`}>
            {textBefore}
          </React.Fragment>
        );
      }
    }

    // Add the math renderer
    parts.push(
      <KatexRenderer
        key={`math-inline-${keyCounter++}`}
        math={`$${match[1]}$`}
        displayMode={false}
      />
    );

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    const remainingText = text.substring(lastIndex);
    if (remainingText) {
      parts.push(
        <React.Fragment key={`text-${keyCounter++}`}>
          {remainingText}
        </React.Fragment>
      );
    }
  }

  // If no math was found, return the original text (restored if currency was protected)
  if (parts.length === 0) {
    return [<React.Fragment key={startKey}>{text}</React.Fragment>];
  }

  return parts;
}

