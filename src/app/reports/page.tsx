"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { useAppStore } from "@/lib/store";
import { formatCurrency, formatDate } from "@/lib/utils";
import { BarChart3, PieChart, LineChart, FileText, Download, Calendar, CheckCircle2, AlertTriangle } from "lucide-react";

export default function ReportsPage() {
  const { invoices, purchaseOrders, cases, auditLogs } = useAppStore();
  const [reportType, setReportType] = useState<"summary" | "discrepancies" | "activity">("summary");
  const [dateRange, setDateRange] = useState<"week" | "month" | "quarter" | "year">("month");

  // Calculate report data
  const totalInvoices = invoices.length;
  const totalAmount = invoices.reduce((sum, i) => sum + i.totalAmount, 0);
  const reconciledCount = invoices.filter(i => i.status === "reconciled").length;
  const pendingCount = invoices.filter(i => i.status !== "reconciled").length;
  const discrepancyAmount = cases.reduce((sum, c) => sum + c.amountInDispute, 0);
  const totalAuditEvents = auditLogs.length;

  // Status distribution
  const statusDistribution = [
    { label: "Reconciled", count: reconciledCount, color: "#4A7C59", percentage: (reconciledCount / totalInvoices) * 100 },
    { label: "Discrepant", count: invoices.filter(i => i.status === "discrepant").length, color: "#C85A5A", percentage: (invoices.filter(i => i.status === "discrepant").length / totalInvoices) * 100 },
    { label: "Investigating", count: invoices.filter(i => i.status === "investigating").length, color: "#D4A017", percentage: (invoices.filter(i => i.status === "investigating").length / totalInvoices) * 100 },
    { label: "Duplicate Suspect", count: invoices.filter(i => i.status === "duplicate_suspect").length, color: "#C85A5A", percentage: (invoices.filter(i => i.status === "duplicate_suspect").length / totalInvoices) * 100 },
  ];

  // Recent activity
  const recentActivity = auditLogs.slice(0, 5);

  // Top vendors by volume
  const vendorVolumeMap = new Map<string, number>();
  invoices.forEach(i => {
    const current = vendorVolumeMap.get(i.vendorName) || 0;
    vendorVolumeMap.set(i.vendorName, current + (i.totalAmount || 0));
  });
  const vendorVolume = Array.from(vendorVolumeMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

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
                  FINANCIAL REPORTS
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold serif-display text-espresso">
                Analytics & Reports
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-taupe">Date Range:</span>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value as any)}
                className="px-3 py-1.5 rounded border border-mocha/20 bg-platinum text-sm text-espresso focus:outline-none focus:border-mocha"
              >
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
                <option value="quarter">Last Quarter</option>
                <option value="year">Last Year</option>
              </select>
            </div>
          </div>

          {/* Report Type Tabs */}
          <div className="flex items-center gap-1 p-1 rounded-lg bg-platinum border border-mocha/10">
            <button
              onClick={() => setReportType("summary")}
              className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-all ${
                reportType === "summary"
                  ? "bg-ivory text-mocha shadow-sm"
                  : "text-taupe hover:text-mocha"
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Summary</span>
            </button>
            <button
              onClick={() => setReportType("discrepancies")}
              className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-all ${
                reportType === "discrepancies"
                  ? "bg-ivory text-mocha shadow-sm"
                  : "text-taupe hover:text-mocha"
              }`}
            >
              <PieChart className="w-4 h-4" />
              <span>Discrepancies</span>
            </button>
            <button
              onClick={() => setReportType("activity")}
              className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-all ${
                reportType === "activity"
                  ? "bg-ivory text-mocha shadow-sm"
                  : "text-taupe hover:text-mocha"
              }`}
            >
              <LineChart className="w-4 h-4" />
              <span>Activity</span>
            </button>
          </div>

          {/* Summary Report */}
          {reportType === "summary" && (
            <div className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="card">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-5 h-5 text-mocha" />
                    <span className="text-sm text-taupe">Total Invoices</span>
                  </div>
                  <div className="text-2xl font-bold text-espresso">{totalInvoices}</div>
                  <div className="text-xs text-taupe mt-1">Documents processed</div>
                </div>

                <div className="card">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-5 h-5 text-status-success" />
                    <span className="text-sm text-taupe">Reconciled</span>
                  </div>
                  <div className="text-2xl font-bold text-espresso">{reconciledCount}</div>
                  <div className="text-xs text-taupe mt-1">
                    {Math.round((reconciledCount / totalInvoices) * 100)}% completion rate
                  </div>
                </div>

                <div className="card">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-5 h-5 text-mocha" />
                    <span className="text-sm text-taupe">Total Value</span>
                  </div>
                  <div className="text-2xl font-bold text-espresso">{formatCurrency(totalAmount)}</div>
                  <div className="text-xs text-taupe mt-1">Across all invoices</div>
                </div>

                <div className="card">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-5 h-5 text-status-warning" />
                    <span className="text-sm text-taupe">Pending</span>
                  </div>
                  <div className="text-2xl font-bold text-espresso">{pendingCount}</div>
                  <div className="text-xs text-taupe mt-1">Need attention</div>
                </div>
              </div>

              {/* Status Distribution */}
              <div className="card">
                <h3 className="text-lg font-bold text-espresso mb-4">Status Distribution</h3>
                <div className="space-y-4">
                  {statusDistribution.map((item) => (
                    <div key={item.label} className="flex items-center gap-4">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm text-espresso flex-1">{item.label}</span>
                      <div className="flex-1 max-w-md">
                        <div className="w-full bg-platinum/50 rounded-full h-2">
                          <div
                            className="h-2 rounded-full"
                            style={{ 
                              width: `${item.percentage}%`,
                              backgroundColor: item.color
                            }}
                          />
                        </div>
                      </div>
                      <span className="text-sm font-medium text-mocha w-16 text-right">
                        {item.count}
                      </span>
                      <span className="text-sm text-taupe w-12 text-right">
                        {Math.round(item.percentage)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Vendors */}
              <div className="card">
                <h3 className="text-lg font-bold text-espresso mb-4">Top Vendors by Volume</h3>
                <div className="space-y-3">
                  {vendorVolume.map(([vendor, amount], index) => (
                    <div key={vendor} className="flex items-center gap-4 p-3 rounded-lg hover:bg-platinum/50 transition-colors">
                      <span className="text-lg font-bold text-mocha w-8 text-center">{index + 1}</span>
                      <span className="text-sm text-espresso flex-1">{vendor}</span>
                      <span className="text-sm font-medium text-mocha">
                        {formatCurrency(amount)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Discrepancies Report */}
          {reportType === "discrepancies" && (
            <div className="space-y-6">
              {/* Discrepancy Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="card">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-5 h-5 text-status-error" />
                    <span className="text-sm text-taupe">Open Cases</span>
                  </div>
                  <div className="text-2xl font-bold text-espresso">{cases.length}</div>
                  <div className="text-xs text-taupe mt-1">Cases requiring review</div>
                </div>

                <div className="card">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-5 h-5 text-status-error" />
                    <span className="text-sm text-taupe">Discrepancy Amount</span>
                  </div>
                  <div className="text-2xl font-bold text-status-error">
                    {formatCurrency(discrepancyAmount)}
                  </div>
                  <div className="text-xs text-taupe mt-1">Total amount in dispute</div>
                </div>
              </div>

              {/* Cases by Priority */}
              <div className="card">
                <h3 className="text-lg font-bold text-espresso mb-4">Cases by Priority</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "P1 Critical", count: cases.filter(c => c.priority === "P1").length, color: "#C85A5A" },
                    { label: "P2 High", count: cases.filter(c => c.priority === "P2").length, color: "#D4A017" },
                    { label: "P3 Medium", count: cases.filter(c => c.priority === "P3").length, color: "#4A8782" },
                    { label: "P4 Low", count: cases.filter(c => c.priority === "P4").length, color: "#4A7C59" },
                  ].map((item) => (
                    <div key={item.label} className="text-center p-4 rounded-lg bg-platinum/50">
                      <div className="w-8 h-8 mx-auto mb-2 rounded-full" style={{ backgroundColor: item.color }} />
                      <div className="text-xl font-bold text-espresso">{item.count}</div>
                      <div className="text-xs text-taupe mt-1">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cases List */}
              <div className="card">
                <h3 className="text-lg font-bold text-espresso mb-4">Active Cases</h3>
                <div className="overflow-x-auto">
                  <table className="table">
                    <thead>
                      <tr>
                        <th className="text-xs font-medium text-taupe uppercase tracking-wider">
                          Case #
                        </th>
                        <th className="text-xs font-medium text-taupe uppercase tracking-wider">
                          Vendor
                        </th>
                        <th className="text-xs font-medium text-taupe uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="text-xs font-medium text-taupe uppercase tracking-wider">
                          Priority
                        </th>
                        <th className="text-xs font-medium text-taupe uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {cases.map((c) => (
                        <tr key={c.id} className="hover:bg-platinum/50 transition-colors">
                          <td className="text-sm font-mono text-mocha">{c.caseNumber}</td>
                          <td className="text-sm text-espresso">{c.vendorName}</td>
                          <td className="text-sm font-medium text-mocha">{formatCurrency(c.amountInDispute)}</td>
                          <td>
                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                              c.priority === "P1" ? "bg-status-error/20 text-status-error border border-status-error/30" :
                              c.priority === "P2" ? "bg-status-warning/20 text-status-warning border border-status-warning/30" :
                              c.priority === "P3" ? "bg-status-info/20 text-status-info border border-status-info/30" :
                              "bg-status-success/20 text-status-success border border-status-success/30"
                            }`}>
                              {c.priority}
                            </span>
                          </td>
                          <td>
                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                              c.status === "approved" ? "bg-status-success/20 text-status-success border border-status-success/30" :
                              c.status === "escalated" ? "bg-status-error/20 text-status-error border border-status-error/30" :
                              "bg-status-warning/20 text-status-warning border border-status-warning/30"
                            }`}>
                              {c.status.replace("_", " ")}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Activity Report */}
          {reportType === "activity" && (
            <div className="space-y-6">
              {/* Activity Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="card">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-5 h-5 text-mocha" />
                    <span className="text-sm text-taupe">Total Events</span>
                  </div>
                  <div className="text-2xl font-bold text-espresso">{totalAuditEvents}</div>
                  <div className="text-xs text-taupe mt-1">Audit log entries</div>
                </div>

                <div className="card">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-status-success" />
                    <span className="text-sm text-taupe">Approvals</span>
                  </div>
                  <div className="text-2xl font-bold text-espresso">
                    {auditLogs.filter(l => l.eventType === "approval").length}
                  </div>
                  <div className="text-xs text-taupe mt-1">Human approvals</div>
                </div>

                <div className="card">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-status-warning" />
                    <span className="text-sm text-taupe">Reviews</span>
                  </div>
                  <div className="text-2xl font-bold text-espresso">
                    {auditLogs.filter(l => l.eventType === "review_action").length}
                  </div>
                  <div className="text-xs text-taupe mt-1">Review actions</div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="card">
                <h3 className="text-lg font-bold text-espresso mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {recentActivity.map((log) => (
                    <div key={log.id} className="p-3 rounded-lg border border-mocha/10 hover:bg-platinum/50 transition-colors">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-espresso">{log.action}</span>
                        <span className="text-xs text-taupe font-mono">
                          {formatDate(log.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm text-taupe line-clamp-2">{log.details}</p>
                      <div className="text-xs text-taupe/70 mt-1">
                        {log.actor} ({log.actorRole.replace("_", " ")})
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Activity by Type */}
              <div className="card">
                <h3 className="text-lg font-bold text-espresso mb-4">Activity by Type</h3>
                <div className="space-y-4">
                  {[
                    { type: "ingest", label: "Document Ingestion", count: auditLogs.filter(l => l.eventType === "ingest").length, color: "#6F4E37" },
                    { type: "reconcile_match", label: "Reconciliation Match", count: auditLogs.filter(l => l.eventType === "reconcile_match").length, color: "#4A7C59" },
                    { type: "discrepancy_flagged", label: "Discrepancy Flagged", count: auditLogs.filter(l => l.eventType === "discrepancy_flagged").length, color: "#C85A5A" },
                    { type: "forensics_scanned", label: "Forensics Scanned", count: auditLogs.filter(l => l.eventType === "forensics_scanned").length, color: "#4A8782" },
                    { type: "approval", label: "Approvals", count: auditLogs.filter(l => l.eventType === "approval").length, color: "#4A7C59" },
                    { type: "escalation", label: "Escalations", count: auditLogs.filter(l => l.eventType === "escalation").length, color: "#C85A5A" },
                  ].map((item) => (
                    <div key={item.type} className="flex items-center gap-4">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm text-espresso flex-1">{item.label}</span>
                      <div className="flex-1 max-w-md">
                        <div className="w-full bg-platinum/50 rounded-full h-2">
                          <div
                            className="h-2 rounded-full"
                            style={{ 
                              width: `${(item.count / totalAuditEvents) * 100}%`,
                              backgroundColor: item.color
                            }}
                          />
                        </div>
                      </div>
                      <span className="text-sm font-medium text-mocha w-16 text-right">
                        {item.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Export Options */}
          <div className="card">
            <h3 className="text-lg font-bold text-espresso mb-4">Export Reports</h3>
            <p className="text-sm text-taupe mb-4">
              Download your reports in various formats for further analysis
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="px-4 py-2 rounded-lg border border-mocha/20 bg-platinum text-sm text-espresso hover:bg-mocha/5 transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" />
                <span>CSV</span>
              </button>
              <button className="px-4 py-2 rounded-lg border border-mocha/20 bg-platinum text-sm text-espresso hover:bg-mocha/5 transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" />
                <span>PDF</span>
              </button>
              <button className="px-4 py-2 rounded-lg border border-mocha/20 bg-platinum text-sm text-espresso hover:bg-mocha/5 transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" />
                <span>Excel</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
