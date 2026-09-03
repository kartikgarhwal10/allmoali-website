"use client";

import React from "react";
import { Compass, Feather, Smile, Flame, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function WhyAllmoali() {
  const cards = [
    {
      id: "01",
      title: "EASY TO APPLY",
      description: "Just a few drops and a gentle massage.",
      icon: <Compass className="w-5 h-5 text-brand-terracotta" />,
    },
    {
      id: "02",
      title: "LIGHTWEIGHT FEEL",
      description: "Designed to absorb without leaving a heavy, greasy finish.",
      icon: <Feather className="w-5 h-5 text-brand-terracotta" />,
    },
    {
      id: "03",
      title: "A SIMPLE DAILY RITUAL",
      description: "An easy addition to your everyday self-care routine.",
      icon: <Sparkles className="w-5 h-5 text-brand-terracotta" />,
    },
  ];

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-brand-ivory border-t border-brand-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14">
          <span className="font-sans text-[11px] sm:text-xs uppercase tracking-widest text-brand-terracotta font-bold mb-2 block">
            DAILY ROUTINE
          </span>
          <h2 className="font-display text-2xl sm:text-4xl font-bold text-brand-green leading-tight">
            Why make massage part of your routine?
          </h2>
          <div className="w-16 h-0.5 bg-brand-terracotta mx-auto mt-4" />
        </div>

        {/* Why cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {cards.map((card) => (
            <motion.div
              key={card.id}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="p-6 rounded-2xl bg-white border border-brand-gold/15 flex flex-col justify-between shadow-xs transition-shadow hover:shadow-md"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-brand-terracotta/5 flex items-center justify-center mb-5 flex-shrink-0">
                  {card.icon}
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-display text-xs font-bold text-brand-terracotta">{card.id}</span>
                  <h3 className="font-display text-base font-bold text-brand-green uppercase tracking-wide">
                    {card.title}
                  </h3>
                </div>
                <p className="font-sans text-xs sm:text-sm leading-relaxed text-brand-muted-green">
                  {card.description}
                </p>
              </div>
              <div className="mt-6 h-0.5 w-8 bg-brand-terracotta/40" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
