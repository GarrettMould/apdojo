import { MacroLessonRoute } from '@/components/guidedLesson/MacroLessonRoute';
import LegacyLesson from './legacy';

export default function Page() {
  return <MacroLessonRoute lessonId="4.5" legacy={<LegacyLesson />} />;
}
