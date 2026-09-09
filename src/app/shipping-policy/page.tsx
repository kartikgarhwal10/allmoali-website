import React from "react";
import Metadata from "next";
import Link from "next/link";
import LegalHeader from "@/components/LegalHeader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Truck, Clock, ShieldCheck, AlertCircle } from "lucide-react";

export const metadata = {
  title: "Allmoali Shipping Policy — Delivery Timelines & Tracking",
  description: "Official Shipping Policy for ALLMOALI Joint & Muscular Pain Oil orders across India. Delivery timeline 7-12 business days, ₹80 delivery fee, COD terms.",
};

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-brand-ivory text-brand-charcoal flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-grow">
        <LegalHeader
          title="Shipping & Delivery Policy"
          subtitle="Information on order processing, dispatch, delivery timelines across India, tracking, shipping charges, and courier guidelines."
          activeRoute="/shipping-policy"
          lastUpdated="March 2026"
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="bg-white rounded-3xl p-6 sm:p-10 md:p-12 border border-brand-gold/20 shadow-sm space-y-10">
            
            {/* Quick Summary Box */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-brand-ivory p-5 rounded-2xl border border-brand-gold/20 text-center flex flex-col items-center justify-center">
                <Clock className="w-6 h-6 text-brand-terracotta mb-2" />
                <span className="font-display font-bold text-sm text-brand-green uppercase">Standard Delivery</span>
                <span className="font-sans text-xs text-brand-muted-green font-bold mt-1">7–12 Business Days</span>
              </div>
              <div className="bg-brand-ivory p-5 rounded-2xl border border-brand-gold/20 text-center flex flex-col items-center justify-center">
                <Truck className="w-6 h-6 text-brand-terracotta mb-2" />
                <span className="font-display font-bold text-sm text-brand-green uppercase">Delivery Fee</span>
                <span className="font-sans text-xs text-brand-muted-green font-bold mt-1">₹80 (FREE on Bundles)</span>
              </div>
              <div className="bg-brand-ivory p-5 rounded-2xl border border-brand-gold/20 text-center flex flex-col items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-brand-terracotta mb-2" />
                <span className="font-display font-bold text-sm text-brand-green uppercase">COD Available</span>
                <span className="font-sans text-xs text-brand-muted-green font-bold mt-1">Pan-India Coverage</span>
              </div>
            </div>

            {/* Disclaimer Banner */}
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex gap-3 items-start">
              <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-900 leading-relaxed font-semibold">
                <strong>Timeline Disclaimer:</strong> &quot;Estimated delivery timelines may vary depending on destination, courier availability, operational conditions and circumstances beyond our reasonable control. Delivery is not guaranteed for an exact fixed date.&quot;
              </p>
            </div>

            {/* Section 1-3 */}
            <section className="space-y-3">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-brand-green">1. Order Processing & Dispatch</h2>
              <p className="text-sm text-brand-charcoal/80 leading-relaxed">
                All confirmed orders are processed for packing and quality check within <strong>24 to 48 hours</strong> (excluding Sundays and official public holidays).
              </p>
              <p className="text-sm text-brand-charcoal/80 leading-relaxed">
                Once dispatched from our warehouse, an automated order dispatch notification containing courier partner details and a tracking number will be sent to your registered mobile number and email.
              </p>
            </section>

            {/* Section 3-4 */}
            <section className="space-y-3">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-brand-green">2. Delivery Timelines & Tracking</h2>
              <p className="text-sm text-brand-charcoal/80 leading-relaxed">
                Our standard delivery timeline across India is <strong>7 to 12 business days</strong> from the date of dispatch. Delivery times vary depending on the destination pincode:
              </p>
              <ul className="list-disc pl-5 text-sm text-brand-charcoal/80 space-y-1.5 leading-relaxed">
                <li><strong>Metro Cities & Tier-1 Locations:</strong> Estimated 5–8 business days.</li>
                <li><strong>Tier-2 & Tier-3 Cities:</strong> Estimated 7–10 business days.</li>
                <li><strong>Rural, Interior & Special Pincodes:</strong> Estimated 9–12 business days.</li>
              </ul>
              <p className="text-sm text-brand-charcoal/80 leading-relaxed pt-2">
                <strong>Tracking Your Order:</strong> Customers can track their package status using the tracking URL provided via SMS/WhatsApp or by emailing support at <strong>[SUPPORT EMAIL]</strong> with your 6-digit Order ID.
              </p>
            </section>

            {/* Section 5-7 */}
            <section className="space-y-3">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-brand-green">3. Shipping Charges & Cash on Delivery (COD)</h2>
              <p className="text-sm text-brand-charcoal/80 leading-relaxed">
                <strong>Delivery Charges:</strong> Standard shipping fee is <strong>₹80</strong> per single bottle order.
              </p>
              <p className="text-sm text-brand-charcoal/80 leading-relaxed">
                <strong>Free Delivery Offers:</strong> Free delivery is automatically applied at checkout for qualifying 2-Piece bundle purchases or active promotional offers explicitly displayed on our website.
              </p>
              <p className="text-sm text-brand-charcoal/80 leading-relaxed">
                <strong>Cash on Delivery (COD):</strong> COD is available nationwide. Please keep exact cash ready upon delivery. Courier delivery personnel will collect cash payment prior to handing over the package.
              </p>
            </section>

            {/* Section 8-11 */}
            <section className="space-y-3">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-brand-green">4. Delivery Delays & Exceptions</h2>
              <p className="text-sm text-brand-charcoal/80 leading-relaxed">
                While we partner with top reputed courier networks (e.g., Delhivery, Blue Dart, Xpressbees, India Post), delays may occasionally occur due to:
              </p>
              <ul className="list-disc pl-5 text-sm text-brand-charcoal/80 space-y-1.5 leading-relaxed">
                <li>Severe weather conditions, monsoon floods, or heavy rainfall.</li>
                <li>Natural disasters, landslides, or transport disruptions.</li>
                <li>Local elections, curfews, state border checks, or regional bandhs.</li>
                <li>Remote area access constraints or seasonal holiday transport overloads.</li>
              </ul>
              <p className="text-sm text-brand-charcoal/80 leading-relaxed pt-1">
                In such circumstances, our logistics partners will attempt redelivery at the earliest operational date.
              </p>
            </section>

            {/* Section 12-17 */}
            <section className="space-y-3">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-brand-green">5. Incorrect Address & Failed Delivery Attempts</h2>
              <p className="text-sm text-brand-charcoal/80 leading-relaxed">
                <strong>Customer Responsibility:</strong> Please ensure your delivery address, flat number, landmark, mobile number, and 6-digit pincode are entered accurately during checkout.
              </p>
              <p className="text-sm text-brand-charcoal/80 leading-relaxed">
                <strong>Delivery Attempts:</strong> Courier partners attempt package delivery up to <strong>3 times</strong>. If the customer is unavailable, reachable phone call fails, or address is incomplete, the parcel will be marked Return-To-Origin (RTO).
              </p>
              <p className="text-sm text-brand-charcoal/80 leading-relaxed">
                <strong>Re-shipping:</strong> For packages returned due to incorrect customer details or non-availability, re-shipping charges of ₹80 may apply for secondary dispatch.
              </p>
            </section>

            {/* Section 18-20 */}
            <section className="space-y-3">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-brand-green">6. Damaged Packages & Shipment Issues</h2>
              <p className="text-sm text-brand-charcoal/80 leading-relaxed">
                <strong>Damaged Outer Packaging:</strong> If you receive a package that appears severely tampered with or open, please refuse to accept it from the courier delivery person and notify our support team immediately.
              </p>
              <p className="text-sm text-brand-charcoal/80 leading-relaxed">
                <strong>Marked Delivered but Not Received:</strong> If your tracking indicates &quot;Delivered&quot; but you have not received the parcel, please check with family members, building security, or neighbors first. Report non-receipt to us within <strong>24 hours</strong> at <strong>[SUPPORT EMAIL]</strong> so we can raise an investigation POD (Proof of Delivery) ticket with the courier partner.
              </p>
            </section>

            {/* Section 21 */}
            <section className="space-y-4 pt-4 border-t border-brand-gold/20">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-brand-green">7. Shipping Customer Support</h2>
              <p className="text-sm text-brand-charcoal/80 leading-relaxed">
                For any shipping inquiries, tracking updates, or address corrections, please contact our logistics support team:
              </p>
              <div className="bg-brand-ivory border border-brand-gold/20 p-5 rounded-2xl text-xs text-brand-muted-green font-medium space-y-1.5">
                <p><strong>Support Email:</strong> [SUPPORT EMAIL]</p>
                <p><strong>Support Phone:</strong> [PHONE NUMBER]</p>
                <p><strong>Hours of Operation:</strong> Monday to Saturday, 10:00 AM to 6:00 PM IST</p>
              </div>
            </section>

            {/* Footer Navigation Link */}
            <div className="pt-6 border-t border-brand-gold/20 flex flex-wrap gap-4 text-xs font-bold text-brand-terracotta">
              <Link href="/privacy-policy" className="hover:underline">Privacy Policy →</Link>
              <Link href="/terms-and-conditions" className="hover:underline">Terms & Conditions →</Link>
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
