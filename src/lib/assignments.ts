import { db } from '@/lib/firebase';
import { collection, query, where, limit, getDocs } from 'firebase/firestore';

export interface PublicAssignmentTemplate {
  id: string;
  questionIds: (number | string)[];
  assignmentType: 'mcq' | 'graphGym' | 'dojoDrill';
  subject: 'ap_macroeconomics' | 'ap_microeconomics';
  totalQuestions: number;
  /** Optional display name for the assignment (shown on custom assignment cards) */
  assignmentName?: string;
  /** Optional display title (e.g. "Unit 2 Supply & Demand Quiz") */
  templateTitle?: string;
  /** Optional topic label (e.g. "Supply & Demand") */
  templateTopic?: string;
}

const TEMPLATE_LIMIT = 10;

/**
 * Fetches public assignment templates from assignmentLinks where isPublicTemplate === true.
 * Limit 10 for performance.
 */
export async function getPublicAssignmentTemplates(): Promise<PublicAssignmentTemplate[]> {
  const linksRef = collection(db, 'assignmentLinks');
  const q = query(
    linksRef,
    where('isPublicTemplate', '==', true),
    limit(TEMPLATE_LIMIT)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    const questionIds = Array.isArray(data.questionIds) ? data.questionIds : [];
    // Support both assignmentName and assignment_name (Firestore console may use either)
    const assignmentNameRaw = data.assignmentName ?? (data as Record<string, unknown>).assignment_name;
    const assignmentName = typeof assignmentNameRaw === 'string' && assignmentNameRaw.trim() !== '' ? assignmentNameRaw.trim() : undefined;
    return {
      id: doc.id,
      questionIds,
      assignmentType: (data.assignmentType as PublicAssignmentTemplate['assignmentType']) ?? 'mcq',
      subject: (data.subject as PublicAssignmentTemplate['subject']) ?? 'ap_macroeconomics',
      totalQuestions: typeof data.totalQuestions === 'number' ? data.totalQuestions : questionIds.length,
      assignmentName,
      templateTitle: typeof data.templateTitle === 'string' ? data.templateTitle : undefined,
      templateTopic: typeof data.templateTopic === 'string' ? data.templateTopic : undefined,
    };
  });
}
