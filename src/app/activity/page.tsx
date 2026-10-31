"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { useAppStore } from "@/lib/store";
import { formatDate } from "@/lib/utils";
import { Clock, CheckCircle2, AlertTriangle, XCircle, FileText, Link2, ShieldCheck } from "lucide-react";

export default function ActivityPage() {
  const { auditLogs } = useAppStore();

  const getEventBadge = (eventType: string) => {
    switch (eventType) {
      case "approval":
      case "reconcile_match":
        return "badge-success";
      case "discrepancy_flagged":
      case "escalation":
        return "badge-error";
      case "review_action":
        return "badge-warning";
      case "forensics_scanned":
        return "badge-info";
      default:
        return "badge-info";
    }
  };

  const getEventIcon = (eventType: string) => {
    switch (eventType) {
      case "ingest":
        return FileText;
      case "reconcile_match":
        return Link2;
      case "discrepancy_flagged":
        return AlertTriangle;
      case "forensics_scanned":
        return ShieldCheck;
      case "review_action":
      case "approval":
        return CheckCircle2;
      case "escalation":
        return XCircle;
      default:
        return Clock;
    }
  };

  // Group logs by date
  const logsByDate: Record<string, any[]> = {};
  auditLogs.forEach((log) => {
    const date = new Date(log.timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    if (!logsByDate[date]) {
      logsByDate[date] = [];
    }
    logsByDate[date].push(log);
  });

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
                  AUDIT STREAM
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black serif-display text-[#30231D]">
                Cryptographic Activity Log
              </h1>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#D7D0C9] text-[#30231D] font-bold shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#25663B]" />
                <span>EVENTS RECORDED: {auditLogs.length}</span>
              </span>
            </div>
          </div>

          {/* Metric Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="card py-4 text-center">
              <div className="text-2xl font-bold font-mono text-[#6F4E37]">{auditLogs.length}</div>
              <div className="text-xs font-mono font-bold uppercase text-[#5C4F47] mt-1">Total Audit Blocks</div>
            </div>
            <div className="card py-4 text-center">
              <div className="text-2xl font-bold font-mono text-[#25663B]">
                {auditLogs.filter((l) => l.eventType === "approval").length}
              </div>
              <div className="text-xs font-mono font-bold uppercase text-[#5C4F47] mt-1">Approvals Sealed</div>
            </div>
            <div className="card py-4 text-center">
              <div className="text-2xl font-bold font-mono text-[#946000]">
                {auditLogs.filter((l) => l.eventType === "review_action").length}
              </div>
              <div className="text-xs font-mono font-bold uppercase text-[#5C4F47] mt-1">Review Actions</div>
            </div>
            <div className="card py-4 text-center">
              <div className="text-2xl font-bold font-mono text-[#B52A2A]">
                {auditLogs.filter((l) => l.eventType === "escalation").length}
              </div>
              <div className="text-xs font-mono font-bold uppercase text-[#5C4F47] mt-1">Escalated Holds</div>
            </div>
          </div>

          {/* Activity Timeline List */}
          <div className="space-y-6">
            {Object.entries(logsByDate)
              .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
              .map(([date, logs]) => (
                <div key={date} className="card space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#D7D0C9]">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#6F4E37]" />
                      <h3 className="text-sm font-bold text-[#30231D] font-mono">{date}</h3>
                    </div>
                    <span className="text-xs font-mono text-[#5C4F47] font-semibold">
                      {logs.length} operations verified
                    </span>
                  </div>

                  <div className="space-y-3">
                    {logs.map((log) => {
                      const Icon = getEventIcon(log.eventType);
                      return (
                        <div
                          key={log.id}
                          className="p-3.5 rounded-xl border border-[#D7D0C9] bg-[#F7F5F1] hover:bg-white hover:border-[#6F4E37] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-white border border-[#D7D0C9] flex items-center justify-center text-[#6F4E37] shadow-xs">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-sm font-bold text-[#30231D]">{log.action}</div>
                              <div className="text-xs text-[#5C4F47] font-mono mt-0.5">
                                Actor: {log.actor} • Hash: {(log.cryptographicHash || "").slice(0, 16)}...
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 self-end sm:self-center">
                            <span className={getEventBadge(log.eventType)}>
                              {log.eventType.replace("_", " ").toUpperCase()}
                            </span>
                            <span className="text-xs font-mono text-[#5C4F47]">
                              {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
          </div>
        </main>
      </div>
    </div>
  );
}
