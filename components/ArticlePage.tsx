import Link from "next/link";
import { Artwork, PhotoTags, type PhotoTag } from "@/components/Artwork";
import { KolamDivider } from "@/components/Kolam";
import { CONTAINER, Eyebrow, H1, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { site } from "@/lib/site";

// Long-form page layout shared by newsletter issues and flavour science articles:
// title block and body on the left, a sticky cover on the right.

// Body copy comes as plain elements and is styled here, so the content files stay unstyled.
const BODY =
  "mt-8 text-[1.0625rem] leading-relaxed text-ink/85 [&>p]:mt-5 [&>p:first-child]:mt-0 [&>h2]:mt-11 [&>h2]:font-serif [&>h2]:text-3xl [&>h2]:font-semibold [&>h2]:leading-tight [&>h2]:text-ink sm:[&>h2]:text-[2.25rem] [&>h3]:mt-8 [&>h3]:font-serif [&>h3]:text-2xl [&>h3]:font-semibold [&>h3]:text-ink [&>figure]:my-8";

export function ArticlePage({
  current,
  back,
  eyebrow,
  title,
  readingTime,
  cover,
  coverAlt,
  coverAspect = "aspect-[4/5]",
  coverTags,
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
  // Labels pinned onto the cover photo. Ignored while the illustration is drawn instead.
  coverTags?: PhotoTag[];
  fallback: React.ReactNode;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  const tags = cover && coverTags?.length ? coverTags : undefined;
  const picture = (
    <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
      <Artwork src={cover} alt={coverAlt} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 24rem, 90vw" priority className={`relative w-full rounded-xl shadow-xl shadow-ink/15 ${coverAspect}`}>
        {fallback}
      </Artwork>
      {tags && <PhotoTags tags={tags} />}
    </div>
  );
  return (
    <>
      <SiteHeader current={current} />
      <main id="main" className="overflow-x-clip">
        <article className={`${CONTAINER} pb-14 pt-8 sm:pb-20 lg:pt-12`}>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:gap-14">
            <div className="max-w-3xl">
              <p className="text-sm">
                <Link href={back.href} className="link-grow text-ink/60 hover:text-ink">
                  ← {back.label}
                </Link>
              </p>
              <Eyebrow className="mt-6 text-maroon">{eyebrow}</Eyebrow>
              <h1 className={`mt-3 ${H1}`}>{title}</h1>
              <p className="mt-3 text-sm text-ink/60">
                By {site.author} · {readingTime}
              </p>

              <div className="mt-8 lg:hidden">{picture}</div>

              <div className={BODY}>{children}</div>

              <KolamDivider className="mt-10 text-brass" />
              <div className="reveal mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">{footer}</div>
            </div>

            <div className="hidden lg:block">
              <div className="sticky top-24">{picture}</div>
            </div>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
