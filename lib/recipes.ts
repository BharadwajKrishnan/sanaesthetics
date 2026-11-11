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
  // The second picture is shown 4:5 like the cover, unless it is a tall one.
  photoAspect?: "2/3";
  // Labels on the photo: a dot at the edge of the ingredient and the text in an empty spot, as percentages of its width and height.
  photoTags?: PhotoTag[];
  // A stretch wrapped in ** is shown in bold.
  intro: string[];
  serve?: string;
  // How many the recipe feeds and how long it takes, shown under the story. Every recipe gives the two times and
  // either `serves` (a number the reader can scale from) or, for something made rather than served, `makes`.
  serves?: string;
  makes?: string;
  prepTime: string;
  cookTime: string;
  ingredients: { group: string; items: string[] }[];
  // Plain steps, without a bold label in front: the numbers do that job.
  steps: string[];
  // The "Kitchen tips" box under the method, the same on every recipe. `tipsLink` closes the last tip with a sentence
  // linking to a flavour science article.
  tips: string[];
  tipsLink?: { text: string; articleSlug: string };
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
    photoAspect: "2/3",
    photoTags: [
      { label: "Sambar powder", at: { left: 60, top: 24 }, text: { left: 82, top: 14 } },
      { label: "Tamarind", at: { left: 72, top: 84 }, text: { left: 84, top: 92 } },
    ],
    intro: [
      "Vathakuzhambu is a much cherished food in South Indian homes and will be slurped in no time.",
      "It is a tamarind-based gravy made traditionally with gingelly or sesame oil, and it is known for its longer shelf life.",
      "In earlier times, people used to dry vegetables like sundakkai (turkey berry) or manathakkali (black nightshade berries). These dried vathal are used in the gravy and give it a very distinct flavour.",
      "Apart from these, a spice powder is made which makes the dish lip-smacking.",
    ],
    serve: "Vathakuzhambu is paired with piping hot rice. Accompaniments could include appalam and any type of poriyal.",
    serves: "4",
    prepTime: "20 minutes",
    cookTime: "30 to 40 minutes",
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
      "Let it rest for 15 to 30 minutes before serving if possible. The flavour usually becomes more rounded as it sits.",
    ],
    tips: [
      "It is ready when the raw tamarind smell has gone, the gravy has reduced visibly and a thin sheen of sesame oil appears on top. The flavour should be sour and spicy, but not harsh.",
      "Taste once the kuzhambu has reduced. If the sourness feels very sharp, add the optional ½ teaspoon of jaggery. It should not make the dish taste sweet, only round out the sourness and bitterness.",
      "Some households add rice flour to thicken the kuzhambu, but it is purely optional.",
      "Store tamarind in a ceramic jar. Tamarind is acidic and slowly reacts with metal, which gives it a metallic taste. Ceramic is inert, so the flavour stays clean.",
    ],
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
    serves: "4",
    prepTime: "10 minutes",
    cookTime: "15 to 20 minutes",
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
    ],
    tips: [
      "The mango should be soft but not completely mashed. The jaggery should round out the mango’s sharp sourness, while the chilli and salt keep the dish lively.",
      "If using neem flowers, add only a very small amount. Their bitterness should sit in the background rather than dominate the dish.",
    ],
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
    serves: "4",
    prepTime: "15 minutes",
    cookTime: "30 minutes",
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
    tips: [
      "The final dish should be peppery, aromatic and slightly crisp on the outside, without the spices tasting burnt or overly bitter.",
      "Grind the spice mix coarsely rather than to a fine powder: a little texture is what makes the roast.",
    ],
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
    cover: "/images/kathrikai-kondakadalai-pitlai.webp",
    coverAlt: "Kathrikai kondakadalai pitlai in a steel bowl, seen from above: a thick golden gravy with pieces of brinjal, chickpeas, mustard seeds and curry leaves",
    intro: [
      "**Kathrikai Kondakadalai Pitlai** is my adapted version of a traditional Tamil Brahmin dish, often prepared for festive meals and special occasions. Like vathakuzhambu, it brings together a balance of tanginess, spice and richness. Tamarind provides acidity, chickpeas add body, brinjal absorbs the flavours, and coconut rounds everything off.",
      "Traditionally, pitlai is often prepared with black chickpeas and bitter gourd. In this modified version, I use white chickpeas for their accessibility and brinjal for its ability to absorb the flavours of tamarind, roasted spices and coconut, while retaining the essence of the original dish.",
    ],
    serves: "4",
    prepTime: "20 minutes",
    cookTime: "25 to 30 minutes",
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
    tips: [
      "Add water a little at a time after the coconut paste goes in. The pitlai should be thick but still pourable.",
      "While sesame oil is my usual choice, I occasionally reach for coconut oil instead. The result is not simply a different aroma, but a different flavour experience altogether. It is a small kitchen experiment that reinforces a question I keep returning to:",
    ],
    tipsLink: { text: "how much does the choice of oil influence the way we perceive a dish?", articleSlug: "why-does-fat-carry-flavour" },
  },
  {
    slug: "orange-peel-pachadi",
    title: "Orange Peel Pachadi",
    tamil: "ஆரஞ்சு தோல் பச்சடி",
    category: "main-dish",
    eyebrow: "Citrus peel in tamarind · Winter special",
    summary:
      "Finely chopped clementine peel simmered in a sesame oil and tamarind gravy, the way a vathakuzhambu is made, with jaggery at the end to balance the bitterness.",
    cover: "/images/orange-peel-pachadi.webp",
    coverAlt: "Orange peel pachadi in an iron kadai, seen from above: pieces of clementine peel in a glossy, dark tamarind gravy with mustard seeds, green chillies and curry leaves",
    photo: "/images/orange-peel-pachadi-peel.webp",
    photoAlt: "Clementine peel, finely chopped, in a heap on a green chopping board",
    photoTags: [{ label: "Clementine peel, finely chopped", at: { left: 52, top: 88 }, text: { left: 52, top: 95 } }],
    intro: [
      "**Orange Thol Pachadi** is a seasonal dish that I make quite often during the winter months in Germany. Oranges are at their best through the winter season, and this recipe is a lovely way to make use of them. For this version, I have used clementines.",
      "The preparation is quite similar to making a vathakuzhambu. However, the addition of jaggery towards the end brings a gentle sweetness that balances the flavours. And with sesame oil forming the base, this is one of those dishes where you might not want to skip or substitute the traditional ingredients!",
    ],
    serve: "This pachadi also tastes good cold, keeps for a while, and tastes best with curd rice.",
    serves: "4",
    prepTime: "15 minutes",
    cookTime: "20 to 25 minutes",
    ingredients: [
      {
        group: "For the tamarind extract",
        items: ["About 1 tbsp tamarind", "1 cup warm water, to soak the tamarind"],
      },
      {
        group: "For the pachadi",
        items: [
          "Peel of 3 clementines, finely chopped",
          "1½ tbsp gingelly (sesame) oil",
          "½ tsp mustard seeds",
          "¼ tsp fenugreek seeds",
          "2 green chillies, slit lengthwise",
          "1 sprig curry leaves",
          "A pinch of asafoetida (hing)",
          "¼ tsp turmeric powder",
          "1½ tsp sambar podi",
          "Salt, to taste",
          "1 to 2 tsp jaggery, according to taste",
        ],
      },
    ],
    steps: [
      "Wash the clementines thoroughly. Remove the peel and chop it finely. If the white pith is particularly thick, scrape away some of it. Blanch the chopped peel in boiling water for 3 to 4 minutes, then drain.",
      "Soak the tamarind in the warm water and squeeze out the extract.",
      "Heat the gingelly oil in a kadai. Add the mustard seeds and let them splutter. Add the fenugreek seeds, followed by the green chillies, curry leaves and asafoetida.",
      "Add the chopped clementine peel and sauté for a few minutes until it softens slightly.",
      "Add the turmeric powder and sambar podi. Stir briefly over low heat so the spice powder does not burn.",
      "Pour in the tamarind extract and add salt. Bring to a gentle boil, then simmer for 12 to 15 minutes, or until the peel is tender and the kuzhambu begins to thicken.",
      "Add the jaggery and simmer for another 2 to 3 minutes. Adjust the consistency with a little water if needed. The finished kuzhambu should be glossy and thick, similar to vathakuzhambu.",
      "Allow it to rest for a few minutes before serving. The flavours deepen as it sits.",
    ],
    tips: [
      "Clementine peel has a natural bitterness, so adjust the jaggery to balance the tamarind and spice.",
      "For recipes using citrus peel, choose fruit explicitly labelled as suitable for eating with the peel, and check any post-harvest treatment information. Wash thoroughly; washing alone does not guarantee that treated peel is suitable for cooking.",
    ],
  },
  {
    slug: "homemade-ghee",
    title: "Homemade Ghee",
    tamil: "நெய்",
    category: "festive-special",
    eyebrow: "Clarified butter · Every festive kitchen",
    summary:
      "Unsalted butter simmered gently until the water has gone and the milk solids turn golden and nutty: a jar of golden, fragrant ghee from the simplest of ingredients.",
    cover: "/images/homemade-ghee.webp",
    coverAlt: "Homemade ghee in a steel vessel, seen from above: clear golden fat with the browned milk solids settled beneath it",
    intro: [
      "Homemade ghee has a lovely aroma that fills the kitchen. Made by slowly heating butter, it is a simple process that transforms ordinary butter into golden, fragrant ghee.",
    ],
    makes: "About 180 to 200 g",
    prepTime: "5 minutes",
    cookTime: "15 to 20 minutes",
    ingredients: [
      {
        group: "For the ghee",
        items: ["250 g unsalted butter (Süßrahmbutter or mildgesäuerte Butter: both can be used)"],
      },
    ],
    steps: [
      "Cut the butter into big cubes and place it in a heavy-bottomed pan.",
      "Melt it over low to medium-low heat.",
      "Allow it to simmer gently. It will foam and bubble as the water evaporates.",
      "Continue cooking until the milk solids settle at the bottom and turn light golden brown. The bubbling will become quieter, and a nutty aroma will develop.",
      "Switch off the heat as soon as the solids are golden. Be careful not to let them burn.",
      "Allow it to settle briefly.",
      "If you like, strain the clear golden ghee through a fine sieve or muslin cloth into a clean, completely dry jar.",
      "Let it cool before closing the jar.",
    ],
    tips: [
      "The key to good ghee is patience. Gentle heat allows the water to evaporate and the milk solids to develop their characteristic nutty aroma.",
    ],
    issueSlug: "oils-i-reach-for",
    readMore: "Ghee is the one jar in the cupboard that is not an oil at all. Issue 4 lines up the five oils beside it and looks at when the fat you cook in becomes part of what you taste.",
  },
  {
    slug: "vellai-appam",
    title: "Vellai Appam",
    tamil: "வெள்ளை அப்பம்",
    category: "festive-special",
    eyebrow: "Rice and urad dal fritters · Diwali",
    summary: "A festive South Indian snack made from rice and urad dal, traditionally prepared during Diwali and other special occasions.",
    cover: "/images/vellai-appam.webp",
    coverAlt: "Vellai appam in a round bowl: pale golden fritters of rice and urad dal batter, flecked with green chilli and curry leaf",
    intro: [
      "For me, Diwali and Vellai Appam belong together.",
      "Long before the sweets are opened and the savoury snacks are arranged, I find myself looking forward to the batch of Vellai Appam made by my mother. Crisp at the edges, soft within, and best enjoyed fresh from the kitchen, it is one of those festive foods that immediately signals celebration.",
      "Vellai Appam is a traditional South Indian snack prepared from rice and urad dal and is commonly made during Diwali. While the recipe remains largely similar across households, the way it is served often differs. These small variations are part of what makes festive recipes so personal.",
    ],
    serves: "4",
    prepTime: "20 minutes, plus 3 to 4 hours soaking and a night to ferment",
    cookTime: "30 minutes",
    ingredients: [
      {
        group: "For the batter",
        items: ["1 cup raw rice", "½ cup urad dal", "Water, as required", "¾ tsp salt"],
      },
      {
        group: "For the tempering",
        items: [
          "2 tsp oil",
          "1 tsp mustard seeds",
          "½-inch piece of ginger, finely chopped",
          "2 green chillies, finely chopped",
          "1 tsp whole black pepper",
          "10 curry leaves",
          "3 tbsp grated coconut",
          "1 tbsp chopped cilantro (optional)",
        ],
      },
      {
        group: "To fry",
        items: ["Oil, for deep frying"],
      },
    ],
    steps: [
      "Soak the rice and urad dal separately for 3 to 4 hours.",
      "Grind both to a smooth batter, using enough water to achieve a thick consistency, similar to medu vada batter.",
      "Traditionally, the batter is prepared the day before and left overnight to ferment.",
      "The next day, add the salt to the batter and mix well.",
      "Just before serving, heat the 2 tsp of oil in a small pan and add the mustard seeds. Once they begin to splutter, add the ginger, green chillies, pepper and curry leaves, and cook briefly until fragrant.",
      "Add the tempered mixture to the batter, along with the grated coconut and the cilantro, if using. Mix thoroughly.",
      "Heat oil for deep frying. Using a ladle or deep spoon, carefully pour portions of batter into the hot oil.",
      "Fry over medium heat until golden brown and crisp. Drain on absorbent paper and repeat with the remaining batter.",
    ],
    tips: [
      "The batter should be thick, like a medu vada batter, so that each ladleful holds together in the oil.",
      "Temper the batter and mix in the coconut only just before frying, so the appams go to the table fresh from the kitchen.",
    ],
  },
  {
    slug: "paruppu-poli",
    title: "Paruppu Poli",
    tamil: "பருப்பு போளி",
    category: "festive-special",
    eyebrow: "Sweet stuffed flatbread · Festive sweet",
    summary:
      "A thin maida flatbread wrapped around a filling of chana dal and jaggery, scented with cardamom and cooked on the tawa with ghee until the edges turn lightly crisp.",
    cover: "/images/paruppu-poli.webp",
    coverAlt: "Paruppu poli in a white square bowl: thin golden flatbreads with browned spots, folded over one another",
    intro: [
      "**Paruppu Poli**, which translates to stuffed flatbread, is a festive sweet enjoyed across many parts of South India. The word puranam refers to the filling enclosed within the thin outer dough, while poli refers to the flatbread itself.",
      "Over generations, families have developed their own variations of the filling, while the dough has remained largely unchanged. Across India, similar preparations exist under different names, each reflecting regional ingredients and traditions, yet sharing the same idea of a soft flatbread wrapped around a sweet filling.",
      "The dough is traditionally made with maida, which gives it the elasticity needed to stretch around the filling without tearing. The puranam can be prepared in several ways, commonly using chana dal, coconut or even condensed milk, combined with jaggery for sweetness. Once filled and rolled, the poli is cooked on a hot tawa with ghee until lightly golden, with delicate crispness developing around the edges.",
      "I use coconut almost every day in my kitchen, whether in chutneys, curries or desserts. For a change, I chose to make Paruppu Poli this time, using chana dal as the filling instead. It offers a different kind of richness, one that comes from the combination of dal and jaggery rather than coconut.",
    ],
    serve: "Serve warm.",
    serves: "4",
    prepTime: "40 minutes, plus 2 hours for soaking the dal and resting the dough",
    cookTime: "30 minutes",
    ingredients: [
      {
        group: "For the puranam (filling)",
        items: ["1 cup chana dal", "¾ cup grated jaggery, adjusted to taste", "¼ tsp cardamom powder", "1 tsp ghee"],
      },
      {
        group: "For the dough",
        items: ["1 cup maida", "1 tbsp oil", "A pinch of turmeric (optional, for colour)", "¼ tsp salt", "Water, as required", "2 tbsp oil, for resting the dough"],
      },
      {
        group: "To cook",
        items: ["Ghee, for the tawa"],
      },
    ],
    steps: [
      "For the dough, mix the maida, salt and turmeric. Add water gradually and knead into a soft dough, then add the 1 tbsp of oil and knead again.",
      "Rest the dough in a bowl coated with the 2 tbsp of oil for at least 2 hours.",
      "For the puranam, wash and soak the chana dal for 2 hours. Cook it until soft but not mushy, and drain any excess water completely.",
      "Grind the cooked chana dal to a coarse paste, without adding any more water.",
      "In a pan, melt the jaggery with a few tablespoons of water. Strain if necessary to remove impurities.",
      "Add the ground chana dal to the jaggery syrup and mix well. Cook over a low flame, stirring continuously, until the mixture thickens and begins to leave the sides of the pan.",
      "Add the cardamom powder and mix until evenly incorporated. Remove from the heat and allow the mixture to cool completely, then divide the filling into equal-sized balls and set aside.",
      "Divide the dough into equal portions. Flatten a dough ball, place a puranam ball in the centre, seal, and gently roll into a thin disc.",
      "Heat a tawa and cook each poli on both sides, applying a little ghee, until lightly golden. Serve warm.",
    ],
    tips: [
      "The puranam is ready when it holds its shape easily and no longer sticks noticeably to the sides of the pan.",
      "If the filling is too soft, it may break through the dough while rolling. If it is too dry, the poli can become difficult to stretch evenly.",
    ],
  },
  {
    slug: "ribbon-pakoda",
    title: "Ribbon Pakoda",
    tamil: "ரிப்பன் பக்கோடா",
    category: "festive-special",
    eyebrow: "Rice and gram flour snack · Diwali",
    summary: "Crisp, light and quietly addictive, Ribbon Pakoda is one of those festive snacks that remain in the tin long after Diwali has passed.",
    cover: "/images/ribbon-pakoda.webp",
    coverAlt: "Ribbon pakoda in a wire frying basket on a tray: crisp golden ribbons of rice and gram flour",
    intro: [
      "Now we come to the savoury side of the festive table, because no South Indian celebration ever feels complete without it.",
      "I have surprisingly little experience using the murukku soppu, the traditional press used to shape many South Indian snacks. Yet it is a piece of equipment that seems to exist in almost every household, often in multiple sizes and designs, passed down through generations along with the recipes themselves.",
      "Of all the festive snacks, **Ribbon Pakoda** always felt like the most approachable one, at least to me. Made from a simple combination of rice flour, gram flour and spices, it transforms into something crisp, light and endlessly snackable. It is one of those preparations that survives long after the festival is over, carefully stored in large tins and containers to be enjoyed over the following days and weeks.",
      "For many children, it eventually finds its way into school snack boxes. I was never particularly fond of oily foods growing up, so I was usually given a modest portion in the evenings after school. Yet somehow, Ribbon Pakoda was the one festive snack I always reached for. Perhaps it was the crisp texture, or perhaps it was simply the comfort of knowing there was always some left in the container long after Diwali had passed.",
    ],
    serve: "Allow the ribbon pakoda to cool completely before storing in an airtight container. It keeps well for 2 to 3 weeks and, in many households, continues to disappear steadily long after the festival has ended.",
    makes: "About 500 to 600 g",
    prepTime: "15 minutes",
    cookTime: "30 minutes",
    ingredients: [
      {
        group: "For the dough",
        items: ["2 cups rice flour", "1 cup gram flour (besan)", "1 tsp red chilli powder", "¼ tsp asafoetida", "1 tsp sesame seeds (optional)", "1 tsp salt, or to taste", "Hot oil, for the dough", "Water, as required"],
      },
      {
        group: "To fry",
        items: ["Oil, for deep frying"],
      },
    ],
    steps: [
      "In a large bowl, combine the rice flour, gram flour, chilli powder, asafoetida, salt and the sesame seeds, if using.",
      "Add the hot oil and mix well using your fingertips.",
      "Add water gradually and knead into a smooth, soft dough.",
      "Fit the murukku press (murukku soppu) with the ribbon pakoda plate and fill it with a portion of the dough.",
      "Heat the oil for frying over medium heat. Press the dough directly into the hot oil in circular motions.",
      "Fry until the bubbling almost subsides and the ribbon pakoda turns light golden. Flip and cook the other side briefly.",
      "Remove and drain on a paper towel. Repeat with the remaining dough.",
    ],
    tips: [
      "The dough should be softer than chapati dough, but firm enough to be pressed through a murukku press.",
      "Ribbon Pakoda is a good example of how texture contributes to flavour perception. Rice flour provides crispness and brittleness, while gram flour contributes flavour and structure. The characteristic ribbon shape increases surface area, allowing moisture to escape efficiently during frying and creating the light, crisp texture that makes it so satisfying.",
      "Besan is traditionally made from chana dal (split Bengal gram). Although it is often grouped with chickpea flours, it has a richer flavour and contributes to the characteristic taste and texture of South Indian snacks such as Ribbon Pakoda.",
      "Sometimes what we describe as flavour is not only taste or aroma. It is also the sound of the first bite and the texture that follows.",
    ],
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
