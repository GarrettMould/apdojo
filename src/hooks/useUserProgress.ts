import type { UserData } from './useAuth';
import type { CourseSubject } from '@/lib/courseSubject';

/**
 * Helper function to get XP for a specific subject with legacy fallback.
 *
 * For 'micro': Returns xp_micro or 0 (no legacy fallback since micro is new).
 * For 'macro': Returns xp_macro if it exists, otherwise falls back to the legacy 'totalXP' field, or 0.
 * For 'gov': Returns xp_gov or 0.
 *
 * This ensures existing users (who only have totalXP) will see that XP appear as Macro XP,
 * so they keep their belt and progress.
 */
export function getSubjectXP(user: UserData | null, subject: CourseSubject): number {
  if (!user) return 0;

  if (subject === 'micro') {
    return user.xp_micro ?? 0;
  }
  if (subject === 'gov') {
    return user.xp_gov ?? 0;
  }
  if (subject === 'stats') {
    return user.xp_stats ?? 0;
  }
  return user.xp_macro !== undefined ? user.xp_macro : (user.totalXP ?? 0);
}

/**
 * Hook to get normalized XP values for both subjects.
 * This ensures the UI doesn't have to guess which field to use.
 */
export function useUserProgress(user: UserData | null) {
  const macroXP = getSubjectXP(user, 'macro');
  const microXP = getSubjectXP(user, 'micro');
  const govXP = getSubjectXP(user, 'gov');

  return {
    macroXP,
    microXP,
    govXP,
    getSubjectXP: (subject: CourseSubject) => getSubjectXP(user, subject),
  };
}

