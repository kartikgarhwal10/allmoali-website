"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  ShoppingBag,
  TrendingUp,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
  IndianRupee,
  CreditCard,
  RefreshCw,
  Eye,
  Bell,
  ArrowUpRight,
} from "lucide-react";
import OrderDetailDrawer from "@/components/admin/OrderDetailDrawer";

export default function AdminDashboardPage() {
  const [analytics, setAnalytics] = useState<any>(null);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [lastOrderCount, setLastOrderCount] = useState<number | null>(null);

  const fetchDashboardData = useCallback(async (isSilent = false) => {
    if (!isSilent) setRefreshing(true);
    try {
      const [analyticsRes, ordersRes] = await Promise.all([
        fetch("/api/admin/analytics"),
        fetch("/api/admin/orders?limit=10"),
      ]);

      const analyticsData = await analyticsRes.json();
      const ordersData = await ordersRes.json();

      if (analyticsData.success) {
        setAnalytics(analyticsData);
      }

      if (ordersData.success && Array.isArray(ordersData.orders)) {
        setRecentOrders(ordersData.orders);

        // Check if new order arrived during polling
        if (
          lastOrderCount !== null &&
          ordersData.pagination?.total > lastOrderCount
        ) {
          const newest = ordersData.orders[0];
          if (newest) {
            setToastMessage(
              `🎉 New Order Received! #${newest.internalOrderId} (₹${newest.amount} - ${newest.paymentMethod.toUpperCase()})`
            );
            setTimeout(() => setToastMessage(null), 8000);
          }
        }
        if (ordersData.pagination?.total) {
          setLastOrderCount(ordersData.pagination.total);
        }
      }
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [lastOrderCount]);

  useEffect(() => {
    fetchDashboardData(false);

    // Live Order Updates (15s lightweight polling with tab focus check)
    const interval = setInterval(() => {
      if (document.visibilityState === "visible") {
        fetchDashboardData(true);
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [fetchDashboardData]);

  const kpis = analytics?.kpis || {};
  const revenue = analytics?.revenue || {};
  const breakdown = analytics?.paymentBreakdown || {};

  return (
    <div className="space-y-6 select-none">
      {/* Toast Notification for New Orders */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 p-4 bg-[#16483A] text-white font-semibold text-xs rounded-2xl shadow-2xl border border-emerald-500/30 flex items-center gap-3 animate-bounce">
          <Bell className="w-5 h-5 text-emerald-300 animate-pulse shrink-0" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="p-1 hover:bg-white/10 rounded-lg text-slate-300"
          >
            ×
          </button>
        </div>
      )}

      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time sales, order lifecycle, and payment metrics.
          </p>
        </div>

        <button
          onClick={() => fetchDashboardData(false)}
          disabled={refreshing}
          className="px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl shadow-xs flex items-center gap-2 transition"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin text-emerald-700" : ""}`} />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Total Orders</span>
            <div className="p-2 bg-slate-100 rounded-xl text-slate-700">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <p className="text-xl sm:text-2xl font-extrabold text-slate-900">
            {loading ? "..." : kpis.totalOrders || 0}
          </p>
          <p className="text-[10px] text-emerald-600 font-semibold mt-1">
            {kpis.todayOrders || 0} created today
          </p>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Pending Orders</span>
            <div className="p-2 bg-amber-50 rounded-xl text-amber-600">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-xl sm:text-2xl font-extrabold text-amber-600">
            {loading ? "..." : kpis.pendingOrders || 0}
          </p>
          <p className="text-[10px] text-slate-400 mt-1">Requires fulfillment</p>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Shipped / In-Transit</span>
            <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
              <Truck className="w-4 h-4" />
            </div>
          </div>
          <p className="text-xl sm:text-2xl font-extrabold text-blue-600">
            {loading ? "..." : kpis.shippedOrders || 0}
          </p>
          <p className="text-[10px] text-slate-400 mt-1">Out with courier</p>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Delivered</span>
            <div className="p-2 bg-emerald-50 rounded-xl text-emerald-600">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
          <p className="text-xl sm:text-2xl font-extrabold text-emerald-600">
            {loading ? "..." : kpis.deliveredOrders || 0}
          </p>
          <p className="text-[10px] text-emerald-600 font-semibold mt-1">Completed orders</p>
        </div>
      </div>

      {/* Revenue Performance Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-[#16483A] to-slate-900 text-white p-5 rounded-2xl shadow-md">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase text-emerald-200/80">Total Online Paid Revenue</span>
            <IndianRupee className="w-4 h-4 text-emerald-300" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold">
            ₹{loading ? "..." : (revenue.totalRevenue || 0).toLocaleString("en-IN")}
          </p>
          <p className="text-xs text-emerald-200/70 mt-2">
            Verified online payments captured via Razorpay
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-bold uppercase">Today & This Month</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Today:</span>
              <span className="font-bold text-slate-900">₹{(revenue.todayRevenue || 0).toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">This Month:</span>
              <span className="font-bold text-slate-900">₹{(revenue.monthRevenue || 0).toLocaleString("en-IN")}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-bold uppercase">COD Pending Collect</span>
            <CreditCard className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-xl font-bold text-slate-900">
            ₹{(revenue.codPendingRevenue || 0).toLocaleString("en-IN")}
          </p>
          <p className="text-[11px] text-slate-400 mt-1">
            Cash to be collected upon delivery
          </p>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 tracking-tight">Recent Orders</h2>
          <a
            href="/admin/orders"
            className="text-xs font-semibold text-[#16483A] hover:underline flex items-center gap-1"
          >
            View All Orders
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {loading ? (
          <div className="p-8 text-center text-xs text-slate-400">Loading recent orders...</div>
        ) : recentOrders.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-400">No orders received yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-[11px] uppercase font-bold text-slate-500 border-b border-slate-100">
                <tr>
                  <th className="p-3.5 pl-5">Order ID</th>
                  <th className="p-3.5">Customer</th>
                  <th className="p-3.5">Amount</th>
                  <th className="p-3.5">Payment</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Date</th>
                  <th className="p-3.5 text-right pr-5">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {recentOrders.map((o) => (
                  <tr key={o.id} className="hover:bg-slate-50/80 transition">
                    <td className="p-3.5 pl-5 font-bold text-slate-900 font-mono">
                      #{o.internalOrderId}
                    </td>
                    <td className="p-3.5">
                      <p className="font-bold text-slate-800">{o.customerName}</p>
                      <p className="text-[11px] text-slate-400">{o.customerPhone}</p>
                    </td>
                    <td className="p-3.5 font-bold text-slate-900">₹{o.amount}</td>
                    <td className="p-3.5">
                      <span className="uppercase text-[11px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                        {o.paymentMethod}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <span className="uppercase text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                        {o.orderStatus}
                      </span>
                    </td>
                    <td className="p-3.5 text-slate-400 text-[11px]">
                      {new Date(o.createdAt).toLocaleDateString("en-IN")}
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
      </div>

      {/* Order Detail Side Drawer */}
      <OrderDetailDrawer
        order={selectedOrder}
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onOrderUpdated={() => fetchDashboardData(true)}
      />
    </div>
  );
}
