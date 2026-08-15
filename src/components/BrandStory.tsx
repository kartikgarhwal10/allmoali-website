"use client";

import React from "react";

export default function BrandStory() {
  return (
    <section className="py-16 md:py-20 bg-brand-green text-brand-ivory border-t border-brand-gold/10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Header */}
        <div className="mb-8">
          <span className="font-sans text-xs uppercase tracking-widest text-brand-gold font-bold mb-3 block">
            ABOUT ALLMOALI
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold leading-tight">
            The Story Behind Allmoali
          </h2>
          <div className="w-16 h-0.5 bg-brand-gold mx-auto mt-4" />
        </div>

        {/* Body Text */}
        <p className="font-sans text-sm sm:text-base leading-relaxed text-brand-ivory/90 max-w-2xl mx-auto">
          Allmoali brings traditional Ayurvedic inspiration into a convenient format designed for modern everyday routines. We aim to make personal care accessible and straightforward, honoring heritage formulations while adapting to active, modern lives.
        </p>

      </div>
    </section>
  );
}
