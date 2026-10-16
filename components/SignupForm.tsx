"use client";

import Link from "next/link";
import { useId, useState } from "react";
import type { List } from "@/lib/signups";

type State = "idle" | "sending" | "subscribed" | "exists" | "name" | "invalid" | "failed";

const COPY: Record<List, { cta: string; sending: string; subscribed: string; exists: string; consent: string }> = {
  waitlist: {
    cta: "Join the waitlist",
    sending: "Joining…",
    subscribed: "You're on the waitlist. Dates and prices for the first classes will reach you first.",
    exists: "This email is already on the waitlist.",
    consent: "By joining, you agree to hear about the classes by email. One reply is enough to be taken off the list.",
  },
  newsletter: {
    cta: "Subscribe",
    sending: "Subscribing…",
    subscribed: "You're subscribed. The next issue will arrive by email.",
    exists: "This email is already subscribed.",
    consent: "By subscribing, you agree to receive the newsletter by email. A reply to any issue is enough to be taken off the list.",
  },
};

const ERRORS: Partial<Record<State, string>> = {
  name: "Enter your name.",
  invalid: "Enter an email address like name@example.com.",
  failed: "The list couldn't be reached. Please try again in a few minutes.",
};

export function SignupForm({ list, tone = "light", center = false }: { list: List; tone?: "light" | "dark"; center?: boolean }) {
  const id = useId();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [state, setState] = useState<State>("idle");
  const copy = COPY[list];
  const dark = tone === "dark";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setState("name");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      setState("invalid");
      return;
    }
    setState("sending");
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ list, name, email, website }),
      });
      const data = await res.json();
      if (res.ok) setState(data.status === "exists" ? "exists" : "subscribed");
      else setState(data.error === "name" ? "name" : data.error === "invalid" ? "invalid" : "failed");
    } catch {
      setState("failed");
    }
  }

  const isError = state === "name" || state === "invalid" || state === "failed";
  const message = state === "subscribed" ? copy.subscribed : state === "exists" ? copy.exists : ERRORS[state];

  const label = `block text-xs font-medium uppercase tracking-[0.18em] ${dark ? "text-cream/75" : "text-ink/60"}`;
  const field = `min-w-0 rounded-md border px-4 py-3 text-ink placeholder:text-ink/40 ${dark ? "border-cream bg-cream" : "border-line bg-white"}`;
  const describedBy = message ? `${id}-msg` : undefined;
  const reset = () => {
    if (state !== "idle") setState("idle");
  };

  return (
    <form onSubmit={onSubmit} noValidate className={`relative w-full max-w-md ${center ? "mx-auto text-center" : ""}`}>
      <label htmlFor={`${id}-name`} className={label}>
        Name
      </label>
      <input
        id={`${id}-name`}
        type="text"
        autoComplete="name"
        placeholder="Your name"
        maxLength={100}
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          reset();
        }}
        aria-invalid={state === "name"}
        aria-describedby={describedBy}
        className={`mt-2 w-full ${field}`}
      />
      <label htmlFor={id} className={`mt-4 ${label}`}>
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
            reset();
          }}
          aria-invalid={state === "invalid"}
          aria-describedby={describedBy}
          className={`flex-1 ${field}`}
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
      <p className={`mt-1 text-sm leading-relaxed ${dark ? "text-cream/65" : "text-ink/60"}`}>
        {copy.consent}{" "}
        <Link href="/privacy" className={`underline underline-offset-4 ${dark ? "decoration-cream/40 hover:decoration-cream" : "decoration-ink/30 hover:decoration-ink"}`}>
          How your details are handled
        </Link>
        .
      </p>
    </form>
  );
}
