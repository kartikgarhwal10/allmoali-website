"use client";

import React from "react";
import { Moon, ShieldCheck, Heart } from "lucide-react";
import { PRODUCT_CONFIG } from "@/config/product";

export default function UseCases() {
  const icons = [
    <Moon key="moon" className="w-5 h-5 text-brand-green" />,
    <ShieldCheck key="shield" className="w-5 h-5 text-brand-green" />,
    <Heart key="heart" className="w-5 h-5 text-brand-green" />,
  ];

  return (
    <section className="py-20 bg-brand-ivory border-t border-brand-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto mb-16">
          <span className="font-sans text-xs uppercase tracking-widest text-brand-gold font-bold mb-3 block">
            APPLICATION MOMENTS
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand-green leading-tight">
            Made for Everyday Moments
          </h2>
          <div className="w-16 h-0.5 bg-brand-gold mx-auto mt-4" />
        </div>

        {/* Use Cases Cards Grid */}
        <div className="flex overflow-x-auto md:grid md:grid-cols-3 snap-x snap-mandatory gap-6 md:gap-8 text-left no-scrollbar pb-6">
          {PRODUCT_CONFIG.useCases.map((useCase, idx) => (
            <div
              key={idx}
              className="snap-start min-w-[285px] xs:min-w-[320px] md:min-w-0 p-8 rounded-3xl bg-white border border-brand-gold/15 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between flex-shrink-0 md:flex-shrink"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-brand-gold flex items-center justify-center mb-6 flex-shrink-0 shadow-sm">
                  {icons[idx] || <Heart className="w-5 h-5 text-brand-green" />}
                </div>
                <h3 className="font-display text-lg font-bold text-brand-green mb-3 uppercase tracking-wide">
                  {useCase.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm leading-relaxed text-brand-muted-green">
                  {useCase.description}
                </p>
              </div>
              <div className="mt-8 text-[10px] font-sans uppercase font-bold tracking-widest text-brand-gold">
                Self-Care Routine
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
