"use client";

import React, { useState, useEffect } from "react";
import { BarChart3, TrendingUp, IndianRupee, PieChart, CreditCard, ShoppingBag } from "lucide-react";

export default function AdminAnalyticsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch("/api/admin/analytics");
        const json = await res.json();
        if (json.success) setData(json);
      } catch (err) {
        console.error("Analytics fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  const kpis = data?.kpis || {};
  const revenue = data?.revenue || {};
  const breakdown = data?.paymentBreakdown || {};

  return (
    <div className="space-y-6 select-none">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Sales & Payment Analytics
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Detailed metrics based on verified database sales records
        </p>
      </div>

      {loading ? (
        <div className="p-12 bg-white rounded-2xl border text-center text-xs text-slate-400">
          Generating analytics report...
        </div>
      ) : (
        <>
          {/* Revenue Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Today Revenue</span>
              <p className="text-2xl font-bold text-slate-900 mt-1">
                ₹{(revenue.todayRevenue || 0).toLocaleString("en-IN")}
              </p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-[11px] font-bold text-slate-400 uppercase">7 Days Revenue</span>
              <p className="text-2xl font-bold text-slate-900 mt-1">
                ₹{(revenue.weekRevenue || 0).toLocaleString("en-IN")}
              </p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-[11px] font-bold text-slate-400 uppercase">This Month</span>
              <p className="text-2xl font-bold text-slate-900 mt-1">
                ₹{(revenue.monthRevenue || 0).toLocaleString("en-IN")}
              </p>
            </div>
            <div className="bg-gradient-to-br from-[#16483A] to-slate-900 text-white p-5 rounded-2xl shadow-md">
              <span className="text-[11px] font-bold text-emerald-200 uppercase">Total Lifetime Paid</span>
              <p className="text-2xl font-bold text-white mt-1">
                ₹{(revenue.totalRevenue || 0).toLocaleString("en-IN")}
              </p>
            </div>
          </div>

          {/* Payment Method Distribution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <PieChart className="w-4 h-4 text-[#16483A]" />
                Payment Method Share
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between font-bold text-slate-700 mb-1">
                    <span>Razorpay (UPI / Card / Netbanking)</span>
                    <span>{breakdown.razorpay || 0} orders</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#16483A]"
                      style={{
                        width: `${
                          kpis.totalOrders ? ((breakdown.razorpay || 0) / kpis.totalOrders) * 100 : 0
                        }%`,
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-bold text-slate-700 mb-1">
                    <span>Cash on Delivery (COD)</span>
                    <span>{breakdown.cod || 0} orders</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-500"
                      style={{
                        width: `${
                          kpis.totalOrders ? ((breakdown.cod || 0) / kpis.totalOrders) * 100 : 0
                        }%`,
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-bold text-slate-700 mb-1">
                    <span>Bank Transfer / Manual</span>
                    <span>{breakdown.bankTransfer || 0} orders</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500"
                      style={{
                        width: `${
                          kpis.totalOrders
                            ? ((breakdown.bankTransfer || 0) / kpis.totalOrders) * 100
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Order Fulfillment Status Share */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-[#16483A]" />
                Order Fulfillment Distribution
              </h3>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between p-2.5 bg-slate-50 rounded-xl font-medium">
                  <span>Pending / Confirmed</span>
                  <span className="font-bold text-amber-600">{kpis.pendingOrders || 0}</span>
                </div>
                <div className="flex justify-between p-2.5 bg-slate-50 rounded-xl font-medium">
                  <span>Shipped / Out for Delivery</span>
                  <span className="font-bold text-blue-600">{kpis.shippedOrders || 0}</span>
                </div>
                <div className="flex justify-between p-2.5 bg-slate-50 rounded-xl font-medium">
                  <span>Delivered</span>
                  <span className="font-bold text-emerald-600">{kpis.deliveredOrders || 0}</span>
                </div>
                <div className="flex justify-between p-2.5 bg-slate-50 rounded-xl font-medium">
                  <span>Cancelled</span>
                  <span className="font-bold text-rose-600">{kpis.cancelledOrders || 0}</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
