"use client";

import React from "react";
import { ShieldCheck, Zap, Activity, CheckCircle2, Lock } from "lucide-react";

export function MetricsTicker() {
  const metrics = [
    {
      label: "3-Way Matching Precision",
      value: "99.8%",
      caption: "Deterministic line-item cross verification",
      icon: CheckCircle2,
      accent: "text-[#00ff87]",
    },
    {
      label: "Anomaly Catch Rate",
      value: "98.9%",
      caption: "Raster alteration & duplicate detection",
      icon: ShieldCheck,
      accent: "text-[#00ff87]",
    },
    {
      label: "False Positive Rate",
      value: "0.42%",
      caption: "Minimizing manual auditor friction",
      icon: Activity,
      accent: "text-[#00e5ff]",
    },
    {
      label: "Avg Pipeline Latency",
      value: "1.24s",
      caption: "Ingest to cryptographic commit",
      icon: Zap,
      accent: "text-[#f59e0b]",
    },
  ];

  return (
    <section className="py-12 border-y border-white/[0.08] bg-[#07070a] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.label}
                className="p-5 rounded-xl border border-white/[0.06] bg-black/40 backdrop-blur-sm relative group hover:border-white/15 transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                    {m.label}
                  </span>
                  <Icon className={`w-4 h-4 ${m.accent}`} />
                </div>
                <div className="text-3xl sm:text-4xl font-mono font-black text-white tracking-tight mb-1">
                  {m.value}
                </div>
                <p className="text-[11px] font-mono text-zinc-500 leading-tight">
                  {m.caption}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
