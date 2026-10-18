import type { Metadata } from "next";
import Link from "next/link";
import { Artwork, TemperingPan } from "@/components/Artwork";
import { KolamDivider } from "@/components/Kolam";
import { CONTAINER, Eyebrow, H1, SiteFooter, SiteHeader, TextLink } from "@/components/SiteChrome";
import { recipePath, recipePromise, recipes } from "@/lib/recipes";
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
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recipes.map((recipe, i) => (
              <li key={recipe.slug} className="reveal" style={{ ["--d" as string]: `${i * 90}ms` }}>
                <article className="card-lift flex h-full flex-col overflow-hidden rounded-2xl border border-line/80 bg-white/60">
                  <Artwork
                    src={recipe.cover ?? recipe.photo}
                    alt={recipe.coverAlt ?? recipe.photoAlt ?? recipe.title}
                    link={{ href: recipePath(recipe.slug), "aria-label": recipe.title }}
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                    className="relative aspect-[4/3]"
                  >
                    <TemperingPan />
                  </Artwork>
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
              </li>
            ))}
          </ul>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
