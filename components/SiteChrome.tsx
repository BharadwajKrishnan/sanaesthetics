import Link from "next/link";
import { Arrow } from "@/components/Icons";
import { MobileMenu } from "@/components/MobileMenu";
import { site } from "@/lib/site";

export function Eyebrow({ children, className = "text-ink/70" }: { children: React.ReactNode; className?: string }) {
  return <p className={`text-xs font-medium uppercase tracking-[0.2em] ${className}`}>{children}</p>;
}

// An underlined link with an arrow that stays on the same line as the last word.
export function TextLink({ href, children, className = "text-ink decoration-ink/30 hover:decoration-ink" }: { href: string; children: string; className?: string }) {
  const words = children.split(" ");
  const last = words.pop();
  return (
    <Link href={href} className={`group font-medium underline underline-offset-[6px] ${className}`}>
      {words.length > 0 && `${words.join(" ")} `}
      <span className="whitespace-nowrap">
        {last}
        <span className="ml-2 inline-block align-[-2px]">
          <Arrow />
        </span>
      </span>
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
      <header className="sticky top-0 z-40 border-b border-line/70 bg-cream/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-3 sm:px-8">
          <Link href="/" className="font-serif text-[1.6rem] font-semibold leading-[0.92] text-forest-deep sm:text-[1.8rem]">
            {site.wordmark[0]}
            <br />
            {site.wordmark[1]}
          </Link>
          <nav aria-label="Sections" className="hidden items-center gap-7 text-[0.95rem] lg:flex">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={item.href === current ? "page" : undefined}
                className={item.href === current ? "border-b-2 border-maroon pb-1 text-maroon" : "border-b-2 border-transparent pb-1 hover:border-line"}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/#subscribe" className="rounded-md bg-forest px-5 py-2.5 font-medium text-cream transition-colors hover:bg-forest-deep">
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
    <footer className="on-dark bg-umber text-cream">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <p className="font-serif text-3xl font-semibold leading-[0.95]">
            {site.wordmark[0]}
            <br />
            {site.wordmark[1]}
          </p>
          <p className="mt-4 max-w-sm leading-relaxed text-cream/70">{site.description}</p>
        </div>
        <nav aria-label="Footer">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-cream/50">Explore</p>
          <ul className="mt-4 space-y-2 text-sm">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:underline hover:underline-offset-4">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-cream/50">Follow</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:underline hover:underline-offset-4">
                Instagram
              </a>
            </li>
            <li>
              <Link href="/#subscribe" className="hover:underline hover:underline-offset-4">
                Newsletter
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/15">
        <p className="mx-auto flex max-w-7xl flex-wrap justify-between gap-2 px-5 py-6 text-xs text-cream/60 sm:px-8">
          <span>
            © {new Date().getFullYear()} {site.name}
          </span>
          <span>{site.domain}</span>
        </p>
      </div>
    </footer>
  );
}
