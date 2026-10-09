// The anjarapetti (masala dabba): seven spices, each with the compound that gives it its character.
export const SPICES = [
  {
    name: "Turmeric",
    local: "manjal",
    compound: "curcumin",
    color: "#E0A21B",
    fact: "Curcumin dissolves in fat, not water. That is why manjal goes into the hot oil rather than the simmering dal.",
  },
  {
    name: "Mustard seed",
    local: "kadugu",
    compound: "allyl isothiocyanate",
    color: "#3B2A24",
    fact: "Crushed with water, mustard turns sharp. Popped whole in hot oil, the enzyme that makes the sharpness is switched off, and the seeds taste nutty.",
  },
  {
    name: "Cumin",
    local: "jeeragam",
    compound: "cuminaldehyde",
    color: "#8C6A3C",
    fact: "The warm, earthy smell of jeeragam is cuminaldehyde. A few seconds of sizzling pulls it into the oil, which carries it through the dish.",
  },
  {
    name: "Red chilli",
    local: "milagai",
    compound: "capsaicin",
    color: "#B3271E",
    fact: "Capsaicin clings to fat and ignores water. A spoon of yoghurt or ghee calms the heat when a glass of water will not.",
  },
  {
    name: "Coriander seed",
    local: "kothamalli vidhai",
    compound: "linalool",
    color: "#B8A065",
    fact: "Linalool gives coriander seed its floral, citrus note. It evaporates quickly once ground, so freshly ground seed smells brighter.",
  },
  {
    name: "Asafoetida",
    local: "perungayam",
    compound: "sulfur compounds",
    color: "#DCC68C",
    fact: "Raw perungayam is harsh. A pinch in hot fat changes its sulfur compounds into something savoury, close to cooked onion and garlic.",
  },
  {
    name: "Fenugreek",
    local: "vendhayam",
    compound: "sotolon",
    color: "#C0903A",
    fact: "In small amounts sotolon smells of maple and caramel. Toast vendhayam seeds gently: they turn bitter when they burn.",
  },
];

// Centre bowl, then six around it.
export const POSITIONS = [
  { left: 50, top: 50 },
  ...[0, 1, 2, 3, 4, 5].map((i) => {
    const a = ((-90 + i * 60) * Math.PI) / 180;
    return { left: 50 + 31.5 * Math.cos(a), top: 50 + 31.5 * Math.sin(a) };
  }),
];
