import type { CourseOutlineId } from '@/data/courseCurriculumOutline';

/** Accepts in-app course ids and question-bank tags. */
export const PACKET_SUBJECT_TO_OUTLINE: Record<string, CourseOutlineId> = {
  gov: 'gov',
  stats: 'stats',
  macro: 'macro',
  micro: 'micro',
  ap_us_government: 'gov',
  ap_statistics: 'stats',
  ap_macroeconomics: 'macro',
  ap_microeconomics: 'micro',
};

export function packetCourseDisplayName(outlineId: CourseOutlineId): string {
  switch (outlineId) {
    case 'gov':
      return 'AP U.S. Government and Politics';
    case 'stats':
      return 'AP Statistics';
    case 'macro':
      return 'AP Macroeconomics';
    case 'micro':
      return 'AP Microeconomics';
  }
}

export function isPacketSubject(value: unknown): value is string {
  return typeof value === 'string' && value in PACKET_SUBJECT_TO_OUTLINE;
}
