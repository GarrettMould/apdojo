/**
 * Drafts lesson notes from a tutoring session transcript with Gemini. Server only.
 * The tutor reviews and edits the draft before anything is shared with a family.
 */
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_REASONING_MODEL } from '@/lib/geminiModels';
import {
  EMPTY_LESSON_NOTES,
  LESSON_COURSES,
  LESSON_NOTE_FIELDS,
  MAX_LESSON_SKILLS,
  courseUnits,
  isLessonCourse,
  sanitizeSkills,
  type LessonCourse,
  type LessonNotes,
  type LessonSkill,
} from '@/lib/tutoringLessons';

export interface LessonNotesDraft {
  notes: LessonNotes;
  skills: LessonSkill[];
  course: LessonCourse | null;
}

function outlineText(knownCourse: LessonCourse | null): string {
  const courses = knownCourse ? [knownCourse] : [...LESSON_COURSES];
  return courses
    .map((course) => {
      const units = courseUnits(course)
        .map((u) => `  Unit ${u.unitNumber}: ${u.unitName}\n${u.lessons.map((l) => `    ${l.lessonNumber} ${l.name}`).join('\n')}`)
        .join('\n');
      return `${course}\n${units}`;
    })
    .join('\n');
}

function buildPrompt(transcript: string, studentName: string | null, knownCourse: LessonCourse | null): string {
  return `You are helping an AP tutor write notes after a 1-on-1 tutoring session. The notes will be shared with the
student and their parents after the tutor reviews them.

Student: ${studentName ?? 'unknown'}
Course: ${knownCourse ?? 'not given; work it out from the transcript'}
The transcript may label speakers by name or as "Me" (the tutor) and "Them" (the student). It may contain
transcription errors; interpret obvious mis-hearings of economics, government or statistics terms sensibly.

Write these fields, in plain text (no markdown, no bullet symbols; use a new line between items):
- summary: 2-4 sentences on how the lesson went, in third person about the student, warm but specific.
- topicsCovered: the units, skills and question types worked on, one per line.
- strengths: what the student did well, with concrete examples from the session.
- focusAreas: where the student got stuck or made mistakes, and what the misconception was.
- homework: what the student should do before the next lesson, one item per line. Include anything the tutor
  assigned in the session; otherwise suggest focused practice on the focus areas.

Also give "course": the AP course the lesson was for, one of ${LESSON_COURSES.map((c) => `"${c}"`).join(', ')}
(or null if it is unclear), and list "skills": the specific AP skills practiced or discussed (at most
${MAX_LESSON_SKILLS}), each as {"unit": the unit number (integer), "lesson": the matching lesson number from the
curriculum below such as "3.2" (or null if none fits), "skill": a short specific name such as "Tax multiplier" or "Long-run self-correction in AD-AS",
"level": your estimate of the student's current command of it: 1 = needs work (wrong or confused, needed
substantial help), 2 = developing (partly right, or right only after hints), 3 = solid (correct and explained
independently)}.

Curriculum (units and lessons) for ${knownCourse ? 'this course' : 'each course'}:
${outlineText(knownCourse)}

Rules:
- Only state what the transcript supports. Do not invent scores, assignments or events.
- Leave out anything personal or sensitive that a student would not want shared with their parents (family
  matters, health, grades the parents may not know about, offhand remarks). Keep it about learning.
- If the transcript has no real lesson content, return empty strings and an empty skills list.

Respond with JSON only, in exactly this shape:
{"summary": "", "topicsCovered": "", "strengths": "", "focusAreas": "", "homework": "", "course": null, "skills": []}

Transcript:
"""
${transcript}
"""`;
}

function parseDraft(text: string, knownCourse: LessonCourse | null): LessonNotesDraft {
  const json = text.slice(text.indexOf('{'), text.lastIndexOf('}') + 1);
  const raw = JSON.parse(json) as Record<string, unknown>;

  const notes = { ...EMPTY_LESSON_NOTES };
  for (const { key } of LESSON_NOTE_FIELDS) {
    const value = raw[key];
    notes[key] = typeof value === 'string' ? value.trim() : Array.isArray(value) ? value.join('\n') : '';
  }

  const course = knownCourse ?? (isLessonCourse(raw.course) ? raw.course : null);
  const rawSkills = Array.isArray(raw.skills) ? raw.skills.map((s) => ({ ...(s as object), course, assessedBy: 'ai' })) : [];
  return { notes, skills: sanitizeSkills(rawSkills, 'ai'), course };
}

export async function draftLessonNotes(
  transcript: string,
  studentName: string | null,
  knownCourse: LessonCourse | null,
): Promise<LessonNotesDraft> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY is not configured');
  const model = new GoogleGenerativeAI(apiKey).getGenerativeModel({
    model: GEMINI_REASONING_MODEL,
    generationConfig: { temperature: 0.3, maxOutputTokens: 4096, responseMimeType: 'application/json' },
  });
  const result = await model.generateContent(buildPrompt(transcript, studentName, knownCourse));
  return parseDraft(result.response.text(), knownCourse);
}
