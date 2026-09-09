"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowRight, AlertCircle, Sparkles } from "lucide-react";

export default function PainkillerPositioning() {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-brand-green text-brand-ivory relative overflow-hidden select-none">
      {/* Decorative ambient background blur */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-2 bg-brand-gold/15 text-brand-gold px-4 py-1.5 rounded-full font-sans text-[11px] sm:text-xs font-black uppercase tracking-widest mb-4 border border-brand-gold/25">
            <Sparkles className="w-3.5 h-3.5" />
            AYURVEDIC MASSAGE ALTERNATIVE
          </span>
          
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6 text-brand-ivory">
            Har baar painkiller pills par nirbhar rahne ki bajay, natural Ayurvedic care ka sahara lein.
          </h2>

          <p className="font-sans text-sm sm:text-lg leading-relaxed text-brand-ivory/85 max-w-2xl mx-auto font-medium">
            Everyday joint aur muscular discomfort ke liye Allmoali ko apni regular massage routine ka hissa banayein.
          </p>
        </div>

        {/* Visual Flow Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-11 gap-6 items-center max-w-4xl mx-auto mb-12">
          
          {/* Chemical Based Approach */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-5 p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/10 text-left flex flex-col justify-between"
          >
            <div>
              <span className="font-sans text-[10px] font-black uppercase tracking-widest text-brand-ivory/60 block mb-2">
                TRADITIONAL RECOURSE
              </span>
              <h3 className="font-display text-lg sm:text-xl font-bold text-white mb-3">
                Chemical-Based Pill Dependence
              </h3>
              <p className="font-sans text-xs sm:text-sm text-brand-ivory/70 leading-relaxed">
                Relying repeatedly on oral pills for everyday discomfort without addressing natural topical massage care.
              </p>
            </div>
          </motion.div>

          {/* Flow Arrow */}
          <div className="md:col-span-1 flex justify-center items-center py-2">
            <div className="w-10 h-10 rounded-full bg-brand-gold/20 border border-brand-gold/30 flex items-center justify-center text-brand-gold rotate-90 md:rotate-0">
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>

          {/* Natural Ayurvedic Massage Care */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-5 p-6 sm:p-8 rounded-3xl bg-white/10 border-2 border-brand-gold/40 text-left shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 bg-brand-gold text-brand-green font-sans text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-bl-xl">
              RECOMMENDED CARE
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="w-5 h-5 text-brand-gold" />
                <span className="font-sans text-[10px] font-black uppercase tracking-widest text-brand-gold">
                  NATURAL AYURVEDIC
                </span>
              </div>
              <h3 className="font-display text-lg sm:text-xl font-bold text-white mb-3">
                NATURAL AYURVEDIC MASSAGE CARE
              </h3>
              <p className="font-sans text-xs sm:text-sm text-brand-ivory/90 leading-relaxed font-medium">
                Based on a time-honoured Ayurvedic formula, enriched with 12 Ayurvedic herbs, topical massage oil for deep skin absorption & gentle muscular care.
              </p>
            </div>
          </motion.div>

        </div>

        {/* Responsible Medical Disclaimer */}
        <div className="max-w-2xl mx-auto p-4 rounded-2xl bg-white/5 border border-brand-gold/15 flex items-center justify-center gap-3 text-center">
          <AlertCircle className="w-4 h-4 text-brand-gold flex-shrink-0" />
          <p className="font-sans text-xs text-brand-ivory/75 leading-relaxed font-medium">
            <strong>Medical Notice:</strong> Prescribed medicines should not be discontinued without professional medical advice.
          </p>
        </div>

      </div>
    </section>
  );
}
