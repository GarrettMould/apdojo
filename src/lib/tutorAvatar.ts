import type { CourseSubject } from '@/lib/courseSubject';

/** 3D Adam Smith — used beside econ tutor messages in chat UIs. */
export const ECON_TUTOR_AVATAR_URL =
  'https://thumbnailslarge.s3.ap-southeast-2.amazonaws.com/adam_smith';
/** Benjamin Franklin avatar for AP Gov tutor UI. */
export const GOV_TUTOR_AVATAR_URL =
  'https://thumbnailslarge.s3.ap-southeast-2.amazonaws.com/ben_franklin';
/** Florence Nightingale avatar for AP Stats tutor UI. */
export const STATS_TUTOR_AVATAR_URL =
  'https://thumbnailslarge.s3.ap-southeast-2.amazonaws.com/Gemini_Generated_Image_4svzgx4svzgx4svz.png';

export function econTutorAvatarUrl(subject: CourseSubject): string | null {
  if (subject === 'macro' || subject === 'micro') return ECON_TUTOR_AVATAR_URL;
  return null;
}

export function tutorAvatarUrl(subject: CourseSubject): string | null {
  if (subject === 'gov') return GOV_TUTOR_AVATAR_URL;
  if (subject === 'stats') return STATS_TUTOR_AVATAR_URL;
  return econTutorAvatarUrl(subject);
}

/** Initials fallback when a subject has no portrait URL. */
export function tutorAvatarInitials(subject: CourseSubject): string | null {
  return null;
}
