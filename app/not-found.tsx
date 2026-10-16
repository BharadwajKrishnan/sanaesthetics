import type { Metadata } from "next";
import Link from "next/link";
import { KolamDivider } from "@/components/Kolam";
import { Eyebrow, SiteFooter, SiteHeader, TextLink } from "@/components/SiteChrome";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Page not found | ${site.name}`,
  robots: { index: false },
};

const PLACES = [
  { href: "/recipes", label: "The recipes" },
  { href: "/newsletter", label: "The newsletter" },
  { href: "/flavour-science", label: "Flavour science" },
  { href: "/about", label: "About Sandhya" },
];

export default function NotFound() {
  return (
    <>
      <SiteHeader current="" />
      <main id="main" className="overflow-x-clip">
        <section className="mx-auto max-w-7xl px-5 pb-24 pt-16 sm:px-8 lg:pt-24">
          <div className="max-w-2xl">
            <Eyebrow className="text-maroon">404 · Page not found</Eyebrow>
            <h1 className="mt-4 font-serif text-[clamp(2.5rem,4.6vw,4.2rem)] font-medium leading-[1.04]">Nothing is simmering at this address.</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/80">
              The page may have moved, or the link had a typo in it. Everything on the site is one of the four doors below.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {PLACES.map((place) => (
                <li key={place.href} className="border-l-4 border-maroon bg-parchment px-5 py-4">
                  <TextLink href={place.href}>{place.label}</TextLink>
                </li>
              ))}
            </ul>
            <p className="mt-8">
              <Link href="/" className="font-medium underline decoration-ink/30 underline-offset-[6px] hover:decoration-ink">
                Back to the start
              </Link>
            </p>
          </div>
          <KolamDivider className="mt-16 text-brass" />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
