"use client";

import React, { useState } from "react";
import { MessageSquare, Mail, ChevronDown, ChevronUp } from "lucide-react";
import { PRODUCT_CONFIG } from "@/config/product";

export default function Footer() {
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  const currentYear = new Date().getFullYear();

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Product", href: "#product" },
    { name: "Benefits", href: "#benefits" },
    { name: "Our Formula", href: "#formula" },
    { name: "How To Use", href: "#how-to-use" },
    { name: "Reviews", href: "#reviews" },
    { name: "FAQ", href: "#faq" },
    { name: "Contact", href: "#contact" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms & Conditions", href: "#" },
    { name: "Shipping Policy", href: "#" },
    { name: "Refund Policy", href: "#" },
  ];

  const whatsappUrl = `https://wa.me/${PRODUCT_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    PRODUCT_CONFIG.whatsappMessage
  )}`;

  return (
    <footer className="bg-brand-ivory text-brand-charcoal pt-16 pb-24 border-t border-brand-gold/15 relative z-10 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Upper Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-12 border-b border-brand-gold/10">
          
          {/* Brand Column */}
          <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left">
            <a
              href="#home"
              onClick={(e) => handleScrollTo(e, "#home")}
              className="font-display text-2xl font-bold tracking-widest text-brand-green flex items-center gap-0.5 mb-4"
            >
              {PRODUCT_CONFIG.brandName.toUpperCase()}
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold"></span>
            </a>
            <p className="font-sans text-xs sm:text-sm text-brand-muted-green leading-relaxed max-w-sm mb-6 font-semibold">
              Traditional inspiration. <br /> Modern everyday care.
            </p>
            <div className="flex gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-brand-green/5 flex items-center justify-center border border-brand-gold/10 hover:bg-brand-green hover:text-brand-ivory transition-colors text-brand-green"
                aria-label="WhatsApp Support"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${PRODUCT_CONFIG.email}`}
                className="w-9 h-9 rounded-full bg-brand-green/5 flex items-center justify-center border border-brand-gold/10 hover:bg-brand-green hover:text-brand-ivory transition-colors text-brand-green"
                aria-label="Email Support"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Nav links column (Desktop) */}
          <div className="hidden md:flex md:col-span-4 flex-col items-start">
            <h3 className="font-display text-sm font-bold text-brand-green uppercase tracking-wider mb-4">
              NAVIGATION
            </h3>
            <ul className="grid grid-cols-2 gap-y-2 gap-x-6 text-left">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    className="font-sans text-xs text-brand-muted-green hover:text-brand-green font-semibold py-1 block transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal / Policy column (Desktop) */}
          <div className="hidden md:flex md:col-span-4 flex-col items-start text-left">
            <h3 className="font-display text-sm font-bold text-brand-green uppercase tracking-wider mb-4">
              LEGAL INFO
            </h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <span
                    className="font-sans text-xs text-brand-muted-green/60 cursor-not-allowed block py-1"
                    title="Policy links will be activated before launch"
                  >
                    {link.name} (Launch soon)
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Accordions (Mobile only) */}
          <div className="md:hidden w-full space-y-4 mt-2">
            {/* Nav Accordion */}
            <div className="border-b border-brand-gold/10 pb-3">
              <button
                onClick={() => setActiveAccordion(activeAccordion === "nav" ? null : "nav")}
                className="w-full flex justify-between items-center text-left py-2 font-display text-xs font-bold text-brand-green uppercase tracking-wider"
              >
                <span>Navigation</span>
                {activeAccordion === "nav" ? <ChevronUp className="w-3.5 h-3.5 text-brand-gold" /> : <ChevronDown className="w-3.5 h-3.5 text-brand-gold" />}
              </button>
              {activeAccordion === "nav" && (
                <ul className="grid grid-cols-2 gap-y-3.5 gap-x-6 text-left pt-3 px-1">
                  {navLinks.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        onClick={(e) => handleScrollTo(e, link.href)}
                        className="font-sans text-xs text-brand-muted-green hover:text-brand-green font-bold py-1 block transition-colors"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Legal Accordion */}
            <div className="border-b border-brand-gold/10 pb-3">
              <button
                onClick={() => setActiveAccordion(activeAccordion === "legal" ? null : "legal")}
                className="w-full flex justify-between items-center text-left py-2 font-display text-xs font-bold text-brand-green uppercase tracking-wider"
              >
                <span>Legal Info</span>
                {activeAccordion === "legal" ? <ChevronUp className="w-3.5 h-3.5 text-brand-gold" /> : <ChevronDown className="w-3.5 h-3.5 text-brand-gold" />}
              </button>
              {activeAccordion === "legal" && (
                <ul className="space-y-3 pt-3 px-1 text-left">
                  {legalLinks.map((link) => (
                    <li key={link.name}>
                      <span
                        className="font-sans text-xs text-brand-muted-green/60 cursor-not-allowed block py-1"
                        title="Policy links will be activated before launch"
                      >
                        {link.name} (Launch soon)
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

        </div>

        {/* Lower footer */}
        <div className="pt-8 text-center flex flex-col items-center gap-4">
          <p className="font-sans text-[10px] text-brand-muted-green/60">
            © {currentYear} {PRODUCT_CONFIG.brandName}. 50 Years of Formula Heritage. Made for Everyday Care.
          </p>
          <div className="w-full max-w-4xl border border-brand-gold/15 bg-white/40 p-4 rounded-xl shadow-xs">
            <p className="font-sans text-[9px] leading-relaxed text-brand-muted-green/75 italic">
              <strong>Demo Disclaimer:</strong> {PRODUCT_CONFIG.demoDisclaimer}
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}
