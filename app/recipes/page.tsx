import type { Metadata } from "next";
import Link from "next/link";
import { Artwork, TemperingPan } from "@/components/Artwork";
import { KolamDivider } from "@/components/Kolam";
import { Eyebrow, SiteFooter, SiteHeader, TextLink } from "@/components/SiteChrome";
import { recipePath, recipePromise, recipes } from "@/lib/recipes";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Recipes | ${site.name}`,
  description: "Traditional South Indian vegetarian recipes, tested and measured so you can reproduce them, with the science and the story behind each one.",
  alternates: { canonical: "/recipes" },
  openGraph: { title: `${site.name} recipes`, description: "South Indian vegetarian recipes, tested and measured.", url: "/recipes", type: "website" },
};

export default function Recipes() {
  return (
    <>
      <SiteHeader current="/recipes" />
      <main id="main" className="overflow-x-clip">
        <section className="mx-auto max-w-7xl px-5 pb-20 pt-12 sm:px-8 lg:pb-28 lg:pt-20">
          <div className="max-w-3xl">
            <Eyebrow className="text-maroon">Recipes</Eyebrow>
            <h1 className="mt-4 font-serif text-[clamp(2.5rem,4.6vw,4.2rem)] font-medium leading-[1.04]">Recipes with a story.</h1>
            <p className="mt-6 max-w-2xl font-serif text-2xl font-medium leading-snug text-maroon">“{recipePromise}”</p>
            <p className="mt-4 text-sm text-ink/60">{site.author}</p>
          </div>

          <KolamDivider className="mt-14 text-brass" />
          <ul className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {recipes.map((recipe) => (
              <li key={recipe.slug} className="reveal">
                <Link href={recipePath(recipe.slug)} aria-label={recipe.title} className="block">
                  <Artwork src={recipe.photo} alt={recipe.title} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw" className="relative aspect-[4/5] rounded-sm">
                    <TemperingPan />
                  </Artwork>
                </Link>
                <Eyebrow className="mt-5">{recipe.eyebrow}</Eyebrow>
                <h2 className="mt-2 font-serif text-3xl font-semibold leading-tight">
                  <Link href={recipePath(recipe.slug)} className="hover:text-maroon">
                    {recipe.title}
                  </Link>
                </h2>
                <p className="mt-3 leading-relaxed text-ink/80">{recipe.summary}</p>
                <p className="mt-4">
                  <TextLink href={recipePath(recipe.slug)}>Get the recipe</TextLink>
                </p>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
