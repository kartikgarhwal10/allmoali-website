"use client";

import React from "react";
import { Star, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { PRODUCT_CONFIG } from "@/config/product";

export default function Reviews() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
  };

  return (
    <section id="reviews" className="py-20 bg-brand-ivory border-t border-brand-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="font-sans text-xs uppercase tracking-widest text-brand-gold font-bold mb-3 block">
            USER TESTIMONIALS
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand-green leading-tight">
            What Customers Say
          </h2>
          <div className="w-16 h-0.5 bg-brand-gold mx-auto mt-4" />
        </div>

        {/* Verification Policy Alert Box */}
        <div className="p-6 rounded-2xl bg-white border border-brand-gold/15 flex flex-col sm:flex-row items-center gap-4 text-left max-w-2xl mx-auto mb-12 shadow-xs">
          <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center flex-shrink-0">
            <AlertCircle className="w-5 h-5 text-brand-gold" />
          </div>
          <div>
            <h4 className="font-sans text-xs font-bold text-brand-green uppercase tracking-wider mb-1">
              Verified Reviews Notice
            </h4>
            <p className="font-sans text-xs text-brand-muted-green leading-relaxed">
              Once real reviews are provided by the brand, they will display verified buyer badges, purchase dates, and photos. Until then, demo testers feedback is displayed below.
            </p>
          </div>
        </div>

        {/* Demo reviews cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex overflow-x-auto md:grid md:grid-cols-2 snap-x snap-mandatory gap-6 md:gap-8 max-w-4xl mx-auto no-scrollbar pb-6"
        >
          {PRODUCT_CONFIG.reviews.map((review, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              className="snap-start min-w-[285px] xs:min-w-[320px] md:min-w-0 p-8 rounded-3xl bg-white border border-brand-gold/15 flex flex-col justify-between shadow-xs relative flex-shrink-0 md:flex-shrink"
            >
              <div>
                {/* Rating stars */}
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: review.rating }).map((_, sIdx) => (
                    <Star key={sIdx} className="w-4 h-4 text-brand-gold fill-brand-gold" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="font-sans text-sm leading-relaxed text-brand-charcoal mb-6 italic">
                  &ldquo;{review.text}&rdquo;
                </p>
              </div>

              {/* Author & Label */}
              <div className="flex justify-between items-center pt-4 border-t border-brand-gold/5 mt-auto">
                <span className="font-sans text-xs font-bold text-brand-green">
                  — {review.author}
                </span>
                <span className="bg-brand-gold/10 text-brand-gold border border-brand-gold/25 font-sans text-[9px] font-black uppercase px-2 py-0.5 rounded-md">
                  Sample Review — Demo
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
