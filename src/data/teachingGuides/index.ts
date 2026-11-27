import type { GuideCourse, TeachingGuide } from './types';
import { microShortRunCosts } from './microShortRunCosts';
import { microGameTheory } from './microGameTheory';

export type { GuideBlock, GuideCourse, GuideQuestion, GuideSection, TeachingGuide } from './types';

/** Every published guide. Add new ones here. */
export const TEACHING_GUIDES: TeachingGuide[] = [microShortRunCosts, microGameTheory];

export const GUIDE_COURSE_LABELS: Record<GuideCourse, string> = {
  'ap-microeconomics': 'AP Microeconomics',
  'ap-macroeconomics': 'AP Macroeconomics',
};

export function guideHref(guide: Pick<TeachingGuide, 'course' | 'slug'>): string {
  return `/guides/${guide.course}/${guide.slug}`;
}

export function findGuide(course: string, slug: string): TeachingGuide | null {
  return TEACHING_GUIDES.find((g) => g.course === course && g.slug === slug) ?? null;
}
