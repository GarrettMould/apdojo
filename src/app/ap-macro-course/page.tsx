'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Play, FileText, Lock, ChevronDown, ChevronRight, Brain } from 'lucide-react';
import { videos as allVideos, Video as VideoType } from '@/data/videos';
import { apMacroCourseInfo } from '@/data/courseInfo';
import Image from 'next/image';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"

function APMacroCoursePageContent() {
  const searchParams = useSearchParams();
  const [activeUnit, setActiveUnit] = useState<string | undefined>('1');

  // Handle unit query parameter
  useEffect(() => {
    const unitParam = searchParams.get('unit');
    if (unitParam) {
      setActiveUnit(unitParam);
    }
  }, [searchParams]);

  // MVP: Allow access to Units 1-4
  const selectedUnitForContent = activeUnit || '1';
  const isUnitLocked = false;
  
  // Filter AP Macro videos for the selected unit and sort by lesson ID (exclude MCQ Explanations)
  const unitVideos = allVideos
    .filter(video => 
      video.subjects.includes('AP Macroeconomics') && 
      video.unit === selectedUnitForContent &&
      video.videoSlug !== 'mcq-explanations'
    )
    .sort((a, b) => {
      const aLesson = a.lessonIDS[0] ? parseFloat(a.lessonIDS[0]) : 0;
      const bLesson = b.lessonIDS[0] ? parseFloat(b.lessonIDS[0]) : 0;
      if (aLesson !== bLesson) {
        return aLesson - bLesson;
      }
      
      // Secondary sort for practice videos
      const aIsPractice = a.title.toLowerCase().includes('practice');
      const bIsPractice = b.title.toLowerCase().includes('practice');
      if (aIsPractice && !bIsPractice) return 1;
      if (!aIsPractice && bIsPractice) return -1;

      return a.id.localeCompare(b.id); // Tertiary sort by ID for stability
    });

  // Get current unit info from courseInfo
  const currentUnitInfo = apMacroCourseInfo.units.find(unit => 
    unit.unit.startsWith(`Unit ${selectedUnitForContent}:`)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        
        {/* Course Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">AP Macroeconomics</h1>
          <p className="text-lg text-gray-600 mt-2">Select a unit to start learning</p>
        </div>

        {/* Units Accordion */}
        <Accordion type="single" collapsible value={activeUnit} onValueChange={setActiveUnit} className="w-full">
          {apMacroCourseInfo.units.map((unit, index) => {
            const unitNumber = unit.unit.split(':')[0].split(' ')[1];
            const isLocked = parseInt(unitNumber, 10) >= 3;

            const unitVideos = allVideos
              .filter(video => video.subjects.includes('AP Macroeconomics') && video.unit === unitNumber && video.videoSlug !== 'mcq-explanations')
              .sort((a, b) => {
                const aLesson = a.lessonIDS[0] ? parseFloat(a.lessonIDS[0]) : 0;
                const bLesson = b.lessonIDS[0] ? parseFloat(b.lessonIDS[0]) : 0;
                if (aLesson !== bLesson) return aLesson - bLesson;
                
                // Secondary sort for practice videos
                const aIsPractice = a.title.toLowerCase().includes('practice');
                const bIsPractice = b.title.toLowerCase().includes('practice');
                if (aIsPractice && !bIsPractice) return 1;
                if (!aIsPractice && bIsPractice) return -1;
                
                return a.id.localeCompare(b.id);
              });
            
            return (
              <AccordionItem key={unitNumber} value={unitNumber} disabled={isLocked}>
                <AccordionTrigger className="text-lg font-semibold hover:no-underline py-6">
                  <div className="flex items-center gap-4">
                    {isLocked && <Lock className="w-5 h-5 text-gray-400" />}
                    <span>{unit.unit}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="border-t border-gray-200">
                    {unitVideos.map((video) => (
                      <div key={video.id} className="flex items-center gap-6 p-4 border-b border-gray-200">
                        {/* Thumbnail */}
                        <div className="flex-shrink-0">
                          <Image
                            src={video.thumbnail || '/images/dojoIcon.png'}
                            alt={video.title}
                            width={128}
                            height={72}
                            className="rounded-lg object-cover"
                          />
                        </div>
                        {/* Title & Subtitle */}
                        <div className="flex-grow min-w-0">
                          <h4 className="font-semibold text-lg text-gray-800 truncate">{video.title}</h4>
                          <p className="text-sm text-gray-600 mt-1 truncate">{video.description}</p>
                        </div>
                        {/* Links */}
                        <div className="flex-shrink-0 flex items-center gap-2">
                          <Link href={`/videos/macro/${video.videoSlug}`}>
                            <Button size="sm" variant="outline" className="flex items-center gap-2">
                              <Play className="w-4 h-4" />
                              <span>Video</span>
                            </Button>
                          </Link>
                          <Link href={`/video-comprehension-checks/${video.videoSlug}`}>
                            <Button size="sm" variant="outline" className="flex items-center gap-2">
                              <Brain className="w-4 h-4" />
                              <span>Quiz</span>
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>

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