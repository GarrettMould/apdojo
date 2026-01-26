import { macroUnits, microUnits } from '@/data/cheatSheets';

/**
 * Convert a title string to a URL-friendly slug
 * @param title - Title like "National Income and Price Determination"
 * @returns URL slug like "national-income-price-determination"
 */
function slugifyTitle(title: string): string {
  return title
    .toLowerCase()
    // Remove common words that don't add SEO value
    .replace(/\b(and|the|of|in|on|at|to|for|with|from)\b/g, '')
    // Replace special characters and spaces with hyphens
    .replace(/[^a-z0-9]+/g, '-')
    // Remove leading/trailing hyphens and multiple consecutive hyphens
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-')
    // Limit length to avoid overly long URLs (keep first 50 chars of slug)
    .substring(0, 50)
    .replace(/-+$/, ''); // Remove trailing hyphen if truncated
}

/**
 * Convert subject slug to internal subject ID
 * @param subjectSlug - URL slug like "ap-macroeconomics" or "ap-microeconomics"
 * @returns Internal subject ID: "macro" | "micro" | null
 */
export function parseSubjectSlug(subjectSlug: string): 'macro' | 'micro' | null {
  const normalized = subjectSlug.toLowerCase().trim();
  
  if (normalized === 'ap-macroeconomics' || normalized === 'macroeconomics' || normalized === 'macro') {
    return 'macro';
  }
  
  if (normalized === 'ap-microeconomics' || normalized === 'microeconomics' || normalized === 'micro') {
    return 'micro';
  }
  
  return null;
}

/**
 * Convert subject ID to URL slug
 * @param subject - Internal subject ID: "macro" | "micro"
 * @returns URL slug like "ap-macroeconomics" or "ap-microeconomics"
 */
export function getSubjectSlug(subject: 'macro' | 'micro'): string {
  return subject === 'macro' ? 'ap-macroeconomics' : 'ap-microeconomics';
}

/**
 * Convert unit slug to unit number
 * Supports both old format (unit-3) and new format (unit-3-national-income)
 * @param unitSlug - URL slug like "unit-3" or "unit-3-national-income" or "3"
 * @returns Unit number (1-6) or null if invalid
 */
export function parseUnitSlug(unitSlug: string): number | null {
  const normalized = unitSlug.toLowerCase().trim();
  
  // Handle "unit-3" or "unit-3-national-income" format
  if (normalized.startsWith('unit-')) {
    // Extract just the number part (everything after "unit-" and before the next hyphen or end)
    const afterUnit = normalized.replace('unit-', '');
    // Get the first part which should be the number
    const parts = afterUnit.split('-');
    const unitNum = parseInt(parts[0], 10);
    if (!isNaN(unitNum) && unitNum >= 1 && unitNum <= 6) {
      return unitNum;
    }
  }
  
  // Handle just "3" format
  const unitNum = parseInt(normalized, 10);
  if (!isNaN(unitNum) && unitNum >= 1 && unitNum <= 6) {
    return unitNum;
  }
  
  return null;
}

/**
 * Convert unit number to URL slug with topic name
 * @param unitNumber - Unit number (1-6)
 * @param subject - Internal subject ID (optional, for getting unit title)
 * @returns URL slug like "unit-3-national-income-price-determination"
 */
export function getUnitSlug(unitNumber: number, subject?: 'macro' | 'micro'): string {
  const baseSlug = `unit-${unitNumber}`;
  
  // If subject is provided, include the topic name for better SEO
  if (subject) {
    const unit = getUnitDetails(subject, unitNumber);
    if (unit) {
      const topicSlug = slugifyTitle(unit.title);
      return `${baseSlug}-${topicSlug}`;
    }
  }
  
  // Fallback to just unit number if no subject or unit not found
  return baseSlug;
}

/**
 * Get unit details by subject and unit number
 * @param subject - Internal subject ID
 * @param unitNumber - Unit number (1-6)
 * @returns Unit details or null if not found
 */
export function getUnitDetails(subject: 'macro' | 'micro', unitNumber: number) {
  const units = subject === 'macro' ? macroUnits : microUnits;
  return units.find(u => u.number === unitNumber) || null;
}

/**
 * Find unit by slug (supports both old and new formats)
 * @param unitSlug - URL slug like "unit-3" or "unit-3-national-income"
 * @param subject - Internal subject ID
 * @returns Unit details or null if not found
 */
export function getUnitBySlug(unitSlug: string, subject: 'macro' | 'micro') {
  const unitNumber = parseUnitSlug(unitSlug);
  if (!unitNumber) return null;
  return getUnitDetails(subject, unitNumber);
}

/**
 * Get full unit name for display
 * @param subject - Internal subject ID
 * @param unitNumber - Unit number (1-6)
 * @returns Full unit name like "Unit 3: National Income and Price Determination"
 */
export function getFullUnitName(subject: 'macro' | 'micro', unitNumber: number): string {
  const unit = getUnitDetails(subject, unitNumber);
  if (unit) {
    return `Unit ${unitNumber}: ${unit.title}`;
  }
  return `Unit ${unitNumber}`;
}

/**
 * Get subject display name
 * @param subject - Internal subject ID
 * @returns Display name like "Macroeconomics" or "Microeconomics"
 */
export function getSubjectDisplayName(subject: 'macro' | 'micro'): string {
  return subject === 'macro' ? 'Macroeconomics' : 'Microeconomics';
}
