"use client";

import React, { useState, useRef } from "react";
import { Star, ChevronLeft, ChevronRight, MessageSquare, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { PRODUCT_CONFIG } from "@/config/product";
import { trackEvent } from "@/utils/analytics";

export default function Reviews() {
  const reviews = PRODUCT_CONFIG.reviews || [];
  const [activeIdx, setActiveIdx] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleScrollTo = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  const handleCarouselScroll = () => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const scrollPosition = container.scrollLeft;
    
    let visibleCols = 1;
    if (window.innerWidth >= 1024) visibleCols = 3;
    else if (window.innerWidth >= 768) visibleCols = 2;

    const cardWidth = container.clientWidth / visibleCols;
    if (cardWidth > 0) {
      const index = Math.round(scrollPosition / cardWidth);
      const newIdx = Math.min(reviews.length - 1, Math.max(0, index));
      if (newIdx !== activeIdx) {
        setActiveIdx(newIdx);
      }
    }
  };

  const scrollPrev = () => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    let visibleCols = 1;
    if (window.innerWidth >= 1024) visibleCols = 3;
    else if (window.innerWidth >= 768) visibleCols = 2;

    const cardWidth = container.clientWidth / visibleCols;
    container.scrollBy({ left: -cardWidth, behavior: "smooth" });
  };

  const scrollNext = () => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    let visibleCols = 1;
    if (window.innerWidth >= 1024) visibleCols = 3;
    else if (window.innerWidth >= 768) visibleCols = 2;

    const cardWidth = container.clientWidth / visibleCols;
    container.scrollBy({ left: cardWidth, behavior: "smooth" });
  };

  const scrollToIdx = (idx: number) => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    let visibleCols = 1;
    if (window.innerWidth >= 1024) visibleCols = 3;
    else if (window.innerWidth >= 768) visibleCols = 2;

    const cardWidth = container.clientWidth / visibleCols;
    container.scrollTo({ left: idx * cardWidth, behavior: "smooth" });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const headingVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
  };

  const whatsappUrl = `https://wa.me/${PRODUCT_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    PRODUCT_CONFIG.whatsappMessage
  )}`;

  return (
    <section id="reviews" className="py-20 md:py-28 bg-brand-ivory border-t border-brand-gold/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={headingVariants}
          className="text-center mb-16"
        >
          <span className="font-sans text-xs uppercase tracking-[0.2em] text-brand-terracotta font-bold mb-3 block">
            REAL CUSTOMER EXPERIENCES
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-green leading-tight">
            Customer Experiences
          </h2>
          <p className="font-sans text-xs sm:text-sm text-brand-muted-green mt-3 max-w-lg mx-auto">
            See what customers have to say about their experience with Allmoali.
          </p>
          <div className="w-16 h-0.5 bg-brand-terracotta mx-auto mt-4" />
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          <motion.div
            ref={carouselRef}
            onScroll={handleCarouselScroll}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex overflow-x-auto snap-x snap-mandatory gap-6 lg:gap-8 no-scrollbar pb-4 px-4 md:px-0 scroll-smooth"
          >
            {reviews.map((review) => (
              <motion.div
                key={review.id}
                variants={cardVariants}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="snap-center shrink-0 w-[86vw] sm:w-[60vw] md:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)] p-6 sm:p-8 rounded-3xl bg-white border border-brand-gold/15 flex flex-col justify-between shadow-[0_8px_30px_rgba(23,59,47,0.02)] hover:shadow-[0_15px_40px_rgba(23,59,47,0.05)] transition-all duration-300"
              >
                <div>
                  {/* Stars */}
                  <div className="flex gap-0.5 mb-5">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-brand-gold fill-brand-gold" />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="font-serif italic text-brand-charcoal text-base sm:text-lg leading-relaxed mb-6 font-light">
                    &ldquo;{review.text}&rdquo;
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-5 border-t border-brand-gold/10 flex justify-between items-center mt-auto">
                  <div className="flex items-center gap-3.5">
                    {/* Initials Avatar */}
                    <div className="w-10 h-10 rounded-full bg-brand-bg-secondary flex items-center justify-center text-brand-green font-sans text-xs font-bold uppercase tracking-wider flex-shrink-0 select-none">
                      {review.avatar}
                    </div>
                    <div>
                      <span className="font-sans text-xs font-bold text-brand-green block leading-tight">
                        {review.name}
                      </span>
                      {review.location && (
                        <span className="font-sans text-[10px] text-brand-muted-green block mt-0.5">
                          {review.location}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Interactive Navigation (Arrows + Dots) */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={scrollPrev}
              className="w-10 h-10 rounded-full border border-brand-gold/20 flex items-center justify-center text-brand-green hover:bg-brand-terracotta hover:text-brand-ivory hover:border-brand-terracotta transition-all cursor-pointer"
              aria-label="Previous Review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-2">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToIdx(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    activeIdx === idx 
                      ? "w-5 bg-brand-terracotta" 
                      : "w-1.5 bg-brand-gold/30"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={scrollNext}
              className="w-10 h-10 rounded-full border border-brand-gold/20 flex items-center justify-center text-brand-green hover:bg-brand-terracotta hover:text-brand-ivory hover:border-brand-terracotta transition-all cursor-pointer"
              aria-label="Next Review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Customer Feedback Highlights (What Customers Mention) */}
        <div className="mt-20 pt-16 border-t border-brand-gold/10 max-w-5xl mx-auto space-y-10">
          <div className="text-center">
            <span className="font-sans text-[10px] font-bold text-brand-terracotta uppercase tracking-[0.2em] mb-2 block">
              WHAT CUSTOMERS MENTION
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-brand-green">
              Product Characteristics
            </h3>
            <div className="w-10 h-0.5 bg-brand-gold mx-auto mt-3" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 bg-white border border-brand-gold/10 rounded-2xl shadow-2xs">
              <span className="font-sans text-xs font-bold text-brand-terracotta tracking-wider uppercase block mb-1">
                FAST ABSORBING
              </span>
              <p className="font-sans text-xs text-brand-muted-green leading-relaxed">
                Light texture designed for easy application.
              </p>
            </div>
            <div className="p-5 bg-white border border-brand-gold/10 rounded-2xl shadow-2xs">
              <span className="font-sans text-xs font-bold text-brand-terracotta tracking-wider uppercase block mb-1">
                NON-STICKY FEEL
              </span>
              <p className="font-sans text-xs text-brand-muted-green leading-relaxed">
                Comfortable application without a heavy greasy feel.
              </p>
            </div>
            <div className="p-5 bg-white border border-brand-gold/10 rounded-2xl shadow-2xs">
              <span className="font-sans text-xs font-bold text-brand-terracotta tracking-wider uppercase block mb-1">
                PLEASANT AROMA
              </span>
              <p className="font-sans text-xs text-brand-muted-green leading-relaxed">
                A gentle fragrance for a relaxing massage experience.
              </p>
            </div>
            <div className="p-5 bg-white border border-brand-gold/10 rounded-2xl shadow-2xs">
              <span className="font-sans text-xs font-bold text-brand-terracotta tracking-wider uppercase block mb-1">
                EASY TO USE
              </span>
              <p className="font-sans text-xs text-brand-muted-green leading-relaxed">
                Simple addition to an everyday massage routine.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Area */}
        <div className="mt-20 pt-12 border-t border-brand-gold/10 text-center space-y-8 max-w-xl mx-auto">
          <h3 className="font-serif italic text-xl sm:text-2xl lg:text-3xl text-brand-green leading-relaxed font-light">
            "Make Allmoali part of your everyday care routine."
          </h3>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={(e) => handleScrollTo(e, "#order")}
              className="flex w-full sm:w-auto items-center justify-center gap-2 bg-[#C5FE01] text-[#16483A] hover:bg-[#b2e600] py-4 px-10 rounded-full font-sans text-xs font-black tracking-widest uppercase transition-all duration-300 shadow-md text-center cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-[#16483A]" />
              ORDER NOW
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("WhatsAppClick", { location: "reviews_cta" })}
              className="flex w-full sm:w-auto items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-4 px-10 rounded-full font-sans text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md text-center"
            >
              <MessageSquare className="w-4 h-4" />
              ORDER ON WHATSAPP
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
