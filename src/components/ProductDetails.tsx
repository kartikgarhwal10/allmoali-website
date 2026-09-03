"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { PRODUCT_CONFIG } from "@/config/product";

export default function ProductDetails() {
  const [activeAccordion, setActiveAccordion] = useState<string | null>("product");

  const specGroups = [
    {
      id: "product",
      title: "Product & Form",
      specs: [
        { label: "Product", value: "Joint & Muscular Pain Oil" },
        { label: "Form", value: "Topical Oil" },
        { label: "Net Quantity", value: "[TO BE CONFIRMED]" },
      ]
    },
    {
      id: "ingredients",
      title: "Ingredients",
      specs: [
        { label: "Ingredients", value: "[TO BE CONFIRMED]" },
      ]
    },
    {
      id: "usage",
      title: "Routine & Usage",
      specs: [
        { label: "Usage", value: "[TO BE CONFIRMED FROM PACKAGING]" },
      ]
    },
    {
      id: "delivery",
      title: "Pricing & Delivery",
      specs: [
        { label: "MRP (Single)", value: "₹493" },
        { label: "Offer (Single)", value: "42% OFF" },
        { label: "Single Bottle Price", value: "₹286 (+ ₹80 delivery)" },
        { label: "2 Bottles Bundle", value: "₹499 (+ ₹80 delivery) — BEST VALUE" },
        { label: "Delivery Charge", value: "₹80" },
        { label: "Formula Heritage", value: "Barson Purane Ayurvedic Formula" },
        { label: "Key Ingredients", value: "12 Ayurvedic Jadi-Butiyan" },
      ]
    }
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-brand-ivory border-t border-brand-gold/10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <span className="font-sans text-[11px] sm:text-xs uppercase tracking-widest text-brand-terracotta font-bold mb-2 block">
            TECHNICAL SPECIFICATIONS
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-brand-green leading-tight">
            Product Details
          </h2>
          <div className="w-16 h-0.5 bg-brand-terracotta mx-auto mt-4" />
        </div>

        {/* Specs Table container (Desktop view, always expanded) */}
        <div className="hidden sm:block rounded-2xl border border-brand-gold/15 bg-white overflow-hidden shadow-xs">
          <table className="w-full text-left font-sans text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-brand-green text-brand-ivory border-b border-brand-gold/15">
                <th className="py-4 px-6 font-display font-bold uppercase tracking-wider">Specification</th>
                <th className="py-4 px-6 font-display font-bold uppercase tracking-wider">Details</th>
              </tr>
            </thead>
            <tbody>
              {PRODUCT_CONFIG.productDetailsSpecs.map((spec, idx) => (
                <tr
                  key={idx}
                  className="border-b border-brand-gold/5 hover:bg-brand-gold/5 transition-colors"
                >
                  <td className="py-3.5 px-6 font-semibold text-brand-green uppercase tracking-wide w-1/3">
                    {spec.label}
                  </td>
                  <td className="py-3.5 px-6 text-brand-charcoal">
                    {spec.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Specs Accordions (Mobile View) */}
        <div className="sm:hidden space-y-3">
          {specGroups.map((group) => {
            const isOpen = activeAccordion === group.id;
            return (
              <div key={group.id} className="rounded-2xl border border-brand-gold/15 bg-white overflow-hidden shadow-xs">
                <button
                  onClick={() => setActiveAccordion(isOpen ? null : group.id)}
                  className="w-full min-h-[48px] py-3.5 px-5 flex items-center justify-between text-left focus:outline-none select-none bg-brand-green text-brand-ivory cursor-pointer touch-target"
                >
                  <span className="font-display font-bold uppercase tracking-wider text-xs">
                    {group.title}
                  </span>
                  {isOpen ? <ChevronUp className="w-4.5 h-4.5 text-brand-terracotta" /> : <ChevronDown className="w-4.5 h-4.5 text-brand-terracotta" />}
                </button>
                {isOpen && (
                  <div className="px-6 py-4 space-y-3.5 divide-y divide-brand-gold/5">
                    {group.specs.map((spec, idx) => (
                      <div key={idx} className={`${idx > 0 ? "pt-3.5" : ""} flex flex-col gap-1 text-xs`}>
                        <span className="font-semibold text-brand-green uppercase tracking-wide">
                          {spec.label}
                        </span>
                        <span className="text-brand-charcoal leading-relaxed">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
