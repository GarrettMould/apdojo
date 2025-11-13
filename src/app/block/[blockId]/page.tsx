import React from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc, Timestamp } from 'firebase/firestore'; // Import necessary functions

// Function to get user ID on the server (Replace with your actual server-side auth)
async function getServerSideUserId(): Promise<string | null> {
  // Example using cookies or server session - adapt to your setup
  // const session = await getServerSession(authOptions); // Example with NextAuth.js
  // return session?.user?.id ?? null;

  // --- TEST ONLY: Hardcoded User ID --- 
  const testUserId = "IJBro6NRG8VbqAI5kuDVGQNdiXk2"; // <-- Updated with your specific test user ID
  console.warn(`--- DEVELOPMENT MODE --- Using hardcoded userId: ${testUserId} for fetching block data.`);
  return testUserId;
}

// Define the structure of your Block data from Firestore
interface BlockData {
  id: string;
  userId: string;
  content: string;
  type: string;
  title: string;
  createdAt: Timestamp; // Use Firestore Timestamp
  updatedAt: Timestamp;
}

// Helper function to fetch a single block
async function getBlock(userId: string, blockId: string): Promise<BlockData | null> {
  if (!userId || !blockId) return null;
  try {
    const blockRef = doc(db, 'users', userId, 'blocks', blockId);
    const blockSnap = await getDoc(blockRef);

    if (blockSnap.exists()) {
      // Combine doc ID with data
      return { id: blockSnap.id, ...blockSnap.data() } as BlockData;
    } else {
      console.log(`Block not found: users/${userId}/blocks/${blockId}`);
      return null;
    }
  } catch (error) {
    console.error("Error fetching block:", error);
    return null;
  }
}

interface BlockDetailPageProps {
  params: {
    blockId: string;
  };
}

// Make the page component async to fetch data
const BlockDetailPage = async ({ params }: BlockDetailPageProps) => {
  const { blockId } = params;
  const userId = await getServerSideUserId(); // Get user ID on the server

  let blockData: BlockData | null = null;
  let errorMessage: string | null = null;

  if (userId) {
    blockData = await getBlock(userId, blockId);
    if (!blockData) {
      errorMessage = `Block with ID '${blockId}' not found or you don't have permission to view it.`;
    }
  } else {
     errorMessage = "Could not authenticate user.";
  }

  // TODO: Render BlockDetailView component with the fetched data or error

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
         {blockData ? blockData.title : 'Block Detail'}
      </h1>
      <p className="mb-2 text-sm text-gray-500">Block ID: {blockId}</p>

       {errorMessage && (
         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{errorMessage}</span>
         </div>
       )}

       {blockData && (
         <div className="mt-6 border border-gray-200 p-6 rounded min-h-[300px] bg-white shadow-sm">
           <h2 className="text-lg font-semibold mb-3">Content:</h2>
           {/* Render the actual content - might need formatting later */}
           <div className="prose max-w-none"> {/* Basic prose styling */}
             <pre className="whitespace-pre-wrap break-words">{blockData.content}</pre>
           </div>
           <p className="text-xs text-gray-400 mt-4">
             Created: {blockData.createdAt?.toDate().toLocaleString()}
           </p>
         </div>
       )}

       {!blockData && !errorMessage && (
          <div className="mt-6 text-center text-gray-500">Loading block data...</div>
       )}
    </div>
  );
};

export default BlockDetailPage; 