/** Normalize bank copy for highlight offset math (offsets are in this string). */
export function canonicalQuestionText(raw: string): string {
  return raw.replace(/\r\n/g, '\n');
}
