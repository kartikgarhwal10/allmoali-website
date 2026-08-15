"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Droplet, Sparkles, ShieldCheck } from "lucide-react";

export default function TextureExperience() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: "1. The Pure Drop",
      subtitle: "Lightweight & Translucent",
      desc: "Formulated to have a low viscosity, allowing each drop to dispense cleanly, carrying a rich concentration of botanical extracts.",
      icon: <Droplet className="w-5 h-5 text-brand-gold" />,
    },
    {
      title: "2. The Smooth Glade",
      subtitle: "Easy and Frictionless Glide",
      desc: "Spreads effortlessly across the skin, enabling a comfortable massage experience without any rough pulling or stickiness.",
      icon: <Sparkles className="w-5 h-5 text-brand-gold" />,
    },
    {
      title: "3. Complete Absorption",
      subtitle: "Zero Residue, Matte Finish",
      desc: "Within minutes, the oil absorbs deeply into the skin, leaving a comfortable dry finish. No staining on clothes or sheets.",
      icon: <ShieldCheck className="w-5 h-5 text-brand-gold" />,
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-brand-green text-brand-ivory relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-brand-gold/5 blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="font-sans text-xs uppercase tracking-widest text-brand-gold font-bold mb-3 block">
            THE TEXTURE EXPERIENCE
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            Lightweight. Non-Greasy. Easy to Apply.
          </h2>
          <div className="w-20 h-0.5 bg-brand-gold mx-auto mt-6" />
        </div>

        {/* Dynamic Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Showcase */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-[380px] md:h-[380px] rounded-3xl bg-linear-to-b from-brand-gold/15 to-transparent p-3 border border-brand-gold/10 shadow-2xl overflow-hidden flex items-center justify-center">
              
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <Image
                  src="/images/oil_texture.jpg"
                  alt="Allmoali pain relief oil texture showcase"
                  fill
                  className="object-cover transition-all duration-700"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>

              {/* Floating Drop Animation Overlay */}
              <div className="absolute top-6 left-6 bg-brand-green/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-brand-gold/25 flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-brand-gold animate-ping" />
                <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-brand-gold">
                  {steps[activeStep].subtitle}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Description Steps */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            {steps.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`p-6 rounded-2xl border cursor-pointer transition-all duration-300 ${
                    isActive
                      ? "bg-white/10 border-brand-gold/40 shadow-lg translate-x-1"
                      : "bg-white/0 border-brand-gold/5 hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                      isActive ? "bg-brand-gold text-brand-green" : "bg-white/5 text-brand-gold"
                    }`}>
                      {step.icon}
                    </div>
                    <div>
                      <h3 className={`font-display text-lg font-bold transition-colors ${
                        isActive ? "text-brand-gold" : "text-white"
                      }`}>
                        {step.title}
                      </h3>
                      <p className={`font-sans text-xs uppercase tracking-wider transition-colors ${
                        isActive ? "text-brand-ivory" : "text-brand-ivory/60"
                      }`}>
                        {step.subtitle}
                      </p>
                    </div>
                  </div>
                  
                  {/* Expandable description block */}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="font-sans text-sm leading-relaxed text-brand-ivory/80 mt-4 pl-14">
                          {step.desc}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
