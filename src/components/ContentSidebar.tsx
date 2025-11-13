import React from 'react';

export const ContentSidebar = () => {
  // Sample lorem ipsum bullet points
  const bulletPoints = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    "Sed do eiusmod tempor incididunt ut labore",
    "Ut enim ad minim veniam, quis nostrud exercitation",
    "Duis aute irure dolor in reprehenderit",
    "Excepteur sint occaecat cupidatat non proident",
    "Sunt in culpa qui officia deserunt mollit",
    "Nisi ut aliquip ex ea commodo consequat",
    "Lorem ipsum dolor sit amet, consectetur"
  ];

  return (
    <div className="w-80 bg-white rounded-xl shadow-lg border border-gray-100 p-6 h-fit">
      <h2 className="text-2xl font-extrabold tracking-tight mb-6">
        AP Dojo <span className="text-blue-700">Study Mode</span>
      </h2>
      
      <ul className="space-y-4">
        {bulletPoints.map((point, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="text-blue-700 mt-1.5">•</span>
            <span className="text-gray-600 text-sm leading-relaxed">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}; 