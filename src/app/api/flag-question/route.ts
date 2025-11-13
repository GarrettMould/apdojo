import { NextRequest, NextResponse } from 'next/server';
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';

export async function POST(request: NextRequest) {
  try {
    const { questionId, feedbackType, subject, unit } = await request.json();
    
    // Path to the flagged questions file
    const dataDir = join(process.cwd(), 'data');
    const flaggedQuestionsFile = join(dataDir, 'flagged-questions.json');
    
    // Read existing flagged questions or create empty array
    let flaggedQuestions = [];
    if (existsSync(flaggedQuestionsFile)) {
      const fileContent = readFileSync(flaggedQuestionsFile, 'utf-8');
      flaggedQuestions = JSON.parse(fileContent);
    }
    
    // Check if question already flagged
    const existingFlagIndex = flaggedQuestions.findIndex((flag: any) => flag.questionId === questionId);
    
    if (existingFlagIndex !== -1) {
      // Update existing flag
      flaggedQuestions[existingFlagIndex] = {
        ...flaggedQuestions[existingFlagIndex],
        feedbackType,
        timestamp: new Date().toISOString(),
        lastUpdated: new Date().toISOString()
      };
    } else {
      // Add new flag
      flaggedQuestions.push({
        questionId,
        feedbackType,
        timestamp: new Date().toISOString(),
        subject: subject || 'macro',
        unit: unit || 'unknown',
        lastUpdated: new Date().toISOString()
      });
    }
    
    // Ensure data directory exists
    if (!existsSync(dataDir)) {
      const fs = require('fs');
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    // Write to file
    writeFileSync(flaggedQuestionsFile, JSON.stringify(flaggedQuestions, null, 2));
    
    return NextResponse.json({ 
      success: true, 
      message: 'Question flagged successfully',
      totalFlagged: flaggedQuestions.length
    });
    
  } catch (error) {
    console.error('Error flagging question:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to flag question' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const dataDir = join(process.cwd(), 'data');
    const flaggedQuestionsFile = join(dataDir, 'flagged-questions.json');
    
    if (!existsSync(flaggedQuestionsFile)) {
      return NextResponse.json({ flaggedQuestions: [] });
    }
    
    const fileContent = readFileSync(flaggedQuestionsFile, 'utf-8');
    const flaggedQuestions = JSON.parse(fileContent);
    
    return NextResponse.json({ flaggedQuestions });
    
  } catch (error) {
    console.error('Error reading flagged questions:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to read flagged questions' },
      { status: 500 }
    );
  }
}





