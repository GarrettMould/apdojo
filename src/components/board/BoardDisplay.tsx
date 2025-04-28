'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link'; // <-- Import Link
import { Loader2 } from 'lucide-react'; // For loading indicator

// Define a basic type for a block (adjust as needed based on your Firestore schema)
interface Block {
  id: string;
  content: string;
  title?: string;
  type?: string; // Added type
  userId?: string; // Added userId
  createdAt?: any; // Added timestamp (optional on client)
  updatedAt?: any; // Added timestamp (optional on client)
  imageUrl?: string; // Added imageUrl
}

interface BoardDisplayProps {
  initialBlocks?: Block[]; // Allow passing initial blocks, e.g., from SSR
}

const BoardDisplay: React.FC<BoardDisplayProps> = ({ initialBlocks = [] }) => {
  const [blocks, setBlocks] = useState<Block[]>(initialBlocks);
  const [isPasting, setIsPasting] = useState(false); // Loading state for paste
  const [pasteError, setPasteError] = useState<string | null>(null); // Error state for paste

  // --- Load blocks from localStorage on mount (Temporary) --- 
  useEffect(() => {
    try {
      const storedBlocksRaw = localStorage.getItem('tempBoardBlocks');
      if (storedBlocksRaw) {
        const storedBlocks = JSON.parse(storedBlocksRaw);
        if (Array.isArray(storedBlocks)) {
           // Combine with any initialBlocks passed via props, avoiding duplicates
           setBlocks(prevBlocks => {
              const existingIds = new Set(prevBlocks.map(b => b.id));
              const uniqueStoredBlocks = storedBlocks.filter(b => !existingIds.has(b.id));
              return [...prevBlocks, ...uniqueStoredBlocks];
           });
           console.log('Loaded blocks from localStorage:', storedBlocks.length);
        } else {
           console.warn('localStorage tempBoardBlocks was not an array, ignoring.');
        }
      }
    } catch (error) {
      console.error("Error loading blocks from localStorage:", error);
      // Optional: Clear corrupted data
      // localStorage.removeItem('tempBoardBlocks');
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  // TODO: Add useEffect to fetch REAL blocks if not provided initially
  // TODO: Implement infinite scroll or pagination

  const handlePaste = async (event: React.ClipboardEvent) => {
    event.preventDefault();
    const pastedText = event.clipboardData.getData('text/plain');
    if (!pastedText || isPasting) return; // Prevent multiple pastes

    console.log('Pasted:', pastedText);
    setIsPasting(true);
    setPasteError(null);

    // --- TEST ONLY: Hardcoded User ID --- 
    const testUserId = "IJBro6NRG8VbqAI5kuDVGQNdiXk2";
    console.warn(`--- DEVELOPMENT MODE --- Sending hardcoded userId: ${testUserId} on paste.`);
    // -----------------------------------

    try {
      const response = await fetch('/api/blocks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Send hardcoded userId along with content
        body: JSON.stringify({ 
            content: pastedText,
            userId: testUserId, // Hardcoded for testing
            type: 'pasted_note' // Optional: assign a type
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to create block');
      }
      
      // Add the new block returned from the API (with real ID) to the state
      const newBlock = result.block as Block;
      setBlocks((prevBlocks) => [...prevBlocks, newBlock]); 

    } catch (error) {
      console.error('Error pasting block:', error);
      const message = error instanceof Error ? error.message : 'An unknown error occurred during paste.';
      setPasteError(message);
      // Handle error UI (e.g., show a toast notification)
    } finally {
       setIsPasting(false); 
    }
  };

  // Function to add a new placeholder block (keeps manual adding for testing)
  const handleAddBlockManually = () => {
    // This still uses temporary IDs, as it doesn't call the API
    const tempId = `manual-${Math.random().toString(36).substring(7)}`;
    const newBlock: Block = {
      id: tempId,
      content: 'New block content...', // Default content
      title: `New Block ${tempId.split('-')[1]}` // Default title
    };
    setBlocks((prevBlocks) => [...prevBlocks, newBlock]);
  };

  return (
    <div
      className="bg-gray-100 p-4 rounded min-h-[400px] border border-dashed border-gray-400 relative" // Added relative positioning
      onPaste={handlePaste} // Attach paste handler here
      // Make the div focusable/interactive if needed
      // tabIndex={0} 
    >
      {/* Loading/Error Overlay */} 
      {isPasting && (
         <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-20">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
         </div>
      )}
      {pasteError && (
          <div className="absolute top-2 right-2 bg-red-100 border border-red-400 text-red-700 px-3 py-1 rounded text-xs z-30">
              Paste Error: {pasteError}
          </div>
      )}
      
      {/* Content */} 
      <div className={isPasting ? 'opacity-50' : ''}> {/* Optionally dim content while pasting */} 
          <h2 className="text-xl font-semibold mb-4">Blocks</h2>
          <button
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            onClick={handleAddBlockManually}
            disabled={isPasting} // Disable while pasting
          >
            Add Block Manually (Test)
          </button>
          <p className="text-sm text-gray-600 mb-4">Right-click or Ctrl+V/Cmd+V here to paste and create a new block.</p>
    
          {blocks.length === 0 ? (
            <p>No blocks yet. Paste some content or click "Add Block Manually".</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {blocks.map((block) => (
                <Link key={block.id} href={`/block/${block.id}?local=true`} className="block hover:scale-105 transition-transform duration-150">
                  {/* Update card rendering to handle images */}
                  <div className="bg-yellow-100 p-2 rounded shadow h-full cursor-pointer overflow-hidden flex flex-col justify-center items-center">
                    {block.imageUrl ? (
                      <>
                         {block.title && <p className="font-semibold text-xs mb-1 text-center truncate w-full px-1">{block.title}</p>}
                         <img 
                            src={block.imageUrl} 
                            alt={block.title || 'Board Image'} 
                            className="max-w-full max-h-32 object-contain rounded" // Adjusted max-h
                         />
                       </>
                    ) : (
                       // Fallback for text blocks
                       <p className="text-sm font-medium text-center p-2">{block.title || block.content?.substring(0, 30) || 'Block'}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
      </div>
    </div>
  );
};

export default BoardDisplay; 