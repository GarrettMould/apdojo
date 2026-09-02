'use client';

import { useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';
import type { CourseSubject } from '@/lib/courseSubject';
import {
  currentLocationKey,
  getUrlForSubjectSwitch,
} from '@/lib/subjectSwitchNavigation';

/**
 * Updates selected subject and navigates to the parallel page in the new course when possible.
 */
export function useSubjectSwitchNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { selectedSubject, setSelectedSubject, user } = useAuthContext();

  return useCallback(
    async (newSubject: CourseSubject, currentSubject?: CourseSubject) => {
      const fromSubject = currentSubject ?? selectedSubject;
      if (newSubject === fromSubject) return;

      const targetUrl = getUrlForSubjectSwitch(pathname ?? '/', searchParams, newSubject, {
        isLoggedIn: !!user,
      });
      const here = currentLocationKey(pathname ?? '/', searchParams);

      await setSelectedSubject(newSubject);

      if (targetUrl !== here && targetUrl !== pathname) {
        router.push(targetUrl);
        return;
      }

      router.refresh();
    },
    [pathname, router, searchParams, selectedSubject, setSelectedSubject, user],
  );
}
