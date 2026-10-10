// Kolam ornaments: line-drawn loops around dots, as chalked on a Tamil doorstep.
// Every piece draws in currentColor, so colour it with a text-* class.

type Props = { className?: string };

// The knot: four interlaced loops around a square of dots, with a dot at each cardinal point.
function KnotPaths({ x, y, size }: { x: number; y: number; size: number }) {
  const s = size / 100;
  const t = (n: number) => n * s;
  return (
    <g transform={`translate(${x - size / 2} ${y - size / 2})`}>
      <path
        d={`M${t(50)} ${t(50)}c${t(-38)} ${t(-6)},${t(-6)} ${t(-38)},0 0c${t(6)} ${t(-38)},${t(38)} ${t(-6)},0 0c${t(38)} ${t(6)},${t(6)} ${t(38)},0 0c${t(-6)} ${t(38)},${t(-38)} ${t(6)},0 0z`}
      />
      <path
        d={`M${t(50)} ${t(50)}c${t(-24)} ${t(-4)},${t(-4)} ${t(-24)},0 0c${t(4)} ${t(-24)},${t(24)} ${t(-4)},0 0c${t(24)} ${t(4)},${t(4)} ${t(24)},0 0c${t(-4)} ${t(24)},${t(-24)} ${t(4)},0 0z`}
      />
      <path d={`M${t(50)} ${t(22)}L${t(78)} ${t(50)}L${t(50)} ${t(78)}L${t(22)} ${t(50)}Z`} strokeLinejoin="round" />
      {[
        [31, 31],
        [69, 31],
        [69, 69],
        [31, 69],
        [50, 8],
        [92, 50],
        [50, 92],
        [8, 50],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={t(cx)} cy={t(cy)} r={t(2.6)} fill="currentColor" stroke="none" />
      ))}
    </g>
  );
}

export function KolamKnot({ className = "h-8 w-8" }: Props) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="2.2">
      <KnotPaths x={50} y={50} size={100} />
    </svg>
  );
}

// A corner ornament: a knot at the corner with lines and dots running along both edges. Drawn for a top-left
// corner; flip it with -scale-x-100 / -scale-y-100 for the others.
export function KolamCorner({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 160 160" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.6">
      <KnotPaths x={44} y={44} size={72} />
      <path d="M86 12H150M12 86V150" strokeLinecap="round" />
      <path d="M92 24H118M24 92V118" strokeLinecap="round" strokeWidth="1.1" />
      <g fill="currentColor" stroke="none">
        <circle cx="128" cy="24" r="2" />
        <circle cx="138" cy="24" r="2" />
        <circle cx="24" cy="128" r="2" />
        <circle cx="24" cy="138" r="2" />
      </g>
    </svg>
  );
}

// A divider: a hairline either side of a small knot, with dots stepping towards it.
export function KolamDivider({ className = "text-brass" }: Props) {
  return (
    <div aria-hidden="true" className={`flex items-center gap-3 ${className}`}>
      <span className="h-px flex-1 bg-current opacity-40" />
      <Dots />
      <KolamKnot className="h-9 w-9 shrink-0" />
      <Dots />
      <span className="h-px flex-1 bg-current opacity-40" />
    </div>
  );
}

function Dots() {
  return (
    <span className="flex shrink-0 items-center gap-1.5">
      <span className="h-1 w-1 rounded-full bg-current" />
      <span className="h-1 w-1 rounded-full bg-current" />
      <span className="h-1.5 w-1.5 rounded-full border border-current" />
    </span>
  );
}

// A running chain of loops around dots, for the foot of a page.
export function KolamBorder({ className = "" }: Props) {
  return (
    <svg aria-hidden="true" className={`block h-6 w-full ${className}`} preserveAspectRatio="none">
      <defs>
        <pattern id="kolam-chain" width="48" height="24" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="currentColor" strokeWidth="1.3">
            <path d="M0 12C8 2 16 2 24 12S40 22 48 12" />
            <path d="M0 12C8 22 16 22 24 12S40 2 48 12" />
          </g>
          <g fill="currentColor">
            <circle cx="12" cy="12" r="1.8" />
            <circle cx="36" cy="12" r="1.8" />
            <circle cx="24" cy="4" r="1.2" />
            <circle cx="24" cy="20" r="1.2" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#kolam-chain)" />
    </svg>
  );
}
