"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShieldCheck, X } from "lucide-react";

export default function CookieNotice() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("allmoali_cookie_consent");
    if (!consent) {
      // Show notice after a brief delay for smooth entrance
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("allmoali_cookie_consent", "accepted");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="bg-brand-green text-brand-ivory p-4 sm:p-5 rounded-2xl border border-brand-gold/30 shadow-2xl flex flex-col gap-3 select-none">
        
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 text-brand-gold font-sans text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-brand-gold shrink-0" />
            <span>Privacy & Cookie Preferences</span>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="text-brand-ivory/60 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
            aria-label="Close Notice"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="font-sans text-xs text-brand-ivory/85 leading-relaxed font-normal">
          We use cookies and analytical tools to enhance your browsing experience, process orders, and analyze website traffic in compliance with Indian DPDP Act 2023 principles. Read our{" "}
          <Link href="/privacy-policy" className="text-brand-gold underline font-bold hover:text-white">
            Privacy Policy
          </Link>.
        </p>

        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={handleAccept}
            className="w-full py-2 px-4 rounded-xl bg-brand-gold text-brand-green hover:bg-white font-sans text-xs font-black uppercase tracking-wider transition-colors cursor-pointer shadow-xs"
          >
            Accept & Continue
          </button>
        </div>

      </div>
    </div>
  );
}
