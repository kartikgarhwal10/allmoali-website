"use client";

import React from "react";
import { ShieldCheck, ArrowRight, Target } from "lucide-react";
import { PRODUCT_CONFIG } from "@/config/product";

export default function RootCauseAction() {
  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-brand-ivory to-white border-y border-brand-gold/15 relative overflow-hidden">
      {/* Background Accent Lines */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-terracotta/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-green/5 rounded-full blur-3xl pointer-events-none translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Card Frame */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-gold/20 shadow-[0_12px_36px_rgba(23,59,47,0.06)] relative">
          
          {/* Eyebrow Badge */}
          <div className="flex items-center gap-2 mb-4 justify-center sm:justify-start">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-terracotta animate-pulse" />
            <span className="font-sans text-[11px] sm:text-xs font-black uppercase tracking-[0.25em] text-brand-terracotta">
              {PRODUCT_CONFIG.rootCauseHeading}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Copy Column */}
            <div className="lg:col-span-7 text-center sm:text-left">
              <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-brand-green leading-tight mb-4">
                Targeting Where the Discomfort Lives
              </h2>
              
              <p className="font-sans text-sm sm:text-base leading-relaxed text-brand-charcoal font-medium mb-6">
                Most oils only create a cooling or warming feeling on the skin.{" "}
                <span className="text-brand-green font-bold">ALLMOALI</span> oil targets inflammation pathways and supports joint health long-term.
              </p>

              {/* Hindi Supporting Customer-Friendly Line */}
              <div className="p-3.5 rounded-xl bg-brand-ivory/60 border border-brand-gold/15 flex items-start gap-3 text-left">
                <ShieldCheck className="w-5 h-5 text-brand-terracotta shrink-0 mt-0.5" />
                <p className="font-sans text-xs sm:text-sm text-brand-muted-green font-semibold leading-relaxed">
                  Har baar chemical-based pain relief options par nirbhar rahne ke bajay, natural Ayurvedic care ko apni routine ka hissa banayein.
                </p>
              </div>
            </div>

            {/* Right Comparison Visual Layout */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              
              {/* Other Oils */}
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 opacity-75 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gray-200 text-gray-500 flex items-center justify-center font-bold text-xs shrink-0">
                  VS
                </div>
                <div>
                  <span className="font-sans text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Ordinary Surface Oils</span>
                  <span className="font-sans text-xs text-gray-600 font-medium">Temporary skin sensory feeling (cooling/warming only)</span>
                </div>
              </div>

              {/* Arrow Indicator */}
              <div className="flex justify-center my-[-4px]">
                <ArrowRight className="w-4 h-4 text-brand-terracotta rotate-90" />
              </div>

              {/* Allmoali Action */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-brand-green to-[#1e4d3e] text-white border border-brand-gold/30 shadow-md flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-brand-terracotta text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <span className="font-sans text-[10px] font-black text-brand-gold uppercase tracking-widest block">ALLMOALI ACTION</span>
                  <p className="font-sans text-xs sm:text-sm font-bold text-white leading-snug">
                    Targets inflammation pathways + supports joint health long-term.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
