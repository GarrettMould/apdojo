'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Pen, Eraser, Trash2 } from 'lucide-react';

interface DrawingPadProps {
  isLarge?: boolean;
  className?: string;
  initialData?: string;
  onSave: (data: string) => void;
}

export function DrawingPad({ isLarge = false, className = '', initialData, onSave }: DrawingPadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isEraser, setIsEraser] = useState(false);
  const [penColor, setPenColor] = useState('#000000');
  const [eraserSize, setEraserSize] = useState(20);
  const lastPos = useRef<{ x: number; y: number; imageData?: ImageData } | null>(null);
  const [tool, setTool] = useState<'pen' | 'eraser' | 'line'>('pen');
  const [lineStart, setLineStart] = useState<{ x: number; y: number } | null>(null);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    onSave('');
  };

  // Effect to handle initialData changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear the canvas first
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // If there's initialData, draw it
    if (initialData) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
      };
      img.src = initialData;
    }
  }, [initialData, isLarge]); // Add isLarge to dependencies since it affects canvas dimensions

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (tool === 'line') {
      setLineStart({ x, y });
      setIsDrawing(true);
      lastPos.current = null;
      return;
    }

    setIsDrawing(true);
    lastPos.current = { x, y };
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (tool === 'line' && lineStart && isDrawing) {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      if (!lastPos.current) {
        lastPos.current = { x: 0, y: 0 };
        lastPos.current.imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      }

      if (lastPos.current?.imageData) {
        ctx.putImageData(lastPos.current.imageData, 0, 0);
      }

      ctx.beginPath();
      ctx.moveTo(lineStart.x, lineStart.y);
      ctx.lineTo(x, y);
      ctx.strokeStyle = penColor;
      ctx.lineWidth = 2;
      ctx.stroke();
      return;
    }

    if (!isDrawing || !lastPos.current) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(x, y);
    ctx.strokeStyle = tool === 'eraser' ? '#ffffff' : penColor;
    ctx.lineWidth = tool === 'eraser' ? eraserSize : 2;
    ctx.lineCap = 'round';
    ctx.stroke();

    lastPos.current = { x, y };
    onSave(canvas.toDataURL());
  };

  const stopDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (tool === 'line' && lineStart && isDrawing) {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      ctx.beginPath();
      ctx.moveTo(lineStart.x, lineStart.y);
      ctx.lineTo(x, y);
      ctx.strokeStyle = penColor;
      ctx.lineWidth = 2;
      ctx.stroke();

      setLineStart(null);
      lastPos.current = null;
      onSave(canvas.toDataURL());
    }

    setIsDrawing(false);
  };

  const getPenCursor = () => {
    const size = 10;
    const canvas = document.createElement('canvas');
    canvas.width = size * 2;
    canvas.height = size * 2;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.arc(size, size, size/2, 0, Math.PI * 2);
      ctx.fillStyle = penColor;
      ctx.fill();
    }
    return `url(${canvas.toDataURL()}) ${size} ${size}, crosshair`;
  };

  const getEraserCursor = () => {
    const size = eraserSize;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, size, size);
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 1;
      ctx.strokeRect(0, 0, size, size);
    }
    return `url(${canvas.toDataURL()}) ${size/2} ${size/2}, crosshair`;
  };

  return (
    <div className={`relative ${className}`}>
      <div className="absolute top-2 left-2 flex gap-2 z-10">
        <div className="relative group">
          <button
            onClick={() => {
              setTool('pen');
              setIsEraser(false);
            }}
            className={`p-1 rounded ${tool === 'pen' && !isEraser ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
          >
            <Pen className="w-4 h-4" style={{ color: penColor }} />
          </button>
          {tool === 'pen' && !isEraser && (
            <div className="absolute left-0 top-full mt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-100">
              <div className="pt-2">
                <div className="bg-white rounded-lg shadow-lg border p-2 flex flex-col gap-2">
                  {['#000000', '#FF0000', '#0000FF', '#008000'].map((color) => (
                    <button
                      key={color}
                      onClick={() => setPenColor(color)}
                      className={`w-6 h-6 rounded-full hover:ring-2 hover:ring-offset-2 hover:ring-blue-500 ${
                        penColor === color ? 'ring-2 ring-offset-2 ring-blue-500' : ''
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        <button
          onClick={() => {
            setTool('line');
            setIsEraser(false);
          }}
          className={`p-1 rounded ${tool === 'line' ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="2" y1="14" x2="14" y2="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        <button
          onClick={() => {
            setTool('eraser');
            setIsEraser(true);
          }}
          className={`p-1 rounded ${tool === 'eraser' ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
        >
          <Eraser className="w-4 h-4" />
        </button>
        <button
          onClick={clearCanvas}
          className="p-1 rounded hover:bg-gray-100"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      <canvas
        ref={canvasRef}
        width={isLarge ? 600 : 300}
        height={isLarge ? 400 : 200}
        className="bg-white"
        style={{ 
          cursor: tool === 'line' 
            ? 'crosshair' 
            : tool === 'eraser' 
              ? getEraserCursor()
              : getPenCursor()
        }}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
    </div>
  );
} 