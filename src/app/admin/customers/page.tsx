"use client";

import React, { useState, useEffect } from "react";
import { Users, Search, ShoppingBag, Phone, Mail, MapPin, IndianRupee } from "lucide-react";

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      try {
        const query = search ? `?search=${encodeURIComponent(search)}` : "";
        const res = await fetch(`/api/admin/customers${query}`);
        const data = await res.json();
        if (data.success) {
          setCustomers(data.customers || []);
        }
      } catch (err) {
        console.error("Error fetching customers:", err);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchCustomers, 300);
    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="space-y-6 select-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Customer Directory
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Aggregated customer metrics, lifetime order value, and COD behavior
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or phone..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#16483A]"
          />
        </div>
      </div>

      {/* Customer Directory Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-400">Loading customers...</div>
        ) : customers.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400">No customers found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-[11px] uppercase font-bold text-slate-500 border-b border-slate-100">
                <tr>
                  <th className="p-3.5 pl-5">Customer</th>
                  <th className="p-3.5">Phone</th>
                  <th className="p-3.5">Location</th>
                  <th className="p-3.5 text-center">Total Orders</th>
                  <th className="p-3.5 text-center">COD Orders</th>
                  <th className="p-3.5 text-right pr-5">Lifetime Spend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {customers.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/80 transition">
                    <td className="p-3.5 pl-5">
                      <p className="font-bold text-slate-900">{c.name}</p>
                      {c.email && <p className="text-[11px] text-slate-400">{c.email}</p>}
                    </td>
                    <td className="p-3.5 font-mono text-emerald-700 font-bold">{c.phone}</td>
                    <td className="p-3.5 text-slate-500">
                      {c.city || c.state ? `${c.city || ""}, ${c.state || ""}` : "India"}
                    </td>
                    <td className="p-3.5 text-center font-bold text-slate-800">{c.totalOrders}</td>
                    <td className="p-3.5 text-center text-amber-700 font-bold">{c.codOrders}</td>
                    <td className="p-3.5 text-right pr-5 font-bold text-slate-900 text-sm">
                      ₹{c.totalSpend.toLocaleString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
