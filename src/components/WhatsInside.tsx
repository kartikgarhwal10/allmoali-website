"use client";

import React from "react";
import { Info } from "lucide-react";
import { PRODUCT_CONFIG } from "@/config/product";

export default function WhatsInside() {
  const hasIngredients = PRODUCT_CONFIG.ingredientsList && PRODUCT_CONFIG.ingredientsList.length > 0;

  return (
    <section className="py-20 bg-brand-green text-brand-ivory border-t border-brand-gold/10 relative overflow-hidden">
      {/* Subtle Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-brand-gold/5 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Header */}
        <div className="mb-12">
          <span className="font-sans text-xs uppercase tracking-widest text-brand-gold font-bold mb-3 block">
            FORMULA INGREDIENTS
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold leading-tight">
            What&apos;s Inside
          </h2>
          <div className="w-16 h-0.5 bg-brand-gold mx-auto mt-4" />
        </div>

        {hasIngredients ? (
          /* When real ingredients are supplied */
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {PRODUCT_CONFIG.ingredientsList.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 text-left flex gap-4 items-start"
              >
                <div>
                  <h3 className="font-display text-base font-bold text-white mb-2 leading-tight">
                    {item.name}
                  </h3>
                  <p className="font-sans text-xs leading-relaxed text-brand-ivory/70">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* If ingredients are unavailable */
          <div className="p-8 rounded-2xl bg-white/5 border border-brand-gold/15 flex flex-col items-center justify-center text-center max-w-xl mx-auto shadow-sm">
            <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center mb-4 text-brand-gold border border-brand-gold/20">
              <Info className="w-5 h-5" />
            </div>
            <p className="font-sans text-xs sm:text-sm text-brand-ivory/95 leading-relaxed font-medium">
              {PRODUCT_CONFIG.ingredientsDisclaimer}
            </p>
          </div>
        )}

      </div>
    </section>
  );
}
