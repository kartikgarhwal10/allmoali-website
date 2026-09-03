"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function CareSection() {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-brand-ivory border-t border-b border-brand-gold/15 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20 items-center">
          
          {/* Left Column: Editorial Quote and Supporting Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 text-left space-y-6 sm:space-y-8"
          >
            {/* Section Eyebrow */}
            <span className="font-sans text-[11px] sm:text-xs uppercase tracking-[0.2em] text-brand-terracotta font-black block">
              EVERYDAY TOPICAL MASSAGE CARE
            </span>

            {/* Premium Large Editorial Quote */}
            <div className="border-l-2 border-brand-terracotta/40 pl-4 sm:pl-6 py-1">
              <blockquote className="font-serif text-lg sm:text-2xl lg:text-3xl italic text-brand-green leading-relaxed font-light">
                "Not every moment of discomfort needs to become a complicated routine. Sometimes, a few drops, a gentle massage and a moment of care are all you are looking for."
              </blockquote>
              <cite className="font-sans text-[10px] sm:text-xs uppercase tracking-widest text-brand-muted-green font-bold block mt-3 not-italic">
                — Allmoali is made for that everyday ritual.
              </cite>
            </div>

            {/* Educational Copy block */}
            <div className="space-y-3 sm:space-y-4 pt-4 border-t border-brand-gold/10">
              <h3 className="font-display text-lg sm:text-2xl font-bold text-brand-green leading-tight">
                Sometimes, everyday care starts with a simple massage.
              </h3>
              <p className="text-brand-charcoal font-sans text-xs sm:text-base leading-relaxed">
                For everyday aches and muscle discomfort, many people include topical massage as part of their self-care routine. Allmoali is designed as a convenient massage oil for those moments when you want to apply, massage and carry on with your day.
              </p>
            </div>

            {/* Medical Disclaimer Disclaimer notice */}
            <div className="p-4 bg-white/60 rounded-xl border border-brand-gold/10 shadow-2xs">
              <p className="text-brand-muted-green font-sans text-[11px] leading-relaxed">
                Medicines and pain-relief tablets should always be used according to the advice of a qualified healthcare professional.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Premium Realistic Product Presentation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-[420px] aspect-[4/5] rounded-[28px] sm:rounded-[32px] overflow-hidden border border-brand-gold/15 shadow-[0_15px_40px_rgba(47,67,54,0.05)] bg-white p-3 sm:p-4">
              <div className="relative w-full h-full rounded-[20px] sm:rounded-[24px] overflow-hidden bg-brand-ivory">
                <Image
                  src="/images/product_bottle_only.jpg"
                  alt="Allmoali Joint & Muscular Pain Oil Product Bottle"
                  fill
                  sizes="(max-width: 768px) 90vw, 400px"
                  className="object-cover hover:scale-[1.02] transition-transform duration-700"
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>

        </div>

        {/* Bottom Small Label Accent */}
        <div className="mt-16 pt-8 border-t border-brand-gold/10 flex justify-between items-center text-[10px] font-bold tracking-widest text-brand-muted-green/60 uppercase">
          <span>ALLMOALI NATURAL HERITAGE</span>
          <span>EST. 2026</span>
        </div>

      </div>
    </section>
  );
}
