const GOV_FRQ_WALKTHROUGH_BASE =
  'https://apdojovideos.s3.ap-southeast-2.amazonaws.com/ap_gov';

/**
 * Unit → question number (1-based) → walkthrough MP4 URL.
 * Add entries as walkthroughs are recorded.
 */
const GOV_FRQ_WALKTHROUGH_BY_UNIT: Record<number, Partial<Record<number, string>>> = {
  1: {
    1: `${GOV_FRQ_WALKTHROUGH_BASE}/ap_gov_u1_frq_1.mp4`,
  },
};

/** Walkthrough video for a Gov unit FRQ pack question, if available. */
export function getGovFrqWalkthroughVideoUrl(
  unitNumber: number,
  questionNumber: number,
): string | undefined {
  return GOV_FRQ_WALKTHROUGH_BY_UNIT[unitNumber]?.[questionNumber];
}
