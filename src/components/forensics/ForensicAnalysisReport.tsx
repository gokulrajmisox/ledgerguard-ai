"use client";

import React from "react";
import Link from "next/link";
import { ForensicFinding, Invoice, PurchaseOrder } from "@/types";
import { formatCurrency } from "@/lib/utils";
import {
  SearchCode,
  AlertTriangle,
  CheckCircle2,
  FileText,
  Clock,
  ShieldAlert,
  ArrowRight,
  HelpCircle,
  Hash,
} from "lucide-react";

interface ForensicAnalysisReportProps {
  invoice: Invoice;
  purchaseOrder?: PurchaseOrder;
  findings: ForensicFinding[];
  activeFindingId?: string;
  onSelectFinding?: (f: ForensicFinding) => void;
}

export function ForensicAnalysisReport({
  invoice,
  purchaseOrder,
  findings,
  activeFindingId,
  onSelectFinding,
}: ForensicAnalysisReportProps) {
  const delta = purchaseOrder ? invoice.totalAmount - purchaseOrder.authorizedAmount : 0;
  const isDiscrepant = delta !== 0;

  return (
    <div className="flex flex-col h-full rounded-2xl border border-white/10 bg-[#0c0c12] overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="p-4 border-b border-white/10 bg-[#0e0e14] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SearchCode className="w-4 h-4 text-[#00ff87]" />
          <h3 className="text-xs font-mono font-bold uppercase text-white tracking-wider">
            Forensic Inspection Dossier
          </h3>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#ff3355]/20 text-[#ff3355] font-semibold border border-[#ff3355]/30">
          {findings.length} ANOMALIES FLAGGED
        </span>
      </div>

      <div className="flex-1 overflow-auto p-5 space-y-6 text-xs font-mono">
        {/* Financial Cross-Check Card */}
        <div className="p-4 rounded-xl border border-white/10 bg-black/40 space-y-3">
          <div className="flex items-center justify-between text-zinc-400 text-[11px] pb-2 border-b border-white/5">
            <span className="font-bold uppercase text-white">Financial Cross-Check</span>
            <span>PO-2024-912 vs INV-88219</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-2.5 rounded bg-zinc-900 border border-white/5">
              <span className="text-[10px] text-zinc-500 block">AUTHORIZED PO CEILING</span>
              <span className="text-sm font-bold text-[#00ff87]">
                {purchaseOrder ? formatCurrency(purchaseOrder.authorizedAmount) : "$64,950.00"}
              </span>
            </div>
            <div className="p-2.5 rounded bg-zinc-900 border border-white/5">
              <span className="text-[10px] text-zinc-500 block">SUBMITTED INVOICE</span>
              <span className="text-sm font-bold text-white">
                {formatCurrency(invoice.totalAmount)}
              </span>
            </div>
          </div>

          {isDiscrepant && (
            <div className="p-3 rounded-lg border border-[#ff3355]/30 bg-[#ff3355]/10 flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#ff3355] font-bold">
                <AlertTriangle className="w-4 h-4" />
                <span>UNAUTHORIZED DELTA:</span>
              </div>
              <span className="text-[#ff3355] font-black text-sm">
                +{formatCurrency(delta)} (+30.8%)
              </span>
            </div>
          )}
        </div>

        {/* Forensic Image-Analysis Findings */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-zinc-400 text-[11px]">
            <span className="font-bold uppercase text-white">Neural Image Analysis Findings</span>
            <span className="text-zinc-500 text-[10px]">Tesseract-CV v3.4</span>
          </div>

          {findings.map((finding) => {
            const isSelected = activeFindingId === finding.id;
            return (
              <div
                key={finding.id}
                onClick={() => onSelectFinding && onSelectFinding(finding)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? "border-[#ff3355] bg-white/[0.05] shadow-lg"
                    : "border-white/10 bg-black/40 hover:bg-white/[0.02]"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-bold text-[11px]">{finding.title}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#ff3355]/20 text-[#ff3355] font-bold">
                    Conf: {(finding.confidenceScore * 100).toFixed(0)}%
                  </span>
                </div>

                <div className="text-[10px] text-[#00ff87] mb-1.5">{finding.region}</div>

                <p className="text-[11px] text-zinc-300 leading-relaxed mb-2 font-mono">
                  {finding.observedEvidence}
                </p>

                <div className="p-2 rounded bg-black/60 border border-white/5 text-[10px] text-zinc-400 font-mono mb-2">
                  <span className="text-zinc-500 block">Technical Diagnostic:</span>
                  {finding.technicalDetails}
                </div>

                <div className="text-[9px] text-zinc-500 italic flex items-center gap-1">
                  <HelpCircle className="w-3 h-3 text-zinc-500 shrink-0" />
                  <span>{finding.limitationDisclaimer}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Document Metadata Stream */}
        <div className="p-4 rounded-xl border border-white/10 bg-black/40 space-y-2">
          <div className="text-[11px] font-bold uppercase text-white pb-1 border-b border-white/5 flex items-center justify-between">
            <span>Embedded Metadata Stream</span>
            <Hash className="w-3.5 h-3.5 text-zinc-500" />
          </div>
          <div className="space-y-1 text-[11px] text-zinc-300">
            <div className="flex justify-between">
              <span className="text-zinc-500">File Producer:</span>
              <span className="text-white">PDF-XChange Editor v9.4</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Creation Date:</span>
              <span>2024-10-12 11:20:00 UTC</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Mod Date:</span>
              <span className="text-[#ff3355]">2024-10-14 09:28:11 UTC (-14m)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">SHA-256 Digest:</span>
              <span className="text-zinc-400 truncate max-w-[160px]">9f8e81b2a75d9e9e1c2b</span>
            </div>
          </div>
        </div>

        {/* Call to Action: Open Full Investigation Case */}
        <div className="pt-2">
          <Link
            href="/investigations/case-01"
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider text-black bg-[#00ff87] hover:bg-[#15ff96] transition-all shadow-[0_0_20px_rgba(0,255,135,0.3)]"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Open Case INV-88219-DISC Dossier</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
