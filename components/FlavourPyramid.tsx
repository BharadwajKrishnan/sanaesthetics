"use client";

import Link from "next/link";
import { useState } from "react";
import { Arrow } from "@/components/Icons";
import type { PyramidLayer } from "@/lib/pyramid";

// Sandhya's flavour pyramid. The layers come in from the server (lib/pyramid.ts) with their links already
// resolved, so this file never imports the article bodies. All six panels are in the page; the inactive
// ones carry the `hidden` attribute, so every link is there for crawlers and for readers without JS.

// Each layer's band is 14% of the width narrower than the one below it, and the apex runs on to a point, so the
// sides form one straight line from the foundation to the tip. The apex band is taller for the same reason: its base
// is 30% wide, so closing it at the same slope takes 30/14 of a band's height.
const STEP = 14;
const BAND = "h-11 sm:h-12";
const APEX = "h-[5.9rem] sm:h-[6.45rem]";

function trapezoid(bottom: number, top: number) {
  return `polygon(${(100 - bottom) / 2}% 100%, ${(100 + bottom) / 2}% 100%, ${(100 + top) / 2}% 0, ${(100 - top) / 2}% 0)`;
}

function Chevron({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 10 7" aria-hidden="true" className={`h-[0.4rem] w-[0.6rem] ${className}`} fill="currentColor">
      <path d="M5 0 10 7H0Z" />
    </svg>
  );
}

const CHIP = "inline-flex items-center rounded-full border border-line bg-cream px-3 py-1 text-[0.85rem] font-medium text-ink transition-[color,border-color,transform] hover:-translate-y-0.5 hover:border-maroon hover:text-maroon";
const READ_LINK = "group font-medium underline decoration-ink/30 underline-offset-[6px] hover:decoration-ink";

export function FlavourPyramid({ layers }: { layers: PyramidLayer[] }) {
  // Index into `layers`, which runs from the foundation (0) up to the apex.
  const [active, setActive] = useState(0);
  const top = layers.length - 1;

  return (
    <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-12">
      <div className="reveal mx-auto w-full max-w-[26rem]">
        <div role="group" aria-label="Layers of the flavour pyramid" className="flex flex-col gap-0.5">
          {[...layers].reverse().map((layer) => {
            const i = layers.indexOf(layer);
            const on = active === i;
            const apex = i === top;
            const bottom = 100 - STEP * i;
            const clipPath = trapezoid(bottom, apex ? 0 : bottom - STEP);
            return (
              <button
                key={layer.id}
                type="button"
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                aria-pressed={on}
                aria-controls={`pyramid-panel-${layer.n}`}
                className={`relative grid w-full cursor-pointer grid-cols-[2.5rem_1fr] items-center motion-safe:transition-transform motion-safe:duration-300 ${apex ? APEX : BAND} ${
                  on ? "translate-x-1.5" : ""
                }`}
              >
                {/* Brass outline, drawn with the same polygon two pixels outside the band */}
                <span
                  aria-hidden="true"
                  className={`absolute inset-y-0 left-10 right-0 bg-brass motion-safe:transition-opacity ${on || i === top ? "" : "opacity-0"}`}
                  style={{ clipPath }}
                />
                <span aria-hidden="true" className={`absolute inset-y-[2px] left-[calc(2.5rem+2px)] right-[2px] ${layer.tone.bg} transition-[filter] ${on ? "brightness-110" : ""}`} style={{ clipPath }} />
                <span aria-hidden="true" className="relative flex flex-col items-center gap-0.5 pr-2 font-serif text-[0.8rem] font-semibold text-brass">
                  <Chevron className={`transition-opacity ${on ? "" : "opacity-40"}`} />
                  {String(layer.n).padStart(2, "0")}
                </span>
                {/* The apex label sits low in the triangle, where it is wide enough to hold the word. */}
                <span className={`relative flex justify-center ${apex ? "h-full items-end pb-3 sm:pb-3.5" : "items-center"}`}>
                  <span
                    className={`text-balance text-center text-[0.62rem] font-semibold uppercase leading-tight tracking-[0.14em] sm:text-[0.78rem] ${layer.tone.fg}`}
                    style={{ width: `${apex ? bottom * 0.8 : bottom - STEP / 2}%` }}
                  >
                    {layer.title}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
        <p aria-hidden="true" className="mt-3 text-center font-script text-2xl text-brass">
          Built from the ground up
        </p>
      </div>

      <div aria-live="polite" className="reveal rounded-2xl border border-line/80 bg-white/50 p-5 sm:p-6 lg:min-h-[22rem]" style={{ ["--d" as string]: "100ms" }}>
        {layers.map((layer, i) => (
          <section key={layer.id} id={`pyramid-panel-${layer.n}`} aria-labelledby={`pyramid-title-${layer.n}`} hidden={active !== i} className={active === i ? "swap-in" : ""}>
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-maroon">
              Layer {String(layer.n).padStart(2, "0")} · {layer.tagline}
            </p>
            <h3 id={`pyramid-title-${layer.n}`} className="mt-2 font-serif text-3xl font-semibold leading-tight sm:text-4xl">
              {layer.title}
            </h3>
            <p className="mt-3 text-[1rem] leading-relaxed text-ink/80">{layer.blurb}</p>

            {layer.chips.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-2">
                {layer.chips.map((chip) => (
                  <li key={chip.label}>
                    {chip.link.target ? (
                      <a {...chip.link} className={CHIP}>
                        {chip.label}
                      </a>
                    ) : (
                      <Link href={chip.link.href} className={CHIP}>
                        {chip.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-5 border-t border-line pt-4">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-brass">Read</p>
              <ul className="mt-2 space-y-1.5 text-[0.95rem]">
                {layer.reads.map((read) => (
                  <li key={read.link.href + read.title} className="flex items-baseline gap-3">
                    <span className="w-14 shrink-0 text-[0.68rem] uppercase tracking-[0.14em] text-ink/55">{read.kind}</span>
                    {read.link.target ? (
                      <a {...read.link} className={READ_LINK}>
                        {read.title}
                        <span className="ml-2 inline-block align-[-2px]">
                          <Arrow />
                        </span>
                      </a>
                    ) : (
                      <Link href={read.link.href} className={READ_LINK}>
                        {read.title}
                        <span className="ml-2 inline-block align-[-2px]">
                          <Arrow />
                        </span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <button
              type="button"
              onClick={() => setActive(i === top ? 0 : i + 1)}
              className="mt-5 inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-maroon hover:underline hover:underline-offset-4"
            >
              {i === top ? (
                <>
                  <Chevron className="rotate-180" /> Back to the foundation
                </>
              ) : (
                <>
                  <Chevron /> Next layer: {layers[i + 1].title}
                </>
              )}
            </button>
          </section>
        ))}
      </div>
    </div>
  );
}
