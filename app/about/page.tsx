import type { Metadata } from "next";
import Link from "next/link";
import { Artwork, SprigOutline } from "@/components/Artwork";
import { Arrow } from "@/components/Icons";
import { KolamDivider } from "@/components/Kolam";
import { CONTAINER, Eyebrow, H1, PRIMARY, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { photos } from "@/lib/photos";
import { openGraphShared, site } from "@/lib/site";

const TITLE = "From Passion to Profession — and Back to the Kitchen";

export const metadata: Metadata = {
  title: `About ${site.author} | ${site.name}`,
  description: `${site.author} is a research technologist in the flavour industry and a home cook of South Indian vegetarian food. ${site.name} is where tradition, science, experience and continued learning meet.`,
  alternates: { canonical: "/about" },
  openGraph: {
    ...openGraphShared,
    title: `About ${site.author}`,
    description: TITLE,
    url: "/about",
    type: "profile",
  },
};

const STORY = [
  "My relationship with cooking started quite early. I began helping my mother in the kitchen when I was young, although, interestingly, I wasn’t particularly fond of food at the time.",
  "As the years went by, that slowly changed. I began discovering how much I enjoyed vegetarian cooking — experimenting with ingredients, understanding flavours and recreating the food I had grown up with. What started as something I simply did at home gradually became a genuine passion.",
  "That interest in food and flavour eventually found its way into my professional life as well. Today, I work in research and technology within the flavour industry, where I get to look at flavour from a scientific perspective.",
  "Cooking, however, remains personal to me. It is something I find creative and therapeutic, and it keeps me connected to the food and traditions I grew up with.",
];

const LEARNING = [
  "I also see this platform as part of my own learning journey. While writing these articles, I often find myself going back to scientific literature, reading more deeply about ingredients, and questioning techniques I may have used intuitively for years. I also continue to attend classes in several other countries while on vacation and learn from other cooks and food professionals.",
  "I want this space to reflect that curiosity — not as a place where every answer is already known, but as a place where tradition, science, experience and continued learning can meet.",
];

// Stands in for the portrait until there is a photo in photos.portrait.
function PortraitPlaceholder() {
  return (
    <div aria-hidden="true" className="absolute inset-0 flex items-end justify-center">
      <SprigOutline className="absolute -right-6 top-6 w-[70%] text-cream/25" />
      <p className="relative mb-7 -rotate-3 font-script text-3xl text-cream/85">Photo to come</p>
    </div>
  );
}

export default function About() {
  return (
    <>
      <SiteHeader current="/about" />

      <main id="main" className="overflow-x-clip">
        <section className={`${CONTAINER} pb-14 pt-8 sm:pb-20 lg:pt-12`}>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14">
            {/* Story */}
            <div>
              <div className="reveal">
                <Eyebrow className="text-maroon">About me</Eyebrow>
                <h1 className={`mt-3 ${H1}`}>{TITLE}</h1>
                <p className="mt-5 max-w-2xl font-serif text-xl font-medium leading-snug text-ink/90 sm:text-2xl">
                  Hi, I’m {site.author}. I’m a full-time Research Technologist and have been living in Germany for the past eight
                  years.
                </p>
              </div>

              {/* The photo sits here on small screens, between the greeting and the story. */}
              <div className="mt-8 lg:hidden">
                <Portrait />
              </div>

              <div className="mt-6 max-w-2xl space-y-4 text-[1.0625rem] leading-relaxed text-ink/80">
                {STORY.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)} className="reveal">
                    {paragraph}
                  </p>
                ))}
              </div>

              <blockquote className="reveal my-8 max-w-2xl rounded-r-xl border-l-4 border-maroon bg-parchment py-4 pl-5 pr-5 sm:pl-7">
                <p className="font-serif text-2xl font-semibold italic leading-tight text-maroon sm:text-3xl">“A Curious Cook, Always Learning.”</p>
              </blockquote>

              {photos.grinding && (
                <figure className="reveal mb-8 max-w-sm">
                  <Artwork
                    src={photos.grinding}
                    alt={`${site.author} grinding with a stone mortar and pestle at the kitchen table`}
                    sizes="(min-width: 640px) 24rem, 90vw"
                    zoom={false}
                    className="relative aspect-[4/5] rounded-xl shadow-xl shadow-ink/15"
                  >
                    {null}
                  </Artwork>
                </figure>
              )}

              <div className="max-w-2xl space-y-4 text-[1.0625rem] leading-relaxed text-ink/80">
                {LEARNING.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)} className="reveal">
                    {paragraph}
                  </p>
                ))}
              </div>

              <KolamDivider className="mt-8 text-brass" />
              <div className="reveal mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                <Link href="/#subscribe" className={`${PRIMARY} bg-maroon text-cream hover:bg-[#62231d]`}>
                  Subscribe to the newsletter <Arrow />
                </Link>
                <Link href="/recipes" className="link-grow font-medium text-ink/85 hover:text-ink">
                  Browse the recipes
                </Link>
              </div>
            </div>

            {/* Photo, on the right on large screens */}
            <div className="hidden lg:block">
              <div className="sticky top-24">
                <Portrait />
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}

function Portrait() {
  return (
    <figure className="reveal mx-auto max-w-sm lg:max-w-none">
      <Artwork
        src={photos.portrait}
        alt={`${site.author} at a kitchen table, beside a blue and white tea set`}
        sizes="(min-width: 1024px) 34vw, (min-width: 640px) 24rem, 90vw"
        priority
        zoom={false}
        className="relative aspect-square rounded-xl shadow-xl shadow-ink/15"
      >
        <PortraitPlaceholder />
      </Artwork>
      <figcaption className="mt-3 text-sm leading-relaxed text-ink/70">
        <span className="font-medium text-ink">{site.author}</span>
        <br />
        Research Technologist in the flavour industry. Home cook of South Indian vegetarian food. Living in Germany.
      </figcaption>
    </figure>
  );
}
