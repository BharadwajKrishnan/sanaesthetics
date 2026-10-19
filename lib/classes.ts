// The sessions a reader can ask about. Shown on the homepage and offered in the request form; the
// chosen label (see classLabel) is what lands in the sheet.
export const FORMATS = ["Online", "In-Person"] as const;
export type Format = (typeof FORMATS)[number];

export const CLASSES = [
  {
    id: "cooking",
    title: "Cooking Session",
    body: "Online or in person. Structured lessons that build from the anjarapetti upwards, or one dish cooked together in real time, with questions as you go.",
    // A cooking session is asked for in one of these formats; the form offers the choice once the session is picked.
    formats: FORMATS,
  },
  { id: "flavour-science", title: "Flavour Science Session", body: "Bring a topic, and let’s explore it together." },
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

// The session as it is recorded: the title, with the format in brackets when the session has one.
export function classLabel(cls: Class, format?: Format) {
  return hasFormats(cls) && format ? `${cls.title} (${format})` : cls.title;
}

// Session topics advertised above the sessions, scrolling past in one line.
export const TOPICS: readonly string[] = [
  "From Decoction to Cup: South Indian Filter Coffee",
  "Everyday Cooking Techniques: Tempering, Roasting & Balancing Flavours",
  "South Indian Cooking from Scratch",
  "Make Your Own South Indian Filter Coffee",
  "Feel the Heat: The Art of Tempering",
  "A Simple South Indian Meal",
];
