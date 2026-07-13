const STATS_FRQ_WALKTHROUGH_BASE_BY_UNIT: Record<number, string> = {
  1: 'https://apdojovideos.s3.ap-southeast-2.amazonaws.com/stats/unit_1',
  2: 'https://apdojovideos.s3.ap-southeast-2.amazonaws.com/stats/unit_2',
};

/**
 * Unit → question number (1-based) → walkthrough video URL.
 * Add entries as walkthroughs are recorded.
 */
const STATS_FRQ_WALKTHROUGH_BY_UNIT: Record<number, Partial<Record<number, string>>> = {
  1: {
    1: `${STATS_FRQ_WALKTHROUGH_BASE_BY_UNIT[1]}/Unit+1+FRQ+Practice+Q1.mov`,
    2: `${STATS_FRQ_WALKTHROUGH_BASE_BY_UNIT[1]}/Unit+1+FRQ+Practice+Q2.mov`,
  },
  2: {
    1: `${STATS_FRQ_WALKTHROUGH_BASE_BY_UNIT[2]}/Unit+2+FRQ+Practice+1.mov`,
    2: `${STATS_FRQ_WALKTHROUGH_BASE_BY_UNIT[2]}/Unit+2+FRQ+Practice+2.mov`,
  },
};

/** Walkthrough video for a Stats unit FRQ pack question, if available. */
export function getStatsFrqWalkthroughVideoUrl(
  unitNumber: number,
  questionNumber: number,
): string | undefined {
  return STATS_FRQ_WALKTHROUGH_BY_UNIT[unitNumber]?.[questionNumber];
}
