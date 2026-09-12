"use client";

import React, { useState, useEffect } from "react";
import { X, ShoppingBag, CheckCircle, ShieldCheck, AlertCircle, RefreshCw, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { PRODUCT_CONFIG } from "@/config/product";
import { trackEvent } from "@/utils/analytics";

declare global {
  interface Window {
    Razorpay?: any;
  }
}

interface OrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialQty?: number;
}

type CheckoutState = "form" | "loading" | "success" | "cancelled" | "failed";

const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve(false);
    if (window.Razorpay) return resolve(true);

    const existingScript = document.getElementById("razorpay-checkout-js");
    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(true));
      existingScript.addEventListener("error", () => resolve(false));
      return;
    }

    const script = document.createElement("script");
    script.id = "razorpay-checkout-js";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

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

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [checkoutState, setCheckoutState] = useState<CheckoutState>("form");
  const [errorMessage, setErrorMessage] = useState("");
  const [completedOrder, setCompletedOrder] = useState<any>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Reset package selection if initialQty changes
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

  // Preload Razorpay Checkout JS script when drawer opens
  useEffect(() => {
    if (isOpen) {
      loadRazorpayScript();
    }
  }, [isOpen]);

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
    // Clear validation error when user types
    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = "Full name is required.";
    }

    const cleanPhone = formData.phone.trim().replace(/\D/g, "");
    if (!cleanPhone) {
      errors.phone = "Phone number is required.";
    } else if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      errors.phone = "Enter a valid 10-digit Indian mobile number.";
    }

    if (!formData.address.trim()) {
      errors.address = "Shipping address is required.";
    }

    if (formData.pincode.trim() && !/^\d{6}$/.test(formData.pincode.trim())) {
      errors.pincode = "Enter a valid 6-digit PIN code.";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setCheckoutState("loading");
    setErrorMessage("");

    trackEvent("InitiateCheckout", {
      package: selectedPackage === 2 ? "2 Bottles Bundle" : "1 Bottle",
      quantity: selectedPackage === 2 ? 2 : 1,
      value: selectedPackage === 2 ? 499 : 286,
      currency: "INR",
      payment_method: paymentMethod,
    });

    try {
      // 1. Send order details to server API route for verification & order creation
      const response = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          address: formData.address.trim(),
          city: formData.city.trim(),
          state: formData.state.trim(),
          pincode: formData.pincode.trim(),
          selectedPackage,
          paymentMethod,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        setErrorMessage(data.error || "Could not process order request.");
        setCheckoutState("failed");
        return;
      }

      // 2. Handle Cash on Delivery (COD)
      if (paymentMethod === "cod" || data.payment_method === "cod") {
        setCompletedOrder(data.order || { internal_order_id: data.internal_order_id, payment_method: "cod" });
        setCheckoutState("success");
        trackEvent("Purchase", {
          package: selectedPackage === 2 ? "2 Bottles Bundle" : "1 Bottle",
          quantity: selectedPackage === 2 ? 2 : 1,
          value: selectedPackage === 2 ? 499 : 286,
          currency: "INR",
          transaction_id: data.internal_order_id,
        });
        return;
      }

      // 3. Online Payment via Razorpay Standard Checkout
      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded || typeof window.Razorpay !== "function") {
        setErrorMessage("Razorpay Payment Gateway failed to load. Please check your internet connection.");
        setCheckoutState("failed");
        return;
      }

      const options = {
        key: data.key_id,
        amount: data.amount,
        currency: data.currency || "INR",
        name: PRODUCT_CONFIG.brandName,
        description: `${PRODUCT_CONFIG.productName} (${selectedPackage === 2 ? "2 Bottles Bundle" : "1 Bottle"})`,
        order_id: data.order_id,
        prefill: {
          name: formData.name,
          contact: formData.phone,
        },
        theme: {
          color: "#16483A", // ALLMOALI brand green
        },
        handler: async function (razorpayResponse: any) {
          setCheckoutState("loading");
          try {
            const verifyRes = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: razorpayResponse.razorpay_order_id,
                razorpay_payment_id: razorpayResponse.razorpay_payment_id,
                razorpay_signature: razorpayResponse.razorpay_signature,
                internal_order_id: data.internal_order_id,
              }),
            });

            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              setCompletedOrder(
                verifyData.order || {
                  internal_order_id: data.internal_order_id,
                  razorpay_order_id: razorpayResponse.razorpay_order_id,
                  razorpay_payment_id: razorpayResponse.razorpay_payment_id,
                  payment_method: paymentMethod,
                  amount: selectedPackage === 2 ? 499 : 286,
                }
              );
              setCheckoutState("success");
              trackEvent("Purchase", {
                package: selectedPackage === 2 ? "2 Bottles Bundle" : "1 Bottle",
                quantity: selectedPackage === 2 ? 2 : 1,
                value: selectedPackage === 2 ? 499 : 286,
                currency: "INR",
                transaction_id: data.internal_order_id,
              });
            } else {
              setErrorMessage(verifyData.error || "Payment signature verification failed.");
              setCheckoutState("failed");
            }
          } catch (err: any) {
            console.error("Verification endpoint call error:", err);
            setErrorMessage("Error verifying payment with server. Please contact support.");
            setCheckoutState("failed");
          }
        },
        modal: {
          ondismiss: function () {
            setCheckoutState("cancelled");
          },
        },
      };

      const razorpayInstance = new window.Razorpay(options);
      
      razorpayInstance.on("payment.failed", function (response: any) {
        console.error("Razorpay payment failed:", response.error);
        setErrorMessage(
          response.error?.description || "Payment was declined by bank/gateway. Please try again."
        );
        setCheckoutState("failed");
      });

      razorpayInstance.open();
    } catch (err: any) {
      console.error("Order submit exception:", err);
      setErrorMessage(err?.message || "An unexpected error occurred while setting up payment.");
      setCheckoutState("failed");
    }
  };

  // Pricing calculations
  const productPrice = selectedPackage === 2 ? 499 : 286;
  const totalPrice = productPrice;

  const motionProps = isMobile
    ? {
        initial: { y: "100%", x: 0 },
        animate: { y: 0, x: 0 },
        exit: { y: "100%", x: 0 },
        transition: { type: "spring" as const, stiffness: 420, damping: 38 },
      }
    : {
        initial: { x: "100%", y: 0 },
        animate: { x: 0, y: 0 },
        exit: { x: "100%", y: 0 },
        transition: { type: "spring" as const, stiffness: 300, damping: 30 },
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
            onClick={checkoutState === "loading" ? undefined : onClose}
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
                disabled={checkoutState === "loading"}
                className="text-brand-ivory/80 hover:text-brand-gold focus:outline-none p-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer disabled:opacity-30"
                aria-label="Close Drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Container */}
            <div className="flex-1 overflow-y-auto p-6 no-scrollbar pb-10">
              {/* STATE: SUCCESS */}
              {checkoutState === "success" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-10 px-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-500 flex items-center justify-center mb-6 text-emerald-700">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h4 className="font-display text-2xl font-bold text-brand-green mb-2">
                    {paymentMethod === "cod" ? "Order Received" : "Payment Successful"}
                  </h4>
                  <p className="font-sans text-sm text-brand-muted-green leading-relaxed max-w-sm mb-6">
                    {paymentMethod === "cod"
                      ? "Thank you! Your Cash on Delivery order has been successfully placed."
                      : "Thank you! Your payment was verified and your order is confirmed."}
                  </p>

                  {/* Detailed Order Card */}
                  <div className="w-full bg-white border border-brand-gold/20 p-4 rounded-xl shadow-xs text-left mb-6 space-y-2">
                    <div className="flex justify-between items-center border-b border-brand-gold/10 pb-2 mb-2">
                      <span className="font-sans text-[10px] font-bold text-brand-terracotta uppercase tracking-wider">
                        ORDER SUMMARY
                      </span>
                      <span className="font-mono text-xs font-bold text-brand-green">
                        {completedOrder?.internal_order_id || "ALM-CONFIRMED"}
                      </span>
                    </div>

                    {completedOrder?.razorpay_payment_id && (
                      <div className="flex justify-between font-sans text-xs text-brand-charcoal py-0.5">
                        <span className="text-brand-muted-green">Payment ID:</span>
                        <span className="font-mono text-xs text-brand-green">
                          {completedOrder.razorpay_payment_id}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between font-sans text-xs text-brand-charcoal py-0.5">
                      <span className="text-brand-muted-green">Product:</span>
                      <span className="font-semibold text-brand-green">Joint & Muscular Pain Oil</span>
                    </div>

                    <div className="flex justify-between font-sans text-xs text-brand-charcoal py-0.5">
                      <span className="text-brand-muted-green">Package:</span>
                      <span className="font-semibold text-brand-green">
                        {selectedPackage === 2 ? "2 Bottles Bundle" : "1 Bottle"}
                      </span>
                    </div>

                    <div className="flex justify-between font-sans text-xs text-brand-charcoal py-0.5">
                      <span className="text-brand-muted-green">Payment Method:</span>
                      <span className="font-semibold text-brand-green uppercase">
                        {paymentMethod === "cod" ? "Cash on Delivery" : paymentMethod}
                      </span>
                    </div>

                    <div className="flex justify-between font-sans text-xs text-brand-charcoal py-0.5">
                      <span className="text-brand-muted-green">Estimated Delivery:</span>
                      <span className="font-semibold text-emerald-700">7–12 Business Days</span>
                    </div>

                    <div className="flex justify-between font-sans text-sm font-bold text-brand-green border-t border-brand-gold/10 pt-2 mt-2">
                      <span>Total Amount:</span>
                      <span className="text-brand-terracotta">₹{totalPrice}</span>
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
                        `Hi ALLMOALI, I placed an order (${completedOrder?.internal_order_id || ""}). Name: ${formData.name}, Phone: ${formData.phone}. Please share shipping update.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-full font-sans text-xs font-bold uppercase tracking-wider text-center block shadow-md"
                    >
                      WHATSAPP SUPPORT
                    </a>
                  </div>
                </motion.div>
              )}

              {/* STATE: CANCELLED */}
              {checkoutState === "cancelled" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-12 px-4"
                >
                  <div className="w-16 h-16 rounded-full bg-amber-100 border border-amber-400 flex items-center justify-center mb-6 text-amber-700">
                    <AlertCircle className="w-10 h-10" />
                  </div>
                  <h4 className="font-display text-xl font-bold text-brand-green mb-2">
                    Payment Cancelled
                  </h4>
                  <p className="font-sans text-sm text-brand-muted-green leading-relaxed max-w-sm mb-8">
                    Payment was cancelled or checkout was closed before completion. No charges were made to your account.
                  </p>
                  <button
                    onClick={() => setCheckoutState("form")}
                    className="w-full bg-brand-green text-brand-ivory py-3.5 rounded-full font-sans text-xs font-bold uppercase tracking-wider hover:bg-brand-terracotta transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" /> TRY AGAIN
                  </button>
                </motion.div>
              )}

              {/* STATE: FAILED */}
              {checkoutState === "failed" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-10 px-4"
                >
                  <div className="w-16 h-16 rounded-full bg-rose-100 border border-rose-400 flex items-center justify-center mb-6 text-rose-700">
                    <AlertCircle className="w-10 h-10" />
                  </div>
                  <h4 className="font-display text-xl font-bold text-brand-green mb-2">
                    Payment Could Not Be Completed
                  </h4>
                  <p className="font-sans text-xs text-rose-700 bg-rose-50 border border-rose-200 p-3 rounded-xl max-w-sm mb-6 leading-relaxed">
                    {errorMessage || "Payment attempt failed. Please check your payment details or try another method."}
                  </p>
                  <div className="flex flex-col gap-3 w-full">
                    <button
                      onClick={() => setCheckoutState("form")}
                      className="w-full bg-brand-green text-brand-ivory py-3.5 rounded-full font-sans text-xs font-bold uppercase tracking-wider hover:bg-brand-terracotta transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                    >
                      <RefreshCw className="w-4 h-4" /> TRY AGAIN / CHANGE METHOD
                    </button>
                    <a
                      href={`https://wa.me/${PRODUCT_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                        "Hi ALLMOALI, I had an issue while paying online for my order. Can you help me?"
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-full font-sans text-xs font-bold uppercase tracking-wider text-center block shadow-md"
                    >
                      CONTACT SUPPORT ON WHATSAPP
                    </a>
                  </div>
                </motion.div>
              )}

              {/* STATE: FORM or LOADING */}
              {(checkoutState === "form" || checkoutState === "loading") && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Package Selector inside Drawer */}
                  <div className="space-y-2.5">
                    <h5 className="font-display text-xs font-bold text-brand-green uppercase tracking-wider border-b border-brand-gold/10 pb-2 mb-2">
                      Select Package Option
                    </h5>

                    {/* Radio Single */}
                    <button
                      type="button"
                      disabled={checkoutState === "loading"}
                      onClick={() => setSelectedPackage(1)}
                      className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between cursor-pointer transition-colors ${
                        selectedPackage === 1
                          ? "border-brand-terracotta bg-brand-terracotta/5 shadow-xs"
                          : "border-brand-gold/15 hover:border-brand-gold/30"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            selectedPackage === 1 ? "border-brand-terracotta" : "border-brand-muted-green"
                          }`}
                        >
                          {selectedPackage === 1 && (
                            <div className="w-2 h-2 rounded-full bg-brand-terracotta" />
                          )}
                        </div>
                        <span className="font-sans text-xs font-bold text-brand-green">1 Bottle</span>
                      </div>
                      <span className="font-sans text-xs text-brand-green font-bold">₹286</span>
                    </button>

                    {/* Radio Bundle */}
                    <button
                      type="button"
                      disabled={checkoutState === "loading"}
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
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            selectedPackage === 2 ? "border-brand-terracotta" : "border-brand-muted-green"
                          }`}
                        >
                          {selectedPackage === 2 && (
                            <div className="w-2 h-2 rounded-full bg-brand-terracotta" />
                          )}
                        </div>
                        <span className="font-sans text-xs font-bold text-brand-green">
                          2 Bottles Bundle
                        </span>
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
                        disabled={checkoutState === "loading"}
                        autoComplete="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className={`w-full h-12 px-4 bg-white border rounded-xl font-sans text-[16px] focus:outline-none ${
                          validationErrors.name ? "border-rose-500 bg-rose-50/20" : "border-brand-gold/15 focus:border-brand-gold"
                        }`}
                      />
                      {validationErrors.name && (
                        <span className="text-[10px] text-rose-600 font-semibold">{validationErrors.name}</span>
                      )}
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
                        disabled={checkoutState === "loading"}
                        autoComplete="tel"
                        maxLength={10}
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter 10-digit mobile number"
                        className={`w-full h-12 px-4 bg-white border rounded-xl font-sans text-[16px] focus:outline-none ${
                          validationErrors.phone ? "border-rose-500 bg-rose-50/20" : "border-brand-gold/15 focus:border-brand-gold"
                        }`}
                      />
                      {validationErrors.phone && (
                        <span className="text-[10px] text-rose-600 font-semibold">{validationErrors.phone}</span>
                      )}
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
                        disabled={checkoutState === "loading"}
                        autoComplete="street-address"
                        rows={3}
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Flat/House No, Building, Street Address"
                        className={`w-full p-4 bg-white border rounded-xl font-sans text-[16px] focus:outline-none resize-none ${
                          validationErrors.address ? "border-rose-500 bg-rose-50/20" : "border-brand-gold/15 focus:border-brand-gold"
                        }`}
                      />
                      {validationErrors.address && (
                        <span className="text-[10px] text-rose-600 font-semibold">{validationErrors.address}</span>
                      )}
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
                          disabled={checkoutState === "loading"}
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
                          disabled={checkoutState === "loading"}
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
                        disabled={checkoutState === "loading"}
                        inputMode="numeric"
                        maxLength={6}
                        autoComplete="postal-code"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        placeholder="6-digit pincode"
                        className={`w-full h-12 px-4 bg-white border rounded-xl font-sans text-[16px] focus:outline-none ${
                          validationErrors.pincode ? "border-rose-500 bg-rose-50/20" : "border-brand-gold/15 focus:border-brand-gold"
                        }`}
                      />
                      {validationErrors.pincode && (
                        <span className="text-[10px] text-rose-600 font-semibold">{validationErrors.pincode}</span>
                      )}
                    </div>
                  </div>

                  {/* Payment Options Section */}
                  <div className="space-y-2.5">
                    <h5 className="font-display text-xs font-bold text-brand-green uppercase tracking-wider border-b border-brand-gold/10 pb-2 mb-2 flex justify-between items-center">
                      <span>Payment Method</span>
                      <span className="text-[9px] text-brand-muted-green font-normal flex items-center gap-1">
                        <Lock className="w-3 h-3 text-brand-terracotta" /> Secured by Razorpay
                      </span>
                    </h5>

                    {/* COD Option */}
                    <label className="flex items-center justify-between p-3.5 bg-white border border-brand-gold/15 rounded-xl cursor-pointer hover:bg-brand-ivory/10 transition-colors">
                      <div className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cod"
                          disabled={checkoutState === "loading"}
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
                          disabled={checkoutState === "loading"}
                          checked={paymentMethod === "upi"}
                          onChange={() => setPaymentMethod("upi")}
                          className="w-4 h-4 text-brand-terracotta border-brand-gold/20 focus:ring-brand-terracotta cursor-pointer"
                        />
                        <span className="font-sans text-xs font-bold text-brand-green">UPI (GPay / PhonePe / Paytm)</span>
                      </div>
                      <span className="font-sans text-[9px] text-brand-terracotta font-bold">Razorpay Fast</span>
                    </label>

                    {/* Credit/Debit Card Option */}
                    <label className="flex items-center justify-between p-3.5 bg-white border border-brand-gold/15 rounded-xl cursor-pointer hover:bg-brand-ivory/10 transition-colors">
                      <div className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="card"
                          disabled={checkoutState === "loading"}
                          checked={paymentMethod === "card"}
                          onChange={() => setPaymentMethod("card")}
                          className="w-4 h-4 text-brand-terracotta border-brand-gold/20 focus:ring-brand-terracotta cursor-pointer"
                        />
                        <span className="font-sans text-xs font-bold text-brand-green">Credit / Debit Card</span>
                      </div>
                      <span className="font-sans text-[9px] text-brand-terracotta font-bold">Razorpay Fast</span>
                    </label>

                    {/* Net Banking Option */}
                    <label className="flex items-center justify-between p-3.5 bg-white border border-brand-gold/15 rounded-xl cursor-pointer hover:bg-brand-ivory/10 transition-colors">
                      <div className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="netbanking"
                          disabled={checkoutState === "loading"}
                          checked={paymentMethod === "netbanking"}
                          onChange={() => setPaymentMethod("netbanking")}
                          className="w-4 h-4 text-brand-terracotta border-brand-gold/20 focus:ring-brand-terracotta cursor-pointer"
                        />
                        <span className="font-sans text-xs font-bold text-brand-green">Net Banking</span>
                      </div>
                      <span className="font-sans text-[9px] text-brand-terracotta font-bold">Razorpay Fast</span>
                    </label>

                    {paymentMethod !== "cod" && (
                      <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-[10px] sm:text-xs text-emerald-900 leading-relaxed font-medium flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                        <span>
                          <strong>Razorpay Encrypted Payment:</strong> Supports Google Pay, PhonePe, Paytm, All Bank Cards & Net Banking.
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Pricing & Checkout Disclosures */}
                  <div className="bg-white border border-brand-gold/15 p-4 rounded-xl space-y-2 text-xs shadow-2xs">
                    <div className="flex justify-between">
                      <span className="font-sans text-brand-muted-green font-medium">Product: {PRODUCT_CONFIG.brandName} Joint & Muscular Pain Oil</span>
                      <span className="font-sans text-brand-green font-semibold">{selectedPackage === 2 ? "2 Bottles (100ml x 2)" : "1 Bottle (100ml)"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-sans text-brand-muted-green font-medium">MRP (Incl. of all taxes)</span>
                      <span className="font-sans text-gray-400 line-through">₹{selectedPackage === 2 ? 986 : 493}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-sans text-brand-muted-green font-medium">Special Discount</span>
                      <span className="font-sans text-emerald-700 font-semibold">-₹{selectedPackage === 2 ? 487 : 207}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-sans text-brand-muted-green font-medium">Delivery Charge (Standard ₹80)</span>
                      <span className="font-sans text-emerald-700 font-bold">FREE (₹0)</span>
                    </div>
                    <div className="border-t border-brand-gold/10 pt-2 flex justify-between items-baseline font-bold">
                      <span className="font-display text-xs text-brand-green uppercase tracking-wider">FINAL PAYABLE AMOUNT</span>
                      <span className="font-display text-lg text-brand-terracotta">₹{totalPrice}</span>
                    </div>
                  </div>

                  {/* Mandatory Legal Policy Confirmation */}
                  <div className="p-3 bg-brand-ivory rounded-xl border border-brand-gold/15 text-[10px] text-brand-muted-green leading-relaxed space-y-1">
                    <p className="font-semibold text-brand-green">Order Legal Terms & Policies:</p>
                    <p>
                      By tapping Place Order, you agree to ALLMOALI&apos;s{" "}
                      <Link href="/terms-and-conditions" target="_blank" className="text-brand-terracotta underline font-bold">Terms & Conditions</Link>,{" "}
                      <Link href="/privacy-policy" target="_blank" className="text-brand-terracotta underline font-bold">Privacy Policy</Link>,{" "}
                      <Link href="/shipping-policy" target="_blank" className="text-brand-terracotta underline font-bold">Shipping Policy</Link>, and{" "}
                      <Link href="/refund-policy" target="_blank" className="text-brand-terracotta underline font-bold">Refund Policy</Link>.
                    </p>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 space-y-2">
                    <button
                      type="submit"
                      disabled={checkoutState === "loading"}
                      className="w-full h-14 bg-[#C5FE01] text-[#16483A] hover:bg-[#b2e600] rounded-full font-sans text-xs font-black tracking-widest uppercase shadow-md transition-all disabled:opacity-50 flex items-center justify-center cursor-pointer"
                    >
                      {checkoutState === "loading"
                        ? "PREPARING SECURE PAYMENT..."
                        : paymentMethod === "cod"
                        ? `CONFIRM COD ORDER — ₹${totalPrice}`
                        : `PROCEED TO SECURE PAYMENT — ₹${totalPrice}`}
                    </button>
                    <p className="text-[10px] text-center text-brand-muted-green font-medium flex items-center justify-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-brand-terracotta" />
                      Secure payment powered by Razorpay
                    </p>
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
