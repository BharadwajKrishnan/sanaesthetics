export const site = {
  name: "South Indian Food Lab",
  wordmark: ["South Indian", "Food Lab"],
  domain: "southindianfoodlab.com",
  url: "https://southindianfoodlab.com",
  tagline: "Traditional flavours. A deeper understanding.",
  description:
    "South Indian vegetarian recipes, stories and flavour science, from a home kitchen to a wider table. Read the newsletter, cook the recipes.",
  instagramHandle: "san_aesthetixs",
  instagramUrl: "https://www.instagram.com/san_aesthetixs/",
  author: "Sandhya Ravichandran",
  // Where readers write to be taken off a list or to ask about their data. Shown on the privacy page.
  contactEmail: "sandhya@southindianfoodlab.com",
  // Section links point at the homepage so they work from every page.
  nav: [
    { href: "/", label: "Home" },
    { href: "/newsletter", label: "Newsletter" },
    { href: "/recipes", label: "Recipes" },
    { href: "/flavour-science", label: "Flavour Science" },
    { href: "/#culture", label: "Culture" },
    { href: "/#classes", label: "Classes" },
    { href: "/about", label: "About Me" },
  ],
};

// Spread into every page's `openGraph`. A page that sets openGraph replaces the root layout's fields
// wholesale, including the picture drawn by app/opengraph-image.tsx, so each page puts it back here.
export const openGraphShared = {
  siteName: site.name,
  images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${site.name}: ${site.tagline}` }],
};
