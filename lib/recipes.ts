// Written recipes, one object each. Add a recipe here and it gets its own page at /recipes/<slug>.

export type Recipe = {
  slug: string;
  title: string;
  tamil?: string;
  eyebrow: string;
  summary: string;
  // Path under public/, e.g. "/images/vathakuzhambu.webp". Until set, an illustration is drawn instead.
  photo?: string;
  intro: string[];
  serve: string;
  ingredients: { group: string; items: string[] }[];
  steps: string[];
  ready: { title: string; body: string[] };
};

export const recipes: Recipe[] = [
  {
    slug: "vathakuzhambu",
    title: "Vathakuzhambu",
    tamil: "வத்தக்குழம்பு",
    eyebrow: "Tamarind gravy · Tamil Nadu",
    summary:
      "A sour, spicy tamarind gravy made in sesame oil, with a spice powder that makes it lip-smacking and a pinch of jaggery to round out the edges.",
    intro: [
      "Vathakuzhambu is a much cherished food in South Indian homes and will be slurped in no time.",
      "It is a tamarind-based gravy made traditionally with gingelly or sesame oil, and it is known for its longer shelf life.",
      "In earlier times, people used to dry vegetables like sundakkai (turkey berry) or manathakkali (black nightshade berries). These dried vathal are used in the gravy and give it a very distinct flavour.",
      "Apart from these, a spice powder is made which makes the dish lip-smacking.",
    ],
    serve: "Vathakuzhambu is paired with piping hot rice. Accompaniments could include appalam and any type of poriyal.",
    ingredients: [
      {
        group: "For the tamarind extract",
        items: ["A lemon-sized ball of tamarind", "Hot water, as needed, to soak the tamarind"],
      },
      {
        group: "For the kuzhambu",
        items: [
          "4 tbsp sesame oil",
          "1 tsp mustard seeds",
          "1 tsp fenugreek seeds",
          "10 to 12 curry leaves",
          "1 pinch asafoetida (hing)",
          "2 tbsp sambar powder",
          "Salt and water, as required",
          "½ tsp jaggery (optional)",
        ],
      },
    ],
    steps: [
      "Soak the tamarind in hot water for about 15 to 20 minutes. Squeeze it well and extract the tamarind water. You want roughly 2 to 2½ cups of fairly strong tamarind extract to begin with.",
      "Heat the sesame oil in a kadai or heavy-bottomed pan over medium heat.",
      "Add the mustard seeds and allow them to splutter. Add the fenugreek seeds and let them turn slightly golden and aromatic. Be careful not to darken them too much, as fenugreek can become bitter very quickly.",
      "Add the curry leaves and asafoetida. Let them sizzle briefly.",
      "Lower the heat slightly and add the sambar powder. Stir for only a few seconds so that the spices bloom in the oil without burning.",
      "Pour in the tamarind extract carefully and add salt.",
      "Bring the mixture to a boil, then reduce to medium-low heat and let it simmer uncovered for about 20 to 30 minutes.",
      "If it becomes too thick, add a little hot water. If it is still watery, continue simmering until it reaches a thick, pourable consistency.",
      "Let it rest for 15 to 30 minutes before serving if possible. The flavour usually becomes more rounded as it sits.",
    ],
    ready: {
      title: "How do you know it is ready?",
      body: [
        "The raw tamarind smell should be gone, the gravy should have reduced visibly, and a thin sheen of sesame oil should appear on top. The flavour should be sour and spicy, but not harsh.",
        "Taste once the kuzhambu has reduced. If the sourness feels very sharp, add the optional ½ teaspoon of jaggery. The jaggery should not make the dish taste sweet. It should simply round out the sourness and bitterness.",
      ],
    },
  },
];

export const recipePromise = "I cook by instinct, but I test and measure the recipes here so you can reproduce them.";

export function getRecipe(slug: string) {
  return recipes.find((recipe) => recipe.slug === slug);
}

export function recipePath(slug: string) {
  return `/recipes/${slug}`;
}
