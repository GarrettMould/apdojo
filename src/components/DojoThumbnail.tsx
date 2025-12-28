import React from 'react';
import { LucideIcon } from 'lucide-react';
import Image from 'next/image';

interface DojoThumbnailProps {
  type: 'micro' | 'macro' | 'drill' | 'exam' | 'resource';
  title: string;
  icon: LucideIcon;
  unitNumber?: string;
  className?: string;
  xpReward?: number;
  activityType?: string; // e.g., "drill", "full exam", "unit test", "FRQ"
}

const DojoThumbnail: React.FC<DojoThumbnailProps> = ({
  type,
  title,
  icon: Icon,
  unitNumber,
  className = '',
  xpReward,
  activityType,
}) => {
  // Color mapping - light/opaque versions
  const colorMap = {
    micro: 'bg-green-100',
    macro: 'bg-blue-100',
    drill: 'bg-yellow-100',
    exam: 'bg-red-100',
    resource: 'bg-gray-100',
  };

  // Icon color - darker for light backgrounds
  const iconColor = type === 'drill' ? 'text-yellow-700' : type === 'micro' ? 'text-green-700' : type === 'macro' ? 'text-blue-700' : type === 'exam' ? 'text-red-700' : 'text-gray-700';

  // Background color class
  const bgColor = colorMap[type];

  // Format activity type text - capitalize first letter
  const activityTypeText = activityType || (type === 'drill' ? 'Drill' : type === 'exam' ? 'Exam' : type === 'micro' ? 'Micro' : type === 'macro' ? 'Macro' : 'Resource');

  return (
    <div className={`relative aspect-video overflow-hidden border border-gray-200 ${className}`}>
      {/* Background Layer */}
      <div className={`absolute inset-0 ${bgColor} opacity-60`} />

      {/* Texture Layer - Subtle Dot Grid Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle, black 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
        }}
      />

      {/* Top-Left: Unit Number in Normal Font */}
      {unitNumber && (
        <div className="absolute top-3 left-3 z-20">
          <span className="text-lg font-bold text-gray-800 drop-shadow-sm">
            Unit {unitNumber}
          </span>
        </div>
      )}

      {/* Top-Right: XP Reward - Normal Font (not whiteboard) */}
      {xpReward !== undefined && (
        <div className="absolute top-3 right-3 z-20 bg-transparent">
          <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-800 bg-transparent">
            <span className="bg-transparent">{xpReward.toLocaleString()}</span>
            <span className="inline-flex items-center bg-transparent">
              <Image
                src="/images/flame100.png"
                alt="XP Flame"
                width={20}
                height={20}
                className="w-5 h-5"
              />
            </span>
          </div>
        </div>
      )}

      {/* Bottom-Right: Activity Type in Whiteboard Font */}
      {activityType && (
        <div className="absolute bottom-3 right-3 z-20">
          <span className="text-2xl font-bold text-gray-800 drop-shadow-sm" style={{ fontFamily: 'Permanent Marker, cursive' }}>
            {activityTypeText}
          </span>
        </div>
      )}
    </div>
  );
};

export default DojoThumbnail;

