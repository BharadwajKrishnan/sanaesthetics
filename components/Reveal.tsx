"use client";

import { useEffect } from "react";

// Marks every .reveal element as `in` once it scrolls into view, so the stylesheet can rise it into place.
// The server renders the html element with a no-js class and nothing hidden; this takes the class off only
// after everything already on screen has been marked, so the first paint never flickers. New elements,
// from a client-side navigation or a panel being shown, are picked up as they appear.
export function RevealObserver() {
  useEffect(() => {
    const root = document.documentElement;
    const pending = () => Array.from(document.querySelectorAll<HTMLElement>(".reveal:not(.in)"));

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (still || !("IntersectionObserver" in window)) {
      const show = () => pending().forEach((el) => el.classList.add("in"));
      show();
      root.classList.remove("no-js");
      const mo = new MutationObserver(show);
      mo.observe(document.body, { childList: true, subtree: true });
      return () => mo.disconnect();
    }

    // Whatever is on screen right now stays as it is.
    const height = window.innerHeight;
    for (const el of pending()) {
      const box = el.getBoundingClientRect();
      if (box.top < height && box.bottom > 0) el.classList.add("in");
    }
    root.classList.remove("no-js");

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.06 },
    );

    const watch = () => pending().forEach((el) => io.observe(el));
    watch();
    const mo = new MutationObserver(watch);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
