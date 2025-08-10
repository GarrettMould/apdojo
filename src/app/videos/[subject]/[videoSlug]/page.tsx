'use client';

import { useState, useRef, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { X, Check, ArrowLeft, ArrowRight, FileText } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { videos as allVideos, Video as VideoType } from '@/data/videos';
import { useAuthContext } from '@/contexts/AuthContext';
import { AuthGate } from '@/components/AuthGate';
import { CourseSidebar } from '@/components/CourseSidebar';
import dojoIcon from "../../../../../public/images/dojoIcon.png";
import { use } from 'react';

type Question = {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  image?: string;
}

interface VideoPageProps {
  params: Promise<{
    subject: string;
    videoSlug: string;
  }>;
}

export default function VideoPage({ params }: VideoPageProps) {
  const { subject, videoSlug } = use(params);
  const router = useRouter();
  const { user } = useAuthContext();
  
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);



  // Find the video by slug
  const video = allVideos.find(v => v.videoSlug === videoSlug);
  
  // Get navigation items (videos and comprehension checks)
  const getNavigationItems = () => {
    if (!video) return { previous: null, next: null };
    
    // Create a sequence of all videos and their comprehension checks for the current unit
    const unitVideos = allVideos
      .filter(v => 
        v.subjects.includes('AP Macroeconomics') && 
        v.unit === video.unit
      )
      .sort((a, b) => {
        const aLesson = a.lessonIDS[0] ? parseFloat(a.lessonIDS[0]) : 0;
        const bLesson = b.lessonIDS[0] ? parseFloat(b.lessonIDS[0]) : 0;
        return aLesson - bLesson;
      });
    
    // Create the sequence: video -> comp check -> video -> comp check
    const sequence: Array<{ type: 'video' | 'comp-check'; video: any; index: number }> = [];
    unitVideos.forEach((v, index) => {
      sequence.push({ type: 'video', video: v, index });
      sequence.push({ type: 'comp-check', video: v, index });
    });
    
    // Find current position in sequence
    const currentSequenceIndex = sequence.findIndex(item => 
      item.type === 'video' && item.video.videoSlug === videoSlug
    );
    
    let previous = null;
    let next = null;
    
    // Find previous item
    if (currentSequenceIndex > 0) {
      const prevItem = sequence[currentSequenceIndex - 1];
      if (prevItem.type === 'video') {
        previous = {
          type: 'video',
          title: `${prevItem.video.lessonIDS[0]}: Video`,
          href: `/videos/macro/${prevItem.video.videoSlug}`
        };
      } else {
        previous = {
          type: 'comp-check',
          title: `${prevItem.video.lessonIDS[0]}: Comprehension Check`,
          href: `/video-comprehension-checks/${prevItem.video.videoSlug}`
        };
      }
    } else if (currentSequenceIndex === 0) {
      // If this is the first item, check if there's a previous unit
      const prevUnitVideos = allVideos
        .filter(v => 
          v.subjects.includes('AP Macroeconomics') && 
          v.unit === String(parseInt(video.unit) - 1)
        )
        .sort((a, b) => {
          const aLesson = a.lessonIDS[0] ? parseFloat(a.lessonIDS[0]) : 0;
          const bLesson = b.lessonIDS[0] ? parseFloat(b.lessonIDS[0]) : 0;
          return aLesson - bLesson;
        });
      
      if (prevUnitVideos.length > 0) {
        const lastVideo = prevUnitVideos[prevUnitVideos.length - 1];
        previous = {
          type: 'comp-check',
          title: `${lastVideo.lessonIDS[0]}: Comprehension Check`,
          href: `/video-comprehension-checks/${lastVideo.videoSlug}`
        };
      }
    }
    
    // Find next item - should be the comprehension check for the current video
    if (currentSequenceIndex < sequence.length - 1) {
      const nextItem = sequence[currentSequenceIndex + 1];
      if (nextItem.type === 'video') {
        next = {
          type: 'video',
          title: `${nextItem.video.lessonIDS[0]}: Video`,
          href: `/videos/macro/${nextItem.video.videoSlug}`
        };
      } else {
        next = {
          type: 'comp-check',
          title: `${nextItem.video.lessonIDS[0]}: Comprehension Check`,
          href: `/video-comprehension-checks/${nextItem.video.videoSlug}`
        };
      }
    } else {
      // If this is the last item, check if there's a next unit
      const nextUnitVideos = allVideos
        .filter(v => 
          v.subjects.includes('AP Macroeconomics') && 
          v.unit === String(parseInt(video.unit) + 1)
        )
        .sort((a, b) => {
          const aLesson = a.lessonIDS[0] ? parseFloat(a.lessonIDS[0]) : 0;
          const bLesson = b.lessonIDS[0] ? parseFloat(b.lessonIDS[0]) : 0;
          return aLesson - bLesson;
        });
      
      if (nextUnitVideos.length > 0) {
        const firstVideo = nextUnitVideos[0];
        next = {
          type: 'video',
          title: `${firstVideo.lessonIDS[0]}: Video`,
          href: `/videos/macro/${firstVideo.videoSlug}`
        };
      }
    }
    
    return { previous, next };
  };
  
  const { previous, next } = getNavigationItems();
  
  // Debug logging
  console.log('Looking for video with slug:', videoSlug);
  console.log('Available slugs:', allVideos.map(v => v.videoSlug));
  console.log('Found video:', video);
  console.log('Subject:', subject);
  console.log('Video subjects:', video?.subjects);
  console.log('Video questions:', video?.questions);
  console.log('Questions length:', video?.questions?.length);
  
  // If video not found or subject doesn't match, redirect
  if (!video || !video.subjects.includes(subject === 'macro' ? 'AP Macroeconomics' : 'AP Microeconomics')) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Video Not Found</h1>
          <p className="text-gray-600 mb-6">The video you're looking for doesn't exist or isn't available for this subject.</p>
          <Link 
            href={`/videos/${subject}`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Video Library
          </Link>
        </div>
      </div>
    );
  }

  // Check if user is authenticated
  if (!user) {
    return <AuthGate />;
  }

  const handleImageClick = (imageUrl: string) => {
    setExpandedImage(imageUrl);
  };



  return (
    <div className="min-h-screen bg-white flex">
      {/* Course Sidebar - Only show for macro videos */}
      {subject === 'macro' && (
        <CourseSidebar 
          selectedUnit={video.unit}
          isFixed={true}
        />
      )}
      
      {/* Main Content */}
      <div className={`flex-1 py-8 ${subject === 'macro' ? 'ml-80' : 'max-w-6xl mx-auto'}`}>
        <div className="max-w-6xl mx-auto">
          {/* Video Section */}
          <div className="mb-8 px-4">
            <video 
              ref={videoRef}
              controls 
              autoPlay 
              className="w-full aspect-video rounded-lg shadow-lg"
              playsInline
            >
              <source src={video.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          
          {/* Video Info */}
          <div className="mb-8 px-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{video.title}</h1>
            <p className="text-gray-600 mb-4 text-lg">Unit {video.unit} - {video.subjects.join(', ')}</p>
            {video.description && (
              <p className="text-gray-700 leading-relaxed text-lg">{video.description}</p>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="mt-12 px-4">
            <div className="flex gap-4">
              {/* Previous Button */}
              <div className="flex-1">
                {previous ? (
                  <Link
                    href={previous.href}
                    className="block w-full h-24 p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 group"
                  >
                    <div className="flex items-center gap-2 text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                      <ArrowLeft className="w-6 h-6" />
                      Previous
                    </div>
                    <div className="text-sm font-medium text-gray-600">
                      {previous.title}
                    </div>
                  </Link>
                ) : (
                  <div className="w-full h-24 p-4 rounded-lg border border-gray-200 bg-gray-50">
                    <div className="flex items-center gap-2 text-lg font-semibold text-gray-400 mb-2">
                      <ArrowLeft className="w-6 h-6" />
                      Previous
                    </div>
                    <div className="text-sm font-medium text-gray-400">No previous resource</div>
                  </div>
                )}
              </div>

              {/* Next Button */}
              <div className="flex-1">
                {next ? (
                  <Link
                    href={next.href}
                    className="block w-full h-24 p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 group text-right"
                  >
                    <div className="flex items-center justify-end gap-2 text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                      Next
                      <ArrowRight className="w-6 h-6" />
                    </div>
                    <div className="text-sm font-medium text-gray-600">
                      {next.title}
                    </div>
                  </Link>
                ) : (
                  <div className="w-full h-24 p-4 rounded-lg border border-gray-200 bg-gray-50 text-right">
                    <div className="flex items-center justify-end gap-2 text-lg font-semibold text-gray-400 mb-2">
                      Next
                      <ArrowRight className="w-6 h-6" />
                    </div>
                    <div className="text-sm font-medium text-gray-400">No next resource</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Expansion Modal */}
      {expandedImage && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setExpandedImage(null)}
        >
          <button
            onClick={() => setExpandedImage(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
          <div 
            className="relative max-w-[90vw] max-h-[90vh]"
            onClick={e => e.stopPropagation()}
          >
            <img
              src={expandedImage || ''}
              alt="Expanded diagram"
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
} 