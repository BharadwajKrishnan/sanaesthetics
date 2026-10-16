import type { Metadata } from "next";
import { SignupForm } from "@/components/SignupForm";
import { Eyebrow, SiteFooter, SiteHeader } from "@/components/SiteChrome";
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
        <section className="mx-auto max-w-2xl px-5 pb-24 pt-16 sm:px-8 lg:pt-24">
          <Eyebrow className="text-maroon">The newsletter</Eyebrow>
          <h1 className="mt-4 font-serif text-[clamp(2.5rem,4.6vw,4.2rem)] font-medium leading-[1.04]">
            Stories, ingredients and the science behind South Indian flavour.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ink/85">
            One letter at a time: a recipe, the science that makes it work, and the story of the kitchen it came from. No spam, and a reply to any issue is enough to be taken off the list.
          </p>
          <div className="mt-10">
            <SignupForm list="newsletter" />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
