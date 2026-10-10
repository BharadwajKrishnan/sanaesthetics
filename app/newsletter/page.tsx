import type { Metadata } from "next";
import Link from "next/link";
import { Artwork, Thali } from "@/components/Artwork";
import { KolamDivider } from "@/components/Kolam";
import { Eyebrow, SiteFooter, SiteHeader, TextLink } from "@/components/SiteChrome";
import { issueLink, posts } from "@/lib/posts";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Newsletter | ${site.name}`,
  description: `Every issue of the ${site.name} newsletter: South Indian vegetarian cooking, its traditions and the flavour science behind them.`,
  alternates: { canonical: "/newsletter" },
  openGraph: { title: `${site.name} newsletter`, description: "Stories, ingredients and the science behind South Indian flavour.", url: "/newsletter", type: "website" },
};

export default function Newsletter() {
  return (
    <>
      <SiteHeader current="/newsletter" />
      <main id="main" className="overflow-x-clip">
        <section className="mx-auto max-w-7xl px-5 pb-20 pt-12 sm:px-8 lg:pb-28 lg:pt-20">
          <div className="max-w-3xl">
            <Eyebrow className="text-maroon">The newsletter</Eyebrow>
            <h1 className="mt-4 font-serif text-[clamp(2.5rem,4.6vw,4.2rem)] font-medium leading-[1.04]">Stories, ingredients and the science behind South Indian flavour.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/80">
              Every issue is here to read in full, newest first. To get the next one by email,{" "}
              <Link href="/#subscribe" className="font-medium underline decoration-ink/40 underline-offset-[6px] hover:decoration-ink">
                subscribe
              </Link>
              .
            </p>
          </div>

          <KolamDivider className="mt-14 text-brass" />
          <ul className="mt-12 grid gap-12">
            {posts.map((post) => (
              <li key={post.slug} className="reveal grid items-center gap-8 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)]">
                <a {...issueLink(post.slug)} aria-label={post.title} className="block">
                  <Artwork src={post.cover} alt={post.coverAlt} sizes="(min-width: 1024px) 24vw, (min-width: 640px) 33vw, 90vw" className="relative aspect-[4/5] max-w-sm rounded-sm shadow-xl shadow-ink/15">
                    <Thali />
                  </Artwork>
                </a>
                <div>
                  <Eyebrow>{post.eyebrow}</Eyebrow>
                  <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight sm:text-4xl">
                    <a {...issueLink(post.slug)} className="hover:text-maroon">
                      {post.title}
                    </a>
                  </h2>
                  <p className="mt-4 max-w-2xl leading-relaxed text-ink/80">{post.excerpt}</p>
                  <p className="mt-3 text-sm text-ink/60">
                    {site.author} · {post.readingTime}
                  </p>
                  <p className="mt-5">
                    <TextLink {...issueLink(post.slug)}>Read the issue</TextLink>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
