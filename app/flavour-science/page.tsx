import type { Metadata } from "next";
import Link from "next/link";
import { Arrow } from "@/components/Icons";
import { Eyebrow, SiteFooter, SiteHeader, TextLink } from "@/components/SiteChrome";
import { TadkaPan } from "@/components/TadkaPan";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Flavour science | ${site.name}`,
  description: "What happens in the pan when South Indian ingredients meet heat: tempering explained the way it was taught, and the way it works.",
  alternates: { canonical: "/flavour-science" },
  openGraph: { title: "Flavour science", description: "When ingredients meet heat.", url: "/flavour-science", type: "website" },
};

export default function FlavourScience() {
  return (
    <>
      <SiteHeader current="/flavour-science" />
      <main id="main" className="overflow-x-clip">
        <section className="mx-auto max-w-7xl px-5 pb-20 pt-12 sm:px-8 lg:pb-28 lg:pt-20">
          <div className="max-w-3xl">
            <Eyebrow className="text-maroon">Flavour science</Eyebrow>
            <h1 className="mt-4 font-serif text-[clamp(2.5rem,4.6vw,4.2rem)] font-medium leading-[1.04]">When ingredients meet heat.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/80">
              Your grandmother&apos;s tempering was chemistry. She just never called it that. Scroll through one and watch the pan fill:
              the way it was taught, and the way it works.
            </p>
          </div>
          <TadkaPan />
          <div className="reveal mt-16 flex flex-wrap items-center gap-x-7 gap-y-4 border-t border-line pt-10">
            <Link href="/#subscribe" className="group inline-flex items-center gap-2.5 rounded-md bg-maroon px-6 py-3 font-medium text-cream transition-colors hover:bg-[#62231d]">
              Subscribe to the newsletter <Arrow />
            </Link>
            <TextLink href="/recipes">Cook it: browse the recipes</TextLink>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
