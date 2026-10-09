"use client";

import { useId, useState } from "react";
import type { List } from "@/lib/signups";

type State = "idle" | "sending" | "added" | "exists" | "invalid" | "failed";

const COPY: Record<List, { cta: string; sending: string; added: string; exists: string }> = {
  waitlist: {
    cta: "Join the waitlist",
    sending: "Joining…",
    added: "You're on the list. We'll write when the first recipes and classes open.",
    exists: "This email is already on the waitlist.",
  },
  newsletter: {
    cta: "Subscribe",
    sending: "Subscribing…",
    added: "You're subscribed. The first issue will arrive when it's ready.",
    exists: "This email is already subscribed.",
  },
};

const ERRORS: Partial<Record<State, string>> = {
  invalid: "Enter an email address like name@example.com.",
  failed: "The list couldn't be reached. Check your connection and try again.",
};

export function SignupForm({ list, tone = "light", center = false }: { list: List; tone?: "light" | "dark"; center?: boolean }) {
  const id = useId();
  const [email, setEmail] = useState("");
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
        body: JSON.stringify({ list, email }),
      });
      const data = await res.json();
      if (res.ok) setState(data.status === "exists" ? "exists" : "added");
      else setState(data.error === "invalid" ? "invalid" : "failed");
    } catch {
      setState("failed");
    }
  }

  const isError = state === "invalid" || state === "failed";
  const message = state === "added" ? copy.added : state === "exists" ? copy.exists : ERRORS[state];

  return (
    <form onSubmit={onSubmit} noValidate className={`w-full max-w-md ${center ? "mx-auto text-center" : ""}`}>
      <label htmlFor={id} className={`block text-xs font-semibold uppercase tracking-[0.16em] ${dark ? "text-cream/75" : "text-ink/65"}`}>
        Email address
      </label>
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
          className={`min-w-0 flex-1 border px-4 py-3 text-ink placeholder:text-ink/40 ${dark ? "border-cream bg-cream" : "border-ink/25 bg-white"}`}
        />
        <button
          type="submit"
          disabled={state === "sending"}
          className={`px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] transition-colors disabled:opacity-60 ${
            dark ? "bg-leaf text-ink hover:bg-cream" : "bg-ink text-cream hover:bg-ink/85"
          }`}
        >
          {state === "sending" ? copy.sending : copy.cta}
        </button>
      </div>
      <p
        id={`${id}-msg`}
        role="status"
        className={`mt-3 min-h-6 font-serif text-[0.95rem] ${isError ? "font-semibold" : ""} ${dark ? "text-cream" : "text-ink"}`}
      >
        {message}
      </p>
    </form>
  );
}
