'use client';

import React, { useState } from 'react';
import { videos, Video } from '@/data/videos';
import { Play } from 'lucide-react';
import { VideoModal } from '@/components/VideoModal';
import Link from 'next/link';

interface FullVideoLibraryProps {
  subject: 'AP Macroeconomics' | 'AP Microeconomics';
}

export function FullVideoLibrary({ subject }: FullVideoLibraryProps) {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  
  // Filter videos by subject
  const subjectVideos = videos.filter(video => video.subject === subject);

  // Group videos by unit and filter out empty units
  const videosByUnit = Array.from({ length: 6 }, (_, i) => i + 1)
    .map(unitNum => ({
      unit: unitNum,
      videos: subjectVideos.filter(video => Number(video.unit) === unitNum)
    }))
    .filter(({ videos }) => videos.length > 0); // Only keep units with videos

  return (
    <>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Header */}
        <div className="mb-12 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {subject} Video Library
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Watch comprehensive video lessons organized by unit
            </p>
          </div>
          <div className="relative">
            <button
              disabled
              className="px-4 py-2 text-sm font-bold text-gray-400 bg-transparent border-2 border-gray-300 rounded-md cursor-not-allowed"
            >
              Switch to AP Micro
            </button>
            <div className="absolute -top-3 -right-3 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold">
              Coming Soon
            </div>
          </div>
        </div>

        {/* Videos by Unit */}
        <div className="space-y-16">
          {videosByUnit.map(({ unit, videos }) => (
            <div key={unit} className="space-y-6">
              {/* Unit Header */}
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-bold text-gray-900">
                  Unit {unit}
                </h2>
                <div className="h-px flex-1 bg-gray-200" />
              </div>

              {/* Video Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video) => (
                  <div
                    key={video.id}
                    onClick={() => setSelectedVideo(video)}
                    className="w-full max-w-[320px] bg-white rounded-xl shadow-lg overflow-hidden flex flex-col cursor-pointer"
                  >
                    {/* Thumbnail Container with Play Button Overlay */}
                    <div className="relative w-full h-48 bg-gray-100 group">
                      {/* Add subtle pattern background */}
                      <div className="absolute inset-0 opacity-10" 
                        style={{ 
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")` 
                        }} 
                      />
                      
                      <img
                        src={video.thumbnail || '/default-thumbnail.jpg'}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Play button overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/20 to-transparent">
                        <div className="w-12 h-12 bg-blue-500/90 rounded-full flex items-center justify-center border-2 border-blue-500">
                          <Play className="w-6 h-6 text-white fill-current" />
                        </div>
                      </div>
                      {/* Premium Badge */}
                      {video.accessLevel === 'premium' && (
                        <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded text-xs font-semibold">
                          Premium
                        </div>
                      )}
                    </div>

                    {/* Content Section */}
                    <div className="p-6 flex flex-col flex-1 border-t border-gray-100">
                      {/* Subject + Unit tag */}
                      <div className="mb-4">
                        <span className="inline-flex px-2.5 py-1 rounded-md text-sm font-medium bg-gray-100 text-gray-600">
                          {subject.includes('Macro') ? 'AP Macro' : 'AP Micro'} • Unit {video.unit}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                        {video.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-gray-600 mb-6 line-clamp-2">
                        {video.description}
                      </p>

                      {/* Tags at bottom */}
                      <div className="mt-auto flex flex-wrap gap-2">
                        {video.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`px-2.5 py-1 rounded-md text-xs font-medium ${
                              subject.includes('Macro')
                                ? 'bg-blue-100 text-blue-600'
                                : 'bg-green-100 text-green-600'
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
                
                {videos.length === 0 && (
                  <div className="col-span-full text-center py-8 text-gray-500">
                    No videos available for this unit yet.
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <VideoModal
          videoUrl={selectedVideo.videoUrl}
          questions={selectedVideo.questions}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </>
  );
}