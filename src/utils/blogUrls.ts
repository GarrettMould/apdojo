/**
 * Utility functions for generating SEO-friendly blog URLs
 */

/**
 * Generates an SEO-friendly URL from blog post data
 * Format: ap-{macro|micro}-unit-{unit}-{simplified-slug}
 * Example: foreign-exchange-cookies -> ap-macro-unit-6-foreign-exchange
 */
export function generateSeoUrl(slug: string, subject: string, unit: number): string {
  // Normalize subject to lowercase
  const normalizedSubject = subject.toLowerCase() === 'macro' ? 'macro' : 'micro';
  
  // Simplify the slug by taking the main part (before common suffixes like -cookies, -explained, etc.)
  // For foreign-exchange-cookies, we want "foreign-exchange"
  let simplifiedSlug = slug;
  
  // Remove common suffixes that don't add SEO value
  simplifiedSlug = simplifiedSlug
    .replace(/-cookies$/, '')
    .replace(/-explained$/, '')
    .replace(/-and-aggregate-demand$/, '')
    .replace(/-marginal-revenue$/, '')
    .replace(/-long-run-self-adjustment$/, '');
  
  return `ap-${normalizedSubject}-unit-${unit}-${simplifiedSlug}`;
}

/**
 * Maps SEO URL back to original slug
 * We need to check all known slugs to find the match
 */
export function getSlugFromSeoUrl(
  seoUrl: string,
  slugToDataMap: Map<string, { subject: string; unit: number }>
): string | null {
  // Extract parts from SEO URL: ap-{macro|micro}-unit-{number}-{rest}
  const match = seoUrl.match(/^ap-(macro|micro)-unit-(\d+)-(.+)$/);
  if (!match) {
    return null;
  }
  
  const [, subject, unitStr, restOfSlug] = match;
  const unit = parseInt(unitStr, 10);
  
  // Try to find a slug that would generate this SEO URL
  for (const [slug, data] of slugToDataMap.entries()) {
    const normalizedSubject = data.subject.toLowerCase() === 'macro' ? 'macro' : 'micro';
    
    if (normalizedSubject === subject && data.unit === unit) {
      const generatedSeoUrl = generateSeoUrl(slug, data.subject, data.unit);
      if (generatedSeoUrl === seoUrl) {
        return slug;
      }
    }
  }
  
  // Fallback: try to match by the rest of the slug
  for (const [slug, data] of slugToDataMap.entries()) {
    const normalizedSubject = data.subject.toLowerCase() === 'macro' ? 'macro' : 'micro';
    
    if (normalizedSubject === subject && data.unit === unit && slug.includes(restOfSlug)) {
      return slug;
    }
  }
  
  return null;
}
