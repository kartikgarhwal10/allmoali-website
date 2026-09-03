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
    <section className="relative h-[55vh] md:h-[60vh] flex items-center justify-center overflow-hidden bg-brand-green">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/lifestyle_massage.jpg"
          alt="Ayurvedic self care routine massage"
          fill
          sizes="100vw"
          className="object-cover opacity-35"
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
          <span className="font-sans text-[11px] sm:text-xs uppercase tracking-widest text-brand-gold font-bold mb-3 block">
            EVERYDAY MASSAGE RITUAL
          </span>
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-3 max-w-2xl mx-auto">
            Make Massage Part of Your Routine
          </h2>
          <p className="font-sans text-xs sm:text-sm text-brand-ivory/80 leading-relaxed max-w-lg mx-auto mb-6 sm:mb-8">
            A simple, convenient way to add a massage ritual to your everyday routine.
          </p>

          <div className="flex justify-center">
            <button
              onClick={(e) => {
                e.preventDefault();
                onOrderClick();
              }}
              className="inline-flex items-center gap-2 bg-brand-gold text-brand-green active:bg-brand-ivory border border-transparent py-3.5 px-8 rounded-full font-sans text-xs font-black tracking-widest uppercase transition-all duration-200 shadow-md group touch-target h-[48px] cursor-pointer"
            >
              ORDER NOW
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
