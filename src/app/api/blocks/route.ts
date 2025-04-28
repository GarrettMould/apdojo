import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase'; // Assuming db is exported from here
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export async function POST(request: Request) {
  console.warn("--- SECURITY WARNING --- This endpoint currently accepts userId from the request body for testing. DO NOT use this in production without proper server-side authentication! ---");

  try {
    const body = await request.json();
    // --- Test Only: Get userId from body --- 
    const { content, type = 'note', title, userId } = body; 

    // --- Validation --- 
    if (!userId) {
      console.error("Missing userId in request body (required for testing)");
      return NextResponse.json({ success: false, error: 'Test Error: userId is required in the request body' }, { status: 400 });
    }
    if (!content) {
      return NextResponse.json({ success: false, error: 'Content is required' }, { status: 400 });
    }
    // --- End Validation --- 

    // Generate a title from content if not provided
    const blockTitle = title || content.substring(0, 50) + (content.length > 50 ? '...' : '');

    // Path to the user's specific blocks subcollection
    const blocksCollectionRef = collection(db, 'users', userId, 'blocks');

    const newBlockData = {
      userId: userId, // Use the userId from the request body
      content: content,
      type: type,
      title: blockTitle,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    // Add the new document to Firestore
    const docRef = await addDoc(blocksCollectionRef, newBlockData);

    console.log(`Block created for user ${userId} with ID: ${docRef.id}`);

    // Return the newly created block data (including the ID)
    // Note: Returning serverTimestamp fields might initially be null until processed by Firestore
    return NextResponse.json({ success: true, block: { id: docRef.id, ...newBlockData } }, { status: 201 });

  } catch (error) {
    console.error('Error creating block:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
    // Check for potential JSON parsing errors
    if (error instanceof SyntaxError && 'body' in error) {
        return NextResponse.json({ success: false, error: 'Invalid JSON format in request body' }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}

// TODO: Add GET handler later to fetch all blocks for the board display 