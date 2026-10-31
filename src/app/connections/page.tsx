"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { useAppStore } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";
import { Link2, FileText, Search, Eye, ArrowRight, Layers } from "lucide-react";

export default function ConnectionsPage() {
  const { invoices, purchaseOrders, bankTransactions } = useAppStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "graph">("list");

  // Create connections between records
  interface Connection {
    id: string;
    source: any;
    target: any;
    type: string;
    label: string;
    status: string;
    amount: number;
  }
  
  const connections: Connection[] = [];
  
  // Connect invoices to their POs
  invoices.forEach(invoice => {
    const po = purchaseOrders.find(p => p.poNumber === invoice.poNumber);
    if (po) {
      connections.push({
        id: `conn-${invoice.id}-${po.id}`,
        source: invoice,
        target: po,
        type: "invoice-po",
        label: "Purchase Order",
        status: invoice.status,
        amount: invoice.totalAmount,
      });
    }
  });

  // Connect invoices to bank transactions
  invoices.forEach(invoice => {
    const txn = bankTransactions.find(t => t.matchedInvoiceId === invoice.id);
    if (txn) {
      connections.push({
        id: `conn-${invoice.id}-${txn.id}`,
        source: invoice,
        target: txn,
        type: "invoice-txn",
        label: "Bank Transaction",
        status: txn.settlementStatus,
        amount: txn.amount,
      });
    }
  });

  // Filter connections based on search
  const filteredConnections = connections.filter((conn: Connection) => {
    const sourceName = (conn.source as any).invoiceNumber || (conn.source as any).poNumber || (conn.source as any).txnReference || "";
    const targetName = (conn.target as any).invoiceNumber || (conn.target as any).poNumber || (conn.target as any).txnReference || "";
    const vendorName = (conn.source as any).vendorName || "";
    
    return (
      sourceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      targetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendorName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "reconciled":
      case "settled":
        return "bg-status-success/20 text-status-success border border-status-success/30";
      case "discrepant":
      case "held":
        return "bg-status-error/20 text-status-error border border-status-error/30";
      case "investigating":
      case "pending":
        return "bg-status-warning/20 text-status-warning border border-status-warning/30";
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
                  RECORD CONNECTIONS
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold serif-display text-espresso">
                Document Relationships
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-taupe">View:</span>
              <button
                onClick={() => setViewMode("list")}
                className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                  viewMode === "list"
                    ? "bg-mocha/10 text-mocha border border-mocha/20"
                    : "text-taupe hover:text-mocha"
                }`}
              >
                List
              </button>
              <button
                onClick={() => setViewMode("graph")}
                className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                  viewMode === "graph"
                    ? "bg-mocha/10 text-mocha border border-mocha/20"
                    : "text-taupe hover:text-mocha"
                }`}
              >
                Graph
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-taupe" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search connections..."
              className="w-full pl-9 pr-4 py-2 bg-platinum border border-mocha/20 rounded-lg text-sm font-mono text-espresso placeholder-taupe focus:outline-none focus:border-mocha focus:ring-1 focus:ring-mocha/20"
            />
          </div>

          {/* Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="card text-center py-4">
              <div className="text-xl font-bold text-mocha">{connections.length}</div>
              <div className="text-xs text-taupe mt-1">Total Connections</div>
            </div>
            <div className="card text-center py-4">
              <div className="text-xl font-bold text-status-success">
                {connections.filter((c: Connection) => c.status === "reconciled" || c.status === "settled").length}
              </div>
              <div className="text-xs text-taupe mt-1">Matched</div>
            </div>
            <div className="card text-center py-4">
              <div className="text-xl font-bold text-status-warning">
                {connections.filter((c: Connection) => c.status === "investigating" || c.status === "pending").length}
              </div>
              <div className="text-xs text-taupe mt-1">Pending</div>
            </div>
            <div className="card text-center py-4">
              <div className="text-xl font-bold text-status-error">
                {connections.filter((c: Connection) => c.status === "discrepant" || c.status === "held").length}
              </div>
              <div className="text-xs text-taupe mt-1">Issues</div>
            </div>
          </div>

          {/* Connections List */}
          {viewMode === "list" && (
            <div className="space-y-4">
              {filteredConnections.length > 0 ? (
                filteredConnections.map((conn: Connection, index: number) => {
                  const source = conn.source as any;
                  const target = conn.target as any;
                  
                  return (
                    <div
                      key={conn.id}
                      className="card"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-medium text-espresso">
                          Connection #{index + 1}
                        </h3>
                        <span
                          className={`text-xs font-medium px-2 py-0.5 rounded-full ${getStatusColor(conn.status)}`}
                        >
                          {conn.status.replace("_", " ")}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Source */}
                        <div className="p-3 rounded-lg bg-platinum/50 border border-mocha/10">
                          <div className="flex items-center gap-2 mb-2">
                            <FileText className="w-4 h-4 text-mocha" />
                            <span className="text-sm font-medium text-espresso">
                              Source
                            </span>
                          </div>
                          <div className="text-lg font-bold text-mocha">
                            {source.invoiceNumber || source.poNumber || source.txnReference}
                          </div>
                          <div className="text-sm text-taupe">
                            {source.vendorName || source.remitterName || "Unknown"}
                          </div>
                          <div className="text-sm text-taupe mt-1">
                            {source.currency} {formatCurrency(source.totalAmount || source.authorizedAmount || source.amount || 0)}
                          </div>
                        </div>

                        {/* Target */}
                        <div className="p-3 rounded-lg bg-platinum/50 border border-mocha/10">
                          <div className="flex items-center gap-2 mb-2">
                            <Link2 className="w-4 h-4 text-mocha" />
                            <span className="text-sm font-medium text-espresso">
                              Target
                            </span>
                          </div>
                          <div className="text-lg font-bold text-mocha">
                            {target.poNumber || target.txnReference || target.invoiceNumber}
                          </div>
                          <div className="text-sm text-taupe">
                            {target.vendorName || target.beneficiaryName || "Unknown"}
                          </div>
                          <div className="text-sm text-taupe mt-1">
                            {target.currency} {formatCurrency(target.authorizedAmount || target.amount || 0)}
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-mocha/10">
                        <div className="flex items-center gap-2">
                          <Layers className="w-4 h-4 text-taupe" />
                          <span className="text-sm text-taupe">
                            {conn.type === "invoice-po" 
                              ? "Invoice linked to Purchase Order"
                              : "Invoice linked to Bank Transaction"}
                          </span>
                        </div>
                        <p className="text-sm text-taupe/70 mt-1">
                          Click to view details of both documents
                        </p>
                      </div>

                      <div className="flex items-center justify-end gap-2 mt-4">
                        <button
                          onClick={() => {
                            if (source.fileUrl) {
                              window.open(source.fileUrl, "_blank");
                            }
                          }}
                          className="px-3 py-1.5 rounded border border-mocha/20 text-sm text-mocha hover:bg-mocha/5 transition-colors flex items-center gap-1"
                        >
                          <Eye className="w-4 h-4" />
                          <span>View Source</span>
                        </button>
                        <button
                          onClick={() => {
                            if (target.fileUrl) {
                              window.open(target.fileUrl, "_blank");
                            }
                          }}
                          className="px-3 py-1.5 rounded border border-mocha/20 text-sm text-mocha hover:bg-mocha/5 transition-colors flex items-center gap-1"
                        >
                          <Eye className="w-4 h-4" />
                          <span>View Target</span>
                        </button>
                        <button
                          onClick={() => {
                            // Navigate to reconciliation with both IDs
                            const sourceId = source.id || source.invoiceNumber;
                            const targetId = target.id || target.poNumber;
                            // In a real app, you'd construct a proper URL
                          }}
                          className="px-3 py-1.5 rounded bg-mocha text-ivory text-sm hover:bg-mocha/90 transition-colors flex items-center gap-1"
                        >
                          <ArrowRight className="w-4 h-4" />
                          <span>Review Connection</span>
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="card text-center py-12">
                  <Layers className="w-12 h-12 mx-auto text-mocha/30 mb-4" />
                  <h3 className="text-lg font-medium text-espresso mb-2">
                    No connections found
                  </h3>
                  <p className="text-taupe text-sm">
                    Try adjusting your search criteria
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Graph View */}
          {viewMode === "graph" && (
            <div className="card h-96 flex items-center justify-center bg-platinum/50 rounded-lg border-2 border-dashed border-mocha/20">
              <div className="text-center">
                <Layers className="w-16 h-16 mx-auto text-mocha/30 mb-4" />
                <h3 className="text-lg font-medium text-espresso mb-2">
                  Interactive Graph View
                </h3>
                <p className="text-taupe text-sm mb-4">
                  Switch to "List" view to see connections, or enable the graph visualization
                </p>
                <p className="text-xs text-taupe/70">
                  Note: The 3D graph visualization is available in the full application
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
