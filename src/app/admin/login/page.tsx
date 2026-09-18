"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Lock, Mail, Eye, EyeOff, ShieldCheck, AlertCircle, ArrowRight } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@allmoali.com");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setError("Please enter your admin password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || "Authentication failed.");
        setLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch (err: any) {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 sm:p-6 lg:p-8 select-none">
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#16483A]/20 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md bg-slate-800/90 backdrop-blur-xl border border-slate-700/60 rounded-2xl shadow-2xl overflow-hidden">
        {/* Top Header Banner */}
        <div className="bg-[#16483A] p-6 text-center text-white relative">
          <div className="inline-flex items-center justify-center p-2 bg-white/10 rounded-xl mb-3 shadow-inner">
            <Image
              src="/images/allmoali_logo.png"
              alt="ALLMOALI Logo"
              width={48}
              height={48}
              className="h-10 w-auto object-contain"
            />
          </div>
          <h1 className="text-xl font-bold tracking-tight">ALLMOALI OWNER PANEL</h1>
          <p className="text-xs text-emerald-100/80 mt-1">Authorized E-Commerce Management System</p>
        </div>

        {/* Login Form Body */}
        <form onSubmit={handleLogin} className="p-6 sm:p-8 space-y-5">
          {error && (
            <div className="flex items-start gap-3 p-3.5 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs sm:text-sm">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Admin Account Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2.5 bg-slate-900/80 border border-slate-700 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#16483A] focus:border-emerald-500 transition"
                placeholder="admin@allmoali.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Owner Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-11 py-2.5 bg-slate-900/80 border border-slate-700 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#16483A] focus:border-emerald-500 transition"
                placeholder="Enter password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white transition"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-[#16483A] hover:bg-[#1b5545] text-white text-sm font-semibold rounded-xl shadow-lg hover:shadow-emerald-900/20 active:scale-[0.98] transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <div className="pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              256-Bit SSL Encrypted
            </span>
            <span>v1.0.0</span>
          </div>
        </form>
      </div>
    </div>
  );
}
