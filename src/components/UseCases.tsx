"use client";

import React from "react";
import { Moon, ShieldCheck, Heart } from "lucide-react";
import { PRODUCT_CONFIG } from "@/config/product";

export default function UseCases() {
  const icons = [
    <Moon key="moon" className="w-5 h-5 text-brand-terracotta" />,
    <ShieldCheck key="shield" className="w-5 h-5 text-brand-terracotta" />,
    <Heart key="heart" className="w-5 h-5 text-brand-terracotta" />,
  ];

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-brand-ivory border-t border-brand-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto mb-10 sm:mb-16">
          <span className="font-sans text-[11px] sm:text-xs uppercase tracking-widest text-brand-terracotta font-extrabold mb-2 block">
            TARGETED EVERYDAY CARE
          </span>
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-brand-green leading-tight uppercase">
            WHERE ALLMOALI FITS INTO YOUR ROUTINE
          </h2>
          <p className="font-sans text-xs sm:text-sm text-brand-muted-green mt-3 max-w-xl mx-auto font-semibold">
            Specially designed for knee, back, elbow, shoulder, arthritis, muscular pain, winter joint care, and yoga/exercise recovery.
          </p>
          <p className="font-sans text-xs sm:text-sm text-brand-terracotta font-extrabold mt-2">
            &ldquo;Rozmarra ke joint aur muscular discomfort ke liye — joints aur muscles ki daily care ko simple rakhein.&rdquo;
          </p>
          <div className="w-16 h-0.5 bg-brand-terracotta mx-auto mt-4" />
        </div>

        {/* Use Cases Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-left">
          {PRODUCT_CONFIG.useCases.map((useCase, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white border border-brand-gold/15 shadow-2xs hover:border-brand-terracotta/40 hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-brand-terracotta/10 border border-brand-terracotta/15 flex items-center justify-center mb-5 flex-shrink-0">
                  {icons[idx % icons.length]}
                </div>
                <h3 className="font-display text-base font-bold text-brand-green mb-2.5 uppercase tracking-wide">
                  {useCase.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm leading-relaxed text-brand-muted-green font-medium">
                  {useCase.description}
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-brand-gold/10 text-[10px] font-sans uppercase font-extrabold tracking-widest text-brand-terracotta">
                {useCase.highlight || "Targeted Care"}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
