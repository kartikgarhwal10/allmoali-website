"use client";

import React from "react";
import Image from "next/image";
import { ShoppingBag, ZoomIn } from "lucide-react";

interface ProductShowcaseProps {
  onOrderClick: () => void;
  onGalleryClick: (idx: number) => void;
}

export default function ProductShowcase({ onOrderClick, onGalleryClick }: ProductShowcaseProps) {
  // Gallery thumbnails
  const thumbnails = [
    { title: "Front", src: "/images/product_bottle.jpg" },
    { title: "Texture", src: "/images/oil_texture.jpg" },
    { title: "Usage", src: "/images/lifestyle_massage.jpg" },
    { title: "Back", src: "/images/product_bottle.jpg" },
    { title: "Labels", src: "/images/product_bottle.jpg" },
  ];

  return (
    <section id="product" className="py-12 sm:py-16 md:py-24 bg-brand-ivory border-t border-brand-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* Left Column: Image Gallery Visuals */}
          <div className="lg:col-span-6 flex flex-col gap-3.5">
            {/* Large Active Product Image */}
            <div
              onClick={() => onGalleryClick(0)}
              className="relative w-full aspect-square rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-brand-gold/15 p-3 sm:p-4 shadow-md group cursor-zoom-in"
            >
              <Image
                src="/images/product_bottle.jpg"
                alt="Allmoali pain oil bottle packaging"
                fill
                sizes="(max-width: 768px) 92vw, 600px"
                className="object-cover rounded-xl group-hover:scale-101 transition-transform duration-500"
                loading="lazy"
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
                  onClick={() => onGalleryClick(idx)}
                  className="relative shrink-0 w-16 h-16 sm:w-auto sm:h-auto aspect-square rounded-xl overflow-hidden border border-brand-gold/15 bg-white shadow-xs focus:outline-none hover:border-brand-gold transition-colors group cursor-zoom-in touch-target"
                >
                  <Image
                    src={thumb.src}
                    alt={`Allmoali product view ${thumb.title}`}
                    fill
                    sizes="80px"
                    className="object-cover group-hover:scale-105 transition-transform"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                  {/* Subtle label overlay */}
                  <span className="absolute bottom-0 left-0 w-full text-center font-sans text-[8px] font-black uppercase text-brand-green bg-white/80 py-0.5">
                    {thumb.title}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Copywriting & Checkout CTAs */}
          <div className="lg:col-span-6 text-left min-w-0">
            <span className="font-sans text-[11px] sm:text-xs uppercase tracking-widest text-brand-gold font-bold mb-2 block">
              PRODUCT SHOWCASE
            </span>
            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-brand-green leading-tight mb-4 sm:mb-6">
              Made for Your Everyday Massage Routine
            </h2>
            <p className="text-brand-muted-green font-sans text-sm sm:text-lg leading-relaxed mb-6 sm:mb-8">
              Lightweight, fast-absorbing oil with a non-sticky feel and a pleasant fragrance. Formulated for everyday self-care, massage, and muscle fatigue care.
            </p>

            {/* Quick check checklist */}
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3 font-sans text-xs sm:text-sm font-bold text-brand-green">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0" />
                Lightweight structure for friction-free glide
              </li>
              <li className="flex items-center gap-3 font-sans text-xs sm:text-sm font-bold text-brand-green">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0" />
                Designed to absorb quickly under light massage
              </li>
              <li className="flex items-center gap-3 font-sans text-xs sm:text-sm font-bold text-brand-green">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0" />
                Soothing aroma for a refreshing massage routine
              </li>
            </ul>

            {/* CTA action */}
            <div className="pt-2">
              <button
                onClick={onOrderClick}
                className="flex w-full sm:w-auto items-center justify-center gap-2.5 bg-brand-green text-brand-ivory active:bg-brand-terracotta py-4 px-9 rounded-full font-sans text-xs font-black tracking-widest uppercase transition-all duration-200 shadow-md group touch-target h-[48px]"
              >
                <ShoppingBag className="w-4 h-4" />
                ORDER NOW
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

