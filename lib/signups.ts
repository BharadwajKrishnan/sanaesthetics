import { createHmac, timingSafeEqual } from "crypto";

// Signups are double opt-in and the site keeps no list of its own.
//
// 1. The form posts an address to /api/signup. The site signs a confirmation
//    link and tells the n8n webhook about a "pending" signup; n8n emails the link.
// 2. The reader opens the link (/api/signup/confirm). The site checks the
//    signature and tells the webhook the signup is "confirmed"; n8n adds the
//    address to the sheet.
//
// Environment:
//   SIGNUP_WEBHOOK_URL     the n8n webhook that receives both events
//   SIGNUP_WEBHOOK_SECRET  optional; sent as the X-Signup-Secret header so n8n can refuse other callers
//   SIGNUP_SECRET          signs the confirmation links; any long random string
//   SITE_URL               optional; the public origin used in confirmation links
// Without a webhook URL (local development) events are printed to the server console instead.

export const LISTS = ["waitlist", "newsletter"] as const;
export type List = (typeof LISTS)[number];

export type SignupEvent =
  | { event: "pending"; list: List; email: string; confirmUrl: string; requestedAt: string }
  | { event: "confirmed"; list: List; email: string; confirmedAt: string };

export const CONFIRM_WINDOW_MS = 48 * 60 * 60 * 1000;

function secret() {
  const value = process.env.SIGNUP_SECRET;
  if (value) return value;
  if (process.env.NODE_ENV === "production") throw new Error("SIGNUP_SECRET is not set");
  return "development-only-secret";
}

function sign(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

export function createToken(list: List, email: string, now = Date.now()) {
  const payload = Buffer.from(JSON.stringify({ l: list, e: email, t: now })).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function verifyToken(token: string, now = Date.now()): { list: List; email: string } | null {
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;
  const expected = sign(payload);
  if (expected.length !== signature.length || !timingSafeEqual(Buffer.from(expected), Buffer.from(signature))) return null;
  try {
    const { l, e, t } = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (!LISTS.includes(l) || typeof e !== "string" || typeof t !== "number") return null;
    if (now - t > CONFIRM_WINDOW_MS || t > now + 60_000) return null;
    return { list: l, email: e };
  } catch {
    return null;
  }
}

// Sends an event to the webhook. Resolves to "exists" when n8n answers { "status": "exists" }, otherwise "ok".
export async function notify(event: SignupEvent): Promise<"ok" | "exists"> {
  const url = process.env.SIGNUP_WEBHOOK_URL;
  if (!url) {
    console.log(`[signup] no SIGNUP_WEBHOOK_URL set; event not sent:\n${JSON.stringify(event, null, 2)}`);
    return "ok";
  }
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (process.env.SIGNUP_WEBHOOK_SECRET) headers["X-Signup-Secret"] = process.env.SIGNUP_WEBHOOK_SECRET;
  const res = await fetch(url, { method: "POST", headers, body: JSON.stringify(event), signal: AbortSignal.timeout(10_000) });
  if (!res.ok) throw new Error(`webhook responded ${res.status}`);
  const data = await res.json().catch(() => null);
  return data?.status === "exists" ? "exists" : "ok";
}
