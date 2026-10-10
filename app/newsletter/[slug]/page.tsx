import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Artwork, Thali } from "@/components/Artwork";
import { Arrow } from "@/components/Icons";
import { Eyebrow, SiteFooter, SiteHeader, TextLink } from "@/components/SiteChrome";
import { getPost, posts } from "@/lib/posts";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/newsletter/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} | ${site.name}`,
    description: post.excerpt,
    alternates: { canonical: `/newsletter/${post.slug}` },
    openGraph: { title: post.title, description: post.excerpt, url: `/newsletter/${post.slug}`, type: "article", authors: [site.author] },
  };
}

// Body copy: plain elements from the post, styled here so the content stays unstyled.
const BODY =
  "mt-10 text-lg leading-relaxed text-ink/85 [&>p]:mt-6 [&>p:first-child]:mt-0 [&>h2]:mt-14 [&>h2]:font-serif [&>h2]:text-4xl [&>h2]:font-semibold [&>h2]:leading-tight [&>h2]:text-ink sm:[&>h2]:text-[2.75rem]";

export default async function Issue({ params }: PageProps<"/newsletter/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <>
      <SiteHeader current="/newsletter" />
      <main id="main" className="overflow-x-clip">
        <article className="mx-auto max-w-7xl px-5 pb-20 pt-12 sm:px-8 lg:pb-28 lg:pt-20">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-20">
            <div className="max-w-3xl">
              <p className="text-sm">
                <Link href="/newsletter" className="text-ink/60 hover:text-ink hover:underline hover:underline-offset-4">
                  ← All issues
                </Link>
              </p>
              <Eyebrow className="mt-8 text-maroon">{post.eyebrow}</Eyebrow>
              <h1 className="mt-4 font-serif text-[clamp(2.5rem,4.6vw,4.2rem)] font-medium leading-[1.04]">{post.title}</h1>
              <p className="mt-5 text-sm text-ink/60">
                By {site.author} · {post.readingTime}
              </p>

              <div className="mt-10 lg:hidden">
                <Cover src={post.cover} alt={post.coverAlt} />
              </div>

              <div className={BODY}>
                <post.Body />
              </div>

              <div className="reveal mt-14 flex flex-wrap items-center gap-x-7 gap-y-4 border-t border-line pt-10">
                <Link href="/#subscribe" className="group inline-flex items-center gap-2.5 rounded-md bg-maroon px-6 py-3 font-medium text-cream transition-colors hover:bg-[#62231d]">
                  Subscribe to the newsletter <Arrow />
                </Link>
                <TextLink href="/newsletter">All issues</TextLink>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="sticky top-28">
                <Cover src={post.cover} alt={post.coverAlt} />
              </div>
            </div>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}

function Cover({ src, alt }: { src?: string; alt: string }) {
  return (
    <Artwork src={src} alt={alt} sizes="(min-width: 1024px) 34vw, (min-width: 640px) 28rem, 90vw" priority className="relative mx-auto aspect-[4/5] w-full max-w-md rounded-sm shadow-xl shadow-ink/15 lg:max-w-none">
      <Thali />
    </Artwork>
  );
}
