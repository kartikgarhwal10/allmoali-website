"use client";

import React from "react";
import Image from "next/image";
import { MessageSquare, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { PRODUCT_CONFIG } from "@/config/product";
import { trackEvent } from "@/utils/analytics";

interface HeroProps {
  onOrderClick: () => void;
}

export default function Hero({ onOrderClick }: HeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.97 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.7, ease: "easeOut" as const },
    },
  };

  const whatsappUrl = `https://wa.me/${PRODUCT_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    PRODUCT_CONFIG.whatsappMessage
  )}`;

  return (
    <section
      id="home"
      className="relative min-h-[80vh] flex items-center justify-center pt-8 pb-16 md:py-24 bg-brand-ivory overflow-hidden"
    >
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-0 w-80 h-80 rounded-full bg-brand-gold/5 blur-3xl pointer-events-none -translate-x-1/2 animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 rounded-full bg-brand-green/5 blur-3xl pointer-events-none translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column (Copy and CTA) */}
          <motion.div
            className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left order-2 lg:order-1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Eyebrow */}
            <motion.div variants={itemVariants} className="mb-4">
              <span className="inline-block font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-brand-gold">
                EVERYDAY MASSAGE CARE
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="font-display text-3xl xs:text-4xl lg:text-6xl font-bold text-brand-green leading-[1.12] mb-5 tracking-tight max-w-[90vw] sm:max-w-none"
            >
              Joint & Muscular Pain Oil
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={itemVariants}
              className="text-brand-charcoal font-sans text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 mb-4"
            >
              A traditional Ayurvedic oil for your everyday massage routine.
            </motion.p>

            {/* Supporting Line */}
            <motion.p
              variants={itemVariants}
              className="text-brand-muted-green font-sans text-xs sm:text-sm tracking-wide font-semibold mb-8"
            >
              50-year-old formula · Fast absorbing · Non-sticky
            </motion.p>

            {/* Prices */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center lg:justify-start gap-4 mb-8"
            >
              <div className="flex flex-col text-left">
                <span className="text-[9px] uppercase tracking-widest text-brand-muted-green font-bold">Special Price</span>
                <div className="flex items-baseline gap-2.5">
                  <span className="text-3xl sm:text-4xl font-display font-bold text-brand-green">
                    ₹{PRODUCT_CONFIG.sellingPrice}
                  </span>
                  <span className="text-sm line-through text-brand-muted-green/60 font-semibold">
                    MRP ₹{PRODUCT_CONFIG.mrp}
                  </span>
                </div>
              </div>
              <span className="bg-brand-gold text-brand-green font-sans text-[10px] font-black px-3 py-1 rounded-md uppercase tracking-wider shadow-xs">
                {PRODUCT_CONFIG.discount}% OFF
              </span>
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10 w-full sm:w-auto"
            >
              <button
                onClick={(e) => {
                  e.preventDefault();
                  trackEvent("ClickOrder", { location: "hero_cta" });
                  onOrderClick();
                }}
                className="flex items-center justify-center gap-2 bg-brand-green text-brand-ivory hover:bg-brand-gold hover:text-brand-green border border-transparent py-4 px-8 rounded-full font-sans text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md w-full sm:w-auto text-center"
              >
                <ShoppingBag className="w-4 h-4" />
                ORDER NOW
              </button>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("WhatsAppClick", { location: "hero" })}
                className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-4 px-8 rounded-full font-sans text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md w-full sm:w-auto text-center"
              >
                <MessageSquare className="w-4 h-4" />
                ORDER ON WHATSAPP
              </a>
            </motion.div>

            {/* Trust and COD support */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-left border-t border-brand-gold/10 pt-6 font-sans text-[11px] font-semibold text-brand-muted-green"
            >
              <span className="text-brand-green font-bold">✓ Cash on Delivery Available</span>
              <span className="hidden sm:inline">•</span>
              <span>✓ Traditional Formula</span>
              <span className="hidden sm:inline">•</span>
              <span>✓ Lightweight Feel</span>
            </motion.div>
          </motion.div>

          {/* Right Column (Product Image) */}
          <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center items-center relative py-6">
            <motion.div
              className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96"
              variants={imageVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Product Frame and Floating animation */}
              <div className="w-full h-full relative p-3 bg-linear-to-b from-brand-gold/5 to-brand-green/5 border border-brand-gold/10 rounded-[32px] shadow-xl flex items-center justify-center animate-float">
                <Image
                  src="/images/product_bottle.jpg"
                  alt="Allmoali Joint & Muscular Pain Oil product presentation"
                  fill
                  sizes="(max-width: 768px) 100vw, 420px"
                  className="object-cover rounded-[24px]"
                  priority
                />

                {/* Micro floating callouts */}
                <div className="absolute top-[12%] -left-8 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-brand-gold/20 shadow-md flex items-center gap-1.5 pointer-events-none select-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                  <span className="font-sans text-[9px] font-bold text-brand-green uppercase tracking-wider">
                    50-Year Formula
                  </span>
                </div>
                
                <div className="absolute top-[48%] -right-8 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-brand-gold/20 shadow-md flex items-center gap-1.5 pointer-events-none select-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                  <span className="font-sans text-[9px] font-bold text-brand-green uppercase tracking-wider">
                    Fast Absorbing
                  </span>
                </div>

                <div className="absolute bottom-[16%] -left-6 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-brand-gold/20 shadow-md flex items-center gap-1.5 pointer-events-none select-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                  <span className="font-sans text-[9px] font-bold text-brand-green uppercase tracking-wider">
                    Non-Sticky
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
