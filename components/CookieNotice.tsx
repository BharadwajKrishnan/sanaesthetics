"use client";

import Link from "next/link";
import { useId } from "react";
import { openConsent, setConsent, useConsent } from "@/lib/consent";

// The notice shown on a first visit, and again from the footer's "Cookie settings". It asks one thing: whether
// embedded content (the Instagram posts on the home page) may load and set its cookies. Everything else on the
// site works without a choice; the privacy page carries the details.
export function CookieNotice() {
  const id = useId();
  const { ready, choice, open } = useConsent();
  if (!ready || (choice !== null && !open)) return null;
  return (
    <section
      aria-label="Cookies"
      aria-describedby={`${id}-body`}
      className="cookie-notice fixed inset-x-4 bottom-4 z-50 mx-auto flex max-w-2xl flex-wrap items-center gap-x-4 gap-y-2.5 rounded-xl border border-line bg-cream px-4 py-3 text-sm shadow-lg shadow-ink/15 sm:inset-x-6 sm:bottom-5 sm:flex-nowrap"
    >
      <p id={`${id}-body`} className="basis-full text-left leading-snug text-ink/80 sm:flex-1 sm:basis-auto sm:whitespace-nowrap">
        Cookies are used only for embedded content.{" "}
        <Link href="/privacy" className="whitespace-nowrap underline decoration-ink/30 underline-offset-4 hover:decoration-ink">
          Privacy
        </Link>
      </p>
      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          onClick={() => setConsent("all")}
          className="btn-sheen rounded-full bg-forest px-4 py-1.5 font-medium text-cream transition-colors hover:bg-forest-deep"
        >
          Accept
        </button>
        <button
          type="button"
          onClick={() => setConsent("essential")}
          className="rounded-full border border-forest px-4 py-1.5 font-medium text-forest transition-colors hover:bg-forest hover:text-cream"
        >
          Essential only
        </button>
      </div>
    </section>
  );
}

// The footer's way back to the notice.
export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button type="button" onClick={openConsent} className={className}>
      Cookie settings
    </button>
  );
}
