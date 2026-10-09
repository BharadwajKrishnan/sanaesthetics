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
    <div className="mt-14 grid items-center gap-12 lg:grid-cols-2">
      <div className="relative mx-auto aspect-square w-full max-w-[28rem]">
        <div className="absolute left-1/2 top-1/2 flex aspect-square w-[30%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-dashed border-cream/40 text-center">
          <span className="font-tamil text-xl font-semibold leading-tight text-cream sm:text-2xl" lang="ta">
            அறு
            <br />
            சுவை
          </span>
        </div>
        {TASTES.map((taste, i) => {
          const a = ((-90 + i * 60) * Math.PI) / 180;
          return (
            <button
              key={taste.english}
              type="button"
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              aria-pressed={active === i}
              className={`absolute flex aspect-square w-[31%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border transition-colors duration-200 ${
                active === i ? "border-leaf bg-leaf text-ink" : "border-cream/35 text-cream hover:border-cream"
              }`}
              style={{
                left: `${(50 + 34.5 * Math.cos(a)).toFixed(2)}%`,
                top: `${(50 + 34.5 * Math.sin(a)).toFixed(2)}%`,
              }}
            >
              <span className="font-tamil text-base font-semibold sm:text-xl" lang="ta" aria-hidden="true">
                {taste.tamil}
              </span>
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] sm:text-xs">{taste.english}</span>
            </button>
          );
        })}
      </div>

      <div aria-live="polite">
        <p className="font-tamil text-6xl font-semibold leading-none sm:text-7xl" lang="ta">
          {t.tamil}
        </p>
        <p className="mt-5 text-4xl font-medium tracking-tight">
          {t.english} <span className="font-serif text-xl italic text-cream/60">{t.roman}</span>
        </p>
        <p className="mt-5 min-h-[5.5rem] max-w-lg font-serif text-lg leading-relaxed text-cream/80">{t.does}</p>
        <dl className="mt-6 grid max-w-lg grid-cols-2 gap-6 border-t border-cream/20 pt-6">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-leaf">Found in</dt>
            <dd className="mt-2 font-serif">{t.found}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-leaf">The molecule</dt>
            <dd className="mt-2 font-serif italic">{t.molecule}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
