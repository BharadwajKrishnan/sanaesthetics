"use client";

import { useState } from "react";

// Arusuvai: the six tastes of Tamil cooking.
const TASTES = [
  {
    tamil: "இனிப்பு",
    roman: "inippu",
    english: "Sweet",
    found: "Jaggery, ripe banana, coconut",
    molecule: "sucrose",
    does: "Rounds off heat and sourness. A pinch of jaggery in sambar is there to settle the tamarind, not to make it sweet.",
  },
  {
    tamil: "புளிப்பு",
    roman: "pulippu",
    english: "Sour",
    found: "Tamarind, raw mango, curd",
    molecule: "tartaric + lactic acid",
    does: "Makes the mouth water and lifts heavy dishes. Tamarind gets its sourness from tartaric acid, curd from lactic acid.",
  },
  {
    tamil: "உப்பு",
    roman: "uppu",
    english: "Salty",
    found: "Sea salt, rock salt",
    molecule: "sodium chloride",
    does: "Does more than taste salty: it mutes bitterness and makes the other flavours easier to notice.",
  },
  {
    tamil: "கசப்பு",
    roman: "kasappu",
    english: "Bitter",
    found: "Bitter gourd, fenugreek, neem flower",
    molecule: "momordicin (bitter gourd)",
    does: "A little bitterness gives a dish depth. Salt, fat and sourness are the traditional ways to keep it in check.",
  },
  {
    tamil: "கார்ப்பு",
    roman: "kaarppu",
    english: "Pungent",
    found: "Chilli, black pepper, ginger",
    molecule: "capsaicin · piperine",
    does: "Not a taste at all, strictly speaking. Capsaicin sets off the same nerve receptor that senses real heat.",
  },
  {
    tamil: "துவர்ப்பு",
    roman: "thuvarppu",
    english: "Astringent",
    found: "Raw banana, banana flower, betel nut",
    molecule: "tannins",
    does: "The dry, puckering feeling. Tannins bind to the proteins in saliva, so the mouth briefly loses its slip.",
  },
];

export function SixTastes() {
  const [active, setActive] = useState(0);
  const t = TASTES[active];

  return (
    <div className="mt-8 grid items-center gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12">
      <div className="reveal relative mx-auto aspect-square w-full max-w-[22rem] sm:max-w-[24rem]">
        {/* A dashed ring turning slowly behind the tastes */}
        <svg viewBox="0 0 100 100" aria-hidden="true" className="orbit absolute inset-0 h-full w-full text-cream/25">
          <circle cx="50" cy="50" r="34.5" fill="none" stroke="currentColor" strokeWidth="0.4" strokeDasharray="1.5 3" />
          <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.3" strokeDasharray="0.6 4" />
        </svg>
        <div className="absolute left-1/2 top-1/2 flex aspect-square w-[30%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-dashed border-cream/40 bg-forest-deep/60 text-center">
          <span className="font-tamil text-lg font-semibold leading-tight text-cream sm:text-xl" lang="ta">
            அறு
            <br />
            சுவை
          </span>
        </div>
        {TASTES.map((taste, i) => {
          const a = ((-90 + i * 60) * Math.PI) / 180;
          const on = active === i;
          return (
            <button
              key={taste.english}
              type="button"
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              aria-pressed={on}
              className={`absolute flex aspect-square w-[31%] -translate-x-1/2 -translate-y-1/2 cursor-pointer flex-col items-center justify-center rounded-full border transition-[background-color,color,border-color,transform] duration-300 ${
                on ? "pulse-ring scale-105 border-cream bg-cream text-forest-deep shadow-lg shadow-black/30" : "border-cream/35 bg-forest-deep/70 text-cream hover:border-cream hover:scale-105"
              }`}
              style={{
                left: `${(50 + 34.5 * Math.cos(a)).toFixed(2)}%`,
                top: `${(50 + 34.5 * Math.sin(a)).toFixed(2)}%`,
              }}
            >
              <span className="font-tamil text-sm font-semibold sm:text-lg" lang="ta" aria-hidden="true">
                {taste.tamil}
              </span>
              <span className="text-[0.6rem] font-semibold uppercase tracking-[0.14em] sm:text-[0.7rem]">{taste.english}</span>
            </button>
          );
        })}
      </div>

      <div aria-live="polite" className="reveal" style={{ ["--d" as string]: "100ms" }}>
        <div key={t.english} className="swap-in">
          <p className="font-tamil text-5xl font-semibold leading-none sm:text-6xl" lang="ta">
            {t.tamil}
          </p>
          <p className="mt-3 font-serif text-4xl font-semibold sm:text-5xl">
            {t.english} <span className="font-sans text-lg italic text-cream/60">{t.roman}</span>
          </p>
          <p className="mt-3 min-h-[4.5rem] max-w-lg text-[1.0625rem] leading-relaxed text-cream/80">{t.does}</p>
          <dl className="mt-4 grid max-w-lg grid-cols-2 gap-5 border-t border-cream/20 pt-4">
            <div>
              <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-brass">Found in</dt>
              <dd className="mt-1.5 text-[0.95rem]">{t.found}</dd>
            </div>
            <div>
              <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-brass">The molecule</dt>
              <dd className="mt-1.5 text-[0.95rem] italic">{t.molecule}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
