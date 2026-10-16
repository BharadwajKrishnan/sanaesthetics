"use client";

import Link from "next/link";
import { useState } from "react";
import { Arrow } from "@/components/Icons";
import type { PyramidLayer } from "@/lib/pyramid";

// Sandhya's flavour pyramid. The layers come in from the server (lib/pyramid.ts) with their links already
// resolved, so this file never imports the article bodies. All six panels are in the page; the inactive
// ones carry the `hidden` attribute, so every link is there for crawlers and for readers without JS.

// Each layer's band is 13% of the width narrower than the one below it, so the sides form one straight line.
const STEP = 13;

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

const CHIP_LINKED = "inline-flex items-center rounded-full border border-line bg-cream px-3 py-1 text-sm font-medium text-ink transition-colors hover:border-maroon hover:text-maroon";
const CHIP_SOON = "inline-flex items-center gap-1.5 rounded-full border border-dashed border-line px-3 py-1 text-sm text-ink/55";
const READ_LINK = "group font-medium underline decoration-ink/30 underline-offset-[6px] hover:decoration-ink";

export function FlavourPyramid({ layers }: { layers: PyramidLayer[] }) {
  // Index into `layers`, which runs from the foundation (0) up to the apex.
  const [active, setActive] = useState(0);
  const top = layers.length - 1;

  return (
    <div className="mt-14 grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
      <div className="mx-auto w-full max-w-[30rem]">
        <div role="group" aria-label="Layers of the flavour pyramid" className="flex flex-col gap-0.5">
          {[...layers].reverse().map((layer) => {
            const i = layers.indexOf(layer);
            const on = active === i;
            const bottom = 100 - STEP * i;
            const clipPath = trapezoid(bottom, bottom - STEP);
            return (
              <button
                key={layer.id}
                type="button"
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                aria-pressed={on}
                aria-controls={`pyramid-panel-${layer.n}`}
                className={`relative grid h-14 w-full cursor-pointer grid-cols-[2.75rem_1fr] items-center sm:h-16 motion-safe:transition-transform motion-safe:duration-200 ${
                  on ? "translate-x-1" : ""
                }`}
              >
                {/* Brass outline, drawn with the same polygon two pixels outside the band */}
                <span
                  aria-hidden="true"
                  className={`absolute inset-y-0 left-11 right-0 bg-brass motion-safe:transition-opacity ${on || i === top ? "" : "opacity-0"}`}
                  style={{ clipPath }}
                />
                <span aria-hidden="true" className={`absolute inset-y-[2px] left-[calc(2.75rem+2px)] right-[2px] ${layer.tone.bg}`} style={{ clipPath }} />
                <span aria-hidden="true" className="relative flex flex-col items-center gap-1 pr-2 font-serif text-sm font-semibold text-brass">
                  <Chevron className={on ? "" : "opacity-40"} />
                  {String(layer.n).padStart(2, "0")}
                </span>
                <span className="relative flex items-center justify-center">
                  <span
                    className={`text-balance text-center text-[0.68rem] font-semibold uppercase leading-tight tracking-[0.14em] sm:text-sm ${layer.tone.fg}`}
                    style={{ width: `${bottom - STEP / 2}%` }}
                  >
                    {layer.title}
                    {layer.tamil && (
                      <span className="mt-0.5 hidden font-tamil text-xs font-semibold normal-case tracking-normal sm:block" lang="ta">
                        {layer.tamil}
                      </span>
                    )}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
        <p aria-hidden="true" className="mt-5 text-center font-script text-2xl text-brass">
          Built from the ground up
        </p>
      </div>

      <div aria-live="polite" className="max-w-lg lg:min-h-[26rem]">
        {layers.map((layer, i) => (
          <section key={layer.id} id={`pyramid-panel-${layer.n}`} aria-labelledby={`pyramid-title-${layer.n}`} hidden={active !== i}>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-maroon">
              Layer {String(layer.n).padStart(2, "0")} · {layer.tagline}
            </p>
            <h3 id={`pyramid-title-${layer.n}`} className="mt-3 font-serif text-4xl font-semibold leading-tight sm:text-5xl">
              {layer.title}
              {layer.tamil && (
                <span className="ml-3 font-tamil text-2xl font-semibold text-maroon sm:text-3xl" lang="ta">
                  {layer.tamil}
                </span>
              )}
            </h3>
            <p className="mt-4 text-lg leading-relaxed text-ink/80">{layer.blurb}</p>

            {layer.chips.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-2">
                {layer.chips.map((chip) => (
                  <li key={chip.label}>
                    {chip.link?.target ? (
                      <a {...chip.link} className={CHIP_LINKED}>
                        {chip.label}
                      </a>
                    ) : chip.link ? (
                      <Link href={chip.link.href} className={CHIP_LINKED}>
                        {chip.label}
                      </Link>
                    ) : (
                      <span className={CHIP_SOON}>
                        {chip.label}
                        <span className="text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-brass">soon</span>
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-7 border-t border-line pt-5">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-brass">Read</p>
              <ul className="mt-3 space-y-2">
                {layer.reads.map((read) => (
                  <li key={read.link.href + read.title} className="flex items-baseline gap-3">
                    <span className="w-14 shrink-0 text-xs uppercase tracking-[0.14em] text-ink/55">{read.kind}</span>
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
              className="mt-7 inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-maroon hover:underline hover:underline-offset-4"
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
