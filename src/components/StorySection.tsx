"use client";

import React from "react";
import { motion } from "framer-motion";


export default function StorySection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
  };

  return (
    <section id="formula" className="py-12 sm:py-16 md:py-24 bg-brand-ivory border-t border-brand-gold/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center"
        >
          {/* Left Column: Outline 50 */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left relative"
          >
            <div className="relative select-none pointer-events-none">
              <span className="text-stroke-gold text-[100px] xs:text-[140px] sm:text-[180px] lg:text-[240px] font-serif font-black leading-none opacity-80 block select-none">
                50
              </span>
              <div className="absolute top-1/2 left-1/2 lg:left-0 transform -translate-x-1/2 -translate-y-1/2 lg:translate-x-0 w-28 h-28 bg-brand-gold/10 rounded-full blur-xl -z-10" />
            </div>
            <span className="font-sans text-[11px] sm:text-xs uppercase tracking-widest text-brand-gold font-bold -mt-2 mb-4">
              Years of Formula Heritage
            </span>
          </motion.div>

          {/* Right Column: Content */}
          <motion.div variants={itemVariants} className="lg:col-span-7 flex flex-col text-left min-w-0">
            <span className="font-sans text-[11px] sm:text-xs uppercase tracking-widest text-brand-gold font-bold mb-2 block">
              OUR HERITAGE
            </span>
            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-brand-green leading-tight mb-4 sm:mb-6">
              50 Years of Formula Heritage
            </h2>
            <p className="text-brand-muted-green font-sans text-sm sm:text-lg leading-relaxed mb-4 sm:mb-6">
              Allmoali&apos;s formula is inspired by a traditional Ayurvedic preparation that has been passed down over decades.
            </p>
            <p className="text-brand-muted-green font-sans text-xs sm:text-sm leading-relaxed border-l-2 border-brand-gold pl-4 py-1.5 bg-brand-gold/5">
              Traditional Ayurvedic inspiration, presented in a convenient modern format. Designed for your everyday active routine.
            </p>
          </motion.div>

        </motion.div>

        {/* Minimal Timeline */}
        <div className="mt-20 border-t border-dashed border-brand-gold/20 pt-12 relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 text-center">
            
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center px-4"
            >
              <div className="w-8 h-8 rounded-full bg-brand-green text-brand-gold flex items-center justify-center font-sans text-xs font-bold mb-4">
                1
              </div>
              <h5 className="font-display text-base font-bold text-brand-green mb-1.5">AYURVEDIC INSPIRATION</h5>
              <p className="font-sans text-xs leading-relaxed text-brand-muted-green max-w-xs">
                Rooted in traditional preparations using cold-pressed extracts and select natural herbs.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center px-4"
            >
              <div className="w-8 h-8 rounded-full bg-brand-green text-brand-gold flex items-center justify-center font-sans text-xs font-bold mb-4">
                2
              </div>
              <h5 className="font-display text-base font-bold text-brand-green mb-1.5">50-YEAR HERITAGE</h5>
              <p className="font-sans text-xs leading-relaxed text-brand-muted-green max-w-xs">
                Perfected over half a century of heritage, ensuring a balanced, high-stability topical preparation.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center px-4"
            >
              <div className="w-8 h-8 rounded-full bg-brand-green text-brand-gold flex items-center justify-center font-sans text-xs font-bold mb-4">
                3
              </div>
              <h5 className="font-display text-base font-bold text-brand-green mb-1.5">MODERN APPLICATION</h5>
              <p className="font-sans text-xs leading-relaxed text-brand-muted-green max-w-xs">
                Refined into a lightweight, fast-absorbing oil for frictionless application.
              </p>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
}
