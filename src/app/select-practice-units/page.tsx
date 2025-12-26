'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowLeft, Zap } from 'lucide-react';
import { macroUnits as allMacroCheatSheets, microUnits as allMicroCheatSheets, Unit as UnitDetailsType } from '@/data/cheatSheets';
import { useAuthContext } from '@/contexts/AuthContext';
import Image from 'next/image';

function SelectPracticeUnitsContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { lastSelectedPracticeUnits, setLastSelectedPracticeUnits, selectedSubject, user, totalXP, guestXp } = useAuthContext();
    
    const subject = selectedSubject;
    
    // Calculate user XP
    const userXP = user ? (totalXP ?? 0) : (guestXp ?? 0);
    
    // Calculate belt based on XP (using same logic as DojoReadinessBand)
    // Assuming belt is based on a score/percentage, we'll use XP ranges
    // For now, let's use a simple XP-based calculation
    const getBeltInfo = (xp: number): { name: string; color: string; bgColor: string; textColor: string } => {
        // Convert XP to a score (0-100) - adjust these ranges as needed
        // For example, if max XP is 2000, then 0-400 = White, 400-800 = Yellow, etc.
        const score = Math.min(100, (xp / 20)); // Adjust divisor based on your XP system
        
        if (score < 20) return { name: 'WHITE BELT', color: 'gray', bgColor: 'bg-gray-100', textColor: 'text-gray-900' };
        if (score < 40) return { name: 'YELLOW BELT', color: 'yellow', bgColor: 'bg-yellow-400', textColor: 'text-gray-900' };
        if (score < 60) return { name: 'GREEN BELT', color: 'green', bgColor: 'bg-green-500', textColor: 'text-white' };
        if (score < 80) return { name: 'BROWN BELT', color: 'amber', bgColor: 'bg-amber-700', textColor: 'text-white' };
        return { name: 'BLACK BELT', color: 'black', bgColor: 'bg-black', textColor: 'text-white' };
    };
    
    const beltInfo = getBeltInfo(userXP);

    const [selectedUnits, setSelectedUnits] = useState<number[]>([]);
    const [unitsData, setUnitsData] = useState<UnitDetailsType[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Removed the overflow hidden effect that was preventing scrolling
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


    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className={`h-8 w-8 animate-spin ${subject === 'macro' ? 'text-blue-500' : 'text-green-500'}`}/>
            </div>
        );
    }

    const displayUnits = unitsData.slice(0, 6);
    const isMicro = subject === 'micro';
    const themeColor = isMicro ? 'green' : 'blue';

    return (
        <div className="min-h-screen bg-gray-50 py-2 px-4 sm:px-6 lg:px-8 flex flex-col justify-center overflow-hidden">
            <div className="max-w-3xl mx-auto w-full">
                {/* Dojo Player Card - Unified Container */}
                <div className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-xl p-6 sm:p-8">
                    {/* Header Row - Belt Badge, Headline & XP */}
                    <div className="flex justify-between items-center mb-6">
                        {/* Left Side - Belt Badge */}
                        <div className={`h-8 px-4 flex items-center justify-center border-2 border-black font-bold uppercase text-xs tracking-wider ${beltInfo.bgColor} ${beltInfo.textColor}`}>
                            {beltInfo.name}
                        </div>
                        
                        {/* Center - Headline */}
                        <div className="flex-1 text-center">
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                                Choose Your <span className={isMicro ? 'text-green-500' : 'text-blue-500'}>Units</span>
                            </h1>
                        </div>
                        
                        {/* Right Side - XP Display */}
                        <div className="font-black text-xl flex items-center gap-2">
                            <span>{userXP}</span>
                            <span className="inline-flex items-center">
                                <Image
                                    src="/images/flame100.png"
                                    alt="XP Flame"
                                    width={24}
                                    height={24}
                                    className="w-6 h-6"
                                />
                            </span>
                        </div>
                    </div>

                    {/* Units List */}
                    <div className="space-y-2 mb-6">
                        {displayUnits.map((unit) => {
                            const isSelected = selectedUnits.includes(unit.number);
                            return (
                                <button
                                    key={unit.number}
                                    onClick={() => handleUnitToggle(unit.number)}
                                    className={`group relative w-full p-3 border-2 rounded-lg cursor-pointer transition-all duration-300 text-left ${
                                        isSelected 
                                            ? isMicro
                                                ? 'border-green-500 shadow-md shadow-green-100/50 bg-gradient-to-br from-green-50 to-green-100'
                                                : 'border-blue-500 shadow-md shadow-blue-100/50 bg-gradient-to-br from-blue-50 to-blue-100'
                                            : isMicro
                                                ? 'border-gray-200 hover:border-green-400 hover:shadow-md hover:shadow-green-100/30 bg-white hover:bg-green-50'
                                                : 'border-gray-200 hover:border-blue-400 hover:shadow-md hover:shadow-blue-100/30 bg-white hover:bg-blue-50'
                                    }`}
                                >
                                    <div className="flex items-center justify-between">
                                        {/* Unit content */}
                                        <div className="flex-1 flex items-center gap-2">
                                            <div className={`text-3xl font-bold ${isMicro ? 'text-green-500' : 'text-blue-500'}`}>
                                                {unit.number}
                                                <span className="text-black">.</span>
                                            </div>
                                            <h3 className="text-sm font-semibold text-gray-800 leading-tight">
                                                {unit.title}
                                            </h3>
                                        </div>

                                        {/* Selection indicator */}
                                        <div className={`ml-4 w-4 h-4 rounded-full border-2 transition-all duration-200 flex items-center justify-center ${
                                            isSelected 
                                                ? isMicro
                                                    ? 'border-green-500 bg-green-500'
                                                    : 'border-blue-500 bg-blue-500'
                                                : isMicro
                                                    ? 'border-gray-300 group-hover:border-green-400'
                                                    : 'border-gray-300 group-hover:border-blue-400'
                                        }`}>
                                            {isSelected && (
                                                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                                            )}
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Action Button - Full Width */}
                    <div className="w-full">
                        <button
                            onClick={handleStartPractice}
                            disabled={selectedUnits.length === 0}
                            className={`w-full px-6 py-4 rounded-lg font-bold text-lg transition-all duration-300 ${
                                selectedUnits.length === 0 
                                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                                    : isMicro
                                        ? 'bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg hover:shadow-green-500/25'
                                        : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg hover:shadow-blue-500/25'
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
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500"/>
            </div>
        }>
            <SelectPracticeUnitsContent />
        </Suspense>
    );
} 