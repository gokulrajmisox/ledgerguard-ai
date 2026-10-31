"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Invoice, PurchaseOrder } from "@/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import { ArrowUpRight, Search, Filter, ShieldAlert, CheckCircle2, Copy } from "lucide-react";

export function ConventionalTableView({
  invoices,
  purchaseOrders,
}: {
  invoices: Invoice[];
  purchaseOrders: PurchaseOrder[];
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch =
      inv.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.poNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || inv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4">
      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search invoice #, vendor, PO..."
            className="w-full pl-9 pr-4 py-2 bg-black/60 border border-white/10 rounded-lg text-xs font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-[#00ff87]"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: "all", label: "All Records" },
            { id: "discrepant", label: "Discrepancies" },
            { id: "duplicate_suspect", label: "Duplicate Suspects" },
            { id: "reconciled", label: "Verified 3-Way" },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setStatusFilter(f.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all whitespace-nowrap ${
                statusFilter === f.id
                  ? "bg-white/15 text-white font-semibold border border-white/20"
                  : "bg-black/40 text-zinc-400 hover:text-white border border-white/5"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Accessible Responsive Table conforming to Modern Web Guidance */}
      <div
        tabIndex={0}
        role="region"
        aria-labelledby="financial-table-caption"
        className="responsive-table-wrapper w-full overflow-auto max-h-[520px] rounded-xl border border-white/10 bg-[#07070a]"
      >
        <table className="w-full text-left text-xs font-mono border-separate border-spacing-0">
          <caption id="financial-table-caption" className="sr-only">
            Enterprise Financial Reconciliation Records and Invoices
          </caption>
          <thead className="sticky top-0 z-10 bg-[#0f0f15] border-b border-white/10 text-zinc-400 uppercase text-[10px]">
            <tr>
              <th scope="col" className="p-3.5 border-b border-white/10">Invoice #</th>
              <th scope="col" className="p-3.5 border-b border-white/10">Vendor Entity</th>
              <th scope="col" className="p-3.5 border-b border-white/10">Purchase Order</th>
              <th scope="col" className="p-3.5 border-b border-white/10 text-right">Invoice Total</th>
              <th scope="col" className="p-3.5 border-b border-white/10">Reconcile Status</th>
              <th scope="col" className="p-3.5 border-b border-white/10">Due Date</th>
              <th scope="col" className="p-3.5 border-b border-white/10 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredInvoices.map((inv) => {
              const matchedPO = purchaseOrders.find((po) => po.poNumber === inv.poNumber);
              const hasDelta = matchedPO && matchedPO.authorizedAmount !== inv.totalAmount;
              const delta = matchedPO ? inv.totalAmount - matchedPO.authorizedAmount : 0;

              const statusBadge =
                inv.status === "discrepant"
                  ? "bg-[#ff3355]/20 text-[#ff3355] border-[#ff3355]/30"
                  : inv.status === "duplicate_suspect"
                  ? "bg-[#f59e0b]/20 text-[#f59e0b] border-[#f59e0b]/30"
                  : "bg-[#00ff87]/20 text-[#00ff87] border-[#00ff87]/30";

              return (
                <tr
                  key={inv.id}
                  className="hover:bg-white/[0.02] transition-colors group"
                >
                  <th scope="row" className="p-3.5 text-white font-bold whitespace-nowrap">
                    {inv.invoiceNumber}
                  </th>
                  <td className="p-3.5 text-zinc-300 font-semibold">{inv.vendorName}</td>
                  <td className="p-3.5 text-zinc-400">
                    <span className="text-[#00ff87]">{inv.poNumber}</span>
                    {matchedPO && (
                      <span className="text-zinc-500 text-[10px] block">
                        Auth: {formatCurrency(matchedPO.authorizedAmount)}
                      </span>
                    )}
                  </td>
                  <td className="p-3.5 text-right font-bold text-white whitespace-nowrap">
                    <div>{formatCurrency(inv.totalAmount)}</div>
                    {hasDelta && (
                      <div className="text-[10px] text-[#ff3355] font-semibold">
                        ▲ +{formatCurrency(delta)}
                      </div>
                    )}
                  </td>
                  <td className="p-3.5 whitespace-nowrap">
                    <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold border ${statusBadge}`}>
                      {inv.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="p-3.5 text-zinc-400 whitespace-nowrap">{inv.dueDate}</td>
                  <td className="p-3.5 text-right whitespace-nowrap">
                    <Link
                      href={
                        inv.status === "discrepant" || inv.status === "duplicate_suspect"
                          ? "/investigations/case-01"
                          : "/forensics"
                      }
                      className="inline-flex items-center gap-1 text-[#00ff87] hover:underline"
                    >
                      <span>Inspect</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
