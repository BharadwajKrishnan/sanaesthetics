import { redirect } from "next/navigation";
import { notify, verifyToken } from "@/lib/signups";

export const runtime = "nodejs";

// The link in the confirmation email. Confirms the signup and sends the reader to a result page.
export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token") ?? "";
  const signup = verifyToken(token);
  if (!signup) redirect("/subscribe?status=invalid");
  let status: "confirmed" | "exists" | "failed" = "confirmed";
  try {
    if ((await notify({ event: "confirmed", ...signup, confirmedAt: new Date().toISOString() })) === "exists") status = "exists";
  } catch (error) {
    console.error("[signup] could not reach the webhook", error);
    status = "failed";
  }
  redirect(`/subscribe?status=${status}&list=${signup.list}`);
}
