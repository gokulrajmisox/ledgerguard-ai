"use client";

import React, { useState, useEffect } from "react";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  RotateCcw,
  CheckCircle2,
  Clock,
  FileText,
  Scan,
  GitMerge,
  Search,
  BrainCircuit,
  Lock,
} from "lucide-react";

export interface ReplayEvent {
  step: number;
  title: string;
  timestamp: string;
  category: string;
  summary: string;
  activeNodeIds: string[];
  evidencePayload: Record<string, string>;
}

export const REPLAY_STEPS: ReplayEvent[] = [
  {
    step: 1,
    title: "1. Document Received",
    timestamp: "09:40:12 UTC",
    category: "Ingestion",
    summary:
      "SFTP payload intake worker received binary PDF (INV-88219.pdf, 1.2 MB). Cryptographic SHA-256 digest generated: 9f8e81b2a75d9e9e1c2b.",
    activeNodeIds: ["node-vendor", "node-invoice"],
    evidencePayload: {
      "Source Channel": "Vendor SFTP Spooler",
      "File Format": "application/pdf (Rasterized 300 DPI)",
      "Digest Seal": "SHA-256 0x9f8e...8c9b",
    },
  },
  {
    step: 2,
    title: "2. Fields Extracted",
    timestamp: "09:40:35 UTC",
    category: "OCR & Spatial Layout",
    summary:
      "Neural OCR parsed 34 key-value tokens: Billed Total $84,950.00, Tax $6,450.00, PO Ref PO-2024-912, 3 line items.",
    activeNodeIds: ["node-invoice"],
    evidencePayload: {
      "OCR Engine": "LayoutLM Forensics v2",
      "Field Confidence": "99.2% token mean",
      "Billed Total": "$84,950.00 USD",
    },
  },
  {
    step: 3,
    title: "3. Matching Records Identified",
    timestamp: "09:41:05 UTC",
    category: "3-Way Reconciliation",
    summary:
      "Deterministic 3-way reconciliation linked invoice to authorized Purchase Order PO-2024-912 and scheduled Treasury wire WIRE-9901.",
    activeNodeIds: ["node-invoice", "node-po", "node-receipt", "node-bank"],
    evidencePayload: {
      "Purchase Order": "PO-2024-912 ($64,950.00 Authorized)",
      "Goods Receipt": "GR-9912 (Warehouse loading dock signed)",
      "Bank Record": "WIRE-20241014-9901 Scheduled",
    },
  },
  {
    step: 4,
    title: "4. Discrepancy Detected",
    timestamp: "09:41:22 UTC",
    category: "Variance Engine",
    summary:
      "Financial ceiling breach flagged: Invoiced total of $84,950.00 exceeds approved PO ($64,950.00) by +$20,000.00 (+30.8%). Unit rate for Actuators inflated from $22k to $28k.",
    activeNodeIds: ["node-invoice", "node-po"],
    evidencePayload: {
      "Monetary Delta": "+$20,000.00 variance",
      "Line Variance": "Hydraulic Actuators rate +27.2%",
      "Rule Triggered": "ERP Policy FIN-SEC-402",
    },
  },
  {
    step: 5,
    title: "5. Evidence Collected",
    timestamp: "09:42:18 UTC",
    category: "Computer Vision Forensics",
    summary:
      "Error Level Analysis (ELA) and PDF text stream inspection isolate font kerning anomaly on digit '8' ($84,950) with 1.8px baseline shift and conflicting PDF modification timestamp.",
    activeNodeIds: ["node-invoice", "node-forensic"],
    evidencePayload: {
      "Vision Finding": "DCT quantization anomaly (Conf 0.94)",
      "Text Stream Divergence": "[(22,000)] TJ vs $28,000 raster",
      "PDF ModDate": "Modified 14m prior via PDF-XChange",
    },
  },
  {
    step: 6,
    title: "6. Recommendation Generated",
    timestamp: "09:42:40 UTC",
    category: "Policy Agent",
    summary:
      "Autonomous policy agent formulates resolution dossier: Authorize provisional payment of contract rate ($64,950) while holding disputed $20,000 in escrow. Issue vendor RFI.",
    activeNodeIds: ["node-forensic", "node-decision"],
    evidencePayload: {
      "Recommended Action": "Provisional PO Settlement with Escrow",
      "Escrow Amount": "$20,000.00 USD",
      "Required Signoff": "Dual Level 2 Forensic + Treasury",
    },
  },
  {
    step: 7,
    title: "7. Human Decision Recorded",
    timestamp: "11:20:00 UTC",
    category: "Governance Sign-off",
    summary:
      "Lead Auditor Jonathan Hayes authorized escrow resolution. Cryptographic Merkle block 0x20f9a88e committed to immutable ledger.",
    activeNodeIds: ["node-decision", "node-bank"],
    evidencePayload: {
      "Auditor Signoff": "Jonathan Hayes (Senior Auditor)",
      "Governance Action": "Escrow Hold Confirmed",
      "Merkle Block Hash": "0x20f9a88e1bc55702",
    },
  },
];

export function InvestigationReplayTimeline({
  activeStep,
  onStepChange,
}: {
  activeStep: number;
  onStepChange: (step: number) => void;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        onStepChange((activeStep % REPLAY_STEPS.length) + 1);
      }, 3500 / playbackSpeed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, activeStep, playbackSpeed, onStepChange]);

  const currentEvent = REPLAY_STEPS[activeStep - 1] || REPLAY_STEPS[0];

  return (
    <div className="rounded-xl border border-white/10 bg-[#0c0c14] p-5 space-y-5 shadow-2xl">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-white/10 text-xs font-mono">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#00ff87]" />
          <span className="font-bold text-white uppercase tracking-wider">
            Investigation Replay Scrubbing Engine
          </span>
        </div>

        {/* Media Transport Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onStepChange(Math.max(1, activeStep - 1))}
            disabled={activeStep === 1}
            className="p-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 disabled:opacity-40"
            title="Step Back"
          >
            <SkipBack className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-3 py-1.5 rounded bg-[#00ff87] text-black font-bold flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,255,135,0.3)]"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? "Pause" : "Play"}</span>
          </button>
          <button
            onClick={() => onStepChange(Math.min(REPLAY_STEPS.length, activeStep + 1))}
            disabled={activeStep === REPLAY_STEPS.length}
            className="p-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 disabled:opacity-40"
            title="Step Forward"
          >
            <SkipForward className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => onStepChange(1)}
            className="p-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 ml-1"
            title="Restart Replay"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center gap-1 ml-2 text-[10px]">
            <button
              onClick={() => setPlaybackSpeed(1)}
              className={`px-1.5 py-0.5 rounded ${
                playbackSpeed === 1 ? "bg-white/20 text-white" : "text-zinc-500"
              }`}
            >
              1x
            </button>
            <button
              onClick={() => setPlaybackSpeed(2)}
              className={`px-1.5 py-0.5 rounded ${
                playbackSpeed === 2 ? "bg-white/20 text-white" : "text-zinc-500"
              }`}
            >
              2x
            </button>
          </div>
        </div>
      </div>

      {/* Stepper Dots Bar */}
      <div className="grid grid-cols-7 gap-2">
        {REPLAY_STEPS.map((step) => {
          const isCurrent = activeStep === step.step;
          const isPast = activeStep >= step.step;
          return (
            <button
              key={step.step}
              onClick={() => onStepChange(step.step)}
              className={`p-2 rounded-lg text-left transition-all border font-mono ${
                isCurrent
                  ? "bg-[#00ff87]/15 border-[#00ff87] text-white shadow-[0_0_15px_rgba(0,255,135,0.2)]"
                  : isPast
                  ? "bg-zinc-900 border-white/10 text-zinc-300"
                  : "bg-black/40 border-white/5 text-zinc-600"
              }`}
            >
              <div className="text-[10px] text-zinc-400 font-bold mb-0.5">STEP {step.step}</div>
              <div className="text-[11px] font-semibold truncate text-white">
                {step.title.split(". ")[1]}
              </div>
            </button>
          );
        })}
      </div>

      {/* Current Step Detailed Card */}
      <div className="p-4 rounded-xl border border-white/10 bg-black/60 space-y-3 font-mono text-xs">
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00ff87] animate-ping" />
            <span className="font-bold text-white text-sm">{currentEvent.title}</span>
            <span className="text-zinc-500">•</span>
            <span className="text-[#00ff87]">{currentEvent.category}</span>
          </div>
          <span className="text-zinc-400">{currentEvent.timestamp}</span>
        </div>

        <p className="text-zinc-300 leading-relaxed text-[11px]">{currentEvent.summary}</p>

        {/* Evidence Payload Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
          {Object.entries(currentEvent.evidencePayload).map(([key, val]) => (
            <div key={key} className="p-2.5 rounded bg-zinc-900 border border-white/5">
              <span className="text-zinc-500 text-[9px] block uppercase">{key}</span>
              <span className="text-white font-semibold text-[11px] truncate block">{val}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
