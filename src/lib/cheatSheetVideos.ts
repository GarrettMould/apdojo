import { videos, type Question, type Video } from '@/data/videos';
import {
  govUnitSupremeCourtCases,
  type GovSupremeCourtCase,
} from '@/data/apGovTerms';
import type { CourseSubject } from '@/lib/courseSubject';
import { cheatSheetUrlForUnit } from '@/lib/courseSubject';

/** Numeric watch route: `/videos/812001` */
export type CheatSheetWatchVideo = {
  watchId: string;
  title: string;
  description?: string;
  videoUrl: string;
  unit: number;
  subject: CourseSubject;
  questions: Question[];
  backHref: string;
  /** Poster seek for SCOTUS previews */
  videoPosterTimeSeconds?: number;
  kind: 'stats' | 'scotus' | 'macro' | 'micro';
  scotusCaseId?: string;
  videoSlug?: string;
};

const STATS_WATCH_IDS: Record<string, string> = {
  'stats-u1-vid1': '811001',
  'stats-u1-vid2': '811002',
  'stats-u2-vid1': '812001',
  'stats-u2-vid2': '812002',
  'stats-u3-vid1': '813001',
  'stats-u3-vid2': '813002',
};

/** Stable numeric ids for SCOTUS case videos on cheat sheets. */
const SCOTUS_WATCH_IDS: Record<string, string> = {
  'marbury-v-madison-1803': '821001',
  'mcculloch-v-maryland-1819': '821002',
  'united-states-v-lopez-1995': '821003',
  'baker-v-carr-1962': '822001',
  'shaw-v-reno-1993': '822002',
  'engel-v-vitale-1962': '823001',
  'wisconsin-v-yoder-1972': '823002',
  'tinker-v-des-moines-1969': '823003',
  'new-york-times-v-united-states-1971': '823004',
  'schenck-v-united-states-1919': '823005',
  'gideon-v-wainwright-1963': '823006',
  'roe-v-wade-1973': '823007',
  'mcdonald-v-chicago-2010': '823008',
  'brown-v-board-of-education-1954': '823009',
  'citizens-united-v-fec-2010': '825001',
};

type EconCourse = 'macro' | 'micro';

/** `${course}:${videoSlug}` → watch id (e.g. macro:demand-law-curves-schedules → 831004) */
const ECON_WATCH_IDS: Record<string, string> = {};
/** watch id → resolved watch payload */
const WATCH_BY_ID: Record<string, CheatSheetWatchVideo> = {};

function econWatchKey(course: EconCourse, videoSlug: string): string {
  return `${course}:${videoSlug}`;
}

function buildEconWatchMaps(): void {
  const configs: Array<{ course: EconCourse; label: string; prefix: string }> = [
    { course: 'macro', label: 'AP Macroeconomics', prefix: '83' },
    { course: 'micro', label: 'AP Microeconomics', prefix: '84' },
  ];

  for (const { course, label, prefix } of configs) {
    const courseVideos = videos.filter(
      (v) => v.subjects.includes(label) && v.id !== 'mcq-explanations',
    );

    const byUnit = new Map<string, Video[]>();
    for (const v of courseVideos) {
      const unit = v.unit || '1';
      if (!byUnit.has(unit)) byUnit.set(unit, []);
      byUnit.get(unit)!.push(v);
    }

    const sortedUnits = [...byUnit.keys()].sort(
      (a, b) => parseInt(a, 10) - parseInt(b, 10),
    );

    for (const unit of sortedUnits) {
      const unitVideos = byUnit.get(unit)!;
      unitVideos.sort((a, b) => {
        const aLesson = a.lessonIDS[0] ? parseFloat(a.lessonIDS[0]) : 0;
        const bLesson = b.lessonIDS[0] ? parseFloat(b.lessonIDS[0]) : 0;
        return aLesson - bLesson;
      });

      const unitNum = parseInt(unit, 10);
      unitVideos.forEach((video, idx) => {
        const watchId = `${prefix}${unitNum}${String(idx + 1).padStart(3, '0')}`;
        ECON_WATCH_IDS[econWatchKey(course, video.videoSlug)] = watchId;
        WATCH_BY_ID[watchId] = {
          watchId,
          title: video.title,
          description: video.description,
          videoUrl: video.videoUrl,
          unit: Number.isFinite(unitNum) ? unitNum : 1,
          subject: course,
          questions: video.questions ?? [],
          backHref: cheatSheetUrlForUnit(course, Number.isFinite(unitNum) ? unitNum : 1),
          kind: course,
          videoSlug: video.videoSlug,
        };
      });
    }
  }
}

function statsVideoToWatch(video: Video): CheatSheetWatchVideo | null {
  const watchId = STATS_WATCH_IDS[video.id];
  if (!watchId) return null;
  const unit = parseInt(video.unit, 10);
  return {
    watchId,
    title: video.title,
    description: video.description,
    videoUrl: video.videoUrl,
    unit: Number.isFinite(unit) ? unit : 1,
    subject: 'stats',
    questions: video.questions ?? [],
    backHref: cheatSheetUrlForUnit('stats', Number.isFinite(unit) ? unit : 1),
    kind: 'stats',
    videoSlug: video.videoSlug,
  };
}

function scotusCaseToWatch(courtCase: GovSupremeCourtCase): CheatSheetWatchVideo | null {
  if (!courtCase.videoUrl) return null;
  const watchId = SCOTUS_WATCH_IDS[courtCase.id];
  if (!watchId) return null;
  return {
    watchId,
    title: `${courtCase.caseName} (${courtCase.year})`,
    description: courtCase.summary,
    videoUrl: courtCase.videoUrl,
    unit: courtCase.unit,
    subject: 'gov',
    questions: [],
    backHref: cheatSheetUrlForUnit('gov', courtCase.unit),
    videoPosterTimeSeconds: courtCase.videoPosterTimeSeconds,
    kind: 'scotus',
    scotusCaseId: courtCase.id,
  };
}

function registerStatsAndScotusWatchVideos(): void {
  for (const video of videos) {
    if (!video.subjects.includes('AP Statistics')) continue;
    const mapped = statsVideoToWatch(video);
    if (mapped) WATCH_BY_ID[mapped.watchId] = mapped;
  }

  for (const cases of Object.values(govUnitSupremeCourtCases)) {
    for (const courtCase of cases) {
      const mapped = scotusCaseToWatch(courtCase);
      if (mapped) WATCH_BY_ID[mapped.watchId] = mapped;
    }
  }
}

buildEconWatchMaps();
registerStatsAndScotusWatchVideos();

export function isCheatSheetWatchId(value: string): boolean {
  return /^\d{6}$/.test(value);
}

export function getStatsVideoWatchId(videoId: string): string | undefined {
  return STATS_WATCH_IDS[videoId];
}

export function getScotusVideoWatchId(caseId: string): string | undefined {
  return SCOTUS_WATCH_IDS[caseId];
}

export function getEconVideoWatchId(
  videoSlug: string,
  course: EconCourse,
): string | undefined {
  return ECON_WATCH_IDS[econWatchKey(course, videoSlug)];
}

export function getCheatSheetWatchVideo(watchId: string): CheatSheetWatchVideo | null {
  if (!isCheatSheetWatchId(watchId)) return null;
  return WATCH_BY_ID[watchId] ?? null;
}

export function cheatSheetWatchPath(watchId: string): string {
  return `/videos/${watchId}`;
}
