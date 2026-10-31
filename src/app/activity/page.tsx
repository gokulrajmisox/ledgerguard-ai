"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { useAppStore } from "@/lib/store";
import { formatDate } from "@/lib/utils";
import { Clock, CheckCircle2, AlertTriangle, XCircle, FileText, Link2 } from "lucide-react";

export default function ActivityPage() {
  const { auditLogs, cases } = useAppStore();

  const getEventIcon = (eventType: string) => {
    switch (eventType) {
      case "ingest":
        return FileText;
      case "reconcile_match":
        return Link2;
      case "discrepancy_flagged":
        return AlertTriangle;
      case "forensics_scanned":
        return CheckCircle2;
      case "review_action":
        return Clock;
      case "approval":
        return CheckCircle2;
      case "escalation":
        return XCircle;
      default:
        return Clock;
    }
  };

  const getEventColor = (eventType: string) => {
    switch (eventType) {
      case "ingest":
        return "text-mocha";
      case "reconcile_match":
        return "text-status-success";
      case "discrepancy_flagged":
        return "text-status-error";
      case "forensics_scanned":
        return "text-status-info";
      case "review_action":
        return "text-status-warning";
      case "approval":
        return "text-status-success";
      case "escalation":
        return "text-status-error";
      default:
        return "text-taupe";
    }
  };

  // Group logs by date
  const logsByDate: Record<string, any[]> = {};
  auditLogs.forEach((log) => {
    const date = new Date(log.timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
    if (!logsByDate[date]) {
      logsByDate[date] = [];
    }
    logsByDate[date].push(log);
  });

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
                  ACTIVITY FEED
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold serif-display text-espresso">
                Recent Activity
              </h1>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-taupe">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-platinum border border-mocha/10">
                <span className="w-1.5 h-1.5 rounded-full bg-mocha" />
                <span>TOTAL EVENTS: {auditLogs.length}</span>
              </span>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="card text-center py-4">
              <div className="text-xl font-bold text-mocha">{auditLogs.length}</div>
              <div className="text-xs text-taupe mt-1">Total Events</div>
            </div>
            <div className="card text-center py-4">
              <div className="text-xl font-bold text-status-success">
                {auditLogs.filter(l => l.eventType === "approval").length}
              </div>
              <div className="text-xs text-taupe mt-1">Approvals</div>
            </div>
            <div className="card text-center py-4">
              <div className="text-xl font-bold text-status-warning">
                {auditLogs.filter(l => l.eventType === "review_action").length}
              </div>
              <div className="text-xs text-taupe mt-1">Reviews</div>
            </div>
            <div className="card text-center py-4">
              <div className="text-xl font-bold text-status-error">
                {auditLogs.filter(l => l.eventType === "escalation").length}
              </div>
              <div className="text-xs text-taupe mt-1">Escalations</div>
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="space-y-6">
            {Object.entries(logsByDate)
              .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
              .map(([date, logs]) => (
                <div key={date} className="card">
                  <div className="flex items-center gap-2 mb-4 pb-2 border-b border-mocha/10">
                    <Clock className="w-4 h-4 text-mocha" />
                    <h3 className="text-sm font-medium text-espresso">{date}</h3>
                    <span className="text-xs text-taupe">
                      ({logs.length} events)
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    {logs
                      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                      .map((log) => {
                        const Icon = getEventIcon(log.eventType);
                        const colorClass = getEventColor(log.eventType);
                        
                        return (
                          <div
                            key={log.id}
                            className="flex items-start gap-3 p-3 rounded-lg hover:bg-platinum/50 transition-colors"
                          >
                            <div className="flex-shrink-0">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${colorClass.replace("text-", "bg-")}/20`}>
                                <Icon className={`w-4 h-4 ${colorClass}`} />
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className={`text-sm font-medium ${colorClass}`}>
                                  {log.action}
                                </span>
                                <span className="text-xs text-taupe font-mono">
                                  {new Date(log.timestamp).toLocaleTimeString('en-US', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    second: '2-digit',
                                  })}
                                </span>
                              </div>
                              <div className="text-sm text-taupe line-clamp-2">
                                {log.details}
                              </div>
                              <div className="text-xs text-taupe/70 mt-1">
                                {log.actor} ({log.actorRole.replace("_", " ")})
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              ))}
          </div>

          {/* Cryptographic Audit Trail */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-espresso">Cryptographic Audit Trail</h3>
              <span className="text-xs font-mono text-taupe">
                IMMUTABLE MERKLE CHAIN
              </span>
            </div>
            <p className="text-sm text-taupe mb-4">
              Every action is cryptographically linked to the previous one, creating an immutable audit trail.
            </p>
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th className="text-xs font-medium text-taupe uppercase tracking-wider">
                      Timestamp
                    </th>
                    <th className="text-xs font-medium text-taupe uppercase tracking-wider">
                      Action
                    </th>
                    <th className="text-xs font-medium text-taupe uppercase tracking-wider">
                      Hash
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {auditLogs.slice(0, 10).map((log) => (
                    <tr key={log.id} className="hover:bg-platinum/50 transition-colors">
                      <td className="text-sm font-mono text-taupe">
                        {formatDate(log.timestamp)}
                      </td>
                      <td className="text-sm text-espresso">
                        {log.action}
                      </td>
                      <td className="text-xs font-mono text-mocha truncate max-w-[200px]">
                        {log.cryptographicHash}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
