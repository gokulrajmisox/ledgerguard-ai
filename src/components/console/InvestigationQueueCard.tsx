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
    <div className="rounded-xl border border-white/10 bg-[#0c0c12] p-4 sm:p-5 shadow-xl">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-[#ff3355]" />
          <h3 className="text-xs font-mono font-bold uppercase text-white tracking-wider">
            Active Investigation Queue
          </h3>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">
          {cases.length} FLAGGED CASES
        </span>
      </div>

      <div className="space-y-3">
        {cases.map((c) => {
          const isSelected = selectedCaseId === c.id;
          const isP1 = c.priority === "P1";
          const priorityBadge =
            c.priority === "P1"
              ? "bg-[#ff3355]/20 text-[#ff3355] border-[#ff3355]/40"
              : "bg-[#f59e0b]/20 text-[#f59e0b] border-[#f59e0b]/40";

          const statusBadge =
            c.status === "approved"
              ? "bg-[#00ff87]/20 text-[#00ff87]"
              : c.status === "escalated"
              ? "bg-[#ff3355]/20 text-[#ff3355]"
              : "bg-zinc-800 text-zinc-300";

          return (
            <div
              key={c.id}
              onClick={() => onSelectCase && onSelectCase(c)}
              className={`p-3.5 rounded-lg border transition-all cursor-pointer ${
                isSelected
                  ? "border-[#ff3355]/60 bg-white/[0.06] shadow-lg"
                  : "border-white/[0.06] bg-black/40 hover:bg-white/[0.02]"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded border font-bold ${priorityBadge}`}>
                    {c.priority} CRITICAL
                  </span>
                  <span className="text-xs font-mono font-bold text-white">
                    {c.caseNumber}
                  </span>
                </div>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase font-semibold ${statusBadge}`}>
                  {c.status.replace("_", " ")}
                </span>
              </div>

              <div className="text-xs font-semibold text-zinc-200 mb-1">{c.vendorName}</div>

              <div className="flex items-center justify-between font-mono text-xs mb-2">
                <span className="text-zinc-400">Disputed Amount:</span>
                <span className="text-[#ff3355] font-bold">
                  {formatCurrency(c.amountInDispute)}
                </span>
              </div>

              <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed mb-3 font-mono">
                {c.summary}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px] font-mono">
                <span className="text-zinc-500">{formatDate(c.detectedAt)}</span>
                <Link
                  href={`/investigations/${c.id}`}
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1 text-[#00ff87] hover:underline"
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
