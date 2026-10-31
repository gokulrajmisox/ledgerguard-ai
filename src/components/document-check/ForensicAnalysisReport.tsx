"use client";

import React from "react";
import { Invoice, PurchaseOrder, ForensicFinding } from "@/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import { CheckCircle2, AlertTriangle, XCircle, Search, ShieldCheck, Info, ArrowRight } from "lucide-react";

interface ForensicAnalysisReportProps {
  invoice: Invoice;
  purchaseOrder?: PurchaseOrder;
  findings: ForensicFinding[];
  activeFindingId: string;
  onSelectFinding: (finding: ForensicFinding) => void;
}

export function ForensicAnalysisReport({
  invoice,
  purchaseOrder,
  findings,
  activeFindingId,
  onSelectFinding,
}: ForensicAnalysisReportProps) {
  const overallConfidence =
    findings.length > 0
      ? (findings.reduce((sum, f) => sum + f.confidenceScore, 0) / findings.length) * 100
      : 100;

  const discrepancy = purchaseOrder
    ? invoice.totalAmount - purchaseOrder.authorizedAmount
    : 0;

  const discrepancyPercentage = purchaseOrder
    ? (discrepancy / purchaseOrder.authorizedAmount) * 100
    : 0;

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return "badge-error";
      case "medium":
        return "badge-warning";
      case "low":
        return "badge-info";
      default:
        return "badge-success";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
        return <XCircle className="w-3.5 h-3.5 text-[#B52A2A]" />;
      case "medium":
        return <AlertTriangle className="w-3.5 h-3.5 text-[#946000]" />;
      case "low":
        return <Info className="w-3.5 h-3.5 text-[#216766]" />;
      default:
        return <ShieldCheck className="w-3.5 h-3.5 text-[#25663B]" />;
    }
  };

  return (
    <div className="card space-y-5">
      {/* Report Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-[#D7D0C9]">
        <div>
          <h4 className="text-base font-bold text-[#30231D] serif-display">
            Forensic Analysis Dossier
          </h4>
          <p className="text-xs font-mono text-[#5C4F47] mt-0.5">
            Target: {invoice.invoiceNumber} | {invoice.vendorName}
          </p>
        </div>
        <span
          className={`text-xs font-mono font-bold px-3 py-1 rounded-full border ${
            overallConfidence >= 90
              ? "bg-[#E8F4EC] text-[#25663B] border-[#B7DEC3]"
              : overallConfidence >= 70
              ? "bg-[#FFF8E6] text-[#946000] border-[#F3DC9B]"
              : "bg-[#FDF0F0] text-[#B52A2A] border-[#F7BDBD]"
          }`}
        >
          CONFIDENCE: {Math.round(overallConfidence)}%
        </span>
      </div>

      {/* Document Metadata Table */}
      <div className="space-y-3">
        <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-[#5C4F47]">
          Document Core Attributes
        </h5>
        <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-[#F7F5F1] border border-[#D7D0C9] text-xs">
          <div>
            <div className="text-[#5C4F47] font-medium">Invoice Number</div>
            <div className="font-mono font-bold text-[#6F4E37] text-sm">{invoice.invoiceNumber}</div>
          </div>
          <div>
            <div className="text-[#5C4F47] font-medium">Total Billed</div>
            <div className="font-mono font-bold text-[#30231D] text-sm">
              {formatCurrency(invoice.totalAmount)}
            </div>
          </div>
          <div>
            <div className="text-[#5C4F47] font-medium">Issue Date</div>
            <div className="font-semibold text-[#30231D]">{formatDate(invoice.issueDate)}</div>
          </div>
          <div>
            <div className="text-[#5C4F47] font-medium">Due Date</div>
            <div className="font-semibold text-[#30231D]">{formatDate(invoice.dueDate)}</div>
          </div>
          {purchaseOrder && (
            <>
              <div>
                <div className="text-[#5C4F47] font-medium">Linked PO #</div>
                <div className="font-mono font-bold text-[#25663B]">{purchaseOrder.poNumber}</div>
              </div>
              <div>
                <div className="text-[#5C4F47] font-medium">PO Ceiling Amount</div>
                <div className="font-mono font-bold text-[#30231D]">
                  {formatCurrency(purchaseOrder.authorizedAmount)}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Discrepancy Highlight */}
      {purchaseOrder && discrepancy !== 0 && (
        <div className="p-4 rounded-xl bg-[#FFF8E6] border border-[#F3DC9B] text-xs space-y-1.5">
          <div className="flex items-center gap-2 text-[#946000] font-bold text-sm">
            <AlertTriangle className="w-4 h-4" />
            <span>Amount Discrepancy Detected</span>
          </div>
          <div className="text-[#5C4F47]">
            Invoice ({formatCurrency(invoice.totalAmount)}) vs Authorized PO ({formatCurrency(purchaseOrder.authorizedAmount)})
          </div>
          <div className="text-base font-bold font-mono text-[#B52A2A]">
            Variance: +{formatCurrency(Math.abs(discrepancy))} (+{Math.round(Math.abs(discrepancyPercentage))}%)
          </div>
          <p className="text-[11px] text-[#5C4F47] pt-1 border-t border-[#F3DC9B]/60">
            Excess freight levy billed without prior engineering change order approval.
          </p>
        </div>
      )}

      {/* Forensic Findings List */}
      <div className="space-y-3">
        <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-[#5C4F47]">
          Forensic Inspection Findings ({findings.length})
        </h5>
        <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
          {findings.map((f) => {
            const isSelected = activeFindingId === f.id;
            return (
              <div
                key={f.id}
                onClick={() => onSelectFinding(f)}
                className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all duration-150 ${
                  isSelected
                    ? "bg-[#F7F5F1] border-[#6F4E37] ring-2 ring-[#6F4E37]/15 shadow-sm"
                    : "bg-white border-[#D7D0C9] hover:bg-[#F7F5F1] hover:border-[#6F4E37]/40"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-xs text-[#30231D]">{f.title || f.region}</span>
                  <span className={getSeverityBadge(f.severity)}>
                    {getSeverityIcon(f.severity)}
                    <span className="uppercase">{f.severity}</span>
                  </span>
                </div>
                <p className="text-xs text-[#5C4F47] leading-relaxed font-normal">
                  {f.observedEvidence || f.technicalDetails}
                </p>
                <div className="mt-2 pt-1.5 border-t border-[#EDE8DE] flex justify-between items-center text-[11px] font-mono text-[#5C4F47]">
                  <span>CONFIDENCE: {Math.round(f.confidenceScore * 100)}%</span>
                  <span className="text-[#6F4E37] font-bold flex items-center gap-1">
                    <span>Inspect Layer</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ForensicAnalysisReport;
