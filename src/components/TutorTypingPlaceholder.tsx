'use client';

import React from 'react';
import type { CourseSubject } from '@/lib/courseSubject';
import { TutorAvatar } from '@/components/TutorAvatar';
import { tutorAvatarInitials, tutorAvatarUrl } from '@/lib/tutorAvatar';

type TutorTypingPlaceholderProps = {
  /** Optional tutor avatar (e.g. econ Adam Smith); Gov may omit. */
  avatarUrl?: string | null;
  /** When set, renders image or initials placeholder (overrides avatarUrl). */
  subject?: CourseSubject;
  /** Accessible label for screen readers */
  label?: string;
};

/**
 * Assistant-row skeleton shown while the tutor response is loading —
 * pulsing lines + cursor bar to suggest writing in progress.
 */
export function TutorTypingPlaceholder({
  avatarUrl,
  subject,
  label = 'Tutor is writing a reply…',
}: TutorTypingPlaceholderProps) {
  const showSubjectAvatar =
    subject != null && (tutorAvatarUrl(subject) != null || tutorAvatarInitials(subject) != null);

  return (
    <div
      className="flex w-full flex-col items-start"
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label={label}
    >
      <div className="flex w-full max-w-[min(100%,23rem)] flex-row items-start gap-2 sm:max-w-[min(100%,24rem)]">
        {showSubjectAvatar ? (
          <TutorAvatar
            subject={subject!}
            className="mt-0.5 h-9 w-9 shrink-0 rounded-full opacity-70"
          />
        ) : avatarUrl ? (
          <img
            src={avatarUrl}
            alt=""
            width={36}
            height={36}
            className="mt-0.5 h-9 w-9 shrink-0 rounded-full object-cover opacity-70 ring-2 ring-white shadow-sm"
            aria-hidden
          />
        ) : (
          <div
            className="mt-0.5 h-9 w-9 shrink-0 rounded-full bg-slate-200/80 ring-2 ring-white"
            aria-hidden
          />
        )}
        <div className="min-w-0 flex-1 rounded-2xl rounded-bl-md border border-slate-100/90 bg-white px-3.5 py-3 shadow-sm">
          <div className="flex items-start gap-2">
            <span
              className="mt-0.5 inline-block h-[1.1rem] w-0.5 shrink-0 animate-pulse rounded-sm bg-slate-400"
              aria-hidden
            />
            <div className="min-h-[4.5rem] flex-1 space-y-2.5 pt-0.5">
              <div className="h-2.5 w-[94%] animate-pulse rounded-full bg-slate-200" />
              <div className="h-2.5 w-[88%] animate-pulse rounded-full bg-slate-200 delay-100" />
              <div className="h-2.5 w-[72%] animate-pulse rounded-full bg-slate-200 delay-200" />
              <p className="pt-1 text-[11px] font-medium text-slate-400">{label}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
