import Link from "next/link";
import { Artwork } from "@/components/Artwork";
import { KolamDivider } from "@/components/Kolam";
import { Eyebrow, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { site } from "@/lib/site";

// Long-form page layout shared by newsletter issues and flavour science articles:
// title block and body on the left, a sticky cover on the right.

// Body copy comes as plain elements and is styled here, so the content files stay unstyled.
const BODY =
  "mt-10 text-lg leading-relaxed text-ink/85 [&>p]:mt-6 [&>p:first-child]:mt-0 [&>h2]:mt-14 [&>h2]:font-serif [&>h2]:text-4xl [&>h2]:font-semibold [&>h2]:leading-tight [&>h2]:text-ink sm:[&>h2]:text-[2.75rem] [&>h3]:mt-10 [&>h3]:font-serif [&>h3]:text-2xl [&>h3]:font-semibold [&>h3]:text-ink [&>figure]:my-10";

export function ArticlePage({
  current,
  back,
  eyebrow,
  title,
  readingTime,
  cover,
  coverAlt,
  coverAspect = "aspect-[4/5]",
  fallback,
  children,
  footer,
}: {
  current: string;
  back: { href: string; label: string };
  eyebrow: string;
  title: string;
  readingTime: string;
  cover?: string;
  coverAlt: string;
  coverAspect?: string;
  fallback: React.ReactNode;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  const picture = (
    <Artwork src={cover} alt={coverAlt} sizes="(min-width: 1024px) 34vw, (min-width: 640px) 28rem, 90vw" priority className={`relative mx-auto w-full max-w-md rounded-sm shadow-xl shadow-ink/15 lg:max-w-none ${coverAspect}`}>
      {fallback}
    </Artwork>
  );
  return (
    <>
      <SiteHeader current={current} />
      <main id="main" className="overflow-x-clip">
        <article className="mx-auto max-w-7xl px-5 pb-20 pt-12 sm:px-8 lg:pb-28 lg:pt-20">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-20">
            <div className="max-w-3xl">
              <p className="text-sm">
                <Link href={back.href} className="text-ink/60 hover:text-ink hover:underline hover:underline-offset-4">
                  ← {back.label}
                </Link>
              </p>
              <Eyebrow className="mt-8 text-maroon">{eyebrow}</Eyebrow>
              <h1 className="mt-4 font-serif text-[clamp(2.5rem,4.6vw,4.2rem)] font-medium leading-[1.04]">{title}</h1>
              <p className="mt-5 text-sm text-ink/60">
                By {site.author} · {readingTime}
              </p>

              <div className="mt-10 lg:hidden">{picture}</div>

              <div className={BODY}>{children}</div>

              <KolamDivider className="mt-14 text-brass" />
              <div className="reveal mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">{footer}</div>
            </div>

            <div className="hidden lg:block">
              <div className="sticky top-28">{picture}</div>
            </div>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
