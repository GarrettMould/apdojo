'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import dojoIcon from "../../public/images/dojoIcon.png";
import { 
  ChevronDown, 
  BookOpen, 
  MessageCircle, 
  User,
  Home,
  Target,
  ListChecks,
  Bot,
  FileText,
  PlaySquare,
  BookCopy,
  MessageSquare,
  GraduationCap
} from 'lucide-react';

export function Header() {
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [isStudyToolsOpen, setIsStudyToolsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pl-0">
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

          {/* Navigation */}
          <nav className="flex items-center space-x-8">
            {/* Courses Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsCoursesOpen(!isCoursesOpen);
                  setIsStudyToolsOpen(false);
                }}
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors font-semibold"
              >
                <span>Courses</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {isCoursesOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <Link
                    href="/ap-macro-course"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    onClick={() => setIsCoursesOpen(false)}
                  >
                    AP Macroeconomics
                  </Link>
                  {/* Add more courses here as needed */}
                </div>
              )}
            </div>

            {/* Study Tools Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsStudyToolsOpen(!isStudyToolsOpen);
                  setIsCoursesOpen(false);
                }}
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors font-semibold"
              >
                <span>Study Tools</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {isStudyToolsOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <Link
                    href="/"
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    onClick={() => setIsStudyToolsOpen(false)}
                  >
                    <Home className="w-4 h-4 mr-3" />
                    Home
                  </Link>
                  <Link
                    href="/ap-macro-course"
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    onClick={() => setIsStudyToolsOpen(false)}
                  >
                    <GraduationCap className="w-4 h-4 mr-3" />
                    AP Macro Course
                  </Link>
                  <Link
                    href="/unit/1"
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    onClick={() => setIsStudyToolsOpen(false)}
                  >
                    <BookCopy className="w-4 h-4 mr-3" />
                    Unit Study Guides
                  </Link>
                  <Link
                    href="/videos/macro"
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    onClick={() => setIsStudyToolsOpen(false)}
                  >
                    <PlaySquare className="w-4 h-4 mr-3" />
                    Video Library
                  </Link>
                  <Link
                    href="/focusedPracticePreview"
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    onClick={() => setIsStudyToolsOpen(false)}
                  >
                    <Target className="w-4 h-4 mr-3" />
                    Focused Practice
                  </Link>
                  <Link
                    href="/select-practice-units?subject=macro"
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    onClick={() => setIsStudyToolsOpen(false)}
                  >
                    <ListChecks className="w-4 h-4 mr-3" />
                    Unit MCQs
                  </Link>
                  <Link
                    href="/aiFRQHelper"
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    onClick={() => setIsStudyToolsOpen(false)}
                  >
                    <Bot className="w-4 h-4 mr-3" />
                    AI FRQ Helper
                  </Link>
                  <Link
                    href="/purchase/exams"
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    onClick={() => setIsStudyToolsOpen(false)}
                  >
                    <FileText className="w-4 h-4 mr-3" />
                    Practice Exams
                  </Link>
                  <Link
                    href="/async-tutoring"
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    onClick={() => setIsStudyToolsOpen(false)}
                  >
                    <MessageSquare className="w-4 h-4 mr-3" />
                    Async Tutoring
                  </Link>
                  <Link
                    href="/macro-video-library"
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    onClick={() => setIsStudyToolsOpen(false)}
                  >
                    <PlaySquare className="w-4 h-4 mr-3" />
                    TEST: Macro Video Library
                  </Link>
                </div>
              )}
            </div>

            {/* Tutoring Link */}
            <Link
              href="/async-tutoring"
              className="text-gray-700 hover:text-blue-600 transition-colors font-semibold"
            >
              Tutoring
            </Link>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Backdrop for dropdowns */}
      {(isCoursesOpen || isStudyToolsOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setIsCoursesOpen(false);
            setIsStudyToolsOpen(false);
          }}
        />
      )}
    </header>
  );
} 