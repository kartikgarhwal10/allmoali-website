import React from "react";
import Metadata from "next";
import Link from "next/link";
import LegalHeader from "@/components/LegalHeader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { RefreshCw, ShieldAlert, CheckCircle, HelpCircle } from "lucide-react";

export const metadata = {
  title: "Allmoali Refund & Return Policy — Returns & Exchange Rules",
  description: "Official Refund and Return Policy for ALLMOALI Joint & Muscular Pain Oil. 24-hour damaged/wrong item reporting rule, hygiene opened bottle policy, statutory consumer rights.",
};

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-brand-ivory text-brand-charcoal flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-grow">
        <LegalHeader
          title="Refund & Return Policy"
          subtitle="Clear, consumer-friendly guidelines governing returns, damaged item reports, exchange eligibility, hygiene rules, and refund processing."
          activeRoute="/refund-policy"
          lastUpdated="March 2026"
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="bg-white rounded-3xl p-6 sm:p-10 md:p-12 border border-brand-gold/20 shadow-sm space-y-10">
            
            {/* Statutory Protection Banner */}
            <div className="bg-emerald-50 border border-emerald-200 p-4 sm:p-5 rounded-2xl flex gap-3 items-start">
              <CheckCircle className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <p className="text-xs text-emerald-950 font-semibold leading-relaxed">
                <strong>Consumer Rights Note:</strong> &quot;Nothing in this policy is intended to take away, limit, or waive any mandatory statutory consumer rights or legal remedies available under applicable Indian law, including the Consumer Protection Act, 2019.&quot;
              </p>
            </div>

            {/* Reporting Deadline Highlight Box */}
            <div className="bg-brand-ivory p-6 rounded-2xl border-2 border-brand-terracotta/30 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="font-display font-black text-sm text-brand-terracotta uppercase tracking-wider block">Reporting Window</span>
                <h3 className="font-display text-lg font-bold text-brand-green mt-0.5">Report Issues Within 24 Hours</h3>
                <p className="font-sans text-xs text-brand-muted-green font-medium mt-1">
                  Please inspect your package upon receipt and report any transit damage, leakage, or wrong item within 24 hours of delivery.
                </p>
              </div>
              <div className="bg-brand-terracotta text-white font-sans text-xs font-bold px-5 py-2.5 rounded-full shrink-0">
                24-Hour Notice
              </div>
            </div>

            {/* Section 1: Eligible Cases */}
            <section className="space-y-3">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-brand-green">1. Eligible Genuine Return & Refund Scenarios</h2>
              <p className="text-sm text-brand-charcoal/80 leading-relaxed">
                We take immense pride in the quality and packaging of ALLMOALI Joint & Muscular Pain Oil. Replacement, exchange, or refund is approved for the following genuine cases:
              </p>
              <ul className="list-disc pl-5 text-sm text-brand-charcoal/80 space-y-2 leading-relaxed">
                <li><strong>Product Received Damaged or Leaking:</strong> Package arrived with cracked bottle, broken seal, or liquid leakage during transit.</li>
                <li><strong>Wrong Item Delivered:</strong> Item received does not match the product/quantity ordered.</li>
                <li><strong>Product Materially Different:</strong> Physical item delivered differs materially from the confirmed order specifications.</li>
                <li><strong>Product Undelivered:</strong> Tracking shows parcel lost in transit or returned without successful delivery attempt.</li>
                <li><strong>Manufacturing Defect:</strong> Verified batch discrepancy or physical defect upon arrival.</li>
              </ul>
            </section>

            {/* Section 2: Opened Bottle & Hygiene Policy */}
            <section className="space-y-3">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-brand-green">2. Opened Bottle Hygiene & Exception Rules</h2>
              <div className="bg-brand-green/5 border border-brand-green/15 p-5 rounded-2xl space-y-3">
                <p className="text-xs text-brand-green font-bold uppercase tracking-wider">Hygiene & Safety Rule:</p>
                <p className="text-xs text-brand-charcoal/80 leading-relaxed">
                  Due to strict personal care product hygiene, safety, and topical formulation integrity considerations, <strong>ordinary returns or discretionary change-of-mind refunds are generally not accepted once the bottle seal is broken or opened</strong>.
                </p>
                <div className="pt-2 border-t border-brand-green/10 text-xs text-brand-charcoal/80 leading-relaxed">
                  <strong>Important Exception:</strong> This restriction does NOT exclude genuine defect cases such as wrong product delivery, physical leakage upon arrival, manufacturing defect, or legally valid consumer complaints under applicable law. All genuine cases are thoroughly reviewed and resolved by our customer care team.
                </div>
              </div>
            </section>

            {/* Section 3: Evidence Submission */}
            <section className="space-y-3">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-brand-green">3. Information Required for Claim Submission</h2>
              <p className="text-sm text-brand-charcoal/80 leading-relaxed">
                To enable swift verification of your claim, please email <strong>[SUPPORT EMAIL]</strong> within 24 hours of delivery with the following details:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans text-brand-charcoal/80">
                <div className="p-3 bg-brand-ivory rounded-xl border border-brand-gold/15">✓ Order ID (6-digit reference)</div>
                <div className="p-3 bg-brand-ivory rounded-xl border border-brand-gold/15">✓ Registered Customer Name & Phone</div>
                <div className="p-3 bg-brand-ivory rounded-xl border border-brand-gold/15">✓ Clear photographs of damaged bottle/seal</div>
                <div className="p-3 bg-brand-ivory rounded-xl border border-brand-gold/15">✓ Outer shipping box & courier label photo</div>
                <div className="p-3 bg-brand-ivory rounded-xl border border-brand-gold/15">✓ Batch number & label photograph</div>
                <div className="p-3 bg-brand-ivory rounded-xl border border-brand-gold/15">✓ Unboxing video (where available)</div>
              </div>
            </section>

            {/* Section 4: Step-by-Step Resolution Process */}
            <section className="space-y-3">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-brand-green">4. Step-by-Step Verification & Refund Process</h2>
              <div className="space-y-3 text-sm text-brand-charcoal/80 leading-relaxed">
                <p><strong>Step 1: Contact Support:</strong> Email support at <strong>[SUPPORT EMAIL]</strong> or WhatsApp <strong>[PHONE NUMBER]</strong> with your order ID and required evidence within 24 hours.</p>
                <p><strong>Step 2: Verification:</strong> Our audit team reviews the photos/video and verifies courier dispatch records within 24–48 hours.</p>
                <p><strong>Step 3: Resolution Approval:</strong> Upon verification, we approve a free replacement dispatch, reverse pickup, or full refund.</p>
                <p><strong>Step 4: Replacement or Refund Settlement:</strong></p>
                <ul className="list-disc pl-5 space-y-1 text-xs">
                  <li><strong>Replacements:</strong> Dispatched immediately at zero additional cost.</li>
                  <li><strong>Online Payment Refunds:</strong> Processed back to your original payment method (Credit/Debit Card, UPI, Net Banking) within 5–7 business days. Bank processing times may vary.</li>
                  <li><strong>Cash on Delivery (COD) Refunds:</strong> Processed via direct NEFT/IMPS bank transfer or UPI payout to the customer&apos;s verified bank account details provided during verification.</li>
                </ul>
              </div>
            </section>

            {/* Section 5: Fraudulent Claims & Policy Integrity */}
            <section className="space-y-3">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-brand-green">5. Fraudulent & Abusive Claims</h2>
              <p className="text-sm text-brand-charcoal/80 leading-relaxed">
                To maintain fair service for all legitimate customers, repeated false claims, altered evidence, or fraudulent return attempts will be thoroughly investigated. ALLMOALI reserves the right to restrict service or take appropriate legal recourse under applicable law for fraudulent abuse.
              </p>
            </section>

            {/* Section 6: Support Contact */}
            <section className="space-y-4 pt-4 border-t border-brand-gold/20">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-brand-green">6. Refund & Return Support Contact</h2>
              <p className="text-sm text-brand-charcoal/80 leading-relaxed">
                For assistance with an existing return request or order verification, reach out to:
              </p>
              <div className="bg-brand-ivory border border-brand-gold/20 p-5 rounded-2xl text-xs text-brand-muted-green font-medium space-y-1.5">
                <p><strong>Support Email:</strong> [SUPPORT EMAIL]</p>
                <p><strong>Support Phone:</strong> [PHONE NUMBER]</p>
                <p><strong>Grievance Email:</strong> [GRIEVANCE EMAIL]</p>
                <p><strong>Business Address:</strong> [REGISTERED BUSINESS ADDRESS]</p>
              </div>
            </section>

            {/* Footer Navigation Link */}
            <div className="pt-6 border-t border-brand-gold/20 flex flex-wrap gap-4 text-xs font-bold text-brand-terracotta">
              <Link href="/privacy-policy" className="hover:underline">Privacy Policy →</Link>
              <Link href="/terms-and-conditions" className="hover:underline">Terms & Conditions →</Link>
              <Link href="/shipping-policy" className="hover:underline">Shipping Policy →</Link>
              <Link href="/grievance-redressal" className="hover:underline">Grievance Redressal →</Link>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
