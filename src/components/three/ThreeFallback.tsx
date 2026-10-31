"use client";

import React, { useState } from "react";
import { ShieldAlert, CheckCircle2, Building2, FileText, ArrowRight } from "lucide-react";

interface FallbackNode {
  id: string;
  label: string;
  type: string;
  amount: string;
  status: "verified" | "discrepant" | "held";
  finding: string;
}

const FALLBACK_NODES: FallbackNode[] = [
  {
    id: "inv-88219",
    label: "Invoice INV-88219",
    type: "Discrepant Invoice",
    amount: "$84,950.00",
    status: "discrepant",
    finding: "Altered total: PO authorized $64,950.00 (+30.8% variance). Raster font anomaly.",
  },
  {
    id: "po-912",
    label: "PO-2024-912",
    type: "Purchase Order",
    amount: "$64,950.00",
    status: "verified",
    finding: "Signed contract rate with 3 approved line items by VP Engineering.",
  },
  {
    id: "vnd-01",
    label: "Apex Heavy Systems",
    type: "Vendor Entity",
    amount: "Vendor Master",
    status: "discrepant",
    finding: "PDF metadata modified with third-party editor 14 minutes prior to ingestion.",
  },
  {
    id: "txn-01",
    label: "WIRE-9901",
    type: "Bank Settlement",
    amount: "$84,950.00",
    status: "held",
    finding: "Automated Treasury hold triggered. Disputed $20,000 diverted to escrow.",
  },
];

export function ThreeFallback({ onSelectNode }: { onSelectNode?: (node: any) => void }) {
  const [activeNode, setActiveNode] = useState<FallbackNode>(FALLBACK_NODES[0]);

  return (
    <div className="w-full h-full min-h-[480px] flex flex-col justify-between p-6 bg-[#0a0a0e] border border-white/10 rounded-2xl relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grain opacity-50" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between pb-4 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00ff87]" />
          <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
            EVIDENCE NETWORK DIAGRAM (2D PRECISION FALLBACK)
          </span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
          REDUCED MOTION COMPLIANT
        </span>
      </div>

      {/* Interactive Node Graph Map */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
        {FALLBACK_NODES.map((node) => {
          const isSelected = activeNode.id === node.id;
          const statusBg =
            node.status === "discrepant"
              ? "border-[#ff3355]/40 bg-[#ff3355]/10 text-[#ff3355]"
              : node.status === "held"
              ? "border-[#f59e0b]/40 bg-[#f59e0b]/10 text-[#f59e0b]"
              : "border-[#00ff87]/40 bg-[#00ff87]/10 text-[#00ff87]";

          return (
            <button
              key={node.id}
              onClick={() => {
                setActiveNode(node);
                if (onSelectNode) onSelectNode(node);
              }}
              className={`p-4 rounded-xl text-left transition-all border ${
                isSelected
                  ? "border-white/30 bg-white/[0.08] shadow-lg"
                  : "border-white/[0.06] bg-black/40 hover:bg-white/[0.04]"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-zinc-400">{node.type}</span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${statusBg}`}>
                  {node.status}
                </span>
              </div>
              <h4 className="text-sm font-bold text-white mb-1">{node.label}</h4>
              <div className="text-xs font-mono text-zinc-300 font-semibold">{node.amount}</div>
            </button>
          );
        })}
      </div>

      {/* Selected Node Details */}
      <div className="relative z-10 p-4 rounded-xl border border-white/10 bg-black/60 backdrop-blur-md">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-mono text-[#00ff87] font-semibold">
            {activeNode.label} • ACTIVE INSPECTION
          </span>
          <span className="text-[11px] font-mono text-zinc-400">{activeNode.amount}</span>
        </div>
        <p className="text-xs text-zinc-300 font-mono leading-relaxed">{activeNode.finding}</p>
      </div>
    </div>
  );
}
