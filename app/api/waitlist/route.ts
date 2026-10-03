import { addToWaitlist } from "@/lib/waitlist";

export const runtime = "nodejs";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!EMAIL.test(email) || email.length > 254) {
    return Response.json({ error: "invalid" }, { status: 400 });
  }
  try {
    const status = await addToWaitlist(email);
    return Response.json({ status });
  } catch {
    return Response.json({ error: "storage" }, { status: 500 });
  }
}
