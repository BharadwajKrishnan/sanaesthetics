"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { Artwork, TemperingPan } from "@/components/Artwork";
import { Arrow, KadaiIcon, LampIcon, PotIcon, ThaliIcon } from "@/components/Icons";
import { Eyebrow, H2, PRIMARY, TextLink } from "@/components/SiteChrome";
import { type Recipe, type RecipeCategory, recipeCategories, recipePath } from "@/lib/recipes";

// The recipes page: a tile per category that filters the recipes below it.
// The chosen category lives in the address (#festive-special), so a recipe page can link straight to its category.

type Filter = RecipeCategory | "all";

const ICONS: Record<Filter, typeof ThaliIcon> = {
  all: ThaliIcon,
  "main-dish": PotIcon,
  "festive-special": LampIcon,
  "side-dish": KadaiIcon,
};

const ALL = { id: "all", name: "All Recipes", description: "Every recipe on the site, in one place." } as const;

function subscribe(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}

function readFilter(): Filter {
  const id = decodeURIComponent(window.location.hash.slice(1));
  return recipeCategories.some((category) => category.id === id) ? (id as RecipeCategory) : "all";
}

function choose(filter: Filter) {
  // Replacing the entry keeps the back button for leaving the page, and does not scroll.
  window.history.replaceState(null, "", filter === "all" ? window.location.pathname : `#${filter}`);
  window.dispatchEvent(new HashChangeEvent("hashchange"));
}

export function RecipeFilter({ recipes }: { recipes: Recipe[] }) {
  const filter = useSyncExternalStore(subscribe, readFilter, () => "all" as const);

  // Only categories that have a recipe get a tile.
  const filters = [ALL, ...recipeCategories.filter((category) => recipes.some((recipe) => recipe.category === category.id))];
  const count = (id: Filter) => (id === "all" ? recipes.length : recipes.filter((recipe) => recipe.category === id).length);
  const shown = filter === "all" ? recipes : recipes.filter((recipe) => recipe.category === filter);
  const current = filters.find((f) => f.id === filter) ?? ALL;

  return (
    <>
      <div role="group" aria-label="Filter recipes by category" className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:auto-cols-fr lg:grid-flow-col lg:grid-cols-none">
        {filters.map((f, i) => {
          const on = f.id === filter;
          const Icon = ICONS[f.id];
          const n = count(f.id);
          return (
            <button
              key={f.id}
              id={f.id === "all" ? undefined : f.id}
              type="button"
              aria-pressed={on}
              aria-label={`${f.name}, ${n} ${n === 1 ? "recipe" : "recipes"}`}
              onClick={() => choose(f.id)}
              className={`reveal group relative flex cursor-pointer flex-col rounded-2xl border p-4 text-left transition-[background-color,border-color,color,box-shadow,translate] duration-300 sm:p-5 ${
                on
                  ? "border-forest-deep bg-forest-deep text-cream shadow-xl shadow-forest-deep/25"
                  : "border-line bg-white/60 text-ink hover:-translate-y-1 hover:border-brass hover:shadow-lg hover:shadow-ink/10"
              }`}
              style={{ ["--d" as string]: `${i * 70}ms` }}
            >
              <span className="flex items-start justify-between">
                <span
                  className={`relative flex h-14 w-14 items-center justify-center rounded-full transition-colors duration-300 sm:h-16 sm:w-16 ${
                    on ? "bg-cream/10 text-turmeric" : "bg-cream text-maroon"
                  }`}
                >
                  {/* A dashed brass ring that turns slowly around the chosen category */}
                  <svg viewBox="0 0 100 100" aria-hidden="true" className={`absolute -inset-1.5 h-[calc(100%+0.75rem)] w-[calc(100%+0.75rem)] ${on ? "spin-slow text-brass" : "text-line group-hover:text-brass"}`}>
                    <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeDasharray={on ? "4 6" : "100 0"} />
                  </svg>
                  <Icon className="h-9 w-9 transition-transform duration-500 ease-[var(--ease-spring)] group-hover:-rotate-6 group-hover:scale-110 sm:h-10 sm:w-10" />
                </span>
                <span aria-hidden="true" className={`font-serif text-3xl font-semibold leading-none transition-colors sm:text-4xl ${on ? "text-brass" : "text-ink/20"}`}>
                  {n}
                </span>
              </span>
              <span className="mt-4 font-serif text-[1.3rem] font-semibold leading-tight sm:text-[1.6rem]">{f.name}</span>
              <span className={`mt-1 hidden text-[0.85rem] leading-snug transition-colors sm:block ${on ? "text-cream/70" : "text-ink/60"}`}>{f.description}</span>
              {/* Points down at the recipes it is showing, once the tiles sit in one row */}
              <span
                aria-hidden="true"
                className={`absolute -bottom-[7px] left-1/2 hidden h-3.5 w-3.5 lg:block -translate-x-1/2 rotate-45 bg-forest-deep transition-opacity duration-300 ${on ? "opacity-100" : "opacity-0"}`}
              />
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="sr-only">
        {`Showing ${shown.length} ${shown.length === 1 ? "recipe" : "recipes"}: ${current.name}`}
      </p>

      <div key={filter} className="swap-in mt-10 sm:mt-12">
        {shown.length === 1 ? (
          <FeatureCard recipe={shown[0]} />
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((recipe) => (
              <li key={recipe.slug}>
                <RecipeCard recipe={recipe} tagged={filter === "all"} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

// The category on a card's picture, when every category is showing.
function CategoryTag({ id }: { id: RecipeCategory }) {
  const Icon = ICONS[id];
  return (
    <span className="pointer-events-none absolute left-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-cream/90 py-1 pl-1.5 pr-3 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-maroon shadow-sm backdrop-blur-sm">
      <Icon className="h-5 w-5" />
      {recipeCategories.find((category) => category.id === id)!.name}
    </span>
  );
}

function RecipeCard({ recipe, tagged }: { recipe: Recipe; tagged: boolean }) {
  return (
    <article className="card-lift flex h-full flex-col overflow-hidden rounded-2xl border border-line/80 bg-white/60">
      <div className="relative">
        {tagged && <CategoryTag id={recipe.category} />}
        <Artwork
          src={recipe.cover ?? recipe.photo}
          alt={recipe.coverAlt ?? recipe.photoAlt ?? recipe.title}
          link={{ href: recipePath(recipe.slug), "aria-label": recipe.title }}
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 90vw"
          className="relative aspect-[4/5]"
        >
          <TemperingPan />
        </Artwork>
      </div>
      <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
        <Eyebrow>{recipe.eyebrow}</Eyebrow>
        <h2 className="mt-2 font-serif text-[1.65rem] font-semibold leading-tight">
          <Link href={recipePath(recipe.slug)} className="transition-colors hover:text-maroon">
            {recipe.title}
          </Link>
        </h2>
        <p className="mt-2 text-[0.95rem] leading-relaxed text-ink/75">{recipe.summary}</p>
        <p className="mt-auto pt-4 text-[0.95rem]">
          <TextLink href={recipePath(recipe.slug)}>Get the recipe</TextLink>
        </p>
      </div>
    </article>
  );
}

// A category with one recipe shows it large, picture beside the words.
function FeatureCard({ recipe }: { recipe: Recipe }) {
  return (
    <article className="grid overflow-hidden rounded-3xl border border-line/80 bg-white/60 shadow-xl shadow-ink/5 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
      <Artwork
        src={recipe.cover ?? recipe.photo}
        alt={recipe.coverAlt ?? recipe.photoAlt ?? recipe.title}
        link={{ href: recipePath(recipe.slug), "aria-label": recipe.title }}
        sizes="(min-width: 1152px) 540px, (min-width: 768px) 48vw, 92vw"
        className="relative aspect-[4/5] md:aspect-auto md:min-h-[32rem]"
      >
        <TemperingPan />
      </Artwork>
      <div className="flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-12 lg:px-14">
        <Eyebrow className="text-maroon">{recipe.eyebrow}</Eyebrow>
        <h2 className={`mt-3 ${H2}`}>
          <Link href={recipePath(recipe.slug)} className="transition-colors hover:text-maroon">
            {recipe.title}
          </Link>
          {recipe.tamil && (
            <span lang="ta" className="mt-2 block font-tamil text-[0.5em] font-normal text-ink/55">
              {recipe.tamil}
            </span>
          )}
        </h2>
        <p className="mt-5 text-[1.0625rem] leading-relaxed text-ink/80">{recipe.summary}</p>
        <p className="mt-8">
          <Link href={recipePath(recipe.slug)} className={`${PRIMARY} bg-forest text-cream hover:bg-forest-deep`}>
            Get the recipe
            <Arrow />
          </Link>
        </p>
      </div>
    </article>
  );
}
