'use client';

import React, { useState, useRef, useEffect } from 'react';
import { X, Pen, Eraser, Trash2 } from 'lucide-react';

interface ExamWhiteboardProps {
  onClose: () => void;
}

export function ExamWhiteboard({ onClose }: ExamWhiteboardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isEraser, setIsEraser] = useState(false);
  const [penColor, setPenColor] = useState('#000000');
  const [penSize, setPenSize] = useState(2);
  const [eraserSize, setEraserSize] = useState(20);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const whiteboardRef = useRef<HTMLDivElement>(null);

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    // Set default styles
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = penColor;
    ctx.lineWidth = penSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDrawing(true);
    lastPosRef.current = { x, y };

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (isEraser) {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = eraserSize;
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = penColor;
      ctx.lineWidth = penSize;
    }

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !lastPosRef.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineTo(x, y);
    ctx.stroke();
    lastPosRef.current = { x, y };
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    lastPosRef.current = null;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

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
      className="fixed z-50 bg-white border-2 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
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
      <div className="whiteboard-header bg-gray-800 text-white px-3 py-2 flex items-center justify-between cursor-move rounded-t-md">
        <span className="text-sm font-bold">Whiteboard</span>
        <button
          onClick={onClose}
          className="hover:bg-gray-700 rounded p-1 transition-colors"
          aria-label="Close whiteboard"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-gray-100 border-b-2 border-black px-3 py-2 flex items-center gap-2">
        {/* Pen Tool */}
        <button
          onClick={() => setIsEraser(false)}
          className={`p-2 rounded-lg border-2 border-black transition-all ${
            !isEraser ? 'bg-blue-500 text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' : 'bg-white hover:bg-gray-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
          }`}
          aria-label="Pen tool"
        >
          <Pen className="w-4 h-4" />
        </button>

        {/* Eraser Tool */}
        <button
          onClick={() => setIsEraser(true)}
          className={`p-2 rounded-lg border-2 border-black transition-all ${
            isEraser ? 'bg-blue-500 text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' : 'bg-white hover:bg-gray-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
          }`}
          aria-label="Eraser tool"
        >
          <Eraser className="w-4 h-4" />
        </button>

        {/* Color Picker */}
        {!isEraser && (
          <div className="flex items-center gap-1 ml-2">
            {['#000000', '#FF0000', '#0000FF', '#008000'].map((color) => (
              <button
                key={color}
                onClick={() => setPenColor(color)}
                className={`w-6 h-6 rounded-full border-2 border-black transition-all ${
                  penColor === color ? 'ring-2 ring-offset-1 ring-blue-500' : ''
                }`}
                style={{ backgroundColor: color }}
                aria-label={`Select color ${color}`}
              />
            ))}
          </div>
        )}

        {/* Clear Button */}
        <button
          onClick={clearCanvas}
          className="ml-auto p-2 rounded-lg border-2 border-black bg-red-500 hover:bg-red-600 text-white transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:scale-95"
          aria-label="Clear canvas"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Canvas */}
      <div className="relative bg-white" style={{ height: 'calc(100% - 80px)' }}>
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          className="w-full h-full cursor-crosshair"
          style={{ touchAction: 'none' }}
        />
      </div>
    </div>
  );
}





