import { promises as fs } from "fs";
import path from "path";

// Local file storage for development. A deployed site (e.g. on Vercel) has no
// writable disk, so replace the body of addToWaitlist with a database or
// email-service call before going live.
const FILE = path.join(process.cwd(), "data", "waitlist.json");

type Entry = { email: string; joinedAt: string };

export async function addToWaitlist(email: string): Promise<"added" | "exists"> {
  let entries: Entry[] = [];
  try {
    entries = JSON.parse(await fs.readFile(FILE, "utf8"));
  } catch {
    // first signup: file does not exist yet
  }
  if (entries.some((e) => e.email === email)) return "exists";
  entries.push({ email, joinedAt: new Date().toISOString() });
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(entries, null, 2));
  return "added";
}
