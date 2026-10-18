// A full South Indian meal served on a banana leaf, seen from above, drawn for the hero.
// The leaf lies with its tip to the right. Along the top edge, as tradition has it, the small things:
// salt, pickle, a lime wedge, banana chips, beetroot and beans poriyal, avial, kootu, a vadai and an
// appalam. Below, the rice with sambar and ghee, with bowls of sambar, rasam, curd and payasam, a
// banana at the stem end, and a spoon of paruppu. Each dish carries a .dish class and an index, so the
// stylesheet can serve them one after another; the steam over the rice and the sambar loops for ever.

// Deterministic scatter so server and client draw the same picture.
function scatter(count: number, seed: number, w: number, h: number) {
  let s = seed;
  const rand = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
  return Array.from({ length: count }, () => ({ x: rand() * w - w / 2, y: rand() * h - h / 2, r: rand() * 180, k: rand() }));
}

const RICE = scatter(150, 7, 230, 140);
const BEANS = scatter(26, 13, 74, 44);
const BEET = scatter(34, 19, 66, 42);
const AVIAL = scatter(22, 29, 70, 44);
const KOOTU = scatter(18, 31, 62, 40);
const SAMBAR_BITS = scatter(10, 37, 70, 70);
const RASAM_BITS = scatter(12, 41, 60, 60);
const PAYASAM_BITS = scatter(9, 43, 56, 56);
const BUBBLES = scatter(40, 47, 100, 100);

type At = { x: number; y: number };

// A soft, blurred shadow under anything that sits on the leaf.
function Shadow({ x, y, rx, ry = rx * 0.7, o = 0.28 }: At & { rx: number; ry?: number; o?: number }) {
  return <ellipse cx={x + 3} cy={y + 6} rx={rx} ry={ry} fill="#0d1a0a" opacity={o} filter="url(#blur)" />;
}

// A steel katori: a rim that catches the light, and whatever is inside it.
function Bowl({ x, y, r, i, children }: At & { r: number; i: number; children: React.ReactNode }) {
  return (
    <g className="dish" style={{ ["--i" as string]: i }}>
      <Shadow x={x} y={y} rx={r * 1.05} ry={r * 0.95} o={0.35} />
      <circle cx={x} cy={y} r={r} fill="url(#steel)" />
      <circle cx={x} cy={y} r={r - 1.5} fill="none" stroke="#fff" strokeOpacity="0.55" strokeWidth="1.2" />
      <circle cx={x} cy={y} r={r * 0.82} fill="#5a5148" />
      <clipPath id={`bowl-${i}`}>
        <circle cx={x} cy={y} r={r * 0.8} />
      </clipPath>
      <g clipPath={`url(#bowl-${i})`}>{children}</g>
      {/* Inner shadow at the top of the bowl, and the highlight on the rim */}
      <circle cx={x} cy={y} r={r * 0.8} fill="url(#bowl-shade)" />
      <path d={`M${x - r * 0.72} ${y - r * 0.32}A${r * 0.8} ${r * 0.8} 0 0 1 ${x - r * 0.2} ${y - r * 0.78}`} fill="none" stroke="#fff" strokeOpacity="0.5" strokeWidth="2.2" strokeLinecap="round" />
    </g>
  );
}

// A mound of something laid straight on the leaf.
function Mound({ x, y, rx, ry, fill, i, children }: At & { rx: number; ry: number; fill: string; i: number; children?: React.ReactNode }) {
  return (
    <g className="dish" style={{ ["--i" as string]: i }}>
      <Shadow x={x} y={y} rx={rx} ry={ry} />
      <ellipse cx={x} cy={y} rx={rx} ry={ry} fill={fill} />
      {children}
      <ellipse cx={x - rx * 0.3} cy={y - ry * 0.35} rx={rx * 0.45} ry={ry * 0.35} fill="#fff" opacity="0.14" />
    </g>
  );
}

function Steam({ x, y, i, scale = 1 }: At & { i: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" opacity="0.9">
      <path className="steam" style={{ ["--i" as string]: i }} d="M-14 0c-8-12 8-18 0-32" />
      <path className="steam" style={{ ["--i" as string]: i + 0.4 }} d="M4 -4c-9-14 9-20 0-36" />
      <path className="steam" style={{ ["--i" as string]: i + 0.8 }} d="M20 2c-7-11 7-17 0-30" />
    </g>
  );
}

function CurryLeaf({ x, y, rot, size = 1 }: At & { rot: number; size?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${size})`}>
      <path d="M0 0Q16-9 34 0Q16 9 0 0Z" fill="#2f5a24" />
      <path d="M0 0Q16-9 34 0Z" fill="#4e7d3a" opacity="0.6" />
      <path d="M2 0H31" stroke="#1d3a16" strokeWidth="0.7" opacity="0.7" />
    </g>
  );
}

export function BananaLeafMeal({ className = "" }: { className?: string }) {
  // Fine veins run from the midrib to each edge, leaning towards the tip.
  const veins = Array.from({ length: 58 }, (_, n) => 88 + n * 14);

  return (
    <svg viewBox="0 0 920 600" aria-hidden="true" className={className}>
      <defs>
        <filter id="blur" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
        <filter id="leaf-shadow" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="18" stdDeviation="14" floodColor="#1b1409" floodOpacity="0.35" />
        </filter>
        <radialGradient id="leaf-base" cx="42%" cy="46%" r="70%">
          <stop offset="0" stopColor="#5f9a46" />
          <stop offset="0.55" stopColor="#3f7a3a" />
          <stop offset="1" stopColor="#245424" />
        </radialGradient>
        <linearGradient id="leaf-sheen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.18" />
          <stop offset="0.45" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.12" />
        </linearGradient>
        <linearGradient id="steel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f4f1ea" />
          <stop offset="0.35" stopColor="#b9b3a8" />
          <stop offset="0.6" stopColor="#8d867a" />
          <stop offset="1" stopColor="#d8d2c6" />
        </linearGradient>
        <radialGradient id="bowl-shade" cx="50%" cy="50%" r="50%">
          <stop offset="0.6" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.45" />
        </radialGradient>
        <radialGradient id="sambar" cx="45%" cy="40%" r="60%">
          <stop offset="0" stopColor="#d9682c" />
          <stop offset="1" stopColor="#9b3a17" />
        </radialGradient>
        <radialGradient id="rasam" cx="45%" cy="40%" r="60%">
          <stop offset="0" stopColor="#b8552a" />
          <stop offset="1" stopColor="#6f2914" />
        </radialGradient>
        <radialGradient id="payasam" cx="45%" cy="40%" r="60%">
          <stop offset="0" stopColor="#f6dfc0" />
          <stop offset="1" stopColor="#d9b088" />
        </radialGradient>
        <radialGradient id="curd" cx="40%" cy="35%" r="65%">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#e3dccd" />
        </radialGradient>
        <radialGradient id="rice" cx="40%" cy="35%" r="70%">
          <stop offset="0" stopColor="#fffdf7" />
          <stop offset="1" stopColor="#e9e2d2" />
        </radialGradient>
        <radialGradient id="ghee" cx="40%" cy="35%" r="60%">
          <stop offset="0" stopColor="#ffe9a3" />
          <stop offset="1" stopColor="#e2a21c" />
        </radialGradient>
        <radialGradient id="appalam" cx="45%" cy="45%" r="55%">
          <stop offset="0" stopColor="#f3dfae" />
          <stop offset="0.8" stopColor="#dcbb79" />
          <stop offset="1" stopColor="#b98a44" />
        </radialGradient>
        <linearGradient id="banana" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6d35b" />
          <stop offset="1" stopColor="#d9a81f" />
        </linearGradient>
        <clipPath id="leaf-clip">
          <path d="M72 165C66 120 150 96 300 90C470 84 640 96 770 130C850 150 896 205 902 268C896 335 820 420 700 462C560 508 330 520 190 490C100 472 70 420 72 350Z" />
        </clipPath>
      </defs>

      <g className="leaf-float">
        {/* The leaf */}
        <g filter="url(#leaf-shadow)">
          <path
            d="M72 165C66 120 150 96 300 90C470 84 640 96 770 130C850 150 896 205 902 268C896 335 820 420 700 462C560 508 330 520 190 490C100 472 70 420 72 350Z"
            fill="url(#leaf-base)"
            stroke="#1f4a20"
            strokeWidth="3"
          />
        </g>
        <g clipPath="url(#leaf-clip)">
          {/* Veins, lighter than the blade, leaning to the tip */}
          <g stroke="#9fc26c" strokeWidth="1" opacity="0.5">
            {veins.map((x) => (
              <path key={x} d={`M${x} 300L${x + 26} 60M${x} 300L${x + 26} 540`} />
            ))}
          </g>
          <g stroke="#1f4a20" strokeWidth="0.6" opacity="0.35">
            {veins.map((x) => (
              <path key={x} d={`M${x + 7} 300L${x + 33} 60M${x + 7} 300L${x + 33} 540`} />
            ))}
          </g>
          {/* A couple of splits in the blade, where it was folded */}
          <path d="M310 300L352 96" stroke="#f7f2eb" strokeWidth="2.2" opacity="0.5" />
          <path d="M616 300L660 520" stroke="#f7f2eb" strokeWidth="1.8" opacity="0.45" />
          {/* Midrib */}
          <path d="M72 302C300 288 600 288 902 268" stroke="#d6dc7c" strokeWidth="9" strokeLinecap="round" opacity="0.95" />
          <path d="M72 302C300 288 600 288 902 268" stroke="#8fa84a" strokeWidth="2.5" />
          <path d="M72 302C300 288 600 288 902 268" stroke="#fff" strokeWidth="1.4" opacity="0.5" transform="translate(0 -2.5)" />
          <path
            d="M72 165C66 120 150 96 300 90C470 84 640 96 770 130C850 150 896 205 902 268C896 335 820 420 700 462C560 508 330 520 190 490C100 472 70 420 72 350Z"
            fill="url(#leaf-sheen)"
          />
        </g>

        {/* ----- Along the top edge ----- */}

        {/* Salt */}
        <Mound x={128} y={222} rx={16} ry={10} fill="#f4efe6" i={0} />

        {/* Mango pickle */}
        <Mound x={178} y={200} rx={23} ry={15} fill="#8a1f14" i={1}>
          <ellipse cx={172} cy={197} rx={7} ry={5} fill="#b33a1e" />
          <ellipse cx={187} cy={204} rx={6} ry={4} fill="#c04a1f" />
          <ellipse cx={180} cy={192} rx={4} ry={3} fill="#e07a30" opacity="0.8" />
        </Mound>

        {/* Lime wedge */}
        <g className="dish" style={{ ["--i" as string]: 2 }}>
          <Shadow x={236} y={190} rx={18} ry={12} />
          <path d="M218 200A24 24 0 0 1 258 188L238 182Z" fill="#cfd96a" transform="rotate(-20 238 190)" />
          <path d="M218 200A24 24 0 0 1 258 188L238 182Z" fill="none" stroke="#8ea33a" strokeWidth="2.5" transform="rotate(-20 238 190)" />
          <path d="M238 182L222 198M238 182L246 200M238 182L256 189" stroke="#fff" strokeOpacity="0.7" strokeWidth="1" transform="rotate(-20 238 190)" />
        </g>

        {/* Banana chips */}
        <g className="dish" style={{ ["--i" as string]: 3 }}>
          <Shadow x={302} y={198} rx={30} ry={16} />
          {[
            [286, 196, -10],
            [306, 190, 12],
            [322, 202, -4],
            [298, 208, 20],
          ].map(([cx, cy, rot]) => (
            <g key={`${cx}-${cy}`} transform={`rotate(${rot} ${cx} ${cy})`}>
              <ellipse cx={cx} cy={cy} rx={15} ry={11} fill="#f0c85a" stroke="#c9961e" strokeWidth="1.5" />
              <ellipse cx={cx} cy={cy} rx={8} ry={5.5} fill="none" stroke="#e0a21b" strokeWidth="1" opacity="0.8" />
            </g>
          ))}
        </g>

        {/* Beetroot poriyal */}
        <Mound x={386} y={190} rx={33} ry={21} fill="#8e1f4b" i={4}>
          {BEET.map((b, n) => (
            <rect key={n} x={386 + b.x * 0.9 - 4} y={190 + b.y * 0.9 - 2.5} width={8} height={5} rx={1.5} transform={`rotate(${b.r} ${386 + b.x * 0.9} ${190 + b.y * 0.9})`} fill={n % 3 ? "#b42c63" : "#5e1232"} />
          ))}
          {BEET.filter((_, n) => n % 5 === 0).map((b, n) => (
            <circle key={n} cx={386 + b.x * 0.8} cy={190 + b.y * 0.8} r={1.6} fill="#fff" opacity="0.8" />
          ))}
        </Mound>

        {/* Beans poriyal with coconut */}
        <Mound x={476} y={186} rx={37} ry={22} fill="#4b7a2c" i={5}>
          {BEANS.map((b, n) => (
            <rect key={n} x={476 + b.x - 5} y={186 + b.y - 2} width={10} height={4} rx={2} transform={`rotate(${b.r} ${476 + b.x} ${186 + b.y})`} fill={n % 2 ? "#6a9a3c" : "#3d6b24"} />
          ))}
          {BEANS.filter((_, n) => n % 3 === 0).map((b, n) => (
            <circle key={n} cx={476 + b.x * 0.9} cy={186 + b.y * 0.9} r={1.8} fill="#fff8e8" />
          ))}
        </Mound>

        {/* Avial */}
        <Mound x={568} y={192} rx={36} ry={23} fill="#e7d79a" i={6}>
          {AVIAL.map((b, n) => (
            <rect
              key={n}
              x={568 + b.x * 0.9 - 5}
              y={192 + b.y * 0.9 - 3}
              width={10}
              height={6}
              rx={2}
              transform={`rotate(${b.r} ${568 + b.x * 0.9} ${192 + b.y * 0.9})`}
              fill={["#e38a2c", "#d9d6a7", "#7aa14a", "#c8b26a", "#f0e2b2"][n % 5]}
            />
          ))}
          <CurryLeaf x={552} y={176} rot={-25} size={0.55} />
        </Mound>

        {/* Kootu */}
        <Mound x={654} y={204} rx={31} ry={20} fill="#c9b94a" i={7}>
          {KOOTU.map((b, n) => (
            <circle key={n} cx={654 + b.x * 0.9} cy={204 + b.y * 0.9} r={n % 2 ? 3 : 2} fill={n % 3 ? "#e7d66a" : "#8aa040"} />
          ))}
        </Mound>

        {/* Medu vadai */}
        <g className="dish" style={{ ["--i" as string]: 8 }}>
          <Shadow x={736} y={222} rx={26} ry={20} />
          <circle cx={736} cy={220} r={25} fill="#a9672c" />
          <circle cx={736} cy={220} r={25} fill="none" stroke="#7a4518" strokeWidth="2" />
          <circle cx={736} cy={220} r={7} fill="#2f5a24" opacity="0.35" />
          <circle cx={736} cy={220} r={6} fill="#3f7a3a" />
          <circle cx={728} cy={212} r={9} fill="#fff" opacity="0.18" />
          {[0, 50, 100, 150, 200, 250, 300].map((a) => (
            <circle key={a} cx={736 + 16 * Math.cos((a * Math.PI) / 180)} cy={220 + 16 * Math.sin((a * Math.PI) / 180)} r={1.8} fill="#6a3a12" opacity="0.7" />
          ))}
        </g>

        {/* Appalam, half over the edge of the leaf */}
        <g className="dish" style={{ ["--i" as string]: 9 }}>
          <Shadow x={824} y={236} rx={58} ry={50} o={0.3} />
          <circle cx={822} cy={232} r={56} fill="url(#appalam)" stroke="#c9a45a" strokeWidth="1.5" />
          {BUBBLES.map((b, n) => (
            <circle key={n} cx={822 + b.x * 0.9} cy={232 + b.y * 0.9} r={n % 4 ? 3.5 : 6} fill={n % 3 ? "#c8973d" : "#e7c57b"} opacity="0.65" />
          ))}
          <ellipse cx={802} cy={212} rx={22} ry={14} fill="#fff" opacity="0.25" />
        </g>

        {/* ----- The rice, below the midrib ----- */}

        <g className="dish" style={{ ["--i" as string]: 10 }}>
          <Shadow x={290} y={372} rx={135} ry={82} o={0.32} />
          <ellipse cx={290} cy={366} rx={132} ry={80} fill="url(#rice)" />
          <g>
            {RICE.map((g, n) => (
              <ellipse key={n} cx={290 + g.x} cy={366 + g.y * 1.05} rx={4.2} ry={1.6} transform={`rotate(${g.r} ${290 + g.x} ${366 + g.y * 1.05})`} fill={n % 4 ? "#ece4d2" : "#fffdf8"} stroke="#d6cbb3" strokeWidth="0.4" />
            ))}
          </g>
          {/* Sambar poured over one side, pooling at the edge */}
          <path d="M300 310C370 300 420 340 418 380C416 420 360 440 310 428C270 418 262 350 300 310Z" fill="url(#sambar)" opacity="0.92" />
          <path d="M386 420C408 428 424 446 410 452C396 458 372 440 386 420Z" fill="#b5451d" opacity="0.85" />
          {SAMBAR_BITS.slice(0, 5).map((b, n) => (
            <ellipse key={n} cx={345 + b.x * 0.7} cy={370 + b.y * 0.6} rx={7} ry={4} transform={`rotate(${b.r} ${345 + b.x * 0.7} ${370 + b.y * 0.6})`} fill={n % 2 ? "#e9a04a" : "#6f8f3a"} />
          ))}
          {/* Ghee */}
          <ellipse cx={240} cy={352} rx={16} ry={11} fill="url(#ghee)" opacity="0.95" />
          <ellipse cx={234} cy={348} rx={5} ry={3} fill="#fff" opacity="0.6" />
          <CurryLeaf x={360} y={332} rot={-30} size={0.75} />
          <CurryLeaf x={378} y={345} rot={20} size={0.65} />
          <Steam x={300} y={300} i={0} scale={1.1} />
        </g>

        {/* Paruppu beside the rice */}
        <Mound x={440} y={318} rx={26} ry={17} fill="#e4bb3a" i={11}>
          <ellipse cx={444} cy={314} rx={9} ry={6} fill="url(#ghee)" />
          <circle cx={430} cy={322} r={2} fill="#8a1f14" />
          <circle cx={452} cy={326} r={2} fill="#8a1f14" />
        </Mound>

        {/* Banana at the stem end */}
        <g className="dish" style={{ ["--i" as string]: 12 }}>
          <Shadow x={150} y={476} rx={60} ry={14} />
          <path d="M92 462C120 440 200 442 236 470C218 486 150 494 96 476Z" fill="url(#banana)" stroke="#b8891a" strokeWidth="1.5" />
          <path d="M92 462C120 440 200 442 236 470" fill="none" stroke="#fff" strokeOpacity="0.45" strokeWidth="2" />
          <path d="M88 464L80 470L92 474" fill="#5a3a12" />
          <path d="M236 470L246 466L240 476" fill="#5a3a12" />
          <path d="M110 458L128 458M150 452L170 452" stroke="#8a6a1a" strokeWidth="1" opacity="0.5" />
        </g>

        {/* ----- Bowls ----- */}

        <Bowl x={458} y={438} r={40} i={13}>
          <circle cx={458} cy={438} r={40} fill="url(#curd)" />
          <ellipse cx={448} cy={430} rx={14} ry={8} fill="#fff" opacity="0.8" />
          <path d="M440 448Q458 440 476 448" stroke="#e3dccd" strokeWidth="1.5" fill="none" />
        </Bowl>

        <Bowl x={578} y={390} r={54} i={14}>
          <circle cx={578} cy={390} r={54} fill="url(#sambar)" />
          {SAMBAR_BITS.map((b, n) => (
            <ellipse key={n} cx={578 + b.x} cy={390 + b.y} rx={n % 3 ? 7 : 11} ry={n % 3 ? 4 : 5} transform={`rotate(${b.r} ${578 + b.x} ${390 + b.y})`} fill={["#e9a04a", "#6f8f3a", "#f0d68a", "#b5451d"][n % 4]} />
          ))}
          <CurryLeaf x={560} y={372} rot={-40} size={0.7} />
          <ellipse cx={562} cy={372} rx={16} ry={9} fill="#fff" opacity="0.14" />
        </Bowl>

        <Bowl x={700} y={414} r={46} i={15}>
          <circle cx={700} cy={414} r={46} fill="url(#rasam)" />
          {RASAM_BITS.map((b, n) => (
            <circle key={n} cx={700 + b.x * 0.8} cy={414 + b.y * 0.8} r={n % 2 ? 2 : 3} fill={n % 3 ? "#4f7a2c" : "#e7c26a"} opacity="0.9" />
          ))}
          <ellipse cx={690} cy={402} rx={14} ry={8} fill="#fff" opacity="0.14" />
        </Bowl>

        <Bowl x={806} y={372} r={42} i={16}>
          <circle cx={806} cy={372} r={42} fill="url(#payasam)" />
          {PAYASAM_BITS.map((b, n) => (
            <ellipse key={n} cx={806 + b.x * 0.8} cy={372 + b.y * 0.8} rx={n % 2 ? 4 : 2.6} ry={n % 2 ? 2.6 : 2.6} fill={n % 2 ? "#f5ecd6" : "#6b3b22"} stroke={n % 2 ? "#d9b088" : "none"} strokeWidth="0.6" />
          ))}
          <path d="M792 360q14 10 28 0" stroke="#fff" strokeOpacity="0.5" strokeWidth="1.5" fill="none" />
        </Bowl>

        {/* Steam over the sambar bowl, and a chilli and curry sprig as garnish on the leaf */}
        <g className="dish" style={{ ["--i" as string]: 17 }}>
          <Steam x={578} y={338} i={1.6} scale={0.9} />
          <path d="M520 470c20-6 44-4 62 8" stroke="#2f5a24" strokeWidth="2.2" fill="none" strokeLinecap="round" />
          <CurryLeaf x={520} y={470} rot={-28} size={0.6} />
          <CurryLeaf x={540} y={465} rot={24} size={0.6} />
          <CurryLeaf x={558} y={468} rot={-20} size={0.6} />
          <CurryLeaf x={576} y={476} rot={22} size={0.6} />
          <path d="M636 486c24-6 50 0 64 14c-26-4-50-2-64-14Z" fill="#8a1f14" />
          <path d="M636 486q-8 2-14-6" stroke="#55703a" strokeWidth="3" strokeLinecap="round" fill="none" />
        </g>
      </g>
    </svg>
  );
}
