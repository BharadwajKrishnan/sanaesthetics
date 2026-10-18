import Link from "next/link";
import { Arrow } from "@/components/Icons";
import { KolamBorder, KolamKnot } from "@/components/Kolam";
import { MobileMenu } from "@/components/MobileMenu";
import { site } from "@/lib/site";

// Shared widths and spacing, so every page lines up and no section runs long.
export const CONTAINER = "mx-auto w-full max-w-6xl px-4 sm:px-6";
export const SECTION = "py-12 sm:py-16";
export const H1 = "font-serif text-[clamp(2.2rem,4.4vw,3.6rem)] font-medium leading-[1.04] text-balance";
export const H2 = "font-serif text-[clamp(1.9rem,3.2vw,2.75rem)] font-semibold leading-[1.06] text-balance";
export const PRIMARY = "btn-sheen group inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 text-[0.95rem] font-medium transition-colors";

// A short brass rule, then small capitals: the label above every heading.
export function Eyebrow({ children, className = "text-ink/70", rule = true }: { children: React.ReactNode; className?: string; rule?: boolean }) {
  return (
    <p className={`flex items-center gap-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] ${className}`}>
      {rule && <span aria-hidden="true" className="h-px w-6 shrink-0 bg-brass" />}
      <span>{children}</span>
    </p>
  );
}

// Eyebrow, heading and an optional lede, in the measure every section shares.
export function SectionHead({
  eyebrow,
  title,
  lede,
  eyebrowClass = "text-maroon",
  ledeClass = "text-ink/75",
  className = "",
  as: Tag = "h2",
}: {
  eyebrow: React.ReactNode;
  title: React.ReactNode;
  lede?: React.ReactNode;
  eyebrowClass?: string;
  ledeClass?: string;
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className={`reveal max-w-2xl ${className}`}>
      <Eyebrow className={eyebrowClass}>{eyebrow}</Eyebrow>
      <Tag className={`mt-3 ${Tag === "h1" ? H1 : H2}`}>{title}</Tag>
      {lede && <p className={`mt-4 max-w-xl text-[1.0625rem] leading-relaxed ${ledeClass}`}>{lede}</p>}
    </div>
  );
}

// An underlined link with an arrow that stays on the same line as the last word.
// With a target (e.g. a newsletter issue, which opens in a new tab) it is a plain anchor.
export function TextLink({
  href,
  target,
  rel,
  children,
  className = "text-ink decoration-ink/30 hover:decoration-ink",
}: {
  href: string;
  target?: string;
  rel?: string;
  children: string;
  className?: string;
}) {
  const words = children.split(" ");
  const last = words.pop();
  const classes = `group font-medium underline underline-offset-[6px] transition-colors ${className}`;
  const inner = (
    <>
      {words.length > 0 && `${words.join(" ")} `}
      <span className="whitespace-nowrap">
        {last}
        <span className="ml-2 inline-block align-[-2px]">
          <Arrow />
        </span>
      </span>
    </>
  );
  if (target) {
    return (
      <a href={href} target={target} rel={rel} className={classes}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  );
}

// Header and footer shared by every page. `current` is the nav href of the page being shown.
export function SiteHeader({ current }: { current: string }) {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-forest focus:px-4 focus:py-2 focus:text-cream">
        Skip to content
      </a>
      <header className="site-header sticky top-0 z-40 border-b border-line/60 bg-cream/80 backdrop-blur-md">
        <div className={`${CONTAINER} flex h-14 items-center justify-between gap-4 sm:h-16`}>
          <Link href="/" className="group flex items-center gap-2.5 font-serif font-semibold text-forest-deep">
            <KolamKnot className="h-9 w-9 shrink-0 text-brass transition-transform duration-700 group-hover:rotate-90 sm:h-10 sm:w-10" />
            <span className="text-[1.05rem] leading-[0.95] sm:text-[1.35rem]">
              {site.wordmark[0]}
              <br className="md:hidden" />
              <span className="hidden md:inline"> </span>
              {site.wordmark[1]}
            </span>
          </Link>
          <nav aria-label="Sections" className="hidden items-center gap-5 whitespace-nowrap text-[0.9rem] lg:flex xl:gap-6">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={item.href === current ? "page" : undefined}
                className={`nav-link ${item.href === current ? "text-maroon" : "text-ink/85 hover:text-ink"}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/#subscribe" className={`${PRIMARY} hidden bg-forest px-4 py-2 text-sm text-cream hover:bg-forest-deep sm:inline-flex`}>
              Subscribe
            </Link>
            <MobileMenu />
          </div>
        </div>
      </header>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="on-dark relative bg-umber text-cream">
      <KolamBorder className="text-brass/50" />
      <div className={`${CONTAINER} grid gap-8 py-10 sm:grid-cols-[1.4fr_1fr_1fr] sm:gap-10`}>
        <div>
          <p className="flex items-center gap-2.5 font-serif text-xl font-semibold leading-[0.95]">
            <KolamKnot className="h-9 w-9 shrink-0 text-brass" />
            <span>
              {site.wordmark[0]}
              <br />
              {site.wordmark[1]}
            </span>
          </p>
          <p className="mt-4 max-w-sm text-[0.95rem] leading-relaxed text-cream/65">{site.description}</p>
        </div>
        <nav aria-label="Footer">
          <Eyebrow className="text-brass" rule={false}>
            Explore
          </Eyebrow>
          <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm sm:grid-cols-1">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-grow text-cream/85 hover:text-cream">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <Eyebrow className="text-brass" rule={false}>
            Follow
          </Eyebrow>
          <ul className="mt-3 space-y-1.5 text-sm">
            <li>
              <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer" className="link-grow text-cream/85 hover:text-cream">
                Instagram
              </a>
            </li>
            <li>
              <Link href="/#subscribe" className="link-grow text-cream/85 hover:text-cream">
                Newsletter
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/10">
        <p className={`${CONTAINER} flex flex-wrap justify-between gap-2 py-4 text-xs text-cream/55`}>
          <span>
            © {new Date().getFullYear()} {site.name}
            <span aria-hidden="true"> · </span>
            <Link href="/privacy" className="link-grow hover:text-cream">
              Privacy
            </Link>
          </span>
          <span>{site.domain}</span>
        </p>
      </div>
    </footer>
  );
}
