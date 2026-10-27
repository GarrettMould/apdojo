'use client';

import { useEffect, useState } from 'react';
import { KatexRenderer } from '@/components/KatexRenderer';
import {
  AP_STATS_EXAM_FORMULA_SECTIONS,
  defaultFormulaSectionForUnit,
  type StatsFormulaSectionId,
} from '@/data/stats/apStatsExamFormulas';

type Props = {
  /** Current Stats unit — picks the default tab. Students can still open every section. */
  unit?: number;
  className?: string;
};

export function StatsFormulaSheet({ unit, className = '' }: Props) {
  const initial = defaultFormulaSectionForUnit(unit ?? 0);
  const [sectionId, setSectionId] = useState<StatsFormulaSectionId>(initial);

  useEffect(() => {
    setSectionId(defaultFormulaSectionForUnit(unit ?? 0));
  }, [unit]);

  const section =
    AP_STATS_EXAM_FORMULA_SECTIONS.find((s) => s.id === sectionId) ??
    AP_STATS_EXAM_FORMULA_SECTIONS[0];

  return (
    <div className={`flex h-full min-h-[420px] flex-col bg-white ${className}`}>
      <div className="flex shrink-0 gap-1 overflow-x-auto border-b border-gray-200 px-3 py-2">
        {AP_STATS_EXAM_FORMULA_SECTIONS.map((s) => {
          const active = s.id === sectionId;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setSectionId(s.id)}
              className={`whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
                active
                  ? 'bg-gray-900 text-white'
                  : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              ({s.roman}) {s.title}
            </button>
          );
        })}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
        <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.12em] text-gray-500">
          Exam-style formula sheet
        </p>
        <h2 className="mb-4 text-base font-black text-gray-900">
          ({section.roman}) {section.title}
        </h2>

        <div className="space-y-4">
          {section.blocks.map((block, i) => {
            if (block.type === 'note') {
              return (
                <p key={i} className="text-sm leading-relaxed text-gray-700">
                  {block.text}
                </p>
              );
            }
            if (block.type === 'formula') {
              return (
                <div
                  key={i}
                  className="overflow-x-auto rounded-lg border border-gray-200 bg-gray-50 px-3 py-3"
                >
                  <KatexRenderer math={block.latex} displayMode />
                </div>
              );
            }
            return (
              <div key={i} className="overflow-x-auto">
                <table className="w-full min-w-[280px] border-collapse text-left text-sm">
                  <thead>
                    <tr>
                      {block.headers.map((header) => (
                        <th
                          key={header}
                          className="border border-gray-300 bg-gray-50 px-3 py-2 font-semibold text-gray-900"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row) => (
                      <tr key={row.label}>
                        <td className="border border-gray-300 px-3 py-2 align-top font-medium text-gray-800">
                          {row.label}
                        </td>
                        <td className="border border-gray-300 px-3 py-3 align-top">
                          <KatexRenderer math={row.latex} displayMode />
                          {row.note ? (
                            <div className="mt-2 overflow-x-auto">
                              <KatexRenderer math={row.note} displayMode />
                            </div>
                          ) : null}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          })}
        </div>

        <p className="mt-6 text-xs leading-relaxed text-gray-500">
          Same formulas provided on the AP Statistics exam. z, t, and χ² tables are not included
          here yet.
        </p>
      </div>
    </div>
  );
}
