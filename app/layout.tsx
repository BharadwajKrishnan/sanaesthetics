import type { Metadata } from "next";
import { Anek_Tamil, Caveat, Cormorant_Garamond, DM_Sans } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({ variable: "--font-cormorant", weight: ["500", "600", "700"], subsets: ["latin"] });
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
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable} ${caveat.variable} ${anekTamil.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
