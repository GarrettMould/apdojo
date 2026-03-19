import { NextResponse } from 'next/server';
import { db as adminDb } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';

export async function POST(req: Request) {
  try {
    const { email, uid } = await req.json();

    if (!email || !uid) {
      return NextResponse.json({ error: 'Missing email or uid' }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase();
    const pendingRef = adminDb.collection('pendingSeasonPasses').doc(normalizedEmail);
    const pendingDoc = await pendingRef.get();

    if (!pendingDoc.exists) {
      // No pending pass — nothing to do
      return NextResponse.json({ applied: false });
    }

    const pending = pendingDoc.data()!;
    const { subjects, expirationDate } = pending as {
      subjects: string[];
      expirationDate: Record<string, string>;
    };

    const userRef = adminDb.collection('users').doc(uid);
    const userDoc = await userRef.get();
    const currentExpiration = userDoc.exists ? (userDoc.data()?.seasonPassExpiration || {}) : {};

    // Merge expiration dates (don't overwrite a later date if one already exists)
    const mergedExpiration = { ...currentExpiration };
    subjects.forEach(subject => {
      const existing = mergedExpiration[subject];
      const incoming = expirationDate[subject];
      if (!existing || new Date(incoming) > new Date(existing)) {
        mergedExpiration[subject] = incoming;
      }
    });

    await userRef.set({
      seasonPass: FieldValue.arrayUnion(...subjects),
      seasonPassExpiration: mergedExpiration,
    }, { merge: true });

    // Delete the pending record so it can't be applied twice
    await pendingRef.delete();

    console.log(`✅ Applied pending season pass (${subjects.join(', ')}) to user ${uid} (${email})`);
    return NextResponse.json({ applied: true, subjects });
  } catch (error: any) {
    console.error('Error applying pending season pass:', error);
    return NextResponse.json({ error: error.message || 'Failed to apply pending pass' }, { status: 500 });
  }
}
