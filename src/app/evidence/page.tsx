"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { EvidenceGraphCanvas } from "@/components/evidence/EvidenceGraphCanvas";
import { InvestigationReplayTimeline } from "@/components/evidence/InvestigationReplayTimeline";
import { Layers, Clock, ShieldAlert, Sparkles } from "lucide-react";
import { useAppStore } from "@/lib/store";

export default function EvidenceReplayPage() {
  const { cases } = useAppStore();
  const [activeStep, setActiveStep] = useState<number>(1);
  const [selectedCaseId, setSelectedCaseId] = useState<string>("case-01");

  const currentCase = cases.find((c) => c.id === selectedCaseId) || cases[0];

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
                  NAVIGABLE EVIDENCE TOPOLOGY & REPLAY
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                Investigation Provenance & Timeline Replay
              </h1>
            </div>

            {/* Case Selector */}
            <div className="flex items-center gap-2 p-1 rounded-lg bg-black/60 border border-white/10 text-xs font-mono">
              <span className="text-zinc-500 px-2">CASE:</span>
              {cases.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCaseId(c.id)}
                  className={`px-2.5 py-1 rounded transition-all ${
                    selectedCaseId === c.id
                      ? "bg-[#00ff87] text-black font-bold"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {c.caseNumber}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Evidence Graph */}
          <EvidenceGraphCanvas activeStep={activeStep} />

          {/* 7-Step Investigation Replay Timeline */}
          <InvestigationReplayTimeline
            activeStep={activeStep}
            onStepChange={(step) => setActiveStep(step)}
          />
        </main>
      </div>
    </div>
  );
}
