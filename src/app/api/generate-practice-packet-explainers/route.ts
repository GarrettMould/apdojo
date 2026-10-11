import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';
import { NextResponse } from 'next/server';
import {
  COURSE_CURRICULUM_OUTLINES,
  type CourseOutlineId,
} from '@/data/courseCurriculumOutline';
import {
  isPacketSubject,
  PACKET_SUBJECT_TO_OUTLINE,
  packetCourseDisplayName,
} from '@/lib/practicePacket/subjects';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

type IncomingLesson = {
  lessonNumber: string;
  name?: string;
  /** Per-lesson unit for multi-unit packets; falls back to body.unit */
  unit?: number;
  keyTerms?: { term: string; definition: string }[];
};

const explainerSchema = {
  description: 'CED-bounded ELI5 explainers for practice packet lessons',
  type: SchemaType.OBJECT,
  properties: {
    explainers: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          lessonNumber: { type: SchemaType.STRING },
          eli5: {
            type: SchemaType.STRING,
            description: '2-4 short sentences, plain language ELI5 explanation of the lesson',
          },
          analogy: {
            type: SchemaType.STRING,
            description: 'One concrete real-world analogy that maps back to the AP concept',
          },
          commonMistake: {
            type: SchemaType.STRING,
            description: 'One common student mistake on this lesson, and the correct framing',
          },
        },
        required: ['lessonNumber', 'eli5', 'analogy', 'commonMistake'],
      },
    },
  },
  required: ['explainers'],
};

function validateLessonAgainstCed(
  outlineId: CourseOutlineId,
  unit: number,
  lessonNumber: string
): { ok: true; name: string } | { ok: false; error: string } {
  const outline = COURSE_CURRICULUM_OUTLINES[outlineId];
  const unitOutline = outline.units.find((u) => u.unitNumber === unit);
  if (!unitOutline) {
    return { ok: false, error: `Unit ${unit} is not in the ${outlineId} CED outline` };
  }
  const lesson = unitOutline.lessons.find((l) => l.lessonNumber === lessonNumber);
  if (!lesson) {
    return {
      ok: false,
      error: `Lesson ${lessonNumber} is not in unit ${unit} of the ${outlineId} CED outline`,
    };
  }
  return { ok: true, name: lesson.name };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { subject, unit, lessons } = body as {
      subject?: string;
      unit?: number;
      lessons?: IncomingLesson[];
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
    if (!Array.isArray(lessons) || lessons.length === 0) {
      return NextResponse.json({ error: 'At least one lesson is required' }, { status: 400 });
    }
    if (lessons.length > 3) {
      return NextResponse.json({ error: 'At most 3 lessons per packet' }, { status: 400 });
    }

    const hasFallbackUnit = typeof unit === 'number' && Number.isFinite(unit);
    const hasPerLessonUnit = lessons.every(
      (l) => typeof l?.unit === 'number' && Number.isFinite(l.unit)
    );
    if (!hasFallbackUnit && !hasPerLessonUnit) {
      return NextResponse.json(
        { error: 'Each lesson needs a unit, or provide a top-level unit number' },
        { status: 400 }
      );
    }

    const outlineId = PACKET_SUBJECT_TO_OUTLINE[subject];
    const courseName = packetCourseDisplayName(outlineId);

    const validated: {
      lessonNumber: string;
      name: string;
      unit: number;
      keyTerms: { term: string; definition: string }[];
    }[] = [];

    for (const lesson of lessons) {
      if (!lesson?.lessonNumber || typeof lesson.lessonNumber !== 'string') {
        return NextResponse.json({ error: 'Each lesson needs a lessonNumber' }, { status: 400 });
      }
      const lessonUnit =
        typeof lesson.unit === 'number' && Number.isFinite(lesson.unit)
          ? lesson.unit
          : (unit as number);
      const check = validateLessonAgainstCed(outlineId, lessonUnit, lesson.lessonNumber);
      if (!check.ok) {
        return NextResponse.json({ error: check.error }, { status: 400 });
      }
      const keyTerms = Array.isArray(lesson.keyTerms)
        ? lesson.keyTerms
            .filter((t) => t?.term && t?.definition)
            .slice(0, 6)
            .map((t) => ({ term: String(t.term), definition: String(t.definition) }))
        : [];
      validated.push({
        lessonNumber: lesson.lessonNumber,
        name: check.name,
        unit: lessonUnit,
        keyTerms,
      });
    }

    const unitList = [...new Set(validated.map((l) => l.unit))].sort((a, b) => a - b);
    const unitLabel =
      unitList.length === 1 ? `unit ${unitList[0]}` : `units ${unitList.join(', ')}`;

    const lessonBlocks = validated
      .map((l) => {
        const termsText =
          l.keyTerms.length > 0
            ? l.keyTerms.map((t) => `- ${t.term}: ${t.definition}`).join('\n')
            : '- (no curated terms provided; stay strictly within the lesson title scope)';
        return `Unit ${l.unit} · Lesson ${l.lessonNumber}: ${l.name}\nKey terms (authoritative):\n${termsText}`;
      })
      .join('\n\n---\n\n');

    const systemInstruction = `
You are an expert ${courseName} tutor writing short teaching blurbs for a personalized practice packet.

Hard rules:
- ONLY teach the provided CED lessons and key terms. Do not introduce other units, lessons, court cases, or formulas that are not implied by the provided material.
- Use the official lesson names and term definitions as the source of truth.
- Style: ELI5 — plain language a high-school student understands. No jargon without a quick gloss.
- Each analogy must be a concrete real-world situation that clearly maps back to the AP concept.
- commonMistake should correct a frequent mix-up for THIS lesson only.
- Keep eli5 to 2–4 sentences, analogy to 1–3 sentences, commonMistake to 1–2 sentences.
- Do not invent AP exam secrets, scoring rubrics, or content outside the given lesson scope.
- Return one explainer object per lesson, matching lessonNumber exactly.
`.trim();

    const model = genAI.getGenerativeModel({
      model: 'gemini-flash-latest',
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: explainerSchema as any,
      },
      systemInstruction,
    });

    const result = await model.generateContent([
      {
        text: `Write explainers for these CED-bounded lessons (${unitLabel}):\n\n${lessonBlocks}`,
      },
    ]);

    const parsed = JSON.parse(result.response.text()) as {
      explainers?: {
        lessonNumber: string;
        eli5: string;
        analogy: string;
        commonMistake: string;
      }[];
    };

    const byLesson = new Map(
      (parsed.explainers || []).map((e) => [e.lessonNumber, e])
    );

    const explainers = validated.map((l) => {
      const generated = byLesson.get(l.lessonNumber);
      return {
        lessonNumber: l.lessonNumber,
        lessonName: l.name,
        unit: l.unit,
        eli5: generated?.eli5?.trim() || '',
        analogy: generated?.analogy?.trim() || '',
        commonMistake: generated?.commonMistake?.trim() || '',
      };
    });

    if (explainers.some((e) => !e.eli5 || !e.analogy || !e.commonMistake)) {
      return NextResponse.json(
        { error: 'Incomplete explainers generated. Please try again.' },
        { status: 502 }
      );
    }

    return NextResponse.json({ explainers });
  } catch (error: any) {
    console.error('[generate-practice-packet-explainers]', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to generate explainers' },
      { status: 500 }
    );
  }
}
