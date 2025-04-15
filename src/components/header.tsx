'use client';

import Link from "next/link"
import dojoIcon from "../../public/images/dojoIcon.png"
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { useAuthContext } from '@/contexts/AuthContext'
import { UserCircle, ChevronDown } from 'lucide-react'

export function Header() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMcqDropdownOpen, setIsMcqDropdownOpen] = useState(false);
  const { user, logout } = useAuthContext();
  const mcqDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mcqDropdownRef.current && !mcqDropdownRef.current.contains(event.target as Node)) {
        setIsMcqDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push('/');
    setIsMenuOpen(false);
    setIsMcqDropdownOpen(false);
  };

  const handleExamClick = (e: React.MouseEvent, subject: string) => {
    e.preventDefault();
    router.push(`/purchase/${subject}-exams`);
    setIsMenuOpen(false);
  };

  const handleToolsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push('/interactive-tools/flashcards');
    setIsMenuOpen(false);
    setIsMcqDropdownOpen(false);
  };

  const handleTutoringClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push('/tutoring');
    setIsMenuOpen(false);
  };

  const handleCheatSheetsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push('/cheat-sheets');
    setIsMenuOpen(false);
    setIsMcqDropdownOpen(false);
  };

  const handlePracticeExamsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push('/purchase/exams');
    setIsMenuOpen(false);
    setIsMcqDropdownOpen(false);
  };

  const handleVideoLibraryClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push('/videos/macro');
    setIsMenuOpen(false);
    setIsMcqDropdownOpen(false);
  };

  return (
    <div className="w-full bg-white border-b relative z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
      <div className="flex items-center space-x-4">
        <button 
          onClick={handleHomeClick}
              className="hover:opacity-90 transition-opacity flex items-center gap-4"
        >
          <Image 
            src={dojoIcon}
            alt="Dojo Icon"
            width={40}
            height={40}
            className="object-contain"
          />
          <div className="flex items-center">
            <span className="text-2xl font-extrabold">AP</span>
            <span className="ml-1 text-2xl font-extrabold text-blue-500">Dojo</span>
          </div>
        </button>
      </div>
      
          {/* Hamburger Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-md"
          >
            {!isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            )}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {/* Comment out private tutoring link */}
            {/* <Link 
              href="/tutoring" 
              onClick={handleTutoringClick}
              className="hover:text-blue-700 transition-colors font-bold text-sm"
            >
              Private Tutoring
            </Link> */}
            <Link 
              href="/videos/macro" 
              onClick={handleVideoLibraryClick}
              className="hover:text-blue-700 transition-colors font-bold text-sm"
            >
              Video Library
            </Link>
            <Link 
              href="/interactive-tools/flashcards"
              onClick={handleToolsClick}
              className="hover:text-blue-700 transition-colors font-bold text-sm"
            >
              Flashcards
            </Link>
            <Link 
              href="/cheat-sheets" 
              onClick={handleCheatSheetsClick}
              className="hover:text-blue-700 transition-colors font-bold text-sm"
            >
              Cheat Sheets
            </Link>
            <Link 
              href="/purchase/exams"
              onClick={handlePracticeExamsClick}
              className="hover:text-blue-700 transition-colors font-bold   text-sm"
            >
              Practice Exams
            </Link>
            {/* Commenting out Quiz.Me link
            <Link 
              href="/quizMeTester"
              className="hover:text-blue-700 transition-colors font-bold text-sm"
            >
              Quiz.Me
            </Link>
            */}
            <div className="relative" ref={mcqDropdownRef}>
              <button 
                onClick={() => setIsMcqDropdownOpen(!isMcqDropdownOpen)}
                className="flex items-center gap-1 hover:text-blue-700 transition-colors font-bold text-sm focus:outline-none"
              >
                Unit MCQs
                <ChevronDown className={`w-4 h-4 transition-transform ${isMcqDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {isMcqDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-10">
                  <Link
                    href="/unitMCQPracticePage?subject=macro"
                    onClick={() => setIsMcqDropdownOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                  >
                    AP Macro MCQs
                  </Link>
                  <Link
                    href="/unitMCQPracticePage?subject=micro"
                    onClick={() => setIsMcqDropdownOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                  >
                    AP Micro MCQs
                  </Link>
                </div>
              )}
            </div>
            {user ? (
              <div className="flex items-center space-x-8">
                {/* Comment out profile icon/link */}
                {/* <Link
                  href="/my-purchases"
                  className="hover:text-blue-700 transition-colors"
                  title="My Profile"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                  </svg>
                </Link> */}
                <button
                  onClick={() => logout()}
                  className="px-6 py-2 text-sm font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-8">
                <Link
                  href="/login"
                  className="text-blue-600 hover:text-blue-700 transition-colors font-bold text-sm"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-8 py-2 text-sm font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b shadow-lg">
          <div className="px-4 py-2">
            <div className="py-2">
              <Link 
                href="/videos/macro" 
                onClick={(e) => {
                  handleVideoLibraryClick(e);
                  setIsMenuOpen(false);
                }}
                className="block px-4 py-2 hover:bg-gray-100 font-bold text-sm"
              >
                Video Library
              </Link>
              <Link 
                href="/interactive-tools/flashcards"
                onClick={(e) => {
                  handleToolsClick(e);
                  setIsMenuOpen(false);
                }}
                className="block px-4 py-2 hover:bg-gray-100 font-bold text-sm"
              >
                Flashcards
              </Link>
              <Link 
                href="/cheat-sheets" 
                onClick={(e) => {
                    handleCheatSheetsClick(e);
                    setIsMenuOpen(false);
                }}
                className="block px-4 py-2 hover:bg-gray-100 font-bold text-sm"
              >
                Cheat Sheets
              </Link>
              <Link 
                href="/purchase/exams"
                 onClick={(e) => {
                    handlePracticeExamsClick(e);
                    setIsMenuOpen(false);
                 }}
                className="block px-4 py-2 hover:bg-gray-100 font-bold text-sm"
              >
                Practice Exams
              </Link>
              
              {/* Unit MCQs Dropdown - Mobile */}
              <div className="block px-4 py-2 font-bold text-sm text-gray-500">Unit MCQs</div>
              <Link 
                href="/unitMCQPracticePage?subject=macro"
                onClick={() => setIsMenuOpen(false)}
                className="block pl-8 pr-4 py-2 hover:bg-gray-100 font-medium text-sm text-gray-700 hover:text-blue-600"
              >
                AP Macro MCQs
              </Link>
              <Link 
                href="/unitMCQPracticePage?subject=micro"
                onClick={() => setIsMenuOpen(false)}
                className="block pl-8 pr-4 py-2 hover:bg-gray-100 font-medium text-sm text-gray-700 hover:text-blue-600"
              >
                AP Micro MCQs
              </Link>
              
               {/* ... (Mobile Auth buttons remain the same) ... */}
              {!user ? (
                <div className="border-t mt-2 pt-2">
                  <Link
                    href="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 hover:bg-gray-100 font-bold text-sm text-blue-600 mb-3"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setIsMenuOpen(false)}
                    className="inline-block px-6 py-2 hover:bg-blue-700 font-bold text-sm bg-blue-600 text-white rounded-md ml-4"
                  >
                    Sign Up
                  </Link>
                </div>
              ) : (
                <div className="border-t mt-2 pt-2">
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 font-bold text-sm text-blue-600"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 