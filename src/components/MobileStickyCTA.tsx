"use client";

import React, { useState, useEffect } from "react";
import { ShoppingCart, MessageSquare } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { PRODUCT_CONFIG } from "@/config/product";
import { trackEvent } from "@/utils/analytics";

interface MobileStickyCTAProps {
  selectedPackage: 1 | 2;
  onOrderClick: (pkg: 1 | 2) => void;
  isDrawerOpen: boolean;
}

export default function MobileStickyCTA({ selectedPackage, onOrderClick, isDrawerOpen }: MobileStickyCTAProps) {
  const [scrollActive, setScrollActive] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollActive(window.scrollY > 180);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const whatsappUrl = `https://wa.me/${PRODUCT_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    selectedPackage === 2
      ? "Hi, I want to order the Allmoali 2 Bottles Bundle (Best Value) for ₹499. Please share the details."
      : "Hi, I want to order 1 Bottle of Allmoali Joint & Muscular Pain Oil for ₹286. Please share the details."
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
            {selectedPackage === 2 ? (
              <>
                <span className="font-sans text-[8px] font-black uppercase text-brand-terracotta tracking-widest leading-none">2 PCS · BEST VALUE</span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="font-display text-xl font-bold text-brand-green">
                    ₹499
                  </span>
                </div>
              </>
            ) : (
              <>
                <span className="font-sans text-[8px] font-black uppercase text-brand-gold tracking-widest leading-none">1 BOTTLE</span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="font-display text-xl font-bold text-brand-green">
                    ₹286
                  </span>
                  <span className="font-sans text-[9px] text-brand-muted-green/60 line-through">
                    ₹493
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Right Side: Flex actions */}
          <div className="flex items-center gap-2">
            {/* Direct Order button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                trackEvent("ClickOrder", { location: "mobile_sticky_cta", package: selectedPackage === 2 ? "2 Bottles" : "1 Bottle" });
                onOrderClick(selectedPackage);
              }}
              className="flex items-center justify-center gap-1.5 bg-brand-green text-brand-ivory hover:bg-brand-terracotta py-3 px-5 rounded-full font-sans text-[10px] font-black uppercase tracking-wider shadow-sm active:scale-97 transition-all h-[44px] cursor-pointer"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              {selectedPackage === 2 ? "GET 2 FOR ₹499" : "ORDER NOW"}
            </button>

            {/* WhatsApp button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("WhatsAppClick", { location: "mobile_sticky_cta" })}
              className="flex items-center justify-center gap-1.5 bg-emerald-600 text-white py-3 px-4 rounded-full font-sans text-[10px] font-black uppercase tracking-wider shadow-sm active:scale-97 transition-all h-[44px]"
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
