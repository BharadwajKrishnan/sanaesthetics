// Photos for the artwork slots. Until a slot has a photo, an illustration is
// drawn in its place. To use a photo, put it in public/images/ and set its path
// here, e.g. issue1: "/images/thali.jpg".
export const photos: Record<"hero" | "issue1" | "portrait" | "grinding", string | undefined> = {
  // A sadya on a banana leaf, seen from above. Set to undefined to draw the illustrated leaf instead.
  hero: "/images/banana-leaf-sadya.webp",
  issue1: "/images/arusuvai-poster.webp",
  // Sandhya's photo on the About page, cropped square to match its frame.
  portrait: "/images/sandhya-kitchen-table.webp",
  // The second About photo, in the story: Sandhya at the stone mortar and pestle, cropped 4:5.
  grinding: "/images/sandhya-mortar-pestle.webp",
};

// The spice box seen from above, cut out as a circle on a transparent
// background. It replaces the drawn anjarapetti in the hero and on the
// "Inside the Anjarapetti" card. Set to undefined to go back to the drawing.
export const dabbaCutout: string | undefined = "/images/anjarapetti.webp";

// Who took the hero photo. The Pexels licence asks for no credit, but the site gives one, as it does for the recipes.
export const heroCredit = { by: "Saveurs Secretes", source: "Pexels", sourceUrl: "https://www.pexels.com/photo/sadya-dish-on-banana-leaf-5410418/" };
