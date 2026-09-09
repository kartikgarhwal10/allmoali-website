import React from "react";
import Metadata from "next";
import Link from "next/link";
import LegalHeader from "@/components/LegalHeader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AlertCircle, FileText } from "lucide-react";

export const metadata = {
  title: "Allmoali Terms & Conditions — Official User Agreement",
  description: "Terms and Conditions governing the purchase of ALLMOALI Joint & Muscular Pain Oil, website usage, consumer rights, and Indian jurisdiction.",
};

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-brand-ivory text-brand-charcoal flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-grow">
        <LegalHeader
          title="Terms & Conditions"
          subtitle="Please read these Terms and Conditions carefully before ordering products or using the ALLMOALI e-commerce platform."
          activeRoute="/terms-and-conditions"
          lastUpdated="March 2026"
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="bg-white rounded-3xl p-6 sm:p-10 md:p-12 border border-brand-gold/20 shadow-sm space-y-10">
            
            {/* Entity Header Box */}
            <div className="bg-brand-ivory p-6 rounded-2xl border border-brand-gold/20 text-xs text-brand-muted-green font-medium space-y-2">
              <p className="font-bold text-brand-green uppercase tracking-wider text-sm">Agreement Overview:</p>
              <p><strong>Legal Entity:</strong> [LEGAL BUSINESS NAME]</p>
              <p><strong>Registered Address:</strong> [REGISTERED BUSINESS ADDRESS]</p>
              <p><strong>Governing Law:</strong> Laws of the Republic of India</p>
              <p><strong>Jurisdiction:</strong> [JURISDICTION CITY/STATE — TO BE CONFIRMED]</p>
            </div>

            {/* Statutory Protection Banner */}
            <div className="bg-brand-green/5 border border-brand-green/20 p-4 sm:p-5 rounded-2xl flex gap-3 items-start">
              <AlertCircle className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
              <p className="text-xs text-brand-green font-semibold leading-relaxed">
                <strong>Consumer Guarantee Note:</strong> &quot;Nothing in these Terms is intended to exclude or restrict any consumer right or legal remedy that cannot lawfully be excluded under applicable Indian law, including the Consumer Protection Act, 2019.&quot;
              </p>
            </div>

            {/* Section 1-3 */}
            <section className="space-y-3">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-brand-green">1. Introduction & Acceptance of Terms</h2>
              <p className="text-sm text-brand-charcoal/80 leading-relaxed font-normal">
                These Terms and Conditions (&quot;Terms&quot;) constitute a legally binding agreement between you (&quot;Customer,&quot; &quot;User,&quot; or &quot;You&quot;) and <strong>[LEGAL BUSINESS NAME]</strong> (&quot;ALLMOALI,&quot; &quot;We,&quot; &quot;Us,&quot; or &quot;Our&quot;) governing your access to and use of our e-commerce website and the purchase of <em>ALLMOALI Joint & Muscular Pain Oil</em>.
              </p>
              <p className="text-sm text-brand-charcoal/80 leading-relaxed">
                By browsing our website, placing an order, or utilizing our services, you confirm that you are at least 18 years of age, legally eligible to contract under the Indian Contract Act, 1872, and agree to be bound by these Terms, our Privacy Policy, Shipping Policy, and Refund Policy.
              </p>
            </section>

            {/* Section 5-8: Ayurvedic & Medical Disclaimer */}
            <section className="space-y-3">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-brand-green">2. Product Information & Ayurvedic Disclaimers</h2>
              <p className="text-sm text-brand-charcoal/80 leading-relaxed">
                <strong>Product Description:</strong> ALLMOALI Joint & Muscular Pain Oil is a traditional, topical Ayurvedic massage oil enriched with 12 Ayurvedic herbs formulated for external application around areas experiencing everyday joint and muscular discomfort.
              </p>
              
              <div className="bg-amber-50 border border-amber-200 p-5 rounded-2xl space-y-2 text-xs text-amber-900 leading-relaxed">
                <p className="font-bold text-amber-950 text-sm">IMPORTANT MEDICAL & WELLNESS DISCLAIMER:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>This product is for <strong>external topical application only</strong>. Do not ingest, consume orally, or apply to open wounds, broken skin, or sensitive mucous membranes.</li>
                  <li>This product and website do NOT provide medical diagnosis, treatment instructions, or cure recommendations.</li>
                  <li>This product is not intended to diagnose, treat, cure, or prevent any medical condition or chronic disease.</li>
                  <li><strong>Prescribed medicines should NEVER be discontinued, reduced, or replaced without direct consultation with a qualified medical practitioner.</strong></li>
                  <li>For severe, persistent, swelling, or medically diagnosed joint/muscular conditions, consult a licensed physician.</li>
                </ul>
              </div>
            </section>

            {/* Section 9-12: Orders & Cancellations */}
            <section className="space-y-3">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-brand-green">3. Orders, Order Acceptance & Cancellation</h2>
              <p className="text-sm text-brand-charcoal/80 leading-relaxed">
                <strong>Order Placement:</strong> When you place an order, it constitutes an offer to purchase. Order receipt confirmation emails/SMS do not signify final order acceptance.
              </p>
              <p className="text-sm text-brand-charcoal/80 leading-relaxed">
                <strong>Order Acceptance:</strong> We reserve the right to accept or decline orders at our discretion due to stock unavailability, incorrect pricing errors, incomplete address details, or suspicion of fraudulent activity. If an online paid order is cancelled by us, a full refund will be initiated to your original payment method.
              </p>
              <p className="text-sm text-brand-charcoal/80 leading-relaxed">
                <strong>Customer Cancellation:</strong> You may request order cancellation prior to order dispatch by contacting customer support. Once a package has been dispatched with our logistics partner, cancellations cannot be processed; however, genuine return procedures apply upon delivery per our Refund Policy.
              </p>
            </section>

            {/* Section 13-22: Pricing, Delivery Charges & Payments */}
            <section className="space-y-3">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-brand-green">4. Pricing, MRP, Offers & Payments</h2>
              <ul className="list-disc pl-5 text-sm text-brand-charcoal/80 space-y-2 leading-relaxed">
                <li><strong>MRP & Selling Price:</strong> Single bottle (100 ml) Maximum Retail Price (MRP) is ₹493, with current promotional selling price of ₹286. 2-Piece Bundle selling price is ₹499 (inclusive of applicable GST taxes). Prices are subject to revision without prior notice.</li>
                <li><strong>Delivery Charges:</strong> Standard delivery charge is ₹80. Under promotional offers or qualifying bundle purchases, free shipping is applied at checkout.</li>
                <li><strong>Payment Options:</strong> Online payments (UPI, Credit/Debit Cards, Net Banking) and Cash on Delivery (COD) are offered.</li>
                <li><strong>COD Orders:</strong> Payment must be made in full to the courier personnel upon delivery. Refusing valid COD orders without genuine cause may lead to restricted COD availability for future orders.</li>
                <li><strong>Payment Failures:</strong> In case of transaction failure where funds are debited, payment gateways automatically process reversals according to standard banking timelines (typically 3–7 business days).</li>
              </ul>
            </section>

            {/* Section 23-24: Product Images & Variations */}
            <section className="space-y-3">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-brand-green">5. Product Images & Packaging</h2>
              <p className="text-sm text-brand-charcoal/80 leading-relaxed">
                We make every effort to display product packaging, dimensions, and bottle visual representations accurately. However, actual physical bottle labels, print shades, or outer box designs may vary slightly due to manufacturing batch updates, print variations, or display screen settings.
              </p>
            </section>

            {/* Section 25-28: Intellectual Property & Prohibited Uses */}
            <section className="space-y-3">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-brand-green">6. Intellectual Property & Website Use</h2>
              <p className="text-sm text-brand-charcoal/80 leading-relaxed">
                All content on this website—including logos, product names, bottle artwork, text, graphics, icons, images, and software—is the exclusive intellectual property of <strong>[LEGAL BUSINESS NAME]</strong> and protected under Indian copyright, trademark, and intellectual property laws.
              </p>
              <p className="text-sm text-brand-charcoal/80 leading-relaxed">
                <strong>Prohibited Activities:</strong> You may not scrape, copy, modify, distribute, reverse engineer, or commercially exploit any content from this website without explicit written consent.
              </p>
            </section>

            {/* Section 30-31: Limitation of Liability & Force Majeure */}
            <section className="space-y-3">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-brand-green">7. Limitation of Liability & Force Majeure</h2>
              <p className="text-sm text-brand-charcoal/80 leading-relaxed">
                To the maximum extent permitted by applicable Indian law, ALLMOALI shall not be liable for any indirect, incidental, consequential, special, or punitive damages arising out of website usage, courier delays, or product application contrary to label instructions.
              </p>
              <p className="text-sm text-brand-charcoal/80 leading-relaxed">
                <strong>Force Majeure:</strong> Neither party shall be liable for failure or delay in performance resulting from events beyond reasonable control, including natural disasters, acts of government, lockdowns, weather disruptions, national transport strikes, or internet disruptions.
              </p>
            </section>

            {/* Section 32-36: Policies & Consumer Rights */}
            <section className="space-y-3">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-brand-green">8. Shipping, Refund & Consumer Rights</h2>
              <p className="text-sm text-brand-charcoal/80 leading-relaxed">
                Product shipping, courier transit times, damage claims, return eligibility, and refund procedures are governed by our separate <Link href="/shipping-policy" className="text-brand-terracotta font-bold underline">Shipping Policy</Link> and <Link href="/refund-policy" className="text-brand-terracotta font-bold underline">Refund Policy</Link>, which are incorporated herein by reference.
              </p>
            </section>

            {/* Section 37-38: Governing Law & Jurisdiction */}
            <section className="space-y-3">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-brand-green">9. Governing Law & Jurisdiction</h2>
              <p className="text-sm text-brand-charcoal/80 leading-relaxed">
                These Terms and any dispute or claim arising out of or in connection with them shall be governed by and construed in accordance with the laws of <strong>India</strong>.
              </p>
              <p className="text-sm text-brand-charcoal/80 leading-relaxed">
                Subject to mandatory statutory consumer dispute mechanisms, courts located in <strong>[JURISDICTION CITY/STATE — TO BE CONFIRMED]</strong> shall have exclusive jurisdiction over legal matters arising under these Terms.
              </p>
            </section>

            {/* Section 39-40: Contact Information */}
            <section className="space-y-4 pt-4 border-t border-brand-gold/20">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-brand-green">10. Contact Information</h2>
              <p className="text-sm text-brand-charcoal/80 leading-relaxed">
                If you have any questions regarding these Terms & Conditions, please contact us:
              </p>
              <div className="bg-brand-ivory border border-brand-gold/20 p-5 rounded-2xl text-xs text-brand-muted-green font-medium space-y-1.5">
                <p><strong>Business Name:</strong> [LEGAL BUSINESS NAME]</p>
                <p><strong>Support Email:</strong> [SUPPORT EMAIL]</p>
                <p><strong>Support Phone:</strong> [PHONE NUMBER]</p>
                <p><strong>Address:</strong> [REGISTERED BUSINESS ADDRESS]</p>
              </div>
            </section>

            {/* Footer Navigation Link */}
            <div className="pt-6 border-t border-brand-gold/20 flex flex-wrap gap-4 text-xs font-bold text-brand-terracotta">
              <Link href="/privacy-policy" className="hover:underline">Privacy Policy →</Link>
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
