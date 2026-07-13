'use client';

import React from 'react';
import { PlayCircle, X } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title?: string;
  aspectRatio?: 'vertical' | 'horizontal';
}

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  videoUrl,
  title = 'Video walkthrough',
  aspectRatio = 'horizontal',
}) => {
  if (!isOpen) return null;

  const isVertical = aspectRatio === 'vertical';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
    >
      <div
        className={`relative w-full overflow-hidden rounded-2xl border-2 border-gray-900 bg-white shadow-[8px_8px_0px_0px_rgba(17,24,39,0.85)] ${
          isVertical ? 'max-w-md' : 'max-w-4xl'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 border-b border-gray-200 bg-gray-50 px-4 py-3 sm:px-5">
          <div className="flex min-w-0 items-center gap-2.5">
            <PlayCircle className="h-5 w-5 shrink-0 text-gray-700" aria-hidden />
            <h2 className="truncate text-sm font-black tracking-tight text-gray-900 sm:text-base">{title}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-300 bg-white p-1.5 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
            aria-label="Close video player"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className={`bg-black ${!isVertical ? 'aspect-video' : ''}`}>
          <video
            src={videoUrl}
            controls
            autoPlay
            className={`h-full w-full ${isVertical ? 'max-h-[75vh]' : ''}`}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
};
