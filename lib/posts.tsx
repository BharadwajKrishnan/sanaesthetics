import Link from "next/link";
import { HeroGarnish, type PhotoTag } from "@/components/Artwork";
import { articleLink } from "@/lib/articles";
import { Dabba } from "@/components/BrassDabba";
import { photos } from "@/lib/photos";
import { recipePath } from "@/lib/recipes";

// Newsletter issues, oldest first. Add one at the end and it gets its own page at /newsletter/<slug>.

export type Post = {
  slug: string;
  title: string;
  eyebrow: string;
  excerpt: string;
  cover?: string;
  coverAlt: string;
  // Labels on the cover photo: a dot at the edge of the ingredient and the text in an empty spot, as percentages of its width and height.
  coverTags?: PhotoTag[];
  // Drawn in place of the cover photo until there is one. Defaults to the thali.
  Cover?: () => React.ReactNode;
  readingTime: string;
  Body: () => React.ReactNode;
};

const SCIENCE = [
  { taste: "Sweet", how: "sugars bind to sweet taste receptors." },
  { taste: "Sour", how: "driven mainly by acidity and hydrogen ions." },
  { taste: "Salty", how: "sodium ions are central to salty taste perception." },
  { taste: "Bitter", how: "detected by a family of bitter taste receptors." },
  { taste: "Pungent", how: "capsaicin in chilli activates TRPV1 receptors; piperine in black pepper stimulates chemesthetic pathways." },
  { taste: "Astringent", how: "often linked to polyphenols interacting with salivary proteins, creating that dry, puckering sensation." },
];

function RecipeLink({ slug, children }: { slug: string; children: string }) {
  return (
    <Link href={recipePath(slug)} className="font-medium text-maroon underline decoration-maroon/40 underline-offset-[5px] hover:decoration-maroon">
      {children}
    </Link>
  );
}

function ArusuvaiBody() {
  return (
    <>
      <p>Arusuvai means “six tastes” in Tamil. Traditionally, these six are:</p>
      <p className="font-serif text-2xl font-semibold text-maroon">Sweet • Sour • Salty • Bitter • Pungent • Astringent</p>
      <p>
        This concept of Arusuvai is deeply rooted in Tamil food traditions and reflected on Tamil New Year&apos;s Day, which falls
        around the 14th of April every year.
      </p>

      <h2>Where tradition meets science</h2>
      <p>
        What I find especially interesting is that traditional ideas such as Arusuvai and modern sensory science do not always
        describe these sensations in exactly the same way.
      </p>
      <p>Sweet, sour, salty and bitter are considered basic tastes in modern sensory science.</p>
      <p>
        Pungency, such as the heat from chilli or pepper, is experienced differently — it is linked more closely to the way certain
        compounds stimulate heat and pain receptors.
      </p>
      <p>Astringency is also different. It is often experienced as a dry, puckering sensation in the mouth rather than as a basic taste.</p>
      <p>And yet, in a meal, we experience all of these sensations together.</p>

      <aside className="my-10 bg-parchment p-6 sm:p-8">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-maroon">The science, in brief</p>
        <dl className="mt-4 divide-y divide-line">
          {SCIENCE.map((row) => (
            <div key={row.taste} className="grid gap-1 py-3 sm:grid-cols-[7rem_1fr] sm:gap-4">
              <dt className="font-serif text-lg font-semibold">{row.taste}</dt>
              <dd className="leading-relaxed text-ink/80">{row.how}</dd>
            </div>
          ))}
        </dl>
      </aside>

      <p>
        A beautiful example of Arusuvai is <RecipeLink slug="mangai-pachadi">mangai pachadi</RecipeLink>, made with raw mango.
      </p>
      <p>
        The raw mango brings sourness. Jaggery adds sweetness. Chilli contributes pungency. Salt balances the dish. In some
        traditional versions, neem flowers introduce bitterness.
      </p>
      <p>
        What makes the dish interesting is not simply that several tastes are present, but that they are brought together in a way
        that creates a much more complex experience than any one of them could provide alone.
      </p>
      <p>
        Although when we speak about Arusuvai, it does not necessarily mean that every dish — or even every meal — must contain all
        six tastes in equal measure.
      </p>
      <p className="font-serif text-2xl font-medium">For me, Arusuvai is all about balance.</p>
      <p>
        A small amount of one taste can soften another. A touch of sweetness can round out sourness. Bitterness can add depth.
        Pungency can lift an otherwise mild dish. Salt can bring different flavours together.
      </p>
      <p>
        It is less about ticking off six categories and more about understanding how different tastes can support, contrast and
        complement one another without one overpowering the whole meal.
      </p>
      <p>
        Another example is <RecipeLink slug="vathakuzhambu">vathakuzhambu</RecipeLink>.
      </p>
      <p>
        This is a dish that can be strongly sour and pungent, often driven by tamarind, chilli and spices. Fenugreek or certain
        vathal can introduce bitterness, while salt gives structure to the overall flavour.
      </p>
      <p>
        In some recipes, a small amount of jaggery is added — not to make the dish sweet, but to soften and round out the sharper
        edges.
      </p>
      <p>That tiny amount can completely change how the dish is perceived.</p>
      <p>
        This is what fascinates me about South Indian cooking: sometimes balance comes not from equal quantities, but from small
        adjustments that change the entire experience of a dish.
      </p>

      <h2>Why Arusuvai?</h2>
      <p>I wanted to begin with Arusuvai because it represents what I hope to explore through this space.</p>
      <p>
        South Indian cooking is not only about recipes. It is about ingredients, balance, memory, technique and the small decisions
        that shape flavour.
      </p>
      <p>Sometimes I will look at the chemistry behind an ingredient.</p>
      <p>Sometimes I will look at the story behind a traditional recipe.</p>
      <p>And sometimes, as with Arusuvai, I want to look at where traditional knowledge and modern flavour science meet.</p>
      <p>
        Traditional food knowledge often describes how a meal feels as a whole, while science allows us to look more closely at what
        is happening in the mouth, on the tongue and in the nervous system.
      </p>
      <p>For me, neither replaces the other. That is where this journey begins.</p>
    </>
  );
}

const BIG_FIVE = [
  { name: "Mustard seeds", note: "One of the first ingredients that comes to mind when I think of tempering. Their popping sound is almost a signal that the cooking has begun." },
  { name: "Cumin seeds", note: "Warm, earthy and aromatic. I use them in several everyday preparations where I want a softer spice note." },
  { name: "Urad dal", note: "Apart from flavour, urad dal gives a lovely toasted nuttiness and a slight crunch when used in tempering." },
  { name: "Chana dal", note: "Another ingredient I love for its nutty flavour and texture, especially when it turns golden in hot oil." },
  { name: "Fenugreek seeds", note: "Used in much smaller quantities, but incredibly distinctive. A little can add depth and pleasant bitterness; too much can easily dominate." },
];

const SECOND_BOX = ["Turmeric powder", "Chilli powder", "Coriander powder", "Byadagi chilli powder", "Black and white sesame seeds", "Cardamom"];

// Issue 2: the photographed spice box among leaves, chillies and seeds.
function AnjarapettiCover() {
  return (
    <>
      <HeroGarnish />
      <Dabba sizes="(min-width: 1024px) 24rem, (min-width: 640px) 20rem, 60vw" className="absolute left-1/2 top-1/2 w-[72%] -translate-x-1/2 -translate-y-1/2" />
    </>
  );
}

function AnjarapettiBody() {
  return (
    <>
      <p>I would rather call this “Inside My Anjarapetti” 😉 because every kitchen has its own story.</p>
      <p>
        The word Anjarapetti literally refers to a spice box with five compartments, although over the years many of us have come
        to use boxes with six or seven compartments depending on what we cook most often.
      </p>
      <p>For me, it is simply a convenient home for the spices, seeds and lentils I reach for almost every day.</p>
      <p>
        These ingredients often come together in thaalipu / tadka /{" "}
        <a {...articleLink("when-ingredients-meet-heat")} className="font-medium text-maroon underline decoration-maroon/40 underline-offset-[5px] hover:decoration-maroon">
          tempering
        </a>{" "}
        — one of the most familiar techniques in South Indian cooking. Not every dish is tempered in the same way, and not every ingredient is used each time, but each one can contribute
        something different: aroma, nuttiness, bitterness, texture or warmth.
      </p>

      <h3>The Big Five</h3>
      <dl className="mt-6 divide-y divide-line border-y border-line">
        {BIG_FIVE.map((row) => (
          <div key={row.name} className="grid gap-1 py-4 sm:grid-cols-[9rem_1fr] sm:gap-5">
            <dt className="font-serif text-xl font-semibold text-maroon">{row.name}</dt>
            <dd className="leading-relaxed text-ink/80">{row.note}</dd>
          </div>
        ))}
      </dl>
      <p>And, of course, tempering does not stop with what is inside the box.</p>
      <p>
        Curry leaves, dried red chillies and hing (asafoetida) are three ingredients I often reach for as well. They bring their own
        powerful aromas and can completely change the character of a dish.
      </p>

      <h3>And then there is the second box...</h3>
      <p>What can I say — one box is never quite enough.</p>
      <p>I also keep another box with ingredients I use often for different kinds of dishes:</p>
      <ul className="mt-6 grid gap-2 sm:grid-cols-2">
        {SECOND_BOX.map((item) => (
          <li key={item} className="flex items-baseline gap-3 font-serif text-xl">
            <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-brass" />
            {item}
          </li>
        ))}
      </ul>
      <p>
        Sesame seeds may not technically be a masala, but they appear often enough in my cooking to deserve their own permanent
        place. I especially love the way their flavour changes when toasted, becoming deeper and nuttier.
      </p>
      <p>
        Cardamom is something I reach for less frequently, but for certain sweets, festive dishes and aromatic preparations, it is
        indispensable.
      </p>

      <h3>More than just a spice box</h3>
      <p>What I like most about an Anjarapetti is that it quietly reflects the way a household cooks.</p>
      <p>Someone else’s box may look completely different from mine — and that is exactly the point.</p>
      <p>
        The ingredients we keep closest to hand say something about the dishes we make often, the flavours we grew up with, and the
        habits we carry into our own kitchens.
      </p>
      <p className="font-serif text-2xl font-medium">So this is not the Anjarapetti. It is my Anjarapetti.</p>
      <p>And perhaps that little box tells more of my cooking story than I realised.</p>
    </>
  );
}

export const posts: Post[] = [
  {
    slug: "arusuvai-where-tradition-meets-taste",
    title: "Arusuvai — Where Tradition Meets Taste",
    eyebrow: "Issue 1",
    excerpt:
      "Tamil kitchens counted six tastes long before anyone drew a molecule. Where the old idea and modern sensory science agree, where they part ways, and why balance matters more than a checklist.",
    cover: photos.issue1,
    coverAlt: "Arusuvai poster, the six tastes in Tamil food tradition",
    readingTime: "5 min read",
    Body: ArusuvaiBody,
  },
  {
    slug: "inside-the-anjarapetti",
    title: "Inside the Anjarapetti",
    eyebrow: "Issue 2",
    excerpt:
      "A spice box with five compartments, and the seeds, dals and powders that live in mine. What goes into a tempering, why one box is never enough, and what the box you keep closest to hand says about the way you cook.",
    cover: "/images/anjarapetti-issue-2.webp",
    coverAlt:
      "An open brass anjarapetti with chana dal, cumin seeds, fenugreek seeds, mustard seeds and urad dal, beside curry leaves, dried red chillies and a jar of hing",
    coverTags: [
      { label: "Chana dal", at: { left: 41, top: 11 }, text: { left: 17, top: 8 } },
      { label: "Cumin seeds", at: { left: 34, top: 28 }, text: { left: 14, top: 26 } },
      { label: "Fenugreek seeds", at: { left: 70, top: 29 }, text: { left: 83, top: 20 } },
      { label: "Mustard seeds", at: { left: 49, top: 51 }, text: { left: 56, top: 59 } },
      { label: "Urad dal", at: { left: 82, top: 49 }, text: { left: 89, top: 57 } },
      { label: "Curry leaves", at: { left: 22, top: 50 }, text: { left: 25, top: 43 } },
      { label: "Dried red chillies", at: { left: 69, top: 82 }, text: { left: 80, top: 89 } },
      { label: "Hing", at: { left: 32, top: 84 }, text: { left: 49, top: 87 } },
    ],
    Cover: AnjarapettiCover,
    readingTime: "3 min read",
    Body: AnjarapettiBody,
  },
];

export const latestPost = posts[posts.length - 1];

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function postPath(slug: string) {
  return `/newsletter/${slug}`;
}

// Issues always open in a new tab. Spread this onto every link that opens an issue.
export function issueLink(slug: string) {
  return { href: postPath(slug), target: "_blank", rel: "noopener" } as const;
}
