import React from "react";
import Metadata from "next";
import Link from "next/link";
import LegalHeader from "@/components/LegalHeader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, ShieldAlert } from "lucide-react";

export const metadata = {
  title: "Allmoali Privacy Policy — Privacy & Data Protection",
  description: "Official Privacy Policy for ALLMOALI D2C e-commerce, detailing data collection, DPDP Act 2023 compliance, security, and consumer rights.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-brand-ivory text-brand-charcoal flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-grow">
        <LegalHeader
          title="Privacy Policy"
          subtitle="This Privacy Policy outlines how ALLMOALI collects, uses, processes, and protects your personal data when you visit our website or purchase our Ayurvedic topical care products in India."
          activeRoute="/privacy-policy"
          lastUpdated="March 2026"
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="bg-white rounded-3xl p-6 sm:p-10 md:p-12 border border-brand-gold/20 shadow-sm space-y-10">
            
            {/* Business Info Box */}
            <div className="bg-brand-ivory p-6 rounded-2xl border border-brand-gold/20 text-xs text-brand-muted-green font-medium space-y-2">
              <p className="font-bold text-brand-green uppercase tracking-wider text-sm">Entity Details:</p>
              <p><strong>Legal Entity:</strong> [LEGAL BUSINESS NAME]</p>
              <p><strong>Registered Address:</strong> [REGISTERED BUSINESS ADDRESS]</p>
              <p><strong>Support Email:</strong> [SUPPORT EMAIL]</p>
              <p><strong>Support Phone:</strong> [PHONE NUMBER]</p>
              <p><strong>Grievance Officer:</strong> [GRIEVANCE OFFICER NAME] ([GRIEVANCE EMAIL])</p>
            </div>

            {/* Section 1 */}
            <section className="space-y-3">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-brand-green">1. Introduction</h2>
              <p className="text-sm text-brand-charcoal/80 leading-relaxed font-normal">
                Welcome to <strong>ALLMOALI</strong> (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We operate an Indian D2C (Direct-to-Consumer) e-commerce platform offering <em>ALLMOALI Joint & Muscular Pain Oil</em> and related traditional Ayurvedic topical care products. We respect your privacy and are committed to safeguarding the personal information you share with us.
              </p>
              <p className="text-sm text-brand-charcoal/80 leading-relaxed">
                This Privacy Policy is published in accordance with applicable Indian laws, including the <strong>Information Technology Act, 2000</strong>, the <strong>Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011</strong>, and the <strong>Digital Personal Data Protection Act, 2023 (DPDP Act)</strong> and applicable rules to the extent in force.
              </p>
            </section>

            {/* Section 2 & 3 */}
            <section className="space-y-3">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-brand-green">2. Information We Collect</h2>
              <p className="text-sm text-brand-charcoal/80 leading-relaxed">
                We collect personal information necessary to fulfill your orders, deliver products, communicate updates, and provide customer support.
              </p>

              <h3 className="font-display text-base font-bold text-brand-green pt-2">3. Personal Information Collected:</h3>
              <ul className="list-disc pl-5 text-sm text-brand-charcoal/80 space-y-1.5 leading-relaxed">
                <li><strong>Full Name:</strong> To identify you as our customer and create shipping labels.</li>
                <li><strong>Mobile Number:</strong> To send order confirmation, dispatch alerts, delivery tracking SMS/WhatsApp notices, and enable courier delivery agents to contact you.</li>
                <li><strong>Email Address:</strong> To send electronic receipts, order status updates, and support responses.</li>
                <li><strong>Billing & Shipping Address:</strong> Complete delivery location, city, state, and 6-digit postal pincode for physical order fulfillment.</li>
                <li><strong>Order Details:</strong> Purchased items, bundle selections, order timestamps, and transaction references.</li>
              </ul>
            </section>

            {/* Section 9 */}
            <section className="space-y-3">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-brand-green">4. Payment Information</h2>
              <p className="text-sm text-brand-charcoal/80 leading-relaxed">
                Online payments (UPI, Credit/Debit Cards, Net Banking, Wallets) are processed securely through PCI-DSS compliant third-party payment gateways. <strong>ALLMOALI does NOT store, record, or retain your complete card numbers, CVVs, UPI PINs, or banking credentials</strong> on our servers.
              </p>
              <p className="text-sm text-brand-charcoal/80 leading-relaxed">
                For Cash on Delivery (COD) orders, our logistics partners collect cash payments upon physical package delivery.
              </p>
            </section>

            {/* Section 10-13 */}
            <section className="space-y-3">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-brand-green">5. Device, Log Information & Cookies</h2>
              <p className="text-sm text-brand-charcoal/80 leading-relaxed">
                When you access our website, we may automatically collect technical log details including your IP address, browser type, operating system, referring URL, pages viewed, and timestamps.
              </p>
              <p className="text-sm text-brand-charcoal/80 leading-relaxed">
                <strong>Cookies & Analytics:</strong> We use essential session cookies to remember shopping cart items and website preferences. We also utilize third-party analytics (such as Google Analytics or Meta Pixel) to evaluate website performance, improve user experience, and prevent fraudulent activity. You can control or disable cookie preferences through your web browser settings.
              </p>
            </section>

            {/* Section 14-19 */}
            <section className="space-y-3">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-brand-green">6. How We Use Your Information</h2>
              <p className="text-sm text-brand-charcoal/80 leading-relaxed">
                We process your personal information strictly for legitimate commercial purposes, including:
              </p>
              <ul className="list-disc pl-5 text-sm text-brand-charcoal/80 space-y-1.5 leading-relaxed">
                <li>Processing, packing, and fulfilling product orders.</li>
                <li>Communicating delivery schedules, tracking details, and order confirmations via SMS, WhatsApp, or Email.</li>
                <li>Responding to customer support queries, complaints, or exchange/return requests.</li>
                <li>Detecting, preventing, and investigating fraud, unauthorized transactions, or security incidents.</li>
                <li>Complying with applicable statutory accounting, tax, legal metrology, and e-commerce regulations under Indian law.</li>
              </ul>
            </section>

            {/* Section 20-23 */}
            <section className="space-y-3">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-brand-green">7. Sharing Information with Third-Party Service Providers</h2>
              <p className="text-sm text-brand-charcoal/80 leading-relaxed">
                We do not sell, rent, or trade your personal data to third parties. Personal information is shared only as reasonably necessary with verified service providers who assist in operating our website and fulfilling orders:
              </p>
              <ul className="list-disc pl-5 text-sm text-brand-charcoal/80 space-y-1.5 leading-relaxed">
                <li><strong>Payment Gateway Partners:</strong> To authorize and settle payment transactions.</li>
                <li><strong>Courier & Logistics Partners:</strong> To transport, route, and deliver packages to your doorstep.</li>
                <li><strong>Cloud Hosting & Technology Infrastructure:</strong> To securely store data and host website infrastructure.</li>
                <li><strong>Communication & SMS Gateways:</strong> To send transactional order updates.</li>
                <li><strong>Legal & Regulatory Authorities:</strong> Where required by valid court orders, subpoenas, statutory audits, or law enforcement inquiries.</li>
              </ul>
            </section>

            {/* Section 24 */}
            <section className="space-y-3">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-brand-green">8. Data Security</h2>
              <div className="bg-emerald-50/70 border border-emerald-200 p-4 rounded-xl flex gap-3 items-start">
                <ShieldAlert className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <p className="text-xs text-emerald-900 leading-relaxed">
                  We take reasonable technical, operational, and organizational security measures designed to protect personal information against unauthorized access, misuse, alteration, disclosure, or destruction. However, no internet transmission or electronic storage system is 100% secure, and we cannot guarantee absolute data security.
                </p>
              </div>
            </section>

            {/* Section 25-28 */}
            <section className="space-y-3">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-brand-green">9. Data Retention, Correction & Consent Withdrawal</h2>
              <p className="text-sm text-brand-charcoal/80 leading-relaxed">
                <strong>Data Retention:</strong> We retain personal data for as long as necessary to fulfill the purposes outlined in this policy, satisfy legal/tax requirements, resolve disputes, and enforce our agreements.
              </p>
              <p className="text-sm text-brand-charcoal/80 leading-relaxed">
                <strong>Your Rights:</strong> Under the DPDP Act 2023 and applicable Indian law, you have the right to request access to, correction of, or updating of inaccurate personal data. You may also withdraw your consent for optional marketing communications at any time by contacting us at <strong>[SUPPORT EMAIL]</strong>.
              </p>
            </section>

            {/* Section 29 */}
            <section className="space-y-3">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-brand-green">10. Children&apos;s Privacy</h2>
              <p className="text-sm text-brand-charcoal/80 leading-relaxed">
                Our website and products are intended for adult consumers aged 18 years and above. We do not knowingly collect personal data from minors. If a parent or guardian becomes aware that a child has provided us with personal information, please contact us immediately for prompt deletion.
              </p>
            </section>

            {/* Section 30-32 */}
            <section className="space-y-3">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-brand-green">11. Policy Changes</h2>
              <p className="text-sm text-brand-charcoal/80 leading-relaxed">
                We reserve the right to modify or update this Privacy Policy from time to time to reflect changes in our legal obligations, technologies, or business practices. The updated version will be posted on this page with an updated &quot;Last Updated&quot; date.
              </p>
            </section>

            {/* Section 33-34 */}
            <section className="space-y-4 pt-4 border-t border-brand-gold/20">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-brand-green">12. Grievance Redressal & Contact Information</h2>
              <p className="text-sm text-brand-charcoal/80 leading-relaxed">
                In compliance with the Consumer Protection (E-Commerce) Rules 2020 and Information Technology Act 2000, you may contact our designated Grievance Officer for any privacy concerns, data protection requests, or consumer grievances:
              </p>

              <div className="bg-brand-green text-brand-ivory p-6 rounded-2xl space-y-2 text-xs">
                <p className="font-bold text-brand-gold text-sm uppercase tracking-wider">Grievance Cell — ALLMOALI</p>
                <p><strong>Grievance Officer Name:</strong> [GRIEVANCE OFFICER NAME]</p>
                <p><strong>Email Address:</strong> [GRIEVANCE EMAIL]</p>
                <p><strong>Phone Number:</strong> [PHONE NUMBER]</p>
                <p><strong>Registered Business Address:</strong> [REGISTERED BUSINESS ADDRESS]</p>
                <p className="text-brand-ivory/70 pt-2 border-t border-white/10">
                  Turnaround Time: We acknowledge grievances within 48 hours and aim to resolve legitimate requests within 1 month.
                </p>
              </div>
            </section>

            {/* Footer Navigation Link */}
            <div className="pt-6 border-t border-brand-gold/20 flex flex-wrap gap-4 text-xs font-bold text-brand-terracotta">
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
