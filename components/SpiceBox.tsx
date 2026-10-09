"use client";

import { useState } from "react";
import { POSITIONS, SPICES } from "@/lib/spices";

export function SpiceBox() {
  const [active, setActive] = useState(0);
  const spice = SPICES[active];

  return (
    <div className="mx-auto w-full max-w-[30rem]">
      <div className="relative aspect-square">
        <svg viewBox="0 0 500 500" aria-hidden="true" className="spin-slow absolute inset-0 h-full w-full">
          <defs>
            <path id="ring" d="M250 250m-232 0a232 232 0 1 1 464 0a232 232 0 1 1-464 0" />
          </defs>
          <text className="fill-cream/60 text-[13px] font-medium uppercase" letterSpacing="3.6">
            <textPath href="#ring">
              manjal · curcumin ✦ kadugu · isothiocyanate ✦ jeeragam · cuminaldehyde ✦ milagai · capsaicin ✦ vendhayam · sotolon ✦
            </textPath>
          </text>
        </svg>
        <div className="dabba absolute inset-[9%] rounded-full">
          {SPICES.map((s, i) => (
            <button
              key={s.name}
              type="button"
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              aria-pressed={active === i}
              aria-label={`${s.name} (${s.local})`}
              className="bowl absolute aspect-square w-[27%] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                left: `${POSITIONS[i].left.toFixed(2)}%`,
                top: `${POSITIONS[i].top.toFixed(2)}%`,
                ["--spice" as string]: s.color,
              }}
            />
          ))}
        </div>
      </div>
      <div aria-live="polite" className="mt-6 rounded-sm bg-cream p-6 text-ink shadow-xl shadow-black/20">
        <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="font-serif text-3xl font-semibold">{spice.name}</span>
          <span className="italic text-ink/60">{spice.local}</span>
          <span className="ml-auto text-xs font-medium uppercase tracking-[0.16em] text-maroon">{spice.compound}</span>
        </p>
        <p className="mt-3 min-h-[4.9rem] leading-relaxed text-ink/80">{spice.fact}</p>
      </div>
    </div>
  );
}
