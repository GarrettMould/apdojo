'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { macroUnits as allMacroUnitsData } from '@/data/cheatSheets';
import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/contexts/AuthContext'; // Import auth context

export default function UnitFinalPracticeTestsPage() {
  const units = allMacroUnitsData;
  const { user, userData } = useAuthContext(); // Get user and userData
  const purchasedTests = userData?.purchasedTests || []; // Get purchased tests, default to empty array

  return (
    <div className="min-h-screen bg-gray-50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
            Unit Practice Tests
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Test your knowledge with a full-length practice test for each unit.
          </p>
        </div>

        {/* Units Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {units.map((unit) => {
            const hasPurchased = user && purchasedTests.includes(unit.number.toString());

            return (
              <div 
                key={unit.number}
                className="group bg-white rounded-xl shadow-lg border border-gray-200 p-8 flex flex-col h-full"
              >
                <div className="flex-grow">
                  <span className="text-lg font-bold text-blue-500 bg-gray-100 py-1 px-3 rounded-lg">
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
                  {!hasPurchased && (
                    <span className="text-2xl font-bold text-gray-900">${unit.price.toFixed(2)}</span>
                  )}
                  {hasPurchased ? (
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
  );
}
