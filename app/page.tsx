import Link from "next/link";
import { Artwork, HeroGarnish } from "@/components/Artwork";
import { Dabba } from "@/components/BrassDabba";
import { HeroFrame } from "@/components/HeroFrame";
import { Arrow, BowlIcon, FlaskIcon, SproutIcon, TempleIcon } from "@/components/Icons";
import { InstagramEmbed } from "@/components/InstagramEmbed";
import { KolamCorner } from "@/components/Kolam";
import { NewsletterTeaser } from "@/components/NewsletterTeaser";
import { SignupForm } from "@/components/SignupForm";
import { FlavourPyramid } from "@/components/FlavourPyramid";
import { CONTAINER, Eyebrow, H2, PRIMARY, SECTION, SectionHead, SiteFooter, SiteHeader, TextLink } from "@/components/SiteChrome";
import { SixTastes } from "@/components/SixTastes";
import { TopicsTicker } from "@/components/TopicsTicker";
import { posts } from "@/lib/instagram";
import { CLASSES, TOPICS } from "@/lib/classes";
import { photos } from "@/lib/photos";
import { getPost, issueLink, posts as issues } from "@/lib/posts";
import { PYRAMID } from "@/lib/pyramid";
import { recipePath, recipes } from "@/lib/recipes";
import { site } from "@/lib/site";

// Each chip in the hero opens the section or page it names.
const FEATURES = [
  { Icon: SproutIcon, lines: ["Recipes", "with a story"], href: "/recipes" },
  { Icon: FlaskIcon, lines: ["Flavour", "science"], href: "/flavour-science" },
  { Icon: TempleIcon, lines: ["Culture", "& heritage"], href: "/#culture" },
  { Icon: BowlIcon, lines: ["Classes", "online & in-person"], href: "/#classes" },
];

const AUDIENCE = [
  "You are new to South Indian cooking and the spice box looks like a puzzle.",
  "You cook South Indian vegetarian food at home and want it to taste the way you remember.",
  "You live far from home and want to reconnect with the food you grew up with.",
  "You like knowing why a recipe works, not only how.",
  "You have a family recipe that deserves to be written down properly.",
];

const arusuvai = getPost("arusuvai-where-tradition-meets-taste")!;
const issue1 = issueLink(arusuvai.slug);
// Only plain data crosses into the client component; the issues' React parts stay here.
const TEASERS = issues.map(({ slug, title, eyebrow, teaser, teaserPicture, cover, coverAlt }) => ({
  slug,
  title,
  eyebrow,
  teaser,
  picture: teaserPicture ?? (cover ? { src: cover, alt: coverAlt, width: 900, height: 1125 } : undefined),
  link: issueLink(slug),
}));

export default function Home() {
  return (
    <>
      <SiteHeader current="/" />

      <main id="main" className="overflow-x-clip">
        {/* Hero: the anjarapetti on its warm backdrop, settling in as the page opens */}
        <section id="top" className="relative overflow-hidden">
          <div aria-hidden="true" className="kolam-dots absolute inset-y-0 right-0 hidden w-[60%] lg:block" />
          <KolamCorner className="pointer-events-none absolute left-2 top-2 hidden w-20 text-brass/60 md:block lg:w-24" />
          <KolamCorner className="pointer-events-none absolute bottom-2 left-2 hidden w-20 -scale-y-100 text-brass/60 md:block lg:w-24" />
          <div className={`${CONTAINER} relative grid items-center gap-6 py-8 sm:py-10 lg:min-h-[min(calc(100svh-4rem),36rem)] lg:py-8 lg:grid-cols-[minmax(0,11fr)_minmax(0,13fr)] lg:gap-6`}>
            <div className="relative z-10">
              <h1 className="font-serif text-[clamp(2.5rem,3.7vw,3.8rem)] font-medium leading-[1.02]">
                <span className="hero-line" style={{ ["--i" as string]: 0 }}>
                  <span>Traditional flavours.</span>
                </span>
                <span className="hero-line" style={{ ["--i" as string]: 1 }}>
                  <span>A deeper understanding.</span>
                </span>
              </h1>
              <p className="hero-fade mt-4 max-w-md text-[1.0625rem] leading-relaxed text-ink/80" style={{ ["--i" as string]: 0 }}>
                South Indian vegetarian recipes, stories and flavour science, from a home kitchen to a wider table.
              </p>
              <p className="hero-fade mt-6" style={{ ["--i" as string]: 1 }}>
                <a href="/recipes" target="_blank" rel="noopener" className={`${PRIMARY} bg-forest text-cream hover:bg-forest-deep`}>
                  Explore the Kitchen <Arrow />
                </a>
              </p>
              <ul className="hero-fade mt-8 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-2" style={{ ["--i" as string]: 2 }}>
                {FEATURES.map(({ Icon, lines, href }) => (
                  <li key={lines[0]}>
                    <Link
                      href={href}
                      className="group flex items-center gap-2.5 whitespace-nowrap rounded-xl border border-line/80 bg-white/40 px-3 py-2 text-left text-[0.8rem] leading-tight text-ink/85 transition-[border-color,background-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-maroon/50 hover:bg-white/80 hover:shadow-md hover:shadow-ink/10"
                    >
                      <Icon className="h-7 w-7 shrink-0 text-maroon transition-transform duration-300 group-hover:scale-110" />
                      <span>
                        {lines[0]}
                        <br />
                        {lines[1]}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <HeroFrame className="mx-auto w-full max-w-[34rem] lg:max-w-none">
                <figure>
                  <Artwork src={photos.hero} alt="" sizes="(min-width: 1024px) 55vw, (min-width: 640px) 34rem, 100vw" priority className="relative aspect-[4/5] rounded-2xl shadow-2xl shadow-ink/30 sm:aspect-square lg:aspect-[5/4]">
                    <HeroGarnish />
                    <Dabba sizes="(min-width: 1024px) 24rem, (min-width: 640px) 20rem, 60vw" priority className="absolute left-1/2 top-1/2 w-[min(60%,22rem)] -translate-x-1/2 -translate-y-1/2" />
                  </Artwork>
                  <figcaption className="hero-fade mt-2 px-1" style={{ ["--i" as string]: 3 }}>
                    <span aria-hidden="true" className="-rotate-2 inline-block whitespace-nowrap font-script text-[1.35rem] leading-none text-maroon sm:text-[1.5rem] lg:text-[1.3rem] xl:text-[1.5rem]">
                      Ingredients · Tradition · Science · Stories
                    </span>
                  </figcaption>
                </figure>
              </HeroFrame>
            </div>
          </div>
        </section>

        {/* The flavour pyramid: how a South Indian dish is built, layer by layer */}
        <section id="pyramid" className={`${CONTAINER} ${SECTION}`}>
          <SectionHead
            eyebrow="The flavour pyramid"
            title="Flavour is built from the ground up."
            lede="Six layers, from the kitchens we grew up in to the taste on the tongue. Pick a layer to see what lives there and what has been written about it so far."
          />
          <FlavourPyramid layers={PYRAMID} />
        </section>

        {/* Newsletter: one issue at a time, in a loop. Kept short on purpose; the issues speak for themselves. */}
        <section id="newsletter" className={`${CONTAINER} pb-10 sm:pb-14`}>
          <div className="reveal relative overflow-hidden rounded-2xl border border-line/70 bg-parchment px-5 py-6 sm:px-8 sm:py-7">
            <KolamCorner className="pointer-events-none absolute right-1 top-1 w-16 -scale-x-100 text-brass/35 sm:w-20" />
            <KolamCorner className="pointer-events-none absolute bottom-1 left-1 w-16 -scale-y-100 text-brass/35 sm:w-20" />
            <div className="relative">
              <NewsletterTeaser issues={TEASERS} />
            </div>
          </div>
        </section>

        {/* Culture: the six tastes, previewing issue 1 */}
        <section id="culture" className="on-dark grain relative overflow-hidden bg-forest-deep text-cream">
          <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-1/2 h-[36rem] w-[36rem] -translate-y-1/2 rounded-full bg-forest blur-3xl" />
          <div className={`${CONTAINER} ${SECTION} relative`}>
            <SectionHead
              eyebrow="Layer 05 · Taste balance · Issue 1 preview"
              eyebrowClass="text-brass"
              ledeClass="text-cream/75"
              title="The six tastes of a South Indian meal."
              lede="Tamil kitchens counted six tastes long before anyone drew a molecule. Pick a taste to see what is behind it."
            />
            <SixTastes />
            <div className="reveal mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
              <TextLink {...issue1} className="text-cream decoration-cream/40 hover:decoration-cream">
                Read issue 1 in full
              </TextLink>
              <Link href="#subscribe" className="link-grow font-medium text-cream/85 hover:text-cream">
                Subscribe to the newsletter
              </Link>
            </div>
          </div>
        </section>

        {/* Recipes */}
        <section id="recipes" className={`${CONTAINER} ${SECTION}`}>
          <div className="reveal flex flex-wrap items-end justify-between gap-5">
            <div className="max-w-2xl">
              <Eyebrow className="text-maroon">Recipes with a story</Eyebrow>
              <h2 className={`${H2} mt-3`}>From the kitchen, one post at a time.</h2>
              <p className="mt-4 max-w-xl text-[1.0625rem] leading-relaxed text-ink/75">
                The recipes start life on Instagram, with a note on why each ingredient was chosen. The written versions, with
                quantities and the science, live on the Recipes page.
              </p>
              <p className="mt-4 flex flex-wrap items-baseline gap-x-5 gap-y-2 text-[0.95rem]">
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
              className="btn-sheen rounded-full border border-forest px-4 py-2 text-sm font-medium text-forest transition-colors hover:bg-forest hover:text-cream"
            >
              Follow @{site.instagramHandle}
            </a>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((item, i) => (
              <div key={item.id} className="reveal" style={{ ["--d" as string]: `${i * 90}ms` }}>
                <InstagramEmbed item={item} />
              </div>
            ))}
          </div>
        </section>

        {/* Classes */}
        <section id="classes" className="bg-parchment">
          <div className={`${CONTAINER} ${SECTION}`}>
            <SectionHead eyebrow={<>Classes · online &amp; in-person · by request</>} title="Classes where you cook, ask and understand." />
            <TopicsTicker topics={TOPICS} className="mt-6" />
            <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:gap-10">
              <div>
                <ol className="grid gap-3">
                  {CLASSES.map((item, i) => (
                    <li key={item.title} className="reveal rounded-xl border border-line/80 bg-cream/70 p-5" style={{ ["--d" as string]: `${i * 90}ms` }}>
                      <p className="font-serif text-base font-semibold text-maroon">{String(i + 1).padStart(2, "0")}</p>
                      <h3 className="mt-1 font-serif text-2xl font-semibold leading-tight">{item.title}</h3>
                      <p className="mt-2 text-[0.95rem] leading-relaxed text-ink/75">{item.body}</p>
                    </li>
                  ))}
                </ol>
                <div className="reveal mt-6">
                  <h3 className="font-serif text-2xl font-semibold">Request a class</h3>
                  <p className="mt-2 max-w-lg text-[0.95rem] leading-relaxed text-ink/75">
                    Classes run when there are enough requests for one. Pick the class you are interested in and leave your name and
                    email, and I will write back with what is possible, when, and at what cost.
                  </p>
                </div>
              </div>
              <div className="reveal rounded-2xl border border-line/80 bg-white/70 p-5 shadow-sm shadow-ink/5 sm:p-6" style={{ ["--d" as string]: "120ms" }}>
                <SignupForm list="waitlist" />
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className={`${CONTAINER} ${SECTION} grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12`}>
          <div className="reveal">
            <Eyebrow className="text-maroon">About</Eyebrow>
            <h2 className={`${H2} mt-3`}>A home cook&apos;s notebook, grown up.</h2>
            <p className="mt-4 max-w-xl text-[1.0625rem] leading-relaxed text-ink/75">
              It started as a cook&apos;s notebook on Instagram: an Indian home cook in Germany, cooking vegetarian, baking on
              weekends, planning menus for friends and waiting on the Indian grocery delivery. Every post carried a note on why
              an ingredient was chosen. {site.name} is where those notes become recipes, stories and the science behind them.
            </p>
            <p className="mt-5">
              <TextLink href="/about">{`Meet ${site.author.split(" ")[0]}`}</TextLink>
            </p>
          </div>
          <div className="reveal" style={{ ["--d" as string]: "100ms" }}>
            <p className="font-serif text-2xl font-semibold">Pull up a chair if this sounds like you.</p>
            <ul className="mt-4 border-t border-line">
              {AUDIENCE.map((line, i) => (
                <li key={line} className="reveal flex items-baseline gap-3 border-b border-line py-3 text-[1rem] leading-snug" style={{ ["--d" as string]: `${i * 70}ms` }}>
                  <span aria-hidden="true" className="inline-block h-1.5 w-1.5 shrink-0 -translate-y-0.5 rounded-full bg-maroon" />
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Subscribe */}
        <section id="subscribe" className="on-dark grain relative overflow-hidden bg-forest-deep text-cream">
          <div aria-hidden="true" className="kolam-dots absolute inset-0 [mask-image:radial-gradient(ellipse_60%_80%_at_50%_50%,#000_10%,transparent_70%)]" />
          <KolamCorner className="pointer-events-none absolute left-2 top-2 w-20 text-cream/25 lg:w-28" />
          <KolamCorner className="pointer-events-none absolute right-2 top-2 w-20 -scale-x-100 text-cream/25 lg:w-28" />
          <KolamCorner className="pointer-events-none absolute bottom-2 left-2 w-20 -scale-y-100 text-cream/25 lg:w-28" />
          <KolamCorner className="pointer-events-none absolute bottom-2 right-2 w-20 -scale-x-100 -scale-y-100 text-cream/25 lg:w-28" />
          <div className="reveal relative mx-auto max-w-xl px-4 py-14 text-center sm:px-6 sm:py-16">
            <Eyebrow className="justify-center text-brass">The newsletter</Eyebrow>
            <h2 className={`${H2} mt-3`}>Straight to your inbox.</h2>
            <p className="mt-3 font-serif text-xl font-medium italic text-cream/90 sm:text-2xl">Stories, ingredients and the science behind South Indian flavour.</p>
            <p className="mx-auto mt-4 max-w-md text-[0.95rem] leading-relaxed text-cream/75">
              One letter at a time: a recipe, the science that makes it work, and the story of the kitchen it came from. No spam,
              and a reply to any issue is enough to be taken off the list.
            </p>
            <div className="mt-7">
              <SignupForm list="newsletter" tone="dark" center />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
