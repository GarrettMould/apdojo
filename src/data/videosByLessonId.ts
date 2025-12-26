import { videos, Video } from './videos';

/**
 * Helper function to get videos organized by lessonID.
 * Returns a Map where keys are lessonIDs and values are arrays of videos.
 * 
 * Since videos can have multiple lessonIDS, a video may appear under multiple lessonIDs.
 */
export function getVideosByLessonId(): Map<string, Video[]> {
  const videosByLessonId = new Map<string, Video[]>();

  videos.forEach(video => {
    video.lessonIDS.forEach(lessonId => {
      if (!videosByLessonId.has(lessonId)) {
        videosByLessonId.set(lessonId, []);
      }
      videosByLessonId.get(lessonId)!.push(video);
    });
  });

  return videosByLessonId;
}

/**
 * Get all videos for a specific lessonID.
 * Returns an empty array if no videos are found.
 */
export function getVideosForLessonId(lessonId: string): Video[] {
  const videosByLessonId = getVideosByLessonId();
  return videosByLessonId.get(lessonId) || [];
}

/**
 * Get all videos for multiple lessonIDs.
 * Returns a flattened array of unique videos (a video may match multiple lessonIDs).
 */
export function getVideosForLessonIds(lessonIds: string[]): Video[] {
  const videosByLessonId = getVideosByLessonId();
  const videoSet = new Set<Video>();
  
  lessonIds.forEach(lessonId => {
    const videos = videosByLessonId.get(lessonId) || [];
    videos.forEach(video => videoSet.add(video));
  });

  return Array.from(videoSet);
}

/**
 * Pre-computed map of videos by lessonID for faster lookups.
 * Use this if you need to access videos by lessonID frequently.
 */
export const videosByLessonIdMap = getVideosByLessonId();

