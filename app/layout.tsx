import type { Metadata } from "next";
import { Anek_Tamil, Caveat, Cormorant_Garamond, DM_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { CookieNotice } from "@/components/CookieNotice";
import { RevealObserver } from "@/components/Reveal";
import { ScrollToHash } from "@/components/ScrollToHash";
import { site } from "@/lib/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({ variable: "--font-cormorant", weight: ["500", "600", "700"], style: ["normal", "italic"], subsets: ["latin"] });
const dmSans = DM_Sans({ variable: "--font-dm-sans", subsets: ["latin"] });
const caveat = Caveat({ variable: "--font-caveat", subsets: ["latin"] });
const anekTamil = Anek_Tamil({ variable: "--font-anek-tamil", subsets: ["tamil"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} | South Indian vegetarian recipes, stories and flavour science`,
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: site.name,
    description: site.tagline,
    url: "/",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // The no-js class is taken off by RevealObserver once the page is interactive, so the scroll reveals only
    // hide content when there is a script to show it again.
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`no-js ${cormorant.variable} ${dmSans.variable} ${caveat.variable} ${anekTamil.variable} antialiased`}
    >
      <body>
        <RevealObserver />
        <ScrollToHash />
        {children}
        <CookieNotice />
        <Analytics />
      </body>
    </html>
  );
}
