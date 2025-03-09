'use client';

import Link from "next/link"
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuthContext } from '@/contexts/AuthContext'
import { UserCircle } from 'lucide-react'

export function Header() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuthContext();

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push('/');
    setIsMenuOpen(false);
  };

  const handleExamClick = (e: React.MouseEvent, subject: string) => {
    e.preventDefault();
    router.push(`/purchase/${subject}-exams`);
    setIsMenuOpen(false);
  };

  const handleToolsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push('/interactive-tools');
    setIsMenuOpen(false);
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
  };

  const handlePracticeExamsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push('/purchase/macro-exams');
    setIsMenuOpen(false);
  };

  return (
    <div className="w-full bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
      <div className="flex items-center space-x-4">
        <button 
          onClick={handleHomeClick}
          className="hover:opacity-90 transition-opacity flex items-center"
        >
          <span className="text-3xl font-extrabold text-gray-900">AP</span>
          <span className="ml-1 text-3xl font-extrabold text-blue-600">Dojo</span>
        </button>
      </div>
      
          {/* Hamburger Menu Button - Only visible on mobile */}
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

          {/* Desktop Navigation - Updated with new links */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link 
              href="/tutoring" 
              onClick={handleTutoringClick}
              className="hover:text-blue-600 transition-colors font-bold"
            >
              Private Tutoring
            </Link>
            <Link 
              href="/tools" 
              className="hover:text-blue-600 transition-colors font-bold"
            >
              Video Library
            </Link>
            <Link 
              href="/interactive-tools" 
              onClick={handleToolsClick}
              className="hover:text-blue-600 transition-colors font-bold"
            >
              Interactive Tools
            </Link>
            <Link 
              href="/cheat-sheets" 
              onClick={handleCheatSheetsClick}
              className="hover:text-blue-600 transition-colors font-bold"
            >
              Cheat Sheets
            </Link>
            <Link 
              href="/purchase/macro-exams"
              onClick={handlePracticeExamsClick}
              className="hover:text-blue-600 transition-colors font-bold"
            >
              Practice Exams
            </Link>
            {user ? (
              <div className="flex items-center space-x-8">
                <Link
                  href="/my-purchases"
                  className="hover:text-blue-600 transition-colors"
                  title="My Profile"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                  </svg>
                </Link>
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
                  className="hover:text-blue-600 transition-colors font-bold"
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

      {/* Mobile Menu - Only visible when menu is open */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b shadow-lg z-50">
          <div className="px-4 py-2">
            <div className="py-2">
              <Link 
                href="/tutoring" 
                onClick={handleTutoringClick}
                className="block px-4 py-2 hover:bg-gray-100 font-bold"
              >
                Private Tutoring
              </Link>
              <Link 
                href="/tools" 
                className="block px-4 py-2 hover:bg-gray-100 font-bold"
                onClick={() => setIsMenuOpen(false)}
              >
                Video Library
              </Link>
              <Link 
                href="/interactive-tools" 
                onClick={handleToolsClick}
                className="block px-4 py-2 hover:bg-gray-100 font-bold"
              >
                Interactive Tools
              </Link>
              <Link 
                href="/cheat-sheets" 
                onClick={handleCheatSheetsClick}
                className="block px-4 py-2 hover:bg-gray-100 font-bold"
              >
                Cheat Sheets
              </Link>
              <Link 
                href="/purchase/macro-exams"
                onClick={handlePracticeExamsClick}
                className="block px-4 py-2 hover:bg-gray-100 font-bold"
              >
                Practice Exams
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 