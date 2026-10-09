import { addSignup, LISTS, type List } from "@/lib/signups";

export const runtime = "nodejs";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

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
  try {
    const status = await addSignup(list, email);
    return Response.json({ status });
  } catch {
    return Response.json({ error: "storage" }, { status: 500 });
  }
}
