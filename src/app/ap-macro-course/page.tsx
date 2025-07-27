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
        {/* Headline */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
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
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {currentUnitInfo.unit}
              </h2>
              <p className="text-gray-600 text-sm mb-3">
                {currentUnitInfo.unitDescription}
              </p>
              <div className="flex flex-wrap gap-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {totalVideoTime} minutes of video content
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  {totalQuestions} practice questions
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                  {unitVideos.length} lessons
                </span>
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
                    <Link href={`/videos/macro/${video.videoSlug}`}>
                      <div className="relative group cursor-pointer">
                        <img
                          src={video.thumbnail || '/images/dojoIcon.png'}
                          alt={video.title}
                          className="w-48 h-32 object-cover rounded-lg border border-gray-200 group-hover:border-blue-300 transition-colors duration-200"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 rounded-lg flex items-center justify-center">
                          <Play className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                        </div>
                      </div>
                    </Link>
                  </div>

                  {/* Lesson Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 truncate">
                      {video.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {video.description}
                    </p>
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                        Lesson {video.lessonIDS[0]}
                      </span>
                    </div>
                    
                    {/* Comprehension Check Link */}
                    <Link
                      href={`/video-comprehension-checks/${video.videoSlug}`}
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors duration-200"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Comprehension Check ({video.questions.length} questions)
                    </Link>
                  </div>
                </div>
              ))}
              
              {/* Unit MCQ Test - Added at the end */}
              <div className="flex items-center p-6 hover:bg-gray-50 transition-colors duration-200 border-t border-gray-200">
                {/* Test Icon/Thumbnail */}
                <div className="flex-shrink-0 mr-6">
                  <Link href={`/unit-mcq-test/${selectedUnit}`}>
                    <div className="relative group cursor-pointer">
                      <div className="w-48 h-32 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg border border-gray-200 group-hover:border-blue-300 transition-colors duration-200 flex items-center justify-center">
                        <FileText className="w-16 h-16 text-white opacity-80 group-hover:opacity-100 transition-opacity duration-200" />
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Test Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 truncate">
                    Unit {selectedUnit} MCQ Test
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    Test your knowledge with 15 comprehensive questions covering all topics in this unit.
                  </p>
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      Unit Assessment
                    </span>
                  </div>
                  

                </div>
              </div>
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
  );
} 