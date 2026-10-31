"use client";

import React, { useState } from "react";
import { Invoice, PurchaseOrder, BankTransaction } from "@/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import { CheckCircle2, XCircle, AlertTriangle, Link2, Eye, ArrowRight, FileText, ChevronDown, ChevronUp } from "lucide-react";

interface ReconciliationTableProps {
  invoices: Invoice[];
  purchaseOrders: PurchaseOrder[];
  bankTransactions: BankTransaction[];
  onMatchComplete: () => void;
}

export function ReconciliationTable({
  invoices,
  purchaseOrders,
  bankTransactions,
  onMatchComplete,
}: ReconciliationTableProps) {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set(["inv-01"]));

  // Find matches for each invoice
  const getInvoiceMatches = (invoice: Invoice) => {
    const matches: {
      po?: PurchaseOrder;
      txn?: BankTransaction;
      status: "matched" | "partial" | "none";
      discrepancy?: number;
    } = { status: "none" };

    // Find PO match
    const po = purchaseOrders.find((p) => p.poNumber === invoice.poNumber);
    if (po) {
      matches.po = po;
      if (Math.abs(po.authorizedAmount - invoice.totalAmount) < 0.01) {
        matches.status = "matched";
      } else {
        matches.status = "partial";
        matches.discrepancy = po.authorizedAmount - invoice.totalAmount;
      }
    }

    // Find transaction match
    const txn = bankTransactions.find((t) => t.matchedInvoiceId === invoice.id);
    if (txn) {
      matches.txn = txn;
      if (matches.status !== "matched" && Math.abs(txn.amount - invoice.totalAmount) < 0.01) {
        matches.status = "matched";
      } else if (matches.status !== "partial") {
        matches.status = "partial";
        matches.discrepancy = txn.amount - invoice.totalAmount;
      }
    }

    if (!po && !txn) {
      matches.status = "none";
    }

    return matches;
  };

  const toggleRow = (invoiceId: string) => {
    const newSet = new Set(expandedRows);
    if (newSet.has(invoiceId)) {
      newSet.delete(invoiceId);
    } else {
      newSet.add(invoiceId);
    }
    setExpandedRows(newSet);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "matched":
        return "badge-success";
      case "partial":
        return "badge-warning";
      case "none":
        return "badge-error";
      default:
        return "badge-info";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "matched":
        return <CheckCircle2 className="w-3.5 h-3.5 text-[#25663B]" />;
      case "partial":
        return <AlertTriangle className="w-3.5 h-3.5 text-[#946000]" />;
      case "none":
        return <XCircle className="w-3.5 h-3.5 text-[#B52A2A]" />;
      default:
        return <Link2 className="w-3.5 h-3.5" />;
    }
  };

  const pendingInvoices = invoices.filter((i) => i.status !== "reconciled");

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-[#30231D] serif-display">
            Match Records Matrix
          </h3>
          <p className="text-xs text-[#5C4F47] mt-0.5">
            Compare invoice totals directly against purchase orders and bank clearing feeds
          </p>
        </div>
        <span className="text-xs font-mono font-bold text-[#6F4E37] bg-[#EDE8DE] px-3 py-1 rounded-full border border-[#D7D0C9]">
          {pendingInvoices.length} PENDING REVIEW
        </span>
      </div>

      {pendingInvoices.length === 0 ? (
        <div className="text-center py-12 bg-[#F7F5F1] rounded-xl border border-[#D7D0C9]">
          <CheckCircle2 className="w-12 h-12 mx-auto text-[#25663B] mb-3" />
          <h4 className="text-lg font-bold text-[#30231D] mb-1">
            All Invoices Reconciled
          </h4>
          <p className="text-sm text-[#5C4F47]">
            Every active transaction has been verified with 0 unresolved variance.
          </p>
        </div>
      ) : (
        <div className="table-container shadow-xs">
          <table className="table">
            <thead>
              <tr>
                <th>Invoice #</th>
                <th>Vendor</th>
                <th>Date</th>
                <th>Amount</th>
                <th>PO Match</th>
                <th>TXN Match</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingInvoices.map((invoice) => {
                const matches = getInvoiceMatches(invoice);
                const isExpanded = expandedRows.has(invoice.id);

                return (
                  <React.Fragment key={invoice.id}>
                    <tr
                      className="cursor-pointer hover:bg-[#F7F5F1] transition-colors"
                      onClick={() => toggleRow(invoice.id)}
                    >
                      <td className="text-xs font-mono font-bold text-[#6F4E37]">
                        <div className="flex items-center gap-1.5">
                          {isExpanded ? (
                            <ChevronUp className="w-3.5 h-3.5 text-[#5C4F47]" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5 text-[#5C4F47]" />
                          )}
                          <span>{invoice.invoiceNumber}</span>
                        </div>
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
                      <td>
                        {matches.po ? (
                          <span className="text-xs font-mono font-bold text-[#25663B] bg-[#E8F4EC] px-2 py-0.5 rounded border border-[#B7DEC3]">
                            {matches.po.poNumber}
                          </span>
                        ) : (
                          <span className="text-xs font-bold text-[#B52A2A]">Missing PO</span>
                        )}
                      </td>
                      <td>
                        {matches.txn ? (
                          <span className="text-xs font-mono font-bold text-[#25663B] bg-[#E8F4EC] px-2 py-0.5 rounded border border-[#B7DEC3]">
                            {matches.txn.txnReference}
                          </span>
                        ) : (
                          <span className="text-xs font-bold text-[#946000]">Uncleared</span>
                        )}
                      </td>
                      <td>
                        <span className={getStatusBadge(matches.status)}>
                          {getStatusIcon(matches.status)}
                          <span>
                            {matches.status.charAt(0).toUpperCase() + matches.status.slice(1)}
                          </span>
                        </span>
                      </td>
                      <td className="text-right">
                        <div className="inline-flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => toggleRow(invoice.id)}
                            className="p-1.5 rounded-lg border border-[#D7D0C9] bg-white hover:border-[#6F4E37] text-[#30231D] hover:text-[#6F4E37] transition-all cursor-pointer"
                            title="Inspect Details"
                            aria-label="Inspect Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={onMatchComplete}
                            className="btn-primary py-1 px-2.5 text-xs font-medium shadow-xs"
                            title="Approve Match"
                          >
                            <span>Verify</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Expanded Row Details */}
                    {isExpanded && (
                      <tr className="bg-[#EDE8DE]/40">
                        <td colSpan={8} className="p-0">
                          <div className="p-5 border-y border-[#D7D0C9] space-y-4">
                            <div className="flex items-center justify-between">
                              <h4 className="text-xs font-mono font-bold text-[#30231D] uppercase tracking-wider">
                                3-Way Reconciliation Breakdown
                              </h4>
                              {matches.discrepancy && (
                                <span className="badge-warning text-xs font-bold">
                                  DISCREPANCY: {formatCurrency(Math.abs(matches.discrepancy))}
                                </span>
                              )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {/* PO Details */}
                              {matches.po && (
                                <div className="p-3.5 rounded-xl bg-white border border-[#D7D0C9] space-y-1.5 text-xs">
                                  <div className="flex items-center gap-2 font-bold text-[#30231D]">
                                    <FileText className="w-4 h-4 text-[#6F4E37]" />
                                    <span>Purchase Order: {matches.po.poNumber}</span>
                                  </div>
                                  <div className="flex justify-between text-[#5C4F47]">
                                    <span>Authorized Ceiling:</span>
                                    <span className="font-bold text-[#30231D] font-mono">
                                      {formatCurrency(matches.po.authorizedAmount)}
                                    </span>
                                  </div>
                                  <div className="flex justify-between text-[#5C4F47]">
                                    <span>Department:</span>
                                    <span className="font-semibold text-[#30231D]">{matches.po.department}</span>
                                  </div>
                                </div>
                              )}

                              {/* Transaction Details */}
                              {matches.txn && (
                                <div className="p-3.5 rounded-xl bg-white border border-[#D7D0C9] space-y-1.5 text-xs">
                                  <div className="flex items-center gap-2 font-bold text-[#30231D]">
                                    <Link2 className="w-4 h-4 text-[#6F4E37]" />
                                    <span>Bank Rail: {matches.txn.txnReference}</span>
                                  </div>
                                  <div className="flex justify-between text-[#5C4F47]">
                                    <span>Scheduled Clearing:</span>
                                    <span className="font-bold text-[#30231D] font-mono">
                                      {formatCurrency(matches.txn.amount)}
                                    </span>
                                  </div>
                                  <div className="flex justify-between text-[#5C4F47]">
                                    <span>Settlement Status:</span>
                                    <span className="font-semibold text-[#25663B]">{matches.txn.settlementStatus}</span>
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Discrepancy Alert */}
                            {matches.status === "partial" && matches.discrepancy && (
                              <div className="p-3.5 rounded-xl bg-[#FFF8E6] border border-[#F3DC9B] text-xs text-[#30231D]">
                                <div className="flex items-center gap-2 text-[#946000] font-bold mb-1">
                                  <AlertTriangle className="w-4 h-4" />
                                  <span>Variance Isolation</span>
                                </div>
                                <p className="text-[#5C4F47] leading-relaxed">
                                  Invoice amount ({formatCurrency(invoice.totalAmount)}) exceeds authorized ceiling ({formatCurrency(matches.po ? matches.po.authorizedAmount : matches.txn!.amount)}) by {formatCurrency(Math.abs(matches.discrepancy))}.
                                </p>
                              </div>
                            )}

                            {/* Actions Bar */}
                            <div className="flex items-center justify-end gap-3 pt-2">
                              <button
                                onClick={() => {}}
                                className="btn-outline py-2 px-4 text-xs font-bold"
                              >
                                Flag Discrepancy
                              </button>
                              <button
                                onClick={onMatchComplete}
                                className="btn-primary py-2 px-4 text-xs font-bold"
                              >
                                Certify & Reconcile
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ReconciliationTable;
