"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles } from "lucide-react";
import { PRODUCT_CONFIG } from "@/config/product";

export default function HowToUse() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll position of the routine section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const stepVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
  };

  return (
    <section id="how-to-use" className="py-12 sm:py-16 md:py-24 bg-brand-ivory border-t border-brand-gold/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto mb-10 sm:mb-16">
          <span className="font-sans text-[11px] sm:text-xs uppercase tracking-widest text-brand-gold font-bold mb-2 block">
            THE ROUTINE
          </span>
          <h2 className="font-display text-2xl sm:text-4xl font-bold text-brand-green leading-tight">
            A simple 2-minute ritual.
          </h2>
        </div>

        {/* Timeline */}
        <motion.div
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-4 lg:gap-8"
        >
          {/* Horizontal connecting lines (Desktop only) */}
          <div className="hidden md:block absolute top-[44px] left-[10%] right-[10%] h-[2px] bg-brand-gold/20 -z-10" />
          <motion.div
            style={{ scaleX, originX: 0 }}
            className="hidden md:block absolute top-[44px] left-[10%] right-[10%] h-[2px] bg-brand-gold -z-10"
          />

          {/* Vertical connecting lines (Mobile only) */}
          <div className="md:hidden absolute top-[44px] bottom-[44px] left-1/2 -translate-x-1/2 w-[2px] bg-brand-gold/20 -z-10" />
          <motion.div
            style={{ scaleY, originY: 0 }}
            className="md:hidden absolute top-[44px] bottom-[44px] left-1/2 -translate-x-1/2 w-[2px] bg-brand-gold -z-10"
          />

          {PRODUCT_CONFIG.allmoaliRoutine.map((step) => (
            <motion.div
              key={step.number}
              variants={stepVariants}
              className="flex flex-col items-center px-4 group"
            >
              {/* Step counter circle */}
              <div className="w-22 h-22 rounded-full bg-white border border-brand-gold/25 flex flex-col items-center justify-center shadow-xs relative z-10 transition-transform duration-300 group-hover:scale-103 group-hover:border-brand-gold">
                <span className="font-sans text-[8px] font-bold text-brand-gold tracking-widest leading-none">STEP</span>
                <span className="font-display text-xl font-bold text-brand-green leading-none mt-1">{step.number}</span>
              </div>

              {/* Step indicator tag */}
              <span className="inline-block mt-5 px-3 py-0.5 rounded-full bg-brand-green/5 border border-brand-green/10 text-brand-green font-sans text-[9px] font-bold uppercase tracking-wider">
                {step.detail}
              </span>

              {/* Title */}
              <h3 className="font-display text-sm font-bold text-brand-green mt-4 mb-2 tracking-wider uppercase">
                {step.title}
              </h3>

              {/* Description */}
              <p className="font-sans text-xs sm:text-sm leading-relaxed text-brand-muted-green max-w-[200px]">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Visual Workflow summary bubble */}
        <div className="mt-16 inline-flex items-center gap-2 bg-brand-green text-brand-gold py-2.5 px-6 rounded-full text-[9px] font-bold uppercase tracking-widest shadow-xs border border-brand-gold/15 select-none">
          <Sparkles className="w-3.5 h-3.5" />
          <span>3–5 drops &nbsp;➔&nbsp; Massage &nbsp;➔&nbsp; Absorb &nbsp;➔&nbsp; Routine</span>
        </div>

      </div>
    </section>
  );
}
