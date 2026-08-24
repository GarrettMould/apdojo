'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import {
  AP_GOV_REQUIRED_SCOTUS_CASES,
  formatScotusCaseTitle,
  getScotusCaseRecord,
  isScotusPracticeLive,
  type ScotusRequiredCase,
} from '@/data/gov/scotusRequiredCases';
import { scotusEssayPrompts } from '@/data/gov/scotusEssayPrompts';
import { useAuthContext } from '@/contexts/AuthContext';
import { hasGovPremiumAccess } from '@/lib/utils';

const FILTER_UNITS = [1, 2, 3, 4, 5] as const;

export default function ScotusEssayPracticeHubClient() {
  const { user, userData, loadingUserData } = useAuthContext();
  const hasGovPass = hasGovPremiumAccess(userData);
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

  if (loadingUserData) {
    return (
      <main className="min-h-screen bg-white px-4 py-20">
        <div className="mx-auto max-w-xl rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <p className="font-semibold text-gray-600">Checking access...</p>
        </div>
      </main>
    );
  }

  if (!hasGovPass) {
    return (
      <main className="min-h-screen bg-white px-4 py-20">
        <div className="mx-auto max-w-xl rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-black text-gray-900">Unlock SCOTUS Practice</h1>
          <p className="mt-3 text-gray-600">
            SCOTUS comparison drills are included with the AP Gov Season Pass.
          </p>
          <Link
            href="/purchase/season-pass?courseType=gov"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-violet-600 px-5 py-3 font-bold text-white hover:bg-violet-700"
          >
            Get the Season Pass — $29
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white px-4 pb-16 pt-12 sm:px-6 sm:pt-14 lg:px-8 lg:pt-16">
      <div className="mx-auto w-full max-w-3xl">
        <header className="mb-8">
          <p className="text-base font-bold text-violet-700 sm:text-lg">AP Gov</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
            SCOTUS Comparison Practice
          </h1>
          <p className="mt-3 text-base text-gray-600 sm:text-lg">
            All 14 required Supreme Court cases. Open a case to practice the full FRQ workspace with A/B/C
            writing tasks and a comparison case.
          </p>
        </header>

        <div className="mb-5">
          <p className="mb-2.5 text-base font-semibold text-gray-700 sm:text-lg">Filter by unit</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {FILTER_UNITS.map((unit) => {
              const isActive = selectedUnit === unit;
              return (
                <button
                  key={unit}
                  type="button"
                  onClick={() => setSelectedUnit((prev) => (prev === unit ? null : unit))}
                  className={`text-lg font-semibold underline underline-offset-4 transition sm:text-xl ${
                    isActive
                      ? 'text-violet-900 decoration-2'
                      : 'text-violet-700 hover:text-violet-900'
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
            const href = isLive ? `/scotus-essay-practice/${requiredCase.id}` : undefined;
            const isDimmed = selectedUnit != null && !matchesFilter;

            const rowContent = (
              <>
                <span
                  className={`w-9 shrink-0 text-base font-semibold tabular-nums sm:text-lg ${
                    isDimmed ? 'text-gray-300' : 'text-gray-400'
                  }`}
                >
                  {String(originalIndex + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0 flex-1">
                  <p
                    className={`truncate text-lg font-semibold sm:text-xl ${
                      isDimmed ? 'text-gray-400' : 'text-gray-900'
                    }`}
                  >
                    {caseTitle}
                  </p>
                  {prompt?.topic ? (
                    <p
                      className={`mt-0.5 truncate text-base ${
                        isDimmed ? 'text-gray-300' : 'text-violet-700'
                      }`}
                    >
                      {prompt.topic}
                    </p>
                  ) : record?.summary ? (
                    <p
                      className={`mt-0.5 line-clamp-1 text-base ${
                        isDimmed ? 'text-gray-300' : 'text-gray-500'
                      }`}
                    >
                      {record.summary}
                    </p>
                  ) : null}
                </div>
                {isLive ? (
                  <span
                    className={`inline-flex shrink-0 items-center gap-1.5 text-base font-semibold sm:text-lg ${
                      isDimmed ? 'text-gray-300' : 'text-violet-700'
                    }`}
                  >
                    Practice
                    <ArrowRight
                      className={`h-5 w-5 transition ${isDimmed ? '' : 'group-hover:translate-x-0.5'}`}
                    />
                  </span>
                ) : (
                  <span className="shrink-0 text-sm font-semibold uppercase tracking-wide text-gray-300">
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
                    className={`group flex items-center gap-3 py-4 transition sm:gap-4 sm:px-2 ${
                      isDimmed ? 'opacity-50 hover:bg-transparent' : 'hover:bg-violet-50/60'
                    }`}
                  >
                    {rowContent}
                  </Link>
                ) : (
                  <div
                    className={`flex items-center gap-3 py-4 sm:gap-4 sm:px-2 ${
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
    </main>
  );
}
