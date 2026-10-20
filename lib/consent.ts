"use client";

import { useSyncExternalStore } from "react";

// The visitor's choice about content that loads from a third party. The site sets no cookies of its own and its
// visitor counts are cookieless, so the only thing to decide is whether the Instagram posts on the home page may
// load from Meta. The choice is kept in the browser's local storage, where the site reads it and nothing else does.
//
// "all" lets the embeds load; "essential" keeps them as placeholders until a post is asked for by hand; null means
// the visitor has not chosen yet and the notice is showing.

export type Consent = "all" | "essential";
export type ConsentState = {
  // False until the page is interactive: the server knows nothing about the visitor, so it renders as though no
  // choice exists and the client fills it in without a hydration mismatch.
  ready: boolean;
  choice: Consent | null;
  // The footer's "Cookie settings" reopens the notice even after a choice was made.
  open: boolean;
};

const KEY = "sifl-consent";
const SERVER: ConsentState = { ready: false, choice: null, open: false };
const listeners = new Set<() => void>();
let state: ConsentState | null = null;

function read(): Consent | null {
  try {
    const value = window.localStorage.getItem(KEY);
    return value === "all" || value === "essential" ? value : null;
  } catch {
    return null;
  }
}

function current(): ConsentState {
  if (!state) state = { ready: true, choice: read(), open: false };
  return state;
}

function emit(next: Partial<ConsentState>) {
  state = { ...current(), ...next };
  listeners.forEach((listener) => listener());
}

export function setConsent(choice: Consent) {
  try {
    window.localStorage.setItem(KEY, choice);
  } catch {
    // Private windows may refuse storage; the choice then lasts for this page view only.
  }
  emit({ choice, open: false });
}

export function openConsent() {
  emit({ open: true });
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  // A choice made in another tab applies here too.
  const onStorage = (event: StorageEvent) => {
    if (event.key === KEY) emit({ choice: read() });
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function useConsent(): ConsentState {
  return useSyncExternalStore(subscribe, current, () => SERVER);
}
