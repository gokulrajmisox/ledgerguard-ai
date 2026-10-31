"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { DocumentViewer } from "@/components/forensics/DocumentViewer";
import { ForensicAnalysisReport } from "@/components/forensics/ForensicAnalysisReport";
import { UploadZone } from "@/components/forensics/UploadZone";
import { useAppStore } from "@/lib/store";
import { SearchCode, HelpCircle, ShieldAlert } from "lucide-react";

export default function ForensicsPage() {
  const { cases, invoices, purchaseOrders } = useAppStore();
  const [selectedCaseId, setSelectedCaseId] = useState<string>("case-01");
  const [activeFindingId, setActiveFindingId] = useState<string>("ff-01");

  const currentCase = cases.find((c) => c.id === selectedCaseId) || cases[0];
  const currentInvoice = invoices.find((inv) => inv.id === currentCase.invoiceId) || invoices[0];
  const currentPO = purchaseOrders.find((po) => po.poNumber === currentInvoice.poNumber);

  return (
    <div className="min-h-screen flex flex-col bg-[#070709] text-[#f4f4f7]">
      <Navbar />

      <div className="flex-1 flex pt-16">
        <Sidebar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full overflow-hidden">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-[#ff3355]" />
                <span className="text-xs font-mono uppercase tracking-widest text-[#ff3355]">
                  AI IMAGE FORENSICS LABORATORY
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                Document Raster & PDF Stream Inspection
              </h1>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-zinc-900 border border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00ff87]" />
                <span>MODEL: TESSERACT-CV v3.4</span>
              </span>
            </div>
          </div>

          {/* Upload Zone & Sample Cases Switcher */}
          <UploadZone
            selectedCaseId={selectedCaseId}
            onSelectSampleCase={(id) => {
              setSelectedCaseId(id);
              const target = cases.find((c) => c.id === id);
              if (target && target.forensicFindings[0]) {
                setActiveFindingId(target.forensicFindings[0].id);
              }
            }}
          />

          {/* Split-Screen Forensics Workspace */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[620px]">
            {/* Left 7 Cols: High-Resolution Document Viewer */}
            <div className="lg:col-span-7 h-full">
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

            {/* Right 5 Cols: Forensic Dossier & Structured Findings */}
            <div className="lg:col-span-5 h-full">
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
