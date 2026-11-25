/** The email a family gets when the tutor shares a lesson's notes. Server only. */
import { FAMILY_SKILL_LABELS, LESSON_NOTE_FIELDS, type SharedLessonNotes, type SkillLevel } from '@/lib/tutoringLessons';

const DEFAULT_SITE_URL = 'https://apdojo.com';

const LEVEL_COLORS: Record<SkillLevel, string> = { 1: '#ef4444', 2: '#f59e0b', 3: '#10b981' };

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Plain text with line breaks, as safe HTML. */
function paragraphs(text: string): string {
  return escapeHtml(text.trim()).replace(/\n/g, '<br/>');
}

export function lessonNotesEmail({
  shared,
  lessonStart,
  isUpdate,
  siteUrl = DEFAULT_SITE_URL,
}: {
  shared: SharedLessonNotes;
  lessonStart: string | null;
  isUpdate: boolean;
  /** Where the email's links point: the live site, or the local server in development. */
  siteUrl?: string;
}): { subject: string; html: string; text: string } {
  const SITE_URL = siteUrl;
  const date = lessonStart
    ? new Date(lessonStart).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', timeZone: 'America/New_York' })
    : null;
  const course = shared.course ?? 'tutoring';
  const subject = `${isUpdate ? 'Updated lesson notes' : 'Lesson notes'}: ${course}${date ? `, ${date}` : ''}`;

  const sections = LESSON_NOTE_FIELDS.filter(({ key }) => key !== 'summary' && shared.notes[key].trim())
    .map(
      ({ key, familyLabel }) => `
        <h3 style="margin: 24px 0 6px; font-size: 13px; letter-spacing: 0.08em; text-transform: uppercase; color: #64748b;">${escapeHtml(familyLabel)}</h3>
        <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #1e293b;">${paragraphs(shared.notes[key])}</p>`,
    )
    .join('');

  const skills = shared.skills.length
    ? `
        <h3 style="margin: 24px 0 8px; font-size: 13px; letter-spacing: 0.08em; text-transform: uppercase; color: #64748b;">Skills</h3>
        <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse;">
          ${shared.skills
            .map(
              (s) => `
            <tr>
              <td style="padding: 6px 0; font-size: 15px; color: #1e293b;">
                <span style="display: inline-block; width: 9px; height: 9px; border-radius: 50%; background: ${LEVEL_COLORS[s.level]}; margin-right: 8px;"></span>${escapeHtml(s.skill)}
              </td>
              <td style="padding: 6px 0; font-size: 13px; color: #64748b; text-align: right; white-space: nowrap;">${FAMILY_SKILL_LABELS[s.level]}</td>
            </tr>`,
            )
            .join('')}
        </table>`
    : '';

  const boardCount = shared.boards.length;
  const boardsLine = boardCount
    ? `${boardCount === 1 ? 'The whiteboard' : `${boardCount} whiteboards`} from this lesson ${boardCount === 1 ? 'is' : 'are'} on your My Bookings page.`
    : '';
  const boardsHtml = boardsLine
    ? `
        <p style="margin: 24px 0 0; padding: 14px 16px; background: #faf7f0; border: 1px solid #eadbb8; border-radius: 12px; font-size: 14px; color: #44403c;">${escapeHtml(boardsLine)}</p>`
    : '';

  const practice = shared.practice;
  const practiceUrl = practice ? `${SITE_URL}${practice.path}` : null;
  const practiceHtml = practice
    ? `
        <div style="margin: 24px 0 0; padding: 18px 20px; background: #eff6ff; border: 1px solid #dbeafe; border-radius: 16px;">
          <p style="margin: 0 0 4px; font-size: 15px; font-weight: 700; color: #0f172a;">Practice set: ${practice.count} questions</p>
          <p style="margin: 0 0 14px; font-size: 14px; color: #475569;">Picked for what we worked on today. About ${Math.max(5, Math.round(practice.count * 1.5))} minutes.</p>
          <a href="${practiceUrl}" style="display: inline-block; padding: 11px 20px; background: #2563eb; color: #ffffff; text-decoration: none; border-radius: 10px; font-weight: 700; font-size: 15px;">Start practice</a>
        </div>`
    : '';

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; color: #1e293b;">
      <p style="margin: 0; font-size: 12px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #2563eb;">AP Dojo tutoring</p>
      <h1 style="margin: 8px 0 4px; font-size: 26px; font-weight: 900; letter-spacing: -0.02em; color: #0f172a;">${isUpdate ? 'Updated lesson notes' : 'Lesson notes'}</h1>
      <p style="margin: 0 0 24px; font-size: 15px; color: #64748b;">Here are the notes from your ${escapeHtml(course)} session${date ? ` on ${escapeHtml(date)}` : ''}.</p>
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px 22px;">
        <p style="margin: 0; font-size: 16px; line-height: 1.6; color: #0f172a;">${paragraphs(shared.notes.summary)}</p>
      </div>
      ${sections}
      ${practiceHtml}
      ${skills}
      ${boardsHtml}
      <div style="margin: 32px 0 8px;">
        <a href="${SITE_URL}/my-bookings" style="display: inline-block; padding: 12px 22px; background: #0f172a; color: #ffffff; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 15px;">See all your lessons</a>
      </div>
      <p style="margin: 24px 0 0; font-size: 14px; color: #64748b;">Questions about the lesson? Just reply to this email.<br/>Garrett</p>
    </div>`;

  const text = [
    isUpdate ? 'Updated lesson notes' : 'Lesson notes',
    `${course}${date ? `, ${date}` : ''}`,
    '',
    shared.notes.summary.trim(),
    ...LESSON_NOTE_FIELDS.filter(({ key }) => key !== 'summary' && shared.notes[key].trim()).flatMap(({ key, familyLabel }) => [
      '',
      familyLabel.toUpperCase(),
      shared.notes[key].trim(),
    ]),
    ...(shared.skills.length ? ['', 'SKILLS', ...shared.skills.map((s) => `- ${s.skill}: ${FAMILY_SKILL_LABELS[s.level]}`)] : []),
    ...(boardsLine ? ['', boardsLine] : []),
    ...(practice ? ['', `PRACTICE SET (${practice.count} questions): ${practiceUrl}`] : []),
    '',
    `See all your lessons: ${SITE_URL}/my-bookings`,
    '',
    'Questions about the lesson? Just reply to this email.',
    'Garrett',
  ].join('\n');

  return { subject, html, text };
}
