'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ChevronDown, Crown, Plus, X } from 'lucide-react';
import type { CourseSubject } from '@/lib/courseSubject';
import {
  ADMIN_SUBJECT_SELECT_OPTIONS,
  COURSE_SUBJECTS,
  getUserEnrolledSubjects,
  isCourseSubject,
} from '@/lib/courseSubject';
import { hasValidSeasonPass } from '@/lib/utils';
import { addUserSelectedSubject, removeUserSelectedSubject } from '@/lib/signupOnboarding';
import type { UserData } from '@/hooks/useAuth';
import { useAuthContext } from '@/contexts/AuthContext';

interface AdminSubjectSelectProps {
  value: CourseSubject;
  onChange: (subject: CourseSubject) => void;
  size?: 'compact' | 'default';
  className?: string;
  userData?: UserData | null;
}

const LONG_PRESS_MS = 500;

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
  userData: userDataProp,
}: AdminSubjectSelectProps) {
  const { user, userData: ctxUserData, setUserData } = useAuthContext();
  const userData = userDataProp ?? ctxUserData;

  const [open, setOpen] = useState(false);
  const [showAddPanel, setShowAddPanel] = useState(false);
  const [addingSubject, setAddingSubject] = useState<CourseSubject | null>(null);
  const [removeModeSubject, setRemoveModeSubject] = useState<CourseSubject | null>(null);
  const [removingSubject, setRemovingSubject] = useState<CourseSubject | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const longPressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const longPressTriggeredRef = useRef(false);
  const longPressStartRef = useRef<{ x: number; y: number } | null>(null);
  const isCompact = size === 'compact';
  const triggerPad = isCompact ? 'px-3.5 py-2' : 'px-4 py-2';
  const textClass = 'text-sm font-black';
  const optionPad = isCompact ? 'px-3.5 py-2.5' : 'px-4 py-3';

  const enrolledSubjects = useMemo(
    () => getUserEnrolledSubjects(!!user, userData),
    [user, userData],
  );

  const enrolledOptions = useMemo(() => {
    if (!enrolledSubjects) return ADMIN_SUBJECT_SELECT_OPTIONS;
    return ADMIN_SUBJECT_SELECT_OPTIONS.filter((opt) =>
      isCourseSubject(opt.value) ? enrolledSubjects.includes(opt.value) : false,
    );
  }, [enrolledSubjects]);

  const addableSubjects = useMemo(() => {
    if (!enrolledSubjects) return [];
    return COURSE_SUBJECTS.filter((s) => !enrolledSubjects.includes(s));
  }, [enrolledSubjects]);

  const canRemoveCourses = !!enrolledSubjects && enrolledSubjects.length > 1;

  const clearLongPressTimer = useCallback(() => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  }, []);

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

  useEffect(() => {
    if (!open) {
      setShowAddPanel(false);
      setRemoveModeSubject(null);
    }
  }, [open]);

  useEffect(() => () => clearLongPressTimer(), [clearLongPressTimer]);

  const selectSubject = (next: string) => {
    if (!isCourseSubject(next)) return;
    setRemoveModeSubject(null);
    onChange(next);
    setOpen(false);
  };

  const handleAddClass = async (subject: CourseSubject) => {
    if (!user || !enrolledSubjects || addingSubject) return;
    setAddingSubject(subject);
    try {
      const updated = await addUserSelectedSubject(user.uid, subject, enrolledSubjects);
      setUserData((prev) => (prev ? { ...prev, selectedSubjects: updated } : prev));
      onChange(subject);
      setShowAddPanel(false);
      setOpen(false);
    } catch (err) {
      console.error('[AdminSubjectSelect] Failed to add class:', err);
    } finally {
      setAddingSubject(null);
    }
  };

  const handleRemoveClass = async (subject: CourseSubject) => {
    if (!user || !enrolledSubjects || removingSubject || !canRemoveCourses) return;
    setRemovingSubject(subject);
    try {
      const { updatedSubjects, nextSelectedSubject } = await removeUserSelectedSubject(
        user.uid,
        subject,
        enrolledSubjects,
        value,
      );
      setUserData((prev) =>
        prev
          ? {
              ...prev,
              selectedSubjects: updatedSubjects,
              ...(nextSelectedSubject ? { selectedSubject: nextSelectedSubject } : {}),
            }
          : prev,
      );
      if (nextSelectedSubject) onChange(nextSelectedSubject);
      setRemoveModeSubject(null);
    } catch (err) {
      console.error('[AdminSubjectSelect] Failed to remove class:', err);
    } finally {
      setRemovingSubject(null);
    }
  };

  const startLongPress = (subject: CourseSubject, clientX: number, clientY: number) => {
    if (!canRemoveCourses || !isCourseSubject(subject)) return;
    clearLongPressTimer();
    longPressTriggeredRef.current = false;
    longPressStartRef.current = { x: clientX, y: clientY };
    longPressTimerRef.current = setTimeout(() => {
      longPressTriggeredRef.current = true;
      setRemoveModeSubject(subject);
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate(10);
      }
    }, LONG_PRESS_MS);
  };

  const cancelLongPress = () => {
    clearLongPressTimer();
    longPressStartRef.current = null;
  };

  const handleLongPressMove = (clientX: number, clientY: number) => {
    const start = longPressStartRef.current;
    if (!start) return;
    const dx = clientX - start.x;
    const dy = clientY - start.y;
    if (Math.hypot(dx, dy) > 8) cancelLongPress();
  };

  const renderEnrolledOption = (opt: (typeof ADMIN_SUBJECT_SELECT_OPTIONS)[number]) => {
    const disabled = 'disabled' in opt && opt.disabled;
    const subject = opt.value as CourseSubject;
    const isSelected = isCourseSubject(opt.value) && opt.value === value;
    const isSelectable = isCourseSubject(opt.value) && !disabled;
    const hasPremium =
      isCourseSubject(opt.value) && userData ? hasValidSeasonPass(userData, opt.value) : false;
    const isRemoving = removingSubject === subject;
    const inRemoveMode = removeModeSubject === subject;

    const rowClass = disabled
      ? 'cursor-not-allowed border-transparent bg-transparent text-gray-400'
      : isSelected
        ? optionActiveStyle[subject]
        : 'border-transparent bg-transparent text-gray-700 hover:bg-gray-50 hover:text-gray-900';

    return (
      <div
        key={opt.value}
        className={`flex w-full items-center justify-between gap-2 rounded-lg border-2 transition-all duration-150 ${optionPad} ${rowClass} ${isRemoving ? 'opacity-60' : ''}`}
      >
        <button
          type="button"
          role="option"
          aria-selected={isSelected}
          disabled={disabled || !!addingSubject || !!removingSubject}
          onContextMenu={(e) => {
            if (!canRemoveCourses || !isSelectable) return;
            e.preventDefault();
            setRemoveModeSubject(subject);
          }}
          onPointerDown={(e) => {
            if (!canRemoveCourses || !isSelectable || e.button !== 0) return;
            startLongPress(subject, e.clientX, e.clientY);
          }}
          onPointerMove={(e) => handleLongPressMove(e.clientX, e.clientY)}
          onPointerUp={cancelLongPress}
          onPointerLeave={cancelLongPress}
          onPointerCancel={cancelLongPress}
          onClick={() => {
            if (!isSelectable) return;
            if (longPressTriggeredRef.current) {
              longPressTriggeredRef.current = false;
              return;
            }
            if (inRemoveMode) {
              setRemoveModeSubject(null);
              return;
            }
            selectSubject(opt.value);
          }}
          className="min-w-0 flex-1 truncate border-0 bg-transparent p-0 text-left text-sm font-black outline-none disabled:cursor-not-allowed"
        >
          {opt.label}
        </button>

        {!disabled && isCourseSubject(opt.value) ? (
          inRemoveMode ? (
            <button
              type="button"
              aria-label={`Remove ${opt.label}`}
              disabled={!!removingSubject}
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                void handleRemoveClass(subject);
              }}
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500 text-white shadow-sm transition-colors hover:bg-red-600 disabled:opacity-60"
            >
              <X className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden />
            </button>
          ) : (
            <Crown
              className={`h-3.5 w-3.5 shrink-0 ${
                hasPremium ? 'fill-amber-400 text-amber-500' : 'fill-gray-300 text-gray-400'
              } ${isSelected ? 'text-white/90' : ''}`}
              aria-label={hasPremium ? 'Season Pass' : 'No Season Pass'}
            />
          )
        ) : null}
      </div>
    );
  };

  const renderAddableOption = (opt: (typeof ADMIN_SUBJECT_SELECT_OPTIONS)[number]) => {
    const disabled = 'disabled' in opt && opt.disabled;
    const isSelectable = isCourseSubject(opt.value) && !disabled;
    const isAdding = isCourseSubject(opt.value) && addingSubject === opt.value;

    return (
      <button
        key={opt.value}
        type="button"
        role="option"
        aria-selected={false}
        disabled={disabled || !!addingSubject}
        onClick={() => {
          if (!isSelectable) return;
          void handleAddClass(opt.value);
        }}
        className={`flex w-full items-center justify-between gap-2 rounded-lg border-2 text-left text-sm font-black transition-all duration-150 ${optionPad} border-transparent bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900 ${isAdding ? 'opacity-60' : ''}`}
      >
        <span className="truncate">{isAdding ? 'Adding…' : opt.label}</span>
        {isCourseSubject(opt.value) ? (
          <Plus className="h-3.5 w-3.5 shrink-0 text-gray-400" aria-hidden />
        ) : null}
      </button>
    );
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
          className="absolute left-0 right-0 top-[calc(100%+6px)] z-[100] rounded-xl border border-gray-200 bg-white p-1.5 shadow-lg"
          onClick={() => setRemoveModeSubject(null)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            {enrolledOptions.map((opt) => renderEnrolledOption(opt))}

            {addableSubjects.length > 0 ? (
              <>
                {!showAddPanel ? (
                  <button
                    type="button"
                    onClick={() => setShowAddPanel(true)}
                    disabled={!!addingSubject || !!removingSubject}
                    className={`mt-1 flex w-full items-center gap-2 rounded-lg border-2 border-transparent text-left text-sm font-semibold text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-600 ${optionPad}`}
                  >
                    <Plus className="h-3.5 w-3.5 shrink-0" />
                    Add Class
                  </button>
                ) : (
                  <div className="mt-1 border-t border-gray-100 pt-1">
                    {ADMIN_SUBJECT_SELECT_OPTIONS.filter(
                      (opt) => isCourseSubject(opt.value) && addableSubjects.includes(opt.value),
                    ).map((opt) => renderAddableOption(opt))}
                  </div>
                )}
              </>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
