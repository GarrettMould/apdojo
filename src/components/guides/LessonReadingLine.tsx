import { Fragment } from 'react';
import Link from 'next/link';
import { contentForLesson, lessonCourseKey } from '@/lib/lessonContent';
import { guideHref } from '@/data/teachingGuides';

const link = 'font-semibold text-blue-600 underline-offset-2 hover:underline';

/**
 * Under a unit hub's lesson heading: one quiet line of links to what there is to read for the lesson
 * (Garrett's guide, blog articles) and the full Macro lesson. Renders nothing when there's neither.
 */
export function LessonReadingLine({ subject, lessonId }: { subject: string; lessonId: string }) {
  const course = lessonCourseKey(subject);
  if (!course) return null;
  const { guide, articles, lessonPageHref } = contentForLesson(course, lessonId);
  const reads = [
    ...(guide ? [{ key: 'guide', href: guideHref(guide), label: 'Explained by Garrett' }] : []),
    ...articles.map((a) => ({ key: a.slug, href: a.href, label: a.title.split(':')[0] })),
  ];
  if (reads.length === 0 && !lessonPageHref) return null;

  return (
    <p className="text-sm leading-relaxed text-gray-600">
      {reads.length > 0 ? (
        <>
          <span className="text-gray-500">Read: </span>
          {reads.map((r, i) => (
            <Fragment key={r.key}>
              {i > 0 ? <span className="text-gray-300"> · </span> : null}
              <Link href={r.href} className={link}>
                {r.label}
              </Link>
            </Fragment>
          ))}
        </>
      ) : null}
      {lessonPageHref ? (
        <>
          {reads.length > 0 ? <span className="px-1.5 text-gray-300">·</span> : null}
          <Link href={lessonPageHref} className={link}>
            Full lesson →
          </Link>
        </>
      ) : null}
    </p>
  );
}
