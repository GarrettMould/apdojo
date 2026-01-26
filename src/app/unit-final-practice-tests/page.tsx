'use client';

import React, { useEffect, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { ArrowRight, PlayCircle, Clock } from 'lucide-react';
import { macroUnits as allMacroUnitsData, microUnits as allMicroUnitsData } from '@/data/cheatSheets';
import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/contexts/AuthContext';
import { useSearchParams } from 'next/navigation';
import { getUnitMCQTestUrl, getFullMCQTestUrl, getFullFRQTestUrl, hasValidSeasonPass } from '@/lib/utils';

function UnitFinalPracticeTestsContent() {
  const { selectedSubject, user, userData } = useAuthContext();
  const searchParams = useSearchParams();
  
  // Get subject from query param (from rewrite) or fall back to context
  const subjectParam = searchParams.get('subject');
  const effectiveSubject = (subjectParam === 'macro' || subjectParam === 'micro') 
    ? subjectParam 
    : selectedSubject;
  
  const units = effectiveSubject === 'micro' ? allMicroUnitsData : allMacroUnitsData;
  const isMicro = effectiveSubject === 'micro';
  const subjectName = effectiveSubject === 'macro' ? 'Macroeconomics' : 'Microeconomics';
  
  // Check if user has season pass for this subject
  const hasSeasonPass = useMemo(() => {
    if (!user || !userData) return false;
    return hasValidSeasonPass(userData, effectiveSubject);
  }, [user, userData, effectiveSubject]);
  
  // Define available units for micro (2, 3, 4, and 5)
  const availableMicroUnits = [2, 3, 4, 5];
  const isUnitAvailable = (unitNumber: number) => {
    if (effectiveSubject === 'micro') {
      return availableMicroUnits.includes(unitNumber);
    }
    // All macro units are available
    return true;
  };

  // Add structured data for SEO
  useEffect(() => {
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: `AP ${subjectName} Unit Practice Tests`,
      description: `Full-length practice tests for each unit of AP ${subjectName}`,
      itemListElement: units.map((unit: any, index: number) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Test',
          name: `AP ${subjectName} Unit ${unit.number} Practice Test: ${unit.title}`,
          description: unit.description,
          educationalLevel: 'High School',
          about: {
            '@type': 'Thing',
            name: `AP ${subjectName}`,
          },
        },
      })),
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [units]);

  return (
    <div className="min-h-screen bg-gray-50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
            Full AP {subjectName} <span className={isMicro ? 'text-green-500' : 'text-blue-500'}>Practice Tests</span>
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Test your knowledge with full-length practice exams and unit tests.
          </p>
        </div>

        {/* Full Exams Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8">
            Full Practice <span className={isMicro ? 'text-green-500' : 'text-blue-500'}>Exams</span>
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Full MCQ Exam 1 Card */}
            <div className="group bg-white rounded-xl shadow-lg border border-gray-200 p-8 flex flex-row items-center gap-6">
              <div className="flex-grow">
                <span className={`text-lg font-bold bg-gray-100 py-1 px-3 rounded-lg inline-block ${
                  isMicro ? 'text-green-500' : 'text-blue-500'
                }`}>
                  MCQ Exam
                </span>
                <h2 className="text-2xl font-bold text-gray-900 mt-4">
                  AP {subjectName} Full MCQ Exam 1
                </h2>
                <p className="text-gray-600 mt-2">
                  Comprehensive practice exam covering all units of AP {subjectName} with detailed explanations and progress tracking.
                </p>
              </div>
              <div className="flex flex-col items-end gap-4 min-w-[200px]">
                <Link href={getFullMCQTestUrl(effectiveSubject, 1)} passHref>
                  <Button className={`${isMicro ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'} text-white font-semibold`}>
                    Start Test
                    <PlayCircle className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Full FRQ Exam 1 Card */}
            <div className="group bg-white rounded-xl shadow-lg border border-gray-200 p-8 flex flex-row items-center gap-6">
              <div className="flex-grow">
                <span className={`text-lg font-bold bg-gray-100 py-1 px-3 rounded-lg inline-block ${
                  isMicro ? 'text-green-500' : 'text-blue-500'
                }`}>
                  FRQ Exam
                </span>
                <h2 className="text-2xl font-bold text-gray-900 mt-4">
                  AP {subjectName} Full FRQ Exam 1
                </h2>
                <p className="text-gray-600 mt-2">
                  Full-length free response question exam covering key units of AP {subjectName} with detailed explanations.
                </p>
              </div>
              <div className="flex flex-col items-end gap-4 min-w-[200px]">
                <Link href={getFullFRQTestUrl(effectiveSubject)} passHref>
                  <Button className={`${isMicro ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'} text-white font-semibold`}>
                    Start Test
                    <PlayCircle className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Unit Tests Section */}
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8">
            Unit Practice <span className={isMicro ? 'text-green-500' : 'text-blue-500'}>Tests</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {units.map((unit) => {
              const isAvailable = isUnitAvailable(unit.number);
              
              return (
                <div 
                  key={unit.number}
                  className={`group bg-white rounded-xl shadow-lg border border-gray-200 p-8 flex flex-col h-full ${
                    !isAvailable ? 'opacity-75' : ''
                  }`}
                >
                  
                  <div className="flex-grow">
                    <span className={`text-lg font-bold bg-gray-100 py-1 px-3 rounded-lg ${
                      isMicro ? 'text-green-500' : 'text-blue-500'
                    }`}>
                      Unit {unit.number}
                    </span>
                    <h2 className="text-2xl font-bold text-gray-900 mt-4">
                      {unit.title}
                    </h2>
                    <p className="text-gray-600 mt-2 h-24">
                      {unit.description}
                    </p>
                  </div>
                  <div className="mt-8 flex items-center justify-end">
                    {!isAvailable ? (
                      <Button 
                        disabled
                        className="w-full bg-gray-300 text-gray-600 font-semibold cursor-not-allowed"
                      >
                        <Clock className="w-5 h-5 mr-2" />
                        Coming Soon
                      </Button>
                    ) : (
                      <Link 
                        href={getUnitMCQTestUrl(unit.number, effectiveSubject)}
                        passHref
                        className="w-full"
                      >
                        <Button className={`w-full ${isMicro ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'} text-white font-semibold`}>
                          Start Test
                          <PlayCircle className="w-5 h-5 ml-2" />
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function UnitFinalPracticeTestsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <UnitFinalPracticeTestsContent />
    </Suspense>
  );
}
