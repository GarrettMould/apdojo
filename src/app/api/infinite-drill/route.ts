import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Question } from '@/data/questionBanks/types';

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Server configuration error: Missing Gemini API key.' },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    let body;
    try {
      body = await request.json();
      console.log('Request body parsed successfully');
      console.log('Has imageBase64:', !!body?.imageBase64);
      console.log('Has textInput:', !!body?.textInput);
      console.log('Text input length:', body?.textInput?.length || 0);
    } catch (parseError) {
      console.error('Error parsing request body:', parseError);
      console.error('Parse error details:', {
        message: parseError instanceof Error ? parseError.message : 'Unknown error',
        stack: parseError instanceof Error ? parseError.stack : undefined
      });
      return NextResponse.json(
        { error: 'Invalid request format. Please check your input.' },
        { status: 400 }
      );
    }

    const { imageBase64, textInput } = body || {};

    // Validate that at least one input is provided
    if (!imageBase64 && (!textInput || !textInput.trim())) {
      console.error('Validation failed: No input provided');
      console.error('imageBase64:', !!imageBase64);
      console.error('textInput:', textInput);
      return NextResponse.json(
        { error: 'Either image or text input is required' },
        { status: 400 }
      );
    }

    // Prepare the prompt
    const prompt = `You are an expert AP Economics teacher. Your task is to:

1. ANALYZE the uploaded question (image, PDF, or text) and identify the EXACT AP Economics concept being tested (e.g., "Monopsony Labor Market", "Calculating CPI", "Perfect Competition Long-Run Adjustment", "Price Ceiling Deadweight Loss").

2. GENERATE 5 NEW, ORIGINAL multiple-choice questions that test the SAME concept.

CRITICAL CONSTRAINTS:
- Do NOT reproduce the uploaded question
- Change the numbers, industry, scenario, and context
- Keep the difficulty level the same
- Each question must be original and different from the uploaded one
- Questions should follow AP Economics exam format
- Each question should have exactly 4 options (A, B, C, D)
- Include a clear explanation for each question

You MUST return a valid JSON object with this exact structure:
{
  "conceptDetected": "The exact AP Economics concept name",
  "questions": [
    {
      "id": 1,
      "question": "The question text here",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": "A",
      "explanation": "Why this answer is correct"
    },
    {
      "id": 2,
      "question": "Another question text",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": "B",
      "explanation": "Why this answer is correct"
    },
    {
      "id": 3,
      "question": "Third question text",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": "C",
      "explanation": "Why this answer is correct"
    },
    {
      "id": 4,
      "question": "Fourth question text",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": "D",
      "explanation": "Why this answer is correct"
    },
    {
      "id": 5,
      "question": "Fifth question text",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": "A",
      "explanation": "Why this answer is correct"
    }
  ]
}

Return ONLY the JSON object, no markdown, no code blocks, no additional text.`;

    // Build prompt parts for Gemini
    const promptParts: any[] = [prompt];

    // Add image if provided
    if (imageBase64) {
      // Remove data URL prefix if present
      const base64Data = imageBase64.includes(',') 
        ? imageBase64.split(',')[1] 
        : imageBase64;

      // Determine MIME type from the data URL
      const mimeType = imageBase64.startsWith('data:') 
        ? imageBase64.split(';')[0].split(':')[1]
        : 'image/jpeg';

      // Add image to prompt parts for Gemini
      promptParts.push({
        inlineData: {
          data: base64Data,
          mimeType: mimeType === 'application/pdf' ? 'image/png' : mimeType, // PDFs should already be converted
        },
      });
    }

    // Add text input if provided
    if (textInput && textInput.trim()) {
      promptParts.push(`Here is the question text:\n\n${textInput}`);
    }

    console.log('Calling Gemini API...');
    console.log('Input type:', imageBase64 ? 'image' : 'text');
    
    // Initialize model - try multiple models for reliability
    const modelNames = ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-pro', 'gemini-1.0-pro'];
    let model;
    let found = false;
    
    for (const modelName of modelNames) {
      try {
        model = genAI.getGenerativeModel({ 
          model: modelName,
          generationConfig: {
            responseMimeType: 'application/json',
            temperature: 0.7,
          }
        });
        console.log(`Using model: ${modelName}`);
        found = true;
        break;
      } catch (e: any) {
        // If it's a quota error, throw it
        if (e.message?.includes('429') || e.message?.includes('quota') || e.message?.includes('rate limit')) {
          throw new Error('API quota exceeded. Please wait a moment and try again, or check your Google AI Studio quota limits.');
        }
        // For 404 or other errors, try next model
        continue;
      }
    }
    
    if (!found || !model) {
      throw new Error('Could not initialize any Gemini model. Please check your API key and model availability.');
    }

    let result;
    try {
      console.log('Calling Gemini generateContent...');
      console.log('Prompt parts count:', promptParts.length);
      result = await model.generateContent(promptParts);
      console.log('Gemini API call successful');
      console.log('Response received');
    } catch (geminiError: any) {
      console.error('Gemini API error:', geminiError);
      console.error('Error name:', geminiError?.name);
      console.error('Error message:', geminiError?.message);
      console.error('Error status:', geminiError?.status);
      console.error('Error code:', geminiError?.code);
      console.error('Error stack:', geminiError?.stack);
      console.error('Full error object:', JSON.stringify(geminiError, Object.getOwnPropertyNames(geminiError)));
      
      // Handle specific Gemini errors
      const errorMsg = geminiError.message || '';
      if (errorMsg.includes('429') || errorMsg.includes('quota') || errorMsg.includes('rate limit') || errorMsg.includes('RESOURCE_EXHAUSTED')) {
        console.error('Quota/rate limit error detected');
        return NextResponse.json(
          { error: 'API quota exceeded. Please wait a moment and try again, or check your Google AI Studio quota limits.' },
          { status: 429 }
        );
      }
      
      if (errorMsg.includes('API key') || errorMsg.includes('API_KEY')) {
        console.error('API key error detected');
        return NextResponse.json(
          { error: 'Invalid API key. Please check server configuration.' },
          { status: 500 }
        );
      }
      
      // Re-throw to be caught by outer catch
      throw geminiError;
    }

    const responseText = result.response.text();
    console.log('Response text length:', responseText?.length || 0);
    console.log('Response text preview:', responseText?.substring(0, 200) || 'No response');
    
    if (!responseText) {
      console.error('No response text from Gemini');
      throw new Error('No response from Gemini');
    }

    // Parse JSON response
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(responseText);
      console.log('JSON parsed successfully');
      console.log('Concept detected:', parsedResponse.conceptDetected);
      console.log('Questions count:', parsedResponse.questions?.length || 0);
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      console.error('Response text that failed to parse:', responseText.substring(0, 500));
      
      // Try to extract JSON from markdown if present
      let jsonText = responseText.trim();
      if (jsonText.startsWith('```json')) {
        jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
        console.log('Extracted JSON from markdown code block');
      } else if (jsonText.startsWith('```')) {
        jsonText = jsonText.replace(/```\n?/g, '');
        console.log('Extracted JSON from code block');
      }
      
      try {
        parsedResponse = JSON.parse(jsonText);
        console.log('JSON parsed after markdown extraction');
      } catch (secondParseError) {
        console.error('Second parse attempt failed:', secondParseError);
        console.error('Cleaned JSON text:', jsonText.substring(0, 500));
        throw new Error('Failed to parse JSON response from Gemini');
      }
    }

    // Validate and format the response
    if (!parsedResponse.conceptDetected || !parsedResponse.questions || !Array.isArray(parsedResponse.questions)) {
      console.error('Invalid response format from Gemini');
      console.error('Parsed response:', JSON.stringify(parsedResponse, null, 2));
      console.error('Has conceptDetected:', !!parsedResponse.conceptDetected);
      console.error('Has questions:', !!parsedResponse.questions);
      console.error('Questions is array:', Array.isArray(parsedResponse.questions));
      throw new Error('Invalid response format from Gemini');
    }

    // Convert to our Question format
    const questions: Question[] = parsedResponse.questions.map((q: any, index: number) => ({
      id: Date.now() + index, // Generate unique IDs
      unit: 0, // Will be set by user or default
      subject: 'ap_macroeconomics' as const, // Default, can be updated
      unitName: 'Infinite Practice',
      question: q.question || '',
      image: null,
      options: q.options || [],
      correctAnswer: q.correctAnswer || 'A',
      explanation: q.explanation || '',
      lessonIDS: [],
    }));

    return NextResponse.json({
      conceptDetected: parsedResponse.conceptDetected,
      questions: questions,
    });

  } catch (error: any) {
    console.error('========== ERROR IN INFINITE-DRILL API ==========');
    console.error('Error type:', error?.constructor?.name || typeof error);
    console.error('Error message:', error?.message);
    console.error('Error name:', error?.name);
    console.error('Error status:', error?.status);
    console.error('Error code:', error?.code);
    console.error('Error stack:', error?.stack);
    console.error('Full error:', JSON.stringify(error, Object.getOwnPropertyNames(error)));
    console.error('==================================================');
    
    // Always return JSON, never HTML
    const errorMessage = error?.message || 'Unknown error occurred';
    const errorStatus = error?.status || 500;
    
    // Handle Gemini API errors
    const errorMsg = errorMessage || '';
    if (errorStatus === 429 || errorMsg.includes('quota') || errorMsg.includes('rate limit') || errorMsg.includes('RESOURCE_EXHAUSTED')) {
      return NextResponse.json(
        { error: 'API quota exceeded. Please wait a moment and try again, or check your Google AI Studio quota limits.' },
        { status: 429 }
      );
    }

    if (errorStatus === 401 || errorMsg.includes('API key') || errorMsg.includes('API_KEY')) {
      return NextResponse.json(
        { error: 'Invalid API key. Please check server configuration.' },
        { status: 500 }
      );
    }

    // Generic error response - always JSON
    return NextResponse.json(
      { 
        error: errorMessage || 'Failed to generate practice questions. Please try again.',
        details: process.env.NODE_ENV === 'development' ? error?.stack : undefined
      },
      { status: errorStatus || 500 }
    );
  }
}

