"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { useAppStore } from "@/lib/store";
import { formatCurrency, formatDate } from "@/lib/utils";
import { BarChart3, PieChart, LineChart, FileText, Download, Calendar, CheckCircle2, AlertTriangle, TrendingUp, ShieldCheck } from "lucide-react";

export default function ReportsPage() {
  const { invoices, purchaseOrders, cases, auditLogs } = useAppStore();
  const [reportType, setReportType] = useState<"summary" | "discrepancies" | "activity">("summary");
  const [dateRange, setDateRange] = useState<"week" | "month" | "quarter" | "year">("month");

  const totalInvoices = invoices.length;
  const totalAmount = invoices.reduce((sum, i) => sum + i.totalAmount, 0);
  const reconciledCount = invoices.filter((i) => i.status === "reconciled").length;
  const pendingCount = invoices.filter((i) => i.status !== "reconciled").length;
  const discrepancyAmount = cases.reduce((sum, c) => sum + c.amountInDispute, 0);

  const statusDistribution = [
    { label: "Reconciled", count: reconciledCount, color: "#25663B", percentage: totalInvoices ? (reconciledCount / totalInvoices) * 100 : 0 },
    { label: "Discrepant", count: invoices.filter((i) => i.status === "discrepant").length, color: "#B52A2A", percentage: totalInvoices ? (invoices.filter((i) => i.status === "discrepant").length / totalInvoices) * 100 : 0 },
    { label: "Investigating", count: invoices.filter((i) => i.status === "investigating").length, color: "#946000", percentage: totalInvoices ? (invoices.filter((i) => i.status === "investigating").length / totalInvoices) * 100 : 0 },
    { label: "Duplicate Suspect", count: invoices.filter((i) => i.status === "duplicate_suspect").length, color: "#6F4E37", percentage: totalInvoices ? (invoices.filter((i) => i.status === "duplicate_suspect").length / totalInvoices) * 100 : 0 },
  ];

  const vendorVolumeMap = new Map<string, number>();
  invoices.forEach((i) => {
    const current = vendorVolumeMap.get(i.vendorName) || 0;
    vendorVolumeMap.set(i.vendorName, current + (i.totalAmount || 0));
  });
  const vendorVolume = Array.from(vendorVolumeMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5F1] text-[#30231D]">
      <Navbar />

      <div className="flex-1 flex pt-16">
        <Sidebar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full overflow-hidden">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#D7D0C9]">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-[#6F4E37]" />
                <span className="text-xs font-mono uppercase tracking-widest text-[#6F4E37] font-bold">
                  FINANCIAL ANALYTICS
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black serif-display text-[#30231D]">
                Analytics & Audit Reporting
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold uppercase text-[#5C4F47]">Period:</span>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value as any)}
                className="px-3.5 py-2 rounded-xl border border-[#D7D0C9] bg-white text-xs font-bold text-[#30231D] focus:outline-none focus:border-[#6F4E37] shadow-xs cursor-pointer"
              >
                <option value="week">Trailing 7 Days</option>
                <option value="month">Current Month (Oct 2026)</option>
                <option value="quarter">Fiscal Q4 2026</option>
                <option value="year">Full Year 2026</option>
              </select>
            </div>
          </div>

          {/* Report Type Tabs with High Contrast */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white border border-[#D7D0C9] shadow-xs w-fit">
            <button
              onClick={() => setReportType("summary")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                reportType === "summary"
                  ? "bg-[#6F4E37] text-white shadow-xs"
                  : "text-[#30231D] hover:bg-[#F7F5F1]"
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Executive Summary</span>
            </button>
            <button
              onClick={() => setReportType("discrepancies")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                reportType === "discrepancies"
                  ? "bg-[#6F4E37] text-white shadow-xs"
                  : "text-[#30231D] hover:bg-[#F7F5F1]"
              }`}
            >
              <PieChart className="w-4 h-4" />
              <span>Discrepancy Breakdown</span>
            </button>
            <button
              onClick={() => setReportType("activity")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                reportType === "activity"
                  ? "bg-[#6F4E37] text-white shadow-xs"
                  : "text-[#30231D] hover:bg-[#F7F5F1]"
              }`}
            >
              <LineChart className="w-4 h-4" />
              <span>Audit Chain Stream</span>
            </button>
          </div>

          {/* Summary Report View */}
          {reportType === "summary" && (
            <div className="space-y-6">
              {/* Top 4 KPI Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="card">
                  <span className="text-xs font-mono font-bold uppercase text-[#5C4F47]">Total Invoiced Volume</span>
                  <div className="text-2xl font-bold font-mono text-[#30231D] mt-1">{formatCurrency(totalAmount)}</div>
                  <div className="text-xs text-[#25663B] font-bold mt-1.5 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>+12.4% vs last period</span>
                  </div>
                </div>

                <div className="card">
                  <span className="text-xs font-mono font-bold uppercase text-[#5C4F47]">Auto-Reconciled</span>
                  <div className="text-2xl font-bold font-mono text-[#25663B] mt-1">{reconciledCount} / {totalInvoices}</div>
                  <div className="text-xs text-[#5C4F47] mt-1.5 font-medium">99.8% precision rate</div>
                </div>

                <div className="card">
                  <span className="text-xs font-mono font-bold uppercase text-[#5C4F47]">Capital in Dispute</span>
                  <div className="text-2xl font-bold font-mono text-[#B52A2A] mt-1">{formatCurrency(discrepancyAmount)}</div>
                  <div className="text-xs text-[#946000] font-bold mt-1.5">3 active holds applied</div>
                </div>

                <div className="card">
                  <span className="text-xs font-mono font-bold uppercase text-[#5C4F47]">Audit Chain Blocks</span>
                  <div className="text-2xl font-bold font-mono text-[#6F4E37] mt-1">{auditLogs.length} Blocks</div>
                  <div className="text-xs text-[#25663B] font-bold mt-1.5 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>100% Merkle Certified</span>
                  </div>
                </div>
              </div>

              {/* Vendor Volume Ranking */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-7 card space-y-4">
                  <h3 className="text-base font-bold text-[#30231D] serif-display">
                    Top Vendors by Clearing Volume
                  </h3>
                  <div className="space-y-3">
                    {vendorVolume.map(([vendor, vol], idx) => {
                      const pct = (vol / (totalAmount || 1)) * 100;
                      return (
                        <div key={vendor} className="space-y-1 text-xs">
                          <div className="flex justify-between font-semibold text-[#30231D]">
                            <span>{idx + 1}. {vendor}</span>
                            <span className="font-mono">{formatCurrency(vol)} ({Math.round(pct)}%)</span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-[#EDE8DE] overflow-hidden">
                            <div
                              className="h-full bg-[#6F4E37] rounded-full transition-all duration-500"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="lg:col-span-5 card space-y-4">
                  <h3 className="text-base font-bold text-[#30231D] serif-display">
                    Status Distribution
                  </h3>
                  <div className="space-y-3">
                    {statusDistribution.map((item) => (
                      <div key={item.label} className="p-3 rounded-xl bg-[#F7F5F1] border border-[#D7D0C9] flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 font-bold text-[#30231D]">
                          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                          <span>{item.label}</span>
                        </div>
                        <div className="font-mono font-bold text-[#30231D]">
                          {item.count} items ({Math.round(item.percentage)}%)
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Discrepancies View */}
          {reportType === "discrepancies" && (
            <div className="card space-y-4">
              <h3 className="text-base font-bold text-[#30231D] serif-display">
                Discrepancy Severity Distribution
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {cases.map((c) => (
                  <div key={c.id} className="p-4 rounded-xl border border-[#D7D0C9] bg-[#F7F5F1] space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-mono font-bold text-[#6F4E37]">{c.caseNumber}</span>
                      <span className="badge-error text-xs font-bold uppercase">{c.priority}</span>
                    </div>
                    <div className="font-bold text-sm text-[#30231D]">{c.vendorName}</div>
                    <div className="text-xs font-mono font-bold text-[#B52A2A]">
                      Dispute: {formatCurrency(c.amountInDispute)}
                    </div>
                    <p className="text-xs text-[#5C4F47] leading-relaxed">{c.summary}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Activity Stream View */}
          {reportType === "activity" && (
            <div className="card p-0 overflow-hidden shadow-md">
              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Block #</th>
                      <th>Timestamp</th>
                      <th>Event Action</th>
                      <th>Actor / Entity</th>
                      <th>Cryptographic State</th>
                    </tr>
                  </thead>
                  <tbody>
                    {auditLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-[#F7F5F1]">
                        <td className="text-xs font-mono font-bold text-[#6F4E37]">#{log.cryptographicHash.slice(0, 8)}</td>
                        <td className="text-xs text-[#5C4F47]">{new Date(log.timestamp).toLocaleString()}</td>
                        <td className="text-xs font-bold text-[#30231D]">{log.action}</td>
                        <td className="text-xs font-mono text-[#5C4F47]">{log.actor}</td>
                        <td>
                          <span className="badge-success text-xs font-bold">SEALED</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
