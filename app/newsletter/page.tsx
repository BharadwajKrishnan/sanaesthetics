import type { Metadata } from "next";
import Link from "next/link";
import { Artwork, Thali } from "@/components/Artwork";
import { KolamDivider } from "@/components/Kolam";
import { CONTAINER, Eyebrow, H1, SiteFooter, SiteHeader, TextLink } from "@/components/SiteChrome";
import { issueLink, posts } from "@/lib/posts";
import { openGraphShared, site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Newsletter | ${site.name}`,
  description: `Every issue of the ${site.name} newsletter: South Indian vegetarian cooking, its traditions and the flavour science behind them.`,
  alternates: { canonical: "/newsletter" },
  openGraph: { ...openGraphShared, title: `${site.name} newsletter`, description: "Stories, ingredients and the science behind South Indian flavour.", url: "/newsletter", type: "website" },
};

export default function Newsletter() {
  return (
    <>
      <SiteHeader current="/newsletter" />
      <main id="main" className="overflow-x-clip">
        <section className={`${CONTAINER} pb-14 pt-8 sm:pb-20 lg:pt-12`}>
          <div className="reveal max-w-3xl">
            <Eyebrow className="text-maroon">The newsletter</Eyebrow>
            <h1 className={`mt-3 ${H1}`}>Stories, ingredients and the science behind South Indian flavour.</h1>
            <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-ink/75">
              Every issue is here to read in full, from the first. To get the next one by email,{" "}
              <Link href="/#subscribe" className="font-medium underline decoration-ink/40 underline-offset-[6px] hover:decoration-ink">
                subscribe
              </Link>
              .
            </p>
          </div>

          <KolamDivider className="mt-8 text-brass" />
          <ul className="mt-8 grid gap-5">
            {posts.map((post, i) => (
              <li key={post.slug} className="reveal" style={{ ["--d" as string]: `${i * 80}ms` }}>
                <article className="card-lift grid items-center gap-5 rounded-2xl border border-line/80 bg-white/60 p-4 sm:grid-cols-[11rem_minmax(0,1fr)] sm:p-5 lg:grid-cols-[13rem_minmax(0,1fr)]">
                  <Artwork
                    src={post.cover}
                    alt={post.coverAlt}
                    link={{ ...issueLink(post.slug), "aria-label": post.title }}
                    sizes="(min-width: 1024px) 13rem, (min-width: 640px) 11rem, 90vw"
                    className={`relative w-full max-w-[13rem] rounded-xl shadow-lg shadow-ink/15 ${post.coverAspect ?? "aspect-[4/5]"}`}
                  >
                    {post.Cover ? <post.Cover /> : <Thali />}
                  </Artwork>
                  <div>
                    <Eyebrow>{post.eyebrow}</Eyebrow>
                    <h2 className="mt-2 font-serif text-[1.75rem] font-semibold leading-tight sm:text-3xl">
                      <a {...issueLink(post.slug)} className="transition-colors hover:text-maroon">
                        {post.title}
                      </a>
                    </h2>
                    <p className="mt-2.5 max-w-2xl text-[0.95rem] leading-relaxed text-ink/75">{post.excerpt}</p>
                    <p className="mt-2 text-sm text-ink/60">
                      {site.author} · {post.readingTime}
                    </p>
                    <p className="mt-3 text-[0.95rem]">
                      <TextLink {...issueLink(post.slug)}>Read the issue</TextLink>
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
