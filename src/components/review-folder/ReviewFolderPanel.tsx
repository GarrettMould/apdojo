'use client';

import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Folder, Loader2, Swords, X } from 'lucide-react';
import type { ReviewLessonGroup } from '@/lib/reviewFolder/types';

type Props = {
  open: boolean;
  onClose: () => void;
  unitNumber: number;
  /** Override display label (e.g. "Units 2, 3" for custom practice). */
  unitLabel?: string;
  groups: ReviewLessonGroup[];
  totalCount: number;
  onRemoveMiss: (questionId: number) => void;
  onClearAll: () => void;
  onPracticeMissed: (unitNumbers: number[]) => void;
  onOpenPracticePacket: (unitNumbers: number[]) => void;
  isBuildingPacket?: boolean;
};

function unitsFromGroups(groups: ReviewLessonGroup[]): number[] {
  const set = new Set<number>();
  for (const group of groups) {
    for (const miss of group.misses) {
      if (typeof miss.unitNumber === 'number' && miss.unitNumber > 0) {
        set.add(miss.unitNumber);
      }
    }
  }
  return [...set].sort((a, b) => a - b);
}

export function ReviewFolderPanel({
  open,
  onClose,
  unitNumber,
  unitLabel,
  groups,
  totalCount,
  onClearAll,
  onPracticeMissed,
  onOpenPracticePacket,
  isBuildingPacket = false,
}: Props) {
  const [mounted, setMounted] = useState(false);
  const [selectedUnits, setSelectedUnits] = useState<number[]>([]);

  const unitsInFolder = useMemo(() => unitsFromGroups(groups), [groups]);
  const showUnitPicker = unitsInFolder.length > 1;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    setSelectedUnits(unitsInFolder.length > 0 ? unitsInFolder : [unitNumber]);
  }, [open, unitsInFolder, unitNumber]);

  if (!mounted) return null;

  const lessonCount = groups.length;
  const scopeLabel = unitLabel ?? `Unit ${unitNumber}`;
  const selectedSet = new Set(selectedUnits);
  const canAct = selectedUnits.length > 0;

  const toggleUnit = (n: number) => {
    setSelectedUnits((prev) => {
      if (prev.includes(n)) {
        if (prev.length <= 1) return prev;
        return prev.filter((u) => u !== n);
      }
      return [...prev, n].sort((a, b) => a - b);
    });
  };

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[200] flex items-end justify-center bg-stone-900/40 p-0 sm:items-center sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Rematch"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.22 }}
            className="relative flex w-full max-w-lg flex-col overflow-hidden rounded-t-2xl border-2 border-black bg-white shadow-[8px_8px_0_0_#000] sm:rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="relative border-b-2 border-black bg-stone-50 px-5 pb-5 pt-5 sm:px-6 sm:pt-6">
              <button
                type="button"
                onClick={onClose}
                className="absolute right-3 top-3 rounded-md p-2 text-stone-500 transition hover:bg-white hover:text-black sm:right-4 sm:top-4"
                aria-label="Close Rematch"
              >
                <X className="h-4 w-4" strokeWidth={2.5} />
              </button>

              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-stone-500">
                <Swords className="h-3.5 w-3.5 text-black" strokeWidth={2.5} />
                AP Dojo
              </div>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-black sm:text-4xl">
                Rematch
              </h2>
              <p className="mt-2 max-w-sm text-base leading-snug text-stone-600">
                {totalCount === 0
                  ? `Misses from ${scopeLabel} land here automatically — then we build your comeback packet.`
                  : `${totalCount} miss${totalCount === 1 ? '' : 'es'} · ${lessonCount} lesson${lessonCount === 1 ? '' : 's'} · ${scopeLabel}`}
              </p>
            </header>

            <div className="px-5 py-5 sm:px-6 sm:py-6">
              {totalCount === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-xl border-2 border-black bg-stone-50 px-6 py-14 text-center">
                  <Folder
                    className="h-14 w-14 text-black"
                    strokeWidth={2.75}
                    absoluteStrokeWidth
                  />
                  <p className="mt-5 max-w-[18rem] text-lg font-semibold leading-snug text-black">
                    Nothing saved yet.
                  </p>
                  <p className="mt-2 max-w-[18rem] text-sm leading-snug text-stone-600">
                    Wrong answers from practice fill this folder, then Rematch turns them into Learn → Replay → Reflect.
                  </p>
                </div>
              ) : (
                <div className="space-y-5">
                  <div className="flex aspect-[16/9] w-full items-center justify-center rounded-xl border-2 border-black bg-stone-100">
                    <p className="text-sm font-semibold text-stone-500">
                      Visual coming soon
                    </p>
                  </div>

                  {showUnitPicker ? (
                    <fieldset>
                      <legend className="mb-3 text-sm font-bold uppercase tracking-wide text-black">
                        Include units
                      </legend>
                      <div className="flex flex-wrap gap-x-5 gap-y-2.5">
                        {unitsInFolder.map((n) => {
                          const checked = selectedSet.has(n);
                          return (
                            <label
                              key={n}
                              className="inline-flex cursor-pointer items-center gap-2.5 text-base font-semibold text-black"
                            >
                              <input
                                type="checkbox"
                                className="sr-only"
                                checked={checked}
                                onChange={() => toggleUnit(n)}
                              />
                              <span
                                className="flex h-6 w-6 items-center justify-center border-2 border-black bg-white text-sm leading-none text-black"
                                aria-hidden
                              >
                                {checked ? '✓' : null}
                              </span>
                              Unit {n}
                            </label>
                          );
                        })}
                      </div>
                    </fieldset>
                  ) : null}
                </div>
              )}
            </div>

            {totalCount > 0 ? (
              <footer className="space-y-2 border-t-2 border-black bg-stone-50 px-5 py-4 sm:px-6">
                <button
                  type="button"
                  onClick={() => onOpenPracticePacket(selectedUnits)}
                  disabled={isBuildingPacket || !canAct}
                  className="flex w-full items-center justify-center gap-2 rounded-md border-2 border-black bg-black px-5 py-3.5 text-base font-bold text-white transition hover:bg-stone-800 disabled:opacity-60"
                >
                  {isBuildingPacket ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Building Rematch…
                    </>
                  ) : (
                    <>
                      <Swords className="h-4 w-4" strokeWidth={2.5} />
                      Start Rematch
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => onPracticeMissed(selectedUnits)}
                  disabled={isBuildingPacket || !canAct}
                  className="w-full rounded-md border-2 border-black bg-white px-5 py-3.5 text-base font-bold text-black transition hover:bg-stone-100 disabled:opacity-60"
                >
                  Practice missed questions only
                </button>
                <button
                  type="button"
                  onClick={onClearAll}
                  className="w-full py-1.5 text-center text-xs font-medium text-stone-400 transition hover:text-stone-700"
                >
                  Clear folder
                </button>
              </footer>
            ) : null}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body
  );
}
