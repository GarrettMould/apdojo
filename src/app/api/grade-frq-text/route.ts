import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

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
    const { textAnswer, partLabel, questionPrompt, partText, gradingCriteria } = await req.json();
    const genAI = new GoogleGenerativeAI(apiKey);

    console.log('Received data:', {
      hasTextAnswer: !!textAnswer,
      textAnswerLength: textAnswer?.length,
      partLabel,
      hasPrompt: !!questionPrompt,
      hasPartText: !!partText,
      hasCriteria: !!gradingCriteria
    });

    if (!textAnswer || textAnswer.trim() === '') {
      return NextResponse.json(
        { error: 'No answer provided' },
        { status: 400 }
      );
    }

    console.log('Initializing Gemini model...');
    
    // First, try to get available models from the API
    let model;
    try {
      // Try to fetch available models
      const modelsResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
      );
      
      if (modelsResponse.ok) {
        const modelsData = await modelsResponse.json();
        const availableModels = modelsData.models || [];
        
        // Filter for models that support generateContent and prioritize free-tier models
        const generateContentModels = availableModels
          .filter((m: any) => m.supportedGenerationMethods?.includes('generateContent'))
          .map((m: any) => ({
            name: m.name.replace('models/', ''),
            displayName: m.displayName,
            // Free tier models typically include: gemini-pro, gemini-1.5-flash, gemini-1.5-pro
            isFreeTier: !m.name.includes('2.5') && !m.name.includes('exp') && !m.name.includes('preview')
          }));
        
        console.log('Available models for generateContent:', generateContentModels.map((m: any) => m.name));
        
        // Prioritize free-tier models first
        const freeTierModels = generateContentModels.filter((m: any) => m.isFreeTier);
        const modelsToTry = freeTierModels.length > 0 ? freeTierModels : generateContentModels;
        
        // Prefer models in this order: gemini-1.5-flash, gemini-1.5-pro, gemini-pro
        const preferredOrder = ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-pro'];
        let modelToUse: string | null = null;
        
        for (const preferred of preferredOrder) {
          const found = modelsToTry.find((m: any) => m.name === preferred);
          if (found) {
            modelToUse = found.name;
            break;
          }
        }
        
        // If no preferred model found, use the first available
        if (!modelToUse && modelsToTry.length > 0) {
          modelToUse = modelsToTry[0].name;
        }
        
        if (modelToUse) {
          model = genAI.getGenerativeModel({ model: modelToUse });
          console.log(`Using model: ${modelToUse} (free-tier: ${modelsToTry.find((m: any) => m.name === modelToUse)?.isFreeTier || false})`);
        } else {
          throw new Error('No models available that support generateContent');
        }
      } else {
        throw new Error('Could not fetch available models');
      }
    } catch (listError: any) {
      console.error('Error fetching available models, trying fallback:', listError);
      // Fallback: try free-tier model names first
      const fallbackModels = ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-pro', 'gemini-1.0-pro'];
      let found = false;
      
      for (const modelName of fallbackModels) {
        try {
          model = genAI.getGenerativeModel({ model: modelName });
          console.log(`Using fallback model: ${modelName}`);
          found = true;
          break;
        } catch (e) {
          continue;
        }
      }
      
      if (!found || !model) {
        throw new Error(`Could not initialize any Gemini model. Please check your API key. Error: ${listError.message}`);
      }
    }

    if (!model) {
      return new Response(JSON.stringify({ message: "Could not initialize AI model." }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    // Use the explicit grading criteria from the question, or fallback to generic criteria
    const criteriaToUse = gradingCriteria || `
Check that the answer correctly addresses the question
Verify that the explanation is clear and accurate
Ensure all required elements from the question are present
`;

    const prompt = `
      You are an AP Macroeconomics grader. Analyze the student's text-based answer for a Free Response Question (FRQ).

Input: A text answer submitted by a student.

Task: Grade this answer for Part ${partLabel} using the explicit criteria below.

Grading Criteria:
${criteriaToUse}

Question Context: ${questionPrompt}
Part Instructions: ${partText}
Student Answer: ${textAnswer}

IMPORTANT GRADING RULES:
- Score 2 (Full Credit): The answer meets ALL requirements and is fully correct.
- Score 1 (Partial Credit): The answer is partially correct or demonstrates some understanding, but is incomplete. For example, if a question requires a specific answer AND an explanation, providing only the correct answer without the explanation earns 1 point.
- Score 0 (No Credit): The answer is incorrect, irrelevant, or does not meet the minimum criteria for partial credit.

The final score must be an integer: 0, 1, or 2. Do not use fractional scores.

Be generous with full credit - if the answer addresses what is asked for in the criteria, it should receive 2 points.

Output: Return ONLY a valid JSON object with this exact structure:
{
  "score": 0 or 1 or 2,
  "feedback": "A single, concise sentence (2-3 sentences max) explaining why this specific score (0, 1, or 2) was awarded, directly referencing which criteria were met or not met. Be clear and specific but brief."
}

The feedback should be concise and directly state why the score was given. Do not provide long lists or extensive bullet points.`;

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
      // Ensure score is 0, 1, or 2
      if (typeof feedback.score !== 'number' || !Number.isInteger(feedback.score) || feedback.score < 0 || feedback.score > 2) {
        feedback.score = Math.max(0, Math.min(2, Math.round(feedback.score || 0)));
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
    
    // Return a more user-friendly error to the client
    const userMessage = error.message.includes("API key not valid") 
      ? "Could not initialize any Gemini model. Please check your API key."
      : "An error occurred while grading the answer. Please check the server logs for details.";
      
    return new Response(JSON.stringify({ message: userMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

