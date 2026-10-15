import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';
import { COURSE_CURRICULUM_OUTLINES } from '@/data/courseCurriculumOutline';
import {
  isPacketSubject,
  PACKET_SUBJECT_TO_OUTLINE,
  packetCourseDisplayName,
} from '@/lib/practicePacket/subjects';

export const maxDuration = 60;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      subject,
      unit,
      lessonNumber,
      lessonName,
      keyTerms,
      studentResponse,
    } = body as {
      subject?: string;
      unit?: number;
      lessonNumber?: string;
      lessonName?: string;
      keyTerms?: { term: string; definition: string }[];
      studentResponse?: string;
    };

    if (!isPacketSubject(subject)) {
      return NextResponse.json(
        {
          error:
            'Valid subject is required (macro, micro, gov, stats, or ap_* question tags)',
        },
        { status: 400 }
      );
    }
    if (typeof unit !== 'number') {
      return NextResponse.json({ error: 'Valid unit is required' }, { status: 400 });
    }
    if (!lessonNumber || typeof lessonNumber !== 'string') {
      return NextResponse.json({ error: 'lessonNumber is required' }, { status: 400 });
    }
    const responseText = typeof studentResponse === 'string' ? studentResponse.trim() : '';
    if (responseText.length < 8) {
      return NextResponse.json(
        { error: 'Write a bit more so we can give useful feedback.' },
        { status: 400 }
      );
    }

    const outlineId = PACKET_SUBJECT_TO_OUTLINE[subject];
    const outline = COURSE_CURRICULUM_OUTLINES[outlineId];
    const unitOutline = outline.units.find((u) => u.unitNumber === unit);
    const cedLesson = unitOutline?.lessons.find((l) => l.lessonNumber === lessonNumber);
    if (!cedLesson) {
      return NextResponse.json(
        { error: 'Lesson is not in the CED outline for this unit' },
        { status: 400 }
      );
    }

    const officialName = cedLesson.name;
    const terms = Array.isArray(keyTerms)
      ? keyTerms
          .filter((t) => t?.term && t?.definition)
          .slice(0, 6)
          .map((t) => `- ${t.term}: ${t.definition}`)
          .join('\n')
      : '';

    const courseName = packetCourseDisplayName(outlineId);

    const model = genAI.getGenerativeModel({
      model: 'gemini-flash-latest',
      generationConfig: { temperature: 0.4 },
      systemInstruction: `
You are AI Dojo, a brief ${courseName} tutor giving ONE short reply to a student's open-ended reflection.
Stay strictly inside CED lesson ${lessonNumber} (${officialName}) and the provided key terms.
Be encouraging and concrete; correct them if they are off. Students skim — hard cap of 2–3 short sentences.
No markdown bullets. No quiz questions. No filler praise. Lead with the most useful point.
`.trim(),
    });

    const result = await model.generateContent([
      {
        text: `Lesson: ${lessonNumber} — ${officialName}
${lessonName && lessonName !== officialName ? `Display name: ${lessonName}\n` : ''}
Key terms:
${terms || '(none provided)'}

Student reflection:
${responseText}

Write one AI Dojo reply (2–3 sentences max).`,
      },
    ]);

    const reply = result.response.text()?.trim();
    if (!reply) {
      return NextResponse.json({ error: 'Empty feedback from model' }, { status: 502 });
    }

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error('[practice-packet-reflect]', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to generate feedback' },
      { status: 500 }
    );
  }
}
