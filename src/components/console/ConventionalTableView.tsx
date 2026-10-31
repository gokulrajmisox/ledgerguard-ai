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
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5C4F47]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search invoice #, vendor, PO..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-[#D7D0C9] rounded-xl text-xs font-mono text-espresso placeholder-[#7E7067] focus:outline-none focus:border-[#6F4E37] focus:ring-2 focus:ring-[#6F4E37]/15 shadow-sm"
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
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all whitespace-nowrap ${
                statusFilter === f.id
                  ? "bg-[#6F4E37] text-white shadow-sm"
                  : "bg-white text-[#30231D] hover:bg-[#F7F5F1] border border-[#D7D0C9]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Responsive High-Contrast Table */}
      <div
        tabIndex={0}
        role="region"
        aria-labelledby="financial-table-caption"
        className="responsive-table-wrapper w-full overflow-auto max-h-[520px] rounded-xl border border-[#D7D0C9] bg-white shadow-sm"
      >
        <table className="w-full text-left text-xs font-mono border-separate border-spacing-0">
          <caption id="financial-table-caption" className="sr-only">
            Enterprise Financial Reconciliation Records and Invoices
          </caption>
          <thead className="sticky top-0 z-10 bg-[#F7F5F1] border-b border-[#D7D0C9] text-[#5C4F47] uppercase text-[11px] font-bold">
            <tr>
              <th scope="col" className="p-3.5 border-b border-[#D7D0C9]">Invoice #</th>
              <th scope="col" className="p-3.5 border-b border-[#D7D0C9]">Vendor Entity</th>
              <th scope="col" className="p-3.5 border-b border-[#D7D0C9]">Purchase Order</th>
              <th scope="col" className="p-3.5 border-b border-[#D7D0C9] text-right">Invoice Total</th>
              <th scope="col" className="p-3.5 border-b border-[#D7D0C9]">Reconcile Status</th>
              <th scope="col" className="p-3.5 border-b border-[#D7D0C9]">Due Date</th>
              <th scope="col" className="p-3.5 border-b border-[#D7D0C9] text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#D7D0C9]">
            {filteredInvoices.map((inv) => {
              const matchedPO = purchaseOrders.find((po) => po.poNumber === inv.poNumber);
              const hasDelta = matchedPO && matchedPO.authorizedAmount !== inv.totalAmount;
              const delta = matchedPO ? inv.totalAmount - matchedPO.authorizedAmount : 0;

              const statusBadge =
                inv.status === "discrepant"
                  ? "badge-error"
                  : inv.status === "duplicate_suspect"
                  ? "badge-warning"
                  : "badge-success";

              return (
                <tr
                  key={inv.id}
                  className="hover:bg-[#F7F5F1] transition-colors group"
                >
                  <th scope="row" className="p-3.5 text-espresso font-bold whitespace-nowrap">
                    {inv.invoiceNumber}
                  </th>
                  <td className="p-3.5 text-espresso font-semibold">{inv.vendorName}</td>
                  <td className="p-3.5 text-[#5C4F47]">
                    <span className="text-[#6F4E37] font-bold">{inv.poNumber}</span>
                    {matchedPO && (
                      <span className="text-[#5C4F47] text-[10px] block font-medium">
                        Auth: {formatCurrency(matchedPO.authorizedAmount)}
                      </span>
                    )}
                  </td>
                  <td className="p-3.5 text-right font-bold text-espresso whitespace-nowrap">
                    <div>{formatCurrency(inv.totalAmount)}</div>
                    {hasDelta && (
                      <div className="text-[10px] text-[#B52A2A] font-bold">
                        ▲ +{formatCurrency(delta)}
                      </div>
                    )}
                  </td>
                  <td className="p-3.5 whitespace-nowrap">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold ${statusBadge}`}>
                      {inv.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="p-3.5 text-[#5C4F47] whitespace-nowrap font-medium">{inv.dueDate}</td>
                  <td className="p-3.5 text-right whitespace-nowrap">
                    <Link
                      href="/document-check"
                      className="inline-flex items-center gap-1 text-[#6F4E37] font-bold hover:underline"
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
