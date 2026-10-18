import { articleLink, getArticle } from "@/lib/articles";
import { getPost, issueLink } from "@/lib/posts";
import { getRecipe, recipePath } from "@/lib/recipes";

// Sandhya's flavour pyramid: how a South Indian dish is built, read from the foundation upward.
// Every chip points at writing that already exists; a topic gets its chip once there is something to read.
// This file imports the content modules, so it is only used from server components. The pyramid
// component receives the resolved, serialisable layers as props.

export type PyramidLink = { href: string; target?: "_blank"; rel?: "noopener" };
export type PyramidChip = { label: string; link: PyramidLink };
export type PyramidRead = { kind: "Issue" | "Article" | "Recipe" | "Recipes"; title: string; link: PyramidLink };
export type PyramidLayer = {
  n: number;
  id: string;
  title: string;
  tagline: string;
  blurb: string;
  chips: PyramidChip[];
  reads: PyramidRead[];
  // Tailwind classes for the layer's band and its label.
  tone: { bg: string; fg: string };
};

// A typo here fails `next build`, since the homepage is rendered at build time.
function issue(slug: string) {
  const post = getPost(slug);
  if (!post) throw new Error(`pyramid: unknown newsletter issue "${slug}"`);
  return { title: post.title, link: issueLink(slug) };
}

function article(slug: string) {
  const found = getArticle(slug);
  if (!found) throw new Error(`pyramid: unknown article "${slug}"`);
  return { title: found.title, link: articleLink(slug) };
}

function recipe(slug: string) {
  const found = getRecipe(slug);
  if (!found) throw new Error(`pyramid: unknown recipe "${slug}"`);
  return { title: found.title, link: { href: recipePath(slug) } };
}

const arusuvai = issue("arusuvai-where-tradition-meets-taste");
const anjarapetti = issue("inside-the-anjarapetti");
const tempering = article("when-ingredients-meet-heat");
const coffee = article("the-chemistry-behind-the-decoction");
const vathakuzhambu = recipe("vathakuzhambu");
const pachadi = recipe("mangai-pachadi");

export const PYRAMID: PyramidLayer[] = [
  {
    n: 1,
    id: "culture",
    title: "Culture & Memory",
    tagline: "Why we cook",
    blurb:
      "The foundation. Before any technique or ingredient there is a kitchen you grew up in, a festival you waited for, and a cup of coffee shared with someone.",
    chips: [
      { label: "Festival foods", link: pachadi.link },
      { label: "Coffee with my father", link: coffee.link },
      { label: "Arusuvai traditions", link: arusuvai.link },
    ],
    reads: [{ kind: "Issue", ...arusuvai }],
    tone: { bg: "bg-umber", fg: "text-cream" },
  },
  {
    n: 2,
    id: "technique",
    title: "Technique",
    tagline: "What we do",
    blurb: "How cooking changes ingredients: the pop in hot oil, the browning, the grind on stone, the slow thickening of a gravy.",
    chips: [
      { label: "Tempering", link: tempering.link },
      { label: "Roasting", link: coffee.link },
      { label: "Simmering", link: vathakuzhambu.link },
    ],
    reads: [{ kind: "Article", ...tempering }],
    tone: { bg: "bg-forest-deep", fg: "text-cream" },
  },
  {
    n: 3,
    id: "ingredients",
    title: "Ingredients",
    tagline: "What we use",
    blurb: "The pantry: what sits in the spice box, what hangs in the kitchen, and why each one earns its place.",
    chips: [
      { label: "Tamarind", link: vathakuzhambu.link },
      { label: "Curry leaves", link: tempering.link },
      { label: "Chillies", link: tempering.link },
      { label: "Dals", link: tempering.link },
      { label: "Oils", link: tempering.link },
    ],
    reads: [{ kind: "Issue", ...anjarapetti }],
    tone: { bg: "bg-forest", fg: "text-cream" },
  },
  {
    n: 4,
    id: "aroma",
    title: "Aroma & Perception",
    tagline: "What we smell and sense",
    blurb: "Most of what we call taste arrives through the nose: curry leaves meeting hot oil, mustard seeds popping, a decoction dripping through the filter.",
    chips: [
      { label: "Curry leaves in hot oil", link: tempering.link },
      { label: "Mustard seeds popping", link: tempering.link },
      { label: "Filter coffee aroma", link: coffee.link },
    ],
    reads: [{ kind: "Article", ...coffee }],
    tone: { bg: "bg-brass", fg: "text-ink" },
  },
  {
    n: 5,
    id: "taste",
    title: "Taste Balance",
    tagline: "What we taste",
    blurb: "Arusuvai, the six tastes a Tamil meal is built to hold in balance. Each one has a job, and each one keeps another in check.",
    chips: [
      { label: "Sweet", link: arusuvai.link },
      { label: "Sour", link: arusuvai.link },
      { label: "Salty", link: arusuvai.link },
      { label: "Bitter", link: arusuvai.link },
      { label: "Pungent", link: arusuvai.link },
      { label: "Astringent", link: arusuvai.link },
    ],
    reads: [
      { kind: "Issue", ...arusuvai },
      { kind: "Recipe", ...pachadi },
    ],
    tone: { bg: "bg-maroon", fg: "text-cream" },
  },
  {
    n: 6,
    id: "flavour",
    title: "Flavour",
    tagline: "The complete experience",
    blurb: "Everything below, in one spoonful. Memory, technique, ingredient, aroma and taste arriving together, which is why a dish can taste like home.",
    chips: [],
    reads: [{ kind: "Recipes", title: "Cook it: the recipes", link: { href: "/recipes" } }],
    tone: { bg: "bg-parchment", fg: "text-ink" },
  },
];
