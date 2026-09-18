"use client";

import React, { useState } from "react";
import {
  X,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  AlertTriangle,
  User,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  FileText,
  Send,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";
import Image from "next/image";

interface OrderDetailDrawerProps {
  order: any | null;
  isOpen: boolean;
  onClose: () => void;
  onOrderUpdated?: () => void;
}

export default function OrderDetailDrawer({
  order,
  isOpen,
  onClose,
  onOrderUpdated,
}: OrderDetailDrawerProps) {
  const [updating, setUpdating] = useState(false);
  const [newOrderStatus, setNewOrderStatus] = useState("");
  const [newPaymentStatus, setNewPaymentStatus] = useState("");
  const [courierName, setCourierName] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [adminNote, setAdminNote] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen || !order) return null;

  const currentOrderStatus = newOrderStatus || order.orderStatus || "pending";
  const currentPaymentStatus = newPaymentStatus || order.paymentStatus || "pending";

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const res = await fetch(`/api/admin/orders/${order.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderStatus: newOrderStatus || undefined,
          paymentStatus: newPaymentStatus || undefined,
          courierName: courierName.trim() || undefined,
          trackingNumber: trackingNumber.trim() || undefined,
          adminNote: adminNote.trim() || undefined,
        }),
      });

      const data = await res.json();
      setUpdating(false);

      if (!res.ok || !data.success) {
        setErrorMsg(data.error || "Failed to update order.");
        return;
      }

      setSuccessMsg("Order updated successfully!");
      setAdminNote("");
      if (onOrderUpdated) onOrderUpdated();
    } catch (err) {
      setUpdating(false);
      setErrorMsg("Network error. Please try again.");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-emerald-100 text-emerald-800 border-emerald-300";
      case "shipped":
      case "out_for_delivery":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "confirmed":
      case "processing":
      case "packed":
        return "bg-amber-100 text-amber-800 border-amber-300";
      case "cancelled":
      case "returned":
        return "bg-rose-100 text-rose-800 border-rose-300";
      default:
        return "bg-slate-100 text-slate-800 border-slate-300";
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-2xl bg-white shadow-2xl flex flex-col">
          {/* Drawer Header */}
          <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-bold tracking-tight">
                  #{order.internalOrderId}
                </h2>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-bold border uppercase ${getStatusBadge(
                    order.orderStatus
                  )}`}
                >
                  {order.orderStatus}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Placed on {new Date(order.createdAt).toLocaleString("en-IN")}
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body Scroll */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
            {successMsg && (
              <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-semibold rounded-xl flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                {successMsg}
              </div>
            )}

            {errorMsg && (
              <div className="p-3 bg-rose-100 border border-rose-300 text-rose-800 text-xs font-semibold rounded-xl flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                {errorMsg}
              </div>
            )}

            {/* Customer Details Box */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                <User className="w-4 h-4 text-[#16483A]" />
                Customer & Shipping Address
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <p className="font-bold text-slate-900 text-sm">{order.customerName}</p>
                  <p className="text-slate-600 flex items-center gap-1.5 mt-1">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <a href={`tel:${order.customerPhone}`} className="hover:underline text-emerald-700 font-semibold">
                      {order.customerPhone}
                    </a>
                  </p>
                  {order.customerEmail && (
                    <p className="text-slate-600 flex items-center gap-1.5 mt-1">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      {order.customerEmail}
                    </p>
                  )}
                </div>

                <div>
                  <p className="font-medium text-slate-700 leading-relaxed flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                    <span>
                      {order.shippingAddress}
                      {order.city && `, ${order.city}`}
                      {order.state && `, ${order.state}`}
                      {order.pincode && ` - ${order.pincode}`}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Product & Payment Summary Box */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                <Package className="w-4 h-4 text-[#16483A]" />
                Order Items & Financial Summary
              </h3>

              <div className="flex items-center justify-between py-3 border-b border-slate-100 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 p-1 flex items-center justify-center shrink-0">
                    <Image
                      src="/images/product_hero_bottle.jpg"
                      alt="Product"
                      width={40}
                      height={40}
                      className="h-10 w-auto object-contain"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{order.product}</p>
                    <p className="text-slate-500">{order.packageType} × {order.quantity}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-900 text-sm">₹{order.amount}</p>
                  <p className="text-[11px] text-emerald-600 font-semibold uppercase">{order.currency}</p>
                </div>
              </div>

              {/* Payment Details */}
              <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">Payment Method</span>
                  <span className="font-bold text-slate-800 uppercase">{order.paymentMethod}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">Payment Status</span>
                  <span className="font-bold text-slate-800 uppercase">{order.paymentStatus}</span>
                </div>
                {order.razorpayOrderId && (
                  <div className="col-span-2 border-t border-slate-200/60 pt-2">
                    <span className="text-slate-500 block text-[10px] font-semibold">Razorpay Order ID</span>
                    <span className="font-mono text-slate-700">{order.razorpayOrderId}</span>
                  </div>
                )}
                {order.razorpayPaymentId && (
                  <div className="col-span-2">
                    <span className="text-slate-500 block text-[10px] font-semibold">Razorpay Payment ID</span>
                    <span className="font-mono text-emerald-700 font-semibold">{order.razorpayPaymentId}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Status & Courier Update Form */}
            <form onSubmit={handleUpdate} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#16483A]" />
                Update Status & Courier Tracking
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Order Status</label>
                  <select
                    value={currentOrderStatus}
                    onChange={(e) => setNewOrderStatus(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-800 focus:ring-2 focus:ring-[#16483A]"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="processing">Processing</option>
                    <option value="packed">Packed</option>
                    <option value="shipped">Shipped</option>
                    <option value="out_for_delivery">Out for Delivery</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="returned">Returned</option>
                    <option value="refunded">Refunded</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Payment Status</label>
                  <select
                    value={currentPaymentStatus}
                    onChange={(e) => setNewPaymentStatus(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-800 focus:ring-2 focus:ring-[#16483A]"
                  >
                    <option value="pending">Pending</option>
                    <option value="payment_initiated">Payment Initiated</option>
                    <option value="paid">Paid (Online)</option>
                    <option value="cod_pending">COD Pending</option>
                    <option value="cod_paid">COD Paid</option>
                    <option value="manual_verification">Manual Verification</option>
                    <option value="failed">Failed</option>
                    <option value="refunded">Refunded</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Courier Partner</label>
                  <input
                    type="text"
                    value={courierName}
                    onChange={(e) => setCourierName(e.target.value)}
                    placeholder={order.courierName || "e.g., Delhivery / Blue Dart"}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 placeholder-slate-400"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">AWB / Tracking Number</label>
                  <input
                    type="text"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    placeholder={order.trackingNumber || "AWB12345678"}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 placeholder-slate-400"
                  />
                </div>
              </div>

              {/* Internal Note Field */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1 text-xs">
                  Add Internal Owner Note (Private)
                </label>
                <textarea
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                  rows={2}
                  placeholder="Customer requested morning delivery..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-[#16483A]"
                />
              </div>

              <button
                type="submit"
                disabled={updating}
                className="w-full py-2.5 bg-[#16483A] hover:bg-[#1c5746] text-white font-semibold text-xs rounded-xl shadow-md transition flex items-center justify-center gap-2"
              >
                {updating ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Save Order Changes</span>
                  </>
                )}
              </button>
            </form>

            {/* Internal Notes History */}
            {order.notes && order.notes.length > 0 && (
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#16483A]" />
                  Internal Owner Notes History
                </h3>
                <div className="space-y-2">
                  {order.notes.map((n: any) => (
                    <div key={n.id} className="p-3 bg-slate-50 rounded-xl text-xs border border-slate-100">
                      <p className="text-slate-800 font-medium">{n.note}</p>
                      <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1">
                        <span>{n.adminEmail}</span>
                        <span>{new Date(n.createdAt).toLocaleString("en-IN")}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Order Audit Timeline */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#16483A]" />
                Order Audit Timeline
              </h3>
              <div className="space-y-3 relative pl-4 border-l-2 border-slate-200 ml-2">
                {order.history && order.history.length > 0 ? (
                  order.history.map((h: any) => (
                    <div key={h.id} className="relative text-xs">
                      <span className="absolute -left-[21px] top-0.5 w-3 h-3 rounded-full bg-[#16483A] ring-4 ring-white" />
                      <p className="font-bold text-slate-800 uppercase">{h.status}</p>
                      <p className="text-slate-500 text-[11px]">{h.notes}</p>
                      <span className="text-[10px] text-slate-400">
                        {new Date(h.createdAt).toLocaleString("en-IN")} ({h.createdBy})
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400">No status updates recorded yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
