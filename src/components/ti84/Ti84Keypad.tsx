'use client';

import type { CalcAction } from '@/lib/ti84-simulator';

type Props = { dispatch: (action: CalcAction) => void };

/*
 * Full TI-84 Plus CE keypad layout, matching the real calculator.
 *
 * Each key has:
 *   label     — main text on the key face
 *   second    — blue "2nd" label printed ABOVE the key
 *   alpha     — green "alpha" label printed ABOVE the key (to the right of second)
 *   action    — CalcAction dispatched on click
 *   color     — key face color
 */

type KeyDef = {
  label: string;
  second?: string;
  alpha?: string;
  action: CalcAction;
  color: string;
  textColor?: string;
  /** Width multiplier (1 = normal, 2 = double) */
  wide?: number;
};

// ─── Row definitions (top → bottom, matching reference image) ──

// Row 1: y= / window / zoom / trace / graph  (function keys)
const ROW_F: KeyDef[] = [
  { label: 'y=', second: 'statplot', alpha: 'f1', action: { type: 'key', key: '' }, color: 'bg-gray-600', textColor: 'text-white' },
  { label: 'window', second: 'tblset', alpha: 'f2', action: { type: 'key', key: '' }, color: 'bg-gray-600', textColor: 'text-white' },
  { label: 'zoom', second: 'format', alpha: 'f3', action: { type: 'key', key: '' }, color: 'bg-gray-600', textColor: 'text-white' },
  { label: 'trace', second: 'calc', alpha: 'f4', action: { type: 'key', key: '' }, color: 'bg-gray-600', textColor: 'text-white' },
  { label: 'graph', second: 'table', alpha: 'f5', action: { type: 'key', key: '' }, color: 'bg-gray-600', textColor: 'text-white' },
];

// Row 2: 2nd / mode / del  (+ d-pad is separate)
const ROW_2: KeyDef[] = [
  { label: '2nd', action: { type: 'second' }, color: 'bg-[#3366cc]', textColor: 'text-white' },
  { label: 'mode', second: 'quit', action: { type: 'quit' }, color: 'bg-gray-700', textColor: 'text-white' },
  { label: 'del', second: 'ins', action: { type: 'del' }, color: 'bg-gray-700', textColor: 'text-white' },
];

// Row 3: alpha / X,T,θ,n / stat  (+ d-pad continues)
const ROW_3: KeyDef[] = [
  { label: 'alpha', second: 'A-lock', action: { type: 'key', key: '' }, color: 'bg-[#339933]', textColor: 'text-white' },
  { label: 'X,T,θ,n', second: 'link', alpha: '', action: { type: 'key', key: 'X' }, color: 'bg-gray-700', textColor: 'text-white' },
  { label: 'stat', second: 'list', action: { type: 'stat' }, color: 'bg-gray-700', textColor: 'text-white' },
];

// Row 4: math / apps / prgm / vars / clear
const ROW_4: KeyDef[] = [
  { label: 'math', second: 'test', alpha: 'A', action: { type: 'stat' }, color: 'bg-gray-700', textColor: 'text-white' },
  { label: 'apps', second: 'angle', alpha: 'B', action: { type: 'key', key: '' }, color: 'bg-gray-700', textColor: 'text-white' },
  { label: 'prgm', second: 'draw', alpha: 'C', action: { type: 'key', key: '' }, color: 'bg-gray-700', textColor: 'text-white' },
  { label: 'vars', second: 'distr', action: { type: 'distr' }, color: 'bg-gray-700', textColor: 'text-white' },
  { label: 'clear', action: { type: 'clear' }, color: 'bg-gray-700', textColor: 'text-white' },
];

// Row 5: x⁻¹ / sin / cos / tan / ^
const ROW_5: KeyDef[] = [
  { label: 'x⁻¹', second: 'matrix', alpha: 'D', action: { type: 'key', key: '' }, color: 'bg-gray-700', textColor: 'text-white' },
  { label: 'sin', second: 'sin⁻¹', alpha: 'E', action: { type: 'key', key: '' }, color: 'bg-gray-700', textColor: 'text-white' },
  { label: 'cos', second: 'cos⁻¹', alpha: 'F', action: { type: 'key', key: '' }, color: 'bg-gray-700', textColor: 'text-white' },
  { label: 'tan', second: 'tan⁻¹', alpha: 'G', action: { type: 'key', key: '' }, color: 'bg-gray-700', textColor: 'text-white' },
  { label: '^', second: 'π', alpha: 'H', action: { type: 'key', key: '^' }, color: 'bg-gray-700', textColor: 'text-white' },
];

// Row 6: x² / , / ( / ) / ÷
const ROW_6: KeyDef[] = [
  { label: 'x²', second: '√', alpha: 'I', action: { type: 'key', key: '^2' }, color: 'bg-gray-700', textColor: 'text-white' },
  { label: ',', second: 'EE', alpha: 'J', action: { type: 'key', key: ',' }, color: 'bg-gray-700', textColor: 'text-white' },
  { label: '(', second: '{', alpha: 'K', action: { type: 'key', key: '(' }, color: 'bg-gray-700', textColor: 'text-white' },
  { label: ')', second: '}', alpha: 'L', action: { type: 'key', key: ')' }, color: 'bg-gray-700', textColor: 'text-white' },
  { label: '÷', second: 'e', alpha: 'M', action: { type: 'key', key: '÷' }, color: 'bg-gray-700', textColor: 'text-white' },
];

// Row 7: log / 7 / 8 / 9 / ×
const ROW_7: KeyDef[] = [
  { label: 'log', second: '10ˣ', alpha: 'N', action: { type: 'key', key: '' }, color: 'bg-gray-700', textColor: 'text-white' },
  { label: '7', second: 'u', alpha: 'O', action: { type: 'key', key: '7' }, color: 'bg-gray-800', textColor: 'text-white' },
  { label: '8', second: 'v', alpha: 'P', action: { type: 'key', key: '8' }, color: 'bg-gray-800', textColor: 'text-white' },
  { label: '9', second: 'w', alpha: 'Q', action: { type: 'key', key: '9' }, color: 'bg-gray-800', textColor: 'text-white' },
  { label: '×', second: '[', alpha: 'R', action: { type: 'key', key: '×' }, color: 'bg-gray-700', textColor: 'text-white' },
];

// Row 8: ln / 4 / 5 / 6 / −
const ROW_8: KeyDef[] = [
  { label: 'ln', second: 'eˣ', alpha: 'S', action: { type: 'key', key: '' }, color: 'bg-gray-700', textColor: 'text-white' },
  { label: '4', second: 'L4', alpha: 'T', action: { type: 'key', key: '4' }, color: 'bg-gray-800', textColor: 'text-white' },
  { label: '5', second: 'L5', alpha: 'U', action: { type: 'key', key: '5' }, color: 'bg-gray-800', textColor: 'text-white' },
  { label: '6', second: 'L6', alpha: 'V', action: { type: 'key', key: '6' }, color: 'bg-gray-800', textColor: 'text-white' },
  { label: '−', second: ']', alpha: 'W', action: { type: 'key', key: '-' }, color: 'bg-gray-700', textColor: 'text-white' },
];

// Row 9: sto→ / 1 / 2 / 3 / +
const ROW_9: KeyDef[] = [
  { label: 'sto→', second: 'rcl', alpha: 'X', action: { type: 'key', key: '' }, color: 'bg-gray-700', textColor: 'text-white' },
  { label: '1', second: 'L1', alpha: 'Y', action: { type: 'key', key: '1' }, color: 'bg-gray-800', textColor: 'text-white' },
  { label: '2', second: 'L2', alpha: 'Z', action: { type: 'key', key: '2' }, color: 'bg-gray-800', textColor: 'text-white' },
  { label: '3', second: 'L3', alpha: 'θ', action: { type: 'key', key: '3' }, color: 'bg-gray-800', textColor: 'text-white' },
  { label: '+', second: 'mem', alpha: '"', action: { type: 'key', key: '+' }, color: 'bg-gray-700', textColor: 'text-white' },
];

// Row 10: on / 0 / . / (−) / enter
const ROW_10: KeyDef[] = [
  { label: 'on', second: 'off', action: { type: 'clear' }, color: 'bg-gray-700', textColor: 'text-white' },
  { label: '0', second: 'catalog', alpha: '', action: { type: 'key', key: '0' }, color: 'bg-gray-800', textColor: 'text-white' },
  { label: '.', second: 'i', alpha: ':', action: { type: 'key', key: '.' }, color: 'bg-gray-800', textColor: 'text-white' },
  { label: '(−)', second: 'ans', alpha: '?', action: { type: 'key', key: '-' }, color: 'bg-gray-800', textColor: 'text-white' },
  { label: 'enter', second: 'entry', alpha: 'solve', action: { type: 'enter' }, color: 'bg-[#1a44a0]', textColor: 'text-white' },
];

const ALL_ROWS = [ROW_4, ROW_5, ROW_6, ROW_7, ROW_8, ROW_9, ROW_10];

function KeyButton({ k, dispatch }: { k: KeyDef; dispatch: (a: CalcAction) => void }) {
  const isNoop = k.action.type === 'key' && (k.action as { key: string }).key === '';
  return (
    <button
      onClick={() => !isNoop && dispatch(k.action)}
      className={`relative rounded-[5px] flex flex-col items-center justify-center
        transition-all active:scale-95 active:brightness-75 select-none
        ${k.color} ${k.textColor ?? 'text-white'}
        ${isNoop ? 'opacity-70 cursor-default' : 'cursor-pointer hover:brightness-110'}
        h-[38px]`}
      style={{ minWidth: 0 }}
    >
      <span className="text-[11px] font-bold leading-none">{k.label}</span>
    </button>
  );
}

function SecondAlphaLabels({ keys }: { keys: KeyDef[] }) {
  return (
    <div className="grid grid-cols-5 gap-x-[6px] px-[2px] mb-[2px]">
      {keys.map((k, i) => (
        <div key={i} className="flex items-center justify-center gap-[3px] h-[12px]">
          {k.second && (
            <span className="text-[7px] font-semibold text-[#3366cc] leading-none truncate">
              {k.second}
            </span>
          )}
          {k.alpha && (
            <span className="text-[7px] font-semibold text-[#339933] leading-none truncate">
              {k.alpha}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

export function Ti84Keypad({ dispatch }: Props) {
  return (
    <div className="flex flex-col gap-0">
      {/* ── Function key row (y= window zoom trace graph) ── */}
      <SecondAlphaLabels keys={ROW_F} />
      <div className="grid grid-cols-5 gap-[6px] mb-3">
        {ROW_F.map((k, i) => (
          <KeyButton key={i} k={k} dispatch={dispatch} />
        ))}
      </div>

      {/* ── Row 2+3: 2nd/mode/del + d-pad cluster + alpha/X,T/stat ── */}
      <div className="flex gap-2 mb-1 items-start">
        {/* Left 3 keys (rows 2 & 3 stacked) */}
        <div className="flex flex-col gap-1 flex-shrink-0">
          {/* 2nd row labels */}
          <div className="grid grid-cols-3 gap-x-[6px]">
            {ROW_2.map((k, i) => (
              <div key={i} className="flex items-center justify-center gap-[2px] h-[10px]">
                {k.second && <span className="text-[7px] font-semibold text-[#3366cc] leading-none">{k.second}</span>}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-[6px]">
            {ROW_2.map((k, i) => (
              <KeyButton key={i} k={k} dispatch={dispatch} />
            ))}
          </div>
          {/* 3rd row labels */}
          <div className="grid grid-cols-3 gap-x-[6px] mt-1">
            {ROW_3.map((k, i) => (
              <div key={i} className="flex items-center justify-center gap-[2px] h-[10px]">
                {k.second && <span className="text-[7px] font-semibold text-[#3366cc] leading-none">{k.second}</span>}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-[6px]">
            {ROW_3.map((k, i) => (
              <KeyButton key={i} k={k} dispatch={dispatch} />
            ))}
          </div>
        </div>

        {/* D-pad */}
        <div className="flex-1 flex items-center justify-center">
          <div className="relative w-[90px] h-[90px]">
            {/* Circular background */}
            <div className="absolute inset-0 rounded-full bg-gray-700 border-2 border-gray-600 shadow-inner" />
            {/* Center dot */}
            <div className="absolute top-1/2 left-1/2 w-[20px] h-[20px] -mt-[10px] -ml-[10px] rounded-full bg-[#2a7fff] border border-blue-400 z-10" />
            {/* Up */}
            <button
              onClick={() => dispatch({ type: 'arrow', dir: 'up' })}
              className="absolute top-0 left-1/2 -ml-[18px] w-[36px] h-[36px] flex items-center justify-center text-white text-lg hover:bg-gray-600 rounded-t-full active:brightness-75 z-20"
            >▲</button>
            {/* Down */}
            <button
              onClick={() => dispatch({ type: 'arrow', dir: 'down' })}
              className="absolute bottom-0 left-1/2 -ml-[18px] w-[36px] h-[36px] flex items-center justify-center text-white text-lg hover:bg-gray-600 rounded-b-full active:brightness-75 z-20"
            >▼</button>
            {/* Left */}
            <button
              onClick={() => dispatch({ type: 'key', key: '' })}
              className="absolute left-0 top-1/2 -mt-[18px] w-[36px] h-[36px] flex items-center justify-center text-white text-lg hover:bg-gray-600 rounded-l-full active:brightness-75 z-20 opacity-70"
            >◀</button>
            {/* Right */}
            <button
              onClick={() => dispatch({ type: 'key', key: '' })}
              className="absolute right-0 top-1/2 -mt-[18px] w-[36px] h-[36px] flex items-center justify-center text-white text-lg hover:bg-gray-600 rounded-r-full active:brightness-75 z-20 opacity-70"
            >▶</button>
          </div>
        </div>
      </div>

      {/* ── Rows 4–10 (full 5-col grid) ── */}
      {ALL_ROWS.map((row, ri) => (
        <div key={ri}>
          <SecondAlphaLabels keys={row} />
          <div className="grid grid-cols-5 gap-[6px] mb-[3px]">
            {row.map((k, i) => (
              <KeyButton key={i} k={k} dispatch={dispatch} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
