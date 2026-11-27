/**
 * Diagrams drawn to scale for lesson guides. Short-run cost curves come from a real cost function
 * (TFC = 100, AVC = 0.8(q − 5)² + 20), so MC passes exactly through the minimums of AVC and ATC.
 */
const MC =
  'M110.4,280.7 L117.8,283.0 L125.1,285.2 L132.4,287.2 L139.7,289.1 L147.0,290.7 L154.4,292.1 L161.7,293.3 L169.0,294.4 L176.3,295.2 L183.6,295.9 L190.9,296.3 L198.3,296.6 L205.6,296.7 L212.9,296.5 L220.2,296.2 L227.5,295.7 L234.9,295.0 L242.2,294.2 L249.5,293.1 L256.8,291.8 L264.1,290.3 L271.5,288.7 L278.8,286.8 L286.1,284.8 L293.4,282.6 L300.7,280.1 L308.0,277.5 L315.4,274.7 L322.7,271.7 L330.0,268.5 L337.3,265.1 L344.6,261.5 L352.0,257.8 L359.3,253.8 L366.6,249.6 L373.9,245.3 L381.2,240.7 L388.5,236.0 L395.9,231.1 L403.2,225.9 L410.5,220.6 L417.8,215.1 L425.1,209.4 L432.5,203.5 L439.8,197.4 L447.1,191.2 L454.4,184.7 L461.7,178.0 L469.1,171.2 L476.4,164.1 L483.7,156.9 L491.0,149.5 L498.3,141.8 L505.6,134.0 L513.0,126.0 L520.3,117.8 L527.6,109.4 L534.9,100.8 L542.2,92.0 L549.6,83.1';
const ATC =
  'M104.7,100.6 L112.4,114.4 L120.1,126.4 L127.8,137.0 L135.5,146.4 L143.2,154.8 L150.9,162.3 L158.6,169.1 L166.3,175.4 L174.0,181.0 L181.7,186.2 L189.4,191.0 L197.1,195.4 L204.8,199.4 L212.5,203.2 L220.2,206.6 L227.9,209.8 L235.6,212.8 L243.3,215.5 L251.0,218.0 L258.7,220.3 L266.4,222.5 L274.1,224.4 L281.9,226.2 L289.6,227.8 L297.3,229.3 L305.0,230.6 L312.7,231.8 L320.4,232.9 L328.1,233.8 L335.8,234.6 L343.5,235.3 L351.2,235.9 L358.9,236.3 L366.6,236.7 L374.3,236.9 L382.0,237.0 L389.7,237.0 L397.4,236.9 L405.1,236.8 L412.8,236.5 L420.5,236.1 L428.2,235.6 L435.9,235.0 L443.6,234.3 L451.3,233.6 L459.0,232.7 L466.7,231.8 L474.4,230.8 L482.1,229.6 L489.9,228.4 L497.6,227.1 L505.3,225.7 L513.0,224.3 L520.7,222.7 L528.4,221.1 L536.1,219.4 L543.8,217.5 L551.5,215.7 L559.2,213.7 L566.9,211.6';
const AVC =
  'M87.3,252.6 L95.4,254.7 L103.5,256.6 L111.6,258.5 L119.7,260.3 L127.8,262.0 L135.9,263.6 L144.0,265.2 L152.0,266.7 L160.1,268.1 L168.2,269.4 L176.3,270.7 L184.4,271.8 L192.5,272.9 L200.6,273.9 L208.7,274.9 L216.8,275.7 L224.8,276.5 L232.9,277.2 L241.0,277.8 L249.1,278.4 L257.2,278.8 L265.3,279.2 L273.4,279.5 L281.5,279.8 L289.6,279.9 L297.6,280.0 L305.7,280.0 L313.8,279.9 L321.9,279.7 L330.0,279.5 L338.1,279.2 L346.2,278.8 L354.3,278.3 L362.4,277.8 L370.4,277.1 L378.5,276.4 L386.6,275.6 L394.7,274.8 L402.8,273.8 L410.9,272.8 L419.0,271.7 L427.1,270.5 L435.2,269.2 L443.2,267.9 L451.3,266.5 L459.4,265.0 L467.5,263.4 L475.6,261.8 L483.7,260.0 L491.8,258.2 L499.9,256.3 L508.0,254.4 L516.0,252.3 L524.1,250.2 L532.2,248.0 L540.3,245.7 L548.4,243.4 L556.5,240.9 L564.6,238.4 L572.7,235.8';

/** AP exam style: black ink only. Curves are told apart by their labels, not color. */
const INK = '#111111';

export function GuideDiagram({ id }: { id: 'short-run-cost-curves' }) {
  if (id !== 'short-run-cost-curves') return null;
  return (
    <figure className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
      <svg
        viewBox="0 0 640 380"
        className="h-auto w-full"
        role="img"
        aria-label="Short-run cost curves. The U-shaped ATC and AVC curves both have their minimums where the rising marginal cost curve crosses them. The gap between ATC and AVC, which is average fixed cost, is wide at low output and narrow at high output."
      >
        <g fontFamily="'Times New Roman', Times, serif" fontSize="16" fill={INK}>
          {/* Axes */}
          <line x1="70" y1="30" x2="70" y2="330" stroke={INK} strokeWidth="1.6" />
          <line x1="70" y1="330" x2="600" y2="330" stroke={INK} strokeWidth="1.6" />
          <text x="62" y="40" textAnchor="end">Cost</text>
          <text x="600" y="352" textAnchor="end">Quantity</text>
          <text x="60" y="346" textAnchor="end">0</text>

          {/* AFC: the vertical gap between ATC and AVC */}
          <line x1="185.6" y1="188.7" x2="185.6" y2="272" stroke={INK} strokeWidth="1.2" strokeDasharray="5 4" />
          <line x1="503.3" y1="226.1" x2="503.3" y2="255.5" stroke={INK} strokeWidth="1.2" strokeDasharray="5 4" />
          <text x="192" y="236" fontSize="14" fontStyle="italic">AFC</text>
          <text x="497" y="246" fontSize="14" fontStyle="italic" textAnchor="end">AFC</text>

          <path d={AVC} fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" />
          <path d={ATC} fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" />
          <path d={MC} fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" />

          {/* Where MC crosses each average at its minimum */}
          <line x1="301.1" y1="280" x2="301.1" y2="330" stroke={INK} strokeWidth="1" strokeDasharray="3 4" />
          <line x1="387" y1="237" x2="387" y2="330" stroke={INK} strokeWidth="1" strokeDasharray="3 4" />
          <circle cx="301.1" cy="280" r="3.5" fill={INK} />
          <circle cx="387" cy="237" r="3.5" fill={INK} />
          <text x="301.1" y="348" fontSize="14" textAnchor="middle">Q₁</text>
          <text x="387" y="348" fontSize="14" textAnchor="middle">Q₂</text>

          <text x="556" y="80">MC</text>
          <text x="574" y="214">ATC</text>
          <text x="580" y="240">AVC</text>
        </g>
      </svg>
      <figcaption className="text-sm text-slate-500">
        MC cuts through AVC at its minimum (Q₁) and ATC at its minimum (Q₂). Left of each crossing MC is below the
        average and pulls it down; right of it, MC is above and pulls it up. The dashed gap between ATC and AVC is
        average fixed cost, which shrinks as quantity rises.
      </figcaption>
    </figure>
  );
}
