'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import dojoIcon from "../../public/images/dojoIcon.png";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
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
            </nav>
          </div>
        )}
      </div>
    </header>
  );
} 