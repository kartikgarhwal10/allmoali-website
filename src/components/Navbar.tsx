"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Menu, X, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { PRODUCT_CONFIG } from "@/config/product";

interface NavbarProps {
  onOrderClick: () => void;
}

export default function Navbar({ onOrderClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 30);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Listen for Escape key to close mobile drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const menuItems = [
    { name: "HOME", href: "#home" },
    { name: "BENEFITS", href: "#benefits" },
    { name: "INGREDIENTS", href: "#ingredients" },
    { name: "OUR STORY", href: "#story" },
    { name: "REVIEWS", href: "#reviews" },
    { name: "FAQ", href: "#faq" },
  ];

  const handleScrollTo = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
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
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${scrolled
          ? "bg-brand-ivory/95 backdrop-blur-md border-b border-brand-gold/15 shadow-xs py-2"
          : "bg-brand-ivory/85 backdrop-blur-xs py-3 border-b border-brand-gold/10"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">

            {/* Left: Official Brand Logo Image - Strong Visual Presence */}
            <div className="flex-shrink-0">
              <a
                href="#home"
                onClick={(e) => handleScrollTo(e, "#home")}
                className="flex items-center select-none py-1 group"
                aria-label="ALLMOALI Home"
              >
                <Image
                  src="/images/allmoali_logo.png"
                  alt="ALLMOALI — The Universal Trust"
                  width={280}
                  height={90}
                  className="h-20 sm:h-22 lg:h-24 w-auto object-contain transition-transform group-hover:scale-[1.02]"
                  priority
                />
              </a>
            </div>

            {/* Center: Desktop Navigation Menu links */}
            <nav className="hidden lg:flex space-x-7 items-center" aria-label="Desktop Navigation">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleScrollTo(e, item.href)}
                  className="text-brand-charcoal/85 hover:text-brand-terracotta font-sans text-[11px] font-extrabold tracking-widest uppercase transition-colors py-2"
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {/* Right: Desktop CTA button with Client Accent Color */}
            <div className="hidden lg:flex items-center">
              <button
                onClick={onOrderClick}
                className="inline-flex items-center gap-2 bg-brand-terracotta text-white hover:bg-[#a94e31] active:scale-97 px-6 py-2.5 rounded-full font-sans text-[11px] font-black tracking-widest uppercase transition-all duration-300 shadow-md cursor-pointer touch-target"
              >
                ORDER NOW
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Mobile Menu Button & Mobile Order CTA */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={onOrderClick}
                className="bg-brand-terracotta text-white px-3.5 py-1.5 rounded-full font-sans text-[10px] font-black tracking-wider uppercase shadow-xs cursor-pointer touch-target flex items-center gap-1"
              >
                ORDER NOW
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-11 h-11 flex items-center justify-center text-brand-green active:bg-brand-gold/10 rounded-full focus:outline-none cursor-pointer"
                aria-label={isOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
                aria-expanded={isOpen}
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Full-Width Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex flex-col">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-brand-charcoal/40 backdrop-blur-xs"
            />

            {/* Content Sheet */}
            <motion.div
              initial={{ opacity: 0, y: "-100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="relative w-full bg-brand-ivory border-b border-brand-gold/20 shadow-2xl flex flex-col max-h-[90vh] overflow-y-auto"
            >
              {/* Drawer Header */}
              <div className="flex justify-between items-center px-5 py-3 border-b border-brand-gold/10">
                <a
                  href="#home"
                  onClick={(e) => handleScrollTo(e, "#home")}
                  className="flex items-center select-none"
                >
                  <Image
                    src="/images/allmoali_logo.png"
                    alt="ALLMOALI — The Universal Trust"
                    width={220}
                    height={70}
                    className="h-12 sm:h-14 w-auto object-contain"
                  />
                </a>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-11 h-11 flex items-center justify-center text-brand-green rounded-full active:bg-brand-gold/10 cursor-pointer"
                  aria-label="Close Menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Drawer Nav Items */}
              <div className="px-6 py-6 space-y-2 flex flex-col flex-1">
                {menuItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleScrollTo(e, item.href)}
                    className="text-brand-green text-sm font-extrabold uppercase tracking-widest py-3 px-4 active:bg-brand-gold/15 rounded-xl transition-colors border-b border-brand-gold/5 flex items-center justify-between"
                  >
                    <span>{item.name}</span>
                    <ArrowRight className="w-4 h-4 text-brand-terracotta opacity-60" />
                  </a>
                ))}
              </div>

              {/* Drawer Bottom CTA */}
              <div className="p-6 border-t border-brand-gold/15 bg-brand-bg-secondary/40 sticky bottom-0">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOrderClick();
                  }}
                  className="flex w-full items-center justify-center gap-2 bg-brand-terracotta text-white active:bg-[#a94e31] py-4 px-6 rounded-full text-center font-sans text-xs font-black tracking-widest uppercase shadow-md cursor-pointer touch-target h-[48px]"
                >
                  ORDER NOW
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-20 sm:h-24 lg:h-26" />
    </>
  );
}

