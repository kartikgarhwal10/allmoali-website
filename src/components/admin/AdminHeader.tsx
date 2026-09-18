"use client";

import React, { useState } from "react";
import { Menu, Search, Bell, RefreshCw, UserCheck, ShieldCheck } from "lucide-react";

interface AdminHeaderProps {
  onOpenMobileMenu?: () => void;
  onSearchChange?: (term: string) => void;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export default function AdminHeader({
  onOpenMobileMenu,
  onSearchChange,
  onRefresh,
  isRefreshing = false,
}: AdminHeaderProps) {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchValue(val);
    if (onSearchChange) onSearchChange(val);
  };

  return (
    <header className="sticky top-0 z-20 h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between shadow-xs select-none">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search Input */}
        <div className="relative w-48 sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchValue}
            onChange={handleSearch}
            placeholder="Search orders, phone, customer..."
            className="w-full pl-9 pr-4 py-1.5 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#16483A] focus:bg-white transition"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Live Refresh Button */}
        {onRefresh && (
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 active:scale-95 transition flex items-center gap-1.5 text-xs font-medium"
            title="Refresh DB Data"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin text-emerald-600" : ""}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        )}

        {/* Live Status Badge */}
        <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 bg-emerald-50 border border-emerald-200/60 rounded-full text-[11px] font-semibold text-emerald-700">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Live DB Sync
        </div>

        {/* Admin Profile Badge */}
        <div className="flex items-center gap-2.5 pl-3 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-[#16483A] text-white flex items-center justify-center font-bold text-xs shadow-xs">
            AO
          </div>
          <div className="hidden md:block text-left">
            <p className="text-xs font-bold text-slate-800 leading-tight">Allmoali Owner</p>
            <p className="text-[10px] text-slate-500 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              Verified Session
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
