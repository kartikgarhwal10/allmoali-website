"use client";

import React from "react";
import { Compass, Wind, Feather, CheckCircle } from "lucide-react";

export default function TrustStrip() {
  const trustItems = [
    {
      title: "Barson Purane Formula",
      icon: <Compass className="w-5 h-5 text-brand-gold" />,
    },
    {
      title: "12 Jadi-Butiyan",
      icon: <CheckCircle className="w-5 h-5 text-brand-gold" />,
    },
    {
      title: "Deep Penetration",
      icon: <Wind className="w-5 h-5 text-brand-gold" />,
    },
    {
      title: "No Side Effect",
      icon: <Feather className="w-5 h-5 text-brand-gold" />,
    },
  ];

  return (
    <div className="w-full bg-white border-t border-b border-brand-gold/15 py-4 md:py-6 select-none relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-6 items-center justify-items-center md:justify-items-stretch">
          {trustItems.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 text-brand-green font-sans text-xs sm:text-sm font-bold tracking-wide"
            >
              <div className="w-8 h-8 rounded-full bg-brand-green/5 flex items-center justify-center flex-shrink-0">
                {item.icon}
              </div>
              <span>{item.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
