"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  InvestigationCase,
  AuditEvent,
  CaseStatus,
  PipelineStage,
  Invoice,
  Vendor,
  PurchaseOrder,
  BankTransaction,
} from "@/types";
import {
  DEMO_CASES,
  DEMO_AUDIT_LOGS,
  DEMO_PIPELINE_STAGES,
  DEMO_INVOICES,
  DEMO_VENDORS,
  DEMO_PURCHASE_ORDERS,
  DEMO_BANK_TRANSACTIONS,
} from "./demo-data";
import { generateEventHash } from "./utils";

interface AppStoreContextType {
  cases: InvestigationCase[];
  auditLogs: AuditEvent[];
  pipelineStages: PipelineStage[];
  invoices: Invoice[];
  vendors: Vendor[];
  purchaseOrders: PurchaseOrder[];
  bankTransactions: BankTransaction[];
  selectedCaseId: string;
  setSelectedCaseId: (id: string) => void;
  updateCaseStatus: (caseId: string, status: CaseStatus, reviewerNote?: string) => void;
  requestInformation: (caseId: string, requestedParty: string, note: string) => void;
  escalateCase: (caseId: string, reason: string) => void;
  metrics: {
    totalProcessed: number;
    reconciledCount: number;
    exceptionCount: number;
    duplicateCount: number;
    pendingApprovalAmount: number;
  };
  notification: { message: string; type: "success" | "warning" | "info" } | null;
  clearNotification: () => void;
}

const AppStoreContext = createContext<AppStoreContextType | undefined>(undefined);

export function AppStoreProvider({ children }: { children: React.ReactNode }) {
  const [cases, setCases] = useState<InvestigationCase[]>(DEMO_CASES);
  const [auditLogs, setAuditLogs] = useState<AuditEvent[]>(DEMO_AUDIT_LOGS);
  const [pipelineStages, setPipelineStages] = useState<PipelineStage[]>(DEMO_PIPELINE_STAGES);
  const [selectedCaseId, setSelectedCaseId] = useState<string>("case-01");
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "warning" | "info";
  } | null>(null);

  // Compute live financial summary metrics from cases and invoices
  const totalProcessed = 2847;
  const exceptionCount = cases.filter(
    (c) => c.status === "investigating" || c.status === "under_review" || c.status === "escalated"
  ).length + 15;
  const duplicateCount = 6;
  const reconciledCount = totalProcessed - exceptionCount - duplicateCount;
  const pendingApprovalAmount = cases
    .filter((c) => c.status === "investigating" || c.status === "under_review")
    .reduce((acc, c) => acc + c.totalInvoiceAmount, 0) + 174850;

  const updateCaseStatus = (caseId: string, newStatus: CaseStatus, reviewerNote?: string) => {
    setCases((prev) =>
      prev.map((c) => {
        if (c.id === caseId) {
          return {
            ...c,
            status: newStatus,
            lastUpdated: new Date().toISOString(),
          };
        }
        return c;
      })
    );

    const targetCase = cases.find((c) => c.id === caseId);
    const caseLabel = targetCase ? targetCase.caseNumber : caseId;
    const now = new Date().toISOString();
    const prevHash = auditLogs[auditLogs.length - 1]?.cryptographicHash || "0x0000000000000000";
    const newHash = generateEventHash(caseId + newStatus + now);

    let eventType: AuditEvent["eventType"] = "review_action";
    let actionDesc = `Status transitioned to ${newStatus.toUpperCase()}`;
    if (newStatus === "approved") {
      eventType = "approval";
      actionDesc = "Human Auditor Approval Sign-Off";
    } else if (newStatus === "escalated") {
      eventType = "escalation";
      actionDesc = "Case Escalated to Executive Committee";
    }

    const newAuditLog: AuditEvent = {
      id: `aud-${Date.now()}`,
      caseId,
      timestamp: now,
      eventType,
      actor: "Lead Forensic Auditor (Current User)",
      actorRole: "human_auditor",
      action: actionDesc,
      details: reviewerNote || `Reviewer action executed on case ${caseLabel}. Policy gate satisfied.`,
      cryptographicHash: newHash,
      previousHash: prevHash,
    };

    setAuditLogs((prev) => [newAuditLog, ...prev]);

    // Also update pipeline stage 7 (Audit Verification)
    setPipelineStages((prev) =>
      prev.map((stg) =>
        stg.order === 7
          ? {
              ...stg,
              status: "completed",
              completedAt: now,
              recordsProcessed: stg.recordsProcessed + 1,
              logs: [
                ...stg.logs,
                `[${now.slice(11, 19)}] Cryptographic block committed: ${newHash} for ${caseLabel}`,
              ],
            }
          : stg
      )
    );

    setNotification({
      message: `Case ${caseLabel} updated: status marked as ${newStatus.toUpperCase()}`,
      type: "success",
    });
  };

  const requestInformation = (caseId: string, requestedParty: string, note: string) => {
    const targetCase = cases.find((c) => c.id === caseId);
    const caseLabel = targetCase ? targetCase.caseNumber : caseId;
    const now = new Date().toISOString();
    const prevHash = auditLogs[0]?.cryptographicHash || "0x0000000000000000";
    const newHash = generateEventHash(caseId + "req-info" + now);

    const newAuditLog: AuditEvent = {
      id: `aud-${Date.now()}`,
      caseId,
      timestamp: now,
      eventType: "review_action",
      actor: "Lead Forensic Auditor (Current User)",
      actorRole: "human_auditor",
      action: `Formal RFI Dispatched to ${requestedParty}`,
      details: `Information Request: "${note}". Secure submission token issued.`,
      cryptographicHash: newHash,
      previousHash: prevHash,
    };

    setAuditLogs((prev) => [newAuditLog, ...prev]);
    setNotification({
      message: `RFI formally dispatched to ${requestedParty} for ${caseLabel}`,
      type: "info",
    });
  };

  const escalateCase = (caseId: string, reason: string) => {
    updateCaseStatus(caseId, "escalated", `Immediate escalation: ${reason}`);
  };

  const clearNotification = () => setNotification(null);

  // Auto-dismiss notification after 5s
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <AppStoreContext.Provider
      value={{
        cases,
        auditLogs,
        pipelineStages,
        invoices: DEMO_INVOICES,
        vendors: DEMO_VENDORS,
        purchaseOrders: DEMO_PURCHASE_ORDERS,
        bankTransactions: DEMO_BANK_TRANSACTIONS,
        selectedCaseId,
        setSelectedCaseId,
        updateCaseStatus,
        requestInformation,
        escalateCase,
        metrics: {
          totalProcessed,
          reconciledCount,
          exceptionCount,
          duplicateCount,
          pendingApprovalAmount,
        },
        notification,
        clearNotification,
      }}
    >
      {children}
    </AppStoreContext.Provider>
  );
}

export function useAppStore() {
  const context = useContext(AppStoreContext);
  if (!context) {
    throw new Error("useAppStore must be used within an AppStoreProvider");
  }
  return context;
}
