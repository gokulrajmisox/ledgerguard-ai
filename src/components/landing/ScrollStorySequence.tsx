"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Scan,
  GitMerge,
  Search,
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  ArrowRight,
  ShieldCheck,
  FileCheck,
  Lock,
  Layers,
} from "lucide-react";
import Link from "next/link";

interface SceneStep {
  id: string;
  number: string;
  title: string;
  subtitle: string;
}

const SCENES: SceneStep[] = [
  {
    id: "ingest",
    number: "01",
    title: "Ingest",
    subtitle: "Document enters workspace; high-precision spatial OCR extractions initiate.",
  },
  {
    id: "reconcile",
    number: "02",
    title: "Reconcile",
    subtitle: "3-Way matching engine correlates invoice against purchase order and bank feed.",
  },
  {
    id: "investigate",
    number: "03",
    title: "Investigate",
    subtitle: "Forensic vision models detect anomalous font weight and baseline compression.",
  },
  {
    id: "resolve",
    number: "04",
    title: "Resolve",
    subtitle: "Autonomous agent proposes an evidence-backed settlement and escrow policy.",
  },
  {
    id: "verify",
    number: "05",
    title: "Verify",
    subtitle: "Cryptographic Merkle audit trail records detection and human auditor sign-off.",
  },
];

export function ScrollStorySequence() {
  const [activeScene, setActiveScene] = useState<number>(0);

  return (
    <section id="story" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/[0.08] bg-[#07070a] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#00ff87]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#00ff87]">
                SCROLL-DRIVEN PRODUCT STORY
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white tracking-tight">
              From Raw Ingest to Verified Audit
            </h2>
          </div>
          <p className="text-xs font-mono text-zinc-400 max-w-sm mt-4 md:mt-0 leading-relaxed">
            Experience the automated pipeline step-by-step: document intake, deterministic 3-way
            matching, neural raster forensics, resolution planning, and tamper-proof verification.
          </p>
        </div>

        {/* Scene Progress Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-10">
          {SCENES.map((scene, idx) => {
            const isActive = activeScene === idx;
            return (
              <button
                key={scene.id}
                onClick={() => setActiveScene(idx)}
                className={`p-3.5 rounded-xl text-left transition-all border ${
                  isActive
                    ? "bg-white/[0.08] border-[#00ff87]/50 shadow-[0_0_20px_rgba(0,255,135,0.15)]"
                    : "bg-black/40 border-white/[0.06] hover:bg-white/[0.03] opacity-60 hover:opacity-100"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`text-xs font-mono font-bold ${
                      isActive ? "text-[#00ff87]" : "text-zinc-500"
                    }`}
                  >
                    SCENE {scene.number}
                  </span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#00ff87] animate-ping" />}
                </div>
                <div className="text-sm font-bold text-white uppercase">{scene.title}</div>
              </button>
            );
          })}
        </div>

        {/* Scene Interactive Stage Container */}
        <div className="min-h-[520px] rounded-2xl border border-white/10 bg-[#0c0c12]/90 p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden">
          <AnimatePresence mode="wait">
            {/* SCENE 01: INGEST */}
            {activeScene === 0 && (
              <motion.div
                key="scene-01"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                {/* Left: Simulated Invoice with Laser Scanner */}
                <div className="lg:col-span-7 relative p-6 rounded-xl border border-white/10 bg-[#07070a] shadow-2xl overflow-hidden">
                  {/* Moving Laser Scanline */}
                  <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#00ff87] to-transparent shadow-[0_0_15px_#00ff87] animate-scanline pointer-events-none" />

                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10 text-xs font-mono">
                    <span className="text-zinc-400">INVOICE SPECIMEN • DOC-88219</span>
                    <span className="px-2 py-0.5 rounded bg-zinc-800 text-[#00ff87]">
                      SCANNING 300 DPI
                    </span>
                  </div>

                  {/* Invoice Header */}
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h4 className="text-lg font-bold text-white tracking-wide">
                        APEX HEAVY SYSTEMS INC.
                      </h4>
                      <p className="text-xs text-zinc-400 font-mono">Tax ID: XX-9912048 • Cage: 8X901</p>
                    </div>
                    <div className="text-right text-xs font-mono">
                      <div className="text-zinc-400">Invoice: <span className="text-white font-bold">INV-88219</span></div>
                      <div className="text-zinc-400">Date: <span className="text-white">2024-10-14</span></div>
                      <div className="text-zinc-400">PO Ref: <span className="text-[#00ff87]">PO-2024-912</span></div>
                    </div>
                  </div>

                  {/* Line Items Table */}
                  <div className="space-y-2 text-xs font-mono mb-6">
                    <div className="grid grid-cols-12 pb-2 border-b border-white/10 text-zinc-500 font-bold uppercase text-[10px]">
                      <div className="col-span-6">Description</div>
                      <div className="col-span-2 text-right">Qty</div>
                      <div className="col-span-2 text-right">Unit Price</div>
                      <div className="col-span-2 text-right">Total</div>
                    </div>
                    <div className="grid grid-cols-12 py-1 text-zinc-300">
                      <div className="col-span-6">Hydraulic Actuator Set (Grade-A)</div>
                      <div className="col-span-2 text-right">2</div>
                      <div className="col-span-2 text-right text-white font-semibold">$28,000.00</div>
                      <div className="col-span-2 text-right text-white font-semibold">$56,000.00</div>
                    </div>
                    <div className="grid grid-cols-12 py-1 text-zinc-300">
                      <div className="col-span-6">Calibrated Servo Valve Regulators</div>
                      <div className="col-span-2 text-right">5</div>
                      <div className="col-span-2 text-right">$3,500.00</div>
                      <div className="col-span-2 text-right">$17,500.00</div>
                    </div>
                    <div className="grid grid-cols-12 py-1 text-zinc-300">
                      <div className="col-span-6">Certified Freight & Rigging Transport</div>
                      <div className="col-span-2 text-right">1</div>
                      <div className="col-span-2 text-right">$5,000.00</div>
                      <div className="col-span-2 text-right">$5,000.00</div>
                    </div>
                  </div>

                  {/* Totals */}
                  <div className="border-t border-white/10 pt-3 flex justify-end text-xs font-mono">
                    <div className="w-56 space-y-1">
                      <div className="flex justify-between text-zinc-400">
                        <span>Subtotal:</span>
                        <span>$78,500.00</span>
                      </div>
                      <div className="flex justify-between text-zinc-400">
                        <span>Estimated Tax (8.21%):</span>
                        <span>$6,450.00</span>
                      </div>
                      <div className="flex justify-between text-sm font-bold text-white pt-1 border-t border-white/10">
                        <span>Grand Total:</span>
                        <span className="text-white">$84,950.00</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Extracted Entities HUD */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#00ff87]">
                    <Scan className="w-4 h-4" />
                    <span>REAL-TIME SPATIAL EXTRACTION</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white uppercase">
                    Multimodal Layout Parsing
                  </h3>
                  <p className="text-xs text-zinc-300 font-mono leading-relaxed">
                    Document enters through SFTP / AP inbox. The neural OCR parser locates tabular line
                    items, tax codes, vendor coordinates, and remittance instructions with 99.4%
                    token precision.
                  </p>

                  <div className="space-y-2 pt-2">
                    {[
                      { key: "Vendor Name", val: "Apex Heavy Systems Inc.", conf: "99.8%" },
                      { key: "Invoice Number", val: "INV-88219", conf: "99.9%" },
                      { key: "Purchase Order", val: "PO-2024-912", conf: "99.5%" },
                      { key: "Billed Total", val: "$84,950.00 USD", conf: "99.2%" },
                    ].map((f) => (
                      <div
                        key={f.key}
                        className="flex items-center justify-between p-2.5 rounded bg-black/40 border border-white/5 text-xs font-mono"
                      >
                        <span className="text-zinc-400">{f.key}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-white font-semibold">{f.val}</span>
                          <span className="text-[10px] text-[#00ff87]">{f.conf}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setActiveScene(1)}
                    className="mt-4 inline-flex items-center gap-2 text-xs font-mono uppercase text-[#00ff87] hover:underline"
                  >
                    Proceed to Scene 02: 3-Way Reconciliation →
                  </button>
                </div>
              </motion.div>
            )}

            {/* SCENE 02: RECONCILE */}
            {activeScene === 1 && (
              <motion.div
                key="scene-02"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                {/* Left: 3-Way Matching Matrix */}
                <div className="lg:col-span-8 p-6 rounded-xl border border-white/10 bg-[#07070a] shadow-2xl">
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10 text-xs font-mono">
                    <span className="text-zinc-400">3-WAY DETERMINISTIC RECONCILIATION ENGINE</span>
                    <span className="px-2 py-0.5 rounded bg-[#f59e0b]/20 text-[#f59e0b] border border-[#f59e0b]/30">
                      DISCREPANCY FLAGGED (+$20,000.00)
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-mono">
                      <thead>
                        <tr className="border-b border-white/10 text-zinc-500 uppercase text-[10px]">
                          <th className="pb-2">Field / Line Item</th>
                          <th className="pb-2">Invoice INV-88219</th>
                          <th className="pb-2">Purchase Order PO-912</th>
                          <th className="pb-2">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        <tr>
                          <td className="py-2.5 text-zinc-300 font-semibold">Vendor Identity</td>
                          <td className="py-2.5 text-white">Apex Heavy Systems</td>
                          <td className="py-2.5 text-zinc-400">Apex Heavy Systems</td>
                          <td className="py-2.5 text-[#00ff87] font-bold">✓ MATCH</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 text-zinc-300 font-semibold">Servo Valves (5x)</td>
                          <td className="py-2.5 text-white">$17,500.00 ($3,500/ea)</td>
                          <td className="py-2.5 text-zinc-400">$17,500.00 ($3,500/ea)</td>
                          <td className="py-2.5 text-[#00ff87] font-bold">✓ MATCH</td>
                        </tr>
                        <tr className="bg-[#ff3355]/5">
                          <td className="py-2.5 text-[#ff3355] font-semibold">Hydraulic Actuator (2x)</td>
                          <td className="py-2.5 text-white font-bold">$56,000.00 ($28,000/ea)</td>
                          <td className="py-2.5 text-zinc-400">$44,000.00 ($22,000/ea)</td>
                          <td className="py-2.5 text-[#ff3355] font-bold">▲ +$12,000 DIFF</td>
                        </tr>
                        <tr className="bg-[#f59e0b]/5">
                          <td className="py-2.5 text-[#f59e0b] font-semibold">Freight & Rigging</td>
                          <td className="py-2.5 text-white font-bold">$5,000.00</td>
                          <td className="py-2.5 text-zinc-400">$3,450.00 cap</td>
                          <td className="py-2.5 text-[#f59e0b] font-bold">▲ +$1,550 OVER</td>
                        </tr>
                        <tr className="border-t border-white/10 font-bold bg-white/[0.02]">
                          <td className="py-3 text-white">Grand Total Settlement</td>
                          <td className="py-3 text-[#ff3355] text-sm">$84,950.00</td>
                          <td className="py-3 text-zinc-300 text-sm">$64,950.00</td>
                          <td className="py-3 text-[#ff3355] font-mono text-sm">+30.8% VARIANCE</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Right: Explanation */}
                <div className="lg:col-span-4 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#f59e0b]">
                    <GitMerge className="w-4 h-4" />
                    <span>DETERMINISTIC GUARDRAILS</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white uppercase">
                    3-Way Variance Isolation
                  </h3>
                  <p className="text-xs text-zinc-300 font-mono leading-relaxed">
                    The document is matched against approved PO-2024-912 and ERP bank settlement feed.
                    Verified lines receive green confirmation; unauthorized price increases are flagged
                    with exact dollar delta.
                  </p>

                  <div className="p-3 rounded-lg border border-[#f59e0b]/30 bg-[#f59e0b]/10 text-xs font-mono text-zinc-200">
                    <span className="text-[#f59e0b] font-bold block mb-1">AUTOMATED DIRECTIVE:</span>
                    Treasury wire WIRE-20241014-9901 placed on escrow hold until forensic inspection
                    clarifies whether variance is a clerical error or document alteration.
                  </div>

                  <button
                    onClick={() => setActiveScene(2)}
                    className="mt-4 inline-flex items-center gap-2 text-xs font-mono uppercase text-[#00ff87] hover:underline"
                  >
                    Proceed to Scene 03: Forensic Investigation →
                  </button>
                </div>
              </motion.div>
            )}

            {/* SCENE 03: INVESTIGATE */}
            {activeScene === 2 && (
              <motion.div
                key="scene-03"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                {/* Left: Forensic Microscope Zoom Canvas */}
                <div className="lg:col-span-7 p-6 rounded-xl border border-[#ff3355]/40 bg-[#07070a] shadow-2xl relative">
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10 text-xs font-mono">
                    <span className="text-zinc-400">ERROR LEVEL ANALYSIS (ELA) & RASTER INSPECTOR</span>
                    <span className="px-2 py-0.5 rounded bg-[#ff3355]/20 text-[#ff3355] font-bold">
                      ANOMALY DETECTED (CONF: 0.94)
                    </span>
                  </div>

                  {/* Zoomed region simulation */}
                  <div className="p-6 rounded-lg bg-black border border-white/10 relative overflow-hidden text-center my-4">
                    <div className="text-xs font-mono text-zinc-500 mb-2">
                      INSPECTED REGION: [720, 840, 180, 45] GRAND TOTAL
                    </div>

                    <div className="inline-block p-4 rounded border-2 border-[#ff3355] bg-red-950/20 relative">
                      <span className="text-3xl sm:text-4xl font-mono font-black text-white tracking-wider">
                        $<span className="text-[#ff3355] underline decoration-wavy">8</span>4,950.00
                      </span>
                      <div className="absolute -top-3 -right-3 px-2 py-0.5 text-[9px] font-mono bg-[#ff3355] text-white rounded font-bold uppercase">
                        Baseline Offset +1.8px
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-6 text-left text-xs font-mono">
                      <div className="p-2.5 rounded bg-zinc-900 border border-white/5">
                        <span className="text-zinc-500 block text-[10px]">EXTRACTED NUMERAL</span>
                        <span className="text-white font-bold text-sm">$84,950.00</span>
                      </div>
                      <div className="p-2.5 rounded bg-zinc-900 border border-white/5">
                        <span className="text-zinc-500 block text-[10px]">AUTHORIZED PO RATE</span>
                        <span className="text-[#00ff87] font-bold text-sm">$64,950.00</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] font-mono text-zinc-400 leading-relaxed">
                    <span className="text-white font-semibold">Demonstration Finding: </span>
                    Visual inspection reveals localized pixel quantization divergence on the numeral
                    '8' and PDF text stream inconsistency (`[(22,000)] TJ` in text stream vs visible
                    `$28,000` raster).
                  </p>
                </div>

                {/* Right: Forensic Dossier */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#ff3355]">
                    <Search className="w-4 h-4" />
                    <span>FORENSIC VISION AGENT</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white uppercase">
                    Neural Image Forensics
                  </h3>
                  <p className="text-xs text-zinc-300 font-mono leading-relaxed">
                    LedgerGuard does not invent subjective claims. Findings are classified strictly
                    as statistical anomaly indicators requiring human review—combining Error Level
                    Analysis (ELA), font kerning deviation, and PDF metadata modification histories.
                  </p>

                  <div className="space-y-2">
                    <div className="p-2.5 rounded bg-black/40 border border-white/5 text-xs font-mono">
                      <div className="text-zinc-400">PDF Modification History:</div>
                      <div className="text-zinc-200">
                        Producer changed to "PDF-XChange Editor" 14 mins prior to upload.
                      </div>
                    </div>
                    <div className="p-2.5 rounded bg-black/40 border border-white/5 text-xs font-mono">
                      <div className="text-zinc-400">Limitation Guardrail:</div>
                      <div className="text-zinc-400 italic">
                        Anomaly signal only. Not proof of fraud. Human sign-off strictly required.
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveScene(3)}
                    className="mt-4 inline-flex items-center gap-2 text-xs font-mono uppercase text-[#00ff87] hover:underline"
                  >
                    Proceed to Scene 04: Resolution Planning →
                  </button>
                </div>
              </motion.div>
            )}

            {/* SCENE 04: RESOLVE */}
            {activeScene === 3 && (
              <motion.div
                key="scene-04"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                {/* Left: Resolution Card */}
                <div className="lg:col-span-7 p-6 rounded-xl border border-white/10 bg-[#07070a] shadow-2xl space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono">
                    <span className="text-zinc-400">AGENT PROPOSAL: RESOLUTION DOSSIER</span>
                    <span className="px-2 py-0.5 rounded bg-[#00ff87]/20 text-[#00ff87] font-semibold">
                      ACTIONABLE REMEDIATION
                    </span>
                  </div>

                  <div className="space-y-3 text-xs font-mono">
                    <div className="p-3 rounded-lg bg-black/60 border border-white/5">
                      <span className="text-zinc-500 uppercase text-[10px] block mb-1">
                        1. Proposed Resolution
                      </span>
                      <p className="text-zinc-200 leading-relaxed font-semibold">
                        Authorize provisional settlement of verified base amount ($64,950.00) while
                        holding disputed $20,000.00 in escrow.
                      </p>
                    </div>

                    <div className="p-3 rounded-lg bg-black/60 border border-white/5">
                      <span className="text-zinc-500 uppercase text-[10px] block mb-1">
                        2. Supporting Evidence
                      </span>
                      <p className="text-zinc-300 leading-relaxed">
                        PO-2024-912 authorization limit; physical goods receipt GR-9912 for 2 actuators;
                        raster baseline offset on grand total.
                      </p>
                    </div>

                    <div className="p-3 rounded-lg bg-black/60 border border-white/5">
                      <span className="text-zinc-500 uppercase text-[10px] block mb-1">
                        3. Uncertainties & Human Gate
                      </span>
                      <p className="text-zinc-400 leading-relaxed">
                        Vendor has not yet uploaded formal Change Order endorsement. Requires dual
                        approval: Forensic Lead (Level 2) & Treasury Controller.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right: Policy & Governance */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#00ff87]">
                    <ShieldCheck className="w-4 h-4" />
                    <span>HUMAN-IN-THE-LOOP GOVERNANCE</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white uppercase">
                    Evidence-Backed Decisions
                  </h3>
                  <p className="text-xs text-zinc-300 font-mono leading-relaxed">
                    The platform never blindly executes banking transactions or terminates contracts.
                    It equips finance teams with actionable, structured options with clear audit
                    boundaries and uncertainty indicators.
                  </p>

                  <div className="p-3 rounded-lg border border-white/10 bg-white/[0.02] text-xs font-mono">
                    <span className="text-zinc-400">Available Review Actions:</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="px-2 py-1 rounded bg-zinc-800 text-zinc-200">Approve Escrow</span>
                      <span className="px-2 py-1 rounded bg-zinc-800 text-zinc-200">Request Vendor RFI</span>
                      <span className="px-2 py-1 rounded bg-zinc-800 text-zinc-200">Escalate to Legal</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveScene(4)}
                    className="mt-4 inline-flex items-center gap-2 text-xs font-mono uppercase text-[#00ff87] hover:underline"
                  >
                    Proceed to Scene 05: Cryptographic Verification →
                  </button>
                </div>
              </motion.div>
            )}

            {/* SCENE 05: VERIFY */}
            {activeScene === 4 && (
              <motion.div
                key="scene-05"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                {/* Left: Merkle Audit Block */}
                <div className="lg:col-span-8 p-6 rounded-xl border border-[#00ff87]/30 bg-[#07070a] shadow-2xl space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-[#00ff87]" />
                      <span className="text-white font-bold">TAMPER-PROOF AUDIT EVENT #0x77ab41e002</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-[#00ff87]/20 text-[#00ff87] font-semibold">
                      MERKLE COMMITTED
                    </span>
                  </div>

                  <div className="space-y-3 text-xs font-mono">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <div className="p-2.5 rounded bg-zinc-900 border border-white/5">
                        <span className="text-zinc-500 text-[10px] block">EVENT TYPE</span>
                        <span className="text-white font-bold">Forensic Review Action</span>
                      </div>
                      <div className="p-2.5 rounded bg-zinc-900 border border-white/5">
                        <span className="text-zinc-500 text-[10px] block">ACTOR</span>
                        <span className="text-white font-bold">Jonathan Hayes (Lead)</span>
                      </div>
                      <div className="p-2.5 rounded bg-zinc-900 border border-white/5">
                        <span className="text-zinc-500 text-[10px] block">DECISION</span>
                        <span className="text-[#00ff87] font-bold">Escrow Hold Approved</span>
                      </div>
                      <div className="p-2.5 rounded bg-zinc-900 border border-white/5">
                        <span className="text-zinc-500 text-[10px] block">EVIDENCE HASH</span>
                        <span className="text-zinc-300">0x3c91a01ef4b7</span>
                      </div>
                    </div>

                    <div className="p-3 rounded bg-black/60 border border-white/5 text-zinc-300 leading-relaxed">
                      "Approved provisional disbursement of contract base ($64,950.00). Retained
                      $20,000.00 in dispute escrow. Formal RFI dispatched to Apex Heavy Systems Accounts
                      Receivable."
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-zinc-500 pt-1">
                      <span>PREVIOUS HASH: 0x8f19e4a2bc018d99</span>
                      <span className="text-[#00ff87]">BLOCKCHAIN MERKLE VERIFIED</span>
                    </div>
                  </div>
                </div>

                {/* Right: Closing CTA */}
                <div className="lg:col-span-4 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#00ff87]">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>AUDIT RECORD COMMITTED</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white uppercase">
                    Every Transaction Leaves Evidence
                  </h3>
                  <p className="text-xs text-zinc-300 font-mono leading-relaxed">
                    Every detection, model finding, and human review authorization is bound into an
                    immutable ledger for continuous SOX-404 compliance.
                  </p>

                  <div className="pt-2">
                    <Link
                      href="/console"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider text-black bg-[#00ff87] hover:bg-[#15ff96] transition-all shadow-lg shadow-[#00ff87]/20"
                    >
                      <span>Enter Command Center</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
