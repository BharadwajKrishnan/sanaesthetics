import { InstagramEmbed } from "@/components/InstagramEmbed";
import { SignupForm } from "@/components/SignupForm";
import { SixTastes } from "@/components/SixTastes";
import { SpiceBox } from "@/components/SpiceBox";
import { TadkaPan } from "@/components/TadkaPan";
import { Tag } from "@/components/Tag";
import { posts, reels } from "@/lib/instagram";
import { site } from "@/lib/site";

const INSIDE = [
  {
    tamil: "சமையல்",
    tags: ["Recipes", "Everyday"],
    title: "Authentic recipes",
    body: "Everyday, regional and festive vegetarian dishes, written the way they are cooked at home, with the quantities and timings that make them work.",
  },
  {
    tamil: "பாரம்பரியம்",
    tags: ["Heritage"],
    title: "Heritage recipes",
    body: "Older family recipes and traditional methods, recorded carefully before they are lost: the stone-ground, the sun-dried, the slow-fermented.",
  },
  {
    tamil: "வேதியியல்",
    tags: ["Science"],
    title: "Flavour chemistry",
    body: "Why spices bloom in oil, why batter rises overnight, why onions turn sweet. The reasons behind each step, in plain language.",
  },
  {
    tamil: "பொருட்கள்",
    tags: ["Pantry", "Science"],
    title: "Ingredient knowledge",
    body: "Spices, herbs, grains and vegetables, looked at twice: once as a cook uses them, once as a scientist understands them.",
  },
  {
    tamil: "கதைகள்",
    tags: ["Stories"],
    title: "Food stories and traditions",
    body: "The memories, regions and rituals a dish belongs to. Who made it, when it was served, and what it meant.",
  },
];

const LEARN = [
  { title: "Online cooking courses", body: "Structured lessons that build from the spice box upwards." },
  { title: "Live cooking workshops", body: "Cook one dish together, in real time, with questions as you go." },
  { title: "Flavour science sessions", body: "One idea per session, such as blooming or fermentation, shown at the stove." },
  { title: "Small-group classes", body: "A handful of cooks, so everyone's pan gets looked at." },
  { title: "Recipe troubleshooting", body: "Bring the dish that never turns out right and find out why." },
  { title: "Regional specials", body: "Workshops on one region's cooking or one traditional technique." },
];

const AUDIENCE = [
  "You cook Indian vegetarian food at home and want it to taste the way you remember.",
  "You live far from home and want to reconnect with the food you grew up with.",
  "You are new to Indian cooking and the spice shelf looks like a puzzle.",
  "You like knowing why a recipe works, not only how.",
  "You have a family recipe that deserves to be written down properly.",
];

const H2 = "text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl";
const LEDE = "font-serif text-lg leading-relaxed sm:text-xl";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-semibold uppercase tracking-[0.18em] opacity-60">{children}</p>;
}

export default function Home() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-cream">
        Skip to content
      </a>

      <header className="sticky top-0 z-40 border-b border-ink/10 bg-cream/95 backdrop-blur">
        <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto] items-center gap-6 px-5 py-4 sm:px-8 xl:grid-cols-[1fr_auto_1fr]">
          <nav aria-label="Sections" className="hidden items-center gap-6 whitespace-nowrap text-sm xl:flex">
            {site.navLeft.map((item) => (
              <a key={item.href} href={item.href} className="hover:underline hover:underline-offset-4">
                {item.label}
              </a>
            ))}
          </nav>
          <a href="#top" className="whitespace-nowrap text-sm font-semibold uppercase tracking-[0.12em] sm:text-base sm:tracking-[0.18em] xl:text-center xl:text-lg">
            {site.name}
          </a>
          <div className="flex items-center justify-end gap-6 whitespace-nowrap text-sm">
            {site.navRight.map((item) => (
              <a key={item.href} href={item.href} className="hidden hover:underline hover:underline-offset-4 sm:inline">
                {item.label}
              </a>
            ))}
            <a href="#join" className="whitespace-nowrap bg-ink px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-cream hover:bg-ink/85">
              Join<span className="hidden sm:inline"> the waitlist</span>
            </a>
          </div>
        </div>
      </header>

      <main id="main" className="overflow-x-clip">
        {/* Hero */}
        <section id="top">
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 pb-24 pt-14 sm:px-8 lg:grid-cols-12 lg:pt-20">
            <div className="lg:col-span-6">
              <p className="flex flex-wrap gap-1.5">
                <Tag tone="leaf">Vegetarian</Tag>
                <Tag>Heritage</Tag>
                <Tag>Flavour science</Tag>
              </p>
              <h1 className="mt-6 text-[clamp(2.6rem,5.4vw,5rem)] font-medium leading-[1.02] tracking-tight">
                {site.tagline}
              </h1>
              <p className={`${LEDE} mt-7 max-w-xl text-ink/80`}>
                Authentic recipes, heritage methods and the chemistry behind them. Learn what to cook, and why it works. Start by
                opening the spice box.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
                <a href="#join" className="bg-ink px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-cream hover:bg-ink/85">
                  Join the waitlist
                </a>
                <a href="#newsletter" className="text-sm font-semibold uppercase tracking-[0.12em] hover:underline hover:underline-offset-4">
                  Subscribe to the newsletter &gt;
                </a>
              </div>
            </div>
            <div className="lg:col-span-6">
              <blockquote className="mb-10 max-w-sm lg:ml-auto">
                <p className="text-2xl font-medium leading-snug tracking-tight">“Every instruction in a traditional recipe has a reason.”</p>
                <footer className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-ink/60">The idea behind the lab</footer>
              </blockquote>
              <div className="bg-sand px-6 py-10 sm:px-12">
                <SpiceBox />
              </div>
            </div>
          </div>
        </section>

        {/* What's inside */}
        <section id="inside" className="bg-sand">
          <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
            <div className="reveal max-w-4xl">
              <Eyebrow>What&apos;s inside</Eyebrow>
              <h2 className={`${H2} mt-4`}>A recipe book, a family archive and a lab notebook, in one place.</h2>
            </div>
            <ul className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {INSIDE.map((item, i) => (
                <li key={item.title} className={`reveal ${i % 3 === 1 ? "lg:mt-16" : ""}`}>
                  <div className="flex aspect-[4/3] items-center justify-center bg-cream px-6">
                    <span lang="ta" aria-hidden="true" className="text-center font-tamil text-4xl font-medium text-ink/80 sm:text-5xl">
                      {item.tamil}
                    </span>
                  </div>
                  <p className="mt-5 flex flex-wrap gap-1.5">
                    {item.tags.map((t, j) => (
                      <Tag key={t} tone={j === 0 ? "leaf" : "ink"}>
                        {t}
                      </Tag>
                    ))}
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight">{item.title}</h3>
                  <p className="mt-2 font-serif leading-relaxed text-ink/75">{item.body}</p>
                </li>
              ))}
              <li className="reveal flex flex-col justify-center border border-ink/20 p-8 lg:mt-16">
                <p className="text-2xl font-semibold tracking-tight">The first recipes are being written now.</p>
                <a href="#newsletter" className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] hover:underline hover:underline-offset-4">
                  Get them in your inbox &gt;
                </a>
              </li>
            </ul>
          </div>
        </section>

        {/* Flavour science: the tadka */}
        <section id="science">
          <div className="mx-auto max-w-7xl px-5 pb-16 pt-24 sm:px-8">
            <div className="reveal max-w-4xl">
              <Eyebrow>Why the food works</Eyebrow>
              <h2 className={`${H2} mt-4`}>Your grandmother&apos;s tadka was chemistry. She just never called it that.</h2>
              <p className={`${LEDE} mt-6 max-w-2xl text-ink/80`}>
                Every instruction in a traditional recipe has a reason. Scroll through one tempering and watch the pan fill: the
                way it was taught, and the way it works.
              </p>
            </div>
            <TadkaPan />
          </div>
        </section>

        {/* Six tastes */}
        <section className="on-dark bg-ink text-cream">
          <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
            <div className="reveal max-w-4xl">
              <Eyebrow>Arusuvai · the six tastes</Eyebrow>
              <h2 className={`${H2} mt-4`}>Tamil kitchens counted six tastes long before anyone drew a molecule.</h2>
              <p className={`${LEDE} mt-6 max-w-2xl text-cream/80`}>
                A balanced meal is meant to carry all six. The mango pachadi made for Tamil New Year puts every one of them in a
                single bowl. Pick a taste to see what is behind it.
              </p>
            </div>
            <SixTastes />
          </div>
        </section>

        {/* Instagram */}
        <section id="kitchen">
          <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
            <div className="reveal flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-3xl">
                <Eyebrow>From the kitchen</Eyebrow>
                <h2 className={`${H2} mt-4`}>It started as a cook&apos;s notebook on Instagram.</h2>
              </div>
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-ink px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] transition-colors hover:bg-ink hover:text-cream"
              >
                Follow @{site.instagramHandle}
              </a>
            </div>
            <p className={`${LEDE} reveal mt-8 max-w-3xl text-ink/80`}>
              An Indian home cook in Germany, cooking vegetarian, baking on weekends, planning menus for friends and waiting on
              the Indian grocery delivery. The habits show up in every post: ghee on the toast, black salt on everything, and a
              note on why an ingredient was chosen. {site.name} is that notebook, grown up.
            </p>

            <div className="mt-16 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
              {[...reels, ...posts].map((item, i) => (
                <div key={item.id} className={`reveal ${i % 3 === 1 ? "lg:mt-20" : ""}`}>
                  <InstagramEmbed item={item} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Learn */}
        <section id="learn" className="bg-sand">
          <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
            <div className="reveal max-w-3xl">
              <p className="flex items-center gap-3">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] opacity-60">Learn with us</span>
                <Tag tone="leaf">Opening soon</Tag>
              </p>
              <h2 className={`${H2} mt-4`}>Classes where you cook, ask and understand.</h2>
            </div>
            <ol className="mt-14 grid gap-px bg-ink/15 sm:grid-cols-2 lg:grid-cols-3">
              {LEARN.map((item, i) => (
                <li key={item.title} className="reveal bg-sand py-8 pr-8 sm:p-8">
                  <p className="text-xs font-semibold tracking-[0.14em] text-ink/50">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight">{item.title}</h3>
                  <p className="mt-2 font-serif leading-relaxed text-ink/75">{item.body}</p>
                </li>
              ))}
            </ol>
            <p className="mt-10 font-serif text-lg">
              Dates and prices will be announced to the waitlist first.{" "}
              <a href="#join" className="font-sans text-sm font-semibold uppercase tracking-[0.12em] underline underline-offset-4">
                Join the waitlist
              </a>
            </p>
          </div>
        </section>

        {/* Audience */}
        <section>
          <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
            <Eyebrow>Who it&apos;s for</Eyebrow>
            <h2 className={`${H2} reveal mt-4`}>Pull up a chair if this sounds like you.</h2>
            <ul className="mt-12 border-t border-ink/20">
              {AUDIENCE.map((line) => (
                <li key={line} className="reveal flex items-baseline gap-5 border-b border-ink/20 py-6 text-xl leading-snug tracking-tight sm:text-2xl">
                  <span aria-hidden="true" className="inline-block h-2.5 w-2.5 shrink-0 translate-y-[-0.15em] rounded-full bg-leaf" />
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Join */}
        <section id="join" className="on-dark bg-ink text-cream">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 sm:px-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="reveal">
              <h2 className={H2}>Keep the old recipes. Understand them, too.</h2>
              <p className={`${LEDE} mt-6 max-w-xl text-cream/80`}>
                The aim is a trusted home for traditional South Indian vegetarian cooking: preserved faithfully, explained clearly, and
                taught live. Join the waitlist to get the first recipes and class dates.
              </p>
            </div>
            <div className="lg:justify-self-end">
              <SignupForm list="waitlist" tone="dark" />
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section id="newsletter">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="reveal mx-auto max-w-2xl py-24 text-center">
              <Tag tone="leaf">First issue coming soon</Tag>
              <h2 className="mt-5 text-3xl font-medium tracking-tight sm:text-4xl">Subscribe to the newsletter</h2>
              <p className="mx-auto mt-5 max-w-xl font-serif leading-relaxed text-ink/80">
                A letter from the lab every so often: one recipe, the science that makes it work, and a story from the kitchen it
                came from. The first issue is still being written. Sign up and it will come straight to you. No spam, and you can
                unsubscribe at any time.
              </p>
              <div className="mt-8">
                <SignupForm list="newsletter" center />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="on-dark bg-ink text-cream">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <p className="text-lg font-semibold uppercase tracking-[0.2em]">{site.name}</p>
            <p className="mt-4 max-w-sm font-serif leading-relaxed text-cream/70">
              Authentic vegetarian South Indian cooking, explored through tradition, technique, and science.
            </p>
          </div>
          <nav aria-label="Footer">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cream/50">Explore</p>
            <ul className="mt-4 space-y-2 text-sm">
              {[...site.navLeft, ...site.navRight].map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="hover:underline hover:underline-offset-4">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cream/50">Follow</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:underline hover:underline-offset-4">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#newsletter" className="hover:underline hover:underline-offset-4">
                  Newsletter
                </a>
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
    </>
  );
}
