'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Pen, Eraser, Trash2, Type, CheckCircle } from 'lucide-react';

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
  const [tool, setTool] = useState<'pen' | 'eraser' | 'line' | 'text'>('pen');
  const [lineStart, setLineStart] = useState<{ x: number; y: number } | null>(null);
  const [textElements, setTextElements] = useState<Array<{ id: string; x: number; y: number; text: string }>>([]);
  const [editingTextId, setEditingTextId] = useState<string | null>(null);
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(null);
  const textInputRef = useRef<HTMLInputElement>(null);

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
        onSave(canvas.toDataURL());
      };
      img.src = initialData;
    }
  }, [initialData, isLarge]); // Removed textElements and onSave to prevent loops

  // Effect to save canvas when text changes (but don't redraw canvas)
  useEffect(() => {
    if (textElements.length > 0 && !editingTextId) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      onSave(canvas.toDataURL());
    }
  }, [textElements, editingTextId, onSave]);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault(); // Prevent scrolling
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e 
      ? e.touches[0].clientX - rect.left 
      : (e as React.MouseEvent).clientX - rect.left;
    const y = 'touches' in e 
      ? e.touches[0].clientY - rect.top 
      : (e as React.MouseEvent).clientY - rect.top;
    
    if (tool === 'text') {
      // Create a new text element
      const newId = `text-${Date.now()}`;
      setTextElements(prev => [...prev, { id: newId, x, y, text: '' }]);
      setEditingTextId(newId);
      return;
    }
    
    if (tool === 'line') {
      setLineStart({ x, y });
      setIsDrawing(true);
      lastPos.current = null;
      return;
    }

    setIsDrawing(true);
    lastPos.current = { x, y };
  };

  const handleTextChange = (id: string, newText: string) => {
    setTextElements(prev => prev.map(el => el.id === id ? { ...el, text: newText } : el));
  };

  const handleTextBlur = () => {
    const canvas = canvasRef.current;
    if (!canvas || !editingTextId) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const textEl = textElements.find(el => el.id === editingTextId);

    if (textEl && textEl.text.trim() !== '') {
      ctx.fillStyle = penColor;
      ctx.font = '16px Arial';
      ctx.fillText(textEl.text, textEl.x, textEl.y);
    }
    
    setEditingTextId(null);
    // Remove the text element from state after drawing it
    setTextElements(prev => prev.filter(el => el.id !== editingTextId)); 
    
    onSave(canvas.toDataURL());
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault(); // Prevent scrolling
    const canvas = canvasRef.current;
    if (!canvas || !isDrawing || !lastPos.current) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e 
      ? e.touches[0].clientX - rect.left 
      : (e as React.MouseEvent).clientX - rect.left;
    const y = 'touches' in e 
      ? e.touches[0].clientY - rect.top 
      : (e as React.MouseEvent).clientY - rect.top;
    
    if (tool === 'line' && lineStart && isDrawing) {
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
      ctx.lineWidth = 3.5;
      ctx.stroke();
      
      return;
    }

    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(x, y);
    ctx.strokeStyle = tool === 'eraser' ? '#ffffff' : penColor;
    ctx.lineWidth = tool === 'eraser' ? eraserSize : 3.5;
    ctx.lineCap = 'round';
    ctx.stroke();

    lastPos.current = { x, y };
  };

  const stopDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) {
      setIsDrawing(false);
      return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setIsDrawing(false);
      return;
    }

    if (tool === 'line' && lineStart) {
      if (lastPos.current?.imageData) {
        ctx.putImageData(lastPos.current.imageData, 0, 0);
      }

      const rect = canvas.getBoundingClientRect();
      const x = 'touches' in e 
        ? e.changedTouches[0].clientX - rect.left
        : (e as React.MouseEvent).clientX - rect.left;
      const y = 'touches' in e 
        ? e.changedTouches[0].clientY - rect.top
        : (e as React.MouseEvent).clientY - rect.top;

      ctx.beginPath();
      ctx.moveTo(lineStart.x, lineStart.y);
      ctx.lineTo(x, y);
      ctx.strokeStyle = penColor;
      ctx.lineWidth = 3.5;
      ctx.stroke();

      setLineStart(null);
      lastPos.current = null;
    }

    setIsDrawing(false);
    // onSave(canvas.toDataURL()); // REMOVED: This was causing the premature finalization
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      onSave(canvas.toDataURL());
    }
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
            setTool('text');
            setIsEraser(false);
          }}
          className={`p-1 rounded ${tool === 'text' ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
        >
          <Type className="w-4 h-4" />
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
      <div className="absolute top-2 right-2 z-10">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors"
        >
          <CheckCircle className="w-4 h-4" />
          Done
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
              : getPenCursor(),
          touchAction: 'none'
        }}
        onMouseDown={startDrawing}
        onMouseMove={(e) => {
          handleMouseMove(e);
          draw(e);
        }}
        onMouseUp={stopDrawing}
        onMouseLeave={(e) => {
          setCursorPos(null);
          stopDrawing(e);
        }}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
      />
      {/* Visible cursor indicator */}
      {cursorPos && (
        <div
          className="absolute pointer-events-none z-20"
          style={{
            left: `${cursorPos.x}px`,
            top: `${cursorPos.y}px`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className={`w-2 h-2 rounded-full ${
            tool === 'eraser' ? 'bg-white border border-gray-400' : 
            tool === 'text' ? 'bg-blue-500' : 
            'bg-black'
          }`} />
        </div>
      )}
      {/* Text input overlays */}
      {textElements.map(textEl => (
        editingTextId === textEl.id && (
          <input
            key={textEl.id}
            ref={textInputRef}
            type="text"
            value={textEl.text}
            onChange={(e) => handleTextChange(textEl.id, e.target.value)}
            onBlur={handleTextBlur}
            className="absolute border-2 border-blue-500 bg-white px-2 py-1 rounded text-sm z-30"
            style={{
              left: `${textEl.x}px`,
              top: `${textEl.y - 20}px`,
            }}
            autoFocus
          />
        )
      ))}
    </div>
  );
} 