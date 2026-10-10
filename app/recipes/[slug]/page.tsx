import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Artwork, TemperingPan } from "@/components/Artwork";
import { Eyebrow, SiteFooter, SiteHeader, TextLink } from "@/components/SiteChrome";
import { postPath, posts } from "@/lib/posts";
import { getRecipe, recipePromise, recipes } from "@/lib/recipes";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return recipes.map((recipe) => ({ slug: recipe.slug }));
}

export async function generateMetadata({ params }: PageProps<"/recipes/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const recipe = getRecipe(slug);
  if (!recipe) return {};
  return {
    title: `${recipe.title} recipe | ${site.name}`,
    description: recipe.summary,
    alternates: { canonical: `/recipes/${recipe.slug}` },
    openGraph: { title: `${recipe.title} recipe`, description: recipe.summary, url: `/recipes/${recipe.slug}`, type: "article", authors: [site.author] },
  };
}

export default async function RecipePage({ params }: PageProps<"/recipes/[slug]">) {
  const { slug } = await params;
  const recipe = getRecipe(slug);
  if (!recipe) notFound();

  // The newsletter issue that talks about this dish, if there is one.
  const related = posts.find((post) => post.slug === "arusuvai-where-tradition-meets-taste");

  return (
    <>
      <SiteHeader current="/recipes" />
      <main id="main" className="overflow-x-clip">
        <article>
          {/* Title and story */}
          <section className="mx-auto max-w-7xl px-5 pt-12 sm:px-8 lg:pt-20">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-20">
              <div className="max-w-3xl">
                <p className="text-sm">
                  <Link href="/recipes" className="text-ink/60 hover:text-ink hover:underline hover:underline-offset-4">
                    ← All recipes
                  </Link>
                </p>
                <Eyebrow className="mt-8 text-maroon">{recipe.eyebrow}</Eyebrow>
                <h1 className="mt-4 font-serif text-[clamp(2.75rem,5vw,4.6rem)] font-medium leading-[1.02]">
                  {recipe.title}
                  {recipe.tamil && (
                    <span lang="ta" className="mt-2 block font-tamil text-[0.5em] font-normal text-ink/60">
                      {recipe.tamil}
                    </span>
                  )}
                </h1>
                <p className="mt-6 max-w-xl font-serif text-xl font-medium leading-snug text-maroon">“{recipePromise}”</p>

                <div className="mt-10 lg:hidden">
                  <Photo src={recipe.photo} title={recipe.title} />
                </div>

                <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink/85">
                  {recipe.intro.map((paragraph) => (
                    <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                  ))}
                  <p className="font-medium text-ink">{recipe.serve}</p>
                </div>
              </div>
              <div className="hidden lg:block">
                <Photo src={recipe.photo} title={recipe.title} />
              </div>
            </div>
          </section>

          {/* Ingredients and method */}
          <section className="mx-auto max-w-7xl px-5 pb-20 pt-16 sm:px-8 lg:pb-28 lg:pt-20">
            <div className="grid gap-12 border-t border-line pt-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
              <aside className="lg:sticky lg:top-28 lg:self-start">
                <div className="bg-parchment p-6 sm:p-8">
                  <h2 className="font-serif text-3xl font-semibold">Ingredients</h2>
                  {recipe.ingredients.map((group) => (
                    <div key={group.group} className="mt-6">
                      <Eyebrow>{group.group}</Eyebrow>
                      <ul className="mt-3 divide-y divide-line">
                        {group.items.map((item) => (
                          <li key={item} className="flex items-baseline gap-3 py-2.5 leading-snug">
                            <span aria-hidden="true" className="inline-block h-1.5 w-1.5 shrink-0 -translate-y-0.5 rounded-full bg-maroon" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </aside>

              <div className="max-w-3xl">
                <h2 className="font-serif text-3xl font-semibold">Method</h2>
                <ol className="mt-6">
                  {recipe.steps.map((step, i) => (
                    <li key={step.slice(0, 24)} className="reveal grid grid-cols-[2.5rem_minmax(0,1fr)] gap-4 border-b border-line py-6 first:border-t sm:grid-cols-[3.5rem_minmax(0,1fr)]">
                      <span className="font-serif text-2xl font-semibold leading-none text-maroon">{String(i + 1).padStart(2, "0")}</span>
                      <p className="text-lg leading-relaxed text-ink/85">{step}</p>
                    </li>
                  ))}
                </ol>

                <div className="reveal mt-12 border-l-4 border-maroon bg-cream pl-6 sm:pl-8">
                  <h3 className="font-serif text-2xl font-semibold">{recipe.ready.title}</h3>
                  <div className="mt-3 space-y-4 leading-relaxed text-ink/85">
                    {recipe.ready.body.map((paragraph) => (
                      <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                    ))}
                  </div>
                </div>

                {related && (
                  <div className="reveal mt-14 border-t border-line pt-10">
                    <Eyebrow className="text-maroon">Read more</Eyebrow>
                    <p className="mt-3 text-lg leading-relaxed text-ink/85">{recipe.readMore}</p>
                    <p className="mt-4">
                      <TextLink href={postPath(related.slug)}>{related.title}</TextLink>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}

function Photo({ src, title }: { src?: string; title: string }) {
  return (
    <Artwork src={src} alt={`A bowl of ${title}`} sizes="(min-width: 1024px) 34vw, (min-width: 640px) 28rem, 90vw" priority className="relative mx-auto aspect-[4/5] w-full max-w-md rounded-sm shadow-xl shadow-ink/15 lg:max-w-none">
      <TemperingPan />
    </Artwork>
  );
}
