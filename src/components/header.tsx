'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import dojoIcon from "../../public/images/dojoIcon.png";
import { useAuthContext } from '@/contexts/AuthContext';
import { Button } from './ui/button';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { UserBeltProgress } from './dashboard/UserBeltProgress';
import { getSubjectXP } from '@/hooks/useUserProgress';

function Header() {
  const { user, logout, selectedSubject, totalXP, guestXp, isCharacterClosetOpen, setIsCharacterClosetOpen, userData } = useAuthContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBeltDropdownOpen, setIsBeltDropdownOpen] = useState(false);
  const beltDropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // If on unit MCQ practice page, use subject from URL, otherwise use context
  const displaySubject = pathname === '/unitMCQPracticePage' 
    ? (searchParams.get('subject') === 'macro' || searchParams.get('subject') === 'micro' 
        ? searchParams.get('subject') as 'macro' | 'micro'
        : selectedSubject)
    : selectedSubject;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
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

  return (
    <header className="bg-white sticky top-0 z-50 shadow-md">
      <div className="px-4 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src={dojoIcon}
                alt="AP Dojo"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="text-xl font-extrabold tracking-wide text-gray-900">
                AP <span className="text-blue-500">Dojo</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation, XP, and Auth Buttons */}
          <div className="hidden md:flex items-center gap-x-8">
            <nav className="flex items-center space-x-8">
              <Link
                href="/unit-final-practice-tests"
                className="text-gray-700 hover:text-blue-600 transition-colors font-semibold"
              >
                Full Practice Tests
              </Link>
              <Link
                href="/select-practice-units"
                className="text-gray-700 hover:text-blue-600 transition-colors font-semibold"
              >
                MCQ Practice
              </Link>
              <Link
                href={`/unitFRQpracticePage?subject=${selectedSubject}&frqId=${selectedSubject === 'macro' ? 1 : 2}`}
                className="text-gray-700 hover:text-blue-600 transition-colors font-semibold"
              >
                FRQ Practice
              </Link>
              <Link
                href="/unit/1"
                className="text-gray-700 hover:text-blue-600 transition-colors font-semibold"
              >
                Unit Cheat Sheets
              </Link>
              <Link
                href="/dojo/infinite"
                className="text-gray-700 hover:text-blue-600 transition-colors font-semibold"
              >
                Create a Quiz
              </Link>

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
                          />
                        </span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${isBeltDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {/* Belt System Dropdown */}
                      {isBeltDropdownOpen && (
                        <div className="absolute top-full right-0 mt-2 w-[400px] z-50">
                          <div className="bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-3">
                            <UserBeltProgress totalXP={xp} animateOnChange={true} />
                          </div>
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>

              {user ? (
                <div className="flex items-center gap-2">
                  <Button onClick={handleLogout} variant="outline" size="sm">
                    Logout
                  </Button>
                </div>
              ) : (
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
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-gray-700 hover:text-blue-600 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <nav className="flex flex-col py-4">
              <Link
                href="/unit-final-practice-tests"
                onClick={closeMobileMenu}
                className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors font-semibold"
              >
                Full Practice Tests
              </Link>
              <Link
                href="/select-practice-units"
                onClick={closeMobileMenu}
                className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors font-semibold"
              >
                MCQ Practice
              </Link>
              <Link
                href={`/unitFRQpracticePage?subject=${selectedSubject}&frqId=${selectedSubject === 'macro' ? 1 : 2}`}
                onClick={closeMobileMenu}
                className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors font-semibold"
              >
                FRQ Practice
              </Link>
              <Link
                href="/unit/1"
                onClick={closeMobileMenu}
                className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors font-semibold"
              >
                Unit Cheat Sheets
              </Link>
              <Link
                href="/dojo/infinite"
                onClick={closeMobileMenu}
                className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors font-semibold"
              >
                Create a Quiz
              </Link>

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
                  
                  {user ? (
                    <>
                      <div className="px-4 py-2">
                        <Button onClick={handleLogout} variant="outline" className="w-full">Logout</Button>
                      </div>
                    </>
                  ) : (
                    <div className="px-4 pt-4 space-y-2">
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

export default Header;
export { Header }; 