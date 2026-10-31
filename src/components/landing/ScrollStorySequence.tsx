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
  ShieldCheck,
  ArrowRight,
  FileCheck,
  Lock,
  Layers,
  Sparkles,
  Eye,
} from "lucide-react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

interface SceneStep {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  icon: any;
}

const SCENES: SceneStep[] = [
  {
    id: "ingest",
    number: "01",
    title: "Ingest",
    tagline: "Multimodal Document Extraction",
    description: "Inbound invoices and purchase orders enter the workspace. Spatial OCR vectorizes line items, tax IDs, and vendor headers instantly.",
    icon: Scan,
  },
  {
    id: "reconcile",
    number: "02",
    title: "Reconcile",
    tagline: "Deterministic 3-Way Cross Check",
    description: "Correlates invoice amounts against purchase orders and bank clearing feeds to catch unit mismatches, shipping surcharges, and date variances.",
    icon: GitMerge,
  },
  {
    id: "investigate",
    number: "03",
    title: "Investigate",
    tagline: "Error Level Analysis & Raster Forensics",
    description: "Deep vision inspection scans for digital image compression divergences, altered font baselines, and fraudulent payee bank details.",
    icon: Search,
  },
  {
    id: "resolve",
    number: "04",
    title: "Resolve",
    tagline: "Autonomous Settlement Policy",
    description: "Generates actionable recommendations: automated approval for perfect matches, escalation RFIs for altered totals, and immediate holds for fraud.",
    icon: CheckCircle2,
  },
  {
    id: "verify",
    number: "05",
    title: "Verify",
    tagline: "Tamper-Evident Merkle Assurance",
    description: "Cryptographically anchors every decision into an immutable SHA-256 Merkle tree block, generating an audit-ready compliance proof.",
    icon: ShieldCheck,
  },
];

export function ScrollStorySequence() {
  const [activeScene, setActiveScene] = useState<number>(0);

  return (
    <section id="story" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-[#D7D0C9] bg-[#F7F5F1] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#D7D0C9]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#6F4E37]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#6F4E37] font-bold">
                SCROLL-DRIVEN PRODUCT STORY
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black serif-display text-[#30231D] tracking-tight">
              From Raw Ingest to Verified Audit
            </h2>
          </div>
          <p className="text-sm font-sans text-[#5C4F47] max-w-md mt-4 md:mt-0 leading-relaxed font-normal">
            Step through the autonomous forensics pipeline: document extraction, 3-way matching,
            neural image forensics, policy resolution, and cryptographic audit sealing.
          </p>
        </div>

        {/* Scene Progress Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-10">
          {SCENES.map((scene, idx) => {
            const isActive = activeScene === idx;
            const Icon = scene.icon;
            return (
              <button
                key={scene.id}
                onClick={() => setActiveScene(idx)}
                className={`p-4 rounded-xl text-left transition-all border relative cursor-pointer ${
                  isActive
                    ? "bg-white border-[#6F4E37] shadow-md ring-2 ring-[#6F4E37]/15"
                    : "bg-[#FFFFFF]/60 border-[#D7D0C9] hover:bg-white hover:border-[#6F4E37]/50"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-xs font-mono font-bold ${
                      isActive ? "text-[#6F4E37]" : "text-[#5C4F47]"
                    }`}
                  >
                    PHASE {scene.number}
                  </span>
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#6F4E37]" : "text-[#5C4F47]"}`} />
                </div>
                <div className="text-sm font-bold text-[#30231D]">{scene.title}</div>
                <div className="text-[11px] text-[#5C4F47] truncate mt-0.5">{scene.tagline}</div>
                {isActive && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute -bottom-1 left-4 right-4 h-1 bg-[#6F4E37] rounded-full"
                    transition={{ duration: 0.25 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Scene Interactive Stage Container */}
        <div className="min-h-[500px] rounded-2xl border border-[#D7D0C9] bg-white p-6 sm:p-10 shadow-lg relative overflow-hidden">
          <AnimatePresence mode="wait">
            {/* SCENE 01: INGEST */}
            {activeScene === 0 && (
              <motion.div
                key="scene-ingest"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-5 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6E0F0] text-[#30231D] text-xs font-semibold">
                    <Scan className="w-3.5 h-3.5 text-[#6F4E37]" />
                    <span>PHASE 01: INGESTION</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black serif-display text-[#30231D]">
                    Spatial OCR & Vector Ingestion
                  </h3>
                  <p className="text-sm text-[#5C4F47] leading-relaxed">
                    Documents are parsed at 600 DPI. Line items, dates, vendor addresses, and VAT IDs are mapped to normalized financial schemas in under 400ms.
                  </p>
                  <div className="p-4 rounded-xl bg-[#F7F5F1] border border-[#D7D0C9] space-y-2 text-xs font-mono text-[#30231D]">
                    <div className="flex justify-between">
                      <span className="text-[#5C4F47]">Target File</span>
                      <span className="font-bold">INV-88219.pdf</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#5C4F47]">Extracted Total</span>
                      <span className="font-bold text-[#6F4E37]">$84,950.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#5C4F47]">Confidence Score</span>
                      <span className="font-bold text-[#25663B]">99.8%</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7 p-6 rounded-2xl bg-[#F7F5F1] border border-[#D7D0C9] shadow-inner space-y-4">
                  <div className="flex items-center justify-between border-b border-[#D7D0C9] pb-3 text-xs font-mono">
                    <span className="font-bold text-[#30231D]">APEX HEAVY SYSTEMS LLC</span>
                    <span className="text-[#5C4F47]">OCTOBER 15, 2026</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between p-2 rounded bg-white border border-[#D7D0C9]">
                      <span className="font-medium text-[#30231D]">High-Yield Hydraulic Actuators (x4)</span>
                      <span className="font-bold text-[#30231D]">$48,000.00</span>
                    </div>
                    <div className="flex justify-between p-2 rounded bg-white border border-[#D7D0C9]">
                      <span className="font-medium text-[#30231D]">Titanium Bushing Sets (x12)</span>
                      <span className="font-bold text-[#30231D]">$16,950.00</span>
                    </div>
                    <div className="flex justify-between p-2 rounded bg-[#FFF8E6] border border-[#F3DC9B] text-[#946000]">
                      <span className="font-bold">Anomalous Expedited Freight Levy</span>
                      <span className="font-bold">+$20,000.00</span>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-[#D7D0C9] flex justify-between font-bold text-sm text-[#30231D]">
                    <span>Extracted Grand Total:</span>
                    <span className="text-[#6F4E37] font-mono text-base">$84,950.00</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* SCENE 02: RECONCILE */}
            {activeScene === 1 && (
              <motion.div
                key="scene-reconcile"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-5 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F4EC] text-[#25663B] text-xs font-semibold border border-[#B7DEC3]">
                    <GitMerge className="w-3.5 h-3.5" />
                    <span>PHASE 02: 3-WAY RECONCILIATION</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black serif-display text-[#30231D]">
                    Cross-Record Verification
                  </h3>
                  <p className="text-sm text-[#5C4F47] leading-relaxed">
                    Invoice INV-88219 is automatically linked to authorized Purchase Order PO-2024-912 and scheduled wire WIRE-9901. A +$20,000 variance is instantly isolated.
                  </p>
                  <div className="flex gap-3 pt-2">
                    <Link href="/reconciliation" className="btn-primary text-xs">
                      View Reconciliation Table
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-7 grid grid-cols-3 gap-3 p-4 rounded-2xl bg-[#F7F5F1] border border-[#D7D0C9]">
                  <div className="p-3.5 rounded-xl bg-white border border-[#D7D0C9] space-y-2">
                    <div className="text-[11px] font-mono font-bold text-[#5C4F47]">1. INVOICE</div>
                    <div className="text-base font-bold text-[#30231D]">$84,950</div>
                    <span className="badge-warning text-[10px]">Variance</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border border-[#D7D0C9] space-y-2">
                    <div className="text-[11px] font-mono font-bold text-[#5C4F47]">2. PURCHASE ORDER</div>
                    <div className="text-base font-bold text-[#30231D]">$64,950</div>
                    <span className="badge-success text-[10px]">Approved PO</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border border-[#D7D0C9] space-y-2">
                    <div className="text-[11px] font-mono font-bold text-[#5C4F47]">3. BANK WIRE</div>
                    <div className="text-base font-bold text-[#30231D]">$84,950</div>
                    <span className="badge-error text-[10px]">Held Escrow</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* SCENE 03: INVESTIGATE */}
            {activeScene === 2 && (
              <motion.div
                key="scene-investigate"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-5 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FDF0F0] text-[#B52A2A] text-xs font-semibold border border-[#F7BDBD]">
                    <Search className="w-3.5 h-3.5" />
                    <span>PHASE 03: FORENSICS LAB</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black serif-display text-[#30231D]">
                    Error Level Analysis (ELA)
                  </h3>
                  <p className="text-sm text-[#5C4F47] leading-relaxed">
                    JPEG quantization divergence proves the leading digit &apos;8&apos; was pasted over an original &apos;6&apos; in an external editor prior to submission.
                  </p>
                  <Link href="/document-check" className="btn-secondary text-xs">
                    Inspect in Document Check
                  </Link>
                </div>

                <div className="lg:col-span-7 p-6 rounded-2xl bg-[#30231D] text-white border border-[#4A3B32] space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-[#E6E0F0]">
                    <span>ELA HEATMAP PREVIEW</span>
                    <span className="text-[#F7BDBD]">QUANTIZATION DIVERGENCE: 94.2%</span>
                  </div>
                  <div className="p-4 rounded-xl bg-black/40 border border-white/10 font-mono text-xs space-y-1.5">
                    <div className="text-[#B52A2A] font-bold">▶ DIGIT_FORGERY_DETECTED: Row 3, Column 'Grand Total'</div>
                    <div className="text-[#E5E4E2]">Expected compression: Q=85 | Local divergence: Q=98</div>
                    <div className="text-[#E6E0F0]">Baseline offset: -1.4px vertical shift against OCR font matrix</div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* SCENE 04: RESOLVE */}
            {activeScene === 3 && (
              <motion.div
                key="scene-resolve"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-5 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF8E6] text-[#946000] text-xs font-semibold border border-[#F3DC9B]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>PHASE 04: POLICY RESOLUTION</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black serif-display text-[#30231D]">
                    Evidence-Backed Decisioning
                  </h3>
                  <p className="text-sm text-[#5C4F47] leading-relaxed">
                    Tesseract flags the $20,000 discrepancy, places the wire in escrow, and drafts a Request for Information (RFI) to the vendor with cryptographic proof attached.
                  </p>
                  <Link href="/reconciliation" className="btn-primary text-xs">
                    Approve or Flag Transaction
                  </Link>
                </div>

                <div className="lg:col-span-7 p-6 rounded-2xl bg-[#F7F5F1] border border-[#D7D0C9] space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#30231D]">Reviewer Action Dashboard</span>
                    <span className="badge-warning text-xs">Awaiting Sign-off</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <button className="p-3 rounded-lg border border-[#D7D0C9] bg-white font-semibold text-[#30231D] hover:border-[#6F4E37] text-left">
                      ✓ Release Contract Amount ($64,950)
                    </button>
                    <button className="p-3 rounded-lg border border-[#F7BDBD] bg-[#FDF0F0] font-semibold text-[#B52A2A] text-left">
                      ✕ Reject & Escalation to Legal
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* SCENE 05: VERIFY */}
            {activeScene === 4 && (
              <motion.div
                key="scene-verify"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-5 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6E0F0] text-[#30231D] text-xs font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#6F4E37]" />
                    <span>PHASE 05: MERKLE ASSURANCE</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black serif-display text-[#30231D]">
                    Immutable Audit Trail
                  </h3>
                  <p className="text-sm text-[#5C4F47] leading-relaxed">
                    Every review action, ELA finding, and timestamp is sealed in a Merkle tree block. A tamper-evident cryptographic hash certifies compliance for external auditors.
                  </p>
                  <Link href="/activity" className="btn-outline text-xs">
                    Explore Audit Activity
                  </Link>
                </div>

                <div className="lg:col-span-7 p-6 rounded-2xl bg-[#30231D] text-white border border-[#4A3B32] space-y-3 font-mono text-xs">
                  <div className="text-[#E6E0F0] font-bold">MERKLE LEAF ATTESTATION: BLOCK #4892</div>
                  <div className="p-3 rounded bg-black/40 border border-white/10 text-[#E5E4E2] space-y-1">
                    <div>ROOT_HASH: 0x9f8e7d6c5b4a3928170f...</div>
                    <div>TIMESTAMP: 2026-10-31T08:15:22.000Z</div>
                    <div className="text-[#25663B] font-bold">STATE: CRYPTOGRAPHICALLY_SEALED</div>
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
