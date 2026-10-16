"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { CLASSES } from "@/lib/classes";
import type { List } from "@/lib/signups";

type State = "idle" | "sending" | "subscribed" | "exists" | "class" | "name" | "invalid" | "phone" | "failed";

const COPY: Record<List, { cta: string; sending: string; subscribed: string; exists: string; consent: string }> = {
  waitlist: {
    cta: "Request a class",
    sending: "Sending…",
    subscribed: "Request received. I will write back with what is possible, and when.",
    exists: "A request from this address is already on the list. I will be in touch.",
    consent: "By sending a request, you agree to be contacted about it by email. One reply is enough to be taken off the list.",
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
  class: "Choose a class.",
  name: "Enter your name.",
  invalid: "Enter an email address like name@example.com.",
  phone: "Enter a phone number with digits only, or leave it empty.",
  failed: "The list couldn't be reached. Please try again in a few minutes.",
};

export function SignupForm({ list, tone = "light", center = false }: { list: List; tone?: "light" | "dark"; center?: boolean }) {
  const id = useId();
  const [classId, setClassId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [state, setState] = useState<State>("idle");
  const copy = COPY[list];
  const dark = tone === "dark";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (list === "waitlist" && !classId) {
      setState("class");
      return;
    }
    if (!name.trim()) {
      setState("name");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      setState("invalid");
      return;
    }
    if (list === "waitlist" && phone.trim() && !/^\+?[0-9][0-9 ().\/-]{4,30}$/.test(phone.trim())) {
      setState("phone");
      return;
    }
    setState("sending");
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ list, name, email, website, classType: list === "waitlist" ? classId : undefined, phone: list === "waitlist" ? phone : undefined }),
      });
      const data = await res.json();
      if (res.ok) setState(data.status === "exists" ? "exists" : "subscribed");
      else setState(data.error === "class" ? "class" : data.error === "name" ? "name" : data.error === "invalid" ? "invalid" : data.error === "phone" ? "phone" : "failed");
    } catch {
      setState("failed");
    }
  }

  const isError = state === "class" || state === "name" || state === "invalid" || state === "phone" || state === "failed";
  const message = state === "subscribed" ? copy.subscribed : state === "exists" ? copy.exists : ERRORS[state];

  const label = `block text-xs font-medium uppercase tracking-[0.18em] ${dark ? "text-cream/75" : "text-ink/60"}`;
  const field = `min-w-0 rounded-md border px-4 py-3 text-ink placeholder:text-ink/40 ${dark ? "border-cream bg-cream" : "border-line bg-white"}`;
  const describedBy = message ? `${id}-msg` : undefined;
  const reset = () => {
    if (state !== "idle") setState("idle");
  };

  return (
    <form onSubmit={onSubmit} noValidate className={`relative w-full max-w-md ${center ? "mx-auto text-center" : ""}`}>
      {list === "waitlist" && (
        <>
          <label htmlFor={`${id}-class`} className={label}>
            Which class?
          </label>
          <select
            id={`${id}-class`}
            value={classId}
            onChange={(e) => {
              setClassId(e.target.value);
              reset();
            }}
            aria-invalid={state === "class"}
            aria-describedby={describedBy}
            className={`mt-2 w-full ${field} ${classId ? "" : "text-ink/40"}`}
          >
            <option value="">Choose a class</option>
            {CLASSES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
        </>
      )}
      <label htmlFor={`${id}-name`} className={`${label} ${list === "waitlist" ? "mt-4" : ""}`}>
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
      {list === "waitlist" && (
        <>
          <label htmlFor={`${id}-phone`} className={`mt-4 ${label}`}>
            Phone <span className="normal-case tracking-normal opacity-80">(optional)</span>
          </label>
          <input
            id={`${id}-phone`}
            type="tel"
            autoComplete="tel"
            placeholder="+49 170 1234567"
            maxLength={32}
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              reset();
            }}
            aria-invalid={state === "phone"}
            aria-describedby={describedBy}
            className={`mt-2 w-full ${field}`}
          />
        </>
      )}
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
