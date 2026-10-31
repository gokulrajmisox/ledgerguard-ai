"use client";

import React from "react";
import { PipelineStage } from "@/types";
import {
  FileText,
  Scan,
  GitMerge,
  SearchCode,
  ShieldAlert,
  Sliders,
  Lock,
  ArrowRight,
  CheckCircle2,
  Clock,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";

export function PipelineStageFlow({
  stages,
  selectedStageId,
  onSelectStage,
}: {
  stages: PipelineStage[];
  selectedStageId: string;
  onSelectStage: (stage: PipelineStage) => void;
}) {
  const getStageIcon = (order: number) => {
    switch (order) {
      case 1:
        return FileText;
      case 2:
        return Scan;
      case 3:
        return GitMerge;
      case 4:
        return SearchCode;
      case 5:
        return ShieldAlert;
      case 6:
        return Sliders;
      case 7:
        return Lock;
      default:
        return FileText;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
        <span className="uppercase text-white font-semibold">
          Autonomous Investigation Pipeline Stages (7 Stages)
        </span>
        <span>SELECT MODULE TO INSPECT TELEMETRY & PAYLOADS</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-3">
        {stages.map((stg) => {
          const isSelected = selectedStageId === stg.id;
          const Icon = getStageIcon(stg.order);

          const statusColor =
            stg.status === "completed"
              ? "bg-[#00ff87]/20 text-[#00ff87] border-[#00ff87]/40"
              : stg.status === "running"
              ? "bg-[#00e5ff]/20 text-[#00e5ff] border-[#00e5ff]/40"
              : stg.status === "needs_review"
              ? "bg-[#ff3355]/20 text-[#ff3355] border-[#ff3355]/40"
              : "bg-zinc-800 text-zinc-400 border-white/5";

          return (
            <button
              key={stg.id}
              onClick={() => onSelectStage(stg)}
              className={`p-4 rounded-xl text-left transition-all border font-mono flex flex-col justify-between ${
                isSelected
                  ? "bg-white/[0.08] border-white/40 shadow-xl"
                  : "bg-[#0c0c14] border-white/10 hover:border-white/20 hover:bg-white/[0.02]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] text-zinc-500 font-bold">STAGE {stg.order}</span>
                  <span
                    className={`text-[8px] px-1.5 py-0.2 rounded uppercase font-bold border ${statusColor}`}
                  >
                    {stg.status.replace("_", " ")}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <Icon className="w-4 h-4 text-[#00ff87]" />
                  <h4 className="text-xs font-bold text-white uppercase">{stg.name}</h4>
                </div>

                <div className="text-[10px] text-zinc-400 mb-2 truncate">{stg.agentName}</div>
              </div>

              <div className="pt-2 border-t border-white/5 space-y-1 text-[9px] text-zinc-500">
                <div className="flex justify-between">
                  <span>Latency:</span>
                  <span className="text-white font-semibold">
                    {stg.latencyMs > 0 ? `${stg.latencyMs}ms` : "Pending"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Processed:</span>
                  <span className="text-white">{stg.recordsProcessed}</span>
                </div>
                {stg.anomaliesDetected > 0 && (
                  <div className="flex justify-between text-[#ff3355] font-bold">
                    <span>Anomalies:</span>
                    <span>{stg.anomaliesDetected}</span>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
