"use client";

import React from "react";
import Image from "next/image";
import { ShoppingBag, ZoomIn } from "lucide-react";

interface ProductShowcaseProps {
  onOrderClick: () => void;
  onGalleryClick: (idx: number) => void;
}

export default function ProductShowcase({ onOrderClick, onGalleryClick }: ProductShowcaseProps) {
  const [activeIdx, setActiveIdx] = React.useState(0);

  // Client-supplied gallery thumbnails
  const thumbnails = [
    { title: "Bottle", src: "/images/product_hero_bottle.jpg" },
    { title: "Set", src: "/images/allmoali-box-bottle-white-bg.jpg" },
    { title: "2 PCS", src: "/images/product_bundle_pack2.jpg" },
    { title: "Lifestyle", src: "/images/lifestyle_model.jpg" },
    { title: "Herbs", src: "/images/ayurvedic_ingredients.jpg" },
  ];

  return (
    <section id="benefits" className="py-10 sm:py-16 md:py-24 bg-brand-ivory border-t border-brand-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* Left Column: Image Gallery Visuals */}
          <div className="lg:col-span-6 flex flex-col gap-3.5">
            {/* Large Active Product Image */}
            <div
              onClick={() => onGalleryClick(activeIdx)}
              className="relative w-full aspect-square rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-brand-gold/15 p-3 sm:p-4 shadow-md group cursor-zoom-in"
            >
              <Image
                key={thumbnails[activeIdx].src}
                src={thumbnails[activeIdx].src}
                alt={`ALLMOALI product view ${thumbnails[activeIdx].title}`}
                fill
                sizes="(max-width: 768px) 92vw, 600px"
                className="object-contain rounded-xl group-hover:scale-101 transition-transform duration-500"
                priority
              />
              <div className="absolute bottom-4 right-4 bg-black/60 text-white p-2.5 rounded-full backdrop-blur-md opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-4 h-4" />
              </div>
            </div>

            {/* Gallery Thumbnails Horizontal Touch Carousel / Grid */}
            <div className="flex sm:grid sm:grid-cols-5 gap-2.5 overflow-x-auto no-scrollbar pb-1">
              {thumbnails.map((thumb, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveIdx(idx);
                    onGalleryClick(idx);
                  }}
                  className={`relative shrink-0 w-16 h-16 sm:w-auto sm:h-auto aspect-square rounded-xl overflow-hidden transition-all group cursor-pointer touch-target ${
                    activeIdx === idx
                      ? "border-2 border-brand-terracotta ring-2 ring-brand-terracotta/20 bg-white"
                      : "border border-brand-gold/15 bg-white/80 hover:border-brand-gold"
                  }`}
                >
                  <Image
                    src={thumb.src}
                    alt={`ALLMOALI product view ${thumb.title}`}
                    fill
                    sizes="80px"
                    className="object-contain p-1 group-hover:scale-105 transition-transform"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                  {/* Subtle label overlay */}
                  <span className={`absolute bottom-0 left-0 w-full text-center font-sans text-[8px] font-black uppercase py-0.5 ${
                    activeIdx === idx ? "bg-brand-terracotta text-white" : "bg-white/80 text-brand-green"
                  }`}>
                    {thumb.title}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Copywriting & Checkout CTAs */}
          <div className="lg:col-span-6 text-left min-w-0">
            <span className="font-sans text-[11px] sm:text-xs uppercase tracking-widest text-brand-terracotta font-extrabold mb-2 block">
              EVERYDAY MASSAGE BENEFIT
            </span>
            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-brand-green leading-tight mb-4 sm:mb-6">
              Made for Your Everyday Massage Routine
            </h2>
            <p className="text-brand-muted-green font-sans text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 font-medium">
              Based on a time-honoured Ayurvedic formula and enriched with 12 Ayurvedic herbs, ALLMOALI Joint & Muscular Pain Oil is crafted for fast absorption, non-greasy feel, and deep penetration during massage.
            </p>

            {/* 4 Key Benefits Callouts Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
              <div className="p-3.5 rounded-2xl bg-white border border-brand-gold/15 shadow-2xs">
                <span className="font-sans text-[10px] font-black text-brand-terracotta uppercase tracking-wider block mb-1">01 • FAST ABSORBING</span>
                <p className="font-sans text-xs text-brand-green font-bold">Quickly absorbs into skin during massage.</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-brand-gold/15 shadow-2xs">
                <span className="font-sans text-[10px] font-black text-brand-terracotta uppercase tracking-wider block mb-1">02 • NON-GREASY</span>
                <p className="font-sans text-xs text-brand-green font-bold">Lightweight finish without leaving a sticky layer.</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-brand-gold/15 shadow-2xs">
                <span className="font-sans text-[10px] font-black text-brand-terracotta uppercase tracking-wider block mb-1">03 • DEEP PENETRATION</span>
                <p className="font-sans text-xs text-brand-green font-bold">Targets inflammation pathways where discomfort lives.</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-brand-gold/15 shadow-2xs">
                <span className="font-sans text-[10px] font-black text-brand-terracotta uppercase tracking-wider block mb-1">04 • PLEASANT AROMA</span>
                <p className="font-sans text-xs text-brand-green font-bold">Relaxing herbal fragrance for a soothing daily ritual.</p>
              </div>
            </div>

            {/* CTA action */}
            <div className="pt-2">
              <button
                onClick={onOrderClick}
                className="flex w-full sm:w-auto items-center justify-center gap-2.5 bg-brand-terracotta text-white hover:bg-[#a94e31] active:scale-97 py-4 px-9 rounded-full font-sans text-xs font-black tracking-widest uppercase transition-all duration-200 shadow-md group touch-target h-[48px]"
              >
                <ShoppingBag className="w-4 h-4" />
                ORDER NOW — ₹286
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

