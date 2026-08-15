"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MessageSquare, ShoppingBag } from "lucide-react";
import { PRODUCT_CONFIG } from "@/config/product";
import { trackEvent } from "@/utils/analytics";

interface OfferSectionProps {
  onOrderClick: (qty: number) => void;
}

export default function OfferSection({ onOrderClick }: OfferSectionProps) {
  const [qty, setQty] = useState(1);

  const handleQtyChange = (delta: number) => {
    setQty((prev) => Math.max(1, prev + delta));
  };

  const whatsappUrl = `https://wa.me/${PRODUCT_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    PRODUCT_CONFIG.whatsappMessage
  )}`;

  const currentPrice = PRODUCT_CONFIG.sellingPrice * qty;

  return (
    <section id="order" className="py-20 bg-brand-ivory border-t border-brand-gold/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="font-sans text-xs uppercase tracking-widest text-brand-gold font-bold mb-3 block">
            LAUNCH SPECIAL
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand-green leading-tight">
            A little more care, for a little less.
          </h2>
          <div className="w-16 h-0.5 bg-brand-gold mx-auto mt-4" />
        </div>

        {/* Offer & Quantity Selector Box */}
        <div className="rounded-3xl border border-brand-gold/15 overflow-hidden shadow-2xl bg-white grid grid-cols-1 md:grid-cols-12 items-stretch">
          
          {/* Visual Column */}
          <div className="md:col-span-5 bg-brand-green/5 p-8 flex flex-col justify-center items-center border-b md:border-b-0 md:border-r border-brand-gold/10 relative min-h-[260px]">
            <div className="relative w-48 h-48 aspect-square rounded-2xl overflow-hidden p-2 bg-linear-to-b from-brand-gold/10 to-transparent border border-brand-gold/10 shadow-md">
              <Image
                src="/images/product_bottle.jpg"
                alt="Allmoali Joint Pain Oil checkout showcase"
                fill
                sizes="(max-width: 768px) 100vw, 240px"
                className="object-cover rounded-xl"
              />
            </div>
            <span className="font-display text-base font-bold text-brand-green mt-4 block">
              {PRODUCT_CONFIG.productName}
            </span>
          </div>

          {/* Pricing & Control Column */}
          <div className="md:col-span-7 p-8 md:p-10 flex flex-col justify-between">
            <div>
              {/* Product Badge */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="font-display text-xl font-bold text-brand-green">
                    Joint & Muscular Pain Oil
                  </h4>
                  <span className="font-sans text-[10px] text-brand-muted-green block mt-1">
                    Authentic 50-year-old traditional formula.
                  </span>
                </div>
                <span className="bg-brand-gold text-brand-green font-sans text-[10px] font-black px-3 py-1 rounded-md uppercase tracking-wider">
                  {PRODUCT_CONFIG.discount}% OFF
                </span>
              </div>

              {/* Price Calculation details */}
              <div className="space-y-3.5 py-5 border-t border-b border-brand-gold/10 my-6">
                <div className="flex justify-between text-xs">
                  <span className="font-sans text-brand-muted-green">MRP (Single Bottle)</span>
                  <span className="font-sans text-brand-charcoal line-through">₹{PRODUCT_CONFIG.mrp}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="font-sans text-brand-muted-green">Launch Discount ({PRODUCT_CONFIG.discount}%)</span>
                  <span className="font-sans text-emerald-600 font-bold">-₹{PRODUCT_CONFIG.mrp - PRODUCT_CONFIG.sellingPrice}</span>
                </div>

                {/* Quantity Control Selector */}
                <div className="flex items-center justify-between pt-3 border-t border-dashed border-brand-gold/10">
                  <span className="font-sans text-xs font-bold text-brand-green">QUANTITY</span>
                  <div className="flex items-center border border-brand-gold/25 rounded-md overflow-hidden bg-brand-ivory">
                    <button
                      onClick={() => handleQtyChange(-1)}
                      className="px-3 py-1.5 text-xs font-bold hover:bg-brand-gold/10 focus:outline-none"
                    >
                      -
                    </button>
                    <span className="px-4 py-1.5 text-xs font-sans font-bold text-brand-green min-w-[20px] text-center">
                      {qty}
                    </span>
                    <button
                      onClick={() => handleQtyChange(1)}
                      className="px-3 py-1.5 text-xs font-bold hover:bg-brand-gold/10 focus:outline-none"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Live total */}
                <div className="flex justify-between items-baseline pt-4 border-t border-brand-gold/15">
                  <span className="font-display text-sm font-bold text-brand-green">Total Special Price</span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-2xl font-bold text-brand-green">₹{currentPrice}</span>
                    <span className="font-sans text-[9px] text-brand-muted-green font-bold">COD Available</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-4">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  trackEvent("ClickOrder", { location: "offer_section" });
                  onOrderClick(qty);
                }}
                className="w-full flex items-center justify-center gap-2.5 bg-brand-green text-brand-ivory hover:bg-brand-green/95 border border-transparent py-3.5 rounded-full font-sans text-xs font-bold tracking-widest uppercase transition-all duration-200 shadow-sm"
              >
                <ShoppingBag className="w-4 h-4" />
                ORDER NOW
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("WhatsAppClick", { location: "offer_section" })}
                className="w-full flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-full font-sans text-xs font-bold tracking-widest uppercase transition-all duration-200 shadow-sm text-center"
              >
                <MessageSquare className="w-4 h-4" />
                ORDER VIA WHATSAPP
              </a>
            </div>

          </div>

        </div>

        {/* Price Demo Disclaimer */}
        <div className="mt-4 text-center select-none">
          <span className="font-sans text-[10px] text-brand-muted-green/75 block">
            Offer price shown for demonstration. Final pricing to be confirmed by Allmoali.
          </span>
        </div>

      </div>
    </section>
  );
}
