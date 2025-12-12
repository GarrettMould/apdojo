'use client';

import { useEffect, useRef } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface KatexRendererProps {
  math: string;
  displayMode?: boolean;
  className?: string;
}

/**
 * Renders LaTeX math using KaTeX
 * @param math - The LaTeX math string (with or without $$ delimiters)
 * @param displayMode - Whether to render in display mode (block) or inline
 */
export function KatexRenderer({ math, displayMode = false, className = '' }: KatexRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Remove $$ delimiters if present
    let mathContent = math.trim();
    if (mathContent.startsWith('$$') && mathContent.endsWith('$$')) {
      mathContent = mathContent.slice(2, -2).trim();
      displayMode = true; // Force display mode if $$ delimiters are present
    } else if (mathContent.startsWith('$') && mathContent.endsWith('$')) {
      mathContent = mathContent.slice(1, -1).trim();
      displayMode = false; // Inline mode for single $
    }

    try {
      katex.render(mathContent, containerRef.current, {
        throwOnError: false,
        displayMode,
        strict: false,
      });
    } catch (error) {
      console.error('KaTeX rendering error:', error);
      containerRef.current.textContent = math; // Fallback to raw text
    }
  }, [math, displayMode]);

  return (
    <span
      ref={containerRef}
      className={className}
      style={displayMode ? { display: 'block', textAlign: 'center' } : {}}
    />
  );
}

