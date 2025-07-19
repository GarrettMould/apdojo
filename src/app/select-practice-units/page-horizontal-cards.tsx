'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowLeft } from 'lucide-react';
import { macroUnits as allMacroCheatSheets, microUnits as allMicroCheatSheets, Unit as UnitDetailsType } from '@/data/cheatSheets';
import { useAuthContext } from '@/contexts/AuthContext';

function SelectPracticeUnitsContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { lastSelectedPracticeUnits, setLastSelectedPracticeUnits } = useAuthContext();
    const { user } = useAuthContext();
    
    // Get subject from URL params (only for logged-in users)
    const getEffectiveSubject = () => {
        const urlSubject = searchParams.get('subject');
        if (urlSubject) return urlSubject;
        return null;
    };

    const subject = getEffectiveSubject();

    const [selectedUnits, setSelectedUnits] = useState<number[]>([]);
    const [unitsData, setUnitsData] = useState<UnitDetailsType[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, []);

    useEffect(() => {
        if (!subject) return; // Early return if no subject
        
        setIsLoading(true);
        const data = (subject === 'micro' ? allMicroCheatSheets : allMacroCheatSheets).slice(0, 6);
        setUnitsData(data);

        const currentUnitsParam = searchParams.get('currentUnits');
        let initialSelected: number[] = [];

        if (currentUnitsParam) {
            try {
                 initialSelected = currentUnitsParam
                    .split(',')
                    .map(Number)
                    .filter(id => !isNaN(id) && id > 0);
                console.log('[Select Practice Units] Initialized selected units from URL:', initialSelected);
            } catch (error) {
                 console.error("[Select Practice Units] Error parsing 'currentUnits' URL param:", error);
            }
        } else if (lastSelectedPracticeUnits && lastSelectedPracticeUnits[subject as 'macro' | 'micro']) {
            initialSelected = lastSelectedPracticeUnits[subject as 'macro' | 'micro'];
            console.log('[Select Practice Units] Initialized selected units from context:', initialSelected);
        } else {
             console.log('[Select Practice Units] Initialized selected units empty (no param/context).');
        }
        
        setSelectedUnits(initialSelected);
        setIsLoading(false);
    }, [subject, searchParams, lastSelectedPracticeUnits]);

    const handleUnitToggle = (unitNumber: number) => {
        setSelectedUnits(prevSelected =>
            prevSelected.includes(unitNumber)
                ? prevSelected.filter(num => num !== unitNumber)
                : [...prevSelected, unitNumber]
        );
    };

    const handleStartPractice = () => {
        if (selectedUnits.length > 0 && subject) {
            setLastSelectedPracticeUnits(subject as 'macro' | 'micro', selectedUnits);
            
            const unitsQueryParam = selectedUnits.join(',');
            router.push(`/unitMCQPracticePage?subject=${subject}&mode=custom&units=${unitsQueryParam}`);
        }
    };

    // Show loading if no subject available
    if (!subject) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500"/>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500"/>
            </div>
        );
    }

    const displayUnits = unitsData.slice(0, 6);

    return (
        <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-4">
                Choose Your <span className="text-blue-500">Units</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Select the {subject === 'micro' ? 'Microeconomics' : 'Macroeconomics'} units you want to focus on.
              </p>
            </div>

            {/* Unit Cards Grid */}
            <div className="flex flex-row gap-4 overflow-x-auto pb-4 mb-12">
              {displayUnits.map((unit) => {
                  const isSelected = selectedUnits.includes(unit.number);
                  return (
                    <div
                        key={unit.number}
                        onClick={() => handleUnitToggle(unit.number)}
                        className={`relative cursor-pointer transition-all duration-300 transform hover:scale-105 flex-shrink-0 ${
                          isSelected 
                            ? 'ring-4 ring-blue-500 ring-opacity-50' 
                            : 'hover:ring-2 hover:ring-blue-300 hover:ring-opacity-50'
                        }`}
                    >
                        <div className={`w-48 h-80 bg-white rounded-xl shadow-lg border-2 transition-all duration-300 p-4 flex flex-col justify-between ${
                          isSelected 
                            ? 'border-blue-500 bg-blue-50 shadow-blue-100' 
                            : 'border-gray-200 hover:border-blue-300 hover:shadow-xl'
                        }`}>
                            {/* Unit Number Badge */}
                            <div className="flex justify-between items-start">
                                <div className={`px-2 py-1 rounded-full text-xs font-bold ${
                                  isSelected 
                                    ? 'bg-blue-500 text-white' 
                                    : 'bg-gray-100 text-gray-700'
                                }`}>
                                    Unit {unit.number}
                                </div>
                                
                                {/* Selection Indicator */}
                                <div className={`w-5 h-5 rounded-full border-2 transition-colors duration-200 flex items-center justify-center ${
                                  isSelected 
                                    ? 'border-blue-500 bg-blue-500' 
                                    : 'border-gray-300'
                                }`}>
                                  {isSelected && (
                                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                                  )}
                                </div>
                            </div>

                            {/* Unit Title */}
                            <div className="flex-1 flex items-center justify-center text-center px-2">
                                <h3 className={`text-sm font-bold leading-tight ${
                                  isSelected 
                                    ? 'text-blue-900' 
                                    : 'text-gray-900'
                                }`}>
                                    {unit.title}
                                </h3>
                            </div>

                            {/* Bottom Section */}
                            <div className="text-center">
                                <div className={`text-xs font-medium ${
                                  isSelected 
                                    ? 'text-blue-700' 
                                    : 'text-gray-500'
                                }`}>
                                    {isSelected ? 'Selected' : 'Click to select'}
                                </div>
                            </div>
                        </div>
                    </div>
                  );
              })}
            </div>

            {/* Start Practice Button */}
            <div className="text-center">
              <button
                onClick={handleStartPractice}
                disabled={selectedUnits.length === 0}
                className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 ${
                  selectedUnits.length === 0 
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                }`}
              >
                Start Focused Practice
                {selectedUnits.length > 0 && (
                  <span className="ml-2 text-sm opacity-90">
                    ({selectedUnits.length} unit{selectedUnits.length !== 1 ? 's' : ''} selected)
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
    );
}

export default function SelectPracticeUnitsPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500"/>
            </div>
        }>
            <SelectPracticeUnitsContent />
        </Suspense>
    );
} 