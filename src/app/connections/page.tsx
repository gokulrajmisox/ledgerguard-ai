"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { useAppStore } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";
import { Link2, FileText, Search, Eye, ArrowRight, Layers, CheckCircle2, AlertTriangle, ShieldCheck, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, staggerContainer, cardHoverVariants } from "@/lib/motion";

export default function ConnectionsPage() {
  const { invoices, purchaseOrders, bankTransactions } = useAppStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "graph">("list");
  const [selectedConnectionId, setSelectedConnectionId] = useState<string | null>(null);

  // Create connections between records
  interface Connection {
    id: string;
    source: any;
    target: any;
    type: "invoice-po" | "invoice-txn";
    label: string;
    status: string;
    amount: number;
    matchScore: number;
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
        matchScore: invoice.status === "reconciled" ? 100 : invoice.status === "discrepant" ? 64 : 88,
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
        matchScore: txn.settlementStatus === "settled" ? 100 : txn.settlementStatus === "held" ? 52 : 91,
      });
    }
  });

  // Filter connections based on search
  const filteredConnections = connections.filter((conn: Connection) => {
    const sourceName = (conn.source as any).invoiceNumber || (conn.source as any).poNumber || (conn.source as any).txnReference || "";
    const targetName = (conn.target as any).invoiceNumber || (conn.target as any).poNumber || (conn.target as any).txnReference || "";
    const vendorName = (conn.source as any).vendorName || (conn.target as any).vendorName || "";
    
    return (
      sourceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      targetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendorName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "reconciled":
      case "settled":
        return "badge-success";
      case "discrepant":
      case "held":
        return "badge-error";
      case "investigating":
      case "pending":
        return "badge-warning";
      default:
        return "badge-neutral";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-ivory text-espresso">
      <Navbar />

      <div className="flex-1 flex pt-16">
        <Sidebar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full overflow-hidden">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#D7D0C9]">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#6F4E37]" />
                <span className="text-xs font-mono uppercase tracking-widest text-[#6F4E37] font-bold">
                  RECORD TOPOLOGY & FORENSICS
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold serif-display text-espresso tracking-tight">
                Document Relationships
              </h1>
              <p className="text-sm text-[#5C4F47] mt-1">
                Deterministic 3-way correlation graph linking Invoices, Purchase Orders, and Cleared Settlements
              </p>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white border border-[#D7D0C9] shadow-sm">
              <button
                onClick={() => setViewMode("list")}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === "list"
                    ? "bg-[#6F4E37] text-white shadow-sm"
                    : "text-[#30231D] hover:bg-[#F7F5F1]"
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>List View</span>
              </button>
              <button
                onClick={() => setViewMode("graph")}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === "graph"
                    ? "bg-[#6F4E37] text-white shadow-sm"
                    : "text-[#30231D] hover:bg-[#F7F5F1]"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Graph View</span>
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5C4F47]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by invoice #, PO #, reference, or vendor..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#D7D0C9] focus:border-[#6F4E37] focus:ring-2 focus:ring-[#6F4E37]/20 rounded-xl text-sm font-mono text-espresso placeholder-[#7E7067] transition-all shadow-sm"
            />
          </div>

          {/* Summary KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="card-luxury p-4 text-center">
              <div className="text-2xl font-black font-mono text-[#30231D]">{connections.length}</div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#5C4F47] mt-1">Total Relationships</div>
            </div>
            <div className="card-luxury p-4 text-center border-l-4 border-l-[#25663B]">
              <div className="text-2xl font-black font-mono text-[#25663B]">
                {connections.filter((c: Connection) => c.status === "reconciled" || c.status === "settled").length}
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#5C4F47] mt-1">Matched 3-Way</div>
            </div>
            <div className="card-luxury p-4 text-center border-l-4 border-l-[#946000]">
              <div className="text-2xl font-black font-mono text-[#946000]">
                {connections.filter((c: Connection) => c.status === "investigating" || c.status === "pending").length}
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#5C4F47] mt-1">Pending Triage</div>
            </div>
            <div className="card-luxury p-4 text-center border-l-4 border-l-[#B52A2A]">
              <div className="text-2xl font-black font-mono text-[#B52A2A]">
                {connections.filter((c: Connection) => c.status === "discrepant" || c.status === "held").length}
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#5C4F47] mt-1">Exceptions Flagged</div>
            </div>
          </div>

          {/* Connections List Mode */}
          {viewMode === "list" && (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {filteredConnections.length > 0 ? (
                filteredConnections.map((conn: Connection, index: number) => {
                  const source = conn.source as any;
                  const target = conn.target as any;
                  const isDiscrepant = conn.status === "discrepant" || conn.status === "held";
                  
                  return (
                    <motion.div
                      key={conn.id}
                      variants={fadeInUp}
                      whileHover="hover"
                      className="card-luxury p-5 transition-shadow hover:shadow-md"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-[#D7D0C9]">
                        <div className="flex items-center gap-2.5">
                          <span className="w-6 h-6 rounded-full bg-[#6F4E37]/10 flex items-center justify-center text-xs font-mono font-bold text-[#6F4E37]">
                            {index + 1}
                          </span>
                          <h3 className="text-sm font-bold text-espresso">
                            {conn.type === "invoice-po" ? "Invoice ↔ Purchase Order Match" : "Invoice ↔ Bank Settlement Link"}
                          </h3>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono font-semibold text-[#5C4F47]">
                            Match Confidence: <span className="text-[#30231D] font-bold">{conn.matchScore}%</span>
                          </span>
                          <span className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase ${getStatusBadge(conn.status)}`}>
                            {conn.status.replace("_", " ")}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Source Document */}
                        <div className="p-4 rounded-xl bg-[#F7F5F1] border border-[#D7D0C9]">
                          <div className="flex items-center gap-2 mb-2">
                            <FileText className="w-4 h-4 text-[#6F4E37]" />
                            <span className="text-xs font-bold uppercase tracking-wider text-[#5C4F47]">
                              Source Record (Invoice)
                            </span>
                          </div>
                          <div className="text-lg font-mono font-black text-espresso">
                            {source.invoiceNumber || source.poNumber || source.txnReference}
                          </div>
                          <div className="text-sm font-medium text-espresso mt-0.5">
                            {source.vendorName || source.remitterName || "Enterprise Entity"}
                          </div>
                          <div className="text-sm font-mono font-bold text-[#6F4E37] mt-1.5">
                            {source.currency || "USD"} {formatCurrency(source.totalAmount || source.authorizedAmount || source.amount || 0)}
                          </div>
                        </div>

                        {/* Target Document */}
                        <div className="p-4 rounded-xl bg-[#F7F5F1] border border-[#D7D0C9]">
                          <div className="flex items-center gap-2 mb-2">
                            <Link2 className="w-4 h-4 text-[#6F4E37]" />
                            <span className="text-xs font-bold uppercase tracking-wider text-[#5C4F47]">
                              Target Record ({conn.label})
                            </span>
                          </div>
                          <div className="text-lg font-mono font-black text-espresso">
                            {target.poNumber || target.txnReference || target.invoiceNumber}
                          </div>
                          <div className="text-sm font-medium text-espresso mt-0.5">
                            {target.vendorName || target.beneficiaryName || "Enterprise Entity"}
                          </div>
                          <div className="text-sm font-mono font-bold text-[#6F4E37] mt-1.5">
                            {target.currency || "USD"} {formatCurrency(target.authorizedAmount || target.amount || 0)}
                          </div>
                        </div>
                      </div>

                      {/* Forensic Correlation Details */}
                      <div className="mt-4 pt-3 border-t border-[#D7D0C9] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-2 text-xs text-[#5C4F47]">
                          <Layers className="w-4 h-4 text-[#6F4E37]" />
                          <span>
                            {conn.type === "invoice-po" 
                              ? "Deterministic line-item unit rate and tax variance inspection complete."
                              : "Bank settlement clearing verified against Treasury routing ledger."}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-auto">
                          <button
                            onClick={() => {
                              if (source.fileUrl) window.open(source.fileUrl, "_blank");
                            }}
                            className="btn-outline py-1.5 px-3 text-xs flex items-center gap-1.5 font-bold"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Source Doc</span>
                          </button>
                          <a
                            href="/reconciliation"
                            className="btn-primary py-1.5 px-3 text-xs flex items-center gap-1.5 font-bold"
                          >
                            <span>Inspect Match</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                <div className="card-luxury text-center py-12">
                  <Layers className="w-12 h-12 mx-auto text-[#6F4E37]/40 mb-3" />
                  <h3 className="text-lg font-bold text-espresso mb-1">
                    No matching connections found
                  </h3>
                  <p className="text-sm text-[#5C4F47]">
                    Try adjusting your search criteria or resetting filters
                  </p>
                </div>
              )}
            </motion.div>
          )}

          {/* Interactive Graph View */}
          {viewMode === "graph" && (
            <div className="card-luxury p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#D7D0C9]">
                <div>
                  <h3 className="text-lg font-bold text-espresso">
                    Interactive Entity Relationship Network
                  </h3>
                  <p className="text-xs text-[#5C4F47]">
                    Click any node to highlight linked settlement records and variance paths
                  </p>
                </div>
                <div className="flex items-center gap-3 text-xs font-mono text-[#5C4F47]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#6F4E37]" />
                    <span>Invoices</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#25663B]" />
                    <span>Purchase Orders</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#946000]" />
                    <span>Bank Cleared</span>
                  </div>
                </div>
              </div>

              {/* Node Topology Canvas */}
              <div className="relative w-full h-[460px] bg-[#F7F5F1] rounded-xl border border-[#D7D0C9] overflow-hidden flex items-center justify-center p-6">
                <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                  {/* Connective Bezier Lines */}
                  <line x1="25%" y1="35%" x2="50%" y2="25%" stroke="#6F4E37" strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />
                  <line x1="25%" y1="65%" x2="50%" y2="75%" stroke="#25663B" strokeWidth="2" opacity="0.7" />
                  <line x1="50%" y1="25%" x2="75%" y2="50%" stroke="#25663B" strokeWidth="2.5" opacity="0.9" />
                  <line x1="50%" y1="75%" x2="75%" y2="50%" stroke="#B52A2A" strokeWidth="2.5" strokeDasharray="3 3" opacity="0.8" />
                  <line x1="25%" y1="35%" x2="50%" y2="75%" stroke="#6F4E37" strokeWidth="1.5" opacity="0.4" />
                </svg>

                {/* Nodes Layout */}
                <div className="relative z-10 w-full h-full grid grid-cols-3 gap-6 items-center">
                  {/* Column 1: Invoices */}
                  <div className="space-y-4">
                    <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#5C4F47] text-center mb-2">
                      Invoices (Source)
                    </div>
                    {invoices.slice(0, 3).map((inv) => (
                      <motion.div
                        key={inv.id}
                        whileHover={{ scale: 1.04 }}
                        onClick={() => setSelectedConnectionId(inv.id)}
                        className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer bg-white shadow-sm ${
                          selectedConnectionId === inv.id
                            ? "border-[#6F4E37] ring-2 ring-[#6F4E37]/20"
                            : "border-[#D7D0C9] hover:border-[#6F4E37]"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-mono font-bold text-xs text-[#30231D]">{inv.invoiceNumber}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${getStatusBadge(inv.status)}`}>
                            {inv.status}
                          </span>
                        </div>
                        <div className="text-xs text-[#5C4F47] truncate">{inv.vendorName}</div>
                        <div className="text-xs font-mono font-bold text-[#6F4E37] mt-1">
                          {formatCurrency(inv.totalAmount)}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Column 2: Purchase Orders */}
                  <div className="space-y-4">
                    <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#5C4F47] text-center mb-2">
                      Authorized POs
                    </div>
                    {purchaseOrders.slice(0, 3).map((po) => (
                      <motion.div
                        key={po.id}
                        whileHover={{ scale: 1.04 }}
                        onClick={() => setSelectedConnectionId(po.id)}
                        className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer bg-white shadow-sm ${
                          selectedConnectionId === po.id
                            ? "border-[#25663B] ring-2 ring-[#25663B]/20"
                            : "border-[#D7D0C9] hover:border-[#25663B]"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-mono font-bold text-xs text-[#30231D]">{po.poNumber}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase badge-success">
                            MATCHED
                          </span>
                        </div>
                        <div className="text-xs text-[#5C4F47] truncate">{po.vendorName}</div>
                        <div className="text-xs font-mono font-bold text-[#25663B] mt-1">
                          {formatCurrency(po.authorizedAmount)}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Column 3: Settlements */}
                  <div className="space-y-4">
                    <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#5C4F47] text-center mb-2">
                      Treasury Clearing
                    </div>
                    {bankTransactions.slice(0, 3).map((txn) => (
                      <motion.div
                        key={txn.id}
                        whileHover={{ scale: 1.04 }}
                        onClick={() => setSelectedConnectionId(txn.id)}
                        className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer bg-white shadow-sm ${
                          selectedConnectionId === txn.id
                            ? "border-[#946000] ring-2 ring-[#946000]/20"
                            : "border-[#D7D0C9] hover:border-[#946000]"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-mono font-bold text-xs text-[#30231D]">{txn.txnReference}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${getStatusBadge(txn.settlementStatus)}`}>
                            {txn.settlementStatus}
                          </span>
                        </div>
                        <div className="text-xs text-[#5C4F47] truncate">{txn.beneficiaryName}</div>
                        <div className="text-xs font-mono font-bold text-[#946000] mt-1">
                          {formatCurrency(txn.amount)}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#E6E0F0]/30 border border-[#6F4E37]/20 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-[#6F4E37]" />
                  <span className="text-xs font-medium text-espresso">
                    Full Merkle-tree cryptographic topology is available in the Intelligence Command Center.
                  </span>
                </div>
                <a
                  href="/console"
                  className="btn-primary py-1.5 px-3.5 text-xs font-bold inline-flex items-center gap-1.5"
                >
                  <span>Open 3D Matrix</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
