import Image from "next/image";
import Link from "next/link";
import { Zoomable } from "@/components/Zoomable";

type PictureLink = { href: string; target?: string; rel?: string; "aria-label"?: string };

// A picture slot: shows the photo when there is one, otherwise the illustration passed as children.
// Pass a positioning class (relative or absolute): the picture fills it.
// Every photo can be opened full screen and zoomed (see Zoomable); pass zoom={false} to turn that off.
// With a link, clicking the picture follows the link and only the corner badge opens it full screen.
export function Artwork({
  src,
  alt,
  sizes,
  priority,
  zoom = true,
  link,
  className = "",
  children,
}: {
  src?: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  zoom?: boolean;
  link?: PictureLink;
  className?: string;
  children: React.ReactNode;
}) {
  const picture = src ? <Image src={src} alt={alt} fill sizes={sizes} quality={90} priority={priority} className="object-cover" /> : children;
  return (
    <div className={`umber-backdrop overflow-hidden ${className}`}>
      {link ? (
        <Link {...link} className="absolute inset-0 block">
          {picture}
        </Link>
      ) : (
        picture
      )}
      {src && zoom && <Zoomable src={src} alt={alt} badgeOnly={!!link} />}
    </div>
  );
}

// Labels pinned onto a photo. Each has a point at the edge of the ingredient (a dot)
// and a place for the text, in an empty part of the picture, joined by a thin line.
// Both are percentages of the picture's width and height.
export type PhotoTag = { label: string; at: { left: number; top: number }; text: { left: number; top: number } };

export function PhotoTags({ tags }: { tags: PhotoTag[] }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        {tags.map((tag) => (
          <line key={tag.label} x1={tag.at.left} y1={tag.at.top} x2={tag.text.left} y2={tag.text.top} stroke="#f7f2eb" strokeWidth="1.5" strokeOpacity="0.9" vectorEffect="non-scaling-stroke" />
        ))}
      </svg>
      {tags.map((tag) => (
        <span key={tag.label} className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-maroon ring-2 ring-cream" style={{ left: `${tag.at.left}%`, top: `${tag.at.top}%` }} />
      ))}
      {tags.map((tag) => (
        <span
          key={tag.label}
          className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-cream/95 px-2 py-0.5 text-[9px] font-medium uppercase tracking-[0.12em] text-ink shadow-md shadow-ink/40 sm:px-2.5 sm:py-1 sm:text-[11px] sm:tracking-[0.14em]"
          style={{ left: `${tag.text.left}%`, top: `${tag.text.top}%` }}
        >
          {tag.label}
        </span>
      ))}
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

const PEPPERCORNS = scatter(26, 17, 150, 110);
const FENNEL = scatter(30, 23, 110, 70);

function CinnamonStick({ x, y, rot, length = 170 }: { x: number; y: number; rot: number; length?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      <rect x="0" y="-13" width={length} height="26" rx="12" fill="#8a4a2a" />
      <rect x="0" y="-13" width={length} height="10" rx="5" fill="#a8623a" opacity="0.7" />
      <path d={`M8 -2H${length - 8}`} stroke="#5e2f18" strokeWidth="2" opacity="0.7" />
      <path d={`M14 7H${length - 14}`} stroke="#5e2f18" strokeWidth="1.2" opacity="0.5" />
      <ellipse cx="0" cy="0" rx="6" ry="13" fill="#6a3620" />
      <ellipse cx="0" cy="0" rx="3" ry="8" fill="#3e1e10" />
    </g>
  );
}

function StarAnise({ x, y, rot, size = 1 }: { x: number; y: number; rot: number; size?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${size})`}>
      {Array.from({ length: 8 }, (_, i) => (
        <g key={i} transform={`rotate(${i * 45})`}>
          <path d="M0 0Q10 -16 42 -4Q46 0 42 4Q10 16 0 0Z" fill="#5a3426" />
          <path d="M6 0Q14 -8 36 -2Q38 0 36 2Q14 8 6 0Z" fill="#3a2016" opacity="0.8" />
          <ellipse cx="26" cy="0" rx="8" ry="4.5" fill="#b78a4a" />
        </g>
      ))}
      <circle r="6" fill="#3a2016" />
    </g>
  );
}

function Clove({ x, y, rot }: { x: number; y: number; rot: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      <path d="M0 0L30 -3L30 3Z" fill="#3b2418" />
      <circle cx="33" cy="0" r="7" fill="#4e3020" />
      <circle cx="33" cy="0" r="3" fill="#7a5a3a" />
    </g>
  );
}

function BayLeaf({ x, y, rot, size = 1 }: { x: number; y: number; rot: number; size?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${size})`}>
      <path d="M0 0Q40-30 120 0Q40 30 0 0Z" fill="#6b7a3c" />
      <path d="M0 0Q40-30 120 0Z" fill="#8a9650" opacity="0.4" />
      <path d="M4 0H112" stroke="#45502a" strokeWidth="1.2" opacity="0.8" />
      {[20, 40, 60, 80, 96].map((v) => (
        <path key={v} d={`M${v} 0L${v + 14} -9M${v} 0L${v + 14} 9`} stroke="#45502a" strokeWidth="0.7" opacity="0.6" />
      ))}
    </g>
  );
}

function BlackCardamom({ x, y, rot }: { x: number; y: number; rot: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      <ellipse rx="26" ry="15" fill="#3e2a20" />
      <ellipse rx="26" ry="15" fill="#5a3f30" opacity="0.5" transform="translate(-3 -4) scale(0.7)" />
      {[-14, -5, 4, 13].map((v) => (
        <path key={v} d={`M${v} -14Q${v + 4} 0 ${v} 14`} stroke="#241610" strokeWidth="1.4" fill="none" opacity="0.8" />
      ))}
    </g>
  );
}

// Issue 3: whole spices on dark wood — cinnamon, star anise, cloves, bay leaves, black cardamom, pepper and fennel.
export function WholeSpices() {
  return (
    <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className="absolute inset-0 h-full w-full">
      <CinnamonStick x={60} y={300} rot={-38} length={190} />
      <CinnamonStick x={90} y={330} rot={-30} length={170} />
      <BayLeaf x={190} y={60} rot={18} size={1.1} />
      <BayLeaf x={40} y={120} rot={-12} size={0.85} />
      <StarAnise x={255} y={240} rot={12} size={1.25} />
      <StarAnise x={340} y={120} rot={-20} size={0.8} />
      <BlackCardamom x={320} y={330} rot={-25} />
      <BlackCardamom x={368} y={290} rot={35} />
      <Clove x={120} y={210} rot={-60} />
      <Clove x={150} y={190} rot={-20} />
      <Clove x={135} y={240} rot={20} />
      <g transform="translate(200 300)">
        {PEPPERCORNS.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="6.5" fill="#1b1410" />
            <circle cx={p.x - 2} cy={p.y - 2} r="2" fill="#5a4a3e" opacity="0.7" />
          </g>
        ))}
      </g>
      <g transform="translate(30 30)">
        {FENNEL.map((f, i) => (
          <ellipse key={i} cx={f.x} cy={f.y} rx="5" ry="1.8" transform={`rotate(${f.r} ${f.x} ${f.y})`} fill={i % 4 ? "#b5b46a" : "#8f9550"} />
        ))}
      </g>
    </svg>
  );
}
