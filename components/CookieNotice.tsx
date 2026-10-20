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
      aria-labelledby={`${id}-title`}
      aria-describedby={`${id}-body`}
      className="cookie-notice fixed inset-x-4 bottom-4 z-50 mx-auto max-w-xl rounded-2xl border border-line bg-cream p-5 shadow-xl shadow-ink/15 sm:inset-x-6 sm:bottom-6 sm:p-6"
    >
      <p id={`${id}-title`} className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-ink/60">
        Cookies
      </p>
      <p id={`${id}-body`} className="mt-2 text-left text-[0.95rem] leading-relaxed text-ink/80">
        Cookies are used only for embedded content. The rest of the site sets none.
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-2.5">
        <button
          type="button"
          onClick={() => setConsent("all")}
          className="btn-sheen rounded-full bg-forest px-5 py-2 text-sm font-medium text-cream transition-colors hover:bg-forest-deep"
        >
          Accept
        </button>
        <button
          type="button"
          onClick={() => setConsent("essential")}
          className="rounded-full border border-forest px-5 py-2 text-sm font-medium text-forest transition-colors hover:bg-forest hover:text-cream"
        >
          Essential only
        </button>
        <Link href="/privacy" className="ml-auto text-sm underline decoration-ink/30 underline-offset-4 hover:decoration-ink">
          Privacy
        </Link>
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
