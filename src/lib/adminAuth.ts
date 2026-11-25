import { auth as adminAuth, db as adminDb } from '@/lib/firebase-admin';
import { isAdminUserData } from '@/lib/isAdmin';

/**
 * The uid of the admin making this request, from its `Authorization: Bearer <Firebase ID token>` header, or
 * null when the token is missing or invalid or the account isn't an admin.
 */
export async function getAdminUid(req: Request): Promise<string | null> {
  if (!adminAuth || !adminDb) return null;
  const header = req.headers.get('authorization') ?? '';
  const token = header.startsWith('Bearer ') ? header.slice('Bearer '.length).trim() : '';
  if (!token) return null;
  try {
    const { uid } = await adminAuth.verifyIdToken(token);
    const snap = await adminDb.collection('users').doc(uid).get();
    return isAdminUserData(snap.data()) ? uid : null;
  } catch {
    return null;
  }
}
