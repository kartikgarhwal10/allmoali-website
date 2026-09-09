import React from "react";
import Metadata from "next";
import Link from "next/link";
import LegalHeader from "@/components/LegalHeader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ShieldCheck, AlertTriangle, FileCheck, CheckCircle2, Lock } from "lucide-react";

export const metadata = {
  title: "Allmoali Marketing & Regulatory Compliance Guidelines",
  description: "Internal legal compliance reference and advertising guidelines for ALLMOALI e-commerce platform and marketing campaigns.",
};

export default function MarketingComplianceGuidelinesPage() {
  return (
    <div className="min-h-screen bg-brand-ivory text-brand-charcoal flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-grow">
        <LegalHeader
          title="Marketing & Regulatory Compliance Guidelines"
          subtitle="Internal compliance framework for business owners, legal advisors, content creators, and advertising teams managing ALLMOALI website copy, Meta/Google ads, and influencer campaigns."
          activeRoute="/marketing-compliance-guidelines"
          lastUpdated="March 2026"
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="bg-white rounded-3xl p-6 sm:p-10 md:p-12 border border-brand-gold/20 shadow-sm space-y-10">
            
            {/* Developer & Admin Note Box */}
            <div className="bg-amber-50 border-2 border-amber-300 p-6 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-amber-900 font-sans text-xs font-bold uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 text-amber-700" /> Internal Developer & Admin Note
              </div>
              <p className="font-sans text-xs sm:text-sm text-amber-950 font-medium leading-relaxed">
                &quot;Before production launch, the business owner should have the actual product classification, manufacturer details, applicable Ayurvedic/manufacturing licence, packaging declarations, GST/tax information, advertising claims and grievance-officer details reviewed by an appropriately qualified Indian legal/compliance professional.&quot;
              </p>
            </div>

            {/* Applicable Regulatory Framework */}
            <section className="space-y-3">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-brand-green">1. Indian Legal & Regulatory Framework</h2>
              <p className="text-sm text-brand-charcoal/80 leading-relaxed">
                ALLMOALI digital assets, marketing creatives, website claims, and packaging disclosures are governed by Indian consumer protection and product safety laws, including:
              </p>
              <ul className="list-disc pl-5 text-sm text-brand-charcoal/80 space-y-1.5 leading-relaxed">
                <li>Consumer Protection Act, 2019</li>
                <li>Consumer Protection (E-Commerce) Rules, 2020</li>
                <li>Consumer Protection Guidelines for Prevention of Misleading Advertisements and Endorsements, 2022</li>
                <li>Legal Metrology Act, 2009 and Legal Metrology (Packaged Commodities) Rules, 2011</li>
                <li>Drugs and Cosmetics Act, 1940 and Drugs and Cosmetics Rules, 1945</li>
                <li>Drugs and Magic Remedies (Objectionable Advertisements) Act, 1954 and Rules</li>
                <li>Digital Personal Data Protection Act, 2023 (DPDP Act)</li>
                <li>ASCI (Advertising Standards Council of India) Code of Ethics</li>
              </ul>
            </section>

            {/* Prohibited Claims & Marketing Practices */}
            <section className="space-y-4">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-brand-green">2. Strictly Prohibited Claims & Dark Patterns</h2>
              <p className="text-sm text-brand-charcoal/80 leading-relaxed">
                When designing future Meta ads, Google ads, reels, influencer scripts, or website content, the following practices are strictly prohibited:
              </p>
              <div className="bg-red-50 border border-red-200 p-5 rounded-2xl text-xs text-red-950 space-y-2 leading-relaxed">
                <p className="font-bold text-red-900 text-sm">FORBIDDEN ADVERTISING PRACTICES:</p>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li><strong>Absolute Cure Claims:</strong> &quot;Cures arthritis,&quot; &quot;Cures joint pain,&quot; &quot;Permanent relief,&quot; &quot;Instant cure,&quot; &quot;Guaranteed relief.&quot;</li>
                  <li><strong>Absolute Safety Claims:</strong> &quot;No side effects,&quot; &quot;100% safe,&quot; &quot;Risk-free,&quot; &quot;Chemical-free&quot; (unless verified by lab certification).</li>
                  <li><strong>Medical Instructions:</strong> Instructing users to stop, reduce, or replace prescribed medicines or medical treatment.</li>
                  <li><strong>Unsubstantiated Endorsements:</strong> &quot;Doctor recommended,&quot; &quot;Clinically proven,&quot; &quot;Government approved,&quot; &quot;AYUSH certified&quot; (unless official license/clinical documentation is provided).</li>
                  <li><strong>Fake Social Proof:</strong> Fake customer reviews, fabricated verified purchase badges, fake before/after photos, or artificial sales numbers.</li>
                  <li><strong>Dark Patterns:</strong> Fake stock countdown timers, hidden shipping fees at final step, or deceptive offer cancellations.</li>
                </ul>
              </div>
            </section>

            {/* Approved Positioning Language */}
            <section className="space-y-3">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-brand-green">3. Recommended Approved Copywriting Guidelines</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                <div className="bg-red-50 border border-red-200 p-4 rounded-xl space-y-1">
                  <span className="font-bold text-red-800 uppercase tracking-wider text-[10px]">❌ Do Not Use</span>
                  <p className="font-semibold text-red-950">&quot;Cures knee pain permanently in 7 days&quot;</p>
                  <p className="font-semibold text-red-950">&quot;100% safe with zero side effects&quot;</p>
                  <p className="font-semibold text-red-950">&quot;Replace your daily painkiller pills&quot;</p>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl space-y-1">
                  <span className="font-bold text-emerald-800 uppercase tracking-wider text-[10px]">✓ Safe Approved Alternative</span>
                  <p className="font-semibold text-emerald-950">&quot;Designed for topical massage and everyday joint & muscular care&quot;</p>
                  <p className="font-semibold text-emerald-950">&quot;Natural Ayurvedic-inspired topical care&quot;</p>
                  <p className="font-semibold text-emerald-950">&quot;Use as part of your regular self-care massage routine&quot;</p>
                </div>
              </div>
            </section>

            {/* Legal Metrology Requirements */}
            <section className="space-y-3">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-brand-green">4. Legal Metrology & Product Packaging Declarations</h2>
              <p className="text-sm text-brand-charcoal/80 leading-relaxed">
                In compliance with the Legal Metrology (Packaged Commodities) Rules 2011, product packaging and digital product display pages must maintain identical consistency regarding:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans text-brand-charcoal/80">
                <div className="p-3.5 bg-brand-ivory rounded-xl border border-brand-gold/20 font-semibold">1. Product Name: ALLMOALI Joint & Muscular Pain Oil</div>
                <div className="p-3.5 bg-brand-ivory rounded-xl border border-brand-gold/20 font-semibold">2. Net Quantity: 100 ml</div>
                <div className="p-3.5 bg-brand-ivory rounded-xl border border-brand-gold/20 font-semibold">3. Maximum Retail Price (MRP): ₹493 (incl. of all taxes)</div>
                <div className="p-3.5 bg-brand-ivory rounded-xl border border-brand-gold/20 font-semibold">4. Manufacturer & Packer Details: [MANUFACTURER NAME & ADDRESS]</div>
                <div className="p-3.5 bg-brand-ivory rounded-xl border border-brand-gold/20 font-semibold">5. Manufacturing / AYUSH License No: [LICENCE NUMBER]</div>
                <div className="p-3.5 bg-brand-ivory rounded-xl border border-brand-gold/20 font-semibold">6. Consumer Care Contact: [SUPPORT EMAIL] / [PHONE NUMBER]</div>
              </div>
            </section>

            {/* Internal Compliance Checklist */}
            <section className="space-y-3">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-brand-green">5. Internal Pre-Launch Compliance Checklist</h2>
              <div className="bg-brand-green text-brand-ivory p-6 rounded-2xl space-y-2 text-xs">
                <p className="font-bold text-brand-gold text-sm uppercase tracking-wider">Business Owner Pre-Launch Verification Checklist:</p>
                <div className="space-y-1.5 pt-2 text-brand-ivory/90">
                  <p>☐ Verify exact legal classification (Ayurvedic Proprietary Medicine vs Cosmetic vs Topical Care).</p>
                  <p>☐ Verify validity of state manufacturing license and license number printed on packaging.</p>
                  <p>☐ Confirm manufacturer name and complete registered factory address.</p>
                  <p>☐ Verify GSTIN registration and tax invoice compliance.</p>
                  <p>☐ Audit packaging batch numbers, manufacturing date, and expiry details.</p>
                  <p>☐ Ensure Grievance Officer details are active and reachable.</p>
                </div>
              </div>
            </section>

            {/* Footer Navigation Link */}
            <div className="pt-6 border-t border-brand-gold/20 flex flex-wrap gap-4 text-xs font-bold text-brand-terracotta">
              <Link href="/privacy-policy" className="hover:underline">Privacy Policy →</Link>
              <Link href="/terms-and-conditions" className="hover:underline">Terms & Conditions →</Link>
              <Link href="/shipping-policy" className="hover:underline">Shipping Policy →</Link>
              <Link href="/refund-policy" className="hover:underline">Refund Policy →</Link>
              <Link href="/grievance-redressal" className="hover:underline">Grievance Redressal →</Link>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
