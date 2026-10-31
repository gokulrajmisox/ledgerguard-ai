"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { PipelineStageFlow } from "@/components/mission-control/PipelineStageFlow";
import { StageInspector } from "@/components/mission-control/StageInspector";
import { useAppStore } from "@/lib/store";
import { Cpu, Activity, ShieldCheck, Zap, GitFork } from "lucide-react";

export default function MissionControlPage() {
  const { pipelineStages } = useAppStore();
  const [selectedStageId, setSelectedStageId] = useState<string>("stg-04");

  const currentStage =
    pipelineStages.find((s) => s.id === selectedStageId) || pipelineStages[3];

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
                  AGENT ORCHESTRATION ARCHITECTURE
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                Agent Mission Control Matrix
              </h1>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="px-3 py-1.5 rounded bg-zinc-900 border border-white/10 text-zinc-300">
                ACTIVE AGENT FLEET: <span className="text-[#00ff87] font-bold">5 Workers</span>
              </span>
            </div>
          </div>

          {/* 7 Connected Stages Pipeline */}
          <PipelineStageFlow
            stages={pipelineStages}
            selectedStageId={selectedStageId}
            onSelectStage={(stg) => setSelectedStageId(stg.id)}
          />

          {/* Detailed Selected Stage Inspector */}
          <StageInspector stage={currentStage} />

          {/* Multi-Agent Coordination Telemetry Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl border border-white/10 bg-[#0c0c14] font-mono text-xs space-y-2">
              <div className="flex items-center justify-between text-zinc-400">
                <span className="uppercase text-white font-bold">Extraction Kernel</span>
                <span className="text-[#00ff87]">99.4% Precision</span>
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                LayoutLM Forensics tokenizes multi-page corporate PDFs with spatial bounding box
                normalization and OCR baseline stabilization.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-white/10 bg-[#0c0c14] font-mono text-xs space-y-2">
              <div className="flex items-center justify-between text-zinc-400">
                <span className="uppercase text-white font-bold">3-Way Deterministic Matcher</span>
                <span className="text-[#00ff87]">0% False Negatives</span>
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                Cross-references Purchase Order authorizations, ERP inventory receipts, and bank wire
                instructions with exact dollar matching.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-white/10 bg-[#0c0c14] font-mono text-xs space-y-2">
              <div className="flex items-center justify-between text-zinc-400">
                <span className="uppercase text-white font-bold">Merkle Cryptographic Ledger</span>
                <span className="text-[#00ff87]">SOX-404 Compliant</span>
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                Every agent proposal and human approval is sealed into an immutable block sequence for
                court-admissible audit trails.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
