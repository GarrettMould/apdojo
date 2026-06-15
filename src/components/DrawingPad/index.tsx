'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Pen, Eraser, Trash2, Type, CheckCircle, Undo2 } from 'lucide-react';

interface Line {
  id: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  type: 'vertical' | 'horizontal' | 'sloping';
}

interface Sticker {
  id: string;
  label: string;
  x: number;
  y: number;
}

interface DrawingPadProps {
  isLarge?: boolean;
  className?: string;
  initialData?: string;
  onSave: (data: string) => void;
  enableStickers?: boolean; // New prop to enable sticker mode
  stickerLabels?: string[]; // Labels available for stickers
  templateImageUrl?: string; // Template image to show as background
  submitButtonVariant?: 'default' | 'greenMini';
  /** Hide the Done control; persists to onSave automatically after strokes and text blur */
  hideDoneButton?: boolean;
}

export function DrawingPad({ 
  isLarge = false, 
  className = '', 
  initialData, 
  onSave,
  enableStickers = false,
  stickerLabels = ['LRAS', 'SRAS', 'AD', 'Price Level', 'Real GDP'],
  templateImageUrl,
  submitButtonVariant = 'default',
  hideDoneButton = false,
}: DrawingPadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const flushDrawingRef = useRef(() => {});
  /** Skip re-init when parent echoes back data we just emitted via onSave. */
  const skipNextInitialDataSyncRef = useRef(false);
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
  const isCreatingNewText = useRef<boolean>(false);
  
  // Sticker system state
  const [stickers, setStickers] = useState<Sticker[]>([]);
  const [lines, setLines] = useState<Line[]>([]);
  const [draggedSticker, setDraggedSticker] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number } | null>(null);

  // Undo history for canvas states
  const historyRef = useRef<ImageData[]>([]);
  const MAX_HISTORY = 20;

  const saveHistory = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    try {
      const snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
      historyRef.current.push(snapshot);
      if (historyRef.current.length > MAX_HISTORY) {
        historyRef.current.shift();
      }
    } catch {
      // Ignore errors when capturing history (e.g. security/tainted canvas)
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Save state before clearing for undo
    saveHistory();

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setStickers([]);
    setLines([]);
    skipNextInitialDataSyncRef.current = true;
    onSave('');
  };

  // Effect to handle initialData and templateImageUrl changes
  useEffect(() => {
    if (skipNextInitialDataSyncRef.current) {
      skipNextInitialDataSyncRef.current = false;
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Reset undo history when reinitializing
    historyRef.current = [];

    // Clear the canvas first
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Load template image first as background (if provided)
    if (templateImageUrl) {
      const templateImg = new Image();
      templateImg.crossOrigin = 'anonymous';
      templateImg.onload = () => {
        // Draw template as background
        ctx.drawImage(templateImg, 0, 0, canvas.width, canvas.height);
        // Then draw initialData on top if it exists
        if (initialData) {
          const img = new Image();
          img.onload = () => {
            ctx.drawImage(img, 0, 0);
          };
          img.src = initialData;
        }
      };
      templateImg.onerror = () => {
        console.error('Failed to load template image:', templateImageUrl);
        // If template fails, still try to load initialData
        if (initialData) {
          const img = new Image();
          img.onload = () => {
            ctx.drawImage(img, 0, 0);
          };
          img.src = initialData;
        }
      };
      templateImg.src = templateImageUrl;
    } else if (initialData) {
      // If there's no template but there's initialData, draw it
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
      };
      img.src = initialData;
    }
  }, [initialData, templateImageUrl, isLarge]);

  const isVertical = (line: Line): boolean => {
    const dx = Math.abs(line.endX - line.startX);
    const dy = Math.abs(line.endY - line.startY);
    return dx < 10 && dy > 20; // Vertical if x difference is small and y difference is large
  };

  const isHorizontal = (line: Line): boolean => {
    const dx = Math.abs(line.endX - line.startX);
    const dy = Math.abs(line.endY - line.startY);
    return dy < 10 && dx > 20; // Horizontal if y difference is small and x difference is large
  };

  const getDistance = (point: { x: number; y: number }, line: Line): number => {
    // Calculate distance from point to line segment
    const A = point.x - line.startX;
    const B = point.y - line.startY;
    const C = line.endX - line.startX;
    const D = line.endY - line.startY;

    const dot = A * C + B * D;
    const lenSq = C * C + D * D;
    let param = -1;
    if (lenSq !== 0) param = dot / lenSq;

    let xx, yy;

    if (param < 0) {
      xx = line.startX;
      yy = line.startY;
    } else if (param > 1) {
      xx = line.endX;
      yy = line.endY;
    } else {
      xx = line.startX + param * C;
      yy = line.startY + param * D;
    }

    const dx = point.x - xx;
    const dy = point.y - yy;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e 
      ? e.touches[0].clientX - rect.left 
      : (e as React.MouseEvent).clientX - rect.left;
    const y = 'touches' in e 
      ? e.touches[0].clientY - rect.top 
      : (e as React.MouseEvent).clientY - rect.top;
    
    // Save state before starting a new stroke/line/text
    saveHistory();
    
    if (tool === 'text') {
      isCreatingNewText.current = true;
      const newId = `text-${Date.now()}`;
      setTextElements(prev => [...prev, { id: newId, x, y, text: '' }]);
      setEditingTextId(newId);
      setTimeout(() => {
        isCreatingNewText.current = false;
      }, 100);
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
    if (isCreatingNewText.current) {
      return;
    }
    setEditingTextId(null);
    if (hideDoneButton) {
      queueMicrotask(() => flushDrawingRef.current());
    }
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
    e.preventDefault();
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

      // Store line data for grading
      const newLine: Line = {
        id: `line-${Date.now()}`,
        startX: lineStart.x,
        startY: lineStart.y,
        endX: x,
        endY: y,
        type: isVertical({ startX: lineStart.x, startY: lineStart.y, endX: x, endY: y, id: '', type: 'sloping' }) 
          ? 'vertical' 
          : isHorizontal({ startX: lineStart.x, startY: lineStart.y, endX: x, endY: y, id: '', type: 'sloping' })
          ? 'horizontal'
          : 'sloping'
      };
      setLines(prev => [...prev, newLine]);

      setLineStart(null);
      lastPos.current = null;
    }

    setIsDrawing(false);

    if (hideDoneButton) {
      queueMicrotask(() => flushDrawingRef.current());
    }
  };

  const handleStickerDragStart = (e: React.MouseEvent, stickerId: string) => {
    e.stopPropagation();
    const sticker = stickers.find(s => s.id === stickerId);
    if (!sticker) return;
    
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setDraggedSticker(stickerId);
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleStickerDrag = (e: React.MouseEvent) => {
    if (!draggedSticker || !dragOffset) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left - dragOffset.x;
    const y = e.clientY - rect.top - dragOffset.y;
    
    setStickers(prev => prev.map(s => 
      s.id === draggedSticker ? { ...s, x, y } : s
    ));
  };

  const handleStickerDragEnd = () => {
    setDraggedSticker(null);
    setDragOffset(null);
    if (hideDoneButton && enableStickers) {
      queueMicrotask(() => flushDrawingRef.current());
    }
  };

  const addSticker = (label: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const newSticker: Sticker = {
      id: `sticker-${Date.now()}`,
      label,
      x: canvas.width / 2,
      y: canvas.height / 2
    };
    setStickers(prev => [...prev, newSticker]);
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Save state before committing text/stickers
    saveHistory();

    // Before saving, commit any text that's currently being edited
    if (editingTextId) {
      const textEl = textElements.find(el => el.id === editingTextId);
      if (textEl && textEl.text.trim() !== '') {
        ctx.fillStyle = penColor;
        ctx.font = '16px Arial';
        ctx.fillText(textEl.text, textEl.x, textEl.y);
      }
      setEditingTextId(null);
      setTextElements(prev => prev.filter(el => el.id !== editingTextId));
    }

    // Commit remaining text elements
    textElements.forEach(textEl => {
      if (textEl.text.trim() !== '') {
        ctx.fillStyle = penColor;
        ctx.font = '16px Arial';
        ctx.fillText(textEl.text, textEl.x, textEl.y);
      }
    });
    setTextElements([]);

    // Draw stickers on canvas
    stickers.forEach(sticker => {
      ctx.fillStyle = '#000000';
      ctx.font = 'bold 14px Arial';
      ctx.fillText(sticker.label, sticker.x, sticker.y);
    });

    // Save canvas image
    const imageData = canvas.toDataURL();
    
    // If stickers are enabled, also save structured data
    if (enableStickers) {
      const structuredData = {
        image: imageData,
        stickers: stickers,
        lines: lines
      };
      skipNextInitialDataSyncRef.current = true;
      onSave(JSON.stringify(structuredData));
    } else {
      skipNextInitialDataSyncRef.current = true;
      onSave(imageData);
    }
  };

  flushDrawingRef.current = handleSave;

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
      {/* Sticker Toolbar */}
      {enableStickers && (
        <div className="mb-2 p-2 bg-gray-50 border-b border-gray-200 rounded-t-lg">
          <p className="text-xs text-gray-600 mb-2 font-medium">Drag labels onto your graph:</p>
          <div className="flex flex-wrap gap-2">
            {stickerLabels.map(label => (
              <button
                key={label}
                onClick={() => addSticker(label)}
                className="px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors shadow-sm"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

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
        {!enableStickers && (
          <button
            onClick={() => {
              setTool('text');
              setIsEraser(false);
            }}
            className={`p-1 rounded ${tool === 'text' ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
          >
            <Type className="w-4 h-4" />
          </button>
        )}
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
        <button
          onClick={() => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            const previous = historyRef.current.pop();
            if (!previous) return;
            ctx.putImageData(previous, 0, 0);
            try {
              const imageData = canvas.toDataURL();
              skipNextInitialDataSyncRef.current = true;
              onSave(imageData);
            } catch {
              // Ignore save errors on undo
            }
          }}
          className="p-1 rounded hover:bg-gray-100"
          title="Undo"
        >
          <Undo2 className="w-4 h-4" />
        </button>
      </div>
      {!hideDoneButton && (
        <div className="absolute top-2 right-2 z-10">
          <button
            type="button"
            onClick={handleSave}
            className={
              submitButtonVariant === 'greenMini'
                ? 'inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-black text-white bg-green-500 hover:bg-green-600 rounded-lg border border-green-700 shadow-[0_2px_0_0_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-[0_1px_0_0_rgba(0,0,0,1)] transition-all'
                : 'flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors'
            }
          >
            <CheckCircle className="w-4 h-4" />
            Done
          </button>
        </div>
      )}
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
          handleStickerDrag(e);
        }}
        onMouseUp={(e) => {
          stopDrawing(e);
          handleStickerDragEnd();
        }}
        onMouseLeave={(e) => {
          setCursorPos(null);
          stopDrawing(e);
          handleStickerDragEnd();
        }}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
      />
      {/* Sticker overlays */}
      {enableStickers && stickers.map(sticker => (
        <div
          key={sticker.id}
          draggable
          onMouseDown={(e) => handleStickerDragStart(e, sticker.id)}
          className="absolute px-2 py-1 bg-blue-100 border-2 border-blue-400 rounded text-sm font-semibold text-blue-800 cursor-move z-30 select-none"
          style={{
            left: `${sticker.x}px`,
            top: `${sticker.y - 20}px`,
          }}
        >
          {sticker.label}
        </div>
      ))}
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
      {/* Text input overlays (only if stickers not enabled) */}
      {!enableStickers && textElements.map(textEl => {
        const isEditing = editingTextId === textEl.id;
        return isEditing ? (
          <input
            key={textEl.id}
            ref={textInputRef}
            type="text"
            value={textEl.text}
            onChange={(e) => handleTextChange(textEl.id, e.target.value)}
            onBlur={handleTextBlur}
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            className="absolute border-2 border-blue-500 bg-white px-2 py-1 rounded text-sm z-30"
            style={{
              left: `${textEl.x}px`,
              top: `${textEl.y - 20}px`,
            }}
            autoFocus
          />
        ) : (
          <div
            key={textEl.id}
            onClick={(e) => {
              e.stopPropagation();
              setEditingTextId(textEl.id);
            }}
            className="absolute px-2 py-1 rounded text-sm z-30 cursor-pointer hover:bg-blue-50 border border-transparent hover:border-blue-300"
            style={{
              left: `${textEl.x}px`,
              top: `${textEl.y - 20}px`,
              color: penColor,
            }}
          >
            {textEl.text || ' '}
          </div>
        );
      })}
    </div>
  );
}
