import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CourseProvider } from '@/contexts/CourseContext';
import { PracticePageContent } from './PracticePageContent';
import { parseSubjectSlug, parseUnitSlug, getFullUnitName, getSubjectDisplayName, getUnitDetails, getSubjectSlug, getUnitSlug } from '@/lib/practiceSlugs';

interface PracticePageProps {
  params: Promise<{
    subject: string;
    unit: string;
  }>;
}

// Generate static params for all subject/unit combinations for better SEO
export async function generateStaticParams() {
  const params = [];
  
  // Generate for both macro and micro, units 1-6
  for (const subject of ['macro', 'micro'] as const) {
    const subjectSlug = getSubjectSlug(subject);
    for (let unit = 1; unit <= 6; unit++) {
      params.push({
        subject: subjectSlug,
        unit: getUnitSlug(unit, subject), // Include subject to get topic name in slug
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
      title: 'Practice Questions | AP Dojo',
      description: 'Practice AP Economics multiple-choice questions',
    };
  }
  
  const unitDetails = getUnitDetails(subject, unitNumber);
  const subjectName = getSubjectDisplayName(subject);
  const unitName = unitDetails 
    ? `Unit ${unitNumber}: ${unitDetails.title}`
    : `Unit ${unitNumber}`;
  
  return {
    title: `${unitName} Practice Questions | ${subjectName} | AP Dojo`,
    description: unitDetails 
      ? `Practice ${subjectName} multiple-choice questions for ${unitName}. ${unitDetails.description}`
      : `Practice ${subjectName} multiple-choice questions for ${unitName}`,
  };
}

export default async function PracticePage({ params }: PracticePageProps) {
  const { subject: subjectSlug, unit: unitSlug } = await params;
  
  const subject = parseSubjectSlug(subjectSlug);
  const unitNumber = parseUnitSlug(unitSlug);
  
  // If invalid subject or unit, show 404
  if (!subject || !unitNumber) {
    notFound();
  }
  
  return (
    <CourseProvider initialSubject={subject}>
      <PracticePageContent subject={subject} unitNumber={unitNumber} />
    </CourseProvider>
  );
}
