import type { Metadata } from "next";
import Link from "next/link";
import { Artwork, SprigOutline } from "@/components/Artwork";
import { Arrow } from "@/components/Icons";
import { KolamDivider } from "@/components/Kolam";
import { Eyebrow, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { photos } from "@/lib/photos";
import { site } from "@/lib/site";

const TITLE = "From Passion to Profession — and Back to the Kitchen";

export const metadata: Metadata = {
  title: `About ${site.author} | ${site.name}`,
  description: `${site.author} is a research technologist in the flavour industry and a home cook of South Indian vegetarian food. ${site.name} is where tradition, science, experience and continued learning meet.`,
  alternates: { canonical: "/about" },
  openGraph: {
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
        <section className="mx-auto max-w-7xl px-5 pb-20 pt-12 sm:px-8 lg:pb-28 lg:pt-20">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-20">
            {/* Story */}
            <div>
              <Eyebrow className="text-maroon">About me</Eyebrow>
              <h1 className="mt-4 font-serif text-[clamp(2.5rem,4.6vw,4.2rem)] font-medium leading-[1.04]">{TITLE}</h1>
              <p className="mt-8 max-w-2xl text-xl leading-relaxed text-ink/90">
                Hi, I’m {site.author}. I’m a full-time Research Technologist and have been living in Germany for the past eight
                years.
              </p>

              {/* The photo sits here on small screens, between the greeting and the story. */}
              <div className="mt-10 lg:hidden">
                <Portrait />
              </div>

              <div className="mt-8 max-w-2xl space-y-6 text-lg leading-relaxed text-ink/80">
                {STORY.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)} className="reveal">
                    {paragraph}
                  </p>
                ))}
              </div>

              <blockquote className="reveal my-12 max-w-2xl border-l-4 border-maroon pl-6 sm:pl-8">
                <p className="font-serif text-3xl font-semibold leading-tight text-maroon sm:text-4xl">“A Curious Cook, Always Learning.”</p>
              </blockquote>

              <div className="max-w-2xl space-y-6 text-lg leading-relaxed text-ink/80">
                {LEARNING.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)} className="reveal">
                    {paragraph}
                  </p>
                ))}
              </div>

              <KolamDivider className="mt-12 text-brass" />
              <div className="reveal mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
                <Link href="/#subscribe" className="group inline-flex items-center gap-2.5 rounded-md bg-maroon px-6 py-3 font-medium text-cream transition-colors hover:bg-[#62231d]">
                  Subscribe to the newsletter <Arrow />
                </Link>
                <Link href="/#recipes" className="font-medium underline decoration-ink/40 underline-offset-[6px] hover:decoration-ink">
                  Browse the recipes
                </Link>
              </div>
            </div>

            {/* Photo, on the right on large screens */}
            <div className="hidden lg:block">
              <div className="sticky top-28">
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
    <figure className="mx-auto max-w-md lg:max-w-none">
      <Artwork
        src={photos.portrait}
        alt={site.author}
        sizes="(min-width: 1024px) 36vw, (min-width: 640px) 28rem, 90vw"
        priority
        className="relative aspect-[4/5] rounded-sm shadow-xl shadow-ink/15"
      >
        <PortraitPlaceholder />
      </Artwork>
      <figcaption className="mt-4 text-sm leading-relaxed text-ink/70">
        <span className="font-medium text-ink">{site.author}</span>
        <br />
        Research Technologist in the flavour industry. Home cook of South Indian vegetarian food. Living in Germany.
      </figcaption>
    </figure>
  );
}
