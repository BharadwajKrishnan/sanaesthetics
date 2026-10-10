import Link from "next/link";
import { photos } from "@/lib/photos";
import { recipePath } from "@/lib/recipes";

// Newsletter issues. Add one here and it gets its own page at /newsletter/<slug>.

export type Post = {
  slug: string;
  title: string;
  eyebrow: string;
  excerpt: string;
  cover?: string;
  coverAlt: string;
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
];

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
