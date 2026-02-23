'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useAuthContext } from '@/contexts/AuthContext';
import { Button } from './ui/button';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { getSubjectXP } from '@/hooks/useUserProgress';
import { getBeltProgress } from '@/lib/beltSystem';
import { motion } from 'framer-motion';
import { SubjectToggle } from '@/components/dashboard/SubjectToggle';
import { hasValidSeasonPass, getPracticeTestsUrl } from '@/lib/utils';

export function Header() {
  const { user, logout, selectedSubject, setSelectedSubject, totalXP, guestXp, isCharacterClosetOpen, setIsCharacterClosetOpen, userData } = useAuthContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBeltDropdownOpen, setIsBeltDropdownOpen] = useState(false);
  const [isPracticeDropdownOpen, setIsPracticeDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const beltDropdownRef = useRef<HTMLDivElement>(null);
  const practiceDropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isTeacher = !!(user && userData?.teacher === true);

  // Ensure component is mounted before using selectedSubject to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // If on unit MCQ practice page, use subject from URL, otherwise use context
  // Use 'macro' as default until mounted to match server render
  const displaySubject = pathname === '/unitMCQPracticePage' 
    ? (searchParams.get('subject') === 'macro' || searchParams.get('subject') === 'micro' 
        ? searchParams.get('subject') as 'macro' | 'micro'
        : (mounted ? selectedSubject : 'macro'))
    : (mounted ? selectedSubject : 'macro');

  // Check if user is premium (has valid season pass) - must be after displaySubject is defined
  const isPremium = user && userData ? hasValidSeasonPass(userData, displaySubject) : false;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleSubjectChange = async (newSubject: 'macro' | 'micro') => {
    // Update the subject in context (this will update localStorage for guests)
    await setSelectedSubject(newSubject);
    
    // For logged-out users, ensure the change is reflected immediately
    // The state update should trigger a re-render, but we can also force navigation
    // if we're on a subject-specific page
    if (!user) {
      // If on a subject-specific route, navigate to the equivalent page for the new subject
      if (pathname.includes('macro') || pathname.includes('micro')) {
        const newPath = pathname.replace(/macro|micro/g, newSubject);
        if (newPath !== pathname) {
          router.push(newPath);
          return;
        }
      }
      // For other pages, just refresh to ensure all components pick up the change
      router.refresh();
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/'); // Redirect to homepage on logout
    } catch (error) {
      console.error('Failed to log out:', error);
      // Optionally, show an error message to the user
    }
  };


  // Close belt dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (beltDropdownRef.current && !beltDropdownRef.current.contains(event.target as Node)) {
        // Check if the click was on the XP button
        const target = event.target as HTMLElement;
        if (target.closest('[data-xp-button="true"]')) {
          return; // Don't close if clicking the XP button itself
        }
        setIsBeltDropdownOpen(false);
      }
    };

    if (isBeltDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isBeltDropdownOpen]);

  // Close practice dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (practiceDropdownRef.current && !practiceDropdownRef.current.contains(event.target as Node)) {
        setIsPracticeDropdownOpen(false);
      }
    };

    if (isPracticeDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPracticeDropdownOpen]);

  return (
    <header className="bg-white sticky top-0 z-50 shadow-md">
      <div className="px-4 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-20">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/images/dojoIconJan26.svg"
                alt="AP Dojo"
                width={40}
                height={40}
                className="w-10 h-10"
                unoptimized={true}
              />
              <span className="text-2xl font-extrabold tracking-wide text-gray-900">
                AP <span className="text-blue-500">Dojo</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation, XP, and Auth Buttons */}
          <div className="hidden lg:flex items-center gap-x-8">
            <nav className="flex items-center space-x-10">
              {/* Practice Dropdown */}
              <div 
                className="relative"
                ref={practiceDropdownRef}
                onMouseEnter={() => setIsPracticeDropdownOpen(true)}
                onMouseLeave={() => setIsPracticeDropdownOpen(false)}
              >
                <button className="flex items-center gap-1 text-lg text-gray-700 hover:text-blue-600 transition-colors font-bold">
                  Practice
                  <ChevronDown className={`w-5 h-5 transition-transform ${isPracticeDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isPracticeDropdownOpen && (
                  <div className="absolute top-full left-0 w-64 z-50">
                    {/* Invisible bridge area to prevent gap - extends upward to connect with button */}
                    <div className="h-2 -mt-2 w-full pointer-events-auto"></div>
                    <div className="bg-white rounded-lg shadow-lg border border-gray-200 py-2 pointer-events-auto">
                      <Link
                        href={getPracticeTestsUrl(selectedSubject)}
                        className="block px-5 py-3.5 text-lg font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                        onClick={() => setIsPracticeDropdownOpen(false)}
                      >
                        Full Practice Tests
                      </Link>
                      <Link
                        href="/select-practice-units"
                        className="block px-5 py-3.5 text-lg font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                        onClick={() => setIsPracticeDropdownOpen(false)}
                      >
                        MCQ Practice
                      </Link>
                      <Link
                        href={`/unitFRQpracticePage?subject=${displaySubject}&frqId=${displaySubject === 'macro' ? 1 : 2}`}
                        className="block px-5 py-3.5 text-lg font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                        onClick={() => setIsPracticeDropdownOpen(false)}
                      >
                        FRQ Practice
                      </Link>
                      <Link
                        href="/dojo/infinite"
                        className="block px-5 py-3.5 text-lg font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                        onClick={() => setIsPracticeDropdownOpen(false)}
                      >
                        Create a Quiz
                      </Link>
                      <Link
                        href="/dojo-drills"
                        className="block px-5 py-3.5 text-lg font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                        onClick={() => setIsPracticeDropdownOpen(false)}
                      >
                        Dojo Drills
                      </Link>
                      <Link
                        href="/ap-blog-home"
                        className="block px-5 py-3.5 text-lg font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                        onClick={() => setIsPracticeDropdownOpen(false)}
                      >
                        Blog
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Graph Gym - links to dashboard (prefetch=false to avoid redirect/prefetch loops) */}
              <Link
                href="/graph-gym-dashboard"
                prefetch={false}
                className="text-lg text-gray-700 hover:text-blue-600 transition-colors font-bold"
              >
                Graphing Practice
              </Link>
              <Link
                href="/graph-gym-dashboard"
                prefetch={false}
                className="text-lg text-gray-700 hover:text-blue-600 transition-colors font-bold"
              >
                Test
              </Link>

              {/* Cheat Sheets */}
              <Link
                href={displaySubject === 'macro' ? '/ap-macro-unit-1-cheat-sheet' : '/ap-micro-unit-1-cheat-sheet'}
                className="text-lg text-gray-700 hover:text-blue-600 transition-colors font-bold"
              >
                Cheat Sheets
              </Link>

              {/* Season Pass - Only show if user is not logged in or not premium */}
              {(!user || !isPremium) && (
                <Link
                  href={`/purchase/season-pass?courseType=${displaySubject}`}
                  className="text-lg text-gray-700 hover:text-blue-600 transition-colors font-bold"
                >
                  Season Pass
                </Link>
              )}

              {/* Tutoring Dropdown - HIDDEN */}
              {/* <div 
                className="relative"
                onMouseEnter={() => setIsTutoringDropdownOpen(true)}
                onMouseLeave={() => setIsTutoringDropdownOpen(false)}
              >
                <button className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition-colors font-semibold">
                  Tutoring
                  <ChevronDown className={`w-4 h-4 transition-transform ${isTutoringDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isTutoringDropdownOpen && (
                  <div className="absolute top-full left-0 pt-2 w-56 z-50">
                    <div className="bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                      <Link
                        href="/tutoring"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                        onClick={() => setIsTutoringDropdownOpen(false)}
                      >
                        Book a Lesson
                      </Link>
                      <Link
                        href="/async-tutoring"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                        onClick={() => setIsTutoringDropdownOpen(false)}
                      >
                        Ask a Question
                      </Link>
                      <Link
                        href="https://www.youtube.com/@apdojo"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                        onClick={() => setIsTutoringDropdownOpen(false)}
                      >
                        Join a YouTube Live Session
                      </Link>
                    </div>
                  </div>
                )}
              </div> */}
            </nav>

            {/* Subject Toggle for Logged-Out Users */}
            {!user && (
              <div className="flex items-center">
                <div className="inline-flex items-center bg-gray-100 rounded-lg p-1 border border-gray-300">
                  <button
                    onClick={() => handleSubjectChange('macro')}
                    className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
                      (mounted ? selectedSubject : 'macro') === 'macro'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:text-gray-900'
                    }`}
                  >
                    Macro
                  </button>
                  <button
                    onClick={() => handleSubjectChange('micro')}
                    className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
                      (mounted ? selectedSubject : 'macro') === 'micro'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:text-gray-900'
                    }`}
                  >
                    Micro
                  </button>
                </div>
              </div>
            )}

            {/* User Icon & Auth Buttons */}
            <div className="flex items-center gap-3">
              {/* XP bar with subtle red glow - Clickable to open belt dropdown */}
              <div className="flex items-center relative" ref={beltDropdownRef}>
                {(() => {
                  const xp = user ? getSubjectXP(userData, displaySubject) : (guestXp ?? 0);
                  const clamped = Math.max(0, Math.min(xp, 2000));
                  const ratio = clamped / 2000; // 0 to 1
                  // Very light opaque red glow that intensifies slightly with XP
                  const baseAlpha = 0.08;
                  const maxAlpha = 0.24;
                  const alpha = baseAlpha + (maxAlpha - baseAlpha) * ratio;
                  const background = `rgba(248, 113, 113, ${alpha})`; // red-400 with low opacity
                  return (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          setIsBeltDropdownOpen(prev => !prev);
                        }}
                        className="flex items-center gap-2 px-4 py-1.5 rounded-md border border-red-100 text-sm font-semibold text-gray-800 transition-colors duration-300 cursor-pointer hover:opacity-80"
                        style={{ background }}
                        data-xp-button="true"
                      >
                        <span className="uppercase tracking-tight text-[11px] text-gray-600">XP</span>
                        <span>{xp}</span>
                        <span className="inline-flex items-center">
                          <Image
                            src="/images/flame100.png"
                            alt="XP Flame"
                            width={20}
                            height={20}
                            className="w-5 h-5"
                            unoptimized={true}
                          />
                        </span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${isBeltDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {/* Belt System Dropdown */}
                      {isBeltDropdownOpen && (() => {
                        const beltProgress = getBeltProgress(xp);
                        const { percent, xpToNext, currentBelt } = beltProgress;
                        
                        // Helper function to get belt image path
                        const getBeltImage = () => {
                          if (currentBelt.name === 'White Belt') {
                            return '/images/beltNewWhite.svg';
                          } else if (currentBelt.name === 'Yellow Belt') {
                            return '/images/beltNewYellow.svg';
                          } else if (currentBelt.name === 'Green Belt') {
                            return '/images/beltNewGreen.svg';
                          } else if (currentBelt.name === 'Purple Belt') {
                            return '/images/beltNewPurple.svg';
                          } else if (currentBelt.name === 'Black Belt') {
                            return '/images/beltNewBlack.svg';
                          } else {
                            return '/images/beltNewWhite.svg'; // Default to white
                          }
                        };
                        
                        return (
                          <div className="absolute top-full right-0 mt-2 w-[320px] z-[100]">
                            <div className="bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4">
                              {/* Belt Badge with Image */}
                              <div className="mb-4 flex flex-col items-center">
                                <Image
                                  src={getBeltImage()}
                                  alt={currentBelt.name}
                                  width={80}
                                  height={80}
                                  className="w-20 h-auto mb-2"
                                  unoptimized={true}
                                />
                                <span className={`font-bold uppercase text-sm tracking-wider ${currentBelt.textColor}`}>
                                  {currentBelt.name}
                                </span>
                                <span className="text-xs font-semibold text-gray-600 mt-1">
                                  {currentBelt.label}
                                </span>
                              </div>
                              
                              {/* Progress Bar */}
                              <div className="mb-4">
                                <div className="h-6 bg-gray-200 border-2 border-black rounded-full overflow-hidden relative">
                                  <motion.div
                                    className={`h-full ${currentBelt.color === 'bg-yellow-400' ? 'bg-yellow-400' : currentBelt.color === 'bg-green-600' ? 'bg-green-600' : currentBelt.color === 'bg-purple-600' ? 'bg-purple-600' : currentBelt.color === 'bg-gray-900' ? 'bg-gray-900' : 'bg-gray-100'}`}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${percent}%` }}
                                    transition={{ duration: 0.3 }}
                                  />
                                </div>
                              </div>
                              
                              {/* XP to Go */}
                              <div className="text-center mb-4">
                                {xpToNext !== null ? (
                                  <p className="text-sm font-bold text-gray-900">
                                    {xpToNext.toLocaleString()} XP to go
                                  </p>
                                ) : (
                                  <p className="text-sm font-bold text-gray-900">
                                    Max Rank
                                  </p>
                                )}
                              </div>


                              {user && (
                                <div className="border-t border-gray-200 pt-3 mt-3">
                                  <button
                                    onClick={() => {
                                      handleLogout();
                                      setIsBeltDropdownOpen(false);
                                    }}
                                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors rounded-md font-medium"
                                  >
                                    Logout
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })()}
                    </>
                  );
                })()}
              </div>

              {!user && (
                <div className="flex items-center gap-2">
                  <Link href="/login" passHref>
                    <Button variant="outline" size="sm">
                      Login
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-gray-700 hover:text-blue-600 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-7 h-7" />
              ) : (
                <Menu className="w-7 h-7" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white">
            <nav className="flex flex-col py-4">
              {/* Practice Section Header */}
              <div className="px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
                Practice
              </div>
              <Link
                href={getPracticeTestsUrl(selectedSubject)}
                onClick={closeMobileMenu}
                className="px-6 py-3 text-lg text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors font-semibold"
              >
                Full Practice Tests
              </Link>
              <Link
                href="/select-practice-units"
                onClick={closeMobileMenu}
                className="px-6 py-3 text-lg text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors font-semibold"
              >
                MCQ Practice
              </Link>
              <Link
                href={`/unitFRQpracticePage?subject=${displaySubject}&frqId=${displaySubject === 'macro' ? 1 : 2}`}
                onClick={closeMobileMenu}
                className="px-6 py-3 text-lg text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors font-semibold"
              >
                FRQ Practice
              </Link>
              <Link
                href="/dojo/infinite"
                onClick={closeMobileMenu}
                className="px-6 py-3 text-lg text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors font-semibold"
              >
                Create a Quiz
              </Link>
              <Link
                href="/dojo-drills"
                onClick={closeMobileMenu}
                className="px-6 py-3 text-lg text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors font-semibold"
              >
                Dojo Drills
              </Link>
              <Link
                href="/ap-blog-home"
                onClick={closeMobileMenu}
                className="px-6 py-3 text-lg text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors font-semibold"
              >
                Blog
              </Link>

              {/* Other Links */}
              <div className="border-t border-gray-200 mt-2 pt-2">
                <Link
                  href="/graph-gym-dashboard"
                  prefetch={false}
                  onClick={closeMobileMenu}
                  className="px-4 py-3 text-lg text-blue-500 hover:text-blue-600 hover:bg-gray-50 transition-colors font-semibold"
                >
                  Graphing Practice
                </Link>
                <Link
                  href="/graph-gym-dashboard"
                  prefetch={false}
                  onClick={closeMobileMenu}
                  className="px-4 py-3 text-lg text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors font-semibold"
                >
                  Test
                </Link>
                <Link
                  href={displaySubject === 'macro' ? '/ap-macro-unit-1-cheat-sheet' : '/ap-micro-unit-1-cheat-sheet'}
                  onClick={closeMobileMenu}
                  className="px-4 py-3 text-lg text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors font-semibold"
                >
                  Cheat Sheets
                </Link>
                {(!user || !isPremium) && (
                  <Link
                    href={`/purchase/season-pass?courseType=${displaySubject}`}
                    onClick={closeMobileMenu}
                    className="px-4 py-3 text-lg text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors font-semibold"
                  >
                    Season Pass
                  </Link>
                )}
              </div>

                {/* Tutoring Dropdown (Mobile) - HIDDEN */}
                {/* <div className="px-4 py-2">
                  <button
                    onClick={() => setIsTutoringDropdownOpen(!isTutoringDropdownOpen)}
                    className="flex items-center justify-between w-full text-gray-700 hover:text-blue-600 transition-colors font-semibold"
                  >
                    Tutoring
                    <ChevronDown className={`w-4 h-4 transition-transform ${isTutoringDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isTutoringDropdownOpen && (
                    <div className="mt-2 ml-4 space-y-1">
                      <Link
                        href="/tutoring"
                        onClick={closeMobileMenu}
                        className="block px-4 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors rounded-md"
                      >
                        Book a Lesson
                      </Link>
                      <Link
                        href="/async-tutoring"
                        onClick={closeMobileMenu}
                        className="block px-4 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors rounded-md"
                      >
                        Ask a Question
                      </Link>
                      <Link
                        href="https://www.youtube.com/@apdojo"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={closeMobileMenu}
                        className="block px-4 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors rounded-md"
                      >
                        Join a YouTube Live Session
                      </Link>
                    </div>
                  )}
                </div> */}

                <div className="border-t border-gray-200 mt-4 pt-4">
                  {/* XP Bar (Mobile) */}
                  {(() => {
                    const xp = user ? getSubjectXP(userData, displaySubject) : (guestXp ?? 0);
                    const beltProgress = getBeltProgress(xp);
                    const { percent, xpToNext, currentBelt } = beltProgress;
                    
                    const getBeltImage = () => {
                      if (currentBelt.name === 'White Belt') {
                        return '/images/beltNewWhite.svg';
                      } else if (currentBelt.name === 'Yellow Belt') {
                        return '/images/beltNewYellow.svg';
                      } else if (currentBelt.name === 'Green Belt') {
                        return '/images/beltNewGreen.svg';
                      } else if (currentBelt.name === 'Purple Belt') {
                        return '/images/beltNewPurple.svg';
                      } else if (currentBelt.name === 'Black Belt') {
                        return '/images/beltNewBlack.svg';
                      } else {
                        return '/images/beltNewWhite.svg';
                      }
                    };
                    
                    return (
                      <div className="px-4 py-3 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Image
                              src={getBeltImage()}
                              alt={currentBelt.name}
                              width={24}
                              height={24}
                              className="w-6 h-auto"
                              unoptimized={true}
                            />
                            <span className={`text-xs font-bold uppercase ${currentBelt.textColor}`}>
                              {currentBelt.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-800">
                            <span className="uppercase tracking-tight text-[10px] text-gray-600">XP</span>
                            <span>{xp}</span>
                            <Image
                              src="/images/flame100.png"
                              alt="XP Flame"
                              width={16}
                              height={16}
                              className="w-4 h-4"
                              unoptimized={true}
                            />
                          </div>
                        </div>
                        <div className="h-3 bg-gray-200 border border-gray-300 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full ${currentBelt.color === 'bg-yellow-400' ? 'bg-yellow-400' : currentBelt.color === 'bg-green-600' ? 'bg-green-600' : currentBelt.color === 'bg-purple-600' ? 'bg-purple-600' : currentBelt.color === 'bg-gray-900' ? 'bg-gray-900' : 'bg-gray-100'}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${percent}%` }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                        {xpToNext !== null ? (
                          <p className="text-xs text-center text-gray-600">
                            {xpToNext.toLocaleString()} XP to next belt
                          </p>
                        ) : (
                          <p className="text-xs text-center text-gray-600">
                            Max Rank
                          </p>
                        )}
                      </div>
                    );
                  })()}
                  
                  {/* Subject Segmented Control (Mobile) */}
                  <div className="px-4 py-2">
                    <div className="inline-flex items-center w-full bg-gray-100 rounded p-0.5 border border-gray-200">
                      <button
                        onClick={() => {
                          handleSubjectChange('macro');
                          closeMobileMenu();
                        }}
                        className={`flex-1 px-2.5 py-2 text-xs font-medium rounded transition-all duration-200 ${
                          displaySubject === 'macro'
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        Macro
                      </button>
                      <button
                        onClick={() => {
                          handleSubjectChange('micro');
                          closeMobileMenu();
                        }}
                        className={`flex-1 px-2.5 py-2 text-xs font-medium rounded transition-all duration-200 ${
                          displaySubject === 'micro'
                            ? 'bg-green-600 text-white shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        Micro
                      </button>
                    </div>
                  </div>
                  

                  {user && (
                    <div className="px-4 pt-2 border-t border-gray-200 mt-3">
                      <button
                        onClick={() => {
                          handleLogout();
                          closeMobileMenu();
                        }}
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors font-semibold rounded-md"
                      >
                        Logout
                      </button>
                    </div>
                  )}

                  {!user && (
                    <div className="px-4 pt-4 space-y-2 border-t border-gray-200 mt-3">
                      <Link href="/login" passHref>
                        <Button onClick={closeMobileMenu} variant="outline" className="w-full">Login</Button>
                      </Link>
                    </div>
                  )}
                </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
