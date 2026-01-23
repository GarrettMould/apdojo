import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Check if user has a valid (non-expired) season pass
 * @param userData - User data object from Firestore
 * @param subject - Optional subject to check ('macro' | 'micro'). If not provided, checks if user has any valid pass.
 * @returns true if user has a valid season pass
 */
export function hasValidSeasonPass(
  userData: any,
  subject?: 'macro' | 'micro'
): boolean {
  if (!userData) return false;
  
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
export function getUnitMCQTestUrl(unitId: number, subject: 'macro' | 'micro'): string {
  return `/ap-${subject}-unit-${unitId}-mcq-test`;
}

/**
 * Generate SEO-friendly URL for full MCQ practice tests
 * @param subject - Subject ('macro' | 'micro')
 * @param testNumber - Test number (default: 1)
 * @returns Descriptive URL like '/ap-micro-mcq-practice-test-1'
 */
export function getFullMCQTestUrl(subject: 'macro' | 'micro', testNumber: number = 1): string {
  return `/ap-${subject}-mcq-practice-test-${testNumber}`;
}

/**
 * Generate SEO-friendly URL for full FRQ practice tests
 * @param subject - Subject ('macro' | 'micro')
 * @param testNumber - Test number (default: 2 for micro, 1 for macro)
 * @returns Descriptive URL like '/ap-micro-frq-practice-test-2'
 */
export function getFullFRQTestUrl(subject: 'macro' | 'micro', testNumber?: number): string {
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
export function getPracticeTestsUrl(subject: 'macro' | 'micro'): string {
  return `/ap-${subject}-practice-tests`;
}