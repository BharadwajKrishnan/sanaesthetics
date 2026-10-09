import Image from "next/image";

// A picture slot: shows the photo when there is one, otherwise the illustration passed as children.
// Pass a positioning class (relative or absolute): the picture fills it.
export function Artwork({
  src,
  alt,
  sizes,
  priority,
  className = "",
  children,
}: {
  src?: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`umber-backdrop overflow-hidden ${className}`}>
      {src ? <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" /> : children}
    </div>
  );
}

// Deterministic scatter so server and client draw the same picture.
function scatter(count: number, seed: number, w: number, h: number) {
  let s = seed;
  const rand = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
  return Array.from({ length: count }, () => ({ x: rand() * w, y: rand() * h, r: rand() * 180 }));
}

function Leaf({ x, y, rot, size = 1 }: { x: number; y: number; rot: number; size?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${size})`}>
      <path d="M0 0Q24-13 50 0Q24 13 0 0Z" fill="#4a773a" />
      <path d="M0 0Q24-13 50 0Z" fill="#6a9650" opacity="0.55" />
      <path d="M2 0H46" stroke="#24401f" strokeWidth="0.8" opacity="0.6" />
    </g>
  );
}

// A curry-leaf sprig: a stem with leaves in alternating pairs.
function Sprig({ x, y, rot, size = 1, leaves = 8 }: { x: number; y: number; rot: number; size?: number; leaves?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${size})`}>
      <path d={`M0 0Q${leaves * 13} -6 ${leaves * 26} 0`} stroke="#3c5a2c" strokeWidth="2.2" fill="none" />
      {Array.from({ length: leaves }, (_, i) => (
        <Leaf key={i} x={18 + i * 26} y={-1} rot={i % 2 ? 38 : -38} size={0.9 + (i % 3) * 0.08} />
      ))}
      <Leaf x={leaves * 26} y={0} rot={0} />
    </g>
  );
}

function Chilli({ x, y, rot, size = 1 }: { x: number; y: number; rot: number; size?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${size})`}>
      <path d="M0 0C34-9 86-6 128 16C92 6 42 10 2 9Z" fill="#8a1f14" />
      <path d="M10 2C40-3 80 0 110 10" stroke="#c4473a" strokeWidth="2" fill="none" opacity="0.6" />
      <path d="M0 4Q-10 2-16-8" stroke="#55703a" strokeWidth="4" strokeLinecap="round" fill="none" />
    </g>
  );
}

const SEEDS = scatter(46, 11, 340, 200);

// Leaves, chillies and loose seeds around the hero's anjarapetti.
export function HeroGarnish() {
  return (
    <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className="absolute inset-0 h-full w-full">
      <Sprig x={250} y={110} rot={-24} size={1.15} leaves={9} />
      <Sprig x={330} y={30} rot={12} size={0.9} leaves={7} />
      <Chilli x={250} y={330} rot={-8} size={1.4} />
      <Chilli x={300} y={392} rot={-28} size={1.2} />
      <Chilli x={600} y={70} rot={160} size={1.1} />
      <g transform="translate(250 420)">
        {SEEDS.map((p, i) => (
          <ellipse key={i} cx={p.x} cy={p.y} rx={i % 3 ? 3.4 : 4.4} ry={i % 3 ? 2 : 4.4} transform={`rotate(${p.r} ${p.x} ${p.y})`} fill={i % 3 ? "#c79b5a" : "#3a2a20"} opacity="0.85" />
        ))}
      </g>
    </svg>
  );
}

const GRAINS = scatter(70, 5, 120, 70);

// Issue 1: a meal on a banana leaf with small bowls for each taste.
export function Thali() {
  const bowls = [
    { x: 120, y: 120, c: "#b4622a" },
    { x: 215, y: 92, c: "#9a3a1c" },
    { x: 300, y: 135, c: "#c9a24a" },
    { x: 92, y: 220, c: "#f0ebe1" },
    { x: 318, y: 238, c: "#6f8a3a" },
  ];
  return (
    <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className="absolute inset-0 h-full w-full">
      <ellipse cx="200" cy="215" rx="230" ry="150" transform="rotate(-18 200 215)" fill="#3f6b35" />
      <path d="M-20 300Q200 210 430 120" stroke="#87a96a" strokeWidth="3" fill="none" opacity="0.7" />
      <circle cx="205" cy="205" r="160" fill="#b9b3a8" />
      <circle cx="205" cy="205" r="148" fill="#d9d4cb" />
      {bowls.map((b) => (
        <g key={b.x}>
          <circle cx={b.x} cy={b.y} r="44" fill="#c7c1b6" />
          <circle cx={b.x} cy={b.y} r="36" fill={b.c} />
          <circle cx={b.x - 10} cy={b.y - 12} r="9" fill="#fff" opacity="0.18" />
        </g>
      ))}
      <ellipse cx="205" cy="268" rx="66" ry="46" fill="#f6f2ea" />
      <g transform="translate(145 236)">
        {GRAINS.map((g, i) => (
          <ellipse key={i} cx={g.x} cy={g.y} rx="3.4" ry="1.4" transform={`rotate(${g.r} ${g.x} ${g.y})`} fill="#e4ddcf" />
        ))}
      </g>
      <Leaf x={262} y={196} rot={-30} size={0.8} />
    </svg>
  );
}

const MUSTARD = scatter(40, 3, 190, 190);

// Tempering: a dark kadai with mustard seeds, curry leaves and a dried chilli.
export function TemperingPan() {
  return (
    <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className="absolute inset-0 h-full w-full">
      <circle cx="200" cy="230" r="170" fill="#1b1612" />
      <circle cx="200" cy="230" r="150" fill="#2f2620" />
      <circle cx="200" cy="230" r="118" fill="#7a5a2c" />
      <circle cx="200" cy="230" r="118" fill="#d6a64f" opacity="0.35" />
      <g transform="translate(105 135)">
        {MUSTARD.map((m, i) => (
          <circle key={i} cx={m.x} cy={m.y} r="4.2" fill="#1d1612" />
        ))}
      </g>
      <Leaf x={140} y={210} rot={-20} size={1.2} />
      <Leaf x={200} y={260} rot={40} size={1.1} />
      <Leaf x={230} y={190} rot={-70} size={1.15} />
      <Chilli x={150} y={290} rot={-12} size={0.9} />
      <g stroke="#f7f2eb" strokeWidth="3" fill="none" opacity="0.35" strokeLinecap="round">
        <path d="M170 120C150 90 190 70 170 30" />
        <path d="M220 110C200 80 240 60 220 20" />
        <path d="M265 130C250 100 280 85 268 50" />
      </g>
    </svg>
  );
}

const RICE = scatter(160, 9, 220, 150);

// Recipes: a brass bowl of lemon rice with peanuts and curry leaves.
export function RiceBowl() {
  return (
    <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className="absolute inset-0 h-full w-full">
      <defs>
        <radialGradient id="brass" cx="0.4" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#e6c27c" />
          <stop offset="0.6" stopColor="#a87835" />
          <stop offset="1" stopColor="#5e3f17" />
        </radialGradient>
      </defs>
      <circle cx="200" cy="215" r="160" fill="url(#brass)" />
      <circle cx="200" cy="215" r="138" fill="#e0b43e" />
      <g transform="translate(90 140)">
        {RICE.map((g, i) => (
          <ellipse key={i} cx={g.x} cy={g.y} rx="4" ry="1.6" transform={`rotate(${g.r} ${g.x} ${g.y})`} fill={i % 9 ? "#f3d873" : "#3a2a20"} opacity="0.9" />
        ))}
      </g>
      {[ [150, 200], [250, 250], [205, 290], [270, 180] ].map(([x, y]) => (
        <ellipse key={x} cx={x} cy={y} rx="9" ry="6" fill="#c7884a" />
      ))}
      <Leaf x={170} y={170} rot={-40} size={1.1} />
      <Leaf x={215} y={200} rot={20} size={1.2} />
      <Leaf x={190} y={240} rot={-75} size={1} />
    </svg>
  );
}

// Line-drawn sprig used as a quiet ornament beside the Arusuvai heading.
export function SprigOutline({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 180" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M10 170C70 120 120 80 210 10" />
      {Array.from({ length: 7 }, (_, i) => {
        const x = 40 + i * 24;
        const y = 146 - i * 19;
        return (
          <g key={i}>
            <path d={`M${x} ${y}Q${x - 6} ${y - 34} ${x - 30} ${y - 46}Q${x - 14} ${y - 18} ${x} ${y}Z`} />
            <path d={`M${x} ${y}Q${x + 30} ${y + 4} ${x + 46} ${y - 14}Q${x + 22} ${y - 18} ${x} ${y}Z`} />
          </g>
        );
      })}
    </svg>
  );
}
