'use client';

import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import dynamic from 'next/dynamic';
import '@excalidraw/excalidraw/index.css';

const Excalidraw = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  {
    ssr: false,
  },
);

interface ExamWhiteboardProps {
  onClose: () => void;
}

export function ExamWhiteboard({ onClose }: ExamWhiteboardProps) {
  const [excalidrawElements, setExcalidrawElements] = useState<any[]>([]);
  const [excalidrawAppState, setExcalidrawAppState] = useState<any>(null);
  
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const whiteboardRef = useRef<HTMLDivElement>(null);


  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    // Only start dragging if clicking on the header
    if ((e.target as HTMLElement).closest('.whiteboard-header')) {
      setIsDragging(true);
      const rect = whiteboardRef.current?.getBoundingClientRect();
      if (rect) {
        if (!position) {
          setPosition({
            x: rect.left,
            y: rect.top
          });
        }
        setDragStart({
          x: e.clientX - (position?.x || rect.left),
          y: e.clientY - (position?.y || rect.top)
        });
      }
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && whiteboardRef.current) {
        const newX = e.clientX - dragStart.x;
        const newY = e.clientY - dragStart.y;
        
        const maxX = window.innerWidth - whiteboardRef.current.offsetWidth;
        const maxY = window.innerHeight - whiteboardRef.current.offsetHeight;
        
        setPosition({
          x: Math.max(0, Math.min(newX, maxX)),
          y: Math.max(0, Math.min(newY, maxY))
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart]);

  return (
    <div
      ref={whiteboardRef}
      className="fixed z-50 bg-white border border-gray-200 rounded-lg shadow-lg"
      style={{
        ...(position ? {
          left: `${position.x}px`,
          top: `${position.y}px`,
          right: 'auto',
          bottom: 'auto'
        } : {
          right: '32px',
          bottom: '120px', // Position above calculator button
          left: 'auto',
          top: 'auto'
        }),
        width: '400px',
        height: '300px'
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Header */}
      <div className="whiteboard-header bg-white border-b border-gray-200 px-3 py-2 flex items-center justify-between cursor-move rounded-t-md">
        <span className="text-sm font-semibold text-gray-900">Drawing Pad</span>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded p-1 transition-colors"
          aria-label="Close whiteboard"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Excalidraw */}
      <div className="relative bg-white" style={{ height: 'calc(100% - 48px)' }}>
        <Excalidraw
          zenModeEnabled={true}
          viewModeEnabled={false}
          gridModeEnabled={false}
          UIOptions={{
            canvasActions: {
              toggleTheme: false, // Hide dark mode toggle
              changeViewBackgroundColor: false, // Hide background color picker
              loadScene: false, // Hide load scene option
              saveToActiveFile: false, // Hide save option
              export: false, // Hide export option (removes export/share links)
            },
          }}
          initialData={{
            elements: excalidrawElements,
            appState: {
              ...excalidrawAppState,
              zenModeEnabled: true,
              theme: "light", // Force light theme
              // Set default pencil thickness to 1 (thinner)
              currentItemStrokeWidth: excalidrawAppState?.currentItemStrokeWidth ?? 1,
            },
          }}
          onChange={(elements, appState) => {
            setExcalidrawElements(elements);
            setExcalidrawAppState(appState);
          }}
        />
      </div>
    </div>
  );
}







