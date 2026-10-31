"use client";

import React, { useState } from "react";
import { PipelineStage } from "@/types";
import { Terminal, Code, Cpu, Activity, Clock, ShieldCheck } from "lucide-react";

export function StageInspector({ stage }: { stage: PipelineStage }) {
  const [activeTab, setActiveTab] = useState<"logs" | "inputs" | "outputs">("logs");

  return (
    <div className="rounded-2xl border border-white/10 bg-[#07070a] p-6 shadow-2xl space-y-4 font-mono text-xs">
      {/* Inspector Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#00ff87]" />
            <span className="text-[10px] uppercase text-zinc-500">
              STAGE {stage.order} INSPECTOR:
            </span>
            <span className="text-white font-bold uppercase">{stage.name}</span>
          </div>
          <div className="text-xs text-zinc-400">{stage.agentName}</div>
        </div>

        {/* Tabs Switcher */}
        <div className="flex items-center gap-1 p-1 rounded-lg bg-black/60 border border-white/10 text-[11px]">
          <button
            onClick={() => setActiveTab("logs")}
            className={`px-3 py-1.5 rounded transition-all ${
              activeTab === "logs" ? "bg-white/20 text-white font-bold" : "text-zinc-400"
            }`}
          >
            Agent Logs ({stage.logs.length})
          </button>
          <button
            onClick={() => setActiveTab("inputs")}
            className={`px-3 py-1.5 rounded transition-all ${
              activeTab === "inputs" ? "bg-white/20 text-white font-bold" : "text-zinc-400"
            }`}
          >
            Input Payload
          </button>
          <button
            onClick={() => setActiveTab("outputs")}
            className={`px-3 py-1.5 rounded transition-all ${
              activeTab === "outputs" ? "bg-white/20 text-white font-bold" : "text-zinc-400"
            }`}
          >
            Output Schema
          </button>
        </div>
      </div>

      {/* Description */}
      <p className="text-zinc-300 leading-relaxed text-[11px] p-3 rounded-lg bg-white/[0.02] border border-white/5">
        {stage.description}
      </p>

      {/* Tab Panels */}
      {activeTab === "logs" && (
        <div className="p-4 rounded-xl bg-black border border-white/10 space-y-2 text-[11px] max-h-72 overflow-auto font-mono">
          <div className="text-zinc-500 text-[10px] uppercase pb-1 border-b border-white/5">
            EXECUTION STDOUT STREAM • REAL WORKFLOW STATE
          </div>
          {stage.logs.map((log, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <span className="text-[#00ff87] font-bold">›</span>
              <span className="text-zinc-300">{log}</span>
            </div>
          ))}
        </div>
      )}

      {activeTab === "inputs" && (
        <div className="p-4 rounded-xl bg-black border border-white/10 text-[11px] max-h-72 overflow-auto">
          <pre className="text-[#00e5ff] whitespace-pre-wrap">
            {JSON.stringify(stage.inputsSample, null, 2)}
          </pre>
        </div>
      )}

      {activeTab === "outputs" && (
        <div className="p-4 rounded-xl bg-black border border-white/10 text-[11px] max-h-72 overflow-auto">
          <pre className="text-[#00ff87] whitespace-pre-wrap">
            {JSON.stringify(stage.outputsSample, null, 2)}
          </pre>
        </div>
      )}

      {/* Telemetry Footer */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-[10px] text-zinc-500">
        <div>
          <span>LATENCY: </span>
          <span className="text-white font-bold">{stage.latencyMs}ms</span>
        </div>
        <div>
          <span>BATCH RECORDS: </span>
          <span className="text-white font-bold">{stage.recordsProcessed}</span>
        </div>
        <div>
          <span>ANOMALY FLAGS: </span>
          <span className="text-[#ff3355] font-bold">{stage.anomaliesDetected}</span>
        </div>
        <div>
          <span>STATE: </span>
          <span className="text-[#00ff87] font-bold uppercase">{stage.status}</span>
        </div>
      </div>
    </div>
  );
}
