import type { Metadata } from "next";
import { Figtree, Gloock, IBM_Plex_Mono } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const gloock = Gloock({ variable: "--font-gloock", weight: "400", subsets: ["latin"] });
const figtree = Figtree({ variable: "--font-figtree", subsets: ["latin"] });
const plexMono = IBM_Plex_Mono({ variable: "--font-plex-mono", weight: ["400", "500"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${site.name} | Vegetarian Indian cooking and flavour science`,
  description: site.description,
  openGraph: {
    title: site.name,
    description: site.tagline,
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${gloock.variable} ${figtree.variable} ${plexMono.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
