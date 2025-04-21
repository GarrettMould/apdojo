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
    const subject = searchParams.get('subject') || 'macro';

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
        } else if (lastSelectedPracticeUnits && lastSelectedPracticeUnits[subject]) {
            initialSelected = lastSelectedPracticeUnits[subject];
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
        if (selectedUnits.length > 0) {
            setLastSelectedPracticeUnits(subject as 'macro' | 'micro', selectedUnits);
            
            const unitsQueryParam = selectedUnits.join(',');
            router.push(`/unitMCQPracticePage?subject=${subject}&mode=custom&units=${unitsQueryParam}`);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500"/>
            </div>
        );
    }

    const displayUnits = unitsData.slice(0, 6);

    return (
        <div className="min-h-screen flex flex-col items-center justify-start pt-16 sm:pt-20 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-xl mx-auto">
                <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">Choose Units to Practice</h1>
                <p className="text-center text-sm text-gray-600 mb-6">Select the {subject === 'micro' ? 'Microeconomics' : 'Macroeconomics'} units you want to focus on.</p>

                <div className="flex flex-col mb-6 border-2 border-gray-300 rounded-lg overflow-hidden">
                    {displayUnits.map((unit, index) => {
                        const isSelected = selectedUnits.includes(unit.number);
                        const isFirst = index === 0;
                        const isLast = index === displayUnits.length - 1;

                        return (
                            <label
                                key={unit.number}
                                className={`w-full p-4 transition-colors duration-150 flex items-center justify-between cursor-pointer ${!isLast ? 'border-b border-gray-200' : ''} 
                                   ${isSelected 
                                       ? 'bg-blue-50 z-10'
                                       : 'bg-white hover:bg-gray-50'}`}
                            >
                                <span className={`font-medium text-base ${isSelected ? 'text-blue-700' : 'text-gray-800'}`}>
                                    Unit {unit.number}: {unit.title} 
                                </span>
                                <input
                                    type="checkbox"
                                    checked={isSelected}
                                    onChange={() => handleUnitToggle(unit.number)}
                                    className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                                />
                            </label>
                        );
                    })}
                </div>

                <div className="text-center">
                    <Button
                        onClick={handleStartPractice}
                        disabled={selectedUnits.length === 0}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300"
                    >
                        Start Focused Practice
                    </Button>
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