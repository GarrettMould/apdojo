import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { generateGradingPrompt } from '@/lib/grading-logic';

export const maxDuration = 30; // Set a 30-second timeout

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  // Throws an error if the API key is not found in environment variables
  throw new Error("GEMINI_API_KEY not found in environment variables.");
}

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
    
    // Use gemini-1.5-pro for FRQ grading
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-002" });
    console.log('Using model: gemini-1.5-pro-002');
    
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
      
      // Check if it's a quota/rate limit error
      if (apiError.message?.includes('429') || apiError.message?.includes('quota') || apiError.message?.includes('rate limit')) {
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
    
    if (error.message?.includes("API key not valid") || error.message?.includes("API_KEY")) {
      userMessage = "API configuration error. Please contact support.";
    } else if (error.message?.includes("quota") || error.message?.includes("429") || error.message?.includes("rate limit")) {
      userMessage = "API quota exceeded. Please wait a moment and try again.";
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

