'use client';

import { useMemo, useState } from 'react';
import { macroV2McqPreviewQuestions } from '@/data/macro/macroV2McqPreview';

const LETTERS = ['A', 'B', 'C', 'D', 'E'] as const;

export default function MacroMcqPreviewPage() {
  const questions = macroV2McqPreviewQuestions;
  const [index, setIndex] = useState(0);
  const q = questions[index];

  const table = useMemo(() => {
    if (!q?.tableData) return null;
    const { headers, rows } = q.tableData;
    return (
      <table style={{ borderCollapse: 'collapse', margin: '12px 0' }}>
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th
                key={i}
                style={{ border: '1px solid #333', padding: '4px 8px', textAlign: 'left' }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td key={ci} style={{ border: '1px solid #333', padding: '4px 8px' }}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }, [q]);

  if (!q) {
    return <main style={{ padding: 24 }}>No questions.</main>;
  }

  return (
    <main style={{ padding: 24, maxWidth: 720, fontFamily: 'system-ui, sans-serif', lineHeight: 1.5 }}>
      <p style={{ marginBottom: 8 }}>
        Macro table MCQ preview · {index + 1} / {questions.length} · id {q.id} · Unit {q.unit} ·{' '}
        {q.lessonIDS.join(', ')}
      </p>

      <p style={{ whiteSpace: 'pre-wrap', marginBottom: 8 }}>{q.question}</p>
      {table}

      <ol style={{ listStyle: 'none', padding: 0, margin: '16px 0' }}>
        {q.options.map((opt, i) => (
          <li key={i} style={{ marginBottom: 6 }}>
            ({LETTERS[i]}) {opt}
          </li>
        ))}
      </ol>

      <p>
        <strong>Answer:</strong> {q.correctAnswer}
      </p>
      <p style={{ whiteSpace: 'pre-wrap' }}>
        <strong>Explanation:</strong> {q.explanation}
      </p>

      <div style={{ marginTop: 24, display: 'flex', gap: 16 }}>
        <button
          type="button"
          disabled={index === 0}
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
        >
          Prev
        </button>
        <button
          type="button"
          disabled={index >= questions.length - 1}
          onClick={() => setIndex((i) => Math.min(questions.length - 1, i + 1))}
        >
          Next
        </button>
      </div>
    </main>
  );
}
