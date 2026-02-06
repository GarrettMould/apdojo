/**
 * Centralized route builders for deep dive and other app URLs.
 */

/**
 * Returns the deep dive URL for a lesson (dynamic route: /ap-macro/unit-1/production-possibilities-curve).
 * @param subject - e.g. 'ap-macro' or 'ap-micro'
 * @param unit - e.g. '1'
 * @param slug - e.g. 'production-possibilities-curve'
 */
export function getDeepDiveUrl(subject: string, unit: string, slug: string): string {
  return `/${subject}/unit-${unit}/${slug}`;
}
