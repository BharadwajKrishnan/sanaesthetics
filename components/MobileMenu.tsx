"use client";

import { useRef } from "react";
import { site } from "@/lib/site";

// Small-screen menu. A <details> works without JavaScript; the script only closes it after a link is tapped.
export function MobileMenu() {
  const ref = useRef<HTMLDetailsElement>(null);
  return (
    <details ref={ref} className="relative lg:hidden">
      <summary aria-label="Menu" className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-md hover:bg-parchment [&::-webkit-details-marker]:hidden">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </summary>
      <nav aria-label="Sections" className="absolute right-0 mt-2 w-56 rounded-md border border-line bg-cream p-2 shadow-lg">
        {site.nav.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={() => ref.current?.removeAttribute("open")}
            className="block rounded px-3 py-2.5 hover:bg-parchment"
          >
            {item.label}
          </a>
        ))}
      </nav>
    </details>
  );
}
