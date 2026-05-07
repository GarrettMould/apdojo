import { redirect } from 'next/navigation';

/** Legacy path — same intro + FRQ flow as unit MCQ previews with `type=frq`. */
export default function ApGovFrqPracticePacksRedirect() {
  redirect('/unit-test-preview?subject=gov&unit=1&type=frq');
}
