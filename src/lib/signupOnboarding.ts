import { doc, serverTimestamp, updateDoc, writeBatch } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { CourseSubject } from '@/lib/courseSubject';
import { unitXpDocumentId, unitsForCourseSubject } from '@/lib/courseSubject';

export const SIGNUP_RESOURCE_OPTIONS = [
  { id: 'unit-mcq', label: 'Unit MCQ tests', desc: 'Timed, exam-style practice by unit' },
  { id: 'frq', label: 'FRQ practice', desc: 'Free-response packs with feedback' },
  { id: 'cheat-sheets', label: 'Cheat sheets', desc: 'Unit summaries you can review fast' },
  { id: 'videos', label: 'Video lessons', desc: 'Walkthroughs for tough concepts' },
  { id: 'infinite-quiz', label: 'Infinite Quiz Mode', desc: 'Custom quizzes from your notes' },
  { id: 'full-exams', label: 'Full practice exams', desc: 'Full-length MCQ / FRQ simulations' },
  { id: 'tutoring', label: '1-on-1 tutoring', desc: 'Book live help when you get stuck' },
] as const;

export type SignupResourceId = (typeof SIGNUP_RESOURCE_OPTIONS)[number]['id'];

export type SignupOnboardingData = {
  subjects: CourseSubject[];
  targetScores: Partial<Record<CourseSubject, number>>;
  resources: SignupResourceId[];
};

/** Persist course selection, goals, and resource prefs after account creation. */
export async function persistSignupOnboarding(
  userId: string,
  data: SignupOnboardingData,
): Promise<void> {
  const batch = writeBatch(db);
  const userDocRef = doc(db, 'users', userId);
  const primarySubject = data.subjects[0];

  batch.update(userDocRef, {
    selectedSubjects: data.subjects,
    selectedSubject: primarySubject,
    targetApScores: data.targetScores,
    preferredResources: data.resources,
    hasCompletedSubjectSelection: true,
    hasCompletedInitialUnitSelection: true,
  });

  const initialBaseXP = 25;
  data.subjects.forEach((subject) => {
    unitsForCourseSubject(subject).forEach((unit) => {
      const unitXPRef = doc(db, 'users', userId, 'unitXP', unitXpDocumentId(subject, unit.number));
      batch.set(unitXPRef, {
        subject,
        unit: unit.number,
        totalXP: initialBaseXP,
        lastUpdated: serverTimestamp(),
      });
    });
  });

  await batch.commit();
}

/** Add a course to the user's enrolled list and initialize unit XP docs. */
export async function addUserSelectedSubject(
  userId: string,
  subject: CourseSubject,
  existingSubjects: CourseSubject[],
): Promise<CourseSubject[]> {
  if (existingSubjects.includes(subject)) return existingSubjects;

  const updated = [...existingSubjects, subject];
  const batch = writeBatch(db);
  const userDocRef = doc(db, 'users', userId);

  batch.update(userDocRef, { selectedSubjects: updated });

  const initialBaseXP = 25;
  unitsForCourseSubject(subject).forEach((unit) => {
    const unitXPRef = doc(db, 'users', userId, 'unitXP', unitXpDocumentId(subject, unit.number));
    batch.set(unitXPRef, {
      subject,
      unit: unit.number,
      totalXP: initialBaseXP,
      lastUpdated: serverTimestamp(),
    });
  });

  await batch.commit();
  return updated;
}

/** Remove a course from the user's enrolled list. Requires at least one course remain. */
export async function removeUserSelectedSubject(
  userId: string,
  subject: CourseSubject,
  existingSubjects: CourseSubject[],
  currentSelectedSubject?: CourseSubject,
): Promise<{ updatedSubjects: CourseSubject[]; nextSelectedSubject?: CourseSubject }> {
  if (!existingSubjects.includes(subject)) {
    return { updatedSubjects: existingSubjects };
  }
  if (existingSubjects.length <= 1) {
    throw new Error('Cannot remove the last enrolled course');
  }

  const updated = existingSubjects.filter((s) => s !== subject);
  const userDocRef = doc(db, 'users', userId);
  const payload: {
    selectedSubjects: CourseSubject[];
    selectedSubject?: CourseSubject;
  } = { selectedSubjects: updated };

  let nextSelectedSubject: CourseSubject | undefined;
  if (currentSelectedSubject === subject) {
    nextSelectedSubject = updated[0];
    payload.selectedSubject = nextSelectedSubject;
  }

  await updateDoc(userDocRef, payload);

  return { updatedSubjects: updated, nextSelectedSubject };
}
