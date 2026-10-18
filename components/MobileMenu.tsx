"use client";

import Link from "next/link";
import { useRef } from "react";
import { site } from "@/lib/site";

// Small-screen menu. A <details> works without JavaScript; the script only closes it after a link is tapped.
// The panel drops down under the header, its links arriving one after another.
export function MobileMenu() {
  const ref = useRef<HTMLDetailsElement>(null);
  const close = () => ref.current?.removeAttribute("open");
  return (
    <details ref={ref} className="lg:hidden">
      <summary aria-label="Menu" className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-full text-ink hover:bg-parchment [&::-webkit-details-marker]:hidden">
        <span className="burger flex flex-col gap-[5px]">
          <span />
          <span />
          <span />
        </span>
      </summary>
      <nav aria-label="Sections" className="menu-panel absolute inset-x-0 top-full border-b border-line bg-cream px-4 pb-5 pt-2 shadow-xl shadow-ink/10 sm:px-6">
        {site.nav.map((item, i) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={close}
            style={{ ["--i" as string]: i }}
            className="flex items-center justify-between border-b border-line/70 py-3 font-serif text-xl font-semibold text-ink hover:text-maroon"
          >
            {item.label}
            <span aria-hidden="true" className="text-brass">
              ›
            </span>
          </Link>
        ))}
        <Link
          href="/#subscribe"
          onClick={close}
          style={{ ["--i" as string]: site.nav.length }}
          className="mt-4 flex justify-center rounded-full bg-forest px-4 py-2.5 font-medium text-cream hover:bg-forest-deep sm:hidden"
        >
          Subscribe
        </Link>
      </nav>
    </details>
  );
}
