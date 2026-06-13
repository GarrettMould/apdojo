'use client';

/** Split a table-style MCQ option string into column cells (e.g. `"House text | Senate text"`). */
export function parseMcqOptionTableCells(option: string): string[] {
  return option.split(' | ').map((cell) => cell.trim());
}

export function McqOptionTableHeaderRow({ headers }: { headers: string[] }) {
  return (
    <div className="mb-2 grid grid-cols-[auto_1fr_1fr_auto] gap-3 border-b-2 border-gray-300 px-3 pb-2">
      <div className="w-8 shrink-0" />
      {headers.map((header, idx) => (
        <div key={idx} className="text-center text-sm font-semibold text-gray-700">
          {header}
        </div>
      ))}
      <div className="w-8 shrink-0" />
    </div>
  );
}

export function McqOptionTableCells({
  option,
  struckThrough = false,
  className = '',
}: {
  option: string;
  struckThrough?: boolean;
  className?: string;
}) {
  const cells = parseMcqOptionTableCells(option);
  return (
    <div className={`grid flex-1 grid-cols-2 gap-3 sm:gap-4 ${className}`}>
      {cells.map((value, idx) => (
        <span
          key={idx}
          className={`text-center text-sm leading-snug text-gray-900 ${
            struckThrough ? 'text-gray-400 line-through' : ''
          }`}
        >
          {value}
        </span>
      ))}
    </div>
  );
}
