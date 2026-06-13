'use client';

import { renderMathText, type MathTextHighlight } from '@/utils/processMathContent';

interface MathTextProps {
  text: string;
  className?: string;
  highlights?: MathTextHighlight[];
  onRemoveHighlight?: (id: string) => void;
  textOffset?: number;
}

/** Renders user-facing copy with `$...$` / `$$...$$` KaTeX support. */
export function MathText({
  text,
  className,
  highlights,
  onRemoveHighlight,
  textOffset,
}: MathTextProps) {
  return (
    <span className={className}>
      {renderMathText(text, { highlights, onRemoveHighlight, textOffset })}
    </span>
  );
}
