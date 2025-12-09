import React from 'react';

/**
 * Calculate reading time in minutes based on word count
 * Assumes average reading speed of 200 words per minute
 */
export function calculateReadingTime(content: React.ReactNode): number {
  // Extract text from React nodes recursively
  const extractText = (node: React.ReactNode): string => {
    if (typeof node === 'string') {
      return node;
    }
    if (typeof node === 'number') {
      return String(node);
    }
    if (Array.isArray(node)) {
      return node.map(extractText).join(' ');
    }
    if (React.isValidElement(node) && node.props.children) {
      return extractText(node.props.children);
    }
    return '';
  };
  
  const text = extractText(content);
  
  // Remove HTML tags and count words
  const cleanText = text.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  const wordCount = cleanText.split(/\s+/).filter(word => word.length > 0).length;
  
  // Average reading speed: 200 words per minute for general content
  // For educational blog posts with graphs and interactive elements, adjust to ~150 words/min
  // This accounts for time spent viewing images, graphs, and interactive elements
  const readingTime = Math.ceil(wordCount / 150);
  
  return Math.max(1, readingTime); // Minimum 1 minute
}

