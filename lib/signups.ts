// Signups go straight to the list and the site keeps no list of its own.
// The form posts an address to /api/signup, which hands it to the n8n webhook;
// n8n adds the address to the sheet. The classes form also says which class was asked for.
//
// Environment:
//   SIGNUP_WEBHOOK_URL     the n8n webhook that receives signups
//   SIGNUP_WEBHOOK_SECRET  optional; sent as the xi-api-key header so n8n can refuse other callers
// Without a webhook URL (local development) signups are printed to the server console instead.

export const LISTS = ["waitlist", "newsletter"] as const;
export type List = (typeof LISTS)[number];

// `classType` is the title of the class a reader asked about and `phone` is optional; only the waitlist form sends them.
export type SignupEvent = { event: "subscribed"; list: List; name: string; email: string; classType?: string; phone?: string; subscribedAt: string };

// Sends a signup to the webhook. Resolves to "exists" when n8n answers { "status": "exists" }, otherwise "ok".
export async function notify(event: SignupEvent): Promise<"ok" | "exists"> {
  const url = process.env.SIGNUP_WEBHOOK_URL;
  if (!url) {
    console.log(`[signup] no SIGNUP_WEBHOOK_URL set; event not sent:\n${JSON.stringify(event, null, 2)}`);
    return "ok";
  }
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (process.env.SIGNUP_WEBHOOK_SECRET) headers["xi-api-key"] = process.env.SIGNUP_WEBHOOK_SECRET;
  const res = await fetch(url, { method: "POST", headers, body: JSON.stringify(event), signal: AbortSignal.timeout(10_000) });
  if (!res.ok) throw new Error(`webhook responded ${res.status}`);
  const data = await res.json().catch(() => null);
  return data?.status === "exists" ? "exists" : "ok";
}
