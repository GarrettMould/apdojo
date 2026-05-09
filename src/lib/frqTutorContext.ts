/**
 * Serialized FRQ payload for `/api/cheat-sheet-chat` `frqContext`.
 * Includes rubric strings, keyed answers, and metadata—everything needed to tutor one item.
 */

import type { FRQPart, FRQQuestion, FRQSubPart, FRQTableData } from '@/data/frqQuestions';

export type FrqTutorPartPayload = {
  label: string;
  text: string;
  answerType?: 'draw' | 'text';
  pointValue?: number;
  gradingCriteria?: string;
  studentExplanation?: string;
  /** Human-readable / text key; drawings may reference image URLs or rubric-only description */
  answerKeySummary?: string;
  templateImageUrl?: string;
  referenceImageUrl?: string;
  videoUrl?: string;
  subparts?: FrqTutorSubpartPayload[];
};

export type FrqTutorSubpartPayload = {
  label: string;
  text: string;
  answerType?: 'draw' | 'text';
  pointValue?: number;
  gradingCriteria?: string;
  studentExplanation?: string;
  answerKeySummary?: string;
  referenceImageUrl?: string;
  videoUrl?: string;
};

export type FrqTutorContextPayload = {
  frqId: number;
  examTitle: string;
  unit: number;
  title: string;
  questionNumber: number;
  prompt: string;
  expertTip?: string;
  stimulusImageNote?: string;
  tableData?: FRQTableData;
  parts: FrqTutorPartPayload[];
};

const MAX_FIELD = 12_000;
const MAX_TOTAL_PRETTY = 48_000;

function clip(s: string, max: number): string {
  const t = s.trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 20)}\n…[truncated]`;
}

/** Turn stored `answer` (text, image import, etc.) into tutor-safe text */
function summarizeAnswerKey(raw: unknown, answerType?: 'draw' | 'text'): string | undefined {
  if (raw == null) return undefined;
  if (typeof raw === 'string') {
    const t = raw.trim();
    if (t.startsWith('/') || t.startsWith('http')) {
      return `[Curriculum image or asset path: ${t}]`;
    }
    return clip(t, 4000);
  }
  if (typeof raw === 'object') {
    const o = raw as Record<string, unknown>;
    if (typeof o.src === 'string') {
      return `[Diagram / image answer key in curriculum: ${o.src}]`;
    }
    if (typeof o.default === 'object' && o.default != null) {
      const d = o.default as { src?: string };
      if (typeof d.src === 'string') {
        return `[Diagram / image answer key in curriculum: ${d.src}]`;
      }
    }
  }
  if (answerType === 'draw') {
    return '[Drawing part — use grading criteria and reference image URLs in this part for full expectations.]';
  }
  return '[Structured answer key in data — rely on grading criteria above.]';
}

function serializeSubpart(sp: FRQSubPart): FrqTutorSubpartPayload {
  return {
    label: sp.label,
    text: clip(sp.text, 4000),
    ...(sp.answerType ? { answerType: sp.answerType } : {}),
    ...(sp.pointValue != null ? { pointValue: sp.pointValue } : {}),
    ...(sp.gradingCriteria ? { gradingCriteria: clip(sp.gradingCriteria, MAX_FIELD) } : {}),
    ...(sp.studentExplanation ? { studentExplanation: clip(sp.studentExplanation, 2000) } : {}),
    ...(summarizeAnswerKey(sp.answer, sp.answerType)
      ? { answerKeySummary: summarizeAnswerKey(sp.answer, sp.answerType) }
      : {}),
    ...(sp.referenceImageUrl ? { referenceImageUrl: sp.referenceImageUrl } : {}),
    ...(sp.videoUrl ? { videoUrl: sp.videoUrl } : {}),
  };
}

function serializePart(part: FRQPart): FrqTutorPartPayload {
  const subparts = part.subparts?.map(serializeSubpart);
  return {
    label: part.label,
    text: clip(part.text, 6000),
    ...(part.answerType ? { answerType: part.answerType } : {}),
    ...(part.pointValue != null ? { pointValue: part.pointValue } : {}),
    ...(part.gradingCriteria ? { gradingCriteria: clip(part.gradingCriteria, MAX_FIELD) } : {}),
    ...(part.studentExplanation ? { studentExplanation: clip(part.studentExplanation, 2000) } : {}),
    ...(summarizeAnswerKey(part.answer, part.answerType)
      ? { answerKeySummary: summarizeAnswerKey(part.answer, part.answerType) }
      : {}),
    ...(part.templateImageUrl ? { templateImageUrl: part.templateImageUrl } : {}),
    ...(part.referenceImageUrl ? { referenceImageUrl: part.referenceImageUrl } : {}),
    ...(part.videoUrl ? { videoUrl: part.videoUrl } : {}),
    ...(subparts && subparts.length > 0 ? { subparts } : {}),
  };
}

export type DisplayFrqForTutor = FRQQuestion & { unit: number; examTitle: string };

export function buildFrqTutorContextPayload(q: DisplayFrqForTutor): FrqTutorContextPayload {
  let stimulusImageNote: string | undefined;
  if (q.image) {
    if (typeof q.image === 'string') {
      stimulusImageNote = `Stimulus image path: ${q.image}`;
    } else {
      stimulusImageNote = '[Stimulus includes a diagram asset from the curriculum; see FRQ prompt and parts.]';
    }
  }

  const parts = q.parts.map(serializePart);

  return {
    frqId: q.id,
    examTitle: clip(q.examTitle, 400),
    unit: q.unit,
    title: clip(q.title, 500),
    questionNumber: q.questionNumber,
    prompt: clip(q.prompt, MAX_FIELD),
    ...(q.expertTip ? { expertTip: clip(q.expertTip, 2000) } : {}),
    ...(stimulusImageNote ? { stimulusImageNote } : {}),
    ...(q.tableData ? { tableData: q.tableData } : {}),
    parts,
  };
}

/** Pretty-print for the model system block (length-capped overall) */
export function formatFrqTutorContextBlock(payload: FrqTutorContextPayload): string {
  const lines: string[] = [
    `FRQ id: ${payload.frqId}`,
    `Pack / exam: ${payload.examTitle}`,
    `Unit: ${payload.unit}`,
    `Title: ${payload.title}`,
    `CB question #: ${payload.questionNumber}`,
    '',
    '--- PROMPT ---',
    payload.prompt,
    '',
  ];
  if (payload.expertTip) {
    lines.push('--- EXPERT TIP (from bank) ---', payload.expertTip, '');
  }
  if (payload.stimulusImageNote) {
    lines.push('--- STIMULUS IMAGE ---', payload.stimulusImageNote, '');
  }
  if (payload.tableData) {
    lines.push('--- TABLE DATA (stimulus) ---', JSON.stringify(payload.tableData, null, 2), '');
  }

  lines.push('--- PARTS (rubric, keys, subparts) ---');
  for (const p of payload.parts) {
    lines.push(
      '',
      `Part ${p.label} (${p.pointValue ?? '—'} pts${p.answerType ? `, ${p.answerType}` : ''})`,
      p.text
    );
    if (p.gradingCriteria) lines.push('Grading criteria:', p.gradingCriteria);
    if (p.studentExplanation) lines.push('Student-facing explanation:', p.studentExplanation);
    if (p.answerKeySummary) lines.push('Author / keyed answer:', p.answerKeySummary);
    if (p.templateImageUrl) lines.push('Drawing template image:', p.templateImageUrl);
    if (p.referenceImageUrl) lines.push('Reference / answer image:', p.referenceImageUrl);
    if (p.videoUrl) lines.push('Walkthrough video URL:', p.videoUrl);
    if (p.subparts?.length) {
      for (const s of p.subparts) {
        lines.push(`  ${p.label}${s.label}. ${s.text}`);
        if (s.gradingCriteria) lines.push(`  Rubric: ${s.gradingCriteria}`);
        if (s.studentExplanation) lines.push(`  Student note: ${s.studentExplanation}`);
        if (s.answerKeySummary) lines.push(`  Key: ${s.answerKeySummary}`);
      }
    }
  }

  const out = lines.join('\n');
  return clip(out, MAX_TOTAL_PRETTY);
}

function parseOptionalString(v: unknown, max: number): string | undefined {
  if (typeof v !== 'string') return undefined;
  const t = v.trim();
  if (!t) return undefined;
  return t.slice(0, max);
}

/** Validate request body `frqContext` on the API (client should send {@link buildFrqTutorContextPayload} output). */
export function parseFrqTutorContextPayload(raw: unknown): FrqTutorContextPayload | null {
  if (!raw || typeof raw !== 'object') return null;
  const o = raw as Record<string, unknown>;

  const frqId = Number(o.frqId);
  if (!Number.isFinite(frqId) || frqId < 1) return null;

  const examTitle = typeof o.examTitle === 'string' ? o.examTitle.trim().slice(0, 500) : '';
  if (!examTitle) return null;

  const unit = Number(o.unit);
  if (!Number.isFinite(unit) || unit < 0 || unit > 99) return null;

  const title = typeof o.title === 'string' ? o.title.trim().slice(0, 600) : '';
  if (!title) return null;

  const questionNumber = Number(o.questionNumber);
  if (!Number.isFinite(questionNumber) || questionNumber < 0 || questionNumber > 99) return null;

  const prompt = typeof o.prompt === 'string' ? o.prompt.trim() : '';
  if (!prompt) return null;

  const partsRaw = o.parts;
  if (!Array.isArray(partsRaw) || partsRaw.length === 0) return null;

  const parts: FrqTutorPartPayload[] = [];
  for (const pr of partsRaw.slice(0, 40)) {
    if (!pr || typeof pr !== 'object') return null;
    const p = pr as Record<string, unknown>;
    const label = typeof p.label === 'string' ? p.label.trim().slice(0, 24) : '';
    const text = typeof p.text === 'string' ? p.text : '';
    if (!label || !text.trim()) return null;

    const subRaw = p.subparts;
    let subparts: FrqTutorSubpartPayload[] | undefined;
    if (Array.isArray(subRaw) && subRaw.length > 0) {
      subparts = [];
      for (const sr of subRaw.slice(0, 40)) {
        if (!sr || typeof sr !== 'object') return null;
        const s = sr as Record<string, unknown>;
        const sl = typeof s.label === 'string' ? s.label.trim().slice(0, 24) : '';
        const st = typeof s.text === 'string' ? s.text : '';
        if (!sl || !st.trim()) return null;
        const sp: FrqTutorSubpartPayload = {
          label: sl,
          text: st.slice(0, 12_000),
        };
        const at = s.answerType;
        if (at === 'draw' || at === 'text') sp.answerType = at;
        const pv = Number(s.pointValue);
        if (Number.isFinite(pv)) sp.pointValue = pv;
        const gc = parseOptionalString(s.gradingCriteria, MAX_FIELD);
        if (gc) sp.gradingCriteria = gc;
        const se = parseOptionalString(s.studentExplanation, 4000);
        if (se) sp.studentExplanation = se;
        const aks = parseOptionalString(s.answerKeySummary, 8000);
        if (aks) sp.answerKeySummary = aks;
        const riu = parseOptionalString(s.referenceImageUrl, 2000);
        if (riu) sp.referenceImageUrl = riu;
        const vu = parseOptionalString(s.videoUrl, 2000);
        if (vu) sp.videoUrl = vu;
        subparts.push(sp);
      }
    }

    const part: FrqTutorPartPayload = {
      label,
      text: text.slice(0, 12_000),
    };
    const pat = p.answerType;
    if (pat === 'draw' || pat === 'text') part.answerType = pat;
    const ppv = Number(p.pointValue);
    if (Number.isFinite(ppv)) part.pointValue = ppv;
    const pgc = parseOptionalString(p.gradingCriteria, MAX_FIELD);
    if (pgc) part.gradingCriteria = pgc;
    const pse = parseOptionalString(p.studentExplanation, 4000);
    if (pse) part.studentExplanation = pse;
    const pak = parseOptionalString(p.answerKeySummary, 8000);
    if (pak) part.answerKeySummary = pak;
    const tiu = parseOptionalString(p.templateImageUrl, 2000);
    if (tiu) part.templateImageUrl = tiu;
    const refu = parseOptionalString(p.referenceImageUrl, 2000);
    if (refu) part.referenceImageUrl = refu;
    const vid = parseOptionalString(p.videoUrl, 2000);
    if (vid) part.videoUrl = vid;
    if (subparts?.length) part.subparts = subparts;

    parts.push(part);
  }

  const out: FrqTutorContextPayload = {
    frqId,
    examTitle,
    unit,
    title,
    questionNumber,
    prompt: prompt.slice(0, MAX_FIELD),
    parts,
  };

  const et = parseOptionalString(o.expertTip, 4000);
  if (et) out.expertTip = et;
  const sin = parseOptionalString(o.stimulusImageNote, 2000);
  if (sin) out.stimulusImageNote = sin;

  const td = o.tableData;
  if (td && typeof td === 'object') {
    const tdo = td as Record<string, unknown>;
    const headers = tdo.headers;
    if (Array.isArray(headers) && headers.every((h) => typeof h === 'string')) {
      const rows = tdo.rows;
      if (Array.isArray(rows)) {
        const safeRows: (string | number)[][] = [];
        for (const row of rows.slice(0, 80)) {
          if (!Array.isArray(row)) continue;
          const r: (string | number)[] = [];
          for (const cell of row.slice(0, 40)) {
            if (typeof cell === 'string' || typeof cell === 'number') r.push(cell);
          }
          if (r.length > 0) safeRows.push(r);
        }
        out.tableData = {
          headers: (headers as string[]).slice(0, 40).map((h) => h.slice(0, 400)),
          rows: safeRows,
          ...(tdo.rowHeaders === true ? { rowHeaders: true } : {}),
          ...(tdo.playerNames &&
          typeof tdo.playerNames === 'object' &&
          tdo.playerNames != null &&
          typeof (tdo.playerNames as { row?: unknown }).row === 'string' &&
          typeof (tdo.playerNames as { column?: unknown }).column === 'string'
            ? {
                playerNames: {
                  row: String((tdo.playerNames as { row: string }).row).slice(0, 200),
                  column: String((tdo.playerNames as { column: string }).column).slice(0, 200),
                },
              }
            : {}),
        };
      }
    }
  }

  return out;
}
