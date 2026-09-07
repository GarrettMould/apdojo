'use client';

import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { normalizeMathMarkdown } from '@/lib/mathSolver/normalizeMathMarkdown';

/** Map unicode asterisk lookalikes → ASCII so `**`/`*` match CommonMark emphasis rules. */
export function sanitizeTutorMarkdownAsteriskLookalikes(raw: string): string {
  return raw.replace(/[\uFF0A\u2217\u204E\uFE61\u2731]/g, '*');
}

const DEFAULT_MARKDOWN_CLASS =
  'tutor-markdown text-slate-700 [&_strong]:font-semibold [&_strong]:text-slate-900 [&_b]:font-semibold [&_b]:text-slate-900 [&_em]:italic [&_blockquote]:border-l-2 [&_blockquote]:border-slate-200 [&_blockquote]:pl-3 [&_blockquote]:italic [&_blockquote]:text-slate-600 [&_.katex]:text-inherit';

const DEFAULT_LINK_CLASS =
  'font-medium text-sky-700 underline underline-offset-2 hover:text-sky-800';

export interface TutorAssistantMarkdownProps {
  text: string;
  className?: string;
  linkClassName?: string;
  /** Render without block paragraph margins — for titles / one-liners. */
  inline?: boolean;
}

/**
 * Renders tutor/model replies: CommonMark emphasis + `$...$` / `$$...$$` KaTeX (remark-math + rehype-katex).
 * Also normalizes `\(...\)` / `\[...\]` and bare TeX command lines into `$` delimiters.
 */
export function TutorAssistantMarkdown({
  text,
  className = DEFAULT_MARKDOWN_CLASS,
  linkClassName = DEFAULT_LINK_CLASS,
  inline = false,
}: TutorAssistantMarkdownProps) {
  const prepared = normalizeMathMarkdown(sanitizeTutorMarkdownAsteriskLookalikes(text));

  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          p: ({ children }) =>
            inline ? (
              <span className="[&_.katex]:text-inherit">{children}</span>
            ) : (
              <p className="mb-2 last:mb-0">{children}</p>
            ),
          strong: ({ children }) => (
            <strong className="font-semibold text-slate-900">{children}</strong>
          ),
          em: ({ children }) => <em className="italic text-slate-800">{children}</em>,
          b: ({ children }) => <b className="font-semibold text-slate-900">{children}</b>,
          ul: ({ children }) => (
            <ul className="mb-2 list-disc space-y-0.5 pl-5 last:mb-0">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-2 list-decimal space-y-0.5 pl-5 last:mb-0">{children}</ol>
          ),
          li: ({ children }) => <li className="leading-snug">{children}</li>,
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClassName}
            >
              {children}
            </a>
          ),
          code: ({ children }) => (
            <code className="rounded bg-slate-100 px-1 py-0.5 text-[13px] text-slate-800">
              {children}
            </code>
          ),
        }}
      >
        {prepared}
      </ReactMarkdown>
    </div>
  );
}
