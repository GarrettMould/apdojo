'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { macroUnits as allMacroUnitsData, microUnits as allMicroUnitsData } from '@/data/cheatSheets';
import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/contexts/AuthContext';

export default function UnitFinalPracticeTestsPage() {
  const { user, userData, selectedSubject } = useAuthContext();
  const purchasedTests = userData?.purchasedTests || [];
  const units = selectedSubject === 'micro' ? allMicroUnitsData : allMacroUnitsData;
  const isMicro = selectedSubject === 'micro';
  const subjectName = selectedSubject === 'macro' ? 'Macroeconomics' : 'Microeconomics';

  // Add structured data for SEO
  useEffect(() => {
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: `AP ${subjectName} Unit Practice Tests`,
      description: `Full-length practice tests for each unit of AP ${subjectName}`,
      itemListElement: units.map((unit, index) => ({
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
                {(() => {
                  if (isMicro) {
                    return (
                      <Button disabled className="bg-gray-400 text-white font-semibold cursor-not-allowed">
                        Coming Soon
                      </Button>
                    );
                  }
                  const hasPurchased = user && userData?.purchases?.includes('macro-mcq-1');
                  return (
                    <>
                      {!hasPurchased && (
                        <span className="text-2xl font-bold text-gray-900">$30.00</span>
                      )}
                      {hasPurchased ? (
                        <Link 
                          href="/preview/macro/mcq/1"
                          passHref
                        >
                          <Button className="bg-green-500 hover:bg-green-600 text-white font-semibold">
                            Start Test
                            <PlayCircle className="w-5 h-5 ml-2" />
                          </Button>
                        </Link>
                      ) : (
                        <Link 
                          href="/purchase/full-exam?examType=macro&questionType=mcq&examNumber=1&total=30.00"
                          passHref
                        >
                          <Button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold">
                            Purchase Test
                            <ArrowRight className="w-5 h-5 ml-2" />
                          </Button>
                        </Link>
                      )}
                    </>
                  );
                })()}
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
                {(() => {
                  if (isMicro) {
                    return (
                      <Button disabled className="bg-gray-400 text-white font-semibold cursor-not-allowed">
                        Coming Soon
                      </Button>
                    );
                  }
                  const hasPurchased = user && userData?.purchases?.includes('macro-frq-1');
                  return (
                    <>
                      {!hasPurchased && (
                        <span className="text-2xl font-bold text-gray-900">$20.00</span>
                      )}
                      {hasPurchased ? (
                        <Link 
                          href="/preview/macro/frq/1"
                          passHref
                        >
                          <Button className="bg-green-500 hover:bg-green-600 text-white font-semibold">
                            Start Test
                            <PlayCircle className="w-5 h-5 ml-2" />
                          </Button>
                        </Link>
                      ) : (
                        <Link 
                          href="/purchase/full-exam?examType=macro&questionType=frq&examNumber=1&total=20.00"
                          passHref
                        >
                          <Button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold">
                            Purchase Test
                            <ArrowRight className="w-5 h-5 ml-2" />
                          </Button>
                        </Link>
                      )}
                    </>
                  );
                })()}
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
              const hasPurchased = user && purchasedTests.includes(unit.number.toString());
              const isDisabled = isMicro; // Disable all Micro tests

              return (
                <div 
                  key={unit.number}
                  className="group bg-white rounded-xl shadow-lg border border-gray-200 p-8 flex flex-col h-full"
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
                  <div className="mt-8 flex items-center justify-between">
                    {!hasPurchased && !isDisabled && (
                      <span className="text-2xl font-bold text-gray-900">${unit.price.toFixed(2)}</span>
                    )}
                    {isDisabled ? (
                      <Button 
                        disabled
                        className="bg-gray-400 text-white font-semibold cursor-not-allowed"
                      >
                        Coming Soon
                      </Button>
                    ) : hasPurchased ? (
                      <Link 
                        href={`/unit-mcq-test/${unit.number}`}
                        passHref
                        className="w-full"
                      >
                        <Button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold">
                          Start Test
                          <PlayCircle className="w-5 h-5 ml-2" />
                        </Button>
                      </Link>
                    ) : (
                      <Link 
                        href={`/purchase/mcq-practice?units=${unit.number}&total=${unit.price.toFixed(2)}&bundle=false`}
                        passHref
                      >
                        <Button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold">
                          Purchase Test
                          <ArrowRight className="w-5 h-5 ml-2" />
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
