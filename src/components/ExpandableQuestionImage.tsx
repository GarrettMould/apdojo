'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Maximize2 } from 'lucide-react';

interface ExpandableQuestionImageProps {
  src: string;
  alt?: string;
  imageClassName?: string;
  wrapperClassName?: string;
}

export function ExpandableQuestionImage({
  src,
  alt = 'Question diagram',
  imageClassName = 'max-h-[300px] w-auto object-contain',
  wrapperClassName = '',
}: ExpandableQuestionImageProps) {
  const [expanded, setExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!expanded) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setExpanded(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [expanded]);

  const open = () => setExpanded(true);

  return (
    <>
      <div className={`relative inline-block max-w-full ${wrapperClassName}`}>
        <img
          src={src}
          alt={alt}
          className={`cursor-pointer hover:opacity-90 transition-opacity rounded-lg ${imageClassName}`}
          onClick={open}
        />
        <button
          type="button"
          onClick={open}
          className="absolute top-1 right-1 p-1 rounded border border-gray-300 bg-white/95 text-gray-500 hover:bg-white hover:text-gray-800 shadow-sm transition-colors"
          aria-label="Expand image"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {mounted && expanded
        ? createPortal(
            <div
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
              onClick={() => setExpanded(false)}
              role="dialog"
              aria-modal="true"
              aria-label="Expanded image"
            >
              <img
                src={src}
                alt={alt}
                className="max-h-[90vh] max-w-full object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            </div>,
            document.body
          )
        : null}
    </>
  );
}
