import { Artwork, HeroGarnish, RiceBowl, SprigOutline, TemperingPan, Thali } from "@/components/Artwork";
import { Dabba } from "@/components/BrassDabba";
import { Arrow, BowlIcon, FlaskIcon, SproutIcon, TempleIcon } from "@/components/Icons";
import { InstagramEmbed } from "@/components/InstagramEmbed";
import { MobileMenu } from "@/components/MobileMenu";
import { SignupForm } from "@/components/SignupForm";
import { SixTastes } from "@/components/SixTastes";
import { SpiceBox } from "@/components/SpiceBox";
import { TadkaPan } from "@/components/TadkaPan";
import { posts, reels } from "@/lib/instagram";
import { photos } from "@/lib/photos";
import { site } from "@/lib/site";

const FEATURES = [
  { Icon: SproutIcon, lines: ["Recipes", "with a story"] },
  { Icon: FlaskIcon, lines: ["Flavour", "science"] },
  { Icon: TempleIcon, lines: ["Culture", "& heritage"] },
  { Icon: BowlIcon, lines: ["Classes", "online & in-person"] },
];

const EXPLORE = [
  {
    art: <Dabba sizes="(min-width: 1024px) 13vw, 38vw" className="absolute left-1/2 top-1/2 w-[86%] -translate-x-1/2 -translate-y-1/2" />,
    photo: photos.anjarapetti,
    alt: "An anjarapetti, the round spice box of a South Indian kitchen",
    eyebrow: "Ingredients",
    title: "Inside the Anjarapetti",
    body: "A closer look at the everyday ingredients that build flavour in a South Indian kitchen.",
    link: { href: "#anjarapetti", label: "Explore the ingredients" },
  },
  {
    art: <TemperingPan />,
    photo: photos.heat,
    alt: "Curry leaves and mustard seeds sizzling in hot oil",
    eyebrow: "Flavour science",
    title: "When Ingredients Meet Heat",
    body: "How heat transforms spices, lentils, herbs and more, and creates the distinctive aromas of South Indian cooking.",
    link: { href: "#science", label: "Read the science" },
  },
  {
    art: <RiceBowl />,
    photo: photos.recipes,
    alt: "A bowl of lemon rice with peanuts and curry leaves",
    eyebrow: "Recipes",
    title: "Recipes with a Story",
    body: "Traditional South Indian vegetarian recipes, with the science and cultural stories behind them.",
    link: { href: "#recipes", label: "Browse recipes" },
  },
];

const LEARN = [
  { title: "Online cooking courses", body: "Structured lessons that build from the anjarapetti upwards." },
  { title: "Live cooking workshops", body: "Cook one dish together, in real time, with questions as you go." },
  { title: "Flavour science sessions", body: "One idea per session, such as tempering or fermentation, shown at the stove." },
  { title: "Small-group classes", body: "A handful of cooks, so everyone's pan gets looked at." },
  { title: "Recipe troubleshooting", body: "Bring the dish that never turns out right and find out why." },
  { title: "Regional specials", body: "Workshops on one region's cooking or one traditional technique." },
];

const AUDIENCE = [
  "You cook South Indian vegetarian food at home and want it to taste the way you remember.",
  "You live far from home and want to reconnect with the food you grew up with.",
  "You are new to South Indian cooking and the spice box looks like a puzzle.",
  "You like knowing why a recipe works, not only how.",
  "You have a family recipe that deserves to be written down properly.",
];

const H2 = "font-serif text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-[3.5rem]";
const PRIMARY = "group inline-flex items-center gap-2.5 rounded-md px-6 py-3 font-medium transition-colors";

function Eyebrow({ children, className = "text-ink/70" }: { children: React.ReactNode; className?: string }) {
  return <p className={`text-xs font-medium uppercase tracking-[0.2em] ${className}`}>{children}</p>;
}

function TextLink({ href, children }: { href: string; children: string }) {
  // Keep the arrow on the same line as the last word.
  const words = children.split(" ");
  const last = words.pop();
  return (
    <a href={href} className="group font-medium text-ink underline decoration-ink/30 underline-offset-[6px] hover:decoration-ink">
      {words.length > 0 && `${words.join(" ")} `}
      <span className="whitespace-nowrap">
        {last}
        <span className="ml-2 inline-block align-[-2px]">
          <Arrow />
        </span>
      </span>
    </a>
  );
}

function HeroArt() {
  return (
    <Artwork src={photos.hero} alt="" sizes="(min-width: 1024px) 62vw, 100vw" priority className="relative h-full w-full">
      <HeroGarnish />
      <Dabba sizes="(min-width: 1024px) 26rem, 50vw" priority className="absolute left-1/2 top-1/2 w-[min(64%,20rem)] -translate-x-1/2 -translate-y-1/2 lg:left-auto lg:right-[9%] lg:top-[56%] lg:w-[min(42%,25rem)] lg:translate-x-0" />
    </Artwork>
  );
}

export default function Home() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-forest focus:px-4 focus:py-2 focus:text-cream">
        Skip to content
      </a>

      <header className="sticky top-0 z-40 border-b border-line/70 bg-cream/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-3 sm:px-8">
          <a href="#top" className="font-serif text-[1.6rem] font-semibold leading-[0.92] text-forest-deep sm:text-[1.8rem]">
            {site.wordmark[0]}
            <br />
            {site.wordmark[1]}
          </a>
          <nav aria-label="Sections" className="hidden items-center gap-7 text-[0.95rem] lg:flex">
            {site.nav.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                className={i === 0 ? "border-b-2 border-maroon pb-1 text-maroon" : "border-b-2 border-transparent pb-1 hover:border-line"}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a href="#subscribe" className="rounded-md bg-forest px-5 py-2.5 font-medium text-cream transition-colors hover:bg-forest-deep">
              Subscribe
            </a>
            <MobileMenu />
          </div>
        </div>
      </header>

      <main id="main" className="overflow-x-clip">
        {/* Hero */}
        <section id="top" className="relative">
          <div className="fade-left absolute inset-y-0 right-0 hidden w-[62%] lg:block">
            <HeroArt />
            <p aria-hidden="true" className="absolute right-[4%] top-[7%] -rotate-[8deg] font-script text-[2rem] leading-[1.15] text-cream/90">
              Ingredients
              <br />
              Tradition
              <br />
              Science
              <br />
              Stories
              <span className="mt-3 block h-px w-24 bg-cream/60" />
            </p>
          </div>
          <div className="relative mx-auto max-w-7xl px-5 pb-14 pt-12 sm:px-8 lg:pb-20 lg:pt-20">
            <div className="lg:max-w-[50%]">
              <h1 className="font-serif text-[clamp(2.75rem,5vw,4.6rem)] font-medium leading-[1.02]">
                Traditional flavours.
                <br />A deeper understanding.
              </h1>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/85">
                South Indian vegetarian recipes, stories and flavour science, from a home kitchen to a wider table.
              </p>
              <a href="#explore" className={`${PRIMARY} mt-8 bg-forest text-cream hover:bg-forest-deep`}>
                Explore the Kitchen <Arrow />
              </a>
              <ul className="mt-12 grid grid-cols-2 gap-y-6 sm:grid-cols-4 sm:divide-x sm:divide-line lg:w-[min(47rem,62vw)]">
                {FEATURES.map(({ Icon, lines }) => (
                  <li key={lines[0]} className="flex items-center gap-3 pr-4 text-sm leading-snug text-maroon sm:pl-4 sm:first:pl-0">
                    <Icon className="h-9 w-9 shrink-0" />
                    <span className="whitespace-nowrap text-ink/85">
                      {lines[0]}
                      <br />
                      {lines[1]}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="h-80 sm:h-96 lg:hidden">
            <HeroArt />
          </div>
        </section>

        {/* Arusuvai */}
        <section id="arusuvai" className="px-0 sm:px-4">
          <div className="mx-auto max-w-[88rem] bg-parchment">
            <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[0.95fr_1.25fr] lg:gap-14">
              <div className="relative">
                <SprigOutline className="pointer-events-none absolute -top-6 right-0 hidden w-36 text-ink/25 md:block" />
                <Eyebrow>The newsletter</Eyebrow>
                <h2 className="mt-3 font-serif text-6xl font-bold leading-none text-maroon sm:text-7xl">{site.newsletter}</h2>
                <p className="mt-4 max-w-md font-serif text-2xl font-medium leading-snug sm:text-[1.75rem]">
                  Stories, ingredients and the science behind South Indian flavour.
                </p>
                <p className="mt-4 max-w-lg leading-relaxed text-ink/80">
                  Arusuvai means “six tastes” in Tamil. Through this newsletter, I explore South Indian vegetarian cooking through
                  tradition, sensory science and the everyday ingredients in our kitchens.
                </p>
                <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-4">
                  <a href="#culture" className={`${PRIMARY} bg-maroon text-cream hover:bg-[#62231d]`}>
                    Preview issue 1 <Arrow />
                  </a>
                  <a href="#subscribe" className="font-medium underline decoration-ink/40 underline-offset-[6px] hover:decoration-ink">
                    Subscribe to {site.newsletter}
                  </a>
                </div>
              </div>

              <article className="grid items-center gap-6 sm:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] sm:gap-8">
                <Artwork
                  src={photos.issue1}
                  alt="Arusuvai poster, the six tastes in Tamil food tradition: sweet (jaggery, payasam), sour (tamarind, raw mango), salty (salt, pickle), bitter (fenugreek, neem flowers, bitter gourd), pungent (chilli, black pepper) and astringent (raw banana, lentils)."
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 90vw"
                  className="relative mx-auto aspect-[4/5] w-full max-w-md rounded-sm shadow-xl shadow-ink/15"
                >
                  <Thali />
                </Artwork>
                <div className="bg-cream/95 p-6 shadow-xl shadow-ink/10 sm:p-7">
                  <Eyebrow>Issue 1</Eyebrow>
                  <h3 className="mt-3 font-serif text-[1.75rem] font-semibold leading-tight">The Six Tastes of a South Indian Meal</h3>
                  <p className="mt-3 leading-relaxed text-ink/80">How tradition, taste and sensory science come together.</p>
                  <p className="mt-5">
                    <TextLink href="#culture">Read a preview</TextLink>
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Explore */}
        <section id="explore">
          <ul className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-3 lg:gap-8">
            {EXPLORE.map((card) => (
              <li key={card.title} className="reveal grid grid-cols-[40%_minmax(0,1fr)] items-center gap-5 sm:grid-cols-[44%_minmax(0,1fr)] sm:gap-6">
                <Artwork src={card.photo} alt={card.alt} sizes="(min-width: 1024px) 14vw, 44vw" className="relative aspect-[4/5] rounded-sm">
                  {card.art}
                </Artwork>
                <div>
                  <Eyebrow>{card.eyebrow}</Eyebrow>
                  <h3 className="mt-2 font-serif text-[1.75rem] font-semibold leading-tight">{card.title}</h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-ink/80">{card.body}</p>
                  <p className="mt-4">
                    <TextLink href={card.link.href}>{card.link.label}</TextLink>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Anjarapetti */}
        <section id="anjarapetti" className="umber-backdrop on-dark text-cream">
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-24 sm:px-8 lg:grid-cols-2">
            <div className="reveal">
              <Eyebrow className="text-brass">Inside the anjarapetti</Eyebrow>
              <h2 className={`${H2} mt-4`}>Seven bowls, seven reasons.</h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/80">
                Every South Indian kitchen has one: a round brass or steel box of seven spices, opened several times a day. Each
                bowl holds a compound that does a particular job in the pan. Pick a bowl to see which.
              </p>
            </div>
            <SpiceBox />
          </div>
        </section>

        {/* Flavour science: tempering */}
        <section id="science">
          <div className="mx-auto max-w-7xl px-5 pb-16 pt-24 sm:px-8">
            <div className="reveal max-w-3xl">
              <Eyebrow className="text-maroon">Flavour science</Eyebrow>
              <h2 className={`${H2} mt-4`}>When ingredients meet heat.</h2>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/80">
                Your grandmother&apos;s tempering was chemistry. She just never called it that. Scroll through one and watch the pan
                fill: the way it was taught, and the way it works.
              </p>
            </div>
            <TadkaPan />
          </div>
        </section>

        {/* Culture: the six tastes, previewing issue 1 */}
        <section id="culture" className="on-dark bg-forest-deep text-cream">
          <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
            <div className="reveal max-w-3xl">
              <Eyebrow className="text-brass">{site.newsletter} · Issue 1 preview</Eyebrow>
              <h2 className={`${H2} mt-4`}>The six tastes of a South Indian meal.</h2>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/80">
                Tamil kitchens counted six tastes long before anyone drew a molecule. A balanced meal is meant to carry all six, and
                the mango pachadi made for Tamil New Year puts every one of them in a single bowl. Pick a taste to see what is
                behind it.
              </p>
            </div>
            <SixTastes />
            <p className="mt-14">
              <a href="#subscribe" className="group inline-flex items-center gap-2 font-medium underline decoration-cream/40 underline-offset-[6px] hover:decoration-cream">
                Get the full issue: subscribe to {site.newsletter} <Arrow />
              </a>
            </p>
          </div>
        </section>

        {/* Recipes */}
        <section id="recipes">
          <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
            <div className="reveal flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-3xl">
                <Eyebrow className="text-maroon">Recipes with a story</Eyebrow>
                <h2 className={`${H2} mt-4`}>From the kitchen, one post at a time.</h2>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/80">
                  The recipes start life on Instagram, with a note on why each ingredient was chosen. The full write-ups, with
                  quantities and the science, are on their way.
                </p>
              </div>
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-forest px-5 py-2.5 font-medium text-forest transition-colors hover:bg-forest hover:text-cream"
              >
                Follow @{site.instagramHandle}
              </a>
            </div>
            <div className="mt-16 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
              {[...reels, ...posts].map((item, i) => (
                <div key={item.id} className={`reveal ${i % 3 === 1 ? "lg:mt-20" : ""}`}>
                  <InstagramEmbed item={item} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Classes */}
        <section id="classes" className="bg-parchment">
          <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
            <div className="reveal max-w-3xl">
              <Eyebrow className="text-maroon">Classes · online &amp; in-person · opening soon</Eyebrow>
              <h2 className={`${H2} mt-4`}>Classes where you cook, ask and understand.</h2>
            </div>
            <ol className="mt-14 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
              {LEARN.map((item, i) => (
                <li key={item.title} className="reveal bg-parchment py-8 pr-8 sm:p-8">
                  <p className="font-serif text-lg font-semibold text-maroon">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-2 font-serif text-2xl font-semibold">{item.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink/75">{item.body}</p>
                </li>
              ))}
            </ol>
            <div className="mt-14 grid items-center gap-8 border-t border-line pt-12 lg:grid-cols-2">
              <div>
                <h3 className="font-serif text-3xl font-semibold">Join the waitlist</h3>
                <p className="mt-3 max-w-lg leading-relaxed text-ink/80">
                  Dates and prices will be announced to the waitlist first, along with the first recipe write-ups.
                </p>
              </div>
              <div className="lg:justify-self-end">
                <SignupForm list="waitlist" />
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about">
          <div className="mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="reveal">
              <Eyebrow className="text-maroon">About</Eyebrow>
              <h2 className={`${H2} mt-4`}>A home cook&apos;s notebook, grown up.</h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/80">
                It started as a cook&apos;s notebook on Instagram: an Indian home cook in Germany, cooking vegetarian, baking on
                weekends, planning menus for friends and waiting on the Indian grocery delivery. Every post carried a note on why
                an ingredient was chosen. {site.name} is where those notes become recipes, stories and the science behind them.
              </p>
            </div>
            <div>
              <p className="font-serif text-2xl font-semibold">Pull up a chair if this sounds like you.</p>
              <ul className="mt-6 border-t border-line">
                {AUDIENCE.map((line) => (
                  <li key={line} className="reveal flex items-baseline gap-4 border-b border-line py-5 text-lg leading-snug">
                    <span aria-hidden="true" className="inline-block h-2 w-2 shrink-0 -translate-y-0.5 rounded-full bg-maroon" />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Subscribe */}
        <section id="subscribe" className="on-dark bg-forest-deep text-cream">
          <div className="reveal mx-auto max-w-2xl px-5 py-24 text-center sm:px-8">
            <Eyebrow className="text-brass">The newsletter · first issue coming soon</Eyebrow>
            <h2 className="mt-4 font-serif text-6xl font-bold sm:text-7xl">{site.newsletter}</h2>
            <p className="mt-4 font-serif text-2xl font-medium">Stories, ingredients and the science behind South Indian flavour.</p>
            <p className="mx-auto mt-5 max-w-xl leading-relaxed text-cream/80">
              One letter at a time: a recipe, the science that makes it work, and the story of the kitchen it came from. No spam,
              and you can unsubscribe at any time.
            </p>
            <div className="mt-9">
              <SignupForm list="newsletter" tone="dark" center />
            </div>
          </div>
        </section>
      </main>

      <footer className="on-dark bg-umber text-cream">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <p className="font-serif text-3xl font-semibold leading-[0.95]">
              {site.wordmark[0]}
              <br />
              {site.wordmark[1]}
            </p>
            <p className="mt-4 max-w-sm leading-relaxed text-cream/70">{site.description}</p>
          </div>
          <nav aria-label="Footer">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-cream/50">Explore</p>
            <ul className="mt-4 space-y-2 text-sm">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="hover:underline hover:underline-offset-4">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-cream/50">Follow</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:underline hover:underline-offset-4">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#subscribe" className="hover:underline hover:underline-offset-4">
                  {site.newsletter} newsletter
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
