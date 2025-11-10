'use client';

import { X } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSlug: string;
}

export function VideoModal({ isOpen, onClose, videoSlug }: VideoModalProps) {
  if (!isOpen) return null;

  const videoSrc = `https://www.youtube.com/embed/${videoSlug}`;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-black rounded-lg shadow-2xl w-full max-w-4xl aspect-video relative"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the video player
      >
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 w-10 h-10 bg-white text-gray-800 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors z-10 shadow-lg"
          aria-label="Close video player"
        >
          <X className="w-6 h-6" />
        </button>
        <iframe
          src={videoSrc}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full rounded-lg"
        ></iframe>
      </div>
    </div>
  );
} 