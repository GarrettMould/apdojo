/**
 * Everything the site has for one course lesson (e.g. AP Macro 3.7): the "Explained by Garrett" guide, blog
 * articles, and the Macro lesson walkthrough page. One lookup, used by unit hubs, practice hints and results
 * screens, so new content shows up everywhere once it's tagged with its lesson.
 *
 * Kept light on purpose (no question bank, no article bodies) so client pages can use it.
 */
import { TEACHING_GUIDES, guideHref, type TeachingGuide } from '@/data/teachingGuides';
import { BLOG_LESSON_INDEX, type BlogLessonEntry } from '@/data/blogLessonIndex';
import { MACRO_LESSON_SLUGS, macroLessonHref } from '@/data/macroLessonPages';
import { COURSE_CURRICULUM_OUTLINES } from '@/data/courseCurriculumOutline';
import { generateSeoUrl } from '@/utils/blogUrls';

export type LessonCourseKey = 'macro' | 'micro';

/** Question subject tags, course slugs and short names → the course. */
const COURSE_KEYS: Record<string, LessonCourseKey> = {
  macro: 'macro',
  ap_macroeconomics: 'macro',
  'ap-macroeconomics': 'macro',
  Macro: 'macro',
  micro: 'micro',
  ap_microeconomics: 'micro',
  'ap-microeconomics': 'micro',
  Micro: 'micro',
};

export function lessonCourseKey(subject: string | readonly string[] | null | undefined): LessonCourseKey | null {
  if (!subject) return null;
  for (const s of Array.isArray(subject) ? subject : [subject]) {
    const key = COURSE_KEYS[s as string];
    if (key) return key;
  }
  return null;
}

export function lessonName(course: LessonCourseKey, lesson: string): string | null {
  const unit = Number.parseInt(lesson, 10);
  return (
    COURSE_CURRICULUM_OUTLINES[course].units.find((u) => u.unitNumber === unit)?.lessons.find((l) => l.lessonNumber === lesson)
      ?.name ?? null
  );
}

export function blogArticleHref(entry: Pick<BlogLessonEntry, 'slug' | 'subject' | 'unit'>): string {
  return `/blog/${generateSeoUrl(entry.slug, entry.subject, entry.unit)}`;
}

const GUIDE_COURSE: Record<LessonCourseKey, TeachingGuide['course']> = { macro: 'ap-macroeconomics', micro: 'ap-microeconomics' };
const BLOG_SUBJECT: Record<LessonCourseKey, BlogLessonEntry['subject']> = { macro: 'Macro', micro: 'Micro' };

export interface LessonContent {
  guide: TeachingGuide | null;
  /** Articles whose main lesson is this one come first. */
  articles: (BlogLessonEntry & { href: string })[];
  /** The Macro lesson walkthrough page, when the course has one for this lesson. */
  lessonPageHref: string | null;
}

export function contentForLesson(course: LessonCourseKey, lesson: string): LessonContent {
  const guide = TEACHING_GUIDES.find((g) => g.course === GUIDE_COURSE[course] && g.lesson === lesson) ?? null;
  const articles = BLOG_LESSON_INDEX.filter((a) => a.subject === BLOG_SUBJECT[course] && a.lessonIds.includes(lesson))
    .sort((a, b) => a.lessonIds.indexOf(lesson) - b.lessonIds.indexOf(lesson))
    .map((a) => ({ ...a, href: blogArticleHref(a) }));
  const lessonPageHref = course === 'macro' && MACRO_LESSON_SLUGS[lesson] ? macroLessonHref(lesson) : null;
  return { guide, articles, lessonPageHref };
}

/** The single best thing to read for a lesson a student is stuck on. */
export interface LessonExplainer {
  kind: 'guide' | 'article' | 'lesson-page';
  course: LessonCourseKey;
  lesson: string;
  lessonName: string | null;
  href: string;
  /** The article's title, for kind 'article'. */
  title: string | null;
}

/**
 * For a question's lessons: the guide if one exists, otherwise a blog article, otherwise (when allowed) the
 * Macro lesson walkthrough. Checks the question's lessons in order.
 */
export function bestExplainerForLesson(
  subject: string | readonly string[] | null | undefined,
  lessonIds: readonly string[] | null | undefined,
  { includeLessonPages = true }: { includeLessonPages?: boolean } = {},
): LessonExplainer | null {
  const course = lessonCourseKey(subject);
  if (!course || !lessonIds?.length) return null;
  const all = lessonIds.map((lesson) => ({ lesson, content: contentForLesson(course, lesson) }));
  const base = (lesson: string) => ({ course, lesson, lessonName: lessonName(course, lesson) });

  const withGuide = all.find((x) => x.content.guide);
  if (withGuide?.content.guide) return { kind: 'guide', ...base(withGuide.lesson), href: guideHref(withGuide.content.guide), title: null };
  const withArticle = all.find((x) => x.content.articles.length > 0);
  if (withArticle) {
    const article = withArticle.content.articles[0];
    return { kind: 'article', ...base(withArticle.lesson), href: article.href, title: article.title };
  }
  if (includeLessonPages) {
    const withPage = all.find((x) => x.content.lessonPageHref);
    if (withPage?.content.lessonPageHref) return { kind: 'lesson-page', ...base(withPage.lesson), href: withPage.content.lessonPageHref, title: null };
  }
  return null;
}
