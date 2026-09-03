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
    <section id="faq" className="py-12 sm:py-16 md:py-24 bg-brand-ivory border-t border-brand-gold/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <span className="font-sans text-[11px] sm:text-xs uppercase tracking-widest text-brand-gold font-bold mb-2 block">
            QUESTIONS & ANSWERS
          </span>
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-brand-green leading-tight">
            Frequently Asked Questions
          </h2>
          <div className="w-16 h-0.5 bg-brand-gold mx-auto mt-4" />
        </div>

        {/* Accordions */}
        <div className="space-y-3.5 sm:space-y-4">
          {PRODUCT_CONFIG.faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-brand-gold/15 bg-white overflow-hidden shadow-2xs transition-colors duration-200"
              >
                {/* Header/Toggler Button (Min 44px height) */}
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full min-h-[52px] py-4 px-5 sm:px-8 flex items-center justify-between text-left focus:outline-none select-none cursor-pointer touch-target"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                >
                  <span className="font-display text-sm sm:text-base md:text-lg font-bold text-brand-green pr-4">
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
                      id={`faq-answer-${idx}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-5 sm:px-8 sm:pb-7 border-t border-brand-gold/5 pt-3.5">
                        <p className="font-sans text-xs sm:text-sm leading-relaxed text-brand-muted-green">
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

