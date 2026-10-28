import type { Metadata } from "next";
import { KolamDivider } from "@/components/Kolam";
import { RecipeFilter } from "@/components/RecipeFilter";
import { CONTAINER, Eyebrow, H1, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { recipePromise, recipes } from "@/lib/recipes";
import { openGraphShared, site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Recipes | ${site.name}`,
  description: "Traditional South Indian vegetarian recipes, tested and measured so you can reproduce them, with the science and the story behind each one.",
  alternates: { canonical: "/recipes" },
  openGraph: { ...openGraphShared, title: `${site.name} recipes`, description: "South Indian vegetarian recipes, tested and measured.", url: "/recipes", type: "website" },
};

export default function Recipes() {
  return (
    <>
      <SiteHeader current="/recipes" />
      <main id="main" className="overflow-x-clip">
        <section className={`${CONTAINER} pb-14 pt-8 sm:pb-20 lg:pt-12`}>
          <div className="reveal grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
            <div>
              <Eyebrow className="text-maroon">Recipes</Eyebrow>
              <h1 className={`mt-3 ${H1}`}>Recipes with a story.</h1>
            </div>
            <div className="lg:border-l lg:border-line lg:pl-8">
              <p className="font-serif text-xl font-medium italic leading-snug text-maroon sm:text-2xl">“{recipePromise}”</p>
              <p className="mt-2 text-sm text-ink/60">{site.author}</p>
            </div>
          </div>

          <KolamDivider className="mt-8 text-brass" />
          <RecipeFilter recipes={recipes} />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
