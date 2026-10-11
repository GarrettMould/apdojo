const STATS_FRQ_WALKTHROUGH_BASE_BY_UNIT: Record<number, string> = {
  1: 'https://apdojovideos.s3.ap-southeast-2.amazonaws.com/stats/unit_1',
  2: 'https://apdojovideos.s3.ap-southeast-2.amazonaws.com/stats/unit_2',
  3: 'https://apdojovideos.s3.ap-southeast-2.amazonaws.com/stats/unit_3',
  4: 'https://apdojovideos.s3.ap-southeast-2.amazonaws.com/stats/unit_4',
};

/**
 * Unit → question number (1-based) → walkthrough video URL.
 * Add entries as walkthroughs are recorded.
 */
const STATS_FRQ_WALKTHROUGH_BY_UNIT: Record<number, Partial<Record<number, string>>> = {
  1: {
    1: `${STATS_FRQ_WALKTHROUGH_BASE_BY_UNIT[1]}/unit+1+-+frq+1.mp4`,
    2: `${STATS_FRQ_WALKTHROUGH_BASE_BY_UNIT[1]}/unit+1+-+frq+2.mp4`,
  },
  2: {
    1: `${STATS_FRQ_WALKTHROUGH_BASE_BY_UNIT[2]}/Unit+2+-+FRQ+1.mp4`,
    2: `${STATS_FRQ_WALKTHROUGH_BASE_BY_UNIT[2]}/Unit+2+-+FRQ+2.mp4`,
  },
  3: {
    1: `${STATS_FRQ_WALKTHROUGH_BASE_BY_UNIT[3]}/FRQ+1.mp4`,
    2: `${STATS_FRQ_WALKTHROUGH_BASE_BY_UNIT[3]}/FRQ+2.mp4`,
  },
  4: {
    1: `${STATS_FRQ_WALKTHROUGH_BASE_BY_UNIT[4]}/Unit+4+-+FRQ+1.mp4`,
    2: `${STATS_FRQ_WALKTHROUGH_BASE_BY_UNIT[4]}/Unit+4+-+FRQ+2.mp4`,
  },
};

/** Walkthrough video for a Stats unit FRQ pack question, if available. */
export function getStatsFrqWalkthroughVideoUrl(
  unitNumber: number,
  questionNumber: number,
): string | undefined {
  return STATS_FRQ_WALKTHROUGH_BY_UNIT[unitNumber]?.[questionNumber];
}
