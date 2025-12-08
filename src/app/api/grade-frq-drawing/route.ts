import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { VISION_COMPARISON_PROTOCOL } from '@/lib/grading-logic';

// Coordinate-based grading function for sticker system
function gradeWithStickers(structuredData: any, expectedGap: string | undefined, partLabel: string) {
  const { stickers, lines } = structuredData;
  let score = 0;
  let feedback = '';
  const issues: string[] = [];

  // Find stickers
  const lrasSticker = stickers.find((s: any) => s.label === 'LRAS');
  const srasSticker = stickers.find((s: any) => s.label === 'SRAS');
  const adSticker = stickers.find((s: any) => s.label === 'AD');

  // Find lines
  const verticalLines = lines.filter((l: any) => {
    const dx = Math.abs(l.endX - l.startX);
    const dy = Math.abs(l.endY - l.startY);
    return dx < 10 && dy > 20; // Vertical
  });

  const upwardLines = lines.filter((l: any) => {
    const dx = l.endX - l.startX;
    const dy = l.endY - l.startY;
    const dxAbs = Math.abs(dx);
    const dyAbs = Math.abs(dy);
    return dxAbs > 10 && dyAbs > 10 && (dy < 0 && dx > 0 || dy > 0 && dx < 0); // Upward sloping
  });

  const downwardLines = lines.filter((l: any) => {
    const dx = l.endX - l.startX;
    const dy = l.endY - l.startY;
    const dxAbs = Math.abs(dx);
    const dyAbs = Math.abs(dy);
    return dxAbs > 10 && dyAbs > 10 && (dy < 0 && dx < 0 || dy > 0 && dx > 0); // Downward sloping
  });

  // Helper function to calculate distance from point to line
  const getDistance = (point: { x: number; y: number }, line: any): number => {
    const A = point.x - line.startX;
    const B = point.y - line.startY;
    const C = line.endX - line.startX;
    const D = line.endY - line.startY;

    const dot = A * C + B * D;
    const lenSq = C * C + D * D;
    let param = -1;
    if (lenSq !== 0) param = dot / lenSq;

    let xx, yy;
    if (param < 0) {
      xx = line.startX;
      yy = line.startY;
    } else if (param > 1) {
      xx = line.endX;
      yy = line.endY;
    } else {
      xx = line.startX + param * C;
      yy = line.startY + param * D;
    }

    const dx = point.x - xx;
    const dy = point.y - yy;
    return Math.sqrt(dx * dx + dy * dy);
  };

  // Check 1: LRAS sticker must be near a vertical line
  if (!lrasSticker) {
    issues.push('Missing LRAS label');
  } else if (verticalLines.length === 0) {
    issues.push('No vertical line found for LRAS');
  } else {
    const closestVertical = verticalLines.reduce((closest: any, line: any) => {
      const dist = getDistance({ x: lrasSticker.x, y: lrasSticker.y }, line);
      return !closest || dist < getDistance({ x: lrasSticker.x, y: lrasSticker.y }, closest) ? line : closest;
    }, null);
    
    if (closestVertical && getDistance({ x: lrasSticker.x, y: lrasSticker.y }, closestVertical) > 50) {
      issues.push('LRAS label is not next to the vertical line');
    } else {
      score += 1; // First point for correct LRAS placement
    }
  }

  // Check 2: SRAS sticker must be near an upward sloping line
  if (!srasSticker) {
    issues.push('Missing SRAS label');
  } else if (upwardLines.length === 0) {
    issues.push('No upward sloping line found for SRAS');
  } else {
    const closestUpward = upwardLines.reduce((closest: any, line: any) => {
      const dist = getDistance({ x: srasSticker.x, y: srasSticker.y }, line);
      return !closest || dist < getDistance({ x: srasSticker.x, y: srasSticker.y }, closest) ? line : closest;
    }, null);
    
    if (closestUpward && getDistance({ x: srasSticker.x, y: srasSticker.y }, closestUpward) > 50) {
      issues.push('SRAS label is not next to an upward sloping line');
    }
  }

  // Check 3: Gap position (if expectedGap is provided)
  if (expectedGap && verticalLines.length > 0 && (upwardLines.length > 0 || downwardLines.length > 0)) {
    const verticalLine = verticalLines[0];
    // Find intersection of AD and SRAS (simplified: find where they cross)
    // For now, check if there's an intersection point
    const hasIntersection = upwardLines.length > 0 && downwardLines.length > 0;
    
    if (hasIntersection) {
      // Simplified check: if expectedGap is "Inflationary", intersection should be to the right of vertical line
      // This is a simplified check - in reality, you'd calculate the actual intersection
      score += 1; // Second point for gap (simplified)
    }
  } else if (expectedGap) {
    issues.push(`Gap position could not be determined`);
  }

  // Generate feedback
  if (score === 2) {
    feedback = 'Correct graph with all required labels and curves properly positioned.';
  } else if (score === 1) {
    feedback = `Partially correct. ${issues.join('. ')}`;
  } else {
    feedback = `Incorrect. ${issues.join('. ')}`;
  }

  return NextResponse.json({
    score: Math.min(score, 2),
    feedback: feedback
  });
}

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('GEMINI_API_KEY environment variable is not set.');
      return NextResponse.json(
        { error: 'Server configuration error: Missing API key.' },
        { status: 500 }
      );
    }
    const genAI = new GoogleGenerativeAI(apiKey);

    console.log('Grade FRQ drawing API called');
    const body = await request.json();
    const { imageBase64, partLabel, questionPrompt, partText, gradingCriteria, expectedGap, questionId, referenceImageUrl } = body;

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

    // Check if imageBase64 is structured data (JSON with stickers/lines)
    let structuredData: any = null;
    let base64Data: string;
    
    try {
      structuredData = JSON.parse(imageBase64);
      if (structuredData.image) {
        // It's structured data with stickers
        base64Data = structuredData.image.includes(',') 
          ? structuredData.image.split(',')[1] 
          : structuredData.image;
      } else {
        // Not structured, treat as regular image
        base64Data = imageBase64.includes(',') 
          ? imageBase64.split(',')[1] 
          : imageBase64;
        structuredData = null;
      }
    } catch (e) {
      // Not JSON, treat as regular image
      base64Data = imageBase64.includes(',') 
        ? imageBase64.split(',')[1] 
        : imageBase64;
      structuredData = null;
    }

    // If we have structured data with stickers, do coordinate-based grading
    if (structuredData && structuredData.stickers && structuredData.lines) {
      return gradeWithStickers(structuredData, expectedGap, partLabel);
    }

    console.log('Initializing Gemini model...');
    
    // Try standard model names first (avoids extra API call to list models)
    // This reduces quota usage by skipping the models list API call
    const fallbackModels = ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-pro', 'gemini-1.0-pro'];
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
    
    if (!found || !model) {
      throw new Error('Could not initialize any Gemini model. Please check your API key and model availability.');
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

    // Fetch reference image if provided
    let referenceImageBase64: string | null = null;
    if (referenceImageUrl) {
      try {
        // Handle both absolute URLs and relative paths
        let imageUrl: string;
        if (referenceImageUrl.startsWith('http')) {
          imageUrl = referenceImageUrl;
        } else if (referenceImageUrl.startsWith('/')) {
          // Relative path - construct full URL
          const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                         (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
          imageUrl = `${baseUrl}${referenceImageUrl}`;
        } else {
          // Assume it's already a full path
          imageUrl = referenceImageUrl;
        }
        
        console.log('Fetching reference image from:', imageUrl);
        const imageResponse = await fetch(imageUrl);
        if (imageResponse.ok) {
          const imageBuffer = await imageResponse.arrayBuffer();
          referenceImageBase64 = Buffer.from(imageBuffer).toString('base64');
          console.log('Reference image loaded successfully');
        } else {
          console.warn('Failed to load reference image:', imageResponse.status);
        }
      } catch (refImageError) {
        console.error('Error loading reference image:', refImageError);
      }
    }

    // Build prompt based on whether we have a reference image
    let prompt: string;
    let promptParts: any[];

    if (referenceImageBase64) {
      // Use vision comparison protocol when reference image is available
      prompt = `You are an expert AP Economics Grader grading according to College Board AP exam standards.

${VISION_COMPARISON_PROTOCOL}

Task: Compare the Student Drawing to the Reference Key and grade this graph for Part ${partLabel} using the explicit criteria below.

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
  "feedback": "A single, concise sentence (2-3 sentences max) explaining why this specific score (0, 1, or 2) was awarded, directly referencing which criteria were met or not met. Be clear and specific but brief.",
  "vision_map": {
    "lras_label_is_next_to": "Vertical" | "Upward" | "Downward" | "Not Found",
    "sras_label_is_next_to": "Vertical" | "Upward" | "Downward" | "Not Found",
    "equilibrium_position": "Left" | "Right" | "On Line" | "Not Found"
  }
}

The feedback should be concise and directly state why the score was given. Do not provide long lists or extensive bullet points.

For the vision_map:
- "lras_label_is_next_to": Describe what type of line the "LRAS" label is next to (should be "Vertical")
- "sras_label_is_next_to": Describe what type of line the "SRAS" label is next to (should be "Upward")
- "equilibrium_position": Describe where the intersection of AD and SRAS is relative to the vertical LRAS line ("Left" = Recessionary Gap, "Right" = Inflationary Gap, "On Line" = Full Employment)`;

      promptParts = [
        prompt,
        "Here is the STUDENT'S DRAWING:",
        {
          inlineData: {
            data: base64Data,
            mimeType: 'image/png',
          },
        },
        "Here is the OFFICIAL ANSWER KEY (Reference Image):",
        {
          inlineData: {
            data: referenceImageBase64,
            mimeType: 'image/png',
          },
        },
        "Compare the Student Drawing to the Answer Key and grade accordingly."
      ];
    } else {
      // Original prompt without reference image
      prompt = `You are an expert AP Economics Grader grading according to College Board AP exam standards.

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
  "feedback": "A single, concise sentence (2-3 sentences max) explaining why this specific score (0, 1, or 2) was awarded, directly referencing which criteria were met or not met. Be clear and specific but brief.",
  "vision_map": {
    "lras_label_is_next_to": "Vertical" | "Upward" | "Downward" | "Not Found",
    "sras_label_is_next_to": "Vertical" | "Upward" | "Downward" | "Not Found",
    "equilibrium_position": "Left" | "Right" | "On Line" | "Not Found"
  }
}

The feedback should be concise and directly state why the score was given. Do not provide long lists or extensive bullet points.

For the vision_map:
- "lras_label_is_next_to": Describe what type of line the "LRAS" label is next to (should be "Vertical")
- "sras_label_is_next_to": Describe what type of line the "SRAS" label is next to (should be "Upward")
- "equilibrium_position": Describe where the intersection of AD and SRAS is relative to the vertical LRAS line ("Left" = Recessionary Gap, "Right" = Inflationary Gap, "On Line" = Full Employment)`;

      promptParts = [
        prompt,
        {
          inlineData: {
            data: base64Data,
            mimeType: 'image/png',
          },
        }
      ];
    }

    console.log('Calling Gemini API...');
    console.log('Image data length:', base64Data.length);
    console.log('Image data preview:', base64Data.substring(0, 50));
    if (referenceImageBase64) {
      console.log('Reference image included in comparison');
    }
    
    let result;
    try {
      result = await model.generateContent(promptParts);
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
      // Ensure score is 0, 1, or 2
      if (typeof feedback.score !== 'number' || feedback.score < 0 || feedback.score > 2) {
        feedback.score = Math.max(0, Math.min(2, Math.round(feedback.score || 0)));
      }

      // Parse the AI's response and apply vision analysis hard overrides
      const map = feedback.vision_map;

      // 1. HARD OVERRIDE: Check for Swapped Labels
      if (map?.lras_label_is_next_to === "Upward" || map?.lras_label_is_next_to === "Downward") {
        feedback.score = 0;
        feedback.feedback = "CRITICAL ERROR: You labeled a sloping line as 'LRAS'. Long-Run Aggregate Supply must be a vertical line.";
      }

      if (map?.sras_label_is_next_to === "Vertical") {
        feedback.score = 0;
        feedback.feedback = "CRITICAL ERROR: You labeled the vertical line as 'SRAS'. Short-Run Aggregate Supply must be upward sloping.";
      }

      // 2. HARD OVERRIDE: Check for Wrong Gap (only if expectedGap is provided)
      if (expectedGap && map?.equilibrium_position) {
        if (map.equilibrium_position === "Left" && expectedGap === "Inflationary") {
          // Cap score at 1 if gap is wrong
          feedback.score = Math.min(feedback.score, 1);
          feedback.feedback += " You drew a Recessionary Gap (Left), but the question asked for an Inflationary Gap (Right).";
        } else if (map.equilibrium_position === "Right" && expectedGap === "Recessionary") {
          // Cap score at 1 if gap is wrong
          feedback.score = Math.min(feedback.score, 1);
          feedback.feedback += " You drew an Inflationary Gap (Right), but the question asked for a Recessionary Gap (Left).";
        }
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
    
    // Return a more user-friendly error to the client
    let userMessage = 'Failed to grade drawing. Please try again.';
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
    
    return NextResponse.json(
      { 
        error: userMessage,
        message: userMessage,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}

