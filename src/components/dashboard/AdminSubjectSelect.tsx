'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { CourseSubject } from '@/lib/courseSubject';
import { ADMIN_SUBJECT_SELECT_OPTIONS, isCourseSubject } from '@/lib/courseSubject';

interface AdminSubjectSelectProps {
  value: CourseSubject;
  onChange: (subject: CourseSubject) => void;
  size?: 'compact' | 'default';
  className?: string;
}

/** Single control surface (no nested gray rail) — slightly softer than the old toggle pills. */
const triggerStyle: Record<CourseSubject, string> = {
  macro:
    'bg-blue-400 text-white border-blue-600 shadow-[0_3px_0_0_rgba(37,99,235,0.55)]',
  micro:
    'bg-emerald-400 text-white border-emerald-600 shadow-[0_3px_0_0_rgba(5,150,105,0.55)]',
  gov:
    'bg-violet-500 text-white border-violet-700 shadow-[0_3px_0_0_rgba(109,40,217,0.55)]',
  stats:
    'bg-orange-500 text-white border-orange-700 shadow-[0_3px_0_0_rgba(194,65,12,0.55)]',
};

const optionActiveStyle: Record<CourseSubject, string> = {
  macro: 'bg-blue-400 text-white border-blue-600 shadow-[0_2px_0_0_rgba(0,0,0,0.35)]',
  micro: 'bg-emerald-400 text-white border-emerald-600 shadow-[0_2px_0_0_rgba(0,0,0,0.35)]',
  gov: 'bg-violet-500 text-white border-violet-700 shadow-[0_2px_0_0_rgba(0,0,0,0.35)]',
  stats: 'bg-orange-500 text-white border-orange-700 shadow-[0_2px_0_0_rgba(0,0,0,0.35)]',
};

function optionLabel(value: string): string {
  return ADMIN_SUBJECT_SELECT_OPTIONS.find((o) => o.value === value)?.label ?? value;
}

export function AdminSubjectSelect({
  value,
  onChange,
  size = 'default',
  className = '',
}: AdminSubjectSelectProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const isCompact = size === 'compact';
  const triggerPad = isCompact ? 'px-3.5 py-2' : 'px-4 py-2';
  const textClass = 'text-sm font-black';

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const selectSubject = (next: string) => {
    if (!isCourseSubject(next)) return;
    onChange(next);
    setOpen(false);
  };

  return (
    <div ref={rootRef} className={`relative inline-flex min-w-[9.5rem] ${className}`}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select AP subject"
        onClick={() => setOpen((o) => !o)}
        className={`flex w-full items-center justify-between gap-2 rounded-xl border-2 transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-gray-400 ${triggerPad} ${textClass} ${triggerStyle[value]}`}
      >
        <span className="truncate">{optionLabel(value)}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-white/90 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          aria-hidden
        />
      </button>

      {open ? (
        <div
          role="listbox"
          aria-label="AP subjects"
          className="absolute left-0 right-0 top-[calc(100%+6px)] z-[100] rounded-xl border-2 border-gray-300 bg-gray-100 p-1 shadow-[0_3px_0_0_rgba(209,213,219,1)]"
        >
          {ADMIN_SUBJECT_SELECT_OPTIONS.map((opt) => {
            const disabled = 'disabled' in opt && opt.disabled;
            const isSelected = isCourseSubject(opt.value) && opt.value === value;
            const isSelectable = isCourseSubject(opt.value) && !disabled;

            return (
              <button
                key={opt.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                disabled={disabled}
                onClick={() => {
                  if (isSelectable) selectSubject(opt.value);
                }}
                className={`flex w-full items-center rounded-lg border-2 px-3 py-2 text-left text-sm font-black transition-all duration-150 ${
                  disabled
                    ? 'cursor-not-allowed border-transparent bg-transparent text-gray-400'
                    : isSelected && isCourseSubject(opt.value)
                      ? optionActiveStyle[opt.value]
                      : 'border-transparent bg-transparent text-gray-700 hover:bg-white/80 hover:text-gray-900'
                } ${isCompact ? 'py-1.5' : ''}`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
