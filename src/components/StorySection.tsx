"use client";

import React from "react";
import { motion } from "framer-motion";
import { PRODUCT_CONFIG } from "@/config/product";


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
    <section id="story" className="py-10 sm:py-16 md:py-24 bg-brand-ivory border-t border-brand-gold/15 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Story Frame */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl mx-auto bg-white rounded-3xl p-5 sm:p-10 border border-brand-gold/20 shadow-[0_12px_40px_rgba(23,59,47,0.05)] relative"
        >
          {/* Eyebrow */}
          <motion.div variants={itemVariants} className="text-center mb-6">
            <span className="font-sans text-[11px] sm:text-xs uppercase tracking-[0.25em] text-brand-terracotta font-extrabold block">
              THE STORY BEHIND
            </span>
            <div className="w-12 h-0.5 bg-brand-terracotta mx-auto mt-2" />
          </motion.div>

          {/* Key Typography Highlights */}
          <motion.div variants={itemVariants} className="text-center my-6 space-y-2">
            <p className="font-serif text-2xl sm:text-4xl italic text-brand-green font-bold leading-tight">
              &ldquo;Most oils talk to the skin.&rdquo;
            </p>
            <p className="font-serif text-2xl sm:text-4xl italic text-brand-terracotta font-extrabold leading-tight">
              &ldquo;This one goes where the pain actually lives.&rdquo;
            </p>
          </motion.div>

          {/* Main Story Narrative */}
          <motion.p 
            variants={itemVariants} 
            className="font-sans text-sm sm:text-lg text-brand-charcoal/90 leading-relaxed text-center font-medium max-w-2xl mx-auto my-6"
          >
            {PRODUCT_CONFIG.storyBody}
          </motion.p>

          {/* Heritage Pill Badges */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-3 pt-6 border-t border-brand-gold/15"
          >
            <span className="bg-brand-ivory border border-brand-gold/20 text-brand-green font-sans text-xs font-bold px-4 py-2 rounded-full">
              Rooted in a time-honoured Ayurvedic formula
            </span>
            <span className="bg-brand-ivory border border-brand-gold/20 text-brand-terracotta font-sans text-xs font-bold px-4 py-2 rounded-full">
              Enriched with 12 Ayurvedic Herbs
            </span>
          </motion.div>

        </motion.div>

        {/* Traditional Heritage + Modern Application Pillars */}
        <div className="mt-16 border-t border-dashed border-brand-gold/20 pt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-5xl mx-auto">
            
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center px-4"
            >
              <div className="w-10 h-10 rounded-full bg-brand-green text-brand-gold flex items-center justify-center font-sans text-xs font-extrabold mb-4 shadow-xs">
                01
              </div>
              <h4 className="font-display text-base font-bold text-brand-green mb-1.5">TIME-HONOURED FORMULA</h4>
              <p className="font-sans text-xs leading-relaxed text-brand-muted-green">
                Rooted in a time-honoured Ayurvedic formula carefully refined over generations for genuine care.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center px-4"
            >
              <div className="w-10 h-10 rounded-full bg-brand-green text-brand-gold flex items-center justify-center font-sans text-xs font-extrabold mb-4 shadow-xs">
                02
              </div>
              <h4 className="font-display text-base font-bold text-brand-green mb-1.5">12 AYURVEDIC HERBS</h4>
              <p className="font-sans text-xs leading-relaxed text-brand-muted-green">
                Enriched with 12 Ayurvedic Herbs blended in precise proportions for targeted joint & muscular support.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center px-4"
            >
              <div className="w-10 h-10 rounded-full bg-brand-green text-brand-gold flex items-center justify-center font-sans text-xs font-extrabold mb-4 shadow-xs">
                03
              </div>
              <h4 className="font-display text-base font-bold text-brand-green mb-1.5">MODERN D2C EXPERIENCE</h4>
              <p className="font-sans text-xs leading-relaxed text-brand-muted-green">
                Crafted into a lightweight, fast-absorbing oil ideal for frictionless daily massage routines.
              </p>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
}
