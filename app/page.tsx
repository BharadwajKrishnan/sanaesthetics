import Link from "next/link";
import { Artwork, HeroGarnish } from "@/components/Artwork";
import { Dabba } from "@/components/BrassDabba";
import { Arrow, BowlIcon, FlaskIcon, SproutIcon, TempleIcon } from "@/components/Icons";
import { InstagramEmbed } from "@/components/InstagramEmbed";
import { KolamCorner, KolamDivider } from "@/components/Kolam";
import { NewsletterTeaser } from "@/components/NewsletterTeaser";
import { SignupForm } from "@/components/SignupForm";
import { FlavourPyramid } from "@/components/FlavourPyramid";
import { Eyebrow, SiteFooter, SiteHeader, TextLink } from "@/components/SiteChrome";
import { SixTastes } from "@/components/SixTastes";
import { posts } from "@/lib/instagram";
import { photos } from "@/lib/photos";
import { CLASSES } from "@/lib/classes";
import { getPost, issueLink, posts as issues } from "@/lib/posts";
import { PYRAMID } from "@/lib/pyramid";
import { recipePath, recipes } from "@/lib/recipes";
import { site } from "@/lib/site";

const FEATURES = [
  { Icon: SproutIcon, lines: ["Recipes", "with a story"] },
  { Icon: FlaskIcon, lines: ["Flavour", "science"] },
  { Icon: TempleIcon, lines: ["Culture", "& heritage"] },
  { Icon: BowlIcon, lines: ["Classes", "online & in-person"] },
];

const AUDIENCE = [
  "You cook South Indian vegetarian food at home and want it to taste the way you remember.",
  "You live far from home and want to reconnect with the food you grew up with.",
  "You are new to South Indian cooking and the spice box looks like a puzzle.",
  "You like knowing why a recipe works, not only how.",
  "You have a family recipe that deserves to be written down properly.",
];

const arusuvai = getPost("arusuvai-where-tradition-meets-taste")!;
const issue1 = issueLink(arusuvai.slug);
// Only plain data crosses into the client component; the issues' React parts stay here.
const TEASERS = issues.map(({ slug, title, eyebrow, teaser, cover, coverAlt }) => ({ slug, title, eyebrow, teaser, cover, coverAlt, link: issueLink(slug) }));

const H2 = "font-serif text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-[3.5rem]";
const PRIMARY = "group inline-flex items-center gap-2.5 rounded-md px-6 py-3 font-medium transition-colors";

function HeroArt() {
  return (
    <Artwork src={photos.hero} alt="" sizes="(min-width: 1024px) 62vw, 100vw" priority className="relative h-full w-full">
      <HeroGarnish />
      <Dabba sizes="(min-width: 1024px) 26rem, 50vw" priority className="absolute left-1/2 top-1/2 w-[min(64%,20rem)] -translate-x-1/2 -translate-y-1/2 lg:left-auto lg:right-[9%] lg:top-[56%] lg:w-[min(42%,25rem)] lg:translate-x-0" />
    </Artwork>
  );
}

export default function Home() {
  return (
    <>
      <SiteHeader current="/" />

      <main id="main" className="overflow-x-clip">
        {/* Hero */}
        <section id="top" className="relative">
          <div className="fade-left absolute inset-y-0 right-0 hidden w-[62%] lg:block">
            <HeroArt />
            <p aria-hidden="true" className="absolute right-[4%] top-[7%] -rotate-[8deg] font-script text-[2rem] leading-[1.15] text-cream/90">
              Ingredients
              <br />
              Tradition
              <br />
              Science
              <br />
              Stories
              <span className="mt-3 block h-px w-24 bg-cream/60" />
            </p>
          </div>
          <KolamCorner className="pointer-events-none absolute left-3 top-3 hidden w-28 text-brass/70 md:block lg:w-36" />
          <KolamCorner className="pointer-events-none absolute bottom-3 left-3 hidden w-28 -scale-y-100 text-brass/70 md:block lg:w-36" />
          {/* On large screens this block spans the artwork too; clicks pass through its empty part to the spice box. */}
          <div className="relative mx-auto max-w-7xl px-5 pb-14 pt-12 sm:px-8 lg:pointer-events-none lg:pb-20 lg:pt-20">
            <div className="lg:pointer-events-auto lg:max-w-[50%]">
              <h1 className="font-serif text-[clamp(2.75rem,5vw,4.6rem)] font-medium leading-[1.02]">
                Traditional flavours.
                <br />A deeper understanding.
              </h1>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/85">
                South Indian vegetarian recipes, stories and flavour science, from a home kitchen to a wider table.
              </p>
              <a href="/recipes" target="_blank" rel="noopener" className={`${PRIMARY} mt-8 bg-forest text-cream hover:bg-forest-deep`}>
                Explore the Kitchen <Arrow />
              </a>
              <ul className="mt-12 grid grid-cols-2 gap-y-6 sm:grid-cols-4 sm:divide-x sm:divide-line lg:w-[min(47rem,62vw)]">
                {FEATURES.map(({ Icon, lines }) => (
                  <li key={lines[0]} className="flex items-center gap-3 pr-4 text-sm leading-snug text-maroon sm:pl-4 sm:first:pl-0">
                    <Icon className="h-9 w-9 shrink-0" />
                    <span className="whitespace-nowrap text-ink/85">
                      {lines[0]}
                      <br />
                      {lines[1]}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="h-80 sm:h-96 lg:hidden">
            <HeroArt />
          </div>
        </section>

        {/* Newsletter: one issue at a time, in a loop. Kept short on purpose; the issues speak for themselves. */}
        <section id="newsletter" className="px-0 sm:px-4">
          <div className="relative mx-auto max-w-[88rem] overflow-hidden bg-parchment">
            <KolamCorner className="pointer-events-none absolute right-2 top-2 w-24 -scale-x-100 text-brass/35 lg:w-32" />
            <KolamCorner className="pointer-events-none absolute bottom-2 left-2 w-24 -scale-y-100 text-brass/35 lg:w-32" />
            <div className="relative mx-auto max-w-5xl px-5 py-12 sm:px-8 lg:py-14">
              <NewsletterTeaser issues={TEASERS} />
            </div>
          </div>
        </section>

        {/* The flavour pyramid: how a South Indian dish is built, layer by layer */}
        <section id="pyramid">
          <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
            <div className="reveal max-w-3xl">
              <Eyebrow className="text-maroon">The flavour pyramid</Eyebrow>
              <h2 className={`${H2} mt-4`}>Flavour is built from the ground up.</h2>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/80">
                Six layers, from the kitchens we grew up in to the taste on the tongue. Pick a layer to see what lives there and
                what has been written about it so far.
              </p>
            </div>
            <FlavourPyramid layers={PYRAMID} />
          </div>
        </section>

        {/* Culture: the six tastes, previewing issue 1 */}
        <section id="culture" className="on-dark bg-forest-deep text-cream">
          <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
            <div className="reveal max-w-3xl">
              <Eyebrow className="text-brass">Layer 05 · Taste balance · Issue 1 preview</Eyebrow>
              <h2 className={`${H2} mt-4`}>The six tastes of a South Indian meal.</h2>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/80">
                Tamil kitchens counted six tastes long before anyone drew a molecule. Pick a taste to see what is behind it.
              </p>
            </div>
            <SixTastes />
            <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-4">
              <TextLink {...issue1} className="text-cream decoration-cream/40 hover:decoration-cream">
                Read issue 1 in full
              </TextLink>
              <Link href="#subscribe" className="font-medium underline decoration-cream/40 underline-offset-[6px] hover:decoration-cream">
                Subscribe to the newsletter
              </Link>
            </div>
          </div>
        </section>

        {/* Recipes */}
        <section id="recipes">
          <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
            <KolamDivider className="mb-16 text-brass" />
            <div className="reveal flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-3xl">
                <Eyebrow className="text-maroon">Recipes with a story</Eyebrow>
                <h2 className={`${H2} mt-4`}>From the kitchen, one post at a time.</h2>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/80">
                  The recipes start life on Instagram, with a note on why each ingredient was chosen. The written versions, with
                  quantities and the science, live on the Recipes page.
                </p>
                <p className="mt-5 flex flex-wrap items-baseline gap-x-6 gap-y-2">
                  <TextLink href="/recipes">Browse the written recipes</TextLink>
                  <span className="text-ink/70">
                    So far:{" "}
                    {recipes.map((recipe, i) => (
                      <span key={recipe.slug}>
                        {i > 0 && ", "}
                        <Link href={recipePath(recipe.slug)} className="underline decoration-ink/30 underline-offset-4 hover:decoration-ink">
                          {recipe.title}
                        </Link>
                      </span>
                    ))}
                    .
                  </span>
                </p>
              </div>
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-forest px-5 py-2.5 font-medium text-forest transition-colors hover:bg-forest hover:text-cream"
              >
                Follow @{site.instagramHandle}
              </a>
            </div>
            <div className="mt-16 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((item) => (
                <div key={item.id} className="reveal">
                  <InstagramEmbed item={item} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Classes */}
        <section id="classes" className="bg-parchment">
          <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
            <div className="reveal max-w-3xl">
              <Eyebrow className="text-maroon">Classes · online &amp; in-person · by request</Eyebrow>
              <h2 className={`${H2} mt-4`}>Classes where you cook, ask and understand.</h2>
            </div>
            <ol className="mt-14 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
              {CLASSES.map((item, i) => (
                <li key={item.title} className="reveal bg-parchment py-8 pr-8 sm:p-8">
                  <p className="font-serif text-lg font-semibold text-maroon">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-2 font-serif text-2xl font-semibold">{item.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink/75">{item.body}</p>
                </li>
              ))}
            </ol>
            <KolamDivider className="mt-14 text-brass" />
            <div className="mt-12 grid items-center gap-8 lg:grid-cols-2">
              <div>
                <h3 className="font-serif text-3xl font-semibold">Request a class</h3>
                <p className="mt-3 max-w-lg leading-relaxed text-ink/80">
                  Classes run when there are enough requests for one. Pick the class you are interested in and leave your name and
                  email, and I will write back with what is possible, when, and at what cost.
                </p>
              </div>
              <div className="lg:justify-self-end">
                <SignupForm list="waitlist" />
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about">
          <div className="mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="reveal">
              <Eyebrow className="text-maroon">About</Eyebrow>
              <h2 className={`${H2} mt-4`}>A home cook&apos;s notebook, grown up.</h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/80">
                It started as a cook&apos;s notebook on Instagram: an Indian home cook in Germany, cooking vegetarian, baking on
                weekends, planning menus for friends and waiting on the Indian grocery delivery. Every post carried a note on why
                an ingredient was chosen. {site.name} is where those notes become recipes, stories and the science behind them.
              </p>
              <p className="mt-6">
                <TextLink href="/about">{`Meet ${site.author.split(" ")[0]}`}</TextLink>
              </p>
            </div>
            <div>
              <p className="font-serif text-2xl font-semibold">Pull up a chair if this sounds like you.</p>
              <ul className="mt-6 border-t border-line">
                {AUDIENCE.map((line) => (
                  <li key={line} className="reveal flex items-baseline gap-4 border-b border-line py-5 text-lg leading-snug">
                    <span aria-hidden="true" className="inline-block h-2 w-2 shrink-0 -translate-y-0.5 rounded-full bg-maroon" />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Subscribe */}
        <section id="subscribe" className="on-dark relative overflow-hidden bg-forest-deep text-cream">
          <KolamCorner className="pointer-events-none absolute left-3 top-3 w-32 text-cream/25 lg:w-44" />
          <KolamCorner className="pointer-events-none absolute right-3 top-3 w-32 -scale-x-100 text-cream/25 lg:w-44" />
          <KolamCorner className="pointer-events-none absolute bottom-3 left-3 w-32 -scale-y-100 text-cream/25 lg:w-44" />
          <KolamCorner className="pointer-events-none absolute bottom-3 right-3 w-32 -scale-x-100 -scale-y-100 text-cream/25 lg:w-44" />
          <div className="reveal relative mx-auto max-w-2xl px-5 py-24 text-center sm:px-8">
            <Eyebrow className="text-brass">The newsletter</Eyebrow>
            <h2 className={`${H2} mt-4`}>Straight to your inbox.</h2>
            <p className="mt-4 font-serif text-2xl font-medium">Stories, ingredients and the science behind South Indian flavour.</p>
            <p className="mx-auto mt-5 max-w-xl leading-relaxed text-cream/80">
              One letter at a time: a recipe, the science that makes it work, and the story of the kitchen it came from. No spam,
              and a reply to any issue is enough to be taken off the list.
            </p>
            <div className="mt-9">
              <SignupForm list="newsletter" tone="dark" center />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
