"use client";

import React from "react";
import { CheckCircle2, ShoppingCart, MessageSquare, AlertCircle } from "lucide-react";

export default function CODTrust() {
  const points = [
    {
      title: "Cash on Delivery Available",
      desc: "Pay only when the product reaches your doorstep. No prepayment required.",
      icon: <CheckCircle2 className="w-5 h-5 text-brand-gold" />,
    },
    {
      title: "Easy Ordering",
      desc: "Order directly on our site in a few simple steps, or checkout using WhatsApp.",
      icon: <ShoppingCart className="w-5 h-5 text-brand-gold" />,
    },
    {
      title: "WhatsApp Support",
      desc: "Connect directly with our team for questions, order queries, or personal assistance.",
      icon: <MessageSquare className="w-5 h-5 text-brand-gold" />,
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-brand-green text-brand-ivory border-t border-brand-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="font-sans text-xs uppercase tracking-widest text-brand-gold font-bold mb-3 block">
            TRUST & ASSURANCE
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold leading-tight">
            Shop With Confidence
          </h2>
          <div className="w-16 h-0.5 bg-brand-gold mx-auto mt-4" />
        </div>

        {/* Trust Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mb-12">
          {points.map((point, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white/5 border border-brand-gold/10 hover:border-brand-gold/25 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center mb-5 flex-shrink-0">
                  {point.icon}
                </div>
                <h3 className="font-display text-base font-bold text-white mb-2 leading-tight">
                  {point.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm leading-relaxed text-brand-ivory/70">
                  {point.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* V2 Delivery / Shipping Placeholder Box */}
        <div className="max-w-2xl mx-auto p-5 rounded-2xl bg-white/5 border border-brand-gold/15 flex items-center gap-3.5 text-left">
          <AlertCircle className="w-5 h-5 text-brand-gold flex-shrink-0" />
          <p className="font-sans text-xs text-brand-ivory/80 leading-relaxed">
            <strong>Shipping Notice:</strong> Shipping and delivery information will be updated before launch. [CLIENT CONFIRMATION]
          </p>
        </div>

      </div>
    </section>
  );
}
