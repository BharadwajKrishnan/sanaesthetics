import Image from "next/image";
import { Zoomable } from "@/components/Zoomable";
import Link from "next/link";

// Flavour science articles. Add one here and it gets its own page at /flavour-science/<slug>.

export type Article = {
  slug: string;
  title: string;
  eyebrow: string;
  excerpt: string;
  cover?: string;
  coverAlt: string;
  // Tailwind aspect class for the cover. Defaults to 4:3.
  coverAspect?: string;
  // The cover has text in it: readers can open it full screen.
  coverZoom?: boolean;
  readingTime: string;
  Body: () => React.ReactNode;
};

const ROASTING_ALT =
  "Roasting chemistry: sugars and amino compounds plus heat drive the Maillard reaction, giving brown colour, roasted aroma and deeper flavour";

const STAGES = ["Roasting", "Grinding", "Extraction", "Decoction", "Milk", "The final cup"];

const VARIABLES = [
  {
    title: "Grind size",
    body: [
      "Grinding determines how much surface area of the coffee is exposed to water.",
      "A finer grind generally provides more surface area for extraction, while a coarser grind may allow water to pass through differently.",
      "For a traditional South Indian filter, the grind therefore needs to work with the slow percolation process.",
    ],
  },
  {
    title: "Coffee-to-water ratio",
    body: [
      "More coffee with the same amount of water generally produces a more concentrated decoction.",
      "Too little coffee can result in something weak, while too much can produce a brew that becomes difficult to balance once milk is added.",
    ],
  },
  {
    title: "Water temperature",
    body: [
      "Temperature affects how quickly different compounds are extracted.",
      "Water needs to be sufficiently hot for efficient extraction, but brewing conditions can also influence the balance between acidity, aroma and bitterness.",
    ],
  },
  {
    title: "Contact time",
    body: [
      "South Indian filter coffee extracts relatively slowly.",
      "The longer water remains in contact with the coffee bed, the more opportunity it has to dissolve compounds from the grounds.",
      "Too little extraction can give a weak or thin brew, whereas excessive extraction may emphasise bitterness or astringent sensations.",
    ],
  },
];

function DecoctionBody() {
  return (
    <>
      <p>In today’s fast-moving world, we sometimes overlook the small things that once made mornings feel slower and more comforting.</p>
      <p>
        For me, one such memory is the strong aroma of freshly prepared coffee decoction, the familiar clink of the dabara-tumbler set,
        M. S. Subbulakshmi’s Suprabhatam playing in the background, and my father reading the newspaper.
      </p>
      <p>Behind that seemingly simple cup of South Indian filter coffee, however, there is quite a bit of chemistry happening.</p>

      <figure>
        <Image src="/images/filter-coffee-sketches.webp" alt="Line drawings of a South Indian coffee filter, dabara and tumbler, and decoction being poured" width={1400} height={1050} quality={90} sizes="(min-width: 1024px) 48rem, 90vw" className="w-full rounded-sm" />
      </figure>

      <h2>What is a coffee decoction?</h2>
      <p>South Indian filter coffee is traditionally prepared using gravity percolation.</p>
      <p>
        Ground coffee is placed in the upper chamber of a metal filter and hot water is poured over it. Unlike espresso, no external pressure
        is applied. Water slowly moves through the bed of coffee grounds under gravity and collects in the lower chamber.
      </p>
      <p>The concentrated liquid that collects below is what we call the decoction.</p>
      <p>But it is more than simply coffee powder mixed with water.</p>
      <p>It is an extract — a mixture of water-soluble compounds that have moved from the roasted coffee grounds into the brewing water.</p>

      <h2>So what makes a good decoction?</h2>
      <p>A good decoction is not necessarily the darkest or the strongest.</p>
      <p className="font-serif text-2xl font-medium text-ink">It is about balance.</p>
      <p>
        Aroma, acidity, bitterness, concentration and body all need to work together — especially because the decoction is usually only
        the first step.
      </p>
      <p>Once hot milk and, depending on preference, sugar are added, the sensory experience changes again.</p>
      <p>Milk can soften bitterness, contribute sweetness and creaminess, and alter the way aroma compounds are perceived.</p>
      <p>So the familiar cup of South Indian filter coffee is actually the result of several transformations:</p>
      <figure>
        <ol className="flex flex-wrap items-center gap-x-3 gap-y-2 bg-parchment px-6 py-5 font-serif text-xl font-semibold text-maroon">
          {STAGES.map((stage, i) => (
            <li key={stage} className="flex items-center gap-3">
              {i > 0 && (
                <span aria-hidden="true" className="text-brass">
                  →
                </span>
              )}
              {stage}
            </li>
          ))}
        </ol>
      </figure>
      <p>What appears to be a simple morning ritual is, in reality, a small flavour experiment happening every day in our kitchens.</p>

      <h2>The chemistry begins before brewing</h2>
      <p>A lot of what we recognise as “coffee flavour” is actually created before water ever touches the coffee.</p>
      <p>Green coffee beans do not smell like the coffee we drink.</p>
      <figure>
        <div className="relative">
          <Image src="/images/roasting-chemistry.webp" alt={ROASTING_ALT} width={1400} height={1050} quality={90} sizes="(min-width: 1024px) 48rem, 90vw" className="w-full rounded-sm" />
          <Zoomable src="/images/roasting-chemistry.webp" alt={ROASTING_ALT} />
        </div>
      </figure>
      <p>
        During roasting, heat causes extensive chemical transformations. One important group of reactions is the Maillard reaction, where
        sugars and amino compounds react to generate many new aroma and flavour molecules.
      </p>
      <p>Roasting also causes other thermal reactions that affect the bean&apos;s colour, bitterness, acidity and aroma.</p>
      <p>
        This is why roasting transforms a relatively mild-smelling green bean into something with the familiar roasted, nutty, caramel-like
        and sometimes smoky notes we associate with coffee.
      </p>

      <h2>Where does chicory come in?</h2>
      <p>Many traditional South Indian filter-coffee blends contain coffee and roasted chicory.</p>
      <p>
        Chicory comes from the root of the chicory plant. Once roasted and ground, it contributes its own dark colour, roasted character,
        earthy notes and bitterness.
      </p>
      <p>It can also change the perceived body of the decoction, giving the finished coffee a fuller character.</p>
      <p>
        A commonly encountered blend is around 80% coffee and 20% chicory, although the ratio varies considerably between brands and
        individual preferences.
      </p>
      <p>The coffee-to-chicory ratio therefore becomes another variable affecting the character of the final cup.</p>

      <h2>Four things that can change your decoction</h2>
      <p>Even if you use exactly the same coffee blend, your decoction can taste different depending on how you brew it.</p>
      {/* The four variables are the subject of the classes: shown blurred, with the invitation on top. */}
      <div className="relative mt-6 max-h-[34rem] overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none select-none blur-[5px]">
          {VARIABLES.map((v, i) => (
            <div key={v.title} className="mt-10 first:mt-0">
              <h3 className="font-serif text-2xl font-semibold text-ink">
                <span className="mr-3 text-maroon">{String(i + 1).padStart(2, "0")}</span>
                {v.title}
              </h3>
              {v.body.map((line) => (
                <p key={line.slice(0, 24)} className="mt-4">
                  {line}
                </p>
              ))}
            </div>
          ))}
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-cream" />
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <aside className="w-full max-w-xl border-l-4 border-maroon bg-parchment p-6 shadow-xl shadow-ink/15 sm:p-8">
            <p className="text-left font-serif text-2xl font-semibold">Want to explore it further?</p>
            <p className="mt-3 leading-relaxed text-ink/85">
              In my classes, we will look more closely at how grind size, coffee-to-chicory ratio, dosage, water temperature and
              extraction time influence the decoction — and how to adjust them to make a cup that suits your own taste.
            </p>
            <p className="mt-4">
              <Link href="/#classes" className="font-medium text-maroon underline decoration-maroon/40 underline-offset-[5px] hover:decoration-maroon">
                See the classes
              </Link>
            </p>
          </aside>
        </div>
      </div>
    </>
  );
}

const INGREDIENTS = [
  { name: "Mustard", what: "pressure builds and the seed pops" },
  { name: "Cumin", what: "rapid toasting and aroma release" },
  { name: "Dal", what: "browning and toasted, nutty aromas" },
  { name: "Curry leaves", what: "moisture vaporisation and volatile aroma release" },
  { name: "Chilli", what: "capsaicin dispersion and toasted aromas" },
  { name: "Hing", what: "sulfur-containing aromas disperse through the oil" },
  { name: "Fenugreek", what: "controlled roasting, aroma development and bitterness" },
];

const OIL = [
  {
    title: "Transfers heat",
    body: "Helps ingredients cook evenly.",
    icon: (
      <path d="M9 4c-3 3 3 5 0 8s3 5 0 8M15 4c-3 3 3 5 0 8s3 5 0 8" />
    ),
  },
  {
    title: "Carries aroma",
    body: "Absorbs and lifts essential flavours.",
    icon: (
      <path d="M12 20c-4-2-5-6-2-9 1 2 3 2 3-1 0-2-1-3-1-5 4 2 7 6 5 11-1 2-3 4-5 4z" />
    ),
  },
  {
    title: "Spreads flavour",
    body: "Distributes taste through the dish.",
    icon: (
      <path d="M12 3c3 4 6 7 6 11a6 6 0 0 1-12 0c0-4 3-7 6-11z" />
    ),
  },
];

const ORDER = [
  { title: "Different ingredients need different heat", body: "Each one releases flavour at a specific temperature." },
  { title: "Seeds need time to pop", body: "They bloom first and infuse the oil." },
  { title: "Lentils need time to turn golden", body: "They add crunch and nutty flavour." },
  { title: "Delicate leaves and hing burn quickly", body: "Added last to keep their aroma and prevent bitterness." },
];

const BENEFITS = [
  { name: "Mustard seeds", note: "Glucosinolates and minerals; studied for antioxidant activity." },
  { name: "Cumin seeds", note: "Aromatic cuminaldehyde; traditionally linked with digestion." },
  { name: "Urad dal", note: "Plant protein, fibre, iron and folate." },
  { name: "Chana dal", note: "Plant protein, fibre and minerals." },
  { name: "Fenugreek seeds", note: "Soluble fibre and bioactive compounds studied for metabolic effects." },
  { name: "Curry leaves", note: "Carotenoids and polyphenols with antioxidant potential." },
  { name: "Hing", note: "Sulfur compounds; traditionally associated with digestion." },
];

function TemperingBody() {
  return (
    <>
      <p>
        Tempering — <em>thaalippu</em>, <em>tadka</em> — is one of the quickest flavour-building techniques in South Indian cooking. The
        anjarapetti holds the everyday ingredients, and tempering is where those small ingredients are transformed by heat into aroma,
        texture and flavour.
      </p>
      <p>A little hot oil, a few ingredients, and within seconds the kitchen smells completely different.</p>
      <p className="font-serif text-2xl font-medium text-ink">But what is actually happening?</p>
      <p>
        Tempering is not one single chemical reaction. It is a combination of heating, moisture loss, aroma release, browning, fat
        extraction and physical changes, and each ingredient behaves differently.
      </p>

      <h3>Mustard seeds — why do they pop?</h3>
      <p>Mustard seeds contain a small amount of moisture. As the seeds heat in oil, that moisture turns to steam and pressure builds inside the seed.</p>
      <p>Eventually the seed coat ruptures — and we hear the familiar pop.</p>
      <p>At the same time, heating changes the way mustard’s characteristic aroma compounds are released and perceived.</p>
      <p>
        That popping sound is therefore more than just a cooking signal. It tells us the seed has reached a stage where heat has
        significantly changed its physical structure.
      </p>

      <h3>Cumin seeds — toasty aromatic compounds</h3>
      <p>Cumin behaves differently from mustard. It does not need to pop; it toasts quickly and releases volatile aromatic compounds into the hot oil.</p>
      <p>Its warm, earthy aroma develops fast, so it should not sit too long in very hot oil or it can turn bitter.</p>

      <h3>Urad dal and chana dal — from pale to nutty</h3>
      <p>They do not pop, but gradually turn golden and develop a toasted aroma.</p>
      <p>Heating drives off moisture and promotes browning reactions, including Maillard chemistry, between amino compounds and reducing sugars.</p>
      <p>These reactions create new aroma molecules that we perceive as roasted, nutty and savoury.</p>
      <p>This is also why timing matters. Golden dal tastes pleasantly toasted; dark brown dal can quickly become bitter.</p>

      <h3>Curry leaves — aroma released into fat</h3>
      <p>Fresh curry leaves contain many volatile aroma compounds.</p>
      <p>When they hit hot oil, the water present in the leaves rapidly vaporises — hence the dramatic sizzling.</p>
      <p>
        At the same time, heat helps release aromatic compounds from the leaf, and the oil acts as a medium that can dissolve and
        distribute some of those fat-compatible aroma molecules through the dish.
      </p>
      <p>That is why curry leaves smell so much stronger after tempering than when simply held raw in the hand.</p>

      <h3>Chilli — heat and aroma</h3>
      <p>Chilli contributes both aroma and pungency.</p>
      <p>
        Its heat comes mainly from capsaicinoids, including capsaicin. These compounds are more soluble in fat than in water, so cooking
        chilli in oil helps distribute the pungency through the dish.
      </p>
      <p>Heat also changes the chilli’s aroma. Brief heating can deepen its roasted character, but excessive heat quickly gives burnt, harsh notes.</p>

      <h3>Asafoetida — from sharp to savoury</h3>
      <p>Raw hing has an extremely strong sulfurous aroma.</p>
      <p>Its characteristic smell comes largely from sulfur-containing volatile compounds.</p>
      <p>
        When heated briefly in fat, the aroma profile changes and disperses through the oil. The sharp raw smell becomes more integrated
        into the dish, contributing a savoury, onion-garlic-like complexity.
      </p>
      <p>Because its aroma compounds are powerful, only a very small amount is needed.</p>

      <h3>Fenugreek — bitterness with a narrow window</h3>
      <p>Fenugreek seeds naturally contain bitter compounds and distinctive aroma molecules.</p>
      <p>Gentle roasting can make them smell warmer and more complex, but they burn easily. Once overheated, their bitterness becomes much more dominant.</p>
      <p>This is a good example of why tempering is partly about temperature control and timing, not just ingredient choice.</p>

      <h2>Tempering is controlled transformation</h2>
      <p>A few seconds of sizzling is actually a sequence of different physical and chemical events:</p>
      <figure>
        <dl className="divide-y divide-line bg-parchment px-6 py-3">
          {INGREDIENTS.map((row) => (
            <div key={row.name} className="grid gap-1 py-3 sm:grid-cols-[8rem_1fr] sm:gap-4">
              <dt className="flex items-baseline justify-between font-serif text-lg font-semibold text-maroon">
                {row.name}
                <span aria-hidden="true" className="hidden text-brass sm:inline">
                  →
                </span>
              </dt>
              <dd className="text-left leading-relaxed text-ink/80">{row.what}</dd>
            </div>
          ))}
        </dl>
      </figure>
      <p>That is what makes tempering so interesting.</p>
      <p>The same oil, the same heat — but every ingredient responds differently.</p>
      <p className="font-serif text-2xl font-medium text-ink">And that is exactly where cooking becomes flavour science.</p>

      <h2>What is the role of oil?</h2>
      <p>Oil does three important things:</p>
      <figure>
        <ul className="grid gap-6 border-y border-line py-8 sm:grid-cols-3">
          {OIL.map((item) => (
            <li key={item.title} className="flex gap-4 sm:flex-col sm:gap-3">
              <span aria-hidden="true" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brass/20 text-maroon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                  {item.icon}
                </svg>
              </span>
              <span>
                <span className="block font-serif text-xl font-semibold text-maroon">{item.title}</span>
                <span className="mt-1 block text-left text-base leading-relaxed text-ink/80">{item.body}</span>
              </span>
            </li>
          ))}
        </ul>
      </figure>
      <p className="font-medium text-ink">Ingredients do not all tolerate heat in the same way.</p>
      <p>So the order of tempering ingredients is not arbitrary. It is a practical way of exposing each ingredient to roughly the amount of heat it needs.</p>

      <h2>Why the order matters</h2>
      {/* The order is the subject of the classes: shown blurred, with the invitation on top. */}
      <div className="relative mt-6 overflow-hidden">
        <ul aria-hidden="true" className="pointer-events-none grid select-none gap-8 bg-parchment px-6 py-10 blur-[5px] sm:px-8">
          {ORDER.map((item, i) => (
            <li key={item.title}>
              <p className="font-serif text-xl font-semibold text-ink">
                <span className="mr-3 text-maroon">{String(i + 1).padStart(2, "0")}</span>
                {item.title}
              </p>
              <p className="mt-2 max-w-md text-base leading-relaxed">{item.body}</p>
            </li>
          ))}
        </ul>
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <aside className="w-full max-w-xl border-l-4 border-maroon bg-cream p-6 shadow-xl shadow-ink/15 sm:p-8">
            <p className="text-left font-serif text-2xl font-semibold">Want to know why the order is important?</p>
            <p className="mt-3 leading-relaxed text-ink/85">
              Live demo classes and online classes will show you exactly how: which ingredient goes in first, what to listen and look
              for, and when the next one is ready to follow.
            </p>
            <p className="mt-4">
              <Link href="/#classes" className="font-medium text-maroon underline decoration-maroon/40 underline-offset-[5px] hover:decoration-maroon">
                See the classes
              </Link>
            </p>
          </aside>
        </div>
      </div>

      {/* A side note, boxed, as the author asked. */}
      <aside className="mt-14 bg-parchment p-6 sm:p-8">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-maroon">A little chemistry on the side</p>
        <p className="mt-3 font-serif text-2xl font-semibold text-ink">Feel like doing a little chemistry, and the health benefits behind it?</p>
        <p className="mt-3 text-base leading-relaxed text-ink/80">All are used in small quantities, but they have big effects.</p>
        <dl className="mt-5 divide-y divide-line">
          {BENEFITS.map((row) => (
            <div key={row.name} className="grid gap-1 py-3 text-base sm:grid-cols-[9rem_1fr] sm:gap-4">
              <dt className="font-serif text-lg font-semibold text-ink">{row.name}</dt>
              <dd className="text-left leading-relaxed text-ink/80">{row.note}</dd>
            </div>
          ))}
        </dl>
      </aside>
    </>
  );
}

export const articles: Article[] = [
  {
    slug: "when-ingredients-meet-heat",
    title: "When Ingredients Meet Heat",
    eyebrow: "Flavour science · Tempering",
    excerpt:
      "Thaalippu, tadka, tempering: why mustard pops, dal turns nutty, curry leaves sizzle and hing goes from sharp to savoury, what the oil is doing, and why the order of the pan is not arbitrary.",
    cover: "/images/thalipu-tempering.webp",
    coverAlt:
      "Thalipu, the flavour science behind South Indian tempering: a line drawing of a spice box, bowls of seeds and dal, curry leaves, chillies and a pan of sizzling tempering",
    coverAspect: "aspect-[16/9]",
    coverZoom: true,
    readingTime: "5 min read",
    Body: TemperingBody,
  },
  {
    slug: "the-chemistry-behind-the-decoction",
    title: "The Chemistry Behind the Decoction",
    eyebrow: "Flavour science · Coffee",
    excerpt:
      "What happens between the roaster and the dabara: percolation, the Maillard reaction, chicory, and the four brewing variables that change a cup of South Indian filter coffee.",
    cover: "/images/caffeine-molecule.webp",
    coverAlt: "The structure of caffeine, a naturally occurring alkaloid in coffee",
    coverZoom: true,
    readingTime: "6 min read",
    Body: DecoctionBody,
  },
];

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}

// Articles open in a new tab, like newsletter issues. Spread this onto every link to an article.
export function articleLink(slug: string) {
  return { href: `/flavour-science/${slug}`, target: "_blank", rel: "noopener" } as const;
}
