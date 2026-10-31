"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { ReconciliationTable } from "@/components/investigations/ReconciliationTable";
import { EvidenceCategorizedPanel } from "@/components/investigations/EvidenceCategorizedPanel";
import { ReviewerActionsBar } from "@/components/investigations/ReviewerActionsBar";
import { AuditTimeline } from "@/components/investigations/AuditTimeline";
import { useAppStore } from "@/lib/store";
import { formatCurrency, formatDate } from "@/lib/utils";
import Link from "next/link";
import {
  ShieldAlert,
  SearchCode,
  ArrowLeft,
  FileSearch,
  ExternalLink,
  Layers,
  AlertTriangle,
} from "lucide-react";

export function InvestigationDetailClient({ caseId }: { caseId: string }) {
  const { cases, invoices, purchaseOrders, bankTransactions, auditLogs } = useAppStore();

  const currentCase =
    cases.find((c) => c.id === caseId || c.caseNumber.toLowerCase() === caseId.toLowerCase()) ||
    cases[0];

  const currentInvoice =
    invoices.find((inv) => inv.id === currentCase.invoiceId) || invoices[0];
  const currentPO = purchaseOrders.find((po) => po.poNumber === currentInvoice.poNumber);
  const currentTxn = bankTransactions.find(
    (txn) => txn.matchedInvoiceId === currentInvoice.id
  );

  const caseAuditLogs = auditLogs.filter(
    (a) => a.caseId === currentCase.id || a.details.includes(currentCase.caseNumber)
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#070709] text-[#f4f4f7]">
      <Navbar />

      <div className="flex-1 flex pt-16">
        <Sidebar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full overflow-hidden">
          {/* Breadcrumb & Navigation */}
          <div className="flex items-center justify-between pb-2">
            <Link
              href="/investigations"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Investigation Queue</span>
            </Link>

            <Link
              href="/forensics"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#00ff87] hover:underline"
            >
              <FileSearch className="w-3.5 h-3.5" />
              <span>Inspect in Forensics Lab →</span>
            </Link>
          </div>

          {/* Case Header Hero Banner */}
          <div className="p-6 rounded-2xl border border-white/10 bg-[#0e0e14] shadow-2xl relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2 font-mono text-xs">
                  <span className="px-2 py-0.5 rounded bg-[#ff3355]/20 text-[#ff3355] border border-[#ff3355]/40 font-bold">
                    {currentCase.priority} CRITICAL
                  </span>
                  <span className="text-zinc-500">•</span>
                  <span className="text-white font-bold">{currentCase.caseNumber}</span>
                  <span className="text-zinc-500">•</span>
                  <span className="text-zinc-400">DETECTED: {formatDate(currentCase.detectedAt)}</span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight mb-2">
                  {currentCase.vendorName}
                </h1>

                <p className="text-xs font-mono text-zinc-300 max-w-3xl leading-relaxed">
                  {currentCase.summary}
                </p>
              </div>

              {/* Status Pill & Delta Highlight */}
              <div className="flex flex-col md:items-end gap-2 shrink-0 font-mono">
                <span
                  className={`text-xs px-3 py-1 rounded-full uppercase font-bold text-center ${
                    currentCase.status === "approved"
                      ? "bg-[#00ff87]/20 text-[#00ff87] border border-[#00ff87]/40"
                      : currentCase.status === "escalated"
                      ? "bg-[#ff3355]/20 text-[#ff3355] border border-[#ff3355]/40"
                      : "bg-[#f59e0b]/20 text-[#f59e0b] border border-[#f59e0b]/40"
                  }`}
                >
                  {currentCase.status.replace("_", " ")}
                </span>
                <div className="text-right">
                  <span className="text-[10px] text-zinc-500 block">DISPUTED MONETARY DELTA</span>
                  <span className="text-xl font-black text-[#ff3355]">
                    +{formatCurrency(currentCase.amountInDispute)}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-4 border-t border-white/10 text-xs font-mono">
              <div className="p-3 rounded-lg bg-black/40 border border-white/5">
                <span className="text-zinc-500 text-[10px] block">INVOICE SUBMITTED</span>
                <span className="text-white font-bold text-sm">
                  {formatCurrency(currentCase.totalInvoiceAmount)}
                </span>
              </div>
              <div className="p-3 rounded-lg bg-black/40 border border-white/5">
                <span className="text-zinc-500 text-[10px] block">PURCHASE ORDER CEILING</span>
                <span className="text-[#00ff87] font-bold text-sm">
                  {formatCurrency(currentCase.poAmount)}
                </span>
              </div>
              <div className="p-3 rounded-lg bg-black/40 border border-white/5">
                <span className="text-zinc-500 text-[10px] block">PAYMENT SETTLEMENT</span>
                <span className="text-[#f59e0b] font-bold text-sm">
                  {currentTxn?.settlementStatus.toUpperCase() || "HELD"}
                </span>
              </div>
              <div className="p-3 rounded-lg bg-black/40 border border-white/5">
                <span className="text-zinc-500 text-[10px] block">EVIDENCE NODES</span>
                <span className="text-zinc-200 font-bold text-sm">
                  {currentCase.forensicFindings.length} findings
                </span>
              </div>
            </div>
          </div>

          {/* 3-Way Reconciliation Comparison Table */}
          <ReconciliationTable
            invoice={currentInvoice}
            purchaseOrder={currentPO}
            bankTransaction={currentTxn}
          />

          {/* Categorized 5-Tier Evidence Matrix */}
          <EvidenceCategorizedPanel
            observedFacts={currentCase.observedFacts}
            computedDiscrepancies={currentCase.computedDiscrepancies}
            modelInterpretations={currentCase.modelInterpretations}
            missingEvidence={currentCase.missingEvidence}
            recommendedAction={currentCase.recommendedAction}
            approvalRequirements={currentCase.approvalRequirements}
          />

          {/* Human Reviewer Controls Bar */}
          <ReviewerActionsBar
            caseId={currentCase.id}
            caseNumber={currentCase.caseNumber}
            currentStatus={currentCase.status}
            vendorName={currentCase.vendorName}
          />

          {/* Cryptographic Audit Trail */}
          <AuditTimeline events={caseAuditLogs} />
        </main>
      </div>
    </div>
  );
}
