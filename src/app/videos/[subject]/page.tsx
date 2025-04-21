'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Film } from 'lucide-react';
import { videos as allVideos, Video as VideoType } from '@/data/videos';
import { VideoModal } from '@/components/VideoModal';

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
  const [selectedVideo, setSelectedVideo] = useState<VideoType | null>(null);

  if (subject !== 'macro' && subject !== 'micro') {
    return <div className="p-8 text-center text-red-500">Invalid subject specified.</div>;
  }

  const subjectFullName = subject === 'macro' ? 'AP Macroeconomics' : 'AP Microeconomics';

  const filteredVideos = allVideos.filter(video =>
    video.subjects.includes(subjectFullName)
  );

  const videosByUnit = groupVideosByUnit(filteredVideos);
  const sortedUnitKeys = Object.keys(videosByUnit).sort((a, b) => {
    if (a === 'Misc') return 1;
    if (b === 'Misc') return -1;
    return parseInt(a) - parseInt(b);
  });

  const pageTitle = subject === 'macro' ? 'AP Macroeconomics Video Library' : 'AP Microeconomics Video Library';

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
        <Film className={`w-8 h-8 ${subject === 'macro' ? 'text-blue-600' : 'text-green-600'}`} />
        {pageTitle}
      </h1>

      {sortedUnitKeys.length > 0 ? (
        <div className="space-y-10">
          {sortedUnitKeys.map(unitKey => {
            const unitVideos = videosByUnit[unitKey];
            const unitHeading = unitKey === 'Misc' ? 'Miscellaneous' : `Unit ${unitKey}`;
            return (
              <div key={unitKey}>
                <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">
                  {unitHeading}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {unitVideos.map(video => (
                    <button 
                      key={video.id} 
                      onClick={() => setSelectedVideo(video)}
                      className="block group rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-200 bg-white text-left"
                    >
                      <div className="relative w-full aspect-video bg-gray-100">
                        <Image
                          src={video.thumbnail || '/images/placeholder-thumb.png'}
                          alt={video.title}
                          layout="fill"
                          objectFit="cover"
                          className="group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-200 flex items-center justify-center">
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-base font-semibold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">{video.title}</h3>
                        <p className="text-xs text-gray-500">Unit {video.unit || 'N/A'}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-10">
          No videos found for this subject yet.
        </p>
      )}

      {selectedVideo && (
        <VideoModal
          videoUrl={selectedVideo.videoUrl}
          questions={selectedVideo.questions || []}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </div>
  );
}