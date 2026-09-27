import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Newsreader } from "next/font/google";
import "@/styles/globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  style: ["normal", "italic"],
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fiza-one.vercel.app"),
  title: {
    default: "Fiza Engineering | Heavy Engineering, Mining & Rail",
    template: "%s | Fiza Engineering",
  },
  description:
    "Direct open-pit mining concessions, turnkey plant EPC, and heavy-haul railway corridors connecting African resource belts to global markets.",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://fiza-one.vercel.app",
    siteName: "Fiza Engineering Corporation",
    title: "Fiza Engineering | Heavy Engineering, Mining & Rail",
    description:
      "Direct open-pit mining concessions, turnkey plant EPC, and heavy-haul railway corridors connecting African resource belts to global markets.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Fiza Engineering Corporation - Heavy Engineering, Mining & Infrastructure",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fiza Engineering | Heavy Engineering, Mining & Rail",
    description:
      "Direct open-pit mining concessions, turnkey plant EPC, and heavy-haul railway corridors connecting African resource belts to global markets.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${newsreader.variable}`}>
      <body className="bg-iron-white text-earth-black antialiased flex flex-col min-h-screen overflow-x-hidden">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
