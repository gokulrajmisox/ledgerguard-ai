"use client";

import React, { useState } from "react";
import {
  Building2,
  FileText,
  FileCheck2,
  PackageCheck,
  Landmark,
  SearchCode,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { REPLAY_STEPS } from "./InvestigationReplayTimeline";

interface GraphCanvasNode {
  id: string;
  label: string;
  sublabel: string;
  type: "vendor" | "invoice" | "po" | "receipt" | "bank" | "forensic" | "decision";
  amount?: string;
  status: "verified" | "discrepant" | "held" | "neutral";
  details: string;
  x: number; // percentage
  y: number; // percentage
}

const GRAPH_NODES: GraphCanvasNode[] = [
  {
    id: "node-vendor",
    label: "Vendor Entity",
    sublabel: "Apex Heavy Systems Inc.",
    type: "vendor",
    status: "verified",
    details: "Tax ID XX-9912048 • Verified master vendor with recent PDF metadata discrepancy",
    x: 15,
    y: 20,
  },
  {
    id: "node-invoice",
    label: "Invoice Specimen",
    sublabel: "INV-88219 ($84,950.00)",
    type: "invoice",
    amount: "$84,950.00",
    status: "discrepant",
    details: "Billed rate exceeds authorized PO by +$20,000.00 (+30.8%). Altered grand total glyph.",
    x: 45,
    y: 20,
  },
  {
    id: "node-po",
    label: "Purchase Order",
    sublabel: "PO-2024-912 ($64,950.00)",
    type: "po",
    amount: "$64,950.00",
    status: "verified",
    details: "Authorized contractual expenditure ceiling: 2 actuators @ $22k, 5 valves, freight",
    x: 75,
    y: 20,
  },
  {
    id: "node-receipt",
    label: "Goods Receipt",
    sublabel: "GR-9912 Verified",
    type: "receipt",
    status: "verified",
    details: "Loading dock confirmed receipt of 2 physical actuators & 5 servo regulators",
    x: 75,
    y: 70,
  },
  {
    id: "node-bank",
    label: "Bank Settlement",
    sublabel: "WIRE-9901 ($84,950.00)",
    type: "bank",
    amount: "$84,950.00 (HELD)",
    status: "held",
    details: "Automated treasury hold placed in ERP settlement spooler pending audit sign-off",
    x: 45,
    y: 70,
  },
  {
    id: "node-forensic",
    label: "Forensic Finding",
    sublabel: "Font Kerning & ELA Anomaly",
    type: "forensic",
    status: "discrepant",
    details: "Glyph baseline offset +1.8px on digit '8'; localized DCT re-compression spikes",
    x: 15,
    y: 70,
  },
  {
    id: "node-decision",
    label: "Reviewer Decision",
    sublabel: "Provisional Escrow Approved",
    type: "decision",
    amount: "Escrow: $20,000",
    status: "verified",
    details: "Lead Auditor Jonathan Hayes signed partial settlement with $20k escrow hold",
    x: 45,
    y: 45,
  },
];

export function EvidenceGraphCanvas({ activeStep }: { activeStep: number }) {
  const currentStepData = REPLAY_STEPS[activeStep - 1] || REPLAY_STEPS[0];
  const activeNodeIds = currentStepData.activeNodeIds;
  const [selectedNode, setSelectedNode] = useState<GraphCanvasNode>(GRAPH_NODES[1]);

  return (
    <div className="rounded-2xl border border-white/10 bg-[#07070a] p-6 shadow-2xl relative min-h-[500px] flex flex-col justify-between overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 tech-grid opacity-40 pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between pb-4 border-b border-white/10 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00ff87]" />
          <span className="text-white font-bold uppercase tracking-wider">
            Navigable Evidence Relationship Graph
          </span>
        </div>
        <span className="text-[10px] text-zinc-400">
          REPLAY STEP: <span className="text-[#00ff87] font-bold">{currentStepData.title}</span>
        </span>
      </div>

      {/* Interactive 2D Graph Map */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
        {GRAPH_NODES.map((node) => {
          const isActiveInReplay = activeNodeIds.includes(node.id);
          const isSelected = selectedNode.id === node.id;

          const statusBadge =
            node.status === "discrepant"
              ? "text-[#ff3355] border-[#ff3355]/40 bg-[#ff3355]/10"
              : node.status === "held"
              ? "text-[#f59e0b] border-[#f59e0b]/40 bg-[#f59e0b]/10"
              : "text-[#00ff87] border-[#00ff87]/40 bg-[#00ff87]/10";

          return (
            <button
              key={node.id}
              onClick={() => setSelectedNode(node)}
              className={`p-4 rounded-xl text-left transition-all border font-mono ${
                isSelected
                  ? "border-white/40 bg-white/[0.08] shadow-xl"
                  : isActiveInReplay
                  ? "border-[#00ff87]/60 bg-[#00ff87]/5 shadow-[0_0_20px_rgba(0,255,135,0.15)]"
                  : "border-white/[0.06] bg-black/50 hover:bg-white/[0.02] opacity-80"
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] text-zinc-400 uppercase">{node.label}</span>
                <span className={`text-[9px] px-2 py-0.5 rounded-full border ${statusBadge}`}>
                  {node.status}
                </span>
              </div>
              <h4 className="text-sm font-bold text-white mb-1">{node.sublabel}</h4>
              {node.amount && (
                <div className="text-xs font-bold text-[#00ff87] mb-1">{node.amount}</div>
              )}
              <p className="text-[10px] text-zinc-400 line-clamp-2 leading-relaxed">
                {node.details}
              </p>
            </button>
          );
        })}
      </div>

      {/* Selected Node Details Drawer */}
      <div className="relative z-10 p-4 rounded-xl border border-white/10 bg-[#0e0e14] backdrop-blur-md text-xs font-mono">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="text-zinc-400 uppercase text-[10px]">SELECTED NODE INSPECTION:</span>
            <span className="text-white font-bold">{selectedNode.label}</span>
          </div>
          <span className="text-[#00ff87] font-semibold">{selectedNode.sublabel}</span>
        </div>
        <p className="text-zinc-300 leading-relaxed text-[11px]">{selectedNode.details}</p>
      </div>
    </div>
  );
}
