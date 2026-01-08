'use client';

import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';

interface ExamCalculatorProps {
  onClose: () => void;
}

export function ExamCalculator({ onClose }: ExamCalculatorProps) {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);
  
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const calculatorRef = useRef<HTMLDivElement>(null);

  const handleNumber = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleDecimal = () => {
    if (waitingForNewValue) {
      setDisplay('0.');
      setWaitingForNewValue(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperation = (op: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const result = calculate(previousValue, inputValue, operation);
      setDisplay(String(result));
      setPreviousValue(result);
    }

    setWaitingForNewValue(true);
    setOperation(op);
  };

  const calculate = (firstValue: number, secondValue: number, op: string): number => {
    switch (op) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return secondValue !== 0 ? firstValue / secondValue : 0;
      default:
        return secondValue;
    }
  };

  const handleEquals = () => {
    if (previousValue !== null && operation) {
      const inputValue = parseFloat(display);
      const result = calculate(previousValue, inputValue, operation);
      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    // Only start dragging if clicking on the header
    if ((e.target as HTMLElement).closest('.calculator-header')) {
      setIsDragging(true);
      const rect = calculatorRef.current?.getBoundingClientRect();
      if (rect) {
        // If not positioned yet, initialize position from current location
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
      if (isDragging && calculatorRef.current) {
        const newX = e.clientX - dragStart.x;
        const newY = e.clientY - dragStart.y;
        
        // Keep calculator within viewport
        const maxX = window.innerWidth - calculatorRef.current.offsetWidth;
        const maxY = window.innerHeight - calculatorRef.current.offsetHeight;
        
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
      ref={calculatorRef}
      className="fixed z-50 bg-white border-2 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
      style={{
        ...(position ? {
          left: `${position.x}px`,
          top: `${position.y}px`,
          right: 'auto',
          bottom: 'auto'
        } : {
          right: '32px',
          bottom: '32px',
          left: 'auto',
          top: 'auto'
        }),
        width: '240px'
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Header */}
      <div className="calculator-header bg-gray-800 text-white px-3 py-2 flex items-center justify-between cursor-move rounded-t-md">
        <span className="text-sm font-bold">Calculator</span>
        <button
          onClick={onClose}
          className="hover:bg-gray-700 rounded p-1 transition-colors"
          aria-label="Close calculator"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Display */}
      <div className="px-3 py-4 bg-gray-50 border-b-2 border-black">
        <div className="text-right text-2xl font-bold text-black overflow-hidden">
          {display}
        </div>
      </div>

      {/* Buttons */}
      <div className="p-3 grid grid-cols-4 gap-2">
        {/* Row 1 */}
        <button
          onClick={handleClear}
          className="col-span-2 bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all active:scale-95"
        >
          Clear
        </button>
        <button
          onClick={() => handleOperation('÷')}
          className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-3 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all active:scale-95"
        >
          ÷
        </button>
        <button
          onClick={() => handleOperation('×')}
          className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-3 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all active:scale-95"
        >
          ×
        </button>

        {/* Row 2 */}
        <button
          onClick={() => handleNumber('7')}
          className="bg-gray-100 hover:bg-gray-200 text-black font-bold py-3 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all active:scale-95"
        >
          7
        </button>
        <button
          onClick={() => handleNumber('8')}
          className="bg-gray-100 hover:bg-gray-200 text-black font-bold py-3 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all active:scale-95"
        >
          8
        </button>
        <button
          onClick={() => handleNumber('9')}
          className="bg-gray-100 hover:bg-gray-200 text-black font-bold py-3 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all active:scale-95"
        >
          9
        </button>
        <button
          onClick={() => handleOperation('-')}
          className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-3 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all active:scale-95"
        >
          −
        </button>

        {/* Row 3 */}
        <button
          onClick={() => handleNumber('4')}
          className="bg-gray-100 hover:bg-gray-200 text-black font-bold py-3 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all active:scale-95"
        >
          4
        </button>
        <button
          onClick={() => handleNumber('5')}
          className="bg-gray-100 hover:bg-gray-200 text-black font-bold py-3 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all active:scale-95"
        >
          5
        </button>
        <button
          onClick={() => handleNumber('6')}
          className="bg-gray-100 hover:bg-gray-200 text-black font-bold py-3 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all active:scale-95"
        >
          6
        </button>
        <button
          onClick={() => handleOperation('+')}
          className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-3 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all active:scale-95"
        >
          +
        </button>

        {/* Row 4 */}
        <button
          onClick={() => handleNumber('1')}
          className="bg-gray-100 hover:bg-gray-200 text-black font-bold py-3 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all active:scale-95"
        >
          1
        </button>
        <button
          onClick={() => handleNumber('2')}
          className="bg-gray-100 hover:bg-gray-200 text-black font-bold py-3 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all active:scale-95"
        >
          2
        </button>
        <button
          onClick={() => handleNumber('3')}
          className="bg-gray-100 hover:bg-gray-200 text-black font-bold py-3 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all active:scale-95"
        >
          3
        </button>
        <button
          onClick={handleEquals}
          className="row-span-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all active:scale-95"
        >
          =
        </button>

        {/* Row 5 */}
        <button
          onClick={() => handleNumber('0')}
          className="col-span-2 bg-gray-100 hover:bg-gray-200 text-black font-bold py-3 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all active:scale-95"
        >
          0
        </button>
        <button
          onClick={handleDecimal}
          className="bg-gray-100 hover:bg-gray-200 text-black font-bold py-3 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all active:scale-95"
        >
          .
        </button>
      </div>
    </div>
  );
}









