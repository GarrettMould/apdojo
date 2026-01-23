'use client';

import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Play, CheckCircle, Lock } from 'lucide-react';
import Link from 'next/link';
import { CourseSidebar } from './CourseSidebar';

// Chapter data for the MCQ Explanations video
const chapters = [
  {
    id: 1,
    title: "Question 1",
    start: 0,        // 00:00:00
    end: 87,         // 00:01:27
    description: "Explanation of Question 1"
  },
  {
    id: 2,
    title: "Question 2",
    start: 88,       // 00:01:28
    end: 178,        // 00:02:58
    description: "Explanation of Question 2"
  },
  {
    id: 3,
    title: "Question 3",
    start: 179,      // 00:02:59
    end: 252,        // 00:04:12
    description: "Explanation of Question 3"
  },
  {
    id: 4,
    title: "Question 4",
    start: 253,      // 00:04:13
    end: 317,        // 00:05:17
    description: "Explanation of Question 4"
  },
  {
    id: 5,
    title: "Question 5",
    start: 318,      // 00:05:18
    end: 436,        // 00:07:16
    description: "Explanation of Question 5"
  },
  {
    id: 6,
    title: "Question 6",
    start: 437,      // 00:07:17
    end: 571,        // 00:09:31
    description: "Explanation of Question 6"
  },
  {
    id: 7,
    title: "Question 7",
    start: 572,      // 00:09:32
    end: 782,        // 00:13:02
    description: "Explanation of Question 7"
  },
  {
    id: 8,
    title: "Question 8",
    start: 783,      // 00:13:03
    end: 904,        // 00:15:04
    description: "Explanation of Question 8"
  },
  {
    id: 9,
    title: "Question 9",
    start: 905,      // 00:15:05
    end: 957,        // 00:15:57
    description: "Explanation of Question 9"
  },
  {
    id: 10,
    title: "Question 10",
    start: 958,      // 00:15:58
    end: 1112,       // 00:18:32
    description: "Explanation of Question 10"
  },
  {
    id: 11,
    title: "Question 11",
    start: 1213,     // 00:20:13
    end: 1320,       // 00:22:00
    description: "Explanation of Question 11"
  },
  {
    id: 12,
    title: "Question 12",
    start: 1113,     // 00:18:33
    end: 1212,       // 00:20:12
    description: "Explanation of Question 12"
  },
  {
    id: 13,
    title: "Question 13",
    start: 1321,     // 00:22:01
    end: 1419,       // 00:23:39
    description: "Explanation of Question 13"
  },
  {
    id: 14,
    title: "Question 14",
    start: 1420,     // 00:23:40
    end: 1507,       // 00:25:07
    description: "Explanation of Question 14"
  },
  {
    id: 15,
    title: "Question 15",
    start: 1508,     // 00:25:08
    end: 1559,       // 00:25:59
    description: "Explanation of Question 15"
  }
];

export function MCQExplanationsVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentChapter, setCurrentChapter] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  // Update current chapter based on video time and force re-render for progress bar
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const currentTime = video.currentTime;
      const chapter = chapters.find(ch => currentTime >= ch.start && currentTime <= ch.end);
      if (chapter && chapter.id !== currentChapter) {
        setCurrentChapter(chapter.id);
      }
      // Force re-render to update progress bar
      setCurrentChapter(prev => prev);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, [currentChapter]);

  // Jump to specific chapter
  const jumpToChapter = (chapterId: number) => {
    const video = videoRef.current;
    if (!video) return;

    const chapter = chapters.find(ch => ch.id === chapterId);
    if (chapter) {
      video.currentTime = chapter.start;
      setCurrentChapter(chapterId);
    }
  };

  // Format time from seconds to MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Get current chapter info
  const currentChapterInfo = chapters.find(ch => ch.id === currentChapter);

  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar */}
      <CourseSidebar 
        selectedUnit="1"
        currentLessonId="1.0"
        isFixed={true}
      />
      
      {/* Main Content */}
      <div className="flex-1 py-8 ml-80">
        <div className="max-w-6xl mx-auto">
          {/* Video Section */}
          <div className="mb-8 px-4">
            <video 
              ref={videoRef}
              controls 
              autoPlay 
              className="w-full aspect-video rounded-lg shadow-lg"
              playsInline
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            >
              <source src="https://apdojovideos.s3.ap-southeast-2.amazonaws.com/Unit_MCQ_Explanations/Unit_1_MCQ_Explanations.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {/* Chapter Info */}
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="mb-2">
                <h3 className="text-2xl font-semibold text-gray-900">Unit 1 - MCQ Test Explanations</h3>
                <p className="text-lg text-gray-600">Unit 1 - AP Macroeconomics</p>
              </div>
              <div className="flex flex-wrap gap-2 justify-start">
                {chapters.map((chapter) => (
                  <button
                    key={chapter.id}
                    onClick={() => jumpToChapter(chapter.id)}
                    className={`px-4 py-2 text-sm border rounded-md transition-colors ${
                      currentChapter === chapter.id
                        ? 'bg-blue-100 border-blue-300 text-blue-700'
                        : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                    title={chapter.title}
                  >
                    Q{chapter.id}
                  </button>
                ))}
              </div>
            </div>
          </div>


          


          {/* Navigation Buttons */}
          <div className="mt-12 px-4">
            <div className="flex gap-4">
              {/* Previous Button */}
              <div className="flex-1">
                <Link
                  href="/ap-macro-unit-1-mcq-test"
                  className="block w-full h-24 p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 group"
                >
                  <div className="flex items-center gap-2 text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                    <ArrowLeft className="w-6 h-6" />
                    Previous
                  </div>
                  <div className="text-sm font-medium text-gray-600">
                    Unit 1 MCQ Test
                  </div>
                </Link>
              </div>

              {/* Next Button */}
              <div className="flex-1">
                <div className="block w-full h-24 p-4 rounded-lg border border-gray-200 bg-gray-50 cursor-not-allowed">
                  <div className="flex items-center gap-2 text-lg font-semibold text-gray-400 mb-2">
                    Next
                    <ArrowRight className="w-6 h-6" />
                  </div>
                  <div className="text-sm font-medium text-gray-400 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-gray-400" />
                    Unit 2.1: Economic Indicators
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
