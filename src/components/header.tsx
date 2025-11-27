'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import dojoIcon from "../../public/images/dojoIcon.png";
import { useAuthContext } from '@/contexts/AuthContext';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

export function Header() {
  const { user, logout, selectedSubject, setSelectedSubject } = useAuthContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCoursesDropdownOpen, setIsCoursesDropdownOpen] = useState(false);
  const [isTutoringDropdownOpen, setIsTutoringDropdownOpen] = useState(false);
  const router = useRouter();

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

          {/* Desktop Navigation, User Icon, and Auth Buttons */}
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
                href="/unit/1"
                className="text-gray-700 hover:text-blue-600 transition-colors font-semibold"
              >
                Unit Cheat Sheets
              </Link>

              {/* Tutoring Dropdown */}
              <div 
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
              </div>
            </nav>

            {/* Subject Segmented Control & User Icon & Auth Buttons */}
            <div className="flex items-center gap-3">
              {/* Subject Segmented Control */}
              <div className="inline-flex items-center bg-gray-100 rounded-lg p-1 border border-gray-200">
                <button
                  onClick={() => setSelectedSubject('macro')}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
                    selectedSubject === 'macro'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Macro
                </button>
                <button
                  onClick={() => setSelectedSubject('micro')}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
                    selectedSubject === 'micro'
                      ? 'bg-white text-green-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Micro
                </button>
              </div>
              
              {user ? (
                <>
                  <Button onClick={handleLogout} variant="outline" size="sm">Logout</Button>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <Link href="/login" passHref>
                    <Button variant="outline" size="sm">Login</Button>
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
                  href="/unit/1"
                  onClick={closeMobileMenu}
                  className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors font-semibold"
                >
                  Unit Cheat Sheets
                </Link>

                {/* Tutoring Dropdown (Mobile) */}
                <div className="px-4 py-2">
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
                </div>

                <div className="border-t border-gray-200 mt-4 pt-4">
                  {/* Subject Segmented Control (Mobile) */}
                  <div className="px-4 py-2">
                    <div className="inline-flex items-center w-full bg-gray-100 rounded-lg p-1 border border-gray-200">
                      <button
                        onClick={() => {
                          setSelectedSubject('macro');
                          closeMobileMenu();
                        }}
                        className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                          selectedSubject === 'macro'
                            ? 'bg-white text-blue-600 shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        Macro
                      </button>
                      <button
                        onClick={() => {
                          setSelectedSubject('micro');
                          closeMobileMenu();
                        }}
                        className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                          selectedSubject === 'micro'
                            ? 'bg-white text-green-600 shadow-sm'
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