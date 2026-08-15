"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Compass, Flame, Feather, Compass as AromaIcon } from "lucide-react"; // Flame (absorbing), Feather (sticky), Compass/Wind (aroma)

export default function InteractiveShowcase() {
  const callouts = [
    {
      title: "50-YEAR FORMULA",
      desc: "Inspired by a traditional Ayurvedic recipe perfected over five decades.",
      icon: <Compass className="w-5 h-5 text-brand-gold" />,
      align: "left", // Left side on desktop
      hoverOffset: 8, // Translate right on hover
    },
    {
      title: "FAST ABSORBING",
      desc: "Lighter consistency designed to absorb quickly during massage.",
      icon: <Flame className="w-5 h-5 text-brand-gold" />,
      align: "left", // Left side on desktop
      hoverOffset: 8,
    },
    {
      title: "NON-STICKY",
      desc: "Formulated for clean application without leaving a greasy layer.",
      icon: <Feather className="w-5 h-5 text-brand-gold" />,
      align: "right", // Right side on desktop
      hoverOffset: -8, // Translate left on hover
    },
    {
      title: "PLEASANT AROMA",
      desc: "A soft, relaxing aroma that enhances your daily wellness ritual.",
      icon: <AromaIcon className="w-5 h-5 text-brand-gold" />,
      align: "right", // Right side on desktop
      hoverOffset: -8,
    },
  ];

  const leftCallouts = callouts.filter((c) => c.align === "left");
  const rightCallouts = callouts.filter((c) => c.align === "right");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  return (
    <section className="py-20 md:py-28 bg-brand-green text-brand-ivory border-t border-brand-gold/10 overflow-hidden relative">
      {/* Decorative glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-gold/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="font-sans text-xs uppercase tracking-widest text-brand-gold font-bold mb-3 block">
            INTERACTIVE EXPERIENCE
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold leading-tight">
            Designed for Your Senses
          </h2>
          <div className="w-16 h-0.5 bg-brand-gold mx-auto mt-4" />
        </div>

        {/* Desktop Layout (lg and up) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="hidden lg:grid grid-cols-12 gap-8 items-center"
        >
          {/* Left Column Callouts */}
          <div className="col-span-4 flex flex-col gap-12 text-right">
            {leftCallouts.map((item, idx) => (
              <motion.div
                key={idx}
                variants={cardVariants}
                whileHover={{ x: item.hoverOffset }}
                className="p-6 rounded-2xl bg-white/5 border border-brand-gold/10 hover:border-brand-gold/35 transition-all duration-300 flex flex-col items-end gap-3 cursor-pointer shadow-xs"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center text-brand-gold border border-brand-gold/20">
                  {item.icon}
                </div>
                <h3 className="font-display text-base font-bold text-white tracking-wide uppercase">
                  {item.title}
                </h3>
                <p className="font-sans text-xs leading-relaxed text-brand-ivory/70">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Center Column: Product bottle display */}
          <div className="col-span-4 flex justify-center items-center relative py-6">
            <div className="relative w-72 h-72 xl:w-80 xl:h-80">
              <div className="absolute inset-0 bg-radial from-brand-gold/15 to-transparent scale-110 blur-xl rounded-full" />
              <div className="w-full h-full relative p-3 bg-linear-to-b from-brand-gold/10 to-transparent border border-brand-gold/20 rounded-[32px] shadow-2xl flex items-center justify-center animate-float">
                <Image
                  src="/images/product_bottle.jpg"
                  alt="Allmoali pain oil bottle center display"
                  fill
                  sizes="320px"
                  className="object-cover rounded-[24px]"
                />
              </div>
            </div>
          </div>

          {/* Right Column Callouts */}
          <div className="col-span-4 flex flex-col gap-12 text-left">
            {rightCallouts.map((item, idx) => (
              <motion.div
                key={idx}
                variants={cardVariants}
                whileHover={{ x: item.hoverOffset }}
                className="p-6 rounded-2xl bg-white/5 border border-brand-gold/10 hover:border-brand-gold/35 transition-all duration-300 flex flex-col items-start gap-3 cursor-pointer shadow-xs"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center text-brand-gold border border-brand-gold/20">
                  {item.icon}
                </div>
                <h3 className="font-display text-base font-bold text-white tracking-wide uppercase">
                  {item.title}
                </h3>
                <p className="font-sans text-xs leading-relaxed text-brand-ivory/70">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mobile/Tablet Stacked Layout */}
        <div className="lg:hidden flex flex-col gap-8 items-center">
          {/* Bottle display */}
          <div className="relative w-60 h-60 flex justify-center items-center mb-4">
            <div className="absolute inset-0 bg-radial from-brand-gold/15 to-transparent scale-110 blur-xl rounded-full" />
            <div className="w-full h-full relative p-3 bg-linear-to-b from-brand-gold/10 to-transparent border border-brand-gold/20 rounded-[28px] shadow-xl flex items-center justify-center animate-float">
              <Image
                src="/images/product_bottle.jpg"
                alt="Allmoali pain oil bottle center display"
                fill
                sizes="240px"
                className="object-cover rounded-[20px]"
              />
            </div>
          </div>

          {/* Stacked Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
            {callouts.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white/5 border border-brand-gold/10 flex flex-col items-center text-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center text-brand-gold border border-brand-gold/20">
                  {item.icon}
                </div>
                <h3 className="font-display text-sm font-bold text-white tracking-wide uppercase">
                  {item.title}
                </h3>
                <p className="font-sans text-xs leading-relaxed text-brand-ivory/70">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
