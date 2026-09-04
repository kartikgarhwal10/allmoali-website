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
              NATURAL AYURVEDIC CARE
            </span>

            {/* Prominent Badge */}
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-2 rounded-full font-sans text-xs font-black uppercase tracking-wider">
              <span>✓</span>
              <span>NATURAL AYURVEDIC CHEMICAL-FREE OIL</span>
            </div>

            {/* Premium Large Editorial Quote */}
            <div className="border-l-2 border-brand-terracotta/40 pl-4 sm:pl-6 py-1">
              <blockquote className="font-serif text-lg sm:text-2xl lg:text-3xl italic text-brand-green leading-relaxed font-semibold">
                &ldquo;Chemical wale upayon par nirbhar rahne ki bajay, natural Ayurvedic care ko apni routine ka hissa banayein.&rdquo;
              </blockquote>
            </div>

            {/* Educational Copy block */}
            <div className="space-y-3 sm:space-y-4 pt-4 border-t border-brand-gold/10">
              <h3 className="font-display text-lg sm:text-2xl font-bold text-brand-green leading-tight">
                Embrace Natural Ayurvedic Care for Your Joints & Muscles
              </h3>
              <p className="text-brand-charcoal font-sans text-xs sm:text-base leading-relaxed font-medium">
                For everyday joint and muscular discomfort, make ALLMOALI Joint & Muscular Pain Oil a key part of your daily self-care massage routine.
              </p>
            </div>

            {/* Medical Disclaimer notice */}
            <div className="p-4 bg-white/60 rounded-xl border border-brand-gold/10 shadow-2xs">
              <p className="text-brand-muted-green font-sans text-[11px] leading-relaxed">
                Medicines and prescribed pain-relief treatments should always be managed according to the advice of a qualified healthcare professional.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Product Presentation */}
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
                  src="/images/product_hero_bottle.jpg"
                  alt="ALLMOALI Joint & Muscular Pain Oil Product Bottle"
                  fill
                  sizes="(max-width: 768px) 90vw, 400px"
                  className="object-cover hover:scale-[1.02] transition-transform duration-700"
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>

        </div>

        {/* Bottom Label Accent without Est. 2026 */}
        <div className="mt-16 pt-8 border-t border-brand-gold/10 flex justify-between items-center text-[10px] font-bold tracking-widest text-brand-muted-green/60 uppercase">
          <span>ALLMOALI NATURAL AYURVEDIC HERITAGE</span>
          <span>100 ML · AYURVEDIC PROPRIETARY MEDICINE</span>
        </div>

      </div>
    </section>
  );
}
