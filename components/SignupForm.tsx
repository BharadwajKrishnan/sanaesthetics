"use client";

import { useId, useState } from "react";
import type { List } from "@/lib/signups";

type State = "idle" | "sending" | "pending" | "exists" | "invalid" | "failed";

const COPY: Record<List, { cta: string; sending: string; pending: (email: string) => string; exists: string }> = {
  waitlist: {
    cta: "Join the waitlist",
    sending: "Joining…",
    pending: (email) => `Almost there. We've sent a link to ${email}. Open it to confirm your place on the waitlist.`,
    exists: "This email is already on the waitlist.",
  },
  newsletter: {
    cta: "Subscribe",
    sending: "Subscribing…",
    pending: (email) => `Almost there. We've sent a link to ${email}. Open it to confirm your subscription.`,
    exists: "This email is already subscribed.",
  },
};

const ERRORS: Partial<Record<State, string>> = {
  invalid: "Enter an email address like name@example.com.",
  failed: "The list couldn't be reached. Please try again in a few minutes.",
};

export function SignupForm({ list, tone = "light", center = false }: { list: List; tone?: "light" | "dark"; center?: boolean }) {
  const id = useId();
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [state, setState] = useState<State>("idle");
  const copy = COPY[list];
  const dark = tone === "dark";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      setState("invalid");
      return;
    }
    setState("sending");
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ list, email, website }),
      });
      const data = await res.json();
      if (res.ok) setState(data.status === "exists" ? "exists" : "pending");
      else setState(data.error === "invalid" ? "invalid" : "failed");
    } catch {
      setState("failed");
    }
  }

  const isError = state === "invalid" || state === "failed";
  const message = state === "pending" ? copy.pending(email.trim()) : state === "exists" ? copy.exists : ERRORS[state];

  return (
    <form onSubmit={onSubmit} noValidate className={`relative w-full max-w-md ${center ? "mx-auto text-center" : ""}`}>
      <label htmlFor={id} className={`block text-xs font-medium uppercase tracking-[0.18em] ${dark ? "text-cream/75" : "text-ink/60"}`}>
        Email address
      </label>
      {/* Honeypot: hidden from people, filled in by bots */}
      <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden">
        <label htmlFor={`${id}-website`}>Website</label>
        <input id={`${id}-website`} type="text" name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </div>
      <div className="mt-2 flex flex-col gap-2 sm:flex-row">
        <input
          id={id}
          type="email"
          autoComplete="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state !== "idle") setState("idle");
          }}
          aria-invalid={isError}
          aria-describedby={message ? `${id}-msg` : undefined}
          className={`min-w-0 flex-1 rounded-md border px-4 py-3 text-ink placeholder:text-ink/40 ${dark ? "border-cream bg-cream" : "border-line bg-white"}`}
        />
        <button
          type="submit"
          disabled={state === "sending"}
          className={`rounded-md px-6 py-3 font-medium transition-colors disabled:opacity-60 ${
            dark ? "bg-cream text-forest-deep hover:bg-parchment" : "bg-forest text-cream hover:bg-forest-deep"
          }`}
        >
          {state === "sending" ? copy.sending : copy.cta}
        </button>
      </div>
      <p
        id={`${id}-msg`}
        role="status"
        className={`mt-3 min-h-6 text-[0.95rem] ${isError ? "font-semibold" : ""} ${dark ? "text-cream" : "text-ink"}`}
      >
        {message}
      </p>
    </form>
  );
}
