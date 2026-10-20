import type { Metadata } from "next";
import { KolamDivider } from "@/components/Kolam";
import { CONTAINER, Eyebrow, H1, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { openGraphShared, site } from "@/lib/site";

// Plain-language notice: a hobby site that keeps two email lists, and nothing else.

export const metadata: Metadata = {
  title: `Privacy | ${site.name}`,
  description: `What ${site.name} collects when you subscribe, where it is kept, and how to be taken off the list.`,
  alternates: { canonical: "/privacy" },
  openGraph: { ...openGraphShared, title: "Privacy", description: `How ${site.name} handles your details.`, url: "/privacy", type: "website" },
};

const UPDATED = "20 October 2026";

const SECTIONS: { title: string; body: React.ReactNode[] }[] = [
  {
    title: "Who runs this site",
    body: [
      <>
        {site.name} is a personal, non-commercial site run by {site.author}. It is a hobby, not a business: nothing is sold here and no
        advertising is shown.
      </>,
      <>
        Questions about your details go to <Mail />.
      </>,
    ],
  },
  {
    title: "What the two forms collect",
    body: [
      <>
        The site has two sign-up forms: one for the newsletter and one for requesting a session. Each asks for your name and your email
        address; the sessions form also asks which session you are interested in and, if you choose to give it, a phone number. When you
        submit a form the site also records which list you joined and the time.
      </>,
      <>That is everything. There are no accounts, no passwords and no payment details.</>,
    ],
  },
  {
    title: "Where it goes",
    body: [
      <>
        A sign-up is handed to an automation workflow, which adds the row to a private Google Sheet. That sheet is the list. It is not
        shared, sold or used for anything other than sending you the emails you asked for.
      </>,
      <>
        The site itself is hosted on Vercel. Like any web host, it may keep short-lived server logs, which include the IP address of a
        request, for keeping the service running.
      </>,
    ],
  },
  {
    title: "What it is used for",
    body: [
      <>
        The newsletter list receives the newsletter, when there is an issue. The waitlist receives news about the sessions, if and when
        they happen. Neither list is used for anything else.
      </>,
    ],
  },
  {
    title: "How to be taken off a list",
    body: [
      <>
        Reply to any email from the site, or write to <Mail />, and say which address to remove. Your row is deleted from the sheet.
        You can also ask what is stored about you, or have it corrected, the same way.
      </>,
    ],
  },
  {
    title: "Cookies, analytics and fonts",
    body: [
      <>
        The site sets no cookies of its own. The one thing it remembers about you is the answer you give in the cookie notice, which is
        kept in your browser&apos;s local storage, read only by this site and never sent anywhere. Fonts are served from the site itself,
        so reading a page does not call out to a font service.
      </>,
      <>
        Visits are counted with{" "}
        <a href="https://vercel.com/docs/analytics/privacy-policy" target="_blank" rel="noopener noreferrer" className="underline decoration-ink/30 underline-offset-4 hover:decoration-ink">
          Vercel Web Analytics
        </a>
        , which uses no cookies and builds no profile of you. It records the page viewed, the page that linked to it, your country, and
        the kind of browser and device, and it tells one visit from the next with a short-lived hash that is discarded daily. Your IP
        address is not stored.
      </>,
    ],
  },
  {
    title: "Embedded Instagram posts",
    body: [
      <>
        The Recipes section on the home page shows a few Instagram posts in embedded frames. They load from instagram.com only once
        you allow it, either in the cookie notice on your first visit or with the button shown in a post&apos;s place. Until then nothing
        is fetched from Meta. Once a post loads, Meta can see your IP address and may set its own cookies, as described in{" "}
        <a href="https://privacycenter.instagram.com/policy" target="_blank" rel="noopener noreferrer" className="underline decoration-ink/30 underline-offset-4 hover:decoration-ink">
          Instagram&apos;s privacy policy
        </a>
        . You can change your answer at any time with &ldquo;Cookie settings&rdquo; at the foot of every page. Nothing else on the site
        loads from a third party.
      </>,
    ],
  },
];

function Mail() {
  return (
    <a href={`mailto:${site.contactEmail}`} className="underline decoration-ink/30 underline-offset-4 hover:decoration-ink">
      {site.contactEmail}
    </a>
  );
}

export default function Privacy() {
  return (
    <>
      <SiteHeader current="/privacy" />
      <main id="main" className="overflow-x-clip">
        <section className={`${CONTAINER} max-w-3xl pb-14 pt-8 sm:pb-20 lg:pt-12`}>
          <div className="reveal">
          <Eyebrow className="text-maroon">Privacy</Eyebrow>
          <h1 className={`mt-3 ${H1}`}>What this site keeps, and why.</h1>
          <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink/80">
            The short version: if you sign up, your name and email address go on a list so that the newsletter can reach you. Visits are
            counted without cookies, nothing else is collected, and one email is enough to be taken off again.
          </p>
          <p className="mt-2 text-sm text-ink/60">Last updated {UPDATED}.</p>
          </div>

          <KolamDivider className="mt-8 text-brass" />

          <div className="mt-8 space-y-8">
            {SECTIONS.map((section) => (
              <section key={section.title} className="reveal">
                <h2 className="font-serif text-2xl font-semibold leading-tight sm:text-3xl">{section.title}</h2>
                <div className="mt-3 space-y-3 text-[1.0625rem] leading-relaxed text-ink/80">
                  {section.body.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
