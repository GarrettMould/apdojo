// app/api/generate-quiz/route.ts
import { NextResponse } from 'next/server';
import Together from "together-ai";

export async function POST(req: Request) {
  try {
    const { subject, content } = await req.json();
    
    const together = new Together({
      apiKey: process.env.TOGETHER_API_KEY
    });

    const response = await together.chat.completions.create({
      messages: [
        {
          "role": "system",
          "content": "You are an AP Economics expert specializing in creating multiple choice questions. Generate questions that follow AP exam style and test key concepts."
        },
        {
          "role": "user",
          "content": `Create a short 3-question multiple choice quiz based on this AP ${subject} Economics content. Each question should test understanding of key concepts.

Content: ${content}

Format your response as a JSON array with exactly this structure:
[
  {
    "id": "1",
    "text": "question text here",
    "options": ["option A", "option B", "option C", "option D"],
    "correctAnswer": 0
  }
]

The correctAnswer should be the index (0-3) of the correct option. Make sure all questions have exactly 4 options.`
        }
      ],
      model: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
      temperature: 0.7,
      max_tokens: 1000
    });

    // Parse the response to ensure it's valid JSON
    let questions;
    try {
      const responseText = response.choices?.[0]?.message?.content || '';
      questions = JSON.parse(responseText.trim());
      
      // Validate the response structure
      if (!Array.isArray(questions) || questions.length === 0) {
        throw new Error('Invalid response format');
      }

      // Ensure each question has the required fields
      questions.forEach((q, index) => {
        if (!q.id) q.id = (index + 1).toString();
        if (!q.text || !Array.isArray(q.options) || q.options.length !== 4 || typeof q.correctAnswer !== 'number') {
          throw new Error('Invalid question format');
        }
      });

    } catch (error) {
      console.error('Failed to parse response:', error);
      throw new Error('Failed to generate valid quiz questions');
    }

    return NextResponse.json({ questions });

  } catch (error) {
    console.error('Error generating quiz:', error);
    return NextResponse.json(
      { error: 'Failed to generate quiz' },
      { status: 500 }
    );
  }
}