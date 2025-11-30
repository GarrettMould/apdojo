import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error('GEMINI_API_KEY environment variable is not set.');
}
const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(request: NextRequest) {
  try {
    console.log('Grade FRQ drawing API called');
    const body = await request.json();
    const { imageBase64, partLabel, questionPrompt, partText, gradingCriteria } = body;

    console.log('Received data:', {
      hasImage: !!imageBase64,
      imageLength: imageBase64?.length,
      partLabel,
      hasPrompt: !!questionPrompt,
      hasPartText: !!partText
    });

    if (!imageBase64) {
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      );
    }

    // Remove data URL prefix if present
    const base64Data = imageBase64.includes(',') 
      ? imageBase64.split(',')[1] 
      : imageBase64;

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
      throw new Error('Model initialization failed - no model available');
    }

    // Use the explicit grading criteria from the question, or fallback to generic criteria
    const criteriaToUse = gradingCriteria || `
Check that the graph is correctly labeled with appropriate axes
Verify that curves are drawn correctly according to economic principles
Ensure all required elements from the question are present
`;

    const prompt = `You are an expert AP Economics Grader grading according to College Board AP exam standards.

Input: An image of a hand-drawn graph submitted by a student.

Task: Grade this graph for Part ${partLabel} using the explicit criteria below.

Grading Criteria:
${criteriaToUse}

Question Context: ${questionPrompt}
Part Instructions: ${partText}

IMPORTANT GRADING RULES:
- Score 2 (Full Credit): Award 2 points if the graph meets ALL requirements stated in the "2 points" criteria. Do NOT deduct points for minor issues like imperfect line quality or slightly off positioning if all key criteria are satisfied.
- Score 1 (Partial Credit): Award 1 point only if the graph demonstrates some understanding but is clearly missing one or more key elements from the "2 points" criteria.
- Score 0 (No Credit): Award 0 points only if the graph does not meet the criteria or is completely incorrect.

Be generous with full credit - if the graph shows what is required in the "2 points" criteria, it should receive 2 points, not 1.

Output: Return ONLY a valid JSON object with this exact structure:
{
  "score": 0 or 1 or 2,
  "feedback": "A single, concise sentence (2-3 sentences max) explaining why this specific score (0, 1, or 2) was awarded, directly referencing which criteria were met or not met. Be clear and specific but brief."
}

The feedback should be concise and directly state why the score was given. Do not provide long lists or extensive bullet points.`;

    const image = {
      inlineData: {
        data: base64Data,
        mimeType: 'image/png',
      },
    };

    console.log('Calling Gemini API...');
    console.log('Image data length:', base64Data.length);
    console.log('Image data preview:', base64Data.substring(0, 50));
    
    let result;
    try {
      result = await model.generateContent([prompt, image]);
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
      if (typeof feedback.score !== 'number' || feedback.score < 0 || feedback.score > 2) {
        feedback.score = Math.max(0, Math.min(2, Math.round(feedback.score || 0)));
      }
      return NextResponse.json(feedback);
    } catch (parseError) {
      // If JSON parsing fails, return a structured response
      return NextResponse.json({
        score: 0,
        feedback: 'Unable to parse AI response. Please try submitting again for detailed feedback.',
        raw_response: responseText
      });
    }
  } catch (error: any) {
    console.error('Error grading FRQ drawing:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
      cause: error.cause
    });
    return NextResponse.json(
      { 
        error: 'Failed to grade drawing',
        message: error.message || 'Unknown error occurred',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}

