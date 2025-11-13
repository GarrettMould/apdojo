'use client';

import React, { useState } from 'react';
import { Zap, PlaySquare, FileText, MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react'; // Example icons and navigation icons
import Image from 'next/image'; // Import the Next.js Image component

interface FeatureItemData {
  icon?: React.ElementType; // Make icon optional
  imageSrc?: string; // Add imageSrc for custom images
  text: string;
  // Optional: Add more fields if needed, like a detailed description for the active view
}

// This component can remain if you want to style the individual displayed feature specifically
const DisplayedFeature: React.FC<FeatureItemData> = ({ icon: Icon, imageSrc, text }) => {
  return (
    <div className="flex flex-col items-center text-center p-8 my-8 min-h-[200px]">
      {/* Feature Text - Moved above and styled for more prominence */}
      <p className="text-3xl font-bold text-gray-900 mb-6">{text}</p>

      <div className="mb-6 shadow-md flex items-center justify-center w-full max-w-3xl">
        {imageSrc ? (
          <Image src={imageSrc} alt={text} width={1200} height={750} className="max-w-full h-auto border-4 border-black rounded-lg object-contain" />
        ) : Icon ? (
          <div className="bg-slate-200 p-6 rounded-full">
        <Icon size={48} className="text-blue-600" /> 
          </div>
        ) : null}
      </div>
    </div>
  );
};

export function MainFeaturesPreview() {
  const [activeIndex, setActiveIndex] = useState(0);
  const features: FeatureItemData[] = [
    { icon: Zap, text: 'Personalized MCQs' },
    { imageSrc: '/images/mainfeaturespreview/frqhelper.png', text: 'Instant FRQ Feedback' },
    { icon: PlaySquare, text: 'Interactive Videos' },
    { icon: FileText, text: 'Full Practice Exams' },
    { icon: MessageSquare, text: 'AI Dojo Feedback' },
  ];

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
  };

  // Optional: Add next/prev button handlers if you want arrows
  // const handlePrev = () => setActiveIndex((prev) => (prev - 1 + features.length) % features.length);
  // const handleNext = () => setActiveIndex((prev) => (prev + 1) % features.length);

  const currentFeature = features[activeIndex];

  return (
    <section className="py-16 sm:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
            Ace Your Exam with AP Dojo
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600">
            Get access to thousands of practice questions, customized learning paths, interactive videos, and AI-driven insights to help you study smarter, not harder.
          </p>
        </div>

        {/* Centered Feature Display */}
        <div className="mt-12 md:mt-16">
          {currentFeature && (
            <DisplayedFeature icon={currentFeature.icon} imageSrc={currentFeature.imageSrc} text={currentFeature.text} />
          )}
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center space-x-3 mt-8">
          {features.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-150 focus:outline-none ${
                activeIndex === index ? 'bg-blue-600 scale-125' : 'bg-slate-300 hover:bg-slate-400'
              }`}
              aria-label={`Go to feature ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Optional: Arrow Navigation 
        <div className="flex justify-center space-x-4 mt-8">
          <button onClick={handlePrev} className="p-2 rounded-full hover:bg-slate-200 focus:outline-none"><ChevronLeft size={24} /></button>
          <button onClick={handleNext} className="p-2 rounded-full hover:bg-slate-200 focus:outline-none"><ChevronRight size={24} /></button>
        </div>
        */}
      </div>
    </section>
  );
} 