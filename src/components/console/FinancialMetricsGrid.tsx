"use client";

import React from "react";
import { useAppStore } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";
import {
  FileText,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Clock,
  ShieldCheck,
} from "lucide-react";

export function FinancialMetricsGrid() {
  const { metrics } = useAppStore();

  const cards = [
    {
      title: "Total Invoices Processed",
      value: metrics.totalProcessed.toLocaleString(),
      raw: `${metrics.totalProcessed.toLocaleString()} documents`,
      subtext: "Last 30-day billing volume",
      status: "neutral",
      icon: FileText,
      valueColor: "text-espresso",
      borderAccent: "border-l-4 border-l-[#6F4E37]",
    },
    {
      title: "Successfully Reconciled",
      value: `${((metrics.reconciledCount / metrics.totalProcessed) * 100).toFixed(1)}%`,
      raw: `${metrics.reconciledCount.toLocaleString()} matched`,
      subtext: "Zero variance deterministic 3-way match",
      status: "verified",
      icon: CheckCircle2,
      valueColor: "text-[#25663B]",
      borderAccent: "border-l-4 border-l-[#25663B]",
    },
    {
      title: "Outstanding Exceptions",
      value: metrics.exceptionCount.toString(),
      raw: `${metrics.exceptionCount} open cases`,
      subtext: "Variance or unverified vendor rates",
      status: "discrepant",
      icon: AlertTriangle,
      valueColor: "text-[#946000]",
      borderAccent: "border-l-4 border-l-[#946000]",
    },
    {
      title: "Duplicate Invoices Intercepted",
      value: metrics.duplicateCount.toString(),
      raw: `${metrics.duplicateCount} blocked billings`,
      subtext: "Pre-payment duplicate & BEC defense",
      status: "review",
      icon: Copy,
      valueColor: "text-[#B52A2A]",
      borderAccent: "border-l-4 border-l-[#B52A2A]",
    },
    {
      title: "Payments Awaiting Sign-off",
      value: formatCurrency(metrics.pendingApprovalAmount),
      raw: "4 held settlements",
      subtext: "Provisional hold pending human sign-off",
      status: "held",
      icon: Clock,
      valueColor: "text-[#6F4E37]",
      borderAccent: "border-l-4 border-l-[#6F4E37]",
    },
  ];

  return (
    <div className="space-y-3">
      {/* Benchmark Telemetry Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-4 py-2.5 rounded-xl bg-[#E6E0F0]/40 border border-[#6F4E37]/20 text-xs font-mono text-[#5C4F47]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#25663B]" />
          <span className="font-bold text-espresso">DEMO BENCHMARK DATASET:</span>
          <span className="font-medium">Enterprise ERP Simulation v3.4 (Acme Corp Treasury)</span>
        </div>
        <span className="text-[11px] font-bold text-[#6F4E37]">
          SYNTHETIC TELEMETRY • IMMUTABLE AUDIT ENABLED
        </span>
      </div>

      {/* Grid of 5 Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <div
              key={c.title}
              className={`p-4 rounded-xl border border-[#D7D0C9] bg-white shadow-sm transition-all hover:shadow-md ${c.borderAccent}`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#5C4F47]">
                  {c.title}
                </span>
                <Icon className="w-4 h-4 shrink-0 text-[#6F4E37]" />
              </div>
              <div className={`text-2xl sm:text-3xl font-mono font-black tracking-tight mb-1 ${c.valueColor}`}>
                {c.value}
              </div>
              <div className="text-xs font-mono font-semibold text-[#5C4F47]">
                {c.raw}
              </div>
              <div className="mt-2 text-[10px] text-[#5C4F47] leading-tight">
                {c.subtext}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
