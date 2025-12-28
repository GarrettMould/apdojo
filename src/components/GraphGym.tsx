'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Pen, 
  Eraser, 
  Trash2, 
  Undo2, 
  CheckCircle2, 
  Circle,
  ArrowRight,
  RotateCcw
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock data structure
interface ChecklistItem {
  id: number;
  text: string;
}

interface GraphGymScenario {
  title: string;
  description: string;
  correctImage: string;
  checklist: ChecklistItem[];
}

const activeScenario: GraphGymScenario = {
  title: "Long Run Equilibrium in a Pure Monopoly",
  description: "Draw the Demand, MR, MC, and ATC curves. Label the profit-maximizing price and quantity.",
  correctImage: "https://placehold.co/600x400?text=Correct+Graph",
  checklist: [
    { id: 1, text: "MR intersects MC (Profit Max)" },
    { id: 2, text: "Price is set at Demand Curve" },
    { id: 3, text: "ATC is tangent to Demand (Zero Profit)" },
    { id: 4, text: "All curves are properly labeled" }
  ]
};

// Custom hook for canvas drawing
function useCanvasDrawing() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<'pen' | 'eraser'>('pen');
  const [penColor, setPenColor] = useState('#000000');
  const [penSize, setPenSize] = useState(3);
  const [eraserSize, setEraserSize] = useState(20);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const historyRef = useRef<ImageData[]>([]);
  const historyIndexRef = useRef(-1);

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (container) {
        const width = container.clientWidth;
        const height = Math.round(width * (9 / 16));
        
        // Only resize if dimensions changed
        if (canvas.width !== width || canvas.height !== height) {
          // Save current drawing if exists
          const currentImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          
          canvas.width = width;
          canvas.height = height;
          
          // Restore drawing if it exists
          if (currentImageData && currentImageData.width > 0 && currentImageData.height > 0) {
            ctx.putImageData(currentImageData, 0, 0);
          } else {
            // Set default white background
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
          }
          
          // Update drawing styles
          ctx.strokeStyle = penColor;
          ctx.lineWidth = penSize;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
        }
      }
    };

    // Initial resize
    resizeCanvas();

    // Save initial state to history
    saveToHistory();

    // Handle window resize
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [penColor, penSize, saveToHistory]);

  const saveToHistory = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Remove any future history if we're not at the end
    if (historyIndexRef.current < historyRef.current.length - 1) {
      historyRef.current = historyRef.current.slice(0, historyIndexRef.current + 1);
    }

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    historyRef.current.push(imageData);
    historyIndexRef.current = historyRef.current.length - 1;

    // Limit history to 50 states
    if (historyRef.current.length > 50) {
      historyRef.current.shift();
      historyIndexRef.current--;
    }
  }, []);

  const startDrawing = useCallback((e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    // Prevent default to avoid scrolling on touch devices
    if ('touches' in e) {
      e.preventDefault();
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    setIsDrawing(true);
    lastPosRef.current = { x, y };

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (tool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = eraserSize;
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = penColor;
      ctx.lineWidth = penSize;
    }

    ctx.beginPath();
    ctx.moveTo(x, y);
  }, [tool, penColor, penSize, eraserSize]);

  const draw = useCallback((e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !lastPosRef.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Prevent default to avoid scrolling on touch devices
    if ('touches' in e) {
      e.preventDefault();
    }

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineTo(x, y);
    ctx.stroke();
    lastPosRef.current = { x, y };
  }, [isDrawing]);

  const stopDrawing = useCallback(() => {
    if (isDrawing) {
      saveToHistory();
    }
    setIsDrawing(false);
    lastPosRef.current = null;
  }, [isDrawing, saveToHistory]);

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    saveToHistory();
  }, [saveToHistory]);

  const undo = useCallback(() => {
    if (historyIndexRef.current <= 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    historyIndexRef.current--;
    const imageData = historyRef.current[historyIndexRef.current];
    ctx.putImageData(imageData, 0, 0);
  }, []);

  const getCanvasDataUrl = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return '';
    return canvas.toDataURL('image/png');
  }, []);

  return {
    canvasRef,
    tool,
    setTool,
    penColor,
    setPenColor,
    penSize,
    setPenSize,
    eraserSize,
    setEraserSize,
    startDrawing,
    draw,
    stopDrawing,
    clearCanvas,
    undo,
    canUndo: historyIndexRef.current > 0,
    getCanvasDataUrl,
  };
}

export function GraphGym() {
  const [mode, setMode] = useState<'drawing' | 'grading'>('drawing');
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());
  const [studentDrawingUrl, setStudentDrawingUrl] = useState<string>('');

  const {
    canvasRef,
    tool,
    setTool,
    startDrawing,
    draw,
    stopDrawing,
    clearCanvas,
    undo,
    canUndo,
    getCanvasDataUrl,
  } = useCanvasDrawing();

  const handleSubmit = () => {
    const dataUrl = getCanvasDataUrl();
    setStudentDrawingUrl(dataUrl);
    setMode('grading');
  };

  const handleChecklistToggle = (id: number) => {
    setCheckedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleNextDrill = () => {
    setMode('drawing');
    setCheckedItems(new Set());
    setStudentDrawingUrl('');
    clearCanvas();
  };

  const score = checkedItems.size;
  const totalScore = activeScenario.checklist.length;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2">
            {activeScenario.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-700">
            {activeScenario.description}
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {mode === 'drawing' ? (
            <motion.div
              key="drawing"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {/* Toolbar */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-2 p-3 bg-white rounded-lg shadow-md border border-gray-200"
              >
                <button
                  onClick={() => setTool('pen')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                    tool === 'pen'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Pen className="w-4 h-4" />
                  Pen
                </button>
                <button
                  onClick={() => setTool('eraser')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                    tool === 'eraser'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Eraser className="w-4 h-4" />
                  Eraser
                </button>
                <div className="flex-1" />
                <button
                  onClick={undo}
                  disabled={!canUndo}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                    canUndo
                      ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <Undo2 className="w-4 h-4" />
                  Undo
                </button>
                <button
                  onClick={clearCanvas}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold bg-red-100 text-red-700 hover:bg-red-200 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear Board
                </button>
              </motion.div>

              {/* Canvas */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="relative bg-white rounded-xl shadow-lg border-2 border-gray-200 overflow-hidden"
                style={{ aspectRatio: '16/9' }}
              >
                <canvas
                  ref={canvasRef}
                  className="w-full h-full cursor-crosshair touch-none"
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                />
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex justify-end"
              >
                <Button
                  onClick={handleSubmit}
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 text-lg rounded-lg shadow-lg"
                >
                  Submit Answer
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="grading"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Side-by-Side Comparison */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Student's Drawing */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-4"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Your Drawing</h3>
                  <div className="bg-gray-50 rounded-lg overflow-hidden" style={{ aspectRatio: '16/9' }}>
                    {studentDrawingUrl ? (
                      <img
                        src={studentDrawingUrl}
                        alt="Your drawing"
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No drawing submitted
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Correct Answer */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-xl shadow-lg border-2 border-green-200 p-4"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Correct Answer</h3>
                  <div className="bg-gray-50 rounded-lg overflow-hidden" style={{ aspectRatio: '16/9' }}>
                    <img
                      src={activeScenario.correctImage}
                      alt="Correct graph"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </motion.div>
              </div>

              {/* Self-Correction Checklist */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-6"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Self-Correction Checklist</h3>
                
                {/* Score Display */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={score}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 1.2, opacity: 0 }}
                    className="mb-6 p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg"
                  >
                    <p className="text-white text-sm font-semibold mb-1">Your Score</p>
                    <p className="text-4xl font-extrabold text-white">
                      {score}/{totalScore} Correct
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Checklist Items */}
                <div className="space-y-3">
                  {activeScenario.checklist.map((item) => {
                    const isChecked = checkedItems.has(item.id);
                    return (
                      <motion.button
                        key={item.id}
                        onClick={() => handleChecklistToggle(item.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                          isChecked
                            ? 'bg-green-50 border-green-500 shadow-md'
                            : 'bg-gray-50 border-dashed border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {isChecked ? (
                            <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                          ) : (
                            <Circle className="w-6 h-6 text-gray-400 flex-shrink-0" />
                          )}
                          <span
                            className={`font-semibold ${
                              isChecked ? 'text-green-800 line-through' : 'text-gray-700'
                            }`}
                          >
                            {item.text}
                          </span>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>

              {/* Next Drill Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex justify-end"
              >
                <Button
                  onClick={handleNextDrill}
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-8 py-3 text-lg rounded-lg shadow-lg"
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Next Drill
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

