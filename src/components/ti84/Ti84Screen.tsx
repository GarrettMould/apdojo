'use client';

import type { ScreenLine } from '@/lib/ti84-simulator';

type Props = {
  lines: ScreenLine[];
  inputBuffer: string;
  showCursor: boolean;
};

export function Ti84Screen({ lines, inputBuffer, showCursor }: Props) {
  return (
    <div className="bg-white rounded-sm w-full select-none flex flex-col overflow-hidden"
      style={{ fontFamily: "'Courier New', Courier, monospace" }}
    >
      {/* Status bar — matches real TI-84 */}
      <div className="flex items-center justify-between px-2 py-0.5 text-[10px] text-gray-800 tracking-wider border-b border-gray-300 bg-gray-100">
        <span>NORMAL FLOAT AUTO REAL RADIAN MP</span>
        <div className="flex items-center gap-0.5">
          <div className="w-3 h-[7px] border border-gray-700 rounded-[1px] relative">
            <div className="absolute inset-[1px] right-[1px] bg-green-600 rounded-[0.5px]" />
          </div>
        </div>
      </div>

      {/* Main display area */}
      <div className="px-3 py-2 min-h-[180px] text-[15px] leading-[1.5] text-black flex flex-col">
        {lines.length === 0 && !inputBuffer ? (
          <div className="flex-1 flex items-start">
            {showCursor && <span className="animate-pulse text-black">▌</span>}
          </div>
        ) : (
          <>
            {lines.map((line, i) => (
              <div
                key={i}
                className={`whitespace-pre-wrap break-all ${
                  line.selected ? 'bg-black text-white px-1 -mx-1' : ''
                } ${line.align === 'right' ? 'text-right' : ''}`}
              >
                {line.text || '\u00A0'}
              </div>
            ))}
            {inputBuffer !== undefined && lines.length === 0 && (
              <div className="text-right">
                {inputBuffer}
                {showCursor && <span className="animate-pulse">▌</span>}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
