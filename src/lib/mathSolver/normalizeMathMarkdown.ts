/**
 * Normalize math markup so remark-math + KaTeX can render it.
 * Models often emit \(...\) / \[...\] or leave LaTeX commands bare.
 */

/** Convert TeX-style delimiters to $ / $$ that remark-math understands. */
export function normalizeMathDelimiters(raw: string): string {
  let s = raw;

  // Display: \[ ... \]  or  \\[ ... \\]
  s = s.replace(/\\\[([\s\S]*?)\\\]/g, (_m, inner: string) => `$$${inner}$$`);

  // Inline: \( ... \)
  s = s.replace(/\\\(([\s\S]*?)\\\)/g, (_m, inner: string) => `$${inner}$`);

  // Common begin/end environments → display math
  s = s.replace(
    /\\begin\{(?:equation\*?|align\*?|displaymath)\}([\s\S]*?)\\end\{(?:equation\*?|align\*?|displaymath)\}/g,
    (_m, inner: string) => `$$${inner}$$`,
  );

  return s;
}

/**
 * If a line looks like bare TeX (has \frac, \sqrt, etc. and no $ yet), wrap it in $$.
 * Conservative: only whole-line candidates.
 */
export function wrapBareLatexLines(raw: string): string {
  const TEX_CMD = /\\(frac|dfrac|tfrac|sqrt|sum|int|lim|cdot|times|div|pm|mp|leq|geq|neq|approx|implies|Rightarrow|rightarrow|left|right|text|mathrm|mathbf|overline|hat|bar|vec)\b/;

  return raw
    .split('\n')
    .map((line) => {
      const t = line.trim();
      if (!t) return line;
      if (t.includes('$')) return line;
      if (!TEX_CMD.test(t)) return line;
      // Avoid wrapping markdown headings / list markers alone
      if (/^#{1,6}\s/.test(t) || /^[-*]\s+$/.test(t)) return line;
      return `$$${t}$$`;
    })
    .join('\n');
}

/** Strip zero-width / bidi junk that breaks KaTeX parsing. */
export function stripInvisibleMathJunk(raw: string): string {
  return raw.replace(/[\u200B-\u200D\uFEFF\u2060]/g, '');
}

export function normalizeMathMarkdown(raw: string): string {
  return wrapBareLatexLines(normalizeMathDelimiters(stripInvisibleMathJunk(raw)));
}
