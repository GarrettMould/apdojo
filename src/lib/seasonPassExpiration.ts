/**
 * Season passes run through the end of the school year (June 30).
 * Purchases on/before June 30 expire that same June 30;
 * purchases after June 30 roll to the following school year.
 */
export function getSeasonPassExpirationDate(now: Date = new Date()): string {
  const year = now.getUTCFullYear();
  const month = now.getUTCMonth(); // 0-indexed
  const day = now.getUTCDate();
  const expirationYear =
    month > 5 || (month === 5 && day > 30) ? year + 1 : year;
  return `${expirationYear}-06-30T23:59:59.999Z`;
}
