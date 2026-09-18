"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Search,
  Filter,
  Download,
  Plus,
  RefreshCw,
  Eye,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  CheckCircle2,
  Clock,
  Truck,
  AlertTriangle,
  X,
} from "lucide-react";
import OrderDetailDrawer from "@/components/admin/OrderDetailDrawer";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 25, total: 0, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("all");
  const [orderStatus, setOrderStatus] = useState("all");
  const [paymentMethod, setPaymentMethod] = useState("all");
  const [dateRange, setDateRange] = useState("all");

  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [showManualModal, setShowManualModal] = useState(false);

  // Manual Order Form State
  const [manualForm, setManualForm] = useState({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    shippingAddress: "",
    city: "",
    state: "",
    pincode: "",
    selectedPackage: 1,
    paymentMethod: "bank_transfer",
    paymentReference: "",
    notes: "",
  });
  const [manualLoading, setManualLoading] = useState(false);
  const [manualError, setManualError] = useState("");

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams({
        page: String(pagination.page),
        limit: String(pagination.limit),
        search,
        paymentStatus,
        orderStatus,
        paymentMethod,
        dateRange,
      });

      const res = await fetch(`/api/admin/orders?${query.toString()}`);
      const data = await res.json();

      if (data.success) {
        setOrders(data.orders || []);
        if (data.pagination) setPagination(data.pagination);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit, search, paymentStatus, orderStatus, paymentMethod, dateRange]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleExportCsv = () => {
    const query = new URLSearchParams({
      search,
      paymentStatus,
      orderStatus,
      paymentMethod,
    });
    window.open(`/api/admin/export?${query.toString()}`, "_blank");
  };

  const handleCreateManualOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setManualLoading(true);
    setManualError("");

    try {
      const res = await fetch("/api/admin/orders/manual", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(manualForm),
      });

      const data = await res.json();
      setManualLoading(false);

      if (!res.ok || !data.success) {
        setManualError(data.error || "Failed to create manual order.");
        return;
      }

      setShowManualModal(false);
      setManualForm({
        customerName: "",
        customerPhone: "",
        customerEmail: "",
        shippingAddress: "",
        city: "",
        state: "",
        pincode: "",
        selectedPackage: 1,
        paymentMethod: "bank_transfer",
        paymentReference: "",
        notes: "",
      });
      fetchOrders();
    } catch (err) {
      setManualLoading(false);
      setManualError("Network error.");
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
        return "bg-slate-100 text-slate-700 border-slate-300";
    }
  };

  return (
    <div className="space-y-6 select-none">
      {/* Header & Main Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Orders Management
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {pagination.total} total orders in database
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowManualModal(true)}
            className="px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-semibold rounded-xl shadow-xs flex items-center gap-1.5 transition"
          >
            <Plus className="w-4 h-4 text-[#16483A]" />
            <span>Record Manual Order</span>
          </button>

          <button
            onClick={handleExportCsv}
            className="px-3.5 py-2 bg-[#16483A] hover:bg-[#1b5545] text-white text-xs font-semibold rounded-xl shadow-md flex items-center gap-1.5 transition"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
          {/* Search Box */}
          <div className="relative col-span-1 sm:col-span-2">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPagination((p) => ({ ...p, page: 1 }));
              }}
              placeholder="Search ID, phone, customer, tracking..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#16483A]"
            />
          </div>

          {/* Payment Method Filter */}
          <div>
            <select
              value={paymentMethod}
              onChange={(e) => {
                setPaymentMethod(e.target.value);
                setPagination((p) => ({ ...p, page: 1 }));
              }}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-700"
            >
              <option value="all">All Payment Methods</option>
              <option value="cod">COD</option>
              <option value="upi">UPI / Online</option>
              <option value="card">Credit / Debit Card</option>
              <option value="netbanking">Netbanking</option>
              <option value="bank_transfer">Bank Transfer</option>
            </select>
          </div>

          {/* Order Status Filter */}
          <div>
            <select
              value={orderStatus}
              onChange={(e) => {
                setOrderStatus(e.target.value);
                setPagination((p) => ({ ...p, page: 1 }));
              }}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-700"
            >
              <option value="all">All Order Statuses</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="processing">Processing</option>
              <option value="packed">Packed</option>
              <option value="shipped">Shipped</option>
              <option value="out_for_delivery">Out for Delivery</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Date Filter */}
          <div>
            <select
              value={dateRange}
              onChange={(e) => {
                setDateRange(e.target.value);
                setPagination((p) => ({ ...p, page: 1 }));
              }}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-700"
            >
              <option value="all">All Dates</option>
              <option value="today">Today</option>
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Main Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-400">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400">
            No orders match your search or filters.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-[11px] uppercase font-bold text-slate-500 border-b border-slate-100">
                <tr>
                  <th className="p-3.5 pl-5">Order ID</th>
                  <th className="p-3.5">Date</th>
                  <th className="p-3.5">Customer</th>
                  <th className="p-3.5">Phone</th>
                  <th className="p-3.5">Package</th>
                  <th className="p-3.5">Amount</th>
                  <th className="p-3.5">Payment</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right pr-5">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-slate-50/80 transition">
                    <td className="p-3.5 pl-5 font-bold text-slate-900 font-mono">
                      #{o.internalOrderId}
                    </td>
                    <td className="p-3.5 text-slate-400 text-[11px]">
                      {new Date(o.createdAt).toLocaleDateString("en-IN")}
                    </td>
                    <td className="p-3.5 font-bold text-slate-900">
                      {o.customerName}
                    </td>
                    <td className="p-3.5 font-mono text-emerald-700">
                      {o.customerPhone}
                    </td>
                    <td className="p-3.5 text-slate-600">
                      {o.packageType}
                    </td>
                    <td className="p-3.5 font-bold text-slate-900">
                      ₹{o.amount}
                    </td>
                    <td className="p-3.5">
                      <span className="uppercase text-[10px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                        {o.paymentMethod}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <span
                        className={`uppercase text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${getStatusBadge(
                          o.orderStatus
                        )}`}
                      >
                        {o.orderStatus}
                      </span>
                    </td>
                    <td className="p-3.5 text-right pr-5">
                      <button
                        onClick={() => setSelectedOrder(o)}
                        className="p-1.5 text-slate-500 hover:text-[#16483A] hover:bg-slate-100 rounded-lg transition"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Footer */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>
            Page {pagination.page} of {pagination.totalPages} ({pagination.total} total orders)
          </span>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setPagination((p) => ({ ...p, page: Math.max(1, p.page - 1) }))}
              disabled={pagination.page <= 1}
              className="p-1.5 border border-slate-200 rounded-lg disabled:opacity-40 hover:bg-slate-50"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPagination((p) => ({ ...p, page: Math.min(p.totalPages, p.page + 1) }))}
              disabled={pagination.page >= pagination.totalPages}
              className="p-1.5 border border-slate-200 rounded-lg disabled:opacity-40 hover:bg-slate-50"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Manual Order Creation Modal */}
      {showManualModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-sm">Record Manual Bank Transfer Order</h3>
              <button onClick={() => setShowManualModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {manualError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
                {manualError}
              </div>
            )}

            <form onSubmit={handleCreateManualOrder} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Customer Name *</label>
                  <input
                    type="text"
                    required
                    value={manualForm.customerName}
                    onChange={(e) => setManualForm({ ...manualForm, customerName: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Phone Number *</label>
                  <input
                    type="text"
                    required
                    value={manualForm.customerPhone}
                    onChange={(e) => setManualForm({ ...manualForm, customerPhone: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Shipping Address *</label>
                <textarea
                  required
                  rows={2}
                  value={manualForm.shippingAddress}
                  onChange={(e) => setManualForm({ ...manualForm, shippingAddress: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">City</label>
                  <input
                    type="text"
                    value={manualForm.city}
                    onChange={(e) => setManualForm({ ...manualForm, city: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">State</label>
                  <input
                    type="text"
                    value={manualForm.state}
                    onChange={(e) => setManualForm({ ...manualForm, state: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Pincode</label>
                  <input
                    type="text"
                    value={manualForm.pincode}
                    onChange={(e) => setManualForm({ ...manualForm, pincode: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Package Selection</label>
                  <select
                    value={manualForm.selectedPackage}
                    onChange={(e) => setManualForm({ ...manualForm, selectedPackage: Number(e.target.value) })}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl font-semibold"
                  >
                    <option value={1}>1 Bottle (₹286)</option>
                    <option value={2}>2 Bottles Bundle (₹499)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Payment Reference</label>
                  <input
                    type="text"
                    placeholder="e.g. UTR12345678"
                    value={manualForm.paymentReference}
                    onChange={(e) => setManualForm({ ...manualForm, paymentReference: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowManualModal(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={manualLoading}
                  className="px-4 py-2 bg-[#16483A] text-white font-semibold rounded-xl"
                >
                  {manualLoading ? "Saving..." : "Save Manual Order"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Order Detail Drawer */}
      <OrderDetailDrawer
        order={selectedOrder}
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onOrderUpdated={fetchOrders}
      />
    </div>
  );
}
