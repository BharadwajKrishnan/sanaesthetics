// The anjarapetti (masala dabba): the seven spices drawn in the illustrated box, and their colours.
export const SPICES = [
  {
    name: "Turmeric",
    color: "#E0A21B",
  },
  {
    name: "Mustard seed",
    color: "#3B2A24",
  },
  {
    name: "Cumin",
    color: "#8C6A3C",
  },
  {
    name: "Red chilli",
    color: "#B3271E",
  },
  {
    name: "Coriander seed",
    color: "#B8A065",
  },
  {
    name: "Asafoetida",
    color: "#DCC68C",
  },
  {
    name: "Fenugreek",
    color: "#C0903A",
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
