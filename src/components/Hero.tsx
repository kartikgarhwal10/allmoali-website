"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ShoppingBag, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { PRODUCT_CONFIG } from "@/config/product";
import { trackEvent } from "@/utils/analytics";

interface HeroProps {
  onOrderClick: () => void;
  onGalleryClick?: (idx: number, images?: Array<{ src: string; title: string; description?: string }>) => void;
}

const HERO_IMAGES = [
  {
    src: "/images/hero_carousel_1.jpg",
    alt: "ALLMOALI Joint & Muscular Pain Oil - Natural Ayurvedic Care",
  },
  {
    src: "/images/hero_carousel_2.jpg",
    alt: "ALLMOALI Joint & Muscular Pain Oil - Box & Bottle Set",
  },
  {
    src: "/images/hero_carousel_3.jpg",
    alt: "ALLMOALI Joint & Muscular Pain Oil - Pure Ayurvedic Herbal Oil",
  },
  {
    src: "/images/hero_carousel_4.jpg",
    alt: "Powerful Ayurvedic Ingredients - 100% Natural, Safe & Effective",
  },
  {
    src: "/images/hero_carousel_5.jpg",
    alt: "ALLMOALI vs Other Generic Pain Relief Oil Comparison",
  },
  {
    src: "/images/hero_carousel_6.jpg",
    alt: "ALLMOALI Certifications - 100% Natural, Non GMO, Gluten Free, GMP Certified",
  },
];

export default function Hero({ onOrderClick, onGalleryClick }: HeroProps) {
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Automatic slide every 3.5s
  useEffect(() => {
    if (shouldReduceMotion || isHovered) return;

    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [shouldReduceMotion, isHovered]);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      if (newDirection === 1) {
        return (prevIndex + 1) % HERO_IMAGES.length;
      }
      return (prevIndex - 1 + HERO_IMAGES.length) % HERO_IMAGES.length;
    });
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const handleImageClick = () => {
    if (onGalleryClick) {
      const heroGalleryImages = HERO_IMAGES.map((img) => ({
        src: img.src,
        title: img.alt,
        description: "ALLMOALI Joint & Muscular Pain Oil Presentation",
      }));
      onGalleryClick(currentIndex, heroGalleryImages);
    }
  };

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
          
          {/* Mobile Order #1: Product Photography Container with Image Carousel */}
          <div 
            className="lg:col-span-5 order-1 lg:order-2 flex flex-col justify-center items-center relative py-1 lg:py-4"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[460px] aspect-square mx-auto flex items-center justify-center">
              <div 
                className="w-full h-full relative rounded-3xl lg:rounded-[36px] border border-brand-gold/25 overflow-hidden shadow-md bg-white p-3 flex items-center justify-center group select-none"
              >
                <div className="relative w-full h-full overflow-hidden rounded-2xl">
                  <AnimatePresence initial={false} custom={direction} mode="popLayout">
                    <motion.div
                      key={currentIndex}
                      custom={direction}
                      variants={{
                        enter: (dir: number) => ({
                          x: shouldReduceMotion ? 0 : dir > 0 ? "100%" : "-100%",
                          opacity: 0,
                        }),
                        center: {
                          x: 0,
                          opacity: 1,
                        },
                        exit: (dir: number) => ({
                          x: shouldReduceMotion ? 0 : dir < 0 ? "100%" : "-100%",
                          opacity: 0,
                        }),
                      }}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        x: shouldReduceMotion ? { duration: 0 } : { type: "tween", duration: 0.6, ease: [0.25, 1, 0.5, 1] },
                        opacity: { duration: 0.5 },
                      }}
                      drag={shouldReduceMotion ? false : "x"}
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.2}
                      onDragEnd={(_, info) => {
                        if (info.offset.x < -40) {
                          paginate(1);
                        } else if (info.offset.x > 40) {
                          paginate(-1);
                        }
                      }}
                      onTap={handleImageClick}
                      className="absolute inset-0 w-full h-full flex items-center justify-center cursor-zoom-in group/heroimg"
                    >
                      <Image
                        src={HERO_IMAGES[currentIndex].src}
                        alt={HERO_IMAGES[currentIndex].alt}
                        fill
                        sizes="(max-width: 640px) 320px, (max-width: 1024px) 380px, 460px"
                        className="object-contain object-center rounded-2xl select-none pointer-events-none"
                        priority={currentIndex === 0}
                      />
                      <div className="absolute bottom-4 right-4 bg-black/60 text-white p-2 rounded-full backdrop-blur-xs opacity-90 sm:opacity-0 group-hover/heroimg:opacity-100 transition-opacity z-10 pointer-events-none">
                        <ZoomIn className="w-4 h-4" />
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation Arrows */}
                  <button
                    type="button"
                    onClick={() => paginate(-1)}
                    aria-label="Previous Image"
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/80 hover:bg-brand-green hover:text-white text-brand-green border border-brand-gold/30 shadow-md backdrop-blur-xs flex items-center justify-center transition-all duration-200 z-20 cursor-pointer opacity-80 sm:opacity-0 group-hover:opacity-100 focus:opacity-100"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => paginate(1)}
                    aria-label="Next Image"
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/80 hover:bg-brand-green hover:text-white text-brand-green border border-brand-gold/30 shadow-md backdrop-blur-xs flex items-center justify-center transition-all duration-200 z-20 cursor-pointer opacity-80 sm:opacity-0 group-hover:opacity-100 focus:opacity-100"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* Carousel Indicators / Dots Inside Image Container Bottom */}
                  <div className="absolute bottom-2 inset-x-0 flex items-center justify-center gap-1.5 z-20 pointer-events-auto">
                    {HERO_IMAGES.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => goToSlide(idx)}
                        aria-label={`Go to slide ${idx + 1}`}
                        className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                          idx === currentIndex
                            ? "w-6 bg-brand-terracotta shadow-xs"
                            : "w-2 bg-brand-green/30 hover:bg-brand-green/60"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Net Quantity Pill */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-3 select-none">
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
                className="flex items-center justify-center gap-2 bg-[#C5FE01] text-[#16483A] hover:bg-[#b2e600] active:scale-97 py-3.5 px-8 rounded-full font-sans text-xs font-black tracking-widest uppercase transition-all duration-200 shadow-lg w-full sm:w-auto text-center cursor-pointer touch-target h-[48px]"
              >
                <ShoppingBag className="w-4 h-4 text-[#16483A]" />
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


