"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MessageSquare, ShoppingBag, ShieldCheck } from "lucide-react";
import { PRODUCT_CONFIG } from "@/config/product";
import { trackEvent } from "@/utils/analytics";

interface OfferSectionProps {
  onOrderClick: (qty: number) => void;
}

export default function OfferSection({ onOrderClick }: OfferSectionProps) {
  // 1 = Single Bottle, 2 = 2-Piece Bundle
  const [selectedOption, setSelectedOption] = useState<1 | 2>(2);

  const whatsappUrl = `https://wa.me/${PRODUCT_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    selectedOption === 2
      ? "Hi, I want to order the Allmoali 2 Bottles Bundle (Best Value) for ₹499. Please share the details."
      : "Hi, I want to order 1 Bottle of Allmoali Joint & Muscular Pain Oil for ₹286. Please share the details."
  )}`;

  const handleOrder = () => {
    trackEvent("ClickOrder", { 
      location: "offer_section", 
      package: selectedOption === 2 ? "2 Bottles Bundle" : "1 Bottle",
      quantity: selectedOption === 2 ? 2 : 1
    });
    onOrderClick(selectedOption === 2 ? 2 : 1);
  };

  return (
    <section id="order" className="py-20 bg-brand-ivory border-t border-brand-gold/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="font-sans text-xs uppercase tracking-widest text-brand-terracotta font-bold mb-3 block">
            Better Value for Your Routine
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-green leading-tight">
            Choose the option that works for you.
          </h2>
          <div className="w-16 h-0.5 bg-brand-terracotta mx-auto mt-4" />
        </div>

        {/* Pricing Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-stretch max-w-4xl mx-auto">
          
          {/* Left Column: Product Photo & Benefits list */}
          <div className="md:col-span-5 flex flex-col justify-center items-center p-8 bg-white rounded-3xl border border-brand-gold/15 shadow-xs">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 aspect-square rounded-2xl overflow-hidden p-2 bg-linear-to-b from-brand-gold/10 to-transparent border border-brand-gold/10 shadow-xs mb-6">
              <Image
                src={selectedOption === 2 ? "/images/product_box_bottle.jpg" : "/images/product_bottle_only.jpg"}
                alt="Allmoali Joint & Muscular Pain Oil package presentation"
                fill
                sizes="(max-width: 768px) 100vw, 280px"
                className="object-cover rounded-xl"
              />
            </div>
            <div className="text-center">
              <h4 className="font-display text-lg font-bold text-brand-green">
                {selectedOption === 2 ? "2 Bottles Bundle" : "Joint & Muscular Pain Oil"}
              </h4>
              <p className="font-sans text-xs text-brand-muted-green mt-1 font-medium">
                {selectedOption === 2 
                  ? "Double the care for a complete everyday massage routine." 
                  : "Barson purane Ayurvedic formula se prerit, 12 jadi-butiyon se samriddh."
                }
              </p>
            </div>
          </div>

          {/* Right Column: Premium Pricing Card */}
          <div className="md:col-span-7 flex flex-col justify-between p-8 sm:p-10 bg-white rounded-3xl border border-brand-gold/15 shadow-md">
            <div>
              {/* Product and Brand Info */}
              <div className="border-b border-brand-gold/10 pb-4 mb-6">
                <span className="font-sans text-[10px] font-bold text-brand-terracotta uppercase tracking-wider block mb-1">
                  ALLMOALI SPECIAL
                </span>
                <h3 className="font-display text-xl font-bold text-brand-green leading-tight">
                  Joint & Muscular Pain Oil
                </h3>
              </div>

              {/* Bundle Selector Options */}
              <div className="space-y-3.5 mb-6">
                {/* Option 1: 1 Bottle */}
                <button
                  type="button"
                  onClick={() => setSelectedOption(1)}
                  className={`w-full p-4 rounded-xl border text-left transition-all duration-300 flex items-center justify-between cursor-pointer ${
                    selectedOption === 1
                      ? "border-brand-terracotta bg-brand-terracotta/5 shadow-xs"
                      : "border-brand-gold/15 hover:border-brand-gold/40 hover:bg-brand-ivory/20"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      selectedOption === 1 ? "border-brand-terracotta" : "border-brand-muted-green"
                    }`}>
                      {selectedOption === 1 && (
                        <div className="w-2 h-2 rounded-full bg-brand-terracotta" />
                      )}
                    </div>
                    <div>
                      <span className="font-sans text-sm font-bold text-brand-green block">1 Bottle</span>
                      <span className="font-sans text-xs text-brand-muted-green font-medium">₹286 + ₹80 delivery</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-display text-base font-bold text-brand-green">₹286</span>
                  </div>
                </button>

                {/* Option 2: 2 Bottles (BEST VALUE) */}
                <button
                  type="button"
                  onClick={() => setSelectedOption(2)}
                  className={`w-full p-4 rounded-xl border text-left transition-all duration-300 flex items-center justify-between relative cursor-pointer ${
                    selectedOption === 2
                      ? "border-brand-terracotta bg-brand-terracotta/5 shadow-xs"
                      : "border-brand-gold/15 hover:border-brand-gold/40 hover:bg-brand-ivory/20"
                  }`}
                >
                  <div className="absolute -top-2.5 right-4 bg-brand-terracotta text-brand-ivory font-sans text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full">
                    BEST VALUE
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      selectedOption === 2 ? "border-brand-terracotta" : "border-brand-muted-green"
                    }`}>
                      {selectedOption === 2 && (
                        <div className="w-2 h-2 rounded-full bg-brand-terracotta" />
                      )}
                    </div>
                    <div>
                      <span className="font-sans text-sm font-bold text-brand-green block">2 Bottles Bundle</span>
                      <span className="font-sans text-xs text-brand-muted-green font-medium">₹499 + ₹80 delivery</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-display text-base font-bold text-brand-green">₹499</span>
                  </div>
                </button>
              </div>

              {/* Pricing breakdown card details */}
              <div className="bg-brand-ivory/30 border border-brand-gold/10 p-4 rounded-xl space-y-3 text-xs mb-6">
                <div className="flex justify-between">
                  <span className="font-sans text-brand-muted-green">Product price ({selectedOption === 2 ? "2 Pcs" : "1 Pc"})</span>
                  <span className="font-sans text-brand-green font-semibold">₹{selectedOption === 2 ? 499 : 286}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-sans text-brand-muted-green">Delivery charge</span>
                  <span className="font-sans text-brand-green font-semibold">₹80</span>
                </div>
                <div className="border-t border-brand-gold/10 pt-3 flex justify-between items-baseline font-bold">
                  <span className="font-display text-sm text-brand-green uppercase tracking-wider">TOTAL AMOUNT</span>
                  <span className="font-display text-xl text-brand-terracotta">₹{selectedOption === 2 ? 579 : 366}</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleOrder}
                className="w-full flex items-center justify-center gap-2.5 bg-brand-green text-brand-ivory active:bg-brand-terracotta py-4 rounded-full font-sans text-xs font-black tracking-widest uppercase transition-all duration-200 shadow-sm cursor-pointer touch-target h-[48px]"
              >
                <ShoppingBag className="w-4 h-4" />
                {selectedOption === 2 ? "GET 2 FOR ₹499" : "ORDER NOW"}
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("WhatsAppClick", { location: "offer_section" })}
                className="w-full flex items-center justify-center gap-2.5 bg-emerald-600 active:bg-emerald-700 text-white py-4 rounded-full font-sans text-xs font-black tracking-widest uppercase transition-all duration-200 shadow-sm text-center touch-target h-[48px]"
              >
                <MessageSquare className="w-4 h-4" />
                ORDER ON WHATSAPP
              </a>

              <div className="flex items-center justify-center gap-1.5 text-[10px] font-semibold text-brand-muted-green mt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-terracotta" />
                <span>COD Available · Secure checkout integration available</span>
              </div>
            </div>

          </div>

        </div>

        {/* Dynamic Pricing Note */}
        <div className="mt-8 text-center select-none">
          <span className="font-sans text-[10px] text-brand-muted-green/75 block">
            Prices are inclusive of local taxes where applicable. Delivery charges are dynamically calculated at ₹80.
          </span>
        </div>

      </div>
    </section>
  );
}
