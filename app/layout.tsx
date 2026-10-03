import type { Metadata } from "next";
import { Anek_Latin, Anek_Tamil, IBM_Plex_Mono, Rozha_One } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const rozha = Rozha_One({ variable: "--font-rozha", weight: "400", subsets: ["latin"] });
const anek = Anek_Latin({ variable: "--font-anek", subsets: ["latin"] });
const anekTamil = Anek_Tamil({ variable: "--font-anek-tamil", subsets: ["tamil"] });
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
    <html lang="en" className={`${rozha.variable} ${anek.variable} ${anekTamil.variable} ${plexMono.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
