import type { Metadata } from "next";
import { Artwork, TemperingPan } from "@/components/Artwork";
import { KolamDivider } from "@/components/Kolam";
import { CONTAINER, Eyebrow, H1, SiteFooter, SiteHeader, TextLink } from "@/components/SiteChrome";
import { articleLink, articles } from "@/lib/articles";
import { openGraphShared, site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Flavour science | ${site.name}`,
  description: "Articles on what happens in the pan, the filter and the mouth when South Indian ingredients meet heat, water and time.",
  alternates: { canonical: "/flavour-science" },
  openGraph: { ...openGraphShared, title: "Flavour science", description: "The chemistry behind South Indian flavour.", url: "/flavour-science", type: "website" },
};

export default function FlavourScience() {
  return (
    <>
      <SiteHeader current="/flavour-science" />
      <main id="main" className="overflow-x-clip">
        <section className={`${CONTAINER} pb-14 pt-8 sm:pb-20 lg:pt-12`}>
          <div className="reveal max-w-3xl">
            <Eyebrow className="text-maroon">Flavour science</Eyebrow>
            <h1 className={`mt-3 ${H1}`}>The chemistry behind the flavour.</h1>
            <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-ink/75">
              Articles on what happens in the pan, the filter and the mouth when South Indian ingredients meet heat, water and time. Written
              from a home kitchen, checked against the literature.
            </p>
          </div>

          <KolamDivider className="mt-8 text-brass" />
          <ul className="mt-8 grid gap-5">
            {articles.map((article, i) => (
              <li key={article.slug} className="reveal" style={{ ["--d" as string]: `${i * 80}ms` }}>
                <article className="card-lift grid items-center gap-5 rounded-2xl border border-line/80 bg-white/60 p-4 sm:grid-cols-[12rem_minmax(0,1fr)] sm:p-5 lg:grid-cols-[15rem_minmax(0,1fr)]">
                  <Artwork
                    src={article.cover}
                    alt={article.coverAlt}
                    link={{ ...articleLink(article.slug), "aria-label": article.title }}
                    sizes="(min-width: 1024px) 15rem, (min-width: 640px) 12rem, 90vw"
                    className={`relative w-full max-w-[15rem] rounded-xl shadow-lg shadow-ink/15 ${article.coverAspect ?? "aspect-[4/3]"}`}
                  >
                    <TemperingPan />
                  </Artwork>
                  <div>
                    <Eyebrow>{article.eyebrow}</Eyebrow>
                    <h2 className="mt-2 font-serif text-[1.75rem] font-semibold leading-tight sm:text-3xl">
                      <a {...articleLink(article.slug)} className="transition-colors hover:text-maroon">
                        {article.title}
                      </a>
                    </h2>
                    <p className="mt-2.5 max-w-2xl text-[0.95rem] leading-relaxed text-ink/75">{article.excerpt}</p>
                    <p className="mt-2 text-sm text-ink/60">
                      {site.author} · {article.readingTime}
                    </p>
                    <p className="mt-3 text-[0.95rem]">
                      <TextLink {...articleLink(article.slug)}>Read the article</TextLink>
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
