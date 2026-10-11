import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CourseProvider } from '@/contexts/CourseContext';
import { PracticePageContent } from './PracticePageContent';
import {
  parseSubjectSlug,
  parseUnitSlug,
  getFullUnitName,
  getSubjectDisplayName,
  getUnitDetails,
  getSubjectSlug,
  getUnitSlug,
} from '@/lib/practiceSlugs';
import { isGovMcqPracticeUnitAvailable, isStatsMcqPracticeUnitAvailable } from '@/lib/courseSubject';

interface PracticePageProps {
  params: Promise<{
    subject: string;
    unit: string;
  }>;
}

// Generate static params for all subject/unit combinations for better SEO
export async function generateStaticParams() {
  const params = [];

  for (const subject of ['macro', 'micro'] as const) {
    const subjectSlug = getSubjectSlug(subject);
    for (let unit = 1; unit <= 6; unit++) {
      params.push({
        subject: subjectSlug,
        unit: getUnitSlug(unit, subject),
      });
    }
  }

  for (const subject of ['gov', 'stats'] as const) {
    const subjectSlug = getSubjectSlug(subject);
    for (let unit = 1; unit <= 5; unit++) {
      if (subject === 'gov' && !isGovMcqPracticeUnitAvailable(unit)) continue;
      if (subject === 'stats' && !isStatsMcqPracticeUnitAvailable(unit)) continue;
      params.push({
        subject: subjectSlug,
        unit: getUnitSlug(unit, subject),
      });
    }
  }

  return params;
}

export async function generateMetadata({ params }: PracticePageProps): Promise<Metadata> {
  const { subject: subjectSlug, unit: unitSlug } = await params;
  
  const subject = parseSubjectSlug(subjectSlug);
  const unitNumber = parseUnitSlug(unitSlug);
  
  if (!subject || !unitNumber) {
    return {
      title: 'MCQ Practice Questions | AP Dojo',
      description: 'Practice AP Economics multiple-choice questions',
    };
  }
  
  const unitDetails = getUnitDetails(subject, unitNumber);
  const subjectName = getSubjectDisplayName(subject);
  const unitName = unitDetails 
    ? `Unit ${unitNumber}: ${unitDetails.title}`
    : `Unit ${unitNumber}`;
  
  return {
    title: `${unitName} MCQ Practice Questions | ${subjectName} | AP Dojo`,
    description: unitDetails 
      ? `Practice ${subjectName} multiple-choice questions for ${unitName}. ${unitDetails.description}`
      : `Practice ${subjectName} multiple-choice questions for ${unitName}`,
  };
}

export default async function PracticePage({ params }: PracticePageProps) {
  const { subject: subjectSlug, unit: unitSlug } = await params;
  
  const subject = parseSubjectSlug(subjectSlug);
  const unitNumber = parseUnitSlug(unitSlug);

  if (!subject || !unitNumber) {
    notFound();
  }

  if (subject === 'gov' && !isGovMcqPracticeUnitAvailable(unitNumber)) {
    notFound();
  }

  if (subject === 'stats' && !isStatsMcqPracticeUnitAvailable(unitNumber)) {
    notFound();
  }

  return (
    <CourseProvider initialSubject={subject}>
      <PracticePageContent subject={subject} unitNumber={unitNumber} />
    </CourseProvider>
  );
}
