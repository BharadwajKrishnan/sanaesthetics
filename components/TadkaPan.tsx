"use client";

import { useEffect, useRef, useState } from "react";

const STEPS = [
  {
    label: "Ghee",
    step: "Heat the ghee until one cumin seed sizzles on contact.",
    why: "Most aroma compounds in spices dissolve in fat, not water. Hot fat pulls them out of the seed and carries them through the whole pot.",
  },
  {
    label: "Mustard",
    step: "Add the mustard seeds first and wait for them to pop.",
    why: "The water inside each seed turns to steam and bursts the shell. That takes the highest heat, so mustard goes in before anything delicate.",
  },
  {
    label: "Cumin",
    step: "Cumin next, only until it darkens a shade.",
    why: "Toasting builds new nutty, roasted flavours within seconds. A few seconds more and the same reactions produce bitterness.",
  },
  {
    label: "Perungayam + curry leaf",
    step: "Perungayam and curry leaves last, then pour it over the dal at once.",
    why: "Their aromas are the most fragile and escape into the air quickly. Pouring straight away traps them in the dish instead of the kitchen.",
  },
];

// Deterministic scatter so server and client render the same pan.
function scatter(count: number, seed: number, radius: number) {
  let s = seed;
  const rand = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
  return Array.from({ length: count }, () => {
    const a = rand() * Math.PI * 2;
    const r = Math.sqrt(rand()) * radius;
    return {
      x: Math.round(200 + r * Math.cos(a)),
      y: Math.round(200 + r * Math.sin(a)),
      rot: Math.round(rand() * 180),
    };
  });
}

const MUSTARD = scatter(34, 7, 105);
const CUMIN = scatter(26, 21, 105);
const LEAVES = scatter(7, 54, 85);
const BUBBLES = scatter(12, 3, 110);

export function TadkaPan() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const show = (n: number) => `pan-item${active >= n ? " in" : ""}`;

  return (
    <div className="mt-12 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
      <div className="sticky top-[4.5rem] z-10 -mx-5 self-start bg-cream px-5 py-3 lg:top-32 lg:mx-0 lg:p-0">
        <svg viewBox="0 0 400 400" role="img" aria-label={`A tadka pan, seen from above. Now in the pan: ${STEPS.slice(0, active + 1).map((s) => s.label).join(", ")}.`} className="mx-auto w-40 sm:w-56 lg:w-full lg:max-w-md">
          <rect x="320" y="184" width="80" height="32" rx="16" fill="#2b2521" />
          <circle cx="200" cy="200" r="172" fill="#2b2521" />
          <circle cx="200" cy="200" r="150" fill="#3d342d" />
          <circle cx="200" cy="200" r="132" fill="#e4bb6a" />
          <circle cx="200" cy="200" r="132" fill="#c8963f" opacity="0.3" />
          {BUBBLES.map((b, i) => (
            <circle key={i} className="sizzle" style={{ animationDelay: `${(i % 6) * 0.27}s` }} cx={b.x} cy={b.y} r="5" fill="none" stroke="#fffaf5" strokeWidth="1.5" />
          ))}
          {MUSTARD.map((m, i) => (
            <circle key={i} className={show(1)} style={{ transitionDelay: `${i * 18}ms` }} cx={m.x} cy={m.y} r="5.5" fill="#2b2521" />
          ))}
          {CUMIN.map((c, i) => (
            <g key={i} transform={`rotate(${c.rot} ${c.x} ${c.y})`}>
              <ellipse className={show(2)} style={{ transitionDelay: `${i * 18}ms` }} cx={c.x} cy={c.y} rx="10" ry="3.2" fill="#7a4a1c" />
            </g>
          ))}
          {LEAVES.map((l, i) => (
            <g key={i} transform={`rotate(${l.rot} ${l.x} ${l.y})`}>
              <path className={show(3)} style={{ transitionDelay: `${i * 60}ms` }} d={`M${l.x - 30} ${l.y}Q${l.x} ${l.y - 20} ${l.x + 30} ${l.y}Q${l.x} ${l.y + 20} ${l.x - 30} ${l.y}Z`} fill="#3f6b35" stroke="#1f3627" strokeWidth="1.5" />
            </g>
          ))}
        </svg>
        <p className="mt-3 text-center text-xs font-medium uppercase tracking-[0.18em] text-ink/60" aria-hidden="true">
          In the pan: {STEPS[active].label}
        </p>
      </div>

      <ol>
        {STEPS.map((row, i) => (
          <li
            key={row.label}
            data-i={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            className={`border-l-2 py-10 pl-6 transition-opacity duration-300 lg:py-16 ${active === i ? "border-maroon" : "border-line opacity-45"}`}
          >
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-ink/60">What tradition says</p>
            <p className="mt-3 font-serif text-3xl font-semibold leading-tight sm:text-4xl">{row.step}</p>
            <p className="mt-7 text-xs font-medium uppercase tracking-[0.18em] text-maroon">What the science says</p>
            <p className="mt-3 max-w-xl text-lg leading-relaxed text-ink/80">{row.why}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
