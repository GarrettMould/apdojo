import { MacroLessonRoute } from '@/components/guidedLesson/MacroLessonRoute';
import LegacyLesson from './legacy';

export default function Page() {
  return <MacroLessonRoute lessonId="3.3" legacy={<LegacyLesson />} />;
}
