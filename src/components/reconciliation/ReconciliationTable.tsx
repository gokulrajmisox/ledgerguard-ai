"use client";

import React, { useState } from "react";
import { Invoice, PurchaseOrder, BankTransaction } from "@/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import { CheckCircle2, XCircle, AlertTriangle, Link2, Eye, ArrowRight, FileText } from "lucide-react";

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
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  // Find matches for each invoice
  const getInvoiceMatches = (invoice: Invoice) => {
    const matches: {
      po?: PurchaseOrder;
      txn?: BankTransaction;
      status: "matched" | "partial" | "none";
      discrepancy?: number;
    } = { status: "none" };

    // Find PO match
    const po = purchaseOrders.find(p => p.poNumber === invoice.poNumber);
    if (po) {
      matches.po = po;
      // Check if amounts match
      if (Math.abs(po.authorizedAmount - invoice.totalAmount) < 0.01) {
        matches.status = "matched";
      } else {
        matches.status = "partial";
        matches.discrepancy = po.authorizedAmount - invoice.totalAmount;
      }
    }

    // Find transaction match
    const txn = bankTransactions.find(t => t.matchedInvoiceId === invoice.id);
    if (txn) {
      matches.txn = txn;
      if (matches.status !== "matched" && Math.abs(txn.amount - invoice.totalAmount) < 0.01) {
        matches.status = "matched";
      } else if (matches.status !== "partial") {
        matches.status = "partial";
        matches.discrepancy = txn.amount - invoice.totalAmount;
      }
    }

    // If no PO or transaction found
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
        return "bg-status-success/20 text-status-success border border-status-success/30";
      case "partial":
        return "bg-status-warning/20 text-status-warning border border-status-warning/30";
      case "none":
        return "bg-status-error/20 text-status-error border border-status-error/30";
      default:
        return "bg-platinum text-taupe";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "matched":
        return <CheckCircle2 className="w-4 h-4" />;
      case "partial":
        return <AlertTriangle className="w-4 h-4" />;
      case "none":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Link2 className="w-4 h-4" />;
    }
  };

  // Filter invoices that need reconciliation
  const pendingInvoices = invoices.filter(i => i.status !== "reconciled");

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-espresso">Match Records</h3>
        <span className="text-xs font-mono text-taupe">
          {pendingInvoices.length} invoices to reconcile
        </span>
      </div>

      {pendingInvoices.length === 0 ? (
        <div className="text-center py-12">
          <CheckCircle2 className="w-12 h-12 mx-auto text-status-success/30 mb-4" />
          <h3 className="text-lg font-medium text-espresso mb-2">
            All Invoices Reconciled
          </h3>
          <p className="text-taupe text-sm">
            Great job! All your invoices have been matched and reconciled.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
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
                  PO Match
                </th>
                <th className="text-xs font-medium text-taupe uppercase tracking-wider">
                  TXN Match
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
              {pendingInvoices.map((invoice) => {
                const matches = getInvoiceMatches(invoice);
                const isExpanded = expandedRows.has(invoice.id);
                
                return (
                  <React.Fragment key={invoice.id}>
                    <tr
                      className="hover:bg-platinum/50 transition-colors cursor-pointer"
                      onClick={() => toggleRow(invoice.id)}
                    >
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
                      <td>
                        {matches.po ? (
                          <span className="text-sm text-status-success">
                            {matches.po.poNumber}
                          </span>
                        ) : (
                          <span className="text-sm text-status-error">-</span>
                        )}
                      </td>
                      <td>
                        {matches.txn ? (
                          <span className="text-sm text-status-success">
                            {matches.txn.txnReference}
                          </span>
                        ) : (
                          <span className="text-sm text-status-error">-</span>
                        )}
                      </td>
                      <td>
                        <span
                          className={`flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${getStatusBadge(matches.status)}`}
                        >
                          {getStatusIcon(matches.status)}
                          {matches.status.charAt(0).toUpperCase() + matches.status.slice(1)}
                        </span>
                      </td>
                      <td>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedInvoice(invoice);
                            }}
                            className="p-1.5 rounded hover:bg-mocha/10 transition-colors"
                          >
                            <Eye className="w-4 h-4 text-mocha" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              // Mark as reconciled
                              // In a real app, this would update the store
                              onMatchComplete();
                            }}
                            className="p-1.5 rounded hover:bg-mocha/10 transition-colors"
                          >
                            <ArrowRight className="w-4 h-4 text-mocha" />
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Expanded Row Details */}
                    {isExpanded && (
                      <tr className="bg-platinum/50">
                        <td colSpan={8} className="p-0">
                          <div className="p-4">
                            <h4 className="text-sm font-medium text-espresso mb-3">
                              Match Details
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {/* PO Details */}
                              {matches.po && (
                                <div className="p-3 rounded-lg bg-ivory border border-mocha/10">
                                  <div className="flex items-center gap-2 mb-2">
                                    <FileText className="w-4 h-4 text-mocha" />
                                    <span className="text-sm font-medium text-espresso">
                                      Purchase Order
                                    </span>
                                  </div>
                                  <div className="text-sm text-taupe">
                                    {matches.po.poNumber}
                                  </div>
                                  <div className="text-sm text-taupe">
                                    Authorized: {formatCurrency(matches.po.authorizedAmount)}
                                  </div>
                                  <div className="text-sm text-taupe">
                                    Department: {matches.po.department}
                                  </div>
                                </div>
                              )}

                              {/* Transaction Details */}
                              {matches.txn && (
                                <div className="p-3 rounded-lg bg-ivory border border-mocha/10">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Link2 className="w-4 h-4 text-mocha" />
                                    <span className="text-sm font-medium text-espresso">
                                      Bank Transaction
                                    </span>
                                  </div>
                                  <div className="text-sm text-taupe">
                                    {matches.txn.txnReference}
                                  </div>
                                  <div className="text-sm text-taupe">
                                    Amount: {formatCurrency(matches.txn.amount)}
                                  </div>
                                  <div className="text-sm text-taupe">
                                    Status: {matches.txn.settlementStatus}
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Discrepancy */}
                            {matches.status === "partial" && matches.discrepancy && (
                              <div className="mt-4 p-3 rounded-lg bg-status-warning/10 border border-status-warning/30">
                                <div className="flex items-center gap-2 mb-2">
                                  <AlertTriangle className="w-4 h-4 text-status-warning" />
                                  <span className="text-sm font-medium text-espresso">
                                    Discrepancy Detected
                                  </span>
                                </div>
                                <p className="text-sm text-taupe">
                                  The invoice amount ({formatCurrency(invoice.totalAmount)}) 
                                  does not match the {matches.po ? "PO" : "transaction"} amount 
                                  ({formatCurrency(matches.po ? matches.po.authorizedAmount : matches.txn!.amount)}).
                                  Difference: {formatCurrency(Math.abs(matches.discrepancy))}
                                </p>
                              </div>
                            )}

                            {/* Actions */}
                            <div className="flex items-center justify-end gap-2 mt-4">
                              <button
                                onClick={() => {
                                  // In a real app, this would mark as needing review
                                }}
                                className="px-3 py-1.5 rounded border border-mocha/20 text-sm text-mocha hover:bg-mocha/5 transition-colors"
                              >
                                Flag for Review
                              </button>
                              <button
                                onClick={() => {
                                  // In a real app, this would mark as reconciled
                                  onMatchComplete();
                                }}
                                className="px-3 py-1.5 rounded bg-mocha text-ivory text-sm hover:bg-mocha/90 transition-colors"
                              >
                                Mark as Reconciled
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
