import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MacroUnitWrapUp } from '@/components/guidedLesson/MacroUnitWrapUp';
import { isWrapUpPreview } from '@/components/guidedLesson/wrapUpPreview';
import { FEATURES } from '@/lib/featureFlags';
import { getGuidedCourseUnits, hasGuidedUnit } from '@/data/guidedLessons';

/** `/ap-macro/explainers/unit-3` → 3, or null for anything else. */
function parseUnit(segment: string): number | null {
  const match = /^unit-(\d+)$/.exec(segment);
  if (!match) return null;
  const unit = Number(match[1]);
  return hasGuidedUnit(unit) ? unit : null;
}

export function generateStaticParams() {
  return getGuidedCourseUnits()
    .filter((u) => hasGuidedUnit(u.unit))
    .map((u) => ({ unit: `unit-${u.unit}` }));
}

export async function generateMetadata({ params }: { params: Promise<{ unit: string }> }): Promise<Metadata> {
  const unit = parseUnit((await params).unit);
  if (unit === null) return {};
  const name = getGuidedCourseUnits().find((u) => u.unit === unit)?.name ?? '';
  return {
    title: `AP Macro Unit ${unit} Wrap-Up`,
    description: `Your progress through the AP Macro Unit ${unit} explainers (${name}), and what to do next.`,
    // Personal progress page; the lessons themselves are what should be indexed.
    robots: { index: false, follow: true },
  };
}

export default async function MacroUnitWrapUpPage({
  params,
  searchParams,
}: {
  params: Promise<{ unit: string }>;
  searchParams: Promise<{ preview?: string }>;
}) {
  const unit = parseUnit((await params).unit);
  if (unit === null || !FEATURES.guidedExplainers) notFound();
  const { preview } = await searchParams;
  return <MacroUnitWrapUp unit={unit} preview={isWrapUpPreview(preview) ? preview : undefined} />;
}
