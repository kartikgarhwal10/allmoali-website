"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { PRODUCT_CONFIG } from "@/config/product";
import { trackEvent } from "@/utils/analytics";

interface HeroProps {
  onOrderClick: () => void;
}

export default function Hero({ onOrderClick }: HeroProps) {
  const [mounted, setMounted] = useState(false);
  const [activeFrame, setActiveFrame] = useState<1 | 2 | 3>(1);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);

    if (shouldReduceMotion) {
      setActiveFrame(3);
      return;
    }

    // Mobile Animation Timings as per spec:
    // Frame 1 (450ms fade + 650ms hold) -> Frame 2 at 1100ms
    const t2 = setTimeout(() => {
      setActiveFrame(2);
    }, 1100);

    // Frame 2 (450ms fade + 650ms hold) -> Frame 3 at 2200ms
    const t3 = setTimeout(() => {
      setActiveFrame(3);
    }, 2200);

    return () => {
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [shouldReduceMotion]);

  const showAnimation = mounted && shouldReduceMotion === false;

  // Text Entrance Transitions
  const textTransitions = {
    eyebrow: showAnimation ? { delay: 0.1, duration: 0.45, ease: "easeOut" as const } : { duration: 0 },
    headline: showAnimation ? { delay: 0.35, duration: 0.5, ease: "easeOut" as const } : { duration: 0 },
    benefits: showAnimation ? { delay: 0.6, duration: 0.45, ease: "easeOut" as const } : { duration: 0 },
    price: showAnimation ? { delay: 0.85, duration: 0.45, ease: "easeOut" as const } : { duration: 0 },
    ctas: showAnimation ? { delay: 1.1, duration: 0.5, ease: "easeOut" as const } : { duration: 0 },
    trust: showAnimation ? { delay: 1.3, duration: 0.45, ease: "easeOut" as const } : { duration: 0 },
  };

  // GPU/Compositor Friendly Frame Animation Variants (Opacity & Transform only)
  const frame1Variants = {
    initial: { opacity: 0, scale: 0.97 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: "easeOut" as const } },
    exit: { opacity: 0, transition: { duration: 0.4, ease: "easeIn" as const } }
  };

  const frame2Variants = {
    initial: { opacity: 0, scale: 0.97, y: 10 },
    animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
    exit: { opacity: 0, transition: { duration: 0.4, ease: "easeIn" as const } }
  };

  const frame3Variants = {
    initial: showAnimation ? { opacity: 0, scale: 0.98, y: 8 } : { opacity: 1, scale: 1, y: 0 },
    animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } }
  };

  return (
    <section
      id="home"
      className="relative flex items-center justify-center pt-3 pb-10 sm:py-12 lg:py-16 bg-brand-ivory overflow-hidden"
    >
      {/* Background Glows */}
      <div className="absolute top-1/4 left-0 w-80 h-80 rounded-full bg-brand-gold/8 blur-3xl pointer-events-none -translate-x-1/2" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 rounded-full bg-brand-terracotta/8 blur-3xl pointer-events-none translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
          
          {/* Mobile Order #1: Product Photography Container */}
          <div className="lg:col-span-5 order-1 lg:order-2 flex flex-col justify-center items-center relative py-1 lg:py-4">
            <div className="relative w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[460px] aspect-square mx-auto flex items-center justify-center">
              <div 
                className="w-full h-full relative rounded-3xl lg:rounded-[36px] border border-brand-gold/25 overflow-hidden shadow-md bg-white p-3 flex items-center justify-center"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={activeFrame === 2 ? "/images/product_bundle_pack2.jpg" : "/images/product_hero_bottle.jpg"}
                    alt="ALLMOALI Joint & Muscular Pain Oil"
                    fill
                    sizes="(max-width: 640px) 320px, (max-width: 1024px) 380px, 460px"
                    className="object-contain rounded-2xl transition-opacity duration-300"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Interactive Image View Switcher + Net Quantity Pill */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-3 select-none">
              <button
                type="button"
                onClick={() => setActiveFrame(1)}
                className={`px-3 py-1 rounded-full text-[10px] font-sans font-black uppercase tracking-wider transition-all cursor-pointer ${
                  activeFrame === 1
                    ? "bg-brand-terracotta text-white shadow-xs"
                    : "bg-white border border-brand-gold/20 text-brand-green hover:border-brand-gold"
                }`}
              >
                1 Bottle
              </button>
              <button
                type="button"
                onClick={() => setActiveFrame(2)}
                className={`px-3 py-1 rounded-full text-[10px] font-sans font-black uppercase tracking-wider transition-all cursor-pointer ${
                  activeFrame === 2
                    ? "bg-brand-terracotta text-white shadow-xs"
                    : "bg-white border border-brand-gold/20 text-brand-green hover:border-brand-gold"
                }`}
              >
                2 PCS Bundle
              </button>
              <div className="bg-brand-green/8 border border-brand-green/20 px-3 py-1 rounded-full text-[10px] font-sans font-black text-brand-green uppercase tracking-wider">
                NET QUANTITY: {PRODUCT_CONFIG.netQuantity}
              </div>
            </div>
          </div>

          {/* Mobile Order #2: Copy, Pricing, and CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left order-2 lg:order-1 min-w-0">
            
            {/* 1. ALLMOALI BRAND NAME VISIBILITY HIGHLIGHT */}
            <motion.div
              initial={showAnimation ? { opacity: 0, y: 8 } : { opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={textTransitions.eyebrow}
              className="mb-2 mt-1 sm:mt-0"
            >
              <div className="inline-flex items-center gap-2 bg-brand-green/8 border border-brand-green/20 px-3.5 py-1.5 rounded-full">
                <span className="font-display text-xs sm:text-sm font-black uppercase tracking-[0.25em] text-brand-green">
                  ALLMOALI
                </span>
                <span className="text-brand-terracotta font-bold text-xs">•</span>
                <span className="font-sans text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-brand-terracotta">
                  NATURAL AYURVEDIC CARE
                </span>
              </div>
            </motion.div>

            {/* 2. Product Name Headline */}
            <motion.h1
              initial={showAnimation ? { opacity: 0, y: 12 } : { opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={textTransitions.headline}
              className="font-display font-extrabold text-brand-green leading-[1.12] mb-3 tracking-tight"
              style={{ fontSize: "clamp(2.1rem, 7vw, 3.8rem)" }}
            >
              Joint & Muscular Pain Oil
            </motion.h1>

            {/* 3. ROOT-CAUSE ACTION EARLY MENTION */}
            <motion.div
              initial={showAnimation ? { opacity: 0, y: 10 } : { opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={textTransitions.benefits}
              className="bg-white/95 border border-brand-gold/25 p-3.5 sm:p-4 rounded-2xl mb-4 text-left shadow-2xs max-w-xl mx-auto lg:mx-0"
            >
              <span className="font-sans text-[10px] font-black uppercase tracking-widest text-brand-terracotta block mb-1">
                ROOT-CAUSE ACTION
              </span>
              <p className="font-sans text-xs sm:text-sm leading-relaxed text-brand-charcoal font-semibold">
                Most oils only create a cooling or warming feeling on the skin. <span className="text-brand-green font-bold">Allmoali</span> oil targets inflammation pathways and supports joint health long-term.
              </p>
            </motion.div>

            {/* 4. Key Benefit Callout Pills */}
            <motion.div
              initial={showAnimation ? { opacity: 0, y: 8 } : { opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={textTransitions.benefits}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-1.5 sm:gap-2 mb-4"
            >
              <span className="bg-brand-green/8 border border-brand-green/20 text-brand-green font-sans text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                FAST ABSORBING
              </span>
              <span className="bg-brand-green/8 border border-brand-green/20 text-brand-green font-sans text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                NON-GREASY
              </span>
              <span className="bg-brand-green/8 border border-brand-green/20 text-brand-green font-sans text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                DEEP PENETRATION
              </span>
              <span className="bg-emerald-50 border border-emerald-200 text-emerald-700 font-sans text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                12 AYURVEDIC HERBS
              </span>
              <span className="bg-emerald-50 border border-emerald-200 text-emerald-700 font-sans text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                ✓ NO SIDE EFFECT
              </span>
            </motion.div>

            {/* 5. Clear Price & Offer Breakdown */}
            <motion.div
              initial={showAnimation ? { opacity: 0, y: 10 } : { opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={textTransitions.price}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-5"
            >
              <div className="flex flex-col text-left">
                <span className="text-[9px] uppercase tracking-widest text-brand-muted-green font-extrabold">Special Offer Price</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-display font-extrabold text-brand-green">
                    ₹{PRODUCT_CONFIG.sellingPrice}
                  </span>
                  <span className="text-sm line-through text-brand-muted-green/60 font-semibold">
                    MRP ₹{PRODUCT_CONFIG.mrp}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-start bg-brand-terracotta/10 border border-brand-terracotta/25 px-3 py-1.5 rounded-xl">
                <span className="text-[9px] uppercase tracking-wider text-brand-terracotta font-black">
                  42% OFF · <span className="line-through text-gray-400">₹80 Delivery</span> FREE DELIVERY
                </span>
                <span className="text-[10px] font-bold text-emerald-700">
                  You Pay: ₹{PRODUCT_CONFIG.sellingPrice} Only
                </span>
              </div>
            </motion.div>

            {/* 6. CTA Buttons */}
            <motion.div
              initial={showAnimation ? { opacity: 0, y: 10 } : { opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={textTransitions.ctas}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 mb-4 w-full"
            >
              <button
                onClick={(e) => {
                  e.preventDefault();
                  trackEvent("ClickOrder", { location: "hero_cta" });
                  onOrderClick();
                }}
                className="flex items-center justify-center gap-2 bg-brand-terracotta text-white hover:bg-[#a94e31] active:scale-97 py-3.5 px-8 rounded-full font-sans text-xs font-black tracking-widest uppercase transition-all duration-200 shadow-lg w-full sm:w-auto text-center cursor-pointer touch-target h-[48px]"
              >
                <ShoppingBag className="w-4 h-4" />
                ORDER NOW — ₹286
              </button>

              <a
                href={`https://wa.me/${PRODUCT_CONFIG.whatsappNumber}?text=${encodeURIComponent(PRODUCT_CONFIG.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("WhatsAppClick", { location: "hero_cta" })}
                className="flex items-center justify-center gap-2 bg-emerald-600 active:bg-emerald-700 text-white py-3.5 px-7 rounded-full font-sans text-xs font-black tracking-widest uppercase transition-all duration-200 shadow-md w-full sm:w-auto text-center touch-target h-[48px]"
              >
                ORDER ON WHATSAPP
              </a>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={showAnimation ? { opacity: 0 } : { opacity: 1 }}
              animate={{ opacity: 1 }}
              transition={textTransitions.trust}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-x-3 gap-y-1 text-left border-t border-brand-gold/15 pt-3 font-sans text-[11px] font-bold text-brand-muted-green"
            >
              <span className="text-brand-green font-bold">✓ Cash on Delivery Available</span>
              <span>•</span>
              <span className="text-emerald-700 font-bold">✓ 100% Ayurvedic Formula</span>
              <span>•</span>
              <span className="text-brand-terracotta font-bold">✓ Free Delivery</span>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}


