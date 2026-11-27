import type { GuideBlock } from '@/data/teachingGuides';
import { GuideText } from './GuideText';

/**
 * A two-player payoff matrix drawn like an AP exam figure: black ruled grid, serif type, players named
 * outside the grid. The row player's payoff is listed first; a highlighted cell is bold and lightly shaded.
 */
export function PayoffMatrix({
  block,
  framed = true,
}: {
  block: Extract<GuideBlock, { type: 'matrix' }>;
  /** Off inside a card that already has its own border, e.g. a quiz question. */
  framed?: boolean;
}) {
  const money = (n: number) => `${block.unit ?? ''}${n.toLocaleString('en-US')}`;
  const cell = 'border border-black px-4 py-3 sm:px-6';
  return (
    <figure className={framed ? 'flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:p-6' : 'flex flex-col gap-3'}>
      <div className="overflow-x-auto">
        <table className="mx-auto border-collapse text-center font-serif text-[16px] text-black">
          <thead>
            <tr>
              <th colSpan={2} />
              <th colSpan={block.colStrategies.length} className="pb-2 font-normal">
                {block.colPlayer}
              </th>
            </tr>
            <tr>
              <th colSpan={2} />
              {block.colStrategies.map((c) => (
                <th key={c} className={`${cell} font-normal`}>{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rowStrategies.map((r, ri) => (
              <tr key={r}>
                {ri === 0 ? (
                  <th rowSpan={block.rowStrategies.length} className="pr-3 text-right align-middle font-normal">
                    {block.rowPlayer}
                  </th>
                ) : null}
                <th className={`${cell} whitespace-nowrap font-normal`}>{r}</th>
                {block.colStrategies.map((c, ci) => {
                  const [x, y] = block.payoffs[ri][ci];
                  const hot = block.highlight?.[0] === ri && block.highlight?.[1] === ci;
                  return (
                    <td key={c} className={`${cell} whitespace-nowrap tabular-nums ${hot ? 'bg-neutral-100 font-bold' : ''}`}>
                      {money(x)}, {money(y)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {block.caption ? (
        <figcaption className="text-sm text-slate-500">
          <GuideText text={block.caption} />
        </figcaption>
      ) : null}
    </figure>
  );
}

