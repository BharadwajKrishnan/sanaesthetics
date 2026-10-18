// The classes a reader can ask about. Shown on the homepage and offered in the request form; the
// chosen label (see classLabel) is what lands in the sheet.
export const FORMATS = ["Online", "In-Person"] as const;
export type Format = (typeof FORMATS)[number];

export const CLASSES = [
  {
    id: "cooking",
    title: "Cooking Session",
    body: "Online or in person. Structured lessons that build from the anjarapetti upwards, or one dish cooked together in real time, with questions as you go.",
    // A cooking session is asked for in one of these formats; the form offers the choice once the class is picked.
    formats: FORMATS,
  },
  { id: "flavour-science", title: "Flavour Science Session", body: "One idea per session, such as tempering or fermentation, shown at the stove." },
] as const;

export type ClassId = (typeof CLASSES)[number]["id"];
export type Class = (typeof CLASSES)[number];

export function getClass(id: string) {
  return CLASSES.find((c) => c.id === id);
}

export function hasFormats(cls: Class): cls is Class & { formats: typeof FORMATS } {
  return "formats" in cls;
}

export function isFormat(value: string): value is Format {
  return (FORMATS as readonly string[]).includes(value);
}

// The class as it is recorded: the title, with the format in brackets when the class has one.
export function classLabel(cls: Class, format?: Format) {
  return hasFormats(cls) && format ? `${cls.title} (${format})` : cls.title;
}
