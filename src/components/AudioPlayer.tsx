'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';

interface AudioPlayerProps {
  src: string;
  className?: string;
}

export function AudioPlayer({ src, className = '' }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (seconds: number): string => {
    if (isNaN(seconds) || !isFinite(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  // Generate sound wave bars (12 bars total)
  const numBars = 12;
  const bars = Array.from({ length: numBars }, (_, i) => {
    // Calculate which bars should be purple based on progress
    const barProgress = (i + 1) / numBars * 100;
    const isPurple = barProgress <= progress;
    
    // Varying heights for visual interest (waveform effect)
    const heights = [20, 32, 24, 40, 28, 36, 22, 38, 26, 34, 30, 36];
    const height = heights[i] || 30;
    
    return { height, isPurple, index: i };
  });

  return (
    <div className={`bg-white border-2 border-gray-300 rounded-lg p-4 shadow-sm ${className}`}>
      <audio ref={audioRef} src={src} preload="metadata" />
      <div className="flex items-center gap-4">
        {/* Purple Play Button */}
        <button
          onClick={togglePlay}
          className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center transition-colors"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <Pause className="w-6 h-6" fill="currentColor" />
          ) : (
            <Play className="w-6 h-6 ml-1" fill="currentColor" />
          )}
        </button>
        
        {/* Sound Wave Bars */}
        <div className="flex-1 min-w-0">
          <div className="flex items-end gap-1.5 h-12 mb-2">
            {bars.map((bar) => (
              <div
                key={bar.index}
                className={`flex-1 rounded-sm transition-all duration-300 ${
                  bar.isPurple 
                    ? 'bg-purple-600' 
                    : 'bg-gray-300'
                } ${
                  isPlaying && bar.isPurple ? 'animate-pulse' : ''
                }`}
                style={{
                  height: `${bar.height}px`,
                  minHeight: '8px',
                  animationDelay: isPlaying && bar.isPurple ? `${bar.index * 0.1}s` : '0s'
                }}
              />
            ))}
          </div>
          
          {/* Time Display */}
          <div className="flex justify-between text-sm text-gray-600">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
