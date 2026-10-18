import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticlePage } from "@/components/ArticlePage";
import { Thali } from "@/components/Artwork";
import { Arrow } from "@/components/Icons";
import { PRIMARY, TextLink } from "@/components/SiteChrome";
import { getPost, posts } from "@/lib/posts";
import { openGraphShared, site } from "@/lib/site";

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
    openGraph: { ...openGraphShared, title: post.title, description: post.excerpt, url: `/newsletter/${post.slug}`, type: "article", authors: [site.author] },
  };
}

export default async function Issue({ params }: PageProps<"/newsletter/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <ArticlePage
      current="/newsletter"
      back={{ href: "/newsletter", label: "All issues" }}
      eyebrow={post.eyebrow}
      title={post.title}
      readingTime={post.readingTime}
      cover={post.cover}
      coverAlt={post.coverAlt}
      coverAspect={post.coverAspect}
      coverTags={post.coverTags}
      fallback={post.Cover ? <post.Cover /> : <Thali />}
      footer={
        <>
          <Link href="/#subscribe" className={`${PRIMARY} bg-maroon text-cream hover:bg-[#62231d]`}>
            Subscribe to the newsletter <Arrow />
          </Link>
          <TextLink href="/newsletter">All issues</TextLink>
        </>
      }
    >
      <post.Body />
    </ArticlePage>
  );
}
