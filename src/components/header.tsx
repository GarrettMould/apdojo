'use client';

import Link from "next/link"
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function Header() {
  const router = useRouter();

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push('/');
  };

  const handleExamClick = (e: React.MouseEvent, subject: string) => {
    e.preventDefault();
    router.push(`/purchase/${subject}-exams`);
  };

  useEffect(() => {
    // Any initialization if needed
  }, []);

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b">
      <div className="flex items-center space-x-4">
        <button 
          onClick={handleHomeClick}
          className="text-2xl font-bold hover:text-gray-600 transition-colors"
        >
          AP Dojo
        </button>
      </div>
      
      <nav className="flex items-center space-x-8">
        <div className="relative group">
          <button className="hover:text-gray-600 transition-colors flex items-center space-x-1">
            <span>Subjects</span>
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <div className="absolute h-4 w-full" />
          <div className="absolute left-0 hidden group-hover:block mt-2 w-48 bg-white border rounded-md shadow-lg">
            <Link href="/macro" className="block px-4 py-2 hover:bg-gray-100">
              AP Macroeconomics
            </Link>
            <Link href="/micro" className="block px-4 py-2 hover:bg-gray-100">
              AP Microeconomics
            </Link>
          </div>
        </div>
        <Link href="/tools" className="hover:text-gray-600 transition-colors">
          Interactive Tools
        </Link>
        <div className="relative group">
          <button className="hover:text-gray-600 transition-colors flex items-center space-x-1">
            <span>Practice Exams</span>
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <div className="absolute h-4 w-full" />
          <div className="absolute left-0 hidden group-hover:block mt-2 w-64 bg-white border rounded-md shadow-lg">
            <a 
              href="/purchase/macro-exams"
              onClick={(e) => handleExamClick(e, 'macro')} 
              className="block px-4 py-2 hover:bg-gray-100 whitespace-nowrap"
            >
              AP Macro Practice Exams
            </a>
            <a 
              href="/purchase/micro-exams"
              onClick={(e) => handleExamClick(e, 'micro')} 
              className="block px-4 py-2 hover:bg-gray-100 whitespace-nowrap"
            >
              AP Micro Practice Exams
            </a>
          </div>
        </div>
      </nav>
    </header>
  )
} 