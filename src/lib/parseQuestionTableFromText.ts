export type ParsedQuestionTable = {
  headers: string[];
  rows: string[][];
};

function splitPipeCells(line: string): string[] {
  return line
    .split('|')
    .map((c) => c.trim())
    .filter((c) => c.length > 0);
}

function isMarkdownSeparatorRow(line: string): boolean {
  const cells = splitPipeCells(line);
  if (cells.length === 0) return false;
  return cells.every((c) => /^:?-{3,}:?$/.test(c));
}

function isStrictMarkdownPipeLine(line: string): boolean {
  const t = line.trim();
  return t.startsWith('|') && t.endsWith('|');
}

/**
 * Parse GitHub-style markdown tables: lines that start and end with `|`.
 * Supports an optional `| --- | --- |` separator row after the header.
 */
function tryParseStrictMarkdownTable(lines: string[]): {
  tableData: ParsedQuestionTable;
  tableStartIndex: number;
  tableEndIndex: number;
} | null {
  let tableStartIndex = -1;
  let tableEndIndex = -1;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (isStrictMarkdownPipeLine(line)) {
      if (tableStartIndex === -1) tableStartIndex = i;
      tableEndIndex = i;
    } else if (tableStartIndex !== -1 && line.length > 0) {
      break;
    }
  }

  if (tableStartIndex === -1 || tableEndIndex === -1) return null;

  const tableLines = lines.slice(tableStartIndex, tableEndIndex + 1).map((l) => l.trim());
  if (tableLines.length < 2) return null;

  const headers = splitPipeCells(tableLines[0]);
  if (headers.length === 0) return null;

  const n = headers.length;
  let rowStart = 1;
  if (tableLines.length > 1 && isMarkdownSeparatorRow(tableLines[1])) {
    rowStart = 2;
  }

  const rows: string[][] = [];
  for (let r = rowStart; r < tableLines.length; r++) {
    const cells = splitPipeCells(tableLines[r]);
    if (cells.length !== n) return null;
    rows.push(cells);
  }

  if (rows.length === 0) return null;

  return {
    tableData: { headers, rows },
    tableStartIndex,
    tableEndIndex,
  };
}

/**
 * Parse "loose" pipe tables (common in content): `Col A | Col B | Col C` without leading/trailing `|`.
 * Looks for a maximal contiguous block of lines with the same column count (≥ 2 columns, ≥ 2 lines).
 */
function tryParseLoosePipeTable(lines: string[]): {
  tableData: ParsedQuestionTable;
  tableStartIndex: number;
  tableEndIndex: number;
} | null {
  let best: {
    tableData: ParsedQuestionTable;
    tableStartIndex: number;
    tableEndIndex: number;
    score: number;
  } | null = null;

  for (let i = 0; i < lines.length; i++) {
    const headerCells = splitPipeCells(lines[i].trim());
    if (headerCells.length < 2) continue;

    const n = headerCells.length;
    const bodyRows: string[][] = [];
    let j = i + 1;

    if (j < lines.length && isMarkdownSeparatorRow(lines[j])) {
      j++;
    }

    while (j < lines.length) {
      const raw = lines[j];
      const trimmed = raw.trim();
      if (!trimmed) break;

      const cells = splitPipeCells(trimmed);
      if (cells.length !== n) break;
      bodyRows.push(cells);
      j++;
    }

    if (bodyRows.length === 0) continue;

    const tableEndIndex = j - 1;
    const score = tableEndIndex - i + 1;
    if (!best || score > best.score) {
      best = {
        tableData: { headers: headerCells, rows: bodyRows },
        tableStartIndex: i,
        tableEndIndex,
        score,
      };
    }
  }

  if (!best) return null;
  return {
    tableData: best.tableData,
    tableStartIndex: best.tableStartIndex,
    tableEndIndex: best.tableEndIndex,
  };
}

/**
 * Extract a table from MCQ question stem text so it can be rendered as HTML.
 * Supports strict markdown pipe tables and loose `A | B | C` rows (e.g. AP Gov practice data).
 */
export function parseQuestionTableFromText(text: string): {
  tableData: ParsedQuestionTable | null;
  textWithoutTable: string;
} {
  const lines = text.split('\n');

  const strict = tryParseStrictMarkdownTable(lines);
  if (strict) {
    const textWithoutTable = [...lines.slice(0, strict.tableStartIndex), ...lines.slice(strict.tableEndIndex + 1)]
      .join('\n')
      .trim();
    return { tableData: strict.tableData, textWithoutTable };
  }

  const loose = tryParseLoosePipeTable(lines);
  if (loose) {
    const textWithoutTable = [...lines.slice(0, loose.tableStartIndex), ...lines.slice(loose.tableEndIndex + 1)]
      .join('\n')
      .trim();
    return { tableData: loose.tableData, textWithoutTable };
  }

  return { tableData: null, textWithoutTable: text };
}
