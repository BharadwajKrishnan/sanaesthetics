import { createToken, LISTS, notify, type List } from "@/lib/signups";
import { site } from "@/lib/site";

export const runtime = "nodejs";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// The public origin for links in emails. In development it is the dev server.
function origin(request: Request) {
  if (process.env.SITE_URL) return process.env.SITE_URL;
  if (process.env.NODE_ENV !== "production") return new URL(request.url).origin;
  return site.url;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const list = LISTS.includes(body?.list) ? (body.list as List) : null;
  if (!list) {
    return Response.json({ error: "list" }, { status: 400 });
  }
  if (!EMAIL.test(email) || email.length > 254) {
    return Response.json({ error: "invalid" }, { status: 400 });
  }
  // Bots fill the hidden "website" field; people never see it.
  if (typeof body?.website === "string" && body.website !== "") {
    return Response.json({ status: "pending" });
  }
  try {
    const token = createToken(list, email);
    const confirmUrl = `${origin(request)}/api/signup/confirm?token=${encodeURIComponent(token)}`;
    const status = await notify({ event: "pending", list, email, confirmUrl, requestedAt: new Date().toISOString() });
    return Response.json({ status: status === "exists" ? "exists" : "pending" });
  } catch (error) {
    console.error("[signup] could not reach the webhook", error);
    return Response.json({ error: "webhook" }, { status: 502 });
  }
}
