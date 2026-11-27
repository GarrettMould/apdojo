import { Fragment, type ReactNode } from 'react';

/** Renders guide text with **bold**, *italic* and `formula` marks. */
export function GuideText({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  const pattern = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let i = 0;
  while ((match = pattern.exec(text))) {
    if (match.index > last) parts.push(<Fragment key={i++}>{text.slice(last, match.index)}</Fragment>);
    const token = match[0];
    if (token.startsWith('**')) parts.push(<strong key={i++} className="font-semibold text-slate-900">{token.slice(2, -2)}</strong>);
    else if (token.startsWith('`'))
      parts.push(
        <span key={i++} className="whitespace-nowrap rounded-md bg-blue-50 px-1.5 py-0.5 font-semibold tabular-nums text-slate-900">
          {token.slice(1, -1)}
        </span>,
      );
    else parts.push(<em key={i++}>{token.slice(1, -1)}</em>);
    last = match.index + token.length;
  }
  if (last < text.length) parts.push(<Fragment key={i++}>{text.slice(last)}</Fragment>);
  return <>{parts}</>;
}
