'use client';

import { useReducer, useState, useEffect, useCallback, type Dispatch } from 'react';
import { INITIAL_STATE, calcReducer } from '@/lib/ti84-simulator';
import type { CalcAction, CalcState } from '@/lib/ti84-simulator';
import { Ti84Screen } from './Ti84Screen';
import { Ti84Keypad } from './Ti84Keypad';

type Props = {
  /** Controlled state — when omitted, the simulator manages its own state. */
  state?: CalcState;
  dispatch?: Dispatch<CalcAction>;
  /** When false, skip global keyboard shortcuts (e.g. decorative CTA preview). Default true. */
  captureKeyboard?: boolean;
};

export function Ti84Simulator({
  state: controlledState,
  dispatch: controlledDispatch,
  captureKeyboard = true,
}: Props) {
  const [internalState, internalDispatch] = useReducer(calcReducer, INITIAL_STATE);
  const state = controlledState ?? internalState;
  const dispatch = controlledDispatch ?? internalDispatch;
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const id = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const key = e.key;
      let action: CalcAction | null = null;

      if (key >= '0' && key <= '9') action = { type: 'key', key };
      else if (key === '.') action = { type: 'key', key: '.' };
      else if (key === ',') action = { type: 'key', key: ',' };
      else if (key === '+') action = { type: 'key', key: '+' };
      else if (key === '-') action = { type: 'key', key: '-' };
      else if (key === '*') action = { type: 'key', key: '×' };
      else if (key === '/') action = { type: 'key', key: '÷' };
      else if (key === '^') action = { type: 'key', key: '^' };
      else if (key === '(') action = { type: 'key', key: '(' };
      else if (key === ')') action = { type: 'key', key: ')' };
      else if (key === 'Enter') action = { type: 'enter' };
      else if (key === 'Backspace') action = { type: 'del' };
      else if (key === 'Escape') action = { type: 'clear' };
      else if (key === 'ArrowUp') action = { type: 'arrow', dir: 'up' };
      else if (key === 'ArrowDown') action = { type: 'arrow', dir: 'down' };

      if (action) {
        e.preventDefault();
        dispatch(action);
      }
    },
    [dispatch],
  );

  useEffect(() => {
    if (!captureKeyboard) return;
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [captureKeyboard, handleKeyDown]);

  return (
    <div className="w-[360px] mx-auto select-none">
      <div
        className="relative rounded-[24px] shadow-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #1a1d23 0%, #111318 100%)',
          border: '3px solid #e74c3c',
          borderTop: '3px solid #3498db',
        }}
      >
        <div className="flex justify-center gap-3 pt-3 pb-1">
          <div className="w-2.5 h-2.5 rounded-full bg-gray-600" />
          <div className="w-2.5 h-2.5 rounded-full bg-gray-600" />
        </div>

        <div className="mx-4 mb-3">
          <div className="border-[3px] border-gray-500 rounded-md overflow-hidden shadow-inner bg-black p-[2px]">
            <Ti84Screen
              lines={state.screenLines}
              inputBuffer={state.inputBuffer}
              showCursor={cursorVisible && (state.mode === 'home' || state.mode === 'input')}
            />
          </div>
        </div>

        <div className="px-3 pb-4">
          <Ti84Keypad dispatch={dispatch} />
        </div>
      </div>
    </div>
  );
}
