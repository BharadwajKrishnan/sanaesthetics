import type { Metadata } from "next";
import { Anek_Tamil, Schibsted_Grotesk, Source_Serif_4 } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const grotesk = Schibsted_Grotesk({ variable: "--font-grotesk", subsets: ["latin"] });
const serif = Source_Serif_4({ variable: "--font-source-serif", subsets: ["latin"], style: ["normal", "italic"] });
const anekTamil = Anek_Tamil({ variable: "--font-anek-tamil", subsets: ["tamil"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} | Vegetarian South Indian cooking and flavour science`,
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
    <html lang="en" className={`${grotesk.variable} ${serif.variable} ${anekTamil.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
