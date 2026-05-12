import { macroUnits, microUnits, govUnits } from '@/data/cheatSheets';

/** Subject keys used under `/mcq-practice/[subject]/[unit]`. */
export type PracticeMcqSubject = 'macro' | 'micro' | 'gov';

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
 * @param subjectSlug - URL slug like "ap-macroeconomics" or "ap-us-government"
 * @returns Internal subject ID or null
 */
export function parseSubjectSlug(subjectSlug: string): PracticeMcqSubject | null {
  const normalized = subjectSlug.toLowerCase().trim();

  if (normalized === 'ap-macroeconomics' || normalized === 'macroeconomics' || normalized === 'macro') {
    return 'macro';
  }

  if (normalized === 'ap-microeconomics' || normalized === 'microeconomics' || normalized === 'micro') {
    return 'micro';
  }

  if (
    normalized === 'ap-us-government' ||
    normalized === 'ap-government-and-politics' ||
    normalized === 'ap-us-gov' ||
    normalized === 'government' ||
    normalized === 'gov'
  ) {
    return 'gov';
  }

  return null;
}

/**
 * Convert subject ID to URL slug
 * @param subject - Internal subject ID
 * @returns URL slug for the `mcq-practice` path segment
 */
export function getSubjectSlug(subject: PracticeMcqSubject): string {
  if (subject === 'macro') return 'ap-macroeconomics';
  if (subject === 'micro') return 'ap-microeconomics';
  return 'ap-us-government';
}

/**
 * Convert unit slug to unit number
 * Supports both old format (unit-3) and new format (unit-3-national-income)
 * @param unitSlug - URL slug like "unit-3" or "unit-3-national-income" or "3"
 * @returns Unit number (1–6 for econ; Gov framework uses 1–5 in data, still parsed up to 6 for URL compatibility)
 */
export function parseUnitSlug(unitSlug: string): number | null {
  const normalized = unitSlug.toLowerCase().trim();

  // Handle "unit-3" or "unit-3-national-income" format
  if (normalized.startsWith('unit-')) {
    const afterUnit = normalized.replace('unit-', '');
    const parts = afterUnit.split('-');
    const unitNum = parseInt(parts[0], 10);
    if (!isNaN(unitNum) && unitNum >= 1 && unitNum <= 6) {
      return unitNum;
    }
  }

  const unitNum = parseInt(normalized, 10);
  if (!isNaN(unitNum) && unitNum >= 1 && unitNum <= 6) {
    return unitNum;
  }

  return null;
}

/**
 * Convert unit number to URL slug with topic name
 * @param unitNumber - Unit number
 * @param subject - Internal subject ID (optional, for getting unit title)
 * @returns URL slug like "unit-3-national-income-price-determination"
 */
export function getUnitSlug(unitNumber: number, subject?: PracticeMcqSubject): string {
  const baseSlug = `unit-${unitNumber}`;

  if (subject) {
    const unit = getUnitDetails(subject, unitNumber);
    if (unit) {
      const topicSlug = slugifyTitle(unit.title);
      return `${baseSlug}-${topicSlug}`;
    }
  }

  return baseSlug;
}

/**
 * Get unit details by subject and unit number
 */
export function getUnitDetails(subject: PracticeMcqSubject, unitNumber: number) {
  const units = subject === 'macro' ? macroUnits : subject === 'micro' ? microUnits : govUnits;
  return units.find((u) => u.number === unitNumber) || null;
}

/**
 * Find unit by slug (supports both old and new formats)
 */
export function getUnitBySlug(unitSlug: string, subject: PracticeMcqSubject) {
  const unitNumber = parseUnitSlug(unitSlug);
  if (!unitNumber) return null;
  return getUnitDetails(subject, unitNumber);
}

/**
 * Get full unit name for display
 */
export function getFullUnitName(subject: PracticeMcqSubject, unitNumber: number): string {
  const unit = getUnitDetails(subject, unitNumber);
  if (unit) {
    return `Unit ${unitNumber}: ${unit.title}`;
  }
  return `Unit ${unitNumber}`;
}

/**
 * Get subject display name
 */
export function getSubjectDisplayName(subject: PracticeMcqSubject): string {
  if (subject === 'macro') return 'Macroeconomics';
  if (subject === 'micro') return 'Microeconomics';
  return 'U.S. Government and Politics';
}
