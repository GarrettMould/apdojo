'use client';

import { useState } from 'react';

type Props = {
  accentClassName: string;
  className?: string;
};

/** Compact four-function calculator used in exam tools (and as Stats Desmos fallback). */
export function BasicFourFunctionCalculator({ accentClassName, className = '' }: Props) {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const handleNumber = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const calculate = (first: number, second: number, op: string): number => {
    switch (op) {
      case '+':
        return first + second;
      case '-':
        return first - second;
      case '×':
        return first * second;
      case '÷':
        return second !== 0 ? first / second : 0;
      default:
        return second;
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

  const handleDecimal = () => {
    if (waitingForNewValue) {
      setDisplay('0.');
      setWaitingForNewValue(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const keyBtn =
    'bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-900 font-semibold py-3 rounded-lg border border-gray-200 shadow-sm transition-colors text-base';
  const opBtn = `${accentClassName} text-white font-semibold py-3 rounded-lg transition-colors text-lg`;

  return (
    <div className={`flex-1 overflow-y-auto bg-gray-50 ${className}`}>
      <div className="p-4">
        <div className="mb-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex min-h-[48px] items-center justify-end overflow-hidden text-right text-3xl font-semibold text-gray-900">
            {display}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2.5">
          <button type="button" onClick={handleClear} className="col-span-2 rounded-lg bg-gray-100 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-200 active:bg-gray-300">
            Clear
          </button>
          <button type="button" onClick={() => handleOperation('÷')} className={opBtn}>
            ÷
          </button>
          <button type="button" onClick={() => handleOperation('×')} className={opBtn}>
            ×
          </button>

          <button type="button" onClick={() => handleNumber('7')} className={keyBtn}>
            7
          </button>
          <button type="button" onClick={() => handleNumber('8')} className={keyBtn}>
            8
          </button>
          <button type="button" onClick={() => handleNumber('9')} className={keyBtn}>
            9
          </button>
          <button type="button" onClick={() => handleOperation('-')} className={opBtn}>
            −
          </button>

          <button type="button" onClick={() => handleNumber('4')} className={keyBtn}>
            4
          </button>
          <button type="button" onClick={() => handleNumber('5')} className={keyBtn}>
            5
          </button>
          <button type="button" onClick={() => handleNumber('6')} className={keyBtn}>
            6
          </button>
          <button type="button" onClick={() => handleOperation('+')} className={opBtn}>
            +
          </button>

          <button type="button" onClick={() => handleNumber('1')} className={keyBtn}>
            1
          </button>
          <button type="button" onClick={() => handleNumber('2')} className={keyBtn}>
            2
          </button>
          <button type="button" onClick={() => handleNumber('3')} className={keyBtn}>
            3
          </button>
          <button type="button" onClick={handleEquals} className={`row-span-2 ${accentClassName} rounded-lg py-3 text-xl font-semibold text-white transition-colors`}>
            =
          </button>

          <button type="button" onClick={() => handleNumber('0')} className={`col-span-2 ${keyBtn}`}>
            0
          </button>
          <button type="button" onClick={handleDecimal} className={keyBtn}>
            .
          </button>
        </div>
      </div>
    </div>
  );
}
