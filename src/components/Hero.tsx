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
      className="relative min-h-[85vh] flex items-center justify-center pt-4 pb-12 lg:pt-16 lg:pb-24 bg-brand-ivory overflow-hidden"
    >
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-0 w-72 h-72 rounded-full bg-brand-gold/5 blur-3xl pointer-events-none -translate-x-1/2" />
      <div className="absolute bottom-1/4 right-0 w-72 h-72 rounded-full bg-brand-green/5 blur-3xl pointer-events-none translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* Mobile Order #1: Product Showcase Animation Container */}
          <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center items-center relative pt-2 pb-4 lg:py-6">
            <div className="relative w-[86vw] max-w-[420px] lg:w-full lg:max-w-[540px] aspect-[4/4.2] sm:aspect-[4/4] mx-auto flex items-center justify-center">
              <div 
                className="w-full h-full relative rounded-[28px] lg:rounded-[36px] border border-brand-gold/20 overflow-hidden shadow-[0_16px_40px_rgba(23,59,47,0.06)] bg-brand-ivory"
                style={{ 
                  backgroundImage: "radial-gradient(circle at center, rgba(255,255,255,0.85) 0%, rgba(247,243,234,0.95) 100%)" 
                }}
              >
                <AnimatePresence mode="wait">
                  {activeFrame === 1 && (
                    <motion.div
                      key="frame1"
                      variants={frame1Variants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="absolute inset-0 w-full h-full p-3"
                    >
                      <Image
                        src="/images/product_box.jpg"
                        alt="Allmoali Joint & Muscular Pain Oil Product Box"
                        fill
                        sizes="(max-width: 640px) 86vw, (max-width: 1024px) 420px, 540px"
                        className="object-contain rounded-[24px] lg:rounded-[32px]"
                        priority
                      />
                    </motion.div>
                  )}

                  {activeFrame === 2 && (
                    <motion.div
                      key="frame2"
                      variants={frame2Variants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="absolute inset-0 w-full h-full p-3"
                    >
                      <Image
                        src="/images/product_bottle_only.jpg"
                        alt="Allmoali Joint & Muscular Pain Oil Bottle"
                        fill
                        sizes="(max-width: 640px) 86vw, (max-width: 1024px) 420px, 540px"
                        className="object-contain rounded-[24px] lg:rounded-[32px]"
                        priority
                      />
                    </motion.div>
                  )}

                  {activeFrame === 3 && (
                    <motion.div
                      key="frame3"
                      variants={frame3Variants}
                      initial="initial"
                      animate="animate"
                      className="absolute inset-0 w-full h-full p-3"
                    >
                      <Image
                        src="/images/product_box_bottle.jpg"
                        alt="Allmoali Joint & Muscular Pain Oil Box and Bottle"
                        fill
                        sizes="(max-width: 640px) 86vw, (max-width: 1024px) 420px, 540px"
                        className="object-contain rounded-[24px] lg:rounded-[32px]"
                        priority
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Floating highlights settle badge */}
                <AnimatePresence>
                  {activeFrame === 3 && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                    >
                      <div className="absolute top-[8%] left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full border border-brand-gold/20 shadow-xs flex items-center gap-1.5 pointer-events-none select-none">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-terracotta" />
                        <span className="font-sans text-[9px] font-extrabold text-brand-green uppercase tracking-wider">
                          50-Year Formula
                        </span>
                      </div>
                      
                      <div className="absolute bottom-[8%] right-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full border border-brand-gold/20 shadow-xs flex items-center gap-1.5 pointer-events-none select-none">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-terracotta" />
                        <span className="font-sans text-[9px] font-extrabold text-brand-green uppercase tracking-wider">
                          Fast Absorbing
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Mobile Order #2: Copy, Pricing, and CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left order-2 lg:order-1 min-w-0">
            {/* 1. Eyebrow */}
            <motion.div
              initial={showAnimation ? { opacity: 0, y: 8 } : { opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={textTransitions.eyebrow}
              className="mb-2 sm:mb-3"
            >
              <span className="inline-block font-sans text-[11px] sm:text-xs font-black uppercase tracking-[0.25em] text-brand-terracotta">
                EVERYDAY MASSAGE CARE
              </span>
            </motion.div>

            {/* 2. Joint & Muscular Pain Oil Headline (using Clamp) */}
            <motion.h1
              initial={showAnimation ? { opacity: 0, y: 12 } : { opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={textTransitions.headline}
              className="font-display font-extrabold text-brand-green leading-[1.15] mb-4 tracking-tight"
              style={{ fontSize: "clamp(2.1rem, 7.5vw, 3.75rem)" }}
            >
              Joint & Muscular Pain Oil
            </motion.h1>

            {/* 3. Supporting Copy */}
            <motion.p
              initial={showAnimation ? { opacity: 0, y: 10 } : { opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={textTransitions.benefits}
              className="text-brand-charcoal font-sans text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0 mb-3"
            >
              Traditional Ayurvedic-inspired massage care, made convenient for everyday use.
            </motion.p>

            {/* 4. Benefits pill */}
            <motion.p
              initial={showAnimation ? { opacity: 0, y: 8 } : { opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={textTransitions.benefits}
              className="text-brand-muted-green font-sans text-[11px] sm:text-xs tracking-widest font-black uppercase mb-6"
            >
              50-YEAR FORMULA · FAST ABSORBING · NON-STICKY
            </motion.p>

            {/* 5. Price & Offer */}
            <motion.div
              initial={showAnimation ? { opacity: 0, y: 10 } : { opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={textTransitions.price}
              className="flex items-center justify-center lg:justify-start gap-4 mb-6"
            >
              <div className="flex flex-col text-left">
                <span className="text-[9px] uppercase tracking-widest text-brand-muted-green font-extrabold">Special Price</span>
                <div className="flex items-baseline gap-2.5">
                  <span className="text-3xl sm:text-4xl font-display font-extrabold text-brand-green">
                    ₹{PRODUCT_CONFIG.sellingPrice}
                  </span>
                  <span className="text-sm line-through text-brand-muted-green/60 font-semibold">
                    MRP ₹{PRODUCT_CONFIG.mrp}
                  </span>
                </div>
              </div>
              <span className="bg-brand-terracotta text-brand-ivory font-sans text-[10px] font-black px-3 py-1.5 rounded-md uppercase tracking-wider shadow-2xs">
                {PRODUCT_CONFIG.discount}% OFF
              </span>
            </motion.div>

            {/* 6. CTA Button */}
            <motion.div
              initial={showAnimation ? { opacity: 0, y: 10 } : { opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={textTransitions.ctas}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 mb-6 w-full"
            >
              <button
                onClick={(e) => {
                  e.preventDefault();
                  trackEvent("ClickOrder", { location: "hero_cta" });
                  onOrderClick();
                }}
                className="flex items-center justify-center gap-2 bg-brand-green text-brand-ivory active:bg-brand-terracotta py-4 px-10 rounded-full font-sans text-xs font-black tracking-widest uppercase transition-all duration-200 shadow-md w-full sm:w-auto text-center cursor-pointer touch-target h-[48px]"
              >
                <ShoppingBag className="w-4 h-4" />
                ORDER NOW
              </button>
            </motion.div>

            {/* Trust and COD support */}
            <motion.div
              initial={showAnimation ? { opacity: 0 } : { opacity: 1 }}
              animate={{ opacity: 1 }}
              transition={textTransitions.trust}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-x-3 gap-y-1 text-left border-t border-brand-gold/15 pt-5 font-sans text-[11px] font-bold text-brand-muted-green"
            >
              <span className="text-brand-green font-bold">✓ COD Available</span>
              <span>•</span>
              <span>✓ UPI / Cards</span>
              <span>•</span>
              <span className="text-brand-terracotta">✓ Fast Delivery</span>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}


