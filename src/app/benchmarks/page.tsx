"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { BenchmarkCharts } from "@/components/benchmarks/BenchmarkCharts";
import { DEMO_BENCHMARKS } from "@/lib/demo-data";
import { BarChart3, Filter, ShieldCheck, Database, CheckCircle2 } from "lucide-react";

export default function BenchmarksPage() {
  const [selectedDocType, setSelectedDocType] = useState<string>("all");
  const [selectedScenario, setSelectedScenario] = useState<string>("v3.2");

  return (
    <div className="min-h-screen flex flex-col bg-[#070709] text-[#f4f4f7]">
      <Navbar />

      <div className="flex-1 flex pt-16">
        <Sidebar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full overflow-hidden">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-[#00ff87]" />
                <span className="text-xs font-mono uppercase tracking-widest text-[#00ff87]">
                  EMPIRICAL EVALUATION & RIGOR
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                Model Benchmarks & Test Results
              </h1>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
              <span className="px-3 py-1.5 rounded bg-zinc-900 border border-white/10 text-zinc-300">
                BENCHMARK CORPUS: <span className="text-[#00ff87] font-bold">12,500 TEST CASES</span>
              </span>
            </div>
          </div>

          {/* Dataset Explanation & Disclaimer */}
          <div className="p-4 rounded-xl border border-white/10 bg-[#0e0e14] font-mono text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Database className="w-4 h-4 text-[#00ff87] shrink-0" />
              <span className="text-zinc-300">
                Evaluation results are measured on the Synthetic Enterprise Stress Corpus v3.2,
                consisting of 12,500 labeled multi-page invoices with simulated clerical errors and
                digital alterations.
              </span>
            </div>
            <span className="text-[10px] text-zinc-500 uppercase shrink-0">
              GROUND TRUTH VERIFIED
            </span>
          </div>

          {/* Filters Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="text-zinc-500">DOCUMENT FORMAT:</span>
              <div className="flex items-center gap-1 p-1 rounded-lg bg-black/60 border border-white/10">
                {[
                  { id: "all", label: "All Formats" },
                  { id: "pdf", label: "Native PDF" },
                  { id: "scanned", label: "Degraded Scans" },
                  { id: "mobile", label: "Mobile Captures" },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setSelectedDocType(f.id)}
                    className={`px-2.5 py-1 rounded transition-all ${
                      selectedDocType === f.id
                        ? "bg-white/20 text-white font-bold"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-zinc-500">TEST SCENARIO:</span>
              <div className="flex items-center gap-1 p-1 rounded-lg bg-black/60 border border-white/10">
                {[
                  { id: "v3.2", label: "Stress Test v3.2 (Primary)" },
                  { id: "adversarial", label: "Adversarial Font Injections" },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedScenario(s.id)}
                    className={`px-2.5 py-1 rounded transition-all ${
                      selectedScenario === s.id
                        ? "bg-white/20 text-white font-bold"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Visual Benchmark Charts & Breakdown */}
          <BenchmarkCharts data={DEMO_BENCHMARKS} />
        </main>
      </div>
    </div>
  );
}
