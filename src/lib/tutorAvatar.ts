import type { CourseSubject } from '@/lib/courseSubject';

/** 3D Adam Smith — used beside econ tutor messages in chat UIs. */
export const ECON_TUTOR_AVATAR_URL =
  'https://thumbnailslarge.s3.ap-southeast-2.amazonaws.com/adam_smith';

export function econTutorAvatarUrl(subject: CourseSubject): string | null {
  if (subject === 'macro' || subject === 'micro') return ECON_TUTOR_AVATAR_URL;
  return null;
}
