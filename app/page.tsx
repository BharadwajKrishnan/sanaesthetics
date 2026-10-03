import { InstagramEmbed } from "@/components/InstagramEmbed";
import { SpiceBox } from "@/components/SpiceBox";
import { WaitlistForm } from "@/components/WaitlistForm";
import { posts, reels } from "@/lib/instagram";
import { site } from "@/lib/site";

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

const TADKA = [
  {
    step: "Heat the ghee until one cumin seed sizzles on contact.",
    why: "Most aroma compounds in spices dissolve in fat, not water. Hot fat pulls them out of the seed and carries them through the whole pot.",
  },
  {
    step: "Add the mustard seeds first and wait for them to pop.",
    why: "The water inside each seed turns to steam and bursts the shell. That takes the highest heat, so mustard goes in before anything delicate.",
  },
  {
    step: "Cumin next, only until it darkens a shade.",
    why: "Toasting builds new nutty, roasted flavours within seconds. A few seconds more and the same reactions produce bitterness.",
  },
  {
    step: "Hing and curry leaves last, then pour it over the dal at once.",
    why: "Their aromas are the most fragile and escape into the air quickly. Pouring straight away traps them in the dish instead of the kitchen.",
  },
];

const TOPICS = [
  { name: "Fermentation", example: "why idli batter rises overnight, and why it sulks in a cold kitchen" },
  { name: "Browning", example: "what happens to onions between translucent and deep brown" },
  { name: "Roasting", example: "why dry-roasted spices taste different from raw ones" },
  { name: "Acidity", example: "when to reach for tamarind, kokum, amchur or lemon" },
  { name: "Texture", example: "what makes a dosa crisp and a roti soft" },
  { name: "Balance", example: "how sweet, sour, salt, heat and bitterness correct each other" },
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

function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p className={`font-mono text-xs font-medium uppercase tracking-[0.2em] ${dark ? "text-turmeric" : "text-terracotta"}`}>
      {children}
    </p>
  );
}

export default function Home() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-paper">
        Skip to content
      </a>

      <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-4 sm:px-8">
          <a href="#top" className="font-display text-2xl text-ink">
            {site.name}
          </a>
          <nav aria-label="Sections" className="hidden items-center gap-7 text-sm font-medium text-ink/75 md:flex">
            {site.nav.map((item) => (
              <a key={item.href} href={item.href} className="hover:text-terracotta">
                {item.label}
              </a>
            ))}
          </nav>
          <a href="#join" className="rounded-full bg-green px-5 py-2 text-sm font-semibold text-paper hover:bg-ink">
            Join the waitlist
          </a>
        </div>
      </header>

      <main id="main">
        {/* Hero */}
        <section id="top" className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-12 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:pt-20">
          <div>
            <Eyebrow>Vegetarian Indian cooking</Eyebrow>
            <h1 className="mt-5 font-display text-[2.6rem] leading-[1.05] text-ink sm:text-6xl lg:text-[4.2rem]">
              Where Indian culinary tradition meets <em className="text-terracotta">flavour science</em>.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/80">
              Authentic recipes, heritage methods and the chemistry behind them. Learn what to cook, and why it works, starting with
              the seven spices in the box.
            </p>
            <div className="mt-8">
              <WaitlistForm />
              <p className="text-sm text-ink/60">Recipes and classes are in preparation. Join to hear when they open.</p>
            </div>
          </div>
          <div>
            <SpiceBox />
          </div>
        </section>

        {/* What's inside */}
        <section id="inside" className="border-t border-ink/10 bg-paper-deep/60">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
            <Eyebrow>What&apos;s inside</Eyebrow>
            <h2 className="mt-4 max-w-2xl font-display text-4xl leading-tight text-ink sm:text-5xl">
              A recipe book, a family archive and a lab notebook, in one place.
            </h2>
            <ul className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {INSIDE.map((item) => (
                <li key={item.title} className="border-t-2 border-ink pt-5">
                  <h3 className="font-display text-2xl text-ink">{item.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink/75">{item.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Flavour science */}
        <section id="science" className="on-dark bg-green text-paper">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
            <Eyebrow dark>Why the food works</Eyebrow>
            <h2 className="mt-4 max-w-3xl font-display text-4xl leading-tight sm:text-5xl">
              Your grandmother&apos;s tadka was chemistry. She just never called it that.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-paper/80">
              Every instruction in a traditional recipe has a reason. Here is one tempering, read twice: the way it was taught, and
              the way it works.
            </p>

            <div className="mt-12 hidden grid-cols-2 gap-10 border-b border-paper/25 pb-3 font-mono text-xs uppercase tracking-[0.2em] text-turmeric md:grid">
              <span>What tradition says</span>
              <span>What the science says</span>
            </div>
            <ol>
              {TADKA.map((row) => (
                <li key={row.step} className="grid gap-3 border-b border-paper/25 py-7 md:grid-cols-2 md:gap-10">
                  <p className="font-display text-2xl leading-snug">{row.step}</p>
                  <p className="leading-relaxed text-paper/80">{row.why}</p>
                </li>
              ))}
            </ol>

            <h3 className="mt-16 font-display text-3xl">Also on the bench</h3>
            <dl className="mt-6 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
              {TOPICS.map((t) => (
                <div key={t.name}>
                  <dt className="font-mono text-sm font-medium uppercase tracking-widest text-leaf">{t.name}</dt>
                  <dd className="mt-1 leading-relaxed text-paper/80">{t.example}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Instagram */}
        <section id="kitchen" className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow>From the kitchen</Eyebrow>
              <h2 className="mt-4 max-w-2xl font-display text-4xl leading-tight text-ink sm:text-5xl">
                It started as a cook&apos;s notebook on Instagram.
              </h2>
            </div>
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border-2 border-ink px-5 py-2.5 font-semibold text-ink hover:bg-ink hover:text-paper"
            >
              Follow @{site.instagramHandle}
            </a>
          </div>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/80">
            An Indian home cook in Germany, cooking vegetarian, baking on weekends, planning menus for friends and waiting on the
            Indian grocery delivery. The habits show up in every post: ghee on the toast, black salt on everything, and a note on
            why an ingredient was chosen. {site.name} is that notebook, grown up.
          </p>

          <h3 className="mt-12 font-mono text-xs font-medium uppercase tracking-[0.2em] text-terracotta">Watch</h3>
          <div className="mt-4 grid gap-8 sm:grid-cols-2 lg:max-w-3xl">
            {reels.map((item) => (
              <InstagramEmbed key={item.id} item={item} />
            ))}
          </div>

          <h3 className="mt-14 font-mono text-xs font-medium uppercase tracking-[0.2em] text-terracotta">Look</h3>
          <div className="mt-4 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((item) => (
              <InstagramEmbed key={item.id} item={item} />
            ))}
          </div>
        </section>

        {/* Learn */}
        <section id="learn" className="border-y border-ink/10 bg-paper-deep/60">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
            <div className="flex flex-wrap items-center gap-4">
              <Eyebrow>Learn with us</Eyebrow>
              <span className="rounded-full bg-turmeric px-3 py-1 text-xs font-bold uppercase tracking-wide text-ink">Opening soon</span>
            </div>
            <h2 className="mt-4 max-w-2xl font-display text-4xl leading-tight text-ink sm:text-5xl">
              Classes where you cook, ask and understand.
            </h2>
            <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {LEARN.map((item) => (
                <li key={item.title} className="rounded-2xl border border-ink/15 bg-paper p-6">
                  <h3 className="font-display text-xl text-ink">{item.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink/75">{item.body}</p>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-ink/70">
              Dates and prices will be announced to the waitlist first.{" "}
              <a href="#join" className="font-semibold text-terracotta underline underline-offset-4">
                Join the waitlist
              </a>
            </p>
          </div>
        </section>

        {/* Audience */}
        <section className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Eyebrow>Who it&apos;s for</Eyebrow>
            <h2 className="mt-4 font-display text-4xl leading-tight text-ink sm:text-5xl">Pull up a chair if this sounds like you.</h2>
          </div>
          <ul className="divide-y divide-ink/15 border-y border-ink/15">
            {AUDIENCE.map((line) => (
              <li key={line} className="py-5 text-lg leading-relaxed text-ink/85">
                {line}
              </li>
            ))}
          </ul>
        </section>

        {/* Join */}
        <section id="join" className="bg-turmeric">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 sm:px-8 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-4xl leading-tight text-ink sm:text-5xl">Keep the old recipes. Understand them, too.</h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink/85">
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

      <footer className="on-dark bg-ink text-paper">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-10 sm:px-8">
          <div>
            <p className="font-display text-2xl">{site.name}</p>
            <p className="mt-1 text-sm text-paper/70">Authentic vegetarian Indian cooking, explored through tradition, technique, and science.</p>
          </div>
          <div className="text-sm text-paper/70">
            <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-paper underline underline-offset-4">
              Instagram
            </a>
            <span className="ml-4">© {new Date().getFullYear()} {site.name}</span>
          </div>
        </div>
      </footer>
    </>
  );
}
