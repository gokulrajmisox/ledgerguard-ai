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
import { Layers, Table2, ShieldAlert, Terminal, RefreshCw, Eye } from "lucide-react";
import { motion } from "framer-motion";

export default function ConsolePage() {
  const { cases, invoices, purchaseOrders, selectedCaseId, setSelectedCaseId } = useAppStore();
  const [viewMode, setViewMode] = useState<"graph" | "table">("graph");
  const [highlightCaseId, setHighlightCaseId] = useState<string>("case-01");

  return (
    <div className="min-h-screen flex flex-col bg-ivory text-espresso">
      <Navbar />

      <div className="flex-1 flex pt-16">
        {/* Left Sidebar */}
        <Sidebar />

        {/* Main Command Center Workspace */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full overflow-hidden">
          {/* Workspace Title & View Mode Toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#D7D0C9]">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#6F4E37]" />
                <span className="text-xs font-mono uppercase tracking-widest text-[#6F4E37] font-bold">
                  INTELLIGENCE COMMAND CENTER
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold serif-display text-espresso tracking-tight">
                Reconciliation Matrix & Forensics
              </h1>
              <p className="text-sm text-[#5C4F47] mt-0.5">
                Deterministic 3-way correlation topology, anomalous document forensics, and live settlement holds
              </p>
            </div>

            {/* View Mode Toggle: 3D Graph vs 2D Table */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white border border-[#D7D0C9] shadow-sm text-xs font-mono">
              <button
                onClick={() => setViewMode("graph")}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-bold transition-all ${
                  viewMode === "graph"
                    ? "bg-[#6F4E37] text-white shadow-sm"
                    : "text-[#30231D] hover:bg-[#F7F5F1]"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>3D Evidence Network</span>
              </button>
              <button
                onClick={() => setViewMode("table")}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-bold transition-all ${
                  viewMode === "table"
                    ? "bg-[#6F4E37] text-white shadow-sm"
                    : "text-[#30231D] hover:bg-[#F7F5F1]"
                }`}
              >
                <Table2 className="w-3.5 h-3.5" />
                <span>Conventional Table</span>
              </button>
            </div>
          </div>

          {/* Financial Summary 5-Card Grid */}
          <FinancialMetricsGrid />

          {/* Primary Visualization Workspace */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-[#5C4F47]">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#6F4E37]" />
                <span className="uppercase text-espresso font-bold">
                  {viewMode === "graph"
                    ? "Interactive 3D Financial Evidence Topology"
                    : "High-Density Financial Ledger Grid"}
                </span>
              </div>
              <span className="text-[11px] font-semibold text-[#5C4F47] hidden sm:inline">
                {viewMode === "graph"
                  ? "DRAG TO ROTATE • SCROLL TO ZOOM • CLICK NODE TO INSPECT"
                  : "STICKY HEADERS • FILTERABLE BY RISK"}
              </span>
            </div>

            {viewMode === "graph" ? (
              <div className="rounded-xl overflow-hidden border border-[#D7D0C9] shadow-md bg-[#1C1613]">
                <Console3DGraphClient
                  highlightCaseId={highlightCaseId}
                  onSelectNode={(node) => {
                    if (node.id === "case-01" || node.id === "inv-01") {
                      setSelectedCaseId("case-01");
                    }
                  }}
                />
              </div>
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
