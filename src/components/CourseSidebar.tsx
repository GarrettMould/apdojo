'use client';

import { useState } from 'react';
import { Globe, FileText, Edit, Play, CheckCircle, Lock, ChevronRight, ChevronDown, Home, BookOpen, Target, TrendingUp, ArrowRight, Brain } from 'lucide-react';
import { apMacroCourseInfo } from '@/data/courseInfo';
import { videos as allVideos } from '@/data/videos';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'; // Added for useEffect
import { useAuthContext } from '@/contexts/AuthContext';
import { getUnitMCQTestUrl } from '@/lib/utils';

interface CourseSidebarProps {
  selectedUnit?: string;
  onUnitChange?: (unit: string) => void;
  isFixed?: boolean;
  currentLessonId?: string; // Add prop for current lesson ID
}

export function CourseSidebar({ selectedUnit = '1', onUnitChange, isFixed = false, currentLessonId }: CourseSidebarProps) {
  const pathname = usePathname();
  const { selectedSubject } = useAuthContext();
  const isOnCoursePage = pathname === '/ap-macro-course';
  const isOnLessonPage = pathname.includes('/videos/') || pathname.includes('/video-comprehension-checks/');
  const isOnUnitTestPage = pathname.includes('/unit-mcq-test/') || pathname.includes('/ap-macro-unit-') || pathname.includes('/ap-micro-unit-') || pathname.includes('/unit-frq-test/');
  const [expandedLessons, setExpandedLessons] = useState<Set<string>>(new Set()); // Track expanded lessons
  
  const handleUnitClick = (unitNumber: string) => {
    if (onUnitChange) {
      onUnitChange(unitNumber);
    }
  };

  const toggleLessonExpansion = (lessonId: string) => {
    const newExpanded = new Set(expandedLessons);
    if (newExpanded.has(lessonId)) {
      // If clicking the same lesson, close it
      newExpanded.delete(lessonId);
    } else {
      // If opening a new lesson, close all others and open this one
      newExpanded.clear();
      newExpanded.add(lessonId);
    }
    setExpandedLessons(newExpanded);
  };

  // Auto-expand lesson if user is on a video or comprehension check page
  React.useEffect(() => {
    if (isOnLessonPage || isOnUnitTestPage) {
      const currentVideo = allVideos.find(video => 
        (pathname.includes('/videos/') && pathname.includes(video.videoSlug)) ||
        (pathname.includes('/video-comprehension-checks/') && pathname.includes(video.videoSlug))
      );
      
      if (currentVideo && currentVideo.lessonIDS[0]) {
        setExpandedLessons(prev => new Set([...prev, currentVideo.lessonIDS[0]]));
      }
    }
  }, [pathname, isOnLessonPage, isOnUnitTestPage, allVideos]);

  const sidebarClasses = `w-80 bg-white border-r border-gray-100 flex-shrink-0 ${
    isFixed ? 'fixed left-0 top-20 h-[calc(100vh-5rem)] overflow-y-auto z-40' : ''
  }`;

  return (
    <div className={sidebarClasses}>
      <div className="p-6">
        {/* Course Header */}


        {/* Course Units - Different behavior based on page type */}
        {isOnCoursePage ? (
          // Course Page: Units are clickable with card-based design
          <div className="space-y-3">
            {apMacroCourseInfo.units.map((unit, index) => {
              const unitNumber = unit.unit.split(':')[0].split(' ')[1];
              const unitName = unit.unit.split(':')[1]?.trim() || unit.unit;
              const isSelected = selectedUnit === unitNumber;
              const isLocked = parseInt(unitNumber) > 1; // MVP: Only Unit 1 is accessible
              
              // Get unit videos for progress calculation
              const unitVideos = allVideos.filter(video => 
                video.subjects.includes('AP Macroeconomics') && 
                video.unit === unitNumber
              );
              
              // Calculate progress metrics
              const totalLessons = unitVideos.length;
              const totalQuestions = unitVideos.reduce((sum, video) => sum + (video.questions?.length || 0), 0);
              
              // Override with specific counts for certain units
              let displayLessons = totalLessons;
              let displayQuestions = totalQuestions;
              
              if (unitNumber === '4' || unitNumber === '5') {
                displayLessons = 7;
                displayQuestions = 36;
              } else if (unitNumber === '6') {
                displayLessons = 6;
                displayQuestions = 33;
              }
              
              return (
                <div key={unitNumber} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => !isLocked && handleUnitClick(unitNumber)}
                    disabled={isLocked}
                    className={`w-full text-left px-4 py-4 transition-colors relative ${
                      isSelected 
                        ? 'bg-blue-50 text-blue-700' 
                        : isLocked
                        ? 'bg-gray-50 text-gray-500 cursor-not-allowed opacity-60'
                        : 'bg-white hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute right-0 top-0 bottom-0 w-1 bg-blue-500"></div>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900 mb-2">
                          Unit {unitNumber}: {unitName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {displayLessons} lessons • {displayQuestions} questions total
                        </div>
                      </div>
                      {isLocked && (
                        <Lock className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        ) : (isOnLessonPage || isOnUnitTestPage) ? (
          // Lesson Pages & Unit Test Pages: Clean, streamlined lesson navigation
          <div className="space-y-4">
            {/* Back to Course */}
            <Link
              href="/ap-macro-course"
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors group"
            >
              <ChevronRight className="w-4 h-4 text-gray-400 rotate-180 group-hover:text-gray-600" />
              <span>Back to Course</span>
            </Link>

            {(() => {
              // Find current unit info
              const currentUnitInfo = apMacroCourseInfo.units.find(u => u.unit.startsWith(`Unit ${selectedUnit}:`));
              const unitName = currentUnitInfo ? currentUnitInfo.unit.split(': ')[1] : '';

              return (
                <>
                  {/* Unit Header */}
                  <div className="px-3">
                    <h2 className="text-lg font-semibold text-gray-900 mb-1">Unit {selectedUnit}</h2>
                    <p className="text-sm text-gray-500">{unitName}</p>
                  </div>

                  {/* Lesson Navigation */}
                  <div className="space-y-1">
                    {(() => {
                      // Get videos for the selected unit and group by lesson ID
                      const unitVideos = allVideos
                        .filter(video => 
                          video.subjects.includes('AP Macroeconomics') && 
                          video.unit === selectedUnit &&
                          video.videoSlug !== 'mcq-explanations'
                        )
                        .sort((a, b) => {
                          const aLesson = a.lessonIDS[0] ? parseFloat(a.lessonIDS[0]) : 0;
                          const bLesson = b.lessonIDS[0] ? parseFloat(b.lessonIDS[0]) : 0;
                          if (aLesson !== bLesson) return aLesson - bLesson;
                          
                          // Secondary sort: "Practice" videos should come after main video
                          const aIsPractice = a.title.toLowerCase().includes('practice');
                          const bIsPractice = b.title.toLowerCase().includes('practice');
                          if (aIsPractice && !bIsPractice) return 1;
                          if (!aIsPractice && bIsPractice) return -1;
                          
                          return 0; // Or further sort by ID if needed
                        });
                      
                      // Group videos by lesson ID
                      const lessonGroups = new Map<string, typeof unitVideos>();
                      unitVideos.forEach(video => {
                        const lessonId = video.lessonIDS[0];
                        if (lessonId) {
                          const baseLessonId = lessonId.substring(0, 3); // "1.31" -> "1.3"
                          if (!lessonGroups.has(baseLessonId)) {
                            lessonGroups.set(baseLessonId, []);
                          }
                          lessonGroups.get(baseLessonId)!.push(video);
                        }
                      });
                      
                      // Sort lessons and create lesson items
                      const sortedLessons = Array.from(lessonGroups.entries())
                        .sort(([a], [b]) => parseFloat(a) - parseFloat(b));
                      
                      return sortedLessons.map(([lessonId, videos]) => {
                        const isCurrentLesson = currentLessonId === lessonId;
                        const isExpanded = expandedLessons.has(lessonId);
                        
                        // Get lesson title from first video
                        const lessonTitle = videos[0]?.title.split(':')[0] || lessonId;
                        
                        return (
                          <div key={lessonId} className="border border-gray-200 rounded-lg overflow-hidden">
                            {/* Lesson Header */}
                            <button
                              onClick={() => toggleLessonExpansion(lessonId)}
                              className={`w-full text-left px-3 py-2.5 transition-colors h-12 flex items-center ${
                                isCurrentLesson
                                  ? 'bg-blue-50 border-blue-200 text-blue-700' 
                                  : 'bg-white hover:bg-gray-50 text-gray-700'
                              }`}
                            >
                              <div className="flex items-center justify-between w-full">
                                <div className="flex items-center gap-2 min-w-0 flex-1">
                                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                                    isCurrentLesson ? 'bg-blue-500' : 'bg-gray-300'
                                  }`} />
                                  <span className="text-sm font-medium truncate">
                                    {lessonId}: {lessonTitle}
                                  </span>
                                </div>
                                <ChevronRight 
                                  className={`w-4 h-4 text-gray-400 transition-transform flex-shrink-0 ${
                                    isExpanded ? 'rotate-90' : ''
                                  }`} 
                                />
                              </div>
                            </button>
                            
                            {/* Lesson Content */}
                            {isExpanded && (
                              <div className="bg-gray-50 border-t border-gray-200">
                                <div className="p-2 space-y-1">
                                  {videos.map((video, index) => {
                                    const isOnVideoPage = pathname.includes('/videos/') && pathname.includes(video.videoSlug);
                                    const isOnComprehensionPage = pathname.includes('/video-comprehension-checks/') && pathname.includes(video.videoSlug);
                                    
                                    return (
                                      <div key={video.id} className="space-y-1">
                                        {/* Video Link */}
                                        <Link
                                          href={`/videos/macro/${video.videoSlug}`}
                                          className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                                            isOnVideoPage
                                              ? 'bg-blue-100 text-blue-700 font-medium' 
                                              : 'text-gray-600 hover:bg-white hover:text-gray-900'
                                          }`}
                                        >
                                          <div className="flex items-center gap-2">
                                            <Play className="w-3 h-3" />
                                            <span>Video</span>
                                          </div>
                                        </Link>
                                        
                                        {/* Comprehension Check Link */}
                                        <Link
                                          href={`/video-comprehension-checks/${video.videoSlug}`}
                                          className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                                            isOnComprehensionPage
                                              ? 'bg-blue-100 text-blue-700 font-medium' 
                                              : 'text-gray-600 hover:bg-white hover:text-gray-900'
                                          }`}
                                        >
                                          <div className="flex items-center gap-2">
                                            <Brain className="w-3 h-3" />
                                            <span>Quiz</span>
                                          </div>
                                        </Link>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      });
                    })()}
                  </div>

                  {/* MCQ Test Section */}
                  <div className="border-t border-gray-200 pt-4">
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <button
                        disabled={true}
                        className="w-full text-left px-3 py-2.5 transition-colors h-12 flex items-center bg-gray-50 text-gray-500 cursor-not-allowed opacity-60"
                      >
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center gap-2 min-w-0 flex-1">
                            <div className="w-2 h-2 rounded-full flex-shrink-0 bg-gray-300" />
                            <span className="text-sm font-medium">Unit Test</span>
                          </div>
                          <Lock className="w-4 h-4 text-gray-400" />
                        </div>
                      </button>
                      
                      {/* Unit Test Content */}
                      {false && expandedLessons.has('mcq-test') && (
                        <div className="bg-gray-50 border-t border-gray-200">
                          <div className="p-2 space-y-1">
                            <Link
                              href={getUnitMCQTestUrl(parseInt(selectedUnit), selectedSubject)}
                              className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                                pathname.includes(`/unit-mcq-test/${selectedUnit}`) || pathname.includes(`/ap-${selectedSubject}-unit-${selectedUnit}-mcq-test`)
                                  ? 'bg-green-100 text-green-700 font-medium' 
                                  : 'text-gray-600 hover:bg-white hover:text-gray-900'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <FileText className="w-3 h-3" />
                                <span>MCQ Test</span>
                              </div>
                            </Link>
                            <Link
                              href="/videos/macro/mcq-explanations"
                              className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                                pathname.includes('/mcq-explanations')
                                  ? 'bg-green-100 text-green-700 font-medium' 
                                  : 'text-gray-600 hover:bg-white hover:text-gray-900'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <Play className="w-3 h-3" />
                                <span>MCQ Explanations</span>
                              </div>
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )
            })()}
          </div>
        ) : null}
      </div>
    </div>
  );
} 