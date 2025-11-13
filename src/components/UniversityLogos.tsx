'use client';

import React from 'react';
import Image from 'next/image'; // Import Next.js Image component for optimized images

// Define a type for the logo props
interface UniversityLogoProps {
  src: string;
  alt: string;
}

// Updated logos with your images
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

export const UniversityLogos: React.FC = () => {
  // Duplicate logos for a seamless scroll effect
  const extendedLogos = [...logosData, ...logosData];

  return (
    <div className="py-40 overflow-hidden">
      {/* <h1 style={{fontSize: '40px', color: 'red', backgroundColor: 'yellow', padding: '20px'}}>DEBUGGING UNIVERSITY LOGOS - VERSION X789</h1> */}
      <div className="container mx-auto">
        <h2 className="text-5xl font-semibold text-center text-gray-800 mb-10">
          Our Students Get <span className='text-blue-500'>Results</span>
        </h2>
        <div className="relative w-full">
          <div className="animate-scroll flex items-center space-x-16 md:space-x-20 lg:space-x-24">
            {extendedLogos.map((logo, index) => (
              <div key={index} className="flex-shrink-0">
                <div className="relative h-16 w-32 md:h-20 md:w-40 lg:h-24 lg:w-48">
                  <Image 
                    src={logo.src} 
                    alt={logo.alt} 
                    layout="fill"
                    objectFit="contain"
                    unoptimized={true} // Good for SVGs or if optimization causes issues, can test without
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversityLogos; 