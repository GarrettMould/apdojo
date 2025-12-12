'use client';

import { useState, useEffect, useRef } from 'react';
import { X, ArrowUp, ArrowDown, Image as ImageIcon } from 'lucide-react';
import { logger } from '@/utils/logger';

interface BlogImagePlacerProps {
  images: string[];
}

/**
 * Development-only tool for visually placing images in blog posts
 * Only active when NODE_ENV === 'development'
 */
export function BlogImagePlacer({ images }: BlogImagePlacerProps) {
  const [isActive, setIsActive] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [hoveredElement, setHoveredElement] = useState<HTMLElement | null>(null);
  const [clickedElement, setClickedElement] = useState<HTMLElement | null>(null);
  const [showArrows, setShowArrows] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Only show in development
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') {
      return;
    }
  }, []);

  // Don't render if not in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  useEffect(() => {
    if (!isActive) return;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Only highlight headers, subheadings, and divs
      if (
        target.tagName === 'H1' ||
        target.tagName === 'H2' ||
        target.tagName === 'H3' ||
        target.tagName === 'H4' ||
        target.tagName === 'H5' ||
        target.tagName === 'H6' ||
        target.tagName === 'DIV'
      ) {
        // Skip if it's part of our tool UI
        if (target.closest('[data-image-placer]')) {
          return;
        }
        setHoveredElement(target);
        target.style.outline = '2px solid #3b82f6';
        target.style.cursor = 'pointer';
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (hoveredElement && target === hoveredElement) {
        target.style.outline = '';
        target.style.cursor = '';
        setHoveredElement(null);
      }
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Skip if clicking on our tool UI
      if (target.closest('[data-image-placer]')) {
        return;
      }

      if (
        (target.tagName === 'H1' ||
          target.tagName === 'H2' ||
          target.tagName === 'H3' ||
          target.tagName === 'H4' ||
          target.tagName === 'H5' ||
          target.tagName === 'H6' ||
          target.tagName === 'DIV') &&
        selectedImageIndex !== null
      ) {
        e.preventDefault();
        e.stopPropagation();
        setClickedElement(target);
        setShowArrows(true);
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('click', handleClick, true);
      // Clean up any remaining outlines
      if (hoveredElement) {
        hoveredElement.style.outline = '';
        hoveredElement.style.cursor = '';
      }
    };
  }, [isActive, selectedImageIndex, hoveredElement]);

  const handlePlaceImage = (position: 'before' | 'after') => {
    if (clickedElement && selectedImageIndex !== null) {
      // Generate a unique selector for the element
      const selector = generateSelector(clickedElement);
      const code = `[IMAGE:${selectedImageIndex}]`;
      
      // Copy to clipboard
      navigator.clipboard.writeText(code).then(() => {
        logger.log('📸 Image Placement:');
        logger.log(`Image Index: ${selectedImageIndex}`);
        logger.log(`Image Path: ${images[selectedImageIndex]}`);
        logger.log(`Target: ${selector}`);
        logger.log(`Position: ${position}`);
        logger.log(`\n✅ Code copied to clipboard: ${code}`);
        logger.log(`\n💡 Add this code ${position === 'before' ? 'before' : 'after'} the selected element in your blog post content.`);
        
        // Show a temporary success message
        const message = document.createElement('div');
        message.textContent = `✅ Copied: ${code}`;
        message.style.cssText = `
          position: fixed;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: #10b981;
          color: white;
          padding: 12px 24px;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          z-index: 10000;
          font-weight: 600;
        `;
        document.body.appendChild(message);
        setTimeout(() => message.remove(), 2000);
      });
      
      // Reset state
      setClickedElement(null);
      setShowArrows(false);
      setSelectedImageIndex(null);
    }
  };

  const generateSelector = (element: HTMLElement): string => {
    // Try to find a unique identifier
    if (element.id) {
      return `#${element.id}`;
    }
    
    // Try to find text content for headers
    if (element.tagName.startsWith('H')) {
      const text = element.textContent?.trim().substring(0, 50) || '';
      return `${element.tagName.toLowerCase()}:contains("${text}")`;
    }
    
    // Fallback to a path-based selector
    const path: string[] = [];
    let current: HTMLElement | null = element;
    while (current && current !== document.body) {
      let selector = current.tagName.toLowerCase();
      if (current.className) {
        const classes = current.className.split(' ').filter(c => c).join('.');
        if (classes) selector += `.${classes}`;
      }
      path.unshift(selector);
      current = current.parentElement;
    }
    return path.join(' > ');
  };

  if (!isActive) {
    return (
      <div
        data-image-placer
        className="fixed bottom-4 right-4 z-50"
      >
        <button
          onClick={() => setIsActive(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
          title="Activate Image Placer (Dev Only)"
        >
          <ImageIcon className="w-4 h-4" />
          Image Placer
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Tool Panel */}
      <div
        data-image-placer
        className="fixed top-4 right-4 z-50 bg-white border-2 border-blue-500 rounded-lg shadow-xl p-4 max-w-sm"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-900">Image Placer (Dev)</h3>
          <button
            onClick={() => {
              setIsActive(false);
              setSelectedImageIndex(null);
              setClickedElement(null);
              setShowArrows(false);
            }}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Select Image:
            </label>
            <div className="grid grid-cols-2 gap-2">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedImageIndex(index);
                    setClickedElement(null);
                    setShowArrows(false);
                  }}
                  className={`p-2 border-2 rounded ${
                    selectedImageIndex === index
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="text-xs font-medium">Image {index}</div>
                  <div className="text-xs text-gray-500 truncate">{img.split('/').pop()}</div>
                </button>
              ))}
            </div>
            {selectedImageIndex !== null && (
              <div className="mt-2 text-sm text-green-600 font-medium">
                ✓ Image {selectedImageIndex} selected
              </div>
            )}
          </div>

          <div className="text-sm text-gray-600">
            {selectedImageIndex === null ? (
              <p>1. Select an image above</p>
            ) : clickedElement ? (
              <p>3. Choose placement:</p>
            ) : (
              <p>2. Click on a header or div to place the image</p>
            )}
          </div>
        </div>
      </div>

      {/* Arrow Buttons */}
      {showArrows && clickedElement && (
        <div
          data-image-placer
          className="fixed z-50"
          style={{
            top: `${clickedElement.getBoundingClientRect().top + window.scrollY}px`,
            left: `${clickedElement.getBoundingClientRect().left - 60}px`,
          }}
        >
          <div className="flex flex-col gap-2">
            <button
              onClick={() => handlePlaceImage('before')}
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg transition-transform hover:scale-110"
              title="Place image above"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
            <button
              onClick={() => handlePlaceImage('after')}
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg transition-transform hover:scale-110"
              title="Place image below"
            >
              <ArrowDown className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
