import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { generateGradingPrompt } from '@/lib/grading-logic';

export const maxDuration = 30; // Set a 30-second timeout

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.error("GEMINI_API_KEY not found in environment variables.");
    return new Response(JSON.stringify({ message: "Server configuration error: Missing API key." }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    console.log('Grade FRQ text API called');
    const { textAnswer, partLabel, questionPrompt, partText, gradingCriteria, pointValue } = await req.json();
    const genAI = new GoogleGenerativeAI(apiKey);

    console.log('Received data:', {
      hasTextAnswer: !!textAnswer,
      textAnswerLength: textAnswer?.length,
      partLabel,
      hasPrompt: !!questionPrompt,
      hasPartText: !!partText,
      hasCriteria: !!gradingCriteria,
      pointValue,
    });

    if (!textAnswer || textAnswer.trim() === '') {
      return NextResponse.json(
        { error: 'No answer provided' },
        { status: 400 }
      );
    }

    console.log('Initializing Gemini model...');
    
    // Try standard model names first (avoids extra API call to list models)
    // This reduces quota usage by skipping the models list API call
    const fallbackModels = ['gemini-1.5-pro', 'gemini-1.5-flash', 'gemini-pro', 'gemini-1.0-pro'];
    let model;
    let found = false;
    
    for (const modelName of fallbackModels) {
      try {
        model = genAI.getGenerativeModel({ model: modelName });
        console.log(`Using model: ${modelName}`);
        found = true;
        break;
      } catch (e: any) {
        // If it's a 404, try next model. If it's a quota error, throw it.
        if (e.message?.includes('429') || e.message?.includes('quota') || e.message?.includes('rate limit')) {
          throw new Error('API quota exceeded. Please wait a moment and try again, or check your Google AI Studio quota limits.');
        }
        // For 404 or other errors, try next model
        continue;
      }
    }
    
    if (!found) {
      throw new Error('Could not initialize any Gemini model. Please check your API key and model availability.');
    }
    
    // Use the explicit grading criteria from the question, or fallback to generic criteria
    const criteriaToUse = gradingCriteria || `
Check that the answer correctly addresses the question
Verify that the explanation is clear and accurate
Ensure all required elements from the question are present
`;

    // Generate the grading prompt using the centralized grading logic
    const prompt = generateGradingPrompt({
      questionPrompt,
      partText,
      gradingCriteria: criteriaToUse,
      textAnswer,
      partLabel,
      pointValue: pointValue || 2
    });

    console.log('Calling Gemini API...');
    
    let result;
    try {
      result = await model.generateContent([prompt]);
      console.log('Gemini API call successful');
    } catch (apiError: any) {
      console.error('Gemini API call failed:', apiError);
      console.error('API Error details:', {
        message: apiError.message,
        status: apiError.status,
        statusText: apiError.statusText,
        response: apiError.response
      });
      
      // Check if it's a quota/rate limit error (429 status code or error message)
      const errorMessage = apiError.message || '';
      const statusCode = apiError.status || apiError.statusCode || '';
      
      if (
        statusCode === 429 || 
        errorMessage.includes('429') || 
        errorMessage.includes('quota') || 
        errorMessage.includes('rate limit') ||
        errorMessage.includes('RESOURCE_EXHAUSTED') ||
        errorMessage.includes('Quota exceeded')
      ) {
        throw new Error('API quota exceeded. Please wait a moment and try again, or check your Google AI Studio quota limits.');
      }
      
      throw apiError;
    }
    
    const responseText = result.response.text();
    console.log('Response received, length:', responseText.length);

    // Try to extract JSON from the response (it might have markdown code blocks)
    let jsonText = responseText.trim();
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/```\n?/g, '');
    }

    try {
      const feedback = JSON.parse(jsonText);
      const maxScore = pointValue !== undefined ? pointValue : 2;
      // Ensure score is an integer between 0 and maxScore
      if (typeof feedback.score !== 'number' || !Number.isInteger(feedback.score) || feedback.score < 0 || feedback.score > maxScore) {
        feedback.score = Math.max(0, Math.min(maxScore, Math.round(feedback.score || 0)));
      }
      return new Response(JSON.stringify(feedback), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (parseError) {
      // If JSON parsing fails, return a structured response
      return NextResponse.json({
        score: 0,
        feedback: 'Unable to parse AI response. Please try submitting again for detailed feedback.',
        raw_response: responseText
      });
    }
  } catch (error: any) {
    // Log the detailed error on the server for debugging
    console.error("Detailed Gemini API Error:", error);
    console.error("Error stack:", error.stack);
    console.error("Error name:", error.name);
    
    // Return a more user-friendly error to the client
    let userMessage = "An error occurred while grading the answer. Please try again.";
    const errorMsg = error.message || '';
    
    if (errorMsg.includes("API key not valid") || errorMsg.includes("API_KEY") || errorMsg.includes("API key")) {
      userMessage = "API configuration error. Please contact support.";
    } else if (
      errorMsg.includes("quota") || 
      errorMsg.includes("429") || 
      errorMsg.includes("rate limit") ||
      errorMsg.includes("RESOURCE_EXHAUSTED") ||
      errorMsg.includes("Quota exceeded")
    ) {
      userMessage = "API quota exceeded. Please wait a moment and try again, or check your Google AI Studio quota limits.";
    } else if (error.message) {
      userMessage = error.message;
    }
      
    return NextResponse.json(
      { 
        error: userMessage,
        message: userMessage 
      },
      { status: 500 }
    );
  }
}

