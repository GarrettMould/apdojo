'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Film, PlayCircle } from 'lucide-react';
import { videos as allVideos, Video as VideoType } from '@/data/videos';
import { LoginModal, SignupModal, SelectPlanModal } from '@/components/AuthModals';
// MVP: Removed authentication import
// import { useAuthContext } from '@/contexts/AuthContext';
import { PageHeader } from '@/components/ui/PageHeader';
import { useRouter } from 'next/navigation';

interface VideoLibraryPageProps {
  params: {
    subject: string;
  };
}

const groupVideosByUnit = (videos: VideoType[]) => {
  return videos.reduce((acc, video) => {
    const unit = video.unit || 'Misc';
    if (!acc[unit]) {
      acc[unit] = [];
    }
    acc[unit].push(video);
    return acc;
  }, {} as Record<string, VideoType[]>);
};

export default function VideoLibraryPage({ params }: VideoLibraryPageProps) {
  const { subject } = params;
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null);
  const router = useRouter();

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showSelectPlanModal, setShowSelectPlanModal] = useState(false);

  // MVP: Removed authentication context
  // const { user } = useAuthContext();

  if (subject !== 'macro' && subject !== 'micro') {
    return <div className="p-8 text-center text-red-500">Invalid subject specified.</div>;
  }

  const subjectFullName = subject === 'macro' ? 'AP Macroeconomics' : 'AP Microeconomics';

  const filteredVideos = allVideos.filter(video =>
    video.subjects.includes(subjectFullName)
  );

  const videosByUnit = groupVideosByUnit(filteredVideos);
  Object.keys(videosByUnit).forEach(unit => {
    videosByUnit[unit].sort((a, b) => {
      const aLesson = a.lessonIDS[0] ? parseFloat(a.lessonIDS[0]) : 0;
      const bLesson = b.lessonIDS[0] ? parseFloat(b.lessonIDS[0]) : 0;
      return aLesson - bLesson;
    });
  });

  const sortedUnitKeys = Object.keys(videosByUnit).sort((a, b) => {
    if (a === 'Misc') return 1;
    if (b === 'Misc') return -1;
    return parseInt(a) - parseInt(b);
  });

  const pageTitle = subject === 'macro' ? 'AP Macroeconomics Video Library' : 'AP Microeconomics Video Library';

  const handleVideoClick = (video: VideoType) => {
    // MVP: Allow all users to access videos without authentication
    // Navigate to the individual video page
    router.push(`/videos/${subject}/${video.videoSlug}`);
  };

  const handleAuthSuccess = () => {
    setShowLoginModal(false);
    setShowSignupModal(false);
    setShowSelectPlanModal(false);
  };

  const handleUnitSelect = (unitKey: string) => {
    setSelectedUnit(selectedUnit === unitKey ? null : unitKey);
  };

  const handleBackToAll = () => {
    setSelectedUnit(null);
  };

  // Filter units based on selection
  const displayUnits = selectedUnit 
    ? sortedUnitKeys.filter(unit => unit === selectedUnit)
    : sortedUnitKeys;

  return (
    <>
      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        switchToSignup={() => { 
            setShowLoginModal(false); 
            setShowSelectPlanModal(false);
            setShowSignupModal(true); 
        }}
        onAuthSuccess={handleAuthSuccess}
      />
      <SignupModal 
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
        switchToLogin={() => { 
            setShowSignupModal(false); 
            setShowSelectPlanModal(false);
            setShowLoginModal(true); 
        }}
        onAuthSuccess={handleAuthSuccess}
      />
      <SelectPlanModal 
        isOpen={showSelectPlanModal}
        onClose={() => setShowSelectPlanModal(false)}
        switchToLogin={() => { 
            setShowSelectPlanModal(false); 
            setShowLoginModal(true); 
        }}
        switchToSignup={() => { 
            setShowSelectPlanModal(false); 
            setShowSignupModal(true); 
        }}
      />

      <div className="py-12 md:py-24 w-screen bg-gray-50" style={{ marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)' }}>
        <div className="container mx-auto px-4 md:px-0">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg border border-gray-100 p-4 md:p-8">
            <PageHeader 
              title="AP {subject} Video Library"
              subject={subject}
              subtitle="Every key concept, explained clearly — one video at a time"
            />

            {selectedUnit && (
              <div className="mb-6">
                <button
                  onClick={handleBackToAll}
                  className="flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                >
                  ← Back to All Units
                </button>
              </div>
            )}

            {sortedUnitKeys.length > 0 ? (
              <div className="space-y-8">
                {displayUnits.map(unitKey => {
                  const unitVideos = videosByUnit[unitKey];
                  const unitHeading = unitKey === 'Misc' ? 'Miscellaneous' : `Unit ${unitKey}`;
                  return (
                    <div key={unitKey}>
                      <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200">
                        <h3 className="text-2xl font-bold text-gray-800">
                          {unitHeading}
                        </h3>
                        {!selectedUnit && (
                          <button
                            onClick={() => handleUnitSelect(unitKey)}
                            className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors duration-200"
                          >
                            View All
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {unitVideos.map(video => (
                          <button 
                            key={video.id} 
                            onClick={() => handleVideoClick(video)}
                            className="block group rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-200 ease-in-out bg-white text-left border border-gray-200 hover:border-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          >
                            <div className="relative w-full aspect-video bg-gray-200">
                              <Image
                                src={video.thumbnail || '/images/placeholder-thumb.png'}
                                alt={video.title}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                                <PlayCircle className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-110" />
                              </div>
                            </div>
                            <div className="p-6">
                              <h4 className="text-base font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2 leading-snug">
                                {video.title}
                              </h4>
                              <p className="text-sm text-gray-500">
                                Unit {video.unit || 'N/A'}
                              </p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <Film className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Videos Found</h3>
                <p className="text-gray-500">
                  It looks like there are no videos available for {subjectFullName} at the moment. Please check back later!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

    </>
  );
}