'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const MCQPracticePreview = () => {
  const [selectedType, setSelectedType] = useState('multiple choice');

  const questionTypes = [
    { id: 'multiple choice', label: 'multiple choice' },
    { id: 'free response', label: 'free response' },
    { id: 'case question', label: 'case question' }
  ];

  return (
    <div className="bg-gray-50 p-8 rounded-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Section - Question Type Selection */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-800 leading-tight">
            get the type of questions<br />
            that work best for you
          </h2>
          
          <div className="flex flex-wrap gap-3">
            {questionTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  selectedType === type.id
                    ? 'bg-green-700 text-white'
                    : 'bg-white text-gray-700 border border-green-700 hover:bg-green-50'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right Section - MCQCard1 with Stacked Background */}
        <div className="relative">
          {/* Background Stacked Blank Cards */}
          <div className="absolute inset-0 -z-20">
            <div className="w-full h-80 bg-gray-200 rounded-xl transform rotate-3 translate-x-2 translate-y-1 opacity-40"></div>
          </div>
          <div className="absolute inset-0 -z-10">
            <div className="w-full h-80 bg-gray-200 rounded-xl transform -rotate-2 -translate-x-1 translate-y-2 opacity-30"></div>
          </div>
          
          {/* Main MCQCard1 */}
          <div className="relative z-10">
            <Image
              src="/images/MCQCard1.png"
              alt="MCQ Practice Card"
              width={400}
              height={320}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>

      {/* Bottom Section - Call to Action */}
      <div className="text-center mt-8">
        <Button className="bg-green-700 hover:bg-green-800 text-white px-8 py-4 text-lg font-semibold rounded-lg">
          try it free
        </Button>
      </div>
    </div>
  );
};

export default MCQPracticePreview;
