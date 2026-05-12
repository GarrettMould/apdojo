export type McqStemAttributionSplit = {
  /** Stem / prompt text before the trailing citation (may include markdown). */
  stem: string;
  /** Citation text only, without leading dash (handy for labels / search). */
  attribution: string | null;
  /**
   * Full trailing line as in the source, e.g. `—Brutus No. 1` or `--Federalist No. 10`,
   * trimmed at the start only so the dash stays. Omitted when there is no match.
   */
  attributionLine: string | null;
  /**
   * Index in `raw.trimEnd()` where `attributionLine` begins (split highlights here).
   * `null` when `attributionLine` is null.
   */
  attributionStartIndex: number | null;
};

/**
 * Many AP Gov (and some other) stems end with a primary-source line such as
 * `...long quote... —Brutus No. 1`. Split so the citation can render on its own line
 * in normal weight, without one-off rules per document.
 */
export function splitMcqStemAttribution(raw: string): McqStemAttributionSplit {
  const empty: McqStemAttributionSplit = {
    stem: raw,
    attribution: null,
    attributionLine: null,
    attributionStartIndex: null,
  };

  const trimmed = raw.trimEnd();
  const m = trimmed.match(/\s*(?:—|--|–)\s*([^\n]+?)\s*$/u);
  if (!m || m.index === undefined || m.index < 1) {
    return empty;
  }

  const stem = trimmed.slice(0, m.index).trimEnd();
  const attribution = (m[1] ?? '').trim();
  const attributionLine = trimmed.slice(m.index).trimStart();
  const attributionStartIndex = m.index;

  if (!stem || !attribution || !attributionLine) {
    return empty;
  }

  return {
    stem,
    attribution,
    attributionLine,
    attributionStartIndex,
  };
}
