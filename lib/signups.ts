import { promises as fs } from "fs";
import path from "path";

// Local file storage for development: one JSON file per list in data/.
// A deployed site (e.g. on Vercel) has no writable disk, so replace the body
// of addSignup with a database or email-service call (the newsletter list maps
// naturally onto a provider such as Buttondown, Substack or Mailchimp) before
// going live.
export const LISTS = ["waitlist", "newsletter"] as const;
export type List = (typeof LISTS)[number];

type Entry = { email: string; joinedAt: string };

export async function addSignup(list: List, email: string): Promise<"added" | "exists"> {
  const file = path.join(process.cwd(), "data", `${list}.json`);
  let entries: Entry[] = [];
  try {
    entries = JSON.parse(await fs.readFile(file, "utf8"));
  } catch {
    // first signup: file does not exist yet
  }
  if (entries.some((e) => e.email === email)) return "exists";
  entries.push({ email, joinedAt: new Date().toISOString() });
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, JSON.stringify(entries, null, 2));
  return "added";
}
