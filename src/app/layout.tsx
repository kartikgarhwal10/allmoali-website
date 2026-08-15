import type { Metadata } from "next";
import { Manrope, Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { PRODUCT_CONFIG } from "@/config/product";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Allmoali | Joint & Muscular Pain Oil",
  description:
    "Discover Allmoali Joint & Muscular Pain Oil, inspired by a 50-year-old Ayurvedic formula with a lightweight, fast-absorbing, non-sticky experience.",
  keywords: [
    "Ayurvedic pain oil",
    "joint pain relief",
    "muscular pain oil",
    "non-sticky massage oil",
    "Allmoali pain oil",
    "natural muscle rub",
  ],
  authors: [{ name: "Allmoali" }],
  openGraph: {
    title: "Allmoali | Joint & Muscular Pain Oil",
    description:
      "A fast-absorbing, non-sticky topical oil inspired by a 50-year-old Ayurvedic formula, crafted for your everyday joint and muscular care routine.",
    type: "website",
    locale: "en_IN",
    siteName: "Allmoali",
  },
  twitter: {
    card: "summary_large_image",
    title: "Allmoali | Joint & Muscular Pain Oil",
    description:
      "A fast-absorbing, non-sticky topical oil inspired by a 50-year-old Ayurvedic formula, crafted for your everyday joint and muscular care routine.",
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
              "image": "/images/product_bottle.jpg",
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
      </body>
    </html>
  );
}
