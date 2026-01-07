'use client';

import { useState, useRef, useEffect } from 'react';
import { Highlighter, Eraser } from 'lucide-react';

interface Highlight {
  start: number;
  end: number;
  id: string;
}

interface HighlightableTextProps {
  text: string;
  questionId: number;
  highlights: Highlight[];
  onHighlight: (questionId: number, highlights: Highlight[]) => void;
}

export function HighlightableText({ text, questionId, highlights, onHighlight }: HighlightableTextProps) {
  const [selection, setSelection] = useState<{ start: number; end: number } | null>(null);
  const [showHighlighter, setShowHighlighter] = useState(false);
  const [highlighterPosition, setHighlighterPosition] = useState({ top: 0, left: 0 });
  const [hoveredHighlight, setHoveredHighlight] = useState<string | null>(null);
  const [eraserPosition, setEraserPosition] = useState({ top: 0, left: 0 });
  const textRef = useRef<HTMLDivElement>(null);
  const selectionRef = useRef<Selection | null>(null);
  const hideEraserTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleMouseUp = () => {
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) {
        setSelection(null);
        setShowHighlighter(false);
        return;
      }

      const range = selection.getRangeAt(0);
      const selectedText = selection.toString().trim();
      
      // Only show highlighter if there's actual text selected and it's within our text element
      if (selectedText && textRef.current?.contains(range.commonAncestorContainer)) {
        selectionRef.current = selection;
        
        // Get the position for the highlighter button
        const rect = range.getBoundingClientRect();
        const containerRect = textRef.current.getBoundingClientRect();
        
        setHighlighterPosition({
          top: rect.top - containerRect.top - 40,
          left: rect.left - containerRect.left + rect.width / 2 - 20
        });

        // Calculate start and end positions in the original text
        const preSelectionRange = range.cloneRange();
        preSelectionRange.selectNodeContents(textRef.current);
        preSelectionRange.setEnd(range.startContainer, range.startOffset);
        const start = preSelectionRange.toString().length;
        const end = start + selectedText.length;

        setSelection({ start, end });
        setShowHighlighter(true);
      } else {
        setSelection(null);
        setShowHighlighter(false);
      }
    };

    const handleClick = (e: MouseEvent) => {
      // Hide highlighter if clicking outside
      if (textRef.current && !textRef.current.contains(e.target as Node)) {
        setShowHighlighter(false);
        setSelection(null);
      }
    };

    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('click', handleClick);
      // Cleanup timeout on unmount
      if (hideEraserTimeoutRef.current) {
        clearTimeout(hideEraserTimeoutRef.current);
      }
    };
  }, [text]);

  const handleHighlight = () => {
    if (!selection) return;

    // Check if this selection overlaps with existing highlights
    const overlaps = highlights.some(h => 
      (selection.start >= h.start && selection.start < h.end) ||
      (selection.end > h.start && selection.end <= h.end) ||
      (selection.start <= h.start && selection.end >= h.end)
    );

    if (overlaps) {
      // Remove overlapping highlights and add new one
      const newHighlights = highlights.filter(h => 
        !((selection.start >= h.start && selection.start < h.end) ||
          (selection.end > h.start && selection.end <= h.end) ||
          (selection.start <= h.start && selection.end >= h.end))
      );
      newHighlights.push({
        start: selection.start,
        end: selection.end,
        id: `${Date.now()}-${Math.random()}`
      });
      onHighlight(questionId, newHighlights);
    } else {
      // Add new highlight
      const newHighlights = [...highlights, {
        start: selection.start,
        end: selection.end,
        id: `${Date.now()}-${Math.random()}`
      }];
      onHighlight(questionId, newHighlights);
    }

    // Clear selection
    if (selectionRef.current) {
      selectionRef.current.removeAllRanges();
    }
    setSelection(null);
    setShowHighlighter(false);
  };

  const handleRemoveHighlight = (highlightId: string) => {
    const newHighlights = highlights.filter(h => h.id !== highlightId);
    onHighlight(questionId, newHighlights);
    setHoveredHighlight(null);
  };

  // Render text with highlights
  const renderHighlightedText = () => {
    if (highlights.length === 0) {
      return text;
    }

    // Sort highlights by start position
    const sortedHighlights = [...highlights].sort((a, b) => a.start - b.start);
    
    const parts: (string | JSX.Element)[] = [];
    let lastIndex = 0;

    sortedHighlights.forEach((highlight, index) => {
      // Add text before highlight
      if (highlight.start > lastIndex) {
        parts.push(text.slice(lastIndex, highlight.start));
      }
      
      // Add highlighted text
      parts.push(
        <mark
          key={highlight.id}
          className="bg-yellow-300 px-0 py-0 relative group"
          style={{ backgroundColor: 'rgb(253 224 71)' }}
          onMouseEnter={(e) => {
            // Clear any pending hide timeout
            if (hideEraserTimeoutRef.current) {
              clearTimeout(hideEraserTimeoutRef.current);
              hideEraserTimeoutRef.current = null;
            }
            
            const rect = e.currentTarget.getBoundingClientRect();
            const containerRect = textRef.current?.getBoundingClientRect();
            if (containerRect) {
              setEraserPosition({
                top: rect.top - containerRect.top - 30,
                left: rect.left - containerRect.left + rect.width / 2 - 10
              });
            }
            setHoveredHighlight(highlight.id);
          }}
          onMouseLeave={() => {
            // Add a small delay before hiding to allow moving to the eraser button
            hideEraserTimeoutRef.current = setTimeout(() => {
              setHoveredHighlight(null);
            }, 200);
          }}
        >
          {text.slice(highlight.start, highlight.end)}
        </mark>
      );
      
      lastIndex = highlight.end;
    });

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    return parts;
  };

  return (
    <div className="relative" ref={textRef}>
      <div className="text-lg font-medium text-slate-900 leading-relaxed">
        {renderHighlightedText()}
      </div>
      
      {showHighlighter && selection && (
        <button
          onClick={handleHighlight}
          className="absolute bg-white border-2 border-gray-300 rounded-lg shadow-lg p-2 hover:bg-gray-50 transition-colors z-10 flex items-center justify-center"
          style={{
            top: `${highlighterPosition.top}px`,
            left: `${highlighterPosition.left}px`,
            transform: 'translateX(-50%)'
          }}
          aria-label="Highlight selected text"
        >
          <Highlighter className="w-5 h-5 text-yellow-500" />
        </button>
      )}

      {hoveredHighlight && (
        <button
          onClick={() => handleRemoveHighlight(hoveredHighlight)}
          onMouseEnter={() => {
            // Clear hide timeout when mouse enters eraser button
            if (hideEraserTimeoutRef.current) {
              clearTimeout(hideEraserTimeoutRef.current);
              hideEraserTimeoutRef.current = null;
            }
          }}
          onMouseLeave={() => {
            // Hide after leaving eraser button
            hideEraserTimeoutRef.current = setTimeout(() => {
              setHoveredHighlight(null);
            }, 200);
          }}
          className="absolute bg-white border border-gray-400 rounded shadow-md p-1.5 hover:bg-gray-50 transition-colors z-20 flex items-center justify-center"
          style={{
            top: `${eraserPosition.top}px`,
            left: `${eraserPosition.left}px`,
            transform: 'translateX(-50%)'
          }}
          aria-label="Remove highlight"
        >
          <Eraser className="w-4 h-4 text-gray-600" />
        </button>
      )}
    </div>
  );
}






