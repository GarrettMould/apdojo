/**
 * `?preview=complete` (every lesson done) or `?preview=revisit` (done, two to revisit) fakes progress and a
 * test result on a unit wrap-up so the finished states can be checked. Dev builds and admins only; nothing is saved.
 */
const WRAP_UP_PREVIEWS = ['complete', 'revisit'] as const;
export type WrapUpPreview = (typeof WRAP_UP_PREVIEWS)[number];

export function isWrapUpPreview(value: unknown): value is WrapUpPreview {
  return WRAP_UP_PREVIEWS.includes(value as WrapUpPreview);
}
