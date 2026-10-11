import type { Question } from '@/data/questionBanks/types';

export type PacketKeyTerm = {
  term: string;
  definition: string;
};

export type PacketExplainer = {
  eli5: string;
  analogy: string;
  commonMistake: string;
};

export type PracticePacketChapter = {
  lessonId: string;
  lessonName: string;
  /** Unit this chapter’s misses belong to (for multi-unit packets). */
  unitNumber: number;
  missCount: number;
  keyTerms: PacketKeyTerm[];
  missedQuestions: Question[];
  /** Wrong letter the student picked, keyed by question id */
  selectedLetters: Record<number, string>;
  explainer: PacketExplainer | null;
  checkQuestions: Question[];
};

export type PracticePacket = {
  subject: string;
  unitNumber: number;
  /** Units included when this packet was built (may be multi-unit). */
  unitNumbers?: number[];
  focusMap: { lessonId: string; lessonName: string; missCount: number }[];
  chapters: PracticePacketChapter[];
  builtAt: number;
};

export const PRACTICE_PACKET_MAX_CHAPTERS = 3;
export const PRACTICE_PACKET_MAX_TERMS = 6;
export const PRACTICE_PACKET_SESSION_KEY = 'apdojo:practicePacket:v1';
