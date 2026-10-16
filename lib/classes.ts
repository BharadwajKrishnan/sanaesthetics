// The classes a reader can ask about. Shown on the homepage and offered in the request form; the
// chosen title is what lands in the sheet.
export const CLASSES = [
  { id: "online-course", title: "Online cooking courses", body: "Structured lessons that build from the anjarapetti upwards." },
  { id: "live-workshop", title: "Live cooking workshops", body: "Cook one dish together, in real time, with questions as you go." },
  { id: "flavour-science", title: "Flavour science sessions", body: "One idea per session, such as tempering or fermentation, shown at the stove." },
] as const;

export type ClassId = (typeof CLASSES)[number]["id"];

export function getClass(id: string) {
  return CLASSES.find((c) => c.id === id);
}
