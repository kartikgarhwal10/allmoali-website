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
  const [qty, setQty] = useState(initialQty);
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
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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

  const handleQtyChange = (delta: number) => {
    setQty((prev) => Math.max(1, prev + delta));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      alert("Please fill in all required fields (Name, Phone, Address).");
      return;
    }

    setLoading(true);
    trackEvent("InitiateCheckout", {
      quantity: qty,
      value: PRODUCT_CONFIG.sellingPrice * qty,
      currency: "INR",
    });

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      trackEvent("Purchase", {
        quantity: qty,
        value: PRODUCT_CONFIG.sellingPrice * qty,
        currency: "INR",
        transaction_id: "demo-" + Math.floor(Math.random() * 1000000),
      });
    }, 1500);
  };

  const totalPrice = PRODUCT_CONFIG.sellingPrice * qty;

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
                className="text-brand-ivory/80 hover:text-brand-gold focus:outline-none p-1.5 rounded-lg hover:bg-white/5 transition-colors"
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
                    Order received
                  </h4>
                  <p className="font-sans text-sm text-brand-muted-green leading-relaxed max-w-sm mb-8">
                    Thank you. Your order request has been received.
                  </p>
                  <div className="w-full bg-white border border-brand-gold/15 p-4 rounded-xl shadow-xs text-left mb-8">
                    <span className="font-sans text-[10px] font-bold text-brand-gold uppercase tracking-wider block mb-2">Order Summary</span>
                    <div className="flex justify-between font-sans text-xs text-brand-charcoal py-1">
                      <span>Item: Joint & Muscular Pain Oil</span>
                      <span>Qty: {qty}</span>
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
                      className="w-full bg-brand-green text-brand-ivory py-3.5 rounded-full font-sans text-xs font-bold uppercase tracking-wider hover:bg-brand-gold hover:text-brand-green transition-all shadow-md"
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
                  {/* Product Mini card */}
                  <div className="p-4 bg-white border border-brand-gold/10 rounded-2xl flex gap-4 items-center shadow-xs">
                    <div className="w-16 h-16 rounded-xl bg-brand-green/5 border border-brand-gold/10 relative overflow-hidden flex-shrink-0 flex items-center justify-center text-brand-green font-display font-black text-xl">
                      AO
                    </div>
                    <div className="flex-1">
                      <h4 className="font-display text-sm font-bold text-brand-green leading-tight">
                        {PRODUCT_CONFIG.productName}
                      </h4>
                      <span className="font-sans text-[10px] text-brand-muted-green block mt-1">
                        ₹{PRODUCT_CONFIG.sellingPrice} per unit
                      </span>
                      {/* Quantity Modifier */}
                      <div className="flex items-center gap-3 mt-2">
                        <span className="font-sans text-xs text-brand-muted-green">Qty:</span>
                        <div className="flex items-center border border-brand-gold/25 rounded-md overflow-hidden bg-brand-ivory">
                          <button
                            type="button"
                            onClick={() => handleQtyChange(-1)}
                            className="px-2.5 py-1 text-xs font-bold hover:bg-brand-gold/10 focus:outline-none"
                          >
                            -
                          </button>
                          <span className="px-3 py-1 text-xs font-sans font-bold text-brand-green">
                            {qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleQtyChange(1)}
                            className="px-2.5 py-1 text-xs font-bold hover:bg-brand-gold/10 focus:outline-none"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
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
                        className="h-12 px-4 bg-white border border-brand-gold/15 rounded-xl font-sans text-sm focus:outline-none focus:border-brand-gold"
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
                        className="h-12 px-4 bg-white border border-brand-gold/15 rounded-xl font-sans text-sm focus:outline-none focus:border-brand-gold"
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
                        className="p-4 bg-white border border-brand-gold/15 rounded-xl font-sans text-sm focus:outline-none focus:border-brand-gold resize-none"
                      />
                    </div>

                    {/* City & State (Grid) */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
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
                          className="h-12 px-4 bg-white border border-brand-gold/15 rounded-xl font-sans text-sm focus:outline-none focus:border-brand-gold"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
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
                          className="h-12 px-4 bg-white border border-brand-gold/15 rounded-xl font-sans text-sm focus:outline-none focus:border-brand-gold"
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
                        className="h-12 px-4 bg-white border border-brand-gold/15 rounded-xl font-sans text-sm focus:outline-none focus:border-brand-gold"
                      />
                    </div>
                  </div>

                  {/* Payment Reassurance */}
                  <div className="p-4 bg-brand-green/5 border border-brand-gold/10 rounded-2xl flex gap-3 items-center">
                    <ShieldCheck className="w-5 h-5 text-brand-gold flex-shrink-0" />
                    <span className="font-sans text-xs font-bold text-brand-green">
                      Payment Method: Cash on Delivery (COD) Available
                    </span>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full h-14 bg-brand-green text-brand-ivory hover:bg-brand-gold hover:text-brand-green rounded-full font-sans text-xs font-bold tracking-widest uppercase shadow-md transition-all disabled:opacity-50 flex items-center justify-center"
                    >
                      {loading ? "PLACING YOUR ORDER..." : `PLACE ORDER (₹${totalPrice})`}
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
