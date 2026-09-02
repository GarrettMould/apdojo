import type { ReadonlyURLSearchParams } from 'next/navigation';
import type { CourseSubject } from '@/lib/courseSubject';
import {
  defaultCheatSheetUrl,
  getCheatSheetUrlForSubjectSwitch,
  isEconCourse,
} from '@/lib/courseSubject';
import {
  getFullFRQTestUrl,
  getFullMCQTestUrl,
  getPracticeTestsUrl,
  getUnitFinalPracticeTestsUrl,
} from '@/lib/utils';

type SearchParamsLike = Pick<URLSearchParams, 'get' | 'toString'> | null | undefined;

/** Default landing page when switching into a course with no parallel route. */
export function subjectHomeUrl(subject: CourseSubject): string {
  return defaultCheatSheetUrl(subject);
}

function normalizePath(pathname: string): string {
  return pathname.split('?')[0].replace(/\/$/, '') || '/';
}

function practiceTestsHubUrl(subject: CourseSubject): string {
  return getPracticeTestsUrl(subject);
}

/**
 * Resolve where to navigate when the user switches AP course while browsing.
 * Prefer parallel pages (cheat sheet unit, practice-test hub); otherwise subject home.
 */
export function getUrlForSubjectSwitch(
  pathname: string,
  searchParams: SearchParamsLike,
  newSubject: CourseSubject,
  options?: { isLoggedIn?: boolean },
): string {
  const path = normalizePath(pathname);

  // Logged-in home: "Your Library" dashboard — stay on `/`, only swap subject context.
  // Logged-out home (Season Pass landing): go to that course's Unit 1 cheat sheet.
  if (path === '/') {
    return options?.isLoggedIn ? '/' : defaultCheatSheetUrl(newSubject);
  }

  const cheatSheetTarget = getCheatSheetUrlForSubjectSwitch(path, newSubject);
  if (cheatSheetTarget) return cheatSheetTarget;

  if (path === '/unit-final-practice-tests') {
    return getUnitFinalPracticeTestsUrl(newSubject);
  }

  if (/^\/ap-(macro|micro|gov|stats)-practice-tests$/.test(path)) {
    return practiceTestsHubUrl(newSubject);
  }

  if (path === '/select-practice-units') {
    return `/select-practice-units?subject=${newSubject}`;
  }

  if (path === '/ap-blog-home') {
    return `/ap-blog-home?subject=${newSubject}`;
  }

  if (
    path.startsWith('/mcq-practice/') ||
    path.startsWith('/practice/') ||
    path === '/unitMCQPracticePage'
  ) {
    return subjectHomeUrl(newSubject);
  }

  if (path === '/unitFRQpracticePage' || path === '/full-frq-exam') {
    if (isEconCourse(newSubject)) {
      return getUnitFinalPracticeTestsUrl(newSubject);
    }
    return subjectHomeUrl(newSubject);
  }

  if (path === '/unit-test-preview' || path === '/unit-frq-pack' || path === '/ap-gov-frq-practice-packs') {
    return getUnitFinalPracticeTestsUrl(newSubject);
  }

  if (/^\/unit-mcq-test\/\d+$/.test(path)) {
    return getUnitFinalPracticeTestsUrl(newSubject);
  }

  if (/^\/ap-(macro|micro|gov|stats)-unit-\d+-mcq-test$/.test(path)) {
    return getUnitFinalPracticeTestsUrl(newSubject);
  }

  if (path.startsWith('/scotus-essay-practice')) {
    return subjectHomeUrl(newSubject);
  }

  const tutoringMatch = path.match(/^\/tutoring\/(macro|micro|gov|stats)$/);
  if (tutoringMatch || path === '/tutoring') {
    return `/tutoring/${newSubject}`;
  }

  if (path.startsWith('/offer/')) {
    if (newSubject === 'macro' || newSubject === 'micro' || newSubject === 'gov' || newSubject === 'stats') {
      return `/offer/${newSubject}`;
    }
    return subjectHomeUrl(newSubject);
  }

  const previewMatch = path.match(/^\/preview\/(macro|micro)\/(mcq|frq)\/(\d+)$/);
  if (previewMatch) {
    const format = previewMatch[2] as 'mcq' | 'frq';
    const num = parseInt(previewMatch[3], 10);
    if (isEconCourse(newSubject)) {
      return format === 'mcq' ? getFullMCQTestUrl(newSubject, num) : getFullFRQTestUrl(newSubject, num);
    }
    return getUnitFinalPracticeTestsUrl(newSubject);
  }

  const fullMcqPretty = path.match(/^\/ap-(macro|micro)-mcq-practice-test-(\d+)$/);
  if (fullMcqPretty) {
    const num = parseInt(fullMcqPretty[2], 10);
    if (isEconCourse(newSubject)) return getFullMCQTestUrl(newSubject, num);
    return getUnitFinalPracticeTestsUrl(newSubject);
  }

  const fullFrqPretty = path.match(/^\/ap-(macro|micro)-frq-practice-test-(\d+)$/);
  if (fullFrqPretty) {
    const num = parseInt(fullFrqPretty[2], 10);
    if (isEconCourse(newSubject)) return getFullFRQTestUrl(newSubject, num);
    return getUnitFinalPracticeTestsUrl(newSubject);
  }

  const videosMatch = path.match(/^\/videos\/(macro|micro)$/);
  if (videosMatch) {
    if (isEconCourse(newSubject)) return `/videos/${newSubject}`;
    return subjectHomeUrl(newSubject);
  }

  if (path.startsWith('/dojo-drills') || path.startsWith('/graph-gym')) {
    if (isEconCourse(newSubject)) return path.split('?')[0];
    return subjectHomeUrl(newSubject);
  }

  if (path === '/whiteboards') {
    const subjectParam = searchParams?.get('subject');
    if (subjectParam && isEconCourse(newSubject)) {
      return `/whiteboards?subject=${newSubject}`;
    }
    if (isEconCourse(newSubject)) return `/whiteboards?subject=${newSubject}`;
    return subjectHomeUrl(newSubject);
  }

  return subjectHomeUrl(newSubject);
}

export function currentLocationKey(
  pathname: string,
  searchParams: ReadonlyURLSearchParams | URLSearchParams | null,
): string {
  const qs = searchParams?.toString();
  return qs ? `${pathname}?${qs}` : pathname;
}
