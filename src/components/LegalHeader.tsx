"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, ChevronRight, ArrowLeft } from "lucide-react";

interface LegalHeaderProps {
  title: string;
  subtitle: string;
  lastUpdated?: string;
  activeRoute: string;
}

export default function LegalHeader({
  title,
  subtitle,
  lastUpdated = "March 2026",
  activeRoute,
}: LegalHeaderProps) {
  const legalRoutes = [
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms & Conditions", href: "/terms-and-conditions" },
    { name: "Shipping Policy", href: "/shipping-policy" },
    { name: "Refund Policy", href: "/refund-policy" },
    { name: "Grievance Redressal", href: "/grievance-redressal" },
    { name: "Compliance Guidelines", href: "/marketing-compliance-guidelines" },
  ];

  return (
    <div className="bg-brand-green text-brand-ivory pt-24 pb-12 sm:pt-28 sm:pb-16 border-b border-brand-gold/20 relative overflow-hidden select-none">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-terracotta/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 font-sans text-xs text-brand-ivory/70 mb-6">
          <Link
            href="/"
            className="hover:text-brand-gold transition-colors flex items-center gap-1 font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Home
          </Link>
          <ChevronRight className="w-3 h-3 text-brand-gold/60" />
          <span className="text-brand-gold font-bold">{title}</span>
        </div>

        {/* Header Title & Metadata */}
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-brand-gold/20 text-brand-gold px-3.5 py-1 rounded-full font-sans text-[11px] font-bold uppercase tracking-widest mb-4">
            <ShieldCheck className="w-3.5 h-3.5" /> ALLMOALI Legal & Compliance
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 text-white">
            {title}
          </h1>
          <p className="font-sans text-sm sm:text-base text-brand-ivory/85 leading-relaxed font-medium">
            {subtitle}
          </p>
          <div className="mt-4 flex items-center gap-3 text-xs font-sans text-brand-ivory/60 font-semibold">
            <span>Last Updated: <strong className="text-brand-gold">{lastUpdated}</strong></span>
            <span>•</span>
            <span>Applicable Jurisdiction: <strong className="text-white">India</strong></span>
          </div>
        </div>

        {/* Legal Pages Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-2 border-t border-white/10">
          {legalRoutes.map((route) => {
            const isActive = activeRoute === route.href;
            return (
              <Link
                key={route.href}
                href={route.href}
                className={`whitespace-nowrap font-sans text-xs font-bold px-4 py-2 rounded-full transition-all flex-shrink-0 ${
                  isActive
                    ? "bg-brand-gold text-brand-green shadow-sm"
                    : "bg-white/5 text-brand-ivory/80 hover:bg-white/15 hover:text-white border border-white/10"
                }`}
              >
                {route.name}
              </Link>
            );
          })}
        </div>

      </div>
    </div>
  );
}
