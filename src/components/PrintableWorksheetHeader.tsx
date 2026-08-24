import React from 'react';

type PrintableWorksheetHeaderProps = {
  /** Main worksheet title, e.g. "AP Macro - Production Possibilities Curve" */
  title: string;
  totalQuestions: number;
  /** Right of brand — Wayground uses "Worksheets" */
  sectionLabel?: string;
  /** Tighter spacing for FRQ-heavy print layouts */
  compact?: boolean;
  className?: string;
};

/**
 * Print-friendly worksheet header (Wayground-style):
 * brand + section · title / question count · Name / Class / Date boxes.
 */
export function PrintableWorksheetHeader({
  title,
  totalQuestions,
  sectionLabel = 'Worksheets',
  compact = false,
  className = '',
}: PrintableWorksheetHeaderProps) {
  return (
    <header
      className={`border-b border-gray-300 pb-5 mb-6 print:pb-4 print:mb-4 ${
        compact ? 'print:!pb-2 print:!mb-2' : ''
      } ${className}`}
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-end gap-x-3 gap-y-1">
            <div className="flex items-center gap-2">
              <img
                src="/images/dojoIconJan26.svg"
                alt=""
                className="h-8 w-8 shrink-0 print:h-7 print:w-7"
              />
              <div className="leading-none">
                <p className="text-lg font-black tracking-tight text-blue-600 print:text-base">
                  AP DOJO
                </p>
              </div>
            </div>
            <p className="pb-0.5 text-sm font-medium text-gray-800 print:text-xs">{sectionLabel}</p>
          </div>

          <h1 className="mt-4 text-base font-bold leading-snug text-gray-950 print:mt-3 print:text-[15px]">
            {title}
          </h1>
          <p className="mt-1.5 text-sm text-gray-800 print:text-xs">
            Total questions: {totalQuestions}
          </p>
        </div>

        <div
          className={`flex w-full shrink-0 flex-col gap-2 sm:w-[220px] print:w-[200px] ${
            compact ? 'print:!w-[180px] print:!gap-1.5' : ''
          }`}
        >
          {(['Name', 'Class', 'Date'] as const).map((label) => (
            <div key={label} className="flex items-center gap-2.5">
              <span className="w-10 shrink-0 text-right text-sm text-gray-900 print:text-xs">
                {label}
              </span>
              <div
                className={`h-8 flex-1 rounded border border-gray-300 bg-white print:h-7 ${
                  compact ? 'print:!h-6' : ''
                }`}
                aria-hidden
              />
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
