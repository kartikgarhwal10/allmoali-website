"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ZoomGalleryProps {
  isOpen: boolean;
  onClose: () => void;
  initialIndex?: number;
}

export default function ZoomGallery({ isOpen, onClose, initialIndex = 0 }: ZoomGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isZoomed, setIsZoomed] = useState(false);



  const galleryImages = [
    {
      src: "/images/product_bottle_only.jpg",
      title: "Product Front View",
      description: "Original 100ml green glass dropper bottle.",
    },
    {
      src: "/images/oil_texture.jpg",
      title: "Close-Up (Texture)",
      description: "Macro shot showcasing lightweight golden droplets.",
    },
    {
      src: "/images/lifestyle_massage.jpg",
      title: "Usage (Massage)",
      description: "A comfortable personal care massage routine.",
    },
    {
      src: "/images/product_box.jpg",
      title: "Product Back & Specifications",
      description: "Label details, regulatory text, and warnings on the outer packaging.",
    },
    {
      src: "/images/product_box_bottle.jpg",
      title: "Ingredients & Efficacy Details",
      description: "Factual composition lists and active extracts.",
    },
  ];

  const handleNext = () => {
    setIsZoomed(false);
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const handlePrev = () => {
    setIsZoomed(false);
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/95 flex flex-col pointer-events-auto select-none"
        >
          {/* Top Header controls */}
          <div className="p-4 flex justify-between items-center bg-black/50 text-white border-b border-white/10 relative z-30">
            <div className="flex flex-col text-left">
              <span className="font-display font-bold text-sm tracking-wide text-brand-gold">
                {galleryImages[currentIndex].title.toUpperCase()}
              </span>
              <span className="font-sans text-[10px] text-white/60">
                {galleryImages[currentIndex].description}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleZoom}
                className="p-2 text-white hover:text-brand-gold focus:outline-none rounded-lg hover:bg-white/5 transition-colors"
                aria-label="Toggle Zoom"
              >
                {isZoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
              </button>
              <button
                onClick={onClose}
                className="p-2 text-white hover:text-brand-gold focus:outline-none rounded-lg hover:bg-white/5 transition-colors"
                aria-label="Close Gallery"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Visual Arena */}
          <div className="flex-1 relative flex items-center justify-center p-4">
            
            {/* Left arrow navigator */}
            <button
              onClick={handlePrev}
              className="absolute left-4 md:left-8 z-20 w-11 h-11 rounded-full bg-black/40 hover:bg-brand-gold hover:text-brand-green flex items-center justify-center text-white transition-colors focus:outline-none"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Slide Image Container */}
            <div className="relative w-full h-full max-w-2xl max-h-[60vh] flex items-center justify-center overflow-hidden">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-full flex items-center justify-center"
              >
                <div
                  onClick={toggleZoom}
                  className={`relative w-full h-full transition-transform duration-300 cursor-zoom-in ${
                    isZoomed ? "scale-150 cursor-zoom-out" : "scale-100"
                  }`}
                >
                  <Image
                    src={galleryImages[currentIndex].src}
                    alt={galleryImages[currentIndex].title}
                    fill
                    sizes="(max-width: 768px) 100vw, 800px"
                    className="object-contain"
                    priority
                  />
                </div>
              </motion.div>
            </div>

            {/* Right arrow navigator */}
            <button
              onClick={handleNext}
              className="absolute right-4 md:right-8 z-20 w-11 h-11 rounded-full bg-black/40 hover:bg-brand-gold hover:text-brand-green flex items-center justify-center text-white transition-colors focus:outline-none"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

          </div>

          {/* Bottom Thumbnails navigation strip */}
          <div className="p-4 bg-black/50 border-t border-white/10 flex justify-center items-center relative z-20">
            <div className="flex gap-3 overflow-x-auto no-scrollbar max-w-full px-4">
              {galleryImages.map((img, idx) => {
                const isActive = currentIndex === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setIsZoomed(false);
                      setCurrentIndex(idx);
                    }}
                    className={`relative w-14 h-14 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 focus:outline-none ${
                      isActive ? "border-brand-gold scale-105" : "border-white/20 hover:border-white/40"
                    }`}
                  >
                    <Image
                      src={img.src}
                      alt={img.title}
                      fill
                      sizes="60px"
                      className="object-cover"
                    />
                    <div className={`absolute inset-0 transition-colors ${
                      isActive ? "bg-transparent" : "bg-black/40"
                    }`} />
                  </button>
                );
              })}
            </div>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
