'use client';

import Link from "next/link"
import dojoIcon from "../../public/images/dojoIcon.png"
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { useAuthContext } from '@/contexts/AuthContext'
import { User, ChevronDown, LogOut, MessageSquare, Share2, Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button";

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

export function Header() {
  const router = useRouter();
  const {
    user, loading, logout, 
    loadingUnitXPData, // Keep for loader logic
    totalXP, globalLevel, globalProgress, // <-- Use new level/progress state
    correctStreak, // <-- Get streak 
    isNextQuestionDoubleXp // <-- Get double XP flag
  } = useAuthContext();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

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

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(user ? '/userHomePage' : '/');
    setIsProfileOpen(false);
  };

  const handleLogout = () => {
    logout();
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
                   {loadingUnitXPData ? (
                       // Loading XP specifically (still relevant until totalXP/level is calculated)
                       <Loader2 className="h-5 w-5 animate-spin text-gray-400 mr-2" />
                   ) : (
                       // XP/Level data is loaded, show the info
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
                         <span className="text-xs font-medium text-gray-500">Lvl {globalLevel}</span>
                         <GlobalProgressBar progress={globalProgress} />
                         <span className="text-sm font-semibold text-gray-700">
                             {totalXP} XP
                         </span>
                       </div>
                   )}

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
                             className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-20"
                             role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex={-1}
                           >
                               <button 
                                   disabled
                                   className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                   role="menuitem" tabIndex={-1}
                               >
                                  <MessageSquare className="w-4 h-4" />
                                  Give Feedback
                               </button>
                                <button 
                                   disabled
                                   className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                   role="menuitem" tabIndex={-1}
                               >
                                  <Share2 className="w-4 h-4" />
                                  Share with Friend
                               </button>
                               <div className="border-t border-gray-100 my-1"></div>
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