import React from 'react';
import { LucideIcon } from 'lucide-react';

interface DojoThumbnailProps {
  type: 'micro' | 'macro' | 'drill' | 'exam' | 'resource';
  title: string;
  icon: LucideIcon;
  unitNumber?: string;
  className?: string;
}

const DojoThumbnail: React.FC<DojoThumbnailProps> = ({
  type,
  title,
  icon: Icon,
  unitNumber,
  className = '',
}) => {
  // Color mapping
  const colorMap = {
    micro: 'bg-green-500',
    macro: 'bg-blue-600',
    drill: 'bg-yellow-400',
    exam: 'bg-red-500',
    resource: 'bg-gray-800',
  };

  // Icon color - black for yellow background, white for others
  const iconColor = type === 'drill' ? 'text-black' : 'text-white';

  // Extract first letter for watermark
  const watermarkLetter = title.charAt(0).toUpperCase();

  // Background color class
  const bgColor = colorMap[type];

  return (
    <div className={`relative aspect-video overflow-hidden border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${className}`}>
      {/* Background Layer */}
      <div className={`absolute inset-0 ${bgColor}`} />

      {/* Texture Layer - Dot Grid Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle, black 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
        }}
      />

      {/* Watermark Layer */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="text-9xl font-black text-black opacity-10 select-none"
          style={{ transform: 'rotate(-15deg)' }}
        >
          {watermarkLetter}
        </span>
      </div>

      {/* Content Layer - Icon */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <Icon className={`w-16 h-16 ${iconColor} drop-shadow-md`} />
      </div>

      {/* Tech Decals */}
      
      {/* Top-Left: Unit Number */}
      <div className="absolute top-2 left-2 z-20">
        <span className="text-xs font-mono font-bold text-white drop-shadow-md">
          UNIT {unitNumber || '00'}
        </span>
      </div>

      {/* Bottom-Right: Barcode */}
      <div className="absolute bottom-2 right-2 z-20 flex gap-1">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-1 bg-white opacity-80"
            style={{ height: `${8 + i * 4}px` }}
          />
        ))}
      </div>

      {/* Corner Brackets - Top-Left */}
      <div className="absolute top-1 left-1 z-20">
        <div className="w-4 h-4 border-t-2 border-l-2 border-white opacity-80" />
      </div>

      {/* Corner Brackets - Top-Right */}
      <div className="absolute top-1 right-1 z-20">
        <div className="w-4 h-4 border-t-2 border-r-2 border-white opacity-80" />
      </div>

      {/* Corner Brackets - Bottom-Left */}
      <div className="absolute bottom-1 left-1 z-20">
        <div className="w-4 h-4 border-b-2 border-l-2 border-white opacity-80" />
      </div>

      {/* Corner Brackets - Bottom-Right */}
      <div className="absolute bottom-1 right-1 z-20">
        <div className="w-4 h-4 border-b-2 border-r-2 border-white opacity-80" />
      </div>
    </div>
  );
};

export default DojoThumbnail;

