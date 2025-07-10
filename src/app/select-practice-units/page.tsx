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
        <div className="flex flex-col items-center justify-center bg-gray-50 py-16 px-2 sm:px-4 lg:px-6">
          <div className="max-w-xl w-full space-y-3 p-3 bg-white rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
            <div className="text-center">
              <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 mb-1">
                Choose Your <span className="text-blue-500">Units</span>
              </h2>
              <p className="text-sm text-gray-600">
                Select the {subject === 'micro' ? 'Microeconomics' : 'Macroeconomics'} units you want to focus on.
              </p>
            </div>

            <div className="space-y-2">
              {displayUnits.map((unit) => {
                  const isSelected = selectedUnits.includes(unit.number);
                  return (
                    <button
                        key={unit.number}
                        onClick={() => handleUnitToggle(unit.number)}
                        className={`w-full flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                          isSelected 
                            ? 'border-blue-500 shadow-md shadow-blue-100/50 bg-blue-50' 
                            : 'border-gray-200 hover:border-blue-500 hover:shadow-md hover:shadow-blue-100/50 bg-white hover:bg-blue-50'
                        }`}
                    >
                        <div className="flex-1 text-left">
                          <span className="block text-xl font-semibold text-gray-900">
                            <span className="text-black">Unit {unit.number}:</span>
                            <span className="text-gray-500 ml-2">{unit.title}</span>
                          </span>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 transition-colors duration-200 ${
                          isSelected 
                            ? 'border-blue-500 bg-blue-500' 
                            : 'border-gray-300 group-hover:border-blue-500'
                        }`}>
                          {isSelected && (
                            <div className="w-full h-full flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                          )}
                        </div>
                    </button>
                  );
              })}
            </div>

            <div className="text-center">
              <button
                onClick={handleStartPractice}
                disabled={selectedUnits.length === 0}
                className={`w-full py-2 px-6 rounded-lg font-semibold text-base transition-all duration-200 ${
                  selectedUnits.length === 0 
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
                }`}
              >
                Start Focused Practice
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