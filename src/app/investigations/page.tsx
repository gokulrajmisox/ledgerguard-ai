"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { useAppStore } from "@/lib/store";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  ShieldAlert,
  Search,
  Filter,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Lock,
  ArrowUpRight,
} from "lucide-react";

export default function InvestigationsQueuePage() {
  const { cases, auditLogs } = useAppStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredCases = cases.filter((c) => {
    const matchesSearch =
      c.caseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority =
      priorityFilter === "all" || c.priority === priorityFilter;
    const matchesStatus =
      statusFilter === "all" || c.status === statusFilter;
    return matchesSearch && matchesPriority && matchesStatus;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#070709] text-[#f4f4f7]">
      <Navbar />

      <div className="flex-1 flex pt-16">
        <Sidebar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full overflow-hidden">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-[#ff3355]" />
                <span className="text-xs font-mono uppercase tracking-widest text-[#ff3355]">
                  FORENSIC CASE MANAGEMENT
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                Investigation Cases & Escalations
              </h1>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="px-3 py-1.5 rounded bg-zinc-900 border border-white/10 text-zinc-300">
                TOTAL OPEN CASES: <span className="text-[#ff3355] font-bold">{cases.length}</span>
              </span>
            </div>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search case #, vendor, keywords..."
                className="w-full pl-9 pr-4 py-2 bg-black/60 border border-white/10 rounded-lg text-xs font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-[#00ff87]"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <div className="flex items-center gap-1 p-1 rounded-lg bg-black/60 border border-white/10">
                {["all", "P1", "P2"].map((p) => (
                  <button
                    key={p}
                    onClick={() => setPriorityFilter(p)}
                    className={`px-2.5 py-1 rounded uppercase ${
                      priorityFilter === p ? "bg-white/20 text-white font-bold" : "text-zinc-400"
                    }`}
                  >
                    {p === "all" ? "All Priorities" : `${p} Critical`}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1 p-1 rounded-lg bg-black/60 border border-white/10">
                {[
                  { id: "all", label: "All Status" },
                  { id: "investigating", label: "Investigating" },
                  { id: "under_review", label: "Under Review" },
                  { id: "approved", label: "Approved" },
                  { id: "escalated", label: "Escalated" },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setStatusFilter(s.id)}
                    className={`px-2.5 py-1 rounded ${
                      statusFilter === s.id ? "bg-white/20 text-white font-bold" : "text-zinc-400"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Cases Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCases.map((c) => {
              const statusBadge =
                c.status === "approved"
                  ? "bg-[#00ff87]/20 text-[#00ff87] border-[#00ff87]/30"
                  : c.status === "escalated"
                  ? "bg-[#ff3355]/20 text-[#ff3355] border-[#ff3355]/30"
                  : "bg-[#f59e0b]/20 text-[#f59e0b] border-[#f59e0b]/30";

              return (
                <div
                  key={c.id}
                  className="rounded-xl border border-white/10 bg-[#0c0c12] p-5 shadow-xl flex flex-col justify-between hover:border-white/20 transition-all group"
                >
                  <div>
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase bg-[#ff3355]/20 text-[#ff3355]">
                        {c.priority} CRITICAL
                      </span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase font-semibold border ${statusBadge}`}>
                        {c.status.replace("_", " ")}
                      </span>
                    </div>

                    <div className="text-xs font-mono text-zinc-500 mb-1">{c.caseNumber}</div>
                    <h3 className="text-base font-bold text-white mb-3 tracking-wide">
                      {c.vendorName}
                    </h3>

                    <div className="p-3 rounded-lg bg-black/40 border border-white/5 space-y-1.5 font-mono text-xs mb-4">
                      <div className="flex justify-between text-zinc-400">
                        <span>Invoice Total:</span>
                        <span className="text-white font-semibold">
                          {formatCurrency(c.totalInvoiceAmount)}
                        </span>
                      </div>
                      <div className="flex justify-between text-zinc-400">
                        <span>Authorized PO:</span>
                        <span className="text-[#00ff87] font-semibold">
                          {formatCurrency(c.poAmount)}
                        </span>
                      </div>
                      <div className="flex justify-between text-zinc-400 pt-1 border-t border-white/5">
                        <span className="text-[#ff3355] font-semibold">Disputed Delta:</span>
                        <span className="text-[#ff3355] font-bold">
                          +{formatCurrency(c.amountInDispute)}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs font-mono text-zinc-300 line-clamp-3 leading-relaxed mb-4">
                      {c.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between font-mono text-xs">
                    <span className="text-[10px] text-zinc-500">{formatDate(c.detectedAt)}</span>
                    <Link
                      href={`/investigations/${c.id}`}
                      className="inline-flex items-center gap-1.5 text-[#00ff87] font-semibold hover:underline"
                    >
                      <span>Open Case Dossier</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Full Audit Merkle Ledger Section anchor #audit */}
          <div id="audit" className="pt-8">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#00ff87]" />
                <h3 className="text-sm font-mono font-bold uppercase text-white tracking-wider">
                  Master Cryptographic Audit Ledger (Merkle Chain)
                </h3>
              </div>
              <span className="text-[10px] font-mono text-zinc-400">
                CONTINUOUS ENTERPRISE ATTESTATION
              </span>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#07070a] overflow-x-auto">
              <table className="w-full text-left text-xs font-mono border-separate border-spacing-0">
                <thead className="bg-[#0f0f15] text-zinc-400 uppercase text-[10px]">
                  <tr>
                    <th className="p-3.5 border-b border-white/10">Timestamp (UTC)</th>
                    <th className="p-3.5 border-b border-white/10">Action Performed</th>
                    <th className="p-3.5 border-b border-white/10">Actor / System Agent</th>
                    <th className="p-3.5 border-b border-white/10">Details</th>
                    <th className="p-3.5 border-b border-white/10">Block Hash</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {auditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-white/[0.02]">
                      <td className="p-3.5 text-zinc-400 whitespace-nowrap">
                        {formatDate(log.timestamp)}
                      </td>
                      <td className="p-3.5 font-bold text-white whitespace-nowrap">
                        {log.action}
                      </td>
                      <td className="p-3.5 text-zinc-300 whitespace-nowrap">{log.actor}</td>
                      <td className="p-3.5 text-zinc-400 max-w-md">{log.details}</td>
                      <td className="p-3.5 text-[#00ff87] font-semibold whitespace-nowrap">
                        {log.cryptographicHash}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
