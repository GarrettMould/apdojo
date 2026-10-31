'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SeasonPassEntryWideModal } from '@/components/SeasonPassEntryWideModal';
import { useAuthContext } from '@/contexts/AuthContext';
import { cheatSheetWatchPath, getScotusVideoWatchId } from '@/lib/cheatSheetVideos';
import { hasValidSeasonPass } from '@/lib/utils';

type ScotusCaseVideoProps = {
  /** Cheat-sheet case record id (e.g. `tinker-v-des-moines-1969`). */
  caseRecordId: string;
  caseName: string;
  videoUrl: string;
  posterTimeSeconds?: number;
};

/** Same gate as the Gov cheat sheet: play opens the Season Pass modal unless the student has the Gov pass. */
export function ScotusCaseVideo({ caseRecordId, caseName, videoUrl, posterTimeSeconds }: ScotusCaseVideoProps) {
  const { user, userData } = useAuthContext();
  const router = useRouter();
  const [showSeasonPass, setShowSeasonPass] = useState(false);
  const hasPass = !!(user && userData && hasValidSeasonPass(userData, 'gov'));

  return (
    <>
      <video
        className="aspect-video w-full"
        controls
        playsInline
        preload="metadata"
        src={videoUrl}
        onLoadedMetadata={(e) => {
          if (posterTimeSeconds == null || posterTimeSeconds <= 0) return;
          const v = e.currentTarget;
          if (!v.paused) return;
          v.dataset.posterFrame = '1';
          try {
            v.currentTime = posterTimeSeconds;
          } catch {
            /* seek can fail before data is ready */
          }
        }}
        onPlay={(e) => {
          const v = e.currentTarget;
          if (v.dataset.posterFrame === '1') {
            v.dataset.posterFrame = '0';
            v.currentTime = 0;
          }
          v.pause();
          if (!hasPass) {
            setShowSeasonPass(true);
            return;
          }
          const watchId = getScotusVideoWatchId(caseRecordId);
          if (watchId) router.push(cheatSheetWatchPath(watchId));
        }}
      >
        {caseName} walkthrough
      </video>
      {showSeasonPass ? <SeasonPassEntryWideModal subject="gov" onClose={() => setShowSeasonPass(false)} /> : null}
    </>
  );
}
