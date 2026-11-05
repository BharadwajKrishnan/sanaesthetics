"use client";

import { createContext, useContext, useState } from "react";
import { Eyebrow } from "@/components/SiteChrome";
import { MAX_SERVINGS, MIN_SERVINGS, scaleIngredient } from "@/lib/servings";

// The number of servings a reader is cooking for, shared between the facts row at the top of a recipe and the
// ingredient list further down. Plain React state, keyed on the recipe, so a choice never carries over to the
// next recipe. `base` is what the recipe was written for; null when it is not a plain number ("4 to 6").

type Ctx = { base: number | null; servings: number; set: (n: number) => void };
const ServingsContext = createContext<Ctx | null>(null);

export function ServingsProvider({ base, children }: { base: number | null; children: React.ReactNode }) {
  const [servings, setServings] = useState(base ?? 1);
  const set = (n: number) => setServings(Math.min(MAX_SERVINGS, Math.max(MIN_SERVINGS, n)));
  return <ServingsContext.Provider value={{ base, servings, set }}>{children}</ServingsContext.Provider>;
}

function useServings(): Ctx {
  const ctx = useContext(ServingsContext);
  if (!ctx) throw new Error("useServings needs a ServingsProvider");
  return ctx;
}

const ROUND =
  "flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full border border-line font-sans text-base leading-none text-ink/70 transition-colors hover:border-brass hover:text-ink disabled:cursor-default disabled:opacity-30 disabled:hover:border-line disabled:hover:text-ink/70";

// "− 4 +" in the facts row. Shows the recipe's own text when it cannot be scaled.
export function ServingsStepper({ fallback }: { fallback: string }) {
  const { base, servings, set } = useServings();
  if (base === null) return <>{fallback}</>;
  return (
    <div role="group" aria-label="Servings" className="flex flex-wrap items-center gap-x-2 gap-y-1">
      <button type="button" aria-label="One serving fewer" disabled={servings <= MIN_SERVINGS} onClick={() => set(servings - 1)} className={ROUND}>
        −
      </button>
      <span className="min-w-[1.4ch] text-center tabular-nums">{servings}</span>
      <button type="button" aria-label="One serving more" disabled={servings >= MAX_SERVINGS} onClick={() => set(servings + 1)} className={ROUND}>
        +
      </button>
      {servings !== base && (
        <button
          type="button"
          onClick={() => set(base)}
          aria-label={`Reset to ${base} servings`}
          className="link-grow cursor-pointer font-sans text-[0.68rem] font-medium uppercase tracking-[0.14em] text-maroon"
        >
          Reset
        </button>
      )}
    </div>
  );
}

// The ingredient groups, with every quantity at the chosen number of servings.
export function ScaledIngredients({ groups }: { groups: { group: string; items: string[] }[] }) {
  const { base, servings, set } = useServings();
  const factor = base ? servings / base : 1;
  const scaled = factor !== 1;
  return (
    <>
      {/* Always in the page, so the announcement works and the card does not jump when it fills. */}
      <p role="status" aria-live="polite" className="mt-1 min-h-5 text-sm text-ink/60">
        {scaled && (
          <>
            Quantities adjusted for {servings} {servings === 1 ? "serving" : "servings"}.{" "}
            <button type="button" onClick={() => set(base!)} className="link-grow cursor-pointer font-medium text-maroon">
              Back to {base}
            </button>
          </>
        )}
      </p>
      {groups.map((group) => (
        <div key={group.group} className="mt-5">
          <Eyebrow>{group.group}</Eyebrow>
          <ul className="mt-2 divide-y divide-line">
            {group.items.map((item, i) => (
              <li key={i} className="flex items-baseline gap-3 py-2 text-[0.95rem] leading-snug">
                <span aria-hidden="true" className="inline-block h-1.5 w-1.5 shrink-0 -translate-y-0.5 rounded-full bg-maroon" />
                {scaleIngredient(item, factor)}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}
