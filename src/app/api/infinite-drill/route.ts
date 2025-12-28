import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Configure body size limit for this route (20MB for large PDFs/images)
export const maxDuration = 60; // 60 seconds timeout
export const runtime = 'nodejs';

// 1. Setup the client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// 2. Define the exact structure the frontend expects (Do not change this)
const drillSchema = {
  description: "AP Style Question Drill Result",
  type: SchemaType.OBJECT,
  properties: {
    conceptDetected: { type: SchemaType.STRING, description: "The main academic concept found in the notes" },
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
    const { fileUrl, textInput, mimeType, imageBase64 } = await req.json();

    // 3. USE YOUR WORKING MODEL CONFIGURATION HERE
    // We stick to 'gemini-flash-latest' since you confirmed it works elsewhere
    const model = genAI.getGenerativeModel({
      model: "gemini-flash-latest", 
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: drillSchema as any,
      },
      systemInstruction: `
        You are an expert AP (Advanced Placement) Exam tutor. 
        Analyze the provided user notes (image, PDF, or text).
        Identify the core concept.
        Generate 5 challenging, AP-style multiple-choice questions based on this material.
        Ensure distractor answers are plausible.
        Provide a clear educational explanation for the correct answer.
        Format the correct answer as a single capital letter (A, B, C, or D).
        
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
        Example: For comparative advantage, use headers like ["Region", "Good X", "Good Y"] with rows showing each region's data.
        
        Remember: Most questions should NOT have tableData. Only include it when the question cannot be properly understood without a table.
      `,
    });

    const parts = [];

    // Handle File Input (Images or PDF) - prefer fileUrl over base64
    if (fileUrl) {
      // Fetch file from Firebase Storage URL
      try {
        const fileResponse = await fetch(fileUrl);
        if (!fileResponse.ok) {
          throw new Error(`Failed to fetch file from storage: ${fileResponse.statusText}`);
        }
        
        const arrayBuffer = await fileResponse.arrayBuffer();
        const base64String = Buffer.from(arrayBuffer).toString('base64');
        
        parts.push({
          inlineData: {
            data: base64String,
            mimeType: mimeType || "image/jpeg", 
          },
        });
        parts.push({ text: "Generate 5 AP practice questions based on these notes." });
      } catch (fetchError: any) {
        console.error("Error fetching file from URL:", fetchError);
        return NextResponse.json(
          { error: `Failed to fetch file: ${fetchError.message}` },
          { status: 500 }
        );
      }
    } 
    // Fallback: Handle legacy base64 input (for backwards compatibility)
    else if (imageBase64) {
      // Clean base64 string if it has the prefix
      const base64Data = imageBase64.includes(",") 
        ? imageBase64.split(",")[1] 
        : imageBase64;
      
      parts.push({
        inlineData: {
          data: base64Data,
          mimeType: mimeType || "image/jpeg", 
        },
      });
      parts.push({ text: "Generate 5 AP practice questions based on these notes." });
    } 
    // Handle Text Input
    else if (textInput) {
      parts.push({ text: `Analyze these notes and generate questions: ${textInput}` });
    } else {
      return NextResponse.json({ error: "No input provided" }, { status: 400 });
    }

    // 4. Generate Content
    const result = await model.generateContent(parts);
    const response = result.response;
    const jsonText = response.text();
    const parsedData = JSON.parse(jsonText);

    // 5. Add unique IDs (Frontend needs these for React keys)
    const finalData = {
      ...parsedData,
      questions: parsedData.questions.map((q: any, i: number) => ({
        ...q,
        id: `gen_${Date.now()}_${i}`,
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