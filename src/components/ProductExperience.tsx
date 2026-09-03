"use client";

import React from "react";
import { Compass, Feather, Flame } from "lucide-react";
import { PRODUCT_CONFIG } from "@/config/product";

export default function ProductExperience() {
  const icons = [
    <Flame key="flame" className="w-5 h-5 text-brand-gold animate-pulse" />,
    <Feather key="feather" className="w-5 h-5 text-brand-gold" />,
    <Compass key="compass" className="w-5 h-5 text-brand-gold" />,
  ];

  return (
    <section id="experience" className="py-12 sm:py-16 md:py-24 bg-brand-green text-brand-ivory border-t border-brand-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto mb-10 sm:mb-16">
          <span className="font-sans text-[11px] sm:text-xs uppercase tracking-widest text-brand-gold font-bold mb-2 block">
            THE EXPERIENCE
          </span>
          <h2 className="font-display text-2xl sm:text-4xl font-bold leading-tight">
            Light on the skin. Easy on the routine.
          </h2>
          <div className="w-16 h-0.5 bg-brand-gold mx-auto mt-4" />
        </div>

        {/* Experience Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {PRODUCT_CONFIG.productExperience.map((card, idx) => (
            <div
              key={card.id}
              className="p-8 rounded-3xl bg-white/5 border border-brand-gold/10 hover:border-brand-gold/25 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="font-sans text-xs font-bold text-brand-gold uppercase tracking-wider">
                    Experience {card.id}
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-brand-gold/10 flex items-center justify-center text-brand-gold border border-brand-gold/20">
                    {icons[idx]}
                  </div>
                </div>
                <h3 className="font-display text-xl font-bold text-white mb-4 uppercase tracking-wide">
                  {card.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm leading-relaxed text-brand-ivory/80">
                  {card.description}
                </p>
              </div>
              <div className="mt-8 h-1 w-10 bg-brand-gold/30 rounded-full" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
