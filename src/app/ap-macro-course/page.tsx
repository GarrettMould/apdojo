'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Play, FileText } from 'lucide-react';
import { videos as allVideos, Video as VideoType } from '@/data/videos';
import { apMacroCourseInfo } from '@/data/courseInfo';
import { useAuthContext } from '@/contexts/AuthContext';
import { AuthGate } from '@/components/AuthGate';
import { CourseSidebar } from '@/components/CourseSidebar';

export default function APMacroCoursePage() {
  const [selectedUnit, setSelectedUnit] = useState<string>('1');
  const { user } = useAuthContext();
  const searchParams = useSearchParams();
  
  // Handle unit query parameter
  useEffect(() => {
    const unitParam = searchParams.get('unit');
    if (unitParam) {
      setSelectedUnit(unitParam);
    }
  }, [searchParams]);

  // Check if user is authenticated
  if (!user) {
    return <AuthGate />;
  }

  // Filter AP Macro videos for the selected unit and sort by lesson ID
  const unitVideos = allVideos
    .filter(video => 
      video.subjects.includes('AP Macroeconomics') && 
      video.unit === selectedUnit
    )
    .sort((a, b) => {
      const aLesson = a.lessonIDS[0] ? parseFloat(a.lessonIDS[0]) : 0;
      const bLesson = b.lessonIDS[0] ? parseFloat(b.lessonIDS[0]) : 0;
      return aLesson - bLesson;
    });

  // Get current unit info from courseInfo
  const currentUnitInfo = apMacroCourseInfo.units.find(unit => 
    unit.unit.startsWith(`Unit ${selectedUnit}:`)
  );

  // Calculate total video time and questions for the current unit
  const totalVideoTime = currentUnitInfo?.videoTime || 0;
  const totalQuestions = currentUnitInfo?.questions || 0;

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
          {/* Headline */}
          <div className="text-start mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              AP Macroeconomics Course
            </h1>
            <p className="text-lg text-gray-600">
              Master the fundamentals of macroeconomics through interactive video lessons
            </p>
          </div>

          {/* Lessons Container */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Unit Information at the top */}
            {currentUnitInfo && (
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-8 text-start">
                  {currentUnitInfo.unit}
                </h2>
                <div className="flex items-center justify-start">
                  <div className="text-start">
                    <p className="text-base font-semibold text-gray-800">{totalVideoTime} min</p>
                    <p className="text-sm text-gray-500">video content</p>
                  </div>
                  <div className="w-px h-8 bg-blue-200 mx-6"></div>
                  <div className="text-start">
                    <p className="text-base font-semibold text-gray-800">{totalQuestions}</p>
                    <p className="text-sm text-gray-500">practice questions</p>
                  </div>
                  <div className="w-px h-8 bg-blue-200 mx-6"></div>
                  <div className="text-start">
                    <p className="text-base font-semibold text-gray-800">{unitVideos.length}</p>
                    <p className="text-sm text-gray-500">lessons</p>
                  </div>
                </div>
              </div>
            )}
          {unitVideos.length > 0 ? (
            <>
              {unitVideos.map((video, index) => (
                <div
                  key={video.id}
                  className={`flex items-center p-6 hover:bg-gray-50 transition-colors duration-200 ${
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
                        <div className="bg-white border border-gray-200 rounded-full px-4 py-2 flex items-center gap-2 hover:border-blue-300 hover:bg-blue-50 transition-colors duration-200 cursor-pointer">
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
                        className="bg-white border border-gray-200 rounded-full px-4 py-2 flex items-center gap-3 hover:border-blue-300 transition-colors duration-200 w-fit"
                      >
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                          <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                        </div>
                        <span className="text-sm font-bold text-blue-600">
                          Comprehension Check
                        </span>
                        <span className="text-xs text-gray-500">
                          ({video.questions.length} questions)
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Unit MCQ Test - Added at the end */}
              <div className="flex items-center p-6 hover:bg-gray-50 transition-colors duration-200 border-t border-gray-200">
                {/* Test Icon/Thumbnail */}
                <div className="flex-shrink-0 mr-6">
                  <div className="relative">
                    <div className="w-48 h-32 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg border border-gray-200 flex items-center justify-center">
                      <FileText className="w-16 h-16 text-white opacity-80" />
                    </div>
                  </div>
                </div>

                {/* Test Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 truncate">
                    Unit {selectedUnit} MCQ Test
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    Test your knowledge with 15 comprehensive questions covering all topics in this unit.
                  </p>
                  <div className="flex items-center gap-3 mb-3">
                    {/* Unit Assessment Tag */}
                    <Link href={`/unit-mcq-test/${selectedUnit}`}>
                      <div className="bg-white border border-gray-200 rounded-full px-4 py-2 flex items-center gap-2 hover:border-blue-300 hover:bg-blue-50 transition-colors duration-200 cursor-pointer">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                          <FileText className="w-3 h-3 text-green-600" />
                        </div>
                        <span className="text-sm font-semibold text-gray-800">
                          Unit Assessment
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Full Exams Section */}
              
            </>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <FileText className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No lessons available for Unit {selectedUnit}
              </h3>
              <p className="text-gray-600">
                Check back soon for new content or try selecting a different unit.
              </p>
            </div>
          )}
        </div>
        </div>
      </div>
    </div>
  );
} 