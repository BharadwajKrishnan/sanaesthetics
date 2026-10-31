import type { PhotoTag } from "@/components/Artwork";

// Written recipes, one object each. Add a recipe here and it gets its own page at /recipes/<slug>.

// The sections of the recipes page, in the order they appear. Each recipe belongs to one.
export const recipeCategories = [
  { id: "main-dish", name: "Main Dish", description: "Gravies and kuzhambus to pour over a plate of rice." },
  { id: "festive-special", name: "Festive Special", description: "Dishes made for a festival or a special day." },
  { id: "side-dish", name: "Side Dish", description: "Roasts and stir-fries to eat alongside rice and gravy." },
] as const;

export type RecipeCategory = (typeof recipeCategories)[number]["id"];

export type Recipe = {
  slug: string;
  title: string;
  tamil?: string;
  category: RecipeCategory;
  eyebrow: string;
  summary: string;
  // The finished dish, shown on the recipe card and at the top of the recipe page. Until set, `photo` is used,
  // and until that is set an illustration is drawn instead.
  cover?: string;
  coverAlt?: string;
  // Who took the cover photo, when it is not ours. Shown under the picture, as the licence requires.
  coverCredit?: { by: string; source: string; sourceUrl: string; licence: string; licenceUrl: string };
  // Path under public/, e.g. "/images/vathakuzhambu-tamarind.webp". With `cover` set, this is a second picture on the
  // recipe page (for example the ingredients, with labels).
  photo?: string;
  photoAlt?: string;
  // Labels on the photo: a dot at the edge of the ingredient and the text in an empty spot, as percentages of its width and height.
  photoTags?: PhotoTag[];
  // A short, highlighted tip shown under the photo.
  tip?: string;
  // A stretch wrapped in ** is shown in bold.
  intro: string[];
  serve?: string;
  ingredients: { group: string; items: string[] }[];
  steps: string[];
  // The box under the method. `link` closes its last paragraph with a sentence linking to a flavour science article.
  ready: { title: string; body: string[]; link?: { text: string; articleSlug: string } };
  // The newsletter issue that talks about this dish, and why it is worth reading after the recipe.
  issueSlug?: string;
  readMore?: string;
};

export const recipes: Recipe[] = [
  {
    slug: "vathakuzhambu",
    title: "Vathakuzhambu",
    tamil: "வத்தக்குழம்பு",
    category: "main-dish",
    eyebrow: "Tamarind gravy · Tamil Nadu",
    summary:
      "A sour, spicy tamarind gravy made in sesame oil, with a spice powder that makes it lip-smacking and a pinch of jaggery to round out the edges.",
    cover: "/images/vathakuzhambu-bowl.webp",
    coverAlt: "Manathakkali vathakuzhambu in a brass vessel: a dark tamarind gravy with shallots, dried berries, red chillies and curry leaves, a plate of rice and appalam behind",
    photo: "/images/vathakuzhambu-tamarind.webp",
    photoAlt: "A block of tamarind and a bowl of sambar powder beside a ceramic jar",
    photoTags: [
      { label: "Sambar powder", at: { left: 60, top: 24 }, text: { left: 82, top: 14 } },
      { label: "Tamarind", at: { left: 72, top: 84 }, text: { left: 84, top: 92 } },
    ],
    tip: "Store tamarind in a ceramic jar. Tamarind is acidic and slowly reacts with metal, which gives it a metallic taste. Ceramic is inert, so the flavour stays clean.",
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
          "Vathal, or any vegetables of your choice",
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
      "Lower the heat slightly and add the vathal, or vegetables of your choice, followed by the sambar powder. Stir for only a few seconds so that the spices bloom in the oil without burning.",
      "Pour in the tamarind extract carefully and add salt.",
      "Bring the mixture to a boil, then reduce to medium-low heat and let it simmer uncovered for about 20 to 30 minutes.",
      "If it becomes too thick, add a little hot water. If it is still watery, continue simmering until it reaches a thick, pourable consistency.",
      "Some households add rice flour to thicken the kuzhambu, but it is purely optional.",
      "Let it rest for 15 to 30 minutes before serving if possible. The flavour usually becomes more rounded as it sits.",
    ],
    ready: {
      title: "How do you know it is ready?",
      body: [
        "The raw tamarind smell should be gone, the gravy should have reduced visibly, and a thin sheen of sesame oil should appear on top. The flavour should be sour and spicy, but not harsh.",
        "Taste once the kuzhambu has reduced. If the sourness feels very sharp, add the optional ½ teaspoon of jaggery. The jaggery should not make the dish taste sweet. It should simply round out the sourness and bitterness.",
      ],
    },
    issueSlug: "arusuvai-where-tradition-meets-taste",
    readMore: "Why does half a teaspoon of jaggery change this dish so much? Issue 1 looks at the six tastes and how a small adjustment rebalances a whole meal.",
  },
  {
    slug: "mangai-pachadi",
    title: "Mangai Pachadi",
    tamil: "மாங்காய் பச்சடி",
    category: "festive-special",
    eyebrow: "Raw mango relish · Tamil New Year",
    summary:
      "Raw mango simmered with jaggery, chilli and salt, finished with a mustard-seed tempering and a pinch of neem flowers: all six tastes in one bowl.",
    cover: "/images/mangai-pachadi-bowl.webp",
    coverAlt: "Mangai pachadi in a steel bowl: pieces of raw mango in a glossy jaggery sauce with mustard seeds, curry leaves and a red chilli, a whole raw mango beside it",
    intro: [
      "One amazing example of Arusuvai is mango pachadi. It is a special dish on Tamil New Year, eaten to embrace each flavour, as you would each flavour of your life.",
      "Mangai pachadi can bring together several taste experiences in one dish: sour from raw mango, sweet from jaggery, pungent from chilli, salty from salt, and in some versions bitter notes from neem flowers.",
      "Household versions vary, and that is what makes the recipe feel authentic rather than fixed.",
    ],
    serve: "Serve warm or at room temperature.",
    ingredients: [
      {
        group: "For the pachadi",
        items: [
          "1 medium raw mango, peeled and chopped",
          "3 to 4 tbsp jaggery, grated or powdered",
          "¼ tsp turmeric",
          "1 small green chilli, slit, or ¼ tsp chilli powder",
          "¼ tsp salt, or to taste",
          "½ to ¾ cup water, as needed",
        ],
      },
      {
        group: "For the tempering",
        items: ["1 tsp sesame oil or neutral oil", "½ tsp mustard seeds", "1 small pinch asafoetida", "6 to 8 curry leaves", "A small pinch of roasted neem flowers"],
      },
    ],
    steps: [
      "Cook the chopped raw mango with turmeric, chilli, salt and about ½ cup water over medium heat.",
      "Let it simmer until the mango softens but still holds some shape. Depending on the mango, this usually takes around 8 to 12 minutes.",
      "Add the jaggery and stir until it dissolves completely.",
      "Continue cooking for another 3 to 5 minutes, until the mixture looks glossy and lightly syrupy. Add a little more water if it becomes too thick.",
      "For the tempering, heat the oil in a small pan. Add the mustard seeds and let them splutter. Add the asafoetida and curry leaves, then pour the tempering over the pachadi.",
      "If using neem flowers, add only a very small amount. Their bitterness should sit in the background rather than dominate the dish.",
    ],
    ready: {
      title: "What to look for",
      body: [
        "The mango should be soft but not completely mashed. The jaggery should round out the mango’s sharp sourness, while the chilli and salt keep the dish lively.",
      ],
    },
    issueSlug: "arusuvai-where-tradition-meets-taste",
    readMore: "Why do Tamil kitchens put all six tastes in one bowl for the new year? Issue 1 looks at where that tradition and modern sensory science meet.",
  },
  {
    slug: "chettinad-urulai-roast",
    title: "Chettinad Urulai Roast",
    tamil: "உருளைக்கிழங்கு வறுவல்",
    category: "side-dish",
    eyebrow: "Potato roast · Chettinad",
    summary:
      "Boiled potatoes tossed in a freshly roasted, coarsely ground masala of red chilli, coriander, pepper and fennel, until the edges turn slightly crisp.",
    cover: "/images/chettinad-urulai-roast.webp",
    coverAlt: "Chettinad urulai roast in a brass bowl: cubes of potato coated in a coarse brown masala with mustard seeds, curry leaves and a dried red chilli",
    intro: ["For this recipe we first need a spice mix, which forms the base of a Chettinad urulai (potato) roast."],
    serve: "I normally serve it with piping hot rasam rice, or with curd rice (this can never go wrong 😛).",
    ingredients: [
      {
        group: "For the spice mix",
        items: ["2 dried red chillies", "1½ tsp coriander seeds", "1 tsp urad dal", "½ to 1 tsp black peppercorns", "½ tsp fennel seeds"],
      },
      {
        group: "For the potatoes",
        items: [
          "700 to 750 g baby potatoes or regular potatoes, boiled and cut into chunks",
          "2 to 3 tbsp sesame oil or neutral oil",
          "1 tsp mustard seeds",
          "10 to 12 curry leaves",
          "8 to 10 small shallots, sliced or halved",
          "¼ tsp turmeric",
          "Salt, as needed",
          "Coriander leaves, to finish",
        ],
      },
    ],
    steps: [
      "First boil the potatoes: not too soft, so that they can cook further in the pan.",
      "Meanwhile, dry-roast the ingredients for the spice mix on low heat until they smell warm and aromatic.",
      "Let them cool, then grind them coarsely. I prefer keeping a little texture rather than making a very fine powder.",
      "Heat the oil in a wide pan and add the mustard seeds. Once they begin to pop, add the curry leaves and shallots and cook until the shallots soften.",
      "Add the turmeric and boiled potatoes, season with salt, and toss everything well.",
      "Now add the freshly ground spice mix. Cook on low to medium heat for a few more minutes, turning the potatoes gently until the masala coats them and the edges start becoming slightly crisp.",
      "Finish with fresh coriander.",
    ],
    ready: {
      title: "How should it taste?",
      body: ["The final dish should be peppery, aromatic and slightly crisp on the outside, without the spices tasting burnt or overly bitter."],
    },
    issueSlug: "beyond-the-basics",
    readMore: "Pepper, fennel and coriander seeds all come out of the second spice box. Issue 3 opens it, and looks at why Chettinad cooking builds flavour in layers.",
  },
  {
    slug: "kathrikai-kondakadalai-pitlai",
    title: "Kathrikai Kondakadalai Pitlai",
    tamil: "கத்திரிக்காய் கொண்டைக்கடலை பிட்லை",
    category: "main-dish",
    eyebrow: "Tamarind and coconut gravy · Tamil Brahmin",
    summary:
      "Brinjal and white chickpeas simmered in tamarind, thickened with a roasted coconut-spice paste and finished with a sesame oil tempering.",
    intro: [
      "**Kathrikai Kondakadalai Pitlai** is my adapted version of a traditional Tamil Brahmin dish, often prepared for festive meals and special occasions. Like vathakuzhambu, it brings together a balance of tanginess, spice and richness. Tamarind provides acidity, chickpeas add body, brinjal absorbs the flavours, and coconut rounds everything off.",
      "Traditionally, pitlai is often prepared with black chickpeas and bitter gourd. In this modified version, I use white chickpeas for their accessibility and brinjal for its ability to absorb the flavours of tamarind, roasted spices and coconut, while retaining the essence of the original dish.",
    ],
    ingredients: [
      {
        group: "For the Pitlai",
        items: ["2 medium brinjals, cubed", "1 cup cooked white chickpeas", "Lemon-sized ball of tamarind", "½ tsp turmeric powder", "Salt to taste"],
      },
      {
        group: "To Roast and Grind",
        items: ["1 tbsp coriander seeds", "2 tsp chana dal", "1 tsp urad dal", "4 dried red chillies", "¼ cup grated coconut"],
      },
      {
        group: "For Tempering",
        items: ["1 tsp sesame oil", "½ tsp mustard seeds", "1 sprig curry leaves", "A pinch of asafoetida"],
      },
    ],
    steps: [
      "Soak the tamarind in warm water and extract about 2 cups of tamarind water.",
      "Dry roast the coriander seeds, chana dal, urad dal and dried red chillies until aromatic. Add the coconut and roast briefly. Cool and grind to a smooth paste with a little water.",
      "Cook the brinjal in the tamarind water with turmeric and salt until tender.",
      "Add the cooked chickpeas and simmer for 5 minutes.",
      "Stir in the ground coconut-spice paste. Add water if required to reach a thick, pourable consistency. Simmer gently for 8 to 10 minutes.",
      "Heat sesame oil in a small pan and temper with the ingredients listed under For Tempering. Pour the tempering over the pitlai. Serve hot.",
    ],
    ready: {
      title: "Food Lab Note 🌿",
      body: [
        "While sesame oil is my usual choice, I occasionally reach for coconut oil instead. The result is not simply a different aroma, but a different flavour experience altogether. It is a small kitchen experiment that reinforces a question I keep returning to:",
      ],
      link: { text: "how much does the choice of oil influence the way we perceive a dish?", articleSlug: "why-does-fat-carry-flavour" },
    },
  },
];

export const recipePromise = "I cook by instinct, but I test and measure the recipes here so you can reproduce them.";

export function getRecipe(slug: string) {
  return recipes.find((recipe) => recipe.slug === slug);
}

export function getCategory(id: RecipeCategory) {
  return recipeCategories.find((category) => category.id === id)!;
}

export function recipePath(slug: string) {
  return `/recipes/${slug}`;
}

// A recipe linked from inside an issue or article opens in a new tab, like the issues themselves. Spread this onto the link.
export function recipeLink(slug: string) {
  return { href: recipePath(slug), target: "_blank", rel: "noopener" } as const;
}
