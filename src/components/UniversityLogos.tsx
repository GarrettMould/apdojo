'use client';

import React from 'react';
import Image from 'next/image';

interface UniversityLogoProps {
  src: string;
  alt: string;
}

const logosData: UniversityLogoProps[] = [
  { src: '/images/universitylogos/brownbw.png', alt: 'Brown University' },
  { src: '/images/universitylogos/denverbw.png', alt: 'University of Denver' },
  { src: '/images/universitylogos/illinoisbw.png', alt: 'University of Illinois' },
  { src: '/images/universitylogos/indianabw.png', alt: 'Indiana University' },
  { src: '/images/universitylogos/ricebw.png', alt: 'Rice University' },
  { src: '/images/universitylogos/uclabw.png', alt: 'UCLA' },
  { src: '/images/universitylogos/yalebw.png', alt: 'Yale University' },
  // Add more logos as needed
];

export const UniversityLogos: React.FC<{
  title?: React.ReactNode;
  showTitle?: boolean;
  className?: string;
}> = ({
  title = (
    <>
      Our Students Get <span className="text-blue-500">Results</span>
    </>
  ),
  showTitle = true,
  className,
}) => {
  const extendedLogos = [...logosData, ...logosData];

  return (
    <div className={`w-full overflow-hidden ${className ?? ''}`}>
      {showTitle && (
        <h2 className="text-3xl sm:text-4xl font-black text-center text-gray-900 mb-6">
          {title}
        </h2>
      )}

      <div className="relative w-full">
        <div className="animate-scroll flex items-center space-x-14 sm:space-x-16 md:space-x-20 lg:space-x-24">
          {extendedLogos.map((logo, index) => (
            <div key={index} className="flex-shrink-0">
              <div className="relative h-14 w-28 sm:h-16 sm:w-32 md:h-20 md:w-40 lg:h-24 lg:w-48">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  className="object-contain"
                  unoptimized={true}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UniversityLogos; 