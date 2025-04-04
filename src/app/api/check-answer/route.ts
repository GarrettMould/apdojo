import { NextResponse } from 'next/server'
import Together from "together-ai"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log('Received request:', body)

    // Validate basic input
    if (!body.question) {
      return NextResponse.json(
        { error: 'Missing required fields: question is required' },
        { status: 400 }
      )
    }

    const together = new Together({
      apiKey: process.env.TOGETHER_API_KEY
    })

    // Different prompts based on request type
    let prompt;
    
    // Case 1: AI Tutor for MCQ
    if (body.type === 'ai_tutor' && body.questionType === 'mcq') {
      prompt = `As an AP Economics tutor, provide a brief, focused explanation for this multiple choice question. Keep explanations concise and AP-style (1-2 sentences per section).

Question: ${body.question}

Options:
${body.options.map((opt: string, idx: number) => `${String.fromCharCode(65 + idx)}) ${opt}`).join('\n')}

Correct Answer: ${body.correctAnswer}

Unit ${body.unit}: ${body.unitName}

Please provide a concise explanation in this format:

<br><br>

(1-2 sentences explaining why the correct answer is right)`


    // Case 2: AI Tutor for FRQ
    } else if (body.type === 'ai_tutor' && body.questionType === 'frq') {
      prompt = `As an AP Economics tutor, provide feedback on this free response question. Focus on key points that would earn credit on an AP exam.

Question: ${body.question}

Student's Response: ${body.userAnswer}

Unit ${body.unit}: ${body.unitName}

Please provide feedback in this format:

<b>Key Points Required:</b> (List 2-3 main concepts that should be included)

<br><br>

<b>Score Analysis:</b> (Brief note on which points were earned/missed)

<br><br>

<b>Sample Response:</b> (A concise 2-3 sentence response that would earn full credit)`

    // Case 3: Regular FRQ evaluation from questionsGrid
    } else {
      prompt = `As an AP Economics expert, evaluate this student's response. Keep feedback focused and concise.

Question: ${body.question}
Student Answer: ${body.userAnswer}
Topics: ${body.tags?.join(', ') || 'Not specified'}

Provide feedback in this format:

<b>Correctness:</b> (Is the answer correct, partially correct, or incorrect?)

<br><br>

<b>Explanation:</b> (1-2 sentences explaining the evaluation. Do not use the phrase "The student's response". Instead, use the phase, "This response")

<br><br>

<b>Sample Answer:</b> (A brief, correct response in 1-2 sentences)`
    }

    const response = await together.chat.completions.create({
      messages: [
        {
          "role": "system",
          "content": body.type === 'ai_tutor' 
            ? (body.questionType === 'mcq' 
              ? "You are an AP Economics tutor specializing in brief, focused explanations for multiple choice questions. Keep all responses concise and directly related to AP exam concepts."
              : "You are an AP Economics tutor specializing in FRQ responses. Focus on the key points needed for full credit and provide concise sample responses.")
            : "You are an AP Economics expert providing concise evaluation of student responses. Focus on key concepts and clear explanations."
        },
        {
          "role": "user",
          "content": prompt
        }
      ],
      model: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
      temperature: 0.7,
      max_tokens: 500
    })

    return NextResponse.json({ 
      feedback: response.choices?.[0]?.message?.content || 'No feedback available'
    })

  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json(
      { error: 'Error processing answer: ' + (error as Error).message },
      { status: 500 }
    )
  }
} 