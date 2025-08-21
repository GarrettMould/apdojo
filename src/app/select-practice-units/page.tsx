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
        // Removed the overflow hidden effect that was preventing scrolling
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
        <div className="min-h-screen bg-gray-50 py-2 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
            <div className="max-w-3xl mx-auto w-full">
                {/* Header */}
                <div className="text-center mb-4">
                    <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 mb-1">
                        Choose Your <span className="text-blue-500">Units</span>
                    </h2>
                    <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
                        Select the {subject === 'micro' ? 'Microeconomics' : 'Macroeconomics'} units you want to focus on.
                    </p>
                </div>

                {/* Units Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3">
                    {displayUnits.map((unit) => {
                        const isSelected = selectedUnits.includes(unit.number);
                        return (
                            <button
                                key={unit.number}
                                onClick={() => handleUnitToggle(unit.number)}
                                className={`group relative aspect-square p-2 border-2 rounded-lg cursor-pointer transition-all duration-300 ${
                                    isSelected 
                                        ? 'border-blue-500 shadow-md shadow-blue-100/50 bg-gradient-to-br from-blue-50 to-blue-100' 
                                        : 'border-gray-200 hover:border-blue-400 hover:shadow-md hover:shadow-blue-100/30 bg-white hover:bg-blue-50'
                                }`}
                            >
                                {/* Selection indicator */}
                                <div className={`absolute top-1 right-1 w-3 h-3 rounded-full border-2 transition-all duration-200 ${
                                    isSelected 
                                        ? 'border-blue-500 bg-blue-500' 
                                        : 'border-gray-300 group-hover:border-blue-400'
                                }`}>
                                    {isSelected && (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <div className="w-1 h-1 bg-white rounded-full"></div>
                                        </div>
                                    )}
                                </div>

                                {/* Unit content */}
                                <div className="h-full flex flex-col justify-center text-center">
                                    <div className="text-xl sm:text-2xl font-bold text-blue-500 mb-1">
                                        Unit {unit.number}
                                    </div>
                                    <h3 className="text-sm sm:text-base font-semibold text-gray-800 leading-tight px-1">
                                        {unit.title}
                                    </h3>
                                </div>

                                {/* Hover effect overlay */}
                                <div className={`absolute inset-0 rounded-lg transition-opacity duration-200 ${
                                    isSelected 
                                        ? 'bg-blue-500/5' 
                                        : 'bg-blue-500/0 group-hover:bg-blue-500/5'
                                }`} />
                            </button>
                        );
                    })}
                </div>

                {/* Action Button */}
                <div className="w-full">
                    <button
                        onClick={handleStartPractice}
                        disabled={selectedUnits.length === 0}
                        className={`w-full px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
                            selectedUnits.length === 0 
                                ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg hover:shadow-blue-500/25'
                        }`}
                    >
                        Start Practice
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