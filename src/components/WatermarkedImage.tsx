import React from 'react';
import Image from 'next/image';

interface WatermarkedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  showWatermark?: boolean;
  watermarkPosition?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' | 'center';
  watermarkText?: string;
  watermarkLogo?: string;
}

export function WatermarkedImage({
  src,
  alt,
  width,
  height,
  className = '',
  showWatermark = true,
  watermarkPosition = 'bottom-right',
  watermarkText = 'AP Dojo',
  watermarkLogo
}: WatermarkedImageProps) {
  const getWatermarkPositionClasses = () => {
    switch (watermarkPosition) {
      case 'bottom-right':
        return 'bottom-4 right-4';
      case 'bottom-left':
        return 'bottom-4 left-4';
      case 'top-right':
        return 'top-4 right-4';
      case 'top-left':
        return 'top-4 left-4';
      case 'center':
        return 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2';
      default:
        return 'bottom-4 right-4';
    }
  };

  const getTextAnchor = () => {
    switch (watermarkPosition) {
      case 'bottom-right':
      case 'top-right':
        return 'text-right';
      case 'bottom-left':
      case 'top-left':
        return 'text-left';
      case 'center':
        return 'text-center';
      default:
        return 'text-right';
    }
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-auto"
      />
      
      {showWatermark && (
        <div className={`absolute ${getWatermarkPositionClasses()}`}>
          {watermarkLogo ? (
            // Logo watermark
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg border border-gray-200">
              <Image
                src={watermarkLogo}
                alt="AP Dojo"
                width={40}
                height={40}
                className="w-10 h-10"
              />
            </div>
          ) : (
            // Text watermark
            <div className={`
              bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg border border-gray-200
              ${getTextAnchor()}
            `}>
              <span className="text-sm font-bold text-blue-600 tracking-wide">
                {watermarkText}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Alternative component for downloadable images with more prominent watermark
export function DownloadableWatermarkedImage({
  src,
  alt,
  width,
  height,
  className = '',
  watermarkPosition = 'bottom-right',
  watermarkText = 'AP Dojo',
  watermarkLogo
}: WatermarkedImageProps) {
  const getWatermarkPositionClasses = () => {
    switch (watermarkPosition) {
      case 'bottom-right':
        return 'bottom-6 right-6';
      case 'bottom-left':
        return 'bottom-6 left-6';
      case 'top-right':
        return 'top-6 right-6';
      case 'top-left':
        return 'top-6 left-6';
      case 'center':
        return 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2';
      default:
        return 'bottom-6 right-6';
    }
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-auto"
      />
      
      {/* Prominent watermark for downloadable images */}
      <div className={`absolute ${getWatermarkPositionClasses()}`}>
        {watermarkLogo ? (
          // Large logo watermark
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-xl border-2 border-blue-200">
            <Image
              src={watermarkLogo}
              alt="AP Dojo"
              width={60}
              height={60}
              className="w-15 h-15"
            />
          </div>
        ) : (
          // Large text watermark
          <div className="bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-xl border-2 border-blue-200">
            <span className="text-lg font-bold text-blue-600 tracking-wider">
              {watermarkText}
            </span>
          </div>
        )}
      </div>
      
      {/* Additional subtle watermark in corner */}
      <div className="absolute top-2 left-2">
        <div className="bg-black/20 text-white text-xs px-2 py-1 rounded">
          {watermarkText}
        </div>
      </div>
    </div>
  );
} 