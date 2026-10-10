"use client";

import { useEffect } from "react";

// On a full page load with a #section in the address, jump to that section once the page is ready.
// Next's own handling only covers client-side navigations.
export function ScrollToHash() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    document.getElementById(id)?.scrollIntoView({ behavior: "instant" });
  }, []);
  return null;
}
