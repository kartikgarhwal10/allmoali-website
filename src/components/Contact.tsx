"use client";

import React from "react";
import { MessageSquare, Mail } from "lucide-react";
import { PRODUCT_CONFIG } from "@/config/product";
import { trackEvent } from "@/utils/analytics";

export default function Contact() {
  const whatsappUrl = `https://wa.me/${PRODUCT_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    PRODUCT_CONFIG.whatsappMessage
  )}`;

  return (
    <section id="contact" className="py-20 bg-brand-ivory border-t border-brand-gold/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Header */}
        <div className="mb-16">
          <span className="font-sans text-xs uppercase tracking-widest text-brand-gold font-bold mb-3 block">
            CUSTOMER ASSISTANCE
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand-green leading-tight">
            Get in Touch
          </h2>
          <div className="w-16 h-0.5 bg-brand-gold mx-auto mt-4" />
        </div>

        {/* Contact info grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mb-10 max-w-2xl mx-auto">
          {/* WhatsApp Card */}
          <div className="p-8 rounded-3xl bg-white border border-brand-gold/15 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-brand-green/5 flex items-center justify-center mb-5 text-brand-green">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="font-display text-base font-bold text-brand-green uppercase tracking-wide mb-2">
                WhatsApp Chat
              </h3>
              <p className="font-sans text-xs sm:text-sm text-brand-muted-green leading-relaxed mb-6">
                Connect with our team directly for order assistance and delivery updates.
              </p>
              <span className="font-sans text-xs font-bold text-brand-green block mb-4">
                +{PRODUCT_CONFIG.whatsappNumber}
              </span>
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("WhatsAppClick", { location: "contact_section" })}
              className="inline-flex justify-center items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-sans text-xs font-bold uppercase tracking-wider py-3 px-6 rounded-full shadow-md transition-all text-center w-full"
            >
              <MessageSquare className="w-4 h-4" />
              CHAT ON WHATSAPP
            </a>
          </div>

          {/* Email Card */}
          <div className="p-8 rounded-3xl bg-white border border-brand-gold/15 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-brand-green/5 flex items-center justify-center mb-5 text-brand-green">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="font-display text-base font-bold text-brand-green uppercase tracking-wide mb-2">
                Email Support
              </h3>
              <p className="font-sans text-xs sm:text-sm text-brand-muted-green leading-relaxed mb-6">
                Send us an email for business inquiries, feedback, or non-urgent questions.
              </p>
              <span className="font-sans text-xs font-bold text-brand-green block mb-4">
                {PRODUCT_CONFIG.email}
              </span>
            </div>
            <a
              href={`mailto:${PRODUCT_CONFIG.email}`}
              className="inline-flex justify-center items-center gap-2 bg-brand-green hover:bg-brand-green/95 text-brand-ivory font-sans text-xs font-bold uppercase tracking-wider py-3 px-6 rounded-full shadow-md transition-all text-center w-full"
            >
              <Mail className="w-4 h-4" />
              SEND EMAIL
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
