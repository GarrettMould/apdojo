import { NextResponse } from 'next/server';
import { db as adminDb } from '@/lib/firebase-admin'; 
import { FieldValue } from 'firebase-admin/firestore';

export async function POST(request: Request) {
  let userId: string | null = null; // Define userId in the outer scope for error handling
  try {
    // Ensure userId, unitId, xpAmount are correctly extracted from request
    const body = await request.json();
    userId = body.userId;
    const unitId = body.unitId;
    const xpAmount = body.xpAmount;

    // Validate input
    if (!userId || typeof userId !== 'string') {
      return NextResponse.json({ error: 'Missing or invalid userId' }, { status: 400 });
    }
    if (unitId === undefined || unitId === null || (typeof unitId !== 'string' && typeof unitId !== 'number')) { 
      return NextResponse.json({ error: 'Missing or invalid unitId' }, { status: 400 });
    }
    if (xpAmount === undefined || typeof xpAmount !== 'number') {
      return NextResponse.json({ error: 'Missing or invalid xpAmount' }, { status: 400 });
    }

    // Reference the specific unit document in the subcollection
    const unitDocId = String(unitId); 
    const unitXPRef = adminDb.collection('users').doc(userId)
                            .collection('unitXP').doc(unitDocId); 
    
    // Update the 'totalXP' field in the unit document, creating the document if it doesn't exist
    await unitXPRef.set({
      totalXP: FieldValue.increment(xpAmount), // Use 'totalXP' field name
      lastUpdated: FieldValue.serverTimestamp() // Also update a timestamp
    }, { merge: true }); // Use merge:true to avoid overwriting other fields if they exist

    console.log(`Successfully updated Unit ${unitId} XP for user ${userId} by ${xpAmount}`);
    return NextResponse.json({ success: true, message: `Unit ${unitId} XP updated successfully.` });

  } catch (error: any) {
    console.error('Error in /api/update-unit-xp:', error);
    
    let errorMessage = 'Failed to update unit XP.';
    let statusCode = 500;

    if (error.code === 5) { 
      errorMessage = `Parent user document not found for userId: ${userId || 'unknown'}`;
      statusCode = 404;
    } else if (error instanceof SyntaxError && error.message.includes('JSON')) {
      errorMessage = 'Invalid JSON payload received.';
      statusCode = 400;
    }

    return NextResponse.json({ 
        error: errorMessage, 
        details: error.message || 'Unknown error details' 
    }, { status: statusCode });
  }
} 