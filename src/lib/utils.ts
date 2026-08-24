import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { CourseSubject } from "@/lib/courseSubject"
import { hasAdminRole } from "@/lib/adminAccess"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Check if user has premium access (valid season pass or admin role).
 * @param userData - User data object from Firestore
 * @param subject - Optional course to check. If not provided, checks if user has any valid pass.
 * @returns true if user is admin or has a valid season pass
 */
export function hasValidSeasonPass(
  userData: any,
  subject?: CourseSubject
): boolean {
  if (!userData) return false;
  if (hasAdminRole(userData)) return true;
  
  const seasonPass = userData.seasonPass as string[] | undefined;
  const expiration = userData.seasonPassExpiration as Record<string, string> | undefined;
  
  if (!seasonPass || seasonPass.length === 0) return false;
  if (!expiration) return false; // If no expiration data, assume not premium (safety check)
  
  // Get current UTC time
  const now = new Date();
  const nowUTC = now.toISOString();
  
  // If subject is specified, check that specific subject
  if (subject) {
    if (!seasonPass.includes(subject)) return false;
    const expDate = expiration[subject];
    if (!expDate) return false;
    return expDate >= nowUTC;
  }
  
  // Check if user has at least one valid (non-expired) season pass
  const hasValidPass = seasonPass.some((subj: string) => {
    const expDate = expiration[subj];
    if (!expDate) return false; // No expiration date = not valid
    return expDate >= nowUTC;
  });
  
  return hasValidPass;
}

/** AP Gov premium surfaces — season-pass model. */
export function hasGovPremiumAccess(userData: unknown): boolean {
  return hasValidSeasonPass(userData, 'gov');
}

/** AP Stats premium surfaces — season-pass model. */
export function hasStatsPremiumAccess(userData: unknown): boolean {
  return hasValidSeasonPass(userData, 'stats');
}

// Assigns light pastel background colors based on unit ID
// (Using darker fills like bg-blue-500 for better visibility on the bar)
export const getUnitColor = (unitId: number): string => {
  const colors = [
    'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-yellow-500',
    'bg-red-500', 'bg-indigo-500', 'bg-pink-500', 'bg-teal-500',
    // ... rest of function ...
  ]
  return colors[unitId % colors.length]
}

/**
 * Generate SEO-friendly URL for unit MCQ tests
 * @param unitId - Unit number (1-6)
 * @param subject - Subject ('macro' | 'micro')
 * @returns Descriptive URL like '/ap-micro-unit-3-mcq-test'
 */
export function getUnitMCQTestUrl(unitId: number, subject: CourseSubject): string {
  return `/ap-${subject}-unit-${unitId}-mcq-test`;
}

/**
 * Unit test intro screen. Use `type=frq` for AP Gov (and future) unit FRQ packs.
 * MCQ is the default when `type` is omitted.
 */
export function getUnitTestPreviewUrl(
  unitId: number,
  subject: CourseSubject,
  format: 'mcq' | 'frq' = 'mcq'
): string {
  const q = new URLSearchParams({ subject, unit: String(unitId) });
  if (format === 'frq') q.set('type', 'frq');
  return `/unit-test-preview?${q.toString()}`;
}

/** Unit stimulus FRQ pack (typed answers) — query params match the preview page. */
export function getUnitFrqPackUrl(unitId: number, subject: CourseSubject): string {
  const q = new URLSearchParams({ subject, unit: String(unitId) });
  return `/unit-frq-pack?${q.toString()}`;
}

/** Grid of unit MCQ + (Gov) FRQ pack cards — canonical “hub” for unit exams. */
export function getUnitFinalPracticeTestsUrl(subject: CourseSubject): string {
  return `/unit-final-practice-tests?subject=${subject}`;
}

/**
 * Generate SEO-friendly URL for full MCQ practice tests
 * @param subject - Subject ('macro' | 'micro')
 * @param testNumber - Test number (default: 1)
 * @returns Descriptive URL like '/ap-micro-mcq-practice-test-1'
 */
export function getFullMCQTestUrl(subject: CourseSubject, testNumber: number = 1): string {
  return `/ap-${subject}-mcq-practice-test-${testNumber}`;
}

/** examNumber prop for FullExam full-length MCQ tests (e.g. full-macro-mcq-1). */
export function getFullMCQExamNumber(subject: 'macro' | 'micro', testNumber: number = 1): string {
  return `full-${subject}-mcq-${testNumber}`;
}

/** Firestore progress key for full-length MCQ exams using the unit-test UI. */
export function getFullMCQExamTestId(subject: 'macro' | 'micro', testNumber: number = 1): string {
  return `unit_${getFullMCQExamNumber(subject, testNumber)}_${subject}`;
}

/** Legacy progress key from the old /full-mcq-exam route. */
export function getLegacyFullMCQExamTestId(subject: 'macro' | 'micro'): string {
  return `full_${subject}_mcq`;
}

export function isFullLengthMcqExamNumber(examNumber?: string): boolean {
  return !!examNumber && /^full-(macro|micro)-mcq-\d+$/.test(examNumber);
}

/** Landing page before a full-length MCQ exam (Begin / Resume). */
export function getFullMCQExamPreviewUrl(subject: CourseSubject, testNumber: number = 1): string {
  return `/full-mcq-exam-preview?subject=${subject}&num=${testNumber}`;
}

/**
 * Generate SEO-friendly URL for full FRQ practice tests
 * @param subject - Subject ('macro' | 'micro')
 * @param testNumber - Test number (default: 2 for micro, 1 for macro)
 * @returns Descriptive URL like '/ap-micro-frq-practice-test-2'
 */
export function getFullFRQTestUrl(subject: CourseSubject, testNumber?: number): string {
  // Default to test-2 for micro, test-1 for macro (as per user spec)
  const defaultTestNumber = subject === 'micro' ? 2 : 1;
  const testNum = testNumber ?? defaultTestNumber;
  return `/ap-${subject}-frq-practice-test-${testNum}`;
}

/**
 * Generate SEO-friendly URL for practice tests page
 * @param subject - Subject ('macro' | 'micro')
 * @returns Descriptive URL like '/ap-micro-practice-tests'
 */
export function getPracticeTestsUrl(subject: CourseSubject): string {
  return `/ap-${subject}-practice-tests`;
}