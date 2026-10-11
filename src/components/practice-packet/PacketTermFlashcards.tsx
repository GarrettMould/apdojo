'use client';

import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { PacketKeyTerm } from '@/lib/practicePacket/types';

type Props = {
  terms: PacketKeyTerm[];
  /** Reset deck when chapter changes */
  resetKey?: string;
};

export function PacketTermFlashcards({ terms, resetKey }: Props) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    setIndex(0);
    setFlipped(false);
  }, [resetKey]);

  if (terms.length === 0) return null;

  const term = terms[Math.min(index, terms.length - 1)];
  const go = (next: number) => {
    setIndex(next);
    setFlipped(false);
  };

  return (
    <section className="space-y-3 print:hidden">
      <div className="flex items-center justify-between gap-2">
        <h4 className="text-sm font-semibold text-stone-800">Key terms</h4>
        <p className="text-xs tabular-nums text-stone-400">
          Card {index + 1} of {terms.length}
        </p>
      </div>

      <div className="[perspective:1200px]">
        <button
          type="button"
          onClick={() => setFlipped((f) => !f)}
          aria-label={flipped ? 'Show term' : 'Show definition'}
          className="relative h-56 w-full cursor-pointer text-left sm:h-64"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div
            className="relative h-full w-full transition-transform duration-500 ease-out"
            style={{
              transformStyle: 'preserve-3d',
              transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            }}
          >
            {/* Front — clean white */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-stone-200/90 bg-white px-6 py-8 shadow-sm ring-1 ring-stone-100"
              style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
            >
              <p className="text-center text-2xl font-semibold leading-snug tracking-tight text-stone-800 sm:text-3xl">
                {term.term}
              </p>
              <p className="mt-4 text-xs text-stone-400">Tap to flip</p>
            </div>
            {/* Back — soft tinted surface, not black */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-stone-200/80 bg-gradient-to-br from-stone-100 via-stone-50 to-zinc-100 px-6 py-8 shadow-sm ring-1 ring-stone-200/60"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
            >
              <p className="text-center text-base leading-relaxed text-stone-700 sm:text-lg">
                {term.definition}
              </p>
              <p className="mt-4 text-xs text-stone-400">Tap to flip back</p>
            </div>
          </div>
        </button>
      </div>

      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          disabled={index === 0}
          onClick={() => go(index - 1)}
          className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm text-stone-600 transition hover:bg-stone-100 disabled:opacity-30"
        >
          <ChevronLeft className="h-4 w-4" />
          Prev
        </button>
        <div className="flex gap-1.5">
          {terms.map((t, i) => (
            <button
              key={t.term}
              type="button"
              aria-label={`Go to ${t.term}`}
              onClick={() => go(i)}
              className={`h-1.5 w-1.5 rounded-full transition ${
                i === index ? 'bg-stone-700' : 'bg-stone-300 hover:bg-stone-400'
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          disabled={index >= terms.length - 1}
          onClick={() => go(index + 1)}
          className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-stone-800 transition hover:bg-stone-100 disabled:opacity-30"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}
