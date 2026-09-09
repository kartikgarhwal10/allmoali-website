import type { Metadata } from "next";
import { Manrope, Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { PRODUCT_CONFIG } from "@/config/product";
import CookieNotice from "@/components/CookieNotice";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Allmoali Joint & Muscular Pain Oil | Ayurvedic Joint & Muscular Care",
  description:
    "Discover Allmoali Joint & Muscular Pain Oil, rooted in a time-honoured Ayurvedic formula and enriched with 12 Ayurvedic herbs, designed for everyday joint and muscular care.",
  keywords: [
    "Allmoali",
    "Allmoali pain oil",
    "Ayurvedic joint oil",
    "muscular pain oil",
    "12 Ayurvedic herbs",
    "time-honoured Ayurvedic formula",
    "knee pain oil",
    "back pain oil",
    "arthritis care oil",
    "non-greasy joint oil",
    "no side effect pain oil",
  ],
  authors: [{ name: "ALLMOALI" }],
  openGraph: {
    title: "Allmoali Joint & Muscular Pain Oil | Ayurvedic Joint & Muscular Care",
    description:
      "Discover Allmoali Joint & Muscular Pain Oil, rooted in a time-honoured Ayurvedic formula and enriched with 12 Ayurvedic herbs, designed for everyday joint and muscular care.",
    type: "website",
    locale: "en_IN",
    siteName: "ALLMOALI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Allmoali Joint & Muscular Pain Oil | Ayurvedic Joint & Muscular Care",
    description:
      "Discover Allmoali Joint & Muscular Pain Oil, rooted in a time-honoured Ayurvedic formula and enriched with 12 Ayurvedic herbs, designed for everyday joint and muscular care.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${inter.variable} ${cormorant.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body 
        className="min-h-full flex flex-col bg-brand-ivory text-brand-charcoal font-sans select-none"
        suppressHydrationWarning
      >
        {/* JSON-LD Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              "name": `${PRODUCT_CONFIG.brandName} ${PRODUCT_CONFIG.productName}`,
              "image": "/images/allmoali-box-bottle-white-bg.jpg",
              "description": metadata.description,
              "offers": {
                "@type": "Offer",
                "priceCurrency": "INR",
                "price": PRODUCT_CONFIG.sellingPrice,
                "itemCondition": "https://schema.org/NewCondition",
                "availability": "https://schema.org/InStock",
              },
            }),
          }}
        />
        {children}
        <CookieNotice />
      </body>
    </html>
  );
}
