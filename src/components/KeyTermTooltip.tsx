'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { KeyTerm } from '@/data/apMicroTerms';
import { keyTerms as allMacroTerms } from '@/data/apMacroTerms';
import { keyTerms as allMicroTerms } from '@/data/apMicroTerms';

interface KeyTermTooltipProps {
  term: KeyTerm;
  children: React.ReactNode;
}

export function KeyTermTooltip({ term, children }: KeyTermTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0, side: 'right' as 'left' | 'right' });
  const triggerRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [showDetails, setShowDetails] = useState(false);

  const isScaffold = term.id.startsWith('scaffold-');

  // Simple hash to get a stable color index per term
  const hash = Array.from(term.id).reduce((acc, ch) => acc + ch.charCodeAt(0), 0);

  const mainPalette = [
    { border: '#93C5FD', bg: 'rgba(37,99,235,0.16)' },   // blue-300 (lighter shade of blue-500)
    { border: '#86EFAC', bg: 'rgba(22,163,74,0.16)' },   // green-300 (lighter shade of green-500)
    { border: '#C4B5FD', bg: 'rgba(147,51,234,0.16)' },  // purple-300 (lighter shade of purple-500)
    { border: '#FDB88C', bg: 'rgba(234,88,12,0.16)' },   // orange-300 (lighter shade of orange-500)
    { border: '#F9A8D4', bg: 'rgba(219,39,119,0.16)' },  // pink-300 (lighter shade of pink-500)
    { border: '#67E8F9', bg: 'rgba(8,145,178,0.16)' },   // cyan-300 (lighter shade of cyan-500)
  ];

  const scaffoldPalette = [
    { border: '#BFDBFE', bg: 'rgba(96,165,250,0.14)' },  // blue-200 (even lighter)
    { border: '#BBF7D0', bg: 'rgba(74,222,128,0.14)' },  // green-200 (even lighter)
    { border: '#DDD6FE', bg: 'rgba(168,85,247,0.14)' },  // purple-200 (even lighter)
    { border: '#FED7AA', bg: 'rgba(251,146,60,0.14)' },  // orange-200 (even lighter)
    { border: '#FBCFE8', bg: 'rgba(244,114,182,0.14)' }, // pink-200 (even lighter)
    { border: '#A5F3FC', bg: 'rgba(34,211,238,0.14)' },  // cyan-200 (even lighter)
  ];

  const palette = isScaffold ? scaffoldPalette : mainPalette;
  const color = palette[hash % palette.length];

  // Find related topics based on lessonIDs - get other terms that share lessons
  const relatedTopics = useMemo(() => {
    const allTerms = term.subject === 'ap_macroeconomics' ? allMacroTerms : allMicroTerms;
    const termLessonIds = new Set(term.lessonIDs);
    const relatedTerms = new Set<string>();
    
    // Find other terms that share at least one lesson with this term
    allTerms.forEach(t => {
      if (t.id !== term.id && t.lessonIDs.some(lid => termLessonIds.has(lid))) {
        relatedTerms.add(t.term);
      }
    });
    
    // Return unique related terms, limited to 6 for display
    return Array.from(relatedTerms).slice(0, 6);
  }, [term]);

  const calculatePosition = () => {
    if (!triggerRef.current) return;

    const rect = triggerRef.current.getBoundingClientRect();
    const tooltipWidth = 320; // w-80 = 320px
    const spacing = 12; // Space between term and tooltip
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Check available space on right and left
    const spaceOnRight = viewportWidth - rect.right;
    const spaceOnLeft = rect.left;

    // Determine which side has more space
    let side: 'left' | 'right' = 'right';
    let left = 0;
    let top = rect.top;

    if (spaceOnRight >= tooltipWidth + spacing) {
      // Enough space on right
      side = 'right';
      left = rect.right + spacing;
    } else if (spaceOnLeft >= tooltipWidth + spacing) {
      // Enough space on left
      side = 'left';
      left = rect.left - tooltipWidth - spacing;
    } else {
      // Not enough space on either side, choose the side with more space
      if (spaceOnRight > spaceOnLeft) {
        side = 'right';
        left = rect.right + spacing;
      } else {
        side = 'left';
        left = rect.left - tooltipWidth - spacing;
      }
    }

    // Adjust vertical position to keep tooltip in viewport
    const tooltipHeight = 200; // Estimated max height
    if (top + tooltipHeight > viewportHeight) {
      top = viewportHeight - tooltipHeight - 10;
    }
    if (top < 10) {
      top = 10;
    }

    setPosition({ top, left, side });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current && 
        !tooltipRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      calculatePosition();
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Update position on scroll/resize
  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const updatePosition = () => {
        calculatePosition();
      };

      window.addEventListener('scroll', updatePosition, true);
      window.addEventListener('resize', updatePosition);

      return () => {
        window.removeEventListener('scroll', updatePosition, true);
        window.removeEventListener('resize', updatePosition);
      };
    }
  }, [isOpen]);

  return (
    <>
      <span
        ref={triggerRef}
        className="cursor-pointer font-medium transition-all duration-200 relative"
        style={{
          borderBottom: `1.5px dotted ${color.border}`,
          paddingBottom: 1
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = color.bg;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
      >
        {children}
      </span>
      {isOpen && typeof window !== 'undefined' && createPortal(
        <div
          ref={tooltipRef}
          className="fixed z-[99999] w-80 max-w-[90vw] p-4 bg-white border border-gray-300 rounded-lg shadow-xl max-h-96 overflow-y-auto"
          style={{
            top: `${position.top}px`,
            left: `${position.left}px`,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-lg leading-none"
            aria-label="Close tooltip"
          >
            ×
          </button>
          <div className="text-sm pr-6">
            <h4 className="font-bold text-gray-900 mb-3 text-base">{term.term}</h4>
            <div className="mb-4">
              <p className="text-gray-700 leading-relaxed">{term.definition}</p>
            </div>
            
            {/* Related Topics */}
            {relatedTopics.length > 0 && (
              <div className="mt-4 pt-3 border-t border-gray-200">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Related Topics</p>
                <div className="flex flex-wrap gap-1.5">
                  {relatedTopics.map((topic) => (
                    <span
                      key={topic}
                      className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {term.subNotes && term.subNotes.length > 0 && (
              <div className="mt-4 pt-3 border-t border-gray-200">
                {!showDetails && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowDetails(true);
                    }}
                    className="text-xs text-blue-600 hover:text-blue-700 underline"
                  >
                    Show more
                  </button>
                )}
                {showDetails && (
                  <ul className="mt-2 list-disc list-inside text-gray-600 space-y-1">
                    {term.subNotes.map((note, index) => (
                      <li key={index} className="text-xs">
                        {note}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
          {/* Arrow pointing to the term */}
          <div 
            className={`absolute top-4 ${
              position.side === 'right' 
                ? 'left-0 -translate-x-full' 
                : 'right-0 translate-x-full'
            }`}
          >
            <div className={`w-0 h-0 ${
              position.side === 'right'
                ? 'border-r-8 border-l-0 border-t-8 border-b-8 border-transparent border-r-gray-300'
                : 'border-l-8 border-r-0 border-t-8 border-b-8 border-transparent border-l-gray-300'
            }`}></div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

