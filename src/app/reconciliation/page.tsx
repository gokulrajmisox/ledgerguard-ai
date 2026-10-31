"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { FinancialInsight } from "@/components/reactbits/FinancialInsight";
import { QuickActions } from "@/components/reactbits/QuickActions";
import { RecentDocuments } from "@/components/reactbits/RecentDocuments";
import { UploadZone } from "@/components/reconciliation/UploadZone";
import { ReconciliationTable } from "@/components/reconciliation/ReconciliationTable";
import { useAppStore } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";
import { Link2, FileText, CheckCircle2, AlertTriangle, Clock, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function ReconciliationPage() {
  const { cases, invoices, purchaseOrders, bankTransactions, metrics } = useAppStore();
  const [activeStep, setActiveStep] = useState<"upload" | "match" | "review" | "complete">("match");
  const [selectedInvoice, setSelectedInvoice] = useState<string | null>(null);

  // Calculate summary statistics
  const totalInvoices = invoices.length;
  const reconciledCount = invoices.filter((i) => i.status === "reconciled").length;
  const pendingCount = invoices.filter((i) => i.status !== "reconciled").length;
  const totalAmount = invoices.reduce((sum, i) => sum + i.totalAmount, 0);
  const pendingAmount = invoices
    .filter((i) => i.status !== "reconciled")
    .reduce((sum, i) => sum + i.totalAmount, 0);

  const workflowSteps = [
    {
      id: "upload",
      label: "1. Upload Documents",
      icon: FileText,
      status: activeStep === "upload" ? "active" : "complete",
      count: totalInvoices,
    },
    {
      id: "match",
      label: "2. Match Records",
      icon: Link2,
      status: activeStep === "match" ? "active" : activeStep === "upload" ? "pending" : "complete",
      count: pendingCount,
    },
    {
      id: "review",
      label: "3. Review Issues",
      icon: AlertTriangle,
      status: activeStep === "review" ? "active" : activeStep === "upload" || activeStep === "match" ? "pending" : "complete",
      count: cases.filter((c) => c.status === "investigating" || c.status === "under_review").length,
    },
    {
      id: "complete",
      label: "4. Audit Assurance",
      icon: ShieldCheck,
      status: activeStep === "complete" ? "active" : "pending",
      count: reconciledCount,
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return "bg-[#6F4E37] text-white font-bold border border-[#5A3E2A]";
      case "complete":
        return "bg-[#E8F4EC] text-[#25663B] font-bold border border-[#B7DEC3]";
      case "pending":
      default:
        return "bg-white text-[#5C4F47] font-semibold border border-[#D7D0C9]";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5F1] text-[#30231D]">
      <Navbar />

      <div className="flex-1 flex pt-16">
        <Sidebar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full overflow-hidden">
          {/* Workspace Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#D7D0C9]">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-[#6F4E37]" />
                <span className="text-xs font-mono uppercase tracking-widest text-[#6F4E37] font-bold">
                  RECONCILIATION WORKFLOW
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black serif-display text-[#30231D]">
                Reconcile Your Transactions
              </h1>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#D7D0C9] text-[#30231D] font-bold shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#6F4E37] animate-pulse" />
                <span>ACTIVE PHASE: {activeStep.toUpperCase()}</span>
              </span>
            </div>
          </div>

          {/* Workflow Steps Navigation */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
            {workflowSteps.map((step) => {
              const Icon = step.icon;
              const isActive = activeStep === step.id;
              return (
                <div
                  key={step.id}
                  className={`rounded-xl border p-4 cursor-pointer transition-all duration-200 ${
                    isActive
                      ? "bg-white border-[#6F4E37] ring-2 ring-[#6F4E37]/20 shadow-md"
                      : "bg-white/80 border-[#D7D0C9] hover:bg-white hover:border-[#6F4E37]/50 shadow-xs"
                  }`}
                  onClick={() => setActiveStep(step.id as any)}
                >
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <Icon className={`w-5 h-5 ${isActive ? "text-[#6F4E37]" : "text-[#5C4F47]"}`} />
                    <span className="text-sm font-bold text-[#30231D]">{step.label}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full ${getStatusBadge(step.status)}`}>
                      {step.status.toUpperCase()}
                    </span>
                    <span className="text-xl font-bold font-mono text-[#6F4E37]">{step.count}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Financial Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="card">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-5 h-5 text-[#6F4E37]" />
                <span className="text-xs font-mono font-bold uppercase text-[#5C4F47]">Total Invoices</span>
              </div>
              <div className="text-2xl font-bold text-[#30231D] font-mono">{totalInvoices}</div>
              <div className="text-xs text-[#5C4F47] mt-1 font-medium">Documents indexed</div>
            </div>

            <div className="card">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-5 h-5 text-[#25663B]" />
                <span className="text-xs font-mono font-bold uppercase text-[#5C4F47]">Reconciled</span>
              </div>
              <div className="text-2xl font-bold text-[#25663B] font-mono">{reconciledCount}</div>
              <div className="text-xs text-[#5C4F47] mt-1 font-medium">Verified without variance</div>
            </div>

            <div className="card">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-[#946000]" />
                <span className="text-xs font-mono font-bold uppercase text-[#5C4F47]">Discrepant Items</span>
              </div>
              <div className="text-2xl font-bold text-[#946000] font-mono">{pendingCount}</div>
              <div className="text-xs text-[#5C4F47] mt-1 font-medium">Require reviewer sign-off</div>
            </div>

            <div className="card">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-[#6F4E37]" />
                <span className="text-xs font-mono font-bold uppercase text-[#5C4F47]">Disputed Amount</span>
              </div>
              <div className="text-2xl font-bold text-[#B52A2A] font-mono">{formatCurrency(pendingAmount)}</div>
              <div className="text-xs text-[#5C4F47] mt-1 font-medium">Escrowed capital</div>
            </div>
          </div>

          {/* Main Workspace Area */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Active Workflow Step */}
            <div className="lg:col-span-8 space-y-6">
              {activeStep === "upload" && (
                <UploadZone onUploadComplete={() => setActiveStep("match")} />
              )}

              {activeStep === "match" && (
                <ReconciliationTable
                  invoices={invoices}
                  purchaseOrders={purchaseOrders}
                  bankTransactions={bankTransactions}
                  onMatchComplete={() => setActiveStep("review")}
                />
              )}

              {activeStep === "review" && (
                <div className="card space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-[#30231D] serif-display">
                      Discrepancies Requiring Review
                    </h3>
                    <p className="text-xs text-[#5C4F47] mt-0.5">
                      The following documents contain variance between purchase order ceilings and invoice totals.
                    </p>
                  </div>
                  <div className="space-y-3">
                    {cases
                      .filter((c) => c.status === "investigating" || c.status === "under_review")
                      .map((c) => (
                        <div
                          key={c.id}
                          className="p-4 rounded-xl border border-[#D7D0C9] bg-[#F7F5F1] hover:border-[#6F4E37] hover:bg-white cursor-pointer transition-all duration-200 shadow-xs"
                          onClick={() => setSelectedInvoice(c.invoiceId)}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-mono font-bold text-[#6F4E37] bg-white px-2 py-0.5 rounded border border-[#D7D0C9]">
                              {c.caseNumber}
                            </span>
                            <span className="badge-error text-xs font-bold">
                              {c.status.replace("_", " ")}
                            </span>
                          </div>
                          <div className="text-sm font-bold text-[#30231D]">{c.vendorName}</div>
                          <div className="text-xs font-mono font-bold text-[#B52A2A] mt-1">
                            Disputed Amount: {formatCurrency(c.amountInDispute)}
                          </div>
                          <p className="text-xs text-[#5C4F47] mt-1.5 leading-relaxed">
                            {c.summary}
                          </p>
                          <div className="mt-3 pt-2 border-t border-[#D7D0C9] flex justify-between items-center text-xs">
                            <span className="text-[#5C4F47]">Target Invoice: {c.invoiceId}</span>
                            <Link
                              href={`/document-check?invoice=${c.invoiceId}`}
                              className="font-bold text-[#6F4E37] hover:underline flex items-center gap-1"
                            >
                              <span>Open Forensics</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {activeStep === "complete" && (
                <div className="card text-center py-16 space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-[#E8F4EC] border border-[#B7DEC3] flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-[#25663B]" />
                  </div>
                  <h3 className="text-2xl font-bold serif-display text-[#30231D]">
                    Reconciliation Certified
                  </h3>
                  <p className="text-sm text-[#5C4F47] max-w-md mx-auto leading-relaxed">
                    All transactions have been verified, matched, and committed into tamper-evident Merkle logs.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => setActiveStep("match")}
                      className="btn-primary"
                    >
                      Return to Match Matrix
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Interactive Support Modules */}
            <div className="lg:col-span-4 space-y-6">
              {/* Quick Actions Radial */}
              <div className="card p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-bold text-[#30231D] serif-display">
                    Kinetic Triage
                  </h3>
                  <span className="text-[10px] font-mono font-bold uppercase text-[#5C4F47] bg-[#EDE8DE] px-2 py-0.5 rounded">
                    Wheel
                  </span>
                </div>
                <div className="h-[280px] flex items-center justify-center">
                  <QuickActions />
                </div>
              </div>

              {/* Recent Documents Specimen Reel */}
              <div className="card p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-bold text-[#30231D] serif-display">
                    Recent Documents
                  </h3>
                  <Link href="/invoices" className="text-xs font-bold text-[#6F4E37] hover:underline">
                    View All →
                  </Link>
                </div>
                <div className="py-2">
                  <RecentDocuments documents={invoices.slice(0, 4)} />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
