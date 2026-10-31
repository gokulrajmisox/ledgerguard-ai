"use client";

import React, { useState } from "react";
import { useAppStore } from "@/lib/store";
import { CaseStatus } from "@/types";
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  MailQuestion,
  Eye,
  ShieldCheck,
  Lock,
  X,
} from "lucide-react";

interface ReviewerActionsBarProps {
  caseId: string;
  currentStatus: CaseStatus;
  caseNumber: string;
  vendorName: string;
}

export function ReviewerActionsBar({
  caseId,
  currentStatus,
  caseNumber,
  vendorName,
}: ReviewerActionsBarProps) {
  const { updateCaseStatus, requestInformation, escalateCase } = useAppStore();
  const [activeModal, setActiveModal] = useState<"approve" | "reject" | "escalate" | "rfi" | null>(
    null
  );
  const [rationaleNote, setRationaleNote] = useState("");
  const [rfiParty, setRfiParty] = useState(`${vendorName} Accounts Receivable`);

  const handleExecuteAction = () => {
    if (activeModal === "approve") {
      updateCaseStatus(
        caseId,
        "approved",
        rationaleNote || "Approved partial payment of contract base ($64,950.00). Retained $20k in escrow."
      );
    } else if (activeModal === "reject") {
      updateCaseStatus(
        caseId,
        "rejected",
        rationaleNote || "Rejected altered invoice INV-88219. Requesting re-issuance from vendor."
      );
    } else if (activeModal === "escalate") {
      escalateCase(
        caseId,
        rationaleNote || "Escalated to Corporate Fraud and Legal for potential intentional tampering."
      );
    } else if (activeModal === "rfi") {
      requestInformation(
        caseId,
        rfiParty,
        rationaleNote || "Provide certified original PDF and copy of approved Change Order CO-889."
      );
    }
    setActiveModal(null);
    setRationaleNote("");
  };

  return (
    <>
      <div className="p-5 rounded-xl border border-white/10 bg-[#0e0e16] space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#00ff87]" />
              <h4 className="text-xs font-mono font-bold uppercase text-white tracking-wider">
                Human Reviewer Governance Matrix
              </h4>
            </div>
            <span className="text-[10px] font-mono text-zinc-500">
              CURRENT STATUS: <span className="text-white font-bold">{currentStatus.toUpperCase()}</span>
            </span>
          </div>

          <span className="text-[10px] font-mono text-zinc-400 bg-black/40 px-2.5 py-1 rounded border border-white/5">
            DUAL-SIGNOFF LEVEL 2 REQUIRED
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 pt-1">
          {/* Mark Reviewed */}
          <button
            onClick={() =>
              updateCaseStatus(caseId, "under_review", "Marked as reviewed by Forensic Lead.")
            }
            className="px-3.5 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-mono font-semibold transition-all border border-white/10 flex items-center gap-1.5"
          >
            <span>Mark Reviewed</span>
          </button>

          {/* Request More Information (RFI) */}
          <button
            onClick={() => setActiveModal("rfi")}
            className="px-3.5 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-[#00e5ff] text-xs font-mono font-semibold transition-all border border-[#00e5ff]/20 flex items-center gap-1.5"
          >
            <MailQuestion className="w-3.5 h-3.5" />
            <span>Request Info (RFI)</span>
          </button>

          {/* Approve Proposed Resolution */}
          <button
            onClick={() => setActiveModal("approve")}
            className="px-4 py-2 rounded-lg bg-[#00ff87] hover:bg-[#15ff96] text-black text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(0,255,135,0.25)] flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Approve Resolution</span>
          </button>

          {/* Reject Resolution */}
          <button
            onClick={() => setActiveModal("reject")}
            className="px-3.5 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white text-xs font-mono transition-all border border-white/10 flex items-center gap-1.5"
          >
            <XCircle className="w-3.5 h-3.5" />
            <span>Reject</span>
          </button>

          {/* Escalate Case */}
          <button
            onClick={() => setActiveModal("escalate")}
            className="px-3.5 py-2 rounded-lg bg-[#ff3355]/20 hover:bg-[#ff3355]/30 text-[#ff3355] text-xs font-mono font-bold transition-all border border-[#ff3355]/40 flex items-center gap-1.5"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Escalate Case</span>
          </button>
        </div>

        {/* Disclaimer */}
        <div className="text-[10px] font-mono text-zinc-500 pt-1">
          * Demo Notice: Reviewer actions commit cryptographically to the simulation Merkle audit
          log. No live bank wire transfer or external email is triggered.
        </div>
      </div>

      {/* Interactive Action Confirmation Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-lg rounded-2xl border border-white/15 bg-[#0e0e14] p-6 shadow-2xl space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#00ff87]" />
                <span className="text-white font-bold uppercase text-sm">
                  {activeModal === "approve"
                    ? "Confirm Auditor Approval"
                    : activeModal === "escalate"
                    ? "Escalate Case to Legal & Audit Committee"
                    : activeModal === "rfi"
                    ? "Formal Request for Information (RFI)"
                    : "Reject Proposed Resolution"}
                </span>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-zinc-300">
              Executing governance action on{" "}
              <span className="text-white font-bold">{caseNumber}</span> ({vendorName}).
            </div>

            {activeModal === "rfi" && (
              <div className="space-y-1">
                <label className="text-[10px] text-zinc-400 uppercase">Recipient Party:</label>
                <input
                  type="text"
                  value={rfiParty}
                  onChange={(e) => setRfiParty(e.target.value)}
                  className="w-full p-2.5 rounded bg-black border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-[#00ff87]"
                />
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[10px] text-zinc-400 uppercase">
                Auditor Rationale & Audit Directive:
              </label>
              <textarea
                rows={3}
                value={rationaleNote}
                onChange={(e) => setRationaleNote(e.target.value)}
                placeholder="Enter formal justification for SOX-404 audit log..."
                className="w-full p-2.5 rounded bg-black border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-[#00ff87]"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 rounded bg-zinc-800 text-zinc-300 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleExecuteAction}
                className="px-5 py-2 rounded bg-[#00ff87] text-black font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(0,255,135,0.3)]"
              >
                Commit Action
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
