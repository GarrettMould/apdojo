/**
 * AP U.S. Government — unit flashcards (warm-up + ultimate review).
 * List cards are derived from `apGovTerms.ts` by lesson; RULE / SCOTUS rapid-fire cards are authored here.
 */

import type { KeyTerm } from '@/data/allContent';
import { keyTerms as apGovTerms } from '@/data/apGovTerms';
import type { UnitFlashcardData } from '@/data/unitFlashcards';

function govTermsToListCards(terms: KeyTerm[], lessonKey: string): UnitFlashcardData[] {
  return terms.map((kt) => ({
    id: `u1g-${lessonKey}-list-${kt.id}`,
    type: 'list',
    tag: 'LIST',
    front: kt.term,
    back: kt.definition,
  }));
}

function getGovUnit1TermsByLesson(): Record<string, KeyTerm[]> {
  const byLesson: Record<string, KeyTerm[]> = {};
  apGovTerms
    .filter((t) => t.unit === 1 && t.lessonIDs && t.lessonIDs.length > 0)
    .forEach((t) => {
      t.lessonIDs!.forEach((lid) => {
        if (!byLesson[lid]) byLesson[lid] = [];
        byLesson[lid].push(t);
      });
    });
  return byLesson;
}

const govUnit1TermsByLesson = getGovUnit1TermsByLesson();

const lesson1_1Rapid: UnitFlashcardData[] = [
  {
    id: 'u1g-1.1-rf1',
    type: 'rapid-fire',
    tag: 'RULE',
    front: 'How does the Declaration of Independence reflect the concept of Natural Rights?',
    back: 'It asserts that all men are "endowed by their Creator with certain unalienable Rights," specifically life, liberty, and the pursuit of happiness.',
  },
  {
    id: 'u1g-1.1-rf2',
    type: 'rapid-fire',
    tag: 'RULE',
    front: 'What is the ultimate expression of Popular Sovereignty in the Declaration?',
    back: "The Right of Revolution: The principle that if a government becomes destructive of the people's rights, the people have the right to alter or abolish it.",
  },
];

const lesson1_2Rapid: UnitFlashcardData[] = [
  {
    id: 'u1g-1.2-rf1',
    type: 'rapid-fire',
    tag: 'RULE',
    front: 'What is the primary difference between Pluralist and Elite democracy?',
    back: 'Pluralism emphasizes group-based activism (interest groups) competing for influence, while Elite democracy emphasizes participation by a small group of wealthy/informed individuals.',
  },
  {
    id: 'u1g-1.2-rf2',
    type: 'rapid-fire',
    tag: 'RULE',
    front: 'How is Participatory democracy visible in modern U.S. state-level politics?',
    back: 'Through Initiatives (citizens proposing laws) and Referendums (citizens voting to approve/reject laws passed by the legislature).',
  },
];

const lesson1_3Rapid: UnitFlashcardData[] = [
  {
    id: 'u1g-1.3-rf1',
    type: 'rapid-fire',
    tag: 'RULE',
    front: 'What was Madison’s main argument in Federalist No. 10 regarding a large republic?',
    back: 'A large republic controls the "mischiefs of faction" because so many different interests (factions) will compete that no single one can dominate the majority.',
  },
  {
    id: 'u1g-1.3-rf2',
    type: 'rapid-fire',
    tag: 'RULE',
    front: 'What was the primary warning in Brutus No. 1?',
    back: 'That a large, centralized government would possess "uncontrollable power," eventually destroying state governments and threatening personal liberty.',
  },
];

const lesson1_5Rapid: UnitFlashcardData[] = [
  {
    id: 'u1g-1.5-rf1',
    type: 'rapid-fire',
    tag: 'RULE',
    front: 'How does Article V reflect the principle of Federalism?',
    back: 'The amendment process requires both levels: Proposal happens at the national level (2/3 of Congress), but Ratification happens at the state level (3/4 of states).',
  },
  {
    id: 'u1g-1.5-rf2',
    type: 'rapid-fire',
    tag: 'RULE',
    front: 'What was the Great (Connecticut) Compromise?',
    back: 'It created a bicameral legislature: The House of Representatives (based on population) and the Senate (equal representation for each state).',
  },
];

const lesson1_6Rapid: UnitFlashcardData[] = [
  {
    id: 'u1g-1.6-rf1',
    type: 'rapid-fire',
    tag: 'RULE',
    front: 'What does Madison mean by "Ambition must be made to counteract ambition"?',
    back: 'In Federalist No. 51, he argues that by giving each branch the "constitutional means" to resist others, the personal interests of officeholders will protect the separation of powers.',
  },
  {
    id: 'u1g-1.6-rf2',
    type: 'rapid-fire',
    tag: 'RULE',
    front: 'How does the Senate check the Executive branch regarding appointments?',
    back: 'Through the power of "Advice and Consent," where the Senate must confirm presidential nominees for positions like Cabinet heads or Supreme Court Justices.',
  },
];

const lesson1_8Rapid: UnitFlashcardData[] = [
  {
    id: 'u1g-1.8-s1',
    type: 'rapid-fire',
    tag: 'SCOTUS',
    front: 'What was the holding in McCulloch v. Maryland (1819)?',
    back: '1. Congress has implied powers under the Necessary and Proper Clause to create a bank.\n2. The Supremacy Clause prevents states from taxing federal institutions.',
  },
  {
    id: 'u1g-1.8-s2',
    type: 'rapid-fire',
    tag: 'SCOTUS',
    front: 'How did U.S. v. Lopez (1995) limit federal power?',
    back: 'It ruled that the Commerce Clause does not grant Congress the power to regulate non-economic activities (like gun possession in school zones) that do not substantially affect interstate commerce.',
  },
];

const lesson1_9Rapid: UnitFlashcardData[] = [
  {
    id: 'u1g-1.9-rf1',
    type: 'rapid-fire',
    tag: 'RULE',
    front: 'Why do states prefer Block Grants over Categorical Grants?',
    back: 'Block grants provide federal funding with minimal restrictions, allowing states greater discretion in how to spend the money within a broad policy area.',
  },
  {
    id: 'u1g-1.9-rf2',
    type: 'rapid-fire',
    tag: 'RULE',
    front: 'How does Federalism create "Multiple Access Points" for citizens?',
    back: 'If citizens fail to influence policy at the national level, they can seek change at the state or local levels (e.g., marijuana legalization or education reform).',
  },
];

function mergeLesson(lessonKey: string, rapid: UnitFlashcardData[]): UnitFlashcardData[] {
  const terms = govUnit1TermsByLesson[lessonKey] ?? [];
  return [...govTermsToListCards(terms, lessonKey), ...rapid];
}

/** Per-lesson decks: AP Gov Unit 1 list cards from `apGovTerms` plus authored RULE / SCOTUS cards. */
export const govUnit1Flashcards: Record<string, UnitFlashcardData[]> = {
  '1.1': mergeLesson('1.1', lesson1_1Rapid),
  '1.2': mergeLesson('1.2', lesson1_2Rapid),
  '1.3': mergeLesson('1.3', lesson1_3Rapid),
  '1.4': mergeLesson('1.4', []),
  '1.5': mergeLesson('1.5', lesson1_5Rapid),
  '1.6': mergeLesson('1.6', lesson1_6Rapid),
  '1.7': mergeLesson('1.7', []),
  '1.8': mergeLesson('1.8', lesson1_8Rapid),
  '1.9': mergeLesson('1.9', lesson1_9Rapid),
};

/** Ordered lesson ids for Unit 1 (matches CED). */
export const GOV_UNIT_1_LESSON_IDS = ['1.1', '1.2', '1.3', '1.4', '1.5', '1.6', '1.7', '1.8', '1.9'] as const;

export function getGovFlashcardsForLesson(unit: number, lessonId: string): UnitFlashcardData[] {
  if (unit !== 1) return [];
  return govUnit1Flashcards[lessonId] ?? [];
}

/**
 * Full Unit 1 review deck: every Unit 1 key term once (LIST), then every RULE / SCOTUS rapid-fire card in lesson order.
 */
export function getGovUnit1UltimateReviewFlashcards(): UnitFlashcardData[] {
  const termCards: UnitFlashcardData[] = apGovTerms
    .filter((t) => t.unit === 1)
    .map((kt) => ({
      id: `u1g-ultimate-term-${kt.id}`,
      type: 'list' as const,
      tag: 'LIST',
      front: kt.term,
      back: kt.definition,
    }));

  const rapidCards: UnitFlashcardData[] = [];
  for (const lid of GOV_UNIT_1_LESSON_IDS) {
    const full = govUnit1Flashcards[lid] ?? [];
    rapidCards.push(...full.filter((c) => c.type === 'rapid-fire'));
  }

  return [...termCards, ...rapidCards];
}
