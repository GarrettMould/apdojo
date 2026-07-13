import { videos, type Video } from '@/data/videos';

const STATS_SUBJECT = 'AP Statistics';

/** Unit cheat sheet videos for AP Stats, shown below the table of contents on each unit page. */
export function getStatsUnitCheatSheetVideos(unitNumber: number): Video[] {
  return videos
    .filter((v) => v.subjects.includes(STATS_SUBJECT) && v.unit === String(unitNumber))
    .sort((a, b) => {
      const aVid = a.id.match(/vid(\d+)/i)?.[1];
      const bVid = b.id.match(/vid(\d+)/i)?.[1];
      if (aVid && bVid) return parseInt(aVid, 10) - parseInt(bVid, 10);
      const aLesson = a.lessonIDS[0] ? parseFloat(a.lessonIDS[0]) : 0;
      const bLesson = b.lessonIDS[0] ? parseFloat(b.lessonIDS[0]) : 0;
      return aLesson - bLesson;
    });
}
