import { NextResponse } from 'next/server'
import Together from "together-ai"

export async function POST(request: Request) {
  try {
    // Log incoming request
    const body = await request.json()
    console.log('Received request:', body)

    // Validate input
    if (!body.question || !body.userAnswer) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const together = new Together()
    
    const response = await together.chat.completions.create({
      messages: [
        {
          "role": "system",
          "content": "You are an expert economics tutor who provides structured feedback on student answers."
        },
        {
          "role": "user",
          "content": `Please evaluate this economics answer:
            
Question: ${body.question}
Student Answer: ${body.userAnswer}
Topics: ${body.tags?.join(', ')}

Provide feedback in the following format:

<b>Correctness:</b> (Is the answer correct, partially correct, or incorrect?) Students should explain their reasoning. If their answer is correct but they don't explain their reasoning, they should be told to explain their reasoning.

<br><br>

<b>Explanation:</b> (Explain why the answer is correct or incorrect). Try to be concise

<br><br>

<b>Sample Answer:</b> (Provide a sample answer to the question). This should be a correct answer to the question. If the question says "Explain" or some similar prompt asking for an explanation, your sample answer should include a brief (1-2 sentence) explanation.`
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
      { error: 'Error processing answer' },
      { status: 500 }
    )
  }
} 