"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { useAppStore } from "@/lib/store";
import { formatCurrency, formatDate } from "@/lib/utils";
import { ForensicAnalysisReport } from "@/components/document-check/ForensicAnalysisReport";
import { Search, FileText, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

const DocumentViewer = dynamic(
  () => import("@/components/document-check/DocumentViewer"),
  { ssr: false }
);

export default function DocumentCheckPage() {
  const { cases, invoices, purchaseOrders } = useAppStore();
  const [selectedCaseId, setSelectedCaseId] = useState<string>("case-01");
  const [activeFindingId, setActiveFindingId] = useState<string>("ff-01");

  // Get URL params for invoice
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const invoiceId = params.get("invoice");
    if (invoiceId) {
      const invoice = invoices.find(i => i.id === invoiceId);
      if (invoice) {
        const relatedCase = cases.find(c => c.invoiceId === invoiceId);
        if (relatedCase) {
          setSelectedCaseId(relatedCase.id);
          if (relatedCase.forensicFindings[0]) {
            setActiveFindingId(relatedCase.forensicFindings[0].id);
          }
        }
      }
    }
  }, [invoices, cases]);

  const currentCase = cases.find((c) => c.id === selectedCaseId) || cases[0];
  const currentInvoice = invoices.find((inv) => inv.id === currentCase.invoiceId) || invoices[0];
  const currentPO = purchaseOrders.find((po) => po.poNumber === currentInvoice.poNumber);

  // Sample document previews for carousel
  const documentPreviews = [
    { id: "1", name: "INV-88219.pdf", type: "invoice", date: "2024-10-15", amount: 85000 },
    { id: "2", name: "PO-2024-912.pdf", type: "purchase-order", date: "2024-10-10", amount: 64950 },
    { id: "3", name: "GR-9912.pdf", type: "receipt", date: "2024-10-18", amount: 0 },
    { id: "4", name: "WIRE-9901.pdf", type: "bank-statement", date: "2024-10-14", amount: 85000 },
  ];

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
                  DOCUMENT VERIFICATION
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold serif-display text-espresso">
                Document Check
              </h1>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-taupe">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-platinum border border-mocha/10">
                <span className="w-1.5 h-1.5 rounded-full bg-mocha" />
                <span>MODEL: TESSERACT v1.0</span>
              </span>
            </div>
          </div>

          {/* Document Selector */}
          <div className="card">
            <h3 className="text-sm font-medium text-espresso mb-3">Select Document to Inspect</h3>
            <div className="flex flex-wrap gap-2">
              {documentPreviews.map((doc) => (
                <button
                  key={doc.id}
                  onClick={() => {
                    // In a real implementation, this would load the actual document
                    // For demo purposes, we'll just cycle through cases
                    const nextCaseIndex = (parseInt(selectedCaseId.replace("case-", "")) + parseInt(doc.id) - 1) % cases.length;
                    setSelectedCaseId(`case-${String(nextCaseIndex + 1).padStart(2, '0')}`);
                  }}
                  className={`px-3 py-2 rounded border text-sm font-mono transition-all ${
                    selectedCaseId === `case-${String(parseInt(doc.id)).padStart(2, '0')}`
                      ? "bg-mocha/10 border-mocha text-mocha"
                      : "bg-platinum border-mocha/20 text-taupe hover:border-mocha"
                  }`}
                >
                  {doc.name}
                </button>
              ))}
            </div>
          </div>

          {/* Document Verification Workspace */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[620px]">
            {/* Left: Document Viewer */}
            <div className="lg:col-span-7">
              <div className="card h-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-espresso">Document Preview</h3>
                  <span className="text-xs font-mono text-taupe">
                    {currentInvoice.fileType.toUpperCase()}
                  </span>
                </div>
                <DocumentViewer
                  invoiceNumber={currentInvoice.invoiceNumber}
                  vendorName={currentInvoice.vendorName}
                  totalAmount={currentInvoice.totalAmount}
                  poAmount={currentPO ? currentPO.authorizedAmount : 64950}
                  findings={currentCase.forensicFindings}
                  activeFindingId={activeFindingId}
                  onSelectFinding={(f) => setActiveFindingId(f.id)}
                />
              </div>
            </div>

            {/* Right: Analysis Report */}
            <div className="lg:col-span-5">
              <div className="card h-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-espresso">Analysis Report</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-status-success bg-status-success/10 px-2 py-0.5 rounded-full">
                      CONFIDENCE: 94%
                    </span>
                  </div>
                </div>
                <ForensicAnalysisReport
                  invoice={currentInvoice}
                  purchaseOrder={currentPO}
                  findings={currentCase.forensicFindings}
                  activeFindingId={activeFindingId}
                  onSelectFinding={(f) => setActiveFindingId(f.id)}
                />
              </div>
            </div>
          </div>

          {/* Comparison Summary */}
          <div className="card">
            <h3 className="text-lg font-bold text-espresso mb-4">Comparison Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-platinum/50 border border-mocha/10">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-5 h-5 text-mocha" />
                  <span className="text-sm text-taupe">Invoice Total</span>
                </div>
                <div className="text-xl font-bold text-espresso">
                  {formatCurrency(currentInvoice.totalAmount)}
                </div>
                <div className="text-xs text-taupe mt-1">
                  {currentInvoice.invoiceNumber}
                </div>
              </div>

              <div className="p-4 rounded-lg bg-platinum/50 border border-mocha/10">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-status-success" />
                  <span className="text-sm text-taupe">PO Authorized</span>
                </div>
                <div className="text-xl font-bold text-espresso">
                  {formatCurrency(currentPO ? currentPO.authorizedAmount : 64950)}
                </div>
                <div className="text-xs text-taupe mt-1">
                  {currentPO ? currentPO.poNumber : "PO-2024-912"}
                </div>
              </div>

              <div className="p-4 rounded-lg bg-status-warning/10 border border-status-warning/30">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-status-warning" />
                  <span className="text-sm text-taupe">Difference</span>
                </div>
                <div className="text-xl font-bold text-status-warning">
                  {formatCurrency(currentCase.reconciliationDelta)}
                </div>
                <div className="text-xs text-taupe mt-1">
                  {currentCase.reconciliationDelta > 0 ? "Over budget" : "Under budget"}
                </div>
              </div>
            </div>

            {/* Plain Language Explanation */}
            <div className="mt-6 pt-4 border-t border-mocha/10">
              <h4 className="text-sm font-medium text-espresso mb-2">Plain Language Explanation</h4>
              <p className="text-sm text-taupe">
                Invoice {currentInvoice.invoiceNumber} from {currentInvoice.vendorName} shows a total of {formatCurrency(currentInvoice.totalAmount)}.
                The authorized purchase order {currentPO ? currentPO.poNumber : "PO-2024-912"} allows for {formatCurrency(currentPO ? currentPO.authorizedAmount : 64950)}.
                There is a {formatCurrency(Math.abs(currentCase.reconciliationDelta))} difference that needs review.
              </p>
              <p className="text-xs text-taupe/70 mt-2">
                This explanation is provided in plain language to help you understand the discrepancy without technical jargon.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
