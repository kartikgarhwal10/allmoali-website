"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { PRODUCT_CONFIG } from "@/config/product";

interface NavbarProps {
  onOrderClick: () => void;
}

export default function Navbar({ onOrderClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "Home", href: "#home" },
    { name: "Product", href: "#product" },
    { name: "Benefits", href: "#benefits" },
    { name: "Our Formula", href: "#formula" },
    { name: "How To Use", href: "#how-to-use" },
    { name: "Reviews", href: "#reviews" },
    { name: "FAQ", href: "#faq" },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
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

  return (
    <>
      {/* Top progress bar */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-brand-gold z-50 transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      />

      <nav
        className={`fixed top-[3px] left-0 w-full z-40 transition-all duration-300 ${
          scrolled
            ? "bg-brand-ivory/95 backdrop-blur-md border-b border-brand-gold/15 shadow-sm py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-10">
            
            {/* Left: Brand Logo */}
            <div className="flex-shrink-0">
              <a
                href="#home"
                onClick={(e) => handleScrollTo(e, "#home")}
                className="font-sans text-lg md:text-xl font-black tracking-[0.2em] text-brand-green flex items-center gap-0.5"
              >
                {PRODUCT_CONFIG.brandName.toUpperCase()}
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
              </a>
            </div>

            {/* Center: Navigation Menu links */}
            <div className="hidden md:flex space-x-6 items-center">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleScrollTo(e, item.href)}
                  className="text-brand-charcoal/70 hover:text-brand-green font-sans text-[11px] font-bold tracking-widest uppercase transition-colors py-2"
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* Right: CTA button */}
            <div className="hidden md:flex items-center">
              <button
                onClick={onOrderClick}
                className="inline-flex items-center gap-2 bg-brand-green text-brand-ivory hover:bg-brand-gold hover:text-brand-green px-5 py-2.5 rounded-full font-sans text-[10px] font-bold tracking-widest uppercase transition-all duration-300 group shadow-xs"
              >
                ORDER NOW
                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>

            {/* Mobile hamburger menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-brand-green hover:text-brand-gold focus:outline-none p-1.5"
                aria-label="Toggle Menu"
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden bg-brand-ivory border-t border-brand-gold/10 overflow-hidden shadow-lg"
            >
              <div className="px-4 pt-2 pb-6 space-y-3 flex flex-col">
                {menuItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleScrollTo(e, item.href)}
                    className="text-brand-charcoal text-xs font-bold uppercase tracking-widest py-2.5 px-3 hover:bg-brand-gold/5 rounded-lg transition-colors"
                  >
                    {item.name}
                  </a>
                ))}
                
                <div className="pt-2 border-t border-brand-gold/10 px-3">
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      onOrderClick();
                    }}
                    className="flex w-full items-center justify-center gap-2 bg-brand-green text-brand-ivory py-3 rounded-full text-center font-sans text-xs font-bold tracking-widest uppercase shadow-md"
                  >
                    ORDER NOW
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      {/* Spacer */}
      <div className="h-14 md:h-16" />
    </>
  );
}
