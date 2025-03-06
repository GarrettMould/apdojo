'use client';

import Link from "next/link"
import Image from "next/image"
import logo from '../../public/images/logo.png'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuthContext } from '@/contexts/AuthContext'

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

  return (
    <div className="relative">
      <div className="flex items-center justify-between py-4">
      <div className="flex items-center space-x-4">
        <button 
          onClick={handleHomeClick}
            className="hover:opacity-80 transition-opacity"
          >
            <Image
              src={logo}
              alt="AP Dojo"
              width={100}
              height={32}
              className="h-8 w-auto"
            />
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

        {/* Desktop Navigation - Hidden on mobile */}
        <nav className="hidden lg:flex items-center space-x-8">
          <Link href="/tools" className="hover:text-blue-600 transition-colors font-bold">
            Video Library
        </Link>
        <div className="relative group">
            <button className="hover:text-blue-600 transition-colors flex items-center space-x-1 font-bold">
            <span>Practice Exams</span>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          <div className="absolute h-4 w-full" />
          <div className="absolute left-0 hidden group-hover:block mt-2 w-64 bg-white border rounded-md shadow-lg">
              <Link 
              href="/purchase/macro-exams"
              onClick={(e) => handleExamClick(e, 'macro')} 
                className="block px-4 py-2 hover:bg-gray-100 whitespace-nowrap font-bold"
            >
              AP Macro Practice Exams
              </Link>
              <Link 
              href="/purchase/micro-exams"
              onClick={(e) => handleExamClick(e, 'micro')} 
                className="block px-4 py-2 hover:bg-gray-100 whitespace-nowrap font-bold"
              >
                AP Micro Practice Exams
              </Link>
            </div>
          </div>
          {user ? (
            <div className="flex items-center space-x-8">
              <Link
                href="/purchases"
                className="hover:text-blue-600 transition-colors font-bold"
              >
                My Purchases
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

      {/* Mobile Menu - Only visible when menu is open */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b shadow-lg z-50">
          <div className="px-4 py-2">
            <div className="py-2">
              <Link 
                href="/tools" 
                className="block px-4 py-2 hover:bg-gray-100 font-bold"
                onClick={() => setIsMenuOpen(false)}
              >
                Video Library
              </Link>
            </div>
            
            <div className="py-2">
              <div className="font-bold mb-2">Practice Exams</div>
              <Link 
                href="/purchase/macro-exams"
                onClick={(e) => handleExamClick(e, 'macro')} 
                className="block px-4 py-2 hover:bg-gray-100 font-bold"
              >
                AP Macro Practice Exams
              </Link>
              <Link 
                href="/purchase/micro-exams"
                onClick={(e) => handleExamClick(e, 'micro')} 
                className="block px-4 py-2 hover:bg-gray-100 font-bold"
            >
              AP Micro Practice Exams
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 