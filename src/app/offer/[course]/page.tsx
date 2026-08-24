import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CourseOfferPage } from '@/components/CourseOfferPage';
import {
  getOfferPageConfig,
  isOfferCourseSlug,
  type OfferCourseSlug,
} from '@/data/offerPages';

type PageProps = {
  params: Promise<{ course: string }>;
};

export function generateStaticParams(): { course: OfferCourseSlug }[] {
  return [
    { course: 'macro' },
    { course: 'micro' },
    { course: 'gov' },
    { course: 'stats' },
    { course: 'bundle' },
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { course } = await params;
  if (!isOfferCourseSlug(course)) {
    return { title: 'Course Offer | AP Dojo' };
  }
  const config = getOfferPageConfig(course);
  return {
    title: `${config.courseLabel} Season Pass | AP Dojo`,
    description: config.supporting,
  };
}

export default async function OfferCourseRoute({ params }: PageProps) {
  const { course } = await params;
  if (!isOfferCourseSlug(course)) notFound();
  return <CourseOfferPage course={course} />;
}
