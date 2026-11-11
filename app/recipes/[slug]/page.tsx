import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Artwork, PhotoTags, TemperingPan } from "@/components/Artwork";
import { KolamDivider } from "@/components/Kolam";
import { ScaledIngredients, ServingsProvider, ServingsStepper } from "@/components/Servings";
import { CONTAINER, Eyebrow, H1, SiteFooter, SiteHeader, TextLink } from "@/components/SiteChrome";
import { articleLink } from "@/lib/articles";
import { getPost, issueLink } from "@/lib/posts";
import { getCategory, getRecipe, recipes, type Recipe } from "@/lib/recipes";
import { parseServes } from "@/lib/servings";
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
  const related = recipe.issueSlug ? getPost(recipe.issueSlug) : undefined;
  const { tipsLink } = recipe;
  // The number the recipe was written for; the reader can scale the ingredients from it.
  const base = parseServes(recipe.serves ?? "");
  const facts: { label: string; value: React.ReactNode }[] = [
    recipe.makes ? { label: "Makes", value: recipe.makes } : { label: "Serves", value: <ServingsStepper fallback={recipe.serves ?? ""} /> },
    { label: "Preparation", value: recipe.prepTime },
    { label: "Cooking", value: recipe.cookTime },
  ];

  return (
    <>
      <SiteHeader current="/recipes" />
      <main id="main" className="overflow-x-clip">
        <article>
          <ServingsProvider key={recipe.slug} base={base}>
            {/* Title and story */}
            <section className={`${CONTAINER} pt-6 lg:pt-10`}>
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

                  <div className="mt-6 lg:hidden">
                    <CoverPhoto recipe={recipe} />
                  </div>

                  <div className="mt-6 space-y-4 text-[1.0625rem] leading-relaxed text-ink/85">
                    {recipe.intro.map((paragraph) => (
                      <p key={paragraph.slice(0, 24)}>
                        {/* Every second piece sits between a pair of ** */}
                        {paragraph.split("**").map((piece, i) => (i % 2 ? <strong key={piece} className="font-semibold text-ink">{piece}</strong> : piece))}
                      </p>
                    ))}
                    {recipe.serve && <p className="font-medium text-ink">{recipe.serve}</p>}
                  </div>

                  <dl className="mt-6 grid grid-cols-3 gap-3 border-y border-line py-3">
                    {facts.map((fact) => (
                      <div key={fact.label}>
                        <dt>
                          <Eyebrow rule={false}>{fact.label}</Eyebrow>
                        </dt>
                        <dd className="mt-1 font-serif text-lg font-semibold leading-tight text-ink sm:text-xl">{fact.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <div className="hidden lg:block">
                  <CoverPhoto recipe={recipe} />
                </div>
              </div>
            </section>

            {/* Ingredients and method */}
            <section className={`${CONTAINER} pb-12 pt-8 sm:pb-16 lg:pt-10`}>
              <KolamDivider className="text-brass" />
              <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14">
                <aside className="lg:sticky lg:top-24 lg:self-start">
                  <div className="reveal rounded-2xl border border-line/80 bg-parchment p-5 sm:p-6">
                    <h2 className="font-serif text-2xl font-semibold sm:text-3xl">Ingredients</h2>
                    <ScaledIngredients groups={recipe.ingredients} />
                  </div>
                  {/* The ingredients, laid out and labelled, next to the list they belong to */}
                  <IngredientsPhoto recipe={recipe} />
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

                  <RecipeVideo recipe={recipe} />

                  <div className="reveal mt-8 rounded-r-xl border-l-4 border-maroon bg-parchment py-4 pl-5 pr-5 sm:pl-7">
                    <h3 className="font-serif text-2xl font-semibold">Kitchen tips</h3>
                    <ul className="mt-3 space-y-3 text-[0.95rem] leading-relaxed text-ink/85">
                      {recipe.tips.map((tip, i) => (
                        <li key={tip.slice(0, 24)} className="flex items-baseline gap-3">
                          <span aria-hidden="true" className="inline-block h-1.5 w-1.5 shrink-0 -translate-y-0.5 rounded-full bg-maroon" />
                          <span>
                            {tip}
                            {tipsLink && i === recipe.tips.length - 1 && (
                              <>
                                {" "}
                                <a {...articleLink(tipsLink.articleSlug)} className="font-medium text-maroon underline decoration-maroon/40 underline-offset-4 transition-colors hover:decoration-maroon">
                                  {tipsLink.text}
                                </a>
                              </>
                            )}
                          </span>
                        </li>
                      ))}
                    </ul>
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
          </ServingsProvider>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}

// The finished dish, beside the title.
function CoverPhoto({ recipe }: { recipe: Recipe }) {
  const cover = recipe.cover ?? recipe.photo;
  const credit = recipe.coverCredit;
  return (
    <figure className="mx-auto w-full max-w-sm lg:max-w-none">
      <Artwork src={cover} alt={recipe.coverAlt ?? recipe.photoAlt ?? `A bowl of ${recipe.title}`} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 24rem, 90vw" priority className="relative aspect-[4/5] w-full rounded-xl shadow-xl shadow-ink/15">
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
  );
}

// A short clip of the cooking, after the method. Muted and looping, so it plays on its own like a moving picture;
// the controls are there for anyone who wants to pause it. The cover photo stands in until it loads.
function RecipeVideo({ recipe }: { recipe: Recipe }) {
  if (!recipe.video) return null;
  return (
    <figure className="reveal mt-8">
      <video
        src={recipe.video.src}
        poster={recipe.cover}
        autoPlay
        muted
        loop
        playsInline
        controls
        preload="metadata"
        aria-label={recipe.video.caption}
        className="mx-auto w-full max-w-sm rounded-xl shadow-xl shadow-ink/15"
      />
      <figcaption className="mt-3 text-center text-sm text-ink/60">{recipe.video.caption}</figcaption>
    </figure>
  );
}

// The second picture (the ingredients, with labels), under the ingredient list. Only when the recipe has both.
function IngredientsPhoto({ recipe }: { recipe: Recipe }) {
  if (!recipe.cover || !recipe.photo) return null;
  const tags = recipe.photoTags?.length ? recipe.photoTags : undefined;
  return (
    <figure className="reveal relative mx-auto mt-5 w-full max-w-sm lg:max-w-[18rem]">
      <Artwork src={recipe.photo} alt={recipe.photoAlt ?? ""} sizes="(min-width: 1024px) 18rem, (min-width: 640px) 24rem, 90vw" className={`relative w-full rounded-xl shadow-xl shadow-ink/15 ${recipe.photoAspect === "2/3" ? "aspect-[2/3]" : "aspect-[4/5]"}`}>
        <TemperingPan />
      </Artwork>
      {tags && <PhotoTags tags={tags} />}
    </figure>
  );
}
