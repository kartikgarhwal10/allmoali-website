"use client";

import React, { useState, useEffect } from "react";
import { ShoppingCart, MessageSquare } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { PRODUCT_CONFIG } from "@/config/product";
import { trackEvent } from "@/utils/analytics";

interface MobileStickyCTAProps {
  onOrderClick: () => void;
  isDrawerOpen: boolean;
}

export default function MobileStickyCTA({ onOrderClick, isDrawerOpen }: MobileStickyCTAProps) {
  const [scrollActive, setScrollActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Toggle sticky CTA bar visibility on scroll
      setScrollActive(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const whatsappUrl = `https://wa.me/${PRODUCT_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    PRODUCT_CONFIG.whatsappMessage
  )}`;

  const isVisible = scrollActive && !isDrawerOpen;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" as const }}
          className="fixed bottom-0 left-0 w-full z-40 bg-white/95 backdrop-blur-md border-t border-brand-gold/15 px-4 pt-3.5 flex justify-between items-center md:hidden shadow-2xl select-none"
          style={{ paddingBottom: "calc(14px + env(safe-area-inset-bottom))" }}
        >
          {/* Left Side: Price Tag */}
          <div className="flex flex-col text-left">
            <span className="font-sans text-[8px] font-black uppercase text-brand-gold tracking-widest leading-none">Total Price</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="font-display text-xl font-bold text-brand-green">
                ₹{PRODUCT_CONFIG.sellingPrice}
              </span>
              <span className="font-sans text-[9px] text-brand-muted-green/60 line-through">
                ₹{PRODUCT_CONFIG.mrp}
              </span>
            </div>
          </div>

          {/* Right Side: Flex actions */}
          <div className="flex items-center gap-2">
            {/* Direct Order button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                trackEvent("ClickOrder", { location: "mobile_sticky_cta" });
                onOrderClick();
              }}
              className="flex items-center justify-center gap-1.5 bg-brand-green text-brand-ivory py-3 px-5 rounded-full font-sans text-[10px] font-black uppercase tracking-wider shadow-sm active:scale-97 transition-all h-[44px]"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              ORDER NOW
            </button>

            {/* WhatsApp button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("WhatsAppClick", { location: "mobile_sticky_cta" })}
              className="flex items-center justify-center gap-1.5 bg-emerald-600 text-white py-3 px-5 rounded-full font-sans text-[10px] font-black uppercase tracking-wider shadow-sm active:scale-97 transition-all h-[44px]"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              WHATSAPP
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
