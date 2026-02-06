/**
 * Layout for [slug] segment: passes through so nested routes (e.g. unit-X/lesson-slug)
 * render correctly. Single-segment routes like /ap-macro still use [slug]/page.tsx.
 */
export default function SlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
