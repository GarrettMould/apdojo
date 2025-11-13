'use client';

import { useState, useEffect } from 'react';

interface GuestSubjectSelectorProps {
  onSubjectSelect: (subject: 'micro' | 'macro') => void;
}

export function GuestSubjectSelector({ onSubjectSelect }: GuestSubjectSelectorProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-10 p-12 bg-white rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-3">
            Choose Your Focus
          </h2>
          <p className="text-lg text-gray-600">
            Select the primary AP subject you'll be studying with AP Dojo.
          </p>
        </div>
        
        <div className="space-y-6">
          <button 
            onClick={() => onSubjectSelect('macro')} 
            className="w-full flex items-center p-6 border rounded-lg cursor-pointer transition-all duration-200 hover:border-blue-500 hover:shadow-md hover:shadow-blue-100/50 bg-white hover:bg-blue-50"
          >
            <div className="flex-1 text-left">
              <span className="block text-xl font-semibold text-gray-900">AP Macroeconomics</span>
              <span className="block text-base text-gray-500 mt-1">Study of the economy as a whole.</span>
            </div>
            <div className="w-6 h-6 rounded-full border-2 border-gray-300 group-hover:border-blue-500"></div>
          </button>
          <button 
            onClick={() => onSubjectSelect('micro')} 
            className="w-full flex items-center p-6 border rounded-lg cursor-pointer transition-all duration-200 hover:border-green-500 hover:shadow-md hover:shadow-green-100/50 bg-white hover:bg-green-50"
          >
            <div className="flex-1 text-left">
              <span className="block text-xl font-semibold text-gray-900">AP Microeconomics</span>
              <span className="block text-base text-gray-500 mt-1">Study of individual and firm decisions.</span>
            </div>
            <div className="w-6 h-6 rounded-full border-2 border-gray-300 group-hover:border-green-500"></div>
          </button>
        </div>
        
        <p className="text-center text-base text-gray-500">
          You'll be able to view resources for your selected subject.
        </p>
      </div>
    </div>
  );
}

// Hook to handle guest subject selection logic
export function useGuestSubject() {
  const [isClient, setIsClient] = useState(false);
  const [guestSubject, setGuestSubject] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      const storedGuestSubject = localStorage.getItem('guestAPSubject');
      setGuestSubject(storedGuestSubject);
    }
  }, []);

  const handleGuestSubjectSelect = (subject: 'micro' | 'macro') => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('guestAPSubject', subject);
      setGuestSubject(subject);
    }
  };

  return {
    isClient,
    guestSubject,
    handleGuestSubjectSelect
  };
} 