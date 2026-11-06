import { getAnalyticsInstance } from '@/lib/firebase';

type EventParams = Record<string, string | number | boolean>;

/**
 * Sends a custom event to Firebase Analytics (Google Analytics 4). Browser only; a no-op where
 * Analytics isn't supported (some private modes, blockers). Never throws, so tracking can't break a page.
 * Do not pass personal details (names, emails) as params.
 */
export async function trackEvent(name: string, params?: EventParams): Promise<void> {
  if (typeof window === 'undefined') return;
  try {
    const { isSupported, logEvent } = await import('firebase/analytics');
    if (!(await isSupported())) return;
    const analytics = getAnalyticsInstance();
    if (analytics) logEvent(analytics, name, params);
  } catch {
    // Tracking is best-effort.
  }
}
