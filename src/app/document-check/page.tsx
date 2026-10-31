"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { useAppStore } from "@/lib/store";
import { formatCurrency, formatDate } from "@/lib/utils";
import { ForensicAnalysisReport } from "@/components/document-check/ForensicAnalysisReport";
import { Search, FileText, CheckCircle2, AlertTriangle, XCircle, ArrowRight } from "lucide-react";

const DocumentViewer = dynamic(
  () => import("@/components/document-check/DocumentViewer").then((mod) => mod.DocumentViewer),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[460px] flex items-center justify-center bg-white rounded-xl border border-[#D7D0C9]">
        <div className="text-xs font-mono text-[#5C4F47]">Loading Document Forensic Canvas...</div>
      </div>
    ),
  }
);

export default function DocumentCheckPage() {
  const { cases, invoices, purchaseOrders } = useAppStore();
  const [selectedCaseId, setSelectedCaseId] = useState<string>("case-01");
  const [activeFindingId, setActiveFindingId] = useState<string>("ff-01");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const invoiceId = params.get("invoice");
    if (invoiceId) {
      const relatedCase = cases.find((c) => c.invoiceId === invoiceId);
      if (relatedCase) {
        setSelectedCaseId(relatedCase.id);
        if (relatedCase.forensicFindings[0]) {
          setActiveFindingId(relatedCase.forensicFindings[0].id);
        }
      }
    }
  }, [invoices, cases]);

  const currentCase = cases.find((c) => c.id === selectedCaseId) || cases[0];
  const currentInvoice = invoices.find((inv) => inv.id === currentCase.invoiceId) || invoices[0];
  const currentPO = purchaseOrders.find((po) => po.poNumber === currentInvoice.poNumber);

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
                  DOCUMENT FORENSICS LAB
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black serif-display text-[#30231D]">
                Document Check & Integrity Verification
              </h1>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#D7D0C9] text-[#30231D] font-bold shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#25663B] animate-pulse" />
                <span>MODEL: TESSERACT FORENSIC v1.0</span>
              </span>
            </div>
          </div>

          {/* Document Selector with High Contrast Buttons */}
          <div className="card space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#5C4F47]">
                Select Investigation Specimen
              </h3>
              <span className="text-xs text-[#5C4F47]">
                Showing {cases.length} active forensic dossiers
              </span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {cases.map((c) => {
                const isSelected = selectedCaseId === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => {
                      setSelectedCaseId(c.id);
                      if (c.forensicFindings[0]) {
                        setActiveFindingId(c.forensicFindings[0].id);
                      }
                    }}
                    className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all duration-150 cursor-pointer ${
                      isSelected
                        ? "bg-[#6F4E37] text-white border border-[#5A3E2A] shadow-md ring-2 ring-[#6F4E37]/20"
                        : "bg-white text-[#30231D] border border-[#D7D0C9] hover:bg-[#F7F5F1] hover:border-[#6F4E37]/50 shadow-xs"
                    }`}
                  >
                    <span>{c.caseNumber}</span>
                    <span className="ml-2 opacity-80">({c.vendorName.split(" ")[0]})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Inspection Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Document Inspection Stage */}
            <div className="lg:col-span-7">
              <DocumentViewer
                invoiceNumber={currentInvoice.invoiceNumber}
                vendorName={currentInvoice.vendorName}
                totalAmount={currentInvoice.totalAmount}
                poAmount={currentPO ? currentPO.authorizedAmount : 0}
                findings={currentCase.forensicFindings}
                activeFindingId={activeFindingId}
                onSelectFinding={(f) => setActiveFindingId(f.id)}
              />
            </div>

            {/* Right: Forensic Analysis Dossier */}
            <div className="lg:col-span-5">
              <ForensicAnalysisReport
                invoice={currentInvoice}
                purchaseOrder={currentPO}
                findings={currentCase.forensicFindings}
                activeFindingId={activeFindingId}
                onSelectFinding={(f) => setActiveFindingId(f.id)}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
