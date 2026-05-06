import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';
import Together from 'together-ai';

const MODEL_NAME = 'gemini-2.0-flash';

export async function POST(req: NextRequest) {
  try {
    const { prompt, transcript, topicTitle } = await req.json();
    if (!prompt || !transcript) {
      return NextResponse.json(
        { error: 'Missing prompt or transcript.' },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: MODEL_NAME,
      generationConfig: { temperature: 0.35 },
    });

    const fullPrompt = `You are an AP Economics speaking coach.
Give quick, encouraging feedback on a student's spoken response.

Topic: ${topicTitle || 'AP Economics'}
Prompt: ${prompt}
Student transcript: ${transcript}

Return 3 short sentences max:
1) one thing done well,
2) one key improvement,
3) one concrete next-step tip.
No rubric, no scoring, no markdown.`;

    let feedback = '';
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
          model: MODEL_NAME,
          generationConfig: { temperature: 0.35 },
        });
        const result = await model.generateContent(fullPrompt);
        feedback = result.response.text()?.trim() || '';
      } catch (geminiError: any) {
        const msg = (geminiError?.message || '').toLowerCase();
        const quotaError =
          msg.includes('429') ||
          msg.includes('quota') ||
          msg.includes('rate limit') ||
          msg.includes('resource_exhausted');
        if (!quotaError) {
          throw geminiError;
        }
      }
    }

    // Fallback when Gemini is unavailable or quota-limited.
    if (!feedback) {
      const togetherApiKey = process.env.TOGETHER_API_KEY;
      if (!togetherApiKey) {
        return NextResponse.json(
          { error: 'Voice feedback unavailable: no AI provider key is configured.' },
          { status: 500 }
        );
      }

      const together = new Together({ apiKey: togetherApiKey });
      const completion = await together.chat.completions.create({
        model: 'meta-llama/Llama-3.3-70B-Instruct-Turbo',
        temperature: 0.4,
        max_tokens: 180,
        messages: [
          {
            role: 'system',
            content:
              'You are an AP Economics speaking coach. Give concise, encouraging feedback in plain text only.',
          },
          { role: 'user', content: fullPrompt },
        ],
      });
      feedback = completion.choices?.[0]?.message?.content?.trim() || '';
    }

    if (!feedback) {
      return NextResponse.json(
        { error: 'Model returned empty feedback.' },
        { status: 502 }
      );
    }

    return NextResponse.json({ feedback });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to generate voice feedback.' },
      { status: 500 }
    );
  }
}
