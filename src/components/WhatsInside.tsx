"use client";

import React from "react";
import Image from "next/image";
import { Leaf, Sparkles, ShieldCheck, ZoomIn } from "lucide-react";
import { PRODUCT_CONFIG } from "@/config/product";

interface WhatsInsideProps {
  onGalleryClick?: (idx: number) => void;
}

export default function WhatsInside({ onGalleryClick }: WhatsInsideProps) {
  return (
    <section id="ingredients" className="py-12 sm:py-16 md:py-24 bg-brand-ivory border-t border-brand-gold/15 relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-brand-green/8 rounded-full blur-3xl pointer-events-none translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Section Header */}
        <div className="mb-8 sm:mb-12 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-brand-green/8 border border-brand-green/15 px-3.5 py-1 rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5 text-brand-terracotta" />
            <span className="font-sans text-[11px] sm:text-xs font-black uppercase tracking-[0.2em] text-brand-green">
              100% NATURAL | SAFE | EFFECTIVE
            </span>
          </div>

          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold text-brand-green leading-tight">
            POWERFUL AYURVEDIC INGREDIENTS
          </h2>
          
          <p className="font-sans text-sm sm:text-base text-brand-muted-green font-semibold mt-3 max-w-2xl mx-auto">
            {PRODUCT_CONFIG.ingredientsDisclaimer}
          </p>

          <div className="w-20 h-1 bg-brand-terracotta mx-auto mt-4 rounded-full" />
        </div>

        {/* 1. Client Supplied Ingredient Visual Showcase */}
        <div className="max-w-5xl mx-auto bg-white rounded-3xl p-3 sm:p-6 border border-brand-gold/25 shadow-lg mb-12 overflow-hidden">
          <div className="w-full overflow-x-auto no-scrollbar rounded-2xl bg-brand-ivory/50 p-1">
            <div
              onClick={() => onGalleryClick && onGalleryClick(4)}
              className="relative min-w-[520px] sm:min-w-0 sm:w-full aspect-[16/10] rounded-xl overflow-hidden cursor-zoom-in group"
            >
              <Image
                src="/images/ayurvedic_ingredients.jpg"
                alt="Powerful Ayurvedic Ingredients — Allmoali Joint & Muscular Pain Oil"
                fill
                sizes="(max-width: 768px) 520px, (max-width: 1200px) 90vw, 1100px"
                className="object-contain rounded-xl group-hover:scale-101 transition-transform duration-500"
                priority
              />
              <div className="absolute bottom-4 right-4 bg-black/60 text-white p-2.5 rounded-full backdrop-blur-md opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-4 h-4" />
              </div>
            </div>
          </div>
          <div className="mt-3 text-center sm:hidden">
            <span className="font-sans text-[10px] text-brand-muted-green/80 font-bold uppercase tracking-wider">
              👈 Scroll horizontally to view all ingredients in detail 👉
            </span>
          </div>
          <div className="mt-4 pt-4 border-t border-brand-gold/15 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs font-sans font-bold text-brand-green">
            <span className="flex items-center gap-1.5"><Leaf className="w-4 h-4 text-emerald-600" /> AYURVEDIC & 100% NATURAL</span>
            <span>•</span>
            <span className="flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-brand-gold" /> ENRICHED WITH NATURAL HERBS</span>
            <span>•</span>
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-brand-terracotta" /> SAFE, EFFECTIVE & NON-GREASY</span>
          </div>
        </div>

        {/* 2. Interactive Herb Breakdown Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-6xl mx-auto text-left">
          {PRODUCT_CONFIG.ingredientsList.map((herb, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-brand-gold/15 shadow-2xs hover:border-brand-terracotta/40 hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-display text-sm font-extrabold text-brand-green uppercase tracking-wide">
                    {herb.name}
                  </span>
                  <span className="bg-brand-terracotta/10 text-brand-terracotta font-sans text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                    {herb.form}
                  </span>
                </div>
                
                <div className="flex items-center gap-3 font-sans text-[11px] text-brand-muted-green font-bold mb-3 border-b border-brand-gold/10 pb-2">
                  <span>Part: {herb.part}</span>
                  <span>•</span>
                  <span>Qty: {herb.quantity}</span>
                </div>

                <p className="font-sans text-xs text-brand-charcoal/80 leading-relaxed font-medium">
                  {herb.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
