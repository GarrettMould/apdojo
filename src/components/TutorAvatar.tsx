'use client';

import type { CourseSubject } from '@/lib/courseSubject';
import { tutorAvatarInitials, tutorAvatarUrl } from '@/lib/tutorAvatar';

type TutorAvatarProps = {
  subject: CourseSubject;
  className?: string;
  alt?: string;
};

/** Tutor face in chat — image when available, initials placeholder for Stats until art ships. */
export function TutorAvatar({
  subject,
  className = 'mt-0.5 h-9 w-9 shrink-0 rounded-full',
  alt = '',
}: TutorAvatarProps) {
  const url = tutorAvatarUrl(subject);
  const initials = tutorAvatarInitials(subject);

  if (url) {
    return (
      <img
        src={url}
        alt={alt}
        width={36}
        height={36}
        className={`${className} object-cover ring-2 ring-white shadow-sm`}
      />
    );
  }

  if (initials) {
    return (
      <div
        className={`${className} flex items-center justify-center bg-gradient-to-br from-orange-500 to-amber-600 text-[11px] font-bold text-white shadow-sm ring-2 ring-white`}
        aria-hidden={!alt}
        title={alt || undefined}
      >
        {initials}
      </div>
    );
  }

  return null;
}
