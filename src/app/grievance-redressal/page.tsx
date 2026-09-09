import React from "react";
import Metadata from "next";
import Link from "next/link";
import LegalHeader from "@/components/LegalHeader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ShieldAlert, Mail, Phone, MapPin, Clock, CheckCircle } from "lucide-react";

export const metadata = {
  title: "Allmoali Grievance Redressal — Consumer & Privacy Nodal Officer",
  description: "Official Grievance Redressal Mechanism for ALLMOALI e-commerce in compliance with Consumer Protection (E-Commerce) Rules 2020 and DPDP Act 2023.",
};

export default function GrievanceRedressalPage() {
  return (
    <div className="min-h-screen bg-brand-ivory text-brand-charcoal flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-grow">
        <LegalHeader
          title="Grievance Redressal"
          subtitle="In accordance with the Consumer Protection (E-Commerce) Rules 2020 and Information Technology Act 2000, ALLMOALI provides a dedicated Grievance Cell for prompt resolution of consumer and privacy complaints."
          activeRoute="/grievance-redressal"
          lastUpdated="March 2026"
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="bg-white rounded-3xl p-6 sm:p-10 md:p-12 border border-brand-gold/20 shadow-sm space-y-10">
            
            {/* Grievance Officer Highlight Card */}
            <div className="bg-brand-green text-brand-ivory p-6 sm:p-8 rounded-3xl border border-brand-gold/30 shadow-md space-y-4">
              <div className="flex items-center gap-2 text-brand-gold font-sans text-xs font-bold uppercase tracking-widest">
                <ShieldAlert className="w-4 h-4" /> Designated Grievance Officer
              </div>
              <h2 className="font-display text-2xl font-bold text-white">
                Consumer & Privacy Grievance Cell
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs font-sans text-brand-ivory/90">
                <div className="flex items-start gap-3 bg-white/10 p-3.5 rounded-xl border border-white/10">
                  <Mail className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-bold text-brand-gold uppercase tracking-wider text-[10px]">Grievance Email</span>
                    <span className="font-mono text-white text-xs">[GRIEVANCE EMAIL]</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-white/10 p-3.5 rounded-xl border border-white/10">
                  <Phone className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-bold text-brand-gold uppercase tracking-wider text-[10px]">Grievance Phone</span>
                    <span className="font-mono text-white text-xs">[PHONE NUMBER]</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-white/10 p-3.5 rounded-xl border border-white/10 sm:col-span-2">
                  <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-bold text-brand-gold uppercase tracking-wider text-[10px]">Grievance Officer Name & Address</span>
                    <span className="font-bold text-white text-xs block">[GRIEVANCE OFFICER NAME]</span>
                    <span className="text-brand-ivory/80 text-xs block mt-0.5">[REGISTERED BUSINESS ADDRESS]</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Scope of Grievances */}
            <section className="space-y-3">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-brand-green">1. Scope of Grievances Handled</h2>
              <p className="text-sm text-brand-charcoal/80 leading-relaxed">
                Customers may contact the Grievance Officer regarding any unresolved complaint or grievance relating to:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans text-brand-charcoal/80">
                <div className="p-3.5 bg-brand-ivory rounded-xl border border-brand-gold/20 font-semibold">✓ Order Fulfillment & Non-Delivery</div>
                <div className="p-3.5 bg-brand-ivory rounded-xl border border-brand-gold/20 font-semibold">✓ Product Packaging & Quality Concerns</div>
                <div className="p-3.5 bg-brand-ivory rounded-xl border border-brand-gold/20 font-semibold">✓ Delayed Courier & Transit Complaints</div>
                <div className="p-3.5 bg-brand-ivory rounded-xl border border-brand-gold/20 font-semibold">✓ Refund & Return Escalations</div>
                <div className="p-3.5 bg-brand-ivory rounded-xl border border-brand-gold/20 font-semibold">✓ Data Protection & Privacy Rights (DPDP Act)</div>
                <div className="p-3.5 bg-brand-ivory rounded-xl border border-brand-gold/20 font-semibold">✓ Website Content & Consumer Complaints</div>
              </div>
            </section>

            {/* Turnaround Timelines */}
            <section className="space-y-3">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-brand-green">2. Statutory Response & Resolution Timelines</h2>
              <p className="text-sm text-brand-charcoal/80 leading-relaxed">
                In strict adherence to Rule 5(9) of the Consumer Protection (E-Commerce) Rules, 2020:
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-emerald-50 border border-emerald-200 p-4 rounded-xl">
                  <Clock className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div className="text-xs text-emerald-950 leading-relaxed">
                    <strong>Acknowledgment Within 48 Hours:</strong> Every received grievance email/letter will be acknowledged with a unique Grievance Ticket Reference Number within 48 hours of receipt.
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-emerald-50 border border-emerald-200 p-4 rounded-xl">
                  <CheckCircle className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div className="text-xs text-emerald-950 leading-relaxed">
                    <strong>Resolution Within 1 Month:</strong> The Grievance Officer shall investigate and resolve the complaint within 1 month (30 days) from the date of ticket generation.
                  </div>
                </div>
              </div>
            </section>

            {/* How to File a Grievance */}
            <section className="space-y-3">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-brand-green">3. How to Submit a Formal Grievance</h2>
              <p className="text-sm text-brand-charcoal/80 leading-relaxed">
                To ensure efficient processing, please include the following details in your email to <strong>[GRIEVANCE EMAIL]</strong>:
              </p>
              <ul className="list-disc pl-5 text-sm text-brand-charcoal/80 space-y-1.5 leading-relaxed">
                <li>Subject line: &quot;FORMAL GRIEVANCE — [Your Order ID]&quot;</li>
                <li>Full Name and Mobile Number registered with the order.</li>
                <li>Order ID and Date of Purchase.</li>
                <li>Detailed description of the grievance and prior customer support ticket ID (if any).</li>
                <li>Relevant supporting evidence (e.g., photos of physical product packaging, outer parcel, bank transaction receipt).</li>
              </ul>
            </section>

            {/* Nodal Officer Note */}
            <section className="space-y-3 pt-4 border-t border-brand-gold/20">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-brand-green">4. Regulatory Compliance & Consumer Protection</h2>
              <p className="text-sm text-brand-charcoal/80 leading-relaxed">
                This Grievance Redressal mechanism is published to comply with Indian statutory requirements under the Consumer Protection Act 2019, Consumer Protection (E-Commerce) Rules 2020, Information Technology Act 2000, and Digital Personal Data Protection Act 2023.
              </p>
              <p className="text-sm text-brand-charcoal/80 leading-relaxed">
                Nothing herein restricts a consumer from approaching appropriate statutory Consumer Disputes Redressal Commissions under applicable law.
              </p>
            </section>

            {/* Footer Navigation Link */}
            <div className="pt-6 border-t border-brand-gold/20 flex flex-wrap gap-4 text-xs font-bold text-brand-terracotta">
              <Link href="/privacy-policy" className="hover:underline">Privacy Policy →</Link>
              <Link href="/terms-and-conditions" className="hover:underline">Terms & Conditions →</Link>
              <Link href="/shipping-policy" className="hover:underline">Shipping Policy →</Link>
              <Link href="/refund-policy" className="hover:underline">Refund Policy →</Link>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
