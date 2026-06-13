import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Setup the client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

type UnitDrillSubject =
  | 'ap_macroeconomics'
  | 'ap_microeconomics'
  | 'ap_us_government'
  | 'ap_statistics';

const VALID_UNIT_DRILL_SUBJECTS: readonly UnitDrillSubject[] = [
  'ap_macroeconomics',
  'ap_microeconomics',
  'ap_us_government',
  'ap_statistics',
];

function isUnitDrillSubject(value: unknown): value is UnitDrillSubject {
  return typeof value === 'string' && (VALID_UNIT_DRILL_SUBJECTS as readonly string[]).includes(value);
}

function subjectDisplayName(subject: UnitDrillSubject): string {
  switch (subject) {
    case 'ap_macroeconomics':
      return 'Macroeconomics';
    case 'ap_microeconomics':
      return 'Microeconomics';
    case 'ap_us_government':
      return 'U.S. Government & Politics';
    case 'ap_statistics':
      return 'Statistics';
  }
}

function buildSystemInstruction(subject: UnitDrillSubject, numQuestions: number): string {
  const course = subjectDisplayName(subject);
  const base = `
        You are an expert AP (Advanced Placement) ${course} exam tutor.
        
        Based on the selected key terms and whiteboard images provided, generate ${numQuestions} challenging, AP-style multiple-choice questions.
        
        Requirements:
        - Each question must test understanding of the key concepts from the selected terms and images
        - Questions should be at the AP exam difficulty level
        - Ensure distractor answers are plausible and test common misconceptions
        - Provide clear, educational explanations for the correct answer
        - Format the correct answer as a single capital letter (A, B, C, or D)
        - All questions must have exactly 4 options
      `;

  if (subject === 'ap_us_government') {
    return `${base}
        Focus on constitutional principles, institutions, political processes, civil liberties/rights, and required Supreme Court cases when relevant.
        Prefer scenario-based or application questions over pure definition recall.
        Do NOT include tableData on any question.
      `;
  }

  if (subject === 'ap_statistics') {
    return `${base}
        Focus on data analysis, study design, probability, sampling, inference, and interpreting results in AP Stats context.
        Use realistic variable names and contexts aligned with the selected terms.
        
        CRITICAL: Do NOT include tableData on most questions. Only use tables when essential (e.g., frequency tables, two-way tables, small data summaries).
        When you DO use a table, use 2-4 columns and 2-5 rows with rowHeaders when appropriate.
      `;
  }

  return `${base}
        CRITICAL: Do NOT include tableData on most questions. Only use tables when they are ABSOLUTELY ESSENTIAL for understanding the question.
        
        Use tableData ONLY for these specific scenarios:
        - Comparative advantage questions (comparing production/cost data between 2-3 regions/countries)
        - Production possibilities frontier questions (comparing output combinations)
        - Game theory payoff matrices (comparing strategies between players)
        - Cost/price/quantity comparison tables (when comparing multiple entities side-by-side is necessary)
        
        DO NOT use tables for:
        - Regular conceptual questions
        - Questions about definitions or theory
        - Questions that can be understood from text alone
        - Questions about graphs (describe the graph in text instead)
        - Most standard AP exam questions
        
        When you DO use a table, it should have 2-3 columns (headers) and 2-3 rows. The first column can be row headers (set rowHeaders: true).
        Remember: Most questions should NOT have tableData. Only include it when the question cannot be properly understood without a table.
      `;
}

// Define the schema for unit drill questions (similar to infinite-drill but for 3-5 questions)
const unitDrillSchema = {
  description: "AP Style Unit Drill Result",
  type: SchemaType.OBJECT,
  properties: {
    conceptDetected: { 
      type: SchemaType.STRING, 
      description: "The main academic concept(s) found in the selected terms and images" 
    },
    questions: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          question: { type: SchemaType.STRING },
          options: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
          correctAnswer: { type: SchemaType.STRING, description: "The correct option letter (A, B, C, D)" },
          explanation: { type: SchemaType.STRING },
          tableData: {
            type: SchemaType.OBJECT,
            description: "Optional table data for questions that benefit from tabular presentation (e.g., comparative advantage, production possibilities, cost structures). Include when the question involves comparing multiple entities, scenarios, or data points.",
            properties: {
              headers: {
                type: SchemaType.ARRAY,
                items: { type: SchemaType.STRING },
                description: "Column headers for the table (typically 2-3 columns)"
              },
              rows: {
                type: SchemaType.ARRAY,
                items: {
                  type: SchemaType.ARRAY,
                  items: { type: SchemaType.STRING }
                },
                description: "Array of rows, where each row is an array of cell values matching the number of headers"
              },
              rowHeaders: {
                type: SchemaType.BOOLEAN,
                description: "Set to true if the first column should be treated as row headers (bold formatting)"
              }
            },
            required: ["headers", "rows"]
          },
        },
        required: ["question", "options", "correctAnswer", "explanation"],
      },
    },
  },
  required: ["conceptDetected", "questions"],
};

export async function POST(req: Request) {
  try {
    const { selectedTerms, selectedImages, subject, unit } = await req.json();

    // Validate input
    if (!selectedTerms || !Array.isArray(selectedTerms) || selectedTerms.length === 0) {
      if (!selectedImages || !Array.isArray(selectedImages) || selectedImages.length === 0) {
        return NextResponse.json(
          { error: "At least one term or image must be selected" },
          { status: 400 }
        );
      }
    }

    if (!isUnitDrillSubject(subject)) {
      return NextResponse.json(
        {
          error:
            'Valid subject is required (ap_macroeconomics, ap_microeconomics, ap_us_government, or ap_statistics)',
        },
        { status: 400 }
      );
    }

    const drillSubject: UnitDrillSubject = subject;

    // Determine number of questions (3-5 based on selection count)
    const selectionCount = (selectedTerms?.length || 0) + (selectedImages?.length || 0);
    const numQuestions = Math.min(Math.max(3, selectionCount), 5);

    // Build context from selected terms (now just an array of term names)
    let termsContext = '';
    if (selectedTerms && Array.isArray(selectedTerms) && selectedTerms.length > 0) {
      // selectedTerms is now just an array of term name strings
      termsContext = `Key Terms: ${selectedTerms.join(', ')}`;
    }

    // Build context from selected images
    let imagesContext = '';
    if (selectedImages && selectedImages.length > 0) {
      imagesContext = selectedImages.map((img: any) => {
        let imgText = `Image: ${img.title || 'Whiteboard'}`;
        if (img.lessonIDs && img.lessonIDs.length > 0) {
          imgText += `\nRelated Lessons: ${img.lessonIDs.join(', ')}`;
        }
        if (img.topic) {
          imgText += `\nTopic: ${img.topic}`;
        }
        imgText += `\nImage URL: ${img.imageUrl}`;
        return imgText;
      }).join('\n\n');
    }

    // Combine context
    const fullContext = [
      termsContext,
      imagesContext
    ].filter(Boolean).join('\n\n---\n\n');

    // Setup the model
    const model = genAI.getGenerativeModel({
      model: "gemini-flash-latest",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: unitDrillSchema as any,
      },
      systemInstruction: buildSystemInstruction(drillSubject, numQuestions),
    });

    const parts = [];

    // Add text context from terms and images
    parts.push({
      text: `You MUST generate EXACTLY ${numQuestions} AP ${subjectDisplayName(drillSubject)} practice questions based on the following selected content. Do not generate fewer than ${numQuestions} questions.\n\n${fullContext}\n\nIMPORTANT: Generate exactly ${numQuestions} questions. The response must contain ${numQuestions} questions in the questions array.`
    });

    // Add image data if images are selected
    if (selectedImages && selectedImages.length > 0) {
      // Fetch and convert images to base64
      for (const img of selectedImages) {
        try {
          const imageResponse = await fetch(img.imageUrl);
          if (imageResponse.ok) {
            const imageBuffer = await imageResponse.arrayBuffer();
            // Convert ArrayBuffer to base64
            const imageBase64 = Buffer.from(imageBuffer).toString('base64');
            
            // Determine MIME type from URL or default to jpeg
            let mimeType = 'image/jpeg';
            if (img.imageUrl.match(/\.png$/i)) {
              mimeType = 'image/png';
            } else if (img.imageUrl.match(/\.gif$/i)) {
              mimeType = 'image/gif';
            } else if (img.imageUrl.match(/\.webp$/i)) {
              mimeType = 'image/webp';
            }
            
            parts.push({
              inlineData: {
                data: imageBase64,
                mimeType: mimeType,
              },
            });
          }
        } catch (error) {
          console.error(`Error fetching image ${img.imageUrl}:`, error);
          // Continue with other images - we can still generate questions from terms
        }
      }
    }

    // Generate Content
    const result = await model.generateContent(parts);
    const response = result.response;
    const jsonText = response.text();
    const parsedData = JSON.parse(jsonText);

    // Validate that we got the expected number of questions
    if (!parsedData.questions || parsedData.questions.length === 0) {
      throw new Error('No questions generated');
    }

    // Warn if we got fewer questions than expected (but still return what we have)
    if (parsedData.questions.length < numQuestions) {
      console.warn(`Expected ${numQuestions} questions but only got ${parsedData.questions.length}`);
    }

    // Add unique IDs (Frontend needs these for React keys)
    const finalData = {
      ...parsedData,
      questions: parsedData.questions.map((q: any, i: number) => ({
        ...q,
        id: `unit_drill_${Date.now()}_${i}`,
      })),
    };

    return NextResponse.json(finalData);

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    
    // Fallback error message
    return NextResponse.json(
      { error: error.message || "Failed to generate drill. Please try again." },
      { status: 500 }
    );
  }
}

