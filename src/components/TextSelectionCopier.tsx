'use client';

import { useState, useEffect, useRef } from 'react';
import { Copy, Check } from 'lucide-react';
import { logger } from '@/utils/logger';

/**
 * Development-only tool for copying selected text to wordsToDefine.ts
 * Only active when NODE_ENV === 'development'
 */
export function TextSelectionCopier() {
  const [selectedText, setSelectedText] = useState<string>('');
  const [showButton, setShowButton] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });
  const [isCopied, setIsCopied] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();
      const text = selection?.toString().trim();

      if (text && text.length > 0) {
        setSelectedText(text);
        
        // Get selection position
        const range = selection?.getRangeAt(0);
        if (range) {
          const rect = range.getBoundingClientRect();
          setButtonPosition({
            top: rect.bottom + window.scrollY + 5,
            left: rect.left + window.scrollX + (rect.width / 2) - 40, // Center the button
          });
          setShowButton(true);
          setIsCopied(false);
        }
      } else {
        setShowButton(false);
        setSelectedText('');
      }
    };

    const handleClick = (e: MouseEvent) => {
      // Don't hide if clicking on the button itself
      if (buttonRef.current && buttonRef.current.contains(e.target as Node)) {
        return;
      }
      
      // Small delay to allow selection to update
      setTimeout(() => {
        const selection = window.getSelection();
        if (!selection || selection.toString().trim().length === 0) {
          setShowButton(false);
        }
      }, 100);
    };

    document.addEventListener('selectionchange', handleSelection);
    document.addEventListener('mouseup', handleSelection);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('selectionchange', handleSelection);
      document.removeEventListener('mouseup', handleSelection);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  const handleCopy = async () => {
    if (!selectedText) return;

    try {
      const response = await fetch('/api/add-word-to-define', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ word: selectedText }),
      });

      if (!response.ok) {
        throw new Error('Failed to add word');
      }

      setIsCopied(true);
      logger.log(`✅ Added "${selectedText}" to wordsToDefine.ts`);
      
      // Hide button after 2 seconds
      setTimeout(() => {
        setShowButton(false);
        setIsCopied(false);
        // Clear selection
        window.getSelection()?.removeAllRanges();
      }, 2000);
    } catch (error) {
      logger.error('Error adding word to wordsToDefine.ts:', error);
      alert(`Failed to add word: ${error}`);
    }
  };

  if (!showButton || !selectedText) {
    return null;
  }

  return (
    <button
      ref={buttonRef}
      onClick={handleCopy}
      className="fixed z-[9999] bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md shadow-lg flex items-center gap-2 text-sm font-medium transition-all"
      style={{
        top: `${buttonPosition.top}px`,
        left: `${buttonPosition.left}px`,
        transform: 'translateX(-50%)',
      }}
      title={`Copy "${selectedText}" to wordsToDefine.ts`}
    >
      {isCopied ? (
        <>
          <Check className="w-4 h-4" />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <Copy className="w-4 h-4" />
          <span>COPY</span>
        </>
      )}
    </button>
  );
}

