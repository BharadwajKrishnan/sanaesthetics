// Scales the quantities in a recipe's ingredient list to a different number of servings.
// Ingredients are free-form strings ("1½ tbsp gingelly (sesame) oil", "6 to 8 curry leaves", "Salt, to taste"), so
// only a leading quantity is touched; anything without one is returned as written.

export const MIN_SERVINGS = 1;
export const MAX_SERVINGS = 12;

// "4" -> 4. Anything else ("4 to 6", "a crowd") -> null, and the recipe shows its text unscaled.
export function parseServes(serves: string): number | null {
  const n = Number(serves.trim());
  return Number.isInteger(n) && n > 0 ? n : null;
}

const GLYPHS: Record<string, number> = { "¼": 0.25, "½": 0.5, "¾": 0.75, "⅓": 1 / 3, "⅔": 2 / 3, "⅛": 0.125 };
const G = Object.keys(GLYPHS).join("");

// 3 | 1.5 | ½ | 1½ | 1 ½ | 1/2 | 1 1/2
const QTY = String.raw`(?:\d+(?:\.\d+)?(?:\s?[${G}]|\s\d+/\d+)?|[${G}]|\d+/\d+)`;
// [About | Peel of] <qty> [to <qty>] <unit word> <rest>
const HEAD = new RegExp(String.raw`^(about\s+|\p{L}[\p{L}-]*\s+of\s+)?(${QTY})(?:\s+to\s+(${QTY}))?(?=\s)(\s+)([^\s,]+)(.*)$`, "iu");

const MEASURE = new Set(["tsp", "tbsp", "teaspoon", "teaspoons", "tablespoon", "tablespoons", "cup", "cups"]);
const WEIGHT_SMALL = new Set(["g", "gram", "grams", "ml"]);
const WEIGHT_BIG = new Set(["kg", "l", "litre", "litres", "liter", "liters"]);

type Kind = "measure" | "small" | "big" | "count";

function kindOf(word: string): Kind {
  const w = word.toLowerCase();
  if (MEASURE.has(w)) return "measure";
  if (WEIGHT_SMALL.has(w)) return "small";
  if (WEIGHT_BIG.has(w)) return "big";
  return "count";
}

function parseQty(text: string): number {
  let total = 0;
  for (const part of text.trim().split(/\s+/)) {
    // "1½" is one token: a whole number with a glyph stuck to it.
    const m = part.match(new RegExp(String.raw`^(\d+(?:\.\d+)?)?([${G}])?(?:(\d+)/(\d+))?$`, "u"));
    if (!m) continue;
    if (m[1]) total += Number(m[1]);
    if (m[2]) total += GLYPHS[m[2]];
    if (m[3] && m[4]) total += Number(m[3]) / Number(m[4]);
  }
  return total;
}

const SNAPS: [number, string][] = [
  [0, ""],
  [0.125, "⅛"],
  [0.25, "¼"],
  [1 / 3, "⅓"],
  [0.5, "½"],
  [2 / 3, "⅔"],
  [0.75, "¾"],
  [1, ""],
];

// Whole number plus the nearest friendly fraction: "⅓", "1⅛", "2¼", "3". Never 0.
function fmtFraction(v: number): string {
  let whole = Math.floor(v);
  const frac = v - whole;
  let best = SNAPS[0];
  for (const snap of SNAPS) {
    // Ties go to the larger candidate.
    if (Math.abs(snap[0] - frac) <= Math.abs(best[0] - frac) + 1e-9) best = snap;
  }
  if (best[0] === 1) {
    whole += 1;
    best = SNAPS[0];
  }
  if (whole === 0 && best[1] === "") return "⅛";
  return `${whole || ""}${best[1]}`;
}

// Counted things (chillies, brinjals, sprigs): halves below 4, whole numbers from there. Never 0.
function fmtCount(v: number): string {
  if (v >= 4) return String(Math.round(v));
  const half = Math.max(0.5, Math.round(v * 2) / 2);
  return fmtFraction(half);
}

// Grams and millilitres: to the nearest 5 below 100, 10 below 1000, 50 above.
function fmtWeight(v: number): string {
  const step = v < 100 ? 5 : v < 1000 ? 10 : 50;
  return String(Math.max(step, Math.round(v / step) * step));
}

function fmtBig(v: number): string {
  return String(Math.max(0.1, Math.round(v * 10) / 10));
}

function format(v: number, kind: Kind): string {
  switch (kind) {
    case "measure":
      return fmtFraction(v);
    case "small":
      return fmtWeight(v);
    case "big":
      return fmtBig(v);
    default:
      return fmtCount(v);
  }
}

// One ingredient line at `factor` times the written amount. Lines without a leading quantity, and pinches, come
// back unchanged; so does everything at factor 1, byte for byte, so the server render and the hydrated page agree.
// Plurals are left alone ("1 green chillies"): rewriting nouns would do more harm than good.
export function scaleIngredient(item: string, factor: number): string {
  if (factor === 1) return item;
  if (/\bpinch(es)?\b/i.test(item)) return item;

  const m = item.match(HEAD);
  if (!m) return item;
  const [, prefix = "", low, high, space, word, rest] = m;
  const kind = kindOf(word);

  const lowOut = format(parseQty(low) * factor, kind);
  const highOut = high ? format(parseQty(high) * factor, kind) : undefined;
  const qty = highOut && highOut !== lowOut ? `${lowOut} to ${highOut}` : lowOut;

  // "cup" and "cups" follow the (larger) amount.
  let unit = word;
  const lower = word.toLowerCase();
  if (lower === "cup" || lower === "cups") {
    const amount = parseQty(high ?? low) * factor;
    const plural = amount > 1;
    unit = plural ? "cups" : "cup";
    if (word[0] === "C") unit = unit[0].toUpperCase() + unit.slice(1);
  }

  // "…, or ¼ tsp chilli powder": the alternative after ", or " is a quantity of its own.
  let tail = rest;
  const or = rest.indexOf(", or ");
  if (or >= 0) {
    const cut = or + ", or ".length;
    tail = rest.slice(0, cut) + scaleIngredient(rest.slice(cut), factor);
  }

  return `${prefix}${qty}${space}${unit}${tail}`;
}
