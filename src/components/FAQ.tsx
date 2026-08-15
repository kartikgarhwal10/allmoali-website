"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PRODUCT_CONFIG } from "@/config/product";

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-brand-ivory border-t border-brand-gold/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="font-sans text-xs uppercase tracking-widest text-brand-gold font-bold mb-3 block">
            QUESTIONS & ANSWERS
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-green leading-tight">
            Frequently Asked Questions
          </h2>
          <div className="w-16 h-0.5 bg-brand-gold mx-auto mt-4" />
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {PRODUCT_CONFIG.faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-brand-gold/15 bg-white overflow-hidden shadow-xs transition-all duration-300 hover:border-brand-gold"
              >
                {/* Header/Toggler Button */}
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full py-5 px-6 md:px-8 flex items-center justify-between text-left focus:outline-none select-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-base md:text-lg font-bold text-brand-green pr-4">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors flex-shrink-0 ${
                    isOpen ? "bg-brand-green text-brand-gold" : "bg-brand-green/5 text-brand-green"
                  }`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {/* Collapsible Answer Panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 md:px-8 md:pb-8 border-t border-brand-gold/5 pt-4">
                        <p className="font-sans text-sm leading-relaxed text-brand-muted-green">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
