import { InstagramEmbed } from "@/components/InstagramEmbed";
import { SixTastes } from "@/components/SixTastes";
import { SpiceBox } from "@/components/SpiceBox";
import { TadkaPan } from "@/components/TadkaPan";
import { WaitlistForm } from "@/components/WaitlistForm";
import { posts, reels } from "@/lib/instagram";
import { site } from "@/lib/site";

const CARD_STYLES = [
  "bg-turmeric text-indigo -rotate-2",
  "bg-peacock text-rice rotate-1",
  "bg-rani text-rice -rotate-1",
  "bg-leaf text-rice rotate-2",
  "bg-kumkum text-rice -rotate-1",
];

const MARQUEE = [
  "haldi → curcumin",
  "jeera → cuminaldehyde",
  "mirch → capsaicin",
  "dhania → linalool",
  "methi → sotolon",
  "imli → tartaric acid",
  "dahi → lactic acid",
  "milagu → piperine",
];

const FRAME_COLORS = ["#b5124e", "#0b5a62", "#f4b41a", "#2f7d4f", "#d7301f"];

const INSIDE = [
  {
    title: "Authentic recipes",
    body: "Everyday, regional and festive vegetarian dishes, written the way they are cooked at home, with the quantities and timings that make them work.",
  },
  {
    title: "Heritage recipes",
    body: "Older family recipes and traditional methods, recorded carefully before they are lost: the stone-ground, the sun-dried, the slow-fermented.",
  },
  {
    title: "Flavour chemistry",
    body: "Why spices bloom in oil, why batter rises overnight, why onions turn sweet. The reasons behind each step, in plain language.",
  },
  {
    title: "Ingredient knowledge",
    body: "Spices, herbs, grains and vegetables, looked at twice: once as a cook uses them, once as a scientist understands them.",
  },
  {
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

function Eyebrow({ children, className = "text-rani" }: { children: React.ReactNode; className?: string }) {
  return <p className={`font-mono text-xs font-medium uppercase tracking-[0.25em] ${className}`}>{children}</p>;
}

function Temple({ color, className = "" }: { color: string; className?: string }) {
  return <div aria-hidden="true" className={`temple ${className}`} style={{ ["--c" as string]: color }} />;
}

export default function Home() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-turmeric focus:px-4 focus:py-2 focus:text-indigo">
        Skip to content
      </a>

      <header className="on-dark sticky top-0 z-40 bg-indigo text-rice">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-3 sm:px-8">
          <a href="#top" className="font-display text-2xl text-turmeric">
            {site.name}
          </a>
          <nav aria-label="Sections" className="hidden items-center gap-7 text-sm font-semibold uppercase tracking-wider md:flex">
            {site.nav.map((item) => (
              <a key={item.href} href={item.href} className="hover:text-turmeric">
                {item.label}
              </a>
            ))}
          </nav>
          <a href="#join" className="rounded-full bg-turmeric px-5 py-2 text-sm font-bold text-indigo hover:bg-rice">
            Join the waitlist
          </a>
        </div>
      </header>

      <main id="main" className="overflow-x-clip">
        {/* Hero */}
        <section id="top" className="on-dark kolam-light relative bg-rani text-rice">
          <span aria-hidden="true" lang="ta" className="pointer-events-none absolute -left-6 bottom-0 select-none font-tamil text-[38vw] font-extrabold leading-[0.8] text-rani-deep/60 lg:text-[26rem]">
            சுவை
          </span>
          <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 pb-24 pt-12 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12 lg:pt-16">
            <div>
              <Eyebrow className="text-turmeric">Vegetarian Indian cooking · சுவை means flavour</Eyebrow>
              <h1 className="mt-5 font-display text-[clamp(2.7rem,5.6vw,5.4rem)] leading-none">
                Where Indian culinary tradition meets{" "}
                <span className="relative inline-block text-turmeric">
                  flavour science.
                  <svg aria-hidden="true" viewBox="0 0 300 14" preserveAspectRatio="none" className="absolute -bottom-2 left-0 h-3 w-full">
                    <path d="M2 9Q20 1 38 9T74 9T110 9T146 9T182 9T218 9T254 9T298 9" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>
              <p className="mt-8 max-w-xl text-xl leading-relaxed text-rice/90">
                Authentic recipes, heritage methods and the chemistry behind them. Learn what to cook, and why it works. Start by
                opening the spice box.
              </p>
              <div className="mt-8">
                <WaitlistForm />
                <p className="text-sm text-rice/75">Recipes and classes are in preparation. Join to hear when they open.</p>
              </div>
            </div>
            <SpiceBox />
          </div>
        </section>

        {/* Marquee */}
        <div aria-hidden="true" className="relative z-10 -my-5 -rotate-1 overflow-hidden border-y-4 border-indigo bg-turmeric py-3">
          <div className="marquee flex w-max gap-10 whitespace-nowrap pr-10 font-mono text-lg font-medium uppercase tracking-widest text-indigo">
            {[...MARQUEE, ...MARQUEE].map((m, i) => (
              <span key={i} className="flex items-center gap-10">
                {m} <span className="text-rani">✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* What's inside */}
        <section id="inside" className="kolam-dark">
          <div className="mx-auto max-w-7xl px-5 pb-24 pt-28 sm:px-8">
            <div className="reveal">
              <Eyebrow>What&apos;s inside</Eyebrow>
              <h2 className="mt-4 max-w-4xl font-display text-5xl leading-[1.02] sm:text-6xl lg:text-7xl">
                A recipe book, a family archive and a <span className="text-rani">lab notebook</span>, in one place.
              </h2>
            </div>
            <ul className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-6">
              {INSIDE.map((item, i) => (
                <li
                  key={item.title}
                  className={`reveal hard-shadow rounded-3xl border-2 border-indigo p-7 transition-transform duration-300 hover:rotate-0 hover:scale-[1.03] ${CARD_STYLES[i]} ${i < 2 ? "lg:col-span-3" : "lg:col-span-2"}`}
                >
                  <h3 className="font-display text-3xl leading-tight">{item.title}</h3>
                  <p className="mt-3 text-lg leading-relaxed opacity-90">{item.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Flavour science: the tadka */}
        <section id="science" className="on-dark bg-peacock text-rice">
          <Temple color="var(--color-rice)" />
          <div className="mx-auto max-w-7xl px-5 pb-16 pt-20 sm:px-8">
            <div className="reveal">
              <Eyebrow className="text-turmeric">Why the food works</Eyebrow>
              <h2 className="mt-4 max-w-4xl font-display text-5xl leading-[1.02] sm:text-6xl lg:text-7xl">
                Your grandmother&apos;s tadka was chemistry. She just never called it that.
              </h2>
              <p className="mt-6 max-w-2xl text-xl leading-relaxed text-rice/85">
                Every instruction in a traditional recipe has a reason. Scroll through one tempering and watch the pan fill: the
                way it was taught, and the way it works.
              </p>
            </div>
            <TadkaPan />
          </div>
        </section>

        {/* Six tastes */}
        <section className="on-dark kolam-light bg-indigo text-rice">
          <Temple color="var(--color-peacock)" />
          <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
            <div className="reveal">
              <Eyebrow className="text-turmeric">Arusuvai · the six tastes</Eyebrow>
              <h2 className="mt-4 max-w-4xl font-display text-5xl leading-[1.02] sm:text-6xl lg:text-7xl">
                Tamil kitchens counted six tastes long before anyone drew a molecule.
              </h2>
              <p className="mt-6 max-w-2xl text-xl leading-relaxed text-rice/85">
                A balanced meal is meant to carry all six. The mango pachadi made for Tamil New Year puts every one of them in a
                single bowl. Pick a taste to see what is behind it.
              </p>
            </div>
            <SixTastes />
          </div>
        </section>

        {/* Instagram */}
        <section id="kitchen" className="kolam-dark">
          <Temple color="var(--color-indigo)" />
          <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
            <div className="reveal flex flex-wrap items-end justify-between gap-6">
              <div>
                <Eyebrow>From the kitchen</Eyebrow>
                <h2 className="mt-4 max-w-3xl font-display text-5xl leading-[1.02] sm:text-6xl lg:text-7xl">
                  It started as a cook&apos;s notebook on <span className="text-rani">Instagram</span>.
                </h2>
              </div>
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hard-shadow rounded-full border-2 border-indigo bg-turmeric px-6 py-3 font-bold transition-transform hover:-translate-y-0.5"
              >
                Follow @{site.instagramHandle}
              </a>
            </div>
            <p className="reveal mt-8 max-w-3xl text-xl leading-relaxed text-indigo/85">
              An Indian home cook in Germany, cooking vegetarian, baking on weekends, planning menus for friends and waiting on
              the Indian grocery delivery. The habits show up in every post: ghee on the toast, black salt on everything, and a
              note on why an ingredient was chosen. {site.name} is that notebook, grown up.
            </p>

            <div className="mt-14 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-6">
              {[...reels, ...posts].map((item, i) => (
                <div key={item.id} className={`reveal ${i < 2 ? "lg:col-span-3 lg:px-12" : "lg:col-span-2"} ${i % 2 ? "lg:rotate-1" : "lg:-rotate-1"}`}>
                  <InstagramEmbed item={item} accent={FRAME_COLORS[i % FRAME_COLORS.length]} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Learn */}
        <section id="learn" className="bg-turmeric">
          <Temple color="var(--color-rice)" />
          <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
            <div className="reveal flex flex-wrap items-start justify-between gap-8">
              <div>
                <Eyebrow className="text-rani-deep">Learn with us</Eyebrow>
                <h2 className="mt-4 max-w-3xl font-display text-5xl leading-[1.02] sm:text-6xl lg:text-7xl">
                  Classes where you cook, ask and understand.
                </h2>
              </div>
              <p className="flex h-32 w-32 shrink-0 rotate-12 items-center justify-center rounded-full border-4 border-double border-kumkum text-center font-mono text-sm font-medium uppercase leading-tight tracking-widest text-kumkum">
                Opening
                <br />
                soon
              </p>
            </div>
            <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {LEARN.map((item) => (
                <li key={item.title} className="reveal ticket bg-rice px-9 py-7 transition-transform duration-200 hover:-translate-y-1">
                  <p className="font-mono text-xs uppercase tracking-[0.25em] text-rani">Admit one</p>
                  <h3 className="mt-2 border-b-2 border-dashed border-indigo/30 pb-3 font-display text-2xl">{item.title}</h3>
                  <p className="mt-3 leading-relaxed text-indigo/80">{item.body}</p>
                </li>
              ))}
            </ul>
            <p className="mt-10 text-lg">
              Dates and prices will be announced to the waitlist first.{" "}
              <a href="#join" className="font-bold underline decoration-2 underline-offset-4 hover:text-rani-deep">
                Join the waitlist
              </a>
            </p>
          </div>
        </section>

        {/* Audience */}
        <section className="on-dark kolam-light bg-rani text-rice">
          <Temple color="var(--color-turmeric)" />
          <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
            <Eyebrow className="text-turmeric">Who it&apos;s for</Eyebrow>
            <h2 className="reveal mt-4 font-display text-5xl leading-[1.02] sm:text-6xl lg:text-7xl">Pull up a chair if this sounds like you.</h2>
            <ul className="mt-12 border-t-2 border-rice/30">
              {AUDIENCE.map((line) => (
                <li key={line} className="reveal group flex items-baseline gap-5 border-b-2 border-rice/30 py-6 text-2xl leading-snug transition-colors hover:text-turmeric sm:text-3xl">
                  <span aria-hidden="true" className="text-turmeric transition-transform duration-300 group-hover:rotate-90">
                    ✦
                  </span>
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Join */}
        <section id="join" className="on-dark bg-peacock text-rice">
          <Temple color="var(--color-rani)" />
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 sm:px-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="reveal">
              <h2 className="font-display text-5xl leading-[1.02] sm:text-6xl lg:text-7xl">
                Keep the old recipes. <span className="text-turmeric">Understand them, too.</span>
              </h2>
              <p className="mt-6 max-w-xl text-xl leading-relaxed text-rice/85">
                The aim is a trusted home for traditional Indian vegetarian cooking: preserved faithfully, explained clearly, and
                taught live. Join the waitlist to get the first recipes and class dates.
              </p>
            </div>
            <div className="lg:justify-self-end">
              <WaitlistForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="on-dark overflow-hidden bg-indigo text-rice">
        <Temple color="var(--color-peacock)" />
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 pt-12 sm:px-8">
          <p className="max-w-md text-rice/75">Authentic vegetarian Indian cooking, explored through tradition, technique, and science.</p>
          <p className="text-sm text-rice/75">
            <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-turmeric underline underline-offset-4">
              Instagram
            </a>
            <span className="ml-4">
              © {new Date().getFullYear()} {site.name}
            </span>
          </p>
        </div>
        <p aria-hidden="true" className="-mb-[0.22em] mt-6 select-none whitespace-nowrap text-center font-display text-[14vw] leading-none text-turmeric">
          {site.name}
        </p>
      </footer>
    </>
  );
}
