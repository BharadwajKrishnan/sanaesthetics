import type { Metadata } from "next";
import Link from "next/link";
import { Arrow } from "@/components/Icons";
import { SignupForm } from "@/components/SignupForm";
import { Eyebrow, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { issueLink, posts } from "@/lib/posts";
import { LISTS, type List } from "@/lib/signups";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Subscribe | ${site.name}`,
  description: `Subscribe to the ${site.name} newsletter: South Indian vegetarian recipes, stories and flavour science by email.`,
  alternates: { canonical: "/subscribe" },
  robots: { index: false },
};

const RESULT = {
  confirmed: {
    waitlist: { title: "You're on the waitlist.", body: "Thank you for confirming. Dates and prices for the first classes will reach you first, along with the first recipe write-ups." },
    newsletter: { title: "You're subscribed.", body: "Thank you for confirming. The next issue will arrive by email. In the meantime, the first issue is ready to read." },
  },
  exists: {
    waitlist: { title: "You're already on the waitlist.", body: "This address was already there, so nothing has changed. We'll write when the first classes open." },
    newsletter: { title: "You're already subscribed.", body: "This address was already on the list, so nothing has changed. The next issue will arrive by email." },
  },
};

export default async function Subscribe({ searchParams }: PageProps<"/subscribe">) {
  const params = await searchParams;
  const status = typeof params.status === "string" ? params.status : "";
  const list: List = LISTS.includes(params.list as List) ? (params.list as List) : "newsletter";
  const result = status === "confirmed" || status === "exists" ? RESULT[status][list] : null;

  return (
    <>
      <SiteHeader current="/subscribe" />
      <main id="main" className="overflow-x-clip">
        <section className="mx-auto max-w-2xl px-5 pb-24 pt-16 sm:px-8 lg:pt-24">
          {result ? (
            <>
              <Eyebrow className="text-maroon">{list === "waitlist" ? "Classes waitlist" : "The newsletter"}</Eyebrow>
              <h1 className="mt-4 font-serif text-[clamp(2.5rem,4.6vw,4.2rem)] font-medium leading-[1.04]">{result.title}</h1>
              <p className="mt-6 text-lg leading-relaxed text-ink/85">{result.body}</p>
              <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
                {list === "newsletter" ? (
                  <a {...issueLink(posts[0].slug)} className="group inline-flex items-center gap-2.5 rounded-md bg-maroon px-6 py-3 font-medium text-cream transition-colors hover:bg-[#62231d]">
                    Read issue 1 <Arrow />
                  </a>
                ) : (
                  <Link href="/#classes" className="group inline-flex items-center gap-2.5 rounded-md bg-forest px-6 py-3 font-medium text-cream transition-colors hover:bg-forest-deep">
                    See the classes <Arrow />
                  </Link>
                )}
                <Link href="/" className="font-medium underline decoration-ink/40 underline-offset-[6px] hover:decoration-ink">
                  Back to the kitchen
                </Link>
              </div>
            </>
          ) : status === "failed" ? (
            <>
              <Eyebrow className="text-maroon">Something went wrong</Eyebrow>
              <h1 className="mt-4 font-serif text-[clamp(2.5rem,4.6vw,4.2rem)] font-medium leading-[1.04]">We couldn&apos;t save your confirmation.</h1>
              <p className="mt-6 text-lg leading-relaxed text-ink/85">
                The list couldn&apos;t be reached just now. Your link still works, so please try it again in a few minutes.
              </p>
            </>
          ) : (
            <>
              <Eyebrow className="text-maroon">{status === "invalid" ? "Link expired" : "The newsletter"}</Eyebrow>
              <h1 className="mt-4 font-serif text-[clamp(2.5rem,4.6vw,4.2rem)] font-medium leading-[1.04]">
                {status === "invalid" ? "That confirmation link isn't valid any more." : "Stories, ingredients and the science behind South Indian flavour."}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-ink/85">
                {status === "invalid"
                  ? "Confirmation links work for 48 hours. Enter your address again and we'll send a fresh one."
                  : "One letter at a time: a recipe, the science that makes it work, and the story of the kitchen it came from. No spam, and you can unsubscribe at any time."}
              </p>
              <div className="mt-10">
                <SignupForm list="newsletter" />
              </div>
            </>
          )}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
