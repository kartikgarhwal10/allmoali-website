"use client";

import React, { useState, useEffect } from "react";
import { ShieldCheck, Lock, FileText, Key, UserCheck, RefreshCw } from "lucide-react";

export default function AdminSettingsPage() {
  const [session, setSession] = useState<any>(null);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessionAndLogs = async () => {
      try {
        const [meRes, logsRes] = await Promise.all([
          fetch("/api/admin/me"),
          fetch("/api/admin/audit-logs?limit=30"),
        ]);
        const meData = await meRes.json();
        const logsData = await logsRes.json();

        if (meData.authenticated) setSession(meData);
        if (logsData.success) setAuditLogs(logsData.logs || []);
      } catch (err) {
        console.error("Error fetching settings info:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSessionAndLogs();
  }, []);

  return (
    <div className="space-y-6 select-none">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Admin Account & Security Settings
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Owner authentication status and append-only audit trail
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Active Session Info Box */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-[#16483A]" />
            Active Session Context
          </h3>

          <div className="space-y-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Admin Email</span>
              <span className="font-bold text-slate-800">{session?.email || "admin@allmoali.com"}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Session Status</span>
              <span className="inline-flex items-center gap-1.5 font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded text-[11px] mt-0.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                Authenticated JWT Session
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Role Privilege</span>
              <span className="font-bold text-slate-800">System Owner</span>
            </div>
          </div>
        </div>

        {/* Audit Log Timeline */}
        <div className="md:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#16483A]" />
            Security & Action Audit Logs
          </h3>

          {loading ? (
            <div className="p-8 text-center text-xs text-slate-400">Loading audit logs...</div>
          ) : auditLogs.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400">No audit logs recorded yet.</div>
          ) : (
            <div className="overflow-x-auto max-h-96 overflow-y-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-[10px] uppercase font-bold text-slate-400 sticky top-0">
                  <tr>
                    <th className="p-2.5">Action</th>
                    <th className="p-2.5">Target</th>
                    <th className="p-2.5">Admin</th>
                    <th className="p-2.5">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-[11px]">
                  {auditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50">
                      <td className="p-2.5 font-bold text-slate-800 font-mono">{log.action}</td>
                      <td className="p-2.5 text-slate-600">{log.targetId || log.targetType || "-"}</td>
                      <td className="p-2.5 text-slate-500">{log.adminEmail}</td>
                      <td className="p-2.5 text-slate-400">
                        {new Date(log.createdAt).toLocaleString("en-IN")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
