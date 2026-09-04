"use client";

import React from "react";
import Image from "next/image";
import { ZoomIn } from "lucide-react";
import { motion } from "framer-motion";

interface PackagingGalleryProps {
  onGalleryClick: (idx: number) => void;
}

export default function PackagingGallery({ onGalleryClick }: PackagingGalleryProps) {
  const items = [
    {
      title: "Hero Bottle",
      desc: "Original 100ml amber bottle designed to protect natural botanical oils.",
      src: "/images/product_hero_bottle.jpg",
      idx: 0,
    },
    {
      title: "Box & Bottle Set",
      desc: "Authentic outer packaging detailing active extracts and usage directions.",
      src: "/images/product_box_bottle.jpg",
      idx: 1,
    },
    {
      title: "2 PCS Bundle",
      desc: "Pack of 2 bundle offer for double care in your daily massage routine.",
      src: "/images/product_bundle_pack2.jpg",
      idx: 2,
    },
    {
      title: "Everyday Lifestyle",
      desc: "Gentle self-care massage routine for everyday joint and muscular wellness.",
      src: "/images/lifestyle_model.jpg",
      idx: 3,
    },
  ];

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-brand-ivory border-t border-brand-gold/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16 max-w-3xl mx-auto">
          <span className="font-sans text-[11px] sm:text-xs uppercase tracking-widest text-brand-terracotta font-extrabold mb-2 block">
            PRODUCT PRESENTATION
          </span>
          <h2 className="font-display text-2xl sm:text-4xl font-bold text-brand-green leading-tight">
            Take a Closer Look at ALLMOALI
          </h2>
          <div className="w-16 h-0.5 bg-brand-terracotta mx-auto mt-4" />
        </div>

        {/* Rebalanced 4-Column Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 max-w-6xl mx-auto">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              onClick={() => onGalleryClick(item.idx)}
              className="group cursor-zoom-in flex flex-col justify-between h-full p-4 sm:p-5 rounded-3xl bg-white border border-brand-gold/15 shadow-xs hover:border-brand-terracotta/40 hover:shadow-md transition-all duration-300 touch-target"
            >
              <div>
                {/* Image Frame */}
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-brand-gold/10 p-2 mb-4 sm:mb-5">
                  <Image
                    src={item.src}
                    alt={`ALLMOALI packaging ${item.title}`}
                    fill
                    sizes="(max-width: 768px) 90vw, 260px"
                    className="object-contain rounded-xl group-hover:scale-103 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 flex items-center justify-center">
                    <div className="bg-black/60 text-white p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-xs">
                      <ZoomIn className="w-4 h-4" />
                    </div>
                  </div>
                </div>
                
                {/* Text Content */}
                <h3 className="font-display text-base font-bold text-brand-green uppercase tracking-wide mb-2 text-left">
                  {item.title}
                </h3>
                <p className="font-sans text-xs leading-relaxed text-brand-muted-green text-left font-medium">
                  {item.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-brand-gold/10 flex justify-between items-center text-[10px] font-sans uppercase font-black text-brand-terracotta tracking-widest">
                <span>View Fullscreen</span>
                <span>➔</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
