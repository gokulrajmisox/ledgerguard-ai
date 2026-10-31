"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { useAppStore } from "@/lib/store";
import { formatCurrency, formatDate } from "@/lib/utils";
import Link from "next/link";
import { Search, Filter, FileText, Eye, ArrowRight, Plus, CheckCircle2, AlertTriangle, ShieldCheck } from "lucide-react";

export default function InvoicesPage() {
  const { invoices } = useAppStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.vendorName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "reconciled":
        return "badge-success";
      case "discrepant":
      case "duplicate_suspect":
        return "badge-error";
      case "investigating":
        return "badge-warning";
      default:
        return "badge-info";
    }
  };

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
                  LEDGER INVENTORY
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black serif-display text-[#30231D]">
                Invoices & Disbursements
              </h1>
            </div>

            <Link
              href="/reconciliation"
              className="btn-primary"
            >
              <Plus className="w-4 h-4" />
              <span>Upload New Invoice</span>
            </Link>
          </div>

          {/* Search & Filter Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5C4F47]" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by invoice #, vendor name..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#D7D0C9] rounded-xl text-xs font-mono text-[#30231D] placeholder-[#7E7067] focus:outline-none focus:border-[#6F4E37] focus:ring-2 focus:ring-[#6F4E37]/15 shadow-xs"
              />
            </div>

            {/* Filter Pills with High Contrast */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white border border-[#D7D0C9] shadow-xs overflow-x-auto">
              {[
                { id: "all", label: "All Items" },
                { id: "reconciled", label: "Reconciled" },
                { id: "discrepant", label: "Discrepant" },
                { id: "investigating", label: "Investigating" },
                { id: "duplicate_suspect", label: "Duplicate Suspect" },
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => setStatusFilter(s.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    statusFilter === s.id
                      ? "bg-[#6F4E37] text-white shadow-xs"
                      : "text-[#30231D] hover:bg-[#F7F5F1]"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Summary Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="card py-4 text-center">
              <div className="text-2xl font-bold font-mono text-[#6F4E37]">{invoices.length}</div>
              <div className="text-xs font-mono font-bold uppercase text-[#5C4F47] mt-1">Total Records</div>
            </div>
            <div className="card py-4 text-center">
              <div className="text-2xl font-bold font-mono text-[#25663B]">
                {invoices.filter((i) => i.status === "reconciled").length}
              </div>
              <div className="text-xs font-mono font-bold uppercase text-[#5C4F47] mt-1">Reconciled</div>
            </div>
            <div className="card py-4 text-center">
              <div className="text-2xl font-bold font-mono text-[#946000]">
                {invoices.filter((i) => i.status === "discrepant" || i.status === "investigating").length}
              </div>
              <div className="text-xs font-mono font-bold uppercase text-[#5C4F47] mt-1">Under Review</div>
            </div>
            <div className="card py-4 text-center">
              <div className="text-2xl font-bold font-mono text-[#B52A2A]">
                {invoices.filter((i) => i.status === "duplicate_suspect").length}
              </div>
              <div className="text-xs font-mono font-bold uppercase text-[#5C4F47] mt-1">Duplicates Flagged</div>
            </div>
          </div>

          {/* Invoices Data Table */}
          <div className="card p-0 overflow-hidden shadow-md">
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Invoice #</th>
                    <th>Vendor</th>
                    <th>Issue Date</th>
                    <th>Amount</th>
                    <th>PO Number</th>
                    <th>Status</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInvoices.map((invoice) => (
                    <tr key={invoice.id} className="hover:bg-[#F7F5F1] transition-colors">
                      <td className="text-xs font-mono font-bold text-[#6F4E37]">
                        {invoice.invoiceNumber}
                      </td>
                      <td className="text-xs font-semibold text-[#30231D]">
                        {invoice.vendorName}
                      </td>
                      <td className="text-xs font-medium text-[#5C4F47]">
                        {formatDate(invoice.issueDate)}
                      </td>
                      <td className="text-xs font-bold font-mono text-[#30231D]">
                        {formatCurrency(invoice.totalAmount)}
                      </td>
                      <td className="text-xs font-mono text-[#5C4F47]">
                        {invoice.poNumber || "N/A"}
                      </td>
                      <td>
                        <span className={getStatusBadge(invoice.status)}>
                          {invoice.status.replace("_", " ").toUpperCase()}
                        </span>
                      </td>
                      <td className="text-right">
                        <Link
                          href={`/document-check?invoice=${invoice.id}`}
                          className="btn-outline py-1 px-3 text-xs"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Forensics</span>
                        </Link>
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
