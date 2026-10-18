import type { Metadata } from "next";
import Link from "next/link";
import { KolamDivider } from "@/components/Kolam";
import { CONTAINER, Eyebrow, H1, SiteFooter, SiteHeader, TextLink } from "@/components/SiteChrome";
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
        <section className={`${CONTAINER} pb-14 pt-10 sm:pb-20 lg:pt-14`}>
          <div className="reveal max-w-2xl">
            <Eyebrow className="text-maroon">404 · Page not found</Eyebrow>
            <h1 className={`mt-3 ${H1}`}>Nothing is simmering at this address.</h1>
            <p className="mt-4 max-w-xl text-[1.0625rem] leading-relaxed text-ink/75">
              The page may have moved, or the link had a typo in it. Everything on the site is one of the four doors below.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {PLACES.map((place, i) => (
                <li key={place.href} className="reveal card-lift rounded-xl border border-line/80 border-l-4 border-l-maroon bg-parchment px-4 py-3.5" style={{ ["--d" as string]: `${i * 70}ms` }}>
                  <TextLink href={place.href}>{place.label}</TextLink>
                </li>
              ))}
            </ul>
            <p className="mt-6">
              <Link href="/" className="link-grow font-medium text-ink/80 hover:text-ink">
                Back to the start
              </Link>
            </p>
          </div>
          <KolamDivider className="mt-12 text-brass" />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
