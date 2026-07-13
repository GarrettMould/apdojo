'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, UserCircle } from 'lucide-react';
import { useAuthContext } from '@/contexts/AuthContext';
import { Button } from './ui/button';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { getSubjectXP } from '@/hooks/useUserProgress';
import { getBeltProgress } from '@/lib/beltSystem';
import { motion } from 'framer-motion';
import { AdminSubjectSelect } from '@/components/dashboard/AdminSubjectSelect';
import { hasValidSeasonPass, getPracticeTestsUrl } from '@/lib/utils';
import type { CourseSubject } from '@/lib/courseSubject';
import { defaultCheatSheetUrl, isCourseSubject, isEconCourse } from '@/lib/courseSubject';
import { hasAdminRole } from '@/lib/adminAccess';
import { useSubjectSwitchNavigation } from '@/hooks/useSubjectSwitchNavigation';

export function Header() {
  const {
    user,
    logout,
    selectedSubject,
    totalXP,
    guestXp,
    isCharacterClosetOpen,
    setIsCharacterClosetOpen,
    userData,
    setShowSignupModal,
    setShowLoginModal,
  } = useAuthContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBeltDropdownOpen, setIsBeltDropdownOpen] = useState(false);
  const [isPracticeDropdownOpen, setIsPracticeDropdownOpen] = useState(false);
  const [isGovDropdownOpen, setIsGovDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const beltDropdownRef = useRef<HTMLDivElement>(null);
  const practiceDropdownRef = useRef<HTMLDivElement>(null);
  const govDropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const handleSubjectSwitch = useSubjectSwitchNavigation();
  const isTeacher = !!(user && userData?.teacher === true);
  const isAdmin = Boolean(user && hasAdminRole(userData));
  const canAccessGov = isAdmin;

  // Ensure component is mounted before using selectedSubject to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // If on unit MCQ practice page, use subject from URL, otherwise use context
  // Use 'macro' as default until mounted to match server render
  const displaySubject: CourseSubject = pathname === '/unitMCQPracticePage' 
    ? (isCourseSubject(searchParams.get('subject'))
        ? (searchParams.get('subject') as CourseSubject)
        : (mounted ? selectedSubject : 'macro'))
    : (mounted ? selectedSubject : 'macro');

  // Check if user is premium (has valid season pass) - must be after displaySubject is defined
  const isPremium = user && userData ? hasValidSeasonPass(userData, displaySubject) : false;
  const navHoverClass =
    displaySubject === 'gov'
      ? 'hover:text-violet-600'
      : displaySubject === 'micro'
        ? 'hover:text-green-600'
        : 'hover:text-blue-600';
  const mcqPracticeHref =
    displaySubject === 'gov'
      ? '/select-practice-units?subject=gov'
      : '/select-practice-units';

  const mobilePracticeLinks: { label: string; href: string; prefetch?: boolean }[] = [
    { label: 'MCQ Practice', href: mcqPracticeHref },
    ...(displaySubject !== 'stats'
      ? [
          {
            label: 'FRQ Practice',
            href: `/unitFRQpracticePage?subject=${displaySubject}&frqId=${displaySubject === 'macro' ? 1 : displaySubject === 'micro' ? 2 : 1}`,
          },
        ]
      : []),
    { label: 'Create a Quiz', href: '/dojo/infinite' },
    ...(isEconCourse(displaySubject)
      ? [
          { label: 'Dojo Drills', href: '/dojo-drills' },
          { label: 'Graphing Practice', href: '/graph-gym-dashboard', prefetch: false },
        ]
      : displaySubject === 'gov'
        ? [{ label: 'SCOTUS Practice', href: '/scotus-essay-practice' }]
        : []),
    { label: 'Cheat Sheets', href: defaultCheatSheetUrl(displaySubject) },
    ...(isEconCourse(displaySubject) ? [{ label: 'Blog', href: '/ap-blog-home' }] : []),
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const openSignupModal = () => {
    closeMobileMenu();
    setIsBeltDropdownOpen(false);
    setShowSignupModal(true);
  };

  const openLoginModal = () => {
    closeMobileMenu();
    setIsBeltDropdownOpen(false);
    setShowLoginModal(true);
  };

  const handleSubjectChange = (newSubject: CourseSubject) => {
    void handleSubjectSwitch(newSubject, displaySubject);
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

  // Close gov dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (govDropdownRef.current && !govDropdownRef.current.contains(event.target as Node)) {
        setIsGovDropdownOpen(false);
      }
    };

    if (isGovDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isGovDropdownOpen]);

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
              <div className="relative" ref={practiceDropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsPracticeDropdownOpen(prev => !prev)}
                  className="flex items-center gap-1 text-lg text-gray-700 hover:text-blue-600 transition-colors font-bold"
                >
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
                        href={mcqPracticeHref}
                        className={`block px-5 py-3.5 text-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors ${navHoverClass}`}
                        onClick={() => setIsPracticeDropdownOpen(false)}
                      >
                        MCQ Practice
                      </Link>
                      {displaySubject !== 'stats' ? (
                        <Link
                          href={`/unitFRQpracticePage?subject=${displaySubject}&frqId=${displaySubject === 'macro' ? 1 : 2}`}
                          className="block px-5 py-3.5 text-lg font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                          onClick={() => setIsPracticeDropdownOpen(false)}
                        >
                          FRQ Practice
                        </Link>
                      ) : null}
                      <Link
                        href="/dojo/infinite"
                        className="block px-5 py-3.5 text-lg font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                        onClick={() => setIsPracticeDropdownOpen(false)}
                      >
                        Create a Quiz
                      </Link>
                      {isEconCourse(displaySubject) ? (
                        <>
                          <Link
                            href="/dojo-drills"
                            className={`block px-5 py-3.5 text-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors ${navHoverClass}`}
                            onClick={() => setIsPracticeDropdownOpen(false)}
                          >
                            Dojo Drills
                          </Link>
                          <Link
                            href="/ap-blog-home"
                            className={`block px-5 py-3.5 text-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors ${navHoverClass}`}
                            onClick={() => setIsPracticeDropdownOpen(false)}
                          >
                            Blog
                          </Link>
                        </>
                      ) : null}
                    </div>
                  </div>
                )}
              </div>

              {isEconCourse(displaySubject) ? (
                <Link
                  href="/graph-gym-dashboard"
                  prefetch={false}
                  className={`text-lg text-gray-700 transition-colors font-bold ${navHoverClass}`}
                >
                  Graphing Practice
                </Link>
              ) : displaySubject === 'gov' ? (
                <Link
                  href="/scotus-essay-practice"
                  className={`text-lg text-gray-700 transition-colors font-bold ${navHoverClass}`}
                >
                  SCOTUS Practice
                </Link>
              ) : null}

              {canAccessGov && !isAdmin && (
                <div className="relative" ref={govDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setIsGovDropdownOpen((p) => !p)}
                    className="flex items-center gap-1 text-lg text-gray-700 hover:text-violet-600 transition-colors font-bold"
                  >
                    AP Gov
                    <ChevronDown className={`w-5 h-5 transition-transform ${isGovDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isGovDropdownOpen && (
                    <div className="absolute top-full left-0 w-64 z-50">
                      <div className="h-2 -mt-2 w-full pointer-events-auto"></div>
                      <div className="bg-white rounded-lg shadow-lg border border-gray-200 py-2 pointer-events-auto">
                        <Link
                          href="/ap-gov-unit-1-cheat-sheet"
                          className="block px-5 py-3.5 text-lg font-medium text-gray-700 hover:bg-gray-50 hover:text-violet-600 transition-colors"
                          onClick={() => setIsGovDropdownOpen(false)}
                        >
                          Cheat Sheets
                        </Link>
                        <Link
                          href="/select-practice-units?subject=gov"
                          className="block px-5 py-3.5 text-lg font-medium text-gray-700 hover:bg-gray-50 hover:text-violet-600 transition-colors"
                          onClick={() => setIsGovDropdownOpen(false)}
                        >
                          MCQ Practice
                        </Link>
                        <Link
                          href={getPracticeTestsUrl('gov')}
                          className="block px-5 py-3.5 text-lg font-medium text-gray-700 hover:bg-gray-50 hover:text-violet-600 transition-colors"
                          onClick={() => setIsGovDropdownOpen(false)}
                        >
                          Practice Tests
                        </Link>
                        <Link
                          href="/scotus-essay-practice"
                          className="block px-5 py-3.5 text-lg font-medium text-gray-700 hover:bg-gray-50 hover:text-violet-600 transition-colors"
                          onClick={() => setIsGovDropdownOpen(false)}
                        >
                          SCOTUS Comparison Practice
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <Link
                href={defaultCheatSheetUrl(displaySubject)}
                className={`text-lg text-gray-700 transition-colors font-bold ${navHoverClass}`}
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

            {isAdmin && (
              <AdminSubjectSelect
                value={displaySubject}
                onChange={handleSubjectChange}
                size="compact"
              />
            )}

            {/* Macro / Micro toggle — logged-out visitors only */}
            {!user && !isAdmin && (
              <div className="flex items-center">
                <div className="inline-flex items-center bg-gray-100 rounded-xl p-1 border-2 border-gray-300 shadow-[0_3px_0_0_rgba(209,213,219,1)]">
                  <button
                    onClick={() => handleSubjectChange('macro')}
                    className={`px-4 py-1.5 text-sm font-black rounded-lg transition-all duration-200 ${
                      (mounted ? selectedSubject : 'macro') === 'macro'
                        ? 'bg-blue-500 text-white border-2 border-blue-700 shadow-[0_2px_0_0_rgba(0,0,0,0.4)]'
                        : 'bg-gray-100 text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Macro
                  </button>
                  <button
                    onClick={() => handleSubjectChange('micro')}
                    className={`px-4 py-1.5 text-sm font-black rounded-lg transition-all duration-200 ${
                      (mounted ? selectedSubject : 'macro') === 'micro'
                        ? 'bg-green-500 text-white border-2 border-green-700 shadow-[0_2px_0_0_rgba(0,0,0,0.4)]'
                        : 'bg-gray-100 text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Micro
                  </button>
                </div>
              </div>
            )}

            {/* User Icon & Auth Buttons */}
            <div className="relative z-[51] flex items-center gap-3">
              {/* Account icon — opens belt/XP dropdown */}
              <div className="flex items-center relative" ref={beltDropdownRef}>
                {(() => {
                  const xp = user ? getSubjectXP(userData, displaySubject) : (guestXp ?? 0);
                  return (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          setIsBeltDropdownOpen(prev => !prev);
                        }}
                        className="flex items-center gap-1 p-1.5 rounded-lg text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors cursor-pointer"
                        data-xp-button="true"
                        aria-label="Account & XP"
                      >
                        <UserCircle className="w-7 h-7" />
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
                <button
                  type="button"
                  onClick={openSignupModal}
                  className="inline-flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-black text-base px-6 py-2.5 rounded-xl border-2 border-blue-700 shadow-[0_4px_0_0_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-[0_2px_0_0_rgba(0,0,0,1)] transition-all"
                >
                  Sign up free →
                </button>
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
              <Menu className="w-7 h-7" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation — Full-screen overlay */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-[60] bg-white flex flex-col overflow-y-auto">

            {/* Overlay header row */}
            <div className="flex items-center justify-between px-5 h-20 border-b border-gray-100 flex-shrink-0">
              <Link href="/" onClick={closeMobileMenu} className="flex items-center space-x-3">
                <Image src="/images/dojoIconJan26.svg" alt="AP Dojo" width={36} height={36} className="w-9 h-9" unoptimized />
                <span className="text-xl font-extrabold tracking-wide text-gray-900">
                  AP <span className="text-blue-500">Dojo</span>
                </span>
              </Link>
              <button onClick={closeMobileMenu} className="p-2 text-gray-500 hover:text-gray-900 transition-colors" aria-label="Close menu">
                <X className="w-7 h-7" />
              </button>
            </div>

            <nav className="flex flex-col flex-1 px-5 py-6 gap-1">

              {/* Auth CTAs — only for logged-out users */}
              {!user && (
                <div className="flex flex-col gap-3 mb-6">
                  <button
                    type="button"
                    onClick={openSignupModal}
                    className="w-full text-center py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-black rounded-2xl transition-colors shadow-sm"
                  >
                    Create Account
                  </button>
                  <button
                    type="button"
                    onClick={openLoginModal}
                    className="w-full text-center py-4 border-2 border-gray-200 hover:border-gray-300 text-gray-900 text-lg font-black rounded-2xl transition-colors"
                  >
                    Sign In
                  </button>
                </div>
              )}

              {/* Season Pass */}
              {(!user || !isPremium) && (
                <>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1 mb-1">Season Pass</p>
                  <Link
                    href={`/purchase/season-pass?courseType=${displaySubject}`}
                    onClick={closeMobileMenu}
                    className="px-4 py-4 text-xl font-bold text-blue-600 hover:bg-blue-50 rounded-xl transition-colors flex items-center justify-between"
                  >
                    <span>Get the Season Pass</span>
                    <span className="text-lg">✨</span>
                  </Link>
                  <div className="my-3 border-t border-gray-100" />
                </>
              )}

              {/* Test */}
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1 mb-1">Test</p>
              <Link
                href={getPracticeTestsUrl(selectedSubject)}
                onClick={closeMobileMenu}
                className="px-4 py-4 text-xl font-bold text-gray-800 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
              >
                Full Practice Tests
              </Link>
              <div className="my-3 border-t border-gray-100" />

              {/* Practice */}
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1 mb-1">Practice</p>
              {mobilePracticeLinks.map(({ label, href, prefetch }) => (
                <Link
                  key={label}
                  href={href}
                  prefetch={prefetch}
                  onClick={closeMobileMenu}
                  className={`px-4 py-4 text-xl font-bold text-gray-800 rounded-xl transition-colors ${navHoverClass} ${
                    displaySubject === 'gov' ? 'hover:bg-violet-50' : displaySubject === 'micro' ? 'hover:bg-green-50' : 'hover:bg-blue-50'
                  }`}
                >
                  {label}
                </Link>
              ))}

              {/* Bottom section — XP, subject toggle, logout */}
              <div className="mt-auto pt-6 border-t border-gray-100 space-y-4">
                {/* XP Bar */}
                {(() => {
                  const xp = user ? getSubjectXP(userData, displaySubject) : (guestXp ?? 0);
                  const beltProgress = getBeltProgress(xp);
                  const { percent, xpToNext, currentBelt } = beltProgress;
                  const getBeltImage = () => {
                    if (currentBelt.name === 'Yellow Belt') return '/images/beltNewYellow.svg';
                    if (currentBelt.name === 'Green Belt') return '/images/beltNewGreen.svg';
                    if (currentBelt.name === 'Purple Belt') return '/images/beltNewPurple.svg';
                    if (currentBelt.name === 'Black Belt') return '/images/beltNewBlack.svg';
                    return '/images/beltNewWhite.svg';
                  };
                  return (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Image src={getBeltImage()} alt={currentBelt.name} width={24} height={24} className="w-6 h-auto" unoptimized />
                          <span className={`text-sm font-bold uppercase ${currentBelt.textColor}`}>{currentBelt.name}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-800">
                          <span>{xp} XP</span>
                          <Image src="/images/flame100.png" alt="XP" width={16} height={16} className="w-4 h-4" unoptimized />
                        </div>
                      </div>
                      <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full ${currentBelt.color === 'bg-yellow-400' ? 'bg-yellow-400' : currentBelt.color === 'bg-green-600' ? 'bg-green-600' : currentBelt.color === 'bg-purple-600' ? 'bg-purple-600' : currentBelt.color === 'bg-gray-900' ? 'bg-gray-900' : 'bg-gray-300'}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${percent}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                      <p className="text-xs text-center text-gray-500">
                        {xpToNext !== null ? `${xpToNext.toLocaleString()} XP to next belt` : 'Max Rank'}
                      </p>
                    </div>
                  );
                })()}

                {isAdmin ? (
                  <AdminSubjectSelect
                    value={displaySubject}
                    onChange={(s) => {
                      handleSubjectChange(s);
                      closeMobileMenu();
                    }}
                    className="w-full min-w-0"
                  />
                ) : null}
                {!isAdmin && (
                  <div className="inline-flex w-full bg-gray-100 rounded-xl p-1 border border-gray-200">
                    {(['macro', 'micro'] as const).map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => {
                          handleSubjectChange(s);
                          closeMobileMenu();
                        }}
                        className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all duration-200 capitalize ${
                          displaySubject === s
                            ? s === 'macro'
                              ? 'bg-blue-600 text-white shadow-sm'
                              : 'bg-green-600 text-white shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                      </button>
                    ))}
                  </div>
                )}

                {user && (
                  <button
                    onClick={() => { handleLogout(); closeMobileMenu(); }}
                    className="w-full py-3 text-red-600 hover:bg-red-50 transition-colors font-semibold rounded-xl text-sm"
                  >
                    Logout
                  </button>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
