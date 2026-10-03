"use client";

import { useState } from "react";

// The masala dabba: seven spices, each with the compound that gives it its character.
const SPICES = [
  {
    name: "Turmeric",
    local: "haldi",
    compound: "curcumin",
    color: "#E0A21B",
    fact: "Curcumin dissolves in fat, not water. That is why haldi goes into the hot oil rather than the simmering dal.",
  },
  {
    name: "Mustard seed",
    local: "rai",
    compound: "allyl isothiocyanate",
    color: "#3B2A24",
    fact: "Crushed with water, mustard turns sharp. Popped whole in hot oil, the enzyme that makes the sharpness is switched off, and the seeds taste nutty.",
  },
  {
    name: "Cumin",
    local: "jeera",
    compound: "cuminaldehyde",
    color: "#8C6A3C",
    fact: "The warm, earthy smell of jeera is cuminaldehyde. A few seconds of sizzling pulls it into the oil, which carries it through the dish.",
  },
  {
    name: "Red chilli",
    local: "mirch",
    compound: "capsaicin",
    color: "#B3271E",
    fact: "Capsaicin clings to fat and ignores water. A spoon of yoghurt or ghee calms the heat when a glass of water will not.",
  },
  {
    name: "Coriander seed",
    local: "dhania",
    compound: "linalool",
    color: "#B8A065",
    fact: "Linalool gives dhania its floral, citrus note. It evaporates quickly once ground, so freshly ground seed smells brighter.",
  },
  {
    name: "Asafoetida",
    local: "hing",
    compound: "sulfur compounds",
    color: "#DCC68C",
    fact: "Raw hing is harsh. A pinch in hot fat changes its sulfur compounds into something savoury, close to cooked onion and garlic.",
  },
  {
    name: "Fenugreek",
    local: "methi",
    compound: "sotolon",
    color: "#C0903A",
    fact: "In small amounts sotolon smells of maple and caramel. Toast methi seeds gently: they turn bitter when they burn.",
  },
];

// Centre bowl, then six around it.
const POSITIONS = [
  { left: 50, top: 50 },
  ...[0, 1, 2, 3, 4, 5].map((i) => {
    const a = ((-90 + i * 60) * Math.PI) / 180;
    return { left: 50 + 31.5 * Math.cos(a), top: 50 + 31.5 * Math.sin(a) };
  }),
];

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
          <text className="fill-turmeric font-mono text-[15px] uppercase" letterSpacing="5.5">
            <textPath href="#ring">
              haldi · curcumin ✦ rai · isothiocyanate ✦ jeera · cuminaldehyde ✦ mirch · capsaicin ✦ dhania · linalool ✦ methi · sotolon ✦
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
      <div aria-live="polite" className="hard-shadow mt-4 rounded-2xl bg-rice p-5 text-indigo">
        <p className="flex flex-wrap items-baseline gap-x-3">
          <span className="font-display text-3xl">{spice.name}</span>
          <span className="italic opacity-60">{spice.local}</span>
          <span className="ml-auto rounded-full bg-indigo px-3 py-1 font-mono text-xs uppercase tracking-widest text-turmeric">
            {spice.compound}
          </span>
        </p>
        <p className="mt-2 min-h-[4.9rem] leading-relaxed opacity-85">{spice.fact}</p>
      </div>
    </div>
  );
}
