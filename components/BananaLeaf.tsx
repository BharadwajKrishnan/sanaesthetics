// A full South Indian meal served on a banana leaf on a wooden table, seen from above, drawn for the hero.
// The leaf lies with its tip to the right. Along the top edge, as tradition has it, the small things:
// salt, pickle, a lime wedge, banana chips, beetroot and beans poriyal, avial, kootu, a vadai and an
// appalam. Below, the rice with sambar and ghee, with bowls of sambar, rasam, curd and payasam, a
// banana at the stem end, and a spoon of paruppu.
//
// Nothing here is a perfect ellipse: every heap is a blob with a jittered outline, the leaf's edge is
// roughened, and SVG lighting gives the heaps volume and the gravies a sheen. The light comes from the
// top left, so every shadow falls down and to the right. Each dish carries a .dish class and an index,
// so the stylesheet can serve them one after another; the steam over the rice and the sambar loops.

// Deterministic randomness so server and client draw the same picture.
function rng(seed: number) {
  let s = seed;
  return () => ((s = (s * 9301 + 49297) % 233280) / 233280);
}

function scatter(count: number, seed: number, w: number, h: number) {
  const rand = rng(seed);
  return Array.from({ length: count }, () => ({ x: rand() * w - w / 2, y: rand() * h - h / 2, r: rand() * 180, k: rand() }));
}

// An organic outline: an ellipse whose radius wanders a little around its circumference.
function blob(cx: number, cy: number, rx: number, ry: number, seed: number, jitter = 0.09, n = 14) {
  const rand = rng(seed);
  const pts = Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2;
    const j = 1 + (rand() - 0.5) * 2 * jitter;
    return [cx + Math.cos(a) * rx * j, cy + Math.sin(a) * ry * j];
  });
  // Smooth through the midpoints with quadratic curves.
  let d = "";
  for (let i = 0; i < n; i++) {
    const p = pts[i];
    const q = pts[(i + 1) % n];
    const mx = (p[0] + q[0]) / 2;
    const my = (p[1] + q[1]) / 2;
    d += i === 0 ? `M${mx.toFixed(1)} ${my.toFixed(1)}` : "";
    const r = pts[(i + 2) % n];
    const nx = (q[0] + r[0]) / 2;
    const ny = (q[1] + r[1]) / 2;
    d += `Q${q[0].toFixed(1)} ${q[1].toFixed(1)} ${nx.toFixed(1)} ${ny.toFixed(1)}`;
  }
  return d + "Z";
}

const RICE = scatter(210, 7, 240, 150);
const BEANS = scatter(30, 13, 74, 44);
const BEET = scatter(36, 19, 66, 42);
const AVIAL = scatter(26, 29, 70, 44);
const KOOTU = scatter(22, 31, 62, 40);
const SAMBAR_BITS = scatter(10, 37, 70, 70);
const RASAM_BITS = scatter(14, 41, 60, 60);
const PAYASAM_BITS = scatter(10, 43, 56, 56);
const BUBBLES = scatter(48, 47, 100, 100);
const PICKLE = scatter(9, 53, 36, 24);
const CHIPS = scatter(5, 59, 44, 26);

type At = { x: number; y: number };

const LEAF =
  "M72 165C66 120 150 96 300 90C470 84 640 96 770 130C850 150 896 205 902 268C896 335 820 420 700 462C560 508 330 520 190 490C100 472 70 420 72 350Z";

// A heap of something laid straight on the leaf: a blob, lit from the top left, with its shadow.
function Heap({
  x,
  y,
  rx,
  ry,
  fill,
  seed,
  i,
  grain = true,
  children,
}: At & { rx: number; ry: number; fill: string; seed: number; i: number; grain?: boolean; children?: React.ReactNode }) {
  const d = blob(x, y, rx, ry, seed);
  return (
    <g className="dish" style={{ ["--i" as string]: i }}>
      <path d={d} fill="#0b1507" opacity="0.4" filter="url(#shadow)" />
      <g filter={grain ? "url(#dome-grain)" : "url(#dome)"}>
        <path d={d} fill={fill} />
        {children}
      </g>
    </g>
  );
}

// A steel katori: a rim that catches the light in two places, a dark inside, and whatever it holds.
function Bowl({ x, y, r, i, children }: At & { r: number; i: number; children: React.ReactNode }) {
  const inner = r * 0.8;
  return (
    <g className="dish" style={{ ["--i" as string]: i }}>
      <ellipse cx={x + 6} cy={y + 9} rx={r * 1.02} ry={r * 0.96} fill="#0b1507" opacity="0.5" filter="url(#shadow)" />
      <circle cx={x} cy={y} r={r} fill="url(#steel)" />
      {/* The rim: a bright edge, a dark band where it turns over, and two reflections */}
      <circle cx={x} cy={y} r={r - 1} fill="none" stroke="#fff" strokeOpacity="0.6" strokeWidth="1.5" />
      <circle cx={x} cy={y} r={r - r * 0.1} fill="none" stroke="#5c564e" strokeOpacity="0.55" strokeWidth={r * 0.08} />
      <path d={`M${x - r * 0.78} ${y - r * 0.3}A${r * 0.86} ${r * 0.86} 0 0 1 ${x - r * 0.25} ${y - r * 0.82}`} fill="none" stroke="#fff" strokeOpacity="0.8" strokeWidth={r * 0.09} strokeLinecap="round" />
      <path d={`M${x + r * 0.82} ${y + r * 0.2}A${r * 0.86} ${r * 0.86} 0 0 1 ${x + r * 0.45} ${y + r * 0.72}`} fill="none" stroke="#fff" strokeOpacity="0.35" strokeWidth={r * 0.06} strokeLinecap="round" />
      <circle cx={x} cy={y} r={inner} fill="#3a342d" />
      <clipPath id={`bowl-${i}`}>
        <circle cx={x} cy={y} r={inner - 1} />
      </clipPath>
      <g clipPath={`url(#bowl-${i})`} filter="url(#liquid)">
        {children}
      </g>
      {/* The inside wall throws a shadow across the top of the food */}
      <circle cx={x} cy={y} r={inner} fill="url(#bowl-shade)" />
      <ellipse cx={x - inner * 0.35} cy={y - inner * 0.45} rx={inner * 0.3} ry={inner * 0.14} fill="#fff" opacity="0.28" transform={`rotate(-30 ${x - inner * 0.35} ${y - inner * 0.45})`} />
    </g>
  );
}

function Steam({ x, y, i, scale = 1 }: At & { i: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" opacity="0.8" filter="url(#soft)">
      <path className="steam" style={{ ["--i" as string]: i }} d="M-14 0c-8-12 8-18 0-32" />
      <path className="steam" style={{ ["--i" as string]: i + 0.4 }} d="M4 -4c-9-14 9-20 0-36" />
      <path className="steam" style={{ ["--i" as string]: i + 0.8 }} d="M20 2c-7-11 7-17 0-30" />
    </g>
  );
}

function CurryLeaf({ x, y, rot, size = 1 }: At & { rot: number; size?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${size})`}>
      <path d="M0 0Q16-10 34 0Q16 10 0 0Z" fill="#2b5222" />
      <path d="M0 0Q16-10 34 0Q20 2 0 0Z" fill="#4a7d38" opacity="0.7" />
      <path d="M2 0H31" stroke="#17301a" strokeWidth="0.7" opacity="0.8" />
      <path d="M8 -1Q17 -5 26 -1" stroke="#9ccf7a" strokeWidth="0.6" opacity="0.45" fill="none" />
    </g>
  );
}

export function BananaLeafMeal({ className = "" }: { className?: string }) {
  // Fine veins run from the midrib to each edge, leaning towards the tip.
  const veins = Array.from({ length: 92 }, (_, n) => 84 + n * 9);
  const rice = blob(290, 366, 134, 82, 101, 0.06, 18);

  return (
    <svg viewBox="0 34 920 552" aria-hidden="true" className={className}>
      <defs>
        {/* ---- Light and texture ---- */}
        <filter id="shadow" x="-30%" y="-30%" width="170%" height="180%">
          <feGaussianBlur stdDeviation="5" />
          <feOffset dx="5" dy="8" />
        </filter>
        <filter id="soft" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.2" />
        </filter>
        <filter id="leaf-shadow" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="6" dy="16" stdDeviation="12" floodColor="#140c04" floodOpacity="0.6" />
        </filter>
        {/* A heap of food: a roughened edge, a dome lit from the top left, a touch of shine */}
        <filter id="dome" x="-25%" y="-25%" width="150%" height="150%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="4" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G" result="shape" />
          <feGaussianBlur in="shape" stdDeviation="3.5" result="blur" />
          <feDiffuseLighting in="blur" surfaceScale="7" diffuseConstant="1.05" lightingColor="#fff" result="light">
            <feDistantLight azimuth="225" elevation="48" />
          </feDiffuseLighting>
          <feComposite in="light" in2="shape" operator="in" result="lightIn" />
          <feBlend in="shape" in2="lightIn" mode="multiply" result="shaded" />
          <feSpecularLighting in="blur" surfaceScale="6" specularConstant="0.35" specularExponent="22" lightingColor="#fff" result="spec">
            <feDistantLight azimuth="225" elevation="50" />
          </feSpecularLighting>
          <feComposite in="spec" in2="shape" operator="in" result="specIn" />
          <feComposite in="shaded" in2="specIn" operator="arithmetic" k2="1" k3="1" />
        </filter>
        {/* The same, with a fine grain over it for anything crumbly */}
        <filter id="dome-grain" x="-25%" y="-25%" width="150%" height="150%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="4" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G" result="shape" />
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="9" result="grain" />
          <feColorMatrix in="grain" type="matrix" values="0 0 0 0 0.5  0 0 0 0 0.5  0 0 0 0 0.5  0 0 0 0.9 0" result="grainGrey" />
          <feComposite in="grainGrey" in2="shape" operator="in" result="grainIn" />
          <feBlend in="shape" in2="grainIn" mode="overlay" result="textured" />
          <feGaussianBlur in="shape" stdDeviation="3.5" result="blur" />
          <feDiffuseLighting in="blur" surfaceScale="7" diffuseConstant="1.05" lightingColor="#fff" result="light">
            <feDistantLight azimuth="225" elevation="48" />
          </feDiffuseLighting>
          <feComposite in="light" in2="shape" operator="in" result="lightIn" />
          <feBlend in="textured" in2="lightIn" mode="multiply" result="shaded" />
          <feSpecularLighting in="blur" surfaceScale="6" specularConstant="0.25" specularExponent="20" lightingColor="#fff" result="spec">
            <feDistantLight azimuth="225" elevation="50" />
          </feSpecularLighting>
          <feComposite in="spec" in2="shape" operator="in" result="specIn" />
          <feComposite in="shaded" in2="specIn" operator="arithmetic" k2="1" k3="1" />
        </filter>
        {/* Gravy and curd in a bowl: a soft, wet shine */}
        <filter id="liquid" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
          <feGaussianBlur in="SourceAlpha" stdDeviation="6" result="blur" />
          <feSpecularLighting in="blur" surfaceScale="4" specularConstant="0.6" specularExponent="26" lightingColor="#fff" result="spec">
            <feDistantLight azimuth="225" elevation="58" />
          </feSpecularLighting>
          <feComposite in="spec" in2="SourceAlpha" operator="in" result="specIn" />
          <feComposite in="SourceGraphic" in2="specIn" operator="arithmetic" k2="1" k3="1" />
        </filter>
        {/* The leaf's edge is never a clean curve */}
        <filter id="rough" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" seed="11" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        {/* Fine ribbing across the blade, and the grain of the table */}
        <filter id="ribbing" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.55 0.012" numOctaves="3" seed="21" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.6  0 0 0 0 0.75  0 0 0 0 0.35  0 0 0 0.9 -0.25" />
        </filter>
        <filter id="wood" x="0" y="0" width="100%" height="100%" primitiveUnits="userSpaceOnUse">
          <feTurbulence type="fractalNoise" baseFrequency="0.0035 0.09" numOctaves="4" seed="3" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.25  0 0 0 0 0.15  0 0 0 0 0.08  0 0 0 1.4 -0.45" />
        </filter>

        {/* ---- Colours ---- */}
        <linearGradient id="table" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#6b4426" />
          <stop offset="0.5" stopColor="#4c2e18" />
          <stop offset="1" stopColor="#2f1a0d" />
        </linearGradient>
        <radialGradient id="vignette" cx="40%" cy="40%" r="75%">
          <stop offset="0.35" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.55" />
        </radialGradient>
        <radialGradient id="leaf-base" cx="38%" cy="44%" r="72%">
          <stop offset="0" stopColor="#86bf5a" />
          <stop offset="0.5" stopColor="#5a9644" />
          <stop offset="0.85" stopColor="#3b7334" />
          <stop offset="1" stopColor="#2a5c2a" />
        </radialGradient>
        <linearGradient id="leaf-gloss" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.22" stopColor="#fff" stopOpacity="0.22" />
          <stop offset="0.4" stopColor="#fff" stopOpacity="0.04" />
          <stop offset="0.75" stopColor="#000" stopOpacity="0.05" />
          <stop offset="1" stopColor="#000" stopOpacity="0.16" />
        </linearGradient>
        <linearGradient id="midrib" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#eef2a8" />
          <stop offset="0.45" stopColor="#c9d575" />
          <stop offset="1" stopColor="#8aa04a" />
        </linearGradient>
        <linearGradient id="steel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f7f5ef" />
          <stop offset="0.3" stopColor="#c9c3b7" />
          <stop offset="0.55" stopColor="#8b857a" />
          <stop offset="0.8" stopColor="#b8b2a6" />
          <stop offset="1" stopColor="#e9e5dc" />
        </linearGradient>
        <radialGradient id="bowl-shade" cx="50%" cy="50%" r="50%">
          <stop offset="0.55" stopColor="#000" stopOpacity="0" />
          <stop offset="0.85" stopColor="#000" stopOpacity="0.28" />
          <stop offset="1" stopColor="#000" stopOpacity="0.6" />
        </radialGradient>
        <radialGradient id="sambar" cx="42%" cy="38%" r="65%">
          <stop offset="0" stopColor="#e4792f" />
          <stop offset="0.6" stopColor="#b8481c" />
          <stop offset="1" stopColor="#7a2a10" />
        </radialGradient>
        <radialGradient id="rasam" cx="42%" cy="38%" r="65%">
          <stop offset="0" stopColor="#c8603a" />
          <stop offset="0.6" stopColor="#8d3519" />
          <stop offset="1" stopColor="#4f1c0c" />
        </radialGradient>
        <radialGradient id="payasam" cx="42%" cy="38%" r="65%">
          <stop offset="0" stopColor="#f8e6c8" />
          <stop offset="0.7" stopColor="#dcb98f" />
          <stop offset="1" stopColor="#b9926a" />
        </radialGradient>
        <radialGradient id="curd" cx="38%" cy="32%" r="70%">
          <stop offset="0" stopColor="#fff" />
          <stop offset="0.7" stopColor="#efe9dc" />
          <stop offset="1" stopColor="#d3cab8" />
        </radialGradient>
        <radialGradient id="rice" cx="38%" cy="32%" r="72%">
          <stop offset="0" stopColor="#fffefa" />
          <stop offset="0.7" stopColor="#efe8d8" />
          <stop offset="1" stopColor="#d9cfb8" />
        </radialGradient>
        <radialGradient id="ghee" cx="40%" cy="35%" r="60%">
          <stop offset="0" stopColor="#fff2b8" />
          <stop offset="0.6" stopColor="#f0b833" />
          <stop offset="1" stopColor="#c48512" />
        </radialGradient>
        <radialGradient id="appalam" cx="42%" cy="40%" r="58%">
          <stop offset="0" stopColor="#f6e6b8" />
          <stop offset="0.7" stopColor="#e1c17c" />
          <stop offset="0.92" stopColor="#c89b4c" />
          <stop offset="1" stopColor="#9a6f2d" />
        </radialGradient>
        <linearGradient id="banana" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f9df6c" />
          <stop offset="0.55" stopColor="#e9bf2e" />
          <stop offset="1" stopColor="#b98c14" />
        </linearGradient>
        <radialGradient id="vadai" cx="40%" cy="35%" r="65%">
          <stop offset="0" stopColor="#d9955a" />
          <stop offset="0.7" stopColor="#a8622a" />
          <stop offset="1" stopColor="#6d3a12" />
        </radialGradient>
        <clipPath id="leaf-clip">
          <path d={LEAF} />
        </clipPath>
      </defs>

      {/* ---- The table ---- */}
      <rect x="0" y="34" width="920" height="552" rx="26" fill="url(#table)" />
      <rect x="0" y="34" width="920" height="552" rx="26" filter="url(#wood)" style={{ mixBlendMode: "multiply" }} opacity="0.85" />
      <rect x="0" y="34" width="920" height="552" rx="26" fill="url(#vignette)" />
      {/* Two seams in the wood */}
      <path d="M0 212H920M0 418H920" stroke="#1d1007" strokeWidth="1.5" opacity="0.5" />
      <path d="M0 214H920M0 420H920" stroke="#8a5a34" strokeWidth="0.8" opacity="0.25" />

      <g className="leaf-float">
        {/* ---- The leaf ---- */}
        <g filter="url(#leaf-shadow)">
          <g filter="url(#rough)">
            <path d={LEAF} fill="url(#leaf-base)" />
            <g clipPath="url(#leaf-clip)">
              {/* Ribbing: the blade is corrugated between its veins */}
              <rect x="-60" y="-60" width="1040" height="740" filter="url(#ribbing)" opacity="0.32" style={{ mixBlendMode: "overlay" }} transform="rotate(-8 460 300)" />
              {/* Veins, lighter than the blade, leaning to the tip; a darker line shadows each */}
              <g stroke="#a9cf79" strokeWidth="0.9" opacity="0.5">
                {veins.map((x) => (
                  <path key={x} d={`M${x} 300Q${x + 10} 180 ${x + 26} 62M${x} 300Q${x + 10} 420 ${x + 26} 538`} fill="none" />
                ))}
              </g>
              <g stroke="#1b3f1c" strokeWidth="0.7" opacity="0.4">
                {veins.map((x) => (
                  <path key={x} d={`M${x + 4} 300Q${x + 14} 180 ${x + 30} 62M${x + 4} 300Q${x + 14} 420 ${x + 30} 538`} fill="none" />
                ))}
              </g>
              {/* Splits where the blade was folded, and a couple of dry, browning spots */}
              <path d="M310 300L352 96" stroke="#dfe7b0" strokeWidth="2.4" opacity="0.6" />
              <path d="M313 300L355 96" stroke="#1b3f1c" strokeWidth="1" opacity="0.5" />
              <path d="M616 300L660 520" stroke="#dfe7b0" strokeWidth="2" opacity="0.5" />
              <path d="M619 300L663 520" stroke="#1b3f1c" strokeWidth="1" opacity="0.45" />
              <path d="M142 128Q150 140 148 152Q138 150 132 140Z" fill="#8a7a2a" opacity="0.5" />
              <path d="M842 388Q850 400 840 410Q828 404 830 392Z" fill="#8a7a2a" opacity="0.45" />
              <ellipse cx="760" cy="150" rx="14" ry="6" fill="#6e6622" opacity="0.3" transform="rotate(20 760 150)" />
              {/* Midrib */}
              <path d="M72 302C300 288 600 288 902 268" stroke="#1b3f1c" strokeWidth="13" strokeLinecap="round" opacity="0.35" transform="translate(0 4)" />
              <path d="M72 302C300 288 600 288 902 268" stroke="url(#midrib)" strokeWidth="10" strokeLinecap="round" />
              <path d="M72 302C300 288 600 288 902 268" stroke="#fff" strokeWidth="1.6" opacity="0.55" transform="translate(0 -3)" />
              <path d="M72 302C300 288 600 288 902 268" stroke="#7a8c38" strokeWidth="1.2" opacity="0.7" transform="translate(0 3.5)" />
              {/* The broad highlight a waxy leaf throws back, and the darker far end */}
              <path d={LEAF} fill="url(#leaf-gloss)" />
            </g>
          </g>
        </g>

        {/* ----- Along the top edge ----- */}

        {/* Salt */}
        <Heap x={128} y={222} rx={15} ry={9} fill="#f6f1e6" seed={201} i={0}>
          <path d={blob(124, 219, 8, 5, 202, 0.2, 8)} fill="#fff" opacity="0.7" />
        </Heap>

        {/* Mango pickle: glossy, oily, with pieces of skin showing */}
        <Heap x={178} y={200} rx={23} ry={15} fill="#861b10" seed={203} i={1} grain={false}>
          {PICKLE.map((p, n) => (
            <path key={n} d={blob(178 + p.x, 200 + p.y * 0.9, 5 + p.k * 3, 3.5 + p.k * 2, 210 + n, 0.25, 7)} fill={["#b7391c", "#c94d22", "#6d1208", "#e07a30"][n % 4]} opacity={n % 4 === 3 ? 0.8 : 1} />
          ))}
          <ellipse cx={168} cy={195} rx={6} ry={3} fill="#ff9a5a" opacity="0.35" />
        </Heap>

        {/* Lime wedge */}
        <g className="dish" style={{ ["--i" as string]: 2 }}>
          <path d="M218 200A24 24 0 0 1 258 188L238 182Z" fill="#0b1507" opacity="0.4" filter="url(#shadow)" transform="rotate(-20 238 190)" />
          <g transform="rotate(-20 238 190)">
            <path d="M218 200A24 24 0 0 1 258 188L238 182Z" fill="#d9e36a" />
            <path d="M218 200A24 24 0 0 1 258 188" fill="none" stroke="#7f9a2c" strokeWidth="4" />
            <path d="M218 200A24 24 0 0 1 258 188" fill="none" stroke="#c4d85a" strokeWidth="1.6" transform="translate(0 2.5)" />
            <path d="M238 182L222 198M238 182L246 200M238 182L256 189" stroke="#fff" strokeOpacity="0.8" strokeWidth="1.2" />
            <path d="M226 193Q238 186 250 191" stroke="#fff" strokeOpacity="0.5" strokeWidth="0.8" fill="none" />
            <ellipse cx={240} cy={191} rx={5} ry={3} fill="#fff" opacity="0.35" />
          </g>
        </g>

        {/* Banana chips: thin, blistered, golden */}
        <g className="dish" style={{ ["--i" as string]: 3 }}>
          <ellipse cx={304} cy={200} rx={30} ry={16} fill="#0b1507" opacity="0.4" filter="url(#shadow)" />
          {CHIPS.map((c, n) => {
            const cx = 302 + c.x;
            const cy = 198 + c.y * 0.8;
            return (
              <g key={n} transform={`rotate(${c.r * 0.3 - 20} ${cx} ${cy})`} filter="url(#dome-grain)">
                <path d={blob(cx, cy, 15, 11, 220 + n, 0.12, 10)} fill="#f0c95f" />
                <path d={blob(cx, cy, 9, 6, 230 + n, 0.3, 8)} fill="none" stroke="#d29a22" strokeWidth="1" opacity="0.8" />
                <path d={blob(cx + 2, cy + 1, 13, 9, 240 + n, 0.2, 9)} fill="none" stroke="#b67a12" strokeWidth="0.8" opacity="0.7" />
              </g>
            );
          })}
        </g>

        {/* Beetroot poriyal: small dice, grated coconut over it */}
        <Heap x={386} y={190} rx={33} ry={21} fill="#7c1b43" seed={205} i={4}>
          {BEET.map((b, n) => (
            <rect key={n} x={386 + b.x * 0.9 - 4} y={190 + b.y * 0.9 - 2.5} width={8} height={5} rx={1.5} transform={`rotate(${b.r} ${386 + b.x * 0.9} ${190 + b.y * 0.9})`} fill={["#a9265c", "#5a0f2d", "#c43a74", "#8c1f4d"][n % 4]} />
          ))}
          {BEET.filter((_, n) => n % 4 === 0).map((b, n) => (
            <ellipse key={n} cx={386 + b.x * 0.8} cy={190 + b.y * 0.8} rx={2.2} ry={1.2} transform={`rotate(${b.r} ${386 + b.x * 0.8} ${190 + b.y * 0.8})`} fill="#fff6ea" opacity="0.9" />
          ))}
        </Heap>

        {/* Beans poriyal with coconut */}
        <Heap x={476} y={186} rx={37} ry={22} fill="#3f6d26" seed={207} i={5}>
          {BEANS.map((b, n) => (
            <rect key={n} x={476 + b.x - 5} y={186 + b.y - 2} width={10} height={4.2} rx={2} transform={`rotate(${b.r} ${476 + b.x} ${186 + b.y})`} fill={["#6b9c3a", "#355f1e", "#86b24c", "#4b7b2a"][n % 4]} />
          ))}
          {BEANS.filter((_, n) => n % 3 === 0).map((b, n) => (
            <ellipse key={n} cx={476 + b.x * 0.9} cy={186 + b.y * 0.9} rx={2.4} ry={1.3} transform={`rotate(${b.r} ${476 + b.x * 0.9} ${186 + b.y * 0.9})`} fill="#fff8e8" />
          ))}
          <circle cx={462} cy={180} r={2.2} fill="#1d1612" />
          <circle cx={488} cy={194} r={2} fill="#1d1612" />
        </Heap>

        {/* Avial: vegetables in coconut and curd */}
        <Heap x={568} y={192} rx={36} ry={23} fill="#e3d49a" seed={209} i={6} grain={false}>
          {AVIAL.map((b, n) => (
            <rect
              key={n}
              x={568 + b.x * 0.9 - 5}
              y={192 + b.y * 0.9 - 3}
              width={11}
              height={6}
              rx={2}
              transform={`rotate(${b.r} ${568 + b.x * 0.9} ${192 + b.y * 0.9})`}
              fill={["#e58a2c", "#d7d3a0", "#6f9a3f", "#c9ad5e", "#f1e3b4", "#b8d48a"][n % 6]}
            />
          ))}
          <path d={blob(560, 186, 16, 9, 211, 0.2, 9)} fill="#f3ecd0" opacity="0.55" />
          <CurryLeaf x={552} y={176} rot={-25} size={0.55} />
        </Heap>

        {/* Kootu: dal and vegetables, soft */}
        <Heap x={654} y={204} rx={31} ry={20} fill="#c3b24a" seed={213} i={7} grain={false}>
          {KOOTU.map((b, n) => (
            <path key={n} d={blob(654 + b.x * 0.9, 204 + b.y * 0.9, n % 2 ? 3.5 : 2.5, n % 2 ? 2.5 : 2, 260 + n, 0.3, 7)} fill={["#e7d66a", "#8aa040", "#d6bf3c", "#f0e49a"][n % 4]} />
          ))}
          <circle cx={668} cy={198} r={1.8} fill="#1d1612" />
        </Heap>

        {/* Medu vadai: a crisp, pitted ring */}
        <g className="dish" style={{ ["--i" as string]: 8 }}>
          <circle cx={736} cy={220} r={25} fill="#0b1507" opacity="0.45" filter="url(#shadow)" />
          <g filter="url(#dome-grain)">
            <path d={`${blob(736, 220, 25, 24, 270, 0.07, 16)} ${blob(736, 220, 6.5, 6, 271, 0.2, 8)}`} fill="url(#vadai)" fillRule="evenodd" />
          </g>
          {Array.from({ length: 14 }, (_, n) => {
            const a = (n / 14) * Math.PI * 2;
            const rr = 11 + (n % 3) * 4.5;
            return <circle key={n} cx={736 + rr * Math.cos(a)} cy={220 + rr * Math.sin(a)} r={1.2 + (n % 2) * 0.8} fill="#5a2c0c" opacity="0.6" />;
          })}
          <path d="M716 206Q722 198 732 196" stroke="#fff" strokeOpacity="0.35" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </g>

        {/* Appalam: thin, blistered, curling at the edge, half over the leaf */}
        <g className="dish" style={{ ["--i" as string]: 9 }}>
          <path d={blob(822, 232, 56, 55, 281, 0.05, 20)} fill="#0b1507" opacity="0.4" filter="url(#shadow)" />
          <g filter="url(#dome-grain)">
            <path d={blob(822, 232, 56, 55, 281, 0.05, 20)} fill="url(#appalam)" />
            {BUBBLES.map((b, n) => (
              <circle key={n} cx={822 + b.x * 0.92} cy={232 + b.y * 0.92} r={n % 5 ? 2.5 + b.k * 2 : 5 + b.k * 3} fill={n % 3 ? "#c38d35" : "#f3dca0"} opacity={n % 3 ? 0.55 : 0.8} />
            ))}
          </g>
          <path d="M770 258Q790 282 822 287Q858 284 876 258" fill="none" stroke="#7d5420" strokeWidth="3" strokeOpacity="0.35" />
          <path d="M775 200Q795 182 822 180" fill="none" stroke="#fff" strokeOpacity="0.5" strokeWidth="2.5" strokeLinecap="round" />
        </g>

        {/* ----- The rice, below the midrib ----- */}

        <g className="dish" style={{ ["--i" as string]: 10 }}>
          <path d={rice} fill="#0b1507" opacity="0.45" filter="url(#shadow)" />
          <g filter="url(#dome)">
            <path d={rice} fill="url(#rice)" />
            {RICE.map((g, n) => (
              <ellipse
                key={n}
                cx={290 + g.x}
                cy={366 + g.y * 1.02}
                rx={4.4}
                ry={1.7}
                transform={`rotate(${g.r} ${290 + g.x} ${366 + g.y * 1.02})`}
                fill={["#f2ead9", "#fffdf8", "#e6ddc8", "#f8f3e6"][n % 4]}
                stroke="#cfc3a6"
                strokeWidth="0.45"
              />
            ))}
          </g>
          {/* Sambar ladled over one side, soaking in and pooling at the edge */}
          <g filter="url(#liquid)">
            <path d="M300 310C370 300 420 340 418 380C416 420 360 440 310 428C270 418 262 350 300 310Z" fill="url(#sambar)" opacity="0.94" />
            <path d="M386 420C408 428 424 446 410 452C396 458 372 440 386 420Z" fill="#a6391a" opacity="0.9" />
            <path d="M296 326C330 318 356 330 368 352" fill="none" stroke="#f0a060" strokeWidth="4" strokeOpacity="0.35" strokeLinecap="round" />
          </g>
          {SAMBAR_BITS.slice(0, 5).map((b, n) => (
            <path key={n} d={blob(345 + b.x * 0.7, 370 + b.y * 0.6, 7, 4, 290 + n, 0.2, 8)} fill={n % 2 ? "#e8a14a" : "#5f8032"} />
          ))}
          {/* Ghee, melting into the rice */}
          <path d={blob(240, 352, 16, 11, 295, 0.15, 10)} fill="url(#ghee)" opacity="0.92" filter="url(#liquid)" />
          <path d={blob(252, 362, 10, 5, 296, 0.3, 8)} fill="#f0b833" opacity="0.35" />
          <ellipse cx={233} cy={347} rx={5} ry={2.6} fill="#fff" opacity="0.7" transform="rotate(-25 233 347)" />
          <CurryLeaf x={360} y={332} rot={-30} size={0.75} />
          <CurryLeaf x={378} y={345} rot={20} size={0.65} />
          <Steam x={300} y={300} i={0} scale={1.1} />
        </g>

        {/* Paruppu beside the rice, with its own spoon of ghee */}
        <Heap x={440} y={318} rx={26} ry={17} fill="#e2b836" seed={301} i={11} grain={false}>
          {KOOTU.slice(0, 10).map((b, n) => (
            <path key={n} d={blob(440 + b.x * 0.7, 318 + b.y * 0.7, 3, 2.2, 310 + n, 0.3, 7)} fill={n % 2 ? "#f0cf5a" : "#c99a1c"} />
          ))}
          <path d={blob(444, 314, 9, 6, 320, 0.2, 8)} fill="url(#ghee)" opacity="0.9" />
          <circle cx={430} cy={322} r={2} fill="#8a1f14" />
          <circle cx={452} cy={326} r={2} fill="#8a1f14" />
        </Heap>

        {/* A banana at the stem end */}
        <g className="dish" style={{ ["--i" as string]: 12 }}>
          <path d="M92 462C120 440 200 442 236 470C218 486 150 494 96 476Z" fill="#0b1507" opacity="0.45" filter="url(#shadow)" />
          <g filter="url(#dome)">
            <path d="M92 462C120 440 200 442 236 470C218 486 150 494 96 476Z" fill="url(#banana)" />
          </g>
          <path d="M96 464C122 446 196 448 232 471" fill="none" stroke="#fff" strokeOpacity="0.4" strokeWidth="2" />
          <path d="M100 470C130 458 190 460 228 476" fill="none" stroke="#b98c14" strokeOpacity="0.6" strokeWidth="1" />
          <path d="M88 464L78 470L92 475Z" fill="#4a2e0c" />
          <path d="M236 470L247 466L241 477Z" fill="#4a2e0c" />
          {[[118, 462], [150, 456], [176, 457], [204, 464], [132, 476], [186, 478]].map(([cx, cy]) => (
            <ellipse key={cx} cx={cx} cy={cy} rx={2.2} ry={1.2} fill="#6b4a10" opacity="0.55" />
          ))}
        </g>

        {/* ----- Bowls ----- */}

        <Bowl x={458} y={438} r={40} i={13}>
          <circle cx={458} cy={438} r={40} fill="url(#curd)" />
          <path d={blob(450, 432, 14, 8, 330, 0.2, 9)} fill="#fff" opacity="0.6" />
          <path d="M438 450Q458 440 478 450" stroke="#d6cdb9" strokeWidth="1.5" fill="none" opacity="0.8" />
          <path d="M444 426Q456 420 470 428" stroke="#d6cdb9" strokeWidth="1" fill="none" opacity="0.6" />
        </Bowl>

        <Bowl x={578} y={390} r={54} i={14}>
          <circle cx={578} cy={390} r={54} fill="url(#sambar)" />
          {SAMBAR_BITS.map((b, n) => (
            <path key={n} d={blob(578 + b.x, 390 + b.y, n % 3 ? 7 : 11, n % 3 ? 4 : 5, 340 + n, 0.2, 8)} fill={["#e9a04a", "#5f8032", "#f0d68a", "#9c3615"][n % 4]} transform={`rotate(${b.r} ${578 + b.x} ${390 + b.y})`} />
          ))}
          <ellipse cx={590} cy={372} rx={16} ry={7} fill="#f4a24f" opacity="0.35" transform="rotate(-15 590 372)" />
          <CurryLeaf x={560} y={372} rot={-40} size={0.7} />
        </Bowl>

        <Bowl x={700} y={414} r={46} i={15}>
          <circle cx={700} cy={414} r={46} fill="url(#rasam)" />
          {RASAM_BITS.map((b, n) => (
            <circle key={n} cx={700 + b.x * 0.8} cy={414 + b.y * 0.8} r={n % 2 ? 1.8 : 3} fill={["#4f7a2c", "#e7c26a", "#7cab45", "#2b1a10"][n % 4]} opacity="0.9" />
          ))}
          <path d="M680 400Q700 392 722 402" stroke="#f0a060" strokeOpacity="0.3" strokeWidth="4" fill="none" strokeLinecap="round" />
        </Bowl>

        <Bowl x={806} y={372} r={42} i={16}>
          <circle cx={806} cy={372} r={42} fill="url(#payasam)" />
          {PAYASAM_BITS.map((b, n) => (
            <path key={n} d={blob(806 + b.x * 0.8, 372 + b.y * 0.8, n % 2 ? 4.5 : 2.8, n % 2 ? 2.8 : 2.6, 360 + n, 0.2, 7)} fill={n % 2 ? "#f7efdc" : "#5c2f18"} stroke={n % 2 ? "#cfa97a" : "none"} strokeWidth="0.6" />
          ))}
          <path d="M790 360q16 10 32 0" stroke="#fff" strokeOpacity="0.5" strokeWidth="1.5" fill="none" />
        </Bowl>

        {/* Steam over the sambar bowl, and a chilli and curry sprig as garnish on the leaf */}
        <g className="dish" style={{ ["--i" as string]: 17 }}>
          <Steam x={578} y={338} i={1.6} scale={0.9} />
          <path d="M520 470c20-6 44-4 62 8" stroke="#2b5222" strokeWidth="2.2" fill="none" strokeLinecap="round" />
          <CurryLeaf x={520} y={470} rot={-28} size={0.6} />
          <CurryLeaf x={540} y={465} rot={24} size={0.6} />
          <CurryLeaf x={558} y={468} rot={-20} size={0.6} />
          <CurryLeaf x={576} y={476} rot={22} size={0.6} />
          <path d="M636 486c24-6 50 0 64 14c-26-4-50-2-64-14Z" fill="#0b1507" opacity="0.4" filter="url(#shadow)" />
          <path d="M636 486c24-6 50 0 64 14c-26-4-50-2-64-14Z" fill="#8a1f14" />
          <path d="M640 487c22-5 44 0 56 10" stroke="#c9432c" strokeWidth="1.5" strokeOpacity="0.6" fill="none" />
          <path d="M636 486q-8 2-14-6" stroke="#55703a" strokeWidth="3" strokeLinecap="round" fill="none" />
        </g>
      </g>
    </svg>
  );
}
