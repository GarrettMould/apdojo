'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import dojoIcon from "../../public/images/dojoIcon.png";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCoursesDropdownOpen, setIsCoursesDropdownOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleCoursesDropdown = () => {
    setIsCoursesDropdownOpen(!isCoursesDropdownOpen);
  };

  const closeCoursesDropdown = () => {
    // Add a small delay to ensure the link navigation works before closing
    setTimeout(() => {
      setIsCoursesDropdownOpen(false);
    }, 150);
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

          {/* Desktop Navigation - Hidden on mobile */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* Courses Dropdown */}
            <div className="relative">
              <button
                onClick={toggleCoursesDropdown}
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors font-semibold py-2"
              >
                <span>Courses</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isCoursesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Dropdown Menu */}
              {isCoursesDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="py-2">
                    <Link
                      href="/ap-macro-course"
                      onClick={closeCoursesDropdown}
                      className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors border-b border-gray-100"
                    >
                      <div className="font-semibold">AP Macroeconomics</div>
                      <div className="text-sm text-gray-500">40+ videos • 100s of practice problems</div>
                    </Link>
                    <Link
                      href="#"
                      onClick={closeCoursesDropdown}
                      className="block px-4 py-3 text-gray-400 cursor-not-allowed"
                    >
                      <div className="font-semibold">AP Microeconomics</div>
                      <div className="text-sm text-gray-400">Coming Soon</div>
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
            {/*
            <Link
              href="/unit-final-practice-tests"
              className="text-gray-700 hover:text-blue-600 transition-colors font-semibold"
            >
              Practice Tests
            </Link>
            */}
            
            <Link
              href="/select-practice-units?subject=macro"
              className="text-gray-700 hover:text-blue-600 transition-colors font-semibold"
            >
              MCQ Practice
            </Link>
            
            <Link
              href="/unit-study-guides"
              className="text-gray-700 hover:text-blue-600 transition-colors font-semibold"
            >
              Unit Cheat Sheets
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <nav className="flex flex-col py-4 space-y-4">
              {/* Mobile Courses Section */}
              <div className="px-4 py-2">
                <div className="font-semibold text-gray-900 mb-2">Courses</div>
                <div className="space-y-2 ml-4">
                  <Link
                    href="/ap-macro-course"
                    onClick={closeMobileMenu}
                    className="block py-2 text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    AP Macroeconomics
                  </Link>
                  <Link
                    href="#"
                    onClick={closeMobileMenu}
                    className="block py-2 text-gray-400 cursor-not-allowed"
                  >
                    AP Microeconomics
                  </Link>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                {/*
                              <Link
                href="/unit-final-practice-tests"
                onClick={closeMobileMenu}
                className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors font-semibold"
              >
                Practice Tests
              </Link>
                */}
                              <Link
                href="/select-practice-units?subject=macro"
                onClick={closeMobileMenu}
                className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors font-semibold"
              >
                MCQ Practice
              </Link>
                
                <Link
                  href="/unit-study-guides"
                  onClick={closeMobileMenu}
                  className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors font-semibold"
                >
                  Unit Cheat Sheets
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
} 