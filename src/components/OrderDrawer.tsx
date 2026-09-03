"use client";

import React, { useState, useEffect } from "react";
import { X, ShoppingBag, CheckCircle, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PRODUCT_CONFIG } from "@/config/product";
import { trackEvent } from "@/utils/analytics";

interface OrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialQty?: number;
}

export default function OrderDrawer({ isOpen, onClose, initialQty = 1 }: OrderDrawerProps) {
  // 1 = Single Bottle, 2 = 2-Piece Bundle
  const [selectedPackage, setSelectedPackage] = useState<1 | 2>(initialQty === 2 ? 2 : 1);
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "upi" | "card" | "netbanking">("cod");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Reset package selection if initialQty changes (i.e. drawer reopened with different bundle selection)
    setSelectedPackage(initialQty === 2 ? 2 : 1);
  }, [initialQty, isOpen]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Listen for Escape key to close drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      alert("Please fill in all required fields (Name, Phone, Address).");
      return;
    }

    if (paymentMethod !== "cod") {
      alert("Online payment integration is active for live checkouts. To test this demo checkout, please select Cash on Delivery (COD).");
      return;
    }

    setLoading(true);
    trackEvent("InitiateCheckout", {
      package: selectedPackage === 2 ? "2 Bottles Bundle" : "1 Bottle",
      quantity: selectedPackage === 2 ? 2 : 1,
      value: selectedPackage === 2 ? 499 : 285,
      currency: "INR",
    });

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      trackEvent("Purchase", {
        package: selectedPackage === 2 ? "2 Bottles Bundle" : "1 Bottle",
        quantity: selectedPackage === 2 ? 2 : 1,
        value: selectedPackage === 2 ? 499 : 285,
        currency: "INR",
        transaction_id: "demo-" + Math.floor(Math.random() * 1000000),
      });
    }, 1500);
  };

  // Pricing calculations
  const productPrice = selectedPackage === 2 ? 499 : 285;
  const deliveryCharge = 80;
  const totalPrice = productPrice + deliveryCharge;

  const motionProps = isMobile
    ? {
        initial: { y: "100%", x: 0 },
        animate: { y: 0, x: 0 },
        exit: { y: "100%", x: 0 },
        transition: { type: "spring" as const, stiffness: 420, damping: 38 }
      }
    : {
        initial: { x: "100%", y: 0 },
        animate: { x: 0, y: 0 },
        exit: { x: "100%", y: 0 },
        transition: { type: "spring" as const, stiffness: 300, damping: 30 }
      };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-50 pointer-events-auto"
          />

          {/* Drawer Sidebar / Bottom Sheet */}
          <motion.div
            {...motionProps}
            className="fixed z-50 bg-brand-ivory shadow-2xl flex flex-col pointer-events-auto bottom-0 left-0 w-full max-h-[92vh] rounded-t-3xl sm:top-0 sm:right-0 sm:left-auto sm:h-full sm:w-[480px] sm:max-h-none sm:rounded-none"
          >
            {/* Mobile Drag Indicator Handle */}
            <div className="w-12 h-1 bg-brand-gold/25 rounded-full mx-auto my-3 sm:hidden flex-shrink-0" />

            {/* Header */}
            <div className="p-5 bg-brand-green text-brand-ivory flex justify-between items-center border-b border-brand-gold/15 rounded-t-2xl sm:rounded-none">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-brand-gold" />
                <h3 className="font-display text-base font-bold uppercase tracking-wider">
                  Complete Your Order
                </h3>
              </div>
              <button
                onClick={onClose}
                className="text-brand-ivory/80 hover:text-brand-gold focus:outline-none p-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                aria-label="Close Drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Container */}
            <div className="flex-1 overflow-y-auto p-6 no-scrollbar pb-10">
              {success ? (
                /* Success Screen state */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-16 px-4"
                >
                  <div className="w-16 h-16 rounded-full bg-brand-gold/10 border border-brand-gold flex items-center justify-center mb-6 text-brand-gold">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h4 className="font-display text-2xl font-bold text-brand-green mb-3">
                    Order Received
                  </h4>
                  <p className="font-sans text-sm text-brand-muted-green leading-relaxed max-w-sm mb-8">
                    Thank you. Your Cash on Delivery order request has been received.
                  </p>
                  <div className="w-full bg-white border border-brand-gold/15 p-4 rounded-xl shadow-xs text-left mb-8">
                    <span className="font-sans text-[10px] font-bold text-brand-terracotta uppercase tracking-wider block mb-2">Order Summary</span>
                    <div className="flex justify-between font-sans text-xs text-brand-charcoal py-1">
                      <span>Item: Joint & Muscular Pain Oil</span>
                      <span>Package: {selectedPackage === 2 ? "2 Bottles Bundle" : "1 Bottle"}</span>
                    </div>
                    <div className="flex justify-between font-sans text-xs text-brand-charcoal py-1">
                      <span>Payment Method</span>
                      <span>Cash on Delivery</span>
                    </div>
                    <div className="flex justify-between font-sans text-sm font-bold text-brand-green border-t border-brand-gold/5 pt-2.5 mt-2">
                      <span>Total Price</span>
                      <span>₹{totalPrice}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 w-full">
                    <button
                      onClick={onClose}
                      className="w-full bg-brand-green text-brand-ivory py-3.5 rounded-full font-sans text-xs font-bold uppercase tracking-wider hover:bg-brand-terracotta hover:text-brand-ivory transition-all shadow-md cursor-pointer"
                    >
                      CONTINUE SHOPPING
                    </button>
                    <a
                      href={`https://wa.me/${PRODUCT_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                        "Hi, I recently placed an order on Allmoali website. Here are my details to confirm: " + formData.name + " (" + formData.phone + ")."
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-full font-sans text-xs font-bold uppercase tracking-wider text-center block shadow-md"
                    >
                      WHATSAPP SUPPORT
                    </a>
                  </div>
                </motion.div>
              ) : (
                /* Checkout Form state */
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Package Selector inside Drawer */}
                  <div className="space-y-2.5">
                    <h5 className="font-display text-xs font-bold text-brand-green uppercase tracking-wider border-b border-brand-gold/10 pb-2 mb-2">
                      Select Package Option
                    </h5>

                    {/* Radio Single */}
                    <button
                      type="button"
                      onClick={() => setSelectedPackage(1)}
                      className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between cursor-pointer transition-colors ${
                        selectedPackage === 1
                          ? "border-brand-terracotta bg-brand-terracotta/5 shadow-xs"
                          : "border-brand-gold/15 hover:border-brand-gold/30"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          selectedPackage === 1 ? "border-brand-terracotta" : "border-brand-muted-green"
                        }`}>
                          {selectedPackage === 1 && (
                            <div className="w-2 h-2 rounded-full bg-brand-terracotta" />
                          )}
                        </div>
                        <span className="font-sans text-xs font-bold text-brand-green">1 Bottle</span>
                      </div>
                      <span className="font-sans text-xs text-brand-green font-bold">₹285</span>
                    </button>

                    {/* Radio Bundle */}
                    <button
                      type="button"
                      onClick={() => setSelectedPackage(2)}
                      className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between relative cursor-pointer transition-colors ${
                        selectedPackage === 2
                          ? "border-brand-terracotta bg-brand-terracotta/5 shadow-xs"
                          : "border-brand-gold/15 hover:border-brand-gold/30"
                      }`}
                    >
                      <div className="absolute -top-2 right-4 bg-brand-terracotta text-brand-ivory font-sans text-[7px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full">
                        BEST VALUE
                      </div>
                      <div className="flex items-center gap-2.5">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          selectedPackage === 2 ? "border-brand-terracotta" : "border-brand-muted-green"
                        }`}>
                          {selectedPackage === 2 && (
                            <div className="w-2 h-2 rounded-full bg-brand-terracotta" />
                          )}
                        </div>
                        <span className="font-sans text-xs font-bold text-brand-green">2 Bottles Bundle</span>
                      </div>
                      <span className="font-sans text-xs text-brand-green font-bold">₹499</span>
                    </button>
                  </div>

                  {/* Form fields */}
                  <div className="space-y-4">
                    <h5 className="font-display text-xs font-bold text-brand-green uppercase tracking-wider border-b border-brand-gold/10 pb-2">
                      Shipping Details
                    </h5>

                    {/* Full Name */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="name" className="font-sans text-[10px] font-bold text-brand-green tracking-wider">
                        FULL NAME *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        autoComplete="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className="w-full h-12 px-4 bg-white border border-brand-gold/15 rounded-xl font-sans text-[16px] focus:outline-none focus:border-brand-gold"
                      />
                    </div>

                    {/* Phone Number */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="phone" className="font-sans text-[10px] font-bold text-brand-green tracking-wider">
                        PHONE NUMBER *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        autoComplete="tel"
                        pattern="[0-9]{10}"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter 10-digit mobile number"
                        className="w-full h-12 px-4 bg-white border border-brand-gold/15 rounded-xl font-sans text-[16px] focus:outline-none focus:border-brand-gold"
                      />
                    </div>

                    {/* Delivery Address */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="address" className="font-sans text-[10px] font-bold text-brand-green tracking-wider">
                        SHIPPING ADDRESS *
                      </label>
                      <textarea
                        id="address"
                        name="address"
                        required
                        autoComplete="street-address"
                        rows={3}
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Flat/House No, Building, Street Address"
                        className="w-full p-4 bg-white border border-brand-gold/15 rounded-xl font-sans text-[16px] focus:outline-none focus:border-brand-gold resize-none"
                      />
                    </div>

                    {/* City & State (Grid) */}
                    <div className="grid grid-cols-2 gap-3.5">
                      <div className="flex flex-col gap-1.5 min-w-0">
                        <label htmlFor="city" className="font-sans text-[10px] font-bold text-brand-green tracking-wider">
                          CITY
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          autoComplete="address-level2"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="City"
                          className="w-full h-12 px-4 bg-white border border-brand-gold/15 rounded-xl font-sans text-[16px] focus:outline-none focus:border-brand-gold"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5 min-w-0">
                        <label htmlFor="state" className="font-sans text-[10px] font-bold text-brand-green tracking-wider">
                          STATE
                        </label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          autoComplete="address-level1"
                          value={formData.state}
                          onChange={handleInputChange}
                          placeholder="State"
                          className="w-full h-12 px-4 bg-white border border-brand-gold/15 rounded-xl font-sans text-[16px] focus:outline-none focus:border-brand-gold"
                        />
                      </div>
                    </div>

                    {/* Pincode */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="pincode" className="font-sans text-[10px] font-bold text-brand-green tracking-wider">
                        PINCODE
                      </label>
                      <input
                        type="text"
                        id="pincode"
                        name="pincode"
                        inputMode="numeric"
                        pattern="[0-9]{6}"
                        autoComplete="postal-code"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        placeholder="6-digit pincode"
                        className="w-full h-12 px-4 bg-white border border-brand-gold/15 rounded-xl font-sans text-[16px] focus:outline-none focus:border-brand-gold"
                      />
                    </div>
                  </div>

                  {/* Payment Options Section */}
                  <div className="space-y-2.5">
                    <h5 className="font-display text-xs font-bold text-brand-green uppercase tracking-wider border-b border-brand-gold/10 pb-2 mb-2">
                      Secure Payment Options
                    </h5>

                    {/* COD Option */}
                    <label className="flex items-center justify-between p-3.5 bg-white border border-brand-gold/15 rounded-xl cursor-pointer hover:bg-brand-ivory/10 transition-colors">
                      <div className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cod"
                          checked={paymentMethod === "cod"}
                          onChange={() => setPaymentMethod("cod")}
                          className="w-4 h-4 text-brand-terracotta border-brand-gold/20 focus:ring-brand-terracotta cursor-pointer"
                        />
                        <span className="font-sans text-xs font-bold text-brand-green">Cash on Delivery (COD)</span>
                      </div>
                      <span className="font-sans text-[9px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">Active</span>
                    </label>

                    {/* UPI Option */}
                    <label className="flex items-center justify-between p-3.5 bg-white border border-brand-gold/15 rounded-xl cursor-pointer hover:bg-brand-ivory/10 transition-colors">
                      <div className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="upi"
                          checked={paymentMethod === "upi"}
                          onChange={() => setPaymentMethod("upi")}
                          className="w-4 h-4 text-brand-terracotta border-brand-gold/20 focus:ring-brand-terracotta cursor-pointer"
                        />
                        <span className="font-sans text-xs font-bold text-brand-green">UPI (GPay / PhonePe / Paytm)</span>
                      </div>
                      <span className="font-sans text-[9px] text-brand-terracotta font-bold">Online Integration</span>
                    </label>

                    {/* Credit/Debit Card Option */}
                    <label className="flex items-center justify-between p-3.5 bg-white border border-brand-gold/15 rounded-xl cursor-pointer hover:bg-brand-ivory/10 transition-colors">
                      <div className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="card"
                          checked={paymentMethod === "card"}
                          onChange={() => setPaymentMethod("card")}
                          className="w-4 h-4 text-brand-terracotta border-brand-gold/20 focus:ring-brand-terracotta cursor-pointer"
                        />
                        <span className="font-sans text-xs font-bold text-brand-green">Credit / Debit Card</span>
                      </div>
                      <span className="font-sans text-[9px] text-brand-terracotta font-bold">Online Integration</span>
                    </label>

                    {/* Net Banking Option */}
                    <label className="flex items-center justify-between p-3.5 bg-white border border-brand-gold/15 rounded-xl cursor-pointer hover:bg-brand-ivory/10 transition-colors">
                      <div className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="netbanking"
                          checked={paymentMethod === "netbanking"}
                          onChange={() => setPaymentMethod("netbanking")}
                          className="w-4 h-4 text-brand-terracotta border-brand-gold/20 focus:ring-brand-terracotta cursor-pointer"
                        />
                        <span className="font-sans text-xs font-bold text-brand-green">Net Banking</span>
                      </div>
                      <span className="font-sans text-[9px] text-brand-terracotta font-bold">Online Integration</span>
                    </label>

                    {paymentMethod !== "cod" && (
                      <div className="p-3 bg-brand-terracotta/5 border border-brand-terracotta/15 rounded-xl text-[10px] sm:text-xs text-brand-terracotta leading-relaxed">
                        <strong>Online payment integration:</strong> For demonstration purposes, actual online payment services are simulated. Please select Cash on Delivery to complete this demo checkout flow.
                      </div>
                    )}
                  </div>

                  {/* Pricing summary */}
                  <div className="bg-white border border-brand-gold/10 p-4 rounded-xl space-y-2 text-xs shadow-2xs">
                    <div className="flex justify-between">
                      <span className="font-sans text-brand-muted-green">Subtotal ({selectedPackage === 2 ? "2 Pcs" : "1 Pc"})</span>
                      <span className="font-sans text-brand-green font-semibold">₹{productPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-sans text-brand-muted-green">Delivery charge</span>
                      <span className="font-sans text-brand-green font-semibold">₹80</span>
                    </div>
                    <div className="border-t border-brand-gold/10 pt-2 flex justify-between items-baseline font-bold">
                      <span className="font-display text-xs text-brand-green uppercase tracking-wider">TOTAL</span>
                      <span className="font-display text-base text-brand-terracotta">₹{totalPrice}</span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full h-14 bg-brand-green text-brand-ivory hover:bg-brand-terracotta hover:text-brand-ivory rounded-full font-sans text-xs font-bold tracking-widest uppercase shadow-md transition-all disabled:opacity-50 flex items-center justify-center cursor-pointer"
                    >
                      {loading 
                        ? "PLACING YOUR ORDER..." 
                        : paymentMethod === "cod"
                          ? `PLACE COD ORDER (₹${totalPrice})`
                          : "ONLINE PAYMENT INTEGRATION AVAILABLE"
                      }
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
