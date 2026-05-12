'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import {
  macroUnits as allMacroCheatSheets,
  microUnits as allMicroCheatSheets,
  govUnits as allGovCheatSheets,
  Unit as UnitDetailsType,
} from '@/data/cheatSheets';
import { useAuthContext } from '@/contexts/AuthContext';
import { getBeltProgress } from '@/lib/beltSystem';
import { getSubjectXP } from '@/hooks/useUserProgress';
import { getSubjectSlug, getUnitSlug } from '@/lib/practiceSlugs';
import type { CourseSubject } from '@/lib/courseSubject';
import { isCourseSubject } from '@/lib/courseSubject';
import Image from 'next/image';

function isGovPracticeUnitAvailable(unitNumber: number): boolean {
  return unitNumber === 1;
}

function SelectPracticeUnitsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    lastSelectedPracticeUnits,
    setLastSelectedPracticeUnits,
    selectedSubject,
    setSelectedSubject,
    user,
    userData,
    guestXp,
  } = useAuthContext();

  const subjectParam = searchParams.get('subject');
  useEffect(() => {
    if (subjectParam && isCourseSubject(subjectParam) && subjectParam !== selectedSubject) {
      setSelectedSubject(subjectParam);
    }
  }, [subjectParam, selectedSubject, setSelectedSubject]);

  const subject = selectedSubject;

  const userXP = user ? getSubjectXP(userData, subject) : (guestXp ?? 0);

  const beltProgress = getBeltProgress(userXP);
  const currentBelt = beltProgress.currentBelt;

  const getBeltImage = () => {
    if (currentBelt.name === 'White Belt') {
      return '/images/beltNewWhite.svg';
    } else if (currentBelt.name === 'Yellow Belt') {
      return '/images/beltNewYellow.svg';
    } else if (currentBelt.name === 'Green Belt') {
      return '/images/beltNewGreen.svg';
    } else if (currentBelt.name === 'Purple Belt') {
      return '/images/beltNewPurple.svg';
    } else if (currentBelt.name === 'Black Belt') {
      return '/images/beltNewBlack.svg';
    } else {
      return '/images/beltNewWhite.svg';
    }
  };

  const [selectedUnits, setSelectedUnits] = useState<number[]>([]);
  const [unitsData, setUnitsData] = useState<UnitDetailsType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Removed the overflow hidden effect that was preventing scrolling
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const data =
      subject === 'gov'
        ? allGovCheatSheets
        : subject === 'micro'
          ? allMicroCheatSheets
          : allMacroCheatSheets;
    setUnitsData(subject === 'gov' ? data : data.slice(0, 6));

    const currentUnitsParam = searchParams.get('currentUnits');
    let initialSelected: number[] = [];

    if (currentUnitsParam) {
      try {
        initialSelected = currentUnitsParam
          .split(',')
          .map(Number)
          .filter((id) => !isNaN(id) && id > 0);
        if (subject === 'gov') {
          initialSelected = initialSelected.filter(isGovPracticeUnitAvailable);
        }
        console.log('[Select Practice Units] Initialized selected units from URL:', initialSelected);
      } catch (error) {
        console.error("[Select Practice Units] Error parsing 'currentUnits' URL param:", error);
      }
    } else if (lastSelectedPracticeUnits && lastSelectedPracticeUnits[subject]) {
      initialSelected = [...(lastSelectedPracticeUnits[subject] ?? [])];
      if (subject === 'gov') {
        initialSelected = initialSelected.filter(isGovPracticeUnitAvailable);
      }
      console.log('[Select Practice Units] Initialized selected units from context:', initialSelected);
    } else {
      console.log('[Select Practice Units] Initialized selected units empty (no param/context).');
    }

    setSelectedUnits(initialSelected);
    setIsLoading(false);
  }, [subject, searchParams, lastSelectedPracticeUnits]);

  const handleUnitToggle = (unitNumber: number) => {
    if (subject === 'gov' && !isGovPracticeUnitAvailable(unitNumber)) return;
    setSelectedUnits((prevSelected) =>
      prevSelected.includes(unitNumber)
        ? prevSelected.filter((num) => num !== unitNumber)
        : [...prevSelected, unitNumber]
    );
  };

  const handleStartPractice = () => {
    if (selectedUnits.length > 0 && subject) {
      setLastSelectedPracticeUnits(subject as CourseSubject, selectedUnits);

      if (selectedUnits.length === 1) {
        const subjectSlug = getSubjectSlug(subject);
        const unitSlug = getUnitSlug(selectedUnits[0], subject);
        router.push(`/mcq-practice/${subjectSlug}/${unitSlug}`);
      } else {
        const unitsQueryParam = selectedUnits.join(',');
        router.push(`/unitMCQPracticePage?subject=${subject}&mode=custom&units=${unitsQueryParam}`);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2
          className={`h-8 w-8 animate-spin ${
            subject === 'gov' ? 'text-violet-600' : subject === 'micro' ? 'text-green-500' : 'text-blue-500'
          }`}
        />
      </div>
    );
  }

  const displayUnits = subject === 'gov' ? unitsData : unitsData.slice(0, 6);
  const isMicro = subject === 'micro';
  const isGov = subject === 'gov';
  const themeColor = isGov ? 'violet' : isMicro ? 'green' : 'blue';

  const selectedRing =
    themeColor === 'violet'
      ? 'border-violet-500 shadow-md shadow-violet-100/50 bg-gradient-to-br from-violet-50 to-violet-100'
      : themeColor === 'green'
        ? 'border-green-500 shadow-md shadow-green-100/50 bg-gradient-to-br from-green-50 to-green-100'
        : 'border-blue-500 shadow-md shadow-blue-100/50 bg-gradient-to-br from-blue-50 to-blue-100';
  const idleRing =
    themeColor === 'violet'
      ? 'border-gray-200 hover:border-violet-400 hover:shadow-md hover:shadow-violet-100/30 bg-white hover:bg-violet-50'
      : themeColor === 'green'
        ? 'border-gray-200 hover:border-green-400 hover:shadow-md hover:shadow-green-100/30 bg-white hover:bg-green-50'
        : 'border-gray-200 hover:border-blue-400 hover:shadow-md hover:shadow-blue-100/30 bg-white hover:bg-blue-50';
  const numColor =
    themeColor === 'violet' ? 'text-violet-600' : themeColor === 'green' ? 'text-green-500' : 'text-blue-500';
  const dotSelected =
    themeColor === 'violet'
      ? 'border-violet-500 bg-violet-500'
      : themeColor === 'green'
        ? 'border-green-500 bg-green-500'
        : 'border-blue-500 bg-blue-500';
  const dotIdle =
    themeColor === 'violet'
      ? 'border-gray-300 group-hover:border-violet-400'
      : themeColor === 'green'
        ? 'border-gray-300 group-hover:border-green-400'
        : 'border-gray-300 group-hover:border-blue-400';
  const startEnabled =
    themeColor === 'violet'
      ? 'bg-violet-600 hover:bg-violet-700 text-white shadow-md hover:shadow-lg hover:shadow-violet-500/25'
      : themeColor === 'green'
        ? 'bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg hover:shadow-green-500/25'
        : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg hover:shadow-blue-500/25';

  return (
    <div className="min-h-screen bg-gray-50 py-2 px-4 sm:px-6 lg:px-8 flex flex-col justify-center overflow-hidden">
      <div className="max-w-3xl mx-auto w-full">
        <div className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-xl p-6 sm:p-8">
          <div className="flex justify-between items-center mb-6">
            <div className="h-8 flex items-center justify-center">
              <Image src={getBeltImage()} alt={currentBelt.name} width={32} height={32} className="h-8 w-auto" />
            </div>

            <div className="flex-1 text-center">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                Choose Your{' '}
                <span
                  className={
                    themeColor === 'violet' ? 'text-violet-600' : themeColor === 'green' ? 'text-green-500' : 'text-blue-500'
                  }
                >
                  Units
                </span>
              </h1>
            </div>

            <div className="font-black text-xl flex items-center gap-2">
              <span>{userXP}</span>
              <span className="inline-flex items-center">
                <Image src="/images/flame100.png" alt="XP Flame" width={24} height={24} className="w-6 h-6" />
              </span>
            </div>
          </div>

          {isGov ? (
            <p className="mb-4 rounded-lg border border-violet-200 bg-violet-50 px-3 py-2 text-sm font-semibold text-violet-900">
              Unit 1 MCQ practice is live. More units are coming soon—other units are shown but not selectable yet.
            </p>
          ) : null}

          <div className="space-y-2 mb-6">
            {displayUnits.map((unit) => {
              const isAvailable = subject !== 'gov' || isGovPracticeUnitAvailable(unit.number);
              const isSelected = selectedUnits.includes(unit.number);
              return (
                <button
                  key={unit.number}
                  type="button"
                  disabled={!isAvailable}
                  onClick={() => (isAvailable ? handleUnitToggle(unit.number) : undefined)}
                  className={`group relative w-full p-3 border-2 rounded-lg transition-all duration-300 text-left ${
                    !isAvailable
                      ? 'cursor-not-allowed border-gray-100 bg-gray-50 opacity-60'
                      : isSelected
                        ? selectedRing
                        : idleRing
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 flex items-center gap-2">
                      <div className={`text-3xl font-bold ${isAvailable ? numColor : 'text-gray-400'}`}>
                        {unit.number}
                        <span className="text-black">.</span>
                      </div>
                      <div className="min-w-0">
                        <h3 className={`text-sm font-semibold leading-tight ${isAvailable ? 'text-gray-800' : 'text-gray-500'}`}>
                          {unit.title}
                        </h3>
                        {!isAvailable ? (
                          <p className="mt-1 text-xs font-bold uppercase tracking-wide text-gray-400">Coming soon</p>
                        ) : null}
                      </div>
                    </div>

                    <div
                      className={`ml-4 w-4 h-4 rounded-full border-2 transition-all duration-200 flex items-center justify-center ${
                        isSelected ? dotSelected : isAvailable ? dotIdle : 'border-gray-200 bg-gray-100'
                      }`}
                    >
                      {isSelected && isAvailable && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="w-full">
            <button
              type="button"
              onClick={handleStartPractice}
              disabled={selectedUnits.length === 0}
              className={`w-full px-6 py-4 rounded-lg font-bold text-lg transition-all duration-300 ${
                selectedUnits.length === 0 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : startEnabled
              }`}
            >
              Start Practice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SelectPracticeUnitsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        </div>
      }
    >
      <SelectPracticeUnitsContent />
    </Suspense>
  );
}
