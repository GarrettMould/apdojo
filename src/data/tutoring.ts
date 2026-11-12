/**
 * 1-on-1 tutoring with Garrett. Booking, payment, Google Meet links and reminders all happen in Cal.com;
 * AP Dojo only shows the page and the embed.
 *
 * The 4-session pack still has placeholder text; it only shows once its Cal.com link is set.
 */

export const CAL_ORIGIN = 'https://cal.com';

export interface TutoringSessionType {
  id: string;
  name: string;
  price: string;
  /** Shown after the price, e.g. "per hour". */
  priceUnit?: string;
  includes: string[];
  /** Cal.com link in `username/event-slug` form, from env so it can change without a code edit. */
  calLink: string;
}

const SESSION_TYPES: TutoringSessionType[] = [
  {
    id: 'single',
    name: '60-minute session',
    price: '$70',
    priceUnit: 'per hour',
    includes: [
      'One live 60-minute session over Google Meet',
      'We work through real AP questions on what you are stuck on',
      'A short plan for what to practice next on AP Dojo',
    ],
    calLink: process.env.NEXT_PUBLIC_CAL_LINK ?? '',
  },
  {
    id: 'pack',
    name: '4-session pack',
    price: '[PRICE]',
    includes: ['Four live 60-minute sessions over Google Meet', '[PACK DETAILS]'],
    calLink: process.env.NEXT_PUBLIC_CAL_LINK_PACK ?? '',
  },
];

/** The single session always shows (with a placeholder link until env is set); the pack only once it has a link. */
export const TUTORING_SESSION_TYPES: TutoringSessionType[] = SESSION_TYPES.filter(
  (s) => s.id === 'single' || s.calLink,
);

export function calBookingUrl(calLink: string): string {
  return calLink ? `${CAL_ORIGIN}/${calLink}` : CAL_ORIGIN;
}

export const TUTOR = {
  name: 'Garrett M.',
  yearsTeaching: '8+',
  courses: 'AP Macroeconomics and AP Microeconomics',
  hoursTutored: '1,000+',
  fiveStarReviews: '250+',
  averageRating: '5.0',
  hourlyRate: '$70',
};

export const FREE_SEASON_PASS_LINE = 'Every tutoring client gets a free AP Macro or AP Micro Season Pass.';

export const TUTORING_FAQ: { question: string; answer: string }[] = [
  {
    question: 'How do sessions work?',
    answer: 'Live over Google Meet. The link is in your confirmation email.',
  },
  {
    question: 'Can a parent book for their student?',
    answer:
      'Yes, and we recommend it. Add the parent\'s email when booking so both of you get the confirmation.',
  },
  {
    question: 'What if I need to cancel?',
    answer:
      'Cancel at least 24 hours before your scheduled lesson for a full refund. Cancellations within 24 hours of the lesson are not refunded. You can cancel or reschedule from the link in your confirmation email.',
  },
  { question: 'What courses do you tutor?', answer: 'AP Macroeconomics and AP Microeconomics.' },
  {
    question: 'How do I prepare?',
    answer: 'Bring the questions or topics you\'re stuck on, and any recent tests or FRQs.',
  },
];
