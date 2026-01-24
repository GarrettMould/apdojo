import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';
import { generateGradingPrompt } from '@/lib/grading-logic';

export const maxDuration = 30; // Set a 30-second timeout
export const runtime = 'nodejs'; // Ensure Node.js runtime for Vercel

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
  
  // 3. Initialize model - start with gemini-pro (most stable)
  // Note: getGenerativeModel doesn't throw errors until you use it, so we'll handle errors during API calls
  console.log('Initializing Gemini model...');
  // Updated to use the model confirmed to exist in your account
// 'gemini-flash-latest' automatically points to the most stable, high-quota version
let model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });
  console.log('Using model: gemini-2.0-flash');

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
    

const modelNames = ['gemini-flash-latest', 'gemini-2.0-flash-lite-preview-02-05', 'gemini-2.0-flash-exp'];
    let result;
    let responseText;
    let success = false;
    
    for (const modelName of modelNames) {
      try {
        const currentModel = genAI.getGenerativeModel({ model: modelName });
        console.log(`Trying model: ${modelName}`);
        result = await currentModel.generateContent(prompt);
        responseText = result.response.text();
        console.log(`Success with model ${modelName}, response length:`, responseText.length);
        success = true;
        break;
      } catch (modelError: any) {
        const errorMsg = modelError.message || '';
        console.log(`Model ${modelName} failed:`, errorMsg.substring(0, 200));
        
        // If it's a quota error, throw it immediately
        if (errorMsg.includes('429') || errorMsg.includes('quota') || errorMsg.includes('rate limit') || errorMsg.includes('RESOURCE_EXHAUSTED')) {
          throw new Error('API quota exceeded. Please wait a moment and try again, or check your Google AI Studio quota limits.');
        }
        
        // If it's the last model, throw the error
        if (modelName === modelNames[modelNames.length - 1]) {
          throw modelError;
        }
        
        // Otherwise, try next model
        continue;
      }
    }
    
    if (!success || !responseText) {
      throw new Error('All Gemini models failed. Please check your API key and model availability.');
    }

    let jsonText = responseText.trim();
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/```\n?/g, '');
    }

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
      });
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

