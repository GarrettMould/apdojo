'use client';

import { useState } from 'react';
import { Globe, FileText, Edit, Play, CheckCircle } from 'lucide-react';
import { apMacroCourseInfo } from '@/data/courseInfo';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface CourseSidebarProps {
  selectedUnit?: string;
  onUnitChange?: (unit: string) => void;
  isFixed?: boolean;
}

export function CourseSidebar({ selectedUnit = '1', onUnitChange, isFixed = false }: CourseSidebarProps) {
  const pathname = usePathname();
  const isOnCoursePage = pathname === '/ap-macro-course';
  
  const handleUnitClick = (unitNumber: string) => {
    if (onUnitChange) {
      onUnitChange(unitNumber);
    }
  };

  const sidebarClasses = `w-80 bg-white border-r border-gray-200 flex-shrink-0 ${
    isFixed ? 'fixed left-0 top-16 h-[calc(100vh-4rem)] overflow-y-auto z-40' : ''
  }`;

  return (
    <div className={sidebarClasses}>
      <div className="p-6 pb-8">
        {/* Course Header */}
        <div className="mb-6">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">AP Macroeconomics</h1>
            </div>
          </div>
        </div>

        {/* Unit Navigation */}
        <div className="space-y-2 mb-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Course Units</h2>
          {apMacroCourseInfo.units.map((unit, index) => {
            const unitNumber = unit.unit.split(':')[0].split(' ')[1];
            const unitName = unit.unit.split(':')[1]?.trim() || unit.unit;
            const isSelected = selectedUnit === unitNumber;
            
            return (
              <div key={unitNumber}>
                {isOnCoursePage ? (
                  <button
                    onClick={() => handleUnitClick(unitNumber)}
                    className={`w-full text-left p-3 rounded-lg transition-colors duration-200 ${
                      isSelected 
                        ? 'bg-blue-50 border border-blue-200' 
                        : 'bg-white border border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        isSelected ? 'bg-blue-500' : 'bg-gray-100'
                      }`}>
                        {isSelected ? (
                          <CheckCircle className="w-4 h-4 text-white" />
                        ) : (
                          <span className="text-xs font-bold text-gray-600">{unitNumber}</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                          Unit {unitNumber}
                        </div>
                        <div className={`text-sm font-medium ${
                          isSelected ? 'text-blue-600' : 'text-gray-900'
                        }`}>
                          {unitName}
                        </div>
                      </div>
                    </div>
                  </button>
                ) : (
                  <Link
                    href={`/ap-macro-course?unit=${unitNumber}`}
                    className={`block w-full text-left p-3 rounded-lg transition-colors duration-200 ${
                      isSelected 
                        ? 'bg-blue-50 border border-blue-200' 
                        : 'bg-white border border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        isSelected ? 'bg-blue-500' : 'bg-gray-100'
                      }`}>
                        {isSelected ? (
                          <CheckCircle className="w-4 h-4 text-white" />
                        ) : (
                          <span className="text-xs font-bold text-gray-600">{unitNumber}</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                          Unit {unitNumber}
                        </div>
                        <div className={`text-sm font-medium ${
                          isSelected ? 'text-blue-600' : 'text-gray-900'
                        }`}>
                          {unitName}
                        </div>
                      </div>
                    </div>
                  </Link>
                )}
              </div>
            );
          })}
        </div>

        {/* Full Exams */}
        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Practice Exams</h2>
          
          <Link
            href="/full-mcq-exam"
            className="block w-full text-left p-3 rounded-lg transition-colors duration-200 bg-white border border-gray-200 hover:border-blue-300 hover:bg-blue-50"
          >
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                <FileText className="w-3 h-3 text-green-600" />
              </div>
              <div>
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                  Full Exam
                </div>
                <div className="text-sm font-medium text-gray-900">
                  MCQ Exam
                </div>
              </div>
            </div>
          </Link>
          
          <Link
            href="/full-frq-exam"
            className="block w-full text-left p-3 rounded-lg transition-colors duration-200 bg-white border border-gray-200 hover:border-blue-300 hover:bg-blue-50"
          >
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                <Edit className="w-3 h-3 text-purple-600" />
              </div>
              <div>
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                  Full Exam
                </div>
                <div className="text-sm font-medium text-gray-900">
                  FRQ Exam
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
} 