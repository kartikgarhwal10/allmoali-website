"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function CareSection() {
  return (
    <section className="py-20 md:py-28 bg-brand-ivory border-t border-brand-gold/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 text-left"
          >
            <span className="font-sans text-xs uppercase tracking-widest text-brand-gold font-bold mb-3 block">
              EVERYDAY CARE
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-green leading-[1.15] mb-6">
              A little care goes a long way.
            </h2>
            <p className="text-brand-charcoal font-sans text-base sm:text-lg leading-relaxed mb-6 font-medium">
              Long days, physical activity and everyday routines can leave your joints and muscles feeling tired.
            </p>
            <p className="text-brand-muted-green font-sans text-sm sm:text-base leading-relaxed border-l-2 border-brand-gold pl-4 py-1.5 bg-brand-gold/5">
              Allmoali is made for those simple moments when you want to pause, massage and take a little care of yourself.
            </p>
          </motion.div>

          {/* Right Column: Premium Lifestyle Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 flex justify-center"
          >
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border border-brand-gold/15 shadow-md">
              <Image
                src="/images/lifestyle_massage.jpg"
                alt="Ayurvedic everyday care massage routine lifestyle"
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-cover hover:scale-[1.01] transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-green/10 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
