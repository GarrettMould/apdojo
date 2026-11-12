import type { ReactNode } from 'react';
import { GuidedLesson } from '@/components/guidedLesson/GuidedLesson';
import { getGuidedLessonContent } from '@/data/guidedLessons';
import { FEATURES } from '@/lib/featureFlags';

/**
 * A Macro lesson URL (/ap-macro/unit-N/slug): shows the guided explainer when explainers are on and
 * this lesson has one, otherwise the earlier deep-dive page passed as `legacy`.
 */
export function MacroLessonRoute({ lessonId, legacy }: { lessonId: string; legacy: ReactNode }) {
  if (FEATURES.guidedExplainers && getGuidedLessonContent(lessonId)) {
    return <GuidedLesson lessonId={lessonId} />;
  }
  return legacy;
}
