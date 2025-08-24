'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Play, FileText, Lock } from 'lucide-react';
import { videos as allVideos, Video as VideoType } from '@/data/videos';
import { apMacroCourseInfo } from '@/data/courseInfo';
import { CourseSidebar } from '@/components/CourseSidebar';

function APMacroCoursePageContent() {
  const [selectedUnit, setSelectedUnit] = useState<string>('1');
  const searchParams = useSearchParams();
  
  // Handle unit query parameter
  useEffect(() => {
    const unitParam = searchParams.get('unit');
    if (unitParam) {
      setSelectedUnit(unitParam);
    }
  }, [searchParams]);

  // MVP: Only allow access to Unit 1
  const isUnitLocked = parseInt(selectedUnit) > 1;
  
  // Filter AP Macro videos for the selected unit and sort by lesson ID (exclude MCQ Explanations)
  const unitVideos = allVideos
    .filter(video => 
      video.subjects.includes('AP Macroeconomics') && 
      video.unit === selectedUnit &&
      video.videoSlug !== 'mcq-explanations'
    )
    .sort((a, b) => {
      const aLesson = a.lessonIDS[0] ? parseFloat(a.lessonIDS[0]) : 0;
      const bLesson = b.lessonIDS[0] ? parseFloat(b.lessonIDS[0]) : 0;
      
      // If lessons are different, sort normally (1.1, 1.2, 1.3, 1.4, 1.5, 1.6)
      if (aLesson !== bLesson) {
        return aLesson - bLesson;
      }
      
      // If lessons are the same (e.g., both 1.3), use custom ordering
      if (aLesson === 1.3) {
        // For lesson 1.3, order: main lesson first, then output questions, then input questions
        const aTitle = a.title.toLowerCase();
        const bTitle = b.title.toLowerCase();
        
        // Main lesson first
        if (aTitle.includes('comparative advantage and trade') && !bTitle.includes('comparative advantage and trade')) return -1;
        if (bTitle.includes('comparative advantage and trade') && !aTitle.includes('comparative advantage and trade')) return 1;
        
        // Output questions second
        if (aTitle.includes('output') && !bTitle.includes('output')) return -1;
        if (bTitle.includes('output') && !aTitle.includes('output')) return 1;
        
        // Input questions last
        if (aTitle.includes('input') && !bTitle.includes('input')) return -1;
        if (bTitle.includes('input') && !aTitle.includes('input')) return 1;
      }
      
      // For other lessons, sort by video ID
      return a.id.localeCompare(b.id);
    });

  // Get current unit info from courseInfo
  const currentUnitInfo = apMacroCourseInfo.units.find(unit => 
    unit.unit.startsWith(`Unit ${selectedUnit}:`)
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <CourseSidebar 
        selectedUnit={selectedUnit}
        onUnitChange={setSelectedUnit}
        isFixed={true}
      />

      {/* Main Content */}
      <div className="flex-1 p-8 ml-80">
        <div className="max-w-5xl mx-auto">
          {/* Main Container */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Course Header */}
            <div className="bg-gray-50 px-8 py-6">
              <h1 className="text-2xl font-semibold text-gray-900">
                <span className="text-blue-500">AP Dojo</span> Macroeconomics Course
              </h1>
            </div>
            
            {/* Divider */}
            <div className="w-full h-px bg-gray-200"></div>
            
            {/* Unit Information */}
            {currentUnitInfo && (
              <div className="px-8 py-6">
                <h2 className="text-lg font-bold text-gray-800 mb-3">
                  {currentUnitInfo.unit}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed max-w-2xl mb-6">
                  {currentUnitInfo.unit.includes('Basic Economic Concepts') 
                    ? 'Learn fundamental economic principles including scarcity, opportunity cost, production possibilities, and comparative advantage.'
                    : currentUnitInfo.unit.includes('Economic Indicators') 
                    ? 'Explore key economic indicators like GDP, unemployment, inflation, and business cycles.'
                    : currentUnitInfo.unit.includes('National Income') 
                    ? 'Understand aggregate demand, aggregate supply, and macroeconomic equilibrium.'
                    : currentUnitInfo.unit.includes('Financial Sector') 
                    ? 'Study money, banking, and monetary policy fundamentals.'
                    : currentUnitInfo.unit.includes('Stabilization Policies') 
                    ? 'Learn about fiscal and monetary policies and their economic effects.'
                    : currentUnitInfo.unit.includes('Open Economy') 
                    ? 'Explore international trade, exchange rates, and balance of payments.'
                    : 'Comprehensive coverage of key macroeconomic concepts and principles.'
                  }
                </p>
                
                {/* Unit Stats */}
                <div className="flex items-center">
                  <div className="inline-flex items-center gap-2 bg-white border border-gray-200 border-l-4 border-l-blue-500 px-4 py-2.5 shadow-sm">
                    <div className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                      AP Exam Weight
                    </div>
                    <div className="text-lg font-bold text-gray-800">
                      {(() => {
                        if (currentUnitInfo.unit.includes('Basic Economic Concepts')) return '5-10%';
                        if (currentUnitInfo.unit.includes('Economic Indicators')) return '12-17%';
                        if (currentUnitInfo.unit.includes('National Income')) return '17-27%';
                        if (currentUnitInfo.unit.includes('Financial Sector')) return '18-23%';
                        if (currentUnitInfo.unit.includes('Stabilization Policies')) return '20-30%';
                        if (currentUnitInfo.unit.includes('Open Economy')) return '10-13%';
                        return '5-10%';
                      })()}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Divider */}
            <div className="w-full h-px bg-gray-200"></div>

            {isUnitLocked ? (
              // MVP: Show locked state for non-Unit 1 content
              <div className="text-center py-16 px-8">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Lock className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Unit {selectedUnit} is Locked
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  This unit is locked. Complete Unit 1 to unlock access to all units.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
                  <p className="text-sm text-blue-800">
                    <strong>What's included:</strong> {currentUnitInfo?.videoTime} min of video content, 
                    {currentUnitInfo?.questions} practice questions, and comprehensive study materials.
                  </p>
                </div>
              </div>
            ) : unitVideos.length > 0 ? (
              <>
                {unitVideos.map((video, index) => (
                  <div
                    key={video.id}
                    className={`flex items-center p-6 hover:bg-gray-50 transition-colors duration-200 ${
                      index === 0 ? 'border-t border-gray-200' : ''
                    } ${
                      index !== unitVideos.length - 1 ? 'border-b border-gray-200' : ''
                    }`}
                  >
                    {/* Video Thumbnail */}
                    <div className="flex-shrink-0 mr-6">
                      <img
                        src={video.thumbnail || '/images/dojoIcon.png'}
                        alt={video.title}
                        className="w-48 h-32 object-cover rounded-lg border border-gray-200"
                      />
                    </div>

                    {/* Lesson Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 truncate">
                        {video.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {video.description}
                      </p>
                      <div className="flex items-center gap-3 mb-3">
                        {/* Lesson Tag */}
                        <Link href={`/videos/macro/${video.videoSlug}`}>
                          <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 flex items-center gap-2 hover:border-blue-300 hover:bg-blue-50 transition-colors duration-200 cursor-pointer">
                            <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                              <Play className="w-3 h-3 text-gray-600" />
                            </div>
                            <span className="text-sm font-semibold text-gray-800">
                              Lesson {video.lessonIDS[0]}
                            </span>
                          </div>
                        </Link>
                        
                        {/* Comprehension Check Toggle */}
                        <Link
                          href={`/video-comprehension-checks/${video.videoSlug}`}
                          className="bg-white border border-gray-200 rounded-lg px-4 py-2 flex items-center gap-3 hover:border-blue-300 transition-colors duration-200 w-fit"
                        >
                          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                            <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                          </div>
                          <span className="text-sm font-bold text-blue-600">
                            Comprehension Check
                          </span>
                          <span className="text-xs text-gray-500">
                            ({video.questions?.length || 0} questions)
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Unit 1 MCQ Test Section - Only show for Unit 1 */}
                {selectedUnit === '1' && (
                  <div className="border-t border-gray-200">
                    <div className="flex items-center p-6 hover:bg-gray-50 transition-colors duration-200">
                      {/* Test Icon */}
                      <div className="flex-shrink-0 mr-6">
                        <img
                          src="https://apdojovideos.s3.ap-southeast-2.amazonaws.com/UnitMCQIcon.jpg"
                          alt="MCQ Practice"
                          className="w-48 h-32 object-cover rounded-lg border border-gray-200"
                        />
                      </div>
                      
                      {/* Test Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Unit 1 MCQ Test
                        </h3>
                        <p className="text-gray-600 text-sm mb-3">
                          Test your knowledge of Basic Economic Concepts with 15 multiple choice questions.
                        </p>
                        <div className="flex items-center gap-3">
                          {/* Test Button */}
                          <Link href="/unit-mcq-test/1">
                            <div className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200 cursor-pointer">
                              <FileText className="w-4 h-4" />
                              <span className="text-sm font-semibold">
                                Start MCQ Test
                              </span>
                            </div>
                          </Link>
                          
                          {/* Question Count */}
                          <div className="text-xs text-gray-500 bg-white px-3 py-1 rounded-lg border border-gray-200">
                            15 questions
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Unit 1 FRQ Test Section - Commented out for now
                {selectedUnit === '1' && (
                  <div className="border-t border-gray-200">
                    <div className="flex items-center p-6 hover:bg-gray-50 transition-colors duration-200">
                      <div className="flex-shrink-0 mr-6">
                        <img
                          src="https://apdojovideos.s3.ap-southeast-2.amazonaws.com/UnitMCQIcon.jpg"
                          alt="FRQ Practice"
                          className="w-48 h-32 object-cover rounded-lg border border-gray-200"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Unit 1 FRQ Test
                        </h3>
                        <p className="text-gray-600 text-sm mb-3">
                          Practice free response questions with detailed explanations and whiteboard tools.
                        </p>
                        <div className="flex items-center gap-3">
                          <Link href="/unit-frq-test/1">
                            <div className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200 cursor-pointer">
                              <FileText className="w-4 h-4" />
                              <span className="text-sm font-semibold">
                                Start FRQ Test
                              </span>
                            </div>
                          </Link>
                          <div className="text-xs text-gray-500 bg-white px-3 py-1 rounded-lg border border-gray-200">
                            2 questions
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                */}
              </>
            ) : (
              <div className="text-center py-16 px-8">
                <p className="text-gray-600">No videos available for this unit yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function APMacroCoursePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading course...</p>
        </div>
      </div>
    }>
      <APMacroCoursePageContent />
    </Suspense>
  );
} 