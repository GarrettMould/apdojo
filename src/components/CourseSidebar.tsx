'use client';

import { useState } from 'react';
import { Globe, FileText, Edit } from 'lucide-react';
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
    isFixed ? 'fixed left-0 top-16 h-screen overflow-y-auto' : ''
  }`;

  return (
    <div className={sidebarClasses}>
      <div className="p-6">
        {/* Course Header */}
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
            <Globe className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">AP Macroeconomics</h1>
            <p className="text-sm text-gray-500">6 UNITS · 53 VIDEOS</p>
          </div>
        </div>

        {/* Unit Navigation */}
        <div className="space-y-1">
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
                        ? 'bg-blue-50 border-l-4 border-blue-500' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                      Unit {unitNumber}
                    </div>
                    <div className={`text-sm font-medium ${
                      isSelected ? 'text-blue-600' : 'text-gray-900'
                    }`}>
                      {unitName}
                    </div>
                  </button>
                ) : (
                  <Link
                    href={`/unit/${unitNumber}`}
                    className={`block w-full text-left p-3 rounded-lg transition-colors duration-200 ${
                      isSelected 
                        ? 'bg-blue-50 border-l-4 border-blue-500' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                      Unit {unitNumber}
                    </div>
                    <div className={`text-sm font-medium ${
                      isSelected ? 'text-blue-600' : 'text-gray-900'
                    }`}>
                      {unitName}
                    </div>
                  </Link>
                )}
              </div>
            );
          })}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-6"></div>

        {/* Full Exams */}
        <div className="space-y-1">
          <Link
            href="/full-mcq-exam"
            className="block w-full text-left p-3 rounded-lg transition-colors duration-200 hover:bg-gray-50"
          >
            <div className="flex items-center">
              <FileText className="w-4 h-4 text-gray-500 mr-3" />
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
            className="block w-full text-left p-3 rounded-lg transition-colors duration-200 hover:bg-gray-50"
          >
            <div className="flex items-center">
              <Edit className="w-4 h-4 text-gray-500 mr-3" />
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