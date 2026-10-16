import { getClass } from "@/lib/classes";
import { LISTS, notify, type List } from "@/lib/signups";

export const runtime = "nodejs";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Digits with the usual separators, e.g. "+49 170 1234567". Loose on purpose: it is a contact number, not an identifier.
const PHONE = /^\+?[0-9][0-9 ().\/-]{4,30}$/;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  // Collapse whitespace, and drop leading characters a spreadsheet would read as a formula.
  const name = typeof body?.name === "string" ? body.name.replace(/\s+/g, " ").trim().replace(/^[=+\-@]+/, "").trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const list = LISTS.includes(body?.list) ? (body.list as List) : null;
  if (!list) {
    return Response.json({ error: "list" }, { status: 400 });
  }
  if (!name || name.length > 100) {
    return Response.json({ error: "name" }, { status: 400 });
  }
  if (!EMAIL.test(email) || email.length > 254) {
    return Response.json({ error: "invalid" }, { status: 400 });
  }
  // A class request says which class; the newsletter form sends none.
  const cls = list === "waitlist" ? getClass(typeof body?.classType === "string" ? body.classType : "") : undefined;
  if (list === "waitlist" && !cls) {
    return Response.json({ error: "class" }, { status: 400 });
  }
  // Optional on the classes form. Always sent for a class request, as "" when not given, so the sheet column is filled.
  const phone = list === "waitlist" && typeof body?.phone === "string" ? body.phone.replace(/\s+/g, " ").trim() : "";
  if (phone && !PHONE.test(phone)) {
    return Response.json({ error: "phone" }, { status: 400 });
  }
  // Bots fill the hidden "website" field; people never see it.
  if (typeof body?.website === "string" && body.website !== "") {
    return Response.json({ status: "subscribed" });
  }
  try {
    const status = await notify({ event: "subscribed", list, name, email, classType: cls?.title, phone: list === "waitlist" ? phone : undefined, subscribedAt: new Date().toISOString() });
    return Response.json({ status: status === "exists" ? "exists" : "subscribed" });
  } catch (error) {
    console.error("[signup] could not reach the webhook", error);
    return Response.json({ error: "webhook" }, { status: 502 });
  }
}
