'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import type { StudyBucketItem } from '@/components/cheat-sheet/studyBucketTypes';
import { parseStudyBucketDragData } from '@/components/cheat-sheet/studyBucketTypes';

type Props = {
  visible: boolean;
  items: StudyBucketItem[];
  isGenerating?: boolean;
  onDropItem: (item: StudyBucketItem) => void;
  onOpenQuiz: () => void;
};

function BucketGlyph({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      aria-hidden
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 22c0-8 6.5-14 14-14s14 6 14 14"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <ellipse cx="32" cy="24" rx="20" ry="5" stroke="currentColor" strokeWidth="3" />
      <path
        d="M14 24 L18 54c.4 2.2 2.4 4 4.8 4h18.4c2.4 0 4.4-1.8 4.8-4L50 24"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M17.5 28 L20.5 50.5c.2 1.1 1.2 2 2.4 2h18.2c1.2 0 2.2-.9 2.4-2L46.5 28"
        fill="currentColor"
        opacity="0.12"
      />
    </svg>
  );
}

export function StudyBucketDock({
  visible,
  items,
  isGenerating = false,
  onDropItem,
  onOpenQuiz,
}: Props) {
  const [dragOver, setDragOver] = useState(false);
  const [shake, setShake] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);
  const dragDepthRef = useRef(0);
  const count = items.length;
  const expanded = dragOver;

  useEffect(() => {
    if (!shake) return;
    const t = window.setTimeout(() => setShake(false), 520);
    return () => window.clearTimeout(t);
  }, [shake]);

  // Collapse if the user cancels the drag elsewhere
  useEffect(() => {
    const end = () => {
      dragDepthRef.current = 0;
      setDragOver(false);
    };
    window.addEventListener('dragend', end);
    window.addEventListener('drop', end);
    return () => {
      window.removeEventListener('dragend', end);
      window.removeEventListener('drop', end);
    };
  }, []);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    dragDepthRef.current += 1;
    setDragOver(true);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    if (!dragOver) setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    dragDepthRef.current = Math.max(0, dragDepthRef.current - 1);
    // Only collapse when we've fully left the expanded hit area
    const next = e.relatedTarget as Node | null;
    if (dropRef.current && next && dropRef.current.contains(next)) return;
    if (dragDepthRef.current === 0) setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragDepthRef.current = 0;
    setDragOver(false);
    const item = parseStudyBucketDragData(e);
    if (!item) return;
    onDropItem(item);
    setShake(true);
  };

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="study-bucket"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22 }}
          className="fixed top-24 left-3 z-[120] sm:left-5"
        >
          <motion.div
            ref={dropRef}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            animate={
              shake
                ? {
                    width: 56,
                    height: 56,
                    borderRadius: 999,
                    rotate: [0, -12, 10, -8, 5, -2, 0],
                  }
                : expanded
                  ? { width: 148, height: 112, borderRadius: 20, rotate: 0 }
                  : { width: 56, height: 56, borderRadius: 999, rotate: 0 }
            }
            transition={
              shake
                ? { rotate: { duration: 0.5, ease: 'easeInOut' }, default: { type: 'spring', stiffness: 380, damping: 26 } }
                : { type: 'spring', stiffness: 380, damping: 26 }
            }
            className={`relative flex items-center justify-center overflow-hidden ${
              expanded
                ? 'bg-stone-800 text-white shadow-lg ring-2 ring-stone-800/20'
                : count > 0
                  ? 'bg-white text-stone-800 shadow-sm ring-1 ring-stone-200'
                  : 'bg-white/90 text-stone-500 shadow-sm ring-1 ring-stone-200'
            }`}
          >
            {/* Expanded drop target surface */}
            <AnimatePresence>
              {expanded ? (
                <motion.div
                  key="drop-surface"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="absolute inset-2 flex flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-white/40"
                >
                  <BucketGlyph className="h-7 w-7 text-white" />
                  <span className="text-[11px] font-medium tracking-wide text-white/90">
                    Drop here
                  </span>
                </motion.div>
              ) : null}
            </AnimatePresence>

            {/* Collapsed icon / click-to-quiz */}
            {!expanded ? (
              <button
                type="button"
                onClick={() => {
                  if (count > 0) onOpenQuiz();
                }}
                disabled={isGenerating || count === 0}
                className={`flex h-full w-full items-center justify-center ${
                  count === 0 && !isGenerating ? 'cursor-default' : 'cursor-pointer'
                } disabled:opacity-70`}
                aria-label={
                  count > 0
                    ? 'Open quiz from study bucket'
                    : 'Study bucket — drop terms or lessons here'
                }
                title={count > 0 ? 'Open quiz' : 'Drop terms or lesson titles here'}
              >
                {isGenerating ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  <BucketGlyph className="h-8 w-8" />
                )}
                {count > 0 && !isGenerating ? (
                  <span className="absolute bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-stone-800" />
                ) : null}
              </button>
            ) : null}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
