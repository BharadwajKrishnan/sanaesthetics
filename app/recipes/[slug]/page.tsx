import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Artwork, PhotoTags, TemperingPan } from "@/components/Artwork";
import { KolamDivider } from "@/components/Kolam";
import { CONTAINER, Eyebrow, H1, SiteFooter, SiteHeader, TextLink } from "@/components/SiteChrome";
import { getPost, issueLink } from "@/lib/posts";
import { getCategory, getRecipe, recipes, type Recipe } from "@/lib/recipes";
import { openGraphShared, site } from "@/lib/site";

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
    openGraph: { ...openGraphShared, title: `${recipe.title} recipe`, description: recipe.summary, url: `/recipes/${recipe.slug}`, type: "article", authors: [site.author] },
  };
}

export default async function RecipePage({ params }: PageProps<"/recipes/[slug]">) {
  const { slug } = await params;
  const recipe = getRecipe(slug);
  if (!recipe) notFound();

  // The newsletter issue that talks about this dish.
  const related = getPost(recipe.issueSlug);

  return (
    <>
      <SiteHeader current="/recipes" />
      <main id="main" className="overflow-x-clip">
        <article>
          {/* Title and story */}
          <section className={`${CONTAINER} pt-8 lg:pt-12`}>
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-14">
              <div className="max-w-3xl">
                <p className="text-sm">
                  <Link href="/recipes" className="link-grow text-ink/60 hover:text-ink">
                    ← All recipes
                  </Link>
                  <span className="text-ink/40"> · </span>
                  <Link href={`/recipes#${recipe.category}`} className="link-grow text-ink/60 hover:text-ink">
                    {getCategory(recipe.category).name}
                  </Link>
                </p>
                <Eyebrow className="mt-6 text-maroon">{recipe.eyebrow}</Eyebrow>
                <h1 className={`mt-3 ${H1}`}>
                  {recipe.title}
                  {recipe.tamil && (
                    <span lang="ta" className="mt-2 block font-tamil text-[0.5em] font-normal text-ink/60">
                      {recipe.tamil}
                    </span>
                  )}
                </h1>

                <div className="mt-8 lg:hidden">
                  <Photo recipe={recipe} />
                </div>

                <div className="mt-6 space-y-4 text-[1.0625rem] leading-relaxed text-ink/85">
                  {recipe.intro.map((paragraph) => (
                    <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                  ))}
                  <p className="font-medium text-ink">{recipe.serve}</p>
                </div>
              </div>
              <div className="hidden lg:block">
                <Photo recipe={recipe} />
              </div>
            </div>
          </section>

          {/* Ingredients and method */}
          <section className={`${CONTAINER} pb-14 pt-10 sm:pb-20 lg:pt-12`}>
            <KolamDivider className="text-brass" />
            <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14">
              <aside className="lg:sticky lg:top-24 lg:self-start">
                <div className="reveal rounded-2xl border border-line/80 bg-parchment p-5 sm:p-6">
                  <h2 className="font-serif text-2xl font-semibold sm:text-3xl">Ingredients</h2>
                  {recipe.ingredients.map((group) => (
                    <div key={group.group} className="mt-5">
                      <Eyebrow>{group.group}</Eyebrow>
                      <ul className="mt-2 divide-y divide-line">
                        {group.items.map((item) => (
                          <li key={item} className="flex items-baseline gap-3 py-2 text-[0.95rem] leading-snug">
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
                <h2 className="reveal font-serif text-2xl font-semibold sm:text-3xl">Method</h2>
                <ol className="mt-4">
                  {recipe.steps.map((step, i) => (
                    <li key={step.slice(0, 24)} className="reveal grid grid-cols-[2.5rem_minmax(0,1fr)] gap-3 border-b border-line py-4 first:border-t sm:grid-cols-[3rem_minmax(0,1fr)]" style={{ ["--d" as string]: `${(i % 4) * 60}ms` }}>
                      <span className="font-serif text-2xl font-semibold leading-none text-maroon">{String(i + 1).padStart(2, "0")}</span>
                      <p className="text-[1.0625rem] leading-relaxed text-ink/85">{step}</p>
                    </li>
                  ))}
                </ol>

                <div className="reveal mt-8 rounded-r-xl border-l-4 border-maroon bg-parchment py-4 pl-5 pr-5 sm:pl-7">
                  <h3 className="font-serif text-2xl font-semibold">{recipe.ready.title}</h3>
                  <div className="mt-2 space-y-3 text-[0.95rem] leading-relaxed text-ink/85">
                    {recipe.ready.body.map((paragraph) => (
                      <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                    ))}
                  </div>
                </div>

                {related && (
                  <div className="reveal mt-10 border-t border-line pt-7">
                    <Eyebrow className="text-maroon">Read more</Eyebrow>
                    <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink/85">{recipe.readMore}</p>
                    <p className="mt-3">
                      <TextLink {...issueLink(related.slug)}>{related.title}</TextLink>
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

// The finished dish on top, then the second picture (the ingredients, with labels) and the tip, when there is one.
function Photo({ recipe }: { recipe: Recipe }) {
  const cover = recipe.cover ?? recipe.photo;
  const second = recipe.cover && recipe.photo ? recipe.photo : undefined;
  const tags = second && recipe.photoTags?.length ? recipe.photoTags : undefined;
  const sizes = "(min-width: 1024px) 30vw, (min-width: 640px) 24rem, 90vw";
  const credit = recipe.coverCredit;
  return (
    <div className="mx-auto w-full max-w-sm space-y-6 lg:max-w-none">
      <figure>
        <Artwork src={cover} alt={recipe.coverAlt ?? recipe.photoAlt ?? `A bowl of ${recipe.title}`} sizes={sizes} priority className="relative aspect-[4/5] w-full rounded-xl shadow-xl shadow-ink/15">
          <TemperingPan />
        </Artwork>
        {credit && (
          <figcaption className="mt-2 text-right text-xs text-ink/55">
            Photo:{" "}
            <a href={credit.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline decoration-ink/25 underline-offset-2 hover:decoration-ink">
              {credit.by}
            </a>
            , {credit.source},{" "}
            <a href={credit.licenceUrl} target="_blank" rel="noopener noreferrer" className="underline decoration-ink/25 underline-offset-2 hover:decoration-ink">
              {credit.licence}
            </a>
          </figcaption>
        )}
      </figure>
      {(second || recipe.tip) && (
        <figure>
          {second && (
            <div className="relative">
              <Artwork src={second} alt={recipe.photoAlt ?? ""} sizes={sizes} className={`relative w-full rounded-xl shadow-xl shadow-ink/15 ${tags ? "aspect-[2/3]" : "aspect-[4/5]"}`}>
                <TemperingPan />
              </Artwork>
              {tags && <PhotoTags tags={tags} />}
            </div>
          )}
          {recipe.tip && (
            <figcaption className={`${second ? "mt-4" : ""} rounded-r-xl border-l-4 border-brass bg-parchment px-4 py-3 text-[0.95rem] leading-relaxed text-ink/85`}>
              <span className="mr-2 font-serif text-lg font-semibold text-maroon">Pro tip</span>
              {recipe.tip}
            </figcaption>
          )}
        </figure>
      )}
    </div>
  );
}
