'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export interface StudyModeCard {
  id: string;
  type: string;
  tag: string;
  front: string;
  back: React.ReactNode;
}

function getFlashcardTagClass(tag: string): string {
  const t = tag.toUpperCase();
  if (t === 'GRAPH') return 'bg-purple-100 text-purple-700';
  if (t === 'RULE') return 'bg-blue-100 text-blue-700';
  if (t === 'LIST') return 'bg-orange-100 text-orange-700';
  return 'bg-gray-100 text-gray-700';
}

interface StudyModeModalProps {
  open: boolean;
  onClose: () => void;
  deck: StudyModeCard[];
  /** Index of the card to show when the modal opens (e.g. the card that was clicked). */
  initialIndex?: number;
}

export function StudyModeModal({
  open,
  onClose,
  deck,
  initialIndex = 0,
}: StudyModeModalProps) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  // When modal opens or initialIndex changes, sync index and reset flip
  useEffect(() => {
    if (open) {
      setIndex(Math.min(initialIndex, Math.max(0, deck.length - 1)));
      setFlipped(false);
    }
  }, [open, initialIndex, deck.length]);

  const currentCard = deck[index];
  const canPrev = index > 0;
  const canNext = index < deck.length - 1;

  const goPrev = () => {
    setFlipped(false);
    setIndex((i) => Math.max(0, i - 1));
  };
  const goNext = () => {
    if (index >= deck.length - 1) onClose();
    else {
      setFlipped(false);
      setIndex((i) => i + 1);
    }
  };

  // Keyboard: Space = flip, ArrowRight = next, ArrowLeft = prev, Escape = close
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === ' ') {
        e.preventDefault();
        setFlipped((f) => !f);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        if (index >= deck.length - 1) onClose();
        else {
          setFlipped(false);
          setIndex((i) => i + 1);
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setFlipped(false);
        setIndex((i) => Math.max(0, i - 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, index, deck.length, onClose]);

  if (!open || deck.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-slate-950/95 backdrop-blur-md"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="study-modal-title"
      >
        {/* Progress bar at top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-slate-800">
          <motion.div
            className="h-full bg-white"
            initial={false}
            animate={{ width: `${((index + 1) / deck.length) * 100}%` }}
            transition={{ duration: 0.25 }}
          />
        </div>
        <div className="absolute top-4 left-4 text-sm font-medium text-slate-400">
          Card {index + 1} of {deck.length}
        </div>

        {/* Close (X) top right */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50 transition-colors z-10"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Center: card + side arrows */}
        <div
          className="flex items-center justify-center gap-4 w-full max-w-5xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={goPrev}
            disabled={!canPrev}
            className="flex-shrink-0 p-4 rounded-full text-slate-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent focus:outline-none focus:ring-2 focus:ring-white/50 transition-colors"
            aria-label="Previous card"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>

          <div className="w-full max-w-2xl flex-1 min-w-0">
            <AnimatePresence mode="wait">
              {currentCard && (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="w-full aspect-[3/2] cursor-pointer"
                  style={{ perspective: '1200px' }}
                  onClick={() => setFlipped((f) => !f)}
                >
                  <div
                    className="relative w-full h-full transition-transform duration-500 ease-in-out"
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                    }}
                  >
                    <div
                      className="absolute inset-0 rounded-2xl bg-white border-2 border-slate-200 shadow-2xl flex flex-col items-center justify-center p-8"
                      style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                      }}
                    >
                      <span
                        className={`absolute top-4 right-4 px-3 py-1 rounded-lg text-xs font-bold ${getFlashcardTagClass(currentCard.tag)}`}
                      >
                        {currentCard.tag}
                      </span>
                      <p
                        id="study-modal-title"
                        className="text-3xl font-bold text-center text-slate-900 leading-snug px-4"
                      >
                        {currentCard.front}
                      </p>
                      <span className="mt-6 text-sm text-slate-500">Space or click to flip</span>
                    </div>
                    <div
                      className="absolute inset-0 rounded-2xl bg-slate-50 border-2 border-slate-200 shadow-2xl flex flex-col p-8 overflow-y-auto"
                      style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                      }}
                    >
                      <span
                        className={`self-end mb-4 px-3 py-1 rounded-lg text-xs font-bold ${getFlashcardTagClass(currentCard.tag)}`}
                      >
                        {currentCard.tag}
                      </span>
                      <div className="text-lg text-slate-800 leading-relaxed flex-1">
                        {currentCard.back}
                      </div>
                      <span className="mt-4 text-sm text-slate-500">Space or click to flip back</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            type="button"
            onClick={goNext}
            className="flex-shrink-0 p-4 rounded-full text-slate-400 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50 transition-colors"
            aria-label={canNext ? 'Next card' : 'Done'}
          >
            <ChevronRight className="w-10 h-10" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
