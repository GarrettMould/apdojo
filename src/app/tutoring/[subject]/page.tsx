import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SubjectTutoringPage } from '@/components/SubjectTutoringPage';
import { COURSE_SUBJECTS, type CourseSubject } from '@/lib/courseSubject';
import { getTutoringPageConfig, parseTutoringSubject } from '@/data/tutoringPages';

type PageProps = {
  params: Promise<{ subject: string }>;
};

export function generateStaticParams(): { subject: CourseSubject }[] {
  return COURSE_SUBJECTS.map((subject) => ({ subject }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { subject: raw } = await params;
  const subject = parseTutoringSubject(raw);
  if (!subject) {
    return { title: 'Tutoring | AP Dojo' };
  }
  const config = getTutoringPageConfig(subject);
  return {
    title: `${config.courseLabel} Tutoring | AP Dojo`,
    description: config.supporting,
  };
}

export default async function TutoringSubjectRoute({ params }: PageProps) {
  const { subject: raw } = await params;
  const subject = parseTutoringSubject(raw);
  if (!subject) notFound();
  return <SubjectTutoringPage subject={subject} />;
}
