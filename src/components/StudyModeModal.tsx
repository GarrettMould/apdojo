'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { COURSE_CONFIG } from '@/data/seasonPassCourseConfig';

export interface StudyModeCard {
  id: string;
  type: string;
  tag: string;
  front: string;
  back: React.ReactNode;
  /** Optional image URL shown on the back of the card (e.g. for GRAPH cards). */
  backImage?: string;
}

function getFlashcardTagClass(tag: string): string {
  const t = tag.toUpperCase();
  if (t === 'GRAPH') return 'bg-purple-100 text-purple-700';
  if (t === 'RULE') return 'bg-blue-100 text-blue-700';
  if (t === 'LIST') return 'bg-orange-100 text-orange-700';
  return 'bg-gray-100 text-gray-700';
}

/** Dark-mode friendly classes for the filter dropdown trigger in the modal header. */
function getFilterTriggerClass(filterType: 'all' | 'GRAPH' | 'RULE' | 'LIST'): string {
  if (filterType === 'all') return 'bg-slate-700 text-slate-200 border-slate-600';
  if (filterType === 'GRAPH') return 'bg-purple-600/90 text-white border-purple-500';
  if (filterType === 'RULE') return 'bg-blue-600/90 text-white border-blue-500';
  if (filterType === 'LIST') return 'bg-orange-600/90 text-white border-orange-500';
  return 'bg-slate-700 text-slate-200 border-slate-600';
}

interface StudyModeModalProps {
  open: boolean;
  onClose: () => void;
  deck: StudyModeCard[];
  /** Index of the card to show when the modal opens (e.g. the card that was clicked). */
  initialIndex?: number;
  /** When true (free user hit daily shuffle limit), disable next/prev (parent typically closes modal and shows limit modal). */
  freeUserShuffleLimitReached?: boolean;
  /** Called when user views a card (on open and when index changes). Used for daily limit counting. */
  onCardView?: (index: number) => void;
  /** For unit page only; unused when no overlay. */
  seasonPassCourseType?: 'macro' | 'micro';
  /** When true, flipping a card fires onLockedFlip instead of revealing the back. */
  isLocked?: boolean;
  /** Called when a locked user attempts to flip a card. */
  onLockedFlip?: () => void;
}

export function StudyModeModal({
  open,
  onClose,
  deck,
  initialIndex = 0,
  freeUserShuffleLimitReached = false,
  onCardView,
  seasonPassCourseType = 'macro',
  isLocked = false,
  onLockedFlip,
}: StudyModeModalProps) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [filterType, setFilterType] = useState<'all' | 'GRAPH' | 'RULE' | 'LIST'>('all');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter deck based on selected type
  const filteredDeck = filterType === 'all'
    ? deck
    : deck.filter(card => {
        if (filterType === 'GRAPH') return card.tag === 'GRAPH';
        if (filterType === 'RULE') return card.tag === 'RULE';
        if (filterType === 'LIST') return card.type === 'list';
        return true;
      });

  // Counts per type (for dropdown options)
  const typeCounts = {
    all: deck.length,
    GRAPH: deck.filter(c => c.tag === 'GRAPH').length,
    RULE: deck.filter(c => c.tag === 'RULE').length,
    LIST: deck.filter(c => c.type === 'list').length,
  };

  // When modal opens or initialIndex changes, sync index and reset flip
  useEffect(() => {
    if (open) {
      const maxIndex = Math.max(0, filteredDeck.length - 1);
      setIndex(Math.min(initialIndex, maxIndex));
      setFlipped(false);
      setFilterType('all');
      setDropdownOpen(false);
    }
  }, [open, initialIndex, filteredDeck.length]);

  // Notify parent when user views a card (for daily limit counting)
  useEffect(() => {
    if (open && filteredDeck.length > 0 && onCardView != null) {
      onCardView(index);
    }
  }, [filterType, filteredDeck.length]);

  const currentCard = filteredDeck[index];
  const canPrev = !freeUserShuffleLimitReached && index > 0;
  const canNext = !freeUserShuffleLimitReached && index < filteredDeck.length - 1;

  // Cycle through filter types when tag is clicked; reset to first card of that type
  const handleTagClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card flip
    const cycle: Array<'all' | 'GRAPH' | 'RULE' | 'LIST'> = ['all', 'GRAPH', 'RULE', 'LIST'];
    const currentIndex = cycle.indexOf(filterType);
    const nextIndex = (currentIndex + 1) % cycle.length;
    setFilterType(cycle[nextIndex]);
    setIndex(0);
    setFlipped(false);
  };

  const selectFilterType = (type: 'all' | 'GRAPH' | 'RULE' | 'LIST') => {
    setFilterType(type);
    setDropdownOpen(false);
  };

  const goPrev = () => {
    if (freeUserShuffleLimitReached) return;
    setFlipped(false);
    setIndex((i) => Math.max(0, i - 1));
  };
  const goNext = () => {
    if (freeUserShuffleLimitReached) return;
    if (index >= filteredDeck.length - 1) onClose();
    else {
      setFlipped(false);
      setIndex((i) => i + 1);
    }
  };

  // Keyboard: Space/ArrowUp/ArrowDown = flip, ArrowRight = next, ArrowLeft = prev, Escape = close
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (freeUserShuffleLimitReached) {
        // Block next/prev when daily limit reached
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') e.preventDefault();
      } else if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
        setFlipped((f) => !f);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        if (index >= filteredDeck.length - 1) onClose();
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
  }, [open, index, flipped, filteredDeck.length, onClose, freeUserShuffleLimitReached, isLocked, onLockedFlip]);

  if (!open || deck.length === 0 || filteredDeck.length === 0) return null;

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
            animate={{ width: `${((index + 1) / filteredDeck.length) * 100}%` }}
            transition={{ duration: 0.25 }}
          />
        </div>
        <div className="absolute top-4 left-4 flex items-center gap-4 flex-wrap" onClick={(e) => e.stopPropagation()}>
          <div className="text-sm font-medium text-slate-400">
            Card {index + 1} of {filteredDeck.length}
            {filterType !== 'all' && (
              <span className="ml-2 text-slate-500">
                ({deck.length} total)
              </span>
            )}
          </div>
          {/* Type filter dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setDropdownOpen((o) => !o); }}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-opacity hover:opacity-90 border ${getFilterTriggerClass(filterType)}`}
              aria-haspopup="listbox"
              aria-expanded={dropdownOpen}
              aria-label="Filter by card type"
            >
              {filterType === 'all' ? 'All types' : filterType}
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {dropdownOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  role="listbox"
                  className="absolute left-0 top-full mt-1 min-w-[120px] py-1 rounded-lg bg-slate-800 border border-slate-600 shadow-xl z-50"
                >
                  <li>
                    <button
                      type="button"
                      role="option"
                      aria-selected={filterType === 'all'}
                      onClick={() => selectFilterType('all')}
                      className={`w-full text-left px-3 py-2 text-sm font-medium hover:bg-white/10 ${filterType === 'all' ? 'bg-white/10 text-white' : 'text-slate-300'}`}
                    >
                      All types <span className="text-slate-500">({typeCounts.all})</span>
                    </button>
                  </li>
                  {typeCounts.GRAPH > 0 && (
                    <li>
                      <button
                        type="button"
                        role="option"
                        aria-selected={filterType === 'GRAPH'}
                        onClick={() => selectFilterType('GRAPH')}
                        className={`w-full text-left px-3 py-2 text-sm font-medium hover:bg-white/10 flex items-center gap-2 ${filterType === 'GRAPH' ? 'bg-white/10' : ''} ${getFlashcardTagClass('GRAPH')}`}
                      >
                        Graph <span className="opacity-80">({typeCounts.GRAPH})</span>
                      </button>
                    </li>
                  )}
                  {typeCounts.RULE > 0 && (
                    <li>
                      <button
                        type="button"
                        role="option"
                        aria-selected={filterType === 'RULE'}
                        onClick={() => selectFilterType('RULE')}
                        className={`w-full text-left px-3 py-2 text-sm font-medium hover:bg-white/10 flex items-center gap-2 ${filterType === 'RULE' ? 'bg-white/10' : ''} ${getFlashcardTagClass('RULE')}`}
                      >
                        Rule <span className="opacity-80">({typeCounts.RULE})</span>
                      </button>
                    </li>
                  )}
                  {typeCounts.LIST > 0 && (
                    <li>
                      <button
                        type="button"
                        role="option"
                        aria-selected={filterType === 'LIST'}
                        onClick={() => selectFilterType('LIST')}
                        className={`w-full text-left px-3 py-2 text-sm font-medium hover:bg-white/10 flex items-center gap-2 ${filterType === 'LIST' ? 'bg-white/10' : ''} ${getFlashcardTagClass('LIST')}`}
                      >
                        List <span className="opacity-80">({typeCounts.LIST})</span>
                      </button>
                    </li>
                  )}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Close (X) top right - above overlay so user can always close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50 transition-colors z-30"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Center: card + side arrows */}
        <div
          className="flex w-full max-w-[min(100vw-1rem,1200px)] items-center justify-center gap-2 px-1 sm:gap-4 sm:px-2"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={goPrev}
            disabled={!canPrev}
            className="flex-shrink-0 rounded-md border-2 border-white/25 p-3 text-slate-300 hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent sm:p-4"
            aria-label="Previous card"
          >
            <ChevronLeft className="h-8 w-8 sm:h-10 sm:w-10" />
          </button>

          <div className="min-h-0 w-full min-w-0 flex-1 max-w-[920px]">
            <AnimatePresence mode="wait">
              {currentCard && (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="mx-auto w-full cursor-pointer"
                  style={{ perspective: '1400px' }}
                  onClick={() => setFlipped((f) => !f)}
                >
                  <div
                    className="relative w-full min-h-[min(58vh,520px)] max-h-[min(76vh,720px)] sm:min-h-[600px] sm:max-h-[760px]"
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                    }}
                  >
                    <div
                      className="absolute inset-0 flex flex-col items-center justify-center rounded-md border-4 border-black bg-white p-6 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] sm:p-10 md:p-12"
                      style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                      }}
                    >
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setDropdownOpen((o) => !o); }}
                        className={`absolute right-3 top-3 border-2 border-black px-3 py-1.5 text-xs font-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-y-0.5 sm:right-4 sm:top-4 ${getFlashcardTagClass(currentCard.tag)}`}
                        title="Click to filter by type"
                      >
                        {currentCard.tag}
                      </button>
                      <p
                        id="study-modal-title"
                        className="px-3 text-center text-3xl font-black leading-tight tracking-tight text-black sm:px-6 sm:text-4xl md:text-5xl"
                      >
                        {currentCard.front}
                      </p>
                      <span className="mt-6 text-sm font-bold uppercase tracking-wide text-slate-600 sm:mt-8 sm:text-base">
                        {isLocked ? 'Flip to reveal answer' : 'Space, ↑, or ↓ to flip'}
                      </span>
                    </div>
                    <div
                      className="absolute inset-0 flex h-full w-full flex-col overflow-hidden rounded-md border-4 border-black bg-white shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]"
                      style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                      }}
                    >
                      {isLocked ? (
                        (() => {
                          const courseKey = seasonPassCourseType === 'micro' ? 'micro' : 'macro';
                          const config = COURSE_CONFIG[courseKey];
                          const accentBtn =
                            courseKey === 'micro'
                              ? 'bg-green-600 hover:bg-green-700 border-green-800'
                              : 'bg-blue-600 hover:bg-blue-700 border-blue-800';

                          return (
                            <div className="relative flex h-full w-full flex-col items-center justify-center bg-white p-6 sm:p-10 md:p-12">
                              <div className={`absolute left-0 top-0 h-1.5 w-full border-b-2 border-black ${config.accentBg}`} aria-hidden />
                              <div className="w-full max-w-4xl text-center">
                                <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-slate-600 sm:text-sm">
                                  {config.badge}
                                </p>
                                <h3 className="px-3 text-center text-3xl font-black leading-tight tracking-tight text-black sm:px-6 sm:text-4xl md:text-5xl">
                                  {config.headline}
                                </h3>
                                <p className="mx-auto mt-4 max-w-2xl text-base font-semibold text-slate-700 sm:text-lg">
                                  {config.subheadline}
                                </p>
                                <p className="mt-5 text-2xl font-black text-black sm:text-3xl">
                                  ${config.price}
                                  <span className="ml-2 text-lg font-semibold text-gray-400 line-through sm:text-xl">
                                    ${config.originalPrice}
                                  </span>
                                </p>
                              </div>

                              <div className="mt-8 w-full max-w-md">
                                <Button
                                  asChild
                                  size="lg"
                                  className={`w-full border-4 border-black py-4 text-base font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:py-5 sm:text-lg ${accentBtn} text-white`}
                                >
                                  <Link href={`/purchase/season-pass?courseType=${courseKey}`} onClick={(e) => e.stopPropagation()}>
                                    Get the Season Pass
                                  </Link>
                                </Button>
                              </div>
                            </div>
                          );
                        })()
                      ) : (
                        /* ── Normal card back (minimal, front-matched style) ── */
                        <div className="relative flex h-full w-full flex-col items-center justify-center bg-white p-6 sm:p-10 md:p-12">
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); setDropdownOpen((o) => !o); }}
                            className={`absolute right-3 top-3 border-2 border-black px-3 py-1.5 text-xs font-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-y-0.5 sm:right-4 sm:top-4 ${getFlashcardTagClass(currentCard.tag)}`}
                            title="Click to filter by type"
                          >
                            {currentCard.tag}
                          </button>
                          <div className="w-full max-w-4xl text-center">
                            {currentCard.backImage ? (
                              <img
                                src={currentCard.backImage}
                                alt="Graph or diagram"
                                className="mx-auto mb-6 w-full max-w-md rounded-sm border-2 border-black object-contain shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                              />
                            ) : null}
                            <div className="px-3 text-center text-3xl font-black leading-tight tracking-tight text-black sm:px-6 sm:text-4xl md:text-5xl">
                              {currentCard.back}
                            </div>
                          </div>
                          <span className="mt-6 text-sm font-bold uppercase tracking-wide text-slate-600 sm:mt-8 sm:text-base">
                            Space, ↑, or ↓ to flip back
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            type="button"
            onClick={goNext}
            disabled={freeUserShuffleLimitReached}
            className="flex-shrink-0 rounded-md border-2 border-white/25 p-3 text-slate-300 hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent sm:p-4"
            aria-label={canNext ? 'Next card' : 'Done'}
          >
            <ChevronRight className="h-8 w-8 sm:h-10 sm:w-10" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
