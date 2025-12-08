import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';
import { generateGradingPrompt } from '@/lib/grading-logic';

export const maxDuration = 30; // Set a 30-second timeout

// 1. Read API Key at the top level
const apiKey = process.env.GEMINI_API_KEY;
let genAI: GoogleGenerativeAI | null = null;
let model: any = null;

// 2. Initialize the Gemini client once
if (apiKey) {
  try {
    console.log("Initializing GoogleGenerativeAI client...");
    genAI = new GoogleGenerativeAI(apiKey);
   // Use Flash for text grading (it's fast and handles this logic easily)
// Update line 17
model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    console.log("GoogleGenerativeAI client initialized successfully with gemini-pro.");
  } catch (error) {
    console.error("Failed to initialize GoogleGenerativeAI client:", error);
  }
} else {
  console.error("CRITICAL: GEMINI_API_KEY environment variable is not set.");
}

export async function POST(req: NextRequest) {
  // 3. Check for initialization errors at the start of the request
  if (!genAI || !model) {
    console.error("Aborting request because Gemini client is not initialized.");
    return NextResponse.json({ message: "Server configuration error: AI service is not available." }, { status: 500 });
  }

  let body;
  try {
    // 4. Safely parse the request body
    body = await req.json();
    console.log('Successfully parsed request body.');
  } catch (error) {
    console.error("Error parsing request JSON:", error);
    return NextResponse.json({ message: "Bad Request: Could not parse request body." }, { status: 400 });
  }

  try {
    const { textAnswer, partLabel, questionPrompt, partText, gradingCriteria, pointValue } = body;

    console.log('Received data:', {
      hasTextAnswer: !!textAnswer,
      textAnswerLength: textAnswer?.length,
      partLabel,
      hasPrompt: !!questionPrompt,
      hasPartText: !!partText,
      hasCriteria: !!gradingCriteria,
      pointValue
    });

    if (!textAnswer || textAnswer.trim() === '') {
      return NextResponse.json(
        { error: 'No answer provided' },
        { status: 400 }
      );
    }

    const prompt = generateGradingPrompt({
      questionPrompt,
      partLabel,
      partText,
      textAnswer,
      gradingCriteria,
      pointValue
    });

    console.log('Calling Gemini API with generated prompt...');
    
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    console.log('Response received from Gemini, length:', responseText.length);

    let jsonText = responseText.trim();
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/```\n?/g, '');
    }

    const feedback = JSON.parse(jsonText);
    
    return NextResponse.json(feedback);

  } catch (error: any) {
    console.error("Error during FRQ grading process:", error);
    return NextResponse.json({ message: "An error occurred while grading the answer.", error: error.message }, { status: 500 });
  }
}

