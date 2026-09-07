'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, X } from 'lucide-react';
import {
  AP_GOV_REQUIRED_SCOTUS_CASES,
  formatScotusCaseTitle,
  getScotusCaseRecord,
  isScotusPracticeLive,
  scotusPracticeCasePath,
  type ScotusRequiredCase,
} from '@/data/gov/scotusRequiredCases';
import { scotusEssayPrompts } from '@/data/gov/scotusEssayPrompts';

const FILTER_UNITS = [1, 2, 3, 4, 5] as const;

type ScotusCaseListPanelProps = {
  /** Highlight the active case in the list. */
  currentCaseId?: string;
  /** Called after the user picks a case (e.g. close overlay). */
  onNavigate?: () => void;
  className?: string;
};

export function ScotusCaseListPanel({
  currentCaseId,
  onNavigate,
  className = '',
}: ScotusCaseListPanelProps) {
  const [selectedUnit, setSelectedUnit] = useState<number | null>(null);

  const orderedCases = useMemo(() => {
    if (selectedUnit == null) {
      return AP_GOV_REQUIRED_SCOTUS_CASES.map((requiredCase, index) => ({
        requiredCase,
        originalIndex: index,
        matchesFilter: true,
      }));
    }

    const matching: { requiredCase: ScotusRequiredCase; originalIndex: number; matchesFilter: boolean }[] =
      [];
    const others: { requiredCase: ScotusRequiredCase; originalIndex: number; matchesFilter: boolean }[] =
      [];

    AP_GOV_REQUIRED_SCOTUS_CASES.forEach((requiredCase, index) => {
      const entry = {
        requiredCase,
        originalIndex: index,
        matchesFilter: requiredCase.unit === selectedUnit,
      };
      if (entry.matchesFilter) matching.push(entry);
      else others.push(entry);
    });

    return [...matching, ...others];
  }, [selectedUnit]);

  return (
    <div className={className}>
      <div className="mb-4">
        <p className="mb-2 text-sm font-semibold text-gray-700">Filter by unit</p>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          {FILTER_UNITS.map((unit) => {
            const isActive = selectedUnit === unit;
            return (
              <button
                key={unit}
                type="button"
                onClick={() => setSelectedUnit((prev) => (prev === unit ? null : unit))}
                className={`text-sm font-semibold underline underline-offset-4 transition ${
                  isActive ? 'text-violet-900 decoration-2' : 'text-violet-700 hover:text-violet-900'
                }`}
              >
                Unit {unit}
              </button>
            );
          })}
        </div>
      </div>

      <ul className="divide-y divide-gray-200 border-y border-gray-200">
        {orderedCases.map(({ requiredCase, originalIndex, matchesFilter }) => {
          const prompt = scotusEssayPrompts.find((item) => item.id === requiredCase.id);
          const record = getScotusCaseRecord(requiredCase);
          const isLive = isScotusPracticeLive(requiredCase.id);
          const caseTitle = formatScotusCaseTitle(requiredCase);
          const href = isLive ? scotusPracticeCasePath(requiredCase.id) : undefined;
          const isDimmed = selectedUnit != null && !matchesFilter;
          const isCurrent = currentCaseId === requiredCase.id;

          const rowContent = (
            <>
              <span
                className={`w-8 shrink-0 text-sm font-semibold tabular-nums ${
                  isDimmed ? 'text-gray-300' : 'text-gray-400'
                }`}
              >
                {String(originalIndex + 1).padStart(2, '0')}
              </span>
              <div className="min-w-0 flex-1">
                <p
                  className={`truncate text-base font-semibold ${
                    isDimmed ? 'text-gray-400' : isCurrent ? 'text-violet-800' : 'text-gray-900'
                  }`}
                >
                  {caseTitle}
                </p>
                {prompt?.topic ? (
                  <p
                    className={`mt-0.5 truncate text-sm ${
                      isDimmed ? 'text-gray-300' : 'text-violet-700'
                    }`}
                  >
                    {prompt.topic}
                  </p>
                ) : record?.summary ? (
                  <p
                    className={`mt-0.5 line-clamp-1 text-sm ${
                      isDimmed ? 'text-gray-300' : 'text-gray-500'
                    }`}
                  >
                    {record.summary}
                  </p>
                ) : null}
              </div>
              {isLive ? (
                <span
                  className={`inline-flex shrink-0 items-center gap-1 text-sm font-semibold ${
                    isDimmed ? 'text-gray-300' : 'text-violet-700'
                  }`}
                >
                  {isCurrent ? 'Current' : 'Open'}
                  {!isCurrent ? (
                    <ArrowRight className={`h-4 w-4 ${isDimmed ? '' : 'group-hover:translate-x-0.5'}`} />
                  ) : null}
                </span>
              ) : (
                <span className="shrink-0 text-xs font-semibold uppercase tracking-wide text-gray-300">
                  Soon
                </span>
              )}
            </>
          );

          return (
            <li key={requiredCase.id}>
              {isLive && href ? (
                <Link
                  href={href}
                  onClick={onNavigate}
                  className={`group flex items-center gap-3 py-3.5 transition sm:gap-4 sm:px-1 ${
                    isDimmed
                      ? 'opacity-50 hover:bg-transparent'
                      : isCurrent
                        ? 'bg-violet-50/80'
                        : 'hover:bg-violet-50/60'
                  }`}
                >
                  {rowContent}
                </Link>
              ) : (
                <div
                  className={`flex items-center gap-3 py-3.5 sm:gap-4 sm:px-1 ${
                    isDimmed ? 'opacity-40' : 'opacity-60'
                  }`}
                >
                  {rowContent}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

type ScotusCaseListOverlayProps = {
  open: boolean;
  onClose: () => void;
  currentCaseId?: string;
};

export function ScotusCaseListOverlay({ open, onClose, currentCaseId }: ScotusCaseListOverlayProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[10050] flex justify-end">
      <button
        type="button"
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        aria-label="Close case list"
        onClick={onClose}
      />
      <div className="relative flex h-full w-full max-w-md flex-col border-l-4 border-black bg-white shadow-[-8px_0_0_0_rgba(0,0,0,0.08)]">
        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-gray-200 px-4 py-4 sm:px-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-violet-700">AP Gov</p>
            <h2 className="mt-1 text-xl font-black text-gray-900">All SCOTUS Cases</h2>
            <p className="mt-1 text-sm text-gray-600">14 required Supreme Court cases</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-black bg-white text-gray-900 shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:bg-gray-50"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-5">
          <ScotusCaseListPanel currentCaseId={currentCaseId} onNavigate={onClose} />
        </div>
      </div>
    </div>
  );
}
