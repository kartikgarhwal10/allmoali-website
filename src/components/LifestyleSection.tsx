"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface LifestyleSectionProps {
  onOrderClick: () => void;
}

export default function LifestyleSection({ onOrderClick }: LifestyleSectionProps) {
  return (
    <section className="relative min-h-[360px] sm:min-h-[420px] md:h-[500px] flex items-center justify-center overflow-hidden bg-brand-green py-12 sm:py-16">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/lifestyle_model.jpg"
          alt="ALLMOALI Ayurvedic Joint & Muscular Pain Oil massage routine"
          fill
          sizes="100vw"
          className="object-cover object-[center_25%] opacity-35"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-green via-brand-green/60 to-transparent" />
      </div>

      {/* Content Container */}
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10 text-brand-ivory select-none">
        
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="font-sans text-[11px] sm:text-xs uppercase tracking-widest text-brand-gold font-extrabold mb-3 block">
            EVERYDAY MASSAGE RITUAL
          </span>
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-3 max-w-2xl mx-auto">
            Make ALLMOALI Part of Your Daily Routine
          </h2>
          <p className="font-sans text-xs sm:text-sm text-brand-ivory/90 leading-relaxed max-w-lg mx-auto mb-6 sm:mb-8 font-medium">
            &ldquo;Roz ki massage routine mein ALLMOALI ko shamil karein.&rdquo; A simple, natural way to care for your joints and muscles every day.
          </p>

          <div className="flex justify-center">
            <button
              onClick={(e) => {
                e.preventDefault();
                onOrderClick();
              }}
              className="inline-flex items-center gap-2 bg-brand-terracotta text-white active:bg-[#a94e31] py-4 px-9 rounded-full font-sans text-xs font-black tracking-widest uppercase transition-all duration-200 shadow-lg group touch-target h-[48px] cursor-pointer"
            >
              ORDER NOW — ₹286
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
