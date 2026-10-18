"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Arrow } from "@/components/Icons";
import { Eyebrow } from "@/components/SiteChrome";

// A short teaser for one newsletter issue at a time, moving on to the next every few seconds
// and starting over after the last. Issues come in as plain data so the homepage (a server
// component) can hand them over.
export type TeaserIssue = {
  slug: string;
  title: string;
  eyebrow: string;
  teaser: string;
  picture?: { src: string; alt: string; width: number; height: number };
  link: { href: string; target: string; rel: string };
};

const DWELL_MS = 7000;

export function NewsletterTeaser({ issues }: { issues: TeaserIssue[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [stillMotion, setStillMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setStillMotion(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  // The loop stops while the pointer or keyboard focus is on the teaser, and while the tab is in the background.
  useEffect(() => {
    if (paused || stillMotion || issues.length < 2) return;
    const id = window.setInterval(() => {
      if (document.visibilityState === "visible") setActive((i) => (i + 1) % issues.length);
    }, DWELL_MS);
    return () => window.clearInterval(id);
  }, [paused, stillMotion, issues.length]);

  const step = (by: number) => setActive((i) => (i + by + issues.length) % issues.length);

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="From the newsletter"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="grid items-center gap-6 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-10"
    >
      {/* Pictures and text are stacked in the same grid cells, so the band keeps the height of its tallest issue.
          Each picture is shown whole, at its own proportions, never cut to a frame. */}
      <div className="grid w-44 items-center sm:w-48 lg:w-56">
        {issues.map((issue, i) => (
          <a
            key={issue.slug}
            {...issue.link}
            aria-label={issue.title}
            aria-hidden={i !== active}
            tabIndex={i === active ? undefined : -1}
            className={`col-start-1 row-start-1 block overflow-hidden rounded-sm shadow-xl shadow-ink/15 transition-opacity duration-700 ${
              i === active ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            {issue.picture ? (
              <Image src={issue.picture.src} alt={issue.picture.alt} width={issue.picture.width} height={issue.picture.height} sizes="(min-width: 1024px) 14rem, (min-width: 640px) 12rem, 11rem" quality={85} className="h-auto w-full" />
            ) : (
              <span className="umber-backdrop block aspect-[4/5]" />
            )}
          </a>
        ))}
      </div>

      <div className="grid">
        {issues.map((issue, i) => (
          <div
            key={issue.slug}
            aria-hidden={i !== active}
            className={`col-start-1 row-start-1 transition-opacity duration-700 ${i === active ? "opacity-100" : "pointer-events-none opacity-0"}`}
          >
            <Eyebrow className="text-maroon">The newsletter · {issue.eyebrow}</Eyebrow>
            <p className="mt-3 font-serif text-2xl font-medium leading-snug text-left sm:text-[1.75rem] lg:text-[2rem]">{issue.teaser}</p>
            <p className="mt-4 text-left">
              <a {...issue.link} tabIndex={i === active ? undefined : -1} className="group font-medium underline decoration-ink/30 underline-offset-[6px] hover:decoration-ink">
                Read <span className="italic">{issue.title}</span>
                <span className="ml-2 inline-block align-[-2px]">
                  <Arrow />
                </span>
              </a>
            </p>
          </div>
        ))}

        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
          <div className="flex items-center gap-1">
            <button type="button" onClick={() => step(-1)} aria-label="Previous issue" className="grid h-8 w-8 place-items-center rounded-full text-ink/70 transition-colors hover:bg-ink/5 hover:text-ink">
              <span aria-hidden="true" className="inline-block rotate-180">
                <Arrow />
              </span>
            </button>
            <div role="tablist" aria-label="Issues" className="flex items-center gap-2 px-1">
              {issues.map((issue, i) => (
                <button
                  key={issue.slug}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  aria-label={issue.eyebrow}
                  onClick={() => setActive(i)}
                  className="grid h-6 w-4 place-items-center"
                >
                  <span className={`block h-2 rounded-full transition-all duration-500 ${i === active ? "w-6 bg-maroon" : "w-2 bg-ink/30 hover:bg-ink/60"}`} />
                </button>
              ))}
            </div>
            <button type="button" onClick={() => step(1)} aria-label="Next issue" className="grid h-8 w-8 place-items-center rounded-full text-ink/70 transition-colors hover:bg-ink/5 hover:text-ink">
              <Arrow />
            </button>
          </div>
          <Link href="/newsletter" className="font-medium text-ink/80 underline decoration-ink/30 underline-offset-[5px] hover:text-ink hover:decoration-ink">
            All issues
          </Link>
          <Link href="#subscribe" className="font-medium text-ink/80 underline decoration-ink/30 underline-offset-[5px] hover:text-ink hover:decoration-ink">
            Subscribe
          </Link>
        </div>
      </div>
    </div>
  );
}
