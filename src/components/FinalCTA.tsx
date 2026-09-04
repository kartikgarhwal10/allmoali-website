"use client";

import React from "react";
import { MessageSquare, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { PRODUCT_CONFIG } from "@/config/product";
import { trackEvent } from "@/utils/analytics";

export default function FinalCTA() {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    trackEvent("ClickOrder", { location: "final_cta" });
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const whatsappUrl = `https://wa.me/${PRODUCT_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    PRODUCT_CONFIG.whatsappMessage
  )}`;

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-brand-green text-brand-ivory relative overflow-hidden">
      {/* Decorative Golden Ambient Circles */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-brand-gold/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/3 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-brand-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Headline */}
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold leading-tight max-w-2xl mx-auto mb-4 sm:mb-6">
            Ready to make massage part of your routine?
          </h2>

          {/* Product Label */}
          <p className="font-sans text-xs sm:text-base text-brand-gold font-black uppercase tracking-widest max-w-md mx-auto mb-2 sm:mb-3">
            ALLMOALI Joint & Muscular Pain Oil
          </p>

          {/* Core Offer Badges */}
          <div className="flex justify-center gap-3 text-xs font-bold text-emerald-400 uppercase tracking-widest mb-8 sm:mb-10">
            <span>42% OFF</span>
            <span>•</span>
            <span>Free Delivery</span>
            <span>•</span>
            <span>COD Available</span>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-sm sm:max-w-md mx-auto">
            <a
              href="#order"
              onClick={(e) => handleScrollTo(e, "#order")}
              className="flex w-full sm:w-auto items-center justify-center gap-2.5 bg-brand-terracotta text-white active:bg-[#a94e31] py-4 px-9 rounded-full font-sans text-xs sm:text-sm font-black tracking-widest uppercase transition-all duration-200 shadow-lg text-center cursor-pointer touch-target h-[48px]"
            >
              <ShoppingBag className="w-4 h-4" />
              ORDER NOW — ₹286
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("WhatsAppClick", { location: "final_cta" })}
              className="flex w-full sm:w-auto items-center justify-center gap-2.5 bg-emerald-600 active:bg-emerald-700 text-white py-3.5 px-8 rounded-full font-sans text-xs sm:text-sm font-bold tracking-widest uppercase transition-all duration-200 shadow-lg text-center touch-target h-[48px]"
            >
              <MessageSquare className="w-4 h-4" />
              WHATSAPP US
            </a>
          </div>

          {/* Small Trust footer */}
          <div className="mt-12 text-center text-xs text-brand-gold/60 select-none">
            <span>✓ Pay Cash on Delivery</span>
            <span className="mx-2">•</span>
            <span>✓ Dispatch in 24 Hours</span>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
