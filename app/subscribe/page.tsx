import type { Metadata } from "next";
import { KolamCorner } from "@/components/Kolam";
import { SignupForm } from "@/components/SignupForm";
import { CONTAINER, Eyebrow, H1, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Subscribe | ${site.name}`,
  description: `Subscribe to the ${site.name} newsletter: South Indian vegetarian recipes, stories and flavour science by email.`,
  alternates: { canonical: "/subscribe" },
  robots: { index: false },
};

export default function Subscribe() {
  return (
    <>
      <SiteHeader current="/subscribe" />
      <main id="main" className="overflow-x-clip">
        <section className={`${CONTAINER} pb-14 pt-8 sm:pb-20 lg:pt-12`}>
          <div className="reveal relative mx-auto max-w-2xl overflow-hidden rounded-2xl border border-line/80 bg-parchment px-5 py-8 sm:px-10 sm:py-10">
            <KolamCorner className="pointer-events-none absolute right-1 top-1 w-16 -scale-x-100 text-brass/40 sm:w-20" />
            <KolamCorner className="pointer-events-none absolute bottom-1 left-1 w-16 -scale-y-100 text-brass/40 sm:w-20" />
            <div className="relative">
              <Eyebrow className="text-maroon">The newsletter</Eyebrow>
              <h1 className={`mt-3 ${H1}`}>Stories, ingredients and the science behind South Indian flavour.</h1>
              <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink/80">
                One letter at a time: a recipe, the science that makes it work, and the story of the kitchen it came from. No spam, and a reply to any issue is enough to be taken off the list.
              </p>
              <div className="mt-7">
                <SignupForm list="newsletter" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
