"use client";

import React from "react";
import Link from "next/link";
import { InvestigationCase } from "@/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import { AlertTriangle, ShieldAlert, ArrowRight, Eye, CheckCircle2 } from "lucide-react";

export function InvestigationQueueCard({
  cases,
  selectedCaseId,
  onSelectCase,
}: {
  cases: InvestigationCase[];
  selectedCaseId?: string;
  onSelectCase?: (c: InvestigationCase) => void;
}) {
  return (
    <div className="card-luxury p-5 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[#D7D0C9]">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-[#B52A2A]" />
          <h3 className="text-xs font-mono font-bold uppercase text-espresso tracking-wider">
            Active Forensics & Exception Queue
          </h3>
        </div>
        <span className="text-[10px] font-mono px-2.5 py-1 rounded-full badge-neutral font-bold">
          {cases.length} FLAGGED CASIONS
        </span>
      </div>

      <div className="space-y-3">
        {cases.map((c) => {
          const isSelected = selectedCaseId === c.id;
          const isP1 = c.priority === "P1";
          const priorityBadge =
            c.priority === "P1"
              ? "badge-error"
              : "badge-warning";

          const statusBadge =
            c.status === "approved"
              ? "badge-success"
              : c.status === "escalated"
              ? "badge-error"
              : "badge-neutral";

          return (
            <div
              key={c.id}
              onClick={() => onSelectCase && onSelectCase(c)}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                isSelected
                  ? "border-[#6F4E37] bg-[#E6E0F0]/25 shadow-md ring-2 ring-[#6F4E37]/20"
                  : "border-[#D7D0C9] bg-white hover:bg-[#F7F5F1]"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase ${priorityBadge}`}>
                    {c.priority}
                  </span>
                  <span className="text-xs font-mono font-bold text-espresso">{c.caseNumber}</span>
                </div>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase ${statusBadge}`}>
                  {c.status}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-espresso font-semibold">{c.vendorName}</span>
                <span className="text-[#B52A2A] font-bold">
                  Delta: +{formatCurrency(c.reconciliationDelta || c.amountInDispute)}
                </span>
              </div>

              <p className="text-xs text-[#5C4F47] leading-relaxed mb-3">
                {c.summary}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-[#D7D0C9] text-xs">
                <span className="text-[11px] font-mono text-[#5C4F47]">
                  {c.forensicFindings?.length || 0} anomalies detected
                </span>
                <Link
                  href="/document-check"
                  className="btn-outline py-1 px-2.5 text-xs font-bold inline-flex items-center gap-1"
                >
                  <span>Open Dossier</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
