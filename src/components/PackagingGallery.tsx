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
      title: "Front View",
      desc: "Authentic green glass bottle designed to protect natural oils.",
      src: "/images/product_bottle.jpg",
      idx: 0,
    },
    {
      title: "Texture",
      desc: "Close-up showcasing lightweight golden droplets.",
      src: "/images/oil_texture.jpg",
      idx: 1,
    },
    {
      title: "Directions",
      desc: "Easy, simple massage instructions printed clearly for reference.",
      src: "/images/lifestyle_massage.jpg",
      idx: 2,
    },
    {
      title: "Back View",
      desc: "Contains manufacturing facts, licensing, and brand details.",
      src: "/images/product_bottle.jpg",
      idx: 3,
    },
    {
      title: "Ingredients",
      desc: "Factual composition list detailing natural botanical heritage.",
      src: "/images/product_bottle.jpg",
      idx: 4,
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-brand-ivory border-t border-brand-gold/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="font-sans text-xs uppercase tracking-widest text-brand-gold font-bold mb-3 block">
            PACKAGING DETAILS
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand-green leading-tight">
            Take a closer look.
          </h2>
          <div className="w-16 h-0.5 bg-brand-gold mx-auto mt-4" />
        </div>

        {/* Grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              onClick={() => onGalleryClick(item.idx)}
              className="group cursor-zoom-in flex flex-col justify-between h-full p-5 rounded-3xl bg-white border border-brand-gold/15 shadow-xs hover:border-brand-gold/45 hover:shadow-md transition-all duration-300"
            >
              <div>
                {/* Image Frame */}
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-brand-green/5 border border-brand-gold/10 p-2 mb-5">
                  <Image
                    src={item.src}
                    alt={`Allmoali packaging ${item.title}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 200px"
                    className="object-cover rounded-xl group-hover:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 flex items-center justify-center">
                    <div className="bg-black/60 text-white p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-xs">
                      <ZoomIn className="w-4 h-4" />
                    </div>
                  </div>
                </div>
                
                {/* Text Content */}
                <h3 className="font-display text-base font-bold text-brand-green uppercase tracking-wide mb-2">
                  {item.title}
                </h3>
                <p className="font-sans text-xs leading-relaxed text-brand-muted-green">
                  {item.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-brand-gold/5 flex justify-between items-center text-[10px] font-sans uppercase font-bold text-brand-gold tracking-widest">
                <span>View Details</span>
                <span>➔</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
