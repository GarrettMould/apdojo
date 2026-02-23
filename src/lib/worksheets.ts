import { db } from '@/lib/firebase';
import { collection, query, where, limit, getDocs } from 'firebase/firestore';

export interface Worksheet {
  id: string;
  slug: string;
  title: string;
  /** Base64-encoded MCQ IDs (e.g. from tutor print). */
  q?: string;
  /** Base64-encoded FRQ exam indices. */
  f?: string;
  /** Optional: direct PDF URL (e.g. Firebase Storage). When set, iframe shows this instead of print-preview. */
  pdfUrl?: string;
  createdAt?: unknown;
}

/**
 * Fetches a single published worksheet by slug from Firestore (collection `worksheets`).
 * Document should have: slug, title, and either (q and/or f) or pdfUrl.
 */
export async function getWorksheetBySlug(slug: string): Promise<Worksheet | null> {
  const ref = collection(db, 'worksheets');
  const q = query(ref, where('slug', '==', slug), limit(1));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  const doc = snapshot.docs[0];
  const data = doc.data();
  return {
    id: doc.id,
    slug: data.slug ?? slug,
    title: typeof data.title === 'string' ? data.title : 'Worksheet',
    q: typeof data.q === 'string' ? data.q : undefined,
    f: typeof data.f === 'string' ? data.f : undefined,
    pdfUrl: typeof data.pdfUrl === 'string' ? data.pdfUrl : undefined,
    createdAt: data.createdAt,
  };
}
