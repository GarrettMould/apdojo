'use client';

import React from 'react';
import { X } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  aspectRatio?: 'vertical' | 'horizontal';
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, videoUrl, aspectRatio = 'horizontal' }) => {
  if (!isOpen) return null;

  const isVertical = aspectRatio === 'vertical';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div 
        className={`bg-white rounded-lg shadow-2xl w-full p-4 relative transition-all duration-300 ${
          isVertical ? 'max-w-md' : 'max-w-4xl'
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 transition-colors z-10"
          aria-label="Close video player"
        >
          <X className="w-6 h-6" />
        </button>
        <div className={!isVertical ? 'aspect-video' : ''}>
          <video
            src={videoUrl}
            controls
            autoPlay
            className={`w-full h-full rounded-md ${
              isVertical ? 'max-h-[80vh]' : ''
            }`}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
}; 