'use client';

import React from 'react';

interface PageHeaderProps {
  title: string;
  subject?: 'macro' | 'micro';
  subtitle?: string;
  className?: string;
}

export function PageHeader({ 
  title, 
  subject, 
  subtitle, 
  className = "" 
}: PageHeaderProps) {
  const getSubjectColor = () => {
    if (!subject) return '';
    return subject === 'macro' ? 'text-blue-500' : 'text-green-600';
  };

  const getSubjectName = () => {
    if (!subject) return '';
    return subject === 'macro' ? 'Macroeconomics' : 'Microeconomics';
  };

  const renderTitle = () => {
    if (!title.includes('{subject}')) {
      return title;
    }

    const parts = title.split('{subject}');
    if (parts.length !== 2) {
      return title;
    }

    return (
      <>
        {parts[0]}
        <span className={getSubjectColor()}>
          {getSubjectName()}
        </span>
        {subject === 'micro' && <br />}
        {parts[1]}
      </>
    );
  };

  return (
    <div className={`text-center mb-12 ${className}`}>
      <h1 className="text-6xl font-extrabold tracking-tight leading-tight mb-6">
        {renderTitle()}
      </h1>
      {subtitle && (
        <p className="text-lg text-gray-600">
          {subtitle}
        </p>
      )}
    </div>
  );
} 