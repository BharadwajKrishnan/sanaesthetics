import Image from "next/image";
import Link from "next/link";

// Flavour science articles. Add one here and it gets its own page at /flavour-science/<slug>.

export type Article = {
  slug: string;
  title: string;
  eyebrow: string;
  excerpt: string;
  cover?: string;
  coverAlt: string;
  readingTime: string;
  Body: () => React.ReactNode;
};

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
        <Image src="/images/filter-coffee-sketches.webp" alt="Line drawings of a South Indian coffee filter, dabara and tumbler, and decoction being poured" width={1400} height={1050} sizes="(min-width: 1024px) 48rem, 90vw" className="w-full rounded-sm" />
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
        <Image src="/images/roasting-chemistry.webp" alt="Roasting chemistry: sugars and amino compounds plus heat drive the Maillard reaction, giving brown colour, roasted aroma and deeper flavour" width={1400} height={1050} sizes="(min-width: 1024px) 48rem, 90vw" className="w-full rounded-sm" />
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

export const articles: Article[] = [
  {
    slug: "the-chemistry-behind-the-decoction",
    title: "The Chemistry Behind the Decoction",
    eyebrow: "Flavour science · Coffee",
    excerpt:
      "What happens between the roaster and the dabara: percolation, the Maillard reaction, chicory, and the four brewing variables that change a cup of South Indian filter coffee.",
    cover: "/images/caffeine-molecule.webp",
    coverAlt: "The structure of caffeine, a naturally occurring alkaloid in coffee",
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
