import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

/**
 * API route to add a word to wordsToDefine.ts
 * Only works in development mode
 */
export async function POST(request: NextRequest) {
  // Only allow in development
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json(
      { error: 'This endpoint is only available in development mode' },
      { status: 403 }
    );
  }

  try {
    const { word } = await request.json();

    if (!word || typeof word !== 'string' || word.trim().length === 0) {
      return NextResponse.json(
        { error: 'Invalid word provided' },
        { status: 400 }
      );
    }

    const trimmedWord = word.trim();
    const filePath = path.join(process.cwd(), 'src/data/wordsToDefine.ts');

    // Read existing file or create new one
    let existingContent = '';
    let existingWords: string[] = [];

    if (existsSync(filePath)) {
      try {
        existingContent = await readFile(filePath, 'utf-8');
        // Extract existing words from the array
        const arrayMatch = existingContent.match(/export const wordsToDefine = \[(.*?)\];/s);
        if (arrayMatch) {
          const wordsString = arrayMatch[1];
          existingWords = wordsString
            .split(',')
            .map(w => w.trim().replace(/['"]/g, ''))
            .filter(w => w.length > 0);
        }
      } catch (error) {
        console.error('Error reading existing file:', error);
      }
    }

    // Check if word already exists (case-insensitive)
    const wordExists = existingWords.some(
      w => w.toLowerCase() === trimmedWord.toLowerCase()
    );

    if (wordExists) {
      return NextResponse.json(
        { message: 'Word already exists in list', word: trimmedWord },
        { status: 200 }
      );
    }

    // Add new word
    existingWords.push(trimmedWord);
    
    // Sort words alphabetically (case-insensitive)
    existingWords.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

    // Generate new file content
    const newContent = `// Words to define - Auto-generated list
// Add these to apMacroTerms.ts or apMicroTerms.ts manually

export const wordsToDefine = [
${existingWords.map(w => `  '${w}',`).join('\n')}
];
`;

    // Ensure directory exists
    const dir = path.dirname(filePath);
    if (!existsSync(dir)) {
      await mkdir(dir, { recursive: true });
    }

    // Write file
    await writeFile(filePath, newContent, 'utf-8');

    return NextResponse.json({
      success: true,
      word: trimmedWord,
      totalWords: existingWords.length,
    });
  } catch (error: any) {
    console.error('Error adding word to wordsToDefine.ts:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to add word' },
      { status: 500 }
    );
  }
}

