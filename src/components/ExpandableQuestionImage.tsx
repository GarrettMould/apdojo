'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Maximize2, X } from 'lucide-react';

interface ExpandableQuestionImageProps {
  src: string;
  alt?: string;
  imageClassName?: string;
  wrapperClassName?: string;
  /** When false, only the maximize control opens the lightbox (used inside option rows). */
  expandOnImageClick?: boolean;
}

export function ExpandableQuestionImage({
  src,
  alt = 'Question diagram',
  imageClassName = 'max-h-[300px] w-auto object-contain',
  wrapperClassName = '',
  expandOnImageClick = true,
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
      e.stopPropagation();
      if (
        e.key === 'ArrowLeft' ||
        e.key === 'ArrowRight' ||
        e.key === 'ArrowUp' ||
        e.key === 'ArrowDown' ||
        e.key === ' '
      ) {
        e.preventDefault();
      }
    };
    document.addEventListener('keydown', onKeyDown, true);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown, true);
      document.body.style.overflow = previousOverflow;
    };
  }, [expanded]);

  const open = () => setExpanded(true);
  const close = () => setExpanded(false);

  return (
    <>
      <div className={`relative flex w-full max-w-full items-start gap-1 ${wrapperClassName}`}>
        <img
          src={src}
          alt={alt}
          className={`min-w-0 flex-1 rounded-lg ${
            expandOnImageClick ? 'cursor-pointer hover:opacity-90 transition-opacity' : ''
          } ${imageClassName}`}
          onClick={expandOnImageClick ? open : undefined}
        />
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            open();
          }}
          className="mt-0 shrink-0 rounded border border-gray-300 bg-white/95 p-1 text-gray-500 shadow-sm transition-colors hover:bg-white hover:text-gray-800"
          aria-label="View larger image"
          title="View larger"
        >
          <Maximize2 className="h-3.5 w-3.5" />
        </button>
      </div>

      {mounted && expanded
        ? createPortal(
            <div
              className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 p-4 sm:p-8"
              onClick={close}
              role="dialog"
              aria-modal="true"
              aria-label="Expanded image"
            >
              <button
                type="button"
                onClick={close}
                className="absolute right-4 top-4 z-[201] rounded-full bg-white/95 p-2 text-gray-700 shadow-sm transition-colors hover:bg-white hover:text-gray-900"
                aria-label="Close expanded image"
              >
                <X className="h-5 w-5" />
              </button>
              <img
                src={src}
                alt={alt}
                className="rounded-lg bg-white object-contain shadow-2xl"
                style={{
                  height: '85vh',
                  maxHeight: '85vh',
                  width: 'auto',
                  maxWidth: 'min(95vw, calc(100vw - 2rem))',
                }}
                onClick={(e) => e.stopPropagation()}
              />
            </div>,
            document.body
          )
        : null}
    </>
  );
}
