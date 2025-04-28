'use client';

import Link from "next/link"
import dojoIcon from "../../public/images/dojoIcon.png"
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { useAuthContext } from '@/contexts/AuthContext'
import { User, ChevronDown, LogOut, MessageSquare, Share2, Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button";
import { UnitPerformanceStat } from "@/hooks/useAuth";
import { macroUnits, microUnits, Unit as UnitType } from "@/data/cheatSheets";

// --- Simple Progress Bar Component ---
interface ProgressBarProps {
  progress: number; // Percentage 0-100
}

const GlobalProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const clampedProgress = Math.max(0, Math.min(100, progress));
  return (
    <div className="h-1.5 w-24 bg-gray-200 rounded-full overflow-hidden">
      <div 
        className="h-full bg-blue-500 rounded-full transition-all duration-300 ease-out"
        style={{ width: `${clampedProgress}%` }}
      />
    </div>
  );
};
// --- End Progress Bar Component ---

// --- ADD: Smaller Progress Bar for Dropdown ---
interface UnitProgressBarProps {
  progress: number; // Percentage 0-100
}

const UnitProgressBar: React.FC<UnitProgressBarProps> = ({ progress }) => {
  const clampedProgress = Math.max(0, Math.min(100, progress));
  let bgColorClass = 'bg-gray-300'; // Default to grey
  
  // Apply color only if progress > 0
  if (progress > 0) { 
      if (progress >= 75) {
        bgColorClass = 'bg-green-500';
      } else if (progress >= 50) {
        bgColorClass = 'bg-yellow-500';
      } else { // progress > 0 and < 50
        bgColorClass = 'bg-red-500'; 
      }
  }

  return (
    <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden"> {/* Adjusted size */} 
      <div 
        className={`h-full ${bgColorClass} rounded-full transition-all duration-300 ease-out`}
        style={{ width: `${clampedProgress}%` }}
      />
    </div>
  );
};
// --- END: UnitProgressBar Component ---

export function Header() {
  const router = useRouter();
  const {
    user, 
    loading, 
    logout, 
    userData,
    totalXP, 
    globalLevel, 
    globalProgress, 
    correctStreak, 
    isNextQuestionDoubleXp,
    unitPerformanceStats,
    loadingUnitPerformance
  } = useAuthContext();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const [isAnimatingLevelUp, setIsAnimatingLevelUp] = useState(false); // State for level up animation
  const prevLevelRef = useRef<number | null>(null); // Ref to store previous level

  // --- Get all units for the selected subject --- 
  const allUnitsForSubject: UnitType[] = 
      userData?.selectedSubject === 'macro' ? macroUnits : 
      userData?.selectedSubject === 'micro' ? microUnits :
      []; // Default to empty if no subject selected
  // --- End Get all units ---

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Effect to detect level up and trigger animation
  useEffect(() => {
    if (globalLevel !== null && globalLevel !== undefined) {
      const prevLevel = prevLevelRef.current;
      if (prevLevel !== null && globalLevel > prevLevel) {
        setIsAnimatingLevelUp(true);
        const timer = setTimeout(() => {
          setIsAnimatingLevelUp(false);
        }, 1000); // Animation duration
        return () => clearTimeout(timer); // Cleanup timeout on unmount or level change
      }
      prevLevelRef.current = globalLevel; // Update previous level
    }
  }, [globalLevel]);

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(user ? '/userHomePage' : '/');
    setIsProfileOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    setIsProfileOpen(false);
    router.push('/');
  };

  return (
    <div className="w-full bg-white border-b sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleHomeClick}
              className="hover:opacity-90 transition-opacity flex items-center gap-4"
            >
              <Image 
                src={dojoIcon}
                alt="Dojo Icon"
                width={36}
                height={36}
                className="object-contain"
              />
              <div className="flex items-center">
                <span className="text-xl font-extrabold">AP</span>
                <span className="ml-1 text-xl font-extrabold text-blue-500">Dojo</span>
              </div>
            </button>
          </div>
      
          <div className="flex items-center space-x-4">
             {loading ? (
                 // Primary loading state (Auth check)
                 <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
             ) : user ? (
                 // User is logged in
                 <>
                   {/* XP/Level data is loaded, show the info */}
                   <div className="flex items-center space-x-3">
                     {/* --- Streak/Double XP Status (Moved & Styled) --- */}
                     <span className={`text-xs font-bold mr-2 ${
                       isNextQuestionDoubleXp 
                         ? 'text-purple-600 animate-pulse'
                         : correctStreak >= 3 
                           ? 'bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent animate-pulse'
                           : ''
                     }`}>
                        {isNextQuestionDoubleXp ? '(Double XP!)' :
                         correctStreak >= 5 ? '(5+ Streak - 2x XP!)' :
                         correctStreak >= 3 ? '(3+ Streak - 1.5x XP!)' :
                         ''}
                     </span>
                     {/* --- End Status --- */}
                     {/* Level Tag */}
                     <span
                       className={`px-2 py-0.5 text-xs font-medium rounded bg-gray-200 text-gray-700 transition-transform duration-500 ease-out ${isAnimatingLevelUp ? 'scale-125' : ''}`}
                     >
                       Level {globalLevel}
                     </span>
                     <GlobalProgressBar progress={globalProgress} />
                     <span className="text-sm font-semibold text-gray-700">
                         {totalXP} XP
                     </span>
                     {/* --- TEMPORARY TEST BUTTON --- */}
                     {/*
                     <button
                       onClick={() => {
                         setIsAnimatingLevelUp(true);
                         setTimeout(() => setIsAnimatingLevelUp(false), 1000);
                       }}
                       className="ml-2 px-2 py-1 text-xs bg-yellow-300 text-yellow-800 rounded hover:bg-yellow-400"
                     >
                       Test Lvl Up Anim
                     </button>
                     */}
                     {/* --- END TEMPORARY TEST BUTTON --- */}
                   </div>

                   {/* Profile Dropdown - always show if user exists and not in primary loading state */}
                   <div className="relative" ref={profileDropdownRef}>
                       <button 
                         onClick={() => setIsProfileOpen(!isProfileOpen)}
                         className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500"
                         aria-label="User menu"
                       >
                          <User className="w-5 h-5 text-gray-600" />
                       </button>
                       {isProfileOpen && (
                           <div 
                             className="absolute top-full right-0 mt-2 w-64 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-20" // Increased width
                             role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex={-1}
                           >
                               {/* User Email */}
                               {user?.email && (
                                   <div className="px-4 py-2 text-xs text-gray-500 truncate" title={user.email}>
                                       {user.email}
                                   </div>
                               )}
                               <div className="border-t border-gray-100 my-1"></div>

                               {/* Unit Progress Section - Title Updated */}
                               <div className="px-4 pt-2 pb-1 text-xs font-semibold text-gray-500 uppercase">
                                 Unit Progress {/* Removed subject label */}
                               </div>
                               <div className="px-4 py-2 space-y-2 max-h-48 overflow-y-auto"> 
                                 {loadingUnitPerformance ? (
                                    <div className="flex justify-center items-center h-10">
                                        <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                                    </div>
                                 ) : allUnitsForSubject.length > 0 ? (
                                    // --- Map over ALL units for the subject --- 
                                    allUnitsForSubject.map(unit => {
                                      // Find performance stat for this unit, if it exists
                                      const stat = unitPerformanceStats?.find(s => s.unitId === unit.number && s.subject === userData?.selectedSubject);
                                      // Determine percentage (default to 0 if no stat or no answers)
                                      const displayPercentage = stat && stat.totalAnswers > 0 ? stat.percentage : 0;
                                      
                                      return (
                                        <div key={unit.number} className="text-xs">
                                            <div className="flex justify-between items-center mb-0.5">
                                                {/* Always display Unit + Number */}
                                                <span className="text-gray-700 font-medium">{`Unit ${unit.number}`}</span>
                                                {/* Show percentage only if there are answers */} 
                                                {stat && stat.totalAnswers > 0 ? (
                                                  <span className="text-gray-500">{displayPercentage}%</span>
                                                ) : (
                                                  <span className="text-gray-400 text-xs italic">N/A</span> // Indicate no data yet
                                                )}
                                            </div>
                                            <UnitProgressBar progress={displayPercentage} />
                                        </div>
                                      );
                                    })
                                    // --- End Map --- 
                                 ) : (
                                    // Show message if no subject selected or units couldn't be loaded
                                    <p className="text-xs text-gray-500 italic text-center py-2">
                                      {userData?.selectedSubject ? 'Unit data unavailable.' : 'Select a subject first.'}
                                    </p>
                                 )}
                               </div>
                               {/* End Unit Progress Section */}

                               {/* Divider */}
                               <div className="border-t border-gray-100 my-1"></div>

                               {/* Feedback/Share Buttons */}
                               
                               <button 
                                   onClick={handleLogout}
                                   className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50"
                                   role="menuitem" tabIndex={-1}
                               >
                                   <LogOut className="w-4 h-4" />
                                   Log Out
                               </button>
                           </div>
                       )}
                   </div>
                 </>
             ) : (
                 // User is null and not loading: Show Login/Signup
                 <div className="flex items-center space-x-4">
                   <Link
                     href="/login"
                     className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
                   >
                     Login
                   </Link>
                   <Link
                     href="/signup"
                     className="px-4 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                   >
                     Sign Up
                   </Link>
                 </div>
             )}
          </div>
        </div>
      </div>
    </div>
  )
} 