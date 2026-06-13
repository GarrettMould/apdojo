'use client';

import React from 'react';
import Link from 'next/link';
import { FileText, BookOpen, Pencil, PlayCircle, ArrowRight } from 'lucide-react';
import { useAuthContext } from '@/contexts/AuthContext';
import { CourseProvider, useCourseContext, useCourseTheme } from '@/contexts/CourseContext';
import { CourseToggle } from '@/components/CourseToggle';
import { useSubjectSwitchNavigation } from '@/hooks/useSubjectSwitchNavigation';
import { Button } from '@/components/ui/button';

function AlternativeDashboardContent() {
  const { user, userData, selectedSubject } = useAuthContext();
  const handleSubjectSwitch = useSubjectSwitchNavigation();
  const { currentCourse } = useCourseContext();
  const theme = useCourseTheme();
  const subject = currentCourse === 'macro' ? 'macro' : 'micro';
  const subjectName = currentCourse === 'macro' ? 'Macroeconomics' : 'Microeconomics';

  // Redirect to login if not logged in
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-xl font-semibold text-gray-700 mb-4">Please log in to access your dashboard</p>
          <Link href="/login">
            <Button>Go to Login</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Subject Toggle */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-black text-gray-900">
              {subjectName} Dashboard
            </h1>
            <CourseToggle
              activeTab={selectedSubject}
              onToggle={(s) => void handleSubjectSwitch(s, selectedSubject)}
            />
          </div>
        </div>

        {/* Row 1: Final Exams & Unit Exams - Full Width */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Final Exams & Unit Exams</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Final Exams */}
            <Link href={`/unit-final-practice-tests?subject=${subject}`}>
              <div className="bg-white rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-8 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 cursor-pointer h-full">
                <div className="flex items-start gap-4">
                  <div className={`p-4 rounded-lg ${theme.bgColor} flex-shrink-0`}>
                    <FileText className={`w-8 h-8 ${theme.textColor}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-black text-gray-900 mb-2">Full Practice Exams</h3>
                    <p className="text-gray-600 mb-4">
                      Complete full-length AP-style exams with MCQ and FRQ sections
                    </p>
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <span>View Exams</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            {/* Unit Exams */}
            <Link href={`/unit-final-practice-tests?subject=${subject}`}>
              <div className="bg-white rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-8 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 cursor-pointer h-full">
                <div className="flex items-start gap-4">
                  <div className={`p-4 rounded-lg ${theme.bgColor} flex-shrink-0`}>
                    <PlayCircle className={`w-8 h-8 ${theme.textColor}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-black text-gray-900 mb-2">Unit Practice Tests</h3>
                    <p className="text-gray-600 mb-4">
                      Unit-specific practice tests to master each topic
                    </p>
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <span>View Tests</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Row 2: Three Equidistant Columns - MCQ Practice, FRQ Practice, Cheat Sheets */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Practice & Study</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* MCQ Practice */}
            <Link href={`/select-practice-units?subject=${subject}`}>
              <div className="bg-white rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-8 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 cursor-pointer h-full flex flex-col">
                <div className={`p-4 rounded-lg ${theme.bgColor} w-fit mb-4`}>
                  <Pencil className={`w-8 h-8 ${theme.textColor}`} />
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-2">MCQ Practice</h3>
                <p className="text-gray-600 mb-4 flex-1">
                  Practice multiple-choice questions by unit or topic
                </p>
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <span>Start Practicing</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>

            {/* FRQ Practice */}
            <Link href="/unitFRQpracticePage">
              <div className="bg-white rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-8 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 cursor-pointer h-full flex flex-col">
                <div className={`p-4 rounded-lg ${theme.bgColor} w-fit mb-4`}>
                  <FileText className={`w-8 h-8 ${theme.textColor}`} />
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-2">FRQ Practice</h3>
                <p className="text-gray-600 mb-4 flex-1">
                  Practice Free Response Questions with AI grading
                </p>
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <span>Start Practicing</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>

            {/* Unit Cheat Sheets */}
            <Link href={subject === 'macro' ? '/ap-macro-unit-1-cheat-sheet' : '/ap-micro-unit-1-cheat-sheet'}>
              <div className="bg-white rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-8 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 cursor-pointer h-full flex flex-col">
                <div className={`p-4 rounded-lg ${theme.bgColor} w-fit mb-4`}>
                  <BookOpen className={`w-8 h-8 ${theme.textColor}`} />
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-2">Unit Cheat Sheets</h3>
                <p className="text-gray-600 mb-4 flex-1">
                  Interactive study guides and downloadable PDFs for each unit
                </p>
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <span>View Cheat Sheets</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AlternativeDashboard() {
  return (
    <CourseProvider>
      <AlternativeDashboardContent />
    </CourseProvider>
  );
}
