import { MacroLessonRoute } from '@/components/guidedLesson/MacroLessonRoute';
import LegacyLesson from './legacy';

export default function Page() {
  return <MacroLessonRoute lessonId="1.4" legacy={<LegacyLesson />} />;
}
