"use client";

import { useId, useState } from "react";

type State = "idle" | "sending" | "added" | "exists" | "invalid" | "failed";

const MESSAGES: Partial<Record<State, string>> = {
  added: "You're on the list. We'll write when the first recipes and classes open.",
  exists: "This email is already on the list.",
  invalid: "Enter an email address like name@example.com.",
  failed: "The list couldn't be reached. Check your connection and try again.",
};

export function WaitlistForm({ tone = "light" }: { tone?: "light" | "dark" }) {
  const id = useId();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      setState("invalid");
      return;
    }
    setState("sending");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) setState(data.status === "exists" ? "exists" : "added");
      else setState(data.error === "invalid" ? "invalid" : "failed");
    } catch {
      setState("failed");
    }
  }

  const isError = state === "invalid" || state === "failed";
  const message = MESSAGES[state];
  const dark = tone === "dark";

  return (
    <form onSubmit={onSubmit} noValidate className="w-full max-w-md">
      <label htmlFor={id} className={`block text-sm font-semibold ${dark ? "text-paper" : "text-ink"}`}>
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
          className="min-w-0 flex-1 rounded-full border border-ink/25 bg-white px-5 py-3 text-ink placeholder:text-ink/40"
        />
        <button
          type="submit"
          disabled={state === "sending"}
          className={`rounded-full px-6 py-3 font-semibold transition-colors disabled:opacity-60 ${
            dark ? "bg-turmeric text-ink hover:bg-paper" : "bg-terracotta text-white hover:bg-ink"
          }`}
        >
          {state === "sending" ? "Joining…" : "Join the waitlist"}
        </button>
      </div>
      <p
        id={`${id}-msg`}
        role="status"
        className={`mt-2 min-h-6 text-sm ${
          isError ? (dark ? "text-turmeric" : "text-terracotta") : dark ? "text-paper" : "text-green"
        } font-medium`}
      >
        {message}
      </p>
    </form>
  );
}
