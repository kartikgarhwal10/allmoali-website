"use client";

import React, { useState, useEffect } from "react";
import { Package, Save, CheckCircle2, AlertTriangle, RefreshCw, Tag } from "lucide-react";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/products");
      const data = await res.json();
      if (data.success) {
        setProducts(data.products || []);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleUpdateProduct = async (product: any) => {
    setUpdatingId(product.id);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/products", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: product.id,
          stock: product.stock,
          price: product.price,
          mrp: product.mrp,
          status: product.status,
          lowStockThreshold: product.lowStockThreshold,
        }),
      });

      const data = await res.json();
      setUpdatingId(null);

      if (data.success) {
        setMessage(`Updated ${product.packageType} successfully!`);
        setTimeout(() => setMessage(null), 4000);
      }
    } catch (err) {
      setUpdatingId(null);
    }
  };

  const handleFieldChange = (id: string, field: string, value: any) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  return (
    <div className="space-y-6 select-none">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Products & Inventory
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage stock levels, price validation configs, and SKU availability
          </p>
        </div>
      </div>

      {message && (
        <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-semibold rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          {message}
        </div>
      )}

      {loading ? (
        <div className="p-12 bg-white rounded-2xl border border-slate-200 text-center text-xs text-slate-400">
          Loading products...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((p) => (
            <div
              key={p.id}
              className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4"
            >
              <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[10px] font-bold text-emerald-700 uppercase bg-emerald-50 px-2 py-0.5 rounded">
                    SKU: {p.sku}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-1">{p.name}</h3>
                  <p className="text-xs font-semibold text-slate-500">{p.packageType}</p>
                </div>
                <div className="text-right">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      p.stock > p.lowStockThreshold
                        ? "bg-emerald-100 text-emerald-800"
                        : p.stock > 0
                        ? "bg-amber-100 text-amber-800"
                        : "bg-rose-100 text-rose-800"
                    }`}
                  >
                    {p.stock > p.lowStockThreshold
                      ? "In Stock"
                      : p.stock > 0
                      ? "Low Stock"
                      : "Out of Stock"}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Selling Price (₹)
                  </label>
                  <input
                    type="number"
                    value={p.price}
                    onChange={(e) => handleFieldChange(p.id, "price", Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    MRP Price (₹)
                  </label>
                  <input
                    type="number"
                    value={p.mrp}
                    onChange={(e) => handleFieldChange(p.id, "mrp", Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Current Inventory Stock
                  </label>
                  <input
                    type="number"
                    value={p.stock}
                    onChange={(e) => handleFieldChange(p.id, "stock", Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Low Stock Threshold
                  </label>
                  <input
                    type="number"
                    value={p.lowStockThreshold}
                    onChange={(e) => handleFieldChange(p.id, "lowStockThreshold", Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                <select
                  value={p.status}
                  onChange={(e) => handleFieldChange(p.id, "status", e.target.value)}
                  className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700"
                >
                  <option value="active">Active (Visible)</option>
                  <option value="inactive">Inactive</option>
                </select>

                <button
                  onClick={() => handleUpdateProduct(p)}
                  disabled={updatingId === p.id}
                  className="px-4 py-2 bg-[#16483A] text-white text-xs font-semibold rounded-xl shadow-md hover:bg-[#1c5847] transition flex items-center gap-1.5"
                >
                  {updatingId === p.id ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Product Changes</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
