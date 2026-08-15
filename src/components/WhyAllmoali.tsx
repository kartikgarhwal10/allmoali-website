"use client";

import React from "react";
import { Compass, Sparkles, Feather, Smile, CheckSquare } from "lucide-react";
import { motion } from "framer-motion";
import { PRODUCT_CONFIG } from "@/config/product";

export default function WhyAllmoali() {
  const icons = [
    <Compass key="compass" className="w-5 h-5 text-brand-gold" />,
    <Sparkles key="sparkles" className="w-5 h-5 text-brand-gold" />,
    <Feather key="feather" className="w-5 h-5 text-brand-gold" />,
    <Smile key="smile" className="w-5 h-5 text-brand-gold" />,
    <CheckSquare key="check" className="w-5 h-5 text-brand-gold" />,
  ];

  return (
    <section className="py-20 bg-brand-ivory border-t border-brand-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-sans text-xs uppercase tracking-widest text-brand-gold font-bold mb-3 block">
            THE DIFFERENCE
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand-green leading-tight">
            What makes Allmoali different?
          </h2>
          <div className="w-16 h-0.5 bg-brand-gold mx-auto mt-4" />
        </div>

        {/* Why cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {PRODUCT_CONFIG.whyAllmoali.map((card, idx) => (
            <motion.div
              key={card.id}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="p-6 rounded-2xl bg-white border border-brand-gold/15 flex flex-col justify-between shadow-xs transition-shadow hover:shadow-md"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-brand-green/5 flex items-center justify-center mb-5 flex-shrink-0">
                  {icons[idx] || <Smile className="w-5 h-5 text-brand-gold" />}
                </div>
                <h3 className="font-display text-base font-bold text-brand-green uppercase tracking-wide mb-3">
                  {card.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm leading-relaxed text-brand-muted-green">
                  {card.description}
                </p>
              </div>
              <div className="mt-6 h-0.5 w-8 bg-brand-gold/40" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
