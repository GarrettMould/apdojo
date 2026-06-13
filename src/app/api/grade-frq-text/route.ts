import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';
import { generateGradingPrompt } from '@/lib/grading-logic';

export const maxDuration = 30; // Set a 30-second timeout
export const runtime = 'nodejs'; // Ensure Node.js runtime for Vercel
const MODEL_NAME = 'gemini-flash-latest';
const MODEL_TIMEOUT_MS = 12000;
const MAX_ATTEMPTS = 2;

function extractJsonObject(raw: string): string {
  const text = raw.trim();
  if (!text) return text;

  let cleaned = text;
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.replace(/```json\n?/gi, '').replace(/```\n?/g, '');
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/```\n?/g, '');
  }
  cleaned = cleaned.trim();

  const firstBrace = cleaned.indexOf('{');
  const lastBrace = cleaned.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    return cleaned.slice(firstBrace, lastBrace + 1);
  }
  return cleaned;
}

async function withTimeout<T>(promise: Promise<T>, timeoutMs: number, context: string): Promise<T> {
  const timeoutPromise = new Promise<never>((_, reject) => {
    const timer = setTimeout(() => {
      clearTimeout(timer);
      reject(new Error(`${context} timed out after ${timeoutMs}ms`));
    }, timeoutMs);
  });
  return Promise.race([promise, timeoutPromise]);
}

export async function POST(req: NextRequest) {
  // 1. Check for API key
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("CRITICAL: GEMINI_API_KEY environment variable is not set.");
    console.error("Available env vars:", Object.keys(process.env).filter(k => k.includes('GEMINI') || k.includes('API')));
    return NextResponse.json({ 
      message: "Server configuration error: Missing API key.",
      debug: process.env.NODE_ENV === 'development' ? {
        hasKey: !!apiKey,
        keyLength: apiKey?.length || 0,
        envVars: Object.keys(process.env).filter(k => k.includes('GEMINI') || k.includes('API'))
      } : undefined
    }, { status: 500 });
  }
  
  // Log API key status (without exposing the key itself)
  console.log('API Key status:', {
    hasKey: true,
    keyLength: apiKey.length,
    keyPrefix: apiKey.substring(0, 10) + '...',
    environment: process.env.NODE_ENV
  });

  // 2. Initialize Gemini client
  const genAI = new GoogleGenerativeAI(apiKey);
  
  // 3. Initialize model
  const model = genAI.getGenerativeModel({
    model: MODEL_NAME,
    generationConfig: {
      responseMimeType: 'application/json',
      temperature: 0.2,
    },
  });
  console.log(`Using model: ${MODEL_NAME}`);

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
    let responseText = '';
    let lastError: any = null;

    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
      try {
        const result = await withTimeout(
          model.generateContent(prompt),
          MODEL_TIMEOUT_MS,
          `Gemini grading attempt ${attempt}`
        );
        responseText = result.response.text()?.trim() || '';
        if (!responseText) {
          throw new Error('Empty response from Gemini model');
        }
        console.log(`Gemini success on attempt ${attempt}, response length:`, responseText.length);
        break;
      } catch (attemptError: any) {
        lastError = attemptError;
        const msg = attemptError?.message || '';
        console.error(`Gemini attempt ${attempt} failed:`, msg.substring(0, 300));

        // Fail fast on quota issues
        if (
          msg.includes('429') ||
          msg.toLowerCase().includes('quota') ||
          msg.toLowerCase().includes('rate limit') ||
          msg.includes('RESOURCE_EXHAUSTED')
        ) {
          throw new Error('API quota exceeded. Please wait a moment and try again, or check your Google AI Studio quota limits.');
        }
      }
    }

    if (!responseText) {
      throw new Error(lastError?.message || 'Gemini request failed after retries');
    }

    const jsonText = extractJsonObject(responseText);

    let feedback;
    try {
      feedback = JSON.parse(jsonText);
    } catch (parseError: any) {
      console.error("Error parsing JSON response:", parseError);
      console.error("Raw response text:", jsonText);
      // Return a structured response even if JSON parsing fails
      return NextResponse.json({
        score: 0,
        feedback: 'Unable to parse AI response. Please try submitting again for detailed feedback.',
        raw_response: jsonText.substring(0, 500) // Include first 500 chars for debugging
      }, { status: 200 });
    }

    if (
      typeof feedback !== 'object' ||
      feedback === null ||
      typeof feedback.score !== 'number' ||
      typeof feedback.feedback !== 'string'
    ) {
      return NextResponse.json({
        score: Number.isFinite(feedback?.score) ? feedback.score : 0,
        feedback:
          typeof feedback?.feedback === 'string'
            ? feedback.feedback
            : 'Grading completed, but response format was incomplete. Please try again for full details.'
      }, { status: 200 });
    }
    
    return NextResponse.json(feedback);

  } catch (error: any) {
    console.error("Error during FRQ grading process:", error);
    console.error("Error details:", {
      message: error.message,
      stack: error.stack,
      name: error.name,
      cause: error.cause
    });
    
    // Return a more user-friendly error to the client
    let userMessage = 'Failed to grade answer. Please try again.';
    const errorMsg = error.message || '';
    
    if (errorMsg.includes('API key not valid') || errorMsg.includes('API_KEY') || errorMsg.includes('API key')) {
      userMessage = 'API configuration error. Please contact support.';
    } else if (
      errorMsg.includes('quota') || 
      errorMsg.includes('429') || 
      errorMsg.includes('rate limit') ||
      errorMsg.includes('RESOURCE_EXHAUSTED') ||
      errorMsg.includes('Quota exceeded')
    ) {
      userMessage = 'API quota exceeded. Please wait a moment and try again, or check your Google AI Studio quota limits.';
    } else if (error.message) {
      userMessage = error.message;
    }
    
    return NextResponse.json({ 
      message: userMessage, 
      error: userMessage,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
}

