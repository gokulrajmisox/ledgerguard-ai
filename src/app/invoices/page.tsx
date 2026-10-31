"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { useAppStore } from "@/lib/store";
import { formatCurrency, formatDate } from "@/lib/utils";
import Link from "next/link";
import { Search, Filter, FileText, Eye, ArrowRight, Plus } from "lucide-react";

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
        return "bg-status-success/20 text-status-success border border-status-success/30";
      case "discrepant":
        return "bg-status-error/20 text-status-error border border-status-error/30";
      case "investigating":
        return "bg-status-warning/20 text-status-warning border border-status-warning/30";
      case "duplicate_suspect":
        return "bg-status-error/20 text-status-error border border-status-error/30";
      default:
        return "bg-platinum text-taupe";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-ivory text-espresso">
      <Navbar />

      <div className="flex-1 flex pt-16">
        <Sidebar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full overflow-hidden">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-mocha/10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-mocha" />
                <span className="text-xs font-mono uppercase tracking-widest text-mocha">
                  INVOICE MANAGEMENT
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold serif-display text-espresso">
                All Invoices
              </h1>
            </div>

            <Link
              href="/reconciliation"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-ivory bg-mocha hover:bg-mocha/90 transition-all shadow-md hover:shadow-lg"
            >
              <Plus className="w-4 h-4" />
              <span>Add Invoice</span>
            </Link>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-taupe" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search invoice #, vendor..."
                className="w-full pl-9 pr-4 py-2 bg-platinum border border-mocha/20 rounded-lg text-sm font-mono text-espresso placeholder-taupe focus:outline-none focus:border-mocha focus:ring-1 focus:ring-mocha/20"
              />
            </div>

            <div className="flex items-center gap-2 text-sm font-mono">
              <span className="text-taupe">Status:</span>
              <div className="flex items-center gap-1 p-1 rounded-lg bg-platinum border border-mocha/10">
                {[
                  { id: "all", label: "All" },
                  { id: "reconciled", label: "Reconciled" },
                  { id: "discrepant", label: "Discrepant" },
                  { id: "investigating", label: "Investigating" },
                  { id: "duplicate_suspect", label: "Duplicate" },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setStatusFilter(s.id)}
                    className={`px-3 py-1 rounded text-xs ${
                      statusFilter === s.id 
                        ? "bg-mocha/10 text-mocha font-bold" 
                        : "text-taupe hover:text-mocha"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="card text-center py-4">
              <div className="text-xl font-bold text-mocha">{invoices.length}</div>
              <div className="text-xs text-taupe mt-1">Total</div>
            </div>
            <div className="card text-center py-4">
              <div className="text-xl font-bold text-status-success">
                {invoices.filter(i => i.status === "reconciled").length}
              </div>
              <div className="text-xs text-taupe mt-1">Reconciled</div>
            </div>
            <div className="card text-center py-4">
              <div className="text-xl font-bold text-status-warning">
                {invoices.filter(i => i.status === "discrepant" || i.status === "investigating").length}
              </div>
              <div className="text-xs text-taupe mt-1">Need Review</div>
            </div>
            <div className="card text-center py-4">
              <div className="text-xl font-bold text-status-error">
                {invoices.filter(i => i.status === "duplicate_suspect").length}
              </div>
              <div className="text-xs text-taupe mt-1">Duplicates</div>
            </div>
          </div>

          {/* Invoices Table */}
          <div className="card">
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th className="text-xs font-medium text-taupe uppercase tracking-wider">
                      Invoice #
                    </th>
                    <th className="text-xs font-medium text-taupe uppercase tracking-wider">
                      Vendor
                    </th>
                    <th className="text-xs font-medium text-taupe uppercase tracking-wider">
                      Date
                    </th>
                    <th className="text-xs font-medium text-taupe uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="text-xs font-medium text-taupe uppercase tracking-wider">
                      PO Number
                    </th>
                    <th className="text-xs font-medium text-taupe uppercase tracking-wider">
                      Status
                    </th>
                    <th className="text-xs font-medium text-taupe uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInvoices.map((invoice) => (
                    <tr key={invoice.id} className="hover:bg-platinum/50 transition-colors">
                      <td className="text-sm font-mono text-mocha">
                        {invoice.invoiceNumber}
                      </td>
                      <td className="text-sm text-espresso">
                        {invoice.vendorName}
                      </td>
                      <td className="text-sm text-taupe">
                        {formatDate(invoice.issueDate)}
                      </td>
                      <td className="text-sm font-medium text-espresso">
                        {formatCurrency(invoice.totalAmount)}
                      </td>
                      <td className="text-sm font-mono text-taupe">
                        {invoice.poNumber}
                      </td>
                      <td>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getStatusBadge(invoice.status)}`}>
                          {invoice.status.replace("_", " ")}
                        </span>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/document-check?invoice=${invoice.id}`}
                            className="p-1.5 rounded hover:bg-mocha/10 transition-colors"
                            title="View Document"
                          >
                            <Eye className="w-4 h-4 text-mocha" />
                          </Link>
                          <Link
                            href={`/reconciliation?invoice=${invoice.id}`}
                            className="p-1.5 rounded hover:bg-mocha/10 transition-colors"
                            title="Reconcile"
                          >
                            <ArrowRight className="w-4 h-4 text-mocha" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredInvoices.length === 0 && (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 mx-auto text-mocha/30 mb-4" />
                <h3 className="text-lg font-medium text-espresso mb-2">
                  No invoices found
                </h3>
                <p className="text-taupe text-sm">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
