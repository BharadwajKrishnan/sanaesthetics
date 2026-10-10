import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticlePage } from "@/components/ArticlePage";
import { TemperingPan } from "@/components/Artwork";
import { Arrow } from "@/components/Icons";
import { TextLink } from "@/components/SiteChrome";
import { articles, getArticle } from "@/lib/articles";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps<"/flavour-science/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: `${article.title} | ${site.name}`,
    description: article.excerpt,
    alternates: { canonical: `/flavour-science/${article.slug}` },
    openGraph: { title: article.title, description: article.excerpt, url: `/flavour-science/${article.slug}`, type: "article", authors: [site.author] },
  };
}

export default async function FlavourScienceArticle({ params }: PageProps<"/flavour-science/[slug]">) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <ArticlePage
      current="/flavour-science"
      back={{ href: "/flavour-science", label: "All articles" }}
      eyebrow={article.eyebrow}
      title={article.title}
      readingTime={article.readingTime}
      cover={article.cover}
      coverAlt={article.coverAlt}
      coverAspect="aspect-[4/3]"
      fallback={<TemperingPan />}
      footer={
        <>
          <Link href="/#subscribe" className="group inline-flex items-center gap-2.5 rounded-md bg-maroon px-6 py-3 font-medium text-cream transition-colors hover:bg-[#62231d]">
            Subscribe to the newsletter <Arrow />
          </Link>
          <TextLink href="/flavour-science">All articles</TextLink>
        </>
      }
    >
      <article.Body />
    </ArticlePage>
  );
}
