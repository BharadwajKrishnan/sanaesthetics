import type { Metadata } from "next";
import { Artwork, TemperingPan } from "@/components/Artwork";
import { KolamDivider } from "@/components/Kolam";
import { Eyebrow, SiteFooter, SiteHeader, TextLink } from "@/components/SiteChrome";
import { TadkaPan } from "@/components/TadkaPan";
import { articleLink, articles } from "@/lib/articles";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Flavour science | ${site.name}`,
  description: "Articles on what happens in the pan, the filter and the mouth when South Indian ingredients meet heat, water and time.",
  alternates: { canonical: "/flavour-science" },
  openGraph: { title: "Flavour science", description: "The chemistry behind South Indian flavour.", url: "/flavour-science", type: "website" },
};

export default function FlavourScience() {
  return (
    <>
      <SiteHeader current="/flavour-science" />
      <main id="main" className="overflow-x-clip">
        <section className="mx-auto max-w-7xl px-5 pb-20 pt-12 sm:px-8 lg:pb-28 lg:pt-20">
          <div className="max-w-3xl">
            <Eyebrow className="text-maroon">Flavour science</Eyebrow>
            <h1 className="mt-4 font-serif text-[clamp(2.5rem,4.6vw,4.2rem)] font-medium leading-[1.04]">The chemistry behind the flavour.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/80">
              Articles on what happens in the pan, the filter and the mouth when South Indian ingredients meet heat, water and time. Written
              from a home kitchen, checked against the literature.
            </p>
          </div>

          <KolamDivider className="mt-14 text-brass" />
          <ul className="mt-12 grid gap-12">
            {articles.map((article) => (
              <li key={article.slug} className="reveal grid items-center gap-8 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)]">
                <a {...articleLink(article.slug)} aria-label={article.title} className="block">
                  <Artwork src={article.cover} alt={article.coverAlt} sizes="(min-width: 1024px) 24vw, (min-width: 640px) 33vw, 90vw" className="relative aspect-[4/3] max-w-sm rounded-sm shadow-xl shadow-ink/15">
                    <TemperingPan />
                  </Artwork>
                </a>
                <div>
                  <Eyebrow>{article.eyebrow}</Eyebrow>
                  <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight sm:text-4xl">
                    <a {...articleLink(article.slug)} className="hover:text-maroon">
                      {article.title}
                    </a>
                  </h2>
                  <p className="mt-4 max-w-2xl leading-relaxed text-ink/80">{article.excerpt}</p>
                  <p className="mt-3 text-sm text-ink/60">
                    {site.author} · {article.readingTime}
                  </p>
                  <p className="mt-5">
                    <TextLink {...articleLink(article.slug)}>Read the article</TextLink>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Interactive: tempering, step by step */}
        <section className="bg-parchment">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
            <div className="reveal max-w-3xl">
              <Eyebrow className="text-maroon">Try it</Eyebrow>
              <h2 className="mt-4 font-serif text-4xl font-semibold leading-[1.05] sm:text-5xl">When ingredients meet heat.</h2>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/80">
                Your grandmother&apos;s tempering was chemistry. She just never called it that. Scroll through one and watch the pan fill:
                the way it was taught, and the way it works.
              </p>
            </div>
            <TadkaPan />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
