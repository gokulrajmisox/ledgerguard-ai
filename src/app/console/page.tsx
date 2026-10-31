"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { FinancialMetricsGrid } from "@/components/console/FinancialMetricsGrid";
import { Console3DGraphClient } from "@/components/three/Console3DGraphClient";
import { ConventionalTableView } from "@/components/console/ConventionalTableView";
import { InvestigationQueueCard } from "@/components/console/InvestigationQueueCard";
import { RecentActivityFeed } from "@/components/console/RecentActivityFeed";
import { useAppStore } from "@/lib/store";
import { Layers, Table2, ShieldAlert, Terminal, RefreshCw } from "lucide-react";

export default function ConsolePage() {
  const { cases, invoices, purchaseOrders, selectedCaseId, setSelectedCaseId } = useAppStore();
  const [viewMode, setViewMode] = useState<"graph" | "table">("graph");
  const [highlightCaseId, setHighlightCaseId] = useState<string>("case-01");

  return (
    <div className="min-h-screen flex flex-col bg-[#070709] text-[#f4f4f7]">
      <Navbar />

      <div className="flex-1 flex pt-16">
        {/* Left Sidebar */}
        <Sidebar />

        {/* Main Command Center Workspace */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full overflow-hidden">
          {/* Workspace Title & View Mode Toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-[#00ff87]" />
                <span className="text-xs font-mono uppercase tracking-widest text-[#00ff87]">
                  INTELLIGENCE COMMAND CENTER
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                Reconciliation Matrix & Forensics
              </h1>
            </div>

            {/* View Mode Toggle: 3D Graph vs 2D Table */}
            <div className="flex items-center gap-1 p-1 rounded-lg bg-black/60 border border-white/10 text-xs font-mono">
              <button
                onClick={() => setViewMode("graph")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-all ${
                  viewMode === "graph"
                    ? "bg-[#00ff87] text-black font-bold shadow-[0_0_15px_rgba(0,255,135,0.3)]"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>3D Evidence Network</span>
              </button>
              <button
                onClick={() => setViewMode("table")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-all ${
                  viewMode === "table"
                    ? "bg-[#00ff87] text-black font-bold shadow-[0_0_15px_rgba(0,255,135,0.3)]"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Table2 className="w-3.5 h-3.5" />
                <span>Conventional List View</span>
              </button>
            </div>
          </div>

          {/* Financial Summary 5-Card Grid */}
          <FinancialMetricsGrid />

          {/* Primary Visualization Workspace */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#00ff87]" />
                <span className="uppercase text-white font-semibold">
                  {viewMode === "graph"
                    ? "Interactive 3D Financial Evidence Topology"
                    : "High-Density Financial Ledger Grid"}
                </span>
              </div>
              <span className="text-[11px] text-zinc-500">
                {viewMode === "graph"
                  ? "DRAG TO ROTATE • SCROLL TO ZOOM • CLICK NODE TO INSPECT"
                  : "STICKY HEADERS • FILTERABLE BY RISK"}
              </span>
            </div>

            {viewMode === "graph" ? (
              <Console3DGraphClient
                highlightCaseId={highlightCaseId}
                onSelectNode={(node) => {
                  if (node.id === "case-01" || node.id === "inv-01") {
                    setSelectedCaseId("case-01");
                  }
                }}
              />
            ) : (
              <ConventionalTableView
                invoices={invoices}
                purchaseOrders={purchaseOrders}
              />
            )}
          </div>

          {/* Bottom Dual Panels: Investigation Queue & Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
            <div className="lg:col-span-7">
              <InvestigationQueueCard
                cases={cases}
                selectedCaseId={selectedCaseId}
                onSelectCase={(c) => {
                  setSelectedCaseId(c.id);
                  setHighlightCaseId(c.id);
                }}
              />
            </div>
            <div className="lg:col-span-5">
              <RecentActivityFeed />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
