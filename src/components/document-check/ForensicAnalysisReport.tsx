"use client";

import React from "react";
import { Invoice, PurchaseOrder, ForensicFinding } from "@/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import { CheckCircle2, AlertTriangle, XCircle, Search, ShieldCheck, Info } from "lucide-react";

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
  // Calculate overall confidence score
  const overallConfidence = findings.length > 0
    ? (findings.reduce((sum, f) => sum + f.confidenceScore, 0) / findings.length) * 100
    : 100;

  // Count findings by severity
  const severityCounts = {
    critical: findings.filter(f => f.severity === "critical").length,
    medium: findings.filter(f => f.severity === "medium").length,
    low: findings.filter(f => f.severity === "low").length,
  };

  // Calculate discrepancy
  const discrepancy = purchaseOrder
    ? invoice.totalAmount - purchaseOrder.authorizedAmount
    : 0;

  const discrepancyPercentage = purchaseOrder
    ? (discrepancy / purchaseOrder.authorizedAmount) * 100
    : 0;

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-status-error/20 text-status-error border border-status-error/30";
      case "medium":
        return "bg-status-warning/20 text-status-warning border border-status-warning/30";
      case "low":
        return "bg-status-info/20 text-status-info border border-status-info/30";
      default:
        return "bg-platinum text-taupe";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
        return <XCircle className="w-4 h-4" />;
      case "medium":
        return <AlertTriangle className="w-4 h-4" />;
      case "low":
        return <Info className="w-4 h-4" />;
      default:
        return <ShieldCheck className="w-4 h-4" />;
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Report Header */}
      <div className="p-3 border-b border-mocha/10">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-medium text-espresso">
            Forensic Analysis Report
          </h4>
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full ${
              overallConfidence >= 90 
                ? "bg-status-success/20 text-status-success border border-status-success/30"
                : overallConfidence >= 70
                ? "bg-status-warning/20 text-status-warning border border-status-warning/30"
                : "bg-status-error/20 text-status-error border border-status-error/30"
            }`}
          >
            CONFIDENCE: {Math.round(overallConfidence)}%
          </span>
        </div>
        <p className="text-xs text-taupe">
          Invoice: {invoice.invoiceNumber} | Vendor: {invoice.vendorName}
        </p>
      </div>

      {/* Document Metadata */}
      <div className="p-3 border-b border-mocha/10">
        <h5 className="text-sm font-medium text-espresso mb-3">Document Metadata</h5>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-taupe mb-1">Invoice Number</div>
            <div className="text-sm font-mono text-mocha">{invoice.invoiceNumber}</div>
          </div>
          <div>
            <div className="text-xs text-taupe mb-1">Issue Date</div>
            <div className="text-sm text-espresso">{formatDate(invoice.issueDate)}</div>
          </div>
          <div>
            <div className="text-xs text-taupe mb-1">Due Date</div>
            <div className="text-sm text-espresso">{formatDate(invoice.dueDate)}</div>
          </div>
          <div>
            <div className="text-xs text-taupe mb-1">Total Amount</div>
            <div className="text-sm font-medium text-mocha">{formatCurrency(invoice.totalAmount)}</div>
          </div>
          {purchaseOrder && (
            <>
              <div>
                <div className="text-xs text-taupe mb-1">PO Number</div>
                <div className="text-sm font-mono text-mocha">{purchaseOrder.poNumber}</div>
              </div>
              <div>
                <div className="text-xs text-taupe mb-1">PO Amount</div>
                <div className="text-sm font-medium text-mocha">{formatCurrency(purchaseOrder.authorizedAmount)}</div>
              </div>
            </>
          )}
        </div>

        {/* Discrepancy Summary */}
        {purchaseOrder && discrepancy !== 0 && (
          <div className="mt-3 p-3 rounded-lg bg-status-warning/10 border border-status-warning/30">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-status-warning" />
              <span className="text-sm font-medium text-espresso">
                Amount Discrepancy
              </span>
            </div>
            <p className="text-sm text-taupe">
              Invoice: {formatCurrency(invoice.totalAmount)} | PO: {formatCurrency(purchaseOrder.authorizedAmount)}
            </p>
            <p className="text-lg font-bold text-status-warning">
              Difference: {formatCurrency(discrepancy)} ({Math.round(Math.abs(discrepancyPercentage))}%)
            </p>
            <p className="text-xs text-taupe/70 mt-1">
              {discrepancy > 0 
                ? "Invoice exceeds PO authorization" 
                : "Invoice is under PO authorization"}
            </p>
          </div>
        )}

        {purchaseOrder && discrepancy === 0 && (
          <div className="mt-3 p-3 rounded-lg bg-status-success/10 border border-status-success/30">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-status-success" />
              <span className="text-sm font-medium text-espresso">
                Amounts Match
              </span>
            </div>
            <p className="text-sm text-taupe">
              Invoice amount matches PO authorization exactly
            </p>
          </div>
        )}
      </div>

      {/* Findings Summary */}
      <div className="p-3 border-b border-mocha/10">
        <h5 className="text-sm font-medium text-espresso mb-3">Findings Summary</h5>
        
        {findings.length === 0 ? (
          <div className="p-4 rounded-lg bg-status-success/10 border border-status-success/30 text-center">
            <CheckCircle2 className="w-8 h-8 text-status-success mx-auto mb-2" />
            <p className="text-sm font-medium text-status-success">
              No Forensic Findings
            </p>
            <p className="text-xs text-taupe/70 mt-1">
              Document appears to be authentic
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            <div className="p-3 rounded-lg bg-status-error/10 border border-status-error/30 text-center">
              <div className="text-lg font-bold text-status-error">{severityCounts.critical}</div>
              <div className="text-xs text-taupe">Critical</div>
            </div>
            <div className="p-3 rounded-lg bg-status-warning/10 border border-status-warning/30 text-center">
              <div className="text-lg font-bold text-status-warning">{severityCounts.medium}</div>
              <div className="text-xs text-taupe">Medium</div>
            </div>
            <div className="p-3 rounded-lg bg-status-info/10 border border-status-info/30 text-center">
              <div className="text-lg font-bold text-status-info">{severityCounts.low}</div>
              <div className="text-xs text-taupe">Low</div>
            </div>
          </div>
        )}
      </div>

      {/* Findings List */}
      <div className="flex-1 overflow-y-auto">
        <h5 className="text-sm font-medium text-espresso mb-3 p-3 border-b border-mocha/10">
          Detailed Findings ({findings.length})
        </h5>
        
        {findings.length > 0 ? (
          <div className="space-y-2">
            {findings.map((finding, index) => (
              <div
                key={finding.id}
                onClick={() => onSelectFinding(finding)}
                className={`p-3 rounded-lg border border-mocha/10 cursor-pointer transition-all ${
                  activeFindingId === finding.id 
                    ? "bg-mocha/5 border-mocha" 
                    : "hover:bg-platinum/50"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-mocha">
                      {index + 1}. {finding.title}
                    </span>
                  </div>
                  <span
                    className={`flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${getSeverityColor(finding.severity)}`}
                  >
                    {getSeverityIcon(finding.severity)}
                    {finding.severity.toUpperCase()}
                  </span>
                </div>
                <div className="text-xs text-taupe mb-2">
                  Type: {finding.type.replace("_", " ")}
                </div>
                <div className="text-sm text-taupe line-clamp-2 mb-2">
                  {finding.observedEvidence}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-taupe">
                    Confidence: {(finding.confidenceScore * 100).toFixed(1)}%
                  </span>
                  <span className="text-xs text-taupe/70">
                    Click to view details
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Search className="w-12 h-12 mx-auto text-mocha/30 mb-4" />
            <p className="text-sm text-taupe">
              No findings to display
            </p>
          </div>
        )}
      </div>

      {/* Plain Language Summary */}
      <div className="p-3 border-t border-mocha/10 bg-platinum/50">
        <h5 className="text-sm font-medium text-espresso mb-2">Plain Language Summary</h5>
        <p className="text-sm text-taupe">
          {findings.length === 0 ? (
            <>
              This document has been verified and appears to be authentic. 
              All extracted information matches the expected values, and no 
              forensic anomalies were detected.
            </>
          ) : (
            <>
              This document has {findings.length} forensic finding(s) that require review. 
              {severityCounts.critical > 0 && (
                <>There are {severityCounts.critical} critical issue(s) that should be addressed immediately. </>
              )}
              {severityCounts.medium > 0 && (
                <>There are {severityCounts.medium} medium-severity issue(s) that may need attention. </>
              )}
              {severityCounts.low > 0 && (
                <>There are {severityCounts.low} low-severity observation(s) for your information. </>
              )}
              Please review the detailed findings above for more information.
            </>
          )}
        </p>
        <p className="text-xs text-taupe/70 mt-2">
          Note: Forensic findings indicate potential issues, not confirmed fraud. 
          Always verify findings with additional evidence.
        </p>
      </div>
    </div>
  );
}

export default ForensicAnalysisReport;
