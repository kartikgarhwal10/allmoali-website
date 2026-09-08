"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface GalleryImage {
  src: string;
  title: string;
  description?: string;
}

interface ZoomGalleryProps {
  isOpen: boolean;
  onClose: () => void;
  initialIndex?: number;
  customImages?: GalleryImage[];
}

const DEFAULT_GALLERY_IMAGES: GalleryImage[] = [
  {
    src: "/images/product_hero_bottle.jpg",
    title: "ALLMOALI Joint & Muscular Pain Oil",
    description: "Original 100ml amber bottle designed to protect natural botanical oils.",
  },
  {
    src: "/images/allmoali-box-bottle-white-bg.jpg",
    title: "Box & Bottle Set",
    description: "Authentic outer packaging detailing active extracts and usage directions.",
  },
  {
    src: "/images/product_bundle_pack2.jpg",
    title: "2 PCS Bundle Offer",
    description: "Pack of 2 bundle offer for double care in your daily massage routine.",
  },
  {
    src: "/images/lifestyle_model.jpg",
    title: "Gentle Massage Self-Care",
    description: "Designed for comfortable everyday joint & muscular wellness.",
  },
  {
    src: "/images/ayurvedic_ingredients.jpg",
    title: "12 Ayurvedic Herbs Visual Breakdown",
    description: "Enriched with Alsi, Kapoor, Pudina, Nirgundi, Salai, Haldi, Guggal & more.",
  },
  {
    src: "/images/hero_carousel_5.jpg",
    title: "ALLMOALI Root-Cause Action",
    description: "Targets inflammation pathways for joint and muscular wellness.",
  },
];

export default function ZoomGallery({
  isOpen,
  onClose,
  initialIndex = 0,
  customImages,
}: ZoomGalleryProps) {
  const images = customImages && customImages.length > 0 ? customImages : DEFAULT_GALLERY_IMAGES;
  const safeInitialIndex = Math.min(Math.max(0, initialIndex), images.length - 1);
  const [currentIndex, setCurrentIndex] = useState(safeInitialIndex);
  const [zoomScale, setZoomScale] = useState(1);

  // Sync current index when initialIndex changes or modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(safeInitialIndex);
      setZoomScale(1);
    }
  }, [isOpen, safeInitialIndex]);

  // Lock body scroll while lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleNext = useCallback(() => {
    setZoomScale(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const handlePrev = useCallback(() => {
    setZoomScale(1);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Keyboard navigation & ESC key closing
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, handleNext, handlePrev]);

  const toggleZoom = () => {
    setZoomScale((prev) => (prev > 1 ? 1 : 2.2));
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY < 0) {
      setZoomScale((prev) => Math.min(prev + 0.3, 3.5));
    } else {
      setZoomScale((prev) => Math.max(prev - 0.3, 1));
    }
  };

  const activeImage = images[currentIndex] || images[0];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/95 flex flex-col pointer-events-auto select-none backdrop-blur-sm"
        >
          {/* Top Control Header */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="p-3.5 sm:p-4 flex justify-between items-center bg-black/70 text-white border-b border-white/10 relative z-30 shrink-0"
          >
            <div className="flex flex-col text-left min-w-0 pr-4">
              <span className="font-display font-bold text-xs sm:text-sm tracking-wide text-brand-gold truncate">
                {(activeImage.title || "ALLMOALI PRODUCT VIEW").toUpperCase()}
              </span>
              {activeImage.description && (
                <span className="font-sans text-[10px] sm:text-xs text-white/70 truncate">
                  {activeImage.description}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {zoomScale > 1 && (
                <button
                  onClick={() => setZoomScale(1)}
                  className="p-2 text-white/80 hover:text-brand-gold focus:outline-none rounded-lg hover:bg-white/10 transition-colors flex items-center gap-1 text-[11px] font-sans"
                  title="Reset Zoom"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span className="hidden sm:inline">Reset</span>
                </button>
              )}

              <button
                onClick={toggleZoom}
                className="p-2 text-white/90 hover:text-brand-gold focus:outline-none rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Toggle Zoom"
                title={zoomScale > 1 ? "Zoom Out" : "Zoom In"}
              >
                {zoomScale > 1 ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
              </button>

              <button
                onClick={onClose}
                className="p-2.5 text-white hover:text-brand-gold focus:outline-none rounded-full bg-white/10 hover:bg-white/20 transition-all cursor-pointer touch-target ml-1"
                aria-label="Close Viewer"
                title="Close (ESC)"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>

          {/* Main Visual Lightbox Arena */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex-1 relative flex items-center justify-center p-2 sm:p-6 overflow-hidden"
          >
            {/* Left arrow navigator */}
            {images.length > 1 && (
              <button
                onClick={handlePrev}
                className="absolute left-2 sm:left-6 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-brand-gold hover:text-brand-green flex items-center justify-center text-white transition-all focus:outline-none shadow-lg cursor-pointer touch-target active:scale-95"
                aria-label="Previous Image"
              >
                <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
              </button>
            )}

            {/* Centered Large Image Container */}
            <div
              onWheel={handleWheel}
              className="relative w-full max-w-6xl h-[68vh] sm:h-[78vh] flex items-center justify-center overflow-hidden"
            >
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="relative w-full h-full flex items-center justify-center"
              >
                <motion.div
                  onClick={toggleZoom}
                  animate={{ scale: zoomScale }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className={`relative w-full h-full flex items-center justify-center transition-cursor ${
                    zoomScale > 1 ? "cursor-zoom-out" : "cursor-zoom-in"
                  }`}
                >
                  <Image
                    src={activeImage.src}
                    alt={activeImage.title || "ALLMOALI product detail"}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1400px"
                    className="object-contain rounded-lg pointer-events-auto"
                    priority
                  />
                </motion.div>
              </motion.div>
            </div>

            {/* Right arrow navigator */}
            {images.length > 1 && (
              <button
                onClick={handleNext}
                className="absolute right-2 sm:right-6 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-brand-gold hover:text-brand-green flex items-center justify-center text-white transition-all focus:outline-none shadow-lg cursor-pointer touch-target active:scale-95"
                aria-label="Next Image"
              >
                <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
              </button>
            )}
          </div>

          {/* Bottom Thumbnails Strip */}
          {images.length > 1 && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="p-3 sm:p-4 bg-black/70 border-t border-white/10 flex justify-center items-center relative z-20 shrink-0"
            >
              <div className="flex gap-2.5 overflow-x-auto no-scrollbar max-w-full px-2 py-0.5">
                {images.map((img, idx) => {
                  const isActive = currentIndex === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        setZoomScale(1);
                        setCurrentIndex(idx);
                      }}
                      className={`relative w-12 h-12 sm:w-16 sm:h-16 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 focus:outline-none cursor-pointer ${
                        isActive
                          ? "border-brand-gold ring-2 ring-brand-gold/30 scale-105 bg-white/15"
                          : "border-white/20 hover:border-white/50 bg-black/40 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={img.src}
                        alt={img.title || `Thumbnail ${idx + 1}`}
                        fill
                        sizes="70px"
                        className="object-contain p-1"
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

