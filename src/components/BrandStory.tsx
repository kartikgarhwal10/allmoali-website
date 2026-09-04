"use client";

import React from "react";

export default function BrandStory() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-brand-green text-brand-ivory border-t border-brand-gold/10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <span className="font-sans text-[11px] sm:text-xs uppercase tracking-widest text-brand-gold font-bold mb-2 block">
            ABOUT ALLMOALI
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold leading-tight">
            Rooted in Ayurvedic Heritage
          </h2>
          <div className="w-16 h-0.5 bg-brand-gold mx-auto mt-4" />
        </div>

        {/* Body Text */}
        <p className="font-sans text-sm sm:text-base leading-relaxed text-brand-ivory/90 max-w-2xl mx-auto font-medium">
          Rooted in a time-honoured Ayurvedic formula and enriched with 12 Ayurvedic herbs, ALLMOALI Joint & Muscular Pain Oil delivers traditional Ayurvedic care in a convenient format designed for modern everyday routines.
        </p>

      </div>
    </section>
  );
}
