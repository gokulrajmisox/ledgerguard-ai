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
      raw: metrics.totalProcessed.toLocaleString(),
      subtext: "Last 30-day billing volume",
      status: "neutral",
      icon: FileText,
      accent: "border-white/10 text-white",
    },
    {
      title: "Successfully Reconciled",
      value: `${((metrics.reconciledCount / metrics.totalProcessed) * 100).toFixed(1)}%`,
      raw: `${metrics.reconciledCount.toLocaleString()} matched`,
      subtext: "Zero variance deterministic 3-way match",
      status: "verified",
      icon: CheckCircle2,
      accent: "border-[#00ff87]/30 text-[#00ff87]",
    },
    {
      title: "Outstanding Exceptions",
      value: metrics.exceptionCount.toString(),
      raw: `${metrics.exceptionCount} open cases`,
      subtext: "Variance or unverified vendor rates",
      status: "discrepant",
      icon: AlertTriangle,
      accent: "border-[#f59e0b]/40 text-[#f59e0b]",
    },
    {
      title: "Duplicate Invoices Intercepted",
      value: metrics.duplicateCount.toString(),
      raw: `${metrics.duplicateCount} blocked billings`,
      subtext: "Pre-payment duplicate & BEC defense",
      status: "review",
      icon: Copy,
      accent: "border-[#ff3355]/40 text-[#ff3355]",
    },
    {
      title: "Payments Awaiting Approval",
      value: formatCurrency(metrics.pendingApprovalAmount),
      raw: "4 held settlements",
      subtext: "Provisional hold pending human sign-off",
      status: "held",
      icon: Clock,
      accent: "border-[#00e5ff]/30 text-[#00e5ff]",
    },
  ];

  return (
    <div className="space-y-3">
      {/* Synthetic Demo Label Guardrail */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-3.5 py-2 rounded-lg bg-zinc-900/60 border border-white/5 text-[11px] font-mono text-zinc-400">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00ff87]" />
          <span className="font-semibold text-zinc-300">DEMO BENCHMARK DATASET:</span>
          <span>Enterprise ERP Simulation v3.4 (Acme Corp Treasury)</span>
        </div>
        <span className="text-zinc-500 text-[10px]">
          SYNTHETIC TELEMETRY • NO REAL FUNDS MOVED
        </span>
      </div>

      {/* Grid of 5 Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <div
              key={c.title}
              className={`p-4 rounded-xl border bg-black/40 backdrop-blur-md transition-all hover:bg-white/[0.03] ${c.accent}`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                  {c.title}
                </span>
                <Icon className="w-3.5 h-3.5 shrink-0 opacity-80" />
              </div>
              <div className="text-2xl sm:text-3xl font-mono font-black text-white tracking-tight mb-1">
                {c.value}
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
                <span>{c.raw}</span>
              </div>
              <div className="mt-2 text-[9px] font-mono text-zinc-500 leading-tight">
                {c.subtext}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
