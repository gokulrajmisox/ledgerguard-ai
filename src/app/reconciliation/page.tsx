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
import { Link2, FileText, CheckCircle2, AlertTriangle, Clock } from "lucide-react";

export default function ReconciliationPage() {
  const { cases, invoices, purchaseOrders, bankTransactions, metrics } = useAppStore();
  const [activeStep, setActiveStep] = useState<"upload" | "match" | "review" | "complete">("upload");
  const [selectedInvoice, setSelectedInvoice] = useState<string | null>(null);

  // Calculate summary statistics
  const totalInvoices = invoices.length;
  const reconciledCount = invoices.filter(i => i.status === "reconciled").length;
  const pendingCount = invoices.filter(i => i.status !== "reconciled").length;
  const totalAmount = invoices.reduce((sum, i) => sum + i.totalAmount, 0);
  const pendingAmount = invoices.filter(i => i.status !== "reconciled").reduce((sum, i) => sum + i.totalAmount, 0);

  const workflowSteps = [
    {
      id: "upload",
      label: "Upload Documents",
      icon: FileText,
      status: activeStep === "upload" ? "active" : "complete",
      count: totalInvoices,
    },
    {
      id: "match",
      label: "Match Records",
      icon: Link2,
      status: activeStep === "match" ? "active" : activeStep === "upload" ? "pending" : "complete",
      count: reconciledCount,
    },
    {
      id: "review",
      label: "Review Issues",
      icon: CheckCircle2,
      status: activeStep === "review" ? "active" : activeStep === "upload" || activeStep === "match" ? "pending" : "complete",
      count: cases.filter(c => c.status === "investigating" || c.status === "under_review").length,
    },
    {
      id: "complete",
      label: "Complete",
      icon: CheckCircle2,
      status: activeStep === "complete" ? "active" : "pending",
      count: 0,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-mocha text-ivory";
      case "complete":
        return "bg-status-success/20 text-status-success border border-status-success/30";
      case "pending":
        return "bg-platinum text-taupe";
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
          {/* Workspace Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-mocha/10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-mocha" />
                <span className="text-xs font-mono uppercase tracking-widest text-mocha">
                  RECONCILIATION WORKFLOW
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold serif-display text-espresso">
                Reconcile Your Transactions
              </h1>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-taupe">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-platinum border border-mocha/10">
                <span className="w-1.5 h-1.5 rounded-full bg-mocha" />
                <span>STATUS: {activeStep.toUpperCase()}</span>
              </span>
            </div>
          </div>

          {/* Workflow Steps Navigation */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {workflowSteps.map((step) => (
              <div
                key={step.id}
                className={`rounded-lg border border-mocha/20 p-4 cursor-pointer transition-all ${
                  step.status === "active" 
                    ? "bg-mocha/10 border-mocha" 
                    : step.status === "complete"
                    ? "bg-status-success/5 border-status-success/30"
                    : "bg-platinum hover:bg-platinum/80"
                }`}
                onClick={() => setActiveStep(step.id as any)}
              >
                <div className="flex items-center gap-2 mb-2">
                  <step.icon className="w-5 h-5 text-mocha" />
                  <span className="text-sm font-medium text-espresso">{step.label}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-mono px-2 py-0.5 rounded-full ${getStatusColor(step.status)}`}>
                    {step.status.toUpperCase()}
                  </span>
                  <span className="text-lg font-bold text-mocha">{step.count}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Financial Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="card">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-5 h-5 text-mocha" />
                <span className="text-sm text-taupe">Total Invoices</span>
              </div>
              <div className="text-2xl font-bold text-espresso">{totalInvoices}</div>
              <div className="text-xs text-taupe mt-1">Documents processed</div>
            </div>

            <div className="card">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-5 h-5 text-status-success" />
                <span className="text-sm text-taupe">Reconciled</span>
              </div>
              <div className="text-2xl font-bold text-espresso">{reconciledCount}</div>
              <div className="text-xs text-taupe mt-1">Successfully matched</div>
            </div>

            <div className="card">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-status-warning" />
                <span className="text-sm text-taupe">Pending</span>
              </div>
              <div className="text-2xl font-bold text-espresso">{pendingCount}</div>
              <div className="text-xs text-taupe mt-1">Need attention</div>
            </div>

            <div className="card">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-status-error" />
                <span className="text-sm text-taupe">Total Amount</span>
              </div>
              <div className="text-2xl font-bold text-espresso">{formatCurrency(totalAmount)}</div>
              <div className="text-xs text-taupe mt-1">Across all invoices</div>
            </div>
          </div>

          {/* Main Workspace Area */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[500px]">
            {/* Left: Workflow Content */}
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
                <div className="card">
                  <h3 className="text-lg font-bold text-espresso mb-4">Issues Requiring Review</h3>
                  <p className="text-taupe mb-4">
                    The following invoices have discrepancies that need your attention.
                  </p>
                  <div className="space-y-3">
                    {cases.filter(c => c.status === "investigating" || c.status === "under_review").map((c) => (
                      <div
                        key={c.id}
                        className="p-4 rounded-lg border border-mocha/20 hover:bg-mocha/5 cursor-pointer transition-all"
                        onClick={() => setSelectedInvoice(c.invoiceId)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-mono text-mocha">{c.caseNumber}</span>
                          <span className="text-xs font-medium text-status-error bg-status-error/10 px-2 py-0.5 rounded-full">
                            {c.status.replace("_", " ")}
                          </span>
                        </div>
                        <div className="text-sm font-medium text-espresso">{c.vendorName}</div>
                        <div className="text-xs text-taupe mt-1">
                          Discrepancy: {formatCurrency(c.amountInDispute)}
                        </div>
                        <div className="text-xs text-taupe/70 line-clamp-2 mt-1">
                          {c.summary}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeStep === "complete" && (
                <div className="card text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-status-success/20 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-status-success" />
                  </div>
                  <h3 className="text-xl font-bold text-espresso mb-2">Reconciliation Complete</h3>
                  <p className="text-taupe mb-4">
                    All selected documents have been reconciled successfully.
                  </p>
                  <p className="text-sm text-taupe/70">
                    Audit trail has been preserved for all transactions.
                  </p>
                </div>
              )}
            </div>

            {/* Right: Signature Interactions */}
            <div className="lg:col-span-4 space-y-6">
              {/* Financial Insight */}
              <div className="card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-espresso">Financial Insight</h3>
                  <span className="text-xs font-mono text-taupe">Interactive 3D</span>
                </div>
                <div className="h-48">
                  <FinancialInsight />
                </div>
                <p className="text-xs text-taupe mt-3">
                  Click and explore your financial overview
                </p>
              </div>

              {/* Quick Actions */}
              <div className="card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-espresso">Quick Actions</h3>
                  <span className="text-xs font-mono text-taupe">Radial Menu</span>
                </div>
                <div className="h-48 flex items-center justify-center">
                  <QuickActions />
                </div>
              </div>

              {/* Recent Documents */}
              <div className="card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-espresso">Recent Documents</h3>
                  <span className="text-xs font-mono text-taupe">Carousel</span>
                </div>
                <div className="h-48">
                  <RecentDocuments documents={invoices.slice(0, 5)} />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
